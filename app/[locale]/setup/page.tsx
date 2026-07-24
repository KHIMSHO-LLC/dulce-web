import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useLocale, useTranslations } from "next-intl";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Smartphone, Users, ArrowRight } from "lucide-react";
import { routing, type AppLocale } from "@/i18n/routing";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/blog";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/setup">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "setup" });
  return { title: t("title"), description: t("description") };
}

export default async function SetupPage({ params }: PageProps<"/[locale]/setup">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  // FAQPage schema must mirror the visible Q&A below — read the same strings.
  const t = await getTranslations({ locale: locale as AppLocale, namespace: "setup" });
  const faq = faqSchema([
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
  ]);
  const base = locale === "es" ? SITE_URL : `${SITE_URL}/en`;
  const breadcrumbs = breadcrumbSchema([
    { name: locale === "es" ? "Inicio" : "Home", url: base },
    { name: t("hero.headline"), url: `${base}/setup` },
  ]);

  return (
    <>
      <JsonLd data={faq} />
      <JsonLd data={breadcrumbs} />
      <SetupContent />
    </>
  );
}

function SetupContent() {
  const t = useTranslations("setup");
  const locale = useLocale() as "es" | "en";
  const stepKeys = ["step1", "step2", "step3", "step4"] as const;

  return (
    <div className="container-page py-16 md:py-24 space-y-24">
      {/* Hero */}
      <header className="max-w-4xl text-center mx-auto space-y-6">
        <h1 className="text-display-lg md:text-display-xl tracking-tight font-bold text-foreground">
          {t("hero.headline")}
        </h1>
        <p className="text-headline text-muted leading-relaxed max-w-2xl mx-auto">
          {t("hero.subheadline")}
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <AppStoreBadge campaign="web_page" locale={locale} />
        </div>
      </header>

      {/* LibreLink vs LibreLinkUp */}
      <section className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-display tracking-tight font-bold text-foreground text-center">
          {t("compare.title")}
        </h2>
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          <div className="rounded-[var(--radius-card-lg)] bg-card border border-border-subtle p-8 shadow-[var(--shadow-card-rest)]">
            <div className="h-12 w-12 rounded-full bg-muted/10 text-muted flex items-center justify-center mb-6">
              <Smartphone className="h-6 w-6" />
            </div>
            <h3 className="text-headline font-bold text-foreground mb-3">
              {t("compare.scan.title")}
            </h3>
            <p className="text-body text-muted leading-relaxed">{t("compare.scan.body")}</p>
          </div>
          <ArrowRight className="h-8 w-8 text-accent mx-auto hidden md:block" />
          <div className="rounded-[var(--radius-card-lg)] bg-accent-soft border border-accent/30 p-8 shadow-[var(--shadow-card-rest)]">
            <div className="h-12 w-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-6">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-headline font-bold text-foreground mb-3">
              {t("compare.share.title")}
            </h3>
            <p className="text-body text-muted leading-relaxed">{t("compare.share.body")}</p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-display tracking-tight font-bold text-foreground text-center">
          {t("steps.title")}
        </h2>
        <ol className="space-y-6">
          {stepKeys.map((key, index) => (
            <li
              key={key}
              className="flex gap-5 rounded-[var(--radius-card-lg)] bg-card border border-border-subtle p-6 shadow-[var(--shadow-card-rest)]"
            >
              <span className="flex-shrink-0 h-10 w-10 rounded-full bg-accent text-white font-bold flex items-center justify-center">
                {index + 1}
              </span>
              <div>
                <h3 className="text-headline font-bold text-foreground mb-2">
                  {t(`steps.${key}.title`)}
                </h3>
                <p className="text-body text-muted leading-relaxed">{t(`steps.${key}.body`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto rounded-[var(--radius-card-xl)] bg-accent-soft/50 border border-accent/10 p-8 md:p-12">
        <h2 className="text-display tracking-tight font-bold text-foreground mb-8 text-center">
          {t("faq.title")}
        </h2>
        <div className="space-y-8">
          {(["1", "2", "3"] as const).map((n) => (
            <div key={n}>
              <h3 className="text-headline font-bold text-foreground mb-2">{t(`faq.q${n}`)}</h3>
              <p className="text-body text-muted leading-relaxed">{t(`faq.a${n}`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center">
        <h2 className="text-display tracking-tight font-bold text-foreground mb-4">
          {t("cta.title")}
        </h2>
        <p className="text-headline text-muted mb-8">{t("cta.subtitle")}</p>
        <div className="flex justify-center">
          <AppStoreBadge campaign="web_page" locale={locale} />
        </div>
      </section>

      {/* Trademark + medical disclaimer */}
      <p className="max-w-3xl mx-auto text-caption text-muted/80 leading-relaxed text-center pb-8">
        {t("disclaimer")}
      </p>
    </div>
  );
}
