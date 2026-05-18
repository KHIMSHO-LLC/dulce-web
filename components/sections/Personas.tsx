import { useTranslations } from "next-intl";
import { User, Baby, Stethoscope } from "lucide-react";

const personaIcons = {
  adult: User,
  parent: Baby,
  doctor: Stethoscope,
} as const;

const personaKeys = ["adult", "parent", "doctor"] as const;

export function Personas() {
  const t = useTranslations("home.personas");

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

      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        {personaKeys.map((key) => {
          const Icon = personaIcons[key];
          return (
            <article
              key={key}
              className="rounded-[var(--radius-card-lg)] bg-card border border-border-subtle p-6 md:p-7 transition-shadow hover:shadow-[var(--shadow-card-elevated)]"
            >
              <span className="inline-flex items-center justify-center h-11 w-11 rounded-[var(--radius-button-sm)] bg-accent-soft text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-headline font-bold tracking-tight text-foreground mt-4">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-body text-muted mt-2 leading-relaxed">
                {t(`items.${key}.body`)}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
