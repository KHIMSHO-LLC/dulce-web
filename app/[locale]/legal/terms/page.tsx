import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { TRANSLATED_LEGAL_LOCALES, routing, type AppLocale } from "@/i18n/routing";
import { seoFor } from "@/lib/seo";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { TermsEs } from "@/components/legal/TermsEs";
import { TermsEn } from "@/components/legal/TermsEn";
import { TermsDe } from "@/components/legal/TermsDe";
import { TermsFr } from "@/components/legal/TermsFr";
import { TermsIt } from "@/components/legal/TermsIt";

/** The Spanish text prevails; the others are translations of it. */
const DOC: Record<AppLocale, () => React.JSX.Element> = { es: TermsEs, en: TermsEn, de: TermsDe, fr: TermsFr, it: TermsIt };

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
      {TRANSLATED_LEGAL_LOCALES.includes(locale as AppLocale) ? <p>{t("translationNotice")}</p> : null}
      {(() => {
        const Doc = DOC[locale as AppLocale];
        return <Doc />;
      })()}
    </LegalLayout>
  );
}
