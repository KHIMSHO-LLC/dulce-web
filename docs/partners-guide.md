# Admin dashboard: how to use it

**Where:** https://dulceglucosa.com/partners. Log in with the admin key (`REF_ADMIN_KEY` on the relay, saved in
the Mac's Keychain as "Dulce admin key"). The key stays in that browser tab only; closing the tab logs you out.

Three tabs:

- **Overview**: subscriptions and money from RevenueCat, the onboarding funnel, every subscription event, top partners.
- **Partners**: influencers, their codes, conversions, earnings, what you owe.
- **Devices**: what the relay sees per phone (connections, sensors, app health).

## Overview

- **Right now** and **Over time** come from RevenueCat's own API (cached up to 1 hour), so they match the
  RevenueCat dashboard. They need a RevenueCat v2 secret key with read access to *Charts & metrics*, *Customer
  information* and *Project configuration*, stored on the relay as `RC_API_V2_KEY`.
- **From opening the app to paying**: per device, reported by the app. Shows where people give up before they ever
  reach the paywall.
- **Subscription events**: every trial, payment, cancellation, refund and billing issue RevenueCat sends to the
  relay's webhook, from 27 Oct 2026. "Net" is what Dulce receives after Apple's fee and VAT.
- **App Store downloads, impressions, page views**: not connected yet (needs an App Store Connect API key).

## How a referral works

1. You add a partner with a code, e.g. `JEDEEN`.
2. Their followers enter the code in the Dulce app: **Settings › Account › Invite code**, or **"Have an invite
   code?"** on the subscription screen. The app shows that code's offer and tags the person with the code. One code
   per device, ever.
3. Optional, no typing needed: give the partner an **Apple offer code** (made in App Store Connect) and add it to the
   partner. Followers tap `https://apps.apple.com/redeem?ctx=offercodes&id=6770694596&code=<OFFERCODE>`, the App
   Store applies the discount, and the redemption counts for the partner.
4. RevenueCat tells the relay about every trial, payment, renewal, cancellation and refund. The dashboard counts it
   and works out the partner's share.

## Add a partner (New partner)

- **Partner:** name, email, country, payout method, TikTok / Instagram / YouTube / Facebook (handle or link).
  Only you see these; the partner's page shows just their name.
- **Code:** 2–20 letters/numbers. Can't be changed later.
- **Offer:** the RevenueCat offering (prices) the code unlocks.
- **Apple offer codes:** optional, comma-separated.
- **How the partner is paid:**
  - *Revenue share* (recommended): a % of what Dulce actually receives (after Apple's fee and VAT, exact per payment
    from RevenueCat), for each person's first N monthly payments (default 6) and first N yearly payments (default 1).
    Refunds take the share back.
  - *Fixed € per paying person*: once, at the person's first payment.
  - *Fixed € per person who stays*: once, at the person's second payment.
  - *Other*: note only, nothing calculated.

## Read a partner card

- **Funnel:** entered code → started trial → paying → paid a 2nd time → cancelled, with conversion %.
- **Dulce received (net)**, **Partner earned**, **Dulce keeps**, **Owed now** (earned since the last "Mark paid").
- **Show months:** month by month, payments, Dulce's net and the partner's share.
- Sort by paying people, conversion, revenue, owed or newest; search by name, code or handle.

## Actions

- **Create partner link / Copy partner link:** a private link to the partner's own page
  (`/partners/stats#CODE.…`): their people, earnings, month-by-month table and deal. Nothing else. No password.
- **New link:** replaces the partner link; the old one stops working.
- **Edit:** contact, socials, offer, Apple offer codes, deal.
- **Mark paid:** after you pay. "Owed now" goes back to 0 from that moment.
- **Pause / Resume:** paused codes can't be entered by new people. People who already used it still count.
- **Delete:** removes the code. Prefer Pause.

## Devices tab

Devices, not people. **Getting readings · 24h** is the real number of active users. Paying / Trialing / Free are
what each app last reported (your own phone is in "Paying"); for money, use Overview (RevenueCat).

## Lost the admin key?

Cloudflare can't show a secret again. Set a new one (the old one stops working) from `dulce-relay`:

```sh
KEY=$(openssl rand -hex 24) && printf %s "$KEY" | npx wrangler secret put REF_ADMIN_KEY \
  && security add-generic-password -U -a dulce -s "Dulce admin key" -w "$KEY" && echo saved
```

Open Keychain Access to see it. Partner links don't use this key and keep working.
