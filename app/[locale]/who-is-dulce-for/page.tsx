import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { routing, type AppLocale } from "@/i18n/routing";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { guideHref } from "@/components/landing/Audience";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { absoluteUrl, localizedPath, seoFor } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/who-is-dulce-for">): Promise<Metadata> {
  const { locale } = await params;
  const loc = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: loc, namespace: "audience" });
  const og = { title: t("title"), description: t("description") };
  // Long by nature: no " · Dulce" suffix, the brand is already the first word.
  return { title: { absolute: og.title }, description: og.description, ...seoFor(loc, "/who-is-dulce-for", og) };
}

type Segment = { id: string; title: string; short: string; body: string; guide: string; guideLabel: string };
type DiabetesType = { name: string; body: string; guide?: string; guideLabel?: string };
type Faq = { q: string; a: string };

/**
 * The segment hub: one page saying who Dulce is for, by person and by type of
 * diabetes, each linking to the guide that answers what that person searches.
 * Facts come from the released app; store rules don't apply here, but
 * seo/segments.md explains what may be repeated in the App Store listing.
 */
export default async function AudiencePage({ params }: PageProps<"/[locale]/who-is-dulce-for">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale: loc, namespace: "audience" });
  const nav = await getTranslations({ locale: loc, namespace: "nav" });
  const segments = t.raw("segments") as Segment[];
  const types = t.raw("types") as DiabetesType[];
  const faq = t.raw("faq") as Faq[];

  return (
    <>
      <JsonLd data={faqSchema(faq.map((f) => ({ question: f.q, answer: f.a })), loc)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: nav("home"), url: absoluteUrl(localizedPath(loc, "/")) },
          { name: t("nav"), url: absoluteUrl(localizedPath(loc, "/who-is-dulce-for")) },
        ])}
      />
      <div className="relative z-10 pb-12 pt-28 md:pt-36">
        <Reveal className="container-page" on="intro">
          <h1 data-fade className="type-display max-w-[20ch] text-[clamp(2.4rem,5.6vw,5rem)] text-ink">
            {t("headline")}
          </h1>
          <p data-fade className="mt-6 max-w-[58ch] text-[1.125rem] leading-relaxed text-soft">
            {t("lead")}
          </p>
        </Reveal>

        <Reveal className="container-page mt-14 grid gap-4 md:grid-cols-2">
          {segments.map((s) => (
            <article key={s.id} id={s.id} data-fade className="scroll-mt-24 rounded-[28px] border border-white/8 bg-glass p-7 md:p-9">
              <h2 className="text-[1.6rem] font-light leading-tight tracking-[-0.015em] text-ink">{s.title}</h2>
              <p className="mt-4 text-body leading-relaxed text-soft">{s.body}</p>
              <a href={guideHref(s.guide, loc)} className="mt-5 inline-flex items-center gap-1.5 text-label font-semibold text-ember hover:text-ember-hi">
                {s.guideLabel}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </article>
          ))}
        </Reveal>

        <Reveal className="container-page mt-16">
          <h2 data-fade className="max-w-[24ch] text-[clamp(1.9rem,3.4vw,3rem)] font-light tracking-[-0.02em] text-ink">
            {t("typesTitle")}
          </h2>
          <p data-fade className="mt-4 max-w-[60ch] text-body leading-relaxed text-soft">
            {t("typesLead")}
          </p>
          <dl data-fade className="mt-8 max-w-3xl">
            {types.map((d) => (
              <div key={d.name} className="border-t border-white/12 py-5 last:border-b">
                <dt className="text-[1.2rem] font-light text-ink">{d.name}</dt>
                <dd className="mt-2 text-body leading-relaxed text-soft">
                  {d.body}
                  {d.guide ? (
                    <>
                      {" "}
                      <a href={guideHref(d.guide, loc)} className="font-semibold text-ember hover:text-ember-hi">
                        {d.guideLabel}
                      </a>
                    </>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="container-page mt-16">
          <h2 data-fade className="text-[1.75rem] font-light tracking-[-0.02em] text-ink">
            {t("faqTitle")}
          </h2>
          <div data-fade className="mt-6 max-w-3xl">
            {faq.map((f) => (
              <div key={f.q} className="border-t border-white/12 py-6 last:border-b">
                <h3 className="text-[1.2rem] font-light text-ink">{f.q}</h3>
                <p className="mt-2 text-body leading-relaxed text-soft">{f.a}</p>
              </div>
            ))}
          </div>
          <p data-fade className="mt-8 max-w-[64ch] text-label leading-relaxed text-mute">
            {t("note")}
          </p>
        </Reveal>

        <Reveal className="container-page mt-16 text-center">
          <p data-fade className="text-body text-soft">
            {t("cta")}
          </p>
          <div data-fade className="mt-6 flex justify-center">
            <AppStoreBadge campaign="web_audience" locale={loc} />
          </div>
        </Reveal>
      </div>
    </>
  );
}
