# feat/targeted-notices (web): "Targeted notices" on /partners/banners

Issue: https://github.com/KHIMSHO-LLC/dulce-app/issues/98. Relay API: dulce-relay branch `feat/targeted-notices`
(`/ref/admin/notices`, `/ref/admin/notices/push`; see its `docs/agent-work/feat-targeted-notices.md`). NOT pushed: web `main`
deploys live on Vercel, and the page needs the relay deployed first (otherwise the card shows a 404 error; the rest of the
Banners tab keeps working).

## What changed
- `app/partners/api.ts`: types `TargetedNotice`, `NoticeTarget`, `NoticeButton`, `NoticePushCount`; `fetchTargetedNotices`,
  `putTargetedNotice` (create, or edit with `replaces`), `deleteTargetedNotice`, `pushTargetedNotice(id, send?, force?)`
  (dry run unless `send`).
- `app/partners/(admin)/banners/TargetedNotices.tsx` (new), rendered at the top of the Banners tab (`page.tsx`): list of notices
  (audience line, window, button, last push), Edit / Remove, "Count push recipients" (dry run: iPhone / Android / without push)
  then "Send push" (confirm with the count; a second send asks again and passes `force`). Form: kind (info / maintenance /
  action needed), title + text per language (en required, es shown, add more), button (none / Contact support / https link +
  label per language), audience chips (sensor, LibreLinkUp region when Libre or no sensor chosen, plan, role, platform), app
  version from/to, single phones by 8-hex log tag, window (local time), "also show on older app versions", a live preview per
  language and a "Goes to: …" line. Client-side checks mirror the relay's validation.
- The old single "Current banner" / Abbott cards are unchanged.

## Tests
`npx eslint "app/partners/(admin)/banners" app/partners/api.ts` clean; `tsc --noEmit` has no errors in these files (the repo-wide
`PageProps`/`RouteContext` errors come from missing Next type generation, unrelated).

## Visual check needed
`dulce-web-dev-local-relay` (port 3000) against `dulce-relay-local-admin` (port 8788, admin key `localtest`) running the relay
branch: create a notice for "Libre · eu, eu2, fr · iPhone" with Contact support, preview es/en, count recipients, edit window
only (id kept) vs text (new id), remove. Light/dark, narrow window.
