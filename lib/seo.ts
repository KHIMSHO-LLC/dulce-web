import type { Metadata } from "next";
import { locales, routing, type AppLocale, type AppPathname } from "@/i18n/routing";
import { SITE_URL } from "./site";

/** Prefix a locale-relative path: es at root, the others under /<locale>. */
export function withLocalePrefix(locale: AppLocale, path: string): string {
  if (locale === routing.defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** The public path of an internal route in a locale (es at root, en under /en, de under /de). */
export function localizedPath(
  locale: AppLocale,
  internal: AppPathname,
  params: Record<string, string> = {},
): string {
  const entry = routing.pathnames[internal];
  let path: string = typeof entry === "string" ? entry : entry[locale];
  for (const [key, value] of Object.entries(params)) path = path.replace(`[${key}]`, value);
  return withLocalePrefix(locale, path);
}

/** Absolute URL of a public path. */
export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/**
 * Canonical + hreflang from the public path of the page in each locale.
 * Locales missing from `paths` (an article not written in that language yet)
 * get no hreflang entry.
 */
export function alternatesFromPaths(
  locale: AppLocale,
  paths: Partial<Record<AppLocale, string>>,
): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    const p = paths[l];
    if (p) languages[l] = absoluteUrl(p);
  }
  const fallback = paths[routing.defaultLocale] ?? paths[locale];
  if (fallback) languages["x-default"] = absoluteUrl(fallback);
  return { canonical: absoluteUrl(paths[locale] ?? "/"), languages };
}

/**
 * Per-page canonical + hreflang. Every page must call this: a canonical set
 * once in the layout is inherited by every route and points them all at the
 * home page, which is how search engines end up dropping the other pages.
 */
export function alternatesFor(
  locale: AppLocale,
  internal: AppPathname,
  params: Record<string, string> = {},
): Metadata["alternates"] {
  const paths = Object.fromEntries(locales.map((l) => [l, localizedPath(l, internal, params)]));
  return alternatesFromPaths(locale, paths);
}

/** OpenGraph locale codes. */
export const OG_LOCALE: Record<AppLocale, string> = { es: "es_ES", en: "en_US", de: "de_DE" };
