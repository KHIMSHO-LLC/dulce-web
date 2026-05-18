import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Personas } from "@/components/sections/Personas";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { IntegrationsRow } from "@/components/sections/IntegrationsRow";
import { MadeByT1D } from "@/components/sections/MadeByT1D";
import { FinalCta } from "@/components/sections/FinalCta";
import { hasLocale } from "next-intl";
import { routing, type AppLocale } from "@/i18n/routing";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "home" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Personas />
      <FeatureGrid />
      <IntegrationsRow />
      <MadeByT1D />
      <FinalCta />
    </>
  );
}
