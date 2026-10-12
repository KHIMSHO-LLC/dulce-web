---
name: Dulce (web)
description: Warm-black night lit by one ember beam; a live 3D iPhone carried by scroll through every place the glucose number appears.
colors:
  ground: "#0d0c0b"
  glass: "#1d1916"
  line: "#2a2521"
  ink: "#f6f0ea"
  soft: "#cfc6bd"
  mute: "#aa9f94"
  ember: "#f36638"
  ember-hi: "#ff7d52"
  ember-deep: "#c2410c"
  ember-ink: "#1b0c06"
  range: "#66c45b"
  range-text: "#7fd970"
  high: "#f5a524"
  high-text: "#ffb638"
  low: "#e8262b"
  low-text: "#ff544c"
  ember-field-core: "#1a1310"
  wine-field-core: "#140c10"
  promise-paper: "#f3ece4"
typography:
  display:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.5rem, 6.4vw, 6.6rem)"
    fontWeight: 300
    lineHeight: 0.96
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 104"
  display-mega:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(3.4rem, 11vw, 12rem)"
    fontWeight: 300
    lineHeight: 0.96
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 104"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 4vw, 3.9rem)"
    fontWeight: 300
    lineHeight: 1.06
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 104"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 104"
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    fontVariation: "'wdth' 100"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
  caption:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
  numeral:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "4.2rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.015em"
    fontFeature: "tnum"
    fontVariation: "'wdth' 76"
  ios-ui:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Display, SF Pro Text, system-ui, sans-serif"
    fontSize: "12.5px"
    fontWeight: 600
rounded:
  pill: "999px"
  card: "28px"
  field: "16px"
  plate: "14px"
spacing:
  gutter-sm: "1.25rem"
  gutter-md: "2rem"
  gutter-lg: "2.75rem"
  container-max: "90rem"
  tile-gap: "16px"
  tile-pad: "28px"
  tile-pad-lg: "40px"
  section-y: "6rem"
  section-y-lg: "9rem"
  nav-clearance: "108px"
components:
  button-primary:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.ember-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0 20px 0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ember-hi}"
  button-secondary:
    backgroundColor: "rgba(255,255,255,0.04)"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  pill-nav:
    backgroundColor: "{colors.glass}"
    rounded: "{rounded.pill}"
    padding: "6px"
    height: "56px"
  glass-card:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "20px"
  field-tile:
    backgroundColor: "{colors.ember-field-core}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.tile-pad}"
  input:
    backgroundColor: "rgba(255,255,255,0.04)"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "12px 16px"
  qr-plate:
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "8px"
---

# Design System: Dulce (web)

## Overview

**Creative North Star: "The Phone Is the Page"**

One live iPhone, its screen ticking real Dulce glucose, is carried down a warm-black night by scroll: it tilts in the first viewport, turns to show the Lock Screen and alerts, lies down for StandBy, hands off to a Watch seen through an opening ember window, and settles into a card for the day's logbook and trends. Everything else on the page is light, type and a few dark tiles around that one object. The world is the sibling promo film's (`/Users/levani/personal/dulce/DESIGN.md`): warm-black ground, ember for brand and action, glucose green/amber/crimson only where glucose lives, Archivo variable. The web build supersedes the film where they differ: the display voice here is Archivo light and slightly wide rather than heavy and condensed, and depicted app UI is localized Spanish/English because the app ships in both.

The page is a cinematic scroll: a counting preloader, pinned chapters whose copy sits low-left while the device turns beside it, word-by-word reveals, a scroll-lit founder quote, a rolling counter, a thrown card row, one velocity-linked marquee, and a giant cropped wordmark at the close. Density is low; each viewport holds one idea, one image and at most one action. Navigation is a single floating pill at the bottom centre.

The atmosphere is fixed and never scrolls: one diagonal ember beam (rotated -32deg, 56px blur, drifting over 28 s), a low wine counter-light bottom-right, a warm vignette, and warm-tinted grain at 5% soft-light. Without WebGL or with reduced motion, every 3D moment has a static canvas-drawn device frame in its place.

