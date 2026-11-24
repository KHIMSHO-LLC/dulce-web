# Blog covers needed

Rules: content/README.md → "Images". One line per article: id | kicker | headline | subline | screens.
Render in an interactive session, save to public/guides/covers/<id>.webp, set `image` + `imageAlt` in
content/articles.ts, delete the line.

Done 2026-11-07: apple-watch, lock-screen, widgets, librelinkup-not-working, libreview, blood-sugar-levels,
apple-health, night-lows, family-sharing, pet-glucose. Older articles keep their screenshot images until they
get a cover; new articles always get one.

- carplay | CarPlay · iOS 26 | Your glucose on the / **CarPlay** Dashboard | No CarPlay app needed: the Live Activity card, also in the Apple Watch Smart Stack | Real CarPlay Dashboard capture of Dulce's small card ("Number and chart" style; CarPlay Simulator from Additional Tools for Xcode works) + the Live Activity style screen on the CarPlay tab (Settings › Live Activity style › CarPlay) in an iPhone frame. Also replace the inline figure (`live-activity-styles.jpg` is an older version of that screen) with a current CarPlay-tab screenshot.
- medtronic-carelink | Medtronic · CareLink | Your Medtronic glucose on the / **Lock Screen** | Simplera, Guardian, MiniMed 780G: Lock Screen, widgets, Apple Watch | Real screens: the sensor picker with Medtronic (onboarding), the Live Activity on the Lock Screen, the Apple Watch complication, in Apple frames. Currently uses `/guides/widgets-everywhere.jpg`. Also add an inline screenshot of the "Sign in with CareLink" screen.
- nightscout | Nightscout · iPhone | Your Nightscout on the / **Lock Screen** | Your own site, read only: Lock Screen, widgets, Apple Watch | Real screens: the Nightscout connect screen (address + access token), the Live Activity on the Lock Screen, the Apple Watch complication, in Apple frames. Currently uses `/guides/widgets-everywhere.jpg`. Also add an inline screenshot of the connect screen.
