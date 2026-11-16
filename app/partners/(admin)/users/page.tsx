"use client";

/**
 * Users tab (route /partners/users) — find a device by the email the user
 * typed in the app, or by the Support ID from their support email.
 *
 * Calls GET /ref/admin/contact (relay) and lists the matching device rows.
 */

import { useState } from "react";
import { ApiError, UnauthorizedError, fetchContact, type ContactLookupRow } from "../../api";
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

  async function search(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      setDevices(await fetchContact(adminKey, query));
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
