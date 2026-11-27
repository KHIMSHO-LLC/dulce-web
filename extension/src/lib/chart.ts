/**
 * The popup chart as an SVG string. Pure (test/chart.test.ts). Every value
 * that goes into the markup is a number or a fixed colour, so it is safe to
 * set as innerHTML.
 */

import { splitAtChartGaps } from './chartGaps';
import { COLORS, ZONE_HIGH, ZONE_LOW, formatValue, zoneOf } from './display';
import type { Unit } from './relay';

export interface ChartInput {
  /** 5-minute slots, oldest → newest, the last one = the latest reading; 0 = none. */
  values: number[];
  stepSec: number;
  /** Local time of the newest slot's reading. */
  endAt: number;
  hours: number;
  unit: Unit;
  locale: string;
  targetLow?: number;
  targetHigh?: number;
  lowLine?: number;
  highLine?: number;
  zoneLow?: number;
  zoneHigh?: number;
  width: number;
  height: number;
  /** Only for tests; the popup uses the computer's time zone. */
  timeZone?: string;
}

export interface Point {
  t: number;
  v: number;
}

/** Slots → points with local times, newest last; empty slots dropped. */
export function pointsOf(values: number[], stepSec: number, endAt: number, hours: number): Point[] {
  const keep = Math.round((hours * 3600) / stepSec);
  const from = Math.max(0, values.length - keep);
  const out: Point[] = [];
  for (let i = from; i < values.length; i++) {
    const v = values[i]!;
    if (v > 0) out.push({ t: endAt - (values.length - 1 - i) * stepSec * 1000, v });
  }
  return out;
}

/** The value range shown: at least 50–220 mg/dL, wider when readings are outside it. */
export function yRange(points: Point[]): { lo: number; hi: number } {
  let lo = 50;
  let hi = 220;
  for (const p of points) {
    if (p.v < lo) lo = Math.floor(p.v / 10) * 10;
    if (p.v > hi) hi = Math.ceil(p.v / 50) * 50;
  }
  return { lo, hi };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/**
 * A smooth path through the points that never overshoots them (monotone
 * cubic, like d3's curveMonotoneX): peaks and dips stay exactly at the
 * readings, the curve only rounds the corners between them.
 */
export function smoothPath(pts: { x: number; y: number }[]): string {
  const n = pts.length;
  if (n === 0) return '';
  if (n === 1) return `M${r1(pts[0]!.x)} ${r1(pts[0]!.y)}`;
  if (n === 2) return `M${r1(pts[0]!.x)} ${r1(pts[0]!.y)}L${r1(pts[1]!.x)} ${r1(pts[1]!.y)}`;
  const sign = (v: number) => (v < 0 ? -1 : 1);
  const slope = (i: number) => {
    const h = pts[i + 1]!.x - pts[i]!.x;
    return h ? (pts[i + 1]!.y - pts[i]!.y) / h : 0;
  };
  // Tangent at every point.
  const tan: number[] = new Array(n).fill(0);
  for (let i = 1; i < n - 1; i++) {
    const h0 = pts[i]!.x - pts[i - 1]!.x;
    const h1 = pts[i + 1]!.x - pts[i]!.x;
    const s0 = slope(i - 1);
    const s1 = slope(i);
    const p = h0 + h1 ? (s0 * h1 + s1 * h0) / (h0 + h1) : 0;
    tan[i] = (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
  }
  tan[0] = (3 * slope(0) - tan[1]!) / 2;
  tan[n - 1] = (3 * slope(n - 2) - tan[n - 2]!) / 2;
  let d = `M${r1(pts[0]!.x)} ${r1(pts[0]!.y)}`;
  for (let i = 0; i < n - 1; i++) {
    const a = pts[i]!;
    const b = pts[i + 1]!;
    const k = (b.x - a.x) / 3;
    d += `C${r1(a.x + k)} ${r1(a.y + tan[i]! * k)} ${r1(b.x - k)} ${r1(b.y - tan[i + 1]! * k)} ${r1(b.x)} ${r1(b.y)}`;
  }
  return d;
}

/** Hour marks for the time axis: every 1 h (3 h chart), 2 h (6 h) or 3 h (12 h). */
export function hourTicks(start: number, end: number, hours: number, timeZone?: string): number[] {
  const every = hours <= 3 ? 1 : hours <= 6 ? 2 : 3;
  // The local hour of `start`, via Intl so a given timeZone (tests) is honoured.
  const parts = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: 'numeric', hourCycle: 'h23', timeZone }).formatToParts(start);
  const hh = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
  const mm = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  const firstWhole = start + ((60 - mm) % 60) * 60_000 - (new Date(start).getSeconds() * 1000 + new Date(start).getMilliseconds());
  const firstHour = mm === 0 ? hh : (hh + 1) % 24;
  const out: number[] = [];
  for (let t = firstWhole, h = firstHour; t <= end; t += 3600_000, h = (h + 1) % 24) {
    if (h % every === 0) out.push(t);
  }
  return out;
}

/** "3 PM" where the clock is 12-hour, "15:00" where it is 24-hour. */
function timeFormat(locale: string, timeZone?: string): Intl.DateTimeFormat {
  const h12 = new Intl.DateTimeFormat(locale, { hour: 'numeric' }).resolvedOptions().hourCycle;
  return h12 === 'h11' || h12 === 'h12'
    ? new Intl.DateTimeFormat(locale, { hour: 'numeric', timeZone })
    : new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone });
}

