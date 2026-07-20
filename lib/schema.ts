/**
 * Structured-data (schema.org) builders shared across marketing pages.
 * Keeping them here means every page emits consistent, valid JSON-LD.
 */
import { SITE_URL, BLOG_AUTHOR, type BlogPost } from "@/lib/blog";
import type { AppLocale } from "@/i18n/routing";

/** Public URL for an internal post href, honouring the es-at-root convention. */
function postUrl(post: BlogPost, locale: AppLocale): string {
  return locale === "es" ? `${SITE_URL}${post.href}` : `${SITE_URL}/en${post.href}`;
}

export function blogPostingSchema(post: BlogPost, locale: AppLocale) {
  const url = postUrl(post, locale);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: post.title[locale],
    description: post.description[locale],
    image: `${SITE_URL}${post.image}`,
    inLanguage: locale,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: { "@type": "Person", name: BLOG_AUTHOR },
    publisher: {
      "@type": "Organization",
      name: "Dulce",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/dulce-logo.png`,
      },
    },
  };
}

export type Crumb = { name: string; url: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

/** Builds the breadcrumb trail Home → Blog → Post for an article. */
export function articleBreadcrumbs(post: BlogPost, locale: AppLocale) {
  const base = locale === "es" ? SITE_URL : `${SITE_URL}/en`;
  return breadcrumbSchema([
    { name: locale === "es" ? "Inicio" : "Home", url: base },
    { name: "Blog", url: `${base}/blog` },
    { name: post.title[locale], url: postUrl(post, locale) },
  ]);
}

export type FaqItem = { question: string; answer: string };

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
}
