import { Link } from "@/i18n/navigation";

{/* Traduzione del testo spagnolo, che prevale. Decisioni di redazione e punti aperti: DULCE/plans/legal-answers-2026-11-16.md (in inglese). */}
export function PrivacyIt() {
  return (
    <>
      <p>
        Questa informativa sulla privacy spiega quali dati personali raccoglie Dulce, come li
        usiamo e quali diritti hai su di essi. Vale per questo sito (
        <strong>dulceglucosa.com</strong>) e per l&apos;app mobile Dulce.
      </p>

      <h2 id="controller">1. Titolare del trattamento</h2>
      <p>
        Il titolare del trattamento è <strong>Giorgi Khimshiashvili</strong>, ditta
        individuale. Per qualsiasi domanda sui tuoi dati scrivici a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>

      <h2 id="data">2. Quali dati raccogliamo</h2>
      <h3>2.1 Sito web</h3>
      <ul>
        <li>
          <strong>Lista d&apos;attesa Android:</strong> la tua email, la lingua scelta, la pagina o
          posizione in cui ti sei iscritto e un hash pseudonimo del tuo IP per prevenire abusi.
        </li>
        <li>
          <strong>Modulo di interesse per la beta, se ne hai inviato uno:</strong> nome, email,
          dispositivo CGM, regione e note facoltative che hai scelto di condividere.
        </li>
        <li>
          <strong>Modulo di contatto:</strong> nome, email, oggetto e messaggio. Resend inoltra
          il messaggio alla nostra casella di supporto e ti invia una conferma.
        </li>
        <li>
          <strong>Dati tecnici minimi:</strong> un hash pseudonimizzato (SHA-256) del tuo indirizzo IP
          combinato con un salt che cambia ogni giorno, usato per limitare gli abusi dei moduli.
          I record della lista d&apos;attesa e della beta includono questo hash fino alla loro
          cancellazione. I contatori di limitazione sono temporanei. Non conserviamo direttamente
          l&apos;IP in chiaro.
        </li>
        <li>
          <strong>Analisi del sito:</strong> Vercel Analytics misura visualizzazioni di pagina e
          prestazioni senza cookie. Vercel dichiara che la metrica dei visitatori usa un hash
          derivato dalla richiesta, che scade dopo 24 ore; i report possono includere URL, sito
          di provenienza, località generale, browser e sistema operativo, che consultiamo in forma
          aggregata. Google Analytics 4 misura visite, percorso e
          lingua della pagina, clic sui link all&apos;App Store con campagna e posizione, e
          iscrizioni completate alla lista d&apos;attesa. Nello SEE, nel Regno Unito, in Svizzera o
          se la tua posizione è sconosciuta, si carica solo dopo che accetti i cookie di analisi;
          altrove si applica l&apos;impostazione
          regionale descritta nella Cookie Policy. Non inviamo a nessuno dei due servizi letture
          della glicemia, altri dati sanitari o il tuo indirizzo email.
        </li>
      </ul>

      <h3>2.2 Nell&apos;app, sul tuo dispositivo</h3>
      <ul>
        <li>
          <strong>Le credenziali del tuo CGM.</strong> Accedi al tuo account LibreLinkUp
          (Abbott) o Dexcom Share. La password è conservata nel portachiavi sicuro del tuo
          dispositivo e non viene inviata a Dulce. L&apos;app la usa per collegarsi al fornitore;
          quando il tuo CGM è collegato, al relay viene inviato un token di sessione del
          fornitore (non la password), come spiegato sotto. Con Medtronic CareLink inserisci la password sulla pagina di Medtronic, quindi Dulce non la vede mai, e Dulce riceve token di accesso da Medtronic. Con Nightscout inserisci l’indirizzo del tuo sito e un token di accesso o secret API (Dulce conserva solo l’impronta SHA-1 del secret). Eccezione per Dexcom: finché «Resta connesso» è attivo (Impostazioni › Sensore, attivo per impostazione predefinita), l&apos;app invia una volta anche la tua password Dexcom al relay, perché Dexcom chiude le sessioni ogni 24 ore; vedi sotto. Se usi la cronologia del grafico salvata e hai accettato la raccolta mentre sei via, questo permette inoltre al relay di continuare a raccogliere la tua cronologia dopo che sei uscito dall&apos;account (vedi 2.6).
        </li>
        <li>
          <strong>Le letture della glicemia</strong> recuperate da LibreLinkUp, Dexcom Share, Medtronic CareLink o Nightscout,
          salvate in un database locale sul dispositivo (e, per chi ha un abbonamento Dulce Pro e
          accetta la cronologia del grafico salvata, anche sul relay; vedi 2.6).
        </li>
        <li>
          <strong>Il tuo diario</strong>: carboidrati, insulina (comprese le dosi lette da una penna
          da insulina intelligente o riportate da un microinfusore), attività fisica, glicemie
          inserite a mano, peso, farmaci, proteine, grassi e calorie (compresi i valori di una
          scansione di foto del pasto), etichette e note. Salvato sul tuo dispositivo. Se usi la
          cronologia del grafico salvata (Dulce Pro), il tuo diario ne fa parte e viene salvato
          anche sul relay, per intero, comprese le note a testo libero, a meno che tu non
          disattivi «Salva il mio diario». Se i tuoi follower possono vederlo lo decide
          separatamente «Condividi il mio diario con la famiglia» (attivo per impostazione
          predefinita, puoi disattivarlo); vedi 2.6.
        </li>
        <li>
          <strong>I dati di Salute di Apple</strong> (iPhone) o di <strong>Health Connect</strong> (Android), se dai il permesso. Su Android, Dulce legge soltanto. Su iPhone, dalla versione 1.0.7, Dulce può anche salvare le letture del sensore in Salute, al massimo una ogni 5 minuti, se attivi la glicemia in Dulce e lo consenti. Puoi interrompere il salvataggio nelle impostazioni di Dulce o nell’app Salute. Le letture salvate restano in Salute e le altre app a cui lo consenti possono leggerle.
        </li>
        <li>
          <strong>Le preferenze</strong>: unità, intervallo target, lingua, tema, impostazioni
          degli avvisi.
        </li>
      </ul>

      <h3>2.2.2 Misurazione degli annunci (iOS)</h3>
      <p>
        Per misurare se gli annunci di Dulce portano a installazioni e abbonamenti, l&apos;app
        iOS usa SKAdNetwork di Apple, il sistema di attribuzione pubblicitaria di Apple che
        tutela la privacy. L&apos;app aggiorna sul tuo dispositivo solo un valore di conversione
        approssimativo (installata, prova iniziata, abbonamento mensile, annuale o a vita). Apple
        invia alla rete pubblicitaria rapporti aggregati e ritardati che non ti identificano.
        Non vengono usati identificativi pubblicitari né richieste di tracciamento, e non
        contengono dati sulla glicemia o sulla salute.
      </p>
      <p>
        Separatamente, Dulce può condividere con Meta (Meta Platforms Ireland Ltd. per gli
        utenti in Europa) eventi di installazione e di acquisto. È <strong>disattivato</strong>{" "}
        per impostazione predefinita: parte solo se attivi «Condividi eventi di installazione e
        acquisto con Meta» in Impostazioni, e puoi disattivarlo di nuovo lì in qualsiasi
        momento. Finché non lo attivi, l&apos;SDK di Meta non viene avviato e a Meta non viene
        inviato nulla. Se lo attivi, condividiamo il fatto che l&apos;app è stata installata o
        aperta e che è iniziato un abbonamento o una prova (gli eventi di acquisto li invia il
        nostro fornitore di pagamenti, RevenueCat), insieme a un identificativo anonimo creato
        dall&apos;SDK di Meta per questa app e ai dati tecnici inviati con ogni richiesta
        (indirizzo IP, modello del dispositivo, versione del sistema operativo). Non
        condividiamo mai letture della glicemia, dati o eventi sanitari, dati dell&apos;account
        del sensore, né il tuo nome o la tua email.
      </p>
      <p>
        Dulce non mostra la richiesta di tracciamento di Apple e non raccoglie l&apos;identificativo
        pubblicitario (IDFA). Non vieni tracciato tra le app e i siti web di altre aziende. La
        base giuridica per la condivisione con Meta è il tuo consenso (art. 6, par. 1, lett. a)
        GDPR), che puoi revocare in qualsiasi momento disattivando l&apos;interruttore.
      </p>
      <h3>2.3 Il relay di Dulce (funzioni in tempo reale)</h3>
      <p>
        Quando il tuo CGM è collegato, l&apos;app registra questa installazione sul nostro relay
        per fornire aggiornamenti in background, avvisi, funzioni Apple Watch e monitoraggio
        familiare quando li usi. Il relay è un piccolo server che gestiamo su Cloudflare.
        Recupera le letture da LibreLinkUp, Dexcom Share, Medtronic CareLink o Nightscout e invia aggiornamenti ai tuoi
        dispositivi. Il relay tratta:
      </p>
      <ul>
        <li>
          <strong>Un token di sessione del fornitore</strong> (non la password): un token
          LibreLinkUp o un ID di sessione Dexcom Share, per recuperare le letture per tuo conto. Con Medtronic CareLink, il relay conserva i tuoi token di accesso CareLink. Con Nightscout, conserva l’indirizzo del tuo sito e il token di accesso o l’impronta SHA-1 del tuo secret API. Con Dexcom, finché «Resta connesso» è attivo, il relay conserva anche la tua password Dexcom cifrata (AES-256-GCM, con la chiave conservata a parte nell’archivio dei segreti di Cloudflare) e la usa solo per accedere di nuovo a Dexcom Share quando la sessione scade. Non viene mai registrata nei log né condivisa e viene eliminata quando disattivi l’opzione o elimini l’account. Viene eliminata anche quando esci dall&apos;account, a meno che Dulce non continui a raccogliere la tua cronologia del grafico salvata mentre sei via (vedi 2.6): in tal caso resta, cifrata, solo finché la raccolta continua e viene eliminata nel momento in cui termina, per qualsiasi motivo. Se quando esci scegli «Interrompi ed elimina», viene eliminata subito.
        </li>
        <li>
          <strong>Un ID casuale dell&apos;installazione e un identificativo dell&apos;account CGM</strong>
          per associare registrazione, letture e impostazioni al dispositivo e account CGM corretti.
        </li>
        <li>
          <strong>Token di notifica</strong> emessi da Apple o Google per inviare notifiche e
          aggiornamenti dell&apos;Attività in tempo reale.
        </li>
        <li>
          <strong>Le tue letture più recenti</strong>, compresi valore e orario, come breve
          finestra continuamente sovrascritta, necessaria per l&apos;Attività in tempo reale,
          l&apos;orologio e la vista dei follower. Se hai un abbonamento Dulce Pro e accetti la
          cronologia del grafico salvata nell&apos;app, il relay conserva anche la cronologia del
          tuo grafico fino a 1 anno (vedi 2.6). Senza di essa, la tua cronologia a lungo termine
          resta solo sul tuo dispositivo.
        </li>
        <li>
          <strong>Impostazioni e dati tecnici del dispositivo e dell&apos;app</strong> necessari al
          servizio (unità, intervallo target, soglie degli avvisi, lingua, fuso orario,
          piattaforma e versione dell&apos;app).
        </li>
        <li>
          <strong>Foto dei pasti</strong>, solo se usi «Stima i carboidrati da una foto»: il relay le
          inoltra ad Anthropic per stimare i carboidrati e i valori nutrizionali, senza conservarle, e tiene un conteggio
          giornaliero delle foto usate (vedi 2.8).
        </li>
        <li>
          <strong>Eventi di utilizzo:</strong> eventi relativi a configurazione, connessione, abbonamento, pagina di pagamento e uso delle funzioni, oltre a ogni opzione di feedback che tocchi, associati all&apos;ID casuale dell&apos;installazione per misurare e migliorare il servizio. Non includono letture della glicemia né il testo dei messaggi.
        </li>
        <li>
          <strong>Log operativi:</strong> i log diagnostici inviati a Cloudflare Workers Logs
          contengono un codice pseudonimo del dispositivo (un hash non reversibile dell&apos;ID
          dell&apos;installazione, non l&apos;ID stesso), il tuo fornitore di CGM, se ogni
          aggiornamento o avviso è stato consegnato, il tipo di avviso quando ne viene inviato uno,
          gli eventi di stato dell&apos;Attività Live segnalati dall&apos;app e i dettagli sugli
          errori. Non contengono valori glicemici. Cloudflare elimina questi log dopo 7 giorni.
        </li>
      </ul>
      <p>
        Puoi interrompere questo trattamento usando «Elimina account» in Impostazioni. Uscire
        dal tuo account del sensore in Dulce interrompe gli aggiornamenti in tempo reale e gli
        avvisi; se usi la cronologia del grafico salvata, sei tu a scegliere se Dulce continua a
        raccogliere la tua cronologia mentre sei uscito dall&apos;account (vedi 2.6). «Elimina
        account» chiede al relay di eliminare i dati attivi del dispositivo, i token, i dati di
        condivisione e quelli della cronologia salvata. Restano un ID minimo dell&apos;installazione e la data
        della prima registrazione, per riconoscere un&apos;installazione che torna e non
        contarla come nuova nelle metriche interne. Questo indicatore non ha una scadenza
        automatica. Scrivici se vuoi cancellare anche questo indicatore.
      </p>

      <h3>2.4 Monitoraggio da parte della famiglia</h3>
      <p>
        Se inviti qualcuno a seguirti, il relay invia le tue letture e i tuoi avvisi al suo
        dispositivo dal momento in cui accetta. Senza la cronologia del grafico salvata, lo
        storico precedente non viene condiviso. Se usi la cronologia del grafico salvata (Dulce
        Pro), i tuoi follower possono vedere anche la cronologia salvata del tuo grafico, comprese
        le letture precedenti alla loro accettazione e, finché la condivisione del diario è
        attiva, il tuo diario condiviso, comprese le note a testo libero (attivando la condivisione
        vedono il diario salvato degli ultimi 90 giorni); smettono di vederla
        quando li revochi o metti in pausa la condivisione (vedi 2.6).
        I messaggi tra te e i tuoi follower, compreso il testo che scrivi, passano dal relay e dal servizio di notifiche di Apple o Google per raggiungere i loro dispositivi. Il relay non conserva il testo dei messaggi né una cronologia. Puoi revocare l&apos;accesso a un follower in qualsiasi momento
        e disattivare del tutto questi messaggi.
      </p>

      <h3>2.5 Acquisti</h3>
      <p>
        Gli abbonamenti sono gestiti da <strong>Apple</strong>. Non vediamo mai il tuo nome, la
        tua carta o i dati di fatturazione. Usiamo <strong>RevenueCat</strong> per verificare gli
        abbonamenti tramite un identificativo casuale generato dall&apos;app, non la tua email o
        la tua identità.
      </p>
      <p>
        Il nostro server conserva questo identificativo RevenueCat insieme all&apos;identificativo
        di installazione per rimuovere le funzioni Pro non appena un acquisto viene rimborsato.
        Se chiedi un rimborso ad Apple o Google, possiamo comunicare loro, tramite RevenueCat, se
        l&apos;acquisto è stato fornito e la nostra preferenza sul rimborso. Non condividiamo mai
        dati di glicemia o di salute; la decisione spetta sempre ad Apple o Google.
      </p>

      <h3>2.6 Cronologia del grafico salvata (Dulce Pro)</h3>
      <p>
        <strong>Che cos&apos;è.</strong> Se hai Dulce Pro e lo accetti nell&apos;app, il nostro
        relay salva la tua cronologia glicemica, così il tuo grafico e quello dei tuoi follower
        sono uguali e senza buchi, e la tua cronologia è ancora lì dopo che esci dall&apos;account,
        reinstalli Dulce o cambi iPhone. Se non hai Dulce Pro o non lo accetti, non viene salvato
        nulla e la tua cronologia resta solo sul tuo dispositivo.
      </p>
      <p>
        <strong>Che cosa viene salvato.</strong>
      </p>
      <ul>
        <li>
          Le tue letture della glicemia, ciascuna con orario, valore e freccia di tendenza: la
          cronologia restituita dal servizio del tuo sensore (LibreLinkUp, Dexcom Share, Medtronic
          CareLink o Nightscout), le letture recuperate dal relay e, una sola volta quando accetti,
          la cronologia già presente sul tuo telefono (fino a 90 giorni).
        </li>
        <li>
          Il tuo diario, che fa parte della cronologia del grafico salvata. Ogni voce del diario
          viene salvata con tutti i suoi campi: carboidrati, insulina (comprese le dosi lette da
          una penna da insulina intelligente o riportate da un microinfusore, e le dosi di
          priming), attività fisica, controlli manuali della glicemia, peso, farmaci, proteine,
          grassi e calorie (compresi i valori di una scansione di foto del pasto), etichette e
          note a testo libero, ciascuno con orario e quantità. Quando attivi la cronologia del
          grafico salvata, l&apos;app ti dice che il tuo diario ne fa parte e viene salvato
          anch&apos;esso. Se hai accettato la cronologia del grafico salvata prima di questa
          versione, il tuo diario non viene salvato finché non dai il tuo consenso nell&apos;app
          (un avviso una tantum con «Attiva» o «Non ora»). Puoi cambiarlo in qualsiasi momento con
          l&apos;interruttore «Salva il mio diario» nelle impostazioni della cronologia del
          grafico.
        </li>
        <li>
          Il tuo diario per la famiglia: l&apos;interruttore «Condividi il mio diario con la
          famiglia» (attivo per impostazione predefinita finché la cronologia del grafico salvata è
          attiva) decide soltanto se i tuoi follower possono vedere il tuo diario. Vedono le voci
          condivise (carboidrati, insulina, attività fisica, controlli manuali della glicemia e
          note a testo libero, ciascuno con orario e quantità), mai la copia completa che solo tu
          puoi leggere. Attivando la condivisione, le persone che ti seguono vedono il diario
          salvato degli ultimi 90 giorni.
        </li>
        <li>
          Non vengono salvati insieme a essa: l&apos;email del tuo account del sensore, il tuo
          nome, il testo dei messaggi tra te e i tuoi follower e i dati di Salute di Apple o di
          Health Connect.
        </li>
      </ul>
      <p>
        <strong>Perché.</strong> Solo per fornire questa funzione: lo stesso grafico completo per
        te e per i familiari che hai invitato, conservato dopo l&apos;uscita dall&apos;account, la
        reinstallazione e il cambio di telefono, e il tuo diario torna dopo una reinstallazione o
        su un nuovo telefono, come le tue letture. Non lo usiamo per pubblicità, profilazione o
        vendita e non lo condividiamo con Meta né con alcun servizio di analisi.
      </p>
      <p>
        <strong>Base giuridica.</strong> Il tuo consenso esplicito (art. 9, par. 2, lett. a)
        GDPR), perché i dati sulla glicemia sono dati sanitari. L&apos;app te lo chiede prima che il
        salvataggio inizi, separatamente per ogni account del sensore: se accedi con un altro
        account del sensore, te lo chiede di nuovo. Prima della tua risposta non viene salvato
        nulla e le versioni dell&apos;app che non lo chiedono non salvano nulla. Puoi revocare il
        consenso in qualsiasi momento in Impostazioni: il salvataggio si interrompe e la copia
        salvata sul relay (letture e diario) viene eliminata subito. La revoca non pregiudica la
        liceità del salvataggio effettuato prima. Dulce Pro non dipende da questo consenso: senza
        di esso, Dulce Pro funziona senza cronologia salvata. Il consenso alla cronologia del
        grafico salvata comprende anche il tuo diario: l&apos;app te lo dice quando la attivi e,
        se hai accettato prima di questa versione, il tuo diario viene salvato solo dopo che dai
        il tuo consenso nell&apos;app.
      </p>
      <p>
        <strong>Dove.</strong> Sul relay di Dulce, in un database del nostro fornitore di hosting
        Cloudflare, che lo tratta per nostro conto e può trattare dati nell&apos;UE e in altri Paesi
        con le proprie garanzie standard (vedi sezione 8). La stessa cronologia e lo stesso diario restano anche nel
        database locale dell&apos;app sul tuo telefono.
      </p>
      <p>
        <strong>Per quanto tempo.</strong> Finché il tuo abbonamento Dulce Pro (compresa una prova
        gratuita) è attivo, conserviamo al massimo circa 1 anno di cronologia e diario; i giorni più
        vecchi vengono rimossi automaticamente. Se l&apos;abbonamento termina o viene rimborsato, il
        salvataggio si interrompe e la cronologia salvata (letture e diario) viene
        eliminata 90 giorni dopo; se ti abboni di nuovo entro questi 90 giorni, è ancora lì.
      </p>
      <p>
        <strong>Raccolta mentre sei uscito dall&apos;account o l&apos;app è stata rimossa.</strong>{" "}
        Se lo hai accettato (l&apos;app te lo comunica nella schermata del consenso, in un avviso
        una tantum o quando esci dall&apos;account), il relay continua a raccogliere la cronologia
        del tuo sensore dopo che esci dal tuo account del sensore in Dulce o rimuovi l&apos;app,
        alcune volte al giorno anziché ogni minuto, usando la credenziale del sensore che già
        possiede:
      </p>
      <ul>
        <li>
          LibreLinkUp: il token di sessione. Nightscout: l&apos;indirizzo del tuo sito e il tuo
          token di accesso o l&apos;impronta del tuo secret API.
        </li>
        <li>
          Medtronic CareLink: i token di accesso che Medtronic ha rilasciato a Dulce (mai la tua
          password), che il relay rinnova come richiesto da Medtronic.
        </li>
        <li>
          Dexcom Share: se «Resta connesso» è attivo, la tua password Dexcom, cifrata come descritto
          in 2.3. Se è disattivato, la raccolta si ferma circa un giorno dopo l&apos;ultimo accesso,
          perché Dexcom chiude la sessione.
        </li>
      </ul>
      <p>
        La raccolta mentre sei via termina al primo di questi eventi: accedi di nuovo a Dulce con
        lo stesso account del sensore; la disattivi in Impostazioni o scegli «Interrompi ed
        elimina» quando esci dall&apos;account; disattivi la cronologia del grafico salvata o usi
        «Elimina account»; il tuo abbonamento Dulce Pro termina; il servizio del tuo sensore rifiuta
        l&apos;accesso o continua a fallire per circa una settimana; oppure è trascorso 1 anno.
        Quando termina, la credenziale conservata per essa viene eliminata. La cronologia già
        salvata resta finché non la elimini o finché non scade il periodo indicato sopra, a meno
        che tu non abbia scelto di eliminarla. Se rimuovi l&apos;app senza uscire dall&apos;account,
        l&apos;app non può chiedertelo in quel momento: la raccolta continua solo se l&apos;avevi già
        accettata; per interromperla, scrivici (vedi «Come disattivarla ed eliminarla» più sotto).
        Finché sei uscito dall&apos;account o via, i tuoi follower non ricevono letture in tempo
        reale, avvisi né nuova cronologia.
      </p>
      <p>
        <strong>Può avere buchi o andare persa.</strong> La cronologia salvata è una comodità: non
        è una cartella clinica né un backup. Può avere buchi o andare persa, ad esempio quando la
        sessione del tuo sensore scade o cambi la password del sensore, quando Dexcom chiude la
        sessione e «Resta connesso» è disattivato, quando il servizio del tuo sensore ha un
        disservizio o non ha ancora ricevuto dati dal tuo telefono, quando il tuo abbonamento
        termina, quando reinstalli Dulce su Android o passi a un iPhone senza il tuo Portachiavi
        iCloud, quando usi «Elimina account», quando un produttore di sensori modifica o chiude il
        proprio servizio, o per un guasto da parte nostra. Conserva i dati che servono al tuo
        medico nell&apos;app ufficiale del produttore del tuo sensore.
      </p>
      <p>
        <strong>Chi può vederla.</strong> Tu e i follower che hai invitato finché condividi con
        loro: vedono la cronologia salvata del tuo grafico (comprese le letture precedenti alla
        loro accettazione) e, finché la condivisione del diario è attiva, il tuo diario condiviso,
        comprese le note a testo libero. Smettono di vederla quando li revochi, quando la
        condivisione è in pausa o quando elimini la tua cronologia. Non vedono mai la copia
        completa del diario che solo tu puoi leggere. Attivando la condivisione vedono il diario
        salvato degli ultimi 90 giorni. Il diario sul tuo telefono resta se disattivi la
        condivisione. Le
        note che condividi possono essere lette dai tuoi follower, quindi non scrivere informazioni
        su altre persone nelle note che condividi. Chi ha effettuato l&apos;accesso allo stesso
        account del sensore sul proprio telefono non riceve la tua cronologia salvata tramite
        Dulce. Il relay tratta questi dati in modo automatico per consegnarli; non guardiamo la
        cronologia o le note di un singolo utente, salvo quando serve per risolvere un problema che
        ci segnali, per mantenere sicuro il servizio o quando la legge lo richiede.
      </p>
      <p>
        <strong>Come riconosciamo la tua cronologia senza un account.</strong> Dulce non ha un
        account utente. La tua cronologia è collegata a una «chiave della cronologia» segreta e
        casuale creata sul tuo telefono, combinata con un identificativo del paziente del tuo
        account del sensore (un numero o un nome utente fornito dal servizio del tuo sensore, o
        un&apos;impronta dell&apos;indirizzo del tuo Nightscout), mai l&apos;email del tuo sensore.
        Su iPhone, se usi il Portachiavi iCloud, la chiave della cronologia viene sincronizzata
        tramite il tuo Portachiavi iCloud, quindi gli altri tuoi iPhone con lo stesso ID Apple
        condividono la stessa cronologia; per lo stesso motivo, disattivare il salvataggio su uno
        di essi lo disattiva sugli altri. «Elimina account» rimuove la chiave dal tuo Portachiavi
        iCloud, quindi Dulce sugli altri tuoi iPhone inizia una nuova cronologia. Se accedi con un
        altro account del sensore sullo stesso telefono, le cronologie non si mescolano.
      </p>
      <p>
        <strong>Come disattivarla ed eliminarla.</strong>
      </p>
      <ul>
        <li>
          Nell&apos;app, disattiva «Salva cronologia del grafico» in Impostazioni e conferma «Smetti
          ed elimina»: la copia salvata sul relay (letture e diario) viene eliminata subito.
        </li>
        <li>
          Nell&apos;app, disattiva «Salva il mio diario» nelle impostazioni della cronologia del
          grafico: finché la condivisione del diario è disattivata, il diario salvato sul relay
          viene eliminato. Le tue letture restano salvate.
        </li>
        <li>
          Nell&apos;app, disattiva «Continua a raccogliere se esco o se l&apos;app viene rimossa»:
          Dulce non raccoglie più dopo che esci dall&apos;account o rimuovi l&apos;app e non conserva
          alcuna credenziale del sensore a tale scopo.
        </li>
        <li>
          Nell&apos;app, disattiva «Condividi il mio diario con la famiglia»: i tuoi follower non
          possono più vedere il tuo diario. La copia salvata resta sul relay per te finché «Salva
          il mio diario» è attivo, e viene eliminata se è disattivato.
        </li>
        <li>Quando esci dall&apos;account, scegli «Interrompi ed elimina» (o «Eliminala»).</li>
        <li>
          Usa Impostazioni → Elimina account: tutto viene eliminato, come descritto nella sezione 9.
        </li>
        <li>
          Senza l&apos;app, scrivi a{" "}
          <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>. Poiché non esiste un
          account, indica il tuo ID assistenza (nell&apos;app: Impostazioni › Account › ID
          assistenza) o l&apos;email di contatto che hai salvato (sezione 2.7), se li hai; altrimenti
          ti chiederemo informazioni che ci permettano di trovare i tuoi dati (ad esempio il
          servizio del tuo sensore e quando hai usato Dulce l&apos;ultima volta). Possiamo
          intervenire solo sui dati che riusciamo a identificare e ti diremo se non ci riusciamo.
        </li>
      </ul>

      <h3>2.7 Email di contatto (facoltativa)</h3>
      <p>
        Dulce funziona senza un indirizzo email. Se vuoi, puoi salvare un&apos;email di contatto
        nell&apos;app. La conserviamo sul relay di Dulce, collegata alla tua installazione (l&apos;ID
        assistenza mostrato nell&apos;app), e la usiamo solo per:
      </p>
      <ul>
        <li>rispondere alle tue richieste di assistenza e trovare la tua installazione quando ci scrivi;</li>
        <li>
          scriverti riguardo alla tua installazione di Dulce o al tuo abbonamento, ad esempio un
          problema con il collegamento del sensore, una modifica a questa informativa o ai termini,
          o un mese gratuito che ti offriamo.
        </li>
      </ul>
      <p>
        Non la usiamo per marketing o newsletter, salvo che tu acconsenta separatamente, e non la
        condividiamo con Meta, con servizi di analisi né con nessun altro, tranne il nostro
        fornitore di hosting Cloudflare, che la conserva per noi. Non viene mai scritta nei log.
        Poiché è collegata alla tua installazione, ci permette di sapere a chi appartiene
        l&apos;installazione quando ti aiutiamo (ad esempio lo stato dell&apos;abbonamento o se usi
        il monitoraggio da parte della famiglia); l&apos;assistenza non vede le tue letture di glicemia.
      </p>
      <p>
        <strong>Base giuridica:</strong> il tuo consenso (art. 6, par. 1, lett. a) GDPR). Darlo è
        facoltativo e puoi modificarlo o rimuoverlo nell&apos;app in qualsiasi momento; rimuoverlo
        lo elimina dal relay.{" "}
        <strong>Per quanto tempo:</strong> finché non lo rimuovi, usi «Elimina account» o ci chiedi
        di cancellarlo. Resta quando esci dall&apos;account del sensore, così che possiamo
        continuare ad aiutarti. Le email che ci invii sono trattate come descritto per i messaggi
        di contatto nella sezione 6.
      </p>

      <h3>2.8 Stima dei carboidrati da una foto (facoltativa)</h3>
      <p>
        Quando aggiungi una voce puoi usare «Stima i carboidrati da una foto». Dulce scatta una foto
        del tuo pasto solo quando scegli di usare questa funzione. Il suo uso è facoltativo e
        l&apos;app ti chiede il consenso prima di scattare la prima foto. La funzione non è offerta in alcuni Paesi.
      </p>
      <ul>
        <li>
          <strong>Dove va la foto.</strong> L&apos;app invia la foto, tramite il relay di Dulce, ad
          Anthropic (Anthropic, PBC, Stati Uniti), un fornitore di servizi di intelligenza
          artificiale che la tratta per nostro conto per stimare i carboidrati del cibo e, dove l&apos;app li mostra, anche proteine, grassi e calorie.
        </li>
        <li>
          <strong>Cosa viene inviato insieme.</strong> Solo la lingua dell&apos;app, così che i nomi
          degli alimenti tornino in quella lingua. Nient&apos;altro: né nome, né email, né
          identificativi del dispositivo, né letture glicemiche o altri dati sanitari. Prima
          dell&apos;invio, l&apos;app riduce e ricodifica la foto, eliminando così i metadati di
          posizione e della fotocamera.
        </li>
        <li>
          <strong>Cosa conserva Dulce.</strong> Dulce non conserva la foto né il risultato sui
          propri server. Il relay conserva solo il conteggio delle foto usate dal tuo dispositivo
          in quel giorno, per applicare il limite giornaliero; il conteggio viene cancellato dopo
          due giorni.
        </li>
        <li>
          <strong>Cosa salvi tu.</strong> La stima viene inserita nel campo dei carboidrati e i nomi degli alimenti nella nota della voce; se hai attivato i campi facoltativi di nutrizione, anche i valori di proteine, grassi e calorie vengono inseriti in quei campi. Puoi modificare tutto prima di salvare. Ciò che
          salvi è una normale voce del diario, trattata come qualsiasi altra voce del diario
          (sezioni 2.2 e 2.6).
        </li>
        <li>
          <strong>Cosa conserva Anthropic.</strong> Anthropic cancella gli input e gli output della
          sua API entro 30 giorni. Se i suoi sistemi di sicurezza automatici segnalano una
          richiesta come possibile violazione della sua politica di utilizzo, può conservare
          quell&apos;input e quell&apos;output fino a 2 anni e i punteggi di classificazione di
          sicurezza fino a 7 anni. Anthropic non usa questi dati per addestrare i propri modelli.
        </li>
      </ul>
      <p>
        Fotografa solo il tuo cibo, non persone né documenti.
      </p>
      <p>
        <strong>Base giuridica:</strong> il tuo consenso (art. 6, par. 1, lett. a) GDPR) e, se una
        foto può rivelare informazioni sulla tua salute, il tuo consenso esplicito (art. 9, par. 2,
        lett. a) GDPR), che l&apos;app ti chiede prima di scattare la prima foto. Puoi revocarlo in qualsiasi
        momento semplicemente smettendo di usare la funzione. Anthropic tratta la foto negli Stati
        Uniti (sezione 8).
      </p>

      <h3>2.9 Orologi Garmin (facoltativo)</h3>
      <p>
        Se vuoi, puoi collegare un orologio Garmin a Dulce: l&apos;app Dulce per l&apos;orologio, il quadrante o il campo dati dallo store Connect IQ di Garmin. Una volta collegato, l&apos;orologio chiede al nostro relay il tuo ultimo valore di glicemia, l&apos;andamento e la variazione, il grafico recente (fino a 12 ore), il tuo intervallo target e le soglie dei tuoi avvisi, l&apos;unità di misura e, se segui dei familiari, il nome che ogni persona seguita ha impostato, e li mostra sull&apos;orologio.
      </p>
      <ul>
        <li>
          <strong>Come viaggiano i dati.</strong> La richiesta passa attraverso l&apos;app Garmin Connect sul tuo telefono; è Garmin a trasportarla fino all&apos;orologio. Il modo in cui Garmin tratta i dati nella propria app e nel tuo account Garmin è regolato dall&apos;informativa sulla privacy di Garmin.
        </li>
        <li>
          <strong>Cosa conservano l&apos;orologio e il relay.</strong> L&apos;orologio conserva un token di collegamento casuale, mai il tuo account del sensore né la tua password. Il relay conserva solo un hash di quel token, insieme all&apos;ID casuale dell&apos;installazione del tuo telefono, al tipo di app dell&apos;orologio, all&apos;unità di misura e alla data del collegamento. I codici di collegamento scadono dopo 15 minuti.
        </li>
        <li>
          <strong>Scollegare.</strong> Puoi scollegare un orologio in qualsiasi momento in Dulce › Impostazioni › Orologio Garmin. Anche «Elimina account», o l&apos;accesso con un altro account del sensore, rimuove i collegamenti.
        </li>
        <li>
          <strong>Campo dati: la glicemia nella tua attività.</strong> Se usi il campo dati, la sua impostazione «Salva la glicemia nell&apos;attività» (attiva per impostazione predefinita; puoi disattivarla nelle impostazioni del campo in Garmin Connect) scrive i tuoi valori di glicemia nel file di quell&apos;attività sull&apos;orologio. Garmin poi conserva e sincronizza quel file con il resto dell&apos;attività nel tuo account Garmin, anche verso i servizi che hai collegato a Garmin. Dulce non riceve né controlla quella copia; la elimini o la gestisci tramite Garmin.
        </li>
      </ul>
      <p>
        <strong>Base giuridica:</strong> il tuo consenso esplicito (art. 9, par. 2, lett. a) GDPR), come per le altre funzioni che mostrano la tua glicemia sui tuoi dispositivi (sezione 4). <strong>Per quanto tempo:</strong> i collegamenti sono conservati finché non scolleghi l&apos;orologio o finché i tuoi dati non vengono eliminati con «Elimina account».
      </p>

      <h2 id="purpose">3. Perché usiamo i tuoi dati</h2>
      <ul>
        <li>Mostrare la glicemia sui tuoi dispositivi e, se lo scegli, su quelli dei tuoi follower.</li>
        <li>Inviare gli avvisi che configuri.</li>
        <li>
          Conservare la cronologia del tuo grafico così che tu e i tuoi follower vediate lo stesso
          grafico, anche dopo l&apos;uscita dall&apos;account, la reinstallazione o il cambio di
          telefono, conservare il tuo diario e condividerlo con la famiglia che hai invitato (Dulce Pro, con il
          tuo consenso; sezione 2.6).
        </li>
        <li>
          Se lo scegli, stimare i carboidrati di un pasto a partire da una foto che scatti (sezione
          2.8).
        </li>
        <li>Verificare l&apos;abbonamento e sbloccare le funzioni Pro.</li>
        <li>
          Se hai salvato un&apos;email di contatto, rispondere alle tue richieste di assistenza e
          scriverti riguardo alla tua installazione o al tuo abbonamento (sezione 2.7).
        </li>
        <li>Avvisarti quando Dulce è disponibile (lista d&apos;attesa).</li>
        <li>Rispondere alle richieste inviate tramite il modulo di contatto.</li>
        <li>Proteggere il sito dagli abusi (hash dell&apos;IP, limitazione).</li>
        <li>Capire le visite al sito, i rinvii all&apos;App Store e l&apos;uso del servizio e della configurazione.</li>
        <li>Adempiere agli obblighi di legge e rispondere alle richieste sui tuoi diritti.</li>
      </ul>

      <h2 id="legal-basis">4. Base giuridica</h2>
      <ul>
        <li>
          <strong>Consenso esplicito</strong> (art. 9, par. 2, lett. a) GDPR): trattamento dei
          dati sanitari quando colleghi il sensore nell&apos;app e usi le relative funzioni (letture
          in tempo reale, avvisi, Attività in tempo reale, widget, orologio e monitoraggio da parte
          della famiglia). Lo dai collegando il sensore, dopo che l&apos;app ti ha spiegato cosa
          fa Dulce e ti ha rimandato a questa informativa. Puoi revocarlo in qualsiasi momento
          uscendo dall&apos;account del sensore in Dulce, il che interrompe il trattamento tramite
          il relay (tranne la raccolta della tua cronologia del grafico salvata mentre sei via, se
          l&apos;hai accettata; sezione 2.6), usando «Elimina account» o scrivendoci.
        </li>
        <li>
          <strong>Consenso esplicito</strong> (art. 9, par. 2, lett. a) GDPR) per la cronologia del
          grafico salvata (che comprende il tuo diario), per la raccolta mentre sei uscito dall&apos;account o l&apos;app è stata
          rimossa e per la condivisione del diario: richiesto nell&apos;app, per ogni account del
          sensore, prima che il salvataggio inizi, e revocabile in qualsiasi momento in
          Impostazioni (sezione 2.6).
        </li>
        <li>
          <strong>Contratto</strong> (art. 6, par. 1, lett. b) GDPR): fornitura dell&apos;app e
          delle funzioni a cui ti abboni.
        </li>
        <li>
          <strong>Consenso</strong> (art. 6, par. 1, lett. a) GDPR): quando ti iscrivi alla lista
          d&apos;attesa o alla beta.
        </li>
        <li>
          <strong>Consenso</strong> (art. 6, par. 1, lett. a) GDPR): anche per la misurazione
          degli annunci facoltativa descritta nella sezione 2.2.2 (l&apos;interruttore Meta); puoi revocarlo in qualsiasi
          momento in Impostazioni.
        </li>
        <li>
          <strong>Consenso</strong> (art. 6, par. 1, lett. a) GDPR): per l&apos;email di contatto
          facoltativa della sezione 2.7; puoi rimuoverla in qualsiasi momento nell&apos;app.
        </li>
        <li>
          <strong>Consenso</strong> (art. 6, par. 1, lett. a) GDPR) e, se una foto può rivelare
          informazioni sulla tua salute, <strong>consenso esplicito</strong> (art. 9, par. 2, lett.
          a) GDPR): per la stima facoltativa dei carboidrati da una foto della sezione 2.8;
          richiesto nell&apos;app prima di scattare la prima foto, puoi revocarlo in qualsiasi momento
          smettendo di usare la funzione.
        </li>
        <li>
          <strong>Legittimo interesse</strong> (art. 6, par. 1, lett. f) GDPR): sicurezza di base
          del sito e risposta alle richieste che ci invii tramite il modulo di contatto o per
          email. Analisi del sito: il tuo consenso dove la nostra Cookie Policy lo richiede (nel
          SEE, nel Regno Unito e in Svizzera, o quando non possiamo sapere dove ti trovi) e,
          altrove, il nostro legittimo interesse a capire come viene usato il sito.
        </li>
      </ul>

      <h2 id="health">5. Categorie particolari di dati (art. 9 GDPR)</h2>
      <p>
        Le letture della glicemia e gli altri dati sanitari sono{" "}
        <strong>categorie particolari</strong> di dati personali. Il nostro approccio:
      </p>
      <ul>
        <li>
          La tua cronologia glicemica a lungo termine, il diario e i dati di Salute di Apple sono
          trattati e conservati sul tuo dispositivo. Il relay tratta anche le letture recenti,
          come descritto sopra. Se usi Dulce Pro e accetti la cronologia del grafico salvata, la
          tua cronologia glicemica e il tuo diario sono
          conservati anche sul relay (sezione 2.6).
        </li>
        <li>
          Quando il tuo CGM è collegato, il relay tratta le letture recenti necessarie alle
          funzioni in background e di condivisione che usi. Conserva una breve finestra mobile e,
          solo per gli abbonati a Dulce Pro che lo accettano, la cronologia del grafico salvata
          descritta in 2.6.
        </li>
        <li>
          Se usi la stima dei carboidrati da una foto, la foto del pasto passa dal relay ad
          Anthropic solo per ottenere la stima, senza le tue letture glicemiche né altri dati
          sanitari (sezione 2.8).
        </li>
        <li>Sono sempre cifrati durante la trasmissione (TLS).</li>
        <li>
          Servono esclusivamente a portare i tuoi dati ai tuoi dispositivi e ai follower che
          scegli, mai per pubblicità, profilazione o rivendita.
        </li>
      </ul>

      <h2 id="retention">6. Per quanto tempo conserviamo i dati</h2>
      <ul>
        <li>
          <strong>Dati attivi del relay:</strong> le letture recenti vengono sostituite di
          continuo in una breve finestra. I token di sessione del fornitore e di notifica restano
          finché servono al dispositivo collegato e vengono cancellati quando lo scolleghi o
          deregistri, esci dall&apos;account o usi Impostazioni → Elimina account. Eccezione: finché Dulce continua a raccogliere la tua
          cronologia del grafico salvata dopo che esci dall&apos;account o rimuovi l&apos;app
          (sezione 2.6), la credenziale del sensore necessaria (token di sessione LibreLinkUp,
          token del sito Nightscout, token di accesso Medtronic CareLink o password Dexcom cifrata)
          è conservata solo a tale scopo ed eliminata quando la raccolta termina, al più tardi dopo
          1 anno.
        </li>
        <li>
          <strong>Cronologia del grafico salvata e diario (Dulce Pro):</strong> finché
          il tuo abbonamento è attivo, al massimo circa 1 anno, con i giorni più vecchi rimossi
          automaticamente. Eliminati subito quando disattivi il salvataggio, scegli «Interrompi ed
          elimina» all&apos;uscita dall&apos;account o usi «Elimina account» (il solo diario anche quando
          disattivi «Salva il mio diario» mentre la condivisione del diario è disattivata); eliminati 90 giorni dopo la fine o il
          rimborso del tuo abbonamento.
        </li>
        <li>
          <strong>Dati dell&apos;app sul dispositivo:</strong> finché non li elimini o disinstalli
          l&apos;app.
        </li>
        <li>
          <strong>Lista d&apos;attesa Android:</strong> fino a sei mesi dopo il lancio di Android o
          finché chiedi la cancellazione. L&apos;archivio attuale non elimina automaticamente i
          record; serve una cancellazione manuale o la tua richiesta. L&apos;hash IP associato resta
          nel record per lo stesso periodo.
        </li>
        <li>
          <strong>Modulo di interesse per la beta:</strong> per la durata della beta più 12 mesi.
          Anche questi record vengono eliminati manualmente o su richiesta; l&apos;hash IP associato
          resta con il record.
        </li>
        <li>
          <strong>Messaggi di contatto:</strong> mentre gestiamo la richiesta e gli eventuali
          successivi scambi necessari. Le copie email possono restare nei nostri sistemi e in
          quelli di Resend secondo le rispettive impostazioni di conservazione; puoi chiederne la
          cancellazione se non sussiste un obbligo legale di conservarle.
        </li>
        <li>
          <strong>Eventi di utilizzo del relay:</strong> i record degli eventi associati a un ID
          casuale dell&apos;installazione sono conservati fino a 45 giorni; le statistiche
          giornaliere aggregate del servizio fino a 400 giorni.
        </li>
        <li>
          <strong>Log operativi:</strong> i Cloudflare Workers Logs vengono eliminati dopo 7 giorni.
        </li>
        <li>
          <strong>Email di contatto:</strong> finché non la rimuovi nell&apos;app, usi «Elimina
          account» o ci chiedi di cancellarla (sezione 2.7).
        </li>
        <li>
          <strong>Stima dei carboidrati da una foto:</strong> Dulce non conserva la foto né il
          risultato sui propri server; il conteggio giornaliero delle foto viene cancellato dopo
          due giorni. Anthropic cancella la foto e il risultato entro 30 giorni, salvo nei casi
          descritti nella sezione 2.8.
        </li>
        <li>
          <strong>Orologi Garmin:</strong> i collegamenti sono conservati finché non scolleghi l&apos;orologio, usi «Elimina account» o accedi con un altro account del sensore (sezione 2.9). I codici di collegamento scadono dopo 15 minuti.
        </li>
        <li>
          <strong>Backup:</strong> i dati eliminati dal relay possono restare fino a 30 giorni nei
          backup automatici del database del nostro fornitore di hosting; poi vengono
          sovrascritti. Usiamo questi backup solo per riprenderci da un guasto.
        </li>
        <li>
          <strong>Indicatore dell&apos;installazione:</strong> l&apos;ID casuale e la data della
          prima registrazione restano dopo la cancellazione dei dati del relay. Puoi chiederci
          di cancellare anche questo indicatore, che non ha scadenza automatica.
        </li>
      </ul>

      <h2 id="recipients">7. Con chi condividiamo i dati</h2>
      <p>
        Usiamo i fornitori elencati sotto. Alcuni trattano dati per nostro conto in base a un
        contratto; Abbott, Dexcom, Medtronic, Garmin, Apple e Google forniscono anche servizi propri soggetti alle
        loro condizioni e informative sulla privacy:
      </p>
      <ul>
        <li>
          <strong>Cloudflare</strong>: ospita il relay di Dulce descritto sopra e conserva la
          cronologia del grafico salvata e il diario (sezione 2.6) e l&apos;email di
          contatto facoltativa (sezione 2.7), come nostro responsabile del trattamento.
        </li>
        <li>
          <strong>Anthropic (Anthropic, PBC, Stati Uniti)</strong>: fornitore di servizi di
          intelligenza artificiale che stima i carboidrati in una foto di un pasto quando usi
          «Stima i carboidrati da una foto» (sezione 2.8), come nostro responsabile del
          trattamento.
        </li>
        <li>
          <strong>Apple</strong>: notifiche push (APNs), Attività in tempo reale, Salute di Apple
          (sul dispositivo), pagamenti e, se usi il Portachiavi iCloud, la conservazione della
          chiave della tua cronologia nel tuo Portachiavi iCloud (sezione 2.6).
        </li>
        <li>
          <strong>Google Firebase</strong>: notifiche push su Android.
        </li>
        <li>
          <strong>Google Analytics 4 (Google Ireland Ltd.)</strong>: analisi del sito secondo
          l&apos;impostazione regionale del consenso descritta nella Cookie Policy.
        </li>
        <li>
          <strong>RevenueCat</strong>: verifica degli abbonamenti (solo identificativo
          pseudonimo).
        </li>
        <li>
          <strong>Meta (Meta Platforms Ireland Ltd.)</strong>: solo se attivi la condivisione con
          Meta nell&apos;app (sezione 2.2.2).
        </li>
        <li>
          <strong>Garmin</strong>: solo se colleghi un orologio Garmin. L&apos;app Garmin Connect sul tuo telefono trasporta i dati che l&apos;orologio richiede, e Garmin conserva nel tuo account Garmin le attività con la glicemia del campo dati (sezione 2.9). Si applica l&apos;informativa sulla privacy di Garmin.
        </li>
        <li>
          <strong>Supabase</strong> (archivio di lista d&apos;attesa e beta): ospitato nell&apos;UE
          (eu-west-3).
        </li>
        <li>
          <strong>Resend</strong> (invio dei moduli di contatto ed email di conferma della lista
          d&apos;attesa) e{" "}
          <strong>Vercel</strong> (hosting del sito e analisi web aggregate).
        </li>
        <li>
          <strong>Abbott (LibreLinkUp)</strong>: il tuo dispositivo e il nostro relay si
          collegano al servizio di Abbott con le tue credenziali o la tua sessione per recuperare
          le letture. Questa connessione è regolata dall&apos;informativa sulla privacy di Abbott.
        </li>
        <li>
          <strong>Dexcom (Share)</strong>: il tuo dispositivo e, finché il CGM è collegato, il
          nostro relay si collegano a Dexcom Share con un ID di sessione per recuperare
          le letture. Si applicano le condizioni di privacy di Dexcom.
        </li>
        <li>
          <strong>Medtronic (CareLink)</strong>: se colleghi CareLink, il tuo dispositivo e il nostro relay si collegano al servizio di Medtronic con token di accesso per recuperare le letture. Si applicano le condizioni di privacy di Medtronic.
        </li>
        <li>
          <strong>Nightscout</strong>: se colleghi Nightscout, il tuo dispositivo e il nostro relay recuperano le letture dal sito che gestisci o scegli. Chi ospita il sito ne è responsabile.
        </li>
      </ul>
      <p>
        Non vendiamo, affittiamo né cediamo mai i tuoi dati a terzi per scopi pubblicitari o
        commerciali. L&apos;unica condivisione legata alla pubblicità è la misurazione degli
        annunci della sezione 2.2.2 (i valori aggregati di SKAdNetwork di Apple e la condivisione con Meta, che resta disattivata se non la attivi).
      </p>

      <h2 id="transfers">8. Trasferimenti internazionali</h2>
      <p>
        Alcuni fornitori e servizi che usiamo (Cloudflare, Anthropic, RevenueCat, Resend, Vercel,
        Meta, Apple e Google) possono trattare dati negli Stati Uniti o in altri Paesi. Quando il GDPR richiede
        garanzie per un trasferimento, il meccanismo applicabile dipende dal fornitore e dal
        servizio e può includere una decisione di adeguatezza o le clausole contrattuali tipo
        della Commissione europea. Google LLC risulta attivo nel Data Privacy Framework UE-USA,
        entro i limiti della propria certificazione. Scrivici per i dettagli e per ottenere copia
        delle garanzie applicabili a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
      <p>
        La cronologia del grafico salvata e le voci del diario sono conservate in un
        database del nostro fornitore di hosting Cloudflare, che può trattare dati nell&apos;UE e
        in altri Paesi con le garanzie descritte sopra.
      </p>
      <p>
        Le foto dei pasti che invii per una stima dei carboidrati (sezione 2.8) sono trattate da
        Anthropic negli Stati Uniti in base al suo accordo sul trattamento dei dati (Data
        Processing Addendum), che comprende le clausole contrattuali tipo della Commissione europea
        e il relativo addendum per il Regno Unito.
      </p>

      <h2 id="rights">9. I tuoi diritti</h2>
      <p>Ai sensi del GDPR e nel rispetto delle relative condizioni, hai diritto a:</p>
      <ul>
        <li>accedere ai tuoi dati personali;</li>
        <li>rettificarli se inesatti;</li>
        <li>chiederne la cancellazione;</li>
        <li>opporti al trattamento o chiederne la limitazione;</li>
        <li>ottenere la portabilità dei dati che hai fornito;</li>
        <li>revocare il consenso in qualsiasi momento.</li>
      </ul>
      <p>
        Usa <strong>Impostazioni → Elimina account</strong> nell&apos;app per cancellare i dati
        locali e i record attivi del relay, compresi la cronologia del grafico salvata e il diario;
        rimuove anche la chiave della cronologia di Dulce dal tuo Portachiavi iCloud,
        quindi Dulce sugli altri tuoi iPhone inizia una nuova cronologia. Puoi anche disattivare
        la cronologia del grafico salvata in Impostazioni, il che elimina subito la copia salvata (letture e diario),
        e disattivare separatamente «Salva il mio diario», il che elimina il diario salvato
        finché la condivisione del diario è disattivata. L&apos;app non ha un pulsante di esportazione della cronologia salvata; scrivici e
        ti invieremo una copia in un formato elettronico di uso comune (ad esempio CSV).
        L&apos;indicatore minimo dell&apos;installazione descritto sopra resta finché non ne chiedi
        la cancellazione. Puoi esercitare ciascuno di questi diritti scrivendo a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>. Poiché Dulce non ha
        account, indica il tuo ID assistenza (nell&apos;app: Impostazioni › Account › ID
        assistenza) o l&apos;email di contatto che hai salvato, se li hai; altrimenti ti
        chiederemo altre informazioni che ci permettano di trovare i tuoi dati, e possiamo
        intervenire solo sui dati che riusciamo a identificare. Rispondiamo entro un mese. Se la
        richiesta è complessa o le richieste sono numerose, il GDPR consente una proroga fino a
        due mesi aggiuntivi; ti informeremo della proroga entro il primo mese.
      </p>
      <p>
        Se un utente di Dulce è deceduto, un familiare stretto o un erede può chiederci di
        cancellare i suoi dati e di interrompere qualsiasi raccolta della sua cronologia; ti
        chiederemo una prova ragionevole.
      </p>
      <p>
        Se ritieni che il nostro trattamento non sia conforme alla legge, puoi presentare reclamo
        all&apos;
        <a href="https://www.aepd.es" target="_blank" rel="noopener">
          Agenzia spagnola per la protezione dei dati (AEPD)
        </a>{" "}
        o all&apos;autorità di controllo del tuo Paese (in Italia, il Garante per la protezione dei
        dati personali).
      </p>

      <h2 id="minors">10. Minori</h2>
      <p>
        Dulce non è rivolta ai minori di 14 anni. Su Android, Dulce è destinata agli adulti dai 18 anni in su. Un genitore o tutore legale può usare Dulce per
        seguire la glicemia di un minore sotto la propria responsabilità; in tal caso è il
        genitore o tutore a dare o negare il consenso per la cronologia del grafico salvata e per
        la condivisione del diario. Se hai tra 14 e 18 anni, per usare Dulce ti serve il consenso di un
        genitore o tutore legale (Termini d&apos;uso, sezione 4), e questo comprende la cronologia
        del grafico salvata, la condivisione del diario e l&apos;email di contatto. La stima dei
        carboidrati da una foto (sezione 2.8) è disponibile per tutte le persone che possono usare
        Dulce secondo i Termini d&apos;uso, compresi gli utenti tra 14 e 18 anni su iPhone che hanno
        questo consenso. Se pensi che un minore
        a tuo carico ci abbia fornito dati senza il tuo consenso, contattaci e li cancelleremo.
      </p>

      <h2 id="cookies">11. Cookie</h2>
      <p>
        Usiamo cookie tecnici strettamente necessari e, con il tuo consenso dove la legge lo
        richiede, cookie di Google Analytics. Non usiamo cookie pubblicitari. Quali sono e come
        cambiare la tua scelta è spiegato nella nostra{" "}
        <Link href="/legal/cookies">cookie policy</Link>.
      </p>

      <h2 id="changes">12. Modifiche a questa informativa</h2>
      <p>
        In caso di modifiche rilevanti ti avvisiamo prima che si applichino: nell&apos;app (nella
        nota «Novità» dell&apos;aggiornamento che le porta e in un avviso che rimanda a questa
        pagina) e, se hai salvato un&apos;email di contatto, via email. Questa pagina mostra la
        data della versione attuale, un breve riepilogo di ciò che cambia e un link alla versione
        precedente. Se una modifica richiede il tuo consenso, ad esempio un nuovo uso dei tuoi dati
        sanitari, l&apos;app te lo chiede prima e non succede nulla di nuovo finché non rispondi;
        le versioni dell&apos;app che non lo chiedono continuano a funzionare come prima. Le
        modifiche alla cronologia del grafico salvata che ti tolgono qualcosa vengono annunciate
        nell&apos;app con almeno 30 giorni di anticipo (Termini d&apos;uso, sezioni 8.1 e 15).
      </p>

      <h2 id="contact">13. Contatti</h2>
      <p>
        Per qualsiasi domanda su questa informativa o sul trattamento dei tuoi dati scrivi a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
