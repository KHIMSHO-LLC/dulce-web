"use client";

/**
 * Usage tab — who is actually using Dulce.
 *
 * Everything here comes from one relay call (GET /ref/admin/usage). Read
 * relay/src/routes/analytics.ts for how each number is derived; the caveats
 * that matter for interpretation are repeated on-screen, because a dashboard
 * number with an invisible caveat is worse than no number.
 */

import { useCallback, useEffect, useState } from "react";
import {
  LIFECYCLE_EVENTS,
  UnauthorizedError,
  fetchUsage,
  type FunnelStep,
  type LifecycleEvent,
  type UsageResponse,
} from "../../api";
import { useAdmin } from "../../AdminGate";
import { BarChart, LineChart } from "../../charts";

/** Status colours, deliberately NOT the categorical series palette: these
 *  encode good/bad state, and each ships with its own title so the colour is
 *  never the only signal. */
const EVENT_META: Record<
  LifecycleEvent,
  { title: string; blurb: string; color: string }
> = {
  signup: {
    title: "New devices",
    blurb: "Connected LibreLinkUp or Dexcom for the first time (signing in again doesn't count since 26 Oct)",
    color: "#2E7D32",
  },
  upgrade: {
    title: "Started Pro",
    blurb: "Free → trial or paid. Mostly trial starts",
    color: "#C2410C",
  },
  convert: {
    title: "Trial → paid",
    blurb: "First payment after the trial. Tracked from 26 Oct; before that it counted under Started Pro",
    color: "#9A3412",
  },
  downgrade: {
    title: "Back to free",
    blurb: "Trial ended or subscription lapsed",
    color: "#C77700",
  },
  logout: {
    title: "Sign-outs",
    blurb: "Explicitly signed out of the app",
    color: "#595959",
  },
  uninstall: {
    title: "App deleted",
    blurb: "Every push token went dead — deleted, or notifications revoked",
    color: "#991B1B",
  },
};

function Stat({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "accent" | "warn";
}) {
  const valueTone =
    tone === "accent" ? "text-accent" : tone === "warn" ? "text-state-low" : "text-foreground";
  return (
    <div className="rounded-[var(--radius-card)] border border-border-subtle bg-card p-4">
      <p className="text-caption uppercase tracking-wide text-muted">{label}</p>
      <p className={`mt-1 text-display font-bold tabular-nums ${valueTone}`}>{value}</p>
      {hint ? <p className="mt-0.5 text-caption text-muted">{hint}</p> : null}
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border-subtle bg-card p-5">
      <h3 className="text-label font-bold text-foreground">{title}</h3>
      {subtitle ? <p className="mt-0.5 text-caption text-muted">{subtitle}</p> : null}
      <div className="mt-4">{children}</div>
    </div>
  );
}

const FUNNEL_STEPS: { step: FunnelStep; label: string }[] = [
  { step: "ob_welcome", label: "Opened the app (welcome)" },
  { step: "ob_goals", label: "Picked goals" },
  { step: "ob_login", label: "Reached sensor sign-in" },
  { step: "ob_connected", label: "Connected a sensor" },
  { step: "ob_offer", label: "Saw the Pro offer" },
  { step: "ob_purchase", label: "Started trial / bought" },
];

