-- Esegui questo nel SQL Editor di Supabase
-- Settings → SQL Editor → New query → incolla tutto → Run

create table if not exists tavoli_stato (
  id text primary key,
  stato jsonb not null default '{}',
  aggiornato_il timestamptz default now()
);

alter table tavoli_stato enable row level security;

-- Permetti a tutti di leggere (camerieri)
create policy "Leggi tavoli" on tavoli_stato
  for select using (true);

-- Permetti a tutti di scrivere (camerieri)
create policy "Scrivi tavoli" on tavoli_stato
  for all using (true);

-- Popola i 30 tavoli + 10 banco vuoti
insert into tavoli_stato (id, stato) 
select 
  id, 
  '{"items":[],"orario":null,"coperto":0}'::jsonb
from (
  select generate_series(1,30)::text as id
  union all
  select 'B'||generate_series(1,10)::text
) t
on conflict (id) do nothing;

-- Abilita Realtime sulla tabella
alter publication supabase_realtime add table tavoli_stato;
