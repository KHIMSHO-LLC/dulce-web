import { defineRouting } from "next-intl/routing";

export const locales = ["es", "en", "de"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "es";

/**
 * Localized path slugs.
 * Spanish (default) at `/`, English at `/en/...`, German at `/de/...`.
 *
 * The marketing story is a single landing page. Besides it: functional routes
 * something outside the site depends on (the App Store links the privacy
 * policy, the app deep-links /setup), the articles under /blog (content/), the
 * author pages and the calculators. Retired marketing routes are redirected
 * into landing-page sections in next.config.ts.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  // `/` always serves Spanish. Users opt in to English or German via the
  // language switcher (or by visiting `/en`, `/de`). Keeps canonical URLs stable for SEO.
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/legal/privacy": {
      es: "/legal/privacidad",
      en: "/legal/privacy",
      de: "/legal/privacy",
    },
    "/legal/terms": {
      es: "/legal/terminos",
      en: "/legal/terms",
      de: "/legal/terms",
    },
    "/legal/disclaimer": {
      es: "/legal/aviso-medico",
      en: "/legal/disclaimer",
      de: "/legal/disclaimer",
    },
    "/legal/cookies": "/legal/cookies",
    // Unlocalized on purpose: the app deep-links here with a fixed `/setup`
    // path (see dulce-app `constants/links.ts`), so both locales must resolve
    // the same slug.
    "/setup": "/setup",
    // Articles: one route, the slug is localized per article (content/articles.ts).
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/authors/[author]": {
      es: "/autores/[author]",
      en: "/authors/[author]",
      de: "/autoren/[author]",
    },
    "/tools/glucose-converter": {
      es: "/herramientas/conversor-glucosa-mg-dl-mmol-l",
      en: "/tools/glucose-converter-mg-dl-mmol-l",
      de: "/tools/blutzucker-umrechner-mg-dl-mmol-l",
    },
    "/tools/a1c-calculator": {
      es: "/herramientas/calculadora-hba1c-glucosa-media",
      en: "/tools/a1c-calculator-average-glucose",
      de: "/tools/hba1c-rechner-durchschnittlicher-blutzucker",
    },
  },
});

export type AppPathname = keyof typeof routing.pathnames;
