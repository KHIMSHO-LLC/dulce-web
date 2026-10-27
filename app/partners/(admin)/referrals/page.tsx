"use client";

/**
 * Partners tab — influencers, their referral codes, how their people convert,
 * what they've earned and what is owed. Ranked by paying people, so the best
 * partner is always on top.
 *
 * Lives OUTSIDE app/[locale] deliberately — this is not a marketing page (no
 * i18n, no SEO). It talks to the relay's /ref/admin/* from the browser (see
 * ../../api.ts). Auth and the tab nav come from AdminGate in the layout.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  UnauthorizedError,
  createCode,
  createPartnerLink,
  deleteCode,
  fetchCodes,
  fetchOfferings,
  markPaid,
  partnerStatsUrl,
  patchCode,
  RELAY_URL,
  type NewCodeInput,
  type Offering,
  type RefCode,
} from "../../api";
import { useAdmin } from "../../AdminGate";
import { PartnerCard } from "../../PartnerCard";
import { PartnerForm } from "../../PartnerForm";
import { eur, pct } from "../../format";

type SortKey = "paying" | "conversion" | "revenue" | "owed" | "newest";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "paying", label: "Paying people" },
  { key: "conversion", label: "Conversion" },
  { key: "revenue", label: "Revenue" },
  { key: "owed", label: "Owed" },
  { key: "newest", label: "Newest" },
];

function sortValue(c: RefCode, key: SortKey): number {
  switch (key) {
    case "paying":
      return c.stats.paying * 1000 + c.stats.trials;
    case "conversion":
      return c.stats.claims ? c.stats.paying / c.stats.claims : -1;
    case "revenue":
      return c.revenue?.netEur ?? 0;
    case "owed":
      return c.owed.amount ?? 0;
    case "newest":
      return c.createdAt;
  }
}

function Kpi({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border-subtle bg-card p-4">
      <p className="text-caption uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-display font-bold tabular-nums text-foreground">{value}</p>
      {hint ? <p className="mt-0.5 text-caption text-muted">{hint}</p> : null}
    </div>
  );
}

export default function PartnersPage() {
  const { adminKey, onUnauthorized } = useAdmin();
  const [codes, setCodes] = useState<RefCode[]>([]);
  const [offerings, setOfferings] = useState<Offering[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyCode, setBusyCode] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  /** null = form closed, "new" = creating, otherwise the code being edited. */
  const [editing, setEditing] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("paying");
  const [query, setQuery] = useState("");

  const loadAll = useCallback(
    async (key: string) => {
      setLoading(true);
      setError(null);
      try {
        const [fetchedCodes, fetchedOfferings] = await Promise.all([fetchCodes(key), fetchOfferings(key)]);
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
    // Fetch-on-mount; setState happens past the await inside loadAll.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadAll(adminKey);
  }, [adminKey, loadAll]);

  async function guarded(action: () => Promise<void>): Promise<void> {
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

  const replace = (updated: RefCode) =>
    setCodes((prev) => prev.map((c) => (c.code === updated.code ? { ...c, ...updated } : c)));

  async function onBusy(code: string, action: () => Promise<void>) {
    setBusyCode(code);
    await guarded(action);
    setBusyCode(null);
  }

  async function handleSave(input: NewCodeInput): Promise<void> {
    if (editing === "new") {
      // Errors go back to the form (thrown), not the page banner.
      await createCode(adminKey, input);
      setNotice(`${input.partner?.name || input.code} added. Next: "Create partner link" and send it to them.`);
    } else {
      await patchCode(adminKey, input.code, {
        offeringId: input.offeringId,
        payout: input.payout,
        note: input.note,
        partner: input.partner,
        appleOfferCodes: input.appleOfferCodes,
      });
      setNotice(`${input.partner?.name || input.code} saved.`);
    }
    setEditing(null);
    await loadAll(adminKey);
  }

  async function handlePartnerLink(code: RefCode, renew: boolean): Promise<void> {
    await onBusy(code.code, async () => {
      let token = code.viewToken;
      if (!token || renew) {
        token = await createPartnerLink(adminKey, code.code);
        const viewToken = token;
        setCodes((prev) => prev.map((c) => (c.code === code.code ? { ...c, viewToken } : c)));
      }
      const url = partnerStatsUrl(window.location.origin, code.code, token);
      try {
        await navigator.clipboard.writeText(url);
        setNotice(`Partner link for ${code.partner?.name || code.code} copied. Send it only to them.`);
      } catch {
        setNotice(`Partner link for ${code.code}: ${url}`);
      }
    });
  }

  const totals = useMemo(() => {
    const t = { claims: 0, trials: 0, paying: 0, net: 0, earned: 0, owed: 0 };
    for (const c of codes) {
      t.claims += c.stats.claims;
      t.trials += c.stats.trials;
      t.paying += c.stats.paying;
      t.net += c.revenue?.netEur ?? 0;
      t.earned += c.earned?.amount ?? 0;
      t.owed += c.owed.amount ?? 0;
    }
    return t;
  }, [codes]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return codes
      .filter((c) => {
        if (!q) return true;
        const p = c.partner ?? {};
        return [c.code, p.name, p.email, p.tiktok, p.instagram, p.youtube, p.facebook, p.country]
          .filter(Boolean)
          .some((v) => v!.toLowerCase().includes(q));
      })
      .sort((a, b) => sortValue(b, sort) - sortValue(a, sort));
  }, [codes, query, sort]);

  const editingCode = editing && editing !== "new" ? codes.find((c) => c.code === editing) : undefined;

  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-display font-bold tracking-tight text-foreground">Partners</h1>
          <p className="mt-1 text-label text-muted">Influencers, their codes, who converts best and what you owe them.</p>
        </div>
        <div className="flex gap-2">
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
            onClick={() => setEditing("new")}
            className="h-10 px-4 rounded-[var(--radius-button-sm)] bg-accent text-white font-semibold hover:bg-accent-hover transition-colors"
          >
            New partner
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-6 rounded-[var(--radius-card)] border border-state-low/30 bg-state-low/10 p-4 text-label text-state-low">{error}</div>
      ) : null}
      {notice ? (
        <div className="mt-6 flex items-start justify-between gap-4 rounded-[var(--radius-card)] border border-state-in-range/30 bg-state-in-range/10 p-4 text-label text-foreground break-all">
          <span>{notice}</span>
          <button type="button" onClick={() => setNotice(null)} className="text-caption text-muted underline">
            dismiss
          </button>
        </div>
      ) : null}

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Kpi label="Partners" value={String(codes.length)} hint={`${codes.filter((c) => c.status === "active").length} active`} />
        <Kpi label="Entered a code" value={String(totals.claims)} />
        <Kpi label="Started trial" value={String(totals.trials)} hint={pct(totals.trials, totals.claims)} />
        <Kpi label="Paying" value={String(totals.paying)} hint={`${pct(totals.paying, totals.claims)} of codes entered`} />
        <Kpi label="Dulce net from partners" value={eur(totals.net)} hint={`partners earned ${eur(totals.earned)}`} />
        <Kpi label="Owed now" value={eur(totals.owed)} hint="all partners" />
      </div>

      {editing ? (
        <div className="mt-8">
          <PartnerForm
            key={editing}
            offerings={offerings}
            initial={editingCode}
            onSubmit={handleSave}
            onCancel={() => setEditing(null)}
          />
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1 rounded-[var(--radius-button-sm)] border border-border-subtle bg-card p-1" role="tablist" aria-label="Sort partners">
          {SORTS.map((s) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={sort === s.key}
              onClick={() => setSort(s.key)}
              className={`h-8 px-3 rounded-[var(--radius-button-sm)] text-caption font-semibold transition-colors ${
                sort === s.key ? "bg-accent text-white" : "text-muted hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, code, @handle…"
          className="h-10 w-full sm:w-72 px-3 rounded-[var(--radius-button-sm)] border border-border-subtle bg-card text-foreground"
        />
      </div>

      <div className="mt-4 space-y-4">
        {loading && codes.length === 0 ? (
          <div className="rounded-[var(--radius-card)] border border-border-subtle bg-card p-10 text-center text-muted">Loading partners…</div>
        ) : shown.length === 0 ? (
          <div className="rounded-[var(--radius-card)] border border-border-subtle bg-card p-10 text-center">
            <p className="text-body font-semibold text-foreground">{codes.length ? "No partner matches." : "No partners yet."}</p>
            {!codes.length ? (
              <p className="mt-1 text-label text-muted">Press &ldquo;New partner&rdquo; to add the first one.</p>
            ) : null}
          </div>
        ) : (
          shown.map((c, i) => (
            <PartnerCard
              key={c.code}
              code={c}
              rank={i + 1}
              busy={busyCode === c.code}
              onEdit={() => {
                setEditing(c.code);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onTogglePause={() =>
                onBusy(c.code, async () => {
                  replace(await patchCode(adminKey, c.code, { status: c.status === "active" ? "paused" : "active" }));
                })
              }
              onDelete={() =>
                onBusy(c.code, async () => {
                  await deleteCode(adminKey, c.code);
                  setCodes((prev) => prev.filter((x) => x.code !== c.code));
                })
              }
              onMarkPaid={() =>
                onBusy(c.code, async () => {
                  replace(await markPaid(adminKey, c.code));
                })
              }
              onPartnerLink={(renew) => handlePartnerLink(c, renew)}
            />
          ))
        )}
      </div>

      <section className="mt-10 rounded-[var(--radius-card)] border border-border-subtle bg-card p-5">
        <h2 className="text-label font-bold text-foreground">Onboarding a partner</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-caption text-muted">
          <li>New partner: name, socials, email, the code, the offer, and the deal.</li>
          <li>Create partner link and send it to them: their own page with people, earnings and payments.</li>
          <li>
            Their followers type the code in the app (Settings › Account › Invite code, or &ldquo;Have an invite code?&rdquo; on the paywall).
            With an Apple offer code added, a tap on{" "}
            <span className="font-mono">apps.apple.com/redeem?ctx=offercodes&amp;id=6770694596&amp;code=CODE</span> counts too.
          </li>
          <li>Pay monthly what &ldquo;Owed now&rdquo; shows, then press Mark paid.</li>
        </ol>
        <p className="mt-3 text-caption text-muted">
          Relay: <span className="font-mono">{RELAY_URL}</span>
        </p>
      </section>
    </div>
  );
}
