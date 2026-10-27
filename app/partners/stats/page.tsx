"use client";

/**
 * A partner's (influencer's) own read-only page: how many people used their
 * code, how many became paying subscribers, and what they've earned.
 *
 * The link is /partners/stats#<CODE>.<viewToken>, made in the admin dashboard
 * ("Create partner link"). The fragment never leaves the browser except as the
 * bearer token to the relay's GET /ref/partner, which only answers for that
 * one code. No admin login here: see (admin)/layout.tsx for the admin side.
 */

import { useCallback, useEffect, useState } from "react";
import { ApiError, UnauthorizedError, fetchPartnerStats, type PartnerStats } from "../api";

type Lang = "es" | "en";

const TEXT = {
  es: {
    title: "Tu código de Dulce",
    loading: "Cargando…",
    refresh: "Actualizar",
    badLink: "Este enlace no es válido o ha sido sustituido. Pide a Dulce un enlace nuevo.",
    error: "No se han podido cargar los datos. Inténtalo de nuevo en un momento.",
    paused: "Este código está en pausa: ahora mismo nadie puede canjearlo.",
    earningsTitle: "Ganancias",
    owed: "Pendiente de pago",
    earned: "Ganado en total",
    paid: "Pagado hasta ahora",
    lastPaid: "Último pago",
    never: "Aún ninguno",
    percentNote: "Tu acuerdo es un porcentaje: Dulce calcula el importe con los ingresos reales.",
    funnelTitle: "Personas",
    claims: "Han introducido tu código",
    trials: "Han empezado la prueba gratis",
    paying: "Se han suscrito (primer pago)",
    retained: "Siguen el segundo mes",
    cancelled: "Han cancelado la renovación",
    rule: "Tu acuerdo",
    perPaying: (a: string) => `${a} por cada persona que se suscribe`,
    perRetained: (a: string) => `${a} por cada persona que sigue suscrita el segundo mes`,
    percent: (p: number) => `${p} % de los ingresos`,
    revshare: (p: number, m: number, y: number) =>
      `${p} % de lo que Dulce recibe de cada persona (tras la comisión de Apple y los impuestos): sus primeros ${m} pagos mensuales${y ? ` y ${y === 1 ? "su primer pago anual" : `sus primeros ${y} pagos anuales`}` : ""}`,
    hello: (n: string) => `Hola, ${n}`,
    monthsTitle: "Por mes",
    month: "Mes",
    payments: "Pagos",
    net: "Dulce recibe",
    share: "Tu parte",
    since: (d: string) => `Código activo desde el ${d}.`,
    howItWorks:
      "Las cifras se actualizan cuando Apple confirma un cambio en la suscripción. Si alguien empieza con la prueba gratis de 14 días, aparece como suscrito unas dos semanas después. Los reembolsos de Apple se descuentan.",
  },
  en: {
    title: "Your Dulce code",
    loading: "Loading…",
    refresh: "Refresh",
    badLink: "This link isn't valid or has been replaced. Ask Dulce for a new one.",
    error: "Couldn't load the numbers. Try again in a moment.",
    paused: "This code is paused: nobody can redeem it right now.",
    earningsTitle: "Earnings",
    owed: "Waiting to be paid",
    earned: "Earned in total",
    paid: "Paid so far",
    lastPaid: "Last payment",
    never: "None yet",
    percentNote: "Your deal is a percentage: Dulce works out the amount from actual revenue.",
    funnelTitle: "People",
    claims: "Entered your code",
    trials: "Started the free trial",
    paying: "Subscribed (first payment)",
    retained: "Stayed for a second month",
    cancelled: "Turned off renewal",
    rule: "Your deal",
    perPaying: (a: string) => `${a} for every person who subscribes`,
    perRetained: (a: string) => `${a} for every person still subscribed in their second month`,
    percent: (p: number) => `${p}% of revenue`,
    revshare: (p: number, m: number, y: number) =>
      `${p}% of what Dulce receives from each person (after Apple's fee and taxes): their first ${m} monthly payments${y ? ` and ${y === 1 ? "their first yearly payment" : `their first ${y} yearly payments`}` : ""}`,
    hello: (n: string) => `Hi ${n}`,
    monthsTitle: "By month",
    month: "Month",
    payments: "Payments",
    net: "Dulce receives",
    share: "Your share",
    since: (d: string) => `Code active since ${d}.`,
    howItWorks:
      "Numbers update when Apple confirms a subscription change. If someone starts with the 14-day free trial, they show as subscribed about two weeks later. Apple refunds are taken off.",
  },
} as const;

