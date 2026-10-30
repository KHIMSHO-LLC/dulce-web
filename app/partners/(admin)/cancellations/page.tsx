"use client";

/**
 * Cancellations tab (route /partners/cancellations) — why people cancel the
 * Pro trial or subscription.
 *
 * Answers come from GET /ref/admin/cancel-feedback (relay
 * routes/cancelFeedback.ts), one per device, from two places:
 *   - the app's own sheet, shown once after it sees auto-renew turned off
 *     (catches people who cancel in iPhone Settings / the Play Store);
 *   - RevenueCat Customer Center's cancel survey (Settings → Manage
 *     subscription in the app), configured in the RC dashboard.
 * The RevenueCat ledger supplies the number of cancellations, so the answer
 * rate is visible next to the reasons.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  UnauthorizedError,
  fetchCancelFeedback,
  fetchLedger,
  type CancelAnswer,
} from "../../api";
import { useAdmin } from "../../AdminGate";
import { dateTime, pct } from "../../format";

/** App reason ids, in the order the app shows them. */
const REASONS: { id: string; label: string }[] = [
  { id: "too_expensive", label: "Too expensive" },
  { id: "connection", label: "Readings or connection problems" },
  { id: "alerts", label: "Alerts didn't work" },
  { id: "other_app", label: "Switched to another app" },
  { id: "only_trying", label: "Only wanted to try it" },
  { id: "not_using", label: "Doesn't use it enough" },
  { id: "mistake", label: "Bought by mistake" },
  { id: "other", label: "Something else" },
];
const LABEL = new Map(REASONS.map((r) => [r.id, r.label]));

/**
 * RevenueCat Customer Center survey option ids → app reason ids. RC rewrites
 * the ids of new options when the config is saved (adding a readable slug and
 * a random suffix), so match on the slug, not the full id.
 */
function normalizeReason(raw: string): string {
  if (LABEL.has(raw)) return raw;
  const r = raw.toLowerCase();
  if (r.includes("too_expensive")) return "too_expensive";
  if (r.includes("readings") || r.includes("connection")) return "connection";
  if (r.includes("alerts")) return "alerts";
  if (r.includes("switched") || r.includes("another_app")) return "other_app";
  if (r.includes("only_wanted") || r.includes("try_it")) return "only_trying";
  if (r.endsWith("survey_usage") || r.includes("dont_use") || r.includes("don_t_use")) return "not_using";
  if (r.includes("mistake")) return "mistake";
  if (r.includes("_other")) return "other";
  return raw;
}

type PeriodFilter = "all" | "trial" | "paid";

function isTrial(a: CancelAnswer): boolean {
  return a.period === "TRIAL";
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border-subtle bg-card p-4">
      <p className="text-caption uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-display font-bold tabular-nums text-foreground">{value}</p>
      {hint ? <p className="mt-0.5 text-caption text-muted">{hint}</p> : null}
    </div>
  );
}

