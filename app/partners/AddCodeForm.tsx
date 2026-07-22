"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { NewCodeInput, Offering, PayoutType } from "./api";

type Props = {
  offerings: Offering[] | null;
  onCreate: (input: NewCodeInput) => Promise<void>;
};

const CODE_PATTERN = /^[A-Z0-9]{2,20}$/;

const PAYOUT_LABELS: Record<PayoutType, string> = {
  per_paying: "Per paying user (€ per conversion)",
  per_retained: "Per retained user (€ per 1st renewed month)",
  percent: "Percent (note only, no automatic calculation)",
};

/** "Add code" form — code is uppercased as the user types it. */
export function AddCodeForm({ offerings, onCreate }: Props) {
  const [code, setCode] = useState("");
  const [offeringId, setOfferingId] = useState("");
  const [payoutType, setPayoutType] = useState<PayoutType>("per_paying");
  const [amount, setAmount] = useState("2");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const codeValid = CODE_PATTERN.test(code);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    if (!codeValid) {
      setFormError("Code must be 2-20 characters (A-Z, 0-9).");
      return;
    }
    if (!offeringId.trim()) {
      setFormError("Enter an offering.");
      return;
    }
    const parsedAmount = Number(amount);
    if (payoutType !== "percent" && (!Number.isFinite(parsedAmount) || parsedAmount <= 0)) {
      setFormError("Enter a valid amount.");
      return;
    }

    setSubmitting(true);
    try {
      await onCreate({
        code,
        offeringId: offeringId.trim(),
        payout: { type: payoutType, amount: parsedAmount },
        note: note.trim(),
      });
      setCode("");
      setOfferingId("");
      setAmount("2");
      setNote("");
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Could not create the code.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card rounded-[var(--radius-card)] border border-border-subtle p-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-6"
    >
      <div className="flex flex-col gap-1 lg:col-span-1">
        <label htmlFor="new-code" className="text-caption font-semibold text-muted">
          Code
        </label>
        <input
          id="new-code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="MARIA"
          maxLength={20}
          className="font-mono h-10 px-3 rounded-[var(--radius-button-sm)] border border-border-subtle bg-background text-foreground uppercase tracking-wider"
        />
      </div>

      <div className="flex flex-col gap-1 lg:col-span-2">
        <label htmlFor="new-offering" className="text-caption font-semibold text-muted">
          Offering
        </label>
        {offerings ? (
          <select
            id="new-offering"
            value={offeringId}
            onChange={(e) => setOfferingId(e.target.value)}
            className="h-10 px-3 rounded-[var(--radius-button-sm)] border border-border-subtle bg-background text-foreground"
          >
            <option value="">Selecciona…</option>
            {offerings.map((o) => (
              <option key={o.id} value={o.id}>
                {o.displayName} ({o.id})
              </option>
            ))}
          </select>
        ) : (
          <input
            id="new-offering"
            value={offeringId}
            onChange={(e) => setOfferingId(e.target.value)}
            placeholder="intro50"
            className="h-10 px-3 rounded-[var(--radius-button-sm)] border border-border-subtle bg-background text-foreground"
          />
        )}
      </div>

      <div className="flex flex-col gap-1 lg:col-span-2">
        <label htmlFor="new-payout-type" className="text-caption font-semibold text-muted">
          Payout rule
        </label>
        <select
          id="new-payout-type"
          value={payoutType}
          onChange={(e) => setPayoutType(e.target.value as PayoutType)}
          className="h-10 px-3 rounded-[var(--radius-button-sm)] border border-border-subtle bg-background text-foreground"
        >
          {(Object.keys(PAYOUT_LABELS) as PayoutType[]).map((t) => (
            <option key={t} value={t}>
              {PAYOUT_LABELS[t]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1 lg:col-span-1">
        <label htmlFor="new-amount" className="text-caption font-semibold text-muted">
          {payoutType === "percent" ? "% (note)" : "€ / event"}
        </label>
        <input
          id="new-amount"
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="h-10 px-3 rounded-[var(--radius-button-sm)] border border-border-subtle bg-background text-foreground"
        />
      </div>

      <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-5">
        <label htmlFor="new-note" className="text-caption font-semibold text-muted">
          Note (optional)
        </label>
        <input
          id="new-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. 10% lifetime, agreed by email"
          className="h-10 px-3 rounded-[var(--radius-button-sm)] border border-border-subtle bg-background text-foreground"
        />
      </div>

      <div className="flex items-end lg:col-span-1">
        <button
          type="submit"
          disabled={submitting}
          className="w-full h-10 rounded-[var(--radius-button-sm)] bg-accent text-white font-semibold hover:bg-accent-hover disabled:opacity-50 transition-colors"
        >
          {submitting ? "Creating…" : "Add code"}
        </button>
      </div>

      {formError ? (
        <p className="text-caption text-state-low sm:col-span-2 lg:col-span-6">{formError}</p>
      ) : null}
    </form>
  );
}
