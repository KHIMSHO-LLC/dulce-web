# Audience segments (2026-11-05)

Owner request: make it clear on the site and in the App Store that Dulce fits children and parents with T1D, older adults,
workers tired of opening an app, the newly diagnosed, and LADA and other types. Read this before changing the hub, the
segment guides or the store listing.

## What was measured (not invented)

Google autocomplete per market + Search Console + App Store search hints and ranks, 2026-11-05.

| Segment | Real demand | Page |
| --- | --- | --- |
| LADA | Strong in all 5 markets: symptoms, treatment, diagnosis, vs MODY | `lada-diabetes` |
| Newly diagnosed | en "newly diagnosed type 1 diabetes adults/child", es "debut diabetes tipo 1 en adultos", fr "découverte à 40 ans", it "esordio", "esordio tardivo" | `newly-diagnosed` |
| Older adults | en "cgm for elderly", "best cgm for elderly", "cgm for seniors"; de/fr/it "diabetes im alter", "diabète personne âgée", "diabete anziani" | `older-adults-cgm` |
| Work | en rights and accommodations, de "arbeitgeber", "beruf", fr + it night work and shifts, es "ley" | `diabetes-at-work` |
| Parents / school | "type 1 diabetes child in school", "niños con diabetes en el colegio", "diabetes typ 1 kind schule", "cgm for kids" | `diabetes-at-school`, `child-glucose` |
| Type 2 | "cgm for type 2 diabetes (no insulin / on insulin)", de "sensor krankenkasse" | `type-2-cgm` |

**No demand on Google in any market:** "diabetes app for parents", "app for seniors", "app for type 1 parents", "diabetes app
for workers". That's why the guides answer what people actually search and bring Dulce in, rather than being "X app for Y"
pages (the doorway pages the plan already rejects).

App Store baseline, from the iTunes Search API, top 100 only, 2026-11-05 (compare 2-4 weeks after 1.0.7): US cgm 33, cgm app 35, cgm follow 32,
glucose tracker 63; not in top 100 for diabetes, type 1 diabetes, t1d, blood sugar, glucose widget. Spain hipoglucemia 3,
sensor glucosa 6, glucemia 38, glucosa 43. Germany zucker 23, glukose 24, blutzucker 28. France glycémie 53, diabète type 1 59.
Italy diabete tipo 1 21, glicemia 39. In the App Store "lada" is mostly car apps: LADA is a web segment first.

## Rules for the App Store (hard)

- **Guidelines 2.3.8 and 5.1.4:** "For Kids" and "For Children" are reserved for the Kids Category, and an app outside it can't
  imply in its name, subtitle, icon, screenshots or description that children are the main audience. So the listing talks to
  **parents and caregivers** and never says the app is for children. The website may be direct; the hub still says the adult uses it.
- Our own Terms: minimum age 14, consent from 14 to 18, under 14 a parent follows under their own responsibility. Copy must match.
- No sensor brands in name, subtitle, keywords, description or screenshots (owner rule).
- Show, view, share, log. Never manage, treat, control or dose (guideline 1.4.1, and it keeps Dulce out of a medical purpose claim).

## Listing in the 1.0.7 draft (saved in App Store Connect, not submitted)

| Localization | Subtitle | Keywords |
| --- | --- | --- |
| en-US | Diabetes CGM Widget & Family | blood,sugar,monitor,tracker,t1d,t2d,type,1,2,lada,parent,caregiver,senior,follow,alert,watch,a1c |
| en-GB (new) | Type 1 CGM, Watch & Carers | diabetes,blood,sugar,t1d,t2d,lada,sensor,widget,family,parent,follow,share,alarm,hypo,hba1c,tracker |
| es-ES | Diabetes MCG: widget y familia | sensor,glucemia,azucar,sangre,hipoglucemia,tipo,1,2,lada,padres,hijo,mayores,cuidador,seguir,reloj |
| es-MX (new) | Diabetes: reloj y familia | azucar,sangre,glucemia,sensor,monitor,mcg,hipoglucemia,tipo,1,2,padres,hijos,adulto,mayor,cuidador |
| de-DE | Diabetes CGM: Widget & Familie | zucker,glukose,sensor,typ,1,2,lada,eltern,kind,senioren,teilen,folgen,alarm,uhr,tagebuch,hba1c,werte |
| fr-FR | Diabète : capteur et famille | cgm,widget,sucre,glucose,hypo,type,1,2,lada,parent,enfant,senior,aidant,partage,carnet,hba1c,montre |
| fr-CA (new) | Diabète : capteur et proches | glucose,sucre,sang,moniteur,hypo,type,1,2,lada,parent,aidant,aine,widget,alarme,montre,suivi,carnet |
| it | Diabete: sensore e famiglia | cgm,widget,zucchero,glucosio,ipo,tipo,1,2,lada,genitori,figlio,anziani,caregiver,avviso,diario,hba1c |

Every description got a "Who Dulce is for" block and every localization a segment promo text. Names are unchanged.

Why it changed: the 1.0.6 `en-US` keywords were in Spanish and the `es-ES` ones in English, so the US store had no "blood",
"sugar", "t1d" or "type". Spain's ranks for hipoglucemia and sensor glucosa seem to come from those Spanish words in en-US (Spain falls
back to it with no en-GB), so they moved to es-ES and en-GB now fills the English slot for Europe. **Check Spain first after release;
if hipoglucemia or sensor glucosa drop, that's the reason.** Which storefront reads which localization comes from ASO sources, not
from a rank test of ours.

## Next (needs the owner or new assets)

1. Custom product pages per segment with their own keywords: Family exists in `app-store-assets/family`; Older adults and Work need
   new screenshots. No "for kids" wording there either. Vendor reports say screenshot captions now count for search; Apple
   hasn't confirmed it, so write captions for people first.
2. nl, sv, da, no, fi, ru listings: the app speaks them, the listing doesn't. Each is a free set of keyword slots.
3. Medical reviewer for the 6 guides (see the plan, For Giorgi item 3). LADA, type 2 and older adults are health pages.
