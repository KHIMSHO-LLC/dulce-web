"use client";

/**
 * "?" button on the Partners tab: how to set up one free-month Apple offer
 * shared by several partners, each with their own commission. Admin-only by
 * virtue of living behind AdminGate.
 */

import { useEffect, useState } from "react";

const REDEEM_URL = "https://apps.apple.com/redeem?ctx=offercodes&id=6770694596&code=";

export function OfferCodeHelp() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="How to set up Apple offer codes"
        title="How to set up Apple offer codes"
        className="h-10 w-10 rounded-full border border-border-subtle bg-card text-foreground font-bold hover:bg-accent-soft transition-colors"
      >
        ?
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 sm:p-10"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="offer-help-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-[var(--radius-card)] border border-border-subtle bg-card p-6 text-label text-foreground shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id="offer-help-title" className="text-headline font-bold">
                1 month free for several partners
              </h2>
              <button type="button" onClick={() => setOpen(false)} className="text-caption text-muted underline">
                close
              </button>
            </div>
            <p className="mt-2 text-muted">
              Make the offer <b className="text-foreground">once</b> in App Store Connect and add one code per partner inside it.
              Commission is not set in Apple: each partner&rsquo;s deal lives here on the dashboard.
            </p>

            <h3 className="mt-5 font-bold">1. App Store Connect (one time)</h3>
            <ol className="mt-1 list-decimal space-y-1 pl-5 text-muted">
              <li>Apps › Dulce › Subscriptions › your group › <b className="text-foreground">Dulce Pro Monthly</b>.</li>
              <li>
                <b className="text-foreground">Offer Codes › +</b>
                <ul className="mt-1 list-disc space-y-0.5 pl-5">
                  <li>Name: <span className="font-mono">Partner – 1 month free</span></li>
                  <li>Eligibility: New subscribers (add Expired to win people back)</li>
                  <li>Type: <b className="text-foreground">Free</b>, duration <b className="text-foreground">1 month</b></li>
                  <li>Countries: all</li>
                </ul>
              </li>
              <li>Save.</li>
            </ol>

            <h3 className="mt-5 font-bold">2. One code per partner (inside the same offer)</h3>
            <ol className="mt-1 list-decimal space-y-1 pl-5 text-muted">
              <li>Open the offer › <b className="text-foreground">Custom codes › Create</b>.</li>
              <li>Code e.g. <span className="font-mono">JEDEEN</span>, redemptions e.g. 10,000, end date optional.</li>
              <li>Repeat for each partner.</li>
            </ol>
            <p className="mt-2 text-muted">Each partner shares their own link:</p>
            <p className="mt-1 break-all rounded bg-accent-soft px-2 py-1 font-mono text-caption">{REDEEM_URL}JEDEEN</p>
            <p className="mt-1 text-muted">It opens the App Store with 1 month free, then the normal monthly price.</p>

            <h3 className="mt-5 font-bold">3. Here on the dashboard (per partner)</h3>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-muted">
              <li><b className="text-foreground">New partner</b>, code = the same name (<span className="font-mono">JEDEEN</span>).</li>
              <li><b className="text-foreground">Apple offer codes</b>: their Apple code.</li>
              <li><b className="text-foreground">Deal</b>: their own commission (50% for one, 30% for another…).</li>
            </ul>
            <p className="mt-2 text-muted">
              Every redemption is credited to the right partner automatically. The free month earns nothing; commission starts
              with the first real payment.
            </p>

            <h3 className="mt-5 font-bold">Good to know</h3>
            <p className="mt-1 text-muted">
              Someone who <b className="text-foreground">types</b> the code in the app gets the code&rsquo;s in-app offer, not
              Apple&rsquo;s free month. For the same free month both ways, add a second monthly product with a 1-month free trial
              as its introductory offer and point the partner offering at it in RevenueCat.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
