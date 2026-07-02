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
    <div className="container-page py-16 md:py-24">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-caption font-semibold uppercase tracking-wider text-accent">
          {t("eyebrow")}
        </p>
        <h1 className="text-display-lg md:text-display-xl tracking-tight font-bold text-foreground mt-2">
          {t("headline")}
        </h1>
        <p className="mt-4 text-headline text-muted leading-snug">{t("body")}</p>

        {clean ? (
          <div className="mt-10 rounded-[var(--radius-card-xl)] bg-card border border-border-subtle p-6 md:p-8 shadow-[var(--shadow-card-rest)]">
            <p className="text-caption font-semibold uppercase tracking-wider text-muted">
              {t("codeLabel")}
            </p>
            <p className="mt-2 font-mono text-display-lg font-bold tracking-[0.3em] text-foreground">
              {clean}
            </p>
          </div>
        ) : (
          <p className="mt-10 text-body text-muted">{t("noCode")}</p>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          {clean ? (
            <a
              href={`dulce://f/${clean}`}
              className="inline-flex items-center justify-center rounded-full bg-accent text-white font-semibold px-6 py-3 text-body"
            >
              {t("openApp")}
            </a>
          ) : null}
          <a
            href={APP_STORE_URL}
            className="inline-flex items-center justify-center rounded-full border border-border-subtle text-foreground font-semibold px-6 py-3 text-body"
          >
            {t("getApp")}
          </a>
        </div>

        <section className="mt-14 text-left max-w-md mx-auto">
          <h2 className="text-headline font-bold tracking-tight text-foreground">
            {t("steps.title")}
          </h2>
          <ol className="mt-4 space-y-3 list-decimal list-inside text-body text-foreground">
            <li className="leading-relaxed">{t("steps.one")}</li>
            <li className="leading-relaxed">{t("steps.two")}</li>
            <li className="leading-relaxed">{t("steps.three")}</li>
          </ol>
          <p className="mt-6 text-caption text-muted leading-relaxed">
            {t("expiryNote")}
          </p>
        </section>
      </div>
    </div>
  );
}
