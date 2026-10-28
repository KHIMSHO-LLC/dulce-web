{/* Translation of DisclaimerEs/DisclaimerEn; the Spanish version prevails. TODO: legal review. */}
export function DisclaimerIt() {
  return (
    <>
      <p>
        Questa avvertenza medica spiega i limiti di ciò che Dulce può fare per te. Leggila con
        attenzione: usare l&apos;app significa che comprendi e accetti tutto ciò che è descritto
        qui.
      </p>

      <blockquote>
        <p>
          Dulce <strong>non è un dispositivo medico</strong>. Non è pensata per diagnosticare,
          curare, guarire o prevenire malattie, né per prendere decisioni terapeutiche. Non
          sostituisce il glucometro, il sistema di monitoraggio continuo (CGM) né il giudizio del
          tuo team diabetologico.
        </p>
      </blockquote>

      <h2 id="what-it-is">1. Cosa è Dulce e cosa non è</h2>
      <p>
        Dulce è un&apos;app di supporto che <strong>mostra</strong> le letture di glicemia che il tuo
        sistema di monitoraggio già produce (LibreLinkUp di Abbott o Dexcom Share). Il suo compito è
        presentare queste informazioni in modo comodo e leggibile. Dulce non misura la glicemia, non
        produce sensori e non controlla alcun dispositivo medico.
      </p>
      <p>
        La fonte ufficiale e di riferimento dei tuoi dati è sempre l&apos;app del produttore del tuo
        CGM e gli avvisi di sicurezza di quel sistema. Se Dulce e l&apos;app del produttore mostrano
        qualcosa di diverso, <strong>prevale l&apos;app del produttore</strong>.
      </p>

      <h2 id="no-decisions">2. Non prendere decisioni mediche basandoti solo su Dulce</h2>
      <p>
        Non modificare insulina, farmaci, alimentazione o attività fisica solo in base a quello che
        vedi in Dulce. Ogni decisione sulla terapia deve seguire le indicazioni del tuo medico o del
        tuo team diabetologico e usare gli strumenti che ti sono stati prescritti.
      </p>

      <h2 id="confirm">3. Conferma sempre con il polpastrello</h2>
      <p>
        Prima di agire su un valore alto o basso, e soprattutto quando ciò che vedi non corrisponde
        a come ti senti, controlla la glicemia dal <strong>polpastrello</strong> (glucometro). I
        valori mostrati in Dulce provengono da un sensore interstiziale e possono differire dalla
        glicemia reale nel sangue, in particolare quando cambia rapidamente.
      </p>

      <h2 id="alerts">4. Gli avvisi non sono garantiti</h2>
      <p>
        Dulce non è un sistema di allarme di sicurezza. Le notifiche possono arrivare in ritardo o
        non arrivare per motivi che non dipendono da noi: telefono spento, in silenzioso, scarico o
        offline; permessi di notifica disattivati; il sistema operativo che limita l&apos;app in
        background; o un disservizio del fornitore del CGM.{" "}
        <strong>Non contare su Dulce per avvisarti di un&apos;ipo o di un&apos;iper.</strong> Tieni
        attivi gli allarmi del tuo sistema CGM ufficiale.
      </p>

      <h2 id="accuracy">5. Accuratezza e ritardo dei dati</h2>
      <p>
        I dati possono apparire in ritardo, incompleti o non aggiornati per la latenza della rete,
        gli intervalli di sincronizzazione o lo stato dei server di terzi. Quando una lettura è
        vecchia, Dulce cerca di indicarlo, ma nessun orario sostituisce un controllo diretto.
        Considera ogni valore come un riferimento, non come una misura clinica in tempo reale.
      </p>

      <h2 id="no-predictions">6. Previsioni indicative, nessun calcolo delle dosi</h2>
      <p>
        Dulce non calcola dosi di insulina o di carboidrati e non dà consigli clinici. L&apos;avviso
        facoltativo di ipo prevista si limita a proiettare la velocità con cui cambiano le tue ultime
        letture: è indicativo, può sbagliare e non sostituisce gli allarmi del tuo sistema CGM né un
        controllo dal polpastrello.
      </p>

      <h2 id="emergencies">7. Emergenze</h2>
      <p>
        Dulce non gestisce le emergenze. Se sospetti un&apos;ipo o un&apos;iper grave, o in
        qualsiasi emergenza medica, segui il tuo piano di cura e chiama i soccorsi (
        <strong>112</strong> nell&apos;UE, <strong>911</strong> negli Stati Uniti) o il tuo medico.
      </p>

      <h2 id="healthcare-team">8. Parla con il tuo team diabetologico</h2>
      <p>
        Le informazioni di questa app hanno solo scopo informativo generale e non sono un parere
        medico. Parla con il tuo medico o con il tuo educatore in diabetologia prima di cambiare
        qualsiasi aspetto della terapia e per qualsiasi domanda sulla tua salute.
      </p>

      <h2 id="third-parties">9. Dati di terze parti</h2>
      <p>
        Dulce dipende da servizi di terzi (Abbott / LibreLinkUp, Dexcom Share, Salute di Apple) per
        ottenere i tuoi dati. Non controlliamo la disponibilità, l&apos;accuratezza né la continuità
        di questi servizi e non siamo responsabili di interruzioni o errori che nascono da essi.
      </p>

      <h2 id="acceptance">10. Accettazione</h2>
      <p>
        Usando Dulce confermi di aver letto e compreso questa avvertenza medica e di assumerti la
        responsabilità di gestire il tuo diabete con strumenti autorizzati e con il supporto del tuo
        team diabetologico. Se non sei d&apos;accordo, non usare l&apos;app.
      </p>
      <p>
        Per qualsiasi domanda su questa avvertenza scrivici a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