export default function UsagePage() {
  const { adminKey, onUnauthorized } = useAdmin();
  const [data, setData] = useState<UsageResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (key: string) => {
      setLoading(true);
      setError(null);
      try {
        setData(await fetchUsage(key));
      } catch (err) {
        if (err instanceof UnauthorizedError) {
          onUnauthorized();
          return;
        }
        setError(err instanceof Error ? err.message : "Unknown error while loading usage.");
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

  const current = data?.current;
  const pct = (n: number) =>
    !current || current.total === 0 ? "0%" : `${Math.round((n / current.total) * 100)}%`;
  const funnel = data?.funnel?.last30d;

  // The API returns 90 completed days plus today's partial counts. The event
  // small multiples chart the last 30: at 90 the bars collapse to one-pixel
  // needles in a third-width card and stop being readable — that range is the
  // level charts' job.
  const EVENT_CHART_DAYS = 30;
  // Today is appended so the newest bar reflects what happened an hour ago,
  // not "nothing yet" until the rollup runs at midnight UTC.
  const eventDays = data
    ? [...data.history.map((d) => ({ date: d.date, events: d.events })), data.today].slice(
        -EVENT_CHART_DAYS,
      )
    : [];
  const eventDates = eventDays.map((e) => e.date);
  // History only starts accumulating from the first midnight UTC after this
  // shipped, so the level chart stays empty for a day — say so rather than
  // rendering a lonely single point.
  const historyDates = data?.history.map((d) => d.date) ?? [];

  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-display font-bold tracking-tight text-foreground">Usage</h1>
          <p className="mt-1 text-label text-muted">
            Every device that has connected LibreLinkUp or Dexcom, free users included.
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

      {!data ? (
        <div className="mt-8 rounded-[var(--radius-card)] border border-border-subtle bg-card p-10 text-center text-muted">
          {loading ? "Loading usage…" : "No data."}
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <Stat
              label="Getting readings · 24h"
              value={String(current!.readingLast24h ?? current!.activeLast24h)}
              hint={`${current!.readingLast7d ?? current!.activeLast7d} in the last 7 days · the real active count`}
              tone="accent"
            />
            <Stat
              label="Paying"
              value={String(current!.paid)}
              hint={`${pct(current!.paid)} · as reported by the app, includes your own phone`}
            />
            <Stat
              label="Trialing"
              value={String(current!.trialing)}
              hint="Full Pro access, no revenue yet"
            />
            <Stat label="Free" value={String(current!.free)} hint={pct(current!.free)} />
            <Stat
              label="Devices on the relay"
              value={String(current!.total)}
              hint={`${data.totals.last7d.signup ?? 0} new in the last 7 days · includes dormant ones`}
            />
            <Stat
              label="Signed out · 30d"
              value={String(data.totals.last30d.logout ?? 0)}
              hint={`${data.totals.last7d.logout ?? 0} in the last 7 days`}
            />
            <Stat
              label="App deleted · 30d"
              value={String(data.totals.last30d.uninstall ?? 0)}
              hint={`${data.totals.last7d.uninstall ?? 0} in the last 7 days · free users counted from 26 Oct`}
              tone={(data.totals.last30d.uninstall ?? 0) > 0 ? "warn" : "default"}
            />
            <Stat
              label="Failing sessions"
              value={String(current!.failing)}
              hint={`Sensor login expired or sharing off · ${current!.paused} paused`}
              tone={current!.failing > 0 ? "warn" : "default"}
            />
            <Stat
              label="Not polled"
              value={String(current!.neverPolled)}
              hint="Free users with alerts off: the relay has nothing to do for them"
            />
            <Stat
              label="Platform"
              value={`${current!.ios} / ${current!.android}`}
              hint={`iOS / Android${current!.unknownPlatform ? ` · ${current!.unknownPlatform} unknown (old rows)` : ""}`}
            />
          </div>

          <div className="mt-6 grid gap-3 lg:grid-cols-2">
            <Card
              title="Devices on the relay over time"
              subtitle="Running total of devices still registered today, by first-seen date. Deleted devices drop out of every day, so past days read low."
            >
              <LineChart
                dates={data.firstSeen.map((b) => b.date)}
                series={[
                  { label: "Connected", values: data.firstSeen.map((b) => b.cumulative) },
                ]}
              />
            </Card>

            <Card
              title="Fleet levels"
              subtitle="Closing level for each completed day, rolled up at 00:00 UTC."
            >
              <LineChart
                dates={historyDates}
                emptyMessage="Starts filling in after the first midnight UTC."
                series={[
                  { label: "Total", values: data.history.map((d) => d.levels.total) },
                  { label: "Paying", values: data.history.map((d) => d.levels.paid) },
                  { label: "Polled 7d", values: data.history.map((d) => d.levels.activeLast7d) },
                ]}
              />
            </Card>
          </div>

          {funnel ? (
            <>
              <h2 className="mt-10 text-headline font-bold text-foreground">Onboarding · last 30 days</h2>
              <p className="mt-1 text-label text-muted">
                Distinct devices that reached each step. A big drop shows where people give up.
              </p>
              <div className="mt-4 rounded-[var(--radius-card)] border border-border-subtle bg-card p-5">
                {FUNNEL_STEPS.map(({ step, label }) => {
                  const n = funnel[step];
                  const share = Math.round((n / (funnel.ob_welcome || 1)) * 100);
                  return (
                    <div
                      key={step}
                      className="grid grid-cols-[minmax(0,11rem)_1fr_auto] items-center gap-3 py-1.5"
                    >
                      <span className="text-label text-foreground">{label}</span>
                      <div className="h-2 rounded-full bg-accent-soft">
                        <div
                          className="h-2 rounded-full bg-accent"
                          style={{ width: `${Math.min(100, share)}%` }}
                        />
                      </div>
                      <span className="w-20 text-right text-label tabular-nums text-foreground">
                        {n} <span className="text-caption text-muted">{share}%</span>
                      </span>
                    </div>
                  );
                })}
                <p className="mt-3 text-caption text-muted">
                  {funnel.ob_offer_declined} closed the offer without buying. Last 7 days:{" "}
                  {data.funnel!.last7d.ob_welcome} opened, {data.funnel!.last7d.ob_connected}{" "}
                  connected, {data.funnel!.last7d.ob_purchase} started a trial or bought.
                </p>
              </div>
            </>
          ) : null}

          <h2 className="mt-10 text-headline font-bold text-foreground">Lifecycle events</h2>
          <p className="mt-1 text-label text-muted">
            Daily counts over the last 30 days, today included, with the 30-day total called out.
            Events are recorded from the day this shipped — earlier activity isn&apos;t backfilled.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LIFECYCLE_EVENTS.map((kind) => {
              const meta = EVENT_META[kind];
              return (
                <Card key={kind} title={meta.title} subtitle={meta.blurb}>
                  <p className="-mt-1 mb-3 text-display font-bold tabular-nums text-foreground">
                    {data.totals.last30d[kind] ?? 0}
                    <span className="ml-2 text-caption font-normal text-muted">last 30 days</span>
                  </p>
                  <BarChart
                    dates={eventDates}
                    values={eventDays.map((e) => e.events[kind] ?? 0)}
                    color={meta.color}
                    label={meta.title}
                  />
                </Card>
              );
            })}
          </div>

          <div className="mt-8 rounded-[var(--radius-card)] border border-border-subtle bg-card p-5">
            <h3 className="text-label font-bold text-foreground">How to read these</h3>
            <ul className="mt-2 space-y-1.5 text-caption text-muted">
              <li>
                <strong className="text-foreground">Per device, not per person.</strong>{" "}
                A reinstall
                mints a new device id, and one person on an iPhone and an iPad counts twice.
              </li>
              <li>
                <strong className="text-foreground">&ldquo;App deleted&rdquo; is inferred</strong>{" "}
                from Apple/Google reporting every push token dead. That also fires when someone
                revokes notification permission, and it can lag the real deletion until the device
                comes back online.
              </li>
              <li>
                <strong className="text-foreground">&ldquo;Signed out&rdquo;</strong> only counts
                sign-outs that reached the relay — a phone wiped while offline never sends one.
              </li>
              <li>
                <strong className="text-foreground">Paying</strong>{" "}
                is the tier each device last
                reported from RevenueCat, not billing truth. Reconcile against RevenueCat before
                anything financial.
              </li>
              <li>
                <strong className="text-foreground">Getting readings</strong>{" "}
                means the relay received a new sensor reading for the device, which needs no app
                launch: read it as &ldquo;still connected and wearing a sensor&rdquo;, not
                &ldquo;opened the app&rdquo;. Devices the relay doesn&apos;t poll (free with alerts
                off) never count here.
              </li>
              <li>
                <strong className="text-foreground">Same-day flips</strong>{" "}
                (Pro → free → Pro on one day) are left out of the event counts from 26 Oct: that is
                the app reporting free for a moment before RevenueCat answers.
              </li>
            </ul>
            <p className="mt-3 text-caption text-muted">
              Updated {new Date(data.generatedAt).toLocaleString("en-GB")}.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
