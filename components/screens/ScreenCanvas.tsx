"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";
import { drawScreen, screenSize, type DrawState, type ScreenName } from "./draw";
import { LiveGlucose } from "./glucose";
import type { ScreenLocale } from "./strings";

/** A deterministic snapshot of the live model, for static screens. */
export function snapshotState(locale: ScreenLocale, extra: Partial<DrawState> = {}): DrawState {
  const g = new LiveGlucose();
  return {
    locale,
    value: g.value,
    trend: g.trend,
    delta: g.delta,
    series: g.series,
    now: new Date(),
    ...extra,
  };
}

type Props = {
  name: ScreenName;
  locale: ScreenLocale;
  className?: string;
  /** Accessible description of what the screen shows. */
  label: string;
  progress?: number;
  /** Follow the stage's live reading (dulce:glucose) so it matches the 3D phone. */
  live?: boolean;
};

/**
 * Renders one depicted app screen into a canvas at device pixel ratio. Used
 * where the page shows a screen flat (cards, fallbacks); the 3D stage draws the
 * same renderers into WebGL textures.
 */
export function ScreenCanvas({ name, locale, className, label, progress, live }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const state = snapshotState(locale, { progress });
    const size = screenSize(name);
    let raf = 0;

    const paint = () => {
      const box = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const scale = Math.max(1, (box.width * dpr) / size.w);
      drawScreen(canvas, name, state, scale, () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(paint);
      });
    };
    paint();

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(paint);
    });
    ro.observe(canvas);

    const onLive = (e: Event) => {
      const d = (e as CustomEvent<Pick<DrawState, "value" | "trend" | "delta" | "series">>).detail;
      Object.assign(state, d, { now: new Date() });
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(paint);
    };
    if (live) window.addEventListener("dulce:glucose", onLive);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("dulce:glucose", onLive);
    };
  }, [name, locale, progress, live]);

  const size = screenSize(name);
  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={label}
      className={cn("block h-auto w-full", className)}
      style={{ aspectRatio: `${size.w} / ${size.h}`, background: "#0B0B0C" }}
    />
  );
}
