import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import { routing, type AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

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

const topicKeys = ["beta", "press", "doctor"] as const;

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
      <header className="max-w-3xl">
        <p className="text-caption font-semibold uppercase tracking-wider text-accent">
          {t("title")}
        </p>
        <h1 className="text-display-lg md:text-display-xl tracking-tight font-bold text-foreground mt-2">
          {t("headline")}
        </h1>
        <p className="mt-4 text-headline text-muted leading-snug">{t("subheadline")}</p>
      </header>

      <section className="mt-10 grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div className="rounded-[var(--radius-card-xl)] bg-card border border-border-subtle p-8 md:p-12 shadow-[var(--shadow-card-rest)]">
          <span className="inline-flex items-center justify-center h-12 w-12 rounded-[var(--radius-button-sm)] bg-accent text-white shadow-[var(--shadow-cta-rest)]">
            <Mail className="h-5 w-5" />
          </span>
          <p className="text-caption uppercase tracking-wider font-semibold text-muted mt-4">
            Email
          </p>
          <a
            href={`mailto:${t("email")}`}
            className="block text-display tracking-tight font-bold text-foreground mt-1 hover:text-accent transition-colors break-all"
          >
            {t("email")}
          </a>
          <p className="text-label text-muted mt-3">{t("responseTime")}</p>
        </div>

        <div>
          <h2 className="text-headline font-bold tracking-tight text-foreground">
            {t("topics.title")}
          </h2>
          <div className="mt-4 space-y-4">
            {topicKeys.map((k) => (
              <article key={k} className="rounded-[var(--radius-card)] bg-card border border-border-subtle p-5">
                <h3 className="text-label font-bold tracking-tight text-foreground">
                  {t(`topics.items.${k}.title`)}
                </h3>
                <p className="text-label text-muted mt-1 leading-relaxed">
                  {k === "beta" ? (
                    t.rich(`topics.items.${k}.body`, {
                      link: (chunks) => (
                        <Link
                          href="/beta"
                          className="text-accent hover:text-accent-hover underline underline-offset-2"
                        >
                          {chunks}
                        </Link>
                      ),
                    })
                  ) : (
                    t(`topics.items.${k}.body`)
                  )}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
