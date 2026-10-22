# App Store metadata (draft, updated 2026-10-22)

Paste into App Store Connect → the app → the next version → each localization. Name, subtitle and keywords only
change with a new app version; promotional text can change any time. Limits (Apple): name 30 chars, subtitle 30
chars, keywords 100 bytes (comma-separated, no spaces), promotional text 170 chars. Every string below was measured.

Current listing: **Dulce: Glucose at a Glance** (id 6770694596). The app itself speaks es-ES, es-MX, en, de, ka and,
from the release that carries dulce-app PR "feat(i18n): French and Italian", fr and it. Add the French and Italian
localizations in App Store Connect with that release, not before (the listing must match the app's languages).

## Rules this follows (why it differs from the external briefs)

- **Only released features.** No Dexcom until it ships (guideline 2.3.1, and it misleads users). No "chat" or
  "coordinate insulin": followers send short messages and the wearer replies "I'm OK".
- **No trademarks in keywords** (guideline 2.3.7): no "apple", "dexcom", "libre", "freestyle". Saying the app
  works with FreeStyle Libre in the description and promotional text is fine.
- **No repeated words.** Apple indexes name + subtitle + keywords together, so a word already in the name or
  subtitle is wasted in the keyword field. Each list below avoids its own localization's name and subtitle.
- **Singular is enough**, no spaces after commas, no "app", no "free".
- Storefronts index more than one localization (per common ASO-tool findings): the US store also reads
  **Spanish (Mexico)**, Canada reads **French (Canada)**. So es-MX uses different words from en-US.

## Names per localization (owner decision)

Keep `Dulce: Glucose at a Glance` for English. For the other localizations a translated name ranks for local
searches ("glucosa", "Blutzucker", "glycémie", "glicemia"); suggested (all ≤ 30 chars):

| Localization | Name | Chars |
| --- | --- | --- |
| English (U.S., U.K.) | Dulce: Glucose at a Glance | 26 |
| Spanish (Spain), Spanish (Mexico) | Dulce: Glucosa de un vistazo | 28 |
| German | Dulce: Blutzucker im Blick | 26 |
| French (France, Canada) | Dulce : Glycémie en direct | 26 |
| Italian | Dulce: Glicemia sott'occhio | 27 |

If you keep the English name everywhere, the keyword lists still work; just don't add "glucose" to them.

## English (U.S.) and English (U.K.)

- Subtitle (26): `CGM on Lock Screen & Watch`
- Keywords (96 bytes): `blood,sugar,diabetes,monitor,widget,family,share,follow,caregiver,parent,type1,t1d,log,a1c,alarm`
- Promotional text (145): `See your FreeStyle Libre glucose on your Lock Screen, Apple Watch and widgets, and let up to 3 family members follow along with their own alerts.`
- Description, first lines (what shows before "more"):
  > Your FreeStyle Libre 2 or Libre 3 glucose, live on your iPhone Lock Screen, Dynamic Island, widgets and Apple
  > Watch, without opening an app. Made by someone who lives with type 1 diabetes.
  >
  > For families: invite up to 3 people. Parents, partners and caregivers see your glucose in real time on their
  > own iPhone, get their own low and high alerts, and can send a quick "Are you OK?" you answer with one tap.

## Spanish (Spain)

- Subtitle (30): `En pantalla de bloqueo y reloj`
- Keywords (94 bytes): `azucar,diabetes,sensor,widget,familia,compartir,hijo,alarma,diario,hba1c,tipo1,niveles,control`
- Promotional text (155): `Ve la glucosa de tu FreeStyle Libre en la pantalla de bloqueo, el Apple Watch y los widgets, y deja que hasta 3 familiares te sigan con sus propios avisos.`
- Description, first lines:
  > La glucosa de tu FreeStyle Libre 2 o Libre 3, en directo en la pantalla de bloqueo del iPhone, la Dynamic
  > Island, los widgets y el Apple Watch, sin abrir ninguna app. Hecha por alguien que vive con diabetes tipo 1.
  >
  > Para la familia: invita hasta 3 personas. Padres, parejas y cuidadores ven tu glucosa en tiempo real en su
  > iPhone, reciben sus propios avisos de bajadas y subidas, y pueden mandarte un "¿Estás bien?" que respondes
  > con un toque.

## Spanish (Mexico)

- Subtitle (30): `En pantalla de bloqueo y reloj`
- Keywords (92 bytes): `azucar,niveles,monitor,hijos,cuidador,alerta,diabetes,tipo1,widget,familia,compartir,control`
- Promotional text and description: same as Spanish (Spain); write "celular" instead of "móvil" if it appears.

## German

- Subtitle (29): `Sperrbildschirm, Uhr, Familie`
- Keywords (92 bytes): `zucker,diabetes,sensor,cgm,widget,teilen,kind,eltern,alarm,tagebuch,hba1c,typ1,werte,glukose`
- Promotional text (156): `Sieh deinen FreeStyle Libre Wert auf dem Sperrbildschirm, der Apple Watch und in Widgets, und lass bis zu 3 Familienmitglieder mit eigenen Warnungen folgen.`
- Description, first lines:
  > Dein FreeStyle Libre 2 oder Libre 3 Wert live auf dem iPhone-Sperrbildschirm, in der Dynamic Island, in
  > Widgets und auf der Apple Watch, ohne eine App zu öffnen. Entwickelt von jemandem, der mit Typ-1-Diabetes lebt.
  >
  > Für die Familie: Lade bis zu 3 Personen ein. Eltern, Partner und Angehörige sehen deinen Zucker in Echtzeit
  > auf ihrem iPhone, bekommen eigene Warnungen und können dir ein kurzes „Geht es dir gut?“ schicken, das du mit
  > einem Tipp beantwortest.

## French (France) and French (Canada)

- Subtitle (26): `Écran verrouillé et montre`
- Keywords (99 bytes): `diabète,capteur,cgm,widget,sucre,hypo,hyper,famille,partage,enfant,alerte,carnet,hba1c,type1,suivi`
- Promotional text (150): `Vois ta glycémie FreeStyle Libre sur l'écran verrouillé, l'Apple Watch et en widget, et laisse jusqu'à 3 proches te suivre avec leurs propres alertes.`
- Description, first lines:
  > Ta glycémie FreeStyle Libre 2 ou Libre 3, en direct sur l'écran verrouillé de l'iPhone, la Dynamic Island,
  > les widgets et l'Apple Watch, sans ouvrir d'app. Créée par une personne qui vit avec un diabète de type 1.
  >
  > Pour la famille : invite jusqu'à 3 personnes. Parents, conjoints et aidants voient ta glycémie en temps réel
  > sur leur iPhone, reçoivent leurs propres alertes d'hypo et d'hyper, et peuvent t'envoyer un « Ça va ? » auquel
  > tu réponds d'un geste.

## Italian

- Subtitle (27): `Schermata di blocco e Watch`
- Keywords (96 bytes): `diabete,sensore,cgm,widget,zucchero,ipo,iper,famiglia,condividi,figlio,avviso,diario,hba1c,tipo1`
- Promotional text (149): `Vedi la glicemia del FreeStyle Libre sulla schermata di blocco, su Apple Watch e nei widget, e fatti seguire da fino a 3 familiari con i loro avvisi.`
- Description, first lines:
  > La glicemia del tuo FreeStyle Libre 2 o Libre 3, in tempo reale sulla schermata di blocco dell'iPhone, nella
  > Dynamic Island, nei widget e su Apple Watch, senza aprire nessuna app. Creata da chi vive con il diabete di
  > tipo 1.
  >
  > Per la famiglia: invita fino a 3 persone. Genitori, partner e caregiver vedono la tua glicemia in tempo reale
  > sul loro iPhone, ricevono i propri avvisi di ipo e iper e possono mandarti un «Tutto bene?» a cui rispondi con
  > un tocco.

## Screenshots (first three matter most)

1. Lock Screen with the Live Activity (the core promise), caption in the localization's language.
2. Apple Watch face with the complication.
3. A family member's phone getting an alert / the "I'm OK" reply.
Localize captions for es, de, fr, it; the site's `components/screens/strings.ts` already has matching UI text.

## After it ships

Check App Store Connect → App Analytics → Sources and the search terms report after 2-4 weeks. Swap keywords that
bring no impressions for new ones from `seo/keyword-volumes.md` and `seo/gaps.json`, one change per release so the
effect is measurable. Log what changed in `seo/log.md`.
