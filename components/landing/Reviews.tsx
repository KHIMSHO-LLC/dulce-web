import { getLocale, getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Split } from "@/components/motion/Split";
import { REVIEWS } from "@/content/reviews";
import type { AppLocale } from "@/i18n/routing";
import { SECTION } from "@/lib/site";

/**
 * Real words from people who use Dulce (content/reviews.ts). The original is
 * always shown; visitors reading another language also get our translation,
 * labelled as one.
 */
export async function Reviews() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("home.reviews");
  const reviews = REVIEWS.filter((r) => r.source === "appStore" || r.consent);
  if (reviews.length < 2) return null;

  const langName = new Intl.DisplayNames([locale], { type: "language" });
  const countryName = new Intl.DisplayNames([locale], { type: "region" });
  const month = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" });

  return (
    <section id={SECTION.reviews} data-mood="ember" aria-labelledby="reviews-title" className="relative z-10 py-16 md:py-24">
      <Reveal className="container-page">
        <Split id="reviews-title" text={t("title")} className="type-display text-[clamp(2.5rem,6vw,6rem)] text-ink" />

        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3">
          {reviews.map((r) => {
            const translated = r.lang !== locale ? r.translations[locale] : undefined;
            const context = r.context?.[locale] ?? r.context?.en;
            return (
              <figure
                key={r.id}
                data-fade
                className="flex flex-col rounded-[28px] border border-white/8 bg-glass p-7 md:p-8"
              >
                {r.stars ? (
                  <div className="mb-5 flex gap-1 text-ember-hi" role="img" aria-label={t("stars", { n: r.stars })}>
                    {Array.from({ length: r.stars }, (_, i) => (
                      <Star key={i} aria-hidden className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                ) : null}
                <blockquote lang={r.lang} className="text-[1.2rem] leading-snug text-ink">
                  “{r.quote}”
                </blockquote>
                {translated ? (
                  <p className="mt-3 text-label leading-relaxed text-soft">
                    {translated}
                    <span className="mt-1 block text-caption text-mute">
                      {t("translated", { lang: langName.of(r.lang) ?? r.lang })}
                    </span>
                  </p>
                ) : null}
                <figcaption className="mt-auto pt-6 text-label">
                  <span className="block font-semibold text-ink">
                    {r.name} · {countryName.of(r.country)}
                  </span>
                  {context ? <span className="block text-soft">{context}</span> : null}
                  <span className="block text-mute">
                    {t(`source.${r.source}`)} · {month.format(new Date(`${r.date}-01T00:00:00Z`))}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <p data-fade className="mt-6 text-caption text-mute">
          {t("note")}
        </p>
      </Reveal>
    </section>
  );
}
