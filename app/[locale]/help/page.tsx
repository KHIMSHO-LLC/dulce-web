import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ArrowUpRight, Link2, Mail } from "lucide-react";
import { CORE_LOCALES, routing, type AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ReadingSurface } from "@/components/article/ReadingSurface";
import { HELP_ICONS } from "@/components/help/HelpParts";
import { HELP, helpLocale } from "@/content/help";
import { breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl, localizedPath, seoFromPaths } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

const isCore = (l: AppLocale) => (CORE_LOCALES as readonly string[]).includes(l);

export async function generateMetadata({ params }: PageProps<"/[locale]/help">): Promise<Metadata> {
  const { locale } = await params;
  const loc = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: loc, namespace: "help" });
  const paths = Object.fromEntries(CORE_LOCALES.map((l) => [l, localizedPath(l, "/help")]));
  const og = { title: t("title"), description: t("description") };
  return {
    ...og,
    ...seoFromPaths(loc, paths, og),
    // Other languages list the English pages: keep them out of search results.
    ...(isCore(loc) ? {} : { robots: { index: false, follow: true } }),
  };
}

/** Help centre index: one card per how-to page (content/help.ts). */
export default async function HelpIndex({ params }: PageProps<"/[locale]/help">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const loc = locale as AppLocale;
  const text = helpLocale(loc);
  const t = await getTranslations({ locale: loc, namespace: "help" });
  const nav = await getTranslations({ locale: loc, namespace: "nav" });
  const status = await getTranslations({ locale: loc, namespace: "llustatus" });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t("home"), url: absoluteUrl(localizedPath(loc, "/")) },
          { name: t("eyebrow"), url: absoluteUrl(localizedPath(loc, "/help")) },
        ])}
      />
      <ReadingSurface>
        <div className="px-5 pb-14 pt-12 sm:px-8 md:px-14 md:pb-20 md:pt-16">
          <header className="max-w-[60ch]">
            <p className="text-label text-mute">{t("eyebrow")}</p>
            <h1 className="type-display mt-4 text-[clamp(2.4rem,5vw,4.2rem)] text-ink">{t("headline")}</h1>
            <p className="mt-5 text-[1.125rem] leading-relaxed text-soft">{t("sub")}</p>
            {text !== loc ? <p className="mt-4 text-label text-mute">{t("englishNotice")}</p> : null}
          </header>

          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {HELP.map((h) => {
              const Icon = HELP_ICONS[h.icon];
              return (
                <li key={h.id}>
                  <Link
                    href={{ pathname: "/help/[slug]", params: { slug: h.id } }}
                    className="group flex h-full gap-4 rounded-[24px] border border-white/8 bg-glass p-6 transition-colors hover:border-ember/40"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ember/15 text-ember">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[1.15rem] font-medium leading-snug text-ink group-hover:text-ember">
                        {h.title[text]}
                      </span>
                      <span className="mt-1.5 block text-label leading-relaxed text-soft">{h.description[text]}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <section className="rounded-[24px] border border-white/8 p-6">
              <h2 className="text-[1.15rem] font-medium text-ink">{t("more")}</h2>
              <ul className="mt-3 space-y-2 text-label">
                <li>
                  <Link href="/setup" className="flex items-center gap-2 text-soft hover:text-ink">
                    <Link2 className="h-4 w-4 text-ember" aria-hidden />
                    {nav("setup")}
                  </Link>
                </li>
                <li>
                  <Link href="/librelinkup-status" className="flex items-center gap-2 text-soft hover:text-ink">
                    <Link2 className="h-4 w-4 text-ember" aria-hidden />
                    {status("nav")}
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="flex items-center gap-2 text-soft hover:text-ink">
                    <ArrowUpRight className="h-4 w-4 text-ember" aria-hidden />
                    {nav("guides")}
                  </Link>
                </li>
              </ul>
            </section>
            <section className="rounded-[24px] border border-white/8 p-6">
              <h2 className="text-[1.15rem] font-medium text-ink">{t("stuckTitle")}</h2>
              <p className="mt-2 text-label leading-relaxed text-soft">{t("stuckBody")}</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 inline-flex items-center gap-2 text-label text-ember hover:text-ember-hi">
                <Mail className="h-4 w-4" aria-hidden />
                {CONTACT_EMAIL}
              </a>
            </section>
          </div>
        </div>
      </ReadingSurface>
    </>
  );
}
