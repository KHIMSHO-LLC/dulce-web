import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { seoFor } from "@/lib/seo";
import { LegalLayout } from "@/components/legal/LegalLayout";

const LAST_UPDATED = "2026-11-22";
const TITLE = "Impressum";
const DESCRIPTION = "Impressum / Legal notice of Dulce (dulceglucosa.com).";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/legal/impressum">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as AppLocale;
  return {
    title: TITLE,
    description: DESCRIPTION,
    ...seoFor(safeLocale, "/legal/impressum", { title: TITLE, description: DESCRIPTION }),
    // One page in every locale: only the German URL is indexed.
    ...(safeLocale !== "de" ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ImpressumPage({ params }: PageProps<"/[locale]/legal/impressum">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <LegalLayout title={TITLE} lastUpdated={`Stand / Last updated: ${LAST_UPDATED}`}>
      <h2 id="angaben">Angaben gemäß § 5 DDG / Legal notice</h2>
      <p>
        <strong>Giorgi Khimshiashvili</strong>
        <br />
        Einzelunternehmer / Individual entrepreneur
        <br />
        4600 Kutaisi
        <br />
        Georgien / Georgia
      </p>

      <h2 id="kontakt">Kontakt / Contact</h2>
      <p>
        E-Mail: <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>
      </p>

      <h2 id="verantwortlich">Verantwortlich für den Inhalt / Responsible for the content</h2>
      <p>Giorgi Khimshiashvili (Anschrift wie oben / address as above)</p>

      <h2 id="streit">Verbraucherstreitbeilegung / Consumer dispute resolution</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen. / We are not willing or obliged to take part in
        dispute resolution proceedings before a consumer arbitration board.
      </p>
    </LegalLayout>
  );
}
