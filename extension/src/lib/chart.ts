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

/** The value range shown: at least 40–300 mg/dL, wider when readings are outside it. */
export function yRange(points: Point[]): { lo: number; hi: number } {
  let lo = 40;
  let hi = 300;
  for (const p of points) {
    if (p.v < lo) lo = Math.floor(p.v / 10) * 10;
    if (p.v > hi) hi = Math.ceil(p.v / 50) * 50;
  }
  return { lo, hi };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

export function chartSvg(c: ChartInput): string {
  const { width: w, height: h } = c;
  const padR = 26; // room for the line labels on the right
  const padY = 6;
  const plotW = w - padR;
  const points = pointsOf(c.values, c.stepSec, c.endAt, c.hours);
  const { lo, hi } = yRange(points);
  const start = c.endAt - c.hours * 3600_000;
  const x = (t: number) => r1(((t - start) / (c.endAt - start)) * (plotW - 4) + 2);
  const y = (v: number) => r1(padY + (1 - (Math.min(Math.max(v, lo), hi) - lo) / (hi - lo)) * (h - 2 * padY));
  const zl = c.zoneLow ?? ZONE_LOW;
  const zh = c.zoneHigh ?? ZONE_HIGH;
  const parts: string[] = [];

  // Target band (the person's target range).
  const tl = c.targetLow ?? zl;
  const th = c.targetHigh ?? zh;
  parts.push(`<rect x="0" y="${y(th)}" width="${plotW}" height="${r1(y(tl) - y(th))}" fill="${COLORS.range}" opacity="0.12" rx="3"/>`);

  // Low and high limit lines, labelled on the right.
  const line = (v: number, color: string) => {
    parts.push(`<line x1="0" x2="${plotW}" y1="${y(v)}" y2="${y(v)}" stroke="${color}" stroke-width="1" stroke-dasharray="3 3" opacity="0.7"/>`);
    parts.push(`<text x="${w - 2}" y="${r1(y(v) + 3.5)}" text-anchor="end" font-size="10" fill="${color}">${formatValue(v, c.unit, c.locale)}</text>`);
  };
  line(c.lowLine ?? zl, COLORS.low);
  line(c.highLine ?? zh, COLORS.high);

  // The trace: a line per run between gaps, dots coloured by zone.
  for (const run of splitAtChartGaps(points)) {
    if (run.length > 1) {
      const d = run.map((p, i) => `${i ? 'L' : 'M'}${x(p.t)} ${y(p.v)}`).join('');
      parts.push(`<path d="${d}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" opacity="0.35"/>`);
    }
  }
  points.forEach((p, i) => {
    const last = i === points.length - 1;
    parts.push(`<circle cx="${x(p.t)}" cy="${y(p.v)}" r="${last ? 3.5 : 1.8}" fill="${COLORS[zoneOf(p.v, zl, zh)]}"/>`);
  });

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
