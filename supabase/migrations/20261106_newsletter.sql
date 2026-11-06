-- Newsletter-Anmeldungen mit Double-Opt-In (Nachweis der Einwilligung)

create table if not exists public.newsletter_subscribers (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  email            text not null unique check (char_length(email) <= 255),
  status           text not null default 'pending' check (status in ('pending', 'confirmed', 'unsubscribed')),
  source           text not null default 'website',           -- 'footer', 'kontaktformular', ...
  consent_text     text not null,                              -- Wortlaut der Einwilligung
  token_hash       text,                                       -- SHA-256 des Bestätigungslinks
  requested_at     timestamptz not null default now(),         -- letzte Anmeldung (Linkversand)
  request_count    int not null default 1,
  confirmed_at     timestamptz,
  ip_hash          text,                                       -- bei Anmeldung
  confirm_ip_hash  text,                                       -- bei Bestätigung
  user_agent       text,
  resend_synced_at timestamptz                                 -- im Resend-Segment angelegt
);

create index if not exists newsletter_token_idx on public.newsletter_subscribers (token_hash);
create index if not exists newsletter_ip_idx on public.newsletter_subscribers (ip_hash, requested_at desc);

alter table public.newsletter_subscribers enable row level security;
revoke all on public.newsletter_subscribers from anon, authenticated;
grant select, insert, update, delete on public.newsletter_subscribers to service_role;
