import { Link } from "@/i18n/navigation";

{/* Translation of the Spanish/English policy. TODO: review local legal terminology; Spanish counsel review remains outstanding. */}
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
        Il titolare del trattamento è <strong>Giorgio Khimshiashvili</strong>, ditta
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
          fornitore (non la password), come spiegato sotto.
        </li>
        <li>
          <strong>Le letture della glicemia</strong> recuperate da LibreLinkUp o Dexcom Share,
          salvate in un database locale sul dispositivo.
        </li>
        <li>
          <strong>Il tuo diario</strong>: carboidrati, insulina, glicemie inserite a mano e note.
          Salvato in locale.
        </li>
        <li>
          <strong>I dati di Salute di Apple</strong>, in sola lettura, se dai il permesso.
        </li>
        <li>
          <strong>Le preferenze</strong>: unità, intervallo target, lingua, tema, impostazioni
          degli avvisi.
        </li>
      </ul>

      <h3>2.3 Il relay di Dulce (funzioni in tempo reale)</h3>
      <p>
        Quando il tuo CGM è collegato, l&apos;app registra questa installazione sul nostro relay
        per fornire aggiornamenti in background, avvisi, funzioni Apple Watch e monitoraggio
        familiare quando li usi. Il relay è un piccolo server che gestiamo su Cloudflare.
        Recupera le letture da LibreLinkUp o Dexcom Share e invia aggiornamenti ai tuoi
        dispositivi. Il relay tratta:
      </p>
      <ul>
        <li>
          <strong>Un token di sessione del fornitore</strong> (non la password): un token
          LibreLinkUp o un ID di sessione Dexcom Share, per recuperare le letture per tuo conto.
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
          l&apos;orologio e la vista dei follower. Il relay non conserva a lungo termine la tua
          storia clinica, che resta sul tuo dispositivo.
        </li>
        <li>
          <strong>Impostazioni e dati tecnici del dispositivo e dell&apos;app</strong> necessari al
          servizio (unità, intervallo target, soglie degli avvisi, lingua, fuso orario,
          piattaforma e versione dell&apos;app).
        </li>
        <li>
          <strong>Eventi di utilizzo:</strong> eventi di base relativi a configurazione,
          connessione e abbonamento, associati all&apos;ID casuale dell&apos;installazione per
          misurare e migliorare il servizio.
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
        Puoi interrompere questo trattamento scollegando il CGM o usando «Elimina account» in
        Impostazioni. L&apos;app chiede al relay di eliminare i dati attivi del dispositivo, i
        token e i dati di condivisione. Restano un ID minimo dell&apos;installazione e la data
        della prima registrazione, per riconoscere un&apos;installazione che torna e non
        contarla come nuova nelle metriche interne. Questo indicatore non ha una scadenza
        automatica. Scrivici se vuoi cancellare anche questo indicatore.
      </p>

      <h3>2.4 Monitoraggio da parte della famiglia</h3>
      <p>
        Se inviti qualcuno a seguirti, il relay invia le tue letture recenti e i tuoi avvisi al
        suo dispositivo dal momento in cui accetta; lo storico precedente non viene condiviso.
        Anche brevi messaggi per sapere come stai, con il testo che scegli, passano dal relay;
        non è un servizio di chat. Puoi revocare l&apos;accesso a un follower in qualsiasi momento
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

      <h2 id="purpose">3. Perché usiamo i tuoi dati</h2>
      <ul>
        <li>Mostrare la glicemia sui tuoi dispositivi e, se lo scegli, su quelli dei tuoi follower.</li>
        <li>Inviare gli avvisi che configuri.</li>
        <li>Verificare l&apos;abbonamento e sbloccare le funzioni Pro.</li>
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
          dati sanitari quando scegli di collegare il CGM e usare le relative funzioni.
          Scollegando il CGM si interrompe il trattamento tramite il relay; puoi anche revocare
          il consenso contattandoci. Durante l&apos;onboarding, l&apos;app rimanda a questa policy,
          ma al momento non mostra una casella separata per acconsentire al trattamento dei dati
          sanitari. Stiamo chiedendo a un consulente spagnolo per la privacy di verificare se
          l&apos;informativa e il flusso di collegamento attuali soddisfano il requisito del consenso
          esplicito.
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
          <strong>Legittimo interesse</strong> (art. 6, par. 1, lett. f) GDPR): sicurezza di base
          del sito e risposta alle richieste inviate tramite il modulo di contatto. La base
          giuridica delle analisi dipende dal servizio e dalle norme regionali descritte nella
          Cookie Policy; deve essere confermata con un consulente per la privacy.
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
          come descritto sopra.
        </li>
        <li>
          Quando il tuo CGM è collegato, il relay tratta le letture recenti necessarie alle
          funzioni in background e di condivisione che usi. Conserva una breve finestra mobile,
          non la cronologia glicemica a lungo termine.
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
          deregistri, esci dall&apos;account o usi Impostazioni → Elimina account.
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
          <strong>Indicatore dell&apos;installazione:</strong> l&apos;ID casuale e la data della
          prima registrazione restano dopo la cancellazione dei dati del relay. Puoi chiederci
          di cancellare anche questo indicatore, che non ha scadenza automatica.
        </li>
      </ul>

      <h2 id="recipients">7. Con chi condividiamo i dati</h2>
      <p>
        Usiamo i fornitori elencati sotto. Alcuni trattano dati per nostro conto in base a un
        contratto; Abbott, Dexcom, Apple e Google forniscono anche servizi propri soggetti alle
        loro condizioni e informative sulla privacy:
      </p>
      <ul>
        <li>
          <strong>Cloudflare</strong>: ospita il relay di Dulce descritto sopra.
        </li>
        <li>
          <strong>Apple</strong>: notifiche push (APNs), Attività in tempo reale, Salute di Apple
          (sul dispositivo) e pagamenti.
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
      </ul>
      <p>
        Non vendiamo, affittiamo né cediamo mai i tuoi dati a terzi per scopi pubblicitari o
        commerciali.
      </p>

      <h2 id="transfers">8. Trasferimenti internazionali</h2>
      <p>
        Alcuni fornitori e servizi che usiamo (Cloudflare, RevenueCat, Resend, Vercel, Apple e
        Google) possono trattare dati negli Stati Uniti o in altri Paesi. Quando il GDPR richiede
        garanzie per un trasferimento, il meccanismo applicabile dipende dal fornitore e dal
        servizio e può includere una decisione di adeguatezza o le clausole contrattuali tipo
        della Commissione europea. Google LLC risulta attivo nel Data Privacy Framework UE-USA,
        entro i limiti della propria certificazione. Scrivici per i dettagli e per ottenere copia
        delle garanzie applicabili a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
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
        locali e i record attivi del relay. L&apos;indicatore minimo dell&apos;installazione descritto
        sopra resta finché non ne chiedi la cancellazione. Puoi esercitare ciascuno di questi
        diritti scrivendo a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>. Rispondiamo entro un
        mese. Se la richiesta è complessa o le richieste sono numerose, il GDPR consente una
        proroga fino a due mesi aggiuntivi; ti informeremo della proroga entro il primo mese.
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
        Dulce non è rivolta ai minori di 14 anni. Un genitore o tutore legale può usare Dulce per
        seguire la glicemia di un minore sotto la propria responsabilità. Se pensi che un minore
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
        In caso di modifiche rilevanti avviseremo gli utenti interessati via email o nell&apos;app
        e pubblicheremo la nuova versione, con la data di revisione, su questa pagina.
      </p>

      <h2 id="contact">13. Contatti</h2>
      <p>
        Per qualsiasi domanda su questa informativa o sul trattamento dei tuoi dati scrivi a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
