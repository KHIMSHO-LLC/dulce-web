"use client";

/**
 * Referrals tab — influencer codes, their conversions, and payouts owed.
 *
 * Lives OUTSIDE app/[locale] deliberately — this is not a marketing page
 * (no i18n, no SEO, no locale-prefixed URLs). It talks directly to the
 * relay's /ref/admin/* endpoints from the browser (see api.ts + the shared
 * contract). Auth and the tab nav come from AdminGate in the layout.
 */

import { useCallback, useEffect, useState } from "react";
import {
  UnauthorizedError,
  createCode,
  deleteCode,
  fetchCodes,
  fetchOfferings,
  markPaid,
  patchCode,
  RELAY_URL,
  type NewCodeInput,
  type Offering,
  type RefCode,
} from "./api";
import { AddCodeForm } from "./AddCodeForm";
import { CodesTable } from "./CodesTable";
import { useAdmin } from "./AdminGate";

export default function ReferralsPage() {
  const { adminKey, onUnauthorized } = useAdmin();

  const [codes, setCodes] = useState<RefCode[]>([]);
  const [offerings, setOfferings] = useState<Offering[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyCode, setBusyCode] = useState<string | null>(null);

  const loadAll = useCallback(
    async (key: string) => {
      setLoading(true);
      setError(null);
      try {
        const [fetchedCodes, fetchedOfferings] = await Promise.all([
          fetchCodes(key),
          fetchOfferings(key),
        ]);
        setCodes(fetchedCodes);
        setOfferings(fetchedOfferings);
      } catch (err) {
        if (err instanceof UnauthorizedError) {
          onUnauthorized();
          return;
        }
        setError(err instanceof Error ? err.message : "Unknown error while loading data.");
      } finally {
        setLoading(false);
      }
    },
    [onUnauthorized],
  );

  useEffect(() => {
    // Fetch-on-mount: setState happens inside loadAll's async body (after the
    // await), not synchronously in this effect — the lint rule can't see
    // through the async boundary. Standard data-fetch effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadAll(adminKey);
  }, [adminKey, loadAll]);

  async function withActionErrorHandling(action: () => Promise<void>): Promise<void> {
    try {
      await action();
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        onUnauthorized();
        return;
      }
      setError(err instanceof Error ? err.message : "Unknown error.");
    }
  }

  async function handleCreate(input: NewCodeInput): Promise<void> {
    await withActionErrorHandling(async () => {
      const created = await createCode(adminKey, input);
      setCodes((prev) => [...prev, created]);
    });
  }

  async function handleTogglePause(code: RefCode): Promise<void> {
    setBusyCode(code.code);
    await withActionErrorHandling(async () => {
      const updated = await patchCode(adminKey, code.code, {
        status: code.status === "active" ? "paused" : "active",
      });
      setCodes((prev) => prev.map((c) => (c.code === updated.code ? updated : c)));
    });
    setBusyCode(null);
  }

  async function handleDelete(code: RefCode): Promise<void> {
    setBusyCode(code.code);
    await withActionErrorHandling(async () => {
      await deleteCode(adminKey, code.code);
      setCodes((prev) => prev.filter((c) => c.code !== code.code));
    });
    setBusyCode(null);
  }

  async function handleMarkPaid(code: RefCode): Promise<void> {
    setBusyCode(code.code);
    await withActionErrorHandling(async () => {
      const updated = await markPaid(adminKey, code.code);
      setCodes((prev) => prev.map((c) => (c.code === updated.code ? updated : c)));
    });
    setBusyCode(null);
  }

  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-display font-bold tracking-tight text-foreground">Referrals</h1>
          <p className="mt-1 text-label text-muted">
            Referral codes, claims, conversions and pending payouts.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadAll(adminKey)}
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

      <div className="mt-8">
        <AddCodeForm offerings={offerings} onCreate={handleCreate} />
      </div>

      <div className="mt-6">
        {loading && codes.length === 0 ? (
          <div className="bg-card rounded-[var(--radius-card)] border border-border-subtle p-10 text-center text-muted">
            Loading codes…
          </div>
        ) : (
          <CodesTable
            codes={codes}
            busyCode={busyCode}
            onTogglePause={handleTogglePause}
            onDelete={handleDelete}
            onMarkPaid={handleMarkPaid}
          />
        )}
      </div>

      <p className="mt-6 text-caption text-muted">
        Relay: <span className="font-mono">{RELAY_URL}</span>
      </p>
    </div>
  );
}
