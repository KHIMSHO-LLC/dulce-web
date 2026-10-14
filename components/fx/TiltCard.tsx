"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/components/motion/gsap";
import { cn } from "@/lib/utils/cn";

/**
 * Hover physics for cards: the card leans toward the pointer in 3D, a soft
 * light follows the cursor across its surface, and children marked
 * `data-depth="n"` drift against the tilt for parallax. Fine pointers only;
 * touch and reduced motion get the flat card.
 */
export function TiltCard({
  children,
  className,
  max = 7,
  glare = true,
  lift = 6,
  as: Tag = "div",
  hoverHost = true,
}: {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
  glare?: boolean;
  /** Pixels the card rises toward the viewer on hover. */
  lift?: number;
  as?: "div" | "article" | "a";
  /** Also mark this card as the hover host for 3D anchors and fluid inside. */
  hoverHost?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const depth = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]"));
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
    const z = gsap.quickTo(el, "z", { duration: 0.6, ease: "power3.out" });
    const movers = depth.map((d) => ({
      d: Number(d.dataset.depth) || 1,
      x: gsap.quickTo(d, "x", { duration: 0.7, ease: "power3.out" }),
      y: gsap.quickTo(d, "y", { duration: 0.7, ease: "power3.out" }),
    }));
    gsap.set(el, { transformPerspective: 900, transformStyle: "preserve-3d" });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rx(-py * max);
      ry(px * max);
      z(lift);
      el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
      el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
      movers.forEach((m) => {
        m.x(px * 14 * m.d);
        m.y(py * 14 * m.d);
      });
    };
    const enter = () => el.setAttribute("data-hover", "");
    const leave = () => {
      el.removeAttribute("data-hover");
      rx(0);
      ry(0);
      z(0);
      movers.forEach((m) => {
        m.x(0);
        m.y(0);
      });
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      gsap.set([el, ...depth], { clearProps: "transform" });
    };
  }, [max, lift]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-hover-host={hoverHost ? "" : undefined}
      className={cn("group/tilt relative will-change-transform", className)}
    >
      {children}
      {glare ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-data-[hover]/tilt:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(255,236,220,0.13), rgba(255,236,220,0) 45%)",
          }}
        />
      ) : null}
    </Tag>
  );
}
