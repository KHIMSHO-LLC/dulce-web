"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { gsap, prefersReducedMotion } from "./gsap";

/**
 * Scroll-scrubbed drift. The element travels `y` pixels (and optionally `x`,
 * `scale`, `rotate`) across the time its trigger crosses the viewport, so the
 * page always answers the scroll. `scope="section"` measures against the
 * closest section, which is what sticky content needs.
 */
export function Parallax({
  children,
  className,
  y = 80,
  x = 0,
  scale,
  rotate = 0,
  scope = "self",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Total vertical travel in px (positive drifts up as you scroll down). */
  y?: number;
  x?: number;
  /** [from, to] */
  scale?: [number, number];
  rotate?: number;
  scope?: "self" | "section";
  as?: "div" | "span" | "figure";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const trigger = scope === "section" ? (el.closest("section") ?? el) : el;
    const tween = gsap.fromTo(
      el,
      { y: y / 2, x: -x / 2, scale: scale?.[0] ?? 1, rotate: -rotate / 2 },
      {
        y: -y / 2,
        x: x / 2,
        scale: scale?.[1] ?? 1,
        rotate: rotate / 2,
        ease: "none",
        scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: 0.6 },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(el, { clearProps: "transform" });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [y, x, scale?.[0], scale?.[1], rotate, scope]);

  return (
    <Tag ref={ref as React.Ref<never>} className={cn("will-change-transform", className)}>
      {children}
    </Tag>
  );
}

/**
 * Chapter choreography for the sticky journey sections: as the chapter plays,
 * the title drifts and opens up, the body follows a beat behind, and an ember
 * hairline fills to show how far through the chapter you are.
 */
export function ChapterFx({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const section = el.closest("section");
    if (!section) return;
    const title = el.querySelector<HTMLElement>("[data-chapter-title]") ?? el.querySelector<HTMLElement>("[data-split]");
    const body = el.querySelector<HTMLElement>("[data-chapter-body]");
    const fill = el.querySelector<HTMLElement>("[data-chapter-fill]");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.5 },
      });
      if (title) tl.fromTo(title, { y: 46, x: -24 }, { y: -46, x: 24, duration: 1 }, 0);
      if (body) tl.fromTo(body, { y: 30 }, { y: -30, duration: 1 }, 0);
      if (fill) tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);
      // Leaving: the whole block dims and lifts as the next chapter arrives.
      gsap.fromTo(
        el,
        { autoAlpha: 1, y: 0 },
        {
          autoAlpha: 0.12,
          y: -40,
          ease: "none",
          immediateRender: false,
          scrollTrigger: { trigger: section, start: "bottom bottom", end: "bottom 35%", scrub: 0.5 },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
