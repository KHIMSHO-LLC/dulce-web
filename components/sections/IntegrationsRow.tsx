import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";

const availableKeys = ["libre", "appleHealth", "appleWatch"] as const;
const comingKeys = ["dexcom", "nightscout"] as const;

export function IntegrationsRow() {
  const t = useTranslations("home.integrations");

  return (
    <section className="container-page py-12 md:py-16">
      <Reveal>
        <div className="rounded-[var(--radius-card-xl)] bg-card border border-border-subtle p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-md">
              <p className="text-caption font-semibold uppercase tracking-wider text-accent">
                {t("eyebrow")}
              </p>
              <h2 className="text-display tracking-tight font-bold text-foreground mt-2">
                {t("title")}
              </h2>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {availableKeys.map((key) => (
              <div
                key={key}
                className="rounded-[var(--radius-card)] bg-background border border-border-subtle py-5 px-4 flex items-center justify-center"
              >
                <span className="text-label font-semibold tracking-tight text-foreground text-center">
                  {t(`items.${key}`)}
                </span>
              </div>
            ))}
            {comingKeys.map((key) => (
              <div
                key={key}
                className="relative rounded-[var(--radius-card)] bg-background border border-dashed border-border-subtle py-5 px-4 flex items-center justify-center opacity-70"
              >
                <span className="text-label font-semibold tracking-tight text-muted text-center">
                  {t(`items.${key}`)}
                </span>
                <span className="absolute -top-2 right-3 rounded-[var(--radius-pill)] bg-accent-soft border border-accent/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                  {t("soonBadge")}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-caption text-muted leading-relaxed">{t("footer")}</p>
        </div>
      </Reveal>
    </section>
  );
}
