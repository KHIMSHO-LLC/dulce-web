import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { JsonLd } from "@/components/JsonLd";
import { ReadingSurface } from "@/components/article/ReadingSurface";
import { PROSE } from "@/components/article/prose";
import { AppCta, ArticleLink, Callout, PageLink } from "@/components/article/MdxParts";
import { breadcrumbSchema, toolSchema } from "@/lib/schema";
import { absoluteUrl, localizedPath } from "@/lib/seo";
import { TOOL_COPY, toolByPath, type ToolPath } from "@/lib/tools";
import { getArticle } from "@/content/articles";
import { ArticleCard } from "@/components/article/ArticleCard";
import { Byline } from "@/components/article/Byline";
import { A1cTable, GlucoseTable } from "@/components/tools/ConversionTables";

/**
 * Shared shell of a calculator page: title, the calculator, then the
 * explanation from content/tools/<name>/<locale>.mdx.
 */
export async function ToolPage({
  locale,
  path,
  name,
  calculator,
}: {
  locale: AppLocale;
  path: ToolPath;
  name: string;
  calculator: ReactNode;
}) {
  const t = await getTranslations({ locale, namespace: "blog" });
  const copy = TOOL_COPY[path][locale];
  const tool = toolByPath(path);
  const guides = tool.guides.map((id) => getArticle(id)).filter((a) => a !== undefined);
  const { default: Body } = (await import(`@/content/tools/${name}/${locale}.mdx`)) as {
    default: (props: { components: Record<string, unknown> }) => ReactNode;
  };
  const components = {
    AppCta: (p: { title?: string }) => <AppCta locale={locale} campaign="web_tool" title={p.title} />,
    ArticleLink: (p: { to: string; children: ReactNode }) => <ArticleLink locale={locale} {...p} />,
    PageLink: (p: Parameters<typeof PageLink>[0]) => <PageLink {...p} locale={locale} />,
    Callout,
    GlucoseTable: (p: { from: "mgdl" | "mmol" }) => <GlucoseTable locale={locale} {...p} />,
    A1cTable: () => <A1cTable locale={locale} />,
  };

  return (
    <>
      <JsonLd
        data={toolSchema({
          url: absoluteUrl(localizedPath(locale, path)),
          name: copy.title,
          description: copy.description,
          locale,
          dateModified: tool.dateModified,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: t("home"), url: absoluteUrl(localizedPath(locale, "/")) },
          { name: copy.title, url: absoluteUrl(localizedPath(locale, path)) },
        ])}
      />
      <ReadingSurface>
      <div className="px-5 pb-14 pt-12 sm:px-8 md:px-14 md:pb-20 md:pt-16">
        <header className="max-w-3xl">
          <p className="text-label uppercase tracking-wide text-ember">{t("toolsTitle")}</p>
          <h1 className="type-display mt-4 text-[clamp(2.2rem,4.8vw,4rem)] text-ink">{copy.title}</h1>
          <p className="mt-5 max-w-[60ch] text-[1.125rem] leading-relaxed text-soft">{copy.description}</p>
          {/* The calculators are the founder's (formulas and sources in lib/tools.ts). */}
          <Byline locale={locale} author="giorgi" dateModified={tool.dateModified} />
        </header>
        <div className="mt-10 max-w-3xl">{calculator}</div>
        <div className={`${PROSE} mt-14`}>
          <Body components={components} />
          <p className="!text-caption !text-mute">{t("medical")}</p>
        </div>
        {guides.length ? (
          <section className="mt-16" aria-labelledby="guides-title">
            <h2 id="guides-title" className="text-[1.6rem] font-light tracking-[-0.02em] text-ink">
              {t("relatedGuides")}
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {guides.map((a) => (
                <li key={a.id}>
                  <ArticleCard article={a} locale={locale} readLabel={t("read")} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
      </ReadingSurface>
    </>
  );
}
