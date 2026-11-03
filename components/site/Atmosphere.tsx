"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger, prefersReducedMotion } from "@/components/motion/gsap";
import { GlucoseField } from "./GlucoseField";

// Warm-tinted noise (R > G > B) so grain never cools the blacks.
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 0.86 0 0 0 0 0.72 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/**
 * The beams are soft gradients faded at both ends by a mask. No CSS blur
 * filter: a 40-100px blur over most of the viewport is re-run by the GPU on
 * every composite, which made scrolling stutter on fanless laptops.
 */
/** A bell-shaped falloff across the beam, close to what the old blur gave. */
const bell = (core: string, edge: string, peak: number) =>
  `linear-gradient(90deg, transparent 0%, ${[
    [8, edge, 0.04], [18, edge, 0.1], [28, edge, 0.18], [38, core, 0.26], [50, core, 0.32],
    [62, core, 0.26], [72, edge, 0.18], [82, edge, 0.1], [92, edge, 0.04],
  ]
    .map(([at, c, k]) => `color-mix(in srgb, ${c} ${Math.round((k as number) * peak)}%, transparent) ${at}%`)
    .join(", ")}, transparent 100%)`;
const BEAM = bell("var(--mood-a)", "var(--mood-b)", 100);
const CROSS_BEAM = bell("var(--mood-a)", "var(--mood-a)", 50);
const BEAM_MASK = "linear-gradient(to bottom, transparent 4%, #000 30%, #000 70%, transparent 96%)";

/**
 * Light per chapter. Each mood sets the beam's core and edge and the
 * counter-light; ember stays in every one so the brand never leaves the room.
 * These hues live only in the atmosphere, never on UI chrome or data.
 */
const MOODS: Record<string, { a: string; b: string; c: string }> = {
  ember: { a: "#ff8c5a", b: "#c2410c", c: "#7a1e30" },
  dusk: { a: "#b26cff", b: "#f36638", c: "#3b2a8f" },
  night: { a: "#5b74ff", b: "#e8262b", c: "#1d2766" },
  deep: { a: "#8a5cff", b: "#ff6b3d", c: "#2a1d5c" },
  range: { a: "#7fd970", b: "#f36638", c: "#1f4a2a" },
  rose: { a: "#ff5c8a", b: "#f36638", c: "#5a1640" },
  amber: { a: "#ffb238", b: "#f36638", c: "#6a2a10" },
  plum: { a: "#c45cff", b: "#ff7d52", c: "#3a1450" },
};

/**
 * The fixed field every section sits on: a live glucose chart (GlucoseField),
 * a diagonal beam and a counter-light whose colours follow the chapter in view
 * (sections declare `data-mood`), a cross light, a warm vignette and grain.
 * Every layer is fixed and pointer-transparent.
 */
export function Atmosphere() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = (mood: string) => {
      const m = MOODS[mood] ?? MOODS.ember;
      el.style.setProperty("--mood-a", m.a);
      el.style.setProperty("--mood-b", m.b);
      el.style.setProperty("--mood-c", m.c);
    };
    apply("ember");
    if (prefersReducedMotion()) return;

    const triggers: ScrollTrigger[] = [];
    const setup = () => {
      triggers.splice(0).forEach((t) => t.kill());
      document.querySelectorAll<HTMLElement>("[data-mood]").forEach((section) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: section,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => self.isActive && apply(section.dataset.mood ?? "ember"),
          }),
        );
      });
    };
    // Wait a beat so the page's sections have mounted.
    const id = window.setTimeout(setup, 300);
    return () => {
      window.clearTimeout(id);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="atmosphere pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Main beam, the page's light source */}
      <div
        className="beam-drift absolute left-[28%] top-[-45%] h-[190%] w-[32%] origin-center"
        style={{
          background: BEAM,
          maskImage: BEAM_MASK,
          WebkitMaskImage: BEAM_MASK,
          transform: "rotate(-32deg)",
        }}
      />
      {/* A thinner cross light */}
      <div
        className="beam-drift-alt absolute left-[55%] top-[-30%] h-[160%] w-[17%] origin-center opacity-70"
        style={{
          background: CROSS_BEAM,
          maskImage: BEAM_MASK,
          WebkitMaskImage: BEAM_MASK,
          transform: "rotate(22deg)",
        }}
      />
      {/* Counter-light low on the right, and a bloom high on the left */}
      <div
        className="absolute bottom-[-30%] right-[-15%] h-[85%] w-[70%]"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--mood-c) 55%, transparent), transparent)" }}
      />
      <div
        className="absolute left-[-20%] top-[-25%] h-[70%] w-[60%] opacity-60"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--mood-b) 22%, transparent), transparent)" }}
      />
      {/* The live glucose chart */}
      <div className="absolute inset-0 opacity-90">
        <GlucoseField />
      </div>
      {/* Vignette, warm black */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 40%, rgba(13,12,11,0) 55%, rgba(7,5,4,0.8) 100%)" }}
      />
      {/* Grain. Plain opacity, no blend mode: a blended full-screen layer
          recomposites the whole viewport whenever anything under it moves. */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: GRAIN }} />
    </div>
  );
}
