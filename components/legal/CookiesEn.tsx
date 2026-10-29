import { GA_ID } from "@/lib/consent";

{/* Legal review remains outstanding: confirm the consent regions, cookie inventory and analytics settings with Spanish counsel. */}
export function CookiesEn() {
  return (
    <>
      <p>
        This Cookie Policy explains what cookies and similar technologies the{" "}
        <strong>dulceglucosa.com</strong> website uses, and why.
      </p>

      <h2 id="what">1. What is a cookie?</h2>
      <p>
        A cookie is a small text file that a website saves in your browser to remember
        information between pages or visits. Cookies can be <strong>technical</strong>{" "}
        (required for the site to work) or <strong>non-technical</strong> (analytics,
        advertising, etc.).
      </p>

      <h2 id="ours">2. Cookies we use</h2>
      {GA_ID ? (
        <p>
          Dulce uses <strong>strictly necessary technical cookies</strong> and{" "}
          <strong>Google Analytics</strong> cookies. In the EEA, the UK and Switzerland, and
          when we cannot determine your location, it runs only after you accept analytics. We do
          not use advertising tracking cookies.
        </p>
      ) : (
        <p>
          Dulce uses <strong>only strictly necessary technical cookies</strong>. We do not use
          advertising tracking cookies or third-party analytics cookies.
        </p>
      )}

      <h3>2.1 Session / technical cookies</h3>
      <ul>
        <li>
          <strong>NEXT_LOCALE</strong> — remembers your language preference between pages.
          Type: technical. Duration: up to 1 year.
        </li>
        <li>
          <strong>dulce-region</strong> — your country code, provided by our hosting platform
          from the request and stored in a session cookie to decide whether to ask for analytics
          consent. We do not store the raw IP for this purpose. Type: technical. Duration: until
          you close the browser.
        </li>
        <li>
          <strong>dulce:analytics-consent</strong> — a browser localStorage entry, not a cookie,
          that remembers whether you accepted or declined Google Analytics. It remains until
          you clear this site&apos;s browser storage.
        </li>
      </ul>

      <h3>2.2 Aggregated analytics without cookies</h3>
      <p>
        We use <strong>Vercel Analytics</strong> to measure page views and web performance
        <strong> without cookies</strong>. Vercel says its visitor metric uses a hash derived
        from the request that expires after 24 hours; reports can include page URL, referrer,
        general location, browser and operating system. We use aggregated reports. Vercel does
        not set cookies for this analytics service; this does not exempt the data from applicable
        privacy laws.
      </p>

      {GA_ID ? (
        <>
          <h3>2.3 Google Analytics</h3>
          <p>
            In the EEA, the UK and Switzerland (or if we cannot determine your location) only if
            you accept analytics cookies, and elsewhere unless you turn it off, we use{" "}
            <strong>Google Analytics 4</strong> (Google Ireland Ltd.) to count visits and measure
            page views, App Store link clicks and their campaign placement, and successful
            waitlist sign-ups. It
            sets <strong>_ga</strong> and <strong>_ga_*</strong> cookies (duration: up to 2
            years). Google may process this data in the United States under the EU-US Data
            Privacy Framework. Advertising features, Google signals and ad personalization are
            off. If you decline, Google Analytics is not loaded at all.
          </p>
        </>
      ) : null}

      <h2 id="consent">3. Consent</h2>
      <p>
        Strictly necessary cookies may be used without consent when they meet the applicable
        exception under Spanish cookie law (Art. 22 LSSI). Personal data associated with them
        remains subject to data-protection law.{" "}
        {GA_ID
          ? "In the EEA, the UK and Switzerland, or when we cannot determine your location, Google Analytics cookies are only set after you accept them in our banner. Everywhere, you can change your choice at any time with “Cookie settings” at the bottom of every page."
          : "If we ever introduced non-technical cookies, we would request your prior consent through a proper banner."}
      </p>

      <h2 id="manage">4. How to manage cookies</h2>
      <p>
        You can clear stored cookies or prevent your browser from accepting them in the
        browser’s settings:
      </p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noopener"
          >
            Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox"
            target="_blank"
            rel="noopener"
          >
            Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/HT201265"
            target="_blank"
            rel="noopener"
          >
            Safari (iOS / macOS)
          </a>
        </li>
      </ul>
      <p>
        If you disable technical cookies, some features (for example, remembering your
        language) may not work correctly.
      </p>

      <h2 id="changes">5. Changes to this policy</h2>
      <p>
        If we add or remove cookies, we will update this page. The last-updated date appears
        at the top.
      </p>

      <h2 id="contact">6. Contact</h2>
      <p>
        For any questions about cookies, write to{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
