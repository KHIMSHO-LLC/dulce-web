import { Link } from "@/i18n/navigation";

{/* Legal review remains outstanding: have Spanish counsel verify consumer, subscription and withdrawal wording. */}
export function TermsEn() {
  return (
    <>
      <p>
        These Terms of Use govern access to and use of the <strong>dulceglucosa.com</strong>{" "}
        website and the Dulce mobile application (together, the “Service”). By using the
        Service you accept these terms. If you don’t accept them, don’t use the Service.
      </p>

      <blockquote>
        <p>
          ⚠️ Dulce <strong>is not a medical device</strong>. It does not diagnose, treat, cure
          or prevent any disease. Treatment decisions should always be made with your
          healthcare team.
        </p>
      </blockquote>

      <h2 id="acceptance">1. Acceptance</h2>
      <p>
        By downloading the app, creating a connection to your CGM account or using any part
        of the Service, you confirm that you have read, understand and accept these terms and
        our <Link href="/legal/privacy">Privacy Policy</Link>.
      </p>

      <h2 id="service">2. Service description</h2>
      <p>
        Dulce is a companion application for people with diabetes (especially type 1) and
        their carers. The Service allows, among other things:
      </p>
      <ul>
        <li>
          Viewing glucose data from FreeStyle Libre through LibreLinkUp (Abbott), from Dexcom
          G6, G7 and ONE+ through Dexcom Share, from Medtronic systems through Medtronic CareLink,
          or from a Nightscout site.
        </li>
        <li>
          Showing your glucose on the iPhone Lock Screen (Live Activity), the Dynamic Island,
          home-screen widgets, and a native Apple Watch app.
        </li>
        <li>Receiving configurable glucose alerts.</li>
        <li>Keeping a manual logbook of food, insulin, glucose and notes.</li>
        <li>Showing trends and statistics based on your own data.</li>
        <li>
          Sharing your glucose in real time with followers you invite (family following).
        </li>
        <li>
          Saving your glucose history, and sharing your logbook with the followers you invite, so
          that you and they see the same chart (Dulce Pro, with your consent; see section 8.1).
        </li>
      </ul>
      <p>
        Some features require a <strong>Dulce Pro</strong> subscription (see section 8).
      </p>

      <h2 id="medical">3. Medical notice</h2>
      <p>
        Dulce is <strong>not</strong> a medical device or a substitute for professional
        judgement. The Service does not recommend insulin doses, does not diagnose or treat
        any condition, and must not be used to make clinical decisions instead of your
        endocrinologist, primary care physician or other healthcare professionals.
      </p>
      <p>
        The glucose data shown by Dulce comes from your CGM through third-party services and
        is subject to their technical limitations, reading delays and possible errors. Follow
        your CGM manufacturer&apos;s instructions about when to confirm a reading with a blood
        glucose meter, including when it does not match your symptoms or expectations.
      </p>
      <p>
        <strong>Do not rely on Dulce as your only alarm system.</strong> Delivery of
        notifications, Live Activities and watch updates depends on Apple, your CGM provider,
        network and your device settings, and cannot be guaranteed. Keep the alarm features
        of your official CGM app active. Dulce is a companion app and does not replace the
        official app from your CGM manufacturer.
      </p>
      <p>
        Saved chart history, the shared logbook, statistics and charts in Dulce are not a medical
        record. Do not use them, or anything else in Dulce, to make treatment decisions.
      </p>

      <h2 id="eligibility">4. Eligibility</h2>
      <p>
        To use the Service you must be at least 14 years old. If you are between 14 and 18,
        you need consent from a parent or legal guardian. If you manage an account on behalf
        of a minor, you are responsible for doing so in accordance with applicable law. On Android, you must be at least 18 years old to use Dulce, and the consent option above does not apply. A parent or legal guardian may still use Dulce on Android to follow a minor’s glucose.
      </p>

      <h2 id="accounts">5. Accounts and credentials</h2>
      <p>
        Dulce connects to FreeStyle Libre data through <strong>LibreLinkUp</strong>, to
        Dexcom data through <strong>Dexcom Share</strong>, to Medtronic data through{" "}
        <strong>Medtronic CareLink</strong>, or to a <strong>Nightscout</strong> site.
        You are responsible for the confidentiality of those credentials. Dulce stores them
        in the secure keychain of your device, with these exceptions, explained in the{" "}
        <Link href="/legal/privacy">Privacy Policy</Link>: for Dexcom with “Keep me signed in”,
        your password is also stored, encrypted, on our relay; for Medtronic CareLink, our relay
        holds the sign-in tokens Medtronic issues, never your password; and while Dulce keeps
        collecting your saved chart history after you sign out or remove the app (section 8.1),
        our relay keeps the sensor credential needed for it. We cannot recover lost credentials
        on behalf of your CGM provider. You must have the right to use the account you connect.
      </p>

      <h2 id="sharing">6. Family following</h2>
      <p>
        You decide who can follow your glucose, by sending them an invite. You are
        responsible for choosing your followers and can revoke their access at any time.
        Followers must not use Dulce as an emergency monitoring system: delivery of readings
        and alerts to followers is subject to the same limitations described in section 3.
        Saved chart history can have gaps, and followers may see less than you do. If you share
        your logbook, your followers see everything in it, including your free-text notes; do not
        write information about other people in notes you share.
      </p>

      <h2 id="license">7. License</h2>
      <p>
        We grant you a limited, non-exclusive, non-transferable and revocable license to use
        Dulce in accordance with these terms and for personal, non-commercial use.
      </p>

      <h2 id="subscriptions">8. Subscriptions (Dulce Pro)</h2>
      <p>
        The app is free to download and use with its core features. Some features (such as
        the Lock Screen Live Activity, Apple Watch real-time updates, glucose alerts, family following
        and saved chart history) require an auto-renewable <strong>Dulce Pro</strong> subscription:
      </p>
      <ul>
        <li>
          Available as a <strong>monthly</strong> or <strong>annual</strong> plan. The exact
          price is always shown in the App Store and on the purchase screen before you
          confirm.
        </li>
        <li>
          New subscribers may be offered a <strong>free trial</strong> (currently 14 days).
          When the trial ends, the subscription renews at the displayed price unless you
          cancel at least 24 hours before.
        </li>
        <li>
          Payment is charged to your Apple ID. Subscriptions renew automatically unless
          cancelled at least 24 hours before the end of the current period, in{" "}
          <strong>Settings → Apple ID → Subscriptions</strong> on your device.
        </li>
        <li>Refunds are handled by Apple under their terms.</li>
        <li>
          Nothing in these terms limits any mandatory consumer rights that apply to you. For
          trial dates, cancellation, renewal and refund options, follow the purchase screen and
          Apple&apos;s current subscription terms and account tools.
        </li>
      </ul>

      <h3>8.1 Saved chart history (Dulce Pro)</h3>
      <p>
        Saved chart history is part of Dulce Pro. It is used only if you accept it in the app, and
        you can turn it off at any time. Our <Link href="/legal/privacy">Privacy Policy</Link>{" "}
        (section 2.6) explains what is saved, who can see it and how to delete it.
      </p>
      <p>
        We try to save your history completely, but we do not guarantee that it is complete,
        continuous, correct or always available. It depends on your sensor session and on third
        parties (your sensor maker&apos;s service, Apple, Google and our hosting provider), and it
        can have gaps or be lost. It is not a medical record and not a backup: do not rely on it for
        any treatment decision, and keep the records you need in your sensor manufacturer&apos;s
        official app. Section 3 applies to it in full.
      </p>
      <p>
        We keep at most about 1 year of history. If your subscription ends or is refunded, saving
        stops and your saved history is deleted 90 days later; if you subscribe again within that
        time, it is available again. Free features keep working with the data on your device.
      </p>
      <p>
        Signing out or removing the app does not by itself delete your saved history. If you
        accepted it, Dulce keeps collecting your history while you are signed out or the app is
        removed, and keeps the sensor credential needed for that (for Dexcom with “Keep me signed
        in”, your password, encrypted) until collecting ends. Collecting ends when you sign in
        again, turn it off, choose “Stop and delete” when you sign out, use Delete account, your
        subscription ends, your sensor&apos;s service refuses the sign-in or keeps failing, or 1
        year has passed.
      </p>
      <p>
        If you share your logbook, your followers see everything in it, including free-text notes.
        You are responsible for what you write in notes you share, including information about
        other people. You can switch sharing off at any time, which deletes the shared copy.
      </p>
      <p>
        We may change, limit or stop this feature, for example to protect the Service, for legal
        reasons, to control its cost, or because a sensor maker&apos;s service no longer allows
        it. If we stop it, we will tell you in the app at least 30 days beforehand, unless a
        security, legal or third-party reason outside our control makes that impossible; during
        that time your saved history stays visible in the app and you can ask us by email for a
        copy. What you are entitled to in that case is described in section 10.
      </p>

      <h2 id="prohibited">9. Prohibited conduct</h2>
      <p>You may not:</p>
      <ul>
        <li>Use the Service for unlawful purposes or in ways that infringe third-party rights.</li>
        <li>Attempt to access systems, data or accounts you are not authorized to access.</li>
        <li>
          Reverse engineer or circumvent technical protection measures, except to the extent
          allowed by applicable law.
        </li>
        <li>Automate mass form submission or spam our infrastructure.</li>
      </ul>

      <h2 id="third-parties">10. Third-party services and sensor connections</h2>
      <p>
        Dulce connects to third-party services that you choose or that are required to operate:
        the sensor makers&apos; services LibreLinkUp (Abbott), Dexcom Share and Medtronic
        CareLink, and Nightscout sites run by you or someone you choose; Apple (including Apple
        Health, notifications and payments); Google (notifications and payments on Android);
        Cloudflare, which hosts our relay; and RevenueCat for subscription validation. Use of those
        services is governed by their own terms and policies. We are not responsible for their
        availability, accuracy or changes.
      </p>
      <p>
        Dulce reads your glucose data through the sensor makers&apos; own online services. Some of
        these connections use interfaces that are not official, not documented or not offered for
        apps like Dulce (for example Medtronic CareLink). The companies that run them can change,
        limit, block or close them at any time, without notice to us or to you. If that happens,
        some or all of Dulce can stop working for that sensor, temporarily or for good: live
        readings, alerts, the Lock Screen, widgets and watch, family following, saved chart history
        and collecting while you are away. We cannot prevent this, and we may not be able to fix it
        or to recover missing data. We will make reasonable efforts to restore the connection and to
        tell you in the app, but we cannot promise that we will succeed.
      </p>
      <p>
        If that happens: Dulce Pro is billed by Apple (or by Google Play, if you subscribed on
        Android), and refunds are decided by them under their rules; we cannot issue refunds
        ourselves. You can cancel at any time in your App Store or Google Play subscription settings
        so that the subscription does not renew, and you can ask Apple or Google for a refund.
        Nothing in this section limits any mandatory consumer rights you have, including your
        statutory remedies when a paid digital service does not work as agreed.
      </p>
      <p>
        Dulce is an independent product and is not affiliated with, endorsed by or sponsored by
        Abbott, Dexcom, Medtronic, the Nightscout project, Apple or Google. Their names and product
        names are trademarks of their owners and are used only to describe compatibility.
      </p>

      <h2 id="ip">11. Intellectual property</h2>
      <p>
        The Service, including code, design, brand and content published by us, is owned by
        Dulce and its licensors. Data you contribute (your logbook, your settings) remains
        yours.
      </p>

      <h2 id="disclaimers">12. Disclaimer of warranties</h2>
      <p>
        The Service is provided “as is” and “as available”. To the fullest extent permitted by
        applicable law, we do not warrant that the Service or any part of it (including readings,
        alerts, Live Activities, widgets, watch updates, saved chart history, family following and
        logbook sharing) will be uninterrupted, on time, complete, error-free or 100% secure, that
        data will not be lost, or that it will meet specific expectations. This is especially
        relevant for data from third-party CGM services: any delay, error or absence of data from
        the original provider may be reflected in Dulce. This does not affect your statutory rights
        as a consumer.
      </p>

      <h2 id="liability">13. Limitation of liability</h2>
      <p>
        Dulce is a companion to your CGM system, not a medical device. To the fullest extent
        permitted by applicable law:
      </p>
      <ul>
        <li>
          We are not liable for harm or loss resulting from decisions about insulin, medication,
          food, physical activity or medical care made on the basis of information shown in Dulce,
          or from relying on Dulce instead of your CGM system, its official app and alarms, a blood
          glucose meter or your healthcare team.
        </li>
        <li>
          We are not liable for readings, alerts, Live Activities, widgets, watch updates, saved
          chart history, family following or logbook sharing being late, incomplete, incorrect,
          unavailable or lost where this results from the causes described in sections 3, 8.1 and
          10 (including your device, network and operating system, and the services of your sensor
          maker, Apple or Google) or from other circumstances outside our reasonable control.
        </li>
        <li>
          We are not liable for indirect or consequential loss, loss of profits or loss of data.
          Saved chart history is not a backup.
        </li>
        <li>
          In all other cases, our total liability for all claims relating to the Service is limited
          to the amount you paid for Dulce Pro in the 12 months before the event that gave rise to
          the claim.
        </li>
      </ul>
      <p>
        None of these limitations applies to, and nothing in these terms excludes or limits, our
        liability for intent (wilful misconduct) or gross negligence; for death or personal injury
        caused by negligence; for fraud; under mandatory product liability law; or any other
        liability, or any consumer right (including your statutory rights when digital content or
        a digital service does not conform to the contract), that cannot be excluded or limited
        under the law that applies to you. Where that law allows a limitation only in part, it
        applies only to that extent.
      </p>

      <h2 id="indemnity">14. Indemnification</h2>
      <p>
        You agree to indemnify Dulce against any third-party claims arising from your use of
        the Service in breach of these terms or of the law.
      </p>

      <h2 id="changes">15. Changes to the Service or these terms</h2>
      <p>
        We may modify the Service and these terms to reflect new features, legal requirements
        or security considerations. We will let you know by email or inside the Service when
        the changes are material.
      </p>

      <h2 id="termination">16. Termination</h2>
      <p>
        You may stop using the Service at any time and delete your data from{" "}
        <strong>Settings → Delete account</strong>. Signing out or removing the app does not by
        itself delete your saved chart history or, if you accepted it, stop Dulce collecting it
        (section 8.1). We may suspend or terminate your access
        if you breach these terms or if you compromise the security or lawfulness of the
        Service.
      </p>

      <h2 id="law">17. Governing law and jurisdiction</h2>
      <p>
        These terms are governed by the laws of the country where the Service operator is
        established. If you are a consumer, this does not take away the protection of the
        mandatory rules of the country where you habitually live, and you may bring
        proceedings in the courts of your place of residence.
      </p>

      <h2 id="contact">18. Contact</h2>
      <p>
        For any questions about these terms, write to{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
