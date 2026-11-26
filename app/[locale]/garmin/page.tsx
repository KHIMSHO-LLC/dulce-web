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
import { guideHref } from "@/components/landing/Audience";
import { getArticle, isTranslated, pick } from "@/content/articles";
import { breadcrumbSchema, faqSchema, howToSchema } from "@/lib/schema";
import { seoFor, localizedPath, pageTitle } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import {
  GARMIN_GUIDES,
  GARMIN_SHOTS,
  GARMIN_STORE,
  GARMIN_STORE_LIVE,
  type GarminShot,
  type GarminStoreKey,
  type GarminSurface,
  type GarminWatchFamily,
} from "@/lib/garmin";

export async function generateMetadata({ params }: PageProps<"/[locale]/garmin">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "garmin" });
  const og = { title: t("title"), description: t("description") };
  return { ...og, title: pageTitle(og.title), ...seoFor(safeLocale, "/garmin", og) };
}

type Faq = { q: string; a: string };
type Step = { title: string; body: string };

// Last change to the `garmin` copy in any language. Bump with the copy.
const DATE_MODIFIED = "2026-11-26";

const STORE_KEYS: GarminStoreKey[] = ["app", "face", "field"];

/** Screens shown under each surface card (alt text: messages `garmin.gallery`). */
const SURFACE_SHOTS: Record<GarminSurface["id"], Array<{ shot: GarminShot; alt: string }>> = {
  app: [
    { shot: GARMIN_SHOTS.graph, alt: "graph" },
    { shot: GARMIN_SHOTS.tir, alt: "tir" },
  ],
  glance: [{ shot: GARMIN_SHOTS.glance, alt: "glance" }],
  complication: [],
  face: [
    { shot: GARMIN_SHOTS.faceA, alt: "faceA" },
    { shot: GARMIN_SHOTS.faceB, alt: "faceB" },
    { shot: GARMIN_SHOTS.aod, alt: "aod" },
  ],
  field: [{ shot: GARMIN_SHOTS.field, alt: "field" }],
};

function Shot({ shot, alt, className, priority }: { shot: GarminShot; alt: string; className?: string; priority?: boolean }) {
  return (
    <Image
      src={shot.src}
      alt={alt}
      width={shot.width}
      height={shot.height}
      priority={priority}
      sizes="(min-width: 768px) 280px, 45vw"
      className={`h-auto w-full ${className ?? ""}`}
    />
  );
}

/**
 * Dulce on Garmin watches: the watch app (with glance and complication), the watch face and the
 * data field, how to link them, what's needed and which watches work. Facts from dulce-app
 * (the `garmin`, `garmin-face`, `garmin-field` projects, `docs/garmin-design-v3.md`, the `garmin` locale strings). Display only.
 */
