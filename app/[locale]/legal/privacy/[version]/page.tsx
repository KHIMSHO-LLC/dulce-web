import type { Metadata } from "next";
import { ArchivedLegalPage, archivedMetadata, archivedParams } from "@/components/legal/ArchivedLegalPage";

/** An earlier version of the privacy text (lib/legalVersions.ts), linked from the "What changed" box. */
export const dynamicParams = false;

export function generateStaticParams() {
  return archivedParams("privacy");
}

export async function generateMetadata({ params }: PageProps<"/[locale]/legal/privacy/[version]">): Promise<Metadata> {
  const { locale, version } = await params;
  return archivedMetadata("privacy", locale, version);
}

export default async function ArchivedPrivacyPage({ params }: PageProps<"/[locale]/legal/privacy/[version]">) {
  const { locale, version } = await params;
  return <ArchivedLegalPage doc="privacy" locale={locale} version={version} />;
}
