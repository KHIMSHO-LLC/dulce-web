# App Store metadata (draft 2026-10-22)

Paste into App Store Connect → the app → the next version → each localization. Subtitle and keywords only change
with a new app version; promotional text can change any time. Limits (Apple): name 30 chars, subtitle 30 chars,
keywords 100 bytes (comma-separated, no spaces), promotional text 170 chars. Every string below was measured.

## Rules this follows (why it differs from the external brief)

- **Only released features.** No Dexcom (not released; claiming it risks rejection under guideline 2.3.1 and
  misleads users). No "chat" or "coordinate insulin": followers send short messages and the wearer replies "I'm OK".
- **No trademarks in keywords** (guideline 2.3.7): no "apple", "dexcom", "libre", "freestyle". Saying the app
  works with FreeStyle Libre in the description and promotional text is fine; putting the brand in the keyword
  field is what gets flagged.
- **No repeated words.** Apple indexes name + subtitle + keywords together, so a word used in the name or subtitle
  is wasted in the keyword field. The keyword lists assume the name already contains "Glucose" (en) /
  "Glucosa" (es) / "Blutzucker" (de); if not, see "Name" below.
- **Singular is enough**, no spaces after commas, no "app", no "free" (Apple ignores them or they waste bytes).
- The US store also indexes the **Spanish (Mexico)** localization (per common ASO-tool findings), so es-MX uses
  different words from es-ES to cover more searches.

## Name (optional, owner decision)

This is a brand decision, so it's yours. If the current name is just "Dulce",
these fit in 30 chars: en `Dulce: Glucose Tracker` (22), es `Dulce: Control de Glucosa` (25),
de `Dulce: Blutzucker App` (21). If you keep the current name, keep the keyword lists below anyway.

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

- Subtitle (30): `Tu glucosa en pantalla y reloj`
- Keywords (94 bytes): `azucar,diabetes,sensor,widget,bloqueo,familia,compartir,hijo,alarma,diario,hba1c,tipo1,niveles`
- Promotional text (155): `Ve la glucosa de tu FreeStyle Libre en la pantalla de bloqueo, el Apple Watch y los widgets, y deja que hasta 3 familiares te sigan con sus propios avisos.`
- Description, first lines:
  > La glucosa de tu FreeStyle Libre 2 o Libre 3, en directo en la pantalla de bloqueo del iPhone, la Dynamic
  > Island, los widgets y el Apple Watch, sin abrir ninguna app. Hecha por alguien que vive con diabetes tipo 1.
  >
  > Para la familia: invita hasta 3 personas. Padres, parejas y cuidadores ven tu glucosa en tiempo real en su
  > iPhone, reciben sus propios avisos de bajadas y subidas, y pueden mandarte un "¿Estás bien?" que respondes
  > con un toque.

## Spanish (Mexico)

- Subtitle (27): `Glucosa en pantalla y reloj`
- Keywords (92 bytes): `azucar,niveles,monitor,control,hijos,cuidador,alerta,diabetes,tipo1,widget,familia,compartir`
- Promotional text and description: same as Spanish (Spain); change "móvil" to "celular" if it appears.

## German

- Subtitle (30): `Blutzucker auf Sperrbildschirm`
- Keywords (96 bytes): `zucker,diabetes,sensor,cgm,widget,uhr,familie,teilen,kind,eltern,alarm,tagebuch,hba1c,typ1,werte`
- Promotional text (156): `Sieh deinen FreeStyle Libre Wert auf dem Sperrbildschirm, der Apple Watch und in Widgets, und lass bis zu 3 Familienmitglieder mit eigenen Warnungen folgen.`
- Description, first lines:
  > Dein FreeStyle Libre 2 oder Libre 3 Wert live auf dem iPhone-Sperrbildschirm, in der Dynamic Island, in
  > Widgets und auf der Apple Watch, ohne eine App zu öffnen. Entwickelt von jemandem, der mit Typ-1-Diabetes lebt.
  >
  > Für die Familie: Lade bis zu 3 Personen ein. Eltern, Partner und Angehörige sehen deinen Zucker in Echtzeit
  > auf ihrem iPhone, bekommen eigene Warnungen und können dir ein kurzes „Geht es dir gut?“ schicken, das du mit
  > einem Tipp beantwortest.

## After it ships

Check App Store Connect → App Analytics → Sources and the search terms report after 2-4 weeks. Swap keywords that
bring no impressions for new ones from `seo/keyword-volumes.md` and `seo/gaps.json`, one change per release so the
effect is measurable. Log what changed in `seo/log.md`.
