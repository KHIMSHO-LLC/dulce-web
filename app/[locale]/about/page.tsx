import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useLocale, useTranslations } from "next-intl";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Lock, Users, Heart } from "lucide-react";
import { routing, type AppLocale } from "@/i18n/routing";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "about" });
  return { title: t("title"), description: t("description") };
}

const valueIcons = {
  privacy: Lock,
  community: Users,
  honesty: Heart,
} as const;
const valueKeys = ["privacy", "community", "honesty"] as const;

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");
  const locale = useLocale() as "es" | "en";
  const paragraphs = t("story.body").split("\n\n");

  return (
    <div className="container-page py-16 md:py-24 space-y-16">
      <header className="max-w-3xl">
        <p className="text-caption font-semibold uppercase tracking-wider text-accent">
          {t("title")}
        </p>
        <h1 className="text-display-lg md:text-display-xl tracking-tight font-bold text-foreground mt-2">
          {t("hero.headline")}
        </h1>
        <p className="mt-4 text-headline text-muted leading-snug">{t("hero.subheadline")}</p>
      </header>

      <section className="max-w-3xl">
        <h2 className="text-display tracking-tight font-bold text-foreground">
          {t("story.title")}
        </h2>
        <div className="mt-5 space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-body text-muted leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-display tracking-tight font-bold text-foreground max-w-3xl">
          {t("values.title")}
        </h2>
        <div className="mt-6 grid gap-4 md:gap-6 md:grid-cols-3">
          {valueKeys.map((k) => {
            const Icon = valueIcons[k];
            return (
              <article
                key={k}
                className="rounded-[var(--radius-card-lg)] bg-card border border-border-subtle p-6 md:p-7"
              >
                <span className="inline-flex items-center justify-center h-11 w-11 rounded-[var(--radius-button-sm)] bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-headline font-bold tracking-tight text-foreground mt-4">
                  {t(`values.items.${k}.title`)}
                </h3>
                <p className="text-body text-muted mt-2 leading-relaxed">
                  {t(`values.items.${k}.body`)}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <div>
        <AppStoreBadge campaign="web_page" locale={locale} />
      </div>
    </div>
  );
}
