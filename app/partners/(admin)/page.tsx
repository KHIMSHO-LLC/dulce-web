"use client";

/**
 * Overview — the one page for "how is Dulce doing": subscriptions and money
 * from RevenueCat (the billing truth), onboarding from the relay, every
 * subscription event as it happens, and the top partners.
 *
 * Sources, so numbers can be checked against their origin:
 *   - RevenueCat Charts & Metrics API (via the relay, cached up to 1 h)
 *   - the relay's RevenueCat event ledger (from 27 Oct 2026)
 *   - the relay's onboarding funnel (app-reported, per device)
 */

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  UnauthorizedError,
  fetchCodes,
  fetchLedger,
  fetchRcChart,
  fetchRcOverview,
  fetchUsage,
  type LedgerRow,
  type RcOverviewMetric,
  type RcResult,
  type RefCode,
  type UsageResponse,
} from "../api";
import { useAdmin } from "../AdminGate";
import { BarChart, LineChart, SERIES_COLORS } from "../charts";
import { dateTime, eur, flag, pct } from "../format";
import { normalizeChart, pickSeries, type NormalizedChart } from "../rcChart";

const RANGES = [
  { days: 30, label: "30 days" },
  { days: 90, label: "90 days" },
  { days: 365, label: "12 months" },
] as const;

const CHARTS = [
  "trials_new",
  "actives",
  "trials",
  "revenue",
  "customers_new",
  "trial_conversion_rate",
  "churn",
] as const;
type ChartName = (typeof CHARTS)[number];

function isoDay(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

/** What happened, in plain words, for one ledger row. */
function describe(r: LedgerRow): { label: string; tone: "good" | "bad" | "neutral" | "trial" } {
  switch (r.ty) {
    case "INITIAL_PURCHASE":
      return r.pt === "TRIAL" ? { label: "Trial started", tone: "trial" } : { label: r.pt === "INTRO" ? "Bought (intro price)" : "Bought", tone: "good" };
    case "RENEWAL":
      return r.tc ? { label: "Trial converted", tone: "good" } : { label: "Renewed", tone: "good" };
    case "CANCELLATION":
      if ((r.g ?? 0) < 0) return { label: "Refunded", tone: "bad" };
      if (r.pt === "TRIAL") return { label: "Trial cancelled", tone: "bad" };
      return { label: r.why === "BILLING_ERROR" ? "Cancelled (billing)" : "Turned off renewal", tone: "bad" };
    case "UNCANCELLATION":
      return { label: "Turned renewal back on", tone: "good" };
    case "EXPIRATION":
      return { label: r.pt === "TRIAL" ? "Trial ended" : "Expired", tone: "neutral" };
    case "BILLING_ISSUE":
      return { label: "Billing issue", tone: "bad" };
    case "PRODUCT_CHANGE":
      return { label: "Changed plan", tone: "neutral" };
    case "SUBSCRIPTION_EXTENDED":
      return { label: "Extended", tone: "neutral" };
    case "TRANSFER":
      return { label: "Transferred", tone: "neutral" };
    default:
      return { label: r.ty.replace(/_/g, " ").toLowerCase(), tone: "neutral" };
  }
}

const TONE: Record<string, string> = {
  good: "bg-state-in-range/10 text-state-in-range",
  bad: "bg-state-low/10 text-state-low",
  trial: "bg-accent-soft text-accent",
  neutral: "bg-background text-muted",
};

function Card({ title, subtitle, children, right }: { title: string; subtitle?: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border-subtle bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-label font-bold text-foreground">{title}</h3>
          {subtitle ? <p className="mt-0.5 text-caption text-muted">{subtitle}</p> : null}
        </div>
        {right}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Kpi({ label, value, hint, tone }: { label: string; value: string; hint?: string; tone?: "accent" }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border-subtle bg-card p-4">
      <p className="text-caption uppercase tracking-wide text-muted">{label}</p>
      <p className={`mt-1 text-display font-bold tabular-nums ${tone === "accent" ? "text-accent" : "text-foreground"}`}>{value}</p>
      {hint ? <p className="mt-0.5 text-caption text-muted">{hint}</p> : null}
    </div>
  );
}

function metricValue(m: RcOverviewMetric, currency: string): string {
  if (m.unit === "$" || m.unit === "€" || /revenue|mrr/i.test(m.id)) {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 0 }).format(m.value);
  }
  if (m.unit === "%") return `${m.value}%`;
  return new Intl.NumberFormat("en-GB").format(m.value);
}

