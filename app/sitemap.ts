import type { MetadataRoute } from "next";
import { CORE_LOCALES, LEGAL_LOCALES, locales, routing, type AppLocale, type AppPathname } from "@/i18n/routing";
import { ARTICLES, articleLocales } from "@/content/articles";
import { HELP } from "@/content/help";
import { AUTHORS } from "@/content/authors";
import { articlePath } from "@/lib/articles";
import { lastModified } from "@/lib/lastModified";
import { absoluteUrl, localizedPath } from "@/lib/seo";

type Entry = MetadataRoute.Sitemap[number];

/** One entry per language, each listing all its translations as alternates. */
function entries(
  paths: Record<AppLocale, string>,
  rest: Omit<Entry, "url" | "alternates">,
  only: readonly AppLocale[] = locales,
): Entry[] {
  const languages: Record<string, string> = Object.fromEntries(only.map((l) => [l, absoluteUrl(paths[l])]));
  languages["x-default"] = absoluteUrl(paths[routing.defaultLocale]);
  return only.map((l) => ({ url: absoluteUrl(paths[l]), alternates: { languages }, ...rest }));
}

const pathsFor = (internal: AppPathname, params: Record<string, string> = {}) =>
  Object.fromEntries(locales.map((l) => [l, localizedPath(l, internal, params)])) as Record<AppLocale, string>;

const MESSAGES = "messages";

/** Source files behind each static route, for a real lastmod (lib/lastModified.ts). */
const SOURCES: Partial<Record<AppPathname, string[]>> = {
  "/": ["app/[locale]/page.tsx", "components/landing", MESSAGES],
  "/setup": ["app/[locale]/setup", MESSAGES],
  "/pro": ["app/[locale]/pro", MESSAGES],
  "/sensors": ["app/[locale]/sensors", "lib/sensors.ts", MESSAGES],
  "/who-is-dulce-for": ["app/[locale]/who-is-dulce-for", MESSAGES],
  "/help": ["app/[locale]/help/page.tsx", "content/help.ts", MESSAGES],
  "/legal/privacy": ["app/[locale]/legal/privacy", "components/legal/PrivacyEs.tsx", "components/legal/PrivacyEn.tsx"],
  "/legal/terms": ["app/[locale]/legal/terms", "components/legal/TermsEs.tsx", "components/legal/TermsEn.tsx"],
  "/legal/disclaimer": [
    "app/[locale]/legal/disclaimer",
    "components/legal/DisclaimerEs.tsx",
    "components/legal/DisclaimerEn.tsx",
  ],
  "/legal/cookies": ["app/[locale]/legal/cookies", "components/legal/CookiesEs.tsx", "components/legal/CookiesEn.tsx"],
  "/tools/glucose-converter": [
    "app/[locale]/tools/glucose-converter",
    "content/tools/glucose-converter",
    "components/tools/GlucoseConverter.tsx",
    "components/tools/ToolPage.tsx",
    "lib/tools.ts",
  ],
  "/tools/a1c-calculator": [
    "app/[locale]/tools/a1c-calculator",
    "content/tools/a1c-calculator",
    "components/tools/A1cCalculator.tsx",
    "components/tools/ToolPage.tsx",
    "lib/tools.ts",
  ],
  "/tools/sensor-end-date": [
    "app/[locale]/tools/sensor-end-date",
    "content/tools/sensor-end-date",
    "components/tools/SensorEndCalculator.tsx",
    "components/tools/ToolPage.tsx",
    "lib/tools.ts",
  ],
  "/tools/time-in-range-calculator": [
    "app/[locale]/tools/time-in-range-calculator",
    "content/tools/time-in-range-calculator",
    "components/tools/TimeInRangeCalculator.tsx",
    "components/tools/ToolPage.tsx",
    "lib/tools.ts",
  ],
  "/tools/gmi-calculator": [
    "app/[locale]/tools/gmi-calculator",
    "content/tools/gmi-calculator",
    "components/tools/GmiCalculator.tsx",
    "components/tools/ConversionTables.tsx",
    "components/tools/ToolPage.tsx",
    "lib/tools.ts",
  ],
};

/**
 * The landing page, functional routes, every article, author and calculator.
 * Retired pages redirect and are not listed. Legal pages in other languages show the
 * English text and are noindex, so they are left out.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics = (Object.keys(routing.pathnames) as AppPathname[]).filter((p) => !p.includes("["));
  const latestArticle = ARTICLES.map((a) => a.dateModified).sort().at(-1);

  return [
    ...statics.flatMap((internal) => {
      const legal = internal.startsWith("/legal/");
      return entries(
        pathsFor(internal),
        {
          // The status page is live data (refreshed hourly), the blog index changes with its newest article.
          lastModified:
            internal === "/librelinkup-status"
              ? now
              : internal === "/blog" && latestArticle
                ? new Date(latestArticle)
                : SOURCES[internal]
                  ? lastModified(...SOURCES[internal])
                  : undefined,
          changeFrequency: legal
            ? "yearly"
            : internal === "/librelinkup-status"
              ? "hourly"
              : internal === "/blog"
                ? "daily"
                : "monthly",
          priority: internal === "/" ? 1 : internal === "/blog" ? 0.8 : legal ? 0.2 : 0.6,
        },
        // Help pages exist in the core languages only (the others show English, noindex).
        legal ? LEGAL_LOCALES : internal === "/help" ? CORE_LOCALES : locales,
      );
    }),
    ...HELP.flatMap((help) =>
      entries(
        pathsFor("/help/[slug]", { slug: help.id }),
        { lastModified: new Date(help.dateModified), changeFrequency: "monthly", priority: 0.5 },
        CORE_LOCALES,
      ),
    ),
    ...ARTICLES.flatMap((article) =>
      entries(
        Object.fromEntries(articleLocales(article).map((l) => [l, articlePath(article, l)])) as Record<AppLocale, string>,
        { lastModified: new Date(article.dateModified), changeFrequency: "monthly", priority: 0.7 },
        articleLocales(article),
      ),
    ),
    ...Object.values(AUTHORS).flatMap((author) =>
      entries(pathsFor("/authors/[author]", { author: author.slug }), {
        lastModified: lastModified("content/authors.ts", "app/[locale]/authors"),
        changeFrequency: "monthly",
        priority: 0.3,
      }),
    ),
  ];
}
