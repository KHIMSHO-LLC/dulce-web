/**
 * Canvas renderers for the Dulce app screens shown on the page.
 *
 * These depict the real app's interface (dark UI, green in-range numerals,
 * ember actions; see public/screenshots for the App Store originals) so the 3D
 * phone and watch can show live, localized screens. Every value is synthetic
 * (components/screens/glucose.ts) and the footer labels it as sample data.
 *
 * All drawing happens in device points: the caller scales the context so one
 * unit is one iOS point (phone 393x852, watch 368x448).
 */
import { HIGH, LOW, STATE_COLORS, nightSeries, seriesFor, stateOf } from "./glucose";
import { SCREEN_STRINGS, type ScreenLocale, type ScreenStrings } from "./strings";

export const PHONE = { w: 393, h: 852 } as const;
export const WATCH = { w: 368, h: 448 } as const;

export type ScreenName =
  | "home"
  | "lock"
  | "alerts"
  | "standby"
  | "followers"
  | "logbook"
  | "trends"
  | "health"
  | "parentAlert"
  | "nudge"
  | "watch"
  | "widgets";

export type DrawState = {
  locale: ScreenLocale;
  value: number;
  trend: number;
  delta: number;
  series: number[];
  now: Date;
  /** 0..1, used by screens that build up over scroll (alerts). */
  progress?: number;
};

const UI = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, system-ui, sans-serif';
const ROUNDED = '"SF Pro Rounded", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const C = {
  bg: "#0B0B0C",
  card: "#1C1C1E",
  card2: "#232325",
  line: "rgba(255,255,255,0.08)",
  text: "#FFFFFF",
  soft: "rgba(235,235,245,0.62)",
  mute: "rgba(235,235,245,0.38)",
  ember: "#F36638",
  emberSoft: "rgba(243,102,56,0.16)",
};

/* ------------------------------------------------------------------ */
/* Images (the real app icon and the drop mark), loaded once.          */
/* ------------------------------------------------------------------ */

const images = new Map<string, HTMLImageElement>();
const waiters = new Map<string, Array<() => void>>();

/** Returns the image if ready, otherwise starts loading and calls `onReady` once. */
export function screenImage(src: string, onReady?: () => void): HTMLImageElement | null {
  if (typeof window === "undefined") return null;
  const hit = images.get(src);
  if (hit?.complete && hit.naturalWidth > 0) return hit;
  if (onReady) {
    const list = waiters.get(src) ?? [];
    list.push(onReady);
    waiters.set(src, list);
  }
  if (!hit) {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.onload = () => {
      const list = waiters.get(src) ?? [];
      waiters.delete(src);
      list.forEach((fn) => fn());
    };
    images.set(src, img);
  }
  return null;
}

const ICON = "/apple-touch-icon.png";
const DROP = "/brand/dulce-drop.png";

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

type Ctx = CanvasRenderingContext2D;

function rr(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
}

function fill(ctx: Ctx, color: string | CanvasGradient) {
  ctx.fillStyle = color;
  ctx.fill();
}

function text(
  ctx: Ctx,
  str: string,
  x: number,
  y: number,
  size: number,
  weight: number | string,
  color: string,
  align: CanvasTextAlign = "left",
  family = UI,
) {
  ctx.font = `${weight} ${size}px ${family}`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(str, x, y);
  return ctx.measureText(str).width;
}

function fmtTime(d: Date, locale: ScreenLocale, opts: { seconds?: boolean } = {}) {
  const h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  if (locale === "en") {
    const hh = h % 12 === 0 ? 12 : h % 12;
    return `${hh}:${m}`;
  }
  return opts.seconds ? `${h}:${m}` : `${h.toString().padStart(2, "0")}:${m}`;
}

/** Trend arrow: right-pointing, rotated by slope (mg/dL per min). */
function arrow(ctx: Ctx, x: number, y: number, size: number, trend: number, color: string, weight = 0.13) {
  const angle = Math.max(-1.2, Math.min(1.2, -trend * 0.35));
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * weight;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(-size * 0.42, 0);
  ctx.lineTo(size * 0.42, 0);
  ctx.moveTo(size * 0.08, -size * 0.34);
  ctx.lineTo(size * 0.44, 0);
  ctx.lineTo(size * 0.08, size * 0.34);
  ctx.stroke();
  ctx.restore();
}

