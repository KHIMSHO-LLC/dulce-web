"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/components/motion/gsap";
import { DropMark } from "@/components/site/DropMark";

/**
 * The page's one marquee. Drifts on its own and leans into the scroll:
 * scrolling down speeds it forward, scrolling up runs it backward.
 * Purely decorative: the section's real heading is a separate sr-only <h2>, and
 * the repeated words are CSS-generated (`data-glyph`) so they are not page text.
 */
export function Marquee({ text }: { text: string }) {
  const track = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    const w = wrap.current;
    if (!el || !w || prefersReducedMotion()) return;
    const loop = gsap.to(el, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
    let settle: gsap.core.Tween | null = null;
    const st = ScrollTrigger.create({
      trigger: w,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
      onUpdate: (self) => {
        const v = self.getVelocity();
        const boost = gsap.utils.clamp(-6, 6, v / 300);
        settle?.kill();
        gsap.to(loop, { timeScale: boost === 0 ? 1 : boost, duration: 0.2, overwrite: true });
        settle = gsap.to(loop, { timeScale: self.direction >= 0 ? 1 : -1, duration: 1.2, delay: 0.2, ease: "power2.out" });
      },
    });
    return () => {
      st.kill();
      settle?.kill();
      loop.kill();
    };
  }, []);

  const unit = (
    <span className="flex shrink-0 items-center gap-[0.35em] pr-[0.35em]">
      <span data-glyph={text} />
      <DropMark className="h-[0.62em] opacity-80" />
    </span>
  );

  return (
    <div ref={wrap} aria-hidden className="overflow-hidden py-4">
      <div
        ref={track}
        className="type-display flex w-max whitespace-nowrap text-[clamp(4rem,12vw,12rem)] text-ink/85"
      >
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className="flex">
            {unit}
          </span>
        ))}
      </div>
    </div>
  );
}
