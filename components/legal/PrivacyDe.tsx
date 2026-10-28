import { Link } from "@/i18n/navigation";

{/* Translation of PrivacyEs/PrivacyEn; the Spanish version prevails. TODO: legal review. */}
export function PrivacyDe() {
  return (
    <>
      <p>
        Diese Datenschutzerklärung erklärt, welche personenbezogenen Daten Dulce erhebt, wie wir
        sie verwenden und welche Rechte du daran hast. Sie gilt für diese Website (
        <strong>dulceglucosa.com</strong>) und für die mobile App Dulce.
      </p>

      <h2 id="controller">1. Verantwortlicher</h2>
      <p>
        Verantwortlicher ist <strong>Giorgio Khimshiashvili</strong>, tätig als Einzelunternehmer
        mit Sitz in Spanien. Bei allen Fragen zu deinen Daten erreichst du uns unter{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>

      <h2 id="data">2. Welche Daten wir erheben</h2>
      <h3>2.1 Website</h3>
      <ul>
        <li>
          <strong>Warteliste:</strong> deine E-Mail-Adresse und die Sprache deiner Sitzung.
        </li>
        <li>
          <strong>Beta-Formular:</strong> Name, E-Mail, CGM-Gerät und Region. Optional alle
          Anmerkungen, die du teilen möchtest.
        </li>
        <li>
          <strong>Minimale technische Daten:</strong> ein anonymer Hash (SHA-256) deiner
          IP-Adresse, kombiniert mit einem täglich wechselnden Salt, nur um Missbrauch der
          Formulare zu begrenzen. Die IP-Adresse selbst speichern wir nie.
        </li>
        <li>
          <strong>Anonyme Statistik:</strong> Wir nutzen Vercel Analytics, das keine Cookies
          setzt und keine persönlichen Kennungen erhebt. Es misst nur Seitenaufrufe und
          Leistung.
        </li>
      </ul>

      <h3>2.2 In der App, auf deinem Gerät</h3>
      <ul>
        <li>
          <strong>Deine LibreLinkUp-Zugangsdaten.</strong> Du meldest dich mit E-Mail und
          Passwort deines LibreLinkUp-Kontos (Abbott) an. Sie werden nur im sicheren
          Schlüsselbund deines Geräts gespeichert und dienen dazu, deine Glukosewerte vom Dienst
          von Abbott abzurufen. Sie werden nie an Server von Dulce gesendet.
        </li>
        <li>
          <strong>Glukosewerte</strong> aus LibreLinkUp, gespeichert in einer lokalen Datenbank
          auf deinem Gerät.
        </li>
        <li>
          <strong>Dein Logbuch</strong>: Kohlenhydrate, Insulin, manuelle Glukoseeinträge und
          Notizen. Lokal gespeichert.
        </li>
        <li>
          <strong>Daten aus Apple Health</strong>, nur lesend, wenn du die Berechtigung erteilst.
        </li>
        <li>
          <strong>Einstellungen</strong>: Einheiten, Zielbereich, Sprache, Design,
          Warnungseinstellungen.
        </li>
      </ul>

      <h3>2.3 Das Dulce-Relay (Echtzeitfunktionen)</h3>
      <p>
        Einige Funktionen müssen auch bei gesperrtem Handy oder geschlossener App weiterlaufen:
        die Live-Aktivität auf dem Sperrbildschirm, Glukosewarnungen, Updates auf der Apple
        Watch und das Folgen durch die Familie. Dafür ruft ein kleiner, von uns betriebener
        Server (das „Relay“, gehostet bei Cloudflare) deine Werte bei LibreLinkUp ab und sendet
        sie an deine Geräte. Nur wenn du eine dieser Funktionen einschaltest, verarbeitet das
        Relay:
      </p>
      <ul>
        <li>
          <strong>Ein LibreLinkUp-Sitzungstoken</strong> (nicht dein Passwort), damit es Werte
          in deinem Namen abrufen kann.
        </li>
        <li>
          <strong>Anonyme Push-Tokens</strong> deiner Geräte, ausgestellt von Apple oder Google.
          Sie kennzeichnen ein Gerät für Mitteilungen, nicht dich als Person.
        </li>
        <li>
          <strong>Deine neuesten Glukosewerte</strong>, als kurzes, laufend überschriebenes
          Zeitfenster, das für Live-Aktivität, Uhr und Follower-Ansicht nötig ist. Das Relay ist
          kein Langzeitspeicher deines Gesundheitsverlaufs; der bleibt auf deinem Gerät.
        </li>
        <li>
          <strong>Die minimalen Einstellungen</strong>, die für die Darstellung nötig sind
          (Einheiten, Zielbereich, Warngrenzen, Sprache).
        </li>
      </ul>
      <p>
        Wenn du diese Funktionen nie einschaltest, wird nichts an Server von Dulce gesendet.
        Wenn du sie ausschaltest, dich abmeldest oder in den Einstellungen dein Konto löschst,
        werden die zugehörigen Relay-Daten gelöscht.
      </p>

      <h3>2.4 Folgen durch die Familie</h3>
      <p>
        Wenn du jemanden einlädst, dir zu folgen, liefert das Relay ab dem Moment der Annahme
        deine neuesten Werte und Warnungen an dessen Gerät; frühere Verläufe werden nicht
        geteilt. Auch kurze vordefinierte Nachrichten zwischen dir und deinen Followern laufen
        über das Relay. Du kannst einem Follower den Zugang jederzeit entziehen und
        Follower-Nachrichten ganz ausschalten.
      </p>

      <h3>2.5 Käufe</h3>
      <p>
        Abonnements werden von <strong>Apple</strong> abgewickelt. Deinen Namen, deine Karte
        oder Rechnungsdaten sehen wir nie. Wir nutzen <strong>RevenueCat</strong>, um
        Abonnements mit einer zufälligen, von der App erzeugten Kennung zu prüfen, nicht mit
        deiner E-Mail oder Identität.
      </p>

      <h2 id="purpose">3. Wofür wir deine Daten verwenden</h2>
      <ul>
        <li>Deine Glukose auf deinen Geräten und, wenn du willst, auf denen deiner Follower anzeigen.</li>
        <li>Die Warnungen zustellen, die du einrichtest.</li>
        <li>Dein Abonnement prüfen und Pro-Funktionen freischalten.</li>
        <li>Dir mitteilen, wann Dulce verfügbar ist (Warteliste).</li>
        <li>Die Website vor Missbrauch schützen (IP-Hash, Begrenzung).</li>
        <li>Verstehen, welche Seiten gut funktionieren (anonyme Statistik).</li>
        <li>Gesetzliche Pflichten erfüllen und auf Anfragen zu deinen Rechten antworten.</li>
      </ul>

      <h2 id="legal-basis">4. Rechtsgrundlage</h2>
      <ul>
        <li>
          <strong>Ausdrückliche Einwilligung</strong> (Art. 9 Abs. 2 lit. a DSGVO): Verarbeitung
          deiner Glukosedaten über das Relay, wenn du Echtzeitfunktionen oder das Folgen durch
          die Familie einschaltest.
        </li>
        <li>
          <strong>Vertrag</strong> (Art. 6 Abs. 1 lit. b DSGVO): Bereitstellung der App und der
          Funktionen, die du abonnierst.
        </li>
        <li>
          <strong>Einwilligung</strong> (Art. 6 Abs. 1 lit. a DSGVO): wenn du dich für die
          Warteliste oder die Beta einträgst.
        </li>
        <li>
          <strong>Berechtigtes Interesse</strong> (Art. 6 Abs. 1 lit. f DSGVO): grundlegende
          Sicherheit der Website und anonyme Statistik.
        </li>
      </ul>

      <h2 id="health">5. Besondere Kategorien von Daten (Art. 9 DSGVO)</h2>
      <p>
        Glukosewerte und andere Gesundheitsdaten gehören zu den{" "}
        <strong>besonderen Kategorien</strong> personenbezogener Daten. Unser Ansatz:
      </p>
      <ul>
        <li>Standardmäßig werden sie nur auf deinem Gerät verarbeitet und gespeichert.</li>
        <li>
          Unser Relay erreichen sie nur, wenn du ausdrücklich eine Funktion einschaltest, die das
          braucht, und nur als kurzes aktuelles Zeitfenster.
        </li>
        <li>Bei der Übertragung sind sie immer verschlüsselt (TLS).</li>
        <li>
          Sie dienen ausschließlich dazu, deine eigenen Daten an deine eigenen Geräte und an die
          von dir gewählten Follower zu liefern, nie für Werbung, Profiling oder Weiterverkauf.
        </li>
      </ul>

      <h2 id="retention">6. Wie lange wir deine Daten aufbewahren</h2>
      <ul>
        <li>
          <strong>Relay-Daten:</strong> Aktuelle Werte werden laufend überschrieben; Sitzungs-
          und Push-Tokens bleiben, solange die Funktion aktiv ist, und werden gelöscht, wenn du
          sie ausschaltest, dich abmeldest oder dein Konto löschst (Einstellungen → Konto
          löschen).
        </li>
        <li>
          <strong>App-Daten auf deinem Gerät:</strong> bis du sie löschst oder die App
          deinstallierst.
        </li>
        <li>
          <strong>Warteliste:</strong> bis 6 Monate nach dem Start oder bis du um Löschung
          bittest.
        </li>
        <li>
          <strong>Beta-Formular:</strong> für die Dauer der Beta plus 12 Monate.
        </li>
        <li>
          <strong>IP-Hash:</strong> 30 Tage.
        </li>
      </ul>

      <h2 id="recipients">7. An wen wir deine Daten weitergeben</h2>
      <p>
        Wir geben Daten nur an Anbieter weiter, die für den Betrieb des Dienstes zwingend nötig
        sind. Alle handeln vertraglich als Auftragsverarbeiter:
      </p>
      <ul>
        <li>
          <strong>Cloudflare</strong>: hostet das oben beschriebene Dulce-Relay.
        </li>
        <li>
          <strong>Apple</strong>: Push-Mitteilungen (APNs), Live-Aktivitäten, Apple Health (auf
          dem Gerät) und Zahlungen.
        </li>
        <li>
          <strong>Google Firebase</strong>: Push-Mitteilungen auf Android.
        </li>
        <li>
          <strong>RevenueCat</strong>: Prüfung von Abonnements (nur pseudonyme Kennung).
        </li>
        <li>
          <strong>Supabase</strong> (Speicher für Warteliste und Beta): gehostet in der EU
          (eu-west-3).
        </li>
        <li>
          <strong>Resend</strong> (Bestätigungs-E-Mail der Warteliste) und{" "}
          <strong>Vercel</strong> (Hosting der Website und anonyme Statistik).
        </li>
        <li>
          <strong>Abbott (LibreLinkUp)</strong>: Dein Gerät und unser Relay verbinden sich mit
          deinen Zugangsdaten bzw. deiner Sitzung mit dem Dienst von Abbott, um deine Werte
          abzurufen. Für diese Verbindung gilt die Datenschutzerklärung von Abbott.
        </li>
      </ul>
      <p>
        Wir verkaufen, vermieten oder überlassen deine Daten nie Dritten für Werbe- oder
        kommerzielle Zwecke.
      </p>

      <h2 id="transfers">8. Internationale Übermittlungen</h2>
      <p>
        Einige unserer Auftragsverarbeiter (Cloudflare, RevenueCat, Resend, Vercel, Apple,
        Google) verarbeiten Daten in den USA oder an weltweiten Edge-Standorten. Die
        Übermittlung erfolgt auf Grundlage der Standardvertragsklauseln der Europäischen
        Kommission oder gleichwertiger Rahmen (Data Privacy Framework). Eine Kopie dieser
        Garantien kannst du unter{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a> anfordern.
      </p>

      <h2 id="rights">9. Deine Rechte</h2>
      <p>Als betroffene Person hast du das Recht auf:</p>
      <ul>
        <li>Auskunft über deine personenbezogenen Daten.</li>
        <li>Berichtigung unrichtiger Daten.</li>
        <li>Löschung.</li>
        <li>Widerspruch gegen die Verarbeitung oder deren Einschränkung.</li>
        <li>Übertragbarkeit der Daten, die du bereitgestellt hast.</li>
        <li>Widerruf deiner Einwilligung zu jeder Zeit.</li>
      </ul>
      <p>
        Am schnellsten löschst du alles, was Dulce über dich speichert, in der App unter{" "}
        <strong>Einstellungen → Konto löschen</strong>. Du kannst jedes dieser Rechte auch per
        E-Mail an <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a> ausüben. Wir
        antworten spätestens innerhalb von 30 Tagen.
      </p>
      <p>
        Wenn du meinst, dass unsere Verarbeitung nicht dem Gesetz entspricht, kannst du dich bei
        der{" "}
        <a href="https://www.aepd.es" target="_blank" rel="noopener">
          spanischen Datenschutzbehörde (AEPD)
        </a>{" "}
        oder bei der Aufsichtsbehörde deines Wohnsitzlandes beschweren.
      </p>

      <h2 id="minors">10. Kinder</h2>
      <p>
        Dulce richtet sich nicht an Kinder unter 14 Jahren. Eltern oder gesetzliche Vertreter
        können Dulce in eigener Verantwortung nutzen, um die Glukose eines Kindes zu verfolgen.
        Wenn du glaubst, dass ein Kind in deiner Obhut uns ohne deine Einwilligung Daten gegeben
        hat, melde dich bei uns und wir löschen sie.
      </p>

      <h2 id="cookies">11. Cookies</h2>
      <p>
        Wir verwenden technisch notwendige Cookies und, mit deiner Einwilligung, wo das Gesetz
        sie verlangt, Cookies von Google Analytics. Werbe-Cookies verwenden wir nicht. Welche
        Cookies das sind und wie du deine Auswahl änderst, steht in unserer{" "}
        <Link href="/legal/cookies">Cookie-Richtlinie</Link>.
      </p>

      <h2 id="changes">12. Änderungen dieser Erklärung</h2>
      <p>
        Bei wesentlichen Änderungen informieren wir betroffene Nutzer per E-Mail oder in der App
        und veröffentlichen die neue Fassung mit Datum auf dieser Seite.
      </p>

      <h2 id="contact">13. Kontakt</h2>
      <p>
        Bei Fragen zu dieser Datenschutzerklärung oder zur Verarbeitung deiner Daten schreib an{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
