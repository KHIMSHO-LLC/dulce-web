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
  type LifecycleEvent,
  type UsageResponse,
} from "../api";
import { useAdmin } from "../AdminGate";
import { BarChart, LineChart } from "../charts";

/** Status colours, deliberately NOT the categorical series palette: these
 *  encode good/bad state, and each ships with its own title so the colour is
 *  never the only signal. */
const EVENT_META: Record<
  LifecycleEvent,
  { title: string; blurb: string; color: string }
> = {
  signup: {
    title: "New connections",
    blurb: "Connected a LibreLinkUp account for the first time",
    color: "#2E7D32",
  },
  upgrade: {
    title: "Upgrades",
    blurb: "Went from free to paid",
    color: "#C2410C",
  },
  downgrade: {
    title: "Downgrades",
    blurb: "Subscription lapsed back to free",
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
            Everyone who has connected a LibreLinkUp account — free users included.
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
              label="Connected accounts"
              value={String(current!.total)}
              hint={`${data.totals.last7d.signup} new in the last 7 days`}
              tone="accent"
            />
            <Stat
              label="Paying"
              value={String(current!.paid)}
              hint={`${pct(current!.paid)} · excludes trials`}
            />
            <Stat
              label="Trialing"
              value={String(current!.trialing)}
              hint="Full Pro access, no revenue yet"
            />
            <Stat label="Free" value={String(current!.free)} hint={pct(current!.free)} />
            <Stat
              label="Active · 24h"
              value={String(current!.activeLast24h)}
              hint={`${current!.activeLast7d} in the last 7 days`}
            />
            <Stat
              label="Signed out · 30d"
              value={String(data.totals.last30d.logout)}
              hint={`${data.totals.last7d.logout} in the last 7 days`}
            />
            <Stat
              label="App deleted · 30d"
              value={String(data.totals.last30d.uninstall)}
              hint={`${data.totals.last7d.uninstall} in the last 7 days`}
              tone={data.totals.last30d.uninstall > 0 ? "warn" : "default"}
            />
            <Stat
              label="Failing sessions"
              value={String(current!.failing)}
              hint="LibreLinkUp login expired or sharing revoked"
              tone={current!.failing > 0 ? "warn" : "default"}
            />
            <Stat
              label="Platform"
              value={`${current!.ios} / ${current!.android}`}
              hint={`iOS / Android · ${current!.neverPolled} never polled`}
            />
          </div>

          <div className="mt-6 grid gap-3 lg:grid-cols-2">
            <Card
              title="Connected accounts over time"
              subtitle="Cumulative, from each device's registration date — reaches back before event tracking existed."
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
                  { label: "Active 7d", values: data.history.map((d) => d.levels.activeLast7d) },
                ]}
              />
            </Card>
          </div>

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
                    {data.totals.last30d[kind]}
                    <span className="ml-2 text-caption font-normal text-muted">last 30 days</span>
                  </p>
                  <BarChart
                    dates={eventDates}
                    values={eventDays.map((e) => e.events[kind])}
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
                <strong className="text-foreground">Active</strong>{" "}
                means the relay successfully
                polled the device&apos;s LibreLinkUp session, which needs no app launch — read it as
                &ldquo;still installed and connected&rdquo;, not &ldquo;opened the app&rdquo;.
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
