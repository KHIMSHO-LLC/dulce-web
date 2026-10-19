import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { DisclaimerEs } from "@/components/legal/DisclaimerEs";
import { DisclaimerEn } from "@/components/legal/DisclaimerEn";

const LAST_UPDATED = "2026-06-20";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/legal/disclaimer">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "legal.disclaimer" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(safeLocale, "/legal/disclaimer"),
    // German shows the English text: keep it out of the index as a duplicate.
    robots: safeLocale === "de" ? { index: false, follow: true } : undefined,
  };
}

export default async function DisclaimerPage({
  params,
}: PageProps<"/[locale]/legal/disclaimer">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "legal" });
  const tDoc = await getTranslations({ locale, namespace: "legal.disclaimer" });

  return (
    <LegalLayout title={tDoc("title")} lastUpdated={t("lastUpdated", { date: LAST_UPDATED })}>
      {locale === "de" ? <p>{t("englishOnly")}</p> : null}
      {locale === "es" ? <DisclaimerEs /> : <DisclaimerEn />}
    </LegalLayout>
  );
}
