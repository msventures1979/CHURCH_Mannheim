-- Event-Einreichungen von Mieter:innen der Location (Formular /event-einreichen/<key>)
create table if not exists public.event_submissions (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  status            text not null default 'neu',          -- neu · übernommen · verworfen
  title             text not null check (char_length(title) <= 80),
  subtitle          text not null check (char_length(subtitle) <= 120),
  category          text not null,
  short_description text not null check (char_length(short_description) <= 200),
  long_description  text not null check (char_length(long_description) <= 1500),
  dates             jsonb not null,                       -- [{date, start, end}]
  timeline          jsonb not null default '[]'::jsonb,   -- [{time, title}]
  price             text not null check (char_length(price) <= 80),
  ticket_link       text not null check (char_length(ticket_link) <= 300),
  included          text check (char_length(included) <= 300),
  bring             text check (char_length(bring) <= 300),
  max_guests        text check (char_length(max_guests) <= 10),
  organizer_name    text not null check (char_length(organizer_name) <= 100),
  organizer_website text check (char_length(organizer_website) <= 200),
  organizer_instagram text check (char_length(organizer_instagram) <= 100),
  organizer_about   text check (char_length(organizer_about) <= 400),
  contact_name      text not null check (char_length(contact_name) <= 100),
  contact_email     text not null check (char_length(contact_email) <= 255),
  contact_phone     text not null check (char_length(contact_phone) <= 30),
  notes             text check (char_length(notes) <= 1000),
  image_paths       text[] not null default '{}',
  ip_hash           text,
  user_agent        text
);

create index if not exists event_submissions_created_at_idx on public.event_submissions (created_at desc);
create index if not exists event_submissions_ip_hash_idx on public.event_submissions (ip_hash, created_at desc);

alter table public.event_submissions enable row level security;
revoke all on public.event_submissions from anon, authenticated;
grant select, insert, update, delete on public.event_submissions to service_role;

-- Privater Speicher für die hochgeladenen Bilder (nur Server-Zugriff)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('event-submissions', 'event-submissions', false, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