**Key Characteristics:**
- Warm-black ground (#0d0c0b), never neutral grey or pure black; grain and vignette are tinted warm.
- Ember is the light source and the action, nothing else; glucose colours appear only on glucose data.
- Archivo light (300) at width 104 with tight tracking for every display line; Archivo 600 at width 76 with tabular figures for numerals.
- Dark glass and dark gradient field tiles with 1px white hairlines at 8 to 12%, 28px corners; every control is a pill.
- One device, carried by scroll; static device frames stand in when 3D is unavailable.

## Colors

A warm-black night with one ember light and three physiological colours held in reserve for data.

### Primary
- **Ember** (#f36638): the page's light source and its single action colour. The download pill, the beam, the day-accordion progress hairline, FAQ open-state icon, inline text links ("Configurar LibreLinkUp"), the focus ring, caret and selection tint (35%), the radial glow inside field tiles and the full ember window behind the Watch.
- **Ember Hi** (#ff7d52): hover for ember fills and links; also the "Dulce Pro" line on dark tiles.
- **Ember Deep** (#c2410c): ember on the light promise tile (the privacy shield icon) and the beam's falloff.
- **Ember Ink** (#1b0c06): text on an ember fill.

### Secondary (glucose states)
- **In Range** (#66c45b, text #7fd970): the time-in-range bar segment, the "86%" numeral, the rolling "1.440" readings counter, and every in-range value drawn on device screens.
- **High** (#f5a524, text #ffb638) and **Low** (#e8262b, text #ff544c): range-bar segments, their legend, and the high/low values on depicted screens. Fill hues are for bars and dots; the lighter text variants are for numbers on dark.

### Neutral
- **Ground** (#0d0c0b): page background, preloader, scrollbar track.
- **Glass** (#1d1916): solid fallback for glass surfaces (reduced transparency) and the sensors tile.
- **Line** (#2a2521): the solid hairline token; in practice borders are drawn as white at 8% (tiles), 10 to 12% (dividers, glass, FAQ rows) and 15% (secondary buttons).
- **Ink** (#f6f0ea): primary text, the pill nav's download fill, and the plate under every QR code.
- **Soft** (#cfc6bd): body and lead copy under display lines, footer links.
- **Mute** (#aa9f94): group headings in footer and menu, timestamps, captions, inactive accordion titles. Raised from the film's #8C8178 for legibility on the web ground.
- **Ember Field Core** (#1a1310) and **Wine Field Core** (#140c10): the dark bases under radial glows in field tiles.
- **Promise Paper** (#f3ece4): the one light tile (privacy), with text #1b1714 and body #4a413a.

### Named Rules
**The Ember Is the Light Rule.** Ember is the beam, the glow in tiles and the action. It never colours a glucose value, and glucose colours never colour brand or action.
**The Data Earns Colour Rule.** Green, amber and crimson appear only on glucose data: depicted screens, the readings counter, the time-in-range bar and legend.
**The Warm Night Rule.** Every dark is warm (R > G > B), including grain, vignette and field bases. A field's glow is ember, ember-orange or wine-rose.

## Typography

**Display Font:** Archivo variable (weights plus the `wdth` axis, via next/font), fallback system-ui, -apple-system, Segoe UI.
**Body Font:** Archivo at width 100.
**UI Font:** the iOS system stack (-apple-system, SF Pro; SF Pro Rounded for some numerals) only inside depicted device screens.

**Character:** Light, slightly wide Archivo with tight negative tracking reads like large, quiet signage at night; the condensed 600 numeral voice is the instrument. Two weights of one family do all the work.

### Hierarchy
- **Display Mega** (300, clamp up to 12rem, 0.96): the readings counter, the marquee, the closing "Tu número, donde mires." and the Watch sentence. The footer wordmark goes further (27vw, wdth 108, -0.06em, cropped by the page edge); the preloader counter is light 300 at clamp(6rem, 22vw, 18rem), tabular.
- **Display** (300, clamp(2.5rem, 6.4vw, 6.6rem), 0.96, wdth 104, -0.035em): hero and chapter titles, section titles. Set in two short lines, revealed word by word.
- **Headline** (300, clamp(1.9rem, 4vw, 3.9rem), 1.04 to 1.08): scroll-lit paragraphs (founder quote, family lead) and functional-page h1s at the lower end.
- **Title** (300, 1.5rem, wdth 104, -0.02em): tile, card and sub-section titles. Menu items and accordion titles use the same voice larger (1.45rem; clamp(1.6rem, 2.6vw, 2.3rem)).
- **Lead** (400, 1.0625 to 1.125rem, 1.625, soft): the one paragraph under a display line, max 36 to 42ch.
- **Body** (400, 1rem, 1.6, soft): answers, tile copy, max 60ch.
- **Label** (400 or 600, 0.875rem, 1.45): buttons in small sizes, links, footer and menu lists, notes.
- **Caption** (400, 0.75rem, 1.4, mute): legal small print, range legend.
- **Numeral** (600, wdth 76, tnum, -0.015em): any figure that is data (86%, invite codes, step numbers).

### Named Rules
**The Two Voices Rule.** Archivo speaks for Dulce; the system stack speaks for the app inside a device. Never set marketing copy in the system stack or device UI in Archivo.
**The Light Display Rule.** Display lines are weight 300, never bold. Emphasis comes from size, an inline drop mark, or a glucose-coloured numeral, not weight.
**The Tabular Rule.** Every number that counts or changes uses tabular figures.

## Layout

One centred container (max 90rem) with gutters of 1.25rem, 2rem from 768px and 2.75rem from 1280px. Pinned chapters are tall sections (their height is scroll time) with a 100svh sticky frame: copy sits bottom-left, or title top-left and body bottom-left ("split"), while the device occupies centre-right. Flowing sections use 6rem vertical padding, 9rem from 768px. The thrown card row bleeds off the right edge, aligned on its left to the container gutter.

Grids are asymmetric: the hero's foot is `30rem | 1fr | auto`; FAQ is 0.8fr / 1.2fr; the "more" bento is six columns with a 4x2 interactive tile beside two 2-column tiles and two 3-column tiles, 16px gaps. On mobile everything stacks into one column and the device moves above the copy.

The bottom 108px of every viewport on mobile (about 56px on desktop) is reserved for the floating pill nav; pinned copy is padded clear of it. The nav tucks away while the footer wordmark is in view.

## Elevation & Depth

Depth is light first, shadow second. The fixed beam, wine counter-light and vignette give the page its atmosphere; field tiles carry their own radial glow from an edge. Shadows are soft, large-blur, negative-spread and downward only; glass adds an 18px backdrop blur with 1.2 saturation and a 1px inner top highlight. The 3D phone and Watch are lit by the scene, not by CSS.

### Shadow Vocabulary
- **Glass** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 30px 60px -30px rgba(0,0,0,0.85)`): pill nav, menu card, QR popover, hero founder card.
- **CTA rest** (`box-shadow: 0 18px 40px -16px rgba(243,102,56,0.65)`): the ember pill, a coloured glow beneath it.
- **CTA press** (`box-shadow: 0 6px 16px -8px rgba(243,102,56,0.6)`): the ember pill while pressed, with a 1px drop.

### Named Rules
**The Soft Shadow Rule.** Shadows are blurred, offset only downward, and dark or ember. No hard offset shadows, no outer glows on cards.
**The Glass Falls Back Rule.** Under reduced transparency, glass becomes solid Glass (#1d1916) with no blur.

## Shapes

Two corner values carry the page: pills (999px) for every control, chip, bar and the nav, and 28px for every tile, card, menu panel and the Watch window when fully open. Inner elements step down: 16px for inputs and screen insets, 14px for the cream QR plates. Borders are 1px white hairlines at 8 to 15%. The ember Watch window is a clip-path inset that grows from a word-sized chip (corner = 28% of its height) to a framed plate with 28px corners. The Dulce drop mark is set inline in display lines at about 0.78em.

## Components

### Buttons
Tactile pills, one intent each.
- **Shape:** full pill (999px).
- **Primary (download):** Ember fill, Ember Ink text, 600 weight, 48px high with 24px left and 20px right padding and a trailing up-right arrow (40px high with label type in the md size). CTA rest shadow.
- **Hover / Focus / Active:** fill to Ember Hi; the arrow nudges up and right (0.3 s ease-out-expo); active drops 1px with the press shadow. Focus is the global 2px ember outline at 3px offset.
- **Secondary:** 1px white/15 border on white/4, ink text; hover white/10.
- **Ink:** the pill nav's "Descargar": Ink fill, Ground text, 44px, label type, hover to white.
- **Round icon (QR):** 48px circle, white/12 border on white/4, 20px line icon at 1.6 stroke; active scales to 95%.

### Pill Nav (signature)
The only navigation: a 56px glass pill fixed at the bottom centre with a two-line menu toggle, the drop mark and the ink download pill. It opens upward into a 28px glass card (up to 380px wide) whose links are Title-voice lines that turn ember on hover, staggered in at 30 ms each, with help, legal and language groups below a hairline. The card reveals with a clip-path from its bottom plus an 8px blur clear (0.5 s ease-out-expo). Escape and outside click close it.

### Cards / Containers
- **Glass card:** gradient rgba(44,37,32,.72) to rgba(26,22,19,.72), 1px white/8 border, glass shadow, backdrop blur 18px.
- **Field tile:** 28px corners, 1px white/8 border, a dark warm base with a radial ember or wine glow rising from one edge; holds a device frame that rises from or is cropped by the tile edge. 28px padding (40px on large tiles).
- **Data tile:** the same shape on a near-black base, with a glucose numeral and a pill-segmented range bar (12px high, 3px gaps).
- **Promise tile:** the single light tile (Promise Paper) with an ember-deep line icon.

### Inputs / Fields
- **Style:** 16px corners, 1px white/12 border, white/4 fill, body type, mute placeholder, ember caret.
- **Focus:** border to ember plus a 2px ember/25 ring.
- **Success:** a 28px-cornered in-range-tinted panel (10% fill, 30% border).

### FAQ Rows
Hairline-separated `details` rows: question in Title voice (clamp(1.2rem, 1.7vw, 1.5rem), wdth 102), a mute plus icon that rotates 45deg and turns ember when open; the answer height animates over 0.45 s ease-out-expo.

### Day Accordion
Three titles, one open, each with a hairline that fills in ember as its 7 s autoplay timer; inactive titles in Mute. Beside it, a 28px ember-glow field card holds the 3D phone, whose screen washes to the open item.

### Device Frames
Canvas-drawn iPhone and Watch screens with the real app icon and drop, iOS system type, app palette (#0B0B0C ground, #1C1C1E cards), and copy localized to the page locale. They are the no-WebGL and reduced-motion stand-in for the 3D stage and the content of every card that shows a screen.

### Motion
Ease is `cubic-bezier(0.16, 1, 0.3, 1)` (expo out) for nearly everything. Display lines rise word by word from a clip (yPercent 115 to 0, 1.05 s, 0.045 s stagger); supporting blocks lift 28px out of a 10px blur (0.9 s, 0.08 s stagger). Long paragraphs light word by word with scroll from 18% opacity. Counters roll per digit (expo out, 0.06 s per column). The preloader counts to 100 and lifts away (expo.inOut, 1.05 s), once per session. The marquee loops in 38 s and follows scroll velocity and direction. Reduced motion removes the beam drift, preloader, scrubs and pinning; content is shown at rest.

## Do's and Don'ts

### Do:
- **Do** keep every dark warm, starting from Ground (#0d0c0b), and let the fixed ember beam be the page's only light source.
- **Do** reserve Ember for brand light and the install action, and glucose green/amber/crimson for glucose data.
- **Do** set display lines in Archivo 300 at wdth 104 with -0.035em tracking, two short lines, revealed word by word.
- **Do** use tabular Archivo 600 at wdth 76 for figures that are data.
- **Do** make every control a pill and every tile 28px with a 1px white hairline.
- **Do** depict the app with its real icon and iOS system type, in the visitor's locale (Spanish at `/`, English at `/en`).
- **Do** provide a static device frame for every 3D moment, and a resting state for every scroll animation under reduced motion.
- **Do** keep pinned copy clear of the bottom nav band (108px on mobile).
- **Do** use the official App Store badge unaltered, and show QR codes on an Ink plate.

### Don't:
- **Don't** colour a glucose value with ember, or a button with a glucose colour.
- **Don't** set display type bold or condensed; heavy condensed Archivo belongs to the film, not the page.
- **Don't** add a second navigation bar; the floating pill is the navigation.
- **Don't** float flat phone mockups in a row of feature cards; screens live in the carried device or inside field tiles.
- **Don't** use hard offset shadows or neutral grey surfaces.
- **Don't** add a second light tile; Promise Paper is used once.

## Not canonized (defects and drift the build carries)

- Off-scale radii: the hero founder card and Watch tile use 24px and the QR popover 22px where the system says 28px; the `--radius-card` token is 18px while every card is drawn at a literal 28px, and `--radius-card-xl` duplicates `--radius-card-lg`. Consolidate onto pill / 28 / 16 / 14.
- The "dusk" card field in the Family row is a cool violet glow (rgba(92,72,150,0.6) on #100f15), outside the Warm Night Rule; it is drift, not a palette entry.
- Unused tokens in `app/globals.css` for the public site (`ground-2`, `raise`, `display-xl`, `display-lg`, `display`, `headline` text sizes, `shadow-card-rest/elevated`) and the legacy alias layer are left out of the system; the display ramp actually ships as `type-display` plus per-use clamps.
- Lead size is a literal (1.0625rem or 1.125rem) at each use rather than a token, and a dozen one-off warm hexes build field gradients inline; treat them as instances, not palette.
- The invite-code numeral uses wide positive tracking (0.18em) for code legibility; a one-off, not a numeral rule.
