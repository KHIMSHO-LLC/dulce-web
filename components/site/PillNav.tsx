"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { appStoreUrl } from "@/lib/appStore";
import { CONTACT_EMAIL, SECTION } from "@/lib/site";
import { cn } from "@/lib/utils/cn";
import { scrollToTarget } from "@/components/motion/SmoothScroll";
import { DropMark } from "./DropMark";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * The page's only navigation: a floating pill at the bottom centre (menu, mark,
 * download) that opens upward into a card with every section, help and legal.
 */
export function PillNav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [tucked, setTucked] = useState(false);
  const cardId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const sections: Array<{ id: string; label: string }> = [
    { id: SECTION.lockScreen, label: t("sections.lockScreen") },
    { id: SECTION.alerts, label: t("sections.alerts") },
    { id: SECTION.standby, label: t("sections.standby") },
    { id: SECTION.watch, label: t("sections.watch") },
    { id: SECTION.family, label: t("sections.family") },
    { id: SECTION.day, label: t("sections.day") },
    { id: SECTION.faq, label: t("sections.faq") },
  ];

  const homeHref = (id: string) => (locale === "es" ? `/#${id}` : `/en#${id}`);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

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

  useEffect(() => {
    if (!open) return;
    cardRef.current?.querySelector<HTMLElement>("a,button")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) close(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open, close]);

  const goTo = (e: React.MouseEvent, id: string) => {
    if (!onHome) return; // let the browser navigate to /#id
    e.preventDefault();
    close(false);
    scrollToTarget(`#${id}`);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <div
      ref={wrapRef}
      className={cn(
        "fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4",
        "transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)]",
        tucked && !open && "pointer-events-none translate-y-[140%] opacity-0",
      )}
    >
      <div className="relative">
        {/* Menu card */}
        <div
          ref={cardRef}
          id={cardId}
          inert={!open}
          data-open={open}
          className={cn(
            "glass absolute bottom-[calc(100%+10px)] left-1/2 w-[min(92vw,380px)] -translate-x-1/2 rounded-[28px] p-5",
            "transition-[clip-path,opacity,filter] duration-500 ease-[var(--ease-out-expo)]",
            open
              ? "opacity-100 blur-0 [clip-path:inset(0_0_0_0_round_28px)]"
              : "pointer-events-none opacity-0 blur-[8px] [clip-path:inset(70%_10%_0_10%_round_28px)]",
          )}
        >
          <nav aria-label={t("menu")}>
            <ul className="grid gap-0.5">
              <li>
                <Link
                  href="/"
                  onClick={(e) => {
                    if (onHome) {
                      e.preventDefault();
                      close(false);
                      scrollToTarget(0);
                    }
                  }}
                  className="block rounded-xl px-2 py-1.5 text-[1.45rem] font-light tracking-tight text-ink transition-colors hover:text-ember"
                  style={{ fontVariationSettings: '"wdth" 104' }}
                >
                  {t("home")}
                </Link>
              </li>
              {sections.map((s, i) => (
                <li
                  key={s.id}
                  className="transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)]"
                  style={{
                    transitionDelay: open ? `${60 + i * 30}ms` : "0ms",
                    opacity: open ? 1 : 0,
                    transform: open ? "none" : "translateY(8px)",
                  }}
                >
                  <a
                    href={homeHref(s.id)}
                    onClick={(e) => goTo(e, s.id)}
                    className="block rounded-xl px-2 py-1.5 text-[1.45rem] font-light tracking-tight text-ink transition-colors hover:text-ember"
                    style={{ fontVariationSettings: '"wdth" 104' }}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-label">
            <div className="grid content-start gap-1.5">
              <p className="text-mute">{t("help")}</p>
              <Link href="/setup" className="text-soft transition-colors hover:text-ink">
                {t("setup")}
              </Link>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-soft transition-colors hover:text-ink">
                {t("contact")}
              </a>
            </div>
            <div className="grid content-start gap-1.5">
              <p className="text-mute">{t("legal")}</p>
              <Link href="/legal/privacy" className="text-soft transition-colors hover:text-ink">
                {t("privacy")}
              </Link>
              <Link href="/legal/terms" className="text-soft transition-colors hover:text-ink">
                {t("terms")}
              </Link>
              <Link href="/legal/disclaimer" className="text-soft transition-colors hover:text-ink">
                {t("disclaimer")}
              </Link>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2 text-label text-mute">
              <span>{t("language")}</span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* The pill */}
        <div className="glass flex h-14 items-center gap-1 rounded-full p-1.5 pl-1.5">
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls={cardId}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
            className="group grid h-11 w-11 cursor-pointer place-items-center rounded-full transition-colors hover:bg-white/8"
          >
            <span className="relative block h-3 w-5" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 top-0 h-[1.5px] w-5 rounded bg-ink transition-transform duration-300 ease-[var(--ease-out-expo)]",
                  open && "translate-y-[5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-[1.5px] w-5 rounded bg-ink transition-transform duration-300 ease-[var(--ease-out-expo)]",
                  open && "-translate-y-[5.5px] -rotate-45",
                )}
              />
            </span>
          </button>
          <Link
            href="/"
            aria-label="Dulce"
            onClick={(e) => {
              if (onHome) {
                e.preventDefault();
                scrollToTarget(0);
              }
            }}
            className="grid h-11 w-12 place-items-center rounded-full transition-colors hover:bg-white/8"
          >
            <DropMark className="h-6" />
          </Link>
          <a
            href={appStoreUrl("web_header")}
            className="ml-1 inline-flex h-11 items-center rounded-full bg-ink px-5 text-label font-semibold text-ground transition-[background-color,transform] duration-200 hover:bg-white active:translate-y-px"
          >
            {t("download")}
          </a>
        </div>
      </div>
    </div>
  );
}
