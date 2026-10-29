import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { TRANSLATED_LEGAL_LOCALES, routing, type AppLocale } from "@/i18n/routing";
import { seoFor } from "@/lib/seo";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CookiesEs } from "@/components/legal/CookiesEs";
import { CookiesEn } from "@/components/legal/CookiesEn";
import { CookiesDe } from "@/components/legal/CookiesDe";
import { CookiesFr } from "@/components/legal/CookiesFr";
import { CookiesIt } from "@/components/legal/CookiesIt";

/** The Spanish text prevails; the others are translations of it. */
const DOC: Record<AppLocale, () => React.JSX.Element> = { es: CookiesEs, en: CookiesEn, de: CookiesDe, fr: CookiesFr, it: CookiesIt };

const LAST_UPDATED = "2026-10-29";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/legal/cookies">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "legal.cookies" });
  return {
    title: t("title"),
    description: t("description"),
    ...seoFor(safeLocale, "/legal/cookies", { title: t("title"), description: t("description") }),
  };
}

export default async function CookiesPage({
  params,
}: PageProps<"/[locale]/legal/cookies">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "legal" });
  const tDoc = await getTranslations({ locale, namespace: "legal.cookies" });

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
