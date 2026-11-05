import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { Split } from "@/components/motion/Split";
import { getArticle, isTranslated } from "@/content/articles";
import type { AppLocale } from "@/i18n/routing";
import { articlePath } from "@/lib/articles";

/** Path of a guide in this language, or its English page while it isn't translated yet. */
export function guideHref(id: string, locale: AppLocale): string {
  const article = getArticle(id);
  if (!article) throw new Error(`Unknown guide "${id}" in messages audience.*`);
  const lang: AppLocale = isTranslated(article, locale) ? locale : "en";
  return articlePath(article, lang);
}

type Segment = { id: string; title: string; short: string; guide: string };

/** Who Dulce is for: one linked line per segment, the home page's way into the guides. */
export async function Audience() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("audience");
  const segments = t.raw("segments") as Segment[];

  return (
    <section data-mood="dusk" aria-labelledby="audience-title" className="relative z-10 py-16 md:py-24">
      <Reveal className="container-page">
        <Split id="audience-title" text={t("homeTitle")} className="type-display text-[clamp(2.5rem,6vw,6rem)] text-ink" />
        <p data-fade className="mt-6 max-w-[56ch] text-[1.125rem] leading-relaxed text-soft">
          {t("homeLead")}
        </p>
        <ul data-fade className="mt-10 grid gap-x-10 md:mt-14 md:grid-cols-2">
          {segments.map((s) => (
            <li key={s.id} className="border-t border-white/12">
              <a href={guideHref(s.guide, locale)} className="group flex items-start justify-between gap-6 py-6">
                <span>
                  <span className="block text-[clamp(1.2rem,1.7vw,1.5rem)] font-light tracking-[-0.015em] text-ink">{s.title}</span>
                  <span className="mt-1.5 block max-w-[42ch] text-body leading-relaxed text-soft">{s.short}</span>
                </span>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-mute transition-colors group-hover:text-ember" strokeWidth={1.6} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
        <Link href="/who-is-dulce-for" className="mt-8 inline-block text-label font-semibold text-ember hover:text-ember-hi">
          {t("homeCta")}
        </Link>
      </Reveal>
    </section>
  );
}
