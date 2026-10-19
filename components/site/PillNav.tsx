"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { appStoreUrl } from "@/lib/appStore";
import { CONTACT_EMAIL, SECTION, homeSection } from "@/lib/site";
import type { AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils/cn";
import { gsap, prefersReducedMotion } from "@/components/motion/gsap";
import { scrollToTarget } from "@/components/motion/SmoothScroll";
import { DropMark } from "./DropMark";
import { LanguageSwitcher } from "./LanguageSwitcher";

const PILL_H = 56;
const LIFT = 68; // room for the close button under the open card

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * The page's only navigation. Closed, it is a cream pill at the bottom centre
 * (menu, mark, download). Opening plays one morph: the page dims, the pill
 * stretches into a bar, grows into a card, the links rise in, and a round
 * close button takes the pill's place. Closing runs it backwards, faster.
 */
export function PillNav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [tucked, setTucked] = useState(false);
  const cardId = useId();

  const shellRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const sections: Array<{ id: string; label: string }> = [
    { id: SECTION.lockScreen, label: t("sections.lockScreen") },
    { id: SECTION.alerts, label: t("sections.alerts") },
    { id: SECTION.standby, label: t("sections.standby") },
    { id: SECTION.watch, label: t("sections.watch") },
    { id: SECTION.family, label: t("sections.family") },
    { id: SECTION.day, label: t("sections.day") },
    { id: SECTION.faq, label: t("sections.faq") },
  ];
  const homeHref = (id: string) => homeSection(locale as AppLocale, id);

  // Build the morph from measured sizes; rebuild when the viewport changes.
  useIsoLayoutEffect(() => {
    const shell = shellRef.current;
    const pill = pillRef.current;
    const card = cardRef.current;
    const close = closeRef.current;
    const backdrop = backdropRef.current;
    if (!shell || !pill || !card || !close || !backdrop) return;

    const build = () => {
      const progress = tlRef.current?.progress() ?? 0;
      tlRef.current?.kill();
      const pillW = pill.scrollWidth;
      const cardW = Math.min(window.innerWidth * 0.92, 384);
      card.style.width = `${cardW}px`;
      const cardH = Math.min(card.scrollHeight, window.innerHeight - LIFT - 48);
      const items = card.querySelectorAll<HTMLElement>("[data-item]");
      const fast = prefersReducedMotion();

      gsap.set(shell, { width: pillW, height: PILL_H, borderRadius: PILL_H / 2, y: 0, xPercent: -50 });
      gsap.set(card, { autoAlpha: 0 });
      gsap.set(items, { autoAlpha: 0, y: 14 });
      gsap.set(close, { autoAlpha: 0, scale: 0.6 });
      gsap.set(backdrop, { autoAlpha: 0 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut" } });
      tl.to(backdrop, { autoAlpha: 1, duration: 0.4 }, 0)
        .to(pill, { autoAlpha: 0, duration: 0.14, ease: "power1.out" }, 0)
        // Stage one: the pill stretches into a bar.
        .to(shell, { width: cardW, duration: 0.3 }, 0.04)
        // Stage two: the bar grows into the card and lifts to clear the close button.
        .to(shell, { height: cardH, borderRadius: 30, y: -LIFT, duration: 0.42 }, 0.3)
        .set(card, { autoAlpha: 1 }, 0.5)
        .to(items, { autoAlpha: 1, y: 0, duration: 0.36, stagger: 0.03, ease: "power3.out" }, 0.52)
        .to(close, { autoAlpha: 1, scale: 1, duration: 0.32, ease: "back.out(2.2)" }, 0.56);
      if (fast) tl.timeScale(4);
      tl.progress(progress);
      tlRef.current = tl;
    };
    build();
    const onResize = () => build();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      tlRef.current?.kill();
    };
  }, [locale]);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (open) tl.timeScale(prefersReducedMotion() ? 4 : 1).play();
    else tl.timeScale(prefersReducedMotion() ? 4 : 1.6).reverse();
  }, [open]);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) window.setTimeout(() => toggleRef.current?.focus(), 60);
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(
      () => cardRef.current?.querySelector<HTMLElement>("a,button")?.focus({ preventScroll: true }),
      500,
    );
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  // Step aside while the footer wordmark (the page's last image) is in view.
  useEffect(() => {
    const mark = document.querySelector("[data-wordmark]");
    if (!mark) return;
    const io = new IntersectionObserver(([e]) => setTucked(e.intersectionRatio > 0.45), {
      threshold: [0, 0.45, 1],
    });
    io.observe(mark);
    return () => io.disconnect();
  }, [pathname]);

  const goTo = (e: React.MouseEvent, id: string | 0) => {
    if (!onHome) return; // let the browser navigate to /#id
    e.preventDefault();
    close(false);
    window.setTimeout(() => {
      scrollToTarget(id === 0 ? 0 : `#${id}`);
      if (id !== 0) history.replaceState(null, "", `#${id}`);
    }, 260);
  };

  const linkClass =
    "block py-1 text-[1.6rem] font-light leading-tight tracking-[-0.02em] text-[#1b1714] transition-colors hover:text-ember-deep";
  const smallClass = "text-[#4a413a] transition-colors hover:text-[#1b1714]";

  return (
    <>
      <div
        ref={backdropRef}
        aria-hidden
        onClick={() => close(false)}
        className={cn(
          "invisible fixed inset-0 z-[55] bg-[rgba(8,6,5,0.62)] opacity-0 backdrop-blur-[3px]",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      />
      <div
        className={cn(
          "fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[56] h-14",
          "transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)]",
          tucked && !open && "pointer-events-none translate-y-[160%] opacity-0",
        )}
      >
        <div
          ref={shellRef}
          className="absolute bottom-0 left-1/2 overflow-hidden shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)]"
          style={{
            width: 240,
            height: PILL_H,
            borderRadius: PILL_H / 2,
            background: "linear-gradient(180deg, #f8f2ec 0%, #e8dfd5 100%)",
          }}
        >
          {/* Closed: the pill */}
          <div ref={pillRef} inert={open} className="absolute bottom-0 left-0 flex h-14 items-center gap-1 p-1.5">
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls={cardId}
              aria-label={t("openMenu")}
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full transition-colors hover:bg-black/5"
            >
              <span className="relative block h-3 w-5" aria-hidden>
                <span className="absolute left-0 top-0 h-[1.5px] w-5 rounded bg-[#1b1714]" />
                <span className="absolute bottom-0 left-0 h-[1.5px] w-5 rounded bg-[#1b1714]" />
              </span>
            </button>
            <Link
              href="/"
              aria-label="Dulce"
              onClick={(e) => goTo(e, 0)}
              className="grid h-11 w-12 place-items-center rounded-full transition-colors hover:bg-black/5"
            >
              <DropMark className="h-6" />
            </Link>
            <a
              href={appStoreUrl("web_header")}
              className="ml-1 inline-flex h-11 items-center whitespace-nowrap rounded-full bg-[#1b1714] px-5 text-label font-semibold text-ink transition-[background-color,transform] duration-200 hover:bg-black active:translate-y-px"
            >
              {t("download")}
            </a>
          </div>

          {/* Open: the card */}
          <div
            ref={cardRef}
            id={cardId}
            inert={!open}
            data-lenis-prevent
            className="no-scrollbar invisible absolute left-0 top-0 max-h-full overflow-y-auto p-6 opacity-0"
          >
            <div className="flex items-start justify-between gap-4">
              <nav aria-label={t("menu")}>
                <ul>
                  <li data-item>
                    <Link href="/" onClick={(e) => goTo(e, 0)} className={cn(linkClass, "text-[#8a7f75]")}>
                      {t("home")}
                    </Link>
                  </li>
                  {sections.map((s) => (
                    <li key={s.id} data-item>
                      <a href={homeHref(s.id)} onClick={(e) => goTo(e, s.id)} className={linkClass}>
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <span data-item className="pt-2">
                <DropMark className="h-7" />
              </span>
            </div>

            <div data-item className="mt-5 h-px bg-[#1b1714]/12" />

            <div data-item className="mt-4 grid grid-cols-2 gap-4 text-label">
              <div className="grid content-start gap-1.5">
                <Link href="/blog" className={smallClass}>
                  {t("guides")}
                </Link>
                <Link href="/setup" className={smallClass}>
                  {t("setup")}
                </Link>
                <a href={`mailto:${CONTACT_EMAIL}`} className={smallClass}>
                  {t("contact")}
                </a>
              </div>
              <div className="grid content-start gap-1.5">
                <Link href="/legal/privacy" className={smallClass}>
                  {t("privacy")}
                </Link>
                <Link href="/legal/terms" className={smallClass}>
                  {t("terms")}
                </Link>
                <Link href="/legal/disclaimer" className={smallClass}>
                  {t("disclaimer")}
                </Link>
              </div>
            </div>

            <div data-item className="mt-4 flex items-center gap-2 text-label text-[#6b6058]">
              <span>{t("language")}</span>
              <LanguageSwitcher tone="light" />
            </div>

            <a
              data-item
              href={appStoreUrl("web_header")}
              className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-[#1b1714] text-label font-semibold text-ink transition-colors hover:bg-black"
            >
              {t("download")}
            </a>
          </div>
        </div>

        {/* Where the pill was: the close button */}
        <button
          ref={closeRef}
          type="button"
          aria-label={t("closeMenu")}
          onClick={() => close()}
          tabIndex={open ? 0 : -1}
          className="invisible absolute bottom-0.5 left-1/2 -ml-6 grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-white/15 bg-[#1d1916]/90 text-ink opacity-0 backdrop-blur transition-colors hover:bg-[#29241f]"
        >
          <X className="h-5 w-5" strokeWidth={1.6} />
        </button>
      </div>
    </>
  );
}
