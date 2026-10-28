import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { JsonLd } from "@/components/JsonLd";
import { ReadingSurface } from "@/components/article/ReadingSurface";
import { ArticleCard } from "@/components/article/ArticleCard";
import { articlesNewestFirst } from "@/content/articles";
import { AUTHORS, authorBySlug } from "@/content/authors";
import { articleUrl } from "@/lib/articles";
import { absoluteUrl, seoFor, localizedPath } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => Object.values(AUTHORS).map((a) => ({ locale, author: a.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/authors/[author]">): Promise<Metadata> {
  const { locale, author: slug } = await params;
  const author = authorBySlug(slug);
  if (!author || !hasLocale(routing.locales, locale)) return {};
  // The role makes each language's title distinct (the name alone repeats).
  return {
    title: `${author.name}: ${author.role[locale].split(",")[0]}`,
    // First sentence of the bio: the whole bio runs past what search shows.
    description: author.bio[locale].split(/(?<=\.)\s/)[0],
    ...seoFor(
      locale,
      "/authors/[author]",
      { type: "profile", title: author.name, description: author.bio[locale] },
      { author: author.slug },
    ),
  };
}

export default async function AuthorPage({ params }: PageProps<"/[locale]/authors/[author]">) {
  const { locale, author: slug } = await params;
  const author = authorBySlug(slug);
  if (!author || !hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale: loc, namespace: "blog" });
  const articles = articlesNewestFirst().filter((a) => a.author === author.id);
  const url = absoluteUrl(localizedPath(loc, "/authors/[author]", { author: author.slug }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            name: author.name,
            url,
            description: author.bio[loc],
            jobTitle: author.role[loc],
            worksFor: { "@type": "Organization", name: "Dulce", url: "https://dulceglucosa.com" },
          },
          hasPart: articles.map((a) => ({ "@type": "Article", url: articleUrl(a, loc), headline: a.title[loc] })),
        }}
      />
      <ReadingSurface>
      <div className="px-5 pb-14 pt-12 sm:px-8 md:px-14 md:pb-20 md:pt-16">
        <header className="flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-center">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-ember/15 text-[1.6rem] font-semibold text-ember">
            {author.initials}
          </span>
          <div>
            <h1 className="type-display text-[clamp(2.4rem,5vw,4rem)] text-ink">{author.name}</h1>
            <p className="mt-2 text-label text-mute">{author.role[loc]}</p>
          </div>
        </header>
        <p className="mt-8 max-w-[60ch] text-[1.125rem] leading-relaxed text-soft">{author.bio[loc]}</p>

        <h2 className="mt-16 text-[1.6rem] font-light tracking-[-0.02em] text-ink">
          {t("authorArticles", { name: author.name })}
        </h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <li key={a.id}>
              <ArticleCard article={a} locale={loc} readLabel={t("read")} />
            </li>
          ))}
        </ul>
      </div>
      </ReadingSurface>
    </>
  );
}
