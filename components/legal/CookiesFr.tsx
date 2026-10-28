import { GA_ID } from "@/lib/consent";

{/* Translation of CookiesEs/CookiesEn; the Spanish version prevails. TODO: legal review. */}
export function CookiesFr() {
  return (
    <>
      <p>
        Cette politique relative aux cookies explique quels cookies et technologies similaires le
        site <strong>dulceglucosa.com</strong> utilise, et pourquoi.
      </p>

      <h2 id="what">1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
      <p>
        Un cookie est un petit fichier texte qu&apos;un site enregistre dans ton navigateur pour se
        souvenir d&apos;informations d&apos;une page ou d&apos;une visite à l&apos;autre. Les cookies
        peuvent être <strong>techniques</strong> (nécessaires au fonctionnement du site) ou{" "}
        <strong>non techniques</strong> (statistiques, publicité, etc.).
      </p>

      <h2 id="ours">2. Les cookies que nous utilisons</h2>
      {GA_ID ? (
        <p>
          Dulce utilise des <strong>cookies techniques strictement nécessaires</strong> et des
          cookies <strong>Google Analytics</strong>. Dans l&apos;EEE, au Royaume-Uni et en Suisse,
          Google Analytics ne fonctionne que si tu l&apos;acceptes. Nous n&apos;utilisons pas de
          cookies de suivi publicitaire.
        </p>
      ) : (
        <p>
          Dulce utilise <strong>uniquement des cookies techniques strictement nécessaires</strong>.
          Nous n&apos;utilisons ni cookies de suivi publicitaire ni cookies statistiques de tiers.
        </p>
      )}

      <h3>2.1 Cookies de session et techniques</h3>
      <ul>
        <li>
          <strong>NEXT_LOCALE</strong> : retient ta langue d&apos;une page à l&apos;autre. Type :
          technique. Durée : jusqu&apos;à 1 an.
        </li>
        <li>
          <strong>dulce-region</strong> : ton code pays (déduit de ton adresse IP, que nous ne
          stockons pas), utilisé seulement pour savoir s&apos;il faut demander ton accord pour les
          statistiques. Type : technique. Durée : jusqu&apos;à la fermeture du navigateur.
        </li>
        <li>
          <strong>Jetons d&apos;envoi de formulaire</strong> : utilisés par les Server Actions de
          Next.js contre les attaques CSRF. Type : technique. Durée : le temps de l&apos;envoi.
        </li>
      </ul>

      <h3>2.2 Statistiques anonymes sans cookies</h3>
      <p>
        Nous utilisons <strong>Vercel Analytics</strong>, qui mesure les pages vues et les
        performances <strong>sans cookies</strong> ni identifiants personnels. Les données sont
        agrégées et anonymes ; elles ne permettent pas de t&apos;identifier. C&apos;est pourquoi
        aucun consentement n&apos;est requis au titre de la directive ePrivacy.
      </p>

      {GA_ID ? (
        <>
          <h3>2.3 Google Analytics</h3>
          <p>
            Dans l&apos;EEE, au Royaume-Uni et en Suisse seulement si tu acceptes les cookies
            statistiques, et ailleurs tant que tu ne le désactives pas, nous utilisons{" "}
            <strong>Google Analytics 4</strong> (Google Ireland Ltd.) pour compter les visites et
            voir quelles pages mènent à l&apos;App Store. Il dépose les cookies <strong>_ga</strong>{" "}
            et <strong>_ga_*</strong> (durée : jusqu&apos;à 2 ans). Google peut traiter ces données
            aux États-Unis dans le cadre du Data Privacy Framework UE-États-Unis. Les fonctions
            publicitaires, Google Signals et la personnalisation des annonces sont désactivés. Si
            tu refuses, Google Analytics n&apos;est pas chargé du tout.
          </p>
        </>
      ) : null}

      <h2 id="consent">3. Consentement</h2>
      <p>
        Les cookies strictement nécessaires ne requièrent pas ton consentement : ils en sont
        exemptés par la réglementation espagnole sur les cookies (art. 22 LSSI) et le RGPD.{" "}
        {GA_ID
          ? "Dans l’EEE, au Royaume-Uni et en Suisse, les cookies Google Analytics ne sont déposés qu’après ton acceptation dans notre bandeau. Partout, tu peux modifier ton choix à tout moment avec « Paramètres des cookies » en bas de chaque page."
          : "Si nous introduisions un jour des cookies non techniques, nous demanderions ton consentement préalable au moyen d’un bandeau adapté."}
      </p>

      <h2 id="manage">4. Gérer les cookies</h2>
      <p>
        Tu peux supprimer les cookies enregistrés ou empêcher ton navigateur de les accepter dans
        ses réglages :
      </p>
      <ul>
        <li>
          <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">
            Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/fr/kb/effacer-cookies-donnees-site-firefox"
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
        Si tu désactives les cookies techniques, certaines fonctions (par exemple la mémorisation
        de ta langue) risquent de ne pas fonctionner correctement.
      </p>

      <h2 id="changes">5. Modifications de cette politique</h2>
      <p>
        Si nous ajoutons ou retirons des cookies, nous mettrons cette page à jour. La date de
        dernière mise à jour figure en haut.
      </p>

      <h2 id="contact">6. Contact</h2>
      <p>
        Pour toute question sur les cookies, écris à{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
