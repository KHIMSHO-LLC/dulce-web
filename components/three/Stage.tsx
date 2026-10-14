"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, onIntro, prefersReducedMotion } from "@/components/motion/gsap";
import type { ScreenLocale } from "@/components/screens/strings";
import type { Stage as StageApi, StageState } from "./scene";

type PhoneKey = Partial<StageState["phone"]>;
type Step = { at: number; dur: number; to: PhoneKey; ease?: string };
type Track = {
  start: StageState["phone"];
  steps: Step[];
};

const TAU = Math.PI * 2;

/**
 * The journey, in scroll units of 1vh. The #journey wrapper is 660vh tall
 * (hero 100, lock 180, alerts 190, standby 190), so the scrubbed range is
 * 560vh and these positions line up with the chapter copy. Every stretch
 * has the phone moving; the holds are slow pushes, never dead stops.
 */
export const JOURNEY_VH = { hero: 100, lock: 180, alerts: 190, standby: 190 } as const;
const END = 560;

const DESKTOP: Track = {
  // Hero: large, centred, leaning right and running off the bottom edge.
  start: { nx: 0.03, ny: -0.6, h: 1.04, wMax: 0.35, rx: 0.04, ry: -0.36, rz: -0.2, visible: true },
  steps: [
    { at: 0, dur: 85, to: { nx: 0.42, ny: 0, h: 0.84, wMax: 0.9, rx: 0.04, ry: Math.PI, rz: 0.04 }, ease: "power1.inOut" },
    { at: 85, dur: 65, to: { ry: TAU - 0.38, nx: 0.42, h: 0.8, rx: 0.06, rz: -0.02 }, ease: "power2.out" },
    { at: 150, dur: 90, to: { ry: TAU - 0.1, ny: -0.05, nx: 0.37, h: 0.86 } },
    { at: 240, dur: 60, to: { ry: TAU + 0.3, rz: 0.06, nx: 0.36, rx: 0.1 }, ease: "power1.inOut" },
    { at: 300, dur: 100, to: { ry: TAU + 0.08, ny: 0, h: 0.92 } },
    { at: 400, dur: 70, to: { rz: -Math.PI / 2, ry: TAU, rx: 0.12, nx: 0.2, ny: -0.08, h: 0.95, wMax: 0.62 }, ease: "power2.inOut" },
    { at: 470, dur: 50, to: { h: 1.02, wMax: 0.68, ry: TAU - 0.14, rx: 0.2 } },
    { at: 520, dur: 40, to: { ny: 1.9 } },
  ],
};

const MOBILE: Track = {
  start: { nx: 0.06, ny: 0.13, h: 0.42, wMax: 0.6, rx: 0.1, ry: -0.4, rz: 0.08, visible: true },
  steps: [
    { at: 0, dur: 85, to: { ry: Math.PI, nx: 0, ny: 0.32, h: 0.48, rz: 0.03 }, ease: "power1.inOut" },
    { at: 85, dur: 65, to: { ry: TAU - 0.26, ny: 0.32, h: 0.48 }, ease: "power2.out" },
    { at: 150, dur: 90, to: { ry: TAU - 0.1, h: 0.5 } },
    { at: 240, dur: 60, to: { ry: TAU + 0.22, rz: 0.05 }, ease: "power1.inOut" },
    { at: 300, dur: 100, to: { ry: TAU + 0.08, h: 0.52 } },
    { at: 400, dur: 70, to: { rz: -Math.PI / 2, ry: TAU, rx: 0.14, nx: 0, ny: 0.22, h: 0.9, wMax: 0.78 }, ease: "power2.inOut" },
    { at: 470, dur: 50, to: { wMax: 0.82, rx: 0.18 } },
    { at: 520, dur: 40, to: { ny: 2.0 } },
  ],
};

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Mounts the fixed WebGL canvas and binds the scroll story to it. Under
 * reduced motion or without WebGL nothing mounts, and each section's static
 * screen (marked data-webgl-fallback) stays visible instead.
 */
export function Stage({ locale }: { locale: ScreenLocale }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion() || !webglAvailable()) return;

    let stage: StageApi | null = null;
    let cancelled = false;
    const cleanups: Array<() => void> = [];
    const root = document.documentElement;

    import("./scene").then(({ createStage }) => {
      if (cancelled) return;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      try {
        stage = createStage(canvas, locale, { coarse });
      } catch {
        return;
      }
      const s = stage.state;
      root.classList.add("webgl-on");

      const onLost = (e: Event) => {
        e.preventDefault();
        root.classList.remove("webgl-on");
        canvas.style.display = "none";
      };
      canvas.addEventListener("webglcontextlost", onLost);
      cleanups.push(() => canvas.removeEventListener("webglcontextlost", onLost));

      stage.setAnchor("watch", document.querySelector<HTMLElement>('[data-anchor="watch"]'));
      stage.setAnchor("tile", document.querySelector<HTMLElement>('[data-anchor="tile"]'));
      stage.setAnchor("day", document.querySelector<HTMLElement>('[data-anchor="day"]'));

      // Intro: the phone rises into the hero when the preloader lifts.
      gsap.set(s.intro, { y: -1.5, r: 0.9 });
      cleanups.push(
        onIntro(() => {
          gsap.to(s.intro, { y: 0, r: 0, duration: 1.8, ease: "expo.out", delay: 0.15 });
        }),
      );

      const mm = gsap.matchMedia();
      mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (ctx) => {
        const track = ctx.conditions?.desktop ? DESKTOP : MOBILE;
        Object.assign(s.phone, track.start);
        s.screen = 0;
        s.alerts = 0;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: "#journey",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.9,
            onLeave: () => stage?.setJourneyActive(false),
            onEnterBack: () => stage?.setJourneyActive(true),
          },
        });
        for (const step of track.steps) {
          tl.to(s.phone, { ...step.to, duration: step.dur, ease: step.ease ?? "none" }, step.at);
        }
        // Screens: home -> lock while the back faces us, lock -> alerts as a
        // visible liquid wash, alerts -> StandBy during the turn to landscape.
        tl.to(s, { screen: 1, duration: 14, ease: "none" }, 38);
        tl.to(s, { screen: 2, duration: 50, ease: "power1.inOut" }, 245);
        tl.to(s, { alerts: 1, duration: 100, ease: "none" }, 270);
        tl.to(s, { screen: 3, duration: 45, ease: "power1.inOut" }, 410);
        tl.set({}, {}, END);
        return () => {
          stage?.setJourneyActive(true);
        };
      });
      cleanups.push(() => mm.revert());

      const watchTrigger = ScrollTrigger.create({
        trigger: "#apple-watch",
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          s.watch.p = self.progress;
        },
      });
      cleanups.push(() => watchTrigger.kill());

      const onDay = (e: Event) => {
        const index = (e as CustomEvent<number>).detail;
        if (index === s.day.index) return;
        s.day.index = index;
        gsap.fromTo(s.day, { t: 0 }, { t: 1, duration: 1.1, ease: "power2.inOut", overwrite: true });
      };
      window.addEventListener("dulce:day", onDay);
      cleanups.push(() => window.removeEventListener("dulce:day", onDay));

      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
      stage?.dispose();
      root.classList.remove("webgl-on");
    };
  }, [locale]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-30 h-lvh w-full"
    />
  );
}
