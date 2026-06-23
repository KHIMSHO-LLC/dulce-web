{/* TODO: Legal review by a healthcare attorney required before public launch. */}
export function DisclaimerEn() {
  return (
    <>
      <p>
        This Medical Disclaimer explains the limits of what Dulce can do for you. Please read
        it carefully: using the app means you understand and accept everything described here.
      </p>

      <blockquote>
        <p>
          Dulce is <strong>not a medical device</strong>. It is not intended to diagnose,
          treat, cure, or prevent any disease, or to make treatment decisions. It does not
          replace your glucose meter, your continuous glucose monitor (CGM), or the judgment of
          your healthcare team.
        </p>
      </blockquote>

      <h2 id="what-it-is">1. What Dulce is — and isn&apos;t</h2>
      <p>
        Dulce is a companion app that <strong>displays</strong> the glucose readings your
        monitoring system already produces (Abbott&apos;s LibreLinkUp, Dexcom, or your personal
        Nightscout instance). Its job is to present that information in a convenient, readable
        way. Dulce does not measure glucose, does not make sensors, and does not control any
        medical device.
      </p>
      <p>
        The official, authoritative source of your data is always your CGM manufacturer&apos;s
        own app and that system&apos;s safety alerts. If Dulce and the manufacturer&apos;s app
        show something different, <strong>the manufacturer&apos;s app takes precedence</strong>.
      </p>

      <h2 id="no-decisions">2. Don&apos;t make medical decisions on Dulce alone</h2>
      <p>
        Do not adjust your insulin, medication, food, or physical activity based solely on what
        you see in Dulce. Any decision about your treatment should follow the guidance of your
        doctor or healthcare team and use the tools they have prescribed for you.
      </p>

      <h2 id="confirm">3. Always confirm with a fingerstick</h2>
      <p>
        Before acting on a high or low reading — and especially when what you see doesn&apos;t
        match how you feel — confirm your glucose with a <strong>fingerstick</strong> (blood
        glucose meter). The values shown in Dulce come from an interstitial sensor and can
        differ from your actual blood glucose, particularly when it is changing quickly.
      </p>

      <h2 id="alerts">4. Alerts are not guaranteed</h2>
      <p>
        Dulce is not a safety alarm system. Notifications may be delayed or fail to arrive for
        reasons outside our control: a phone that is off, silenced, out of battery, or offline;
        disabled notification permissions; the operating system throttling the app in the
        background; or an outage at your CGM provider.{" "}
        <strong>Do not rely on Dulce to warn you of a low or high.</strong> Keep the alarms on
        your official CGM system enabled.
      </p>

      <h2 id="accuracy">5. Data accuracy and delay</h2>
      <p>
        Data may appear delayed, incomplete, or out of date because of network latency, sync
        intervals, or the state of third-party servers. When a reading is old, Dulce tries to
        indicate it, but no timestamp replaces a direct check. Treat every value as a reference,
        not a real-time clinical measurement.
      </p>

      <h2 id="no-predictions">6. No predictions, no dose calculations</h2>
      <p>
        Dulce displays data passively. It does not predict where your glucose is heading, does
        not calculate insulin or carbohydrate doses, and does not offer clinical advice. If we
        add features like these in the future, they will come with the appropriate information
        and warnings.
      </p>

      <h2 id="emergencies">7. Emergencies</h2>
      <p>
        Dulce does not handle emergencies. If you suspect a severe low or high, or face any
        medical emergency, follow your treatment plan and contact emergency services
        (<strong>112</strong> in Spain, <strong>911</strong> in the U.S.) or your healthcare
        professional.
      </p>

      <h2 id="healthcare-team">8. Talk to your healthcare team</h2>
      <p>
        The information in this app is provided for general informational purposes only and is
        not medical advice. Speak with your doctor or diabetes educator before changing any part
        of your treatment and for any questions about your health.
      </p>

      <h2 id="third-parties">9. Third-party data</h2>
      <p>
        Dulce depends on third-party services (Abbott / LibreLinkUp, Dexcom, Nightscout, Apple
        Health) to obtain your data. We do not control the availability, accuracy, or continuity
        of those services, and we are not responsible for outages or errors originating in them.
      </p>

      <h2 id="acceptance">10. Acceptance</h2>
      <p>
        By using Dulce you confirm that you have read and understood this Medical Disclaimer and
        that you take responsibility for managing your diabetes with authorized tools and the
        support of your healthcare team. If you do not agree, please do not use the app.
      </p>
      <p>
        For any questions about this disclaimer, email us at{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
