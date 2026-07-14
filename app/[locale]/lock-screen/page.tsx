import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Smartphone, Moon, LayoutTemplate } from "lucide-react";
import { routing, type AppLocale } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/lock-screen">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "lockScreen" });
  return { title: t("title"), description: t("description") };
}

export default async function LockScreenPage({ params }: PageProps<"/[locale]/lock-screen">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <LockScreenContent />;
}

function LockScreenContent() {
  const t = useTranslations("lockScreen");

  return (
    <div className="container-page py-16 md:py-24 space-y-24">
      {/* Hero Section */}
      <header className="max-w-4xl text-center mx-auto space-y-6">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-[var(--radius-card)] bg-accent/10 text-accent mb-4">
          <Smartphone className="h-8 w-8" />
        </div>
        <h1 className="text-display-lg md:text-display-xl tracking-tight font-bold text-foreground">
          {t("hero.headline")}
        </h1>
        <p className="text-headline text-muted leading-relaxed max-w-2xl mx-auto">
          {t("hero.subheadline")}
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Button as="a" href="/#waitlist" size="lg">
            {useTranslations("nav")("joinWaitlist")}
          </Button>
        </div>
      </header>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="rounded-[var(--radius-card-lg)] bg-card border border-border-subtle p-8 shadow-[var(--shadow-card-rest)]">
          <div className="h-12 w-12 rounded-full bg-accent-soft text-accent flex items-center justify-center mb-6">
            <Smartphone className="h-6 w-6" />
          </div>
          <h3 className="text-headline font-bold text-foreground mb-3">
            {t("features.liveActivity.title")}
          </h3>
          <p className="text-body text-muted leading-relaxed">
            {t("features.liveActivity.body")}
          </p>
        </div>

        <div className="rounded-[var(--radius-card-lg)] bg-card border border-border-subtle p-8 shadow-[var(--shadow-card-rest)]">
          <div className="h-12 w-12 rounded-full bg-accent-soft text-accent flex items-center justify-center mb-6">
            <Moon className="h-6 w-6" />
          </div>
          <h3 className="text-headline font-bold text-foreground mb-3">
            {t("features.standBy.title")}
          </h3>
          <p className="text-body text-muted leading-relaxed">
            {t("features.standBy.body")}
          </p>
        </div>

        <div className="rounded-[var(--radius-card-lg)] bg-card border border-border-subtle p-8 shadow-[var(--shadow-card-rest)]">
          <div className="h-12 w-12 rounded-full bg-accent-soft text-accent flex items-center justify-center mb-6">
            <LayoutTemplate className="h-6 w-6" />
          </div>
          <h3 className="text-headline font-bold text-foreground mb-3">
            {t("features.widgets.title")}
          </h3>
          <p className="text-body text-muted leading-relaxed">
            {t("features.widgets.body")}
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center pb-12">
        <h2 className="text-display tracking-tight font-bold text-foreground mb-4">
          Ready for less friction?
        </h2>
        <Button as="a" href="/#waitlist" size="lg">
          {useTranslations("nav")("joinWaitlist")}
        </Button>
      </section>
    </div>
  );
}
