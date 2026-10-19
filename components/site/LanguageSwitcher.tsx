"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { cn } from "@/lib/utils/cn";

/** Quiet text toggles, ES, EN and DE. The active one is ink, the other mute. */
export function LanguageSwitcher({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const onChange = (next: (typeof locales)[number]) => {
    if (next === locale) return;
    // Dynamic routes (articles, authors) have a different slug per language,
    // so the router can't build the target. The page's own hreflang link knows it.
    if (pathname.includes("[")) {
      const alt = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${next}"]`);
      const blog = next === "es" ? "/blog" : `/${next}/blog`;
      window.location.assign(alt ? new URL(alt.href).pathname : blog);
      return;
    }
    startTransition(() => {
      router.replace(pathname as Exclude<typeof pathname, `${string}[${string}`>, { locale: next, scroll: false });
    });
  };

  return (
    <div
      role="group"
      aria-label={t("label")}
      translate="no"
      className={cn("inline-flex items-center gap-1", pending && "opacity-60", className)}
    >
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
              tone === "dark"
                ? active
                  ? "text-ink"
                  : "text-mute hover:text-ink"
                : active
                  ? "text-[#1b1714]"
                  : "text-[#8a7f75] hover:text-[#1b1714]",
            )}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
