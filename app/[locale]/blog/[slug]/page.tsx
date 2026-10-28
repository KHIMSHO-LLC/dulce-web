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
import { Calculator, Link2 } from "lucide-react";
import { AnswerFirst, Byline } from "@/components/article/Byline";
import { TOOL_COPY, toolsForArticle } from "@/lib/tools";
import { breadcrumbSchema, articleSchema, authorPerson, faqSchema, howToSchema } from "@/lib/schema";
import { howToSteps, markdownPath, mdxSource } from "@/lib/markdown";
import { absoluteUrl, seoFromPaths, localizedPath } from "@/lib/seo";
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
  // Google shows the site name on its own; drop the " · Dulce" suffix when it
  // would push the title past what search results display (~60 characters).
  const headline = article.title[loc];
  const seo = seoFromPaths(loc, paths, {
    type: "article",
    title: article.title[loc],
    description: article.description[loc],
    publishedTime: article.datePublished,
    modifiedTime: article.dateModified,
    images: [{ url: article.image, alt: article.imageAlt[loc] }],
  });
  return {
    title: headline.length > 52 ? { absolute: headline } : headline,
    description: article.description[loc],
    openGraph: seo.openGraph,
    alternates: {
      ...seo.alternates,
      // Plain-Markdown copy for AI assistants (see app/md).
      types: { "text/markdown": absoluteUrl(markdownPath(article, loc)) },
    },
    authors: [{ name: AUTHORS[article.author].name, url: absoluteUrl(authorPath(article.author, loc)) }],
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
  const home = absoluteUrl(localizedPath(loc, "/"));
  const blog = absoluteUrl(localizedPath(loc, "/blog"));
  const related = article.related.map((id) => getArticle(id)).filter((a) => a !== undefined);
  const faq = article.faq?.[loc] ?? [];
  const steps = howToSteps(mdxSource(article, loc));
  // Every guide links to the calculators that list it (lib/tools.ts); /setup is the LibreLinkUp guide.
  const tools = toolsForArticle(article.id);
  const linksSetup = article.category !== "health" && !article.id.startsWith("dexcom");

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
          author: authorPerson(article.author, loc),
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
      {steps.length >= 2 ? (
        <JsonLd
          data={howToSchema({
            url,
            name: article.title[loc],
            description: article.description[loc],
            locale: loc,
            image: `${SITE_URL}${article.image}`,
            steps,
          })}
        />
      ) : null}
      {faq.length ? <JsonLd data={faqSchema(faq.map((f) => ({ question: f.q, answer: f.a })), loc)} /> : null}

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
          <AnswerFirst summary={article.summary?.[loc]} fallback={article.description[loc]} />
          <Byline
            locale={loc}
            author={article.author}
            dateModified={article.dateModified}
            extra={t("minutes", { n: readingMinutes(article, loc) })}
          />
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

        <section className="mt-14 max-w-[68ch]" aria-labelledby="links-title">
          <h2 id="links-title" className="text-[1.6rem] font-light tracking-[-0.02em] text-ink">
            {t("usefulLinks")}
          </h2>
          <ul className="mt-5 space-y-3">
            {tools.map((tool) => (
              <li key={tool.path}>
                <Link href={tool.path} className="flex items-start gap-3 text-body text-soft transition-colors hover:text-ink">
                  <Calculator className="mt-1 h-4 w-4 shrink-0 text-ember" aria-hidden />
                  {TOOL_COPY[tool.path][loc].title}
                </Link>
              </li>
            ))}
            {linksSetup ? (
              <li>
                <Link href="/setup" className="flex items-start gap-3 text-body text-soft transition-colors hover:text-ink">
                  <Link2 className="mt-1 h-4 w-4 shrink-0 text-ember" aria-hidden />
                  {t("setupLink")}
                </Link>
              </li>
            ) : null}
          </ul>
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
