import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Link2, NotebookPen, LineChart, Users, Watch, ShieldCheck } from "lucide-react";
import { routing, type AppLocale } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/features">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "features" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const sectionKeys = ["connect", "diary", "trends", "share", "watch", "privacy"] as const;
const icons = {
  connect: Link2,
  diary: NotebookPen,
  trends: LineChart,
  share: Users,
  watch: Watch,
  privacy: ShieldCheck,
} as const;

function FeatureSection({ k }: { k: (typeof sectionKeys)[number] }) {
  const t = useTranslations(`features.sections.${k}`);
  const Icon = icons[k];
  const bullets = t.raw("bullets") as string[];

  return (
    <article className="grid gap-6 md:grid-cols-[auto_1fr] items-start py-10 md:py-14 border-b border-border-subtle last:border-b-0">
      <span className="inline-flex items-center justify-center h-14 w-14 rounded-[var(--radius-card)] bg-accent text-white shadow-[var(--shadow-cta-rest)]">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <h2 className="text-display tracking-tight font-bold text-foreground">
          {t("title")}
        </h2>
        <p className="mt-3 text-body text-muted leading-relaxed max-w-2xl">{t("body")}</p>
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 max-w-2xl">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 text-label text-foreground"
            >
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default async function FeaturesPage({
  params,
}: PageProps<"/[locale]/features">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <FeaturesContent />;
}

function FeaturesContent() {
  const t = useTranslations("features");

  return (
    <div className="container-page py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="text-caption font-semibold uppercase tracking-wider text-accent">
          {t("title")}
        </p>
        <h1 className="text-display-lg md:text-display-xl tracking-tight font-bold text-foreground mt-2">
          {t("intro.headline")}
        </h1>
        <p className="mt-4 text-headline text-muted leading-snug max-w-2xl">
          {t("intro.subheadline")}
        </p>
      </header>

      <div className="mt-10">
        {sectionKeys.map((k) => (
          <FeatureSection key={k} k={k} />
        ))}
      </div>

      <aside className="mt-12 rounded-[var(--radius-card-lg)] border border-state-low/30 bg-state-low/5 p-6 md:p-8 max-w-3xl">
        <h2 className="text-headline font-bold text-state-low">
          {t("disclaimer.title")}
        </h2>
        <p
          className="mt-2 text-body text-muted leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: t("disclaimer.body").replace(
              /\*\*(.+?)\*\*/g,
              "<strong>$1</strong>",
            ),
          }}
        />
      </aside>

      <div className="mt-12 flex flex-wrap items-center gap-3">
        <Button as="a" href="/#waitlist" size="lg">
          {useTranslations("nav")("joinWaitlist")}
        </Button>
        <Link
          href="/beta"
          className="inline-flex items-center gap-1 px-5 py-3 text-label font-semibold text-accent hover:text-accent-hover"
        >
          {useTranslations("home.finalCta")("ctaBeta")} →
        </Link>
      </div>
    </div>
  );
}
