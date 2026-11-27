"use client";

/**
 * Users tab (route /partners/users) — find a device by the email the user
 * typed in the app, or by the Support ID from their support email.
 *
 * Calls GET /ref/admin/contact (relay) and lists the matching device rows.
 * Each card can give free months of Pro (POST /ref/admin/grant, a RevenueCat
 * promotional entitlement that runs alongside any paid plan).
 */

import { useEffect, useState } from "react";
import {
  ApiError,
  GRANT_MONTHS,
  UnauthorizedError,
  fetchContact,
  grantFreeMonths,
  type ContactLookupRow,
  type GrantMonths,
} from "../../api";
import { useAdmin } from "../../AdminGate";
import { dateTime, shortDay } from "../../format";

function ago(ms: number): string {
  const min = Math.max(0, Math.round((Date.now() - ms) / 60000));
  if (min < 60) return `${min} min ago`;
  const h = Math.round(min / 60);
  if (h < 48) return `${h} h ago`;
  return `${Math.round(h / 24)} days ago`;
}

function Copy({ text }: { text: string }) {
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
      className="ml-2 text-caption font-semibold text-accent hover:underline"
    >
      {done ? "Copied" : "Copy"}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-caption uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-0.5 text-label text-foreground break-all">{children}</p>
    </div>
  );
}

const day = (ms: number | null) => (ms === null ? "—" : shortDay(ms));

/** Same rule as the relay (lib/rcGrant.ts addMonths): calendar months, day clamped to the month end. */
function addMonths(from: number, months: number): number {
  const d = new Date(from);
  const dayOfMonth = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + months);
  const last = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(dayOfMonth, last));
  return d.getTime();
}

/** Plain-language facts about where a device's Pro comes from (works against relays without proSource). */
function proFacts(d: ContactLookupRow): { source: string; gift: string | null } {
  const gift = d.promoUntil && d.promoUntil > Date.now() ? `until ${shortDay(d.promoUntil)}` : null;
  const plan = d.storePlan;
  let source: string;
  switch (d.proSource) {
    case "store": {
      const kind = plan?.period ? `${plan.period} ` : "";
      const ends = plan?.endsAt ? `${plan.willRenew === false ? "ends" : "renews"} ${shortDay(plan.endsAt)}` : "";
      source = `Paid: ${kind}store subscription${ends ? `, ${ends}` : ""}`;
      break;
    }
    case "trial":
      source = plan?.state === "paid" ? "Trial: store free trial" : "Trial";
      break;
    case "gift":
      source = "Paid by a gift only (no store subscription)";
      break;
    case "free":
      source = "Free";
      break;
    case "unknown":
      source =
        d.storePlan?.state === "unknown"
          ? "Pro, but the store plan could not be checked"
          : "Pro, source unclear";
      break;
    default:
      // Relay without the store-plan check: only tier + promoUntil are known.
      source = d.tier === "free" ? "Free" : d.tier === "trial" ? "Trial" : "Pro (store plan not checked, relay not updated)";
  }
  return { source, gift };
}

/** Warning shown before a gift when a store plan already pays (null = none needed). */
function paidWarning(d: ContactLookupRow): string | null {
  if (d.proSource !== "store" && !(d.proSource === "trial" && d.storePlan?.state === "paid")) return null;
  const plan = d.storePlan;
  const kind = plan?.period ? `${plan.period}, ` : "";
  const when = plan?.endsAt
    ? `${plan.willRenew === false ? "ends" : "renews"} ${shortDay(plan.endsAt)}`
    : "end date unknown";
  const verb = d.proSource === "trial" ? "is on a free store trial of Pro" : "already pays for Pro";
  return `This person ${verb} (${kind}${when}). A gift runs alongside the paid plan: it adds nothing unless their plan ends before the gift does.`;
}

const inputClass =
  "h-10 px-3 rounded-[var(--radius-button-sm)] border border-border-subtle bg-card text-foreground";
const buttonClass =
  "h-10 px-4 rounded-[var(--radius-button-sm)] border border-border-subtle bg-card text-foreground font-semibold hover:bg-accent-soft disabled:opacity-50 transition-colors";

