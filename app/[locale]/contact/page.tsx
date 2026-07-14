import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Mail, Clock, MessageSquare } from "lucide-react";
import { routing, type AppLocale } from "@/i18n/routing";
import { ContactForm } from "@/components/forms/ContactForm";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "contact" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations("contact");

  return (
    <div className="container-page py-16 md:py-24">
      <header className="max-w-2xl mb-12">
        <p className="text-caption font-semibold uppercase tracking-wider text-accent">
          {t("title")}
        </p>
        <h1 className="text-display-lg md:text-display-xl tracking-tight font-bold text-foreground mt-2">
          {t("headline")}
        </h1>
        <p className="mt-4 text-headline text-muted leading-relaxed">
          {t("subheadline")}
        </p>
      </header>

      <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 items-start">
        {/* Left column — quick contact info */}
        <div className="space-y-5">
          <div className="rounded-[var(--radius-card-lg)] bg-card border border-border-subtle p-6 flex items-start gap-4 shadow-[var(--shadow-card-rest)]">
            <span className="inline-flex items-center justify-center h-10 w-10 rounded-[var(--radius-button-sm)] bg-accent text-white shadow-[var(--shadow-cta-rest)] flex-shrink-0">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="text-caption uppercase tracking-wider font-semibold text-muted">
                Email
              </p>
              <a
                href="mailto:hola@dulceglucosa.com"
                className="text-label font-bold text-foreground hover:text-accent transition-colors break-all"
              >
                hola@dulceglucosa.com
              </a>
            </div>
          </div>

          <div className="rounded-[var(--radius-card-lg)] bg-card border border-border-subtle p-6 flex items-start gap-4 shadow-[var(--shadow-card-rest)]">
            <span className="inline-flex items-center justify-center h-10 w-10 rounded-[var(--radius-button-sm)] bg-accent/10 text-accent flex-shrink-0">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <p className="text-caption uppercase tracking-wider font-semibold text-muted">
                {t("responseTimeLabel")}
              </p>
              <p className="text-label font-semibold text-foreground">
                {t("responseTime")}
              </p>
            </div>
          </div>

          <div className="rounded-[var(--radius-card-lg)] bg-card border border-border-subtle p-6 shadow-[var(--shadow-card-rest)]">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-[var(--radius-button-sm)] bg-accent/10 text-accent flex-shrink-0">
                <MessageSquare className="h-5 w-5" />
              </span>
              <h2 className="text-label font-bold text-foreground">
                {t("topics.title")}
              </h2>
            </div>
            <ul className="space-y-3">
              {(["beta", "press", "doctor"] as const).map((k) => (
                <li key={k} className="text-label text-muted leading-relaxed">
                  <span className="font-semibold text-foreground">
                    {t(`topics.items.${k}.title`)}
                  </span>{" "}
                  — {t(`topics.items.${k}.body`)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column — the actual contact form */}
        <div className="rounded-[var(--radius-card-xl)] bg-card border border-border-subtle p-8 md:p-10 shadow-[var(--shadow-card-rest)]">
          <h2 className="text-display tracking-tight font-bold text-foreground mb-2">
            {t("form.title")}
          </h2>
          <p className="text-body text-muted mb-8 leading-relaxed">
            {t("form.subtitle")}
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
