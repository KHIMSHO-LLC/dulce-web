import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, routing, type AppLocale } from "./i18n/routing";
import { ARTICLES } from "./content/articles";
import { LOCALE_COOKIE } from "./lib/localeCookie";
import { REGION_COOKIE } from "./lib/consent";

/**
 * Next.js 16 renamed `middleware.ts` to `proxy.ts`.
 * next-intl's createMiddleware works unchanged — the file convention is what moved.
 */
const intl = createMiddleware(routing);

const PREFIXED = new RegExp(`^/(${locales.join("|")})(?=/|$)`);

/** Public path of a pathnames entry in a locale, without the locale prefix. */
function slugPath(internal: keyof typeof routing.pathnames, locale: AppLocale): string {
  const entry = routing.pathnames[internal];
  return typeof entry === "string" ? entry : entry[locale];
}

/**
 * Spanish was at the root until 2026-11-03. Its URLs that don't also exist in
 * English (Spanish slugs) move permanently to /es. Shared ones (`/`, `/blog`,
 * `/setup`, `/blog/libreview`, ...) are English now; language detection below
 * still sends Spanish browsers to the Spanish page where that's safe.
 */
const SPANISH_ONLY = new Set<string>();
for (const internal of Object.keys(routing.pathnames) as (keyof typeof routing.pathnames)[]) {
  if (internal.includes("[")) continue;
  const es = slugPath(internal, "es");
  if (es !== slugPath(internal, "en")) SPANISH_ONLY.add(es);
}
const englishSlugs = new Set(ARTICLES.map((a) => a.slug.en));
for (const a of ARTICLES) {
  if (a.slug.es && !englishSlugs.has(a.slug.es)) SPANISH_ONLY.add(`/blog/${a.slug.es}`);
}
const SPANISH_ONLY_PREFIXES = ["/autores/"];

function isOldSpanish(path: string): boolean {
  return SPANISH_ONLY.has(path) || SPANISH_ONLY_PREFIXES.some((p) => path.startsWith(p));
}

/**
 * Pages whose path in another language is known without guessing: the static
 * routes (via routing.pathnames) and invite links. Articles and author pages
 * are left alone: a search engine already sent the visitor to the language
 * they searched in (hreflang), and swapping it is what Google advises against.
 */
const STATIC_BY_EN = new Map<string, keyof typeof routing.pathnames>();
for (const internal of Object.keys(routing.pathnames) as (keyof typeof routing.pathnames)[]) {
  if (!internal.includes("[")) STATIC_BY_EN.set(slugPath(internal, "en"), internal);
}

function translatedPath(path: string, locale: AppLocale): string | null {
  const internal = STATIC_BY_EN.get(path);
  const target = internal ? slugPath(internal, locale) : path.startsWith("/f/") ? path : null;
  if (target === null) return null;
  return target === "/" ? `/${locale}` : `/${locale}${target}`;
}

/** The visitor's language: their own choice (switcher cookie), else the browser's languages in order. */
function preferredLocale(request: NextRequest): AppLocale | null {
  const chosen = request.cookies.get(LOCALE_COOKIE)?.value;
  if (chosen && (locales as readonly string[]).includes(chosen)) return chosen as AppLocale;
  const header = request.headers.get("accept-language");
  if (!header) return null;
  const ranked = header
    .split(",")
    .map((part, i) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      const base = tag.trim().toLowerCase().split("-")[0];
      // Norwegian browsers send nb, no or nn; the site's Norwegian is nb.
      const lang = base === "no" || base === "nn" ? "nb" : base;
      return { lang, q: q ? Number(q.trim().slice(2)) || 0 : 1, i };
    })
    .filter((x) => x.q > 0)
    .sort((a, b) => b.q - a.q || a.i - b.i);
  for (const { lang } of ranked) {
    if ((locales as readonly string[]).includes(lang)) return lang as AppLocale;
  }
  return null;
}

/**
 * Article slugs are per language, so `/fr/blog/<english slug>` or `/blog/<german slug>`
 * is a 404 (Search Console found 12 of them, linked before the 2026-11-03 locale move).
 * Send such a URL to the same article in the asked-for language, or in the slug's own
 * language when it isn't translated.
 */
const BLOG_PATH = new RegExp(`^(?:/(${locales.join("|")}))?/blog/([^/]+)/?$`);
const ARTICLE_SLUGS = new Map<string, { slugs: Partial<Record<AppLocale, string>>; own: AppLocale }>();
for (const a of ARTICLES) {
  const slugs = a.slug as Partial<Record<AppLocale, string>>;
  for (const l of locales) {
    const s = slugs[l];
    if (s && !ARTICLE_SLUGS.has(`${l}:${s}`)) ARTICLE_SLUGS.set(`${l}:${s}`, { slugs, own: l });
  }
}
const ANY_SLUG = new Map<string, { slugs: Partial<Record<AppLocale, string>>; own: AppLocale }>();
for (const [key, v] of ARTICLE_SLUGS) {
  const slug = key.slice(key.indexOf(":") + 1);
  if (!ANY_SLUG.has(slug)) ANY_SLUG.set(slug, v);
}

function misplacedArticle(path: string): string | null {
  const m = BLOG_PATH.exec(path);
  if (!m) return null;
  const locale = (m[1] ?? defaultLocale) as AppLocale;
  let slug: string;
  try {
    slug = decodeURIComponent(m[2]);
  } catch {
    return null;
  }
  if (ARTICLE_SLUGS.has(`${locale}:${slug}`)) return null;
  const found = ANY_SLUG.get(slug);
  if (!found) return null;
  const target = found.slugs[locale] ? locale : found.own;
  const targetSlug = encodeURIComponent(found.slugs[target]!);
  return target === defaultLocale ? `/blog/${targetSlug}` : `/${target}/blog/${targetSlug}`;
}

function redirect(request: NextRequest, pathname: string, status: 307 | 308): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  const response = NextResponse.redirect(url, status);
  if (status === 307) response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

/**
 * Also hands the visitor's country (Vercel's geo header) to the client in a
 * session cookie, so the analytics banner is only shown where the law asks for
 * consent (see `consentRequired` in lib/consent.ts).
 */
export default function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const article = isOldSpanish(path) ? null : misplacedArticle(path);
  if (article && article !== path) return redirect(request, article, 308);

  if (!PREFIXED.test(path)) {
    if (isOldSpanish(path)) return redirect(request, `/es${path}`, 308);
    // Only page loads: prefetches and RSC requests come from a page already in a language.
    const isDocument = request.headers.get("sec-fetch-dest") !== "empty" && !request.headers.has("rsc");
    const preferred = isDocument ? preferredLocale(request) : null;
    if (preferred && preferred !== defaultLocale) {
      const target = translatedPath(path, preferred);
      if (target) return redirect(request, target, 307);
    }
  }

  const response = intl(request);
  const country = request.headers.get("x-vercel-ip-country") ?? "";
  if (request.cookies.get(REGION_COOKIE)?.value !== country) {
    response.cookies.set(REGION_COOKIE, country, { path: "/", sameSite: "lax" });
  }
  return response;
}

export const config = {
  // Match all routes except: static files, internal assets, API routes that
  // don't need locale rewriting (the legal forms are Server Actions, not API
  // routes), and /partners (non-localized internal dashboard with its own
  // root layout — must never get locale-prefix rewriting).
  matcher: [
    "/((?!api|_next|_vercel|partners|.*\\..*).*)",
  ],
};
