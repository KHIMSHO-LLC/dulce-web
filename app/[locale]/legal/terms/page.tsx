import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { LEGAL_LOCALES, routing, type AppLocale } from "@/i18n/routing";
import { seoFor } from "@/lib/seo";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { TermsEs } from "@/components/legal/TermsEs";
import { TermsEn } from "@/components/legal/TermsEn";

const LAST_UPDATED = "2026-07-08";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/legal/terms">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "legal.terms" });
  return {
    title: t("title"),
    description: t("description"),
    ...seoFor(safeLocale, "/legal/terms", { title: t("title"), description: t("description") }),
    // Languages without their own legal text show the English one: keep them out of the index as duplicates.
    robots: !LEGAL_LOCALES.includes(safeLocale) ? { index: false, follow: true } : undefined,
  };
}

export default async function TermsPage({
  params,
}: PageProps<"/[locale]/legal/terms">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "legal" });
  const tDoc = await getTranslations({ locale, namespace: "legal.terms" });

  return (
    <LegalLayout title={tDoc("title")} lastUpdated={t("lastUpdated", { date: LAST_UPDATED })}>
      {!LEGAL_LOCALES.includes(locale as AppLocale) ? <p>{t("englishOnly")}</p> : null}
      {locale === "es" ? <TermsEs /> : <TermsEn />}
    </LegalLayout>
  );
}
