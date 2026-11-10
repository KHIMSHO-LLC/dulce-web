import { Link } from "@/i18n/navigation";

{/* Translation of the Spanish/English policy. TODO: review local legal terminology; Spanish counsel review remains outstanding. */}
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
        Verantwortlicher ist <strong>Giorgio Khimshiashvili</strong>, tätig als
        Einzelunternehmer. Bei allen Fragen zu deinen Daten erreichst du uns unter{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>

      <h2 id="data">2. Welche Daten wir erheben</h2>
      <h3>2.1 Website</h3>
      <ul>
        <li>
          <strong>Android-Warteliste:</strong> deine E-Mail-Adresse, die ausgewählte Sprache,
          die Seite oder Platzierung deiner Anmeldung und ein pseudonymer IP-Hash zum Schutz vor
Missbrauch.
        </li>
        <li>
          <strong>Beta-Interessenformular, falls du eines gesendet hast:</strong> Name, E-Mail,
          CGM-Gerät, Region und optionale Angaben, die du teilen wolltest.
        </li>
        <li>
          <strong>Kontaktformular:</strong> dein Name, deine E-Mail-Adresse, Betreff und Nachricht.
          Resend leitet die Nachricht an unser Support-Postfach weiter und sendet dir eine Bestätigung.
        </li>
        <li>
          <strong>Minimale technische Daten:</strong> ein pseudonymer Hash (SHA-256) deiner
          IP-Adresse, kombiniert mit einem täglich wechselnden Salt, um Missbrauch der Formulare
          zu begrenzen. Wartelisten- und Beta-Datensätze enthalten diesen Hash, bis der jeweilige
          Datensatz gelöscht wird. Rate-Limit-Zähler sind temporär. Die rohe IP-Adresse speichern
          wir nicht direkt.
        </li>
        <li>
          <strong>Website-Analysen:</strong> Vercel Analytics misst Seitenaufrufe und Leistung
          ohne Cookies. Laut Vercel verwendet die Besucherstatistik einen aus der Anfrage
          abgeleiteten Hash, der nach 24 Stunden abläuft; Berichte können URL, Verweis,
          ungefähren Standort, Browser und Betriebssystem enthalten, die wir zusammengefasst
          auswerten. Google Analytics 4 misst Besuche, Seitenpfad und Sprache, Klicks auf
          App-Store-Links mit Kampagnenzuordnung sowie erfolgreiche Wartelisten-Anmeldungen.
          Im EWR, im Vereinigten Königreich und in der Schweiz sowie bei unbekanntem Standort
          wird es erst nach deiner Zustimmung zu Analyse-Cookies geladen; anderswo gilt die
          regionale Einstellung aus unserer Cookie-Richtlinie. Wir senden keine Glukosewerte,
          anderen Gesundheitsdaten
          oder deine E-Mail-Adresse an diese Analysedienste.
        </li>
      </ul>

      <h3>2.2 In der App, auf deinem Gerät</h3>
      <ul>
        <li>
          <strong>Deine CGM-Anmeldedaten.</strong> Du meldest dich mit deinem LibreLinkUp-
          (Abbott) oder Dexcom-Share-Konto an. Dein Passwort wird im sicheren Schlüsselbund
          deines Geräts gespeichert und nicht an Dulce gesendet. Die App nutzt es, um den
          Anbieter aufzurufen. Wenn dein CGM verbunden ist, wird wie unten beschrieben
          ein Sitzungstoken des Anbieters (nicht dein Passwort) an das Relay gesendet. Bei Medtronic CareLink gibst du dein Passwort auf der Seite von Medtronic ein, Dulce sieht es also nie, und Dulce erhält Anmelde-Tokens von Medtronic. Bei Nightscout gibst du deine Website-Adresse und ein Zugriffstoken oder API-Secret ein (Dulce speichert nur den SHA-1-Fingerabdruck des Secrets). Ausnahme bei Dexcom: Solange „Angemeldet bleiben“ an ist (Einstellungen › Sensor, standardmäßig an), sendet die App dein Dexcom-Passwort zusätzlich einmal an das Relay, weil Dexcom Sitzungen alle 24 Stunden beendet; siehe unten.
        </li>
        <li>
          <strong>Glukosewerte</strong> aus LibreLinkUp, Dexcom Share, Medtronic CareLink oder Nightscout, gespeichert in einer
          lokalen Datenbank auf deinem Gerät.
        </li>
        <li>
          <strong>Dein Logbuch</strong>: Kohlenhydrate, Insulin, manuelle Glukoseeinträge und
          Notizen. Lokal gespeichert.
        </li>
        <li>
          <strong>Daten aus Apple Health</strong> (iPhone) oder <strong>Health Connect</strong> (Android), wenn du die Berechtigung erteilst. Auf Android liest Dulce nur. Auf dem iPhone kann Dulce ab Version 1.0.7 außerdem deine Sensorwerte in Apple Health speichern, höchstens einen alle 5 Minuten, wenn du Glukose in Dulce aktivierst und es erlaubst. Du kannst das in den Einstellungen von Dulce oder in der Health-App beenden. Dort gespeicherte Werte bleiben in Apple Health, und andere Apps, denen du es erlaubst, können sie lesen.
        </li>
        <li>
          <strong>Einstellungen</strong>: Einheiten, Zielbereich, Sprache, Design,
          Warnungseinstellungen.
        </li>
      </ul>

      <h3>2.2.2 Werbemessung (optional, iOS)</h3>
      <p>
        Die Dulce-App kann das Meta-SDK enthalten (Meta Platforms Ireland Ltd. für Nutzer in
        Europa), um zu messen, ob Dulces eigene Anzeigen auf Facebook und Instagram zu
        Installationen und Abonnements führen. Sie ist <strong>aus</strong>, bis du in der App
        eine Frage mit Ja beantwortest, und du kannst sie jederzeit in den Einstellungen wieder
        ausschalten (Zeile „Werbemessung“). Wenn du Nein sagst, wird nichts an Meta gesendet.
      </p>
      <p>
        Wenn du zustimmst, teilen wir mit, dass die App installiert oder geöffnet wurde und dass
        ein Abonnement oder eine Testphase gestartet wurde (Kaufereignisse sendet unser
        Zahlungsdienstleister RevenueCat), zusammen mit einer anonymen Kennung, die das Meta-SDK
        für diese App erzeugt, und den technischen Daten, die mit jeder Anfrage gesendet werden
        (IP-Adresse, Gerätemodell, Betriebssystemversion). Wir teilen nie Glukosewerte,
        Gesundheitsdaten, Zugangsdaten deines Sensorkontos, deinen Namen oder deine E-Mail-Adresse.
      </p>
      <p>
        Dulce zeigt Apples Tracking-Abfrage nicht an und erhebt die Werbe-ID (IDFA) nicht. Du
        wirst nicht über Apps und Websites anderer Unternehmen hinweg verfolgt, und die Messung
        erfolgt aggregiert. Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO),
        die du jederzeit in den Einstellungen widerrufen kannst.
      </p>

      <h3>2.3 Das Dulce-Relay (Echtzeitfunktionen)</h3>
      <p>
        Wenn dein CGM verbunden ist, registriert die App diese Installation bei unserem Relay,
        damit es Hintergrund-Updates, Warnungen, Apple-Watch-Funktionen und Familienfreigabe
        bereitstellen kann. Das Relay ist ein kleiner, von uns betriebener Server bei Cloudflare.
        Es ruft Werte bei LibreLinkUp, Dexcom Share, Medtronic CareLink oder Nightscout ab und sendet Updates an deine Geräte.
        Je nach genutzten Funktionen und Einstellungen verarbeitet das Relay:
      </p>
      <ul>
        <li>
          <strong>Ein Sitzungstoken des Anbieters</strong> (nicht dein Passwort): ein
          LibreLinkUp-Token oder eine Dexcom-Share-Sitzungs-ID, damit das Relay Werte in deinem
          Namen abrufen kann. Bei Medtronic CareLink speichert das Relay deine CareLink-Anmelde-Tokens. Bei Nightscout speichert es deine Website-Adresse und dein Zugriffstoken oder den SHA-1-Fingerabdruck deines API-Secrets. Bei Dexcom speichert das Relay, solange „Angemeldet bleiben“ an ist, außerdem dein Dexcom-Passwort verschlüsselt (AES-256-GCM, der Schlüssel liegt getrennt im Secret-Speicher von Cloudflare) und nutzt es nur, um dich bei Dexcom Share neu anzumelden, wenn deine Sitzung abläuft. Es wird nie protokolliert oder weitergegeben und gelöscht, wenn du die Option ausschaltest, dich abmeldest oder dein Konto löschst.
        </li>
        <li>
          <strong>Eine zufällige Installations-ID und eine CGM-Konto-Kennung</strong>, um
          Registrierung, Werte und Einstellungen dem richtigen Gerät und CGM-Konto zuzuordnen.
        </li>
        <li>
          <strong>Push-Tokens</strong> deiner Geräte, ausgestellt von Apple oder Google, um
          Mitteilungen und Live-Aktivitäts-Updates zuzustellen.
        </li>
        <li>
          <strong>Deine neuesten Glukosewerte</strong>, einschließlich Wert und Zeitpunkt, als
          kurzes, laufend überschriebenes Zeitfenster für Live-Aktivität, Uhr und
          Follower-Ansicht. Das Relay ist kein Langzeitspeicher deines Gesundheitsverlaufs; der
          bleibt auf deinem Gerät.
        </li>
        <li>
          <strong>Einstellungen und technische Geräte-/App-Daten</strong>, die für den Dienst
          nötig sind (Einheiten, Zielbereich, Warngrenzen, Sprache, Zeitzone, Plattform und
          App-Version).
        </li>
        <li>
          <strong>Nutzungsereignisse:</strong> Ereignisse zu Einrichtung, Verbindung, Abonnement, Bezahlseite und Funktionsnutzung sowie jede Feedback-Option, die du antippst. Sie sind mit der zufälligen Installations-ID verknüpft und dienen dazu, den Dienst zu messen und zu verbessern. Sie enthalten keine Glukosewerte und keinen Nachrichtentext.
        </li>
        <li>
          <strong>Betriebsprotokolle:</strong> Diagnoseprotokolle in Cloudflare Workers Logs
          enthalten einen pseudonymen Gerätecode (einen nicht umkehrbaren Hash deiner
          Installations-ID, nicht die ID selbst), deinen CGM-Anbieter, ob jedes Update und jeder
          Alarm zugestellt wurde, die Alarmart, wenn ein Alarm gesendet wird, von der App
          gemeldete Statusereignisse der Live-Aktivität sowie Fehlerdetails. Sie enthalten keine
          Glukosewerte. Cloudflare löscht diese Protokolle nach 7 Tagen.
        </li>
      </ul>
      <p>
        Du kannst diese Verarbeitung beenden, indem du dein CGM trennst oder in den
        Einstellungen „Konto löschen“ nutzt. Die App fordert das Relay auf, aktive Geräte-,
        Token- und Freigabedaten zu löschen. Eine minimale Installations-ID und der Zeitpunkt
        der ersten Registrierung bleiben erhalten, damit eine wiederkehrende Installation in
        internen Verbindungsmetriken nicht als neu zählt. Dieser Marker läuft nicht automatisch
        ab. Schreib uns, wenn auch er gelöscht werden soll.
      </p>

      <h3>2.4 Folgen durch die Familie</h3>
      <p>
        Wenn du jemanden einlädst, dir zu folgen, liefert das Relay ab dem Moment der Annahme
        deine neuesten Werte und Warnungen an dessen Gerät; frühere Verläufe werden nicht
        geteilt. Nachrichten zwischen dir und deinen Followern, auch selbst geschriebener Text, laufen über das Relay und den Push-Dienst von Apple oder Google, um ihre Geräte zu erreichen. Das Relay speichert weder den Nachrichtentext noch einen Nachrichtenverlauf. Du kannst einem Follower den Zugang jederzeit
        entziehen und Follower-Nachrichten ganz ausschalten.
      </p>

      <h3>2.5 Käufe</h3>
      <p>
        Abonnements werden von <strong>Apple</strong> abgewickelt. Deinen Namen, deine Karte
        oder Rechnungsdaten sehen wir nie. Wir nutzen <strong>RevenueCat</strong>, um
        Abonnements mit einer zufälligen, von der App erzeugten Kennung zu prüfen, nicht mit
        deiner E-Mail oder Identität.
      </p>
      <p>
        Unser Server speichert diese RevenueCat-Kennung zusammen mit der Installationskennung,
        um Pro-Funktionen zu entfernen, sobald ein Kauf erstattet wird. Wenn du bei Apple oder
        Google eine Erstattung beantragst, können wir ihnen über RevenueCat mitteilen, ob der
        Kauf bereitgestellt wurde und welche Entscheidung wir bevorzugen. Glukose- oder
        Gesundheitsdaten geben wir nie weiter; die Entscheidung trifft immer Apple oder Google.
      </p>

      <h2 id="purpose">3. Wofür wir deine Daten verwenden</h2>
      <ul>
        <li>Deine Glukose auf deinen Geräten und, wenn du willst, auf denen deiner Follower anzeigen.</li>
        <li>Die Warnungen zustellen, die du einrichtest.</li>
        <li>Dein Abonnement prüfen und Pro-Funktionen freischalten.</li>
        <li>Dir mitteilen, wann Dulce verfügbar ist (Warteliste).</li>
        <li>Fragen beantworten, die du über das Kontaktformular sendest.</li>
        <li>Die Website vor Missbrauch schützen (IP-Hash, Begrenzung).</li>
        <li>Website-Besuche, App-Store-Verweise und Einrichtung sowie Nutzung des Dienstes verstehen.</li>
        <li>Gesetzliche Pflichten erfüllen und auf Anfragen zu deinen Rechten antworten.</li>
      </ul>

      <h2 id="legal-basis">4. Rechtsgrundlage</h2>
      <ul>
        <li>
          <strong>Ausdrückliche Einwilligung</strong> (Art. 9 Abs. 2 lit. a DSGVO): Verarbeitung
          deiner Gesundheitsdaten, wenn du dein CGM verbindest und die zugehörigen Funktionen
          nutzt. Wenn du dein CGM trennst, endet die Verarbeitung über das Relay; du kannst
          deine Einwilligung auch widerrufen, indem du uns kontaktierst. Beim Onboarding verlinkt
          die App diese Richtlinie, zeigt derzeit aber kein separates Kontrollkästchen für die
          Einwilligung in die Verarbeitung von Gesundheitsdaten. Wir lassen mit spanischer
          Datenschutzberatung prüfen, ob der aktuelle Hinweis und Verbindungsablauf den Maßstab
          für eine ausdrückliche Einwilligung erfüllen.
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
          <strong>Einwilligung</strong> (Art. 6 Abs. 1 lit. a DSGVO): auch für die optionale
          Werbemessung nach Abschnitt 2.2.2; du kannst sie jederzeit in den Einstellungen
          widerrufen.
        </li>
        <li>
          <strong>Berechtigtes Interesse</strong> (Art. 6 Abs. 1 lit. f DSGVO): grundlegende
          Sicherheit der Website und Beantwortung deiner Kontaktanfragen. Die Rechtsgrundlage
          für Analysen hängt vom Dienst und den in unserer Cookie-Richtlinie beschriebenen
          regionalen Regeln ab und muss mit Datenschutzberatung bestätigt werden.
        </li>
      </ul>

      <h2 id="health">5. Besondere Kategorien von Daten (Art. 9 DSGVO)</h2>
      <p>
        Glukosewerte und andere Gesundheitsdaten gehören zu den{" "}
        <strong>besonderen Kategorien</strong> personenbezogener Daten. Unser Ansatz:
      </p>
      <ul>
        <li>
          Dein langfristiger Glukoseverlauf, dein Logbuch und deine Apple-Health-Daten werden auf
          deinem Gerät verarbeitet und gespeichert. Aktuelle Werte verarbeitet außerdem das oben
          beschriebene Relay.
        </li>
        <li>
          Wenn dein CGM verbunden ist, verarbeitet das Relay aktuelle Werte, die für die
          genutzten Hintergrund- und Freigabefunktionen nötig sind. Es speichert ein kurzes,
          laufend überschriebenes Zeitfenster, nicht deinen langfristigen Glukoseverlauf.
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
          <strong>Aktive Relay-Daten:</strong> Aktuelle Werte werden in einem kurzen Zeitfenster
          laufend ersetzt. Sitzungs- und Push-Tokens bleiben gespeichert, solange dein
          verbundenes Gerät sie benötigt, und werden gelöscht, wenn du es trennst oder
          deregistrierst, dich abmeldest oder Einstellungen → Konto löschen nutzt.
        </li>
        <li>
          <strong>App-Daten auf deinem Gerät:</strong> bis du sie löschst oder die App
          deinstallierst.
        </li>
        <li>
          <strong>Android-Warteliste:</strong> bis sechs Monate nach dem Android-Start oder bis
          du die Löschung beantragst. Im aktuellen Speicher laufen diese Datensätze nicht
          automatisch ab; sie werden manuell oder auf Anfrage gelöscht. Der zugehörige IP-Hash
          bleibt ebenso lange im Datensatz.
        </li>
        <li>
          <strong>Beta-Interessenformular:</strong> für die Dauer der Beta plus 12 Monate. Auch
          diese Datensätze werden manuell oder auf Anfrage gelöscht; der zugehörige IP-Hash bleibt
          beim Datensatz.
        </li>
        <li>
          <strong>Kontaktanfragen:</strong> während wir deine Anfrage und nötige Rückfragen
          bearbeiten. E-Mail-Kopien können gemäß den Einstellungen unserer und der Mail-Systeme
          von Resend erhalten bleiben. Du kannst die Löschung beantragen, sofern keine gesetzliche
          Aufbewahrungspflicht besteht.
        </li>
        <li>
          <strong>Relay-Nutzungsereignisse:</strong> Ereignisdatensätze mit einer zufälligen
          Installations-ID bleiben bis zu 45 Tage gespeichert; zusammengefasste tägliche
          Nutzungsstatistiken bis zu 400 Tage.
        </li>
        <li>
          <strong>Betriebsprotokolle:</strong> Cloudflare Workers Logs werden nach 7 Tagen gelöscht.
        </li>
        <li>
          <strong>Installationsmarker:</strong> Die zufällige ID und der Zeitpunkt der ersten
          Registrierung bleiben nach dem Löschen der Relay-Daten erhalten. Du kannst auch die
          Löschung dieses Markers anfragen. Er läuft nicht automatisch ab.
        </li>
      </ul>

      <h2 id="recipients">7. An wen wir deine Daten weitergeben</h2>
      <p>
        Wir nutzen die folgenden Dienstleister. Einige verarbeiten Daten für uns im Auftrag;
        Abbott, Dexcom, Medtronic, Apple und Google erbringen außerdem eigene Dienste nach ihren eigenen
        Bedingungen und Datenschutzhinweisen:
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
          <strong>Google Analytics 4 (Google Ireland Ltd.)</strong>: Website-Analysen nach der
          regionalen Einwilligungseinstellung aus unserer Cookie-Richtlinie.
        </li>
        <li>
          <strong>RevenueCat</strong>: Prüfung von Abonnements (nur pseudonyme Kennung).
        </li>
        <li>
          <strong>Meta (Meta Platforms Ireland Ltd.)</strong>: nur wenn du die Werbemessung in
          der App erlaubst (Abschnitt 2.2.2).
        </li>
        <li>
          <strong>Supabase</strong> (Speicher für Warteliste und Beta): gehostet in der EU
          (eu-west-3).
        </li>
        <li>
          <strong>Resend</strong> (Zustellung des Kontaktformulars und Bestätigungs-E-Mail der
          Warteliste) sowie{" "}
          <strong>Vercel</strong> (Hosting der Website und zusammengefasste Web-Statistik).
        </li>
        <li>
          <strong>Abbott (LibreLinkUp)</strong>: Dein Gerät und unser Relay verbinden sich mit
          deinen Zugangsdaten bzw. deiner Sitzung mit dem Dienst von Abbott, um deine Werte
          abzurufen. Für diese Verbindung gilt die Datenschutzerklärung von Abbott.
        </li>
        <li>
          <strong>Dexcom (Share)</strong>: Dein Gerät und, solange dein CGM verbunden ist, auch
          unser Relay verbinden sich über eine Sitzungs-ID mit Dexcom Share, um Werte abzurufen.
          Für diesen Dienst gelten Dexcoms Datenschutzbedingungen.
        </li>
        <li>
          <strong>Medtronic (CareLink)</strong>: Wenn du CareLink verbindest, verbinden sich dein Gerät und unser Relay über Anmelde-Tokens mit dem Dienst von Medtronic, um deine Werte abzurufen. Für diesen Dienst gelten die Datenschutzbedingungen von Medtronic.
        </li>
        <li>
          <strong>Nightscout</strong>: Wenn du Nightscout verbindest, rufen dein Gerät und unser Relay Werte von der Website ab, die du betreibst oder auswählst. Verantwortlich dafür ist, wer diese Website hostet.
        </li>
      </ul>
      <p>
        Wir verkaufen, vermieten oder überlassen deine Daten nie Dritten für Werbe- oder
        kommerzielle Zwecke. Die einzige werbebezogene Weitergabe ist die optionale
        Werbemessung nach Abschnitt 2.2.2, die ausgeschaltet bleibt, solange du sie nicht erlaubst.
      </p>

      <h2 id="transfers">8. Internationale Übermittlungen</h2>
      <p>
        Einige von uns genutzte Anbieter und Dienste (Cloudflare, RevenueCat, Resend, Vercel, Meta,
        Apple und Google) können Daten in den USA oder anderen Ländern verarbeiten. Wenn die
        DSGVO Schutzmaßnahmen für eine Übermittlung verlangt, hängt der geltende Mechanismus
        vom Anbieter und Dienst ab und kann einen Angemessenheitsbeschluss oder die
        Standardvertragsklauseln der Europäischen Kommission umfassen. Google LLC ist im
        EU-US Data Privacy Framework im Rahmen seiner Zertifizierung als aktiv gelistet. Für
        Einzelheiten und Kopien der geltenden Garantien schreibe an{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a> anfordern.
      </p>

      <h2 id="rights">9. Deine Rechte</h2>
      <p>Nach der DSGVO und vorbehaltlich ihrer Bedingungen hast du das Recht auf:</p>
      <ul>
        <li>Auskunft über deine personenbezogenen Daten.</li>
        <li>Berichtigung unrichtiger Daten.</li>
        <li>Löschung.</li>
        <li>Widerspruch gegen die Verarbeitung oder deren Einschränkung.</li>
        <li>Übertragbarkeit der Daten, die du bereitgestellt hast.</li>
        <li>Widerruf deiner Einwilligung zu jeder Zeit.</li>
      </ul>
      <p>
        Unter <strong>Einstellungen → Konto löschen</strong> kannst du lokale App-Daten und
        aktive Relay-Datensätze löschen. Der oben beschriebene minimale Installationsmarker
        bleibt bestehen, bis du seine Löschung beantragst. Du kannst jedes dieser Rechte auch
        per E-Mail an <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a> ausüben. Wir
        antworten innerhalb eines Monats. Bei komplexen oder zahlreichen Anfragen erlaubt die
        DSGVO eine Verlängerung um bis zu zwei weitere Monate; über eine Verlängerung informieren
        wir dich innerhalb des ersten Monats.
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
        Dulce richtet sich nicht an Kinder unter 14 Jahren. Unter Android richtet sich Dulce an Erwachsene ab 18 Jahren. Eltern oder gesetzliche Vertreter
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
