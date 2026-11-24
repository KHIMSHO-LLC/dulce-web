import { Link } from "@/i18n/navigation";

{/* Übersetzung des spanischen Textes, der Vorrang hat. Entscheidungen zur Formulierung und offene Punkte: DULCE/plans/legal-answers-2026-11-16.md (auf Englisch). */}
export function PrivacyDe20261116() {
  return (
    <>
      <p>
        Diese Datenschutzerklärung erklärt, welche personenbezogenen Daten Dulce erhebt, wie wir
        sie verwenden und welche Rechte du daran hast. Sie gilt für diese Website (
        <strong>dulceglucosa.com</strong>) und für die mobile App Dulce.
      </p>

      <h2 id="controller">1. Verantwortlicher</h2>
      <p>
        Verantwortlicher ist <strong>Giorgi Khimshiashvili</strong>, tätig als
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
          ein Sitzungstoken des Anbieters (nicht dein Passwort) an das Relay gesendet. Bei Medtronic CareLink gibst du dein Passwort auf der Seite von Medtronic ein, Dulce sieht es also nie, und Dulce erhält Anmelde-Tokens von Medtronic. Bei Nightscout gibst du deine Website-Adresse und ein Zugriffstoken oder API-Secret ein (Dulce speichert nur den SHA-1-Fingerabdruck des Secrets). Ausnahme bei Dexcom: Solange „Angemeldet bleiben“ an ist (Einstellungen › Sensor, standardmäßig an), sendet die App dein Dexcom-Passwort zusätzlich einmal an das Relay, weil Dexcom Sitzungen alle 24 Stunden beendet; siehe unten. Wenn du den gespeicherten Kurvenverlauf nutzt und das Sammeln während deiner Abwesenheit akzeptiert hast, erlaubt es dem Relay außerdem, deinen Verlauf auch nach dem Abmelden weiter zu sammeln (siehe 2.6).
        </li>
        <li>
          <strong>Glukosewerte</strong> aus LibreLinkUp, Dexcom Share, Medtronic CareLink oder Nightscout, gespeichert in einer
          lokalen Datenbank auf deinem Gerät (und, bei Abonnenten von Dulce Pro, die den
          gespeicherten Kurvenverlauf akzeptieren, auch auf dem Relay; siehe 2.6).
        </li>
        <li>
          <strong>Dein Logbuch</strong>: Kohlenhydrate, Insulin (auch von einem smarten
          Insulinpen ausgelesene Dosen), Bewegung, manuelle Glukoseeinträge und Notizen. Auf deinem
          Gerät gespeichert. Wenn du den gespeicherten Kurvenverlauf nutzt und dein Logbuch mit
          deiner Familie teilst (standardmäßig an, du kannst es ausschalten), werden die Einträge ab
          dem Tag, an dem du das Teilen eingeschaltet hast, einschließlich Freitext-Notizen, auch
          auf dem Relay gespeichert (siehe 2.6).
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
          Namen abrufen kann. Bei Medtronic CareLink speichert das Relay deine CareLink-Anmelde-Tokens. Bei Nightscout speichert es deine Website-Adresse und dein Zugriffstoken oder den SHA-1-Fingerabdruck deines API-Secrets. Bei Dexcom speichert das Relay, solange „Angemeldet bleiben“ an ist, außerdem dein Dexcom-Passwort verschlüsselt (AES-256-GCM, der Schlüssel liegt getrennt im Secret-Speicher von Cloudflare) und nutzt es nur, um dich bei Dexcom Share neu anzumelden, wenn deine Sitzung abläuft. Es wird nie protokolliert oder weitergegeben und gelöscht, wenn du die Option ausschaltest oder dein Konto löschst. Auch wenn du dich abmeldest, wird es gelöscht, es sei denn, Dulce sammelt deinen gespeicherten Kurvenverlauf während deiner Abwesenheit weiter (siehe 2.6): Dann bleibt es verschlüsselt gespeichert, nur so lange, wie das Sammeln andauert, und wird gelöscht, sobald dieses aus irgendeinem Grund endet. Wenn du beim Abmelden „Beenden und löschen“ wählst, wird es sofort gelöscht.
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
          Follower-Ansicht. Wenn du Dulce Pro hast und in der App den gespeicherten
          Kurvenverlauf akzeptierst, bewahrt das Relay außerdem deinen Kurvenverlauf bis zu
          1 Jahr auf (siehe 2.6). Ohne ihn bleibt dein langfristiger Verlauf nur auf deinem Gerät.
        </li>
        <li>
          <strong>Einstellungen und technische Geräte-/App-Daten</strong>, die für den Dienst
          nötig sind (Einheiten, Zielbereich, Warngrenzen, Sprache, Zeitzone, Plattform und
          App-Version).
        </li>
        <li>
          <strong>Fotos von Mahlzeiten</strong>, nur wenn du „Kohlenhydrate per Foto schätzen“
          nutzt: Das Relay leitet sie zur Schätzung der Kohlenhydrate und der Nährwerte an Anthropic weiter, ohne sie
          zu speichern, und zählt die pro Tag genutzten Fotos (siehe 2.8).
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
        Du kannst diese Verarbeitung beenden, indem du in den Einstellungen „Konto löschen“
        nutzt. Wenn du dich in Dulce von deinem Sensorkonto abmeldest, enden Live-Updates und
        Warnungen; wenn du den gespeicherten Kurvenverlauf nutzt, entscheidest du selbst, ob
        Dulce deinen Verlauf weiter sammelt, während du abgemeldet bist (siehe 2.6). „Konto
        löschen“ fordert das Relay auf, aktive Geräte-, Token-, Freigabe- und
        Verlaufsdaten zu löschen. Eine minimale Installations-ID und der Zeitpunkt
        der ersten Registrierung bleiben erhalten, damit eine wiederkehrende Installation in
        internen Verbindungsmetriken nicht als neu zählt. Dieser Marker läuft nicht automatisch
        ab. Schreib uns, wenn auch er gelöscht werden soll.
      </p>

      <h3>2.4 Folgen durch die Familie</h3>
      <p>
        Wenn du jemanden einlädst, dir zu folgen, liefert das Relay ab dem Moment der Annahme
        deine Werte und Warnungen an dessen Gerät. Ohne gespeicherten Kurvenverlauf werden
        frühere Verläufe nicht geteilt. Wenn du den gespeicherten Kurvenverlauf nutzt (Dulce Pro),
        können deine Follower auch deinen gespeicherten Kurvenverlauf sehen, einschließlich
        Werten aus der Zeit vor der Annahme, und, solange das Teilen des Logbuchs an ist, dein
        geteiltes Logbuch, einschließlich Freitext-Notizen; sie sehen ihn nicht mehr, sobald du
        ihnen den Zugang entziehst oder das Teilen pausierst (siehe 2.6). Nachrichten zwischen dir und deinen Followern, auch selbst geschriebener Text, laufen über das Relay und den Push-Dienst von Apple oder Google, um ihre Geräte zu erreichen. Das Relay speichert weder den Nachrichtentext noch einen Nachrichtenverlauf. Du kannst einem Follower den Zugang jederzeit
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

      <h3>2.6 Gespeicherter Kurvenverlauf (Dulce Pro)</h3>
      <p>
        <strong>Was das ist.</strong> Wenn du Dulce Pro hast und es in der App akzeptierst,
        speichert unser Relay deinen Glukoseverlauf, damit deine Kurve und die Kurve deiner
        Follower dieselbe ist und keine Lücken hat und damit dein Verlauf nach dem Abmelden, einer
        Neuinstallation von Dulce oder einem iPhone-Wechsel noch da ist. Wenn du Dulce Pro nicht
        hast oder es nicht akzeptierst, wird nichts gespeichert, und dein Verlauf bleibt nur auf
        deinem Gerät.
      </p>
      <p>
        <strong>Was gespeichert wird.</strong>
      </p>
      <ul>
        <li>
          Deine Glukosewerte, jeweils mit Zeitpunkt, Wert und Trendpfeil: den Verlauf, den der
          Dienst deines Sensors (LibreLinkUp, Dexcom Share, Medtronic CareLink oder Nightscout)
          liefert, die Werte, die das Relay abruft, und, einmalig bei deiner Zustimmung, den
          Verlauf, der bereits auf deinem Telefon ist (bis zu 90 Tage).
        </li>
        <li>
          Dein Logbuch, wenn du es mit deiner Familie teilst (standardmäßig an, solange der
          gespeicherte Kurvenverlauf an ist; du kannst es separat ausschalten). Alles im Logbuch
          wird geteilt: Kohlenhydrate, Insulin (auch von einem smarten Insulinpen ausgelesene Dosen
          und Vorab-Dosen zum Entlüften), Bewegung, manuelle Glukosemessungen und Freitext-Notizen,
          jeweils mit Zeitpunkt und Menge. Geteilt werden nur Einträge ab dem Tag, an dem du das
          Teilen des Logbuchs einschaltest; ältere Einträge nicht.
        </li>
        <li>
          Nicht mitgespeichert werden: die E-Mail-Adresse deines Sensorkontos, dein Name, der Text
          der Nachrichten zwischen dir und deinen Followern sowie Daten aus Apple Health oder
          Health Connect.
        </li>
      </ul>
      <p>
        <strong>Wozu.</strong> Nur um diese Funktion bereitzustellen: dieselbe, vollständige Kurve
        für dich und die Familienmitglieder, die du eingeladen hast, erhalten über Abmelden,
        Neuinstallation und ein neues Telefon hinweg. Wir verwenden sie nicht für Werbung,
        Profiling oder Verkauf und geben sie weder an Meta noch an einen Analysedienst weiter.
      </p>
      <p>
        <strong>Rechtsgrundlage.</strong> Deine ausdrückliche Einwilligung (Art. 9 Abs. 2 lit. a
        DSGVO), weil Glukosedaten Gesundheitsdaten sind. Die App fragt, bevor das Speichern
        beginnt, getrennt für jedes Sensorkonto: Wenn du dich mit einem anderen Sensorkonto
        anmeldest, fragt sie erneut. Vor deiner Antwort wird nichts gespeichert, und App-Versionen,
        die nicht fragen, speichern nichts. Du kannst deine Einwilligung jederzeit in den
        Einstellungen widerrufen: Das Speichern endet, und die gespeicherte Kopie auf dem Relay
        wird sofort gelöscht. Der Widerruf berührt nicht die Rechtmäßigkeit des bis dahin
        erfolgten Speicherns. Dulce Pro hängt nicht von dieser Einwilligung ab: Ohne sie
        funktioniert Dulce Pro ohne gespeicherten Verlauf.
      </p>
      <p>
        <strong>Wo.</strong> Auf dem Dulce-Relay, in einer Datenbank unseres Hosting-Anbieters
        Cloudflare, der sie für uns verarbeitet und Daten in der EU und in anderen Ländern unter
        seinen Standardgarantien verarbeiten kann (siehe Abschnitt 8). Derselbe Verlauf bleibt
        außerdem in der lokalen Datenbank der App auf deinem Telefon.
      </p>
      <p>
        <strong>Wie lange.</strong> Solange dein Dulce-Pro-Abonnement (einschließlich eines
        Gratis-Tests) aktiv ist, bewahren wir höchstens etwa 1 Jahr Verlauf auf; ältere Tage
        werden automatisch entfernt. Wenn dein Abonnement endet oder erstattet wird, endet das
        Speichern, und der gespeicherte Verlauf (Werte und geteiltes Logbuch) wird 90 Tage später
        gelöscht; wenn du innerhalb dieser 90 Tage erneut abonnierst, ist er noch da.
      </p>
      <p>
        <strong>Sammeln, während du abgemeldet bist oder die App entfernt ist.</strong> Wenn du es
        akzeptiert hast (die App sagt es dir auf dem Zustimmungsbildschirm, in einem einmaligen
        Hinweis oder beim Abmelden), sammelt das Relay deinen Sensorverlauf weiter, nachdem du
        dich in Dulce von deinem Sensorkonto abgemeldet oder die App entfernt hast, einige Male am
        Tag statt jede Minute, mit der Sensor-Zugangskennung, die es bereits besitzt:
      </p>
      <ul>
        <li>
          LibreLinkUp: das Sitzungstoken. Nightscout: deine Website-Adresse und dein Zugriffstoken
          oder der Fingerabdruck deines API-Secrets.
        </li>
        <li>
          Medtronic CareLink: die Anmelde-Tokens, die Medtronic für Dulce ausgestellt hat (nie dein
          Passwort), die das Relay so erneuert, wie Medtronic es verlangt.
        </li>
        <li>
          Dexcom Share: wenn „Angemeldet bleiben“ an ist, dein Dexcom-Passwort, verschlüsselt wie in
          2.3 beschrieben. Wenn es aus ist, endet das Sammeln etwa einen Tag nach deiner letzten
          Anmeldung, weil Dexcom die Sitzung beendet.
        </li>
      </ul>
      <p>
        Das Sammeln während deiner Abwesenheit endet mit dem ersten dieser Ereignisse: Du meldest
        dich mit demselben Sensorkonto wieder in Dulce an; du schaltest es in den Einstellungen aus
        oder wählst beim Abmelden „Beenden und löschen“; du schaltest den gespeicherten
        Kurvenverlauf aus oder nutzt „Konto löschen“; dein Dulce-Pro-Abonnement endet; der Dienst
        deines Sensors verweigert die Anmeldung oder schlägt etwa eine Woche lang immer wieder
        fehl; oder 1 Jahr ist vergangen. Wenn es endet, wird die dafür aufbewahrte Zugangskennung
        gelöscht. Der bereits gespeicherte Verlauf bleibt, bis du ihn löschst oder der oben
        genannte Zeitraum abläuft, es sei denn, du hast dich für das Löschen entschieden. Wenn du
        die App entfernst, ohne dich abzumelden, kann die App dich in diesem Moment nicht fragen:
        Das Sammeln läuft nur weiter, wenn du es bereits akzeptiert hattest; um es zu beenden,
        schreib uns (siehe „So schaltest du es aus und löschst es“ unten). Solange du abgemeldet
        oder weg bist, erhalten deine Follower keine Live-Werte, keine Warnungen und keinen neuen
        Verlauf.
      </p>
      <p>
        <strong>Er kann Lücken haben oder verloren gehen.</strong> Der gespeicherte Verlauf ist
        eine Komfortfunktion: Er ist keine Krankenakte und kein Backup. Er kann Lücken haben oder
        verloren gehen, zum Beispiel wenn deine Sensorsitzung abläuft oder du dein Sensor-Passwort
        änderst, wenn Dexcom die Sitzung beendet und „Angemeldet bleiben“ aus ist, wenn der Dienst
        deines Sensors gestört ist oder noch keine Daten von deinem Telefon erhalten hat, wenn
        dein Abonnement endet, wenn du Dulce unter Android neu installierst oder ohne deinen iCloud-Schlüsselbund auf ein
        iPhone wechselst, wenn du „Konto löschen“ nutzt, wenn ein Sensorhersteller seinen Dienst
        ändert oder einstellt, oder wegen eines Fehlers auf unserer Seite. Bewahre die
        Aufzeichnungen, die deine Ärztin oder dein Arzt braucht, in der offiziellen App deines
        Sensorherstellers auf.
      </p>
      <p>
        <strong>Wer ihn sehen kann.</strong> Du und die Follower, die du eingeladen hast, solange
        du mit ihnen teilst: Sie sehen deinen gespeicherten Kurvenverlauf (auch Werte aus der Zeit
        vor der Annahme) und, solange das Teilen des Logbuchs an ist, dein geteiltes Logbuch
        einschließlich Freitext-Notizen. Sie sehen ihn nicht mehr, wenn du ihnen den Zugang
        entziehst, das Teilen pausiert wird oder du deinen Verlauf löschst. Wenn du das Teilen des
        Logbuchs ausschaltest, wird die geteilte Kopie auf dem Relay gelöscht; dein Logbuch auf
        deinem Telefon bleibt. Notizen, die du teilst, können deine Follower lesen; schreib
        deshalb keine Angaben über andere Personen in Notizen, die du teilst. Wer auf dem eigenen
        Telefon mit demselben Sensorkonto angemeldet ist, erhält deinen gespeicherten Verlauf nicht
        über Dulce. Das Relay verarbeitet diese Daten automatisch, um sie zuzustellen; wir sehen
        uns den Verlauf oder die Notizen einzelner Nutzer nicht an, außer wenn es nötig ist, um
        ein von dir gemeldetes Problem zu beheben, den Dienst sicher zu halten oder wenn das
        Gesetz es verlangt.
      </p>
      <p>
        <strong>Wie wir deinen Verlauf ohne Konto erkennen.</strong> Dulce hat kein Nutzerkonto.
        Dein Verlauf ist mit einem zufälligen geheimen „Verlaufsschlüssel“ verknüpft, der auf
        deinem Telefon erzeugt wird, kombiniert mit einer Kennung des Patienten deines
        Sensorkontos (eine Nummer oder ein Benutzername, die der Dienst deines Sensors vergibt,
        oder ein Fingerabdruck deiner Nightscout-Adresse), nie mit der E-Mail-Adresse deines
        Sensors. Auf dem iPhone wird der Verlaufsschlüssel, wenn du den iCloud-Schlüsselbund
        nutzt, über deinen eigenen iCloud-Schlüsselbund synchronisiert, sodass deine anderen
        iPhones mit demselben Apple-Account denselben Verlauf teilen; aus demselben Grund schaltet
        das Ausschalten des Speicherns auf einem davon es auf den anderen ebenfalls aus. „Konto
        löschen“ entfernt den Schlüssel aus deinem iCloud-Schlüsselbund, sodass Dulce auf deinen
        anderen iPhones einen neuen Verlauf beginnt. Wenn du dich auf demselben Telefon mit einem
        anderen Sensorkonto anmeldest, werden die Verläufe nicht vermischt.
      </p>
      <p>
        <strong>So schaltest du es aus und löschst es.</strong>
      </p>
      <ul>
        <li>
          Schalte in der App in den Einstellungen „Kurvenverlauf speichern“ aus und bestätige
          „Beenden und löschen“: Die gespeicherte Kopie auf dem Relay wird sofort gelöscht.
        </li>
        <li>
          Schalte in der App „Weiter sammeln, wenn ich abgemeldet bin oder die App entfernt ist“
          aus: Dulce sammelt nach dem Abmelden oder Entfernen der App nicht mehr und behält dafür
          keine Sensor-Zugangskennung.
        </li>
        <li>
          Schalte in der App „Mein Logbuch mit der Familie teilen“ aus: Die geteilte Kopie des
          Logbuchs auf dem Relay wird gelöscht.
        </li>
        <li>Wähle beim Abmelden „Beenden und löschen“ (oder „Löschen“).</li>
        <li>
          Nutze Einstellungen → Konto löschen: Alles wird gelöscht, wie in Abschnitt 9 beschrieben.
        </li>
        <li>
          Ohne die App schreib an{" "}
          <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>. Da es kein Konto gibt,
          gib deine Support-ID (in der App: Einstellungen › Konto › Support-ID) oder die
          Kontakt-E-Mail an, die du gespeichert hast (Abschnitt 2.7), falls du sie hast; sonst
          fragen wir dich nach Angaben, mit denen wir deine Daten finden können (zum Beispiel
          deinen Sensordienst und wann du Dulce zuletzt genutzt hast). Wir können nur auf Daten
          reagieren, die wir identifizieren können, und sagen dir Bescheid, wenn wir das nicht
          können.
        </li>
      </ul>

      <h3>2.7 Kontakt-E-Mail (optional)</h3>
      <p>
        Dulce funktioniert ohne E-Mail-Adresse. Wenn du willst, kannst du in der App eine
        Kontakt-E-Mail speichern. Wir speichern sie auf dem Dulce-Relay, verknüpft mit deiner
        Installation (der Support-ID, die die App anzeigt), und verwenden sie nur, um:
      </p>
      <ul>
        <li>deine Supportanfragen zu beantworten und deine Installation zu finden, wenn du uns schreibst;</li>
        <li>
          dir zu deiner Dulce-Installation oder deinem Abonnement zu schreiben, zum Beispiel bei
          einem Problem mit der Verbindung deines Sensors, einer Änderung dieser Erklärung oder der
          Nutzungsbedingungen oder einem Gratismonat, den wir dir anbieten.
        </li>
      </ul>
      <p>
        Wir verwenden sie nicht für Marketing oder Newsletter, außer du stimmst dem gesondert zu,
        und wir geben sie nicht an Meta, Analysedienste oder sonst jemanden weiter, außer an
        unseren Hosting-Anbieter Cloudflare, der sie für uns speichert. Sie wird nie in Protokolle
        geschrieben. Weil sie mit deiner Installation verknüpft ist, sehen wir damit, wem die
        Installation gehört, wenn wir dir helfen (zum Beispiel Abo-Status oder ob du das Folgen
        durch die Familie nutzt); der Support sieht deine Glukosewerte nicht.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie ist
        freiwillig, und du kannst sie in der App jederzeit ändern oder entfernen; beim Entfernen
        wird sie vom Relay gelöscht.{" "}
        <strong>Wie lange:</strong> bis du sie entfernst, „Konto löschen“ nutzt oder uns um
        Löschung bittest. Sie bleibt erhalten, wenn du dich von deinem Sensorkonto abmeldest,
        damit wir dir dann weiter helfen können. E-Mails, die du uns schickst, behandeln wir wie
        die Kontaktanfragen in Abschnitt 6.
      </p>

      <h3>2.8 Kohlenhydrat-Schätzung per Foto (optional)</h3>
      <p>
        Beim Hinzufügen eines Eintrags kannst du „Kohlenhydrate per Foto schätzen“ nutzen. Dulce
        nimmt ein Foto deiner Mahlzeit nur auf, wenn du diese Funktion nutzen möchtest. Die Nutzung
        ist freiwillig, und die App fragt dich vor dem ersten Foto. In einigen Ländern wird die
        Funktion nicht angeboten.
      </p>
      <ul>
        <li>
          <strong>Wohin das Foto geht.</strong> Die App sendet das Foto über das Dulce-Relay an
          Anthropic (Anthropic, PBC, USA), einen Anbieter von KI-Diensten, der es in unserem Auftrag
          verarbeitet, um die Kohlenhydrate im Essen und, soweit die App sie anzeigt, auch Eiweiß, Fett und Kalorien zu schätzen.
        </li>
        <li>
          <strong>Was mitgesendet wird.</strong> Nur die Sprache der App, damit die Namen der
          Lebensmittel in dieser Sprache zurückkommen. Sonst nichts: kein Name, keine E-Mail-Adresse,
          keine Gerätekennung, keine Glukosewerte und keine anderen Gesundheitsdaten. Vor dem
          Senden verkleinert die App das Foto und codiert es neu; dabei werden Standort- und
          Kamera-Metadaten entfernt.
        </li>
        <li>
          <strong>Was Dulce speichert.</strong> Dulce speichert weder das Foto noch das Ergebnis
          auf seinen Servern. Das Relay speichert nur, wie viele Fotos dein Gerät an diesem Tag
          genutzt hat, um das Tageslimit anzuwenden; dieser Zähler wird nach zwei Tagen gelöscht.
        </li>
        <li>
          <strong>Was du speicherst.</strong> Die Schätzung wird in das Kohlenhydratfeld und die Namen der Lebensmittel in die Notiz des Eintrags eingetragen; wenn du die optionalen Nährwertfelder aktiviert hast, kommen auch die Werte für Eiweiß, Fett und Kalorien in diese Felder. Du kannst alles ändern, bevor du speicherst. Was du speicherst, ist ein normaler Logbucheintrag und wird wie jeder andere
          Logbucheintrag behandelt (Abschnitte 2.2 und 2.6).
        </li>
        <li>
          <strong>Was Anthropic speichert.</strong> Anthropic löscht Eingaben und Ausgaben seiner
          API innerhalb von 30 Tagen. Wenn seine automatischen Sicherheitssysteme eine Anfrage als
          möglichen Verstoß gegen seine Nutzungsrichtlinie markieren, kann es diese Eingabe und
          Ausgabe bis zu 2 Jahre und die Bewertungen der Sicherheitsklassifizierung bis zu 7 Jahre
          aufbewahren. Anthropic verwendet diese Daten nicht zum Training seiner Modelle.
        </li>
      </ul>
      <p>
        Fotografiere nur dein Essen, keine Personen und keine Dokumente.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) und,
        soweit ein Foto Rückschlüsse auf deine Gesundheit zulassen kann, deine ausdrückliche
        Einwilligung (Art. 9 Abs. 2 lit. a DSGVO), um die dich die App vor dem ersten Foto bittet.
        Du kannst sie jederzeit widerrufen, indem du die Funktion einfach nicht mehr nutzt.
        Anthropic verarbeitet das Foto in den USA (Abschnitt 8).
      </p>

      <h2 id="purpose">3. Wofür wir deine Daten verwenden</h2>
      <ul>
        <li>Deine Glukose auf deinen Geräten und, wenn du willst, auf denen deiner Follower anzeigen.</li>
        <li>Die Warnungen zustellen, die du einrichtest.</li>
        <li>
          Deinen Kurvenverlauf aufbewahren, damit du und deine Follower dieselbe Kurve sehen, auch
          nach dem Abmelden, einer Neuinstallation oder einem Telefonwechsel, und dein Logbuch mit
          der Familie teilen, die du eingeladen hast (Dulce Pro, mit deiner Einwilligung;
          Abschnitt 2.6).
        </li>
        <li>
          Wenn du es möchtest, die Kohlenhydrate einer Mahlzeit anhand eines Fotos schätzen, das du
          aufnimmst (Abschnitt 2.8).
        </li>
        <li>Dein Abonnement prüfen und Pro-Funktionen freischalten.</li>
        <li>
          Wenn du eine Kontakt-E-Mail gespeichert hast, deine Supportanfragen beantworten und dir
          zu deiner Installation oder deinem Abonnement schreiben (Abschnitt 2.7).
        </li>
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
          deiner Gesundheitsdaten, wenn du in der App deinen Sensor verbindest und die zugehörigen
          Funktionen nutzt (Live-Werte, Warnungen, Live-Aktivität, Widgets, Uhr und Folgen durch
          die Familie). Du erteilst sie, indem du deinen Sensor verbindest, nachdem die App erklärt
          hat, was Dulce tut, und auf diese Erklärung verlinkt hat. Du kannst sie jederzeit
          widerrufen, indem du dich in Dulce von deinem Sensorkonto abmeldest, wodurch die
          Verarbeitung über das Relay endet (außer dem Sammeln deines gespeicherten Kurvenverlaufs
          während deiner Abwesenheit, wenn du es akzeptiert hast; Abschnitt 2.6), indem du
          „Konto löschen“ nutzt oder uns schreibst.
        </li>
        <li>
          <strong>Ausdrückliche Einwilligung</strong> (Art. 9 Abs. 2 lit. a DSGVO) für den
          gespeicherten Kurvenverlauf, das Sammeln, während du abgemeldet bist oder die App
          entfernt ist, und das Teilen des Logbuchs: in der App für jedes Sensorkonto erfragt,
          bevor das Speichern beginnt, und jederzeit in den Einstellungen widerrufbar
          (Abschnitt 2.6).
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
          <strong>Einwilligung</strong> (Art. 6 Abs. 1 lit. a DSGVO): für die optionale
          Kontakt-E-Mail nach Abschnitt 2.7; du kannst sie jederzeit in der App entfernen.
        </li>
        <li>
          <strong>Einwilligung</strong> (Art. 6 Abs. 1 lit. a DSGVO) und, soweit ein Foto
          Rückschlüsse auf deine Gesundheit zulassen kann, <strong>ausdrückliche
          Einwilligung</strong> (Art. 9 Abs. 2 lit. a DSGVO): für die optionale
          Kohlenhydrat-Schätzung per Foto nach Abschnitt 2.8; in der App vor dem ersten Foto
          erfragt und jederzeit widerrufbar, indem du die Funktion nicht mehr nutzt.
        </li>
        <li>
          <strong>Berechtigtes Interesse</strong> (Art. 6 Abs. 1 lit. f DSGVO): grundlegende
          Sicherheit der Website und Beantwortung der Anfragen, die du uns über das
          Kontaktformular oder per E-Mail schickst. Website-Analyse: deine Einwilligung, wo unsere
          Cookie-Richtlinie sie verlangt (im EWR, im Vereinigten Königreich und in der Schweiz oder
          wenn wir nicht erkennen können, wo du bist), sonst unser berechtigtes Interesse daran zu
          verstehen, wie die Website genutzt wird.
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
          beschriebene Relay. Wenn du Dulce Pro nutzt und den gespeicherten Kurvenverlauf
          akzeptierst, werden dein Glukoseverlauf und, solange du es mit deiner Familie teilst,
          dein Logbuch ebenfalls auf dem Relay gespeichert (Abschnitt 2.6).
        </li>
        <li>
          Wenn dein CGM verbunden ist, verarbeitet das Relay aktuelle Werte, die für die
          genutzten Hintergrund- und Freigabefunktionen nötig sind. Es speichert ein kurzes,
          laufend überschriebenes Zeitfenster und, nur für Dulce-Pro-Abonnenten, die es
          akzeptieren, den in 2.6 beschriebenen gespeicherten Kurvenverlauf.
        </li>
        <li>
          Wenn du die Kohlenhydrat-Schätzung per Foto nutzt, geht das Foto der Mahlzeit über das
          Relay an Anthropic, nur um die Schätzung zu erstellen, ohne deine Glukosewerte oder
          andere Gesundheitsdaten (Abschnitt 2.8).
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
          deregistrierst, dich abmeldest oder Einstellungen → Konto löschen nutzt. Ausnahme:
          Solange Dulce deinen gespeicherten Kurvenverlauf weiter sammelt, nachdem du dich
          abgemeldet oder die App entfernt hast (Abschnitt 2.6), wird die dafür nötige
          Sensor-Zugangskennung (LibreLinkUp-Sitzungstoken, Nightscout-Website-Token,
          Medtronic-CareLink-Anmelde-Tokens oder das verschlüsselte Dexcom-Passwort) nur dafür
          aufbewahrt und gelöscht, wenn das Sammeln endet, spätestens nach 1 Jahr.
        </li>
        <li>
          <strong>Gespeicherter Kurvenverlauf und geteiltes Logbuch (Dulce Pro):</strong> solange
          dein Abonnement aktiv ist, höchstens etwa 1 Jahr, ältere Tage werden automatisch
          entfernt. Sofort gelöscht, wenn du das Speichern ausschaltest, beim Abmelden „Beenden
          und löschen“ wählst oder „Konto löschen“ nutzt (das geteilte Logbuch auch, wenn du das
          Teilen des Logbuchs ausschaltest); 90 Tage nach Ende oder Erstattung deines Abonnements
          gelöscht.
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
          <strong>Kontakt-E-Mail:</strong> bis du sie in der App entfernst, „Konto löschen“ nutzt
          oder uns um Löschung bittest (Abschnitt 2.7).
        </li>
        <li>
          <strong>Kohlenhydrat-Schätzung per Foto:</strong> Dulce speichert weder das Foto noch
          das Ergebnis auf seinen Servern; der tägliche Fotozähler wird nach zwei Tagen gelöscht.
          Anthropic löscht das Foto und das Ergebnis innerhalb von 30 Tagen, außer in den in
          Abschnitt 2.8 beschriebenen Fällen.
        </li>
        <li>
          <strong>Backups:</strong> Vom Relay gelöschte Daten können bis zu 30 Tage in den
          automatischen Datenbank-Backups unseres Hosting-Anbieters bleiben und werden danach
          überschrieben. Wir nutzen diese Backups nur, um uns von einer Störung zu erholen.
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
          <strong>Cloudflare</strong>: hostet das oben beschriebene Dulce-Relay und speichert als
          unser Auftragsverarbeiter den gespeicherten Kurvenverlauf und das geteilte Logbuch
          (Abschnitt 2.6) sowie die optionale Kontakt-E-Mail (Abschnitt 2.7).
        </li>
        <li>
          <strong>Anthropic (Anthropic, PBC, USA)</strong>: Anbieter von KI-Diensten, der als unser
          Auftragsverarbeiter die Kohlenhydrate in einem Foto einer Mahlzeit schätzt, wenn du
          „Kohlenhydrate per Foto schätzen“ nutzt (Abschnitt 2.8).
        </li>
        <li>
          <strong>Apple</strong>: Push-Mitteilungen (APNs), Live-Aktivitäten, Apple Health (auf
          dem Gerät), Zahlungen und, wenn du den iCloud-Schlüsselbund nutzt, das Aufbewahren
          deines Verlaufsschlüssels in deinem eigenen iCloud-Schlüsselbund (Abschnitt 2.6).
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
        Einige von uns genutzte Anbieter und Dienste (Cloudflare, Anthropic, RevenueCat, Resend,
        Vercel, Meta, Apple und Google) können Daten in den USA oder anderen Ländern verarbeiten. Wenn die
        DSGVO Schutzmaßnahmen für eine Übermittlung verlangt, hängt der geltende Mechanismus
        vom Anbieter und Dienst ab und kann einen Angemessenheitsbeschluss oder die
        Standardvertragsklauseln der Europäischen Kommission umfassen. Google LLC ist im
        EU-US Data Privacy Framework im Rahmen seiner Zertifizierung als aktiv gelistet. Für
        Einzelheiten und Kopien der geltenden Garantien schreibe an{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a> anfordern.
      </p>
      <p>
        Gespeicherter Kurvenverlauf und Einträge des geteilten Logbuchs werden in einer Datenbank
        unseres Hosting-Anbieters Cloudflare gespeichert, der Daten in der EU und in anderen
        Ländern unter den oben beschriebenen Garantien verarbeiten kann.
      </p>
      <p>
        Fotos von Mahlzeiten, die du für eine Kohlenhydrat-Schätzung sendest (Abschnitt 2.8),
        verarbeitet Anthropic in den USA auf Grundlage seines Data Processing Addendum
        (Auftragsverarbeitungsvereinbarung), das die Standardvertragsklauseln der Europäischen
        Kommission und den britischen Zusatz dazu (UK Addendum) enthält.
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
        aktive Relay-Datensätze löschen, einschließlich deines gespeicherten Kurvenverlaufs und
        des geteilten Logbuchs; außerdem entfernt es Dulces Verlaufsschlüssel aus deinem
        iCloud-Schlüsselbund, sodass Dulce auf deinen anderen iPhones einen neuen Verlauf
        beginnt. Du kannst den gespeicherten Kurvenverlauf auch in den Einstellungen ausschalten,
        wodurch die gespeicherte Kopie sofort gelöscht wird, und das Teilen des Logbuchs separat
        ausschalten, wodurch die geteilte Kopie des Logbuchs gelöscht wird. Die App hat keine
        Export-Schaltfläche für den gespeicherten Verlauf; schreib uns, dann senden wir dir eine
        Kopie in einem gängigen elektronischen Format (zum Beispiel CSV). Der oben beschriebene
        minimale Installationsmarker bleibt bestehen, bis du seine Löschung beantragst. Du kannst
        jedes dieser Rechte auch per E-Mail an{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a> ausüben. Da Dulce keine
        Konten hat, gib deine Support-ID (in der App: Einstellungen › Konto › Support-ID) oder die
        Kontakt-E-Mail an, die du gespeichert hast, falls du sie hast; sonst fragen wir nach
        anderen Angaben, mit denen wir deine Daten finden können, und wir können nur auf Daten
        reagieren, die wir identifizieren können. Wir antworten innerhalb eines Monats. Bei
        komplexen oder zahlreichen Anfragen erlaubt die DSGVO eine Verlängerung um bis zu zwei
        weitere Monate; über eine Verlängerung informieren wir dich innerhalb des ersten Monats.
      </p>
      <p>
        Wenn ein Dulce-Nutzer verstorben ist, können ein naher Angehöriger oder ein Erbe uns bitten,
        seine Daten zu löschen und jedes Sammeln seines Verlaufs zu beenden; wir verlangen dafür
        einen angemessenen Nachweis.
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
        können Dulce in eigener Verantwortung nutzen, um die Glukose eines Kindes zu verfolgen;
        in diesem Fall erteilen oder verweigern die Eltern oder der gesetzliche Vertreter die
        Einwilligung in den gespeicherten Kurvenverlauf und das Teilen des Logbuchs. Wenn du
        zwischen 14 und 18 bist, brauchst du für die Nutzung von Dulce die Einwilligung deiner
        Eltern oder deines gesetzlichen Vertreters (Nutzungsbedingungen, Abschnitt 4); das
        schließt den gespeicherten Kurvenverlauf, das Teilen des Logbuchs und die Kontakt-E-Mail
        ein. Die Kohlenhydrat-Schätzung per Foto (Abschnitt 2.8) steht allen offen, die Dulce nach
        den Nutzungsbedingungen nutzen dürfen, auch Nutzern zwischen 14 und 18 auf dem iPhone,
        die diese Einwilligung haben. Wenn du glaubst, dass ein Kind in deiner Obhut uns ohne deine Einwilligung Daten gegeben
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
        Bei wesentlichen Änderungen informieren wir dich, bevor sie gelten: in der App (in der
        Notiz „Neuerungen“ des App-Updates, das sie bringt, und in einem Hinweis, der auf diese
        Seite verlinkt) und, wenn du eine Kontakt-E-Mail gespeichert hast, per E-Mail. Diese Seite
        zeigt das Datum der aktuellen Fassung, eine kurze Zusammenfassung der Änderungen und einen
        Link zur vorherigen Fassung. Wenn eine Änderung deine Einwilligung braucht, zum Beispiel
        eine neue Nutzung deiner Gesundheitsdaten, fragt die App dich zuerst, und nichts Neues
        geschieht, bis du antwortest; App-Versionen, die nicht fragen, funktionieren wie bisher.
        Änderungen am gespeicherten Kurvenverlauf, die dir etwas wegnehmen, werden in der App
        mindestens 30 Tage vorher angekündigt (Nutzungsbedingungen, Abschnitte 8.1 und 15).
      </p>

      <h2 id="contact">13. Kontakt</h2>
      <p>
        Bei Fragen zu dieser Datenschutzerklärung oder zur Verarbeitung deiner Daten schreib an{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
