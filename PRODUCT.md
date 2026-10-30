# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People anywhere in the world living with type 1 diabetes who wear a continuous glucose monitor (FreeStyle Libre or Dexcom) and want to see their glucose without opening an app. Dulce is not limited to any country or language group. Also the people around them: parents of children with T1D, partners and family who follow someone's glucose from their own iPhone. Visitors arrive on a laptop or phone, often from search or a shared invite link, and leave by installing the iPhone app.

## Product Purpose

dulceglucosa.com is the single landing page for Dulce, a free iOS app (iPhone + Apple Watch) that shows real-time CGM glucose where the person is already looking: the Lock Screen Live Activity and Dynamic Island, StandBy, home-screen widgets, the Apple Watch, and the phones of family members who follow them. Success for the site is an App Store install (tracked per placement with the `ct` campaign token) or, for Android visitors, a waitlist email.

## Positioning

Made in Spain by someone who lives with T1D, for people with T1D wherever they live. Spanish is the site's default language, not the target audience: never describe Dulce as being for Spanish speakers, Spain or any one region. The app began as the founder's personal fix (the number on the lock screen instead of unlocking and waiting on a spinner) and grew into family following. The mechanism: glucose is pushed to every Apple surface live, so nobody has to open an app to know the number.

## Operating Context

- Glucose comes from the user's LibreLinkUp account (not LibreLink). The `/setup` page explains the difference; the app deep-links to `/setup` with that fixed path.
- Followers join through invite links `https://dulceglucosa.com/f/<code>` (universal links via `/.well-known/apple-app-site-association`); codes expire after 24 hours.
- Used all day in glances, and at night (low alerts, StandBy on the nightstand).
- `/partners` is an internal referral and usage dashboard talking to the Dulce relay; it is not part of the public site.

## Capabilities and Constraints

- Live today: FreeStyle Libre 2 and 3 via LibreLinkUp, Apple Health (read-only), Apple Watch app with complications, Lock Screen Live Activity and Dynamic Island, home-screen widgets, low/high alerts with custom thresholds, quiet hours and a stronger alarm for very low glucose, logbook (carbs, insulin, glucose, quick slider), trends over 7/14/30/90 days (time in range, average, GMI), followers by invite link with nudges and a one-tap "I'm OK" reply, revocable anytime.
- Live since 1.0.4 (2026-10-27): Dexcom G6, G7 and ONE+ via Dexcom Share.
- Coming, not live: Nightscout, Android (waitlist only).
- The app UI is available in Spanish, English, German, French and Italian. The site is Spanish at `/` and English, German, French and Italian at `/en`, `/de`, `/fr`, `/it`.
- Pricing: free download; Dulce Pro (Apple Watch, family sharing and more) with a 14-day free trial. Do not state Pro prices on the site.
- Requires iPhone with iOS 17 or later; Dynamic Island needs iPhone 14 Pro or later.
- Not a medical device. It does not diagnose, treat or replace the CGM's own alarms or the care team's judgment.
- The site is one landing page plus the functional routes that must keep working: `/setup`, `/legal/*`, `/f/<code>`, `/.well-known/*`, `/partners`. Retired marketing routes redirect into sections of the landing page.

## Brand Commitments

- Name: Dulce. Logo: the coral glucose drop with a green edge and white wave (`public/dulce-logo.png`).
- Voice: a peer who lives with T1D, calm and precise, never sensational about highs or lows. In Spanish copy use "DT1" / "diabetes tipo 1", not the English "T1D".
- Visual world shared with the promo film in the sibling `dulce/` project (`dulce/DESIGN.md`): warm-black ground, ember (#F36638) for brand and action, glucose state colours (green in range, amber high, crimson low) reserved for glucose data, Archivo variable type.
- Official Apple App Store badge artwork only, unaltered.

## Evidence on Hand

- Real app screenshots (App Store marketing frames, English UI): `public/screenshots/*.png`; watch face renders `public/screenshots/watch-*.png`.
- App Store listing: https://apps.apple.com/app/id6770694596 (2 ratings as of 2026-10-12, v1.0.2).
- Founder story (Giorgio, lives with T1D) from the previous About page copy.
- Claims carried over from the previous site copy, written by the founder (keep unless the founder withdraws them): Dulce does not sell data and has no ads; GDPR compliance (see the privacy policy); stale data over 15 minutes is shown plainly on the Watch, never as a fresh number; contact replies within 48 working hours, from a person.
- Not on hand and never to be fabricated: user counts, testimonials beyond the real App Store review, press, clinical or accuracy data, partnerships, prices.

## Product Principles

1. Glanceable first: the value is knowing the number without opening anything.
2. Health data is serious: calm and exact, no hype about lows or highs, no claims the product cannot back.
3. For everyone, peer-built: speak as someone who lives with T1D, not as a clinic, to readers in any country.
4. Family is a user too: followers and caregivers get first-class space.
5. Honest about what Dulce is: a companion display and logging tool, not a medical device.

## Accessibility & Inclusion

Visitors include people checking the site at night, older family members and people with low vision: keep body text at AA contrast or better on the dark ground, honour reduced motion fully (no scroll-driven 3D, static screens instead), and never rely on colour alone to convey glucose state (pair with numbers and words).
