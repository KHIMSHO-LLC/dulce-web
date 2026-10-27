"use client";

/**
 * Create / edit a partner: who they are (contact + socials), their code and
 * the offer it unlocks, and how they're paid. One form for both, so the two
 * never drift apart. The code itself can't change once created (people have
 * already typed it and payments are filed under it).
 */

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import type { NewCodeInput, Offering, PartnerProfile, PayoutType, RefCode } from "./api";
import { eur } from "./format";

const CODE_PATTERN = /^[A-Z0-9]{2,20}$/;

const PAYOUT_OPTIONS: { type: PayoutType; label: string; hint: string }[] = [
  {
    type: "revshare",
    label: "Revenue share",
    hint: "A % of what Dulce actually receives (after Apple's fee and VAT), for each person's first months.",
  },
  { type: "per_paying", label: "Fixed € per paying person", hint: "Paid once, when the person's first payment arrives." },
  {
    type: "per_retained",
    label: "Fixed € per person who stays",
    hint: "Paid once, when the person pays a second time. Safer against instant cancellations.",
  },
  { type: "percent", label: "Other (note only)", hint: "Nothing is calculated; write the deal in the note." },
];

const inputClass =
  "h-10 w-full px-3 rounded-[var(--radius-button-sm)] border border-border-subtle bg-background text-foreground placeholder:text-muted/60";

function Field({ label, htmlFor, children, hint, className = "" }: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={htmlFor} className="text-caption font-semibold text-muted">
        {label}
      </label>
      {children}
      {hint ? <p className="text-caption text-muted">{hint}</p> : null}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <legend className="mb-3 text-label font-bold text-foreground">{title}</legend>
      {children}
    </fieldset>
  );
}

type Props = {
  offerings: Offering[] | null;
  /** Editing an existing code; absent when creating. */
  initial?: RefCode;
  onSubmit: (input: NewCodeInput) => Promise<void>;
  onCancel: () => void;
};

