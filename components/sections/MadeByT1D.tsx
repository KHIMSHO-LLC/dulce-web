import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function MadeByT1D() {
  const t = useTranslations("home.madeBy");

  return (
    <section className="container-page py-16 md:py-24">
      <div className="rounded-[var(--radius-card-xl)] bg-warm-gradient border border-accent/15 p-8 md:p-14 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255, 180, 150, 0.55), rgba(255, 180, 150, 0) 70%)",
          }}
        />
        <div className="relative max-w-3xl">
          <p className="text-caption font-semibold uppercase tracking-wider text-accent">
            {t("eyebrow")}
          </p>
          <h2 className="text-display-lg md:text-display-xl tracking-tight font-bold text-foreground mt-2">
            {t("title")}
          </h2>
          <p className="mt-5 text-headline text-muted leading-snug">{t("body")}</p>
          <p className="mt-6 text-label font-semibold text-foreground">{t("signature")}</p>
          <Link
            href="/about"
            className="inline-flex items-center gap-1 mt-5 text-label font-semibold text-accent hover:text-accent-hover transition-colors"
          >
            {t("cta")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
