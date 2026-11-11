import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Mail } from "lucide-react";
import { CORE_LOCALES, routing, type AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ReadingSurface } from "@/components/article/ReadingSurface";
import { PROSE } from "@/components/article/prose";
import { ArticleLink, Callout, Figure, PageLink, Step, Steps } from "@/components/article/MdxParts";
import { Cons, HELP_ICONS, Option, Path, Pros } from "@/components/help/HelpParts";
import { HELP, getHelp, helpLocale } from "@/content/help";
import { formatDate } from "@/lib/dates";
import { breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl, localizedPath, seoFromPaths, pageTitle } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => HELP.map((h) => ({ locale, slug: h.id })));
}

const isCore = (l: AppLocale) => (CORE_LOCALES as readonly string[]).includes(l);

export async function generateMetadata({ params }: PageProps<"/[locale]/help/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const help = getHelp(slug);
  if (!help || !hasLocale(routing.locales, locale)) return {};
  const loc = locale as AppLocale;
  const text = helpLocale(loc);
  const paths = Object.fromEntries(CORE_LOCALES.map((l) => [l, localizedPath(l, "/help/[slug]", { slug: help.id })]));
  const og = { title: help.title[text], description: help.description[text] };
  return {
    ...og,
    title: pageTitle(og.title),
    ...seoFromPaths(loc, paths, og),
    ...(isCore(loc) ? {} : { robots: { index: false, follow: true } }),
  };
}

/** One help page: content/help/<id>/<locale>.mdx (English for non-core languages). */
export default async function HelpPage({ params }: PageProps<"/[locale]/help/[slug]">) {
  const { locale, slug } = await params;
  const help = getHelp(slug);
  if (!help || !hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const loc = locale as AppLocale;
  const text = helpLocale(loc);
  const t = await getTranslations({ locale: loc, namespace: "help" });

  const { default: Body } = (await import(`@/content/help/${help.id}/${text}.mdx`)) as {
    default: (props: { components: Record<string, unknown> }) => ReactNode;
  };

  const components = {
    ArticleLink: (p: { to: string; children: ReactNode }) => <ArticleLink locale={text} {...p} />,
    PageLink: (p: Parameters<typeof PageLink>[0]) => <PageLink {...p} locale={text} />,
    HelpLink: (p: { to: string; children: ReactNode }) => (
      <Link href={{ pathname: "/help/[slug]", params: { slug: p.to } }}>{p.children}</Link>
    ),
    Figure,
    Callout,
    Steps,
    Step,
    Path,
    Option: (p: Omit<Parameters<typeof Option>[0], "locale">) => <Option {...p} locale={text} />,
    Pros: (p: { children: ReactNode }) => <Pros locale={text}>{p.children}</Pros>,
    Cons: (p: { children: ReactNode }) => <Cons locale={text}>{p.children}</Cons>,
  };

  const others = HELP.filter((h) => h.id !== help.id);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t("home"), url: absoluteUrl(localizedPath(loc, "/")) },
          { name: t("eyebrow"), url: absoluteUrl(localizedPath(loc, "/help")) },
          { name: help.title[text], url: absoluteUrl(localizedPath(loc, "/help/[slug]", { slug: help.id })) },
        ])}
      />
      <ReadingSurface>
        <article lang={text} className="px-5 pb-14 pt-12 sm:px-8 md:px-14 md:pb-20 md:pt-16">
          <header className="max-w-[68ch]">
            <nav aria-label="Breadcrumb" className="text-label text-mute">
              <Link href="/help" className="transition-colors hover:text-ink">
                {t("eyebrow")}
              </Link>
            </nav>
            <h1 className="type-display mt-5 text-[clamp(2.2rem,4.8vw,3.8rem)] text-ink">{help.title[text]}</h1>
            <p className="mt-5 text-[1.125rem] leading-relaxed text-soft">{help.description[text]}</p>
            <p className="mt-4 text-caption text-mute">
              {t("updated", { date: formatDate(help.dateModified, loc) })}
              {text !== loc ? ` · ${t("englishNotice")}` : null}
            </p>
          </header>

          <div className={`${PROSE} mt-10`}>
            <Body components={components} />
            <p className="!text-caption !text-mute">{t("medical")}</p>
          </div>

          <section className="mt-14 max-w-[68ch] rounded-[24px] border border-white/8 bg-glass p-6">
            <h2 className="text-[1.15rem] font-medium text-ink">{t("stuckTitle")}</h2>
            <p className="mt-2 text-label leading-relaxed text-soft">{t("stuckBody")}</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 inline-flex items-center gap-2 text-label text-ember hover:text-ember-hi">
              <Mail className="h-4 w-4" aria-hidden />
              {CONTACT_EMAIL}
            </a>
          </section>

          <section className="mt-14 max-w-[68ch]" aria-labelledby="more-help">
            <h2 id="more-help" className="text-[1.6rem] font-light tracking-[-0.02em] text-ink">
              {t("more")}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {others.map((h) => {
                const Icon = HELP_ICONS[h.icon];
                return (
                  <li key={h.id}>
                    <Link
                      href={{ pathname: "/help/[slug]", params: { slug: h.id } }}
                      className="flex h-full items-center gap-3 rounded-[18px] border border-white/8 p-4 text-label text-soft transition-colors hover:border-ember/40 hover:text-ink"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-ember" aria-hidden />
                      {h.title[text]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </article>
      </ReadingSurface>
    </>
  );
}
