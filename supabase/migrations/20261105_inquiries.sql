-- Kontaktanfragen von church-mannheim.com
-- Ausführen im SQL-Editor von Supabase (erst nach Freigabe).

create table if not exists public.inquiries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) <= 100),
  email       text not null check (char_length(email) <= 255),
  phone       text check (char_length(phone) <= 30),
  interest    text not null,
  message     text check (char_length(message) <= 2000),
  ip_hash     text,
  user_agent  text,
  source      text not null default 'website'   -- 'website' oder 'formspree-import'
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_email_idx on public.inquiries (email, created_at desc);
create index if not exists inquiries_ip_hash_idx on public.inquiries (ip_hash, created_at desc);

-- Row Level Security an, ohne Policies: nur der Server (Service-Role-Key) hat Zugriff.
alter table public.inquiries enable row level security;

-- Neue Tabellen werden nicht automatisch freigegeben: nur service_role bekommt Rechte.
revoke all on public.inquiries from anon, authenticated;
grant select, insert, update, delete on public.inquiries to service_role;
