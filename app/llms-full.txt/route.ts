/**
 * /llms-full.txt: the setup guide, home FAQ, Free vs Pro page, calculators and
 * every guide in full, as Markdown, grouped by language, so an AI assistant can
 * answer from the whole site in one fetch. Built from the same messages and
 * content files the pages render. /llms.txt is the short index; this is the
 * long form (llmstxt.org convention).
 */
import { ARTICLES } from "@/content/articles";
import { locales, type AppLocale } from "@/i18n/routing";
import { articleMarkdown, sitePagesMarkdown, toolMarkdown } from "@/lib/markdown";
import { TOOLS } from "@/lib/tools";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const LANGUAGE: Record<AppLocale, string> = { es: "Spanish", en: "English", de: "German", fr: "French", it: "Italian" };

export async function GET() {
  const order: AppLocale[] = ["en", ...locales.filter((l) => l !== "en")];
  const sections = await Promise.all(
    order.map(
      async (l) =>
        `# Dulce in ${LANGUAGE[l]}\n\n${await sitePagesMarkdown(l)}\n\n${TOOLS.map((t) => toolMarkdown(t.path, t.name, l)).join("\n\n")}\n\n# Guides in ${LANGUAGE[l]}\n\n${ARTICLES.map((a) => articleMarkdown(a, l).replace(/^# /, "## ").replace(/\n## /g, "\n### ")).join("\n---\n\n")}`,
    ),
  );
  const body = `# Dulce: full site text

> The setup guide, FAQ, Free vs Pro page, free calculators and every Dulce guide in full, in English, Spanish, German, French and Italian. Short summary and key facts: ${absoluteUrl("/llms.txt")}

${sections.join("\n\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
