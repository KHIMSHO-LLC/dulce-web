import { defineRouting } from "next-intl/routing";

export const locales = ["es", "en", "de", "fr", "it"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "es";

/**
 * Localized path slugs.
 * Spanish (default) at `/`, the other languages under `/<locale>/...` (en, de, fr, it).
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
  // `/` always serves Spanish. Users opt in to another language via the
  // language switcher (or by visiting `/en`, `/de`). Keeps canonical URLs stable for SEO.
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/legal/privacy": {
      es: "/legal/privacidad",
      en: "/legal/privacy",
      de: "/legal/privacy",
      fr: "/legal/privacy",
      it: "/legal/privacy",
    },
    "/legal/terms": {
      es: "/legal/terminos",
      en: "/legal/terms",
      de: "/legal/terms",
      fr: "/legal/terms",
      it: "/legal/terms",
    },
    "/legal/disclaimer": {
      es: "/legal/aviso-medico",
      en: "/legal/disclaimer",
      de: "/legal/disclaimer",
      fr: "/legal/disclaimer",
      it: "/legal/disclaimer",
    },
    "/legal/cookies": "/legal/cookies",
    // Unlocalized on purpose: the app deep-links here with a fixed `/setup`
    // path (see dulce-app `constants/links.ts`), so both locales must resolve
    // the same slug.
    "/setup": "/setup",
    // Live LibreLinkUp status measured by the relay (lib/lluStatus.ts).
    "/librelinkup-status": {
      es: "/estado-librelinkup",
      en: "/librelinkup-status",
      de: "/librelinkup-status",
      fr: "/statut-librelinkup",
      it: "/stato-librelinkup",
    },
    // Articles: one route, the slug is localized per article (content/articles.ts).
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/authors/[author]": {
      es: "/autores/[author]",
      en: "/authors/[author]",
      de: "/autoren/[author]",
      fr: "/auteurs/[author]",
      it: "/autori/[author]",
    },
    "/tools/glucose-converter": {
      es: "/herramientas/conversor-glucosa-mg-dl-mmol-l",
      en: "/tools/glucose-converter-mg-dl-mmol-l",
      de: "/tools/blutzucker-umrechner-mg-dl-mmol-l",
      fr: "/outils/convertisseur-glycemie-mg-dl-mmol-l",
      it: "/strumenti/convertitore-glicemia-mg-dl-mmol-l",
    },
    "/tools/a1c-calculator": {
      es: "/herramientas/calculadora-hba1c-glucosa-media",
      en: "/tools/a1c-calculator-average-glucose",
      de: "/tools/hba1c-rechner-durchschnittlicher-blutzucker",
      fr: "/outils/calculateur-hba1c-glycemie-moyenne",
      it: "/strumenti/calcolatore-hba1c-glicemia-media",
    },
  },
});

export type AppPathname = keyof typeof routing.pathnames;

/** Languages with their own legal texts. The others show English, noindexed. */
export const LEGAL_LOCALES: readonly AppLocale[] = ["es", "en"];
