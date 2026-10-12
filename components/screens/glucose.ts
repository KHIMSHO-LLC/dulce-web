/**
 * Synthetic glucose for the depicted screens. Every number the page shows
 * inside a device comes from here and is labelled as sample data in the
 * footer. Deterministic so server and client agree on first paint.
 */

export const LOW = 70;
export const HIGH = 180;

export type GlucoseState = "low" | "range" | "high";

export function stateOf(v: number): GlucoseState {
  if (v < LOW) return "low";
  if (v > HIGH) return "high";
  return "range";
}

/** Fill / text-on-dark colours per state, shared with the CSS tokens. */
export const STATE_COLORS: Record<GlucoseState, { fill: string; text: string; deep: string }> = {
  range: { fill: "#66C45B", text: "#7FD970", deep: "#2E7D32" },
  high: { fill: "#F5A524", text: "#FFB638", deep: "#B45309" },
  low: { fill: "#E8262B", text: "#FF544C", deep: "#A91E22" },
};

function gauss(x: number, mu: number, sigma: number) {
  return Math.exp(-((x - mu) ** 2) / (2 * sigma * sigma));
}

/**
 * A believable day: overnight drift, a breakfast and a lunch rise with the
 * correction coming down, one mild afternoon high. `hours` is 0..24.
 */
export function dayCurve(hours: number): number {
  const base = 112 + 9 * Math.sin((hours / 24) * Math.PI * 2 + 0.6);
  const breakfast = 62 * gauss(hours, 8.6, 0.75);
  const lunch = 84 * gauss(hours, 14.2, 0.95);
  const afternoon = 30 * gauss(hours, 17.3, 0.8);
  const dinnerDip = -22 * gauss(hours, 19.6, 0.7);
  const wobble = 4 * Math.sin(hours * 5.3) + 3 * Math.sin(hours * 11.7 + 1.3);
  return base + breakfast + lunch + afternoon + dinnerDip + wobble;
}

/** Readings every 5 minutes covering the last `hours` hours, ending at `endHour`. */
export function seriesFor(endHour: number, hours: number, stepMin = 5): number[] {
  const n = Math.round((hours * 60) / stepMin) + 1;
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const h = endHour - hours + (i * stepMin) / 60;
    out.push(Math.round(dayCurve(((h % 24) + 24) % 24)));
  }
  return out;
}

/** A night with a low: the story the alerts screen tells. */
export function nightSeries(): number[] {
  const out: number[] = [];
  for (let i = 0; i <= 72; i++) {
    const h = i / 12; // 0..6 hours after midnight
    const v = 132 - 22 * h + 3.2 * h * h + 5 * Math.sin(h * 4.1);
    out.push(Math.round(v - 58 * gauss(h, 3.1, 0.55)));
  }
  return out;
}

/**
 * Live model behind the hero phone: a gentle random walk that stays mostly in
 * range, so the screen visibly ticks without ever dramatising.
 */
export class LiveGlucose {
  value: number;
  trend = 1.2;
  series: number[];
  private seed = 7;

  constructor() {
    this.series = seriesFor(16.4, 12);
    this.value = this.series[this.series.length - 1];
  }

  private rand() {
    // xorshift: deterministic, cheap
    let x = this.seed;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    this.seed = x >>> 0;
    return (this.seed % 1000) / 1000;
  }

  tick() {
    const pull = (118 - this.value) * 0.06;
    this.trend = Math.max(-3, Math.min(3, this.trend * 0.6 + pull + (this.rand() - 0.5) * 2.4));
    this.value = Math.round(Math.max(88, Math.min(168, this.value + this.trend)));
    this.series = [...this.series.slice(1), this.value];
    return this.value;
  }

  /** Change since the previous reading, for the "+2 change" readout. */
  get delta() {
    const s = this.series;
    return s[s.length - 1] - s[s.length - 2];
  }
}