function statusBar(ctx: Ctx, s: DrawState, opts: { island?: "compact" | "plain"; time?: string } = {}) {
  const t = opts.time ?? fmtTime(s.now, s.locale);
  text(ctx, t, 52, 37, 16.5, 600, C.text, "center");
  // signal
  for (let i = 0; i < 4; i++) {
    rr(ctx, 293 + i * 5, 32 - (i + 1) * 2.6, 3, (i + 1) * 2.6, 1);
    fill(ctx, C.text);
  }
  // wifi (three arcs)
  ctx.save();
  ctx.strokeStyle = C.text;
  ctx.lineCap = "round";
  for (let i = 0; i < 3; i++) {
    ctx.lineWidth = 1.9;
    ctx.beginPath();
    ctx.arc(322, 34, 3 + i * 3.2, Math.PI * 1.25, Math.PI * 1.75);
    ctx.stroke();
  }
  ctx.restore();
  // battery
  rr(ctx, 336, 24.5, 25, 12, 3.6);
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.lineWidth = 1;
  ctx.stroke();
  rr(ctx, 338, 26.5, 18, 8, 2);
  fill(ctx, C.text);
  rr(ctx, 362.5, 28.5, 1.6, 4, 0.8);
  fill(ctx, "rgba(255,255,255,0.45)");

  if (opts.island === "compact") {
    const st = STATE_COLORS[stateOf(s.value)];
    rr(ctx, 120, 11, 153, 37, 18.5);
    fill(ctx, "#000");
    const drop = screenImage(DROP);
    if (drop) ctx.drawImage(drop, 132, 18.5, 16.5, 22);
    text(ctx, `${s.value}`, 246, 35.5, 17, 600, st.text, "right", UI);
    arrow(ctx, 258, 29.5, 13, s.trend, st.text, 0.16);
  } else {
    rr(ctx, 133.5, 11, 126, 37, 18.5);
    fill(ctx, "#000");
  }
}

function homeIndicator(ctx: Ctx, w = PHONE.w, h = PHONE.h) {
  rr(ctx, w / 2 - 67, h - 13, 134, 5, 2.5);
  fill(ctx, "rgba(255,255,255,0.75)");
}

type ChartOpts = {
  min?: number;
  max?: number;
  band?: boolean;
  thresholds?: boolean;
  width?: number;
  dot?: boolean;
  glow?: boolean;
  labels?: string[];
};

/** Glucose trace: range band, dashed thresholds, stroke coloured by state. */
function chart(ctx: Ctx, x: number, y: number, w: number, h: number, series: number[], o: ChartOpts = {}) {
  const min = o.min ?? 40;
  const max = o.max ?? 260;
  const py = (v: number) => y + h - ((Math.max(min, Math.min(max, v)) - min) / (max - min)) * h;
  const px = (i: number) => x + (i / (series.length - 1)) * w;

  if (o.band !== false) {
    ctx.fillStyle = "rgba(102,196,91,0.07)";
    ctx.fillRect(x, py(HIGH), w, py(LOW) - py(HIGH));
  }
  if (o.thresholds !== false) {
    ctx.save();
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.lineWidth = 1;
    for (const v of [LOW, HIGH]) {
      ctx.beginPath();
      ctx.moveTo(x, Math.round(py(v)) + 0.5);
      ctx.lineTo(x + w, Math.round(py(v)) + 0.5);
      ctx.stroke();
    }
    ctx.restore();
  }

  ctx.save();
  ctx.lineWidth = o.width ?? 2.4;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  if (o.glow) {
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(102,196,91,0.55)";
  }
  // Draw per segment so colour follows the glucose state.
  for (let i = 1; i < series.length; i++) {
    const v = (series[i] + series[i - 1]) / 2;
    ctx.strokeStyle = STATE_COLORS[stateOf(v)].fill;
    ctx.beginPath();
    ctx.moveTo(px(i - 1), py(series[i - 1]));
    ctx.lineTo(px(i), py(series[i]));
    ctx.stroke();
  }
  ctx.restore();

  if (o.dot !== false) {
    const last = series[series.length - 1];
    const st = STATE_COLORS[stateOf(last)];
    ctx.beginPath();
    ctx.arc(px(series.length - 1), py(last), 4.2, 0, Math.PI * 2);
    fill(ctx, st.text);
    ctx.beginPath();
    ctx.arc(px(series.length - 1), py(last), 9, 0, Math.PI * 2);
    fill(ctx, st.fill + "33");
  }

  if (o.labels) {
    o.labels.forEach((label, i) => {
      text(ctx, label, x + (i / (o.labels!.length - 1)) * w, y + h + 16, 10, 500, C.mute, "center");
    });
  }
}

function pill(ctx: Ctx, x: number, y: number, label: string, color: string, bg: string, dot = true) {
  ctx.font = `600 12.5px ${UI}`;
  const w = ctx.measureText(label).width + (dot ? 30 : 20);
  rr(ctx, x, y, w, 26, 13);
  fill(ctx, bg);
  if (dot) {
    ctx.beginPath();
    ctx.arc(x + 12, y + 13, 3.5, 0, Math.PI * 2);
    fill(ctx, color);
  }
  text(ctx, label, x + (dot ? 21 : 10), y + 17.5, 12.5, 600, color);
  return w;
}

function tirBar(ctx: Ctx, x: number, y: number, w: number, h: number, low: number, range: number, high: number) {
  const total = low + range + high;
  const segs: Array<[number, string]> = [
    [low, STATE_COLORS.low.fill],
    [range, STATE_COLORS.range.fill],
    [high, STATE_COLORS.high.fill],
  ];
  let cx = x;
  segs.forEach(([v, color], i) => {
    const sw = (v / total) * w - (i < 2 ? 3 : 0);
    rr(ctx, cx, y, Math.max(sw, 3), h, h / 2);
    fill(ctx, color);
    cx += sw + 3;
  });
}

