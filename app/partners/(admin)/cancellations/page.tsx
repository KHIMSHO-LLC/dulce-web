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

import Link from "next/link";
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

function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard.writeText(text).then(
          () => {
            setDone(true);
            setTimeout(() => setDone(false), 1500);
          },
          () => {},
        );
      }}
      className="text-caption font-semibold text-accent hover:underline"
    >
      {done ? "Copied" : "Copy"}
    </button>
  );
}

/** One answer up close: the note, the facts, and how to reach the person. */
function AnswerDialog({ a, onClose }: { a: CancelAnswer; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const reason = LABEL.get(normalizeReason(a.reason)) ?? a.reason;
  const facts = [
    periodLabel(a),
    planLabel(a.product),
    sensorLabel(a),
    `${speedLabel(speedMs(a))} after install`,
    a.locale ?? "—",
  ].join(" · ");
  const subject = "Dulce";
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 sm:p-16"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="answer-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-[var(--radius-card)] border border-border-subtle bg-card p-5 text-label text-foreground shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="answer-title" className="font-bold">
              {reason}
            </h2>
            <p className="mt-0.5 text-caption text-muted">{dateTime(a.at)}</p>
          </div>
          <button type="button" onClick={onClose} className="text-caption text-muted underline">
            close
          </button>
        </div>

        {a.note ? (
          <p className="mt-4 rounded-[var(--radius-button-sm)] bg-accent-soft/50 p-3 whitespace-pre-wrap">
            &ldquo;{a.note}&rdquo;
          </p>
        ) : (
          <p className="mt-4 text-muted">No note.</p>
        )}

        <p className="mt-3 text-caption text-muted">{facts}</p>

        <div className="mt-4 space-y-2 border-t border-border-subtle pt-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted">Email</span>
            {a.email ? (
              <span className="flex min-w-0 items-center gap-3">
                <span className="truncate select-all">{a.email}</span>
                <CopyButton text={a.email} />
              </span>
            ) : (
              <span className="text-muted">none saved</span>
            )}
          </div>
          {a.supportId ? (
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted">Support ID</span>
              <span className="flex min-w-0 items-center gap-3">
                <span className="truncate font-mono text-caption select-all">{a.supportId}</span>
                <CopyButton text={a.supportId} />
              </span>
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {a.email ? (
            <a
              href={`mailto:${a.email}?subject=${encodeURIComponent(subject)}`}
              className="h-9 inline-flex items-center px-3 rounded-[var(--radius-button-sm)] bg-accent text-white font-semibold hover:opacity-90"
            >
              Write an email
            </a>
          ) : null}
          {a.supportId ? (
            <Link
              href={`/partners/users?q=${encodeURIComponent(a.supportId)}`}
              className="h-9 inline-flex items-center px-3 rounded-[var(--radius-button-sm)] border border-border-subtle font-semibold hover:bg-accent-soft"
            >
              Open in Users
            </Link>
          ) : null}
        </div>
      </div>
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

const SENSOR_LABEL: Record<string, string> = {
  libre: "FreeStyle Libre",
  dexcom: "Dexcom",
  carelink: "Medtronic CareLink",
  nightscout: "Nightscout",
};

function sensorLabel(a: CancelAnswer): string {
  return a.sensor ? (SENSOR_LABEL[a.sensor] ?? a.sensor) : "Unknown";
}

/** Install → cancel answer, in ms; null when either end is unknown. */
function speedMs(a: CancelAnswer): number | null {
  return a.installedAt ? Math.max(0, a.at - a.installedAt) : null;
}

const HOUR = 3600_000;
const SPEED_BUCKETS: { id: string; label: string; max: number }[] = [
  { id: "h1", label: "Within 1 hour", max: HOUR },
  { id: "d1", label: "Within 1 day", max: 24 * HOUR },
  { id: "d3", label: "1–3 days", max: 72 * HOUR },
  { id: "d7", label: "3–7 days", max: 168 * HOUR },
  { id: "more", label: "Over 7 days", max: Infinity },
];

function speedBucket(ms: number): string {
  return (SPEED_BUCKETS.find((b) => ms < b.max) ?? SPEED_BUCKETS[SPEED_BUCKETS.length - 1]).id;
}

function speedLabel(ms: number | null): string {
  if (ms === null) return "—";
  if (ms < HOUR) return `${Math.max(1, Math.round(ms / 60000))} min`;
  if (ms < 48 * HOUR) return `${Math.round(ms / HOUR)} h`;
  return `${Math.round(ms / (24 * HOUR))} days`;
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
  // Sensor × reason, and how soon after install people cancelled.
  const bySensor = useMemo(() => {
    const m = new Map<string, { n: number; reasons: Map<string, number> }>();
    for (const a of filtered) {
      const k = sensorLabel(a);
      const e = m.get(k) ?? { n: 0, reasons: new Map<string, number>() };
      e.n += 1;
      const r = normalizeReason(a.reason);
      e.reasons.set(r, (e.reasons.get(r) ?? 0) + 1);
      m.set(k, e);
    }
    return [...m.entries()].sort((a, b) => b[1].n - a[1].n);
  }, [filtered]);
  const bySpeed = useMemo(() => {
    const m = new Map<string, number>();
    let unknown = 0;
    for (const a of filtered) {
      const ms = speedMs(a);
      if (ms === null) unknown += 1;
      else m.set(speedBucket(ms), (m.get(speedBucket(ms)) ?? 0) + 1);
    }
    return { m, unknown };
  }, [filtered]);

  const last30 = now ? all.filter((a) => now - a.at <= 30 * 24 * 60 * 60 * 1000).length : 0;
  const trials = all.filter(isTrial).length;
  const notes = filtered.filter((a) => a.note);
  const [open, setOpen] = useState<CancelAnswer | null>(null);
  const closeDialog = useCallback(() => setOpen(null), []);

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

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Card title="By sensor" subtitle="Which CGM they use, and what they said">
              {bySensor.length === 0 ? (
                <p className="py-6 text-center text-label text-muted">No answers yet.</p>
              ) : (
                <ul className="space-y-3">
                  {bySensor.map(([name, e]) => {
                    const top = [...e.reasons.entries()].sort((a, b) => b[1] - a[1])[0];
                    return (
                      <li key={name} className="flex items-baseline justify-between gap-3 text-label">
                        <span className="text-foreground">{name}</span>
                        <span className="text-right tabular-nums text-muted">
                          {e.n} · {pct(e.n, filtered.length)}
                          {top ? ` · most: ${LABEL.get(top[0]) ?? top[0]}` : ""}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </Card>
            <Card
              title="How fast they cancel"
              subtitle="From the first time the phone reached Dulce to the cancel answer"
            >
              <ul className="space-y-3">
                {SPEED_BUCKETS.map((b) => {
                  const n = bySpeed.m.get(b.id) ?? 0;
                  return (
                    <li key={b.id} className="flex items-baseline justify-between gap-3 text-label">
                      <span className="text-foreground">{b.label}</span>
                      <span className="tabular-nums text-muted">{n}</span>
                    </li>
                  );
                })}
                {bySpeed.unknown > 0 ? (
                  <li className="flex items-baseline justify-between gap-3 text-label">
                    <span className="text-muted">Unknown (device gone)</span>
                    <span className="tabular-nums text-muted">{bySpeed.unknown}</span>
                  </li>
                ) : null}
              </ul>
            </Card>
          </div>

          <div className="mt-6">
            <Card title="Every answer" subtitle="Newest first · click a row for the note and email">
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
                        <th className="py-2 pr-4 font-semibold">Sensor</th>
                        <th className="py-2 pr-4 font-semibold">After install</th>
                        <th className="py-2 pr-4 font-semibold">Store</th>
                        <th className="py-2 pr-4 font-semibold">Language</th>
                        <th className="py-2 pr-4 font-semibold">Asked in</th>
                        <th className="py-2 font-semibold">Device</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((a) => (
                        <tr
                          key={`${a.device}-${a.at}`}
                          onClick={() => setOpen(a)}
                          className="cursor-pointer border-t border-border-subtle hover:bg-accent-soft/40"
                        >
                          <td className="py-2 pr-4 whitespace-nowrap tabular-nums">{dateTime(a.at)}</td>
                          <td className="py-2 pr-4">
                            {LABEL.get(normalizeReason(a.reason)) ?? a.reason}
                            {a.note ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpen(a);
                                }}
                                className="ml-2 whitespace-nowrap rounded-full bg-accent-soft px-2 py-0.5 text-caption font-semibold text-accent hover:underline"
                              >
                                note
                              </button>
                            ) : null}
                            {a.email ? (
                              <span title="Left a contact email" className="ml-1.5 text-caption text-muted">
                                email
                              </span>
                            ) : null}
                          </td>
                          <td className="py-2 pr-4">{periodLabel(a)}</td>
                          <td className="py-2 pr-4">{planLabel(a.product)}</td>
                          <td className="py-2 pr-4">{sensorLabel(a)}</td>
                          <td className="py-2 pr-4 tabular-nums">{speedLabel(speedMs(a))}</td>
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
      {open ? <AnswerDialog a={open} onClose={closeDialog} /> : null}
    </div>
  );
}