const esc = (s: string) => s.replace(/[<>&"]/g, '');

export function chartSvg(c: ChartInput): string {
  const { width: w, height: h } = c;
  const padR = 28; // room for the limit labels on the right
  const padT = 8;
  const axisH = 16; // time labels under the plot
  const plotW = w - padR;
  const plotB = h - axisH; // bottom of the plot area
  const points = pointsOf(c.values, c.stepSec, c.endAt, c.hours);
  const { lo, hi } = yRange(points);
  const start = c.endAt - c.hours * 3600_000;
  const x = (t: number) => r1(((t - start) / (c.endAt - start)) * (plotW - 10) + 4);
  const y = (v: number) => r1(padT + (1 - (Math.min(Math.max(v, lo), hi) - lo) / (hi - lo)) * (plotB - padT - 4));
  const zl = c.zoneLow ?? ZONE_LOW;
  const zh = c.zoneHigh ?? ZONE_HIGH;
  const parts: string[] = [];

  // Colour by zone along the height: high colour above the high line, low
  // colour below the low line, in-range colour between (hard stops).
  const gTop = y(hi);
  const gBot = y(lo);
  const at = (v: number) => r1(Math.min(1, Math.max(0, (y(v) - gTop) / (gBot - gTop || 1))));
  // The fill under the line fades out by the low line, so it never tints the area below it.
  const fadeEnd = y(c.lowLine ?? zl);
  const zoneStops =
    `<stop offset="0" stop-color="${COLORS.high}"/><stop offset="${at(zh)}" stop-color="${COLORS.high}"/>` +
    `<stop offset="${at(zh)}" stop-color="${COLORS.range}"/><stop offset="${at(zl)}" stop-color="${COLORS.range}"/>` +
    `<stop offset="${at(zl)}" stop-color="${COLORS.low}"/><stop offset="1" stop-color="${COLORS.low}"/>`;
  parts.push(
    '<defs>' +
      `<linearGradient id="dl-zone" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="${gTop}" y2="${gBot}">${zoneStops}</linearGradient>` +
      `<linearGradient id="dl-fade" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.32"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>` +
      `<mask id="dl-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}"><rect x="0" y="${padT}" width="${plotW}" height="${r1(Math.max(0, fadeEnd - padT))}" fill="url(#dl-fade)"/></mask>` +
      '</defs>',
  );

  // Target band (the person's target range), very soft.
  const tl = c.targetLow ?? zl;
  const th = c.targetHigh ?? zh;
  parts.push(`<rect x="0" y="${y(th)}" width="${plotW}" height="${r1(y(tl) - y(th))}" fill="${COLORS.range}" opacity="0.07" rx="6"/>`);

  // Low and high limit lines, labelled on the right.
  const line = (v: number, color: string) => {
    parts.push(`<line x1="0" x2="${plotW}" y1="${y(v)}" y2="${y(v)}" stroke="${color}" stroke-width="1" stroke-dasharray="2 4" stroke-linecap="round" opacity="0.55"/>`);
    parts.push(`<text x="${w - 2}" y="${r1(y(v) + 3.5)}" text-anchor="end" font-size="10" font-weight="600" fill="${color}" opacity="0.9">${formatValue(v, c.unit, c.locale)}</text>`);
  };
  line(c.lowLine ?? zl, COLORS.low);
  line(c.highLine ?? zh, COLORS.high);

  // Time axis: faint hour marks with labels.
  const fmt = timeFormat(c.locale, c.timeZone);
  for (const t of hourTicks(start, c.endAt, c.hours, c.timeZone)) {
    const tx = x(t);
    if (tx < 14 || tx > plotW - 14) continue;
    parts.push(`<text class="tick" x="${tx}" y="${h - 3}" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.5">${esc(fmt.format(t))}</text>`);
  }

  // The trace: one smooth line per run between gaps, with a soft fill under it.
  for (const run of splitAtChartGaps(points)) {
    const pts = run.map((p) => ({ x: x(p.t), y: y(p.v) }));
    if (pts.length === 1) {
      parts.push(`<circle cx="${pts[0]!.x}" cy="${pts[0]!.y}" r="2" fill="url(#dl-zone)"/>`);
      continue;
    }
    const d = smoothPath(pts);
    const first = pts[0]!;
    const last = pts[pts.length - 1]!;
    parts.push(`<path class="area" d="${d}L${last.x} ${plotB}L${first.x} ${plotB}Z" fill="url(#dl-zone)" mask="url(#dl-mask)"/>`);
    parts.push(`<path class="line" d="${d}" fill="none" stroke="url(#dl-zone)" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>`);
  }

  // The latest reading: a dot with a soft halo.
  const lastP = points[points.length - 1];
  if (lastP) {
    const color = COLORS[zoneOf(lastP.v, zl, zh)];
    const cx = x(lastP.t);
    const cy = y(lastP.v);
    parts.push(`<circle cx="${cx}" cy="${cy}" r="7" fill="${color}" opacity="0.18"/>`);
    parts.push(`<circle class="now" cx="${cx}" cy="${cy}" r="3.5" fill="${color}" stroke="var(--bg, #fff)" stroke-width="1.5"/>`);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">${parts.join('')}</svg>`;
}

/** The link code's QR as an SVG string (rows of "1"/"0" from the relay). */
export function qrSvg(rows: string[], size: number): string {
  const n = rows.length;
  if (!n) return '';
  const quiet = 2;
  const cells = n + quiet * 2;
  let d = '';
  rows.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) if (row[c] === '1') d += `M${c + quiet} ${r + quiet}h1v1h-1z`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cells} ${cells}" width="${size}" height="${size}" shape-rendering="crispEdges"><rect width="${cells}" height="${cells}" fill="#fff"/><path d="${d}" fill="#000"/></svg>`;
}
