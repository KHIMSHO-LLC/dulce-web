import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

/**
 * Web fallback for follower invite links (`https://dulceglucosa.com/f/<code>`).
 *
 * When the Dulce app is installed, iOS intercepts this URL as a universal link
 * (see app/.well-known/apple-app-site-association) and opens the app straight
 * on the accept screen — this page never renders. It exists for everyone
 * WITHOUT the app: instead of a 404, they get an explainer, the code, and a
 * path to the App Store. `dulce://f/<code>` retries the app open for anyone who
 * has it but arrived here anyway (e.g. link opened in an in-app browser).
 */

/** ASC App ID (App Store Connect). Deep link resolves once the app is live. */
const APP_STORE_URL = "https://apps.apple.com/app/id6770694596";

/** Codes are 5 chars from an unambiguous alphabet (no I/L/O/0/1). Uppercased
 *  and length-bounded here so a junk path can't render a giant "code". */
function normalizeCode(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
}

type FollowPageProps = { params: Promise<{ locale: string; code: string }> };

export async function generateMetadata({
  params,
}: FollowPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale) as AppLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "follow" });
  return {
    title: t("headline"),
    description: t("body"),
    // Not a page we want indexed — invite codes are private and ephemeral.
    robots: { index: false, follow: false },
  };
}

export default async function FollowInvitePage({ params }: FollowPageProps) {
  const { locale, code } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "follow" });
  const clean = normalizeCode(code ?? "");

  return (
    <div className="container-page relative z-10 pb-16 pt-28 md:pt-36">
      <div className="mx-auto max-w-2xl">
        <h1 className="type-display text-[clamp(2.4rem,5.4vw,4.6rem)] text-ink">{t("headline")}</h1>
        <p className="mt-6 max-w-[48ch] text-[1.125rem] leading-relaxed text-soft">{t("body")}</p>

        {clean ? (
          <div
            className="mt-10 rounded-[28px] border border-ember/30 p-7 md:p-9"
            style={{ background: "radial-gradient(90% 120% at 100% 100%, rgba(243,102,56,0.28), rgba(243,102,56,0) 70%), #1a1310" }}
          >
            <p className="text-label text-soft">{t("codeLabel")}</p>
            <p className="type-numeral mt-3 text-[clamp(3rem,9vw,5.5rem)] leading-none tracking-[0.18em] text-ink">{clean}</p>
          </div>
        ) : (
          <p className="mt-10 text-body text-soft">{t("noCode")}</p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {clean ? (
            <a
              href={`dulce://f/${clean}`}
              className="inline-flex h-12 items-center justify-center rounded-full bg-ember px-6 font-semibold text-ember-ink transition-colors hover:bg-ember-hi"
            >
              {t("openApp")}
            </a>
          ) : null}
          <a
            href={APP_STORE_URL}
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 font-semibold text-ink transition-colors hover:bg-white/8"
          >
            {t("getApp")}
          </a>
        </div>

        <section className="mt-16 max-w-md">
          <h2 className="text-[1.5rem] font-light tracking-[-0.02em] text-ink" style={{ fontVariationSettings: '"wdth" 104' }}>
            {t("steps.title")}
          </h2>
          <ol className="mt-5 space-y-4">
            {(["one", "two", "three"] as const).map((k, i) => (
              <li key={k} className="flex gap-4 text-body leading-relaxed text-soft">
                <span className="type-numeral w-5 shrink-0 text-ember">{i + 1}</span>
                <span>{t(`steps.${k}`)}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-label leading-relaxed text-soft">{t("expiryNote")}</p>
        </section>
      </div>
    </div>
  );
}