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
    "/apple-watch": {
      es: "/apple-watch",
      en: "/apple-watch",
    },
    "/lock-screen": {
      es: "/pantalla-de-bloqueo",
      en: "/lock-screen",
    },
    "/android": "/android",
    "/blog": "/blog",
    "/blog/how-to-see-cgm-glucose-on-apple-watch": {
      es: "/blog/como-ver-glucosa-cgm-en-apple-watch",
      en: "/blog/how-to-see-cgm-glucose-on-apple-watch",
    },
    "/blog/time-in-range-vs-a1c": {
      es: "/blog/tiempo-en-rango-vs-hba1c",
      en: "/blog/time-in-range-vs-a1c",
    },
    "/blog/sharing-cgm-glucose-with-family": {
      es: "/blog/compartir-glucosa-cgm-con-familia",
      en: "/blog/sharing-cgm-glucose-with-family",
    }
  },
});

export type AppPathname = keyof typeof routing.pathnames;
