/**
 * Structured-data (schema.org) builders. Keeping them here means every page
 * emits consistent, valid JSON-LD.
 */
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

/** schema.org Person for an article author, pointing at their author page. */
export function personSchema(author: { name: string; slug: string }, url: string, jobTitle?: string) {
  return { "@type": "Person", name: author.name, url, ...(jobTitle ? { jobTitle } : {}) };
}

export function articleSchema(input: {
  url: string;
  headline: string;
  description: string;
  image: string;
  locale: string;
  datePublished: string;
  dateModified: string;
  author: ReturnType<typeof personSchema>;
  keywords: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": input.url,
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
    url: input.url,
    headline: input.headline,
    description: input.description,
    image: input.image,
    inLanguage: input.locale,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: input.author,
    keywords: input.keywords.join(", "),
    publisher: {
      "@type": "Organization",
      name: "Dulce",
      url: "https://dulceglucosa.com",
      logo: { "@type": "ImageObject", url: "https://dulceglucosa.com/dulce-logo.png" },
    },
  };
}

/** HowTo for guides with numbered <Step> blocks (setup and troubleshooting). */
export function howToSchema(input: {
  url: string;
  name: string;
  description: string;
  locale: string;
  image: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${input.url}#howto`,
    name: input.name,
    description: input.description,
    inLanguage: input.locale,
    image: input.image,
    step: input.steps.map((st, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: st.name,
      text: st.text,
    })),
  };
}
