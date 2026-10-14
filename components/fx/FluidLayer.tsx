"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/gsap";
import { cn } from "@/lib/utils/cn";
import type { Fluid } from "./fluid";

/** Light, warm inks so the smoke reads on ember: peach, rose, pale gold, lilac. */
const INKS: Array<[number, number, number]> = [
  [1.0, 0.82, 0.7],
  [1.0, 0.55, 0.72],
  [1.0, 0.8, 0.45],
  [0.78, 0.6, 1.0],
  [1.0, 0.66, 0.5],
];

/**
 * Ink-in-water smoke inside a card. The pointer stirs it (hover anywhere on
 * the nearest `[data-hover-host]`, or the parent), and a few slow ambient
 * plumes keep it alive while it is on screen. The WebGL context only exists
 * while the card is in view; reduced motion and missing WebGL2 render nothing.
 */
export function FluidLayer({
  className,
  intensity = 1,
  ambient = true,
}: {
  className?: string;
  /** Scales ink brightness. */
  intensity?: number;
  ambient?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || prefersReducedMotion()) return;
    const host = (canvas.closest("[data-hover-host]") as HTMLElement | null) ?? canvas.parentElement;
    if (!host) return;

    let fluid: Fluid | null = null;
    let raf = 0;
    let last = performance.now();
    let lastAmbient = 0;
    let ink = Math.floor(Math.random() * INKS.length);
    const pointer = { x: 0, y: 0, px: 0, py: 0, moved: false, inside: false };
    let creating = false;
    let inView = false;

    const color = (): [number, number, number] => {
      ink = (ink + 1) % INKS.length;
      const [r, g, b] = INKS[ink];
      const k = 0.2 * intensity;
      return [r * k, g * k, b * k];
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!fluid || document.hidden) return;
      const dt = Math.min(0.0166, (now - last) / 1000);
      last = now;
      if (pointer.moved) {
        pointer.moved = false;
        const dx = (pointer.x - pointer.px) * 6000;
        const dy = (pointer.y - pointer.py) * 6000;
        if (Math.abs(dx) + Math.abs(dy) > 0.5) fluid.splat(pointer.x, pointer.y, dx, dy, color());
      }
      if (ambient && now - lastAmbient > (pointer.inside ? 2600 : 1500)) {
        lastAmbient = now;
        const x = 0.15 + Math.random() * 0.7;
        const y = Math.random() < 0.5 ? 0.04 : 0.96;
        const c = color();
        fluid.splat(x, y, (Math.random() - 0.5) * 300, (y < 0.5 ? 1 : -1) * (250 + Math.random() * 250), [
          c[0] * 0.8,
          c[1] * 0.8,
          c[2] * 0.8,
        ]);
      }
      fluid.step(dt);
      fluid.render();
    };

    const start = async () => {
      if (fluid || creating) return;
      creating = true;
      const { createFluid } = await import("./fluid");
      creating = false;
      if (!ref.current || !inView) return;
      fluid = createFluid(canvas, { simRes: 128, dyeRes: 640 });
      if (!fluid) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      fluid?.dispose();
      fluid = null;
    };

    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        if (inView) start();
        else stop();
      },
      { rootMargin: "15% 0px" },
    );
    io.observe(canvas);

    // The browser can drop the context (too many live ones, GPU reset). A lost
    // canvas composites as white under mix-blend-screen, so hide it until it
    // is restored, then pick the simulation back up.
    const onLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      fluid = null;
      canvas.style.visibility = "hidden";
    };
    const onRestored = () => {
      canvas.style.visibility = "";
      if (inView) start();
    };
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = 1 - (e.clientY - r.top) / r.height;
      if (!pointer.inside) {
        pointer.px = x;
        pointer.py = y;
      } else {
        pointer.px = pointer.x;
        pointer.py = pointer.y;
      }
      pointer.x = x;
      pointer.y = y;
      pointer.inside = true;
      pointer.moved = true;
    };
    const onLeave = () => {
      pointer.inside = false;
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    const ro = new ResizeObserver(() => fluid?.resize());
    ro.observe(canvas);

    return () => {
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      stop();
    };
  }, [intensity, ambient]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full mix-blend-screen", className)}
    />
  );
}
