import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { routing, type AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { Split } from "@/components/motion/Split";
import { breadcrumbSchema, faqSchema, howToSchema } from "@/lib/schema";
import { seoFor, localizedPath } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { guideHref } from "@/components/landing/Audience";
import { SENSOR_TROUBLESHOOT, type SensorItem } from "@/lib/sensors";

export async function generateMetadata({ params }: PageProps<"/[locale]/sensors">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "sensors" });
  const og = { title: t("title"), description: t("description") };
  return { ...og, ...seoFor(safeLocale, "/sensors", og) };
}

type Faq = { q: string; a: string };

// Last change to the `sensors` copy in any language. Bump with the copy.
const DATE_MODIFIED = "2026-11-10";

/**
 * Every sensor Dulce reads, how it connects and the set-up steps, taken from the
 * app's onboarding screens (dulce-app `src/app/onboarding/*`, `sensorPicker`, `dexcom.help`,
 * `carelink`, `nightscout`). Only what the released app does. `/setup` stays the
 * LibreLinkUp page the app deep-links to; the Libre section links there.
 */
export default async function SensorsPage({ params }: PageProps<"/[locale]/sensors">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale: loc, namespace: "sensors" });
  const nav = await getTranslations({ locale: loc, namespace: "nav" });
  const items = t.raw("items") as SensorItem[];
  const faqItems = t.raw("faq") as Faq[];

  const pageUrl = `${SITE_URL}${localizedPath(loc, "/sensors")}`;
  const home = `${SITE_URL}${localizedPath(loc, "/") === "/" ? "" : localizedPath(loc, "/")}`;
  const h2 = "text-[1.75rem] font-light tracking-[-0.02em] text-ink";

  return (
    <>
      <JsonLd data={faqSchema(faqItems.map((f) => ({ question: f.q, answer: f.a })), loc)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: nav("home"), url: home },
          { name: t("nav"), url: pageUrl },
        ])}
      />
      {/* One HowTo per sensor, built from the same messages the numbered lists render. */}
      {items.map((item) => (
        <JsonLd
          key={item.id}
          data={{
            ...howToSchema({
              url: pageUrl,
              name: `${item.name} (${item.models}): ${t("stepsTitle")}`,
              description: item.intro,
              locale: loc,
              dateModified: DATE_MODIFIED,
              steps: item.steps.map((s) => ({ name: s.title, text: s.body })),
            }),
            "@id": `${pageUrl}#howto-${item.id}`,
          }}
        />
      ))}

      <div className="relative z-10 pb-12 pt-28 md:pt-36">
        <Reveal className="container-page" on="intro">
          <Split as="h1" text={t("headline")} className="type-display max-w-[16ch] text-[clamp(2.6rem,6vw,5.8rem)] text-ink" />
          <p data-fade className="mt-8 max-w-[56ch] text-[1.125rem] leading-relaxed text-soft">
            {t("lead")}
          </p>
          <ul data-fade className="mt-8 flex flex-wrap gap-2">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-block rounded-full border border-white/12 px-4 py-2 text-label text-ink transition-colors hover:border-ember/60"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="container-page mt-20 md:mt-28">
          <h2 data-fade className={h2}>
            {t("table.title")}
          </h2>
          {/* Phones: one card per sensor. The table needs ~44rem. */}
          <dl data-fade className="mt-8 grid gap-4 md:hidden">
            {items.map((item) => (
              <div key={item.id} className="rounded-[28px] border border-white/8 bg-glass p-6">
                <dt>
                  <a href={`#${item.id}`} className="text-[1.15rem] text-ink underline decoration-white/25 underline-offset-4">
                    {item.name}
                  </a>
                  <span className="mt-1 block text-label text-soft">{item.models}</span>
                </dt>
                {(["via", "need", "cadence"] as const).map((k) => (
                  <dd key={k} className="mt-3 text-body text-soft">
                    <span className="block text-label text-mute">{t(`table.${k}`)}</span>
                    {item[k]}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
          <div data-fade className="mt-8 hidden overflow-x-auto rounded-[28px] border border-white/8 bg-glass md:block">
            <table className="w-full text-left text-body">
              <thead className="text-label text-mute">
                <tr>
                  <th scope="col" className="px-6 py-4 font-normal">{t("table.sensor")}</th>
                  <th scope="col" className="px-6 py-4 font-normal">{t("table.via")}</th>
                  <th scope="col" className="px-6 py-4 font-normal">{t("table.need")}</th>
                  <th scope="col" className="px-6 py-4 font-normal">{t("table.cadence")}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t border-white/8 align-top">
                    <th scope="row" className="px-6 py-5 font-normal">
                      <a href={`#${item.id}`} className="text-ink underline decoration-white/25 underline-offset-4 hover:decoration-ember">
                        {item.name}
                      </a>
                      <span className="mt-1 block text-label text-soft">{item.models}</span>
                    </th>
                    <td className="px-6 py-5 text-soft">{item.via}</td>
                    <td className="px-6 py-5 text-soft">{item.need}</td>
                    <td className="px-6 py-5 text-soft">{item.cadence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {items.map((item) => (
          <Reveal key={item.id} className="container-page mt-20 md:mt-28">
            <section id={item.id} aria-labelledby={`${item.id}-title`} className="scroll-mt-28">
              <h2 id={`${item.id}-title`} data-fade className="type-display text-[clamp(2rem,4vw,3.4rem)] text-ink">
                {item.name}
              </h2>
              <p data-fade className="mt-2 text-label text-mute">
                {item.models}
              </p>
              <p data-fade className="mt-6 max-w-[60ch] text-body leading-relaxed text-soft">
                {item.intro}
              </p>
              <h3 data-fade className="mt-10 text-[1.25rem] font-medium text-ink">
                {t("stepsTitle")}
              </h3>
              <ol className="mt-5 grid gap-4 md:grid-cols-2">
                {item.steps.map((step, i) => (
                  <li key={step.title} data-fade className="rounded-[28px] border border-white/8 bg-glass p-7">
                    <span className="type-numeral block text-[2.6rem] leading-none text-ember">{i + 1}</span>
                    <h4 className="mt-4 text-[1.15rem] font-medium text-ink">{step.title}</h4>
                    <p className="mt-2 text-body leading-relaxed text-soft">{step.body}</p>
                  </li>
                ))}
              </ol>
              {item.note ? (
                <p data-fade className="mt-5 max-w-[60ch] text-label leading-relaxed text-mute">
                  {item.note}
                </p>
              ) : null}
              {item.more ? (
                <p data-fade className="mt-6">
                  <Link href="/setup" className="inline-flex items-center gap-2 text-body text-ink underline decoration-ember/60 underline-offset-4">
                    {item.more}
                    <ArrowRight className="h-4 w-4 text-ember" aria-hidden />
                  </Link>
                </p>
              ) : null}
              <p data-fade className="mt-4">
                {(() => {
                  const target = SENSOR_TROUBLESHOOT[item.id];
                  const cls = "inline-flex items-center gap-2 text-body text-ink underline decoration-ember/60 underline-offset-4";
                  const arrow = <ArrowRight className="h-4 w-4 text-ember" aria-hidden />;
                  return target.kind === "article" ? (
                    <a href={guideHref(target.id, loc)} className={cls}>
                      {t("troubleshoot")}
                      {arrow}
                    </a>
                  ) : (
                    <Link href={{ pathname: "/help/[slug]", params: { slug: target.id } }} className={cls}>
                      {t("troubleshoot")}
                      {arrow}
                    </Link>
                  );
                })()}
              </p>
            </section>
          </Reveal>
        ))}

        <Reveal className="container-page mt-20 md:mt-28">
          <div data-fade className="max-w-3xl rounded-[28px] border border-white/8 bg-glass p-7 md:p-9">
            <h2 className="text-[1.4rem] font-light text-ink">{t("missing.title")}</h2>
            <p className="mt-3 text-body leading-relaxed text-soft">{t("missing.body")}</p>
          </div>
        </Reveal>

        <Reveal className="container-page mt-20 md:mt-28">
          <div data-fade className="max-w-3xl">
            {faqItems.map((f) => (
              <div key={f.q} className="border-t border-white/12 py-6 last:border-b">
                <h3 className="text-[1.2rem] font-light text-ink">{f.q}</h3>
                <p className="mt-2 text-body leading-relaxed text-soft">{f.a}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="container-page mt-20 text-center md:mt-28">
          <h2 data-fade className="type-display text-[clamp(2rem,4vw,3.4rem)] text-ink">
            {t("cta.title")}
          </h2>
          <p data-fade className="mt-4 text-body text-soft">
            {t("cta.subtitle")}
          </p>
          <div data-fade className="mt-8 flex justify-center">
            <AppStoreBadge campaign="web_sensors" locale={loc} />
          </div>
          <p data-fade className="mx-auto mt-12 max-w-3xl text-caption leading-relaxed text-mute">
            {t("disclaimer")}
          </p>
        </Reveal>
      </div>
    </>
  );
}
