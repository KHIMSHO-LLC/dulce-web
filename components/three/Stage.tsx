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
 * The journey, in scroll units of 1vh. The #journey wrapper is 800vh tall
 * (hero 100, lock 220, alerts 220, standby 260), so the scrubbed range is
 * 700vh and these positions line up with the chapter copy.
 */
const DESKTOP: Track = {
  start: { nx: 0.1, ny: -0.14, h: 0.66, wMax: 0.9, rx: 0.1, ry: -0.42, rz: 0.08, visible: true },
  steps: [
    { at: 0, dur: 90, to: { nx: 0.44, ny: 0, h: 0.86, rx: 0.04, ry: Math.PI, rz: 0.04 }, ease: "power1.inOut" },
    { at: 90, dur: 80, to: { ry: TAU - 0.38, nx: 0.42, h: 0.8, rx: 0.06, rz: -0.02 }, ease: "power2.out" },
    { at: 170, dur: 130, to: { ry: TAU - 0.22, ny: -0.04, nx: 0.4 } },
    { at: 300, dur: 70, to: { ry: TAU + 0.28, rz: 0.06, nx: 0.38, rx: 0.1 }, ease: "power1.inOut" },
    { at: 370, dur: 140, to: { ry: TAU + 0.12, ny: -0.02 } },
    { at: 510, dur: 80, to: { rz: -Math.PI / 2, ry: TAU, rx: 0.16, nx: 0.18, ny: -0.12, h: 0.9, wMax: 0.6 }, ease: "power2.inOut" },
    { at: 590, dur: 40, to: { h: 0.95, wMax: 0.64, ny: -0.1 } },
    { at: 630, dur: 70, to: { ny: 1.8 } },
  ],
};

const MOBILE: Track = {
  start: { nx: 0.06, ny: 0.13, h: 0.42, wMax: 0.6, rx: 0.1, ry: -0.4, rz: 0.08, visible: true },
  steps: [
    { at: 0, dur: 90, to: { ry: Math.PI, nx: 0, ny: 0.32, h: 0.48, rz: 0.03 }, ease: "power1.inOut" },
    { at: 90, dur: 80, to: { ry: TAU - 0.26, ny: 0.32, h: 0.48 }, ease: "power2.out" },
    { at: 170, dur: 130, to: { ry: TAU - 0.12 } },
    { at: 300, dur: 70, to: { ry: TAU + 0.22, rz: 0.05 }, ease: "power1.inOut" },
    { at: 370, dur: 140, to: { ry: TAU + 0.08 } },
    { at: 510, dur: 80, to: { rz: -Math.PI / 2, ry: TAU, rx: 0.14, nx: 0, ny: 0.22, h: 0.9, wMax: 0.86 }, ease: "power2.inOut" },
    { at: 630, dur: 70, to: { ny: 2.0 } },
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
        s.stand.rise = 0;
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
        tl.to(s, { screen: 1, duration: 16, ease: "none" }, 42);
        tl.to(s, { screen: 2, duration: 55, ease: "power1.inOut" }, 305);
        tl.to(s, { alerts: 1, duration: 110, ease: "none" }, 330);
        tl.to(s, { screen: 3, duration: 45, ease: "power1.inOut" }, 522);
        tl.to(s.stand, { rise: 1, duration: 60, ease: "power3.out" }, 540);
        tl.set({}, {}, 700);
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
