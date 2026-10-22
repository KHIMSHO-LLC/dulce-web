import type { MetadataRoute } from "next";
import { LEGAL_LOCALES, locales, routing, type AppLocale, type AppPathname } from "@/i18n/routing";
import { ARTICLES } from "@/content/articles";
import { AUTHORS } from "@/content/authors";
import { articlePath } from "@/lib/articles";
import { absoluteUrl, localizedPath } from "@/lib/seo";

type Entry = MetadataRoute.Sitemap[number];

/** One entry per language, each listing all its translations as alternates. */
function entries(
  paths: Record<AppLocale, string>,
  rest: Omit<Entry, "url" | "alternates">,
  only: readonly AppLocale[] = locales,
): Entry[] {
  const languages = Object.fromEntries(only.map((l) => [l, absoluteUrl(paths[l])]));
  return only.map((l) => ({ url: absoluteUrl(paths[l]), alternates: { languages }, ...rest }));
}

const pathsFor = (internal: AppPathname, params: Record<string, string> = {}) =>
  Object.fromEntries(locales.map((l) => [l, localizedPath(l, internal, params)])) as Record<AppLocale, string>;

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
          lastModified: internal === "/blog" && latestArticle ? new Date(latestArticle) : now,
          changeFrequency: legal ? "yearly" : internal === "/blog" ? "daily" : "monthly",
          priority: internal === "/" ? 1 : internal === "/blog" ? 0.8 : legal ? 0.2 : 0.6,
        },
        legal ? LEGAL_LOCALES : locales,
      );
    }),
    ...ARTICLES.flatMap((article) =>
      entries(
        Object.fromEntries(locales.map((l) => [l, articlePath(article, l)])) as Record<AppLocale, string>,
        { lastModified: new Date(article.dateModified), changeFrequency: "monthly", priority: 0.7 },
      ),
    ),
    ...Object.values(AUTHORS).flatMap((author) =>
      entries(pathsFor("/authors/[author]", { author: author.slug }), {
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.3,
      }),
    ),
  ];
}