function GiveFreeMonths({ d }: { d: ContactLookupRow }) {
  const { adminKey, onUnauthorized } = useAdmin();
  const [months, setMonths] = useState<GrantMonths>(1);
  const [note, setNote] = useState("");
  /** Set when "Give free months" is clicked: the end date the confirm step shows. */
  const [preview, setPreview] = useState<{ end: number; stacked: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  /** Extra confirmation when a paid plan already exists. */
  const [ack, setAck] = useState(false);
  const warning = paidWarning(d);
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);
  const [promoUntil, setPromoUntil] = useState<number | null>(d.promoUntil ?? null);

  if (!d.rcAppUserId) {
    return (
      <p className="text-caption text-muted">
        Free months: not possible, this device never reported a RevenueCat id (app older than 1.0.5 or never
        opened the paywall).
      </p>
    );
  }

  function openConfirm(): void {
    setAck(false);
    const now = Date.now();
    const stacked = promoUntil !== null && promoUntil > now;
    setPreview({ end: addMonths(stacked ? promoUntil : now, months), stacked });
  }

  async function give(): Promise<void> {
    setBusy(true);
    setResult(null);
    try {
      const expiresAt = await grantFreeMonths(adminKey, d.supportId, months, note);
      setPromoUntil(expiresAt);
      setResult({ ok: true, text: `Done: Pro until ${dateTime(expiresAt)}.` });
      setNote("");
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        onUnauthorized();
        return;
      }
      setResult({ ok: false, text: err instanceof Error ? err.message : "Unknown error." });
    } finally {
      setBusy(false);
      setPreview(null);
    }
  }

  return (
    <div>
      <p className="text-caption uppercase tracking-wide text-muted">Give free months</p>
      {warning ? (
        <p
          role="alert"
          className="mt-2 rounded-[var(--radius-card)] border border-[var(--color-high)]/50 bg-[var(--color-high)]/10 p-3 text-label text-foreground"
        >
          <strong>Already paying.</strong> {warning}
        </p>
      ) : d.proSource === "unknown" && d.storePlan?.state === "unknown" ? (
        <p className="mt-2 text-caption text-muted">
          Could not check the store plan (RevenueCat did not answer). If this person pays, a gift adds nothing
          unless their plan ends first.
        </p>
      ) : null}
      {preview ? (
        <div className="mt-2 rounded-[var(--radius-card)] border border-border-subtle bg-accent-soft/40 p-3 text-label text-foreground">
          <p>
            Give <strong>{months} {months === 1 ? "month" : "months"}</strong> of Pro to{" "}
            <strong>{d.email ?? "this device"}</strong>
            <br />
            <span className="font-mono text-caption">Support ID {d.supportId}</span>
          </p>
          <p className="mt-1">
            Pro until about <strong>{shortDay(preview.end)}</strong>
            {preview.stacked ? " (added after the current free period)" : ""}. A paid plan keeps running
            alongside, it is not extended or refunded.
          </p>
          {note.trim() ? <p className="mt-1 text-caption text-muted">Note: {note.trim()}</p> : null}
          {warning ? (
            <label className="mt-3 flex items-start gap-2 text-label text-foreground">
              <input
                type="checkbox"
                checked={ack}
                onChange={(e) => setAck(e.target.checked)}
                className="mt-1"
              />
              <span>They already pay. Give the free months anyway.</span>
            </label>
          ) : null}
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              disabled={busy || (warning !== null && !ack)}
              onClick={() => void give()}
              className={buttonClass}
            >
              {busy ? "Giving…" : "Confirm"}
            </button>
            <button type="button" disabled={busy} onClick={() => setPreview(null)} className={buttonClass}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex flex-wrap gap-2">
          <select
            value={months}
            onChange={(e) => setMonths(Number(e.target.value) as GrantMonths)}
            aria-label="Months"
            className={inputClass}
          >
            {GRANT_MONTHS.map((m) => (
              <option key={m} value={m}>
                {m} {m === 1 ? "month" : "months"}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={200}
            placeholder="Note (optional, e.g. sensor outage)"
            aria-label="Note"
            className={`${inputClass} min-w-[220px] flex-1`}
          />
          <button type="button" onClick={openConfirm} className={buttonClass}>
            Give free months
          </button>
        </div>
      )}
      {result ? (
        <p className={`mt-2 text-label ${result.ok ? "text-foreground" : "text-state-low"}`}>{result.text}</p>
      ) : null}
    </div>
  );
}

function DeviceCard({ d }: { d: ContactLookupRow }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border-subtle bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-label font-bold text-foreground">{d.email ?? "No email"}</h3>
          {d.email ? (
            <p className="mt-0.5 text-caption text-muted">
              {d.emailSource ?? "—"}
              {d.emailUpdatedAt !== null ? ` · saved ${dateTime(d.emailUpdatedAt)}` : ""}
            </p>
          ) : null}
        </div>
        <span className="text-caption font-semibold text-muted">
          {d.registered ? "Registered" : "Not registered (signed out or dropped)"}
        </span>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Support ID">
          <span className="font-mono select-all">{d.supportId}</span>
          <Copy text={d.supportId} />
        </Field>
        <Field label="Log tag">
          <span className="font-mono select-all">{d.logTag}</span>
        </Field>
        <Field label="RevenueCat id">
          {d.rcAppUserId ? (
            <>
              <span className="font-mono select-all">{d.rcAppUserId}</span>
              <Copy text={d.rcAppUserId} />
            </>
          ) : (
            "—"
          )}
        </Field>
        <Field label="App">
          {d.platform ?? "—"} · {d.appVersion ?? "—"}
          {d.appBuild ? ` (${d.appBuild})` : ""}
        </Field>
        <Field label="Tier">{d.tier ?? "—"}</Field>
        <Field label="Pro comes from">{proFacts(d).source}</Field>
        <Field label="Gift (free months)">
          {proFacts(d).gift ?? (d.promoUntil ? `ended ${shortDay(d.promoUntil)}` : "none")}
        </Field>
        <Field label="CGM source">{d.cgmProvider ?? "—"}</Field>
        <Field label="First seen">{day(d.firstSeenAt)}</Field>
        <Field label="Last reading">
          {d.lastReadingAt === null ? "—" : `${ago(d.lastReadingAt)} · ${dateTime(d.lastReadingAt)}`}
        </Field>
        <Field label="Failures">
          {d.consecutiveFailures ?? "—"}
          {d.lastError ? ` · ${d.lastError}` : ""}
        </Field>
        <Field label="Followers">{d.followers}</Field>
        <Field label="Refunded">{day(d.refundedAt)}</Field>
        <Field label="Lapsed">{day(d.lapsedAt)}</Field>
        <Field label="Referral code">{d.referralCode ?? "—"}</Field>
        <Field label="Cancel reason">{d.cancelReason ?? "—"}</Field>
        <Field label="Free Pro until">
          {d.promoUntil ? dateTime(d.promoUntil) : "—"}
          {d.lastGrant
            ? ` · last grant ${d.lastGrant.months} mo on ${shortDay(d.lastGrant.at)}${d.lastGrant.note ? ` (${d.lastGrant.note})` : ""}`
            : ""}
        </Field>
      </div>

      <div className="mt-5 border-t border-border-subtle pt-4">
        <GiveFreeMonths d={d} />
      </div>
    </div>
  );
}

export default function UsersPage() {
  const { adminKey, onUnauthorized } = useAdmin();
  const [query, setQuery] = useState("");
  const [devices, setDevices] = useState<ContactLookupRow[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(q: string): Promise<void> {
    if (!q.trim()) return;
    setLoading(true);
    setError(null);
    try {
      setDevices(await fetchContact(adminKey, q));
    } catch (err) {
      setDevices(null);
      if (err instanceof UnauthorizedError) {
        onUnauthorized();
        return;
      }
      setError(err instanceof ApiError || err instanceof Error ? err.message : "Unknown error while searching.");
    } finally {
      setLoading(false);
    }
  }

  function search(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    return run(query);
  }

  // Opened from another tab with ?q=<email or Support ID> (Cancellations): search at once.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (!q) return;
    // After mount, not in the effect body (react-hooks/set-state-in-effect).
    void Promise.resolve().then(() => {
      setQuery(q);
      return run(q);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-page py-10">
      <h1 className="text-display font-bold tracking-tight text-foreground">Users</h1>
      <p className="mt-1 text-label text-muted">Find a device by contact email or Support ID.</p>

      <form onSubmit={(e) => void search(e)} className="mt-6 flex flex-wrap gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Email or Support ID"
          aria-label="Email or Support ID"
          className="h-10 min-w-[280px] flex-1 px-3 rounded-[var(--radius-button-sm)] border border-border-subtle bg-card text-foreground"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="h-10 px-4 rounded-[var(--radius-button-sm)] border border-border-subtle bg-card text-foreground font-semibold hover:bg-accent-soft disabled:opacity-50 transition-colors"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>
      <p className="mt-2 text-caption text-muted">
        Email the user typed in the app, or the Support ID from their support email.
      </p>

      {error ? (
        <div className="mt-6 rounded-[var(--radius-card)] border border-state-low/30 bg-state-low/10 p-4 text-label text-state-low">
          {error}
        </div>
      ) : null}

      {devices ? (
        devices.length === 0 ? (
          <div className="mt-6 rounded-[var(--radius-card)] border border-border-subtle bg-card p-10 text-center text-muted">
            No device found.
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {devices.map((d) => (
              <DeviceCard key={d.supportId} d={d} />
            ))}
          </div>
        )
      ) : null}
    </div>
  );
}