function Empty({ children }: { children: React.ReactNode }) {
  return <div className="flex h-32 items-center justify-center text-center text-label text-muted">{children}</div>;
}

export default function OverviewPage() {
  const { adminKey, onUnauthorized } = useAdmin();
  const [days, setDays] = useState<number>(30);
  const [overview, setOverview] = useState<RcResult<{ metrics: RcOverviewMetric[]; currency: string }> | null>(null);
  const [charts, setCharts] = useState<Partial<Record<ChartName, NormalizedChart | null>>>({});
  const [rcError, setRcError] = useState<string | null>(null);
  const [ledger, setLedger] = useState<LedgerRow[] | null>(null);
  const [usage, setUsage] = useState<UsageResponse | null>(null);
  const [codes, setCodes] = useState<RefCode[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSandbox, setShowSandbox] = useState(false);

  const load = useCallback(
    async (key: string, rangeDays: number) => {
      setLoading(true);
      setError(null);
      setRcError(null);
      try {
        const end = Date.now();
        const params = {
          start_date: isoDay(end - (rangeDays - 1) * 86_400_000),
          end_date: isoDay(end),
          ...(rangeDays > 120 ? { resolution: "1" } : {}),
        };
        const [ov, led, use, cds, ...chartResults] = await Promise.all([
          fetchRcOverview(key),
          fetchLedger(key, Math.min(rangeDays, 400)),
          fetchUsage(key),
          fetchCodes(key),
          ...CHARTS.map((c) => fetchRcChart(key, c, params)),
        ]);
        setOverview(ov);
        setLedger(led);
        setUsage(use);
        setCodes(cds);
        const next: Partial<Record<ChartName, NormalizedChart | null>> = {};
        let firstErr: string | null = null;
        chartResults.forEach((r, i) => {
          if (r.ok) next[CHARTS[i]!] = normalizeChart(r.data);
          else {
            next[CHARTS[i]!] = null;
            firstErr ??= JSON.stringify(r.error);
          }
        });
        if (!ov.ok) firstErr ??= JSON.stringify(ov.error);
        setCharts(next);
        setRcError(firstErr);
      } catch (err) {
        if (err instanceof UnauthorizedError) {
          onUnauthorized();
          return;
        }
        setError(err instanceof Error ? err.message : "Unknown error while loading.");
      } finally {
        setLoading(false);
      }
    },
    [onUnauthorized],
  );

  useEffect(() => {
    // Fetch on mount and when the range changes; setState happens past the await.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load(adminKey, days);
  }, [adminKey, days, load]);

  const rows = useMemo(() => (ledger ?? []).filter((r) => showSandbox || !r.sb), [ledger, showSandbox]);

  const ledgerSummary = useMemo(() => {
    const s = { trials: 0, converted: 0, bought: 0, renewed: 0, turnedOff: 0, trialCancelled: 0, refunds: 0, billing: 0, gross: 0, net: 0 };
    for (const r of rows) {
      const d = describe(r).label;
      if (d === "Trial started") s.trials += 1;
      else if (d === "Trial converted") s.converted += 1;
      else if (d.startsWith("Bought")) s.bought += 1;
      else if (d === "Renewed") s.renewed += 1;
      else if (d === "Trial cancelled") s.trialCancelled += 1;
      else if (d.startsWith("Turned off") || d.startsWith("Cancelled")) s.turnedOff += 1;
      else if (d === "Refunded") s.refunds += 1;
      else if (d === "Billing issue") s.billing += 1;
      s.gross += r.g ?? 0;
      s.net += r.n ?? 0;
    }
    return s;
  }, [rows]);

  const byCountry = useMemo(() => {
    const m = new Map<string, { trials: number; paid: number; net: number }>();
    for (const r of rows) {
      if (!r.c) continue;
      if (!m.has(r.c)) m.set(r.c, { trials: 0, paid: 0, net: 0 });
      const e = m.get(r.c)!;
      const d = describe(r).label;
      if (d === "Trial started") e.trials += 1;
      if (d === "Trial converted" || d.startsWith("Bought") || d === "Renewed") e.paid += 1;
      e.net += r.n ?? 0;
    }
    return [...m.entries()].sort((a, b) => b[1].net - a[1].net || b[1].trials - a[1].trials).slice(0, 10);
  }, [rows]);

  const rcMissingKey = rcError?.includes("permission") || rcError?.includes("rc_not_configured");
  const currency = overview?.ok ? overview.data.currency || "EUR" : "EUR";
  const money = (n: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: n >= 100 ? 0 : 2 }).format(n);

  const funnel = usage?.funnel?.last30d;
  const topCodes = (codes ?? []).slice().sort((a, b) => b.stats.paying - a.stats.paying || b.stats.trials - a.stats.trials).slice(0, 5);

  const actives = pickSeries(charts.actives ?? null);
  const trialsLevel = pickSeries(charts.trials ?? null);
  const levelDates = charts.actives?.dates ?? charts.trials?.dates ?? [];

  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-display font-bold tracking-tight text-foreground">Overview</h1>
          <p className="mt-1 text-label text-muted">Subscriptions, money, onboarding and partners in one place.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-[var(--radius-button-sm)] border border-border-subtle bg-card p-1" role="tablist" aria-label="Range">
            {RANGES.map((r) => (
              <button
                key={r.days}
                type="button"
                role="tab"
                aria-selected={days === r.days}
                onClick={() => setDays(r.days)}
                className={`h-8 px-3 rounded-[var(--radius-button-sm)] text-caption font-semibold transition-colors ${
                  days === r.days ? "bg-accent text-white" : "text-muted hover:text-foreground"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => void load(adminKey, days)}
            disabled={loading}
            className="h-10 px-4 rounded-[var(--radius-button-sm)] border border-border-subtle bg-card text-foreground font-semibold hover:bg-accent-soft disabled:opacity-50 transition-colors"
          >
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-6 rounded-[var(--radius-card)] border border-state-low/30 bg-state-low/10 p-4 text-label text-state-low">{error}</div>
      ) : null}

      {rcMissingKey ? (
        <div className="mt-6 rounded-[var(--radius-card)] border border-state-slightly-low/30 bg-state-slightly-low/10 p-5 text-label text-foreground">
          <p className="font-bold">Connect RevenueCat to see subscriptions and revenue here.</p>
          <p className="mt-1 text-muted">
            The relay&apos;s RevenueCat key can only read offerings. In RevenueCat › Project settings › API keys, create a
            new <strong>v2 secret key</strong> with read access to <em>Charts &amp; metrics</em>, <em>Customer information</em> and{" "}
            <em>Project configuration</em>, then in <span className="font-mono">dulce-relay</span> run{" "}
            <span className="font-mono">npx wrangler secret put RC_API_V2_KEY</span> and paste it.
          </p>
        </div>
      ) : rcError ? (
        <div className="mt-6 rounded-[var(--radius-card)] border border-state-low/30 bg-state-low/10 p-4 text-caption text-state-low break-all">
          RevenueCat: {rcError.slice(0, 300)}
        </div>
      ) : null}

      {/* Now: RevenueCat's own headline numbers. */}
      <h2 className="mt-8 text-headline font-bold text-foreground">Right now</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {overview?.ok && overview.data.metrics?.length ? (
          overview.data.metrics.map((m) => (
            <Kpi
              key={m.id}
              label={m.name}
              value={metricValue(m, currency)}
              hint={m.period === "P28D" ? "last 28 days" : "now"}
              tone={/subscri/i.test(m.id) ? "accent" : undefined}
            />
          ))
        ) : (
          <>
            <Kpi label="Active trials" value="—" hint="RevenueCat" />
            <Kpi label="Paying subscriptions" value="—" hint="RevenueCat" />
            <Kpi label="MRR" value="—" hint="RevenueCat" />
            <Kpi label="Revenue" value="—" hint="last 28 days" />
            <Kpi label="New customers" value="—" hint="last 28 days" />
            <Kpi label="Active customers" value="—" hint="last 28 days" />
          </>
        )}
      </div>
      <div className="mt-3 rounded-[var(--radius-card)] border border-dashed border-border-subtle bg-card/60 p-4 text-caption text-muted">
        <strong className="text-foreground">App Store downloads, impressions and product page views</strong>{" "}come from App Store
        Connect and aren&apos;t connected yet. They need an App Store Connect API key (Sales role). Until then, &ldquo;New customers&rdquo;
        (people who opened the app) is the closest number.
      </div>

      {/* Over time. */}
      <h2 className="mt-10 text-headline font-bold text-foreground">Over time</h2>
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <Card title="Paying subscriptions and trials" subtitle="Active at the end of each day (RevenueCat).">
          {levelDates.length > 1 && (actives || trialsLevel) ? (
            <LineChart
              dates={levelDates}
              series={[
                ...(actives ? [{ label: "Paying", values: actives.values }] : []),
                ...(trialsLevel && charts.trials?.dates.length === levelDates.length ? [{ label: "In trial", values: trialsLevel.values }] : []),
              ]}
            />
          ) : (
            <Empty>{rcMissingKey ? "Needs the RevenueCat key." : "No data yet."}</Empty>
          )}
        </Card>
        <Card title="Revenue" subtitle="Customer payments per day, before Apple's fee (RevenueCat).">
          {charts.revenue && charts.revenue.dates.length ? (
            <BarChart
              dates={charts.revenue.dates}
              values={pickSeries(charts.revenue, /^revenue$/i)!.values}
              label="Revenue"
              color={SERIES_COLORS[2]}
              height={160}
              format={money}
            />
          ) : (
            <Empty>{rcMissingKey ? "Needs the RevenueCat key." : "No data yet."}</Empty>
          )}
        </Card>
        <Card title="New trials" subtitle="Free trials started per day (RevenueCat).">
          {charts.trials_new && charts.trials_new.dates.length ? (
            <BarChart dates={charts.trials_new.dates} values={pickSeries(charts.trials_new)!.values} label="New trials" height={140} />
          ) : (
            <Empty>{rcMissingKey ? "Needs the RevenueCat key." : "No data yet."}</Empty>
          )}
        </Card>
        <Card title="New customers" subtitle="People who opened the app for the first time (RevenueCat).">
          {charts.customers_new && charts.customers_new.dates.length ? (
            <BarChart
              dates={charts.customers_new.dates}
              values={pickSeries(charts.customers_new)!.values}
              label="New customers"
              color={SERIES_COLORS[1]}
              height={140}
            />
          ) : (
            <Empty>{rcMissingKey ? "Needs the RevenueCat key." : "No data yet."}</Empty>
          )}
        </Card>
        <Card
          title="Trial → paid"
          subtitle="Share of trials that turned into a payment, by trial start date (RevenueCat). Recent trials are still pending."
          right={(() => {
            const t = charts.trial_conversion_rate?.summary?.total;
            if (!t) return null;
            return (
              <div className="text-right">
                <p className="text-headline font-bold tabular-nums text-foreground">{t["Conversion Rate"] ?? 0}%</p>
                <p className="text-caption text-muted">
                  {t["Conversions"] ?? 0} of {t["Trial Starts"] ?? 0} · {t["Pending"] ?? 0} pending
                </p>
              </div>
            );
          })()}
        >
          {charts.trial_conversion_rate && charts.trial_conversion_rate.dates.length > 1 ? (
            <LineChart
              dates={charts.trial_conversion_rate.dates}
              series={[{ label: "Converted", values: pickSeries(charts.trial_conversion_rate, /rate/i)!.values }]}
              format={(n) => `${n}%`}
              height={160}
            />
          ) : (
            <Empty>{rcMissingKey ? "Needs the RevenueCat key." : "No data yet."}</Empty>
          )}
        </Card>
        <Card
          title="Churn"
          subtitle="Share of paying subscriptions lost per period (RevenueCat)."
          right={(() => {
            const avg = charts.churn?.summary?.average;
            if (!avg) return null;
            return (
              <div className="text-right">
                <p className="text-headline font-bold tabular-nums text-foreground">{avg["Churn Rate"] ?? 0}%</p>
                <p className="text-caption text-muted">average per {days > 120 ? "week" : "day"}</p>
              </div>
            );
          })()}
        >
          {charts.churn && charts.churn.dates.length > 1 ? (
            <LineChart
              dates={charts.churn.dates}
              series={[{ label: "Churn", values: pickSeries(charts.churn, /rate/i)!.values }]}
              format={(n) => `${n}%`}
              height={160}
            />
          ) : (
            <Empty>{rcMissingKey ? "Needs the RevenueCat key." : "No data yet."}</Empty>
          )}
        </Card>
      </div>

      {/* Onboarding: what only the app knows. */}
      <h2 className="mt-10 text-headline font-bold text-foreground">From opening the app to paying · last 30 days</h2>
      <p className="mt-1 text-label text-muted">Per device, reported by the app. Shows where people drop off before RevenueCat ever sees them.</p>
      <div className="mt-3 rounded-[var(--radius-card)] border border-border-subtle bg-card p-5">
        {funnel ? (
          [
            { label: "Opened the app", n: funnel.ob_welcome },
            { label: "Reached sensor sign-in", n: funnel.ob_login },
            { label: "Connected a sensor", n: funnel.ob_connected },
            { label: "Saw the Pro offer", n: funnel.ob_offer },
            { label: "Started a trial or bought", n: funnel.ob_purchase },
          ].map((s, i, all) => {
            const share = Math.round((s.n / (all[0]!.n || 1)) * 100);
            const prev = i ? all[i - 1]!.n : s.n;
            return (
              <div key={s.label} className="grid grid-cols-[minmax(0,12rem)_1fr_auto] items-center gap-3 py-1.5">
                <span className="text-label text-foreground">{s.label}</span>
                <div className="h-3 rounded-full bg-accent-soft">
                  <div className="h-3 rounded-full bg-accent" style={{ width: `${Math.min(100, share)}%` }} />
                </div>
                <span className="w-32 text-right text-label tabular-nums text-foreground">
                  {s.n} <span className="text-caption text-muted">{share}%{i ? ` · −${prev - s.n}` : ""}</span>
                </span>
              </div>
            );
          })
        ) : (
          <Empty>Loading…</Empty>
        )}
      </div>

      {/* Live events from the RevenueCat webhook. */}
      <div className="mt-10 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-headline font-bold text-foreground">Subscription events</h2>
          <p className="mt-1 text-label text-muted">Every trial, payment, cancellation and refund as RevenueCat reports it. Recorded from 27 Oct 2026.</p>
        </div>
        <label className="flex items-center gap-2 text-caption text-muted">
          <input type="checkbox" checked={showSandbox} onChange={(e) => setShowSandbox(e.target.checked)} />
          include sandbox (test) purchases
        </label>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Kpi label="Trials started" value={String(ledgerSummary.trials)} />
        <Kpi label="Trial → paid" value={String(ledgerSummary.converted)} hint={ledgerSummary.trials ? pct(ledgerSummary.converted, ledgerSummary.trials) : undefined} />
        <Kpi label="Bought / renewed" value={String(ledgerSummary.bought + ledgerSummary.renewed)} hint={`${ledgerSummary.bought} new · ${ledgerSummary.renewed} renewals`} />
        <Kpi label="Cancelled" value={String(ledgerSummary.trialCancelled + ledgerSummary.turnedOff)} hint={`${ledgerSummary.trialCancelled} in trial · ${ledgerSummary.turnedOff} paying`} />
        <Kpi label="Refunds · billing" value={`${ledgerSummary.refunds} · ${ledgerSummary.billing}`} />
        <Kpi label="Net received" value={eur(ledgerSummary.net)} hint={`${eur(ledgerSummary.gross)} paid by customers`} tone="accent" />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <div className="overflow-x-auto rounded-[var(--radius-card)] border border-border-subtle bg-card lg:col-span-2">
          {rows.length ? (
            <table className="w-full min-w-[640px] text-left text-label">
              <thead>
                <tr className="border-b border-border-subtle text-caption uppercase tracking-wider text-muted">
                  <th className="px-4 py-2.5 font-semibold">When</th>
                  <th className="px-4 py-2.5 font-semibold">What</th>
                  <th className="px-4 py-2.5 font-semibold">Plan</th>
                  <th className="px-4 py-2.5 font-semibold">Country</th>
                  <th className="px-4 py-2.5 font-semibold">Partner</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Paid</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Net</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 60).map((r) => {
                  const d = describe(r);
                  return (
                    <tr key={r.id} className="border-b border-border-subtle last:border-0">
                      <td className="whitespace-nowrap px-4 py-2 text-muted">{dateTime(r.t)}</td>
                      <td className="px-4 py-2">
                        <span className={`inline-flex rounded-[var(--radius-badge)] px-2 py-0.5 text-caption font-semibold ${TONE[d.tone]}`}>{d.label}</span>
                        {r.sb ? <span className="ml-1 text-caption text-muted">sandbox</span> : null}
                      </td>
                      <td className="px-4 py-2 text-muted">{r.per === "yearly" ? "Yearly" : r.per === "monthly" ? "Monthly" : r.p ?? "—"}</td>
                      <td className="px-4 py-2">{r.c ? `${flag(r.c)} ${r.c}` : "—"}</td>
                      <td className="px-4 py-2 font-mono text-caption">{r.r ?? ""}</td>
                      <td className="px-4 py-2 text-right tabular-nums">{r.g ? eur(r.g) : "—"}</td>
                      <td className="px-4 py-2 text-right tabular-nums text-muted">{r.n ? eur(r.n) : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Empty>
              No events yet. They appear here as RevenueCat sends them; if nothing shows within a day, check that RevenueCat&apos;s
              webhook points to the relay&apos;s /ref/webhook.
            </Empty>
          )}
        </div>
        <Card title="Top countries" subtitle="By net received, then trials (events in range).">
          {byCountry.length ? (
            <ul className="space-y-1.5">
              {byCountry.map(([c, v]) => (
                <li key={c} className="flex items-center justify-between gap-3 text-label">
                  <span>
                    {flag(c)} {c}
                  </span>
                  <span className="text-caption text-muted">
                    {v.trials} trials · {v.paid} paid · <span className="font-semibold text-foreground">{eur(v.net)}</span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>No events yet.</Empty>
          )}
        </Card>
      </div>

      {/* Partners at a glance. */}
      <div className="mt-10 flex items-end justify-between gap-3">
        <h2 className="text-headline font-bold text-foreground">Top partners</h2>
        <Link href="/partners/referrals" className="text-label font-semibold text-accent hover:text-accent-hover">
          All partners →
        </Link>
      </div>
      <div className="mt-3 overflow-x-auto rounded-[var(--radius-card)] border border-border-subtle bg-card">
        {topCodes.length ? (
          <table className="w-full min-w-[560px] text-left text-label">
            <thead>
              <tr className="border-b border-border-subtle text-caption uppercase tracking-wider text-muted">
                <th className="px-4 py-2.5 font-semibold">Partner</th>
                <th className="px-4 py-2.5 text-right font-semibold">Entered code</th>
                <th className="px-4 py-2.5 text-right font-semibold">Paying</th>
                <th className="px-4 py-2.5 text-right font-semibold">Conversion</th>
                <th className="px-4 py-2.5 text-right font-semibold">Net</th>
                <th className="px-4 py-2.5 text-right font-semibold">Owed</th>
              </tr>
            </thead>
            <tbody>
              {topCodes.map((c) => (
                <tr key={c.code} className="border-b border-border-subtle last:border-0">
                  <td className="px-4 py-2">
                    <span className="font-semibold text-foreground">{c.partner?.name || c.code}</span>{" "}
                    <span className="font-mono text-caption text-muted">{c.code}</span>
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">{c.stats.claims}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{c.stats.paying}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{pct(c.stats.paying, c.stats.claims)}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{eur(c.revenue?.netEur ?? 0)}</td>
                  <td className="px-4 py-2 text-right font-semibold tabular-nums">{c.owed.amount === null ? "—" : eur(c.owed.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Empty>No partners yet.</Empty>
        )}
      </div>

      <p className="mt-8 text-caption text-muted">
        RevenueCat numbers are cached for up to an hour. &ldquo;Devices&rdquo; (the next tab) is what the relay sees per phone:
        connections, sensors and app health.
      </p>
    </div>
  );
}
