import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { routing, type AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { Split } from "@/components/motion/Split";
import { breadcrumbSchema, faqSchema, howToSchema } from "@/lib/schema";
import { seoFor, localizedPath, pageTitle } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { CHROME_SHOTS, CHROME_STORE_LIVE, CHROME_STORE_URL, type ChromeShot } from "@/lib/chrome";

export async function generateMetadata({ params }: PageProps<"/[locale]/chrome">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "chrome" });
  const og = { title: t("title"), description: t("description") };
  return { ...og, title: pageTitle(og.title), ...seoFor(safeLocale, "/chrome", og) };
}

type Faq = { q: string; a: string };
type Item = { title: string; body: string };

// Last change to the `chrome` copy in any language. Bump with the copy.
const DATE_MODIFIED = "2026-11-27";

function Shot({ shot, alt, priority }: { shot: ChromeShot; alt: string; priority?: boolean }) {
  return (
    <Image
      src={shot.src}
      alt={alt}
      width={shot.width}
      height={shot.height}
      priority={priority}
      sizes="(min-width: 768px) 320px, 80vw"
      className="h-auto w-full rounded-[20px] border border-white/10 shadow-2xl"
    />
  );
}

/**
 * Dulce for Chrome: the extension that shows the glucose from the Dulce app on the browser
 * toolbar (Chrome, Edge, Brave), how to link it and what it needs. Facts from dulce-web
 * `extension/` and dulce-app Settings › Chrome on a computer. Display only.
 */
