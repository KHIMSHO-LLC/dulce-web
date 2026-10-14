"use client";

import { useEffect, useRef } from "react";
import { FluidLayer } from "@/components/fx/FluidLayer";
import { gsap, prefersReducedMotion } from "@/components/motion/gsap";
import { DeviceFrame } from "@/components/screens/DeviceFrame";
import type { ScreenLocale } from "@/components/screens/strings";
import { SECTION } from "@/lib/site";

/**
 * "Dulce [chip] en tu muñeca": the chip between the words is a window onto an
 * ember field with the 3D Watch in it. Scrolling opens the window until it
 * fills the stage, the words dissolve, and the caption lands.
 * The Watch is drawn by the shared WebGL stage into `[data-anchor="watch"]`,
 * whose box this component keeps equal to the visible window.
 */
export function WristChip({
  locale,
  before,
  after,
  title,
  body,
  pro,
  alt,
}: {
  locale: ScreenLocale;
  before: string;
  after: string;
  title: string;
  body: string;
  pro: string;
  alt: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  const [firstAfter, ...restAfter] = after.split(" ");

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const chip = chipRef.current;
    const panel = panelRef.current;
    const anchor = anchorRef.current;
    if (!section || !sticky || !chip || !panel || !anchor) return;

    let from = { top: 0, left: 0, w: 0, h: 0 };
    const measure = () => {
      const s = sticky.getBoundingClientRect();
      const c = chip.getBoundingClientRect();
      from = { top: c.top - s.top, left: c.left - s.left, w: c.width, h: c.height };
    };

    const apply = (k: number) => {
      const W = sticky.clientWidth;
      const H = sticky.clientHeight;
      const small = W < 768;
      // The open window keeps a margin and its corners, like a framed plate.
      const mx = small ? 12 : Math.max(24, W * 0.035);
      const my = small ? 76 : Math.max(24, H * 0.06);
      const lerp = (a: number, b: number) => a + (b - a) * k;
      const top = lerp(from.top, my);
      const left = lerp(from.left, mx);
      const width = lerp(from.w, W - mx * 2);
      const height = lerp(from.h, H - my - (small ? 96 : my));
      const radius = lerp(from.h * 0.28, 28);
      panel.style.clipPath = `inset(${top}px ${W - left - width}px ${H - top - height}px ${left}px round ${radius}px)`;
      anchor.style.top = `${top}px`;
      anchor.style.left = `${left}px`;
      anchor.style.width = `${width}px`;
      anchor.style.height = `${height}px`;
    };

    if (prefersReducedMotion()) {
      apply(1);
      return;
    }

    measure();
    const state = { k: 0 };
    apply(0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
          onRefresh: () => {
            measure();
            apply(state.k);
          },
        },
      });
      tl.to(state, { k: 1, duration: 0.5, ease: "power2.inOut", onUpdate: () => apply(state.k) }, 0.04)
        .to(wordsRef.current, { autoAlpha: 0, scale: 1.06, filter: "blur(14px)", duration: 0.24 }, 0.14)
        .fromTo(
          captionRef.current,
          { autoAlpha: 0, y: 40, filter: "blur(10px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.2, ease: "power2.out" },
          0.56,
        )
        .to({}, { duration: 0.2 });
    }, section);

    const ro = new ResizeObserver(() => {
      measure();
      apply(state.k);
    });
    ro.observe(sticky);
    return () => {
      ro.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={SECTION.watch}
      data-mood="ember"
      aria-labelledby="watch-title"
      className="relative z-10 h-[280vh] motion-reduce:h-auto"
    >
      <div ref={stickyRef} data-hover-host className="sticky top-0 h-[100svh] overflow-hidden motion-reduce:relative">
        {/* The ember field, revealed through an animated clip-path window */}
        <div
          ref={panelRef}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 70% at 50% 45%, #ff8a5c 0%, #f36638 28%, #b8361f 58%, #5a1626 85%, #2a0d16 100%)",
          }}
        >
          {/* Ink in the field: the pointer stirs it, slow plumes keep it moving. */}
          <FluidLayer intensity={1.05} />
          {/* A soft shade under the caption so text stays readable over the smoke. */}
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 55% at 10% 100%, rgba(20,8,6,0.62), rgba(20,8,6,0) 70%)" }} />
          <div
            data-webgl-fallback
            aria-hidden
            className="absolute left-1/2 top-1/2 w-[min(46vw,260px)] -translate-x-1/2 -translate-y-1/2"
          >
            <DeviceFrame kind="watch" name="watch" locale={locale} label={alt} />
          </div>
        </div>
        <div ref={anchorRef} data-anchor="watch" aria-hidden className="pointer-events-none absolute" />

        {/* The words, set over the field so they read with or without script */}
        <p
          ref={wordsRef}
          aria-hidden
          className="type-display pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center text-[clamp(3rem,10vw,9.5rem)] text-ink"
        >
          <span className="block whitespace-nowrap">
            {before}{" "}
            <span ref={chipRef} className="mx-[0.06em] inline-block h-[0.74em] w-[1.5em] align-[-0.06em]" />{" "}
            {firstAfter}
          </span>
          <span className="block">{restAfter.join(" ")}</span>
        </p>

        <div
          ref={captionRef}
          className="absolute inset-x-0 bottom-[112px] md:bottom-[9vh]"
        >
          <div className="container-page">
            <div className="max-w-[30rem] md:ml-[3vw]">
              <h2 id="watch-title" className="type-display text-[clamp(2rem,3.6vw,3.4rem)] text-ink">
                <span className="sr-only">
                  {before} {after}.{" "}
                </span>
                {title}
              </h2>
              <p className="mt-4 max-w-[40ch] text-[1.0625rem] leading-relaxed text-ink/85">{body}</p>
              <p className="mt-3 text-label font-semibold text-ink">{pro}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
