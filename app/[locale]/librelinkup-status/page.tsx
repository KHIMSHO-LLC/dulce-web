import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { getArticle } from "@/content/articles";
import { fetchLluStatus, utcTime, type LluState } from "@/lib/lluStatus";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { seoFor, localizedPath } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

/** Re-render at most once a minute; the relay updates once a minute too. */
export const revalidate = 60;

export async function generateMetadata({ params }: PageProps<"/[locale]/librelinkup-status">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "llustatus" });
  return {
    title: t("title"),
    description: t("description"),
    ...seoFor(safeLocale, "/librelinkup-status", { title: t("title"), description: t("description") }),
  };
}

const STATE_COLOR: Record<LluState, string> = {
  operational: "bg-range",
  degraded: "bg-high",
  down: "bg-low",
  unknown: "bg-raise",
};

type Faq = { q: string; a: string };

/**
 * Live "is LibreLinkUp down?" page. Data: the relay's own LibreLinkUp
 * requests, aggregated per minute (dulce-relay src/lib/lluStatus.ts).
 */
export default async function LluStatusPage({ params }: PageProps<"/[locale]/librelinkup-status">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale: loc, namespace: "llustatus" });
  const nav = await getTranslations({ locale: loc, namespace: "nav" });
  const status = await fetchLluStatus();
  const state: LluState = status?.state ?? "unknown";

  const faqItems = t.raw("faq") as Faq[];
  const todo = t.raw("todo.items") as string[];
  const regionNames = t.raw("region") as Record<string, string>;
  const help = getArticle("librelinkup-not-working");
  const pageUrl = `${SITE_URL}${localizedPath(loc, "/librelinkup-status")}`;
  const home = `${SITE_URL}${localizedPath(loc, "/") === "/" ? "" : localizedPath(loc, "/")}`;
  const percent = (r: number | null) => (r == null ? "–" : `${(r * 100).toFixed(r < 0.1 ? 1 : 0)}%`);

  return (
    <>
      <JsonLd data={faqSchema(faqItems.map((f) => ({ question: f.q, answer: f.a })))} />
      <JsonLd
        data={breadcrumbSchema([
          { name: nav("home"), url: home },
          { name: t("title"), url: pageUrl },
        ])}
      />
      <div className="relative z-10 pb-12 pt-28 md:pt-36">
        <Reveal className="container-page" on="intro">
          <p data-fade className="text-label uppercase tracking-wide text-mute">
            {t("eyebrow")}
          </p>
          <div data-fade className="mt-5 flex items-start gap-4">
            <span
              aria-hidden
              className={`mt-[0.6em] inline-block h-4 w-4 shrink-0 rounded-full ${STATE_COLOR[state]} ${state === "operational" ? "" : "animate-pulse"}`}
            />
            <h1 className="type-display max-w-[20ch] text-[clamp(2.4rem,5.6vw,5rem)] text-ink">
              {t(`headline.${state}`)}
            </h1>
          </div>
          <p data-fade className="mt-6 max-w-[56ch] text-[1.125rem] leading-relaxed text-soft">
            {t(`lead.${state}`)}
          </p>
          <p data-fade className="mt-4 text-label text-mute">
            {status?.checkedAt ? t("updated", { time: utcTime(status.checkedAt) }) : t("unavailable")}
          </p>
        </Reveal>

        <Reveal className="container-page mt-14">
          <dl className="grid gap-4 sm:grid-cols-3">
            {[
              { label: t("metrics.failure"), value: percent(status?.failureRate ?? null) },
              { label: t("metrics.latency"), value: status?.avgLatencyMs != null ? `${status.avgLatencyMs} ms` : "–" },
              { label: t("metrics.calls"), value: status ? String(status.calls) : "–" },
            ].map((m) => (
              <div key={m.label} data-fade className="rounded-[24px] border border-white/8 bg-glass p-6">
                <dt className="text-label text-mute">{m.label}</dt>
                <dd className="mt-2 text-[2rem] font-light text-ink">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="container-page mt-14">
          <h2 data-fade className="text-[1.75rem] font-light tracking-[-0.02em] text-ink">
            {t("timeline.title")}
          </h2>
          <p data-fade className="mt-2 text-label text-mute">
            {t("timeline.hint")}
          </p>
          <ol data-fade className="mt-6 flex h-16 items-stretch gap-[3px]" aria-label={t("timeline.title")}>
            {(status?.timeline ?? Array.from({ length: 48 }, () => null)).map((b, i) => {
              const s: LluState = b?.state ?? "unknown";
              const label = b ? `${utcTime(b.start)} UTC · ${t(`timeline.${s}`)}` : t("timeline.unknown");
              return (
                <li key={b?.start ?? i} title={label} className={`flex-1 rounded-[3px] ${STATE_COLOR[s]}`}>
                  <span className="sr-only">{label}</span>
                </li>
              );
            })}
          </ol>
          <ul data-fade className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-label text-mute">
            {(["operational", "degraded", "down", "unknown"] as const).map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span aria-hidden className={`inline-block h-3 w-3 rounded-[3px] ${STATE_COLOR[s]}`} />
                {t(`timeline.${s}`)}
              </li>
            ))}
          </ul>
          <p data-fade className="mt-6 text-body text-soft">
            {status?.lastIncidentAt ? t("lastIncident", { time: utcTime(status.lastIncidentAt) }) : t("noIncident")}
          </p>
          <p data-fade className="mt-2 text-body text-soft">
            <span className="text-mute">{t("regions.title")}: </span>
            {status?.affectedRegions.length
              ? status.affectedRegions.map((r) => regionNames[r] ?? r.toUpperCase()).join(", ")
              : t("regions.none")}
          </p>
        </Reveal>

        <Reveal className="container-page mt-20 grid gap-4 md:mt-24 md:grid-cols-2">
          <article data-fade className="rounded-[28px] border border-white/8 bg-glass p-7 md:p-9">
            <h2 className="text-[1.5rem] font-light text-ink">{t("todo.title")}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-body leading-relaxed text-soft">
              {todo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article
            data-fade
            className="rounded-[28px] border border-ember/40 p-7 md:p-9"
            style={{ background: "radial-gradient(90% 90% at 100% 100%, rgba(243,102,56,0.25), rgba(243,102,56,0) 70%), #1a1310" }}
          >
            <h2 className="text-[1.5rem] font-light text-ink">{t("upButNoData.title")}</h2>
            <p className="mt-3 text-body leading-relaxed text-soft">{t("upButNoData.body")}</p>
            {help ? (
              <Link
                href={{ pathname: "/blog/[slug]", params: { slug: help.slug[loc] } }}
                className="mt-5 inline-block font-medium text-ember transition-colors hover:text-ember-hi"
              >
                {t("upButNoData.link")} →
              </Link>
            ) : null}
          </article>
        </Reveal>

        <Reveal className="container-page mt-20 md:mt-24">
          <h2 data-fade className="text-[1.75rem] font-light tracking-[-0.02em] text-ink">
            {t("how.title")}
          </h2>
          <p data-fade className="mt-4 max-w-[64ch] text-body leading-relaxed text-soft">
            {t("how.body")}
          </p>
          <div data-fade className="mt-10 max-w-3xl">
            {faqItems.map((f) => (
              <div key={f.q} className="border-t border-white/12 py-6 last:border-b">
                <h3 className="text-[1.2rem] font-light text-ink">{f.q}</h3>
                <p className="mt-2 text-body leading-relaxed text-soft">{f.a}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="container-page mt-16 text-center">
          <div data-fade className="flex justify-center">
            <AppStoreBadge campaign="web_status" locale={loc} />
          </div>
          <p data-fade className="mx-auto mt-10 max-w-3xl text-caption leading-relaxed text-mute">
            {t("disclaimer")}
          </p>
        </Reveal>
      </div>
    </>
  );
}
