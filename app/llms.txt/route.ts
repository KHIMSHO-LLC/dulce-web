/**
 * /llms.txt (llmstxt.org): a plain-Markdown summary of Dulce for AI assistants
 * and answer engines, with links to the pages. Facts only, matching the
 * released app (PRODUCT.md, content/README.md rule 1); update the key facts
 * when a feature ships. Tool and guide lists are generated from lib/tools.ts
 * and content/articles.ts, so they never go stale. The path contains a dot, so
 * the next-intl proxy leaves it alone.
 */
import { ARTICLES } from "@/content/articles";
import { locales, type AppLocale } from "@/i18n/routing";
import { articleUrl } from "@/lib/articles";
import { markdownPath } from "@/lib/markdown";
import { APP_STORE_URL } from "@/lib/schema";
import { absoluteUrl, localizedPath } from "@/lib/seo";
import { CONTACT_EMAIL, SOCIAL } from "@/lib/site";
import { TOOLS, TOOL_COPY } from "@/lib/tools";

export const dynamic = "force-static";

const LANGUAGE: Record<AppLocale, string> = { es: "Spanish", en: "English", de: "German", fr: "French", it: "Italian" };

const url = (locale: AppLocale, path: Parameters<typeof localizedPath>[1]) => absoluteUrl(localizedPath(locale, path));

function guides(locale: AppLocale): string {
  return ARTICLES.map(
    (a) =>
      `- [${a.title[locale]}](${articleUrl(a, locale)}): ${a.description[locale]} ([Markdown](${absoluteUrl(markdownPath(a, locale))}))`,
  ).join("\n");
}

function tools(locale: AppLocale): string {
  return TOOLS.map(({ path }) => `- [${TOOL_COPY[path][locale].title}](${url(locale, path)}): ${TOOL_COPY[path][locale].description}`).join(
    "\n",
  );
}

export function GET() {
  const others = locales.filter((l) => l !== "en");
  const body = `# Dulce

> Dulce is an iPhone and Apple Watch app that shows real-time glucose from FreeStyle Libre 2 and Libre 3 (via LibreLinkUp) and Dexcom G6, G7 and ONE+ (via Dexcom Share) where people already look: the Lock Screen (Live Activity), Dynamic Island, widgets, StandBy and a native Apple Watch app, with custom low/high alerts and real-time family sharing. Made by a founder who lives with type 1 diabetes, for people with diabetes anywhere in the world. Available in Spanish, English, German, French and Italian. Free download; Dulce Pro adds the Live Activity updated every minute, the Apple Watch app, family sharing and more, with a 14-day free trial. Not a medical device.

Also known as: "Dulce glucosa", "Dulce: Glucosa de un vistazo" (Spanish App Store name), "Dulce: Glucose at a Glance" (English), "Dulce: Blutzucker im Blick" (German), "Dulce : Glycémie en direct" (French), "Dulce: Glicemia sott'occhio" (Italian). Website: dulceglucosa.com.

## Key facts

- Platform: iPhone (iOS 17 or later) and Apple Watch. Android is not available yet (waitlist on the site). Nightscout is not supported.
- Sensors (since app version 1.0.4): FreeStyle Libre 2 and Libre 3 through the user's LibreLinkUp account (Abbott's follower app, not LibreLink); Dexcom G6, G7 and ONE+ through the wearer's own Dexcom account with Share turned on (Dexcom Share). Libre readings arrive every minute (up to 1,440 a day), Dexcom readings every 5 minutes.
- Lock Screen Live Activity and Dynamic Island, updated by Dulce's server with every new reading with Dulce Pro, even with the app closed.
- Home Screen, Lock Screen and StandBy widgets (free). Apple Watch app with complications in every shape (Pro).
- Alerts: low and high with custom thresholds, rapid change, predictive low, quiet hours, and a critical alert for severe lows (55 mg/dL or less) that comes through quiet hours and snoozes. Alerts are regular notifications and follow the iPhone's silent switch and Focus settings.
- Family following: the person wearing the sensor invites up to 3 followers by link or code (Pro, 14-day free trial; free for followers). Followers don't need a sensor, just an iPhone and the free app. They see glucose in real time with their own alerts and quiet hours, and can send short notification messages that the wearer answers with a one-tap "I'm OK". Access can be revoked at any time.
- Logbook (carbs, insulin bolus/basal, glucose) and Trends (time in range, average glucose and GMI over 7, 14, 30 or 90 days) are free. Apple Health is read-only and optional.
- Price: free download; Dulce Pro is a monthly or yearly subscription with a 14-day free trial. The App Store shows the price in the local currency.
- Privacy: no ads, glucose data is never sold or used for advertising, GDPR-based privacy policy.
- Dulce is not a medical device, does not give dosing advice and does not replace the sensor's own alarms. It is independent and not affiliated with Abbott or Dexcom.
- App Store: ${APP_STORE_URL}
- Contact: ${CONTACT_EMAIL}
${SOCIAL.map((s) => `- ${s.name}: ${s.url}`).join("\n")}

## Help

- [Set up LibreLinkUp](${url("en", "/setup")}): LibreLink vs LibreLinkUp and the 4 steps to connect Dulce (Spanish: ${url("es", "/setup")})
- [LibreLinkUp status](${url("en", "/librelinkup-status")}): whether LibreLinkUp is working right now, measured by Dulce's server (Spanish: ${url("es", "/librelinkup-status")})
- [Free vs Pro](${url("en", "/pro")}): what each plan includes and how the trial works
- [Home page and FAQ](${url("en", "/")}): what Dulce does, with answers to common questions (Spanish: ${absoluteUrl("/")})

## Free tools

${tools("en")}

## Guides

${guides("en")}

${others.map((l) => `## Guides in ${LANGUAGE[l]}\n\n${guides(l)}`).join("\n\n")}

## Optional

- [Full text of the setup guide, FAQ, Pro page, calculators and every guide (Markdown)](${absoluteUrl("/llms-full.txt")})
- [Medical disclaimer](${url("en", "/legal/disclaimer")}) (Spanish: ${url("es", "/legal/disclaimer")})
- [Privacy policy](${url("en", "/legal/privacy")}) (Spanish: ${url("es", "/legal/privacy")})
`;
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
