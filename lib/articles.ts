import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { AppLocale } from "@/i18n/routing";
import type { Article } from "@/content/articles";
import { AUTHORS } from "@/content/authors";
import { absoluteUrl, localizedPath } from "./seo";

/** Public path of an article in a locale. */
export function articlePath(article: Article, locale: AppLocale): string {
  return localizedPath(locale, "/blog/[slug]", { slug: article.slug[locale] });
}

export function authorPath(authorId: Article["author"], locale: AppLocale): string {
  return localizedPath(locale, "/authors/[author]", { author: AUTHORS[authorId].slug });
}

export function articleUrl(article: Article, locale: AppLocale): string {
  return absoluteUrl(articlePath(article, locale));
}

/** Reading time from the MDX source: words over 200 per minute, at least 2. */
export function readingMinutes(article: Article, locale: AppLocale): number {
  const source = readFileSync(join(process.cwd(), "content/articles", article.id, `${locale}.mdx`), "utf8");
  const prose = source.replace(/<[^>]+>/g, " ").replace(/[#*_>`|-]/g, " ");
  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}
