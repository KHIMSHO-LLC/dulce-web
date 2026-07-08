import { useTranslations } from "next-intl";
import {
  Link2,
  NotebookPen,
  LineChart,
  Users,
  BellRing,
  Smartphone,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

const featureKeys = [
  "connect",
  "everywhere",
  "alerts",
  "diary",
  "trends",
  "share",
] as const;
const icons = {
  connect: Link2,
  everywhere: Smartphone,
  alerts: BellRing,
  diary: NotebookPen,
  trends: LineChart,
  share: Users,
} as const;

export function FeatureGrid() {
  const t = useTranslations("home.features");

  return (
    <section className="container-page py-16 md:py-24">
      <Reveal className="max-w-2xl mb-10 md:mb-14">
        <p className="text-caption font-semibold uppercase tracking-wider text-accent">
          {t("eyebrow")}
        </p>
        <h2 className="text-display-lg md:text-display-xl tracking-tight font-bold text-foreground mt-2">
          {t("title")}
        </h2>
      </Reveal>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featureKeys.map((key, i) => {
          const Icon = icons[key];
          return (
            <Reveal key={key} delay={(i % 3) * 100}>
              <article className="h-full rounded-[var(--radius-card-lg)] bg-card border border-border-subtle p-6 md:p-7 transition-shadow hover:shadow-[var(--shadow-card-elevated)]">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-[var(--radius-button-sm)] bg-accent text-white shadow-[var(--shadow-cta-rest)]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-headline font-bold tracking-tight text-foreground mt-4">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-body text-muted mt-2 leading-relaxed">
                  {t(`items.${key}.body`)}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
