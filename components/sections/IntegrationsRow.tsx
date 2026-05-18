import { useTranslations } from "next-intl";

const integrationKeys = ["libre", "dexcom", "nightscout", "appleHealth", "appleWatch"] as const;

export function IntegrationsRow() {
  const t = useTranslations("home.integrations");

  return (
    <section className="container-page py-12 md:py-16">
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
          {integrationKeys.map((key) => (
            <div
              key={key}
              className="rounded-[var(--radius-card)] bg-background border border-border-subtle py-5 px-4 flex items-center justify-center"
            >
              <span className="text-label font-semibold tracking-tight text-foreground text-center">
                {t(`items.${key}`)}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-caption text-muted leading-relaxed">{t("footer")}</p>
      </div>
    </section>
  );
}
