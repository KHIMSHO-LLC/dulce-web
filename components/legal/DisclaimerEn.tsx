{/* Factual safety wording reviewed against Abbott and Dexcom guidance on 2026-10-29; legal review remains outstanding. */}
export function DisclaimerEn() {
  return (
    <>
      <p>
        This Medical Disclaimer explains the limits of what Dulce can do for you. Read it
        alongside the instructions for your CGM system and the guidance of your healthcare team.
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
        monitoring system already produces (Abbott&apos;s LibreLinkUp or Dexcom Share). Its job is to present that information in a convenient, readable
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

      <h2 id="confirm">3. When to use a blood glucose meter</h2>
      <p>
        Follow the instructions for your own CGM system. Use a blood glucose meter when its
        manufacturer advises you to, including when a reading does not match your symptoms or
        expectations, or when a current number or trend is missing. Dulce displays data from an
        interstitial sensor, which can differ from blood glucose, especially when glucose is
        changing quickly.
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

      <h2 id="no-predictions">6. Indicative forecasts, no dose calculations</h2>
      <p>
        Dulce does not calculate insulin or carbohydrate doses and does not offer clinical
        advice. The optional predictive low alert only extrapolates how fast your latest readings
        are changing: it is indicative, can be wrong, and does not replace your CGM
        system&apos;s alarms or its instructions about when to use a blood glucose meter.
      </p>

      <h2 id="emergencies">7. Emergencies</h2>
      <p>
        Dulce does not handle emergencies. If you suspect a severe low or high, or face any
        medical emergency, follow your treatment plan and contact emergency services
        (<strong>112</strong> in the EU, <strong>911</strong> in the U.S.) or your healthcare
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
        Dulce depends on third-party services (Abbott / LibreLinkUp, Dexcom Share, Apple
        Health) to obtain your data. We do not control the availability, accuracy, or continuity
        of those services, and we are not responsible for outages or errors originating in them.
      </p>

      <h2 id="acceptance">10. Questions</h2>
      <p>
        For any questions about this disclaimer, email us at{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
