/**
 * /llms.txt (llmstxt.org): a plain-Markdown summary of Dulce for AI assistants
 * and answer engines, with links to the guides. Facts only, matching the
 * released app (PRODUCT.md, content/README.md rule 1); update it when a
 * feature ships. The path contains a dot, so the next-intl proxy leaves it alone.
 */
import { ARTICLES } from "@/content/articles";
import { locales, type AppLocale } from "@/i18n/routing";
import { APP_STORE_ID } from "@/lib/appStore";
import { articleUrl } from "@/lib/articles";
import { absoluteUrl, localizedPath } from "@/lib/seo";

export const dynamic = "force-static";

const LANGUAGE: Record<AppLocale, string> = { es: "Spanish", en: "English", de: "German", fr: "French", it: "Italian" };

function guides(locale: AppLocale): string {
  return ARTICLES.map((a) => `- [${a.title[locale]}](${articleUrl(a, locale)}): ${a.description[locale]}`).join("\n");
}

export function GET() {
  const body = `# Dulce

> Dulce is a free iPhone and Apple Watch app that shows real-time FreeStyle Libre 2 and Libre 3 glucose where people already look: the Lock Screen (Live Activity and Dynamic Island), widgets, StandBy, the Apple Watch, and the iPhones of family members who follow them. It was made by a person who lives with type 1 diabetes and is available in Spanish, English, German, French and Italian.

## Key facts

- Data source: the user's LibreLinkUp account (Abbott's follower service), not LibreLink. Sensors supported today: FreeStyle Libre 2 and Libre 3. Dexcom, Nightscout and Android are not available yet.
- Lock Screen Live Activity and Dynamic Island, updated every minute by Dulce's server with Dulce Pro, even with the app closed.
- Home Screen, Lock Screen and StandBy widgets (free). Apple Watch app with complications in every shape (Pro).
- Alerts: low and high with custom thresholds, rapid change, predictive low, quiet hours, and a critical alert for severe lows (55 mg/dL or less) that rings on silent.
- Family following: the person wearing the sensor invites up to 3 followers by link or code (Pro, 14-day free trial; free for followers). Followers see glucose in real time with their own alerts and quiet hours, can show it on their Lock Screen, and can send short notification messages that the wearer answers with a one-tap "I'm OK". Access can be revoked at any time.
- Logbook (carbs, insulin bolus/basal, glucose) and Trends (time in range, average glucose and GMI over 7, 14, 30 or 90 days) are free. Apple Health is read-only and optional.
- Price: free download; Dulce Pro is a subscription with a 14-day free trial.
- Dulce is not a medical device, does not give dosing advice and does not replace the sensor's own alarms. It is independent and not affiliated with Abbott.

## Links

- [App Store](https://apps.apple.com/app/id${APP_STORE_ID})
- [Home page](${absoluteUrl("/")})
- [LibreLink vs LibreLinkUp setup](${absoluteUrl(localizedPath("en", "/setup"))})
- [A1C and GMI calculator](${absoluteUrl(localizedPath("en", "/tools/a1c-calculator"))})
- [mg/dL to mmol/L converter](${absoluteUrl(localizedPath("en", "/tools/glucose-converter"))})
- [Medical disclaimer](${absoluteUrl(localizedPath("en", "/legal/disclaimer"))})

${locales
  .map((l) => `## Guides (${LANGUAGE[l]})\n\n${guides(l)}`)
  .join("\n\n")}
`;
  return new Response(body, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
