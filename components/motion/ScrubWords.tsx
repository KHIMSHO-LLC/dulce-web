"use client";

import { useEffect, useRef, type ElementType } from "react";
import { cn } from "@/lib/utils/cn";
import { gsap, prefersReducedMotion } from "./gsap";

/**
 * Text that lights up word by word as it scrolls through the viewport. The
 * first `dim` words can start brighter (a lead-in already read).
 * Words are plain inline spans, so screen readers read the sentence normally.
 */
export function ScrubWords({
  text,
  className,
  as: Tag = "p",
  lit = 0,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  /** How many leading words stay fully lit from the start. */
  lit?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const spans = el.querySelectorAll<HTMLElement>("[data-w]");
      const targets = Array.from(spans).slice(lit);
      gsap.set(targets, { opacity: 0.18 });
      gsap.to(targets, {
        opacity: 1,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          end: "bottom 45%",
          scrub: 0.6,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [lit, text]);

  return (
    <Tag ref={ref} className={cn(className)}>
      {words.map((w, i) => (
        <span key={i} data-w>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