function Card({
  title,
  subtitle,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border-subtle bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
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

function periodLabel(a: CancelAnswer): string {
  if (a.period === "TRIAL") return "Trial";
  if (a.period === "INTRO") return "Intro price";
  if (a.period === "NORMAL" || a.period === "PREPAID") return "Paid";
  return "—";
}

function planLabel(product: string | null): string {
  if (!product) return "—";
  if (/year|annual/i.test(product)) return "Yearly";
  if (/month/i.test(product)) return "Monthly";
  return product;
}

export default function CancellationsPage() {
  const { adminKey, onUnauthorized } = useAdmin();
  const [answers, setAnswers] = useState<CancelAnswer[] | null>(null);
  const [rcCancels30d, setRcCancels30d] = useState<number | null>(null);
  const [filter, setFilter] = useState<PeriodFilter>("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (key: string) => {
      setLoading(true);
      setError(null);
      try {
        const [rows, ledger] = await Promise.all([
          fetchCancelFeedback(key),
          // The answer-rate denominator; the page still works without it.
          fetchLedger(key, 30).catch((err) => {
            if (err instanceof UnauthorizedError) throw err;
            return null;
          }),
        ]);
        setAnswers(rows);
        setRcCancels30d(
          ledger
            ? // Only cancellations someone chose: not refunds or failed payments.
              ledger.filter(
                (r) =>
                  r.ty === "CANCELLATION" &&
                  !r.sb &&
                  r.why !== "CUSTOMER_SUPPORT" &&
                  r.why !== "BILLING_ERROR",
              ).length
            : null,
        );
      } catch (err) {
        if (err instanceof UnauthorizedError) {
          onUnauthorized();
          return;
        }
        setError(err instanceof Error ? err.message : "Unknown error while loading answers.");
      } finally {
        setLoading(false);
      }
    },
    [onUnauthorized],
  );

  useEffect(() => {
    // Fetch-on-mount; setState happens past the await inside `load`.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load(adminKey);
  }, [adminKey, load]);

  // Captured once per load so the 30-day window doesn't call Date.now() in render.
  const [now, setNow] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (answers) setNow(Date.now());
  }, [answers]);

  const all = useMemo(() => answers ?? [], [answers]);
  const filtered = useMemo(
    () =>
      all.filter((a) =>
        filter === "all" ? true : filter === "trial" ? isTrial(a) : !isTrial(a),
      ),
    [all, filter],
  );
  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const a of filtered) {
      const id = normalizeReason(a.reason);
      m.set(id, (m.get(id) ?? 0) + 1);
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [filtered]);
  const maxCount = counts[0]?.[1] ?? 0;

  const last30 = now ? all.filter((a) => now - a.at <= 30 * 24 * 60 * 60 * 1000).length : 0;
  const trials = all.filter(isTrial).length;
  const notes = filtered.filter((a) => a.note);

  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-display font-bold tracking-tight text-foreground">Cancellations</h1>
          <p className="mt-1 text-label text-muted">
            Why people turn off their Pro trial or subscription. One answer per device.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load(adminKey)}
          disabled={loading}
          className="h-10 px-4 rounded-[var(--radius-button-sm)] border border-border-subtle bg-card text-foreground font-semibold hover:bg-accent-soft disabled:opacity-50 transition-colors"
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {error ? (
        <div className="mt-6 rounded-[var(--radius-card)] border border-state-low/30 bg-state-low/10 p-4 text-label text-state-low">
          {error}
        </div>
      ) : null}

      {!answers ? (
        <div className="mt-8 rounded-[var(--radius-card)] border border-border-subtle bg-card p-10 text-center text-muted">
          {loading ? "Loading answers…" : "No data."}
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Answers" value={String(all.length)} hint="All time" />
            <Stat label="Answers · 30 days" value={String(last30)} />
            <Stat
              label="Answer rate · 30 days"
              value={rcCancels30d ? pct(last30, rcCancels30d) : "—"}
              hint={
                rcCancels30d === null
                  ? "RevenueCat ledger unavailable"
                  : `${rcCancels30d} cancellations in RevenueCat`
              }
            />
            <Stat
              label="Trial vs paid"
              value={`${trials} / ${all.length - trials}`}
              hint="Cancelled in the free trial / after paying"
            />
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[3fr_2fr]">
            <Card
              title="Top reasons"
              subtitle="App sheet and RevenueCat's cancel survey, combined"
              right={
                <div className="inline-flex rounded-[var(--radius-button-sm)] border border-border-subtle p-0.5">
                  {(
                    [
                      ["all", "All"],
                      ["trial", "Trial"],
                      ["paid", "Paid"],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setFilter(id)}
                      aria-pressed={filter === id}
                      className={`h-8 px-3 rounded-[var(--radius-button-sm)] text-caption font-semibold transition-colors ${
                        filter === id
                          ? "bg-accent-soft text-accent"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              }
            >
              {counts.length === 0 ? (
                <p className="py-6 text-center text-label text-muted">
                  No answers yet. They appear here as soon as someone cancels and answers.
                </p>
              ) : (
                <ul className="space-y-3">
                  {counts.map(([id, n]) => (
                    <li key={id}>
                      <div className="flex items-baseline justify-between gap-3 text-label">
                        <span className="text-foreground">{LABEL.get(id) ?? id}</span>
                        <span className="tabular-nums text-muted">
                          {n} · {pct(n, filtered.length)}
                        </span>
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-accent-soft">
                        <div
                          className="h-2 rounded-full bg-accent"
                          style={{ width: `${maxCount ? (n / maxCount) * 100 : 0}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card title="In their words" subtitle="Optional notes from the app sheet">
              {notes.length === 0 ? (
                <p className="py-6 text-center text-label text-muted">No notes yet.</p>
              ) : (
                <ul className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                  {notes.map((a) => (
                    <li
                      key={`${a.device}-${a.at}`}
                      className="rounded-[var(--radius-button-sm)] bg-accent-soft/50 p-3"
                    >
                      <p className="text-label text-foreground">&ldquo;{a.note}&rdquo;</p>
                      <p className="mt-1 text-caption text-muted">
                        {LABEL.get(normalizeReason(a.reason)) ?? a.reason} · {periodLabel(a)} ·{" "}
                        {a.locale ?? "—"} · {dateTime(a.at)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>

          <div className="mt-6">
            <Card title="Every answer" subtitle="Newest first">
              {filtered.length === 0 ? (
                <p className="py-6 text-center text-label text-muted">Nothing to show.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-label">
                    <thead className="text-caption uppercase tracking-wide text-muted">
                      <tr>
                        <th className="py-2 pr-4 font-semibold">When</th>
                        <th className="py-2 pr-4 font-semibold">Reason</th>
                        <th className="py-2 pr-4 font-semibold">Stage</th>
                        <th className="py-2 pr-4 font-semibold">Plan</th>
                        <th className="py-2 pr-4 font-semibold">Store</th>
                        <th className="py-2 pr-4 font-semibold">Language</th>
                        <th className="py-2 pr-4 font-semibold">Asked in</th>
                        <th className="py-2 font-semibold">Device</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((a) => (
                        <tr key={`${a.device}-${a.at}`} className="border-t border-border-subtle">
                          <td className="py-2 pr-4 whitespace-nowrap tabular-nums">{dateTime(a.at)}</td>
                          <td className="py-2 pr-4">
                            {LABEL.get(normalizeReason(a.reason)) ?? a.reason}
                            {a.note ? <span className="ml-1 text-muted">· note</span> : null}
                          </td>
                          <td className="py-2 pr-4">{periodLabel(a)}</td>
                          <td className="py-2 pr-4">{planLabel(a.product)}</td>
                          <td className="py-2 pr-4">
                            {a.store === "APP_STORE" ? "App Store" : a.store === "PLAY_STORE" ? "Google Play" : (a.store ?? "—")}
                          </td>
                          <td className="py-2 pr-4">{a.locale ?? "—"}</td>
                          <td className="py-2 pr-4">
                            {a.source === "customer_center" ? "Manage subscription" : "Dulce sheet"}
                          </td>
                          <td className="py-2 font-mono text-caption text-muted">{a.device}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
