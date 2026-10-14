"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { gsap, ScrollTrigger, onIntro, prefersReducedMotion } from "./gsap";

/**
 * Section choreographer. Inside it, `[data-split]` headings rise word by word
 * and `[data-fade]` blocks lift out of a soft blur, in reading order, the first
 * time the section enters. Content is visible by default; the hidden start
 * state is only applied by script, off screen.
 */
export function Reveal({
  children,
  className,
  start = "top 78%",
  as: Tag = "div",
  id,
  on = "scroll",
}: {
  children: ReactNode;
  className?: string;
  start?: string;
  /** "intro" plays when the preloader lifts instead of on scroll. */
  on?: "scroll" | "intro";
  as?: "div" | "section" | "header" | "footer";
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    let stopIntro = () => {};
    const ctx = gsap.context(() => {
      const words = root.querySelectorAll<HTMLElement>("[data-split] .split-word > span");
      const fades = root.querySelectorAll<HTMLElement>("[data-fade]");
      gsap.set(words, { yPercent: 115 });
      gsap.set(fades, { autoAlpha: 0, y: 28, filter: "blur(10px)" });
      const tl = gsap.timeline({ paused: true });
      if (words.length) {
        tl.to(words, {
          yPercent: 0,
          duration: 1.05,
          ease: "expo.out",
          stagger: { each: 0.045, from: "start" },
        });
      }
      if (fades.length) {
        tl.to(
          fades,
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "expo.out", stagger: 0.08, clearProps: "filter" },
          words.length ? "-=0.75" : 0,
        );
      }
      if (on === "intro") {
        stopIntro = onIntro(() => tl.play());
      } else {
        ScrollTrigger.create({
          trigger: root,
          start,
          once: true,
          onEnter: () => tl.play(),
        });
      }
    }, root);
    return () => {
      stopIntro();
      ctx.revert();
    };
  }, [start, on]);

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} id={id} className={cn(className)}>
      {children}
    </Tag>
  );
}
