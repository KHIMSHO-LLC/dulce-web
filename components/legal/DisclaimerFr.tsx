{/* Translation of DisclaimerEs/DisclaimerEn; the Spanish version prevails. TODO: legal review. */}
export function DisclaimerFr() {
  return (
    <>
      <p>
        Cet avertissement médical explique les limites de ce que Dulce peut faire pour toi. Lis-le
        attentivement : utiliser l&apos;app signifie que tu comprends et acceptes tout ce qui est
        décrit ici.
      </p>

      <blockquote>
        <p>
          Dulce <strong>n&apos;est pas un dispositif médical</strong>. Il n&apos;est pas destiné à
          diagnostiquer, traiter, guérir ou prévenir une maladie, ni à prendre des décisions de
          traitement. Il ne remplace ni ton lecteur de glycémie, ni ton système de mesure en continu
          (CGM), ni le jugement de ton équipe soignante.
        </p>
      </blockquote>

      <h2 id="what-it-is">1. Ce que Dulce est, et ce qu&apos;il n&apos;est pas</h2>
      <p>
        Dulce est une app d&apos;accompagnement qui <strong>affiche</strong> les mesures de glycémie
        que ton système de surveillance produit déjà (LibreLinkUp d&apos;Abbott ou Dexcom Share).
        Son rôle est de présenter ces informations de façon pratique et lisible. Dulce ne mesure
        pas la glycémie, ne fabrique pas de capteurs et ne pilote aucun dispositif médical.
      </p>
      <p>
        La source officielle et de référence de tes données reste toujours l&apos;app du fabricant
        de ton capteur et les alertes de sécurité de ce système. Si Dulce et l&apos;app du fabricant
        affichent des choses différentes, <strong>l&apos;app du fabricant fait foi</strong>.
      </p>

      <h2 id="no-decisions">2. Ne prends pas de décisions médicales sur la seule base de Dulce</h2>
      <p>
        N&apos;ajuste pas ton insuline, tes médicaments, ton alimentation ou ton activité physique
        uniquement d&apos;après ce que tu vois dans Dulce. Toute décision sur ton traitement doit
        suivre les indications de ton médecin ou de ton équipe soignante et utiliser les outils
        qui t&apos;ont été prescrits.
      </p>

      <h2 id="confirm">3. Confirme toujours par une glycémie capillaire</h2>
      <p>
        Avant d&apos;agir sur une valeur haute ou basse, et surtout quand ce que tu vois ne
        correspond pas à ce que tu ressens, vérifie ta glycémie au <strong>bout du doigt</strong>{" "}
        (lecteur de glycémie). Les valeurs affichées dans Dulce viennent d&apos;un capteur
        interstitiel et peuvent différer de ta glycémie sanguine réelle, en particulier quand elle
        change vite.
      </p>

      <h2 id="alerts">4. Les alertes ne sont pas garanties</h2>
      <p>
        Dulce n&apos;est pas un système d&apos;alarme de sécurité. Les notifications peuvent être
        retardées ou ne pas arriver pour des raisons qui ne dépendent pas de nous : téléphone
        éteint, en silencieux, sans batterie ou hors ligne ; autorisations de notification
        désactivées ; système d&apos;exploitation qui limite l&apos;app en arrière-plan ; ou panne
        chez ton fournisseur de CGM.{" "}
        <strong>Ne compte pas sur Dulce pour te prévenir d&apos;une hypo ou d&apos;une hyper.</strong>{" "}
        Garde activées les alarmes de ton système CGM officiel.
      </p>

      <h2 id="accuracy">5. Exactitude et délai des données</h2>
      <p>
        Les données peuvent apparaître en retard, incomplètes ou périmées à cause de la latence du
        réseau, des intervalles de synchronisation ou de l&apos;état des serveurs tiers. Quand une
        mesure est ancienne, Dulce essaie de l&apos;indiquer, mais aucun horodatage ne remplace une
        vérification directe. Considère chaque valeur comme une indication, pas comme une mesure
        clinique en temps réel.
      </p>

      <h2 id="no-predictions">6. Prévisions indicatives, pas de calcul de doses</h2>
      <p>
        Dulce ne calcule pas de doses d&apos;insuline ou de glucides et ne donne pas de conseils
        cliniques. L&apos;alerte facultative d&apos;hypo prévue se contente d&apos;extrapoler la
        vitesse de variation de tes dernières mesures : elle est indicative, peut se tromper et ne
        remplace ni les alarmes de ton système CGM ni une glycémie capillaire.
      </p>

      <h2 id="emergencies">7. Urgences</h2>
      <p>
        Dulce ne gère pas les urgences. Si tu soupçonnes une hypo ou une hyper sévère, ou face à
        toute urgence médicale, suis ton plan de traitement et contacte les secours (
        <strong>112</strong> dans l&apos;UE, <strong>15</strong> en France, <strong>911</strong>{" "}
        aux États-Unis) ou ton professionnel de santé.
      </p>

      <h2 id="healthcare-team">8. Parles-en à ton équipe soignante</h2>
      <p>
        Les informations de cette app sont fournies à titre d&apos;information générale et ne
        constituent pas un avis médical. Parle à ton médecin ou à ton éducateur en diabétologie
        avant de modifier quoi que ce soit dans ton traitement et pour toute question sur ta
        santé.
      </p>

      <h2 id="third-parties">9. Données de services tiers</h2>
      <p>
        Dulce dépend de services tiers (Abbott / LibreLinkUp, Dexcom Share, Apple Santé) pour
        obtenir tes données. Nous ne contrôlons pas la disponibilité, l&apos;exactitude ni la
        continuité de ces services, et nous ne sommes pas responsables des pannes ou erreurs qui en
        proviennent.
      </p>

      <h2 id="acceptance">10. Acceptation</h2>
      <p>
        En utilisant Dulce, tu confirmes avoir lu et compris cet avertissement médical et assumer
        la responsabilité de gérer ton diabète avec des outils autorisés et l&apos;aide de ton
        équipe soignante. Si tu n&apos;es pas d&apos;accord, n&apos;utilise pas l&apos;app.
      </p>
      <p>
        Pour toute question sur cet avertissement, écris-nous à{" "}
        <a href="mailto:hola@dulceglucosa.com">hola@dulceglucosa.com</a>.
      </p>
    </>
  );
}
