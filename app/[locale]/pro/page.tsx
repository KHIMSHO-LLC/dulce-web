import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { routing, type AppLocale } from "@/i18n/routing";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";
import { JsonLd } from "@/components/JsonLd";
import { ProFeatureList } from "@/components/landing/ProFeatureList";
import { Reveal } from "@/components/motion/Reveal";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { seoFor, localizedPath, pageTitle } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { fillPrices, proPriceStrings } from "@/lib/pricing";

export async function generateMetadata({ params }: PageProps<"/[locale]/pro">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "pro" });
  const og = { title: t("title"), description: t("description") };
  return { ...og, title: pageTitle(og.title), ...seoFor(safeLocale, "/pro", og) };
}

type Faq = { q: string; a: string };

/**
 * Free vs Dulce Pro. Features only from the released app. Prices are the US prices from
 * lib/pricing.ts, always labelled as such with the local-currency note (they differ by country).
 * The Offers for them live in the app's JSON-LD on the home page (`appOffers` in lib/schema.ts).
 */
export default async function ProPage({ params }: PageProps<"/[locale]/pro">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale: loc, namespace: "pro" });
  const nav = await getTranslations({ locale: loc, namespace: "nav" });
  const faqItems = (t.raw("faq") as Faq[]).map((f) => ({ ...f, a: fillPrices(f.a, locale) }));
  const prices = proPriceStrings(locale);
  const home = `${SITE_URL}${localizedPath(loc, "/") === "/" ? "" : localizedPath(loc, "/")}`;

  // The price number is the hero of each pricing card; the words around it stay small.
  const bigPrice = (chunks: ReactNode) => (
    <span className="type-display tabular text-[clamp(2.75rem,5vw,3.75rem)] text-ink">{chunks}</span>
  );

  const freeItems = t.raw("free") as string[];

  return (
    <>
      <JsonLd data={faqSchema(faqItems.map((f) => ({ question: f.q, answer: f.a })))} />
      <JsonLd
        data={breadcrumbSchema([
          { name: nav("home"), url: home },
          { name: t("title"), url: `${SITE_URL}${localizedPath(loc, "/pro")}` },
        ])}
      />
      <div className="relative z-10 pb-12 pt-28 md:pt-36">
        <Reveal className="container-page" on="intro">
          <h1 data-fade className="type-display max-w-[18ch] text-[clamp(2.4rem,5.6vw,5rem)] text-ink">
            {t("headline")}
          </h1>
          <p data-fade className="mt-6 max-w-[56ch] text-[1.125rem] leading-relaxed text-soft">
            {t("lead")}
          </p>
        </Reveal>

        <Reveal className="container-page mt-14 grid gap-4">
          <article data-fade className="rounded-[28px] border border-white/8 bg-glass p-7 md:p-9">
            <h2 className="text-[1.75rem] font-light text-ink">{t("freeTitle")}</h2>
            <ul className="mt-5 grid gap-x-10 gap-y-3 md:grid-cols-2">
              {freeItems.map((item) => (
                <li key={item} className="flex gap-3 text-body leading-relaxed text-soft">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-range" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article
            data-fade
            className="rounded-[28px] border border-ember/40 p-7 md:p-9"
            style={{ background: "radial-gradient(90% 90% at 100% 100%, rgba(243,102,56,0.25), rgba(243,102,56,0) 70%), #1a1310" }}
          >
            <h2 className="text-[1.75rem] font-light text-ink">{t("proTitle")}</h2>
            <ProFeatureList wide />
          </article>
        </Reveal>

        <Reveal className="container-page mt-16">
          <h2 data-fade className="text-[1.75rem] font-light tracking-[-0.02em] text-ink">
            {t("pricing.title")}
          </h2>
          <div data-fade className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-[28px] border border-white/8 bg-glass p-7 md:p-9">
              <h3 className="text-[0.8rem] font-medium uppercase tracking-[0.16em] text-mute">
                {t("pricing.monthlyTitle")}
              </h3>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[1.05rem] text-soft">
                {t.rich("pricing.monthlyLine", { price: prices.monthly, b: bigPrice })}
              </p>
            </article>
            <article
              className="rounded-[28px] border border-ember/40 p-7 md:p-9"
              style={{ background: "radial-gradient(90% 90% at 100% 100%, rgba(243,102,56,0.25), rgba(243,102,56,0) 70%), #1a1310" }}
            >
              <h3 className="text-[0.8rem] font-medium uppercase tracking-[0.16em] text-ember-hi">
                {t("pricing.yearlyTitle")}
              </h3>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[1.05rem] text-soft">
                {t.rich("pricing.yearlyLine", { price: prices.yearly, b: bigPrice })}
              </p>
              <p className="mt-5 inline-flex rounded-full border border-ember/30 bg-ember/10 px-3.5 py-1.5 text-[0.9rem] text-ink">
                {t("pricing.yearlyPerMonth", { perMonth: prices.perMonth })}
              </p>
            </article>
          </div>
          <div data-fade className="mt-7 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="flex gap-3 text-body leading-relaxed text-ink">
                <Check className="mt-1 h-4 w-4 shrink-0 text-range" aria-hidden />
                {t("pricing.trialLine")}
              </p>
              <p className="mt-2 max-w-[60ch] text-[0.875rem] leading-relaxed text-mute">{t("pricing.note")}</p>
            </div>
            <div className="shrink-0">
              <AppStoreBadge campaign="web_page" locale={loc} />
            </div>
          </div>
        </Reveal>

        <Reveal className="container-page mt-16">
          <h2 data-fade className="text-[1.75rem] font-light tracking-[-0.02em] text-ink">
            {t("trialTitle")}
          </h2>
          <ol data-fade className="mt-5 max-w-[64ch] list-decimal space-y-2 pl-5 text-body leading-relaxed text-soft">
            {(t.raw("trial") as string[]).map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <div data-fade className="mt-10 max-w-3xl">
            {faqItems.map((f) => (
              <div key={f.q} className="border-t border-white/12 py-6 last:border-b">
                <h3 className="text-[1.2rem] font-light text-ink">{f.q}</h3>
                <p className="mt-2 text-body leading-relaxed text-soft">{f.a}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="container-page mt-16 text-center">
          <p data-fade className="text-body text-soft">
            {t("cta")}
          </p>
          <div data-fade className="mt-6 flex justify-center">
            <AppStoreBadge campaign="web_page" locale={loc} />
          </div>
        </Reveal>
      </div>
    </>
  );
}