export function PartnerForm({ offerings, initial, onSubmit, onCancel }: Props) {
  const editing = Boolean(initial);
  const [code, setCode] = useState(initial?.code ?? "");
  const [partner, setPartner] = useState<PartnerProfile>(initial?.partner ?? {});
  const [offeringId, setOfferingId] = useState(initial?.offeringId ?? "");
  const [offerCodes, setOfferCodes] = useState((initial?.appleOfferCodes ?? []).join(", "));
  const [payoutType, setPayoutType] = useState<PayoutType>(initial?.payout.type ?? "revshare");
  const [amount, setAmount] = useState(String(initial?.payout.amount ?? 50));
  const [monthly, setMonthly] = useState(String(initial?.payout.monthlyPayments ?? 6));
  const [yearly, setYearly] = useState(String(initial?.payout.yearlyPayments ?? 1));
  const [note, setNote] = useState(initial?.note ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const set = (k: keyof PartnerProfile) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setPartner((p) => ({ ...p, [k]: e.target.value }));

  const isPercent = payoutType === "revshare" || payoutType === "percent";
  const amountNum = Number(amount);
  const monthlyNum = Number(monthly);
  const yearlyNum = Number(yearly);

  // A worked example so the deal is concrete before saving: one person on the
  // €2.99 monthly plan in Spain (21% VAT, Apple 15%) → Dulce nets ≈ €2.10.
  const exampleNet = (2.99 / 1.21) * 0.85;
  const example =
    payoutType === "revshare" && amountNum > 0
      ? `Example: a person in Spain paying €2.99/month earns the partner about ${eur((exampleNet * amountNum) / 100)} a month, for ${monthlyNum || 0} month${monthlyNum === 1 ? "" : "s"} (about ${eur(((exampleNet * amountNum) / 100) * (monthlyNum || 0))} in total).`
      : null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    if (!CODE_PATTERN.test(code)) return setFormError("Code must be 2–20 characters (A–Z, 0–9).");
    if (!offeringId.trim()) return setFormError("Pick the offer the code unlocks.");
    if (payoutType !== "percent" && (!Number.isFinite(amountNum) || amountNum <= 0)) {
      return setFormError("Enter a valid amount.");
    }
    if (payoutType === "revshare" && amountNum > 100) return setFormError("A share can't be over 100%.");
    setSubmitting(true);
    try {
      await onSubmit({
        code,
        offeringId: offeringId.trim(),
        payout: {
          type: payoutType,
          amount: Number.isFinite(amountNum) ? amountNum : 0,
          ...(payoutType === "revshare"
            ? { monthlyPayments: monthlyNum || 0, yearlyPayments: yearlyNum || 0 }
            : {}),
        },
        note: note.trim(),
        partner,
        appleOfferCodes: offerCodes
          .split(/[\s,]+/)
          .map((c) => c.trim().toUpperCase())
          .filter(Boolean),
      });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-[var(--radius-card-lg)] border border-border-subtle bg-card p-6 shadow-[var(--shadow-card-rest)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-headline font-bold text-foreground">
            {editing ? `Edit ${initial!.partner?.name || initial!.code}` : "New partner"}
          </h2>
          <p className="mt-1 text-label text-muted">
            Contact details and notes are only visible to you. The partner&apos;s page shows their name, numbers and deal.
          </p>
        </div>
      </div>

      <Section title="Partner">
        <Field label="Name" htmlFor="p-name">
          <input id="p-name" className={inputClass} value={partner.name ?? ""} onChange={set("name")} placeholder="Jedeen" />
        </Field>
        <Field label="Email" htmlFor="p-email">
          <input id="p-email" type="email" className={inputClass} value={partner.email ?? ""} onChange={set("email")} placeholder="name@example.com" />
        </Field>
        <Field label="Country" htmlFor="p-country">
          <input id="p-country" className={inputClass} value={partner.country ?? ""} onChange={set("country")} placeholder="US" />
        </Field>
        <Field label="Payout method" htmlFor="p-payout-method">
          <input id="p-payout-method" className={inputClass} value={partner.payoutMethod ?? ""} onChange={set("payoutMethod")} placeholder="PayPal: name@example.com" />
        </Field>
        <Field label="TikTok" htmlFor="p-tiktok">
          <input id="p-tiktok" className={inputClass} value={partner.tiktok ?? ""} onChange={set("tiktok")} placeholder="@handle or link" />
        </Field>
        <Field label="Instagram" htmlFor="p-instagram">
          <input id="p-instagram" className={inputClass} value={partner.instagram ?? ""} onChange={set("instagram")} placeholder="@handle or link" />
        </Field>
        <Field label="YouTube" htmlFor="p-youtube">
          <input id="p-youtube" className={inputClass} value={partner.youtube ?? ""} onChange={set("youtube")} placeholder="@handle or link" />
        </Field>
        <Field label="Facebook" htmlFor="p-facebook">
          <input id="p-facebook" className={inputClass} value={partner.facebook ?? ""} onChange={set("facebook")} placeholder="page name or link" />
        </Field>
      </Section>

      <Section title="Code and offer">
        <Field label="Code people type in the app" htmlFor="p-code" hint={editing ? "Can't be changed." : "2–20 letters or numbers."}>
          <input
            id="p-code"
            value={code}
            disabled={editing}
            onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))}
            placeholder="JEDEEN"
            maxLength={20}
            className={`${inputClass} font-mono uppercase tracking-wider disabled:opacity-60`}
          />
        </Field>
        <Field label="Offer the code unlocks" htmlFor="p-offering" hint="A RevenueCat offering: the prices the paywall shows.">
          {offerings ? (
            <select id="p-offering" value={offeringId} onChange={(e) => setOfferingId(e.target.value)} className={inputClass}>
              <option value="">Choose…</option>
              {offerings.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.displayName} ({o.id})
                </option>
              ))}
            </select>
          ) : (
            <input id="p-offering" value={offeringId} onChange={(e) => setOfferingId(e.target.value)} placeholder="influencer199" className={inputClass} />
          )}
        </Field>
        <Field
          label="Apple offer codes (optional)"
          htmlFor="p-offer-codes"
          className="sm:col-span-2"
          hint="Custom offer codes from App Store Connect, comma-separated. Anyone who redeems one counts for this partner, even without typing the code in the app."
        >
          <input
            id="p-offer-codes"
            value={offerCodes}
            onChange={(e) => setOfferCodes(e.target.value.toUpperCase())}
            placeholder="JEDEEN30, JEDEENYEAR"
            className={`${inputClass} font-mono`}
          />
        </Field>
      </Section>

      <Section title="How the partner is paid">
        <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-4">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="radiogroup" aria-label="Payout rule">
            {PAYOUT_OPTIONS.map((o) => (
              <button
                key={o.type}
                type="button"
                role="radio"
                aria-checked={payoutType === o.type}
                onClick={() => {
                  setPayoutType(o.type);
                  if (o.type === "revshare" && payoutType !== "revshare") setAmount("50");
                  if ((o.type === "per_paying" || o.type === "per_retained") && isPercent) setAmount("2");
                }}
                className={`rounded-[var(--radius-card)] border p-3 text-left transition-colors ${
                  payoutType === o.type
                    ? "border-accent bg-accent-soft"
                    : "border-border-subtle bg-background hover:bg-accent-soft/50"
                }`}
              >
                <span className="block text-label font-semibold text-foreground">{o.label}</span>
                <span className="mt-1 block text-caption text-muted">{o.hint}</span>
              </button>
            ))}
          </div>
        </div>
        <Field label={isPercent ? "Share (%)" : "Amount (€ per person)"} htmlFor="p-amount">
          <input id="p-amount" type="number" step="0.01" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} className={inputClass} />
        </Field>
        {payoutType === "revshare" ? (
          <>
            <Field label="Monthly plan: payments that count" htmlFor="p-monthly" hint="First N monthly payments of each person.">
              <input id="p-monthly" type="number" min="0" step="1" value={monthly} onChange={(e) => setMonthly(e.target.value)} className={inputClass} />
            </Field>
            <Field label="Yearly plan: payments that count" htmlFor="p-yearly" hint="1 = the first yearly payment only.">
              <input id="p-yearly" type="number" min="0" step="1" value={yearly} onChange={(e) => setYearly(e.target.value)} className={inputClass} />
            </Field>
          </>
        ) : null}
        {example ? <p className="text-caption text-muted sm:col-span-2 lg:col-span-4">{example}</p> : null}
        <Field label="Private note" htmlFor="p-note" className="sm:col-span-2 lg:col-span-4">
          <input id="p-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Agreed on TikTok DM 27 Oct; 2 videos/month; €70 minimum payout" className={inputClass} />
        </Field>
      </Section>

      {formError ? <p className="text-label text-state-low">{formError}</p> : null}

      <div className="flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="h-10 px-5 rounded-[var(--radius-button-sm)] border border-border-subtle bg-card text-foreground font-semibold hover:bg-accent-soft transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="h-10 px-6 rounded-[var(--radius-button-sm)] bg-accent text-white font-semibold hover:bg-accent-hover disabled:opacity-50 transition-colors"
        >
          {submitting ? "Saving…" : editing ? "Save changes" : "Create partner"}
        </button>
      </div>
    </form>
  );
}
