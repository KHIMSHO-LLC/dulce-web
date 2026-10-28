import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { AppLocale, AppPathname } from "@/i18n/routing";
import { ARTICLES, getArticle, type Article } from "@/content/articles";
import { AUTHORS } from "@/content/authors";
import { appStoreUrl, type StoreCampaign } from "./appStore";
import { articleUrl } from "./articles";
import { absoluteUrl, localizedPath } from "./seo";
import { TOOL_COPY, type ToolPath } from "./tools";

/**
 * Plain-Markdown versions of the guides for AI assistants and answer engines
 * (/llms-full.txt and /md/<locale>/<slug>.md). Same text as the page; the MDX
 * components become ordinary Markdown with absolute links.
 */

const APP_CTA: Record<AppLocale, string> = {
  es: "Descargar Dulce en el App Store",
  en: "Download Dulce on the App Store",
  de: "Dulce im App Store laden",
  fr: "Télécharger Dulce dans l'App Store",
  it: "Scarica Dulce dall'App Store",
};

function attr(tag: string, name: string): string | undefined {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`));
  return m?.[1];
}

export function mdxSource(article: Article, locale: AppLocale): string {
  return readFileSync(join(process.cwd(), "content/articles", article.id, `${locale}.mdx`), "utf8");
}

/** MDX body → Markdown. Pure apart from link resolution; exported for tests. */
export function mdxToMarkdown(source: string, locale: AppLocale, campaign: StoreCampaign = "web_llms"): string {
  let s = source;
  // Article and page links.
  s = s.replace(/<ArticleLink\s+to="([^"]+)"\s*>([\s\S]*?)<\/ArticleLink>/g, (_, id: string, text: string) => {
    const a = getArticle(id);
    return a ? `[${text}](${articleUrl(a, locale)})` : text;
  });
  s = s.replace(/<PageLink\s+to="([^"]+)"\s*>([\s\S]*?)<\/PageLink>/g, (_, to: string, text: string) => {
    try {
      return `[${text}](${absoluteUrl(localizedPath(locale, to as AppPathname))})`;
    } catch {
      return text;
    }
  });
  // Install button.
  s = s.replace(/<AppCta\b[^>]*\/>/g, (tag) => {
    const title = attr(tag, "title") ?? APP_CTA[locale];
    return `[${title}](${appStoreUrl(campaign)})`;
  });
  // Figures.
  s = s.replace(/<Figure\b[\s\S]*?\/>/g, (tag) => {
    const src = attr(tag, "src");
    const alt = attr(tag, "alt") ?? "";
    const caption = attr(tag, "caption");
    if (!src) return "";
    return `![${alt}](${absoluteUrl(src)})${caption ? `\n\n*${caption}*` : ""}`;
  });
  // Callouts → blockquotes.
  s = s.replace(/<Callout\b[^>]*>([\s\S]*?)<\/Callout>/g, (_, body: string) =>
    body
      .trim()
      .split("\n")
      .map((l) => `> ${l}`.trimEnd())
      .join("\n"),
  );
  // Steps → numbered list.
  s = s.replace(/<Steps>([\s\S]*?)<\/Steps>/g, (_, inner: string) => {
    let n = 0;
    return inner
      .replace(/<Step\s+title="([^"]*)"\s*>([\s\S]*?)<\/Step>/g, (_m, title: string, body: string) => {
        n += 1;
        const text = body.trim().replace(/\n+/g, " ");
        return `${n}. **${title}**${text ? `: ${text}` : ""}\n`;
      })
      .trim();
  });
  // Anything left that looks like a component tag.
  s = s.replace(/<\/?[A-Z][A-Za-z]*\b[^>]*>/g, "");
  return s.replace(/\n{3,}/g, "\n\n").trim();
}

/** HowTo steps (title + plain text) from a guide's <Step> blocks, if any. */
export function howToSteps(source: string): { name: string; text: string }[] {
  const out: { name: string; text: string }[] = [];
  for (const m of source.matchAll(/<Step\s+title="([^"]*)"\s*>([\s\S]*?)<\/Step>/g)) {
    const text = m[2]!
      .replace(/<ArticleLink[^>]*>([\s\S]*?)<\/ArticleLink>/g, "$1")
      .replace(/<PageLink[^>]*>([\s\S]*?)<\/PageLink>/g, "$1")
      .replace(/<[^>]+>/g, "")
      .replace(/\*\*|__|`/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
    out.push({ name: m[1]!, text: text || m[1]! });
  }
  return out;
}

