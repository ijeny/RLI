create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  display_name text not null check (length(trim(display_name)) between 2 and 80),
  email text not null unique check (position('@' in email) > 1),
  bio text not null default '' check (length(bio) <= 500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  name text not null check (length(trim(name)) between 2 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text not null default '' check (length(description) <= 1000),
  budget numeric(12, 2) not null default 0 check (budget >= 0),
  status text not null default 'todo' check (status in ('todo', 'in_progress', 'done')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null check (length(trim(title)) between 2 and 160),
  description text not null default '' check (length(description) <= 1000),
  status text not null default 'todo' check (status in ('todo', 'in_progress', 'done')),
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_profile_id_idx on public.projects using btree (profile_id);
create index if not exists tasks_project_id_idx on public.tasks using btree (project_id);
create index if not exists projects_status_idx on public.projects using btree (status);
create index if not exists tasks_status_idx on public.tasks using btree (status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists tasks_set_updated_at on public.tasks;
create trigger tasks_set_updated_at
before update on public.tasks
for each row execute function public.set_updated_at();

insert into public.profiles (id, display_name, email, bio)
values (
  '11111111-1111-4111-8111-111111111111',
  'Alya Pratama',
  'alya.pratama@example.com',
  'Pengembang serverless yang membangun produk digital berdaya tahan tinggi.'
)
on conflict (email) do nothing;

insert into public.projects (id, profile_id, name, slug, description, budget, status)
values
  (
    '22222222-2222-4222-8222-222222222221',
    '11111111-1111-4111-8111-111111111111',
    'Atlas Commerce',
    'atlas-commerce',
    'Platform commerce modular dengan katalog real-time dan workflow fulfillment.',
    18500.00,
    'in_progress'
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    '11111111-1111-4111-8111-111111111111',
    'Lumen Analytics',
    'lumen-analytics',
    'Data workspace ringan untuk mengubah event produk menjadi keputusan yang terukur.',
    12400.00,
    'todo'
  ),
  (
    '22222222-2222-4222-8222-222222222223',
    '11111111-1111-4111-8111-111111111111',
    'Drift Operations',
    'drift-operations',
    'Command center untuk otomasi operasional lintas tim dan integrasi pihak ketiga.',
    26750.00,
    'done'
  )
on conflict (slug) do nothing;

insert into public.tasks (project_id, title, description, status, due_date)
values
  ('22222222-2222-4222-8222-222222222221', 'Finalisasi model katalog', 'Tinjau relasi produk dan variasi sebelum migrasi.', 'done', current_date + 2),
  ('22222222-2222-4222-8222-222222222221', 'Uji webhook fulfillment', 'Pastikan retry dan idempotensi event berjalan aman.', 'in_progress', current_date + 8),
  ('22222222-2222-4222-8222-222222222222', 'Susun event taxonomy', 'Definisikan event inti untuk funnel dan retention.', 'todo', current_date + 12),
  ('22222222-2222-4222-8222-222222222222', 'Bangun dashboard cohort', 'Siapkan query agregasi untuk cohort mingguan.', 'todo', current_date + 18),
  ('22222222-2222-4222-8222-222222222223', 'Audit automation rules', 'Dokumentasikan rule yang sudah aktif di production.', 'done', current_date - 4),
  ('22222222-2222-4222-8222-222222222223', 'Serah terima runbook', 'Lengkapi prosedur incident response untuk tim operasi.', 'done', current_date - 1)
on conflict do nothing;
