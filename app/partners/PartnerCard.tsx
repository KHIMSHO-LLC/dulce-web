"use client";

/**
 * One partner (one referral code) on the Partners tab: who they are, how their
 * people move through the funnel, what they've earned and what is owed, and
 * every action on the code.
 */

import { useState } from "react";
import type { RefCode } from "./api";
import { SOCIALS, eur, flag, monthLabel, payoutLabel, pct, shortDay, socialUrl } from "./format";

/** Actions that need confirmation get an inline confirm instead of window.confirm. */
export function ConfirmButton({
  label,
  confirmLabel,
  className,
  disabled,
  onConfirm,
}: {
  label: string;
  confirmLabel: string;
  className: string;
  disabled?: boolean;
  onConfirm: () => Promise<void>;
}) {
  const [confirming, setConfirming] = useState(false);
  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2">
        <button
          type="button"
          disabled={disabled}
          onClick={async () => {
            setConfirming(false);
            await onConfirm();
          }}
          className={className}
        >
          {confirmLabel}
        </button>
        <button type="button" onClick={() => setConfirming(false)} className="text-caption text-muted underline underline-offset-2">
          cancel
        </button>
      </span>
    );
  }
  return (
    <button type="button" disabled={disabled} onClick={() => setConfirming(true)} className={className}>
      {label}
    </button>
  );
}

function FunnelStep({ label, value, of, first }: { label: string; value: number; of: number; first?: boolean }) {
  return (
    <div className="min-w-0 rounded-[var(--radius-card)] bg-background px-3 py-2.5">
      <p className="truncate text-caption text-muted">{label}</p>
      <p className="mt-0.5 flex items-baseline gap-1.5">
        <span className="text-headline font-bold tabular-nums text-foreground">{value}</span>
        {!first ? <span className="text-caption tabular-nums text-muted">{pct(value, of)}</span> : null}
      </p>
    </div>
  );
}

function Money({ label, value, strong, hint }: { label: string; value: string; strong?: boolean; hint?: string }) {
  return (
    <div className="min-w-0">
      <p className="text-caption text-muted">{label}</p>
      <p className={`tabular-nums ${strong ? "text-headline font-bold text-accent" : "text-body font-semibold text-foreground"}`}>{value}</p>
      {hint ? <p className="text-caption text-muted">{hint}</p> : null}
    </div>
  );
}

const linkBtn = "text-caption font-semibold text-accent hover:text-accent-hover disabled:opacity-50";

type Props = {
  code: RefCode;
  rank: number;
  busy: boolean;
  onEdit: () => void;
  onTogglePause: () => Promise<void>;
  onDelete: () => Promise<void>;
  onMarkPaid: () => Promise<void>;
  onPartnerLink: (renew: boolean) => Promise<void>;
};

