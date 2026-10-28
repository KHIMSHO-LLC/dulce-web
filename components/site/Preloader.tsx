"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { announceIntro, gsap, prefersReducedMotion } from "@/components/motion/gsap";
import { DropMark } from "./DropMark";

const SEEN = "dulce:seen";
const COL = Array.from({ length: 11 }, (_, i) => i % 10);

/**
 * First-visit curtain: a rolling counter climbs to 100 while fonts settle,
 * then the panel lifts and announces the intro. Shown once per session; never
 * shown without JavaScript or under reduced motion (see globals.css).
 */
export function Preloader() {
  const t = useTranslations("preloader");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const root = document.documentElement;
    if (!el || root.dataset.seen !== undefined || prefersReducedMotion()) {
      announceIntro();
      return;
    }

    const cols = el.querySelectorAll<HTMLElement>("[data-place]");
    const progress = { p: 0 };
    const render = () => {
      const p = progress.p;
      cols.forEach((col) => {
        const place = Number(col.dataset.place);
        // Continuous odometer: hundreds p/100, tens p/10 (mod 10), ones p (mod 10).
        let v = place === 100 ? p / 100 : place === 10 ? (p / 10) % 10 : p % 10;
        if (p >= 100) v = place === 100 ? 1 : 0;
        col.style.transform = `translate3d(0, ${-v * (100 / 11)}%, 0)`;
      });
    };

    let done = false;
    let cancelled = false;
    const minTime = new Promise((r) => setTimeout(r, 900));
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const cap = new Promise((r) => setTimeout(r, 2200));

    const climb = gsap.to(progress, { p: 86, duration: 1.2, ease: "power2.out", onUpdate: render });

    const finish = () => {
      if (done || cancelled) return;
      done = true;
      climb.kill();
      const tl = gsap.timeline({
        onComplete: () => {
          el.style.display = "none";
          try {
            sessionStorage.setItem(SEEN, "1");
          } catch {}
        },
      });
      tl.to(progress, { p: 100, duration: 0.45, ease: "power2.inOut", onUpdate: render })
        .to(el.querySelector("[data-mark]"), { scale: 0.6, autoAlpha: 0, duration: 0.4, ease: "power2.in" }, "-=0.1")
        .add(() => announceIntro(), "+=0.05")
        .to(el, { yPercent: -100, duration: 1.05, ease: "expo.inOut" }, "<")
        .to(el.querySelector("[data-count]"), { yPercent: 40, autoAlpha: 0, duration: 0.8, ease: "expo.in" }, "<");
    };

    Promise.race([Promise.all([minTime, fonts]), cap]).then(finish);

    return () => {
      cancelled = true;
      climb.kill();
      // Leaving mid-load (client navigation): release anything waiting on the intro.
      if (!done) announceIntro();
    };
  }, []);

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-label={t("label")}
      className="preloader fixed inset-0 z-[70] flex flex-col justify-between bg-ground p-5 md:p-10"
    >
      <div
        data-count
        aria-hidden
        className="flex text-[clamp(6rem,22vw,18rem)] font-light leading-[0.82] tracking-[-0.06em] text-ink tabular"
        style={{ fontVariationSettings: '"wdth" 100' }}
      >
        {[100, 10, 1].map((place) => (
          <span key={place} className="relative inline-block h-[0.82em] overflow-hidden">
            <span data-place={place} className="flex flex-col">
              {COL.map((n, i) => (
                // CSS-generated digits (globals.css): no digit soup in the page text.
                <span key={i} className="block h-[0.82em] leading-[0.82]" data-glyph={n} />
              ))}
            </span>
          </span>
        ))}
      </div>
      <div className="flex items-end justify-between">
        <span data-mark className="block">
          <DropMark className="h-10 md:h-12" priority />
        </span>
        <span className="text-label text-mute">dulceglucosa.com</span>
      </div>
    </div>
  );
}
