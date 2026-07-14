import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { routing, type AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "blog" });
  return { title: t("title"), description: t("description") };
}

export default async function BlogIndexPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <BlogIndexContent locale={locale as AppLocale} />;
}

function BlogIndexContent({ locale }: { locale: AppLocale }) {
  const t = useTranslations("blog");
  const isEs = locale === "es";

  // These should ideally come from a CMS or JSON data file,
  // but we are hardcoding the initial SEO articles for performance.
  const posts = [
    {
      slug: "/blog/how-to-see-cgm-glucose-on-apple-watch",
      date: isEs ? "12 Oct, 2026" : "Oct 12, 2026",
      tag: isEs ? "Guías" : "Guides",
      title: isEs 
        ? "Cómo ver tu glucosa en el Apple Watch (y por qué la mayoría de apps fallan)"
        : "How to see your CGM glucose on your Apple Watch (and why most apps fail at it)",
      description: isEs 
        ? "Consigue lecturas de FreeStyle Libre o Dexcom nativamente en tu muñeca sin retrasos."
        : "Getting FreeStyle Libre or Dexcom readings natively on your wrist without delays.",
    },
    {
      slug: "/blog/time-in-range-vs-a1c",
      date: isEs ? "10 Oct, 2026" : "Oct 10, 2026",
      tag: isEs ? "Salud" : "Health",
      title: isEs
        ? "Tiempo en Rango vs. A1C: Por qué los endocrinólogos cambian su enfoque"
        : "Time in Range vs. A1C: Why endocrinologists are changing their focus",
      description: isEs
        ? "Por qué el objetivo del 70-180 mg/dL importa más para el manejo diario que tu A1C."
        : "Why the 70-180 mg/dL target matters more for daily diabetes management than your quarterly A1C.",
    },
    {
      slug: "/blog/sharing-cgm-glucose-with-family",
      date: isEs ? "05 Oct, 2026" : "Oct 05, 2026",
      tag: isEs ? "Familia" : "Family",
      title: isEs
        ? "Compartir tu glucosa CGM con la familia sin la 'fatiga de alarmas'"
        : "Sharing your CGM with family without the 'alert fatigue'",
      description: isEs
        ? "Cómo dar tranquilidad a tus seres queridos sin abrumarlos con alarmas a las 3 AM."
        : "How to give your loved ones peace of mind without overwhelming them with alarms at 3 AM.",
    }
  ];

  return (
    <div className="container-page py-16 md:py-24 space-y-16">
      {/* Hero Section */}
      <header className="max-w-3xl space-y-6">
        <p className="text-caption font-semibold uppercase tracking-wider text-accent">
          {t("title")}
        </p>
        <h1 className="text-display-lg md:text-display-xl tracking-tight font-bold text-foreground">
          {t("index.headline")}
        </h1>
        <p className="text-headline text-muted leading-relaxed max-w-2xl">
          {t("index.subheadline")}
        </p>
      </header>

      {/* Blog Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={post.slug as any}
            className="group block rounded-[var(--radius-card-lg)] bg-card border border-border-subtle overflow-hidden shadow-[var(--shadow-card-rest)] hover:shadow-[var(--shadow-card-elevated)] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-6 md:p-8 space-y-4">
              <div className="flex items-center justify-between text-caption text-muted font-semibold uppercase tracking-wider">
                <span className="text-accent">{post.tag}</span>
                <span>{post.date}</span>
              </div>
              <h3 className="text-headline font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-body text-muted leading-relaxed line-clamp-3">
                {post.description}
              </p>
            </div>
            <div className="px-6 pb-6 md:px-8 md:pb-8 flex items-center gap-2 text-label font-semibold text-accent opacity-80 group-hover:opacity-100 transition-opacity">
              {isEs ? "Leer artículo" : "Read article"} <span aria-hidden="true">&rarr;</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
