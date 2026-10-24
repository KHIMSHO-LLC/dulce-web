/**
 * /md/<locale>/<slug>.md: the guide as plain Markdown for AI assistants and
 * answer engines. Linked from each article page (`rel="alternate"
 * type="text/markdown"`) and from /llms.txt. The path has a dot, so the
 * next-intl proxy leaves it alone.
 */
import { locales, type AppLocale } from "@/i18n/routing";
import { ARTICLES } from "@/content/articles";
import { articleBySlugAnyLocale, articleMarkdown } from "@/lib/markdown";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => ARTICLES.map((a) => ({ locale, file: `${a.slug[locale]}.md` })));
}

export async function GET(_req: Request, ctx: { params: Promise<{ locale: string; file: string }> }) {
  const { locale, file } = await ctx.params;
  const loc = locale as AppLocale;
  const article = (locales as readonly string[]).includes(locale)
    ? articleBySlugAnyLocale(loc, file.replace(/\.md$/, ""))
    : undefined;
  if (!article) return new Response("Not found", { status: 404 });
  return new Response(articleMarkdown(article, loc), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Language": loc,
      "X-Robots-Tag": "noindex",
    },
  });
}
