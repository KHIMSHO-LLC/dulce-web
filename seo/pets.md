# Pets: dogs and cats with diabetes (2026-11-06)

Owner request: SEO and ASO for pet support. Pet mode ("Who is Dulce for?" → "A pet", Settings › Targets & units) ships
in dulce-app **1.0.7**: vet's target range (low 40-200, high up to 500 mg/dL), editable line colours, editable
critical-low level (40-90), alerts from 40 mg/dL. Free; Live Activity, watch and family following stay Pro.

## Demand (measured 2026-11-06, not invented)

Google autocomplete: "libre sensor dog/pets", "freestyle libre sensor dog", "libre 2/3 sensor on dog", "cgm for dogs",
"best cgm for dogs", "cgm for dogs and cats", "dog glucose monitor libre", "freestyle libre cat"; es "sensor glucosa
perro", "sensor de glucosa para perros precio"; de "libre sensor hund", "freestyle libre 3 sensor hund". Diet, symptom
and treatment queries ("perro diabetico que puede comer", "diabetes katze symptome") are vet topics: not ours.

App Store (iTunes Search API): "diabetic dog", "pet diabetes", "cat diabetes", "perro diabetico", "diabetes hund" return
small single-purpose pet diabetes journals with 0-14 ratings. Weak competition, so pet words are worth keyword slots.

## Website (live since 2026-11-06, owner pushed ahead of 1.0.7)

- Guide `pet-glucose` in es/en/de/fr/it (`/blog/cgm-for-dogs-and-cats`), 4 peer-reviewed vet sources, FAQ JSON-LD.
- "Dogs and cats with diabetes" card + FAQ on the Who is Dulce for hub (10 languages), llms.txt line, link from the
  family sharing guide, listed under the glucose converter's guides.
- Published ahead of the 1.0.7 release on the owner's go-ahead.

## Rules for pet copy (web and store)

- Glucose sensors are approved for people: always say use in animals is **off-label** and the ranges are **the vet's**.
- Studies: Libre 2 and 3 **overestimate marked lows in cats** (< ~55-60 mg/dL): low readings are checked with a meter.
- Dulce never suggests a range for an animal and never gives insulin or feeding advice.
- Store: still no sensor brand names (owner rule), no "veterinary device" claim, show/see/alert only (guideline 1.4.1).

## App Store, for 1.0.8 (1.0.7 is WAITING_FOR_REVIEW, so its keywords and description are locked)

Keywords: "lada" goes everywhere (in the App Store it finds car apps, see segments.md; the web guide keeps LADA).
Byte counts measured; the name and subtitle are unchanged.

| Localization | Keywords | Bytes |
| --- | --- | --- |
| en-US | blood,sugar,monitor,tracker,t1d,t2d,type,1,2,parent,caregiver,senior,follow,alert,watch,pet,dog,cat | 99 |
| en-GB | diabetes,blood,sugar,t1d,t2d,sensor,widget,family,parent,follow,share,alarm,hypo,tracker,pet,dog,cat | 100 |
| es-ES | sensor,glucemia,azucar,sangre,hipoglucemia,tipo,1,2,padres,mayores,cuidador,reloj,mascota,perro,gato | 100 |
| es-MX | azucar,sangre,glucemia,sensor,hipoglucemia,tipo,1,2,padres,hijos,mayor,cuidador,mascota,perro,gato | 98 |
| de-DE | zucker,glukose,sensor,typ,1,2,eltern,kind,senioren,teilen,folgen,alarm,uhr,tagebuch,hund,katze,tier | 99 |
| fr-FR | cgm,widget,sucre,glucose,hypo,type,1,2,parent,senior,aidant,partage,carnet,montre,chien,chat,animal | 99 |
| fr-CA | glucose,sucre,sang,moniteur,hypo,type,1,2,parent,aidant,widget,alarme,montre,suivi,chien,chat,animal | 100 |
| it | cgm,widget,zucchero,glucosio,ipo,tipo,1,2,genitori,figlio,anziani,avviso,diario,cane,gatto,animale | 98 |

Dropped besides "lada": en-US a1c; en-GB hba1c; es-ES seguir, hijo; es-MX mcg, adulto, monitor; de-DE werte, hba1c;
fr-FR hba1c, enfant (also safer under 2.3.8); fr-CA aine, carnet; it hba1c, caregiver. Check Spain's
hipoglucemia/sensor glucosa ranks after 1.0.7 before changing es-ES again.

Description block, added after "Who Dulce is for" in each localization:

- en: **For pets.** If your vet puts a glucose sensor on your dog or cat, pet mode lets you enter your vet's target
  range, line colours and critical-low level, and the whole family can follow. Glucose sensors are approved for people,
  so use in animals is off-label: follow your vet and check low readings with a meter.
- es: **Para mascotas.** Si tu veterinario pone un sensor de glucosa a tu perro o gato, el modo mascota te deja poner
  su rango, los colores de la línea y el nivel de bajada crítica, y toda la familia puede seguirlo. Los sensores están
  aprobados para personas, así que en animales es un uso fuera de indicación: sigue a tu veterinario y comprueba las
  lecturas bajas con un glucómetro.
- de: **Für Haustiere.** Setzt deine Tierarztpraxis deinem Hund oder deiner Katze einen Glukosesensor, trägst du im
  Haustiermodus Zielbereich, Linienfarben und Kritisch-niedrig-Grenze der Praxis ein, und die ganze Familie kann
  folgen. Glukosesensoren sind für Menschen zugelassen, beim Tier ist das Off-Label: Folge deiner Praxis und prüfe tiefe
  Werte mit einem Messgerät.
- fr: **Pour les animaux.** Si ton vétérinaire pose un capteur de glycémie à ton chien ou ton chat, le mode animal te
  permet de saisir sa plage, les couleurs de la courbe et le seuil d'hypo critique, et toute la famille peut suivre. Les
  capteurs sont autorisés pour les personnes, chez l'animal c'est hors indication : suis ton vétérinaire et vérifie les
  valeurs basses au lecteur.
- it: **Per gli animali.** Se il veterinario applica un sensore della glicemia al tuo cane o gatto, la modalità animale
  ti fa inserire il suo intervallo, i colori della linea e la soglia ipo critica, e tutta la famiglia può seguire. I
  sensori sono approvati per le persone, sugli animali è un uso off-label: segui il veterinario e controlla le letture
  basse con un glucometro.

Promotional text (≤ 170 characters, can change any time, also on a live version). Optional once 1.0.7 is live:

- en (167): New: pet mode. If your vet uses a glucose sensor on your dog or cat, set your vet's ranges and see their glucose on your Lock Screen, with alerts for the whole family.
- es (168): Nuevo: modo mascota. Si tu veterinario usa un sensor de glucosa en tu perro o gato, pon sus rangos y ve su glucosa en la pantalla de bloqueo, con avisos para la familia.
- de (159): Neu: Haustiermodus. Nutzt deine Tierarztpraxis einen Glukosesensor bei Hund oder Katze, trägst du ihre Werte ein und siehst den Zucker auf dem Sperrbildschirm.
- fr (155): Nouveau : mode animal. Si ton vétérinaire pose un capteur de glycémie à ton chien ou ton chat, règle ses plages et vois sa glycémie sur l'écran verrouillé.
- it (167): Novità: modalità animale. Se il veterinario usa un sensore della glicemia sul tuo cane o gatto, imposta i suoi intervalli e vedi la glicemia sulla schermata di blocco.

Later: a "Pets" custom product page with its own screenshots (pet mode page, a chart with vet ranges), linked from the
web guide's App Store button.
