import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ReadingSurface } from "@/components/article/ReadingSurface";
import { PROSE } from "@/components/article/prose";
import { ArticleCard } from "@/components/article/ArticleCard";
import { AppCta, ArticleLink, Callout, Figure, PageLink, Step, Steps } from "@/components/article/MdxParts";
import { ARTICLES, CATEGORY_LABEL, articleBySlug, getArticle } from "@/content/articles";
import { AUTHORS } from "@/content/authors";
import { articlePath, articleUrl, authorPath, readingMinutes } from "@/lib/articles";
import { formatDate } from "@/lib/dates";
import { breadcrumbSchema, articleSchema, faqSchema, personSchema } from "@/lib/schema";
import { absoluteUrl, alternatesFromPaths, localizedPath } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => ARTICLES.map((a) => ({ locale, slug: a.slug[locale] })));
}

function resolve(locale: string, slug: string) {
  if (!hasLocale(routing.locales, locale)) return null;
  const article = articleBySlug(locale, decodeURIComponent(slug));
  return article ? { article, locale } : null;
}

export async function generateMetadata({ params }: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const found = resolve(locale, slug);
  if (!found) return {};
  const { article } = found;
  const loc = found.locale;
  const paths = Object.fromEntries(routing.locales.map((l) => [l, articlePath(article, l)]));
  return {
    title: article.title[loc],
    description: article.description[loc],
    alternates: alternatesFromPaths(loc, paths),
    authors: [{ name: AUTHORS[article.author].name, url: absoluteUrl(authorPath(article.author, loc)) }],
    openGraph: {
      type: "article",
      title: article.title[loc],
      description: article.description[loc],
      url: articleUrl(article, loc),
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      images: [{ url: article.image, alt: article.imageAlt[loc] }],
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  const found = resolve(locale, slug);
  if (!found) notFound();
  const { article } = found;
  const loc = found.locale;
  setRequestLocale(loc);
  const t = await getTranslations({ locale: loc, namespace: "blog" });
  const author = AUTHORS[article.author];
  const campaign = `blog_${article.id}` as const;

  const { default: Body } = (await import(`@/content/articles/${article.id}/${loc}.mdx`)) as {
    default: (props: { components: Record<string, unknown> }) => ReactNode;
  };

  // Article components that need the locale or the article id.
  const components = {
    AppCta: (p: { title?: string }) => <AppCta locale={loc} campaign={campaign} title={p.title} />,
    ArticleLink: (p: { to: string; children: ReactNode }) => <ArticleLink locale={loc} {...p} />,
    PageLink: (p: Parameters<typeof PageLink>[0]) => <PageLink {...p} locale={loc} />,
    Figure,
    Callout,
    Steps,
    Step,
  };

  const url = articleUrl(article, loc);
  const authorUrl = absoluteUrl(authorPath(article.author, loc));
  const home = absoluteUrl(localizedPath(loc, "/"));
  const blog = absoluteUrl(localizedPath(loc, "/blog"));
  const related = article.related.map((id) => getArticle(id)).filter((a) => a !== undefined);
  const faq = article.faq?.[loc] ?? [];

  return (
    <>
      <JsonLd
        data={articleSchema({
          url,
          headline: article.title[loc],
          description: article.description[loc],
          image: `${SITE_URL}${article.image}`,
          locale: loc,
          datePublished: article.datePublished,
          dateModified: article.dateModified,
          author: personSchema(author, authorUrl, author.role[loc]),
          keywords: article.keywords[loc],
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: t("home"), url: home },
          { name: t("eyebrow"), url: blog },
          { name: article.title[loc], url },
        ])}
      />
      {faq.length ? <JsonLd data={faqSchema(faq.map((f) => ({ question: f.q, answer: f.a })))} /> : null}

      <ReadingSurface>
      <article className="px-5 pb-14 pt-12 sm:px-8 md:px-14 md:pb-20 md:pt-16">
        <header className="max-w-[68ch]">
          <nav aria-label="Breadcrumb" className="text-label text-mute">
            <Link href="/blog" className="transition-colors hover:text-ink">
              {t("eyebrow")}
            </Link>
            <span aria-hidden> / </span>
            <span className="text-soft">{CATEGORY_LABEL[article.category][loc]}</span>
          </nav>
          <h1 className="type-display mt-5 text-[clamp(2.2rem,4.8vw,4rem)] text-ink">{article.title[loc]}</h1>
          <p className="mt-5 text-[1.125rem] leading-relaxed text-soft">{article.description[loc]}</p>
          <div className="mt-8 flex items-center gap-3 text-label text-mute">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ember/15 text-label font-semibold text-ember">
              {author.initials}
            </span>
            <div>
              <Link
                href={{ pathname: "/authors/[author]", params: { author: author.slug } }}
                className="font-medium text-ink transition-colors hover:text-ember"
              >
                {t("by", { name: author.name })}
              </Link>
              <p>
                {t("updated", { date: formatDate(article.dateModified, loc) })} ·{" "}
                {t("minutes", { n: readingMinutes(article, loc) })}
              </p>
            </div>
          </div>
        </header>

        <div className={`${PROSE} mt-12`}>
          <Body components={components} />
          {faq.length ? (
            <section aria-labelledby="faq-title">
              <h2 id="faq-title">{t("faqTitle")}</h2>
              {faq.map((f) => {
                const target = f.link ? getArticle(f.link) : undefined;
                return (
                  <div key={f.q}>
                    <h3>{f.q}</h3>
                    <p>
                      {f.a}
                      {target ? (
                        <>
                          {" "}
                          {t("faqMore")}{" "}
                          <ArticleLink locale={loc} to={target.id}>
                            {target.title[loc]}
                          </ArticleLink>
                        </>
                      ) : null}
                    </p>
                  </div>
                );
              })}
            </section>
          ) : null}
          <AppCta locale={loc} campaign={campaign} />
          <p className="!text-caption !text-mute">{t("medical")}</p>
          <p className="!text-caption !text-mute">{t("independent")}</p>
        </div>

        <section className="mt-14 max-w-[68ch] rounded-[24px] border border-white/8 bg-glass p-6 md:p-7">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ember/15 font-semibold text-ember">
              {author.initials}
            </span>
            <div>
              <Link
                href={{ pathname: "/authors/[author]", params: { author: author.slug } }}
                className="font-medium text-ink transition-colors hover:text-ember"
              >
                {author.name}
              </Link>
              <p className="text-label text-mute">{author.role[loc]}</p>
            </div>
          </div>
          <p className="mt-4 text-label leading-relaxed text-soft">{author.bio[loc]}</p>
        </section>

        {related.length ? (
          <section className="mt-16" aria-labelledby="related-title">
            <h2 id="related-title" className="text-[1.6rem] font-light tracking-[-0.02em] text-ink">
              {t("related")}
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.id}>
                  <ArticleCard article={r} locale={loc} readLabel={t("read")} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
      </ReadingSurface>
    </>
  );
}
