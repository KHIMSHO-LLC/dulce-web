import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ENGLISH_LEGAL_LOCALES, TRANSLATED_LEGAL_LOCALES, routing, type AppLocale } from "@/i18n/routing";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { ArchivedNotice } from "@/components/legal/LegalChanges";
import { ARCHIVED } from "@/components/legal/archive";
import { LEGAL_ARCHIVE, type LegalDoc } from "@/lib/legalVersions";

/** Static params for every locale and archived version of a legal text. */
export function archivedParams(doc: LegalDoc) {
  return routing.locales.flatMap((locale) => LEGAL_ARCHIVE[doc].map(({ version }) => ({ locale, version })));
}

/** Archived versions are kept for reference only: never indexed. */
export async function archivedMetadata(doc: LegalDoc, locale: string, version: string): Promise<Metadata> {
  const safeLocale = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: `legal.${doc}` });
  return { title: `${t("title")} (${version})`, robots: { index: false, follow: false } };
}

export async function ArchivedLegalPage({ doc, locale, version }: { doc: LegalDoc; locale: string; version: string }) {
  if (!hasLocale(routing.locales, locale)) notFound();
  const byLocale = ARCHIVED[doc][version];
  const entry = LEGAL_ARCHIVE[doc].find((v) => v.version === version);
  if (!byLocale || !entry) notFound();
  setRequestLocale(locale);
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale: loc, namespace: "legal" });
  const tDoc = await getTranslations({ locale: loc, namespace: `legal.${doc}` });
  const Doc = byLocale[loc] ?? byLocale.en;
  return (
    <LegalLayout title={tDoc("title")} lastUpdated={t("lastUpdated", { date: entry.validFrom })}>
      <ArchivedNotice doc={doc} locale={loc} version={version} />
      {TRANSLATED_LEGAL_LOCALES.includes(loc) || ENGLISH_LEGAL_LOCALES.includes(loc) ? <p>{t("translationNotice")}</p> : null}
      <Doc />
    </LegalLayout>
  );
}
