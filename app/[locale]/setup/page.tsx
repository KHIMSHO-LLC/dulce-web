import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { routing, type AppLocale } from "@/i18n/routing";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";
import { Byline } from "@/components/article/Byline";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { Split } from "@/components/motion/Split";
import { faqSchema, breadcrumbSchema, howToSchema } from "@/lib/schema";
import { seoFor, localizedPath } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/setup">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "setup" });
  const og = { title: t("title"), description: t("description") };
  return { ...og, ...seoFor(safeLocale, "/setup", og) };
}

/**
 * LibreLink vs LibreLinkUp. The app deep-links here (fixed `/setup` path), so
 * this stays its own route: the one help page Dulce users actually need.
 */
export default async function SetupPage({ params }: PageProps<"/[locale]/setup">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale: loc, namespace: "setup" });

  const faq = faqSchema(
    ["1", "2", "3"].map((n) => ({ question: t(`faq.q${n}`), answer: t(`faq.a${n}`) })),
    loc,
  );
  const home = `${SITE_URL}${localizedPath(loc, "/") === "/" ? "" : localizedPath(loc, "/")}`;
  const breadcrumbs = breadcrumbSchema([
    { name: t("breadcrumbHome"), url: home },
    { name: t("hero.headline"), url: `${SITE_URL}${localizedPath(loc, "/setup")}` },
  ]);
  const steps = ["step1", "step2", "step3", "step4"] as const;
  // Last change to the setup copy in any language (messages/*.json `setup`). Bump with the copy.
  const dateModified = "2026-10-24";
  // Built from the same messages the numbered list renders.
  const howTo = howToSchema({
    url: `${SITE_URL}${localizedPath(loc, "/setup")}`,
    name: t("steps.title"),
    description: t("description"),
    locale: loc,
    dateModified,
    steps: steps.map((key) => ({ name: t(`steps.${key}.title`), text: t(`steps.${key}.body`) })),
  });

  return (
    <>
      <JsonLd data={faq} />
      <JsonLd data={breadcrumbs} />
      <JsonLd data={howTo} />
      <div className="relative z-10 pb-12 pt-28 md:pt-36">
        <Reveal className="container-page" on="intro">
          <Split as="h1" text={t("hero.headline")} className="type-display max-w-[18ch] text-[clamp(2.6rem,6vw,5.8rem)] text-ink" />
          <p data-fade className="mt-8 max-w-[52ch] text-[1.125rem] leading-relaxed text-soft">
            {t("hero.subheadline")}
          </p>
          <div data-fade>
            <Byline locale={loc} author="giorgi" dateModified={dateModified} />
          </div>
        </Reveal>

        <Reveal className="container-page mt-20 md:mt-28">
          <h2 data-fade className="text-[1.75rem] font-light tracking-[-0.02em] text-ink" style={{ fontVariationSettings: '"wdth" 104' }}>
            {t("compare.title")}
          </h2>
          <div className="mt-8 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
            <article data-fade className="rounded-[28px] border border-white/8 bg-glass p-7 md:p-9">
              <h3 className="text-[1.6rem] font-light text-mute line-through decoration-white/25">{t("compare.scan.title")}</h3>
              <p className="mt-3 text-body leading-relaxed text-soft">{t("compare.scan.body")}</p>
            </article>
            <ArrowRight className="mx-auto hidden h-7 w-7 self-center text-ember md:block" strokeWidth={1.4} aria-hidden />
            <article
              data-fade
              className="rounded-[28px] border border-ember/40 p-7 md:p-9"
              style={{ background: "radial-gradient(90% 90% at 100% 100%, rgba(243,102,56,0.3), rgba(243,102,56,0) 70%), #1a1310" }}
            >
              <h3 className="text-[1.6rem] font-light text-ink">{t("compare.share.title")}</h3>
              <p className="mt-3 text-body leading-relaxed text-soft">{t("compare.share.body")}</p>
            </article>
          </div>
        </Reveal>

        <Reveal className="container-page mt-20 md:mt-28">
          <h2 data-fade className="text-[1.75rem] font-light tracking-[-0.02em] text-ink" style={{ fontVariationSettings: '"wdth" 104' }}>
            {t("steps.title")}
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {steps.map((key, i) => (
              <li key={key} data-fade className="rounded-[28px] border border-white/8 bg-glass p-7">
                <span className="type-numeral block text-[3rem] leading-none text-ember">{i + 1}</span>
                <h3 className="mt-5 text-[1.25rem] font-medium text-ink">{t(`steps.${key}.title`)}</h3>
                <p className="mt-2 text-body leading-relaxed text-soft">{t(`steps.${key}.body`)}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="container-page mt-20 md:mt-28">
          <h2 data-fade className="text-[1.75rem] font-light tracking-[-0.02em] text-ink" style={{ fontVariationSettings: '"wdth" 104' }}>
            {t("faq.title")}
          </h2>
          <div data-fade className="mt-6 max-w-3xl">
            {(["1", "2", "3"] as const).map((n) => (
              <div key={n} className="border-t border-white/12 py-6 last:border-b">
                <h3 className="text-[1.2rem] font-light text-ink">{t(`faq.q${n}`)}</h3>
                <p className="mt-2 text-body leading-relaxed text-soft">{t(`faq.a${n}`)}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="container-page mt-20 text-center md:mt-28">
          <h2 data-fade className="type-display text-[clamp(2rem,4vw,3.4rem)] text-ink">{t("cta.title")}</h2>
          <p data-fade className="mt-4 text-body text-soft">{t("cta.subtitle")}</p>
          <div data-fade className="mt-8 flex justify-center">
            <AppStoreBadge campaign="web_page" locale={loc} />
          </div>
          <p data-fade className="mx-auto mt-12 max-w-3xl text-caption leading-relaxed text-mute">
            {t("disclaimer")}
          </p>
        </Reveal>
      </div>
    </>
  );
}
