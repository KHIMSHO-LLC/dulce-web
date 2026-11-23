import { Link } from "@/i18n/navigation";

{/* Traduction du texte espagnol, qui prévaut. Décisions de rédaction et points ouverts : DULCE/plans/legal-answers-2026-11-16.md (en anglais). */}
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
        Le responsable du traitement est <strong>Giorgi Khimshiashvili</strong>, entrepreneur
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
          comme expliqué ci-dessous. Avec Medtronic CareLink, tu saisis ton mot de passe sur la page de Medtronic : Dulce ne le voit jamais et reçoit des jetons de connexion de Medtronic. Avec Nightscout, tu saisis l’adresse de ton site et un jeton d’accès ou secret API (Dulce ne conserve que l’empreinte SHA-1 du secret). Exception pour Dexcom : tant que « Rester connecté » est activé (Réglages › Capteur, activé par défaut), l&apos;app envoie aussi une fois ton mot de passe Dexcom au relais, car Dexcom met fin aux sessions toutes les 24 heures ; voir plus bas. Si tu utilises l&apos;historique de courbe enregistré et que tu as accepté la collecte pendant ton absence, cela permet aussi au relais de continuer à collecter ton historique après ta déconnexion (voir 2.6).
        </li>
        <li>
          <strong>Les mesures de glycémie</strong> récupérées depuis LibreLinkUp, Dexcom Share, Medtronic CareLink ou Nightscout,
          stockées dans une base de données locale sur ton appareil (et, pour les abonnés Dulce Pro
          qui acceptent l&apos;historique de courbe enregistré, aussi sur le relais ; voir 2.6).
        </li>
        <li>
          <strong>Ton journal</strong> : glucides, insuline (y compris les doses lues depuis un
          stylo à insuline connecté), exercice, glycémies saisies à la main et notes. Stocké sur
          ton appareil. Si tu utilises l&apos;historique de courbe enregistré et que tu partages
          ton journal avec ta famille (activé par défaut, tu peux le désactiver), les entrées à
          partir du jour où tu as activé le partage, y compris les notes en texte libre, sont aussi
          stockées sur le relais (voir 2.6).
        </li>
        <li>
          <strong>Les données d&apos;Apple Santé</strong> (iPhone) ou de <strong>Health Connect</strong> (Android), si tu donnes
          l&apos;autorisation. Sur Android, Dulce ne fait que lire. Sur iPhone, à partir de la version 1.0.7, Dulce peut aussi enregistrer les mesures de ton capteur dans Apple Santé, au maximum une toutes les 5 minutes, si tu actives la glycémie dans Dulce et que tu l’autorises. Tu peux arrêter cela dans les réglages de Dulce ou dans l’app Santé. Les mesures enregistrées restent dans Apple Santé et les autres apps que tu autorises peuvent les lire.
        </li>
        <li>
          <strong>Les préférences</strong> : unités, plage cible, langue, thème, réglages des
          alertes.
        </li>
      </ul>

      <h3>2.2.2 Mesure publicitaire (facultative, iOS)</h3>
      <p>
        L&apos;app Dulce peut inclure le SDK Meta (Meta Platforms Ireland Ltd. pour les
        utilisateurs en Europe) afin de mesurer si les publicités de Dulce sur Facebook et
        Instagram mènent à des installations et à des abonnements. Elle est
        <strong>désactivée</strong> tant que tu ne réponds pas oui à une question dans l&apos;app,
        et tu peux la désactiver à tout moment dans Réglages (ligne « Mesure publicitaire »). Si
        tu réponds non, rien n&apos;est envoyé à Meta.
      </p>
      <p>
        Si tu l&apos;autorises, nous partageons le fait que l&apos;app a été installée ou ouverte
        et qu&apos;un abonnement ou un essai a démarré (les événements d&apos;achat sont envoyés
        par notre prestataire de paiement, RevenueCat), ainsi qu&apos;un identifiant anonyme créé
        par le SDK Meta pour cette app et les données techniques envoyées avec toute requête
        (adresse IP, modèle d&apos;appareil, version du système). Nous ne partageons jamais de
        mesures de glycémie, de données de santé, de données du compte du capteur, ni ton nom ou
        ton e-mail.
      </p>
      <p>
        Dulce n&apos;affiche pas la demande de suivi d&apos;Apple et ne collecte pas
        l&apos;identifiant publicitaire (IDFA). Tu n&apos;es pas suivi sur les apps et sites
        d&apos;autres entreprises, et la mesure est agrégée. La base juridique est ton
        consentement (art. 6, par. 1, point a) du RGPD), que tu peux retirer à tout moment dans
        Réglages.
      </p>

      <h3>2.3 Le relais Dulce (fonctions en temps réel)</h3>
      <p>
        Quand ton CGM est connecté, l&apos;app enregistre cette installation auprès de notre
        relais pour permettre les mises à jour en arrière-plan, les alertes, les fonctions
        Apple Watch et le suivi familial lorsque tu les utilises. Le relais est un petit serveur
        que nous exploitons chez Cloudflare. Il récupère les mesures depuis LibreLinkUp, Dexcom Share, Medtronic CareLink ou Nightscout et envoie des mises à jour à tes appareils. Le relais traite :
      </p>
      <ul>
        <li>
          <strong>Un jeton de session du fournisseur</strong> (pas ton mot de passe) : un jeton
          LibreLinkUp ou un identifiant de session Dexcom Share, pour récupérer les mesures à ta place. Avec Medtronic CareLink, le relais conserve tes jetons de connexion CareLink. Avec Nightscout, il conserve l’adresse de ton site et ton jeton d’accès ou l’empreinte SHA-1 de ton secret API. Pour Dexcom, tant que « Rester connecté » est activé, le relais conserve aussi ton mot de passe Dexcom, chiffré (AES-256-GCM, la clé étant conservée à part dans le coffre de secrets de Cloudflare), et ne l&apos;utilise que pour te reconnecter à Dexcom Share quand ta session expire. Il n&apos;est jamais journalisé ni partagé, et il est supprimé quand tu désactives l&apos;option ou supprimes ton compte. Quand tu te déconnectes, il est supprimé aussi, sauf si Dulce continue de collecter l&apos;historique de ta courbe pendant ton absence (voir 2.6) : il reste alors, chiffré, uniquement tant que cette collecte continue, et il est supprimé dès qu&apos;elle prend fin, quelle qu&apos;en soit la raison. Si tu choisis « Arrêter et supprimer » en te déconnectant, il est supprimé immédiatement.
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
          et à la vue des abonnés. Si tu es abonné Dulce Pro et que tu acceptes l&apos;historique
          de courbe enregistré dans l&apos;app, le relais conserve aussi l&apos;historique de ta
          courbe jusqu&apos;à 1 an (voir 2.6). Sans cela, ton historique à long terme reste
          uniquement sur ton appareil.
        </li>
        <li>
          <strong>Les réglages et données techniques de l&apos;appareil et de l&apos;app</strong>
          nécessaires au service (unités, plage cible, seuils d&apos;alerte, langue, fuseau
          horaire, plateforme et version de l&apos;app).
        </li>
        <li>
          <strong>Événements d&apos;usage :</strong> événements liés à la configuration, à la connexion, à l&apos;abonnement, à la page de paiement et à l&apos;utilisation des fonctions, ainsi que toute option de retour que tu touches, associés à l&apos;identifiant aléatoire d&apos;installation pour mesurer et améliorer le service. Ils ne contiennent ni mesures de glycémie ni texte de message.
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
        Tu peux arrêter ce traitement en utilisant « Supprimer le compte » dans les Réglages. Te
        déconnecter de ton compte capteur dans Dulce arrête les mises à jour en direct et les
        alertes ; si tu utilises l&apos;historique de courbe enregistré, c&apos;est toi qui choisis
        si Dulce continue de collecter ton historique pendant ta déconnexion (voir 2.6). « Supprimer
        le compte » demande au relais de supprimer les données actives de l&apos;appareil, les
        jetons, les données de partage et l&apos;historique enregistré. Un identifiant d&apos;installation
        minimal et la date de première inscription sont conservés pour reconnaître une
        installation qui revient dans nos statistiques internes. Ce marqueur n&apos;expire pas
        automatiquement. Écris-nous si tu veux aussi le faire effacer.
      </p>

      <h3>2.4 Suivi par la famille</h3>
      <p>
        Si tu invites quelqu&apos;un à te suivre, le relais transmet tes mesures et tes alertes à
        son appareil à partir du moment où il accepte. Sans historique de courbe enregistré,
        l&apos;historique antérieur n&apos;est pas partagé. Si tu utilises l&apos;historique de
        courbe enregistré (Dulce Pro), tes abonnés peuvent aussi voir l&apos;historique enregistré
        de ta courbe, y compris les mesures d&apos;avant leur acceptation, et, tant que le partage
        du journal est activé, ton journal partagé, y compris les notes en texte libre ; ils
        cessent de le voir quand tu retires leur accès ou que tu mets le partage en pause (voir
        2.6). Les messages entre toi et tes abonnés, y compris le texte que tu écris, passent par le relais et par le service de notification d&apos;Apple ou de Google pour atteindre leurs appareils. Le relais ne conserve ni le texte des messages ni d&apos;historique. Tu peux
        retirer l&apos;accès d&apos;un abonné à tout moment et désactiver complètement ces messages.
      </p>

      <h3>2.5 Achats</h3>
      <p>
        Les abonnements sont traités par <strong>Apple</strong>. Nous ne voyons jamais ton nom,
        ta carte ni tes données de facturation. Nous utilisons <strong>RevenueCat</strong> pour
        valider les abonnements à l&apos;aide d&apos;un identifiant aléatoire généré par
        l&apos;app, et non de ton e-mail ou de ton identité.
      </p>
      <p>
        Notre serveur conserve cet identifiant RevenueCat avec l&apos;identifiant
        d&apos;installation afin de retirer les fonctions Pro dès qu&apos;un achat est remboursé.
        Si tu demandes un remboursement à Apple ou Google, nous pouvons leur indiquer, via
        RevenueCat, si l&apos;achat a été fourni et notre préférence concernant le remboursement.
        Nous ne partageons jamais de données de glycémie ni de santé ; la décision revient
        toujours à Apple ou Google.
      </p>

      <h3>2.6 Historique de courbe enregistré (Dulce Pro)</h3>
      <p>
        <strong>De quoi il s&apos;agit.</strong> Si tu as Dulce Pro et que tu l&apos;acceptes dans
        l&apos;app, notre relais enregistre ton historique de glycémie pour que ta courbe et celle
        de tes abonnés soient identiques et sans trous, et pour que ton historique soit toujours
        là après une déconnexion, une réinstallation de Dulce ou un changement d&apos;iPhone. Si tu
        n&apos;as pas Dulce Pro ou que tu ne l&apos;acceptes pas, rien n&apos;est enregistré et ton
        historique reste uniquement sur ton appareil.
      </p>
      <p>
        <strong>Ce qui est enregistré.</strong>
      </p>
      <ul>
        <li>
          Tes mesures de glycémie, chacune avec son heure, sa valeur et sa flèche de tendance :
          l&apos;historique que renvoie le service de ton capteur (LibreLinkUp, Dexcom Share,
          Medtronic CareLink ou Nightscout), les mesures que le relais récupère et, une seule fois
          quand tu acceptes, l&apos;historique déjà présent sur ton téléphone (jusqu&apos;à 90
          jours).
        </li>
        <li>
          Ton journal, si tu le partages avec ta famille (activé par défaut tant que
          l&apos;historique de courbe enregistré est activé ; tu peux le désactiver séparément).
          Tout le journal est partagé : glucides, insuline (y compris les doses lues depuis un
          stylo à insuline connecté et les doses d&apos;amorçage), exercice, glycémies saisies à
          la main et notes en texte libre, chacun avec son heure et sa quantité. Seules les
          entrées à partir du jour où tu actives le partage du journal sont partagées ; les plus
          anciennes ne le sont pas.
        </li>
        <li>
          Non enregistrés avec cela : l&apos;e-mail de ton compte capteur, ton nom, le texte des
          messages entre toi et tes abonnés, ni les données d&apos;Apple Santé ou de Health
          Connect.
        </li>
      </ul>
      <p>
        <strong>Pourquoi.</strong> Uniquement pour fournir cette fonction : la même courbe,
        complète, pour toi et les membres de ta famille que tu as invités, conservée après une
        déconnexion, une réinstallation et un changement de téléphone. Nous ne l&apos;utilisons pas
        pour la publicité, le profilage ou la vente, et nous ne la partageons ni avec Meta ni avec
        aucun service de statistiques.
      </p>
      <p>
        <strong>Base juridique.</strong> Ton consentement explicite (art. 9, par. 2, point a) du
        RGPD), car les données de glycémie sont des données de santé. L&apos;app te le demande
        avant que l&apos;enregistrement commence, séparément pour chaque compte capteur : si tu te
        connectes avec un autre compte capteur, elle te le demande à nouveau. Rien n&apos;est
        enregistré avant ta réponse, et les versions de l&apos;app qui ne posent pas la question
        n&apos;enregistrent rien. Tu peux retirer ton consentement à tout moment dans les
        Réglages : l&apos;enregistrement s&apos;arrête et la copie enregistrée sur le relais est
        supprimée immédiatement. Le retrait n&apos;affecte pas la licéité de l&apos;enregistrement
        effectué avant. Dulce Pro ne dépend pas de ce consentement : sans lui, Dulce Pro
        fonctionne sans historique enregistré.
      </p>
      <p>
        <strong>Où.</strong> Sur le relais Dulce, dans une base de données de notre hébergeur
        Cloudflare, qui la traite pour notre compte et peut traiter des données dans l&apos;UE et
        dans d&apos;autres pays avec ses garanties standard (voir section 8). Le même historique
        reste aussi dans la base de données locale de l&apos;app sur ton téléphone.
      </p>
      <p>
        <strong>Combien de temps.</strong> Tant que ton abonnement Dulce Pro (y compris un essai
        gratuit) est actif, nous conservons au maximum environ 1 an d&apos;historique ; les jours
        plus anciens sont supprimés automatiquement. Si ton abonnement prend fin ou est remboursé,
        l&apos;enregistrement s&apos;arrête et l&apos;historique enregistré (mesures et journal
        partagé) est supprimé 90 jours plus tard ; si tu te réabonnes pendant ces 90 jours, il est
        toujours là.
      </p>
      <p>
        <strong>Collecte pendant que tu es déconnecté ou que l&apos;app est supprimée.</strong> Si
        tu l&apos;as accepté (l&apos;app te l&apos;indique sur l&apos;écran de consentement, dans
        un avis unique ou quand tu te déconnectes), le relais continue de collecter l&apos;historique
        de ton capteur après ta déconnexion de ton compte capteur dans Dulce ou la suppression de
        l&apos;app, quelques fois par jour plutôt que chaque minute, à l&apos;aide de
        l&apos;identifiant du capteur qu&apos;il détient déjà :
      </p>
      <ul>
        <li>
          LibreLinkUp : le jeton de session. Nightscout : l&apos;adresse de ton site et ton jeton
          d&apos;accès ou l&apos;empreinte de ton secret API.
        </li>
        <li>
          Medtronic CareLink : les jetons de connexion que Medtronic a émis pour Dulce (jamais ton
          mot de passe), que le relais renouvelle comme Medtronic l&apos;exige.
        </li>
        <li>
          Dexcom Share : si « Rester connecté » est activé, ton mot de passe Dexcom, chiffré comme
          décrit en 2.3. S&apos;il est désactivé, la collecte s&apos;arrête environ un jour après
          ta dernière connexion, car Dexcom met fin à la session.
        </li>
      </ul>
      <p>
        La collecte pendant ton absence prend fin au premier de ces événements : tu te reconnectes
        à Dulce avec le même compte capteur ; tu la désactives dans les Réglages ou tu choisis
        « Arrêter et supprimer » en te déconnectant ; tu désactives l&apos;historique de courbe
        enregistré ou tu utilises « Supprimer le compte » ; ton abonnement Dulce Pro prend fin ; le
        service de ton capteur refuse la connexion ou échoue de façon répétée pendant environ une
        semaine ; ou 1 an s&apos;est écoulé. Quand elle prend fin, l&apos;identifiant conservé pour
        elle est supprimé. L&apos;historique déjà enregistré reste jusqu&apos;à ce que tu le
        supprimes ou que la durée ci-dessus s&apos;écoule, sauf si tu as choisi de le supprimer. Si
        tu supprimes l&apos;app sans te déconnecter, l&apos;app ne peut pas te poser la question à
        ce moment-là : la collecte continue uniquement si tu l&apos;avais déjà acceptée ; pour
        l&apos;arrêter, écris-nous (voir « Comment le désactiver et le supprimer » ci-dessous).
        Tant que tu es déconnecté ou absent, tes abonnés ne reçoivent ni mesures en direct, ni
        alertes, ni nouvel historique.
      </p>
      <p>
        <strong>Il peut y avoir des trous ou des pertes.</strong> L&apos;historique enregistré est
        une commodité : ce n&apos;est ni un dossier médical ni une sauvegarde. Il peut présenter des
        trous ou être perdu, par exemple quand la session de ton capteur expire ou que tu changes le
        mot de passe de ton capteur, quand Dexcom met fin à la session et que « Rester connecté »
        est désactivé, quand le service de ton capteur subit une panne ou n&apos;a pas encore reçu
        de données de ton téléphone, quand ton abonnement prend fin, quand tu réinstalles Dulce sur
        Android ou que tu passes à un iPhone sans ton trousseau iCloud, quand tu utilises
        « Supprimer le compte », quand un fabricant de capteur modifie ou ferme son service, ou à
        cause d&apos;une défaillance de notre côté. Conserve les données dont ton médecin a besoin
        dans l&apos;app officielle du fabricant de ton capteur.
      </p>
      <p>
        <strong>Qui peut le voir.</strong> Toi, et les abonnés que tu as invités tant que tu
        partages avec eux : ils voient l&apos;historique enregistré de ta courbe (y compris les
        mesures d&apos;avant leur acceptation) et, tant que le partage du journal est activé, ton
        journal partagé, notes en texte libre comprises. Ils cessent de le voir quand tu retires
        leur accès, quand le partage est mis en pause ou quand tu supprimes ton historique.
        Désactiver le partage du journal supprime la copie partagée sur le relais ; ton journal sur
        ton téléphone reste. Les notes que tu partages peuvent être lues par tes abonnés : n&apos;y
        écris donc aucune information sur d&apos;autres personnes. Une personne connectée au même
        compte capteur sur son propre téléphone ne reçoit pas ton historique enregistré via Dulce.
        Le relais traite ces données automatiquement pour les transmettre ; nous ne consultons ni
        l&apos;historique ni les notes d&apos;un utilisateur en particulier, sauf si c&apos;est
        nécessaire pour résoudre un problème que tu nous signales, pour garantir la sécurité du
        service ou si la loi l&apos;exige.
      </p>
      <p>
        <strong>Comment nous reconnaissons ton historique sans compte.</strong> Dulce n&apos;a pas
        de compte utilisateur. Ton historique est lié à une « clé d&apos;historique » secrète
        aléatoire créée sur ton téléphone, combinée à un identifiant du patient de ton compte
        capteur (un numéro ou un nom d&apos;utilisateur fourni par le service de ton capteur, ou
        une empreinte de l&apos;adresse de ton Nightscout), jamais l&apos;e-mail de ton capteur.
        Sur iPhone, si tu utilises le trousseau iCloud, la clé d&apos;historique est synchronisée
        via ton propre trousseau iCloud : tes autres iPhone avec le même compte Apple partagent donc
        le même historique ; pour la même raison, désactiver l&apos;enregistrement sur l&apos;un
        d&apos;eux le désactive sur les autres. « Supprimer le compte » retire la clé de ton
        trousseau iCloud : Dulce sur tes autres iPhone repart alors d&apos;un nouvel historique. Si
        tu te connectes avec un autre compte capteur sur le même téléphone, les historiques ne sont
        pas mélangés.
      </p>
      <p>
        <strong>Comment le désactiver et le supprimer.</strong>
      </p>
      <ul>
        <li>
          Dans l&apos;app, désactive « Enregistrer l&apos;historique » dans les Réglages et
          confirme « Arrêter et supprimer » : la copie enregistrée sur le relais est supprimée
          immédiatement.
        </li>
        <li>
          Dans l&apos;app, désactive « Continuer la collecte si je suis déconnecté ou si l&apos;app
          est supprimée » : Dulce ne collecte plus après ta déconnexion ou la suppression de
          l&apos;app, et ne conserve aucun identifiant de capteur pour cela.
        </li>
        <li>
          Dans l&apos;app, désactive « Partager mon journal avec ma famille » : la copie du journal
          partagé sur le relais est supprimée.
        </li>
        <li>Quand tu te déconnectes, choisis « Arrêter et supprimer » (ou « Le supprimer »).</li>
        <li>
          Utilise Réglages → Supprimer le compte : tout est supprimé, comme décrit à la section 9.
        </li>
        <li>
          Sans l&apos;app, écris à{" "}
          <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>. Comme il n&apos;y a pas
          de compte, indique ton ID de support (dans l&apos;app : Réglages › Compte › ID de
          support) ou l&apos;e-mail de contact que tu as enregistré (section 2.7), si tu les as ;
          sinon, nous te demanderons des informations qui nous permettent de retrouver tes données
          (par exemple ton service de capteur et la date de ta dernière utilisation de Dulce).
          Nous ne pouvons agir que sur des données que nous pouvons identifier, et nous te dirons
          si ce n&apos;est pas possible.
        </li>
      </ul>

      <h3>2.7 E-mail de contact (facultatif)</h3>
      <p>
        Dulce fonctionne sans adresse e-mail. Si tu le souhaites, tu peux enregistrer un e-mail de
        contact dans l&apos;app. Nous le conservons sur le relais Dulce, lié à ton installation
        (l&apos;ID de support affiché dans l&apos;app), et nous l&apos;utilisons uniquement pour :
      </p>
      <ul>
        <li>répondre à tes demandes d&apos;assistance et retrouver ton installation quand tu nous écris ;</li>
        <li>
          t&apos;écrire au sujet de ton installation Dulce ou de ton abonnement, par exemple un
          problème de connexion de ton capteur, une modification de cette politique ou des
          conditions, ou un mois gratuit que nous te proposons.
        </li>
      </ul>
      <p>
        Nous ne l&apos;utilisons ni pour du marketing ni pour des newsletters, sauf si tu y
        consens séparément, et nous ne le partageons ni avec Meta, ni avec des services
        d&apos;analyse, ni avec personne d&apos;autre, sauf notre hébergeur Cloudflare, qui le
        conserve pour nous. Il n&apos;est jamais écrit dans les journaux. Comme il est lié à ton
        installation, il nous permet de savoir à qui appartient l&apos;installation quand nous
        t&apos;aidons (par exemple l&apos;état de ton abonnement ou si tu utilises le suivi par la
        famille) ; le support ne voit pas tes mesures de glycémie.
      </p>
      <p>
        <strong>Base juridique :</strong> ton consentement (art. 6, par. 1, point a) du RGPD). Le
        donner est facultatif, et tu peux le modifier ou le retirer dans l&apos;app à tout moment ;
        le retirer le supprime du relais.{" "}
        <strong>Durée :</strong> jusqu&apos;à ce que tu le retires, que tu utilises « Supprimer le
        compte » ou que tu nous demandes de le supprimer. Il est conservé quand tu te déconnectes
        de ton compte capteur, pour que nous puissions continuer à t&apos;aider. Les e-mails que
        tu nous envoies sont traités comme les messages de contact décrits à la section 6.
      </p>

      <h2 id="purpose">3. Pourquoi nous utilisons tes données</h2>
      <ul>
        <li>Afficher ta glycémie sur tes appareils et, si tu le choisis, sur ceux de tes abonnés.</li>
        <li>Envoyer les alertes que tu configures.</li>
        <li>
          Conserver l&apos;historique de ta courbe pour que toi et tes abonnés voyiez la même
          courbe, même après une déconnexion, une réinstallation ou un changement de téléphone, et
          partager ton journal avec la famille que tu as invitée (Dulce Pro, avec ton
          consentement ; section 2.6).
        </li>
        <li>Valider ton abonnement et débloquer les fonctions Pro.</li>
        <li>
          Si tu as enregistré un e-mail de contact, répondre à tes demandes d&apos;assistance et
          t&apos;écrire au sujet de ton installation ou de ton abonnement (section 2.7).
        </li>
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
          de tes données de santé quand tu connectes ton capteur dans l&apos;app et utilises les
          fonctions associées (mesures en direct, alertes, Activité en direct, widgets, montre et
          suivi par la famille). Tu le donnes en connectant ton capteur, après que l&apos;app t&apos;a
          expliqué ce que fait Dulce et renvoyé vers cette politique. Tu peux le retirer à tout
          moment en te déconnectant de ton compte capteur dans Dulce, ce qui arrête le traitement
          par le relais (sauf la collecte de ton historique de courbe enregistré pendant ton
          absence, si tu l&apos;as acceptée ; section 2.6), en utilisant « Supprimer le compte » ou
          en nous écrivant.
        </li>
        <li>
          <strong>Consentement explicite</strong> (art. 9, par. 2, point a) du RGPD) pour
          l&apos;historique de courbe enregistré, la collecte pendant que tu es déconnecté ou que
          l&apos;app est supprimée, et le partage du journal : demandé dans l&apos;app, pour chaque
          compte capteur, avant que l&apos;enregistrement commence, et révocable à tout moment dans
          les Réglages (section 2.6).
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
          <strong>Consentement</strong> (art. 6, par. 1, point a) du RGPD) : aussi pour la mesure
          publicitaire facultative décrite à la section 2.2.2 ; tu peux le retirer à tout moment
          dans Réglages.
        </li>
        <li>
          <strong>Consentement</strong> (art. 6, par. 1, point a) du RGPD) : pour l&apos;e-mail de
          contact facultatif de la section 2.7 ; tu peux le retirer à tout moment dans l&apos;app.
        </li>
        <li>
          <strong>Intérêt légitime</strong> (art. 6, par. 1, point f) du RGPD) : sécurité de base
          du site et réponse aux demandes que tu nous envoies par le formulaire de contact ou par
          e-mail. Statistiques du site : ton consentement là où notre politique relative aux
          cookies le demande (dans l&apos;EEE, au Royaume-Uni et en Suisse, ou quand nous ne
          pouvons pas savoir où tu es) et, ailleurs, notre intérêt légitime à comprendre comment le
          site est utilisé.
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
          décrit plus haut. Si tu utilises Dulce Pro et que tu acceptes l&apos;historique de
          courbe enregistré, ton historique de glycémie, et ton journal tant que tu le partages
          avec ta famille, sont aussi stockés sur le relais (section 2.6).
        </li>
        <li>
          Quand ton CGM est connecté, le relais traite les mesures récentes nécessaires aux
          fonctions en arrière-plan et de partage que tu utilises. Il conserve une courte
          fenêtre glissante et, uniquement pour les abonnés Dulce Pro qui l&apos;acceptent,
          l&apos;historique de courbe enregistré décrit en 2.6.
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
          Supprimer le compte. Exception : tant que Dulce continue de collecter l&apos;historique
          de ta courbe après ta déconnexion ou la suppression de l&apos;app (section 2.6),
          l&apos;identifiant du capteur nécessaire pour cela (jeton de session LibreLinkUp, jeton
          du site Nightscout, jetons de connexion Medtronic CareLink ou mot de passe Dexcom
          chiffré) n&apos;est conservé que pour cela et supprimé quand la collecte prend fin, au
          plus tard après 1 an.
        </li>
        <li>
          <strong>Historique de courbe enregistré et journal partagé (Dulce Pro) :</strong> tant
          que ton abonnement est actif, au maximum environ 1 an, les jours plus anciens étant
          supprimés automatiquement. Supprimés immédiatement quand tu désactives l&apos;enregistrement,
          que tu choisis « Arrêter et supprimer » à la déconnexion ou que tu utilises « Supprimer le
          compte » (le journal partagé aussi quand tu désactives son partage) ; supprimés 90 jours
          après la fin ou le remboursement de ton abonnement.
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
          <strong>E-mail de contact :</strong> jusqu&apos;à ce que tu le retires dans l&apos;app,
          que tu utilises « Supprimer le compte » ou que tu nous demandes de le supprimer
          (section 2.7).
        </li>
        <li>
          <strong>Sauvegardes :</strong> les données supprimées du relais peuvent rester jusqu&apos;à
          30 jours dans les sauvegardes automatiques de la base de données de notre hébergeur,
          puis sont écrasées. Nous n&apos;utilisons ces sauvegardes que pour nous remettre
          d&apos;une panne.
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
        compte en vertu d&apos;un contrat ; Abbott, Dexcom, Medtronic, Apple et Google fournissent aussi leurs
        propres services selon leurs conditions et politiques de confidentialité :
      </p>
      <ul>
        <li>
          <strong>Cloudflare</strong> : héberge le relais Dulce décrit plus haut et stocke
          l&apos;historique de courbe enregistré et le journal partagé (section 2.6) ainsi que
          l&apos;e-mail de contact facultatif (section 2.7), en tant que notre sous-traitant.
        </li>
        <li>
          <strong>Apple</strong> : notifications (APNs), Activités en direct, Apple Santé (sur
          l&apos;appareil), paiements et, si tu utilises le trousseau iCloud, conservation de ta
          clé d&apos;historique dans ton propre trousseau iCloud (section 2.6).
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
          <strong>Meta (Meta Platforms Ireland Ltd.)</strong> : uniquement si tu autorises la
          mesure publicitaire dans l&apos;app (section 2.2.2).
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
        <li>
          <strong>Medtronic (CareLink)</strong> : si tu connectes CareLink, ton appareil et notre relais se connectent au service de Medtronic avec des jetons de connexion pour récupérer tes mesures. Les règles de confidentialité de Medtronic s’appliquent à ce service.
        </li>
        <li>
          <strong>Nightscout</strong> : si tu connectes Nightscout, ton appareil et notre relais récupèrent les mesures depuis le site que tu gères ou choisis. Son hébergeur en est responsable.
        </li>
      </ul>
      <p>
        Nous ne vendons, ne louons et ne cédons jamais tes données à des tiers à des fins
        publicitaires ou commerciales. Le seul partage lié à la publicité est la mesure
        publicitaire facultative de la section 2.2.2, qui reste désactivée sauf si tu l&apos;autorises.
      </p>

      <h2 id="transfers">8. Transferts internationaux</h2>
      <p>
        Certains fournisseurs et services que nous utilisons (Cloudflare, RevenueCat, Resend,
        Vercel, Meta, Apple et Google) peuvent traiter des données aux États-Unis ou dans d&apos;autres
        pays. Lorsque le RGPD exige des garanties de transfert, le mécanisme applicable dépend du
        fournisseur et du service ; il peut s&apos;agir d&apos;une décision d&apos;adéquation ou des
        clauses contractuelles types de la Commission européenne. Google LLC figure comme actif
        dans le Data Privacy Framework UE-États-Unis, dans les limites de sa certification.
        Contacte-nous pour connaître les détails et obtenir une copie des garanties applicables :{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
      <p>
        L&apos;historique de courbe enregistré et les entrées du journal partagé sont stockés dans
        une base de données de notre hébergeur Cloudflare, qui peut traiter des données dans
        l&apos;UE et dans d&apos;autres pays avec les garanties décrites plus haut.
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
        données locales et les données actives du relais, y compris ton historique de courbe
        enregistré et ton journal partagé ; cela retire aussi la clé d&apos;historique de Dulce de
        ton trousseau iCloud : Dulce sur tes autres iPhone repart alors d&apos;un nouvel
        historique. Tu peux aussi désactiver l&apos;historique de courbe enregistré dans les
        Réglages, ce qui supprime immédiatement la copie enregistrée, et désactiver séparément le
        partage du journal, ce qui supprime la copie du journal partagé. L&apos;app n&apos;a pas
        de bouton d&apos;export de l&apos;historique enregistré ; écris-nous et nous t&apos;enverrons
        une copie dans un format électronique courant (par exemple CSV). Le marqueur minimal
        d&apos;installation décrit plus haut reste jusqu&apos;à ce que tu demandes son effacement.
        Tu peux exercer chacun de ces droits en écrivant à{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>. Comme Dulce n&apos;a pas
        de comptes, indique ton ID de support (dans l&apos;app : Réglages › Compte › ID de
        support) ou l&apos;e-mail de contact que tu as enregistré, si tu les as ; sinon, nous te
        demanderons d&apos;autres informations qui nous permettent de retrouver tes données, et
        nous ne pouvons agir que sur des données que nous pouvons identifier. Nous répondons dans
        un délai d&apos;un mois. Pour une demande complexe ou de nombreuses demandes, le RGPD permet
        une prolongation maximale de deux mois supplémentaires ; nous t&apos;en informerons au
        cours du premier mois.
      </p>
      <p>
        Si un utilisateur de Dulce est décédé, un proche ou un héritier peut nous demander de
        supprimer ses données et d&apos;arrêter toute collecte de son historique ; nous demanderons
        une preuve raisonnable.
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
        Dulce ne s&apos;adresse pas aux enfants de moins de 14 ans. Sur Android, Dulce est destiné aux adultes de 18 ans et plus. Un parent ou un représentant
        légal peut utiliser Dulce pour suivre la glycémie d&apos;un mineur sous sa propre
        responsabilité ; dans ce cas, le parent ou le représentant légal donne ou refuse le
        consentement à l&apos;historique de courbe enregistré et au partage du journal. Si tu as entre
        14 et 18 ans, tu as besoin du consentement de tes parents ou de ton représentant légal pour
        utiliser Dulce (conditions d&apos;utilisation, section 4), ce qui inclut l&apos;historique de
        courbe enregistré, le partage du journal et l&apos;e-mail de contact. Si tu penses qu&apos;un mineur dont tu as la charge nous a fourni des
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
        En cas de changement important, nous te prévenons avant qu&apos;il s&apos;applique : dans
        l&apos;app (dans la note « Nouveautés » de la mise à jour qui l&apos;apporte et dans un
        avis qui renvoie vers cette page) et, si tu as enregistré un e-mail de contact, par
        e-mail. Cette page indique la date de la version actuelle, un bref résumé de ce qui change
        et un lien vers la version précédente. Quand un changement nécessite ton consentement, par
        exemple un nouvel usage de tes données de santé, l&apos;app te le demande d&apos;abord et
        rien de nouveau ne se passe tant que tu n&apos;as pas répondu ; les versions de l&apos;app
        qui ne le demandent pas continuent de fonctionner comme avant. Les changements de
        l&apos;historique de courbe enregistré qui te retirent quelque chose sont annoncés dans
        l&apos;app au moins 30 jours à l&apos;avance (conditions d&apos;utilisation, sections 8.1
        et 15).
      </p>

      <h2 id="contact">13. Contact</h2>
      <p>
        Pour toute question sur cette politique ou sur le traitement de tes données, écris à{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