/** Full Markdown document for one guide in one language. */
export function articleMarkdown(article: Article, locale: AppLocale): string {
  const author = AUTHORS[article.author];
  const faq = article.faq?.[locale] ?? [];
  const parts = [
    `# ${article.title[locale]}`,
    `> ${article.summary?.[locale] ?? article.description[locale]}`,
    `URL: ${articleUrl(article, locale)}  \nAuthor: ${author.name}  \nPublished: ${article.datePublished}  \nUpdated: ${article.dateModified}`,
    mdxToMarkdown(mdxSource(article, locale), locale, `blog_${article.id}`),
  ];
  if (faq.length) {
    parts.push(
      `## FAQ\n\n${faq.map((f) => `**${f.q}**\n\n${f.a}`).join("\n\n")}`,
    );
  }
  return `${parts.join("\n\n")}\n`;
}

export function markdownPath(article: Article, locale: AppLocale): string {
  return `/md/${locale}/${article.slug[locale]}.md`;
}

export function articleBySlugAnyLocale(locale: AppLocale, slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug[locale] === slug);
}

type Messages = typeof import("@/messages/en.json");

const MESSAGES: Record<AppLocale, () => Promise<Messages>> = {
  es: () => import("@/messages/es.json").then((m) => m.default as Messages),
  en: () => import("@/messages/en.json").then((m) => m.default as Messages),
  de: () => import("@/messages/de.json").then((m) => m.default as Messages),
  fr: () => import("@/messages/fr.json").then((m) => m.default as Messages),
  it: () => import("@/messages/it.json").then((m) => m.default as Messages),
};

const qa = (items: { q: string; a: string }[]) => items.map((f) => `**${f.q}**\n\n${f.a}`).join("\n\n");

/**
 * The setup guide, the home FAQ and the Free vs Pro page as Markdown, from the
 * same messages the pages render (so /llms-full.txt can't drift from the site).
 */
export async function sitePagesMarkdown(locale: AppLocale): Promise<string> {
  const m = await MESSAGES[locale]();
  const s = m.setup;
  const steps = (["step1", "step2", "step3", "step4"] as const).map((k, i) => `${i + 1}. **${s.steps[k].title}.** ${s.steps[k].body}`);
  const setup = [
    `## ${s.hero.headline}`,
    `URL: ${absoluteUrl(localizedPath(locale, "/setup"))}`,
    s.hero.subheadline,
    `### ${s.compare.title}`,
    `- **${s.compare.scan.title}:** ${s.compare.scan.body}\n- **${s.compare.share.title}:** ${s.compare.share.body}`,
    `### ${s.steps.title}`,
    steps.join("\n"),
    `### ${s.faq.title}`,
    qa([1, 2, 3].map((n) => ({ q: s.faq[`q${n}` as "q1"], a: s.faq[`a${n}` as "a1"] }))),
    s.disclaimer,
  ];
  const faq = [`## ${m.home.faq.marquee}`, `URL: ${absoluteUrl(localizedPath(locale, "/"))}#faq`, qa(m.home.faq.items)];
  const p = m.pro;
  const pro = [
    `## ${p.title}`,
    `URL: ${absoluteUrl(localizedPath(locale, "/pro"))}`,
    p.lead,
    `### ${p.freeTitle}\n\n${p.free.map((x) => `- ${x}`).join("\n")}`,
    `### ${p.proTitle}\n\n${p.pro.map((x) => `- ${x}`).join("\n")}`,
    `### ${p.trialTitle}\n\n${p.trial.map((x) => `- ${x}`).join("\n")}`,
    qa(p.faq),
  ];
  return [setup, faq, pro].map((part) => part.join("\n\n")).join("\n\n");
}

/** One calculator page (title, description, explanation) as Markdown. */
export function toolMarkdown(path: ToolPath, name: string, locale: AppLocale): string {
  const copy = TOOL_COPY[path][locale];
  const source = readFileSync(join(process.cwd(), "content/tools", name, `${locale}.mdx`), "utf8");
  return [
    `## ${copy.title}`,
    `URL: ${absoluteUrl(localizedPath(locale, path))}`,
    `> ${copy.description}`,
    mdxToMarkdown(source, locale, "web_llms").replace(/^## /gm, "### "),
  ].join("\n\n");
}