/** Lock-screen wallpaper: warm dusk at the bottom, night at the top. */
function wallpaper(ctx: Ctx, w: number, h: number, mood: "dusk" | "night") {
  ctx.fillStyle = mood === "night" ? "#07080B" : "#0B0A0C";
  ctx.fillRect(0, 0, w, h);
  const g = ctx.createRadialGradient(w * 0.15, h * 1.02, 10, w * 0.15, h * 1.02, h * 0.9);
  if (mood === "dusk") {
    g.addColorStop(0, "rgba(243,102,56,0.75)");
    g.addColorStop(0.35, "rgba(150,48,40,0.45)");
    g.addColorStop(1, "rgba(20,10,12,0)");
  } else {
    g.addColorStop(0, "rgba(70,40,90,0.55)");
    g.addColorStop(0.4, "rgba(30,24,52,0.35)");
    g.addColorStop(1, "rgba(5,6,10,0)");
  }
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  const g2 = ctx.createRadialGradient(w * 1.1, h * 0.05, 10, w * 1.1, h * 0.05, h * 0.6);
  g2.addColorStop(0, mood === "dusk" ? "rgba(60,70,120,0.35)" : "rgba(40,60,110,0.3)");
  g2.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, w, h);
}

function lockClock(ctx: Ctx, s: DrawState, L: ScreenStrings, time?: Date) {
  const d = time ?? s.now;
  text(ctx, L.weekday(d), PHONE.w / 2, 112, 18, 600, "rgba(255,255,255,0.82)", "center");
  text(ctx, fmtTime(d, s.locale, { seconds: true }), PHONE.w / 2, 205, 92, 700, "rgba(255,255,255,0.94)", "center", ROUNDED);
}

function lockButtons(ctx: Ctx) {
  for (const cx of [72, PHONE.w - 72]) {
    ctx.beginPath();
    ctx.arc(cx, 776, 25, 0, Math.PI * 2);
    fill(ctx, "rgba(255,255,255,0.14)");
  }
  // flashlight + camera glyphs, minimal
  rr(ctx, 67, 764, 10, 20, 3);
  fill(ctx, "rgba(255,255,255,0.85)");
  rr(ctx, PHONE.w - 84, 768, 24, 17, 4);
  fill(ctx, "rgba(255,255,255,0.85)");
  ctx.beginPath();
  ctx.arc(PHONE.w - 72, 776.5, 5, 0, Math.PI * 2);
  fill(ctx, "rgba(20,20,22,0.9)");
}

function appIcon(ctx: Ctx, x: number, y: number, size: number, onReady?: () => void) {
  const img = screenImage(ICON, onReady);
  ctx.save();
  rr(ctx, x, y, size, size, size * 0.24);
  ctx.clip();
  if (img) ctx.drawImage(img, x, y, size, size);
  else {
    ctx.fillStyle = "#FAF7F2";
    ctx.fillRect(x, y, size, size);
  }
  ctx.restore();
}

function notification(
  ctx: Ctx,
  y: number,
  title: string,
  body: string,
  time: string,
  dotColor: string,
  ring: string | null,
  onReady?: () => void,
) {
  const x = 14;
  const w = PHONE.w - 28;
  rr(ctx, x, y, w, 74, 22);
  fill(ctx, "rgba(38,36,40,0.82)");
  if (ring) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = ring;
    ctx.stroke();
  }
  appIcon(ctx, x + 12, y + 15, 40, onReady);
  ctx.beginPath();
  ctx.arc(x + 66, y + 28, 4, 0, Math.PI * 2);
  fill(ctx, dotColor);
  text(ctx, title, x + 76, y + 33, 15, 600, C.text);
  text(ctx, body, x + 66, y + 54, 14, 400, "rgba(255,255,255,0.78)");
  text(ctx, time, x + w - 14, y + 31, 12.5, 400, "rgba(255,255,255,0.5)", "right");
}

/* ------------------------------------------------------------------ */
/* Screens                                                             */
/* ------------------------------------------------------------------ */

