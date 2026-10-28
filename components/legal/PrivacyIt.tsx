import { Link } from "@/i18n/navigation";

{/* Translation of PrivacyEs/PrivacyEn; the Spanish version prevails. TODO: legal review. */}
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
        Il titolare del trattamento è <strong>Giorgio Khimshiashvili</strong>, ditta individuale
        con sede in Spagna. Per qualsiasi domanda sui tuoi dati scrivici a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>

      <h2 id="data">2. Quali dati raccogliamo</h2>
      <h3>2.1 Sito web</h3>
      <ul>
        <li>
          <strong>Lista d&apos;attesa:</strong> la tua email e la lingua della sessione.
        </li>
        <li>
          <strong>Modulo beta:</strong> nome, email, dispositivo CGM e regione. Facoltativamente,
          le note che scegli di condividere.
        </li>
        <li>
          <strong>Dati tecnici minimi:</strong> un hash anonimo (SHA-256) del tuo indirizzo IP
          combinato con un salt che cambia ogni giorno, usato solo per limitare gli abusi dei
          moduli. Non conserviamo mai l&apos;IP vero e proprio.
        </li>
        <li>
          <strong>Statistiche anonime:</strong> usiamo Vercel Analytics, che non imposta cookie e
          non raccoglie identificativi personali. Misura solo le visualizzazioni di pagina e le
          prestazioni.
        </li>
      </ul>

      <h3>2.2 Nell&apos;app, sul tuo dispositivo</h3>
      <ul>
        <li>
          <strong>Le tue credenziali LibreLinkUp.</strong> Accedi con email e password del tuo
          account LibreLinkUp (Abbott). Sono conservate solo nel portachiavi sicuro del tuo
          dispositivo e servono a recuperare la glicemia dal servizio di Abbott. Non vengono mai
          inviate ai server di Dulce.
        </li>
        <li>
          <strong>Le letture della glicemia</strong> recuperate da LibreLinkUp, salvate in un
          database locale sul dispositivo.
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
        Alcune funzioni devono continuare a funzionare con il telefono bloccato o l&apos;app
        chiusa: l&apos;Attività in tempo reale sulla schermata di blocco, gli avvisi di glicemia,
        gli aggiornamenti su Apple Watch e il monitoraggio da parte della famiglia. Per questo un
        piccolo server gestito da noi (il «relay», ospitato su Cloudflare) recupera le tue
        letture da LibreLinkUp e le invia ai tuoi dispositivi. Solo quando attivi una di queste
        funzioni, il relay tratta:
      </p>
      <ul>
        <li>
          <strong>Un token di sessione LibreLinkUp</strong> (non la tua password), per recuperare
          le letture per tuo conto.
        </li>
        <li>
          <strong>Token di notifica anonimi</strong> dei tuoi dispositivi, emessi da Apple o
          Google. Identificano un dispositivo per le notifiche, non te personalmente.
        </li>
        <li>
          <strong>Le tue letture più recenti</strong>, come breve finestra continuamente
          sovrascritta, necessaria per l&apos;Attività in tempo reale, l&apos;orologio e la vista
          dei follower. Il relay non conserva a lungo termine la tua storia clinica, che resta
          sul tuo dispositivo.
        </li>
        <li>
          <strong>Le impostazioni minime</strong> necessarie per mostrarti i dati (unità,
          intervallo target, soglie degli avvisi, lingua).
        </li>
      </ul>
      <p>
        Se non attivi mai queste funzioni, ai server di Dulce non viene inviato nulla. Se le
        disattivi, esci dall&apos;account o elimini l&apos;account in Impostazioni, i relativi
        dati del relay vengono cancellati.
      </p>

      <h3>2.4 Monitoraggio da parte della famiglia</h3>
      <p>
        Se inviti qualcuno a seguirti, il relay invia le tue letture recenti e i tuoi avvisi al
        suo dispositivo dal momento in cui accetta; lo storico precedente non viene condiviso.
        Anche brevi messaggi predefiniti tra te e i tuoi follower passano dal relay. Puoi
        revocare l&apos;accesso a un follower in qualsiasi momento e disattivare del tutto i
        messaggi dei follower.
      </p>

      <h3>2.5 Acquisti</h3>
      <p>
        Gli abbonamenti sono gestiti da <strong>Apple</strong>. Non vediamo mai il tuo nome, la
        tua carta o i dati di fatturazione. Usiamo <strong>RevenueCat</strong> per verificare gli
        abbonamenti tramite un identificativo casuale generato dall&apos;app, non la tua email o
        la tua identità.
      </p>

      <h2 id="purpose">3. Perché usiamo i tuoi dati</h2>
      <ul>
        <li>Mostrare la glicemia sui tuoi dispositivi e, se lo scegli, su quelli dei tuoi follower.</li>
        <li>Inviare gli avvisi che configuri.</li>
        <li>Verificare l&apos;abbonamento e sbloccare le funzioni Pro.</li>
        <li>Avvisarti quando Dulce è disponibile (lista d&apos;attesa).</li>
        <li>Proteggere il sito dagli abusi (hash dell&apos;IP, limitazione).</li>
        <li>Capire quali pagine funzionano meglio (statistiche anonime).</li>
        <li>Adempiere agli obblighi di legge e rispondere alle richieste sui tuoi diritti.</li>
      </ul>

      <h2 id="legal-basis">4. Base giuridica</h2>
      <ul>
        <li>
          <strong>Consenso esplicito</strong> (art. 9, par. 2, lett. a) GDPR): trattamento dei
          dati di glicemia tramite il relay quando attivi le funzioni in tempo reale o il
          monitoraggio da parte della famiglia.
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
          del sito e statistiche anonime.
        </li>
      </ul>

      <h2 id="health">5. Categorie particolari di dati (art. 9 GDPR)</h2>
      <p>
        Le letture della glicemia e gli altri dati sanitari sono{" "}
        <strong>categorie particolari</strong> di dati personali. Il nostro approccio:
      </p>
      <ul>
        <li>Per impostazione predefinita sono trattati e conservati solo sul tuo dispositivo.</li>
        <li>
          Raggiungono il nostro relay solo se attivi esplicitamente una funzione che lo richiede,
          e solo come breve finestra recente.
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
          <strong>Dati del relay:</strong> le letture recenti vengono sovrascritte di continuo; i
          token di sessione e di notifica restano finché la funzione è attiva e vengono cancellati
          quando la disattivi, esci dall&apos;account o elimini l&apos;account (Impostazioni →
          Elimina account).
        </li>
        <li>
          <strong>Dati dell&apos;app sul dispositivo:</strong> finché non li elimini o disinstalli
          l&apos;app.
        </li>
        <li>
          <strong>Lista d&apos;attesa:</strong> fino a 6 mesi dopo il lancio, o finché non chiedi
          di essere rimosso.
        </li>
        <li>
          <strong>Modulo beta:</strong> per la durata della beta più 12 mesi.
        </li>
        <li>
          <strong>Hash dell&apos;IP:</strong> 30 giorni.
        </li>
      </ul>

      <h2 id="recipients">7. Con chi condividiamo i dati</h2>
      <p>
        Condividiamo dati solo con i fornitori strettamente necessari per far funzionare il
        servizio. Tutti agiscono come responsabili del trattamento in base a un contratto:
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
          <strong>RevenueCat</strong>: verifica degli abbonamenti (solo identificativo
          pseudonimo).
        </li>
        <li>
          <strong>Supabase</strong> (archivio di lista d&apos;attesa e beta): ospitato nell&apos;UE
          (eu-west-3).
        </li>
        <li>
          <strong>Resend</strong> (email di conferma della lista d&apos;attesa) e{" "}
          <strong>Vercel</strong> (hosting del sito e statistiche anonime).
        </li>
        <li>
          <strong>Abbott (LibreLinkUp)</strong>: il tuo dispositivo e il nostro relay si
          collegano al servizio di Abbott con le tue credenziali o la tua sessione per recuperare
          le letture. Questa connessione è regolata dall&apos;informativa sulla privacy di Abbott.
        </li>
      </ul>
      <p>
        Non vendiamo, affittiamo né cediamo mai i tuoi dati a terzi per scopi pubblicitari o
        commerciali.
      </p>

      <h2 id="transfers">8. Trasferimenti internazionali</h2>
      <p>
        Alcuni dei nostri responsabili (Cloudflare, RevenueCat, Resend, Vercel, Apple, Google)
        trattano dati negli Stati Uniti o in nodi distribuiti nel mondo. I trasferimenti si basano
        sulle clausole contrattuali tipo della Commissione europea o su quadri equivalenti (Data
        Privacy Framework). Puoi chiedere una copia di queste garanzie a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>

      <h2 id="rights">9. I tuoi diritti</h2>
      <p>In quanto interessato hai il diritto di:</p>
      <ul>
        <li>accedere ai tuoi dati personali;</li>
        <li>rettificarli se inesatti;</li>
        <li>chiederne la cancellazione;</li>
        <li>opporti al trattamento o chiederne la limitazione;</li>
        <li>ottenere la portabilità dei dati che hai fornito;</li>
        <li>revocare il consenso in qualsiasi momento.</li>
      </ul>
      <p>
        Il modo più rapido per cancellare tutto ciò che Dulce conserva su di te è{" "}
        <strong>Impostazioni → Elimina account</strong> nell&apos;app. Puoi anche esercitare
        ciascuno di questi diritti scrivendo a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>. Rispondiamo al più tardi
        entro 30 giorni.
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
