import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { Split } from "@/components/motion/Split";
import { SECTION } from "@/lib/site";

/** Free next to Pro, from the same copy as the /pro page (messages `pro`), so the two never disagree. */
export async function PlanCompare() {
  const t = await getTranslations("pro");
  const free = t.raw("free") as string[];
  const pro = t.raw("pro") as string[];
  const trial = t.raw("trial") as string[];

  return (
    <section id={SECTION.plans} data-mood="ember" aria-labelledby="plans-title" className="relative z-10 py-16 md:py-24">
      <Reveal className="container-page">
        <Split id="plans-title" text={t("headline")} className="type-display text-[clamp(2.2rem,5vw,5rem)] text-ink" />
        <p data-fade className="mt-5 max-w-[52ch] text-body leading-relaxed text-soft">
          {t("lead")}
        </p>

        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2">
          <article data-fade className="rounded-[28px] border border-white/8 bg-glass p-7 md:p-10">
            <h3 className="type-display text-[clamp(1.8rem,3vw,2.6rem)] text-ink">{t("freeTitle")}</h3>
            <ul className="mt-6 space-y-3">
              {free.map((item) => (
                <li key={item} className="flex gap-3 text-body text-soft">
                  <Check aria-hidden className="mt-1 h-5 w-5 shrink-0 text-range-text" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article
            data-fade
            className="relative overflow-hidden rounded-[28px] border border-ember/30 p-7 md:p-10"
            style={{
              background:
                "radial-gradient(90% 80% at 100% 0%, rgba(243,102,56,0.32), rgba(243,102,56,0) 60%), linear-gradient(160deg, #201713, #120e0c)",
            }}
          >
            <h3 className="type-display text-[clamp(1.8rem,3vw,2.6rem)] text-ink">{t("proTitle")}</h3>
            <p className="mt-2 text-label font-semibold text-ember-hi">{trial[0]}</p>
            <ul className="mt-6 space-y-3">
              {pro.map((item) => (
                <li key={item} className="flex gap-3 text-body text-soft">
                  <Check aria-hidden className="mt-1 h-5 w-5 shrink-0 text-ember-hi" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <p data-fade className="mt-6 text-label">
          <Link href="/pro" className="inline-flex items-center gap-1.5 text-ember transition-colors hover:text-ember-hi">
            {t("nav")}
            <ArrowUpRight aria-hidden className="h-4 w-4" />
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
