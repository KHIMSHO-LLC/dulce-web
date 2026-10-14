"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

/**
 * The page's one smooth-scroll engine (Lenis), driven by GSAP's ticker so
 * ScrollTrigger and Lenis share a frame. Off under reduced motion, where the
 * browser's native scrolling is used untouched.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      anchors: { offset: 0 },
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Measurements change once fonts and late media settle.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    // Arriving on a section link (e.g. a redirect from a retired page).
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          lenis.scrollTo(target, { immediate: true, force: true });
        });
      }
    }

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("load", refresh);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}

/** Scroll to an element or y, through Lenis when it runs. */
export function scrollToTarget(target: string | HTMLElement | number) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4 });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target });
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView();
  }
}
