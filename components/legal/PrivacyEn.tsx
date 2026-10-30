import { Link } from "@/i18n/navigation";

{/* Legal review remains outstanding: validate the health-data legal basis, app consent flow, retention and transfer details with Spanish counsel. */}
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
        trader. You can contact us about anything related to your data at{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>

      <h2 id="data">2. What data we collect</h2>
      <h3>2.1 Website</h3>
      <ul>
        <li>
          <strong>Android waitlist:</strong> your email, selected language, the page or placement
          where you signed up, and a pseudonymous IP hash used for abuse prevention.
        </li>
        <li>
          <strong>Beta interest form, if you submitted one:</strong> name, email, CGM device,
          region and any optional notes you chose to share.
        </li>
        <li>
          <strong>Contact form:</strong> your name, email address, subject and message. Resend
          forwards the message to our support inbox and sends a confirmation to you.
        </li>
        <li>
          <strong>Minimal technical data:</strong> a pseudonymous hash (SHA-256) of your IP
          combined with a daily-rotating salt, used to throttle form abuse. The waitlist and
          beta records include this hash until the associated record is deleted. Rate-limit
          counters are temporary. We do not store the raw IP directly.
        </li>
        <li>
          <strong>Website analytics:</strong> Vercel Analytics measures page views and
          performance without cookies. Vercel says its visitor metric uses a request-derived
          hash that expires after 24 hours; reports can include page URL, referrer, general
          location, browser and operating-system information, which we view in aggregated form.
          Google Analytics 4 measures visits, page path and language, App Store link
          clicks and campaign placement, and successful waitlist sign-ups. In the EEA, UK and
          Switzerland, or when we cannot determine your location, it loads only after you accept
          analytics cookies; elsewhere it follows the regional default described in our Cookie
          Policy. We do not send glucose readings,
          other health data or your email address to either analytics service.
        </li>
      </ul>

      <h3>2.2 In the app, on your device</h3>
      <ul>
        <li>
          <strong>Your CGM sign-in details.</strong> You sign in with your LibreLinkUp
          (Abbott) or Dexcom Share account. Your sign-in password is stored in your device’s
          secure keychain and is not sent to Dulce. The app uses it to connect to the provider;
          when your CGM is connected, a provider session token (not your password) is sent
          to the relay as described below.
        </li>
        <li>
          <strong>Glucose readings</strong> fetched from LibreLinkUp or Dexcom Share, stored
          in a local database on your device.
        </li>
        <li>
          <strong>Your logbook</strong>: carbohydrates, insulin, manual glucose entries and
          notes. Stored locally.
        </li>
        <li>
          <strong>Apple Health data</strong> in read-only mode, if you grant permission.
        </li>
        <li>
          <strong>Preferences</strong>: units, target range, language, theme, alert settings.
        </li>
      </ul>

      <h3>2.3 The Dulce relay (real-time features)</h3>
      <p>
        When your CGM is connected, the app registers this installation with our relay so it
        can provide background updates, alerts, Apple Watch features and family following
        when you use them. The relay is a small server operated by us and hosted on Cloudflare.
        It fetches readings from LibreLinkUp or Dexcom Share and sends updates to your devices.
        The relay processes:
      </p>
      <ul>
        <li>
          <strong>A provider session token</strong> (not your password): a LibreLinkUp token
          or a Dexcom Share session ID, so it can fetch readings on your behalf.
        </li>
        <li>
          <strong>A random installation ID and provider account identifier</strong> to associate
          the registration, readings and settings with the right device and CGM connection.
        </li>
        <li>
          <strong>Push tokens</strong> for your devices, issued by Apple or Google, to deliver
          notifications and Live Activity updates.
        </li>
        <li>
          <strong>Your latest glucose readings</strong>, including the value and timestamp,
          kept as a short rolling window for Live Activity, watch and follower views. The relay
          is not a long-term store of your health history — that stays on your device.
        </li>
        <li>
          <strong>Settings and technical device/app details</strong> needed to provide the
          service (units, target range, alert thresholds, language, time zone, platform and app
          version).
        </li>
        <li>
          <strong>Usage events:</strong> basic setup, connection and subscription events linked
          to the random installation ID, used to measure and improve the service.
        </li>
        <li>
          <strong>Operational logs:</strong> troubleshooting logs sent to Cloudflare Workers
          Logs contain a pseudonymous device code (a one-way hash of your installation ID, not the
          ID itself), your CGM provider, whether each update or alert was delivered, the alert
          type when one is sent, Live Activity status events reported by the app, and error
          details. They do not contain glucose values. Cloudflare deletes these logs after 7
          days.
        </li>
      </ul>
      <p>
        You can stop this processing by disconnecting your CGM or using Delete Account in
        Settings. The app asks the relay to delete its active device, token and sharing records.
        A minimal installation ID and first-registration timestamp are retained after deletion
        so a returning installation is not counted as new in internal connection metrics. This
        marker has no automatic expiry; email us if you want it erased too.
      </p>

      <h3>2.4 Family following</h3>
      <p>
        If you invite someone to follow you, the relay delivers your recent readings and
        alerts to their device from the moment they accept — earlier history is not shared.
        Short check-in messages, including text you choose, also pass through the relay; this is
        not a chat service. You can revoke a follower’s access at any time, and you can turn off
        follower messages entirely.
      </p>

      <h3>2.5 Purchases</h3>
      <p>
        Subscriptions are processed by <strong>Apple</strong>. We never see your name, card
        or billing details. We use <strong>RevenueCat</strong> to validate subscriptions
        using a random identifier generated by the app — not your email or your identity.
      </p>
      <p>
        Our server stores that RevenueCat identifier next to the installation identifier so it
        can remove Pro features as soon as a purchase is refunded. If you ask Apple or Google for
        a refund, we may tell them, through RevenueCat, whether the purchase was delivered and
        our refund preference. We never share glucose or health data, and Apple or Google always
        makes the decision.
      </p>

      <h2 id="purpose">3. Why we use your data</h2>
      <ul>
        <li>Show your glucose on your devices and, if you choose, your followers’ devices.</li>
        <li>Deliver the alerts you configure.</li>
        <li>Validate your subscription and unlock Pro features.</li>
        <li>Let you know when Dulce is available (waitlist).</li>
        <li>Respond to questions submitted through the contact form.</li>
        <li>Protect the site from abuse (IP hash, rate limit).</li>
        <li>Understand site visits, App Store referrals and app setup and service usage.</li>
        <li>Comply with legal obligations and respond to your rights requests.</li>
      </ul>

      <h2 id="legal-basis">4. Legal basis</h2>
      <ul>
        <li>
          <strong>Explicit consent</strong> (Art. 9(2)(a) GDPR): processing your health data
          when you choose to connect your CGM and use the related features. Disconnecting your
          CGM stops the relay processing; you can also withdraw consent by contacting us. The
          app links to this policy during onboarding but does not currently show a separate
          health-data consent checkbox. We are asking Spanish privacy counsel to verify whether
          the current notice and connection flow meet the explicit-consent standard.
        </li>
        <li>
          <strong>Contract</strong> (Art. 6(1)(b) GDPR): providing the app and the features
          you subscribe to.
        </li>
        <li>
          <strong>Consent</strong> (Art. 6(1)(a) GDPR): when you join the waitlist or beta.
        </li>
        <li>
          <strong>Legitimate interest</strong> (Art. 6(1)(f) GDPR): site security and answering
          questions you send through the contact form. The lawful
          basis for analytics depends on the service and regional rules described in our Cookie
          Policy; this requires confirmation with privacy counsel.
        </li>
      </ul>

      <h2 id="health">5. Special category data (Art. 9 GDPR)</h2>
      <p>
        Glucose readings and other health data are <strong>special categories</strong> of
        personal data. Our approach:
      </p>
      <ul>
        <li>
          Your long-term glucose history, logbook and Apple Health data are processed and stored
          on your device. Recent readings are also processed by the relay as described above.
        </li>
        <li>
          When your CGM is connected, the relay processes recent readings needed for the
          background and sharing features you use; it keeps a short rolling window, not your
          long-term glucose history.
        </li>
        <li>They are always encrypted in transit (TLS).</li>
        <li>
          They are used exclusively to deliver your own data to your own devices and to the
          followers you choose — never for advertising, profiling or resale.
        </li>
      </ul>

      <h2 id="retention">6. How long we keep your data</h2>
      <ul>
        <li>
          <strong>Active relay data:</strong> recent readings are continuously replaced in a
          short rolling window. Provider session and push tokens are kept while needed for your
          connected device and deleted when you disconnect or deregister it, sign out, or use
          Settings → Delete account.
        </li>
        <li>
          <strong>App data on your device:</strong> until you delete it or uninstall the app.
        </li>
        <li>
          <strong>Android waitlist:</strong> until 6 months after Android launch, or until you
          ask to be removed. The current signup store does not automatically expire these rows;
          deletion requires a manual cleanup or your request. The associated IP hash is kept
          with the row for the same period.
        </li>
        <li>
          <strong>Beta interest form:</strong> for the beta period plus 12 months. These records
          are also removed manually or on request; the associated IP hash is kept with the row.
        </li>
        <li>
          <strong>Contact messages:</strong> while we handle the request and any necessary
          follow-up. Email copies may remain in our and Resend&apos;s mail systems under their
          retention settings; contact us to request deletion when no legal retention reason
          applies.
        </li>
        <li>
          <strong>Relay usage events:</strong> event records linked to a random installation ID
          are kept for up to 45 days; daily aggregate service statistics are kept for up to 400
          days.
        </li>
        <li>
          <strong>Operational logs:</strong> Cloudflare Workers Logs are deleted after 7 days.
        </li>
        <li>
          <strong>Installation marker:</strong> a random installation ID and first-registration
          timestamp remain after relay deletion to recognize a returning installation; contact
          us to request erasure. The marker has no automatic expiry.
        </li>
      </ul>

      <h2 id="recipients">7. Who we share your data with</h2>
      <p>
        We use the service providers listed below. Some process data for us under contract;
        Abbott, Dexcom, Apple and Google also provide services under their own terms and
        privacy policies:
      </p>
      <ul>
        <li>
          <strong>Cloudflare</strong> — hosts the Dulce relay described above.
        </li>
        <li>
          <strong>Apple</strong> — push notifications (APNs), Live Activities, Apple Health
          (on-device), and payments.
        </li>
        <li>
          <strong>Google Firebase</strong> — push notifications on Android.
        </li>
        <li>
          <strong>Google Analytics 4 (Google Ireland Ltd.)</strong> — website analytics when
          permitted under the regional consent settings described in our Cookie Policy.
        </li>
        <li>
          <strong>RevenueCat</strong> — subscription validation (pseudonymous ID only).
        </li>
        <li>
          <strong>Supabase</strong> (waitlist and beta storage) — hosted in the EU (eu-west-3).
        </li>
        <li>
          <strong>Resend</strong> (contact form delivery and waitlist confirmation email) and{" "}
          <strong>Vercel</strong>{" "}
          (website hosting and aggregated web analytics).
        </li>
        <li>
          <strong>Abbott (LibreLinkUp)</strong> — your device and our relay connect to
          Abbott’s service with your credentials/session to fetch your readings. That
          connection is governed by Abbott’s own privacy policy.
        </li>
        <li>
          <strong>Dexcom (Share)</strong> — your device and, while your CGM is connected, our
          relay connect to Dexcom Share using a session ID to fetch readings. Dexcom’s own
          privacy terms apply to that service.
        </li>
      </ul>
      <p>
        We never sell, rent or hand over your data to third parties for advertising or
        commercial purposes.
      </p>

      <h2 id="transfers">8. International transfers</h2>
      <p>
        Some providers and services we use (Cloudflare, RevenueCat, Resend, Vercel, Apple and
        Google) may process data in the US or other countries. Where GDPR transfer safeguards
        are required, the applicable mechanism depends on the provider and service and may
        include an adequacy decision or the European Commission’s Standard Contractual Clauses
        (SCCs). Google LLC is listed as active under the EU-US Data Privacy Framework, within
        the scope of its certification. Contact us for details and copies of applicable
        safeguards at{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>

      <h2 id="rights">9. Your rights</h2>
      <p>Under the GDPR, and subject to its conditions, you have the right to:</p>
      <ul>
        <li>Access your personal data.</li>
        <li>Rectify it if inaccurate.</li>
        <li>Request its deletion.</li>
        <li>Object to processing or request restriction.</li>
        <li>Portability of data you have provided.</li>
        <li>Withdraw your consent at any time.</li>
      </ul>
      <p>
          Use <strong>Settings → Delete account</strong> in the app to delete local app data and
          active relay records. The minimal installation marker described above remains until
          you request its erasure. You can exercise any of these rights by writing to{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>. We respond within
        one month. If a request is complex or we receive many requests, the GDPR permits an
        extension of up to two further months; we will explain any extension within the first
        month.
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
        Dulce is not directed at children under the age of 14. A parent or legal guardian may
        use Dulce to follow a minor’s glucose under their own responsibility. If you believe a
        minor in your care has provided us with data without your consent, contact us and we
        will delete it.
      </p>

      <h2 id="cookies">11. Cookies</h2>
      <p>
        We use strictly necessary technical cookies and, with your consent where the law
        requires it, Google Analytics cookies. We do not use advertising cookies. Which cookies
        they are and how to change your choice is in our{" "}
        <Link href="/legal/cookies">Cookie Policy</Link>.
      </p>

      <h2 id="changes">12. Changes to this policy</h2>
      <p>
        If we make material changes, we will notify affected users by email or inside the app
        and publish the updated version with its revision date on this page.
      </p>

      <h2 id="contact">13. Contact</h2>
      <p>
        For any questions about this Privacy Policy or the processing of your data, write to{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
