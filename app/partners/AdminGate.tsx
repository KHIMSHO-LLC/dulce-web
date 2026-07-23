"use client";

/**
 * Auth shell for every /partners page.
 *
 * The admin key the user pastes IS the relay's bearer token (REF_ADMIN_KEY).
 * It's held in sessionStorage only — cleared on tab close, never persisted,
 * never sent anywhere except the relay's Authorization header. Wrapping the
 * whole route group here (rather than per page) is what lets Referrals and
 * Usage share one login and one nav.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { RELAY_URL } from "./api";

const SESSION_KEY = "dulce_ref_admin_key";

interface AdminSession {
  adminKey: string;
  /** Call when the relay answers 401 — drops the key and shows the login form
   *  with an explanation, instead of leaving the page silently empty. */
  onUnauthorized: () => void;
}

const AdminContext = createContext<AdminSession | null>(null);

/** Only valid inside AdminGate's authenticated subtree, which is every page
 *  in this route group — hence the throw rather than a nullable return. */
export function useAdmin(): AdminSession {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminGate");
  return ctx;
}

const TABS = [
  { href: "/partners", label: "Referrals" },
  { href: "/partners/usage", label: "Usage" },
] as const;

function Nav({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname();
  return (
    <div className="border-b border-border-subtle bg-card/70 backdrop-blur">
      <div className="container-page flex flex-wrap items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-6">
          <span className="text-label font-bold text-foreground">Dulce admin</span>
          <nav className="flex items-center gap-1">
            {TABS.map((tab) => {
              const active = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className={`h-9 px-3 inline-flex items-center rounded-[var(--radius-button-sm)] text-label font-semibold transition-colors ${
                    active
                      ? "bg-accent-soft text-accent"
                      : "text-muted hover:text-foreground hover:bg-accent-soft/60"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="h-9 px-3 rounded-[var(--radius-button-sm)] border border-border-subtle bg-card text-label font-semibold text-foreground hover:bg-accent-soft transition-colors"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export function AdminGate({ children }: { children: React.ReactNode }) {
  // sessionStorage is read in an effect, NOT in a lazy useState initializer:
  // "use client" still means server-rendered HTML, and the server has no
  // session, so an initializer that finds a stored key makes the client render
  // the dashboard where the server rendered the login form — a hydration
  // mismatch that React resolves by throwing away and re-rendering the tree.
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Restore-session-on-mount; both setStates are the effect's whole purpose.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAdminKey(sessionStorage.getItem(SESSION_KEY));
    setHydrated(true);
  }, []);

  const [keyInput, setKeyInput] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const onUnauthorized = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setAdminKey(null);
    setLoginError("The key is no longer valid. Log in again.");
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setAdminKey(null);
    setLoginError(null);
  }, []);

  const session = useMemo<AdminSession | null>(
    () => (adminKey ? { adminKey, onUnauthorized } : null),
    [adminKey, onUnauthorized],
  );

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginError(null);
    const trimmed = keyInput.trim();
    if (!trimmed) {
      setLoginError("Enter the admin key.");
      return;
    }
    sessionStorage.setItem(SESSION_KEY, trimmed);
    setAdminKey(trimmed);
    setKeyInput("");
  }

  // Until the session is restored, render the bare page surface — showing the
  // login form first would flash it at every reload for an already-logged-in
  // admin.
  if (!hydrated) {
    return <div className="min-h-screen bg-warm-gradient" />;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-warm-gradient">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-card rounded-[var(--radius-card-lg)] border border-border-subtle shadow-[var(--shadow-card-rest)] p-8"
        >
          <h1 className="text-headline font-bold text-foreground">Dulce admin</h1>
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
            className="mt-4 w-full h-12 rounded-[var(--radius-button)] bg-accent text-white font-semibold hover:bg-accent-hover transition-colors"
          >
            Log in
          </button>

          <p className="mt-6 text-caption text-muted">
            Relay: <span className="font-mono">{RELAY_URL}</span>
          </p>
        </form>
      </div>
    );
  }

  return (
    <AdminContext.Provider value={session}>
      <div className="min-h-screen bg-warm-gradient">
        <Nav onLogout={handleLogout} />
        {children}
      </div>
    </AdminContext.Provider>
  );
}
