# Keyword list review (2026-10-31)

Giorgi supplied ~1,000 keywords (100 English, 100 each in it/fr/de/nl/da/no/pl, a "Belgian" fr/nl mix, pt).
They were generated, not measured. Each cluster was checked against Google autocomplete in its own market
(hl/gl per country; English for US and Canada). Autocomplete only lists queries people actually type, so a
phrase with no suggestions has little or no demand.

## What people actually search (autocomplete, Oct 2026)

| Cluster | Real queries | Markets | Page |
| --- | --- | --- | --- |
| Dexcom on iPhone/watch | dexcom widget iphone, dexcom widget not updating, dexcom g7 widget iphone lock screen, dexcom g7 apple watch (complication, without phone, se 3), dexcom carplay, dexcom widget apple carplay | US, CA, and in English in every EU market | `dexcom` (expanded 2026-10-31) |
| Libre on watch/widget | freestyle libre apple watch (app, complication, without phone, se, ultra), libre 3 plus apple watch, libre 3 (plus) widget iphone | all | `apple-watch`, `widgets` |
| LibreLinkUp | librelinkup login / not working / app not receiving data / no recent data / apple watch / smartwatch / follower account | all (mostly English) | `librelinkup-not-working`, `/setup` |
| "Can Apple Watch measure blood sugar" | blood sugar apple watch 11 / ultra 3, blutzucker apple watch 9/11, blutzucker messen apple watch, bloedsuiker meten apple watch, måle blodsukker apple watch, medir glicemia apple watch, misurazione glicemia apple watch | all | **none yet** (queued) |
| Glucose app | app glicemia iphone / gratis, application glycémie iphone, blutzucker app kostenlos deutsch, blood sugar widget iphone | it, fr, de, US | home, `logbook`, `glucose-apps-compared` |
| Charts / units | blood sugar chart (by age, mmol/l, canada, canada vs us), a1c chart canada, mmol to mg/dl chart; bloedsuiker waarden, blodsukker værdier/verdier, normy cukru, valores glicemia | all | `blood-sugar-levels`, converter, A1C calculator |
| Competitors | sugarmate (widget, apple watch, glance), sweet dreams app (carplay, apple watch), dexcom follow widget iphone | US, CA | `dexcom-follow-alternative`, `glucose-apps-compared` |

## What nobody searches (no autocomplete in any market)

Lock-screen and follower phrasings ("cgm lock screen", "glucose live activity", "cgm follower", "glicemia schermata di
blocco", "blutzucker sperrbildschirm", "blutzucker teilen", "partager glycémie", "condividere glicemia", "bloedsuiker
delen"), all the usability phrases ("clean cgm app no clutter", "glucos easier handling", "cgm ohne werbung"),
battery/no-lag/privacy phrasings, brand typos ("dulche glucosa"). The features are real and the pages already
describe them in plain words; pages or keyword lists built for these phrases would be thin or stuffed, which
Google's spam policies (keyword stuffing, doorway pages, scaled content) penalize. Google corrects typos itself.

## Not usable

- Android / Wear OS / APK phrases: Android isn't released and the owner asked for nothing about Android on the site.
- "free watch complication": the watch is Dulce Pro. "Bluetooth connection": Dulce reads the cloud, not the sensor.

## Done 2026-10-31

- `dexcom`: new sections "A Dexcom widget for your iPhone" and "Dexcom on Apple Watch" (watches, SE/Ultra, iPhone
  not nearby), an old-number troubleshooting bullet, 2 FAQs, English title now leads with "Dexcom widget". 5 languages.
  Facts checked in code: watch target watchOS 11 (`targets/DulceWatch/expo-target.config.js`), relay pushes each
  reading to the watch for Libre and Dexcom alike (`pushWatchUpdate`, `WatchAppDelegate`).
- `widgets`: FAQ "widget for Libre 3 Plus or Dexcom", 5 languages.
- `blood-sugar-levels`: Canada vs US (unit + Diabetes Canada's higher prediabetes cut-offs, source added) in English;
  units-by-country FAQ in all 5 languages.
- Keywords updated where they match measured queries; brand `alternateName` in Organization / WebSite /
  MobileApplication JSON-LD ("Dulce Glucosa", "Dulce Glucose", the App Store names).

## Open: new site languages (owner decision)

Dutch, Danish, Norwegian, Polish and Portuguese searchers type the product queries in English ("libre apple watch",
"dexcom apple watch widget", "librelinkup not receiving data"), which the English pages already serve. Local-language
demand is mainly charts ("bloedsuiker waarden", "blodsukker værdier", "normy cukru", "valores glicemia") and "can
Apple Watch measure blood sugar". The app itself has no nl/da/no/pl/pt UI (it falls back to English). If a new
language is added, Dutch first (Netherlands + Flanders): whole site, not a few keyword pages.
