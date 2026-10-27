/**
 * Turns a RevenueCat Charts API v2 `chart_data` body into dates + series for
 * the dashboard's LineChart / BarChart.
 *
 * RC's published sample for this endpoint is a placeholder, so this accepts
 * the shapes the API is known to use: `values` as objects
 * (`{cohort|date, measure?, segment?, value}`) or as rows (`[time, v0, v1…]`),
 * with times in seconds, milliseconds or ISO strings. Measures and segments are
 * named from `measures[i].display_name` / `segments[i].display_name`.
 */

import type { Series } from "./charts";

export interface NormalizedChart {
  dates: string[];
  series: Series[];
  /** "$", "€", "%", "#" … from RC's y-axis. */
  unit: string | null;
  displayName: string | null;
}

type Named = { display_name?: string; name?: string; id?: string };

function day(t: unknown): string | null {
  if (typeof t === "number" && Number.isFinite(t)) {
    const ms = t < 1e12 ? t * 1000 : t;
    return new Date(ms).toISOString().slice(0, 10);
  }
  if (typeof t === "string" && t) {
    const d = new Date(t);
    return Number.isNaN(d.getTime()) ? t.slice(0, 10) : d.toISOString().slice(0, 10);
  }
  return null;
}

function nameOf(list: unknown, i: number, fallback: string): string {
  if (!Array.isArray(list)) return fallback;
  const n = list[i] as Named | undefined;
  return n?.display_name || n?.name || n?.id || fallback;
}

export function normalizeChart(raw: unknown): NormalizedChart | null {
  if (!raw || typeof raw !== "object") return null;
  const body = raw as Record<string, unknown>;
  const values = body.values;
  if (!Array.isArray(values)) return null;
  const unit = typeof body.yaxis === "string" ? body.yaxis : null;
  const displayName = typeof body.display_name === "string" ? body.display_name : null;

  // key → date → value
  const table = new Map<string, Map<string, number>>();
  const put = (key: string, d: string, v: number) => {
    if (!table.has(key)) table.set(key, new Map());
    const m = table.get(key)!;
    m.set(d, (m.get(d) ?? 0) + v);
  };

  for (const point of values) {
    if (Array.isArray(point)) {
      const d = day(point[0]);
      if (!d) continue;
      point.slice(1).forEach((v, i) => {
        if (typeof v === "number") put(nameOf(body.measures, i, `Series ${i + 1}`), d, v);
      });
      continue;
    }
    if (!point || typeof point !== "object") continue;
    const p = point as Record<string, unknown>;
    const d = day(p.cohort ?? p.date ?? p.x ?? p.timestamp ?? p.time);
    const v = typeof p.value === "number" ? p.value : typeof p.y === "number" ? p.y : null;
    if (!d || v === null) continue;
    let key: string;
    if (typeof p.segment === "number") key = nameOf(body.segments, p.segment, `Segment ${p.segment + 1}`);
    else if (typeof p.measure === "number") key = nameOf(body.measures, p.measure, `Series ${p.measure + 1}`);
    else key = displayName ?? "Value";
    // With both measure and segment, keep only the first measure per segment.
    if (typeof p.segment === "number" && typeof p.measure === "number" && p.measure !== 0) continue;
    put(key, d, v);
  }

  const dates = [...new Set([...table.values()].flatMap((m) => [...m.keys()]))].sort();
  const series = [...table.entries()].map(([label, m]) => ({
    label,
    values: dates.map((d) => Math.round((m.get(d) ?? 0) * 100) / 100),
  }));
  return { dates, series, unit, displayName };
}

/** The series whose name matches (case-insensitive), else the first one. */
export function pickSeries(chart: NormalizedChart | null, match?: RegExp): Series | null {
  if (!chart || !chart.series.length) return null;
  return (match ? chart.series.find((s) => match.test(s.label)) : null) ?? chart.series[0]!;
}
