"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { GA_ID, readConsent, subscribeConsent } from "@/lib/consent";

type Gtag = (...args: unknown[]) => void;

/**
 * Google Analytics 4, loaded only after the visitor accepts analytics cookies
 * (see ConsentBanner). GA4's enhanced measurement records the client-side page
 * changes. Every tap on an App Store link is sent as `app_store_click` with the
 * link's campaign token (`ct`, e.g. web_hero or blog_alerts), so GA shows which
 * page sends people to the App Store.
 */
export function GoogleAnalytics() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null);

  useEffect(() => {
    if (!GA_ID || consent !== "granted") return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href*='apps.apple.com']");
      if (!a) return;
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (!gtag) return;
      let campaign = "";
      try {
        campaign = new URL((a as HTMLAnchorElement).href).searchParams.get("ct") ?? "";
      } catch {}
      gtag("event", "app_store_click", { campaign, page_path: window.location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [consent]);

  if (!GA_ID || consent !== "granted") return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
