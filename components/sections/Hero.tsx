import { useTranslations } from "next-intl";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { PhoneMockup } from "@/components/PhoneMockup";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 -top-32 -z-10 h-[420px]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 30%, rgba(255, 200, 180, 0.40), rgba(255, 200, 180, 0) 70%)",
        }}
      />
      <div className="container-page pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16 items-center">
          <div className="space-y-7">
            <span className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-card border border-border-subtle px-3 py-1 text-caption font-semibold uppercase tracking-wider text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t("eyebrow")}
            </span>
            <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[3.75rem] leading-[1.05] font-bold tracking-tight text-foreground">
              {t("headline")}
              <br />
              <span className="text-accent">{t("headlineAccent")}</span>
            </h1>
            <p className="text-headline text-muted max-w-xl leading-snug">
              {t("subheadline")}
            </p>

            <div id="waitlist" className="max-w-md scroll-mt-24">
              <WaitlistForm source="hero" />
            </div>

            <div className="flex flex-wrap items-center gap-3 text-caption text-muted">
              <span>{t("trustNote")}</span>
            </div>

            <div className="pt-2">
              <Button as="a" href="#beta-cta" variant="ghost" size="sm">
                {t("ctaSecondary")} →
              </Button>
            </div>
          </div>

          <div className="relative">
            <PhoneMockup
              greeting="Hola, Sofía"
              subline="Bienvenida a Dulce"
              pillLabel="Hoy"
              cards={[
                { icon: "heart", label: "Tu familia", value: "3 personas conectadas" },
                { icon: "activity", label: "Tu actividad", value: "Sincronizada hoy" },
                { icon: "apple", label: "Apple Salud", value: "Conectada" },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
