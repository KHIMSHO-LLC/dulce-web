import { defineRouting } from "next-intl/routing";

export const locales = ["es", "en"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "es";

/**
 * Localized path slugs.
 * Spanish (default) at `/`, English at `/en/...`.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  // `/` always serves Spanish. Users opt in to English via the language switcher
  // (or by visiting `/en` directly). Keeps canonical URLs stable for SEO.
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/features": {
      es: "/caracteristicas",
      en: "/features",
    },
    "/beta": "/beta",
    "/about": {
      es: "/sobre",
      en: "/about",
    },
    "/contact": {
      es: "/contacto",
      en: "/contact",
    },
    "/legal/privacy": {
      es: "/legal/privacidad",
      en: "/legal/privacy",
    },
    "/legal/terms": {
      es: "/legal/terminos",
      en: "/legal/terms",
    },
    "/legal/disclaimer": {
      es: "/legal/aviso-medico",
      en: "/legal/disclaimer",
    },
    "/legal/cookies": "/legal/cookies",
  },
});

export type AppPathname = keyof typeof routing.pathnames;
