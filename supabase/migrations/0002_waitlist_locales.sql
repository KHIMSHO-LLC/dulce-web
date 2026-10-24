-- Allow every site language on the waitlist (the site is in es, en, de, fr, it).
-- Until this is applied, app/actions/waitlist.ts stores es/en here and keeps the
-- real language in `source` (e.g. "android:de").
alter table public.waitlist drop constraint if exists waitlist_locale_check;
alter table public.waitlist add constraint waitlist_locale_check
  check (locale in ('es', 'en', 'de', 'fr', 'it'));
