import type { Metadata } from "next";
import { ArchivedLegalPage, archivedMetadata, archivedParams } from "@/components/legal/ArchivedLegalPage";

/** An earlier version of the terms text (lib/legalVersions.ts), linked from the "What changed" box. */
export const dynamicParams = false;

export function generateStaticParams() {
  return archivedParams("terms");
}

export async function generateMetadata({ params }: PageProps<"/[locale]/legal/terms/[version]">): Promise<Metadata> {
  const { locale, version } = await params;
  return archivedMetadata("terms", locale, version);
}

export default async function ArchivedTermsPage({ params }: PageProps<"/[locale]/legal/terms/[version]">) {
  const { locale, version } = await params;
  return <ArchivedLegalPage doc="terms" locale={locale} version={version} />;
}