function drawHome(ctx: Ctx, s: DrawState, L: ScreenStrings, onReady?: () => void) {
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, PHONE.w, PHONE.h);
  statusBar(ctx, s);
  const st = STATE_COLORS[stateOf(s.value)];

  text(ctx, `${L.lastReading} ${fmtTime(s.now, s.locale)}`, 22, 86, 13, 500, C.mute);

  // Big number with a soft state glow
  ctx.save();
  ctx.shadowColor = st.fill + "55";
  ctx.shadowBlur = 30;
  const numW = text(ctx, `${s.value}`, 18, 178, 96, 300, st.text);
  ctx.restore();
  arrow(ctx, 18 + numW + 26, 142, 34, s.trend, st.text, 0.11);
  text(ctx, "mg/dL", 18 + numW + 8, 176, 13, 500, C.soft);
  const sign = s.delta > 0 ? "+" : "";
  text(ctx, `${sign}${s.delta}`, PHONE.w - 24, 140, 30, 400, C.text, "right");
  text(ctx, L.change, PHONE.w - 24, 160, 12, 500, C.mute, "right");

  pill(ctx, 20, 196, L.inRange, STATE_COLORS.range.text, "rgba(102,196,91,0.14)");
  text(ctx, L.keepItUp, 22, 248, 13, 500, C.mute);

  // Chart card
  rr(ctx, 12, 266, PHONE.w - 24, 268, 24);
  fill(ctx, C.card);
  text(ctx, L.last12h, 30, 298, 16, 600, C.text);
  const ranges = ["1H", "3H", "6H", "12H", "24H"];
  ranges.forEach((r, i) => {
    const bx = 30 + i * 64;
    if (r === "12H") {
      rr(ctx, bx - 6, 310, 46, 24, 12);
      fill(ctx, C.ember);
      text(ctx, r, bx + 17, 326.5, 12, 700, "#1B0C06", "center");
    } else {
      text(ctx, r, bx + 17, 326.5, 12, 600, C.mute, "center");
    }
  });
  chart(ctx, 30, 352, PHONE.w - 70, 146, s.series, {
    labels: ["04", "07", "10", "13", "16"],
  });
  text(ctx, "180", PHONE.w - 30, 384, 10, 500, C.mute, "right");
  text(ctx, "70", PHONE.w - 30, 478, 10, 500, C.mute, "right");

  // Time in range card
  rr(ctx, 12, 548, PHONE.w - 24, 118, 24);
  fill(ctx, C.card);
  text(ctx, L.tir, 30, 580, 16, 600, C.text);
  text(ctx, "86%", PHONE.w - 30, 580, 16, 700, STATE_COLORS.range.text, "right");
  tirBar(ctx, 30, 596, PHONE.w - 60, 12, 4, 86, 10);
  const legend: Array<[string, string]> = [
    [`${L.low} 4%`, STATE_COLORS.low.text],
    [`${L.inRange} 86%`, STATE_COLORS.range.text],
    [`${L.high} 10%`, STATE_COLORS.high.text],
  ];
  let lx = 30;
  legend.forEach(([label, color]) => {
    ctx.beginPath();
    ctx.arc(lx + 4, 639, 3.5, 0, Math.PI * 2);
    fill(ctx, color);
    lx += text(ctx, label, lx + 12, 643.5, 12, 500, C.soft) + 28;
  });

  // Quick actions
  rr(ctx, 12, 680, (PHONE.w - 36) / 2, 52, 26);
  fill(ctx, C.card2);
  text(ctx, L.carbs, 12 + (PHONE.w - 36) / 4, 711, 15, 600, C.text, "center");
  rr(ctx, 24 + (PHONE.w - 36) / 2, 680, (PHONE.w - 36) / 2, 52, 26);
  fill(ctx, C.ember);
  text(ctx, L.insulin, 24 + ((PHONE.w - 36) * 3) / 4, 711, 15, 700, "#1B0C06", "center");

  // Tab bar
  rr(ctx, 16, 752, PHONE.w - 32, 64, 32);
  fill(ctx, "rgba(40,40,44,0.92)");
  L.tabs.forEach((tab, i) => {
    const cx = 16 + ((PHONE.w - 32) / 4) * (i + 0.5);
    const active = i === 0;
    const color = active ? C.ember : "rgba(235,235,245,0.55)";
    if (active) {
      rr(ctx, cx - 38, 758, 76, 52, 26);
      fill(ctx, "rgba(243,102,56,0.14)");
    }
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1.8;
    ctx.lineJoin = "round";
    ctx.beginPath();
    if (i === 0) {
      ctx.moveTo(cx - 9, 779);
      ctx.lineTo(cx, 771);
      ctx.lineTo(cx + 9, 779);
      ctx.lineTo(cx + 9, 789);
      ctx.lineTo(cx - 9, 789);
      ctx.closePath();
      ctx.fill();
    } else if (i === 1) {
      ctx.rect(cx - 8, 771, 16, 18);
      ctx.moveTo(cx - 4, 777);
      ctx.lineTo(cx + 4, 777);
      ctx.moveTo(cx - 4, 782);
      ctx.lineTo(cx + 4, 782);
      ctx.stroke();
    } else if (i === 2) {
      ctx.moveTo(cx - 9, 787);
      ctx.lineTo(cx - 3, 779);
      ctx.lineTo(cx + 2, 783);
      ctx.lineTo(cx + 9, 773);
      ctx.stroke();
    } else {
      ctx.arc(cx, 780, 7.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, 780, 2.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    text(ctx, tab, cx, 805, 10.5, 600, color, "center");
  });
  homeIndicator(ctx);
  void onReady;
}

function liveActivity(ctx: Ctx, s: DrawState, L: ScreenStrings, y: number, onReady?: () => void) {
  const st = STATE_COLORS[stateOf(s.value)];
  rr(ctx, 14, y, PHONE.w - 28, 156, 26);
  fill(ctx, "rgba(28,26,30,0.86)");
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.stroke();
  appIcon(ctx, 30, y + 18, 24, onReady);
  text(ctx, L.liveActivity, 62, y + 35, 14, 600, "rgba(255,255,255,0.75)");
  text(ctx, L.minAgo(1), PHONE.w - 30, y + 35, 12.5, 500, "rgba(255,255,255,0.5)", "right");

  // State capsule with the number
  rr(ctx, 30, y + 54, 138, 80, 22);
  const g = ctx.createLinearGradient(30, y + 54, 168, y + 134);
  g.addColorStop(0, st.deep);
  g.addColorStop(1, st.fill);
  fill(ctx, g);
  const w = text(ctx, `${s.value}`, 44, y + 112, 46, 700, "#FFFFFF", "left", ROUNDED);
  arrow(ctx, 44 + w + 20, y + 95, 26, s.trend, "#FFFFFF", 0.15);
  text(ctx, "mg/dL", 46, y + 128, 10.5, 600, "rgba(255,255,255,0.8)");

  chart(ctx, 186, y + 60, PHONE.w - 216, 66, s.series.slice(-37), {
    band: true,
    thresholds: true,
    width: 2,
    dot: true,
  });
}

function drawLock(ctx: Ctx, s: DrawState, L: ScreenStrings, onReady?: () => void) {
  wallpaper(ctx, PHONE.w, PHONE.h, "dusk");
  statusBar(ctx, s, { island: "compact" });
  lockClock(ctx, s, L);
  liveActivity(ctx, s, L, 560, onReady);
  lockButtons(ctx);
  homeIndicator(ctx);
}

function drawAlerts(ctx: Ctx, s: DrawState, L: ScreenStrings, onReady?: () => void) {
  wallpaper(ctx, PHONE.w, PHONE.h, "night");
  const night = new Date(s.now);
  night.setHours(3, 7, 0, 0);
  statusBar(ctx, s, { time: fmtTime(night, s.locale) });
  lockClock(ctx, s, L, night);

  const p = Math.max(0, Math.min(1, s.progress ?? 1));
  const unit = "mg/dL";
  const items = [
    { title: L.alertHigh, body: `212 ${unit}`, time: "23:12", color: STATE_COLORS.high.text, ring: null },
    { title: L.alertLow, body: `66 ${unit}`, time: s.locale === "en" ? "3:02" : "03:02", color: STATE_COLORS.low.text, ring: null },
    {
      title: `${L.alertVeryLow} · ${L.alarm}`,
      body: `53 ${unit}, ${L.actNow}`,
      time: L.now,
      color: STATE_COLORS.low.text,
      ring: "rgba(255,84,76,0.9)",
    },
  ];
  // Newest on top. Each new card slides down into the stack as p grows.
  const shown = p * items.length;
  const stackTop = 250;
  for (let i = 0; i < items.length; i++) {
    const age = shown - i; // how far this card has entered (0..1+)
    if (age <= 0) continue;
    const enter = Math.min(1, age);
    const newer = Math.max(0, Math.min(items.length - 1 - i, shown - i - 1));
    const y = stackTop + newer * 84 - (1 - enter) * 40;
    ctx.save();
    ctx.globalAlpha = enter;
    const it = items[i];
    notification(ctx, y, it.title, it.body, it.time, it.color, it.ring, onReady);
    ctx.restore();
  }

  // The night trace under the stack, quiet.
  ctx.save();
  ctx.globalAlpha = 0.85;
  rr(ctx, 14, 560, PHONE.w - 28, 150, 26);
  fill(ctx, "rgba(28,26,30,0.7)");
  ctx.restore();
  chart(ctx, 32, 584, PHONE.w - 64, 96, nightSeries(), { min: 30, max: 220, width: 2.2 });
  text(ctx, "00", 32, 700, 10, 500, C.mute);
  text(ctx, "03", PHONE.w / 2, 700, 10, 500, C.mute, "center");
  text(ctx, "06", PHONE.w - 32, 700, 10, 500, C.mute, "right");
  lockButtons(ctx);
  homeIndicator(ctx);
}

/** StandBy: drawn in landscape space and rotated into the portrait texture. */
function drawStandby(ctx: Ctx, s: DrawState, L: ScreenStrings) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, PHONE.w, PHONE.h);
  ctx.save();
  ctx.translate(0, PHONE.h);
  ctx.rotate(-Math.PI / 2);
  const W = PHONE.h;
  const H = PHONE.w;
  const st = STATE_COLORS[stateOf(s.value)];

  // Left widget: the number, huge
  rr(ctx, 36, 28, W / 2 - 54, H - 56, 34);
  fill(ctx, "#121214");
  ctx.save();
  ctx.shadowColor = st.fill + "66";
  ctx.shadowBlur = 40;
  const w = text(ctx, `${s.value}`, 70, 238, 180, 600, st.text, "left", ROUNDED);
  ctx.restore();
  arrow(ctx, 70 + w + 44, 172, 60, s.trend, st.text, 0.12);
  text(ctx, "mg/dL", 74, 290, 22, 600, C.soft);
  text(ctx, L.minAgo(1), 74, 324, 18, 500, C.mute);

  // Right widget: the last hours
  rr(ctx, W / 2 + 18, 28, W / 2 - 54, H - 56, 34);
  fill(ctx, "#121214");
  text(ctx, fmtTime(s.now, s.locale), W / 2 + 46, 84, 40, 600, C.text, "left", ROUNDED);
  chart(ctx, W / 2 + 46, 112, W / 2 - 110, 196, s.series.slice(-73), { width: 3.2, glow: true });
  ctx.restore();
}

