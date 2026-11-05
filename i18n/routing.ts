import { defineRouting } from "next-intl/routing";

export const locales = ["en", "es", "de", "fr", "it", "fi", "nl", "nb", "sv", "ru"] as const;
export type AppLocale = (typeof locales)[number];
/** Languages every article and tool text is written in. fi and nl (added 2026-11-04) and nb, sv, ru (2026-11-05) have the site
 * chrome, home, setup, tools and legal fallback; their articles appear as they get translated. */
export const CORE_LOCALES = ["en", "es", "de", "fr", "it"] as const;
export type CoreLocale = (typeof CORE_LOCALES)[number];
export type ExtraLocale = Exclude<AppLocale, CoreLocale>;
export const defaultLocale: AppLocale = "en";

/**
 * Localized path slugs.
 * English (default) at `/`, the other languages under `/<locale>/...` (es, de, fr, it).
 * Until 2026-11-03 Spanish was at `/`; proxy.ts sends those old Spanish URLs to `/es/...`.
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
  // Language detection is done by proxy.ts (NEXT_LOCALE cookie, then the
  // browser's languages) and only on pages that have no per-language slug, so
  // an article a search engine sent someone to is never swapped for another one.
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/legal/privacy": {
      es: "/legal/privacidad",
      en: "/legal/privacy",
      de: "/legal/privacy",
      fr: "/legal/privacy",
      it: "/legal/privacy",
      fi: "/legal/privacy",
      nl: "/legal/privacy",
      nb: "/legal/privacy",
      sv: "/legal/privacy",
      ru: "/legal/privacy",
    },
    "/legal/terms": {
      es: "/legal/terminos",
      en: "/legal/terms",
      de: "/legal/terms",
      fr: "/legal/terms",
      it: "/legal/terms",
      fi: "/legal/terms",
      nl: "/legal/terms",
      nb: "/legal/terms",
      sv: "/legal/terms",
      ru: "/legal/terms",
    },
    "/legal/disclaimer": {
      es: "/legal/aviso-medico",
      en: "/legal/disclaimer",
      de: "/legal/disclaimer",
      fr: "/legal/disclaimer",
      it: "/legal/disclaimer",
      fi: "/legal/disclaimer",
      nl: "/legal/disclaimer",
      nb: "/legal/disclaimer",
      sv: "/legal/disclaimer",
      ru: "/legal/disclaimer",
    },
    "/legal/cookies": "/legal/cookies",
    // Unlocalized on purpose: the app deep-links here with a fixed `/setup`
    // path (see dulce-app `constants/links.ts`), so both locales must resolve
    // the same slug.
    "/setup": "/setup",
    "/pro": "/pro",
    // Segment hub: who Dulce is for, by person and by type of diabetes.
    "/who-is-dulce-for": {
      es: "/para-quien-es-dulce",
      en: "/who-is-dulce-for",
      de: "/fuer-wen-ist-dulce",
      fr: "/pour-qui-est-dulce",
      it: "/per-chi-e-dulce",
      fi: "/kenelle-dulce-sopii",
      nl: "/voor-wie-is-dulce",
      nb: "/hvem-er-dulce-for",
      sv: "/vem-ar-dulce-for",
      ru: "/dlya-kogo-dulce",
    },
    // Live LibreLinkUp status measured by the relay (lib/lluStatus.ts).
    "/librelinkup-status": {
      es: "/estado-librelinkup",
      en: "/librelinkup-status",
      de: "/librelinkup-status",
      fr: "/statut-librelinkup",
      it: "/stato-librelinkup",
      fi: "/librelinkup-tila",
      nl: "/librelinkup-storing",
      nb: "/librelinkup-status",
      sv: "/librelinkup-status",
      ru: "/librelinkup-status",
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
      fi: "/kirjoittajat/[author]",
      nl: "/auteurs/[author]",
      nb: "/forfattere/[author]",
      sv: "/forfattare/[author]",
      ru: "/authors/[author]",
    },
    "/tools/glucose-converter": {
      es: "/herramientas/conversor-glucosa-mg-dl-mmol-l",
      en: "/tools/glucose-converter-mg-dl-mmol-l",
      de: "/tools/blutzucker-umrechner-mg-dl-mmol-l",
      fr: "/outils/convertisseur-glycemie-mg-dl-mmol-l",
      it: "/strumenti/convertitore-glicemia-mg-dl-mmol-l",
      fi: "/tyokalut/verensokeri-muunnin-mg-dl-mmol-l",
      nl: "/tools/bloedsuiker-omrekenen-mg-dl-mmol-l",
      nb: "/verktoy/blodsukker-omregner-mg-dl-mmol-l",
      sv: "/verktyg/blodsocker-omvandlare-mg-dl-mmol-l",
      ru: "/tools/konverter-glyukozy-mg-dl-mmol-l",
    },
    "/tools/sensor-end-date": {
      es: "/herramientas/calculadora-fin-sensor-libre",
      en: "/tools/libre-sensor-end-date-calculator",
      de: "/tools/libre-sensor-ablauf-rechner",
      fr: "/outils/calculateur-fin-capteur-libre",
      it: "/strumenti/calcolatore-scadenza-sensore-libre",
      fi: "/tyokalut/libre-sensorin-vaihtopaiva-laskuri",
      nl: "/tools/libre-sensor-einddatum-berekenen",
      nb: "/verktoy/libre-sensor-utlopsdato-kalkulator",
      sv: "/verktyg/libre-sensor-slutdatum-kalkylator",
      ru: "/tools/kalkulyator-okonchaniya-sensora-libre",
    },
    "/tools/a1c-calculator": {
      es: "/herramientas/calculadora-hba1c-glucosa-media",
      en: "/tools/a1c-calculator-average-glucose",
      de: "/tools/hba1c-rechner-durchschnittlicher-blutzucker",
      fr: "/outils/calculateur-hba1c-glycemie-moyenne",
      it: "/strumenti/calcolatore-hba1c-glicemia-media",
      fi: "/tyokalut/hba1c-laskuri-keskiverensokeri",
      nl: "/tools/hba1c-berekenen-gemiddelde-glucose",
      nb: "/verktoy/hba1c-kalkulator-gjennomsnittlig-blodsukker",
      sv: "/verktyg/hba1c-kalkylator-genomsnittligt-blodsocker",
      ru: "/tools/kalkulyator-hba1c-srednyaya-glyukoza",
    },
  },
});

export type AppPathname = keyof typeof routing.pathnames;

/** Languages with their own legal texts (sitemap). fi and nl show the English text with a notice, noindex. */
export const LEGAL_LOCALES: readonly AppLocale[] = CORE_LOCALES;
/** Legal texts translated from the Spanish one, which prevails (they show a notice saying so). */
export const TRANSLATED_LEGAL_LOCALES: readonly AppLocale[] = ["de", "fr", "it"];
/** Languages without their own legal texts: their legal pages show the English text (see app/[locale]/legal). */
export const ENGLISH_LEGAL_LOCALES: readonly AppLocale[] = ["fi", "nl", "nb", "sv", "ru"];
