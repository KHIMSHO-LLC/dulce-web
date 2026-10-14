"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/components/motion/gsap";
import { FluidLayer } from "@/components/fx/FluidLayer";
import { Parallax } from "@/components/motion/Parallax";
import { DeviceFrame } from "@/components/screens/DeviceFrame";
import type { ScreenName } from "@/components/screens/draw";
import type { ScreenLocale } from "@/components/screens/strings";
import { cn } from "@/lib/utils/cn";

type Item = { key: ScreenName; title: string; body: string };

const DWELL = 7; // seconds per item while autoplaying

/**
 * "Your day": three panels, one open at a time. While in view it advances on
 * its own, each item's hairline filling as its timer; any click hands control
 * to the visitor. The card on the right holds the shared 3D phone, whose
 * screen washes to the open item (see components/three/scene.ts DAY_SCREENS).
 */
export function DayAccordion({
  locale,
  items,
  altTemplate,
}: {
  locale: ScreenLocale;
  items: Item[];
  altTemplate: string;
}) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const fills = useRef<Array<HTMLSpanElement | null>>([]);
  const timer = useRef<gsap.core.Tween | null>(null);
  const inView = useRef(false);

  const select = useCallback((i: number) => {
    setActive(i);
    window.dispatchEvent(new CustomEvent("dulce:day", { detail: i }));
  }, []);

  // Autoplay timer drawn as the active item's hairline.
  useEffect(() => {
    timer.current?.kill();
    fills.current.forEach((f, i) => f && gsap.set(f, { scaleX: i < active ? 1 : 0 }));
    if (!auto || prefersReducedMotion()) return;
    const fill = fills.current[active];
    if (!fill) return;
    timer.current = gsap.to(fill, {
      scaleX: 1,
      duration: DWELL,
      ease: "none",
      paused: !inView.current,
      onComplete: () => select((active + 1) % items.length),
    });
    return () => {
      timer.current?.kill();
    };
  }, [active, auto, items.length, select]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      end: "bottom 25%",
      onToggle: (self) => {
        inView.current = self.isActive;
        if (self.isActive) timer.current?.play();
        else timer.current?.pause();
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div ref={root} className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-16">
      <ul className="self-end">
        {items.map((item, i) => {
          const open = i === active;
          return (
            <li key={item.key} className="relative pt-5">
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/12" />
              <span
                ref={(n) => {
                  fills.current[i] = n;
                }}
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-ember"
              />
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`day-panel-${item.key}`}
                  onClick={() => {
                    setAuto(false);
                    select(i);
                  }}
                  onMouseEnter={() => timer.current?.pause()}
                  onMouseLeave={() => inView.current && timer.current?.play()}
                  className={cn(
                    "w-full cursor-pointer pb-3 text-left text-[clamp(1.6rem,2.6vw,2.3rem)] font-light tracking-[-0.025em] transition-colors duration-300",
                    open ? "text-ink" : "text-mute hover:text-soft",
                  )}
                  style={{ fontVariationSettings: '"wdth" 104' }}
                >
                  {item.title}
                </button>
              </h3>
              <div
                id={`day-panel-${item.key}`}
                role="region"
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)]",
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <p className="overflow-hidden pb-6 pr-6 text-body leading-relaxed text-soft">{item.body}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <Parallax y={70}>
      <div
        data-hover-host
        className="relative aspect-[5/6] overflow-hidden rounded-[28px] border border-white/8 md:aspect-[6/5]"
        style={{
          background:
            "radial-gradient(70% 80% at 70% 30%, rgba(255,138,92,0.9), rgba(243,102,56,0.55) 35%, rgba(120,30,45,0.55) 70%, #1a0d10 100%)",
        }}
      >
        <FluidLayer intensity={1} />
        <div data-anchor="day" aria-hidden className="absolute inset-0" />
        <div data-webgl-fallback className="absolute left-1/2 top-[8%] w-[46%] -translate-x-1/2 md:w-[34%]">
          {items.map((item, i) => (
            <div
              key={item.key}
              className={cn(
                "transition-[opacity,filter] duration-700",
                i === active ? "relative opacity-100 blur-0" : "absolute inset-0 opacity-0 blur-md",
              )}
            >
              <DeviceFrame name={item.key} locale={locale} label={altTemplate.replace("{name}", item.title)} />
            </div>
          ))}
        </div>
      </div>
      </Parallax>
    </div>
  );
}