function drawWatch(ctx: Ctx, s: DrawState, L: ScreenStrings) {
  const W = WATCH.w;
  const H = WATCH.h;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);
  const st = STATE_COLORS[stateOf(s.value)];
  text(ctx, "Dulce", 34, 52, 26, 600, C.ember);
  text(ctx, fmtTime(s.now, s.locale), W - 34, 52, 26, 600, C.text, "right");
  ctx.save();
  ctx.shadowColor = st.fill + "66";
  ctx.shadowBlur = 30;
  const w = text(ctx, `${s.value}`, 30, 196, 128, 600, st.text, "left", ROUNDED);
  ctx.restore();
  arrow(ctx, 30 + w + 38, 150, 50, s.trend, st.text, 0.13);
  const sign = s.delta > 0 ? "+" : "";
  text(ctx, `${sign}${s.delta} mg/dL`, 34, 238, 24, 500, C.soft);
  chart(ctx, 30, 270, W - 60, 120, s.series.slice(-49), { width: 4, glow: true, min: 50, max: 240 });
  text(ctx, L.now, 34, 424, 22, 500, C.mute);
}

function drawFollowers(ctx: Ctx, s: DrawState, L: ScreenStrings) {
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, PHONE.w, PHONE.h);
  statusBar(ctx, s);
  text(ctx, L.followers, 22, 112, 30, 700, C.text);
  text(ctx, L.followersSub, 22, 140, 14, 400, C.soft);

  rr(ctx, 12, 168, PHONE.w - 24, 92, 24);
  fill(ctx, C.card);
  ctx.beginPath();
  ctx.arc(46, 214, 18, 0, Math.PI * 2);
  fill(ctx, C.emberSoft);
  ctx.strokeStyle = C.ember;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(46, 206);
  ctx.lineTo(46, 222);
  ctx.moveTo(38, 214);
  ctx.lineTo(54, 214);
  ctx.stroke();
  text(ctx, L.invite, 78, 208, 16, 600, C.ember);
  text(ctx, L.inviteSub, 78, 230, 12.5, 400, C.soft);

  const people =
    s.locale === "es" ? ["Mamá", "Álex", "Dra. Vidal"] : s.locale === "de" ? ["Mama", "Alex", "Dr. Vogel"] : ["Mom", "Alex", "Dr. Vidal"];
  const colors = ["#F36638", "#5BA7F5", "#B58CF0"];
  people.forEach((name, i) => {
    const y = 280 + i * 92;
    rr(ctx, 12, y, PHONE.w - 24, 80, 24);
    fill(ctx, C.card);
    ctx.beginPath();
    ctx.arc(46, y + 40, 20, 0, Math.PI * 2);
    fill(ctx, colors[i]);
    text(ctx, name[0], 46, y + 46.5, 17, 700, "#FFF", "center");
    text(ctx, name, 78, y + 34, 16, 600, C.text);
    const tags = i === 2 ? [L.seesGlucose] : [L.seesGlucose, L.getsAlerts];
    let tx = 78;
    tags.forEach((tag) => {
      tx += pill(ctx, tx, y + 44, tag, C.ember, C.emberSoft, false) + 6;
    });
  });

  homeIndicator(ctx);
}

