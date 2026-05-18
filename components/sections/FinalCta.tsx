import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

export function FinalCta() {
  const t = useTranslations("home.finalCta");

  return (
    <section id="beta-cta" className="container-page py-16 md:py-24">
      <div className="rounded-[var(--radius-card-xl)] bg-foreground text-background p-10 md:p-16 text-center relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-0 opacity-40"
          style={{
            background:
              "radial-gradient(40% 50% at 50% 0%, rgba(194, 65, 12, 0.55), rgba(194, 65, 12, 0) 70%)",
          }}
        />
        <div className="relative">
          <h2 className="text-display-lg md:text-display-xl tracking-tight font-bold text-background">
            {t("title")}
          </h2>
          <p className="mt-4 text-headline text-background/75 max-w-2xl mx-auto leading-snug">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button as="a" href="#waitlist" size="lg">
              {t("ctaWaitlist")}
            </Button>
            <Link
              href="/beta"
              className="inline-flex items-center gap-1 px-5 py-3 text-label font-semibold text-background/90 hover:text-background transition-colors"
            >
              {t("ctaBeta")} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
