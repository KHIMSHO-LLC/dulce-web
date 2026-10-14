"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Draggable, gsap, prefersReducedMotion } from "@/components/motion/gsap";
import { cn } from "@/lib/utils/cn";

/**
 * A row you throw sideways: Draggable with inertia, a "Drag" hint bubble that
 * follows fine pointers over the row, and buttons for keyboard and touch
 * users who would rather not drag.
 */
export function DragCarousel({
  children,
  dragLabel,
  prevLabel,
  nextLabel,
  className,
}: {
  children: ReactNode;
  dragLabel: string;
  prevLabel: string;
  nextLabel: string;
  className?: string;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLDivElement>(null);
  const dragger = useRef<Draggable | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const vp = viewport.current;
    const tr = track.current;
    if (!vp || !tr) return;

    const bounds = () => ({ minX: Math.min(0, vp.clientWidth - tr.scrollWidth), maxX: 0 });
    const report = () => {
      const x = Number(gsap.getProperty(tr, "x"));
      const b = bounds();
      setEdges({ start: x >= b.maxX - 2, end: x <= b.minX + 2 });
    };

    const [d] = Draggable.create(tr, {
      type: "x",
      bounds: bounds(),
      inertia: !prefersReducedMotion(),
      edgeResistance: 0.85,
      dragClickables: true,
      zIndexBoost: false,
      cursor: "grab",
      activeCursor: "grabbing",
      onDrag: report,
      onThrowUpdate: report,
      onThrowComplete: report,
      onPress: () => gsap.to(bubble.current, { scale: 0.82, duration: 0.25 }),
      onRelease: () => gsap.to(bubble.current, { scale: 1, duration: 0.35, ease: "back.out(2)" }),
    });
    dragger.current = d;

    const ro = new ResizeObserver(() => {
      d.applyBounds(bounds());
      report();
    });
    ro.observe(vp);
    ro.observe(tr);

    // Hint bubble on fine pointers only.
    const fine = window.matchMedia("(pointer: fine)").matches;
    const b = bubble.current;
    let xTo: gsap.QuickToFunc | null = null;
    let yTo: gsap.QuickToFunc | null = null;
    const onMove = (e: PointerEvent) => {
      if (!b || !xTo || !yTo) return;
      const r = vp.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
    };
    const onEnter = () => b && gsap.to(b, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power2.out" });
    const onLeave = () => b && gsap.to(b, { autoAlpha: 0, scale: 0.6, duration: 0.25 });
    if (fine && b) {
      gsap.set(b, { autoAlpha: 0, scale: 0.6, xPercent: -50, yPercent: -50 });
      xTo = gsap.quickTo(b, "x", { duration: 0.35, ease: "power3.out" });
      yTo = gsap.quickTo(b, "y", { duration: 0.35, ease: "power3.out" });
      vp.addEventListener("pointermove", onMove);
      vp.addEventListener("pointerenter", onEnter);
      vp.addEventListener("pointerleave", onLeave);
    }

    return () => {
      ro.disconnect();
      d.kill();
      vp.removeEventListener("pointermove", onMove);
      vp.removeEventListener("pointerenter", onEnter);
      vp.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const vp = viewport.current;
    const tr = track.current;
    const d = dragger.current;
    if (!vp || !tr || !d) return;
    const card = tr.firstElementChild as HTMLElement | null;
    const amount = (card?.offsetWidth ?? 320) + 16;
    const minX = Math.min(0, vp.clientWidth - tr.scrollWidth);
    const x = Number(gsap.getProperty(tr, "x"));
    const next = Math.max(minX, Math.min(0, x - dir * amount));
    gsap.to(tr, {
      x: next,
      duration: prefersReducedMotion() ? 0 : 0.8,
      ease: "expo.out",
      onUpdate: () => d.update(),
      onComplete: () => setEdges({ start: next >= -2, end: next <= minX + 2 }),
    });
  };

  return (
    <div className={cn("relative", className)}>
      <div ref={viewport} className="relative overflow-hidden">
        <div ref={track} className="flex w-max gap-4 pr-[4vw] will-change-transform">
          {children}
        </div>
        <div
          ref={bubble}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-10 grid h-20 w-20 place-items-center rounded-full bg-ink/90 text-label font-semibold text-ground opacity-0 backdrop-blur"
        >
          {dragLabel}
        </div>
      </div>
      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={edges.start}
          aria-label={prevLabel}
          className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-white/12 text-ink transition-[background-color,opacity] hover:bg-white/8 disabled:cursor-default disabled:opacity-35"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.6} />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={edges.end}
          aria-label={nextLabel}
          className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-white/12 text-ink transition-[background-color,opacity] hover:bg-white/8 disabled:cursor-default disabled:opacity-35"
        >
          <ArrowRight className="h-5 w-5" strokeWidth={1.6} />
        </button>
      </div>
    </div>
  );
}