function drawLogbook(ctx: Ctx, s: DrawState, L: ScreenStrings) {
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, PHONE.w, PHONE.h);
  statusBar(ctx, s);
  text(ctx, L.logbook, 22, 112, 30, 700, C.text);
  text(ctx, L.last7, PHONE.w - 22, 108, 13, 600, C.ember, "right");

  const stats: Array<[string, string, string]> = [
    ["78%", L.tir, STATE_COLORS.range.text],
    ["142", `mg/dL ${L.average}`, C.text],
    [s.locale === "es" ? "6,7%" : s.locale === "de" ? "6,7 %" : "6.7%", L.gmi, C.text],
  ];
  stats.forEach(([v, label, color], i) => {
    const x = 12 + i * ((PHONE.w - 24) / 3 + 0);
    const w = (PHONE.w - 24) / 3 - 8;
    rr(ctx, x + (i ? 4 : 0), 132, w, 76, 20);
    fill(ctx, C.card);
    text(ctx, v, x + (i ? 4 : 0) + 16, 170, 24, 600, color);
    text(ctx, label, x + (i ? 4 : 0) + 16, 192, 11, 500, C.mute);
  });

  // Quick entry slider card
  rr(ctx, 12, 224, PHONE.w - 24, 176, 24);
  fill(ctx, C.card);
  text(ctx, L.insulin, 30, 256, 15, 600, C.text);
  text(ctx, s.locale === "en" ? "5.5" : "5,5", PHONE.w / 2 - 6, 318, 52, 300, C.text, "center");
  text(ctx, L.units, PHONE.w / 2 + 38, 318, 18, 500, C.soft);
  for (let i = 0; i <= 40; i++) {
    const x = 36 + i * ((PHONE.w - 72) / 40);
    const major = i % 5 === 0;
    ctx.fillStyle = major ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.22)";
    ctx.fillRect(x, major ? 340 : 346, 1.4, major ? 22 : 12);
  }
  rr(ctx, PHONE.w / 2 - 2, 334, 4, 34, 2);
  fill(ctx, C.ember);
  rr(ctx, 30, 376, PHONE.w - 60, 1, 0);
  fill(ctx, "rgba(0,0,0,0)");

  const kindColor = { insulin: C.ember, carbs: "#F5C46B", glucose: STATE_COLORS.range.text } as const;
  const kindLabel = { insulin: L.insulin, carbs: L.carbs, glucose: "Glucosa" } as const;
  L.entries.forEach((e, i) => {
    const y = 416 + i * 58;
    rr(ctx, 12, y, PHONE.w - 24, 50, 16);
    fill(ctx, C.card);
    ctx.beginPath();
    ctx.arc(34, y + 25, 5, 0, Math.PI * 2);
    fill(ctx, kindColor[e.kind]);
    text(ctx, e.time, 50, y + 30, 13, 500, C.mute);
    const label = e.kind === "glucose" && s.locale === "en" ? "Glucose" : kindLabel[e.kind];
    text(ctx, label, 118, y + 30, 14, 600, C.text);
    text(ctx, e.text, PHONE.w - 28, y + 30, 14, 500, C.soft, "right");
  });
  homeIndicator(ctx);
}

