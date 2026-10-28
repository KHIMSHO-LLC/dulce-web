/**
 * Structured-data (schema.org) builders. Keeping them here means every page
 * emits consistent, valid JSON-LD. Entities link by `@id`: the Organization and
 * WebSite are emitted once per page by the locale layout, everything else
 * points at them.
 */
import type { AppLocale } from "@/i18n/routing";
import { AUTHORS, type AuthorId } from "@/content/authors";
import { APP_STORE_ID } from "./appStore";
import { authorPath } from "./articles";
import { absoluteUrl } from "./seo";
import { CONTACT_EMAIL, SITE_URL, SOCIAL } from "./site";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const APP_ID = `${SITE_URL}/#app`;
export const APP_STORE_URL = `https://apps.apple.com/app/id${APP_STORE_ID}`;

const publisher = { "@id": ORG_ID };

/**
 * Content dates are calendar days (YYYY-MM-DD). Google's Article check wants a
 * full datetime with a timezone, so emit midnight UTC of that day.
 */
const dateTime = (day: string) => (/^\d{4}-\d{2}-\d{2}$/.test(day) ? `${day}T00:00:00Z` : day);

/** Author of a page as a Person, linked to their author page in this locale. */
export function authorPerson(id: AuthorId, locale: AppLocale) {
  const author = AUTHORS[id];
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person-${author.slug}`,
    name: author.name,
    url: absoluteUrl(authorPath(id, locale)),
    jobTitle: author.role[locale],
    description: author.role[locale],
  };
}

/** Site-wide Organization + WebSite graph (locale layout). */
export function siteSchema(locale: AppLocale, description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "Dulce",
        url: SITE_URL,
        email: CONTACT_EMAIL,
        // Square PNG, 2731 px (Google needs ≥112 px).
        logo: { "@type": "ImageObject", url: `${SITE_URL}/dulce-logo.png`, width: 2731, height: 2731 },
        sameAs: [APP_STORE_URL, ...SOCIAL.map((s) => s.url)],
        foundingLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "ES" } },
        founder: authorPerson("giorgi", locale),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: "Dulce",
        description,
        inLanguage: locale,
        publisher,
      },
    ],
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

export type FaqItem = { question: string; answer: string };

export function faqSchema(items: FaqItem[], locale?: AppLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(locale ? { inLanguage: locale } : {}),
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
}

export function articleSchema(input: {
  url: string;
  headline: string;
  description: string;
  image: string;
  locale: string;
  datePublished: string;
  dateModified: string;
  author: ReturnType<typeof authorPerson>;
  keywords: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": input.url,
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
    url: input.url,
    headline: input.headline,
    description: input.description,
    image: input.image,
    inLanguage: input.locale,
    datePublished: dateTime(input.datePublished),
    dateModified: dateTime(input.dateModified),
    author: input.author,
    keywords: input.keywords.join(", "),
    isPartOf: { "@id": WEBSITE_ID },
    publisher,
  };
}

/** A free calculator page. */
export function toolSchema(input: { url: string; name: string; description: string; locale: AppLocale; dateModified: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${input.url}#tool`,
    name: input.name,
    description: input.description,
    url: input.url,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    inLanguage: input.locale,
    isAccessibleForFree: true,
    dateModified: dateTime(input.dateModified),
    author: { "@id": `${SITE_URL}/#person-${AUTHORS.giorgi.slug}` },
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    publisher,
  };
}

/** HowTo for guides with numbered <Step> blocks (setup and troubleshooting). */
export function howToSchema(input: {
  url: string;
  name: string;
  description: string;
  locale: string;
  image?: string;
  dateModified?: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${input.url}#howto`,
    name: input.name,
    description: input.description,
    inLanguage: input.locale,
    ...(input.image ? { image: input.image } : {}),
    ...(input.dateModified ? { dateModified: dateTime(input.dateModified) } : {}),
    step: input.steps.map((st, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: st.name,
      text: st.text,
    })),
  };
}
