"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

const DIGITS = Array.from({ length: 20 }, (_, i) => i % 10);

/**
 * Odometer: each digit is a clipped column of 0-9 twice over that rolls to its
 * value, the higher places travelling further, when the number scrolls in.
 * Without script (or with reduced motion) the final value simply shows.
 */
export function RollingNumber({
  value,
  className,
  label,
  trigger = "top 80%",
}: {
  /** Already formatted for the locale, e.g. "1.440" or "1,440". */
  value: string;
  className?: string;
  /** Spoken form for assistive tech. */
  label?: string;
  trigger?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const cols = el.querySelectorAll<HTMLElement>("[data-col]");
      cols.forEach((col) => {
        const target = Number(col.dataset.col);
        // Drop the server-rendered final position so GSAP owns the transform.
        col.style.transform = "";
        gsap.set(col, { y: 0, yPercent: 0 });
        col.dataset.final = String(target + 10);
      });
      ScrollTrigger.create({
        trigger: el,
        start: trigger,
        once: true,
        onEnter: () => {
          cols.forEach((col, i) => {
            const final = Number(col.dataset.final);
            gsap.to(col, {
              yPercent: -(final / 20) * 100,
              duration: 1.6 + (cols.length - i) * 0.22,
              ease: "expo.out",
              delay: i * 0.06,
            });
          });
        },
      });
    }, el);
    return () => ctx.revert();
  }, [value, trigger]);

  return (
    <span ref={ref} className={cn("inline-flex items-baseline", className)}>
      <span className="sr-only">{label ?? value}</span>
      {value.split("").map((ch, i) => {
        if (!/\d/.test(ch)) {
          return (
            <span key={i} aria-hidden>
              {ch}
            </span>
          );
        }
        const d = Number(ch);
        return (
          <span key={i} aria-hidden className="relative inline-block h-[1em] overflow-hidden leading-none">
            {/* Static value for no-JS; the column slides over it once animated. */}
            <span
              data-col={d}
              className="flex flex-col leading-none"
              style={{ transform: `translateY(-${((d + 10) / 20) * 100}%)` }}
            >
              {DIGITS.map((n, k) => (
                <span key={k} className="block h-[1em]">
                  {n}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
