{/* TODO: Legal review by a Spanish DPO / lawyer required before public launch. */}
export function PrivacyEn() {
  return (
    <>
      <p>
        This Privacy Policy explains what personal data Dulce collects, how we use it, and the
        rights you have over it. It applies to both this website (
        <strong>dulceglucosa.com</strong>) and the Dulce mobile application.
      </p>

      <h2 id="controller">1. Data controller</h2>
      <p>
        The data controller is <strong>Giorgio Khimshiashvili</strong>, operating as a sole
        trader, based in Spain. You can contact us about anything related to your data at{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>

      <h2 id="data">2. What data we collect</h2>
      <h3>2.1 Website</h3>
      <ul>
        <li>
          <strong>Waitlist:</strong> your email and your session's language.
        </li>
        <li>
          <strong>Beta form:</strong> name, email, CGM device, and region. Optionally, any
          notes you choose to share.
        </li>
        <li>
          <strong>Minimal technical data:</strong> an anonymous hash (SHA-256) of your IP
          combined with a daily-rotating salt, used only to throttle form abuse. We never
          store the raw IP.
        </li>
        <li>
          <strong>Anonymous analytics:</strong> we use Vercel Analytics, which sets no cookies
          and collects no personal identifiers. It only measures page views and performance.
        </li>
      </ul>
      <h3>2.2 Mobile application</h3>
      <ul>
        <li>
          <strong>Glucose data</strong> obtained on your device from LibreLinkUp, Dexcom Share
          or your own Nightscout instance. Credentials are encrypted in the system's secure
          keychain (Keychain on iOS, Keystore on Android).
        </li>
        <li>
          <strong>Apple Health data</strong> in read-only mode, if you grant permission.
        </li>
        <li>
          <strong>Your logbook</strong>: carbohydrates, insulin, exercise, notes and manual
          readings. Stored locally.
        </li>
        <li>
          <strong>Preferences</strong>: units, target range, language, theme.
        </li>
      </ul>
      <p>
        During the MVP, app data is stored on your device and is not transmitted to Dulce
        servers. When this changes (optional cloud sync, family-sharing feature), we'll update
        this policy and ask for your explicit consent.
      </p>

      <h2 id="purpose">3. Why we use your data</h2>
      <ul>
        <li>Let you know when Dulce is available (waitlist).</li>
        <li>Evaluate and select participants for the beta (beta form).</li>
        <li>Protect the site from abuse (IP hash, rate limit).</li>
        <li>Understand which pages perform best (anonymous analytics).</li>
        <li>Comply with legal obligations and respond to your rights requests.</li>
      </ul>

      <h2 id="legal-basis">4. Legal basis</h2>
      <ul>
        <li>
          <strong>Consent</strong> (Art. 6(1)(a) GDPR): when you join the waitlist or beta.
        </li>
        <li>
          <strong>Legitimate interest</strong> (Art. 6(1)(f) GDPR): basic site security and
          anonymous analytics.
        </li>
        <li>
          <strong>Pre-contractual relationship</strong> (Art. 6(1)(b) GDPR): when we process
          your beta application.
        </li>
      </ul>

      <h2 id="health">5. Special category data (Art. 9 GDPR)</h2>
      <p>
        Glucose readings and other health data are <strong>special categories</strong> of
        personal data. Processing them requires explicit consent (Art. 9(2)(a) GDPR). In the
        MVP, these data:
      </p>
      <ul>
        <li>Are processed only on your device.</li>
        <li>Are not transmitted to Dulce servers.</li>
        <li>Are not shared with any third party without your explicit instruction.</li>
      </ul>

      <h2 id="retention">6. How long we keep your data</h2>
      <ul>
        <li>
          <strong>Waitlist:</strong> until launch + 6 months, or until you ask to be removed.
        </li>
        <li>
          <strong>Beta form:</strong> for the duration of the beta + 12 months for support and
          product-improvement purposes.
        </li>
        <li>
          <strong>IP hash:</strong> 30 days.
        </li>
        <li>
          <strong>App data</strong> (on your device): until you delete it or uninstall the
          app.
        </li>
      </ul>

      <h2 id="recipients">7. Who we share your data with</h2>
      <p>
        We share data only with the providers strictly required to run the service. They all
        act as processors under contract:
      </p>
      <ul>
        <li>
          <strong>Supabase</strong> (waitlist and beta storage) — hosted in the EU (eu-west-3).
        </li>
        <li>
          <strong>Resend</strong> (sending the waitlist confirmation email).
        </li>
        <li>
          <strong>Vercel</strong> (website hosting and anonymous analytics).
        </li>
        <li>
          In the app, <strong>direct</strong> connections between your device and the
          providers you choose: <strong>LibreLinkUp</strong> (Abbott),{" "}
          <strong>Dexcom</strong>, <strong>Nightscout</strong>, <strong>Apple</strong> (Health).
          Those connections are governed by their own privacy policies.
        </li>
      </ul>
      <p>
        We never sell, rent or hand over your data to third parties for advertising or
        commercial purposes.
      </p>

      <h2 id="transfers">8. International transfers</h2>
      <p>
        Some of our processors (Resend, Vercel) process data in the US. Transfers are made
        under the European Commission's Standard Contractual Clauses (SCCs) or equivalent
        frameworks (DPF). You can request a copy of these safeguards at{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>

      <h2 id="rights">9. Your rights</h2>
      <p>As a data subject, you have the right to:</p>
      <ul>
        <li>Access your personal data.</li>
        <li>Rectify it if inaccurate.</li>
        <li>Request its deletion.</li>
        <li>Object to processing or request restriction.</li>
        <li>Portability of data you have provided.</li>
        <li>Withdraw your consent at any time.</li>
      </ul>
      <p>
        You can exercise any of these rights by writing to{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>. We respond within 30 days at the
        latest.
      </p>
      <p>
        If you believe our processing does not comply with the law, you have the right to file
        a complaint with the{" "}
        <a href="https://www.aepd.es" target="_blank" rel="noopener">
          Spanish Data Protection Agency (AEPD)
        </a>
        .
      </p>

      <h2 id="minors">10. Children</h2>
      <p>
        Dulce is not directed at children under the age of 14. If you are a parent or legal
        guardian and believe a minor in your care has provided us with data without your
        consent, contact us and we will delete it.
      </p>

      <h2 id="cookies">11. Cookies</h2>
      <p>
        We only use strictly necessary technical cookies (language preference, CSRF token on
        forms). We do not use tracking or advertising cookies. More in our{" "}
        <a href="/en/legal/cookies">Cookie Policy</a>.
      </p>

      <h2 id="changes">12. Changes to this policy</h2>
      <p>
        If we make material changes, we will notify affected users by email and publish the
        updated version with its revision date on this page.
      </p>

      <h2 id="contact">13. Contact</h2>
      <p>
        For any questions about this Privacy Policy or the processing of your data, write to{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
