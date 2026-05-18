"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { cn } from "@/lib/utils/cn";

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const onChange = (next: string) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next as (typeof locales)[number] });
    });
  };

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn(
        "inline-flex items-center gap-1 rounded-[var(--radius-pill)] bg-card border border-border-subtle p-1 text-label",
        pending && "opacity-60",
        className,
      )}
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => onChange(l)}
            disabled={pending}
            aria-pressed={active}
            className={cn(
              "h-7 min-w-9 px-2.5 rounded-[var(--radius-pill)] font-semibold uppercase tracking-wide transition-colors",
              active
                ? "bg-accent text-white"
                : "text-muted hover:text-foreground hover:bg-accent-soft",
            )}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
