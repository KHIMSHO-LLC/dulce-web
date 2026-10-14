import type { Metadata } from "next";
import { routing, type AppLocale, type AppPathname } from "@/i18n/routing";
import { SITE_URL } from "./site";

/** The public path of an internal route in a locale (es at root, en under /en). */
export function localizedPath(locale: AppLocale, internal: AppPathname): string {
  const entry = routing.pathnames[internal];
  const path = typeof entry === "string" ? entry : entry[locale];
  if (locale === routing.defaultLocale) return path;
  return path === "/" ? "/en" : `/en${path}`;
}

/**
 * Per-page canonical + hreflang. Every page must call this: a canonical set
 * once in the layout is inherited by every route and points them all at the
 * home page, which is how search engines end up dropping the other pages.
 */
export function alternatesFor(locale: AppLocale, internal: AppPathname): Metadata["alternates"] {
  const es = localizedPath("es", internal);
  const en = localizedPath("en", internal);
  return {
    canonical: `${SITE_URL}${locale === "es" ? (es === "/" ? "" : es) : en}` || SITE_URL,
    languages: {
      es: `${SITE_URL}${es === "/" ? "" : es}` || SITE_URL,
      en: `${SITE_URL}${en}`,
      "x-default": `${SITE_URL}${es === "/" ? "" : es}` || SITE_URL,
    },
  };
}
