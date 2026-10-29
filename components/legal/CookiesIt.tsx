import { GA_ID } from "@/lib/consent";

{/* Translation of the Spanish/English policy. TODO: review local legal terminology; Spanish counsel review remains outstanding. */}
export function CookiesIt() {
  return (
    <>
      <p>
        Questa cookie policy spiega quali cookie e tecnologie simili usa il sito{" "}
        <strong>dulceglucosa.com</strong> e perché.
      </p>

      <h2 id="what">1. Che cos&apos;è un cookie?</h2>
      <p>
        Un cookie è un piccolo file di testo che un sito salva nel browser per ricordare
        informazioni tra una pagina o una visita e l&apos;altra. I cookie possono essere{" "}
        <strong>tecnici</strong> (necessari al funzionamento del sito) o{" "}
        <strong>non tecnici</strong> (statistiche, pubblicità, ecc.).
      </p>

      <h2 id="ours">2. I cookie che usiamo</h2>
      {GA_ID ? (
        <p>
          Dulce usa <strong>cookie tecnici strettamente necessari</strong> e cookie di{" "}
          <strong>Google Analytics</strong>. Nello SEE, nel Regno Unito e in Svizzera, e quando
          non riusciamo a determinare la tua posizione, viene caricato solo dopo che accetti le
          statistiche. Non usiamo cookie di tracciamento pubblicitario.
        </p>
      ) : (
        <p>
          Dulce usa <strong>solo cookie tecnici strettamente necessari</strong>. Non usiamo cookie
          di tracciamento pubblicitario né cookie statistici di terze parti.
        </p>
      )}

      <h3>2.1 Cookie di sessione e tecnici</h3>
      <ul>
        <li>
          <strong>NEXT_LOCALE</strong>: ricorda la tua lingua tra una pagina e l&apos;altra. Tipo:
          tecnico. Durata: fino a 1 anno.
        </li>
        <li>
          <strong>dulce-region</strong>: il codice del tuo Paese, fornito dal nostro hosting a
          partire dalla richiesta e conservato in un cookie di sessione per decidere se chiedere
          il consenso alle statistiche. Non conserviamo l&apos;IP in chiaro per questo scopo. Tipo:
          tecnico. Durata: fino alla chiusura del browser.
        </li>
        <li>
          <strong>dulce:analytics-consent</strong>: un valore nel localStorage del browser, non
          un cookie, che ricorda se hai accettato o rifiutato Google Analytics. Rimane finché non
          cancelli i dati di navigazione di questo sito.
        </li>
      </ul>

      <h3>2.2 Statistiche aggregate senza cookie</h3>
      <p>
        Usiamo <strong>Vercel Analytics</strong> per misurare visualizzazioni di pagina e prestazioni{" "}
        <strong>senza cookie</strong>. Vercel dichiara che la metrica dei visitatori usa un hash
        derivato dalla richiesta, che scade dopo 24 ore; i report possono includere URL, sito di
        provenienza, località generale, browser e sistema operativo. Usiamo report aggregati.
        Questo servizio non imposta cookie, ma i dati restano soggetti alle norme sulla privacy
        applicabili.
      </p>

      {GA_ID ? (
        <>
          <h3>2.3 Google Analytics</h3>
          <p>
            Nello SEE, nel Regno Unito e in Svizzera (o se non riusciamo a determinare la tua
            posizione) solo se accetti i cookie statistici, e altrove finché non lo disattivi,
            usiamo <strong>Google Analytics 4</strong> (Google Ireland Ltd.) per misurare visite,
            pagine viste, clic sui link all&apos;App Store e la relativa campagna, e iscrizioni
            completate alla lista d&apos;attesa. Imposta i cookie <strong>_ga</strong> e <strong>_ga_*</strong>{" "}
            (durata: fino a 2 anni). Google può trattare questi dati negli Stati Uniti nell&apos;ambito
            del Data Privacy Framework UE-USA. Funzioni pubblicitarie, Google Signals e
            personalizzazione degli annunci sono disattivati. Se rifiuti, Google Analytics non
            viene caricato affatto.
          </p>
        </>
      ) : null}

      <h2 id="consent">3. Consenso</h2>
      <p>
        I cookie strettamente necessari possono essere usati senza consenso quando rientrano
        nell&apos;eccezione prevista dalla normativa spagnola sui cookie (art. 22 LSSI). I dati
        personali associati restano soggetti alla normativa sulla protezione dei dati.{" "}
        {GA_ID
          ? "Nello SEE, nel Regno Unito e in Svizzera, o se non riusciamo a determinare la tua posizione, i cookie di Google Analytics vengono impostati solo dopo che li hai accettati nel nostro banner. Ovunque puoi cambiare la tua scelta in qualsiasi momento con «Impostazioni cookie» in fondo a ogni pagina."
          : "Se un giorno introducessimo cookie non tecnici, chiederemmo prima il tuo consenso con un banner adeguato."}
      </p>

      <h2 id="manage">4. Come gestire i cookie</h2>
      <p>
        Puoi cancellare i cookie salvati o impedire al browser di accettarli dalle sue
        impostazioni:
      </p>
      <ul>
        <li>
          <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">
            Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/it/kb/eliminare-cookie-dati-siti-firefox"
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
        Se disattivi i cookie tecnici, alcune funzioni (per esempio ricordare la lingua) potrebbero
        non funzionare correttamente.
      </p>

      <h2 id="changes">5. Modifiche a questa policy</h2>
      <p>
        Se aggiungiamo o togliamo cookie, aggiorneremo questa pagina. La data dell&apos;ultimo
        aggiornamento è indicata in alto.
      </p>

      <h2 id="contact">6. Contatti</h2>
      <p>
        Per qualsiasi domanda sui cookie scrivi a{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
