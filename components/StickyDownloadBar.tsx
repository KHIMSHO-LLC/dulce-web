"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";

const DISMISS_KEY = "dulce_sticky_dl_dismissed";

/**
 * Mobile-only sticky download bar. Keeps the App Store button one tap away as
 * the visitor scrolls — the moment that matters for paid traffic. Dismissible
 * for the session so it never becomes nagware.
 */
export function StickyDownloadBar({ locale }: { locale: "es" | "en" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY) === "1") return;
    // Reveal after a short scroll so it doesn't fight the hero on first paint.
    const onScroll = () => {
      if (window.scrollY > 320) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const title = locale === "es" ? "Dulce — gratis en el App Store" : "Dulce — free on the App Store";
  const dismiss = locale === "es" ? "Cerrar" : "Dismiss";

  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-50 border-t border-border-subtle bg-background/95 backdrop-blur px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-3">
        <span className="flex-1 text-label font-semibold text-foreground leading-tight">{title}</span>
        <AppStoreBadge campaign="web_sticky" locale={locale} />
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem(DISMISS_KEY, "1");
            setVisible(false);
          }}
          aria-label={dismiss}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted hover:bg-accent-soft transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
