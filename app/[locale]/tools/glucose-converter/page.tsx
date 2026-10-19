import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { ToolPage } from "@/components/tools/ToolPage";
import { GlucoseConverter } from "@/components/tools/GlucoseConverter";
import { alternatesFor } from "@/lib/seo";
import { TOOL_COPY } from "@/lib/tools";

const PATH = "/tools/glucose-converter" as const;

export async function generateMetadata({ params }: PageProps<"/[locale]/tools/glucose-converter">): Promise<Metadata> {
  const { locale } = await params;
  const loc = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as AppLocale;
  const copy = TOOL_COPY[PATH][loc];
  return { title: copy.title, description: copy.description, alternates: alternatesFor(loc, PATH) };
}

export default async function Page({ params }: PageProps<"/[locale]/tools/glucose-converter">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <ToolPage locale={locale} path={PATH} name="glucose-converter" calculator={<GlucoseConverter locale={locale} />} />;
}
