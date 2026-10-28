import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { routing, type AppLocale } from "@/i18n/routing";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { seoFor, localizedPath } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/pro">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "pro" });
  const og = { title: t("title"), description: t("description") };
  return { ...og, ...seoFor(safeLocale, "/pro", og) };
}

type Faq = { q: string; a: string };

/**
 * Free vs Dulce Pro. Features only from the released app; no prices, which
 * differ by country (the App Store shows them in the visitor's currency).
 */
export default async function ProPage({ params }: PageProps<"/[locale]/pro">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale: loc, namespace: "pro" });
  const nav = await getTranslations({ locale: loc, namespace: "nav" });
  const faqItems = t.raw("faq") as Faq[];
  const home = `${SITE_URL}${localizedPath(loc, "/") === "/" ? "" : localizedPath(loc, "/")}`;

  const plans = [
    { title: t("freeTitle"), items: t.raw("free") as string[], highlight: false },
    { title: t("proTitle"), items: t.raw("pro") as string[], highlight: true },
  ];

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

        <Reveal className="container-page mt-14 grid gap-4 md:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.title}
              data-fade
              className={`rounded-[28px] border p-7 md:p-9 ${plan.highlight ? "border-ember/40" : "border-white/8 bg-glass"}`}
              style={
                plan.highlight
                  ? { background: "radial-gradient(90% 90% at 100% 100%, rgba(243,102,56,0.25), rgba(243,102,56,0) 70%), #1a1310" }
                  : undefined
              }
            >
              <h2 className="text-[1.75rem] font-light text-ink">{plan.title}</h2>
              <ul className="mt-5 space-y-3">
                {plan.items.map((item) => (
                  <li key={item} className="flex gap-3 text-body leading-relaxed text-soft">
                    <Check className={`mt-1 h-4 w-4 shrink-0 ${plan.highlight ? "text-ember" : "text-range"}`} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
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
