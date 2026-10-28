import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { TRANSLATED_LEGAL_LOCALES, routing, type AppLocale } from "@/i18n/routing";
import { seoFor } from "@/lib/seo";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { DisclaimerEs } from "@/components/legal/DisclaimerEs";
import { DisclaimerEn } from "@/components/legal/DisclaimerEn";
import { DisclaimerDe } from "@/components/legal/DisclaimerDe";
import { DisclaimerFr } from "@/components/legal/DisclaimerFr";
import { DisclaimerIt } from "@/components/legal/DisclaimerIt";

/** The Spanish text prevails; the others are translations of it. */
const DOC: Record<AppLocale, () => React.JSX.Element> = { es: DisclaimerEs, en: DisclaimerEn, de: DisclaimerDe, fr: DisclaimerFr, it: DisclaimerIt };

const LAST_UPDATED = "2026-10-28";

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
    ...seoFor(safeLocale, "/legal/disclaimer", { title: t("title"), description: t("description") }),
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
      {TRANSLATED_LEGAL_LOCALES.includes(locale as AppLocale) ? <p>{t("translationNotice")}</p> : null}
      {(() => {
        const Doc = DOC[locale as AppLocale];
        return <Doc />;
      })()}
    </LegalLayout>
  );
}
