"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";
import { gsap, prefersReducedMotion } from "./gsap";

/** The footer wordmark: its letters rise into place, one after another, with the scroll. */
export function WordmarkRise({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const letters = el.querySelectorAll<HTMLElement>("[data-l]");
    const tween = gsap.fromTo(
      letters,
      { yPercent: 70, rotate: 6 },
      {
        yPercent: 0,
        rotate: 0,
        ease: "none",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: 0.6 },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text]);

  return (
    <span ref={ref} translate="no" className={cn("inline-flex", className)} style={style}>
      {text.split("").map((ch, i) => (
        <span key={i} data-l className="inline-block origin-bottom-left will-change-transform">
          {ch}
        </span>
      ))}
    </span>
  );
}
