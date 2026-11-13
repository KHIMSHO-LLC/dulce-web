import { Link } from "@/i18n/navigation";

{/* Translation of the Spanish/English terms. TODO: review local legal terminology; Spanish counsel review remains outstanding. */}
export function TermsIt() {
  return (
    <>
      <p>
        Questi termini d&apos;uso regolano l&apos;accesso al sito <strong>dulceglucosa.com</strong>{" "}
        e all&apos;app mobile Dulce (insieme, il «Servizio») e il loro utilizzo. Usando il
        Servizio accetti questi termini. Se non li accetti, non usare il Servizio.
      </p>

      <blockquote>
        <p>
          ⚠️ Dulce <strong>non è un dispositivo medico</strong>. Non diagnostica, non cura, non
          guarisce né previene alcuna malattia. Le decisioni sulla terapia vanno sempre prese con
          il tuo team diabetologico.
        </p>
      </blockquote>

      <h2 id="acceptance">1. Accettazione</h2>
      <p>
        Scaricando l&apos;app, collegando il tuo account CGM o usando qualsiasi parte del
        Servizio, confermi di aver letto, compreso e accettato questi termini e la nostra{" "}
        <Link href="/legal/privacy">informativa sulla privacy</Link>.
      </p>

      <h2 id="service">2. Descrizione del Servizio</h2>
      <p>
        Dulce è un&apos;app di supporto per le persone con diabete (soprattutto di tipo 1) e per
        chi se ne prende cura. Il Servizio permette, tra l&apos;altro, di:
      </p>
      <ul>
        <li>
          vedere i dati di FreeStyle Libre tramite LibreLinkUp (Abbott), quelli di Dexcom G6,
          G7 e ONE+ tramite Dexcom Share, quelli dei sistemi Medtronic tramite Medtronic CareLink
          o quelli di un sito Nightscout;
        </li>
        <li>
          mostrare la glicemia sulla schermata di blocco dell&apos;iPhone (Attività in tempo
          reale), nella Dynamic Island, nei widget della schermata Home e in un&apos;app nativa per
          Apple Watch;
        </li>
        <li>ricevere avvisi di glicemia configurabili;</li>
        <li>tenere un diario manuale di cibo, insulina, glicemia e note;</li>
        <li>vedere andamenti e statistiche basati sui tuoi dati;</li>
        <li>
          condividere la glicemia in tempo reale con i follower che inviti (monitoraggio da parte
          della famiglia);
        </li>
        <li>
          salvare la cronologia della tua glicemia e condividere il tuo diario con i follower che
          inviti, così che tu e loro vediate lo stesso grafico (Dulce Pro, con il tuo consenso;
          vedi sezione 8.1).
        </li>
      </ul>
      <p>
        Alcune funzioni richiedono un abbonamento <strong>Dulce Pro</strong> (vedi sezione 8).
      </p>

      <h2 id="medical">3. Avvertenza medica</h2>
      <p>
        Dulce <strong>non</strong> è un dispositivo medico né sostituisce il giudizio di un
        professionista. Il Servizio non consiglia dosi di insulina, non diagnostica né cura
        alcuna condizione e non deve essere usato per prendere decisioni cliniche al posto del tuo
        diabetologo, del medico di base o di altri professionisti sanitari.
      </p>
      <p>
        I dati di glicemia mostrati da Dulce arrivano dal tuo CGM tramite servizi di terzi e sono
        soggetti ai loro limiti tecnici, ritardi e possibili errori. Segui le istruzioni del
        produttore del tuo CGM su quando confermare una lettura con un glucometro, anche se non
        corrisponde ai tuoi sintomi o alle tue aspettative.
      </p>
      <p>
        <strong>Non affidarti a Dulce come unico sistema di allarme.</strong> La consegna di
        notifiche, Attività in tempo reale e aggiornamenti sull&apos;orologio dipende da Apple,
        dal fornitore del CGM, dalla rete e dalle impostazioni del dispositivo e non può essere garantita. Tieni
        attivi gli allarmi dell&apos;app ufficiale del tuo sistema CGM. Dulce è un&apos;app
        complementare e non sostituisce l&apos;app ufficiale del produttore.
      </p>
      <p>
        La cronologia del grafico salvata, il diario condiviso, le statistiche e i grafici di
        Dulce non sono una cartella clinica. Non usarli, né usare altro in Dulce, per prendere
        decisioni terapeutiche.
      </p>

      <h2 id="eligibility">4. Requisiti</h2>
      <p>
        Per usare il Servizio devi avere almeno 14 anni. Tra i 14 e i 18 anni ti serve il
        consenso di un genitore o tutore legale. Se gestisci un account per conto di un minore,
        sei responsabile di farlo nel rispetto della legge applicabile. Su Android devi avere almeno 18 anni per usare Dulce e il consenso indicato sopra non si applica. Un genitore o tutore legale può comunque usare Dulce su Android per seguire la glicemia di un minore.
      </p>

      <h2 id="accounts">5. Account e credenziali</h2>
      <p>
        Dulce accede ai dati FreeStyle Libre tramite <strong>LibreLinkUp</strong>, ai dati
        Dexcom tramite <strong>Dexcom Share</strong>, ai dati Medtronic tramite{" "}
        <strong>Medtronic CareLink</strong> o a un sito <strong>Nightscout</strong>. Sei
        responsabile della riservatezza di queste credenziali. Dulce le conserva nel portachiavi
        sicuro del dispositivo, con queste eccezioni, spiegate nell&apos;
        <Link href="/legal/privacy">informativa sulla privacy</Link>: per Dexcom con «Resta
        connesso», la tua password è conservata, cifrata, anche sul nostro relay; per Medtronic
        CareLink, il nostro relay conserva i token di accesso rilasciati da Medtronic, mai la tua
        password; e finché Dulce continua a raccogliere la tua cronologia del grafico salvata dopo
        che esci dall&apos;account o rimuovi l&apos;app (sezione 8.1), il nostro relay conserva la
        credenziale del sensore necessaria a tale scopo. Non possiamo recuperare credenziali
        perse per conto del tuo fornitore CGM. Devi
        avere il diritto di usare l&apos;account che colleghi.
      </p>

      <h2 id="sharing">6. Monitoraggio da parte della famiglia</h2>
      <p>
        Sei tu a decidere chi può seguire la tua glicemia, inviandogli un invito. Sei responsabile
        della scelta dei follower e puoi revocare il loro accesso in qualsiasi momento. I follower
        non devono usare Dulce come sistema di monitoraggio di emergenza: la consegna di letture e
        avvisi ai follower è soggetta agli stessi limiti descritti nella sezione 3. La cronologia
        del grafico salvata può avere buchi e i follower possono vedere meno di te. Se condividi il
        tuo diario, i tuoi follower vedono tutto ciò che contiene, comprese le note a testo
        libero; non scrivere informazioni su altre persone nelle note che condividi.
      </p>

      <h2 id="license">7. Licenza</h2>
      <p>
        Ti concediamo una licenza limitata, non esclusiva, non trasferibile e revocabile per usare
        Dulce secondo questi termini, per uso personale e non commerciale.
      </p>

      <h2 id="subscriptions">8. Abbonamenti (Dulce Pro)</h2>
      <p>
        L&apos;app è gratuita da scaricare e da usare con le funzioni di base. Alcune funzioni
        (come l&apos;Attività in tempo reale sulla schermata di blocco, gli aggiornamenti in tempo
        reale su Apple Watch, gli avvisi di glicemia, il monitoraggio da parte della famiglia e la
        cronologia del grafico salvata) richiedono un abbonamento <strong>Dulce Pro</strong> a rinnovo automatico:
      </p>
      <ul>
        <li>
          Disponibile come piano <strong>mensile</strong> o <strong>annuale</strong>. Il prezzo
          esatto è sempre mostrato nell&apos;App Store e nella schermata di acquisto prima che tu
          confermi.
        </li>
        <li>
          I nuovi abbonati possono ricevere una <strong>prova gratuita</strong> (attualmente 14
          giorni). Al termine della prova l&apos;abbonamento si rinnova al prezzo indicato, a meno
          che tu non lo annulli almeno 24 ore prima.
        </li>
        <li>
          Il pagamento viene addebitato sul tuo ID Apple. Gli abbonamenti si rinnovano
          automaticamente se non vengono annullati almeno 24 ore prima della fine del periodo in
          corso, in <strong>Impostazioni → ID Apple → Abbonamenti</strong> sul dispositivo.
        </li>
        <li>I rimborsi sono gestiti da Apple secondo le sue condizioni.</li>
        <li>
          Queste condizioni non limitano i diritti inderogabili dei consumatori che ti spettano.
          Per le date della prova e le opzioni di annullamento, rinnovo e rimborso, fai
          riferimento alla schermata d&apos;acquisto e ai termini e strumenti di abbonamento
          vigenti di Apple.
        </li>
      </ul>

      <h3>8.1 Cronologia del grafico salvata (Dulce Pro)</h3>
      <p>
        La cronologia del grafico salvata fa parte di Dulce Pro. Viene usata solo se la accetti
        nell&apos;app e puoi disattivarla in qualsiasi momento. La nostra{" "}
        <Link href="/legal/privacy">informativa sulla privacy</Link> (sezione 2.6) spiega che cosa
        viene salvato, chi può vederlo e come eliminarlo.
      </p>
      <p>
        Cerchiamo di salvare la tua cronologia in modo completo, ma non garantiamo che sia
        completa, continua, corretta o sempre disponibile. Dipende dalla sessione del tuo sensore
        e da terzi (il servizio del produttore del tuo sensore, Apple, Google e il nostro fornitore
        di hosting) e può avere buchi o andare persa. Non è una cartella clinica né un backup: non
        affidarti ad essa per alcuna decisione terapeutica e conserva i dati che ti servono
        nell&apos;app ufficiale del produttore del tuo sensore. La sezione 3 si applica per intero
        a essa.
      </p>
      <p>
        Conserviamo al massimo circa 1 anno di cronologia. Se il tuo abbonamento termina o viene
        rimborsato, il salvataggio si interrompe e la tua cronologia salvata viene eliminata 90
        giorni dopo; se ti abboni di nuovo entro questo termine, è di nuovo disponibile. Le
        funzioni gratuite continuano a funzionare con i dati sul tuo dispositivo.
      </p>
      <p>
        Uscire dall&apos;account o rimuovere l&apos;app non elimina di per sé la tua cronologia
        salvata. Se lo hai accettato, Dulce continua a raccogliere la tua cronologia mentre sei
        uscito dall&apos;account o l&apos;app è stata rimossa e conserva la credenziale del sensore
        necessaria a tale scopo (per Dexcom con «Resta connesso», la tua password, cifrata) fino
        alla fine della raccolta. La raccolta termina quando accedi di nuovo, la disattivi, scegli
        «Interrompi ed elimina» quando esci dall&apos;account, usi «Elimina account», il tuo
        abbonamento termina, il servizio del tuo sensore rifiuta l&apos;accesso o continua a
        fallire, oppure è trascorso 1 anno.
      </p>
      <p>
        Se condividi il tuo diario, i tuoi follower vedono tutto ciò che contiene, comprese le note
        a testo libero. Sei responsabile di ciò che scrivi nelle note che condividi, comprese le
        informazioni su altre persone. Puoi disattivare la condivisione in qualsiasi momento, il
        che elimina la copia condivisa.
      </p>
      <p>
        Possiamo modificare, limitare o interrompere questa funzione, ad esempio per proteggere il
        Servizio, per motivi legali, per controllarne il costo o perché il servizio del produttore
        di un sensore non la consente più. Se la interrompiamo, te lo comunicheremo nell&apos;app
        con almeno 30 giorni di anticipo, salvo che un motivo di sicurezza, legale o legato a terzi
        al di fuori del nostro controllo lo renda impossibile; durante quel periodo la tua
        cronologia salvata resta visibile nell&apos;app e puoi chiederci una copia via email. Ciò a
        cui hai diritto in quel caso è descritto nella sezione 10.
      </p>

      <h2 id="prohibited">9. Comportamenti vietati</h2>
      <p>Non puoi:</p>
      <ul>
        <li>usare il Servizio per scopi illeciti o violando i diritti di terzi;</li>
        <li>tentare di accedere a sistemi, dati o account senza autorizzazione;</li>
        <li>
          effettuare reverse engineering o aggirare misure tecniche di protezione, salvo nei limiti
          consentiti dalla legge applicabile;
        </li>
        <li>automatizzare l&apos;invio massivo di moduli o inviare spam alla nostra infrastruttura.</li>
      </ul>

      <h2 id="third-parties">10. Servizi di terzi e collegamenti ai sensori</h2>
      <p>
        Dulce si collega a servizi di terzi che scegli tu o che sono necessari al funzionamento:
        i servizi dei produttori di sensori LibreLinkUp (Abbott), Dexcom Share e Medtronic
        CareLink, e i siti Nightscout gestiti da te o da qualcuno che scegli; Apple (compresi
        Salute di Apple, notifiche e pagamenti); Google (notifiche e pagamenti su Android);
        Cloudflare, che ospita il nostro relay; e RevenueCat per la verifica degli abbonamenti. Il
        loro uso è regolato dai rispettivi termini e informative. Non siamo responsabili della
        loro disponibilità, accuratezza o modifiche.
      </p>
      <p>
        Dulce legge i tuoi dati glicemici tramite i servizi online dei produttori dei sensori.
        Alcuni di questi collegamenti usano interfacce non ufficiali, non documentate o non
        offerte per app come Dulce (ad esempio Medtronic CareLink). Le aziende che le gestiscono
        possono modificarle, limitarle, bloccarle o chiuderle in qualsiasi momento, senza
        preavviso né a noi né a te. Se ciò accade, Dulce può smettere di funzionare in tutto o in
        parte per quel sensore, temporaneamente o definitivamente: letture in tempo reale, avvisi,
        schermata di blocco, widget e orologio, monitoraggio da parte della famiglia, cronologia
        del grafico salvata e raccolta mentre sei via. Non possiamo impedirlo e potremmo non
        riuscire a risolverlo né a recuperare i dati mancanti. Faremo ogni ragionevole sforzo per
        ripristinare il collegamento e per avvisarti nell&apos;app, ma non possiamo promettere di
        riuscirci.
      </p>
      <p>
        In tal caso: Dulce Pro è fatturato da Apple (o da Google Play, se ti sei abbonato su
        Android) e i rimborsi sono decisi da loro secondo le loro regole; non possiamo emettere
        rimborsi noi stessi. Puoi annullare in qualsiasi momento nelle impostazioni degli
        abbonamenti dell&apos;App Store o di Google Play, così che l&apos;abbonamento non si
        rinnovi, e puoi chiedere un rimborso ad Apple o a Google. Nulla in questa sezione limita i
        diritti inderogabili dei consumatori che ti spettano, compresi i rimedi previsti dalla
        legge quando un servizio digitale a pagamento non funziona come pattuito.
      </p>
      <p>
        Dulce è un prodotto indipendente, non affiliato ad Abbott, Dexcom, Medtronic, al progetto
        Nightscout, ad Apple o a Google né approvato o sponsorizzato da loro. I loro nomi e quelli
        dei loro prodotti sono marchi dei rispettivi titolari e sono usati solo per descrivere la
        compatibilità.
      </p>

      <h2 id="ip">11. Proprietà intellettuale</h2>
      <p>
        Il Servizio, compresi codice, design, marchio e contenuti da noi pubblicati, appartiene a
        Dulce e ai suoi licenzianti. I dati che inserisci (il tuo diario, le tue impostazioni)
        restano tuoi.
      </p>

      <h2 id="disclaimers">12. Esclusione di garanzie</h2>
      <p>
        Il Servizio è fornito «così com&apos;è» e «come disponibile». Nella misura massima
        consentita dalla legge applicabile, non garantiamo che il Servizio o una sua parte
        (comprese letture, avvisi, Attività in tempo reale, widget, aggiornamenti sull&apos;orologio,
        cronologia del grafico salvata, monitoraggio da parte della famiglia e condivisione del
        diario) sia ininterrotto, tempestivo, completo, privo di errori o sicuro al 100%, che i
        dati non vadano persi o che soddisfi aspettative specifiche. Questo vale in particolare per
        i dati di servizi CGM di terzi: qualsiasi ritardo, errore o assenza di dati presso il
        fornitore originale può riflettersi in Dulce. Ciò non pregiudica i tuoi diritti di legge
        come consumatore.
      </p>

      <h2 id="liability">13. Limitazione di responsabilità</h2>
      <p>
        Dulce è un complemento al tuo sistema CGM, non un dispositivo medico. Nella misura massima
        consentita dalla legge applicabile:
      </p>
      <ul>
        <li>
          Non rispondiamo di danni o perdite derivanti da decisioni su insulina, farmaci,
          alimentazione, attività fisica o cure mediche prese sulla base delle informazioni mostrate
          in Dulce, o dall&apos;aver fatto affidamento su Dulce invece che sul tuo sistema CGM, sulla
          sua app ufficiale e sui suoi allarmi, su un glucometro o sul tuo team sanitario.
        </li>
        <li>
          Non rispondiamo del fatto che letture, avvisi, Attività in tempo reale, widget,
          aggiornamenti sull&apos;orologio, cronologia del grafico salvata, monitoraggio da parte
          della famiglia o condivisione del diario siano in ritardo, incompleti, errati,
          non disponibili o persi, quando ciò deriva dalle cause descritte nelle sezioni 3, 8.1 e 10
          (compresi il tuo dispositivo, la rete e il sistema operativo, e i servizi del produttore
          del tuo sensore, di Apple o di Google) o da altre circostanze al di fuori del nostro
          ragionevole controllo.
        </li>
        <li>
          Non rispondiamo di perdite indirette o consequenziali, mancati guadagni o perdita di
          dati. La cronologia del grafico salvata non è un backup.
        </li>
        <li>
          In tutti gli altri casi, la nostra responsabilità complessiva per tutte le pretese
          relative al Servizio è limitata all&apos;importo che hai pagato per Dulce Pro nei 12 mesi
          precedenti l&apos;evento che ha dato origine alla pretesa.
        </li>
      </ul>
      <p>
        Nessuna di queste limitazioni si applica a, e nulla in questi termini esclude o limita, la
        nostra responsabilità per dolo o colpa grave; per morte o lesioni personali causate da
        negligenza; per frode; ai sensi della normativa imperativa sulla responsabilità per danno
        da prodotti difettosi; o qualsiasi altra responsabilità, o diritto dei consumatori (compresi
        i tuoi diritti di legge quando contenuti o servizi digitali non conformi al contratto),
        che non possa essere esclusa o limitata ai sensi della legge che ti si applica. Se tale
        legge consente una limitazione solo in parte, essa si applica soltanto in quella misura.
      </p>

      <h2 id="indemnity">14. Manleva</h2>
      <p>
        Ti impegni a tenere indenne Dulce da qualsiasi pretesa di terzi derivante dal tuo uso del
        Servizio in violazione di questi termini o della legge.
      </p>

      <h2 id="changes">15. Modifiche al Servizio o a questi termini</h2>
      <p>
        Possiamo modificare il Servizio e questi termini per riflettere nuove funzioni, requisiti
        di legge o esigenze di sicurezza. Ti avviseremo via email o nel Servizio quando le
        modifiche sono rilevanti.
      </p>

      <h2 id="termination">16. Cessazione</h2>
      <p>
        Puoi smettere di usare il Servizio in qualsiasi momento ed eliminare i tuoi dati da{" "}
        <strong>Impostazioni → Elimina account</strong>. Uscire dall&apos;account o rimuovere
        l&apos;app non elimina di per sé la tua cronologia del grafico salvata né, se lo hai
        accettato, interrompe la raccolta da parte di Dulce (sezione 8.1). Possiamo sospendere o chiudere il tuo
        accesso se violi questi termini o se comprometti la sicurezza o la liceità del Servizio.
      </p>

      <h2 id="law">17. Legge applicabile e foro competente</h2>
      <p>
        Questi termini sono regolati dalla legge del paese in cui è stabilito il gestore del
        Servizio. Se sei un consumatore, ciò non ti priva della tutela delle norme imperative
        del paese in cui risiedi abitualmente e puoi rivolgerti ai tribunali del tuo luogo di
        residenza.
      </p>

      <h2 id="contact">18. Contatti</h2>
      <p>
        Per qualsiasi domanda su questi termini scrivi a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
