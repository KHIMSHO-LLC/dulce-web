import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://dulceglucosa.com";

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
  ];

  const now = new Date();

  return internalPaths.map((internal) => ({
    url: urlFor("es", internal),
    lastModified: now,
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
