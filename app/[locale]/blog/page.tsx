import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { BLOG_POSTS, formatBlogDate } from "@/lib/blog";

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

  // Post metadata lives in lib/blog.ts so the index, article headers and
  // JSON-LD all stay in sync.
  const posts = BLOG_POSTS;

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
            href={post.href}
            className="group block rounded-[var(--radius-card-lg)] bg-card border border-border-subtle overflow-hidden shadow-[var(--shadow-card-rest)] hover:shadow-[var(--shadow-card-elevated)] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-6 md:p-8 space-y-4">
              <div className="flex items-center justify-between text-caption text-muted font-semibold uppercase tracking-wider">
                <span className="text-accent">{post.tag[locale]}</span>
                <span>{formatBlogDate(post.datePublished, locale)}</span>
              </div>
              <h3 className="text-headline font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
                {post.title[locale]}
              </h3>
              <p className="text-body text-muted leading-relaxed line-clamp-3">
                {post.description[locale]}
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