function drawTrends(ctx: Ctx, s: DrawState, L: ScreenStrings) {
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, PHONE.w, PHONE.h);
  statusBar(ctx, s);
  text(ctx, L.trends, 22, 112, 30, 700, C.text);
  ["7", "14", "30", "90"].forEach((d, i) => {
    const x = 22 + i * 86;
    const active = d === "14";
    rr(ctx, x, 132, 78, 32, 16);
    fill(ctx, active ? C.ember : C.card);
    text(ctx, `${d} ${L.days}`, x + 39, 153, 13, 700, active ? "#1B0C06" : C.soft, "center");
  });

  rr(ctx, 12, 180, PHONE.w - 24, 132, 24);
  fill(ctx, C.card);
  text(ctx, L.tir, 30, 212, 15, 600, C.text);
  text(ctx, L.tirTarget, PHONE.w - 30, 212, 12, 500, C.mute, "right");
  text(ctx, "81%", 30, 262, 46, 300, STATE_COLORS.range.text);
  tirBar(ctx, 30, 282, PHONE.w - 60, 12, 5, 81, 14);

  // Percentile band (a modal day), median line on top.
  rr(ctx, 12, 326, PHONE.w - 24, 246, 24);
  fill(ctx, C.card);
  const x0 = 30;
  const w = PHONE.w - 60;
  const y0 = 352;
  const h = 170;
  const py = (v: number) => y0 + h - ((v - 40) / 220) * h;
  ctx.fillStyle = "rgba(102,196,91,0.06)";
  ctx.fillRect(x0, py(HIGH), w, py(LOW) - py(HIGH));
  const N = 48;
  const median = Array.from({ length: N + 1 }, (_, i) => seriesFor((i / N) * 24, 0, 5)[0]);
  ctx.beginPath();
  median.forEach((v, i) => {
    const x = x0 + (i / N) * w;
    if (i === 0) ctx.moveTo(x, py(v + 38));
    else ctx.lineTo(x, py(v + 38));
  });
  for (let i = N; i >= 0; i--) ctx.lineTo(x0 + (i / N) * w, py(median[i] - 30));
  ctx.closePath();
  ctx.fillStyle = "rgba(102,196,91,0.2)";
  ctx.fill();
  ctx.beginPath();
  median.forEach((v, i) => {
    const x = x0 + (i / N) * w;
    if (i === 0) ctx.moveTo(x, py(v));
    else ctx.lineTo(x, py(v));
  });
  ctx.strokeStyle = STATE_COLORS.range.text;
  ctx.lineWidth = 2.4;
  ctx.stroke();
  ["00", "06", "12", "18", "24"].forEach((t, i) => text(ctx, t, x0 + (i / 4) * w, 548, 10, 500, C.mute, "center"));

  const parts: Array<[string, string]> = [
    [L.morning, "84%"],
    [L.afternoon, "73%"],
    [L.night, "88%"],
  ];
  parts.forEach(([label, v], i) => {
    const bw = (PHONE.w - 24 - 16) / 3;
    const x = 12 + i * (bw + 8);
    rr(ctx, x, 586, bw, 84, 20);
    fill(ctx, C.card);
    text(ctx, v, x + 16, 626, 24, 600, C.text);
    text(ctx, label, x + 16, 650, 12, 500, C.mute);
  });
  homeIndicator(ctx);
}

function drawHealth(ctx: Ctx, s: DrawState, L: ScreenStrings) {
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, PHONE.w, PHONE.h);
  statusBar(ctx, s);
  // Health heart tile
  rr(ctx, 22, 84, 64, 64, 16);
  fill(ctx, "#FFFFFF");
  ctx.fillStyle = "#FF375F";
  ctx.beginPath();
  ctx.moveTo(54, 133);
  ctx.bezierCurveTo(30, 117, 34, 96, 46, 96);
  ctx.bezierCurveTo(51, 96, 54, 100, 54, 104);
  ctx.bezierCurveTo(54, 100, 57, 96, 62, 96);
  ctx.bezierCurveTo(74, 96, 78, 117, 54, 133);
  ctx.fill();
  text(ctx, L.health, 22, 190, 30, 700, C.text);
  text(ctx, L.healthSub, 22, 216, 14, 400, C.soft);
  pill(ctx, 22, 236, `${L.readOnly} · ${L.connected}`, STATE_COLORS.range.text, "rgba(102,196,91,0.14)");

  L.healthRows.forEach((row, i) => {
    const y = 288 + i * 70;
    rr(ctx, 12, y, PHONE.w - 24, 60, 18);
    fill(ctx, C.card);
    text(ctx, row, 30, y + 36, 15.5, 500, C.text);
    rr(ctx, PHONE.w - 82, y + 15, 51, 31, 15.5);
    fill(ctx, "#34C759");
    ctx.beginPath();
    ctx.arc(PHONE.w - 46.5, y + 30.5, 13.5, 0, Math.PI * 2);
    fill(ctx, "#FFFFFF");
  });

  rr(ctx, 12, 520, PHONE.w - 24, 170, 24);
  fill(ctx, C.card);
  text(ctx, L.last12h, 30, 552, 15, 600, C.text);
  chart(ctx, 30, 572, PHONE.w - 60, 96, s.series, { width: 2.2 });
  homeIndicator(ctx);
}