export default async function ChromePage({ params }: PageProps<"/[locale]/chrome">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale: loc, namespace: "chrome" });
  const nav = await getTranslations({ locale: loc, namespace: "nav" });
  const features = t.raw("features") as Item[];
  const steps = t.raw("linkSteps") as Item[];
  const need = t.raw("need") as string[];
  const limits = t.raw("limits") as string[];
  const faqItems = t.raw("faq") as Faq[];

  const pageUrl = `${SITE_URL}${localizedPath(loc, "/chrome")}`;
  const home = `${SITE_URL}${localizedPath(loc, "/") === "/" ? "" : localizedPath(loc, "/")}`;
  const h2 = "type-display text-[clamp(2rem,4vw,3.4rem)] text-ink";
  const card = "rounded-[28px] border border-white/8 bg-glass p-7";
  const textLink = "inline-flex items-center gap-2 text-body text-ink underline decoration-ember/60 underline-offset-4";

  return (
    <>
      <JsonLd data={faqSchema(faqItems.map((f) => ({ question: f.q, answer: f.a })), loc)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: nav("home"), url: home },
          { name: t("nav"), url: pageUrl },
        ])}
      />
      <JsonLd
        data={howToSchema({
          url: pageUrl,
          name: t("linkTitle"),
          description: t("linkLead"),
          locale: loc,
          image: `${SITE_URL}${CHROME_SHOTS.link.src}`,
          dateModified: DATE_MODIFIED,
          steps: steps.map((s) => ({ name: s.title, text: s.body })),
        })}
      />

      <div className="relative z-10 pb-12 pt-28 md:pt-36">
        <Reveal className="container-page grid items-center gap-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]" on="intro">
          <div>
            <p data-fade className="text-label font-semibold uppercase tracking-[0.14em] text-ember">
              {t("kicker")}
            </p>
            <Split as="h1" text={t("headline")} className="type-display mt-4 max-w-[16ch] text-[clamp(2.6rem,6vw,5.8rem)] text-ink" />
            <p data-fade className="mt-8 max-w-[56ch] text-[1.125rem] leading-relaxed text-soft">
              {t("lead")}
            </p>
            <div data-fade className="mt-8 flex flex-wrap items-center gap-4">
              {CHROME_STORE_LIVE && CHROME_STORE_URL ? (
                <a
                  href={CHROME_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-ember px-5 py-2.5 text-label font-semibold text-ember-ink transition-colors hover:bg-ember-hi"
                >
                  {t("store")}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                </a>
              ) : (
                <>
                  <span className="inline-flex items-center rounded-full border border-white/12 px-5 py-2.5 text-label text-ink opacity-60">
                    {t("store")}
                  </span>
                  <span className="text-body text-ember">{t("storeSoon")}</span>
                </>
              )}
            </div>
          </div>
          <div data-fade className="mx-auto w-full max-w-[320px]">
            <Shot shot={CHROME_SHOTS.reading} alt={t("heroAlt")} priority />
          </div>
        </Reveal>

        <Reveal className="container-page mt-20 md:mt-28">
          <h2 data-fade className={h2}>
            {t("featuresTitle")}
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {features.map((f) => (
              <li key={f.title} data-fade className={card}>
                <h3 className="text-[1.25rem] font-medium text-ink">{f.title}</h3>
                <p className="mt-2 text-body leading-relaxed text-soft">{f.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="container-page mt-20 md:mt-28">
          <section id="link" aria-labelledby="link-title" className="scroll-mt-28">
            <h2 id="link-title" data-fade className={h2}>
              {t("linkTitle")}
            </h2>
            <p data-fade className="mt-4 max-w-[60ch] text-body leading-relaxed text-soft">
              {t("linkLead")}
            </p>
            <div className="mt-8 grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_260px]">
              <ol className="grid gap-4">
                {steps.map((step, i) => (
                  <li key={step.title} data-fade className={card}>
                    <span className="type-numeral block text-[2.6rem] leading-none text-ember">{i + 1}</span>
                    <h3 className="mt-4 text-[1.15rem] font-medium text-ink">{step.title}</h3>
                    <p className="mt-2 text-body leading-relaxed text-soft">{step.body}</p>
                  </li>
                ))}
              </ol>
              <div data-fade className="mx-auto w-full max-w-[260px]">
                <Shot shot={CHROME_SHOTS.link} alt={t("linkAlt")} />
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal className="container-page mt-20 grid gap-4 md:mt-28 md:grid-cols-2">
          <section data-fade aria-labelledby="need-title" className={card}>
            <h2 id="need-title" className="text-[1.6rem] font-light tracking-[-0.02em] text-ink">
              {t("needTitle")}
            </h2>
            <ul className="mt-5 grid gap-3">
              {need.map((n) => (
                <li key={n} className="flex gap-3 text-body leading-relaxed text-soft">
                  <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                  {n}
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link href="/pro" className={textLink}>
                {t("proLink")}
                <ArrowRight className="h-4 w-4 text-ember" aria-hidden />
              </Link>
            </p>
          </section>
          <section data-fade aria-labelledby="limits-title" className={card}>
            <h2 id="limits-title" className="text-[1.6rem] font-light tracking-[-0.02em] text-ink">
              {t("limitsTitle")}
            </h2>
            <ul className="mt-5 grid gap-3">
              {limits.map((l) => (
                <li key={l} className="flex gap-3 text-body leading-relaxed text-soft">
                  <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                  {l}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal className="container-page mt-20 md:mt-28">
          <h2 data-fade className={h2}>
            {t("faqTitle")}
          </h2>
          <div data-fade className="mt-8 max-w-3xl">
            {faqItems.map((f) => (
              <div key={f.q} className="border-t border-white/12 py-6 last:border-b">
                <h3 className="text-[1.2rem] font-light text-ink">{f.q}</h3>
                <p className="mt-2 text-body leading-relaxed text-soft">{f.a}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="container-page mt-20 text-center md:mt-28">
          <h2 data-fade className={h2}>
            {t("cta.title")}
          </h2>
          <p data-fade className="mt-4 text-body text-soft">
            {t("cta.subtitle")}
          </p>
          <div data-fade className="mt-8 flex justify-center">
            <AppStoreBadge campaign="web_chrome" locale={loc} />
          </div>
          <p data-fade className="mx-auto mt-12 max-w-3xl text-caption leading-relaxed text-mute">
            {t("disclaimer")}
          </p>
        </Reveal>
      </div>
    </>
  );
}
