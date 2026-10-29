{/* Safety wording checked against Abbott and Dexcom guidance on 2026-10-29; legal review remains outstanding. */}
export function DisclaimerDe() {
  return (
    <>
      <p>
        Dieser medizinische Hinweis erklärt, was Dulce für dich leisten kann und was nicht. Lies
        ihn zusammen mit den Anweisungen deines CGM-Systems und den Empfehlungen deines Diabetes-Teams.
      </p>

      <blockquote>
        <p>
          Dulce ist <strong>kein Medizinprodukt</strong>. Es ist nicht dafür gedacht, Krankheiten
          zu diagnostizieren, zu behandeln, zu heilen oder zu verhindern oder Therapieentscheidungen
          zu treffen. Es ersetzt weder dein Blutzuckermessgerät noch dein CGM-System noch das
          Urteil deines Diabetes-Teams.
        </p>
      </blockquote>

      <h2 id="what-it-is">1. Was Dulce ist und was nicht</h2>
      <p>
        Dulce ist eine Begleit-App, die die Glukosewerte <strong>anzeigt</strong>, die dein
        Messsystem bereits erzeugt (LibreLinkUp von Abbott oder Dexcom Share). Ihre Aufgabe ist es,
        diese Informationen bequem und gut lesbar darzustellen. Dulce misst keine Glukose, stellt
        keine Sensoren her und steuert kein Medizinprodukt.
      </p>
      <p>
        Die offizielle, maßgebliche Quelle deiner Daten ist immer die App des Herstellers deines
        CGM und die Sicherheitswarnungen dieses Systems. Wenn Dulce und die Hersteller-App etwas
        anderes zeigen, <strong>gilt die App des Herstellers</strong>.
      </p>

      <h2 id="no-decisions">2. Triff keine medizinischen Entscheidungen allein auf Basis von Dulce</h2>
      <p>
        Ändere Insulin, Medikamente, Essen oder Bewegung nicht nur aufgrund dessen, was du in Dulce
        siehst. Jede Entscheidung über deine Behandlung sollte den Vorgaben deiner Ärztin, deines
        Arztes oder deines Diabetes-Teams folgen und die Hilfsmittel nutzen, die dir verordnet
        wurden.
      </p>

      <h2 id="confirm">3. Wann du ein Blutzuckermessgerät verwenden solltest</h2>
      <p>
        Folge den Anweisungen deines CGM-Systems. Verwende ein Blutzuckermessgerät, wenn der
        Hersteller es empfiehlt, etwa wenn ein Wert nicht zu deinen Symptomen oder Erwartungen
        passt oder ein aktueller Wert beziehungsweise Trendpfeil fehlt. Dulce zeigt Daten eines
        Gewebesensors an, die besonders bei schnellen Veränderungen vom Blutzucker abweichen können.
      </p>

      <h2 id="alerts">4. Warnungen sind nicht garantiert</h2>
      <p>
        Dulce ist kein Sicherheits-Alarmsystem. Mitteilungen können sich aus Gründen verzögern
        oder ausbleiben, die wir nicht beeinflussen: ein ausgeschaltetes, stummgeschaltetes, leeres
        oder offline befindliches Handy, fehlende Berechtigungen für Mitteilungen, ein
        Betriebssystem, das die App im Hintergrund drosselt, oder eine Störung bei deinem
        CGM-Anbieter.{" "}
        <strong>Verlass dich nicht darauf, dass Dulce dich vor einem Tief oder Hoch warnt.</strong>{" "}
        Lass die Alarme deines offiziellen CGM-Systems eingeschaltet.
      </p>

      <h2 id="accuracy">5. Genauigkeit und Verzögerung der Daten</h2>
      <p>
        Daten können wegen Netzlatenz, Synchronisationsintervallen oder des Zustands von Servern
        Dritter verzögert, unvollständig oder veraltet erscheinen. Wenn ein Wert alt ist, versucht
        Dulce, das anzuzeigen, aber kein Zeitstempel ersetzt eine direkte Messung. Betrachte jeden
        Wert als Orientierung, nicht als klinische Messung in Echtzeit.
      </p>

      <h2 id="no-predictions">6. Orientierende Prognosen, keine Dosisberechnung</h2>
      <p>
        Dulce berechnet keine Insulin- oder Kohlenhydratdosen und gibt keine klinischen Ratschläge.
        Die optionale vorausschauende Unterzucker-Warnung rechnet nur hoch, wie schnell sich deine
        letzten Werte ändern: Sie ist eine Orientierung, kann falsch liegen und ersetzt weder die
        Alarme deines CGM-Systems noch dessen Hinweise, wann du ein Blutzuckermessgerät verwenden sollst.
      </p>

      <h2 id="emergencies">7. Notfälle</h2>
      <p>
        Dulce ist nicht für Notfälle gedacht. Wenn du einen schweren Unter- oder Überzucker
        vermutest oder ein anderer medizinischer Notfall vorliegt, folge deinem Behandlungsplan und
        ruf den Notruf (<strong>112</strong> in der EU, <strong>911</strong> in den USA) oder
        deine medizinische Fachkraft an.
      </p>

      <h2 id="healthcare-team">8. Sprich mit deinem Diabetes-Team</h2>
      <p>
        Die Informationen in dieser App dienen nur der allgemeinen Information und sind keine
        medizinische Beratung. Sprich mit deiner Ärztin, deinem Arzt oder deiner
        Diabetesberatung, bevor du etwas an deiner Behandlung änderst, und bei allen Fragen zu
        deiner Gesundheit.
      </p>

      <h2 id="third-parties">9. Daten von Drittanbietern</h2>
      <p>
        Dulce ist auf Dienste Dritter angewiesen (Abbott / LibreLinkUp, Dexcom Share, Apple
        Health), um deine Daten zu erhalten. Wir haben keinen Einfluss auf Verfügbarkeit,
        Genauigkeit oder Fortbestand dieser Dienste und sind nicht verantwortlich für Ausfälle oder
        Fehler, die dort entstehen.
      </p>

      <h2 id="acceptance">10. Fragen</h2>
      <p>
        Bei Fragen zu diesem Hinweis schreib uns an{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