export default async function GarminPage({ params }: PageProps<"/[locale]/garmin">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale: loc, namespace: "garmin" });
  const nav = await getTranslations({ locale: loc, namespace: "nav" });
  const surfaces = t.raw("surfaces") as GarminSurface[];
  const steps = t.raw("linkSteps") as Step[];
  const need = t.raw("need") as string[];
  const watches = t.raw("watches") as GarminWatchFamily[];
  const limits = t.raw("limits") as string[];
  const faqItems = t.raw("faq") as Faq[];

  const pageUrl = `${SITE_URL}${localizedPath(loc, "/garmin")}`;
  const home = `${SITE_URL}${localizedPath(loc, "/") === "/" ? "" : localizedPath(loc, "/")}`;
  const h2 = "type-display text-[clamp(2rem,4vw,3.4rem)] text-ink";
  const card = "rounded-[28px] border border-white/8 bg-glass p-7";
  const textLink = "inline-flex items-center gap-2 text-body text-ink underline decoration-ember/60 underline-offset-4";

  const guides = GARMIN_GUIDES.map((id) => {
    const article = getArticle(id)!;
    const lang: AppLocale = isTranslated(article, loc) ? loc : "en";
    return { id, href: guideHref(id, loc), title: pick(article.title, lang), description: pick(article.description, lang) };
  });

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
          image: `${SITE_URL}${GARMIN_SHOTS.link.src}`,
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
            <ul data-fade className="mt-8 flex flex-wrap gap-2">
              {STORE_KEYS.map((k) => (
                <li key={k}>
                  {GARMIN_STORE_LIVE ? (
                    <a
                      href={GARMIN_STORE[k]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-4 py-2 text-label text-ink transition-colors hover:border-ember/60"
                    >
                      {t(`store.${k}`)}
                      <ArrowUpRight className="h-4 w-4 text-ember" strokeWidth={1.8} aria-hidden />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-4 py-2 text-label text-ink opacity-60">
                      {t(`store.${k}`)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div data-fade className="mx-auto w-full max-w-[320px]">
            <Shot shot={GARMIN_SHOTS.hero} alt={t("heroAlt")} priority />
          </div>
        </Reveal>

        <Reveal className="container-page mt-20 md:mt-28">
          <h2 data-fade className={h2}>
            {t("storeTitle")}
          </h2>
          <p data-fade className="mt-4 max-w-[60ch] text-body leading-relaxed text-soft">
            {t("storeNote")}
          </p>
          {!GARMIN_STORE_LIVE && (
            <p data-fade className="mt-2 max-w-[60ch] text-body leading-relaxed text-ember">
              {t("storeSoon")}
            </p>
          )}
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {STORE_KEYS.map((k) => (
              <li key={k} data-fade className={card}>
                <h3 className="text-[1.25rem] font-medium text-ink">{t(`store.${k}`)}</h3>
                <p className="mt-2 text-body leading-relaxed text-soft">{t(`store.${k}Body`)}</p>
                {GARMIN_STORE_LIVE ? (
                  <a href={GARMIN_STORE[k]} target="_blank" rel="noopener noreferrer" className={`mt-5 ${textLink}`}>
                    {t("store.open")}
                    <ArrowUpRight className="h-4 w-4 text-ember" aria-hidden />
                  </a>
                ) : (
                  <span className="mt-5 inline-flex items-center gap-1.5 text-label text-soft opacity-60">{t("store.open")}</span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="container-page mt-20 md:mt-28">
          <h2 data-fade className={h2}>
            {t("surfacesTitle")}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {surfaces.map((s) => {
              const shots = SURFACE_SHOTS[s.id] ?? [];
              return (
                <section
                  key={s.id}
                  id={s.id}
                  aria-labelledby={`${s.id}-title`}
                  data-fade
                  className={`${card} scroll-mt-28 ${shots.length > 1 ? "md:col-span-2" : ""}`}
                >
                  <h3 id={`${s.id}-title`} className="text-[1.4rem] font-light tracking-[-0.02em] text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[64ch] text-body leading-relaxed text-soft">{s.body}</p>
                  {shots.length ? (
                    <div className={`mt-6 grid gap-4 ${shots.length > 1 ? "grid-cols-2 md:grid-cols-3" : "max-w-[220px]"}`}>
                      {shots.map(({ shot, alt }) => (
                        <Shot key={shot.src} shot={shot} alt={t(`gallery.${alt}`)} />
                      ))}
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="container-page mt-20 md:mt-28">
          <section id="link" aria-labelledby="link-title" className="scroll-mt-28">
            <h2 id="link-title" data-fade className={h2}>
              {t("linkTitle")}
            </h2>
            <p data-fade className="mt-4 max-w-[60ch] text-body leading-relaxed text-soft">
              {t("linkLead")}
            </p>
            <div className="mt-8 grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_240px]">
              <ol className="grid gap-4 md:grid-cols-2">
                {steps.map((step, i) => (
                  <li key={step.title} data-fade className={card}>
                    <span className="type-numeral block text-[2.6rem] leading-none text-ember">{i + 1}</span>
                    <h3 className="mt-4 text-[1.15rem] font-medium text-ink">{step.title}</h3>
                    <p className="mt-2 text-body leading-relaxed text-soft">{step.body}</p>
                  </li>
                ))}
              </ol>
              <div data-fade className="mx-auto w-full max-w-[240px]">
                <Shot shot={GARMIN_SHOTS.link} alt={t("linkAlt")} />
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
          <section data-fade aria-labelledby="updates-title" className={card}>
            <h2 id="updates-title" className="text-[1.6rem] font-light tracking-[-0.02em] text-ink">
              {t("updatesTitle")}
            </h2>
            <p className="mt-5 text-body leading-relaxed text-soft">{t("updates")}</p>
          </section>
        </Reveal>

        <Reveal className="container-page mt-20 md:mt-28">
          <section id="watches" aria-labelledby="watches-title" className="scroll-mt-28">
            <h2 id="watches-title" data-fade className={h2}>
              {t("watchesTitle")}
            </h2>
            <p data-fade className="mt-4 max-w-[60ch] text-body leading-relaxed text-soft">
              {t("watchesLead")}
            </p>
            <div className="mt-8 grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_200px]">
              <dl data-fade className="overflow-hidden rounded-[28px] border border-white/8 bg-glass">
                {watches.map((w) => (
                  <div key={w.family} className="grid gap-1 border-t border-white/8 px-6 py-4 first:border-t-0 md:grid-cols-[10rem_1fr] md:gap-6">
                    <dt className="text-ink">{w.family}</dt>
                    <dd className="text-body text-soft">{w.models}</dd>
                  </div>
                ))}
              </dl>
              <div data-fade className="mx-auto w-full max-w-[200px]">
                <Shot shot={GARMIN_SHOTS.instinct} alt={t("gallery.instinct")} />
              </div>
            </div>
            <p data-fade className="mt-5 max-w-[60ch] text-label leading-relaxed text-mute">
              {t("watchesNote")}
            </p>
          </section>
        </Reveal>

        <Reveal className="container-page mt-20 md:mt-28">
          <div data-fade className="max-w-3xl rounded-[28px] border border-white/8 bg-glass p-7 md:p-9">
            <h2 className="text-[1.4rem] font-light text-ink">{t("limitsTitle")}</h2>
            <ul className="mt-4 grid gap-3">
              {limits.map((l) => (
                <li key={l} className="flex gap-3 text-body leading-relaxed text-soft">
                  <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
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

        <Reveal className="container-page mt-20 md:mt-28">
          <h2 data-fade className={h2}>
            {t("guidesTitle")}
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {guides.map((g) => (
              <li key={g.id} data-fade>
                <a href={g.href} className={`group block h-full ${card} transition-colors hover:border-ember/40`}>
                  <span className="flex items-start justify-between gap-4">
                    <span className="text-[1.15rem] font-medium text-ink">{g.title}</span>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-mute transition-colors group-hover:text-ember" strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className="mt-2 block text-body leading-relaxed text-soft">{g.description}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="container-page mt-20 text-center md:mt-28">
          <h2 data-fade className={h2}>
            {t("cta.title")}
          </h2>
          <p data-fade className="mt-4 text-body text-soft">
            {t("cta.subtitle")}
          </p>
          <div data-fade className="mt-8 flex justify-center">
            <AppStoreBadge campaign="web_garmin" locale={loc} />
          </div>
          <p data-fade className="mx-auto mt-12 max-w-3xl text-caption leading-relaxed text-mute">
            {t("disclaimer")}
          </p>
        </Reveal>
      </div>
    </>
  );
}
