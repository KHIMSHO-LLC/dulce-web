"use client";

/**
 * Chart primitives for the Usage tab. Hand-rolled SVG rather than a charting
 * dependency: two forms cover everything here, and they inherit the site's
 * tokens directly instead of fighting a library's theme layer.
 *
 * Palette: terracotta / blue / green, validated for colorblind separation
 * against the white card surface. Green↔blue sit at tritan ΔE 6.0, which is
 * only legal with a secondary encoding — hence every series is BOTH legend-
 * chipped and direct-labelled at its last point. Don't add a fourth series
 * without re-validating.
 *
 * SVG uses a fixed coordinate space scaled by the container; strokes carry
 * `vector-effect="non-scaling-stroke"` so they stay 2px at any width, and all
 * text lives in HTML around the plot rather than inside it, so nothing scales
 * to an unreadable size.
 */

import { useState } from "react";

export const SERIES_COLORS = ["#C2410C", "#1D4ED8", "#2E7D32"] as const;

const VB_W = 600;
const GRID_LINES = 4;

/** Round up to the next "nice" axis top. The fine step ladder matters: a
 *  plain power-of-ten ceiling turns a max of 12 into an axis of 20, which
 *  squashes the actual line into the bottom half of the plot. */
function niceMax(value: number): number {
  if (value <= 5) return Math.max(1, Math.ceil(value));
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const normalized = value / magnitude;
  const step = [1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((s) => normalized <= s) ?? 10;
  // Every series here is a device count, so the axis top must be a whole
  // number — `max 12.5` would be nonsense on a people-counting chart.
  return Math.ceil(step * magnitude);
}

function shortDate(iso: string): string {
  // `2026-07-23` → `23 Jul`, without constructing a Date (these are plain UTC
  // day strings; new Date() would drag local-timezone shifting into it).
  const [, month, day] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${Number(day)} ${months[Number(month) - 1] ?? ""}`;
}

export interface Series {
  label: string;
  /** One value per point, aligned with `dates`. */
  values: number[];
}

/** Shared hover state: which index the pointer is nearest, or null. */
function useHoverIndex(count: number) {
  const [index, setIndex] = useState<number | null>(null);
  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || count === 0) return;
    const fraction = (e.clientX - rect.left) / rect.width;
    setIndex(Math.min(count - 1, Math.max(0, Math.round(fraction * (count - 1)))));
  }
  return { index, onMove, onLeave: () => setIndex(null) };
}

function Tooltip({
  index,
  count,
  children,
}: {
  index: number;
  count: number;
  children: React.ReactNode;
}) {
  // Clamp the anchor so the card never hangs off either edge of the plot.
  const left = count <= 1 ? 50 : (index / (count - 1)) * 100;
  return (
    <div
      className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-[var(--radius-badge)] border border-border-subtle bg-card px-3 py-2 shadow-[var(--shadow-card-rest)]"
      style={{ left: `clamp(4rem, ${left}%, calc(100% - 4rem))` }}
    >
      {children}
    </div>
  );
}

export function LineChart({
  dates,
  series,
  height = 200,
  emptyMessage = "No data yet.",
}: {
  dates: string[];
  series: Series[];
  height?: number;
  emptyMessage?: string;
}) {
  const hover = useHoverIndex(dates.length);

  if (dates.length < 2) {
    return (
      <div className="flex h-40 items-center justify-center text-label text-muted">
        {emptyMessage}
      </div>
    );
  }

  const max = niceMax(Math.max(1, ...series.flatMap((s) => s.values)));
  const x = (i: number) => (i / (dates.length - 1)) * VB_W;
  const y = (v: number) => height - (v / max) * height;

  return (
    <div>
      <div
        className="relative touch-none"
        onPointerMove={hover.onMove}
        onPointerLeave={hover.onLeave}
      >
        <svg
          viewBox={`0 0 ${VB_W} ${height}`}
          preserveAspectRatio="none"
          className="w-full"
          style={{ height }}
          role="img"
          aria-label={`Trend: ${series.map((s) => s.label).join(", ")}`}
        >
          {Array.from({ length: GRID_LINES + 1 }, (_, i) => {
            const gy = (i / GRID_LINES) * height;
            return (
              <line
                key={i}
                x1={0}
                x2={VB_W}
                y1={gy}
                y2={gy}
                stroke="var(--color-border-subtle)"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}

          {hover.index !== null ? (
            <line
              x1={x(hover.index)}
              x2={x(hover.index)}
              y1={0}
              y2={height}
              stroke="var(--color-muted)"
              strokeWidth={1}
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
            />
          ) : null}

          {series.map((s, si) => (
            <polyline
              key={s.label}
              points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ")}
              fill="none"
              stroke={SERIES_COLORS[si % SERIES_COLORS.length]}
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}

        </svg>

        {/* Hover markers live in HTML, not the SVG: the plot is drawn with
            preserveAspectRatio="none", so an SVG circle would render as a
            squashed ellipse at any container width but 600px. */}
        {hover.index !== null
          ? series.map((s, si) => (
              <span
                key={s.label}
                aria-hidden
                className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[var(--color-card)]"
                style={{
                  left: `${(hover.index! / (dates.length - 1)) * 100}%`,
                  top: y(s.values[hover.index!] ?? 0),
                  background: SERIES_COLORS[si % SERIES_COLORS.length],
                }}
              />
            ))
          : null}

        {hover.index !== null ? (
          <Tooltip index={hover.index} count={dates.length}>
            <p className="text-caption font-semibold text-foreground">
              {shortDate(dates[hover.index]!)}
            </p>
            {series.map((s, si) => (
              <p key={s.label} className="mt-0.5 flex items-center gap-1.5 text-caption text-muted">
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: SERIES_COLORS[si % SERIES_COLORS.length] }}
                />
                {s.label}
                <span className="ml-auto font-semibold tabular-nums text-foreground">
                  {s.values[hover.index!]}
                </span>
              </p>
            ))}
          </Tooltip>
        ) : null}
      </div>

      <div className="mt-1 flex justify-between text-caption text-muted">
        <span>{shortDate(dates[0]!)}</span>
        <span>max {max}</span>
        <span>{shortDate(dates[dates.length - 1]!)}</span>
      </div>

      {/* Legend + direct end-values: identity is never carried by colour alone. */}
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {series.map((s, si) => (
          <span key={s.label} className="flex items-center gap-1.5 text-caption text-muted">
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: SERIES_COLORS[si % SERIES_COLORS.length] }}
            />
            {s.label}
            <span className="font-semibold tabular-nums text-foreground">
              {s.values[s.values.length - 1]}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function BarChart({
  dates,
  values,
  color = SERIES_COLORS[0],
  height = 96,
  label,
}: {
  dates: string[];
  values: number[];
  color?: string;
  height?: number;
  /** Series name, used in the tooltip and the accessible description. */
  label: string;
}) {
  const hover = useHoverIndex(dates.length);
  const max = niceMax(Math.max(1, ...values));
  const total = values.reduce((a, b) => a + b, 0);

  return (
    <div>
      <div
        className="relative touch-none"
        onPointerMove={hover.onMove}
        onPointerLeave={hover.onLeave}
        style={{ height }}
      >
        {/* Flex bars rather than SVG rects: a 2px surface gap between
            neighbours and 4px rounded data-ends come for free, and they stay
            crisp at any container width. */}
        <div className="flex h-full items-end gap-[2px]" aria-hidden>
          {values.map((v, i) => (
            <div
              key={dates[i]}
              className="flex-1 rounded-t-[4px] transition-opacity"
              style={{
                // A zero day gets a 2px baseline tick in the grid colour, not a
                // sliver of the series colour — otherwise empty days read as a
                // dotted line of tiny real values.
                height: v === 0 ? "2px" : `${Math.max(4, (v / max) * 100)}%`,
                background: v === 0 ? "var(--color-border-subtle)" : color,
                opacity: hover.index === null || hover.index === i ? 1 : 0.45,
              }}
            />
          ))}
        </div>
        <p className="sr-only">
          {label}: {total} over {dates.length} days.
        </p>

        {hover.index !== null ? (
          <Tooltip index={hover.index} count={dates.length}>
            <p className="text-caption font-semibold text-foreground">
              {shortDate(dates[hover.index]!)}
            </p>
            <p className="text-caption text-muted">
              {label}{" "}
              <span className="font-semibold tabular-nums text-foreground">
                {values[hover.index]}
              </span>
            </p>
          </Tooltip>
        ) : null}
      </div>

      <div className="mt-1 flex justify-between text-caption text-muted">
        <span>{dates.length > 0 ? shortDate(dates[0]!) : ""}</span>
        <span>{dates.length > 0 ? shortDate(dates[dates.length - 1]!) : ""}</span>
      </div>
    </div>
  );
}
