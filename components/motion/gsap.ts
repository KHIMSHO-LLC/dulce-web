"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);
}

export { gsap, ScrollTrigger, Draggable, InertiaPlugin };

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * The intro moment: the preloader announces it once; anything that choreographs
 * the first viewport waits for it (or runs at once if it already happened).
 */
export function onIntro(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  if (document.documentElement.dataset.intro === "done") {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener("dulce:intro", handler, { once: true });
  return () => window.removeEventListener("dulce:intro", handler);
}

export function announceIntro() {
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event("dulce:intro"));
}
