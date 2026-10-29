import { GA_ID } from "@/lib/consent";

{/* Translation of the Spanish/English policy. TODO: review local legal terminology; Spanish counsel review remains outstanding. */}
export function CookiesDe() {
  return (
    <>
      <p>
        Diese Cookie-Richtlinie erklärt, welche Cookies und ähnlichen Technologien die Website{" "}
        <strong>dulceglucosa.com</strong> verwendet und warum.
      </p>

      <h2 id="what">1. Was ist ein Cookie?</h2>
      <p>
        Ein Cookie ist eine kleine Textdatei, die eine Website in deinem Browser speichert, um sich
        Informationen zwischen Seiten oder Besuchen zu merken. Cookies können{" "}
        <strong>technisch</strong> (für den Betrieb der Website nötig) oder{" "}
        <strong>nicht technisch</strong> (Statistik, Werbung usw.) sein.
      </p>

      <h2 id="ours">2. Cookies, die wir verwenden</h2>
      {GA_ID ? (
        <p>
          Dulce verwendet <strong>technisch notwendige Cookies</strong> und Cookies von{" "}
          <strong>Google Analytics</strong>. Im EWR, im Vereinigten Königreich und in der Schweiz
          sowie wenn wir deinen Standort nicht bestimmen können, wird es erst nach deiner
          Zustimmung zur Statistik geladen. Werbe-Tracking-Cookies verwenden wir nicht.
        </p>
      ) : (
        <p>
          Dulce verwendet <strong>nur technisch notwendige Cookies</strong>. Werbe-Tracking-Cookies
          oder Statistik-Cookies von Dritten verwenden wir nicht.
        </p>
      )}

      <h3>2.1 Sitzungs- und technische Cookies</h3>
      <ul>
        <li>
          <strong>NEXT_LOCALE</strong>: merkt sich deine Sprache zwischen den Seiten. Typ:
          technisch. Dauer: bis zu 1 Jahr.
        </li>
        <li>
          <strong>dulce-region</strong>: dein Ländercode, den unsere Hosting-Plattform aus der
          Anfrage ableitet und in einem Sitzungscookie speichert, um zu entscheiden, ob wir um
          Zustimmung zur Statistik fragen. Für diesen Zweck speichern wir nicht die rohe IP-
          Adresse. Typ: technisch. Dauer: bis du den Browser schließt.
        </li>
        <li>
          <strong>dulce:analytics-consent</strong>: ein localStorage-Eintrag im Browser, kein
          Cookie. Er merkt sich, ob du Google Analytics zugestimmt oder es abgelehnt hast, bis
          du die Browserdaten dieser Website löschst.
        </li>
      </ul>

      <h3>2.2 Zusammengefasste Statistik ohne Cookies</h3>
      <p>
        Wir nutzen <strong>Vercel Analytics</strong> für Seitenaufrufe und Ladeleistung{" "}
        <strong>ohne Cookies</strong>. Laut Vercel verwendet die Besucherstatistik einen aus der
        Anfrage abgeleiteten Hash, der nach 24 Stunden abläuft; Berichte können URL, Verweis,
        ungefähren Standort, Browser und Betriebssystem enthalten. Wir nutzen zusammengefasste
        Berichte. Dieser Dienst setzt keine Cookies; die Daten unterliegen dennoch dem geltenden
        Datenschutzrecht.
      </p>

      {GA_ID ? (
        <>
          <h3>2.3 Google Analytics</h3>
          <p>
            Im EWR, im Vereinigten Königreich und in der Schweiz (oder wenn wir deinen Standort
            nicht bestimmen können) nur, wenn du Statistik-Cookies zustimmst, und anderswo,
            solange du es nicht ausschaltest, nutzen wir{" "}
            <strong>Google Analytics 4</strong> (Google Ireland Ltd.), um Besuche zu zählen und zu
            erfassen, welche Seiten besucht werden, welche App-Store-Links mit welcher Kampagne
            geklickt werden und wie viele Wartelisten-Anmeldungen erfolgreich sind. Es setzt die Cookies{" "}
            <strong>_ga</strong> und <strong>_ga_*</strong> (Dauer: bis zu 2 Jahre). Google kann
            diese Daten im Rahmen des EU-US Data Privacy Framework in den USA verarbeiten.
            Werbefunktionen, Google Signals und personalisierte Werbung sind ausgeschaltet. Wenn
            du ablehnst, wird Google Analytics gar nicht geladen.
          </p>
        </>
      ) : null}

      <h2 id="consent">3. Einwilligung</h2>
      <p>
        Technisch notwendige Cookies können ohne Einwilligung verwendet werden, wenn sie die
        geltende Ausnahme nach spanischem Cookie-Recht (Art. 22 LSSI) erfüllen. Zugehörige
        personenbezogene Daten unterliegen weiterhin dem Datenschutzrecht.{" "}
        {GA_ID
          ? "Im EWR, im Vereinigten Königreich und in der Schweiz sowie wenn wir deinen Standort nicht bestimmen können, werden Google-Analytics-Cookies erst gesetzt, nachdem du sie in unserem Banner akzeptiert hast. Überall kannst du deine Wahl jederzeit über „Cookie-Einstellungen“ unten auf jeder Seite ändern."
          : "Sollten wir je nicht technische Cookies einführen, würden wir vorher über ein passendes Banner um deine Einwilligung bitten."}
      </p>

      <h2 id="manage">4. Cookies verwalten</h2>
      <p>
        Du kannst gespeicherte Cookies löschen oder deinen Browser so einstellen, dass er keine
        annimmt:
      </p>
      <ul>
        <li>
          <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">
            Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen"
            target="_blank"
            rel="noopener"
          >
            Firefox
          </a>
        </li>
        <li>
          <a href="https://support.apple.com/HT201265" target="_blank" rel="noopener">
            Safari (iOS / macOS)
          </a>
        </li>
      </ul>
      <p>
        Wenn du technische Cookies blockierst, funktionieren manche Funktionen (zum Beispiel das
        Merken deiner Sprache) eventuell nicht richtig.
      </p>

      <h2 id="changes">5. Änderungen dieser Richtlinie</h2>
      <p>
        Wenn wir Cookies hinzufügen oder entfernen, aktualisieren wir diese Seite. Das Datum der
        letzten Änderung steht oben.
      </p>

      <h2 id="contact">6. Kontakt</h2>
      <p>
        Bei Fragen zu Cookies schreib an{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
