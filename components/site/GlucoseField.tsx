"use client";

import { useEffect, useRef } from "react";
import { HIGH, LOW, STATE_COLORS, dayCurve, stateOf } from "@/components/screens/glucose";
import { prefersReducedMotion } from "@/components/motion/gsap";

const N = 2600; // 5-minute readings, about nine days
const STEP_MIN = 5;
const MIN_V = 40;
const MAX_V = 280;

function gauss(x: number, mu: number, s: number) {
  return Math.exp(-((x - mu) ** 2) / (2 * s * s));
}

/**
 * The page's background is a CGM chart. Scrolling moves through time: the
 * trace advances, readings land at the "now" cursor, the range corridor
 * (70 to 180) runs across the whole page. Story beats are written into the
 * data where the page tells them: a low that dips red behind the alerts
 * chapter, an after-meal high behind "your day". Synthetic, like every
 * glucose number on the page.
 */
export function GlucoseField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = prefersReducedMotion();
    // Canvas fonts can't read CSS variables: use the body's resolved stack.
    const family = getComputedStyle(document.body).fontFamily || "system-ui, sans-serif";

    let W = 0;
    let H = 0;
    let dpr = 1;
    let series = new Float32Array(N);
    let windowPts = 84;
    let raf = 0;
    let current = 0; // smoothed index at the cursor
    const t0 = performance.now();
    let lastPulse = 0;

    const scrollP = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      return max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    };

    const START = 220;
    const indexAt = (p: number) => START + p * (N - START - 40);

    const sectionP = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const max = document.documentElement.scrollHeight - innerHeight;
      const mid = el.offsetTop + el.offsetHeight / 2 - innerHeight / 2;
      return max > 0 ? Math.min(1, Math.max(0, mid / max)) : null;
    };

    const build = () => {
      const s = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        const h = ((i * STEP_MIN) / 60) % 24;
        s[i] = dayCurve(h) + 5 * Math.sin(i * 0.37) + 3 * Math.sin(i * 1.13);
      }
      // The alerts chapter: a night low that crosses below 70, then recovers.
      const pa = sectionP("alerts");
      if (pa !== null) {
        const c = indexAt(pa) - 4;
        for (let i = 0; i < N; i++) s[i] -= 70 * gauss(i, c, 9);
      }
      // "Your day": an after-meal high above 180.
      const pd = sectionP("your-day");
      if (pd !== null) {
        const c = indexAt(pd) - 6;
        for (let i = 0; i < N; i++) s[i] += 75 * gauss(i, c, 11);
      }
      series = s;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = innerWidth;
      H = innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      windowPts = W < 768 ? 48 : W < 1280 ? 72 : 90;
      build();
      if (reduce) draw(performance.now());
    };

    const valueAt = (f: number) => {
      const i = Math.max(0, Math.min(N - 2, Math.floor(f)));
      const k = f - i;
      return series[i] * (1 - k) + series[i + 1] * k;
    };

    function draw(now: number) {
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const small = W < 768;
      const top = H * (small ? 0.46 : 0.4);
      const bottom = H * (small ? 0.84 : 0.86);
      const y = (v: number) => bottom - ((Math.min(MAX_V, Math.max(MIN_V, v)) - MIN_V) / (MAX_V - MIN_V)) * (bottom - top);
      const nowX = W * (small ? 0.7 : 0.76);
      const px = W / windowPts;

      // Live crawl: a reading every few seconds even without scrolling.
      const live = reduce ? 0 : (now - t0) / 4000;
      const target = indexAt(reduce ? 0.02 : scrollP()) + live;
      current += (target - current) * (reduce ? 1 : 0.08);
      if (Math.abs(target - current) < 0.001) current = target;

      // Range corridor and thresholds.
      ctx.fillStyle = "rgba(102,196,91,0.045)";
      ctx.fillRect(0, y(HIGH), W, y(LOW) - y(HIGH));
      ctx.setLineDash([3, 7]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255,240,230,0.08)";
      for (const v of [LOW, HIGH]) {
        ctx.beginPath();
        ctx.moveTo(0, Math.round(y(v)) + 0.5);
        ctx.lineTo(W, Math.round(y(v)) + 0.5);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.font = `500 11px ${family}`;
      ctx.fillStyle = "rgba(207,198,189,0.32)";
      ctx.textAlign = "right";
      ctx.fillText("180", W - 14, y(HIGH) - 6);
      ctx.fillText("70", W - 14, y(LOW) - 6);

      // Hour grid with labels that slide with time.
      const first = Math.floor(current - (nowX / px)) - 1;
      const last = Math.ceil(current + (W - nowX) / px) + 1;
      ctx.textAlign = "center";
      for (let i = Math.ceil(first / 12) * 12; i <= last; i += 12) {
        const x = nowX - (current - i) * px;
        ctx.fillStyle = "rgba(255,240,230,0.035)";
        ctx.fillRect(Math.round(x), top - 10, 1, bottom - top + 20);
        const hour = Math.floor(((i * STEP_MIN) / 60) % 24);
        ctx.fillStyle = "rgba(207,198,189,0.26)";
        ctx.fillText(`${String(hour).padStart(2, "0")}:00`, x, bottom + 22);
      }

      // The trace up to now, coloured by state, in a glow pass and a core pass.
      const from = Math.max(0, first);
      const to = Math.min(N - 2, Math.floor(current));
      const pass = (width: number, alpha: number) => {
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        let runState = stateOf(series[from]);
        ctx.beginPath();
        ctx.moveTo(nowX - (current - from) * px, y(series[from]));
        const flush = (state: ReturnType<typeof stateOf>) => {
          ctx.strokeStyle = hexA(STATE_COLORS[state].fill, alpha);
          ctx.stroke();
        };
        for (let i = from + 1; i <= to + 1; i++) {
          const isLast = i === to + 1;
          const v = isLast ? valueAt(current) : series[i];
          const x = isLast ? nowX : nowX - (current - i) * px;
          const st = stateOf((v + series[i - 1]) / 2);
          if (st !== runState) {
            ctx.lineTo(x, y(v));
            flush(runState);
            ctx.beginPath();
            ctx.moveTo(x, y(v));
            runState = st;
          } else {
            ctx.lineTo(x, y(v));
          }
        }
        flush(runState);
      };
      pass(10, 0.06);
      pass(2, 0.42);

      // The cursor: hairline, dot, pulse and the reading.
      const v = valueAt(current);
      const st = STATE_COLORS[stateOf(v)];
      const g = ctx.createLinearGradient(0, top - 40, 0, bottom + 10);
      g.addColorStop(0, "rgba(255,240,230,0)");
      g.addColorStop(0.5, "rgba(255,240,230,0.1)");
      g.addColorStop(1, "rgba(255,240,230,0)");
      ctx.fillStyle = g;
      ctx.fillRect(Math.round(nowX), top - 40, 1, bottom - top + 50);

      if (!reduce && now - lastPulse > 1800) lastPulse = now;
      const k = reduce ? 1 : Math.min(1, (now - lastPulse) / 1400);
      ctx.beginPath();
      ctx.arc(nowX, y(v), 6 + k * 22, 0, Math.PI * 2);
      ctx.strokeStyle = hexA(st.text, 0.35 * (1 - k));
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(nowX, y(v), 4.5, 0, Math.PI * 2);
      ctx.fillStyle = hexA(st.text, 0.85);
      ctx.fill();

      ctx.textAlign = "left";
      ctx.font = `600 18px ${family}`;
      ctx.fillStyle = hexA(st.text, 0.6);
      ctx.fillText(String(Math.round(v)), nowX + 14, y(v) - 10);
      ctx.font = `500 10px ${family}`;
      ctx.fillStyle = "rgba(207,198,189,0.4)";
      ctx.fillText("mg/dL", nowX + 14, y(v) + 6);
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      draw(now);
    };

    resize();
    window.addEventListener("resize", resize);
    // Section positions settle after fonts and the 3D stage mount.
    const rebuild = window.setTimeout(build, 1200);
    if (!reduce) raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(rebuild);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}

function hexA(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
