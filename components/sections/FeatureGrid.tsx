import { useTranslations } from "next-intl";
import { Link2, NotebookPen, LineChart, Users } from "lucide-react";

const featureKeys = ["connect", "diary", "trends", "share"] as const;
const icons = {
  connect: Link2,
  diary: NotebookPen,
  trends: LineChart,
  share: Users,
} as const;

export function FeatureGrid() {
  const t = useTranslations("home.features");

  return (
    <section className="container-page py-16 md:py-24">
      <div className="max-w-2xl mb-10 md:mb-14">
        <p className="text-caption font-semibold uppercase tracking-wider text-accent">
          {t("eyebrow")}
        </p>
        <h2 className="text-display-lg md:text-display-xl tracking-tight font-bold text-foreground mt-2">
          {t("title")}
        </h2>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        {featureKeys.map((key) => {
          const Icon = icons[key];
          return (
            <article
              key={key}
              className="rounded-[var(--radius-card-lg)] bg-card border border-border-subtle p-6 md:p-8 transition-shadow hover:shadow-[var(--shadow-card-elevated)]"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-[var(--radius-button-sm)] bg-accent text-white shadow-[var(--shadow-cta-rest)] flex-shrink-0">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-headline font-bold tracking-tight text-foreground">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="text-body text-muted mt-2 leading-relaxed">
                    {t(`items.${key}.body`)}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
