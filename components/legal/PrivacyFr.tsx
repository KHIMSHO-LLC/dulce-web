import { Link } from "@/i18n/navigation";

{/* Translation of PrivacyEs/PrivacyEn; the Spanish version prevails. TODO: legal review. */}
export function PrivacyFr() {
  return (
    <>
      <p>
        Cette politique de confidentialité explique quelles données personnelles Dulce collecte,
        comment nous les utilisons et quels droits tu as sur elles. Elle s&apos;applique à ce
        site (<strong>dulceglucosa.com</strong>) et à l&apos;application mobile Dulce.
      </p>

      <h2 id="controller">1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement est <strong>Giorgio Khimshiashvili</strong>, entrepreneur
        individuel établi en Espagne. Pour toute question sur tes données, écris-nous à{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>

      <h2 id="data">2. Les données que nous collectons</h2>
      <h3>2.1 Site web</h3>
      <ul>
        <li>
          <strong>Liste d&apos;attente :</strong> ton e-mail et la langue de ta session.
        </li>
        <li>
          <strong>Formulaire bêta :</strong> nom, e-mail, capteur (CGM) et région. En option,
          les remarques que tu choisis de partager.
        </li>
        <li>
          <strong>Données techniques minimales :</strong> un hachage anonyme (SHA-256) de ton
          adresse IP combiné à un sel renouvelé chaque jour, utilisé uniquement pour limiter les
          abus des formulaires. Nous ne stockons jamais l&apos;IP elle-même.
        </li>
        <li>
          <strong>Statistiques anonymes :</strong> nous utilisons Vercel Analytics, qui ne dépose
          aucun cookie et ne collecte aucun identifiant personnel. Il mesure seulement les pages
          vues et les performances.
        </li>
      </ul>

      <h3>2.2 Dans l&apos;app, sur ton appareil</h3>
      <ul>
        <li>
          <strong>Tes identifiants LibreLinkUp.</strong> Tu te connectes avec l&apos;e-mail et le
          mot de passe de ton compte LibreLinkUp (Abbott). Ils sont stockés uniquement dans le
          trousseau sécurisé de ton appareil et servent à récupérer ta glycémie auprès du service
          d&apos;Abbott. Ils ne sont jamais envoyés aux serveurs de Dulce.
        </li>
        <li>
          <strong>Les mesures de glycémie</strong> récupérées depuis LibreLinkUp, stockées dans
          une base de données locale sur ton appareil.
        </li>
        <li>
          <strong>Ton journal</strong> : glucides, insuline, glycémies saisies à la main et
          notes. Stocké localement.
        </li>
        <li>
          <strong>Les données d&apos;Apple Santé</strong>, en lecture seule, si tu donnes
          l&apos;autorisation.
        </li>
        <li>
          <strong>Les préférences</strong> : unités, plage cible, langue, thème, réglages des
          alertes.
        </li>
      </ul>

      <h3>2.3 Le relais Dulce (fonctions en temps réel)</h3>
      <p>
        Certaines fonctions doivent continuer à marcher quand ton téléphone est verrouillé ou
        l&apos;app fermée : l&apos;Activité en direct sur l&apos;écran verrouillé, les alertes de
        glycémie, les mises à jour de l&apos;Apple Watch et le suivi par la famille. Pour cela,
        un petit serveur que nous exploitons (le « relais », hébergé chez Cloudflare) récupère
        tes mesures sur LibreLinkUp et les envoie à tes appareils. Uniquement quand tu actives
        l&apos;une de ces fonctions, le relais traite :
      </p>
      <ul>
        <li>
          <strong>Un jeton de session LibreLinkUp</strong> (pas ton mot de passe), pour récupérer
          les mesures à ta place.
        </li>
        <li>
          <strong>Des jetons de notification anonymes</strong> pour tes appareils, émis par Apple
          ou Google. Ils identifient un appareil pour les notifications, pas toi personnellement.
        </li>
        <li>
          <strong>Tes mesures les plus récentes</strong>, sous forme d&apos;une courte fenêtre
          glissante nécessaire à l&apos;Activité en direct, à la montre et à la vue des abonnés.
          Le relais n&apos;est pas un stockage à long terme de ton historique de santé ; celui-ci
          reste sur ton appareil.
        </li>
        <li>
          <strong>Les réglages minimaux</strong> nécessaires à l&apos;affichage (unités, plage
          cible, seuils d&apos;alerte, langue).
        </li>
      </ul>
      <p>
        Si tu n&apos;actives jamais ces fonctions, rien n&apos;est envoyé aux serveurs de Dulce.
        Si tu les désactives, te déconnectes ou supprimes ton compte dans les Réglages, les
        données correspondantes du relais sont supprimées.
      </p>

      <h3>2.4 Suivi par la famille</h3>
      <p>
        Si tu invites quelqu&apos;un à te suivre, le relais transmet tes mesures récentes et tes
        alertes à son appareil à partir du moment où il accepte ; l&apos;historique antérieur
        n&apos;est pas partagé. De courts messages prédéfinis entre toi et tes abonnés passent
        aussi par le relais. Tu peux retirer l&apos;accès d&apos;un abonné à tout moment et
        désactiver complètement les messages des abonnés.
      </p>

      <h3>2.5 Achats</h3>
      <p>
        Les abonnements sont traités par <strong>Apple</strong>. Nous ne voyons jamais ton nom,
        ta carte ni tes données de facturation. Nous utilisons <strong>RevenueCat</strong> pour
        valider les abonnements à l&apos;aide d&apos;un identifiant aléatoire généré par
        l&apos;app, et non de ton e-mail ou de ton identité.
      </p>

      <h2 id="purpose">3. Pourquoi nous utilisons tes données</h2>
      <ul>
        <li>Afficher ta glycémie sur tes appareils et, si tu le choisis, sur ceux de tes abonnés.</li>
        <li>Envoyer les alertes que tu configures.</li>
        <li>Valider ton abonnement et débloquer les fonctions Pro.</li>
        <li>Te prévenir quand Dulce est disponible (liste d&apos;attente).</li>
        <li>Protéger le site contre les abus (hachage IP, limitation).</li>
        <li>Comprendre quelles pages fonctionnent le mieux (statistiques anonymes).</li>
        <li>Respecter nos obligations légales et répondre à tes demandes d&apos;exercice de droits.</li>
      </ul>

      <h2 id="legal-basis">4. Base juridique</h2>
      <ul>
        <li>
          <strong>Consentement explicite</strong> (art. 9, par. 2, point a) du RGPD) : traitement
          de tes données de glycémie par le relais quand tu actives les fonctions en temps réel ou
          le suivi par la famille.
        </li>
        <li>
          <strong>Contrat</strong> (art. 6, par. 1, point b) du RGPD) : fourniture de l&apos;app
          et des fonctions auxquelles tu t&apos;abonnes.
        </li>
        <li>
          <strong>Consentement</strong> (art. 6, par. 1, point a) du RGPD) : quand tu
          t&apos;inscris à la liste d&apos;attente ou à la bêta.
        </li>
        <li>
          <strong>Intérêt légitime</strong> (art. 6, par. 1, point f) du RGPD) : sécurité de base
          du site et statistiques anonymes.
        </li>
      </ul>

      <h2 id="health">5. Catégories particulières de données (art. 9 du RGPD)</h2>
      <p>
        Les mesures de glycémie et les autres données de santé sont des{" "}
        <strong>catégories particulières</strong> de données personnelles. Notre approche :
      </p>
      <ul>
        <li>Par défaut, elles sont traitées et stockées uniquement sur ton appareil.</li>
        <li>
          Elles n&apos;atteignent notre relais que si tu actives explicitement une fonction qui en
          a besoin, et seulement sous forme d&apos;une courte fenêtre récente.
        </li>
        <li>Elles sont toujours chiffrées pendant le transfert (TLS).</li>
        <li>
          Elles servent exclusivement à transmettre tes propres données à tes propres appareils
          et aux abonnés que tu choisis, jamais à la publicité, au profilage ou à la revente.
        </li>
      </ul>

      <h2 id="retention">6. Durée de conservation</h2>
      <ul>
        <li>
          <strong>Données du relais :</strong> les mesures récentes sont écrasées en continu ;
          les jetons de session et de notification sont conservés tant que la fonction est
          active et supprimés quand tu la désactives, te déconnectes ou supprimes ton compte
          (Réglages → Supprimer le compte).
        </li>
        <li>
          <strong>Données de l&apos;app sur ton appareil :</strong> jusqu&apos;à ce que tu les
          supprimes ou désinstalles l&apos;app.
        </li>
        <li>
          <strong>Liste d&apos;attente :</strong> jusqu&apos;à 6 mois après le lancement, ou
          jusqu&apos;à ce que tu demandes à en être retiré.
        </li>
        <li>
          <strong>Formulaire bêta :</strong> pendant la durée de la bêta plus 12 mois.
        </li>
        <li>
          <strong>Hachage IP :</strong> 30 jours.
        </li>
      </ul>

      <h2 id="recipients">7. Avec qui nous partageons tes données</h2>
      <p>
        Nous ne partageons des données qu&apos;avec les prestataires strictement nécessaires au
        fonctionnement du service. Tous agissent comme sous-traitants sous contrat :
      </p>
      <ul>
        <li>
          <strong>Cloudflare</strong> : héberge le relais Dulce décrit plus haut.
        </li>
        <li>
          <strong>Apple</strong> : notifications (APNs), Activités en direct, Apple Santé (sur
          l&apos;appareil) et paiements.
        </li>
        <li>
          <strong>Google Firebase</strong> : notifications sur Android.
        </li>
        <li>
          <strong>RevenueCat</strong> : validation des abonnements (identifiant pseudonyme
          uniquement).
        </li>
        <li>
          <strong>Supabase</strong> (stockage de la liste d&apos;attente et de la bêta) : hébergé
          dans l&apos;UE (eu-west-3).
        </li>
        <li>
          <strong>Resend</strong> (e-mail de confirmation de la liste d&apos;attente) et{" "}
          <strong>Vercel</strong> (hébergement du site et statistiques anonymes).
        </li>
        <li>
          <strong>Abbott (LibreLinkUp)</strong> : ton appareil et notre relais se connectent au
          service d&apos;Abbott avec tes identifiants ou ta session pour récupérer tes mesures.
          Cette connexion est régie par la politique de confidentialité d&apos;Abbott.
        </li>
      </ul>
      <p>
        Nous ne vendons, ne louons et ne cédons jamais tes données à des tiers à des fins
        publicitaires ou commerciales.
      </p>

      <h2 id="transfers">8. Transferts internationaux</h2>
      <p>
        Certains de nos sous-traitants (Cloudflare, RevenueCat, Resend, Vercel, Apple, Google)
        traitent des données aux États-Unis ou sur des sites périphériques dans le monde. Les
        transferts reposent sur les clauses contractuelles types de la Commission européenne ou
        sur des cadres équivalents (Data Privacy Framework). Tu peux demander une copie de ces
        garanties à <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>

      <h2 id="rights">9. Tes droits</h2>
      <p>En tant que personne concernée, tu as le droit :</p>
      <ul>
        <li>d&apos;accéder à tes données personnelles ;</li>
        <li>de les faire rectifier si elles sont inexactes ;</li>
        <li>d&apos;en demander l&apos;effacement ;</li>
        <li>de t&apos;opposer au traitement ou d&apos;en demander la limitation ;</li>
        <li>à la portabilité des données que tu as fournies ;</li>
        <li>de retirer ton consentement à tout moment.</li>
      </ul>
      <p>
        Le moyen le plus rapide de supprimer tout ce que Dulce détient sur toi est{" "}
        <strong>Réglages → Supprimer le compte</strong> dans l&apos;app. Tu peux aussi exercer
        chacun de ces droits en écrivant à{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>. Nous répondons au plus
        tard sous 30 jours.
      </p>
      <p>
        Si tu estimes que notre traitement n&apos;est pas conforme à la loi, tu peux déposer une
        réclamation auprès de l&apos;
        <a href="https://www.aepd.es" target="_blank" rel="noopener">
          Agence espagnole de protection des données (AEPD)
        </a>{" "}
        ou de l&apos;autorité de contrôle de ton pays de résidence (en France, la CNIL).
      </p>

      <h2 id="minors">10. Enfants</h2>
      <p>
        Dulce ne s&apos;adresse pas aux enfants de moins de 14 ans. Un parent ou un représentant
        légal peut utiliser Dulce pour suivre la glycémie d&apos;un mineur sous sa propre
        responsabilité. Si tu penses qu&apos;un mineur dont tu as la charge nous a fourni des
        données sans ton accord, contacte-nous et nous les supprimerons.
      </p>

      <h2 id="cookies">11. Cookies</h2>
      <p>
        Nous utilisons des cookies techniques strictement nécessaires et, avec ton consentement
        lorsque la loi l&apos;exige, des cookies Google Analytics. Nous n&apos;utilisons pas de
        cookies publicitaires. Leur liste et la façon de modifier ton choix figurent dans notre{" "}
        <Link href="/legal/cookies">politique relative aux cookies</Link>.
      </p>

      <h2 id="changes">12. Modifications de cette politique</h2>
      <p>
        En cas de changement important, nous préviendrons les utilisateurs concernés par e-mail
        ou dans l&apos;app et publierons la nouvelle version, avec sa date, sur cette page.
      </p>

      <h2 id="contact">13. Contact</h2>
      <p>
        Pour toute question sur cette politique ou sur le traitement de tes données, écris à{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
