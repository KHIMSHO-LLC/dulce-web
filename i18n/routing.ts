import { defineRouting } from "next-intl/routing";

export const locales = ["es", "en"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "es";

/**
 * Localized path slugs.
 * Spanish (default) at `/`, English at `/en/...`.
 *
 * The marketing site is a single landing page. Everything else here is a
 * functional route something outside the site depends on (the App Store links
 * the privacy policy, the app deep-links /setup). Retired marketing routes are
 * redirected into landing-page sections in next.config.ts.
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
    // Unlocalized on purpose: the app deep-links here with a fixed `/setup`
    // path (see dulce-app `constants/links.ts`), so both locales must resolve
    // the same slug.
    "/setup": "/setup",
  },
});

export type AppPathname = keyof typeof routing.pathnames;
