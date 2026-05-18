-- Dulce marketing site — Supabase schema.
-- Run via the Supabase CLI:
--   supabase db push
-- Or paste into Supabase Studio → SQL Editor for the project.

create extension if not exists "pgcrypto";

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  locale text not null check (locale in ('es','en')),
  source text,
  ip_hash text,
  created_at timestamptz not null default now(),
  constraint waitlist_email_unique unique (email)
);

create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);

alter table public.waitlist enable row level security;
-- No client-facing policies. Inserts happen only via the service-role key
-- inside Server Actions; reads happen in Supabase Studio.

create table if not exists public.beta_interest (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text not null,
  cgm_device text check (cgm_device in (
    'libre2','libre3','dexcomG6','dexcomG7','nightscout','none'
  )),
  region text check (region in ('es','mx','other')),
  notes text,
  ip_hash text,
  created_at timestamptz not null default now()
);

create index if not exists beta_interest_created_at_idx on public.beta_interest (created_at desc);
create index if not exists beta_interest_email_idx on public.beta_interest (email);

alter table public.beta_interest enable row level security;
-- Same access model as waitlist: service-role-only inserts.
