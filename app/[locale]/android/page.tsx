import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Smartphone } from "lucide-react";
import { routing, type AppLocale } from "@/i18n/routing";
import { WaitlistForm } from "@/components/forms/WaitlistForm";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/android">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "android" });
  return { title: t("title"), description: t("description") };
}

export default async function AndroidPage({ params }: PageProps<"/[locale]/android">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <AndroidContent />;
}

function AndroidContent() {
  const t = useTranslations("android");

  return (
    <div className="container-page py-16 md:py-24 space-y-16">
      {/* Hero Section */}
      <header className="max-w-3xl text-center mx-auto space-y-6">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-[var(--radius-card)] bg-accent/10 text-accent mb-4">
          <Smartphone className="h-8 w-8" />
        </div>
        <h1 className="text-display-lg md:text-display-xl tracking-tight font-bold text-foreground">
          {t("hero.headline")}
        </h1>
        <p className="text-headline text-muted leading-relaxed mx-auto">
          {t("hero.subheadline")}
        </p>
      </header>

      {/* Waitlist Section */}
      <section className="max-w-xl mx-auto">
        <div className="rounded-[var(--radius-card-xl)] bg-card border border-border-subtle p-8 md:p-10 shadow-[var(--shadow-card-rest)] text-left">
          <h2 className="text-display tracking-tight font-bold text-foreground mb-2">
            {t("waitlist.title")}
          </h2>
          <p className="text-body text-muted leading-relaxed mb-8">
            {t("waitlist.subtitle")}
          </p>
          <WaitlistForm source="android_page" variant="stacked" />
        </div>
      </section>
    </div>
  );
}
