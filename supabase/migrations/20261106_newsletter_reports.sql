-- Protokoll des wöchentlichen Newsletter-Berichts (verhindert doppelten Versand)
create table if not exists public.newsletter_reports (
  id         uuid primary key default gen_random_uuid(),
  sent_at    timestamptz not null default now(),
  new_count  int not null,
  total      int not null
);
alter table public.newsletter_reports enable row level security;
revoke all on public.newsletter_reports from anon, authenticated;
grant select, insert, update, delete on public.newsletter_reports to service_role;
