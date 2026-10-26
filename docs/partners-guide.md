# Partners dashboard: how to use it

**Where:** https://dulceglucosa.com/partners. Log in with the admin key (`REF_ADMIN_KEY` on the relay).
The key stays in that browser tab only; closing the tab logs you out.

## How a referral works

1. You create a code for a partner, e.g. `MARIA`.
2. The partner tells followers to enter it in the Dulce app: **Settings › Account › Invite code**, or
   **"Have an invite code?"** on the subscription screen. (There is no clickable referral link yet: people
   type the code.)
3. The app checks the code, shows that code's offer on the paywall and tags the person's subscription with the
   code. Each device can use only one code, ever.
4. RevenueCat tells the relay when that person starts a trial, pays, renews or cancels. The dashboard counts it.

## Add a code

- **Code:** 2–20 letters/numbers, no spaces (`MARIA`, `DIABETESBCN`).
- **Offering:** which RevenueCat offering (price/discount) the code unlocks. Pick from the list.
- **Payout rule:**
  - *Per paying user*: € for every person who makes a first payment (after the free trial).
  - *Per retained user*: € for every person who pays a second month. Safer against people who cancel at once.
  - *Percent*: only a note; the dashboard can't compute it, you work it out from revenue.
- **Note:** for yourself (contact, deal). Partners never see it.

## Read the table

| Column | Means |
| --- | --- |
| Claims | People who entered the code |
| Trials | Started the free trial |
| Paying | Made a first payment |
| Retained 1m | Paid a second month |
| Owed | What you owe since the last "Mark paid" (amount and number of people) |
| Paid through | Date of the last "Mark paid" |

Numbers change when Apple/RevenueCat report it. A trial turns into "Paying" about 14 days after it starts.

## Actions

- **Create partner link / Copy partner link:** copies a private link to the partner's own stats page
  (`/partners/stats#CODE.…`). Send it only to that partner. They see their code's people and earnings, and
  nothing else: no other codes, no notes, no admin actions. No password needed.
- **New link:** replaces the partner link; the old one stops working. Use it if a link leaked or the partnership
  ended.
- **Mark paid:** after you pay a partner. Moves "Owed" back to 0 from now; the partner's page shows it as paid.
- **Pause / Resume:** paused codes can't be entered by new people. People who already used it still count.
- **Delete:** removes the code. Prefer Pause; deleting loses the history in the table.

## Usage tab

Devices, not people. What to look at:

- **Getting readings · 24h**: the real number of active users (the relay got a new sensor reading).
- **Paying / Trialing / Free**: what each app last reported. Your own phone is in "Paying". Check money in RevenueCat.
- **Devices on the relay**: everything still registered, including people who stopped wearing a sensor.
- **Onboarding**: how many people get from opening the app to connecting a sensor to starting a trial.
- **Events**: new devices, started Pro, trial → paid, back to free, sign-outs, app deleted. Counts before
  26 Oct 2026 are rougher: signing in again counted as a new device, trial → paid counted under "Started Pro",
  and deleted free apps weren't counted.

## Lost the admin key?

Cloudflare can't show a secret again. Set a new one (the old one stops working) from `dulce-relay`:

```sh
KEY=$(openssl rand -hex 24) && printf %s "$KEY" | npx wrangler secret put REF_ADMIN_KEY \
  && security add-generic-password -U -a dulce -s "Dulce admin key" -w "$KEY" && echo saved
```

It's saved in the Mac's Keychain as "Dulce admin key" (open Keychain Access, or run
`security find-generic-password -s "Dulce admin key" -w`). Partner links don't use this key and keep working.
