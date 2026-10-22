import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Calculator } from "lucide-react";
import { routing, type AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ArticleCard } from "@/components/article/ArticleCard";
import { articlesNewestFirst, type ArticleCategory } from "@/content/articles";
import { articleUrl } from "@/lib/articles";
import { TOOL_COPY } from "@/lib/tools";
import { alternatesFor } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  const loc = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: loc, namespace: "blog" });
  return { title: t("title"), description: t("description"), alternates: alternatesFor(loc, "/blog") };
}

const ORDER: ArticleCategory[] = ["guide", "help", "health"];

export default async function BlogIndex({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale: loc, namespace: "blog" });
  const articles = articlesNewestFirst().sort((a, b) => ORDER.indexOf(a.category) - ORDER.indexOf(b.category));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: articles.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: articleUrl(a, loc) })),
        }}
      />
      <div className="container-page relative z-10 pb-16 pt-28 md:pt-36">
        <header className="max-w-3xl">
          <p className="text-label uppercase tracking-wide text-ember">{t("eyebrow")}</p>
          <h1 className="type-display mt-4 text-[clamp(2.6rem,5.6vw,5rem)] text-ink">{t("headline")}</h1>
          <p className="mt-6 max-w-[56ch] text-[1.125rem] leading-relaxed text-soft">{t("sub")}</p>
        </header>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <li key={a.id}>
              <ArticleCard article={a} locale={loc} readLabel={t("read")} />
            </li>
          ))}
        </ul>

        <section className="mt-20" aria-labelledby="tools-title">
          <h2 id="tools-title" className="text-[1.6rem] font-light tracking-[-0.02em] text-ink">
            {t("toolsTitle")}
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {(["/tools/glucose-converter", "/tools/a1c-calculator", "/tools/sensor-end-date"] as const).map((href) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex h-full items-start gap-4 rounded-[24px] border border-white/8 bg-glass p-6 transition-colors hover:border-white/20"
                >
                  <Calculator className="mt-1 h-5 w-5 shrink-0 text-ember" aria-hidden />
                  <span>
                    <span className="block font-medium text-ink">{TOOL_COPY[href][loc].title}</span>
                    <span className="mt-1 block text-label leading-relaxed text-soft">{TOOL_COPY[href][loc].description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
