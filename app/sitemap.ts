import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { BLOG_POSTS } from "@/lib/blog";

const SITE_URL = "https://dulceglucosa.com";

/** Real per-post modified dates so Google sees accurate freshness signals. */
const BLOG_LASTMOD = new Map(
  BLOG_POSTS.map((p) => [`/blog/${p.slug}` as string, new Date(p.dateModified)]),
);

type InternalPath = keyof typeof routing.pathnames;

function urlFor(locale: "es" | "en", internal: InternalPath): string {
  const localized = routing.pathnames[internal];
  const path = typeof localized === "string" ? localized : localized[locale];
  if (locale === routing.defaultLocale) {
    return `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;
  }
  return `${SITE_URL}/${locale}${path === "/" ? "" : path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const internalPaths: InternalPath[] = [
    "/",
    "/features",
    "/beta",
    "/about",
    "/contact",
    "/legal/privacy",
    "/legal/terms",
    "/legal/disclaimer",
    "/legal/cookies",
    "/apple-watch",
    "/lock-screen",
    "/family-sharing",
    "/android",
    "/blog",
    "/blog/how-to-see-cgm-glucose-on-apple-watch",
    "/blog/time-in-range-vs-a1c",
    "/blog/sharing-cgm-glucose-with-family",
  ];

  const now = new Date();

  return internalPaths.map((internal) => ({
    url: urlFor("es", internal),
    lastModified: BLOG_LASTMOD.get(internal) ?? now,
    changeFrequency: internal.startsWith("/legal/") ? "yearly" : "weekly",
    priority: internal === "/" ? 1 : 0.7,
    alternates: {
      languages: {
        es: urlFor("es", internal),
        en: urlFor("en", internal),
      },
    },
  }));
}
