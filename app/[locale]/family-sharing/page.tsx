import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useLocale, useTranslations } from "next-intl";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Users, BellRing, ShieldCheck } from "lucide-react";
import { routing, type AppLocale } from "@/i18n/routing";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/blog";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/family-sharing">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "familySharing" });
  return { title: t("title"), description: t("description") };
}

export default async function FamilySharingPage({
  params,
}: PageProps<"/[locale]/family-sharing">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  // FAQPage schema must mirror the visible Q&A below — read the same strings.
  const t = await getTranslations({ locale: locale as AppLocale, namespace: "familySharing" });
  const faq = faqSchema([
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
  ]);
  const base = locale === "es" ? SITE_URL : `${SITE_URL}/en`;
  const breadcrumbs = breadcrumbSchema([
    { name: locale === "es" ? "Inicio" : "Home", url: base },
    {
      name: locale === "es" ? "Seguimiento familiar" : "Family sharing",
      url: `${base}/${locale === "es" ? "compartir-en-familia" : "family-sharing"}`,
    },
  ]);

  return (
    <>
      <JsonLd data={faq} />
      <JsonLd data={breadcrumbs} />
      <FamilySharingContent />
    </>
  );
}

function FamilySharingContent() {
  const t = useTranslations("familySharing");
  const locale = useLocale() as "es" | "en";

  return (
    <div className="container-page py-16 md:py-24 space-y-24">
      {/* Hero Section */}
      <header className="max-w-4xl text-center mx-auto space-y-6">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-[var(--radius-card)] bg-accent/10 text-accent mb-4">
          <Users className="h-8 w-8" />
        </div>
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

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="rounded-[var(--radius-card-lg)] bg-card border border-border-subtle p-8 shadow-[var(--shadow-card-rest)]">
          <div className="h-12 w-12 rounded-full bg-accent-soft text-accent flex items-center justify-center mb-6">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-headline font-bold text-foreground mb-3">
            {t("features.invite.title")}
          </h3>
          <p className="text-body text-muted leading-relaxed">{t("features.invite.body")}</p>
        </div>

        <div className="rounded-[var(--radius-card-lg)] bg-card border border-border-subtle p-8 shadow-[var(--shadow-card-rest)]">
          <div className="h-12 w-12 rounded-full bg-state-low/10 text-state-low flex items-center justify-center mb-6">
            <BellRing className="h-6 w-6" />
          </div>
          <h3 className="text-headline font-bold text-foreground mb-3">
            {t("features.alerts.title")}
          </h3>
          <p className="text-body text-muted leading-relaxed">{t("features.alerts.body")}</p>
        </div>

        <div className="rounded-[var(--radius-card-lg)] bg-card border border-border-subtle p-8 shadow-[var(--shadow-card-rest)]">
          <div className="h-12 w-12 rounded-full bg-accent-soft text-accent flex items-center justify-center mb-6">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-headline font-bold text-foreground mb-3">
            {t("features.control.title")}
          </h3>
          <p className="text-body text-muted leading-relaxed">{t("features.control.body")}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto rounded-[var(--radius-card-xl)] bg-accent-soft/50 border border-accent/10 p-8 md:p-12">
        <h2 className="text-display tracking-tight font-bold text-foreground mb-8 text-center">
          {t("faq.title")}
        </h2>
        <div className="space-y-8">
          <div>
            <h4 className="text-headline font-bold text-foreground mb-2">{t("faq.q1")}</h4>
            <p className="text-body text-muted leading-relaxed">{t("faq.a1")}</p>
          </div>
          <div>
            <h4 className="text-headline font-bold text-foreground mb-2">{t("faq.q2")}</h4>
            <p className="text-body text-muted leading-relaxed">{t("faq.a2")}</p>
          </div>
          <div>
            <h4 className="text-headline font-bold text-foreground mb-2">{t("faq.q3")}</h4>
            <p className="text-body text-muted leading-relaxed">{t("faq.a3")}</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center pb-12">
        <h2 className="text-display tracking-tight font-bold text-foreground mb-4">
          {t("cta.title")}
        </h2>
        <p className="text-headline text-muted mb-8">{t("cta.subtitle")}</p>
        <div className="flex justify-center">
          <AppStoreBadge campaign="web_page" locale={locale} />
        </div>
      </section>
    </div>
  );
}