export function PartnerCard({ code: c, rank, busy, onEdit, onTogglePause, onDelete, onMarkPaid, onPartnerLink }: Props) {
  const [showMonths, setShowMonths] = useState(false);
  const p = c.partner ?? {};
  const socials = SOCIALS.map((s) => ({ ...s, url: socialUrl(s.key, p[s.key]) })).filter((s) => s.url);
  const owed = c.owed.amount;
  const months = (c.months ?? []).slice().reverse();
  const isRevshare = c.payout.type === "revshare";

  return (
    <article className="rounded-[var(--radius-card-lg)] border border-border-subtle bg-card p-5 shadow-[var(--shadow-card-rest)]">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-label font-bold text-accent">
            {rank}
          </span>
          <div className="min-w-0">
            <h3 className="flex flex-wrap items-center gap-2 text-headline font-bold text-foreground">
              <span className="truncate">{p.name || c.code}</span>
              {p.country ? <span title={p.country}>{flag(p.country) || p.country}</span> : null}
              <span className="rounded-[var(--radius-badge)] bg-background px-2 py-0.5 font-mono text-caption font-bold tracking-wider text-foreground">
                {c.code}
              </span>
              <span
                className={`rounded-[var(--radius-badge)] px-2 py-0.5 text-caption font-semibold ${
                  c.status === "active" ? "bg-state-in-range/10 text-state-in-range" : "bg-state-slightly-low/10 text-state-slightly-low"
                }`}
              >
                {c.status === "active" ? "Active" : "Paused"}
              </span>
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-caption">
              {socials.map((s) => (
                <a key={s.key} href={s.url!} target="_blank" rel="noreferrer" className="font-semibold text-accent hover:text-accent-hover">
                  {s.label}
                </a>
              ))}
              {p.email ? (
                <a href={`mailto:${p.email}`} className="text-muted hover:text-foreground">
                  {p.email}
                </a>
              ) : null}
              {!socials.length && !p.email ? (
                <button type="button" onClick={onEdit} className="text-muted underline underline-offset-2">
                  Add contact and socials
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="sm:text-right">
          <p className="text-caption text-muted">Owed now</p>
          <p className="text-display font-bold tabular-nums text-foreground">{owed === null ? "—" : eur(owed)}</p>
          <p className="text-caption text-muted">
            {c.paidThrough ? `last paid ${shortDay(c.paidThrough)}` : "never paid"}
          </p>
        </div>
      </header>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        <FunnelStep label="Entered code" value={c.stats.claims} of={c.stats.claims} first />
        <FunnelStep label="Started trial" value={c.stats.trials} of={c.stats.claims} />
        <FunnelStep label="Paying" value={c.stats.paying} of={c.stats.claims} />
        <FunnelStep label="Paid 2nd time" value={c.stats.retained} of={c.stats.paying} />
        <FunnelStep label="Cancelled" value={c.stats.cancelled} of={c.stats.paying} />
      </div>
      <p className="mt-1 text-caption text-muted">
        % of people who entered the code; &ldquo;Paid 2nd time&rdquo; and &ldquo;Cancelled&rdquo; are % of paying.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Money label="Dulce received (net)" value={eur(c.revenue?.netEur ?? 0)} hint={`${c.revenue?.payments ?? 0} payments${c.revenue?.refunds ? ` · ${c.revenue.refunds} refunded` : ""}`} />
        <Money label="Partner earned" value={c.earned?.amount != null ? eur(c.earned.amount) : "—"} />
        <Money label="Dulce keeps" value={c.earned?.amount != null ? eur((c.revenue?.netEur ?? 0) - c.earned.amount) : "—"} />
        <Money label="Deal" value={payoutLabel(c.payout)} />
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-caption text-muted">
        <span>
          Offer: <span className="font-mono text-foreground">{c.offeringId}</span>
        </span>
        {c.appleOfferCodes?.length ? (
          <span>
            Apple offer codes: <span className="font-mono text-foreground">{c.appleOfferCodes.join(", ")}</span>
          </span>
        ) : null}
        {p.payoutMethod ? <span>Pay via: <span className="text-foreground">{p.payoutMethod}</span></span> : null}
        <span>Since {shortDay(c.createdAt)}</span>
        {c.note ? <span className="italic">“{c.note}”</span> : null}
      </div>

      {months.length ? (
        <div className="mt-3">
          <button type="button" onClick={() => setShowMonths((v) => !v)} className={linkBtn}>
            {showMonths ? "Hide months" : `Show ${months.length} month${months.length === 1 ? "" : "s"}`}
          </button>
          {showMonths ? (
            <table className="mt-2 w-full text-left text-label">
              <thead>
                <tr className="text-caption uppercase tracking-wider text-muted">
                  <th className="py-1 font-semibold">Month</th>
                  <th className="py-1 text-right font-semibold">Payments</th>
                  <th className="py-1 text-right font-semibold">Dulce net</th>
                  <th className="py-1 text-right font-semibold">Partner share</th>
                </tr>
              </thead>
              <tbody>
                {months.map((m) => (
                  <tr key={m.month} className="border-t border-border-subtle">
                    <td className="py-1.5">{monthLabel(m.month)}</td>
                    <td className="py-1.5 text-right tabular-nums">{m.payments}</td>
                    <td className="py-1.5 text-right tabular-nums">{eur(m.netEur ?? 0)}</td>
                    <td className="py-1.5 text-right font-semibold tabular-nums">{eur(m.share)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      ) : null}

      <footer className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border-subtle pt-3">
        <button type="button" disabled={busy} onClick={() => void onPartnerLink(false)} className={linkBtn}>
          {c.viewToken ? "Copy partner link" : "Create partner link"}
        </button>
        {c.viewToken ? (
          <ConfirmButton label="New link" confirmLabel="Confirm (old link stops working)" disabled={busy} className={linkBtn} onConfirm={() => onPartnerLink(true)} />
        ) : null}
        <button type="button" disabled={busy} onClick={onEdit} className={linkBtn}>
          Edit
        </button>
        <ConfirmButton
          label={owed ? `Mark ${eur(owed)} paid` : "Mark paid"}
          confirmLabel="Confirm (owed resets from now)"
          disabled={busy}
          className={linkBtn}
          onConfirm={onMarkPaid}
        />
        <button type="button" disabled={busy} onClick={() => void onTogglePause()} className={linkBtn}>
          {c.status === "active" ? "Pause" : "Resume"}
        </button>
        <ConfirmButton
          label="Delete"
          confirmLabel="Confirm delete"
          disabled={busy}
          className="text-caption font-semibold text-state-low hover:opacity-80 disabled:opacity-50"
          onConfirm={onDelete}
        />
        {isRevshare ? (
          <span className="ml-auto text-caption text-muted">Shares are taken from RevenueCat&apos;s net, after Apple&apos;s fee and VAT.</span>
        ) : null}
      </footer>
    </article>
  );
}
