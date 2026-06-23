{/* TODO: Legal review by a Spanish DPO / lawyer required before public launch. */}
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
      <p>
        Dulce uses <strong>only strictly necessary technical cookies</strong>. We do not use
        advertising tracking cookies or third-party analytics cookies.
      </p>

      <h3>2.1 Session / technical cookies</h3>
      <ul>
        <li>
          <strong>NEXT_LOCALE</strong> — remembers your language preference between pages.
          Type: technical. Duration: up to 1 year.
        </li>
        <li>
          <strong>Form submission tokens</strong> — used by Next.js Server Actions to prevent
          CSRF. Type: technical. Duration: only while submitting the form.
        </li>
      </ul>

      <h3>2.2 Cookieless anonymous analytics</h3>
      <p>
        We use <strong>Vercel Analytics</strong>, which measures page views and web
        performance <strong>without cookies</strong> or personal identifiers. Data is
        aggregated and anonymized; you cannot be identified from it. For this reason, no
        cookie consent is required under the ePrivacy directive.
      </p>

      <h2 id="consent">3. Consent</h2>
      <p>
        Strictly necessary cookies do not require your consent — they are exempt under the
        Spanish cookie regulation (Art. 22 LSSI) and the GDPR. If we ever introduced
        non-technical cookies, we would request your prior consent through a proper banner.
      </p>

      <h2 id="manage">4. How to manage cookies</h2>
      <p>
        You can clear stored cookies or prevent your browser from accepting them in the
        browser's settings:
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
