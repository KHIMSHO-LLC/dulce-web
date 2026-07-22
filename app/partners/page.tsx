"use client";

/**
 * Internal partners/influencer referral dashboard.
 *
 * Lives OUTSIDE app/[locale] deliberately — this is not a marketing page
 * (no i18n, no SEO, no locale-prefixed URLs). It talks directly to the
 * relay's /ref/admin/* endpoints from the browser (see api.ts + the shared
 * contract), authenticated with the admin key the user pastes into the
 * login form below. That key IS the bearer token — it's stored only in
 * sessionStorage (cleared on tab close) and never sent anywhere except the
 * relay's Authorization header.
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

const SESSION_KEY = "dulce_ref_admin_key";

export default function PartnersDashboardPage() {
  // Lazy initializer reads sessionStorage directly on first client render —
  // this page is "use client" only (its own root layout, no SSR content
  // depends on this), so there's no hydration mismatch to worry about.
  const [adminKey, setAdminKey] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem(SESSION_KEY);
  });
  const [keyInput, setKeyInput] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const [codes, setCodes] = useState<RefCode[]>([]);
  const [offerings, setOfferings] = useState<Offering[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyCode, setBusyCode] = useState<string | null>(null);

  const handleUnauthorized = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setAdminKey(null);
    setCodes([]);
    setOfferings(null);
    setLoginError("The key is no longer valid. Log in again.");
  }, []);

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
          handleUnauthorized();
          return;
        }
        setError(err instanceof Error ? err.message : "Unknown error while loading data.");
      } finally {
        setLoading(false);
      }
    },
    [handleUnauthorized],
  );

  useEffect(() => {
    if (adminKey) {
      // Fetch-on-mount/on-key-change: setState happens inside loadAll's async
      // body (after the await), not synchronously in this effect — the lint
      // rule can't see through the async boundary. Standard data-fetch effect.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void loadAll(adminKey);
    }
  }, [adminKey, loadAll]);

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginError(null);
    const trimmed = keyInput.trim();
    if (!trimmed) {
      setLoginError("Enter the admin key.");
      return;
    }
    setLoggingIn(true);
    sessionStorage.setItem(SESSION_KEY, trimmed);
    setAdminKey(trimmed);
    setKeyInput("");
    setLoggingIn(false);
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAdminKey(null);
    setCodes([]);
    setOfferings(null);
  }

  async function withActionErrorHandling(action: () => Promise<void>): Promise<void> {
    try {
      await action();
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        handleUnauthorized();
        return;
      }
      setError(err instanceof Error ? err.message : "Unknown error.");
    }
  }

  async function handleCreate(input: NewCodeInput): Promise<void> {
    if (!adminKey) return;
    await withActionErrorHandling(async () => {
      const created = await createCode(adminKey, input);
      setCodes((prev) => [...prev, created]);
    });
  }

  async function handleTogglePause(code: RefCode): Promise<void> {
    if (!adminKey) return;
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
    if (!adminKey) return;
    setBusyCode(code.code);
    await withActionErrorHandling(async () => {
      await deleteCode(adminKey, code.code);
      setCodes((prev) => prev.filter((c) => c.code !== code.code));
    });
    setBusyCode(null);
  }

  async function handleMarkPaid(code: RefCode): Promise<void> {
    if (!adminKey) return;
    setBusyCode(code.code);
    await withActionErrorHandling(async () => {
      const updated = await markPaid(adminKey, code.code);
      setCodes((prev) => prev.map((c) => (c.code === updated.code ? updated : c)));
    });
    setBusyCode(null);
  }

  if (!adminKey) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-warm-gradient">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-card rounded-[var(--radius-card-lg)] border border-border-subtle shadow-[var(--shadow-card-rest)] p-8"
        >
          <h1 className="text-headline font-bold text-foreground">Partners dashboard</h1>
          <p className="mt-1 text-label text-muted">Internal access — enter the admin key.</p>

          <label htmlFor="admin-key" className="sr-only">
            Admin key
          </label>
          <input
            id="admin-key"
            type="password"
            autoComplete="off"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Admin key"
            className="mt-6 w-full h-12 px-4 rounded-[var(--radius-button)] border border-border-subtle bg-background text-foreground"
          />

          {loginError ? <p className="mt-2 text-label text-state-low">{loginError}</p> : null}

          <button
            type="submit"
            disabled={loggingIn}
            className="mt-4 w-full h-12 rounded-[var(--radius-button)] bg-accent text-white font-semibold hover:bg-accent-hover disabled:opacity-50 transition-colors"
          >
            Log in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-gradient">
      <div className="container-page py-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-display font-bold tracking-tight text-foreground">Partners dashboard</h1>
            <p className="mt-1 text-label text-muted">
              Referral codes, claims, conversions and pending payouts.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => void loadAll(adminKey)}
              disabled={loading}
              className="h-10 px-4 rounded-[var(--radius-button-sm)] border border-border-subtle bg-card text-foreground font-semibold hover:bg-accent-soft disabled:opacity-50 transition-colors"
            >
              {loading ? "Refreshing…" : "Refresh"}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="h-10 px-4 rounded-[var(--radius-button-sm)] border border-border-subtle bg-card text-foreground font-semibold hover:bg-accent-soft transition-colors"
            >
              Log out
            </button>
          </div>
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
              Cargando códigos…
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
    </div>
  );
}
