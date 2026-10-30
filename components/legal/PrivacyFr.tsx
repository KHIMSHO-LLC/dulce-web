import { Link } from "@/i18n/navigation";

{/* Translation of the Spanish/English policy. TODO: review local legal terminology; Spanish counsel review remains outstanding. */}
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
        individuel. Pour toute question sur tes données, écris-nous à{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>

      <h2 id="data">2. Les données que nous collectons</h2>
      <h3>2.1 Site web</h3>
      <ul>
        <li>
          <strong>Liste d&apos;attente Android :</strong> ton e-mail, la langue choisie, la page ou
          l&apos;emplacement où tu t&apos;es inscrit et un hachage pseudonyme de ton IP pour prévenir les abus.
        </li>
        <li>
          <strong>Formulaire d&apos;intérêt pour la bêta, si tu en as envoyé un :</strong> nom,
          e-mail, capteur (CGM), région et remarques facultatives que tu as choisies de partager.
        </li>
        <li>
          <strong>Formulaire de contact :</strong> ton nom, ton e-mail, l&apos;objet et le message.
          Resend transmet le message à notre boîte de support et t&apos;envoie une confirmation.
        </li>
        <li>
          <strong>Données techniques minimales :</strong> un hachage pseudonymisé (SHA-256) de ton
          adresse IP combiné à un sel renouvelé chaque jour, utilisé pour limiter les abus des
          formulaires. Les lignes de liste d&apos;attente et de bêta contiennent ce hachage jusqu&apos;à
          la suppression de la ligne. Les compteurs de limitation sont temporaires. Nous ne
          stockons pas directement l&apos;IP brute.
        </li>
        <li>
          <strong>Statistiques du site :</strong> Vercel Analytics mesure les pages vues et les
          performances sans cookie. Selon Vercel, sa métrique de visiteurs utilise un hachage
          dérivé de la requête qui expire après 24 heures ; les rapports peuvent inclure l&apos;URL,
          le site référent, la localisation générale, le navigateur et le système d&apos;exploitation,
          que nous consultons sous forme agrégée. Google Analytics 4 mesure les visites, le chemin et la
          langue des pages, les clics vers l&apos;App Store avec leur campagne et emplacement, ainsi
          que les inscriptions réussies à la liste d&apos;attente. Dans l&apos;EEE, au Royaume-Uni, en
          Suisse ou si ta localisation est inconnue, il ne se charge qu&apos;après ton accord aux
          cookies de statistiques ; ailleurs,
          le réglage régional décrit dans notre politique relative aux cookies s&apos;applique. Nous
          n&apos;envoyons à aucun de ces services tes mesures de glycémie, autres données de santé
          ni ton adresse e-mail.
        </li>
      </ul>

      <h3>2.2 Dans l&apos;app, sur ton appareil</h3>
      <ul>
        <li>
          <strong>Tes identifiants CGM.</strong> Tu te connectes à ton compte LibreLinkUp
          (Abbott) ou Dexcom Share. Ton mot de passe est stocké dans le trousseau sécurisé de
          ton appareil et n&apos;est pas envoyé à Dulce. L&apos;app l&apos;utilise pour joindre
          le fournisseur ; si tu actives des fonctions du relais, un jeton de session du
          fournisseur (pas ton mot de passe) est envoyé au relais quand ton CGM est connecté,
          comme expliqué ci-dessous.
        </li>
        <li>
          <strong>Les mesures de glycémie</strong> récupérées depuis LibreLinkUp ou Dexcom Share,
          stockées dans une base de données locale sur ton appareil.
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
        Quand ton CGM est connecté, l&apos;app enregistre cette installation auprès de notre
        relais pour permettre les mises à jour en arrière-plan, les alertes, les fonctions
        Apple Watch et le suivi familial lorsque tu les utilises. Le relais est un petit serveur
        que nous exploitons chez Cloudflare. Il récupère les mesures depuis LibreLinkUp ou Dexcom
        Share et envoie des mises à jour à tes appareils. Le relais traite :
      </p>
      <ul>
        <li>
          <strong>Un jeton de session du fournisseur</strong> (pas ton mot de passe) : un jeton
          LibreLinkUp ou un identifiant de session Dexcom Share, pour récupérer les mesures à ta place.
        </li>
        <li>
          <strong>Un identifiant d&apos;installation aléatoire et un identifiant de compte CGM</strong>
          pour associer l&apos;inscription, les mesures et les réglages au bon appareil et compte CGM.
        </li>
        <li>
          <strong>Des jetons de notification</strong> émis par Apple ou Google pour transmettre
          les notifications et les mises à jour de l&apos;Activité en direct.
        </li>
        <li>
          <strong>Tes mesures les plus récentes</strong>, avec leur valeur et leur date, sous
          forme d&apos;une courte fenêtre glissante nécessaire à l&apos;Activité en direct, à la montre
          et à la vue des abonnés. Le relais n&apos;est pas un stockage à long terme de ton
          historique de santé ; celui-ci reste sur ton appareil.
        </li>
        <li>
          <strong>Les réglages et données techniques de l&apos;appareil et de l&apos;app</strong>
          nécessaires au service (unités, plage cible, seuils d&apos;alerte, langue, fuseau
          horaire, plateforme et version de l&apos;app).
        </li>
        <li>
          <strong>Événements d&apos;usage :</strong> événements de base liés à la configuration,
          à la connexion et à l&apos;abonnement, associés à l&apos;identifiant aléatoire
          d&apos;installation pour mesurer et améliorer le service.
        </li>
        <li>
          <strong>Journaux opérationnels :</strong> les journaux de diagnostic envoyés à
          Cloudflare Workers Logs contiennent un code d&apos;appareil pseudonyme (un hachage
          irréversible de ton identifiant d&apos;installation, pas l&apos;identifiant lui-même), ton
          fournisseur de CGM, l&apos;indication que chaque mise à jour ou alerte a été remise ou non,
          le type d&apos;alerte lorsqu&apos;une alerte est envoyée, les événements d&apos;état de
          l&apos;Activité en direct signalés par l&apos;app et des détails d&apos;erreur. Ils ne
          contiennent aucune valeur de glycémie. Cloudflare supprime ces journaux au bout de 7 jours.
        </li>
      </ul>
      <p>
        Tu peux arrêter ce traitement en déconnectant ton CGM ou en utilisant « Supprimer le
        compte » dans les Réglages. L&apos;app demande au relais de supprimer les données actives
        de l&apos;appareil, les jetons et les données de partage. Un identifiant d&apos;installation
        minimal et la date de première inscription sont conservés pour reconnaître une
        installation qui revient dans nos statistiques internes. Ce marqueur n&apos;expire pas
        automatiquement. Écris-nous si tu veux aussi le faire effacer.
      </p>

      <h3>2.4 Suivi par la famille</h3>
      <p>
        Si tu invites quelqu&apos;un à te suivre, le relais transmet tes mesures récentes et tes
        alertes à son appareil à partir du moment où il accepte ; l&apos;historique antérieur
        n&apos;est pas partagé. De courts messages de prise de nouvelles, avec le texte de ton
        choix, passent aussi par le relais ; ce n&apos;est pas un service de discussion. Tu peux
        retirer l&apos;accès d&apos;un abonné à tout moment et désactiver complètement ces messages.
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
        <li>Répondre aux demandes envoyées par le formulaire de contact.</li>
        <li>Protéger le site contre les abus (hachage IP, limitation).</li>
        <li>Comprendre les visites du site, les renvois vers l&apos;App Store et l&apos;usage du service.</li>
        <li>Respecter nos obligations légales et répondre à tes demandes d&apos;exercice de droits.</li>
      </ul>

      <h2 id="legal-basis">4. Base juridique</h2>
      <ul>
        <li>
          <strong>Consentement explicite</strong> (art. 9, par. 2, point a) du RGPD) : traitement
          de tes données de santé quand tu choisis de connecter ton CGM et d&apos;utiliser les
          fonctions associées. Déconnecter ton CGM arrête le traitement par le relais ; tu peux
          aussi retirer ton consentement en nous contactant. Lors de l&apos;onboarding, l&apos;app
          renvoie vers cette politique, mais ne présente actuellement pas de case distincte pour
          consentir au traitement des données de santé. Nous demandons à un conseil espagnol en
          protection des données de vérifier si l&apos;information et le parcours actuels satisfont
          au standard du consentement explicite.
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
          du site et réponse aux demandes que tu envoies par le formulaire de contact. La base
          juridique des statistiques dépend du service et des règles régionales décrites dans
          notre politique relative aux cookies ; elle doit être confirmée avec un conseil en
          protection des données.
        </li>
      </ul>

      <h2 id="health">5. Catégories particulières de données (art. 9 du RGPD)</h2>
      <p>
        Les mesures de glycémie et les autres données de santé sont des{" "}
        <strong>catégories particulières</strong> de données personnelles. Notre approche :
      </p>
      <ul>
        <li>
          Ton historique de glycémie à long terme, ton journal et tes données Apple Santé sont
          traités et stockés sur ton appareil. Le relais traite aussi les mesures récentes comme
          décrit plus haut.
        </li>
        <li>
          Quand ton CGM est connecté, le relais traite les mesures récentes nécessaires aux
          fonctions en arrière-plan et de partage que tu utilises. Il conserve une courte
          fenêtre glissante, pas ton historique de glycémie à long terme.
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
          <strong>Données actives du relais :</strong> les mesures récentes sont remplacées en
          continu dans une courte fenêtre. Les jetons de session du fournisseur et de
          notification sont conservés tant que l&apos;appareil connecté en a besoin, puis supprimés
          lorsque tu le déconnectes ou le désenregistres, te déconnectes ou utilises Réglages →
          Supprimer le compte.
        </li>
        <li>
          <strong>Données de l&apos;app sur ton appareil :</strong> jusqu&apos;à ce que tu les
          supprimes ou désinstalles l&apos;app.
        </li>
        <li>
          <strong>Liste d&apos;attente Android :</strong> jusqu&apos;à six mois après le lancement
          d&apos;Android ou jusqu&apos;à ta demande de suppression. Le stockage actuel ne supprime pas
          automatiquement les lignes ; une suppression manuelle ou ta demande est nécessaire.
          Le hachage IP associé est conservé avec la ligne pendant la même durée.
        </li>
        <li>
          <strong>Formulaire d&apos;intérêt pour la bêta :</strong> pendant la bêta et les 12 mois
          suivants. Ces lignes sont aussi supprimées manuellement ou sur demande ; le hachage IP
          associé est conservé avec la ligne.
        </li>
        <li>
          <strong>Messages de contact :</strong> pendant le traitement de ta demande et tout
          suivi nécessaire. Les e-mails peuvent rester dans nos systèmes et ceux de Resend selon
          leurs paramètres de conservation ; tu peux en demander la suppression en l&apos;absence
          d&apos;obligation légale de conservation.
        </li>
        <li>
          <strong>Événements d&apos;usage du relais :</strong> les événements associés à un
          identifiant d&apos;installation aléatoire sont conservés jusqu&apos;à 45 jours ; les
          statistiques quotidiennes agrégées du service jusqu&apos;à 400 jours.
        </li>
        <li>
          <strong>Journaux opérationnels :</strong> Cloudflare Workers Logs sont supprimés au bout de 7 jours.
        </li>
        <li>
          <strong>Marqueur d&apos;installation :</strong> l&apos;identifiant aléatoire et la date
          de première inscription restent après la suppression des données du relais. Tu peux
          demander l&apos;effacement de ce marqueur, qui n&apos;expire pas automatiquement.
        </li>
      </ul>

      <h2 id="recipients">7. Avec qui nous partageons tes données</h2>
      <p>
        Nous utilisons les prestataires ci-dessous. Certains traitent des données pour notre
        compte en vertu d&apos;un contrat ; Abbott, Dexcom, Apple et Google fournissent aussi leurs
        propres services selon leurs conditions et politiques de confidentialité :
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
          <strong>Google Analytics 4 (Google Ireland Ltd.)</strong> : statistiques du site selon
          le réglage régional de consentement décrit dans notre politique relative aux cookies.
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
          <strong>Resend</strong> (envoi des formulaires de contact et e-mail de confirmation de
          la liste d&apos;attente) et{" "}
          <strong>Vercel</strong> (hébergement du site et statistiques web agrégées).
        </li>
        <li>
          <strong>Abbott (LibreLinkUp)</strong> : ton appareil et notre relais se connectent au
          service d&apos;Abbott avec tes identifiants ou ta session pour récupérer tes mesures.
          Cette connexion est régie par la politique de confidentialité d&apos;Abbott.
        </li>
        <li>
          <strong>Dexcom (Share)</strong> : ton appareil et, tant que ton CGM est connecté, notre
          relais se connectent à Dexcom Share avec un identifiant de session pour
          récupérer les mesures. Les règles de confidentialité de Dexcom s&apos;appliquent à ce service.
        </li>
      </ul>
      <p>
        Nous ne vendons, ne louons et ne cédons jamais tes données à des tiers à des fins
        publicitaires ou commerciales.
      </p>

      <h2 id="transfers">8. Transferts internationaux</h2>
      <p>
        Certains fournisseurs et services que nous utilisons (Cloudflare, RevenueCat, Resend,
        Vercel, Apple et Google) peuvent traiter des données aux États-Unis ou dans d&apos;autres
        pays. Lorsque le RGPD exige des garanties de transfert, le mécanisme applicable dépend du
        fournisseur et du service ; il peut s&apos;agir d&apos;une décision d&apos;adéquation ou des
        clauses contractuelles types de la Commission européenne. Google LLC figure comme actif
        dans le Data Privacy Framework UE-États-Unis, dans les limites de sa certification.
        Contacte-nous pour connaître les détails et obtenir une copie des garanties applicables :{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>

      <h2 id="rights">9. Tes droits</h2>
      <p>En vertu du RGPD et sous réserve de ses conditions, tu as le droit :</p>
      <ul>
        <li>d&apos;accéder à tes données personnelles ;</li>
        <li>de les faire rectifier si elles sont inexactes ;</li>
        <li>d&apos;en demander l&apos;effacement ;</li>
        <li>de t&apos;opposer au traitement ou d&apos;en demander la limitation ;</li>
        <li>à la portabilité des données que tu as fournies ;</li>
        <li>de retirer ton consentement à tout moment.</li>
      </ul>
      <p>
        Utilise <strong>Réglages → Supprimer le compte</strong> dans l&apos;app pour effacer les
        données locales et les données actives du relais. Le marqueur minimal d&apos;installation
        décrit plus haut reste jusqu&apos;à ce que tu demandes son effacement. Tu peux exercer
        chacun de ces droits en écrivant à{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>. Nous répondons dans
        un délai d&apos;un mois. Pour une demande complexe ou de nombreuses demandes, le RGPD permet
        une prolongation maximale de deux mois supplémentaires ; nous t&apos;en informerons au
        cours du premier mois.
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