function drawParentAlert(ctx: Ctx, s: DrawState, L: ScreenStrings, onReady?: () => void) {
  wallpaper(ctx, PHONE.w, PHONE.h, "night");
  const night = new Date(s.now);
  night.setHours(2, 48, 0, 0);
  statusBar(ctx, s, { time: fmtTime(night, s.locale) });
  lockClock(ctx, s, L, night);
  notification(
    ctx,
    258,
    L.followerAlert(L.parentName),
    `64 mg/dL · ${L.minAgo(2)}`,
    L.now,
    STATE_COLORS.low.text,
    null,
    onReady,
  );
  rr(ctx, 14, 560, PHONE.w - 28, 150, 26);
  fill(ctx, "rgba(28,26,30,0.7)");
  chart(ctx, 32, 584, PHONE.w - 64, 96, nightSeries().slice(0, 40), { min: 30, max: 220, width: 2.2 });
  lockButtons(ctx);
  homeIndicator(ctx);
}

function drawNudge(ctx: Ctx, s: DrawState, L: ScreenStrings, onReady?: () => void) {
  wallpaper(ctx, PHONE.w, PHONE.h, "dusk");
  statusBar(ctx, s, { island: "compact" });
  lockClock(ctx, s, L);
  const name = s.locale === "es" ? "Álex" : "Alex";
  notification(ctx, 258, L.nudgeFrom(name), L.nudgeText, L.now, C.ember, null, onReady);
  rr(ctx, 14, 344, 128, 38, 19);
  fill(ctx, C.ember);
  text(ctx, L.imOk, 78, 368, 15, 700, "#1B0C06", "center");
  liveActivity(ctx, s, L, 560, onReady);
  lockButtons(ctx);
  homeIndicator(ctx);
}

/** Two home-screen widgets on a dusk wallpaper. */
function drawWidgets(ctx: Ctx, s: DrawState, L: ScreenStrings) {
  wallpaper(ctx, PHONE.w, PHONE.h, "dusk");
  statusBar(ctx, s);
  const st = STATE_COLORS[stateOf(s.value)];
  // Small number widget
  rr(ctx, 24, 70, 164, 164, 32);
  fill(ctx, "rgba(20,20,22,0.92)");
  const w = text(ctx, `${s.value}`, 42, 160, 64, 600, st.text, "left", ROUNDED);
  arrow(ctx, 42 + w + 22, 138, 26, s.trend, st.text, 0.14);
  text(ctx, L.minAgo(1), 44, 208, 13, 500, C.mute);
  // Small chart widget
  rr(ctx, 205, 70, 164, 164, 32);
  fill(ctx, "rgba(20,20,22,0.92)");
  chart(ctx, 221, 94, 132, 104, s.series.slice(-49), { width: 2.4, labels: undefined });
  text(ctx, `${s.value} mg/dL`, 223, 216, 12, 600, C.soft);
  // Medium widget
  rr(ctx, 24, 252, PHONE.w - 48, 164, 32);
  fill(ctx, "rgba(20,20,22,0.92)");
  text(ctx, `${s.value}`, 44, 318, 44, 600, st.text, "left", ROUNDED);
  text(ctx, "mg/dL", 46, 342, 12, 600, C.soft);
  chart(ctx, 150, 278, PHONE.w - 196, 112, s.series, { width: 2.4 });
}

const RENDERERS: Record<ScreenName, (ctx: Ctx, s: DrawState, L: ScreenStrings, onReady?: () => void) => void> = {
  home: drawHome,
  lock: drawLock,
  alerts: drawAlerts,
  standby: drawStandby,
  followers: drawFollowers,
  logbook: drawLogbook,
  trends: drawTrends,
  health: drawHealth,
  parentAlert: drawParentAlert,
  nudge: drawNudge,
  watch: drawWatch,
  widgets: drawWidgets,
};

export function screenSize(name: ScreenName) {
  return name === "watch" ? WATCH : PHONE;
}

/**
 * Draws `name` into a canvas at `scale` pixels per point. `onReady` fires once
 * if an image (app icon, drop) finishes loading after this call, so the caller
 * can redraw with it.
 */
export function drawScreen(canvas: HTMLCanvasElement, name: ScreenName, s: DrawState, scale: number, onReady?: () => void) {
  const size = screenSize(name);
  const w = Math.round(size.w * scale);
  const h = Math.round(size.h * scale);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, size.w, size.h);
  RENDERERS[name](ctx, s, SCREEN_STRINGS[s.locale], onReady);
  // Preload the images the next frame will want.
  screenImage(ICON, onReady);
  screenImage(DROP, onReady);
}
