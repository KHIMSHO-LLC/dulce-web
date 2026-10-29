"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { GA_ID, readConsent, subscribeConsent } from "@/lib/consent";

type Gtag = (...args: unknown[]) => void;

/**
 * Google Analytics 4, loaded once consent is granted: accepted in the banner, or
 * by default outside the EEA/UK/CH (see lib/consent.ts). Ads storage, Google
 * signals and ad personalization stay off everywhere. GA4's enhanced measurement records the client-side page
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
      const segments = window.location.pathname.split("/").filter(Boolean);
      const supportedLocales = new Set(["es", "en", "de", "fr", "it"]);
      const pageLanguage = supportedLocales.has(segments[0] ?? "") ? segments[0] : "es";
      const ctaLocation = campaign.startsWith("blog_")
        ? "blog"
        : campaign.replace(/^web_/, "") || "unknown";
      gtag("event", "app_store_click", {
        campaign,
        source_campaign: campaign,
        cta_location: ctaLocation,
        page_path: window.location.pathname,
        page_language: pageLanguage,
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [consent]);

  if (!GA_ID || consent !== "granted") return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('js',new Date());gtag('config','${GA_ID}',{allow_google_signals:false,allow_ad_personalization_signals:false});`}
      </Script>
    </>
  );
}
