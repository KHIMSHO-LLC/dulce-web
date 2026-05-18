import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { TermsEs } from "@/components/legal/TermsEs";
import { TermsEn } from "@/components/legal/TermsEn";

const LAST_UPDATED = "2026-05-19";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/legal/terms">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "legal.terms" });
  return { title: t("title"), description: t("description") };
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
      {locale === "es" ? <TermsEs /> : <TermsEn />}
    </LegalLayout>
  );
}
