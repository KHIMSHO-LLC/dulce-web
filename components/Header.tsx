"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AppStoreBadge } from "./ui/AppStoreBadge";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as "es" | "en";
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/apple-watch" as const, label: t("appleWatch") },
    { href: "/lock-screen" as const, label: t("lockScreen") },
    { href: "/features" as const, label: t("features") },
    { href: "/blog" as const, label: t("blog") },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border-subtle">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-card focus:text-foreground focus:px-3 focus:py-2 focus:rounded-[var(--radius-button-sm)]"
      >
        {t("skipToContent")}
      </a>
      <div className="container-page flex items-center justify-between h-16">
        <Logo />
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-label font-semibold text-muted hover:text-foreground rounded-[var(--radius-button-sm)] hover:bg-accent-soft transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <AppStoreBadge campaign="web_header" locale={locale} className="scale-90 origin-right" />
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t("closeMenu") : t("openMenu")}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-[var(--radius-button-sm)] hover:bg-accent-soft transition-colors"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <div
        id="mobile-nav"
        className={cn(
          "md:hidden border-t border-border-subtle bg-background transition-[max-height] duration-200 overflow-hidden",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <div className="container-page py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-3 py-3 text-body font-semibold text-foreground rounded-[var(--radius-button-sm)] hover:bg-accent-soft transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center justify-between gap-3 pt-3 mt-2 border-t border-border-subtle">
            <LanguageSwitcher />
            <div onClick={() => setOpen(false)}>
              <AppStoreBadge campaign="web_header" locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
