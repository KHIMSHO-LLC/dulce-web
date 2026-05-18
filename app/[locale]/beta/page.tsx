import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { routing, type AppLocale } from "@/i18n/routing";
import { BetaForm } from "@/components/forms/BetaForm";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/beta">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "beta" });
  return { title: t("title"), description: t("description") };
}

export default async function BetaPage({ params }: PageProps<"/[locale]/beta">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <BetaContent />;
}

function BetaContent() {
  const t = useTranslations("beta");
  const whatItems = t.raw("what.items") as string[];
  const whoItems = t.raw("who.items") as string[];

  return (
    <div className="container-page py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="text-caption font-semibold uppercase tracking-wider text-accent">
          Beta
        </p>
        <h1 className="text-display-lg md:text-display-xl tracking-tight font-bold text-foreground mt-2">
          {t("hero.headline")}
        </h1>
        <p className="mt-4 text-headline text-muted leading-snug">
          {t("hero.subheadline")}
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 mt-12">
        <div className="space-y-10">
          <section>
            <h2 className="text-display tracking-tight font-bold text-foreground">
              {t("what.title")}
            </h2>
            <ul className="mt-4 space-y-3">
              {whatItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body text-foreground">
                  <span className="mt-0.5 inline-flex items-center justify-center h-5 w-5 rounded-full bg-accent text-white flex-shrink-0">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-display tracking-tight font-bold text-foreground">
              {t("who.title")}
            </h2>
            <ul className="mt-4 space-y-3">
              {whoItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body text-foreground">
                  <span className="mt-0.5 inline-flex items-center justify-center h-5 w-5 rounded-full bg-accent text-white flex-shrink-0">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="rounded-[var(--radius-card-xl)] bg-card border border-border-subtle p-6 md:p-10 shadow-[var(--shadow-card-rest)]">
          <h2 className="text-headline font-bold tracking-tight text-foreground">
            {t("form.title")}
          </h2>
          <div className="mt-6">
            <BetaForm />
          </div>
        </div>
      </div>
    </div>
  );
}