function readFragment(): { code: string; token: string } | null {
  const raw = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  const dot = raw.indexOf(".");
  if (dot <= 0) return null;
  const code = raw.slice(0, dot).toUpperCase();
  const token = raw.slice(dot + 1);
  return /^[A-Z0-9]{2,20}$/.test(code) && /^[a-f0-9]{16,}$/.test(token) ? { code, token } : null;
}

function Stat({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3 border-b border-border-subtle last:border-0">
      <span className="text-label text-muted">{label}</span>
      <span className={`tabular-nums ${strong ? "text-headline font-bold text-foreground" : "text-body font-semibold text-foreground"}`}>
        {value}
      </span>
    </div>
  );
}

export default function PartnerStatsPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [link, setLink] = useState<{ code: string; token: string } | null | undefined>(undefined);
  const [data, setData] = useState<PartnerStats | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "badLink" | "error">("loading");

  useEffect(() => {
    // Reading the browser-only fragment and language is this effect's purpose.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLang(navigator.language.toLowerCase().startsWith("es") ? "es" : "en");
    setLink(readFragment());
    const onHashChange = () => {
      setData(null);
      setLink(readFragment());
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const load = useCallback(async (l: { code: string; token: string }) => {
    setState("loading");
    try {
      setData(await fetchPartnerStats(l.code, l.token));
      setState("ready");
    } catch (err) {
      setState(err instanceof UnauthorizedError || (err instanceof ApiError && err.status === 400) ? "badLink" : "error");
    }
  }, []);

  useEffect(() => {
    if (link === undefined) return;
    if (link === null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState("badLink");
      return;
    }
    void load(link);
  }, [link, load]);

  const t = TEXT[lang];
  const locale = lang === "es" ? "es-ES" : "en-GB";
  const eur = (n: number) => new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(n);
  const date = (ms: number) => new Date(ms).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });

  let rule = "";
  if (data) {
    if (data.payout.type === "per_paying") rule = t.perPaying(eur(data.payout.amount));
    else if (data.payout.type === "per_retained") rule = t.perRetained(eur(data.payout.amount));
    else if (data.payout.type === "revshare")
      rule = t.revshare(data.payout.amount, data.payout.monthlyPayments ?? 6, data.payout.yearlyPayments ?? 1);
    else rule = t.percent(data.payout.amount);
  }
  const isPercent = data?.payout.type === "percent";
  const paidAmount =
    data && data.earned.amount !== null && data.owed.amount !== null ? data.earned.amount - data.owed.amount : null;

  return (
    <div className="min-h-screen bg-warm-gradient px-4 py-10">
      <div className="mx-auto w-full max-w-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-label font-semibold text-muted">{data?.name ? t.hello(data.name) : t.title}</p>
            <h1 className="mt-1 font-mono text-display font-bold tracking-wider text-foreground">
              {data?.code ?? link?.code ?? "—"}
            </h1>
          </div>
          {link ? (
            <button
              type="button"
              onClick={() => void load(link)}
              disabled={state === "loading"}
              className="h-10 px-4 rounded-[var(--radius-button-sm)] border border-border-subtle bg-card text-label font-semibold text-foreground hover:bg-accent-soft disabled:opacity-50 transition-colors"
            >
              {state === "loading" ? t.loading : t.refresh}
            </button>
          ) : null}
        </div>

        {state === "badLink" || state === "error" ? (
          <div className="mt-8 rounded-[var(--radius-card)] border border-state-low/30 bg-state-low/10 p-5 text-label text-foreground">
            {state === "badLink" ? t.badLink : t.error}
          </div>
        ) : null}

        {data ? (
          <>
            {data.status !== "active" ? (
              <div className="mt-6 rounded-[var(--radius-card)] border border-state-slightly-low/30 bg-state-slightly-low/10 p-4 text-label text-foreground">
                {t.paused}
              </div>
            ) : null}

            <section className="mt-8 bg-card rounded-[var(--radius-card-lg)] border border-border-subtle p-6">
              <h2 className="text-label font-bold uppercase tracking-wider text-muted">{t.earningsTitle}</h2>
              <div className="mt-2">
                {isPercent ? (
                  <p className="py-3 text-label text-muted">{t.percentNote}</p>
                ) : (
                  <>
                    <Stat label={t.owed} value={eur(data.owed.amount ?? 0)} strong />
                    <Stat label={t.earned} value={eur(data.earned.amount ?? 0)} />
                    <Stat label={t.paid} value={eur(paidAmount ?? 0)} />
                  </>
                )}
                <Stat label={t.lastPaid} value={data.paidThrough ? date(data.paidThrough) : t.never} />
              </div>
            </section>

            <section className="mt-4 bg-card rounded-[var(--radius-card-lg)] border border-border-subtle p-6">
              <h2 className="text-label font-bold uppercase tracking-wider text-muted">{t.funnelTitle}</h2>
              <div className="mt-2">
                <Stat label={t.claims} value={String(data.stats.claims)} />
                <Stat label={t.trials} value={String(data.stats.trials)} />
                <Stat label={t.paying} value={String(data.stats.paying)} strong />
                <Stat label={t.retained} value={String(data.stats.retained)} />
                <Stat label={t.cancelled} value={String(data.stats.cancelled)} />
              </div>
            </section>

            {data.months && data.months.length ? (
              <section className="mt-4 bg-card rounded-[var(--radius-card-lg)] border border-border-subtle p-6">
                <h2 className="text-label font-bold uppercase tracking-wider text-muted">{t.monthsTitle}</h2>
                <table className="mt-2 w-full text-left text-label">
                  <thead>
                    <tr className="text-caption text-muted">
                      <th className="py-1.5 font-semibold">{t.month}</th>
                      <th className="py-1.5 text-right font-semibold">{t.payments}</th>
                      {data.payout.type === "revshare" ? (
                        <th className="py-1.5 text-right font-semibold">{t.net}</th>
                      ) : null}
                      <th className="py-1.5 text-right font-semibold">{t.share}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...data.months].reverse().map((m) => (
                      <tr key={m.month} className="border-t border-border-subtle">
                        <td className="py-2 text-foreground">
                          {new Date(`${m.month}-01T00:00:00Z`).toLocaleDateString(locale, { month: "long", year: "numeric", timeZone: "UTC" })}
                        </td>
                        <td className="py-2 text-right tabular-nums text-foreground">{m.payments}</td>
                        {data.payout.type === "revshare" ? (
                          <td className="py-2 text-right tabular-nums text-muted">{eur(m.netEur ?? 0)}</td>
                        ) : null}
                        <td className="py-2 text-right font-semibold tabular-nums text-foreground">{eur(m.share)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ) : null}

            <section className="mt-4 bg-card rounded-[var(--radius-card-lg)] border border-border-subtle p-6">
              <h2 className="text-label font-bold uppercase tracking-wider text-muted">{t.rule}</h2>
              <p className="mt-2 text-body font-semibold text-foreground">{rule}</p>
              <p className="mt-1 text-label text-muted">{t.since(date(data.createdAt))}</p>
            </section>

            <p className="mt-6 text-caption text-muted">{t.howItWorks}</p>
          </>
        ) : null}
      </div>
    </div>
  );
}
