"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { cn } from "@/lib/utils/cn";

/** Two quiet text toggles, ES and EN. The active one is ink, the other mute. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const onChange = (next: (typeof locales)[number]) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next, scroll: false });
    });
  };

  return (
    <div role="group" aria-label={t("label")} className={cn("inline-flex items-center gap-1", pending && "opacity-60", className)}>
      {locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            onClick={() => onChange(l)}
            disabled={pending}
            aria-pressed={active}
            aria-label={t(l)}
            className={cn(
              "h-9 min-w-9 rounded-full px-2.5 text-label font-semibold uppercase tracking-wide transition-colors duration-200",
              active ? "text-ink" : "text-mute hover:text-ink",
            )}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
