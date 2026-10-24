"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Link } from "@/i18n/navigation";
import {
  CONSENT_OPEN,
  GA_ID,
  openConsentSettings,
  readConsent,
  subscribeConsent,
  writeConsent,
} from "@/lib/consent";

/**
 * Asks once before Google Analytics may set cookies. Shown only when GA is
 * configured (NEXT_PUBLIC_GA_ID) and the visitor hasn't chosen yet; reopened
 * from "Cookie settings" in the footer. Accept and Decline weigh the same, as
 * EU guidance requires.
 */
export function ConsentBanner() {
  const t = useTranslations("consent");
  // "unset" on the server and before hydration, so the banner never flashes
  // for someone who already chose.
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => "unset" as const);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN, reopen);
    return () => window.removeEventListener(CONSENT_OPEN, reopen);
  }, []);

  if (!GA_ID || (consent !== null && !reopened)) return null;
  const choose = (value: "granted" | "denied") => {
    writeConsent(value);
    setReopened(false);
  };
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t("title")}
      className="fixed inset-x-3 bottom-28 z-[75] mx-auto max-w-md rounded-[22px] border border-ink/10 bg-ground p-4 text-label text-ink shadow-2xl"
    >
      <p className="leading-relaxed text-soft">
        {t("text")}{" "}
        <Link href="/legal/cookies" className="underline underline-offset-2 hover:text-ink">
          {t("policy")}
        </Link>
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="flex-1 rounded-full border border-ink/20 px-4 py-2 font-medium text-ink transition-colors hover:bg-ink/5"
        >
          {t("decline")}
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="flex-1 rounded-full border border-ink/20 px-4 py-2 font-medium text-ink transition-colors hover:bg-ink/5"
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}

/** Footer link that reopens the banner. */
export function CookieSettingsLink({ className }: { className?: string }) {
  const t = useTranslations("consent");
  if (!GA_ID) return null;
  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className={className}
    >
      {t("settings")}
    </button>
  );
}
