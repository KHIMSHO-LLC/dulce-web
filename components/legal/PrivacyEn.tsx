import { Link } from "@/i18n/navigation";

{/* Translation of the Spanish policy, which prevails. Drafting decisions and open points: DULCE/plans/legal-answers-2026-11-16.md. */}
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
        The data controller is <strong>Giorgi Khimshiashvili</strong>, operating as a sole
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
          to the relay as described below. For Medtronic CareLink, you enter your password on Medtronic’s own page, so Dulce never sees it, and Dulce receives sign-in tokens from Medtronic. For Nightscout, you enter your site address and an access token or API secret (Dulce keeps only the secret’s SHA-1 fingerprint). Exception for Dexcom: while “Keep me signed in” is on (Settings › Sensor, on by default), the app also sends your Dexcom password to the relay once, because Dexcom ends sessions every 24 hours; see below. If you use saved chart history and accepted collecting while you are away, it also lets the relay keep collecting your history after you sign out (see 2.6).
        </li>
        <li>
          <strong>Glucose readings</strong> fetched from LibreLinkUp, Dexcom Share, Medtronic CareLink or Nightscout, stored
          in a local database on your device (and, for Dulce Pro subscribers who accept saved chart
          history, also on the relay; see 2.6).
        </li>
        <li>
          <strong>Your logbook</strong>: carbohydrates, insulin (including doses read from a smart
          insulin pen or reported by a pump), exercise, manual glucose entries, weight, medication,
          protein, fat and calories (including values from a meal photo scan), labels and notes.
          Stored on your device. If you use saved chart history (Dulce Pro), your logbook is part of
          it and is also stored on the relay, in full, including free-text notes, unless you switch
          “Save my logbook” off. Whether your followers can see it is decided separately by “Share
          my logbook with family” (on by default, you can switch it off); see 2.6.
        </li>
        <li>
          <strong>Apple Health data</strong> (iPhone) or <strong>Health Connect data</strong>{" "}
          (Android), if you grant permission. See 2.2.1.
        </li>
        <li>
          <strong>Preferences</strong>: units, target range, language, theme, alert settings.
        </li>
      </ul>

      <h3>2.2.1 Apple Health and Health Connect</h3>
      <p>
        If you turn it on in Settings, Dulce reads blood glucose and carbohydrate records (on
        iPhone also insulin) from Apple Health or, on Android, from Health Connect. You choose
        each type, and you can turn access off at any time in Dulce&apos;s settings or in the
        system&apos;s health settings. On Android, Dulce only reads: it never writes to Health Connect. On iPhone, from version 1.0.7, if you turn on glucose in Dulce and allow it, Dulce also saves your sensor glucose readings to Apple Health, at most one every 5 minutes. You can stop this in Dulce’s settings or in the Health app. Readings saved there stay in Apple Health, under Apple’s terms, and other apps you allow can read them.
      </p>
      <p>
        We use this data only to show it in your chart and logbook. It is stored on your device,
        it is not sent to the Dulce relay or to us, and we never sell it, share it, or use it for
        advertising.
      </p>
      <p>
        Dulce&apos;s use of information received from Health Connect will adhere to the{" "}
        <a
          href="https://support.google.com/googleplay/android-developer/answer/12991134"
          target="_blank"
          rel="noopener noreferrer"
        >
          Health Connect Permissions policy
        </a>
        , including the Limited Use requirements.
      </p>

      <h3>2.2.2 Ad measurement (iOS)</h3>
      <p>
        To measure whether Dulce&apos;s own ads lead to installs and subscriptions, the iOS app
        uses Apple&apos;s SKAdNetwork, Apple&apos;s privacy-preserving ad attribution. The app
        only updates a coarse conversion value on your device (installed, trial started, monthly,
        yearly or lifetime subscription). Apple sends aggregated, delayed reports to the ad
        network; they do not identify you. This uses no advertising identifier and no tracking
        prompt, and it contains no glucose or health data.
      </p>
      <p>
        Separately, Dulce can share install and purchase events with Meta (Meta Platforms
        Ireland Ltd. for users in Europe). This is <strong>off</strong> by default: it only
        starts if you turn on “Share install and purchase events with Meta” in Settings, and you
        can turn it off again there at any time. Until you turn it on, the Meta SDK is not
        started and nothing is sent to Meta. If you turn it on, we share that the app was
        installed or opened, and that a subscription or trial was started (purchase events are
        sent by our payment provider, RevenueCat), together with an anonymous identifier created
        by the Meta SDK for this app and the technical data sent with any request (IP address,
        device model, operating system version). We never share glucose readings, any health
        data or health events, sensor account details, or your name or email address.
      </p>
      <p>
        Dulce does not show Apple&apos;s tracking prompt and does not collect the advertising
        identifier (IDFA). You are not tracked across other companies&apos; apps and websites.
        The legal basis for sharing with Meta is your consent (Art. 6(1)(a) GDPR), which you can
        withdraw at any time by turning the switch off.
      </p>
      <h3>2.3 The Dulce relay (real-time features)</h3>
      <p>
        When your CGM is connected, the app registers this installation with our relay so it
        can provide background updates, alerts, Apple Watch features and family following
        when you use them. The relay is a small server operated by us and hosted on Cloudflare.
        It fetches readings from LibreLinkUp, Dexcom Share, Medtronic CareLink or Nightscout and sends updates to your devices.
        The relay processes:
      </p>
      <ul>
        <li>
          <strong>A provider session token</strong> (not your password): a LibreLinkUp token
          or a Dexcom Share session ID, so it can fetch readings on your behalf. For Medtronic CareLink, the relay holds your CareLink sign-in tokens. For Nightscout, it holds your site address and your access token or the SHA-1 fingerprint of your API secret. For Dexcom, while “Keep me signed in” is on, the relay also stores your Dexcom password, encrypted (AES-256-GCM, with the key kept separately in Cloudflare’s secret store), and uses it only to sign in to Dexcom Share again when your session expires. It is never logged or shared, and it is deleted when you turn the option off or delete your account. When you sign out, it is deleted too, unless Dulce keeps collecting your saved chart history while you are away (see 2.6): then it stays, encrypted, only for as long as that collecting continues, and is deleted the moment it ends for any reason. If you choose “Stop and delete” when you sign out, it is deleted at once.
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
          kept as a short rolling window for Live Activity, watch and follower views. If you are a
          Dulce Pro subscriber and you accept saved chart history in the app, the relay also keeps
          your chart history for up to 1 year (see 2.6). Without it, your long-term history stays
          on your device only.
        </li>
        <li>
          <strong>Settings and technical device/app details</strong> needed to provide the
          service (units, target range, alert thresholds, language, time zone, platform and app
          version).
        </li>
        <li>
          <strong>Meal photos</strong>, only if you use “Estimate carbs from a photo”: passed on to Anthropic to estimate the carbohydrates and nutrition values, without being stored by the relay, and a daily
          count of the photos used (see 2.8).
        </li>
        <li>
          <strong>Usage events:</strong> setup, connection, subscription, paywall and feature-use events, plus any feedback option you tap, linked to the random installation ID and used to measure and improve the service. They don’t include glucose readings or message text.
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
        You can stop this processing by using Delete account in Settings. Signing out of your
        sensor account in Dulce stops live updates and alerts; if you use saved chart history,
        whether Dulce keeps collecting your history while you are signed out is your choice (see
        2.6). Delete account asks the relay to delete its active device, token, sharing and
        saved-history records.
        A minimal installation ID and first-registration timestamp are retained after deletion
        so a returning installation is not counted as new in internal connection metrics. This
        marker has no automatic expiry; email us if you want it erased too.
      </p>

      <h3>2.4 Family following</h3>
      <p>
        If you invite someone to follow you, the relay delivers your readings and alerts to their
        device from the moment they accept. Without saved chart history, earlier history is not
        shared. If you use saved chart history (Dulce Pro), your followers can also see your saved
        chart history, including readings from before they accepted, and, while logbook sharing is
        on, your shared logbook, including free-text notes (turning sharing on shows them the saved
        logbook of the last 90 days); they stop seeing it when you revoke them
        or pause sharing (see 2.6).
        Messages between you and your followers, including text you write, pass through the relay and Apple’s or Google’s push service to reach their devices. The relay doesn’t keep the message text or a message history. You can revoke a follower’s access at any time, and you can turn off
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

      <h3>2.6 Saved chart history (Dulce Pro)</h3>
      <p>
        <strong>What it is.</strong> If you have Dulce Pro and you accept it in the app, our relay
        saves your glucose history so that your chart and your followers’ chart are the same and
        have no holes, and so that your history is still there after you sign out, reinstall Dulce
        or change iPhone. If you do not have Dulce Pro, or you do not accept it, nothing is saved
        and your history stays on your device only.
      </p>
      <p>
        <strong>What is saved.</strong>
      </p>
      <ul>
        <li>
          Your glucose readings, each with its time, value and trend arrow: the history your
          sensor’s own service returns (LibreLinkUp, Dexcom Share, Medtronic CareLink or
          Nightscout), the readings the relay fetches, and, once when you accept, the history
          already on your phone (up to 90 days).
        </li>
        <li>
          Your logbook, which is part of saved chart history. Every logbook entry is saved with all
          its fields: carbohydrates, insulin (including doses read from a smart insulin pen or
          reported by a pump, and priming doses), exercise, manual glucose checks, weight,
          medication, protein, fat and calories (including values from a meal photo scan), labels
          and free-text notes, each with its time and amount. When you turn saved chart history on,
          the app tells you that your logbook is part of it and is saved too. If you accepted saved
          chart history before this version, your logbook is not saved until you agree in the app
          (a one-time notice with “Turn on” or “Not now”). You can change this at any time with the
          “Save my logbook” switch in the chart history settings.
        </li>
        <li>
          Your logbook for your family: the switch “Share my logbook with family” (on by default
          while saved chart history is on) only decides whether your followers can see your
          logbook. They see the shared entries (carbohydrates, insulin, exercise, manual glucose
          checks and free-text notes, each with its time and amount), never the full copy that only
          you can read. Turning sharing on shows the saved logbook of the last 90 days to the people
          who follow you.
        </li>
        <li>
          Not saved with it: your sensor account email, your name, the text of messages between you
          and your followers, and Apple Health or Health Connect data.
        </li>
      </ul>
      <p>
        <strong>Why.</strong> Only to provide this feature: the same, complete chart for you and the
        family members you invited, kept across sign-out, reinstall and a new phone, and your logbook
        comes back after a reinstall or on a new phone, like your readings. We do not use
        it for advertising, profiling or sale, and we do not share it with Meta or any analytics
        service.
      </p>
      <p>
        <strong>Legal basis.</strong> Your explicit consent (Art. 9(2)(a) GDPR), because glucose
        data is health data. The app asks before saving starts, separately for each sensor account:
        if you sign in with a different sensor account, it asks again. Nothing is saved before you
        answer, and app versions that do not ask save nothing. You can withdraw your consent at any
        time in Settings: saving stops and the saved copy on the relay (readings and logbook) is
        deleted at once.
        Withdrawing does not affect the lawfulness of the saving done before. Dulce Pro does not
        depend on this consent: without it, Dulce Pro works without saved history. The consent for
        saved chart history covers your logbook too: the app tells you so when you turn it on, and
        if you accepted before this version, your logbook is saved only after you agree in the app.
      </p>
      <p>
        <strong>Where.</strong> On the Dulce relay, in a database of our hosting provider
        Cloudflare, which processes it for us and may process data in the EU and other countries
        under its standard safeguards (see section 8). The same history and logbook also stay in the
        app’s local database on your phone.
      </p>
      <p>
        <strong>How long.</strong> While your Dulce Pro subscription (including a free trial) is
        active, we keep at most about 1 year of history and logbook; older days are removed
        automatically. If your subscription ends or is refunded, saving stops and the saved
        history (readings and logbook) is deleted 90 days later; if you subscribe again within those 90 days, it
        is still there.
      </p>
      <p>
        <strong>Collecting while you are signed out or the app is removed.</strong> If you accepted
        it (the app tells you on the consent screen, in a one-time notice, or when you sign out),
        the relay keeps collecting your sensor history after you sign out of your sensor account in
        Dulce or remove the app, a few times a day rather than every minute, using the sensor
        credential it already holds:
      </p>
      <ul>
        <li>
          LibreLinkUp: the session token. Nightscout: your site address and your access token or
          the fingerprint of your API secret.
        </li>
        <li>
          Medtronic CareLink: the sign-in tokens Medtronic issued to Dulce (never your password),
          which the relay refreshes as Medtronic requires.
        </li>
        <li>
          Dexcom Share: if “Keep me signed in” is on, your Dexcom password, encrypted as described in
          2.3. If it is off, collecting stops about a day after your last sign-in, because Dexcom
          ends the session.
        </li>
      </ul>
      <p>
        Collecting while you are away ends at the first of these: you sign in to Dulce again with
        the same sensor account; you turn it off in Settings or choose “Stop and delete” when you
        sign out; you turn off saved chart history or use Delete account; your Dulce Pro
        subscription ends; your sensor’s service refuses the sign-in or keeps failing for about a
        week; or 1 year has passed. When it ends, the credential kept for it is deleted. The
        history already saved stays until you delete it or the period above runs out, unless you
        chose to delete it. If you remove the app without signing out, the app cannot ask you at
        that moment: collecting continues only if you had already accepted it; to stop it, write
        to us (see “How to turn it off and delete it” below). While you are signed out or away,
        your followers get no live readings, alerts or new history.
      </p>
      <p>
        <strong>It can have gaps or be lost.</strong> Saved history is a convenience: it is not a
        medical record and not a backup. It can have gaps or be lost, for example when your sensor
        session expires or you change your sensor password, when Dexcom ends the session and “Keep
        me signed in” is off, when your sensor’s service has an outage or has not received data from
        your phone yet, when your subscription ends, when you reinstall Dulce on Android or move to
        an iPhone without your iCloud Keychain, when you use Delete account, when a sensor maker
        changes or closes its service, or because of a fault on our side. Keep the records your
        doctor needs in your sensor manufacturer’s official app.
      </p>
      <p>
        <strong>Who can see it.</strong> You, and the followers you invited while you share with
        them: they see your saved chart history (including readings from before they accepted)
        and, while logbook sharing is on, your shared logbook including free-text notes. They stop
        seeing it when you revoke them, when sharing is paused, or when you delete your history.
        They never see the full logbook copy that only you can read. Turning sharing on shows
        them the saved logbook of the last 90 days. Your logbook on your phone stays when
        you switch sharing off. Notes you share can be read by your followers, so do not write information
        about other people in notes you share. Someone signed in to the same sensor account on their
        own phone does not get your saved history through Dulce. The relay processes this data
        automatically to deliver it; we do not look at an individual user’s history or notes, except
        where needed to fix a problem you report to us, to keep the service secure, or where the law
        requires it.
      </p>
      <p>
        <strong>How we recognise your history without an account.</strong> Dulce has no user
        account. Your history is linked to a random secret “history key” created on your phone,
        combined with an identifier of your sensor account’s patient (a number or username given by
        your sensor’s service, or a fingerprint of your Nightscout address), never your sensor
        email. On iPhone, if you use iCloud Keychain, the history key is synced through your own
        iCloud Keychain, so your other iPhones on the same Apple Account share the same history; for
        the same reason, turning saving off on one of them turns it off on the others. Delete account
        removes the key from your iCloud Keychain, so Dulce on your other iPhones starts a fresh
        history. If you sign in with a different sensor account on the same phone, the histories are
        not mixed.
      </p>
      <p>
        <strong>How to turn it off and delete it.</strong>
      </p>
      <ul>
        <li>
          In the app, turn off “Save chart history” in Settings and confirm “Stop and delete”: the
          saved copy on the relay (readings and logbook) is deleted at once.
        </li>
        <li>
          In the app, turn off “Save my logbook” in the chart history settings: while logbook
          sharing is off, the saved logbook on the relay is deleted. Your readings stay saved.
        </li>
        <li>
          In the app, turn off “Keep collecting when I’m signed out or the app is removed”: Dulce
          no longer collects after you sign out or remove the app, and keeps no sensor credential
          for it.
        </li>
        <li>
          In the app, turn off “Share my logbook with family”: your followers can no longer see
          your logbook. The saved copy stays on the relay for you while “Save my logbook” is on,
          and is deleted if it is off.
        </li>
        <li>When you sign out, choose “Stop and delete” (or “Delete it”).</li>
        <li>Use Settings → Delete account: everything is deleted, as described in section 9.</li>
        <li>
          Without the app, write to{" "}
          <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>. Because there is no
          account, include your Support ID (in the app: Settings › Account › Support ID) or the
          contact email you saved (section 2.7) if you have them; otherwise we will ask you for
          information that lets us find your data (for example your sensor service and when you
          last used Dulce). We can only act on data we can identify, and we will tell you if we
          cannot.
        </li>
      </ul>

      <h3>2.7 Contact email (optional)</h3>
      <p>
        Dulce works without an email address. If you want, you can save a contact email in the app.
        We store it on the Dulce relay, linked to your installation (the Support ID shown in the
        app), and use it only to:
      </p>
      <ul>
        <li>answer your support requests and find your installation when you write to us;</li>
        <li>
          write to you about your Dulce installation or subscription, for example a problem with
          your sensor connection, a change to this policy or the terms, or a free month we offer
          you.
        </li>
      </ul>
      <p>
        We do not use it for marketing or newsletters unless you agree to that separately, and we
        do not share it with Meta, analytics services or anyone else, except our hosting provider
        Cloudflare, which stores it for us. It is never written to logs. Because it is linked to
        your installation, it lets us see who the installation belongs to when we help you (for
        example your subscription status or whether you use family sharing); support does not see
        your glucose readings.
      </p>
      <p>
        <strong>Legal basis:</strong> your consent (Art. 6(1)(a) GDPR). Giving it is optional, and
        you can change or remove it in the app at any time; removing it deletes it from the relay.{" "}
        <strong>How long:</strong> until you remove it, use Delete account or ask us to delete it.
        It stays when you sign out of your sensor account, so that we can still help you then.
        Emails you send us are handled as described for contact messages in section 6.
      </p>

      <h3>2.8 Carb estimate from a photo (optional)</h3>
      <p>
        In the add-entry sheet you can use “Estimate carbs from a photo”. Dulce takes a meal photo
        only when you choose to use it. Using it is optional, and the app asks you before your
        first photo. The feature is not offered in some countries.
      </p>
      <ul>
        <li>
          <strong>Where the photo goes.</strong> The app sends the photo through the Dulce relay to
          Anthropic (Anthropic, PBC, United States), an AI service provider, which processes it on
          our behalf to estimate the carbohydrates in the food and, where the app shows them, its protein, fat and calories.
        </li>
        <li>
          <strong>What is sent with it.</strong> Only the app&apos;s language, so that food names
          come back in that language. Nothing else: no name, email, device identifier, glucose
          readings or other health data. Before sending, the app shrinks and re-encodes the photo,
          which removes location and camera metadata.
        </li>
        <li>
          <strong>What Dulce keeps.</strong> Dulce does not store the photo or the result on its
          servers. The relay keeps only a count of how many photos your device has used that day,
          to apply the daily limit; the count is deleted after two days.
        </li>
        <li>
          <strong>What you save.</strong> The estimate is put into the carbs field and the food names into the entry&apos;s note; if you have turned on the optional nutrition fields, the protein, fat and calorie values go into those fields too. You can change all of it before you save. What you save is
          a normal logbook entry, handled like any other logbook entry (sections 2.2 and 2.6).
        </li>
        <li>
          <strong>What Anthropic keeps.</strong> Anthropic deletes API inputs and outputs within 30
          days. If its automated safety systems flag a request as a possible violation of its usage
          policy, it may keep that input and output for up to 2 years and the safety classification
          scores for up to 7 years. Anthropic does not use this data to train its models.
        </li>
      </ul>
      <p>
        Photograph only your food, not people or documents.
      </p>
      <p>
        <strong>Legal basis:</strong> your consent (Art. 6(1)(a) GDPR) and, where a photo could
        reveal information about your health, your explicit consent (Art. 9(2)(a) GDPR), which the
        app asks for before your first photo. You can withdraw it at any time by simply no longer
        using the feature. Anthropic processes the photo in the United States (section 8).
      </p>

      <h2 id="purpose">3. Why we use your data</h2>
      <ul>
        <li>Show your glucose on your devices and, if you choose, your followers’ devices.</li>
        <li>Deliver the alerts you configure.</li>
        <li>
          Keep your chart history so that you and your followers see the same chart, also after you
          sign out, reinstall or change phone, keep your logbook, and share it with the family you invited
          (Dulce Pro, with your consent; section 2.6).
        </li>
        <li>
          If you choose to, estimate the carbohydrates in a meal from a photo you take (section
          2.8).
        </li>
        <li>Validate your subscription and unlock Pro features.</li>
        <li>
          If you saved a contact email, answer your support requests and write to you about your
          installation or subscription (section 2.7).
        </li>
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
          when you connect your sensor in the app and use the related features (live readings,
          alerts, Live Activity, widgets, watch and family following). You give it by connecting
          your sensor after the app has explained what Dulce does and linked to this policy. You
          can withdraw it at any time by signing out of your sensor account in Dulce, which stops
          the relay processing (except collecting your saved chart history while you are away, if
          you accepted it; section 2.6), by using Delete account, or by writing to us.
        </li>
        <li>
          <strong>Explicit consent</strong> (Art. 9(2)(a) GDPR) for saved chart history (which includes your logbook),
          collecting while you are signed out or the app is removed, and logbook sharing: asked in
          the app, for each sensor account, before saving starts, and withdrawable at any time in
          Settings (section 2.6).
        </li>
        <li>
          <strong>Contract</strong> (Art. 6(1)(b) GDPR): providing the app and the features
          you subscribe to.
        </li>
        <li>
          <strong>Consent</strong> (Art. 6(1)(a) GDPR): when you join the waitlist or beta.
        </li>
        <li>
          <strong>Consent</strong> (Art. 6(1)(a) GDPR): also for the optional ad measurement
          described in section 2.2.2 (the Meta switch); you can withdraw it at any time in Settings.
        </li>
        <li>
          <strong>Consent</strong> (Art. 6(1)(a) GDPR): for the optional contact email in section
          2.7; you can remove it at any time in the app.
        </li>
        <li>
          <strong>Consent</strong> (Art. 6(1)(a) GDPR) and, where a photo could reveal information
          about your health, <strong>explicit consent</strong> (Art. 9(2)(a) GDPR): for the optional
          carb estimate from a photo in section 2.8, asked in the app before your first photo; you
          can withdraw it at any time by no longer using the feature.
        </li>
        <li>
          <strong>Legitimate interest</strong> (Art. 6(1)(f) GDPR): site security and answering
          questions you send us through the contact form or by email. Website analytics: your
          consent where our Cookie Policy asks for it (in the EEA, the UK and Switzerland, or when
          we cannot tell where you are), and elsewhere our legitimate interest in understanding how
          the site is used.
        </li>
      </ul>

      <h2 id="health">5. Special category data (Art. 9 GDPR)</h2>
      <p>
        Glucose readings and other health data are <strong>special categories</strong> of
        personal data. Our approach:
      </p>
      <ul>
        <li>
          Your long-term glucose history, logbook and Apple Health or Health Connect data are
          processed and stored on your device. Recent readings are also processed by the relay as described above. If you use Dulce
          Pro and accept saved chart history, your glucose history and your logbook are also stored on
          the relay (section 2.6).
        </li>
        <li>
          When your CGM is connected, the relay processes recent readings needed for the
          background and sharing features you use; it keeps a short rolling window and, only for
          Dulce Pro subscribers who accept it, the saved chart history described in 2.6.
        </li>
        <li>
          If you use the carb estimate from a photo, the meal photo goes through the relay to
          Anthropic only to produce the estimate, without your glucose readings or other health
          data (section 2.8).
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
          Settings → Delete account. Exception: while Dulce keeps collecting your saved chart
          history after you sign out or remove the app (section 2.6), the sensor credential needed
          for it (LibreLinkUp session token, Nightscout site token, Medtronic CareLink sign-in
          tokens or the encrypted Dexcom password) is kept only for that and deleted when collecting
          ends, at the latest after 1 year.
        </li>
        <li>
          <strong>Saved chart history and logbook (Dulce Pro):</strong> while your
          subscription is active, at most about 1 year, older days removed automatically. Deleted
          at once when you turn saving off, choose “Stop and delete” at sign-out or use Delete
          account (the logbook alone also when you switch “Save my logbook” off while logbook
          sharing is off); deleted 90 days
          after your subscription ends or is refunded.
        </li>
        <li>
          <strong>Contact email:</strong> until you remove it in the app, use Delete account or ask
          us to delete it (section 2.7).
        </li>
        <li>
          <strong>Carb estimate from a photo:</strong> Dulce does not store the photo or the result
          on its servers; the daily photo count is deleted after two days. Anthropic deletes the
          photo and the result within 30 days, except as described in section 2.8.
        </li>
        <li>
          <strong>Backups:</strong> data deleted from the relay can remain in our hosting
          provider&apos;s automatic database backups for up to 30 days, after which it is
          overwritten. We use these backups only to recover from a fault.
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
        Abbott, Dexcom, Medtronic, Apple and Google also provide services under their own terms and
        privacy policies:
      </p>
      <ul>
        <li>
          <strong>Cloudflare</strong> — hosts the Dulce relay described above and stores the saved
          chart history and logbook (section 2.6) and the optional contact email (section
          2.7), as our processor.
        </li>
        <li>
          <strong>Anthropic (Anthropic, PBC, United States)</strong> — AI service provider that
          estimates the carbohydrates in a meal photo when you use “Estimate carbs from a photo”
          (section 2.8), as our processor.
        </li>
        <li>
          <strong>Apple</strong> — push notifications (APNs), Live Activities, Apple Health
          (on-device), payments, and, if you use iCloud Keychain, keeping your history key in your
          own iCloud Keychain (section 2.6).
        </li>
        <li>
          <strong>Google Firebase</strong> — push notifications on Android.
        </li>
        <li>
          <strong>Google Health Connect</strong> — the health data store on Android, read by Dulce
          on your device only.
        </li>
        <li>
          <strong>Google Analytics 4 (Google Ireland Ltd.)</strong> — website analytics when
          permitted under the regional consent settings described in our Cookie Policy.
        </li>
        <li>
          <strong>RevenueCat</strong> — subscription validation (pseudonymous ID only).
        </li>
        <li>
          <strong>Meta (Meta Platforms Ireland Ltd.)</strong> — only if you turn on sharing with Meta
          in the app (section 2.2.2).
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
        <li>
          <strong>Medtronic (CareLink)</strong> — if you connect CareLink, your device and our relay connect to Medtronic’s service using sign-in tokens to fetch your readings. Medtronic’s own privacy terms apply to that service.
        </li>
        <li>
          <strong>Nightscout</strong> — if you connect Nightscout, your device and our relay fetch readings from the site you run or choose. Whoever hosts that site is responsible for it.
        </li>
      </ul>
      <p>
        We never sell, rent or hand over your data to third parties for advertising or
        commercial purposes. The only advertising-related sharing is the optional ad
        measurement in section 2.2.2 (Apple&apos;s aggregated SKAdNetwork values, and sharing with Meta, which stays off unless you turn it on).
      </p>

      <h2 id="transfers">8. International transfers</h2>
      <p>
        Some providers and services we use (Cloudflare, Anthropic, RevenueCat, Resend, Vercel, Meta,
        Apple and Google) may process data in the US or other countries. Where GDPR transfer safeguards
        are required, the applicable mechanism depends on the provider and service and may
        include an adequacy decision or the European Commission’s Standard Contractual Clauses
        (SCCs). Google LLC is listed as active under the EU-US Data Privacy Framework, within
        the scope of its certification. Contact us for details and copies of applicable
        safeguards at{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
      <p>
        Saved chart history and logbook entries are stored in a database of our hosting
        provider Cloudflare, which may process data in the EU and other countries under the
        safeguards described above.
      </p>
      <p>
        Meal photos you send for a carb estimate (section 2.8) are processed by Anthropic in the
        United States under its Data Processing Addendum, which includes the European
        Commission’s Standard Contractual Clauses and the UK addendum to them.
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
          active relay records, including your saved chart history and logbook; it also
          removes Dulce’s history key from your iCloud Keychain, so Dulce on your other iPhones
          starts a fresh history. You can also turn off saved chart history in Settings, which
          deletes the saved copy (readings and logbook) at once, and switch off “Save my logbook”
          separately, which deletes the saved logbook while logbook sharing is off. The app has no export button for saved history; write to us
          and we will send you a copy in a common electronic format (for example CSV). The
          minimal installation marker described above remains until you request its erasure.
          You can exercise any of these rights by writing to{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>. Because Dulce has no
        accounts, include your Support ID (in the app: Settings › Account › Support ID) or the
        contact email you saved, if you have them; otherwise we will ask for other information
        that lets us find your data, and we can only act on data we can identify. We respond
        within one month. If a request is complex or we receive many requests, the GDPR permits
        an extension of up to two further months; we will explain any extension within the first
        month.
      </p>
      <p>
        If a Dulce user has died, a close relative or heir can ask us to delete their data and stop
        any collecting of their history; we will ask for reasonable proof.
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
        Dulce is not directed at children under the age of 14. On Android, Dulce is intended for adults aged 18 and over. A parent or legal guardian may
        use Dulce to follow a minor’s glucose under their own responsibility; in that case the parent
        or guardian gives or refuses the consent for saved chart history and logbook sharing. If
        you are between 14 and 18, you need a parent&apos;s or legal guardian&apos;s consent to use
        Dulce (Terms of Use, section 4), and this includes saved chart history, logbook sharing
        and the contact email. The carb estimate from a photo (section 2.8) is available to
        everyone who may use Dulce under the Terms of Use, including users between 14 and 18 on
        iPhone who have that consent. If you believe a
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
        If we make material changes, we tell you before they apply: in the app (in the “What’s
        new” note of the app update that brings them, and in a notice that links to this page)
        and, if you saved a contact email, by email. This page shows the date of the current
        version, a short summary of what changed and a link to the previous version. Where a
        change needs your consent, for example a new use of your health data, the app asks you
        first and nothing new happens until you answer; app versions that do not ask keep working
        as before. Changes to saved chart history that take something away from you are announced
        in the app at least 30 days beforehand (Terms of Use, sections 8.1 and 15).
      </p>

      <h2 id="contact">13. Contact</h2>
      <p>
        For any questions about this Privacy Policy or the processing of your data, write to{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
