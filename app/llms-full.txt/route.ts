/**
 * /llms-full.txt: every guide in full, as Markdown, grouped by language, so an
 * AI assistant can answer from the whole site in one fetch. /llms.txt is the
 * short index; this is the long form (llmstxt.org convention).
 */
import { ARTICLES } from "@/content/articles";
import { locales, type AppLocale } from "@/i18n/routing";
import { articleMarkdown } from "@/lib/markdown";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const LANGUAGE: Record<AppLocale, string> = { es: "Spanish", en: "English", de: "German", fr: "French", it: "Italian" };

export function GET() {
  const order: AppLocale[] = ["en", ...locales.filter((l) => l !== "en")];
  const sections = order.map(
    (l) =>
      `# Guides in ${LANGUAGE[l]}\n\n${ARTICLES.map((a) => articleMarkdown(a, l).replace(/^# /, "## ").replace(/\n## /g, "\n### ")).join("\n---\n\n")}`,
  );
  const body = `# Dulce: full guide text

> Every Dulce guide in full, in English, Spanish, German, French and Italian. Short summary and key facts: ${absoluteUrl("/llms.txt")}

${sections.join("\n\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
