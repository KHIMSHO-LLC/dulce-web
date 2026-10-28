import type { Metadata } from "next";
import { locales, routing, type AppLocale, type AppPathname } from "@/i18n/routing";
import { SITE_URL } from "./site";

/** Prefix a locale-relative path: es at root, the others under /<locale>. */
export function withLocalePrefix(locale: AppLocale, path: string): string {
  if (locale === routing.defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** The public path of an internal route in a locale (es at root, other languages under /<locale>). */
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
export const OG_LOCALE: Record<AppLocale, string> = { es: "es_ES", en: "en_US", de: "de_DE", fr: "fr_FR", it: "it_IT" };

type OpenGraph = NonNullable<Metadata["openGraph"]>;
type OgFields = { title: string; description: string } & Record<string, unknown>;

/**
 * Full OpenGraph for a page. Next merges metadata shallowly: a page that sets
 * `openGraph` replaces the layout's whole object, so og:locale, its
 * alternates, og:url and og:site_name are rebuilt here for every page.
 */
export function openGraphFor(locale: AppLocale, url: string, fields: OgFields): OpenGraph {
  return {
    type: "website",
    siteName: "Dulce",
    locale: OG_LOCALE[locale],
    alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
    url,
    ...fields,
  } as OpenGraph;
}

/** Canonical, hreflang and OpenGraph of a page from its public path in each locale. */
export function seoFromPaths(
  locale: AppLocale,
  paths: Partial<Record<AppLocale, string>>,
  og: OgFields,
): Pick<Metadata, "alternates" | "openGraph"> {
  return {
    alternates: alternatesFromPaths(locale, paths),
    openGraph: openGraphFor(locale, absoluteUrl(paths[locale] ?? "/"), og),
  };
}

/** Canonical, hreflang and OpenGraph of an internal route. Every page's metadata spreads this. */
export function seoFor(
  locale: AppLocale,
  internal: AppPathname,
  og: OgFields,
  params: Record<string, string> = {},
): Pick<Metadata, "alternates" | "openGraph"> {
  const paths = Object.fromEntries(locales.map((l) => [l, localizedPath(l, internal, params)]));
  return seoFromPaths(locale, paths, og);
}
