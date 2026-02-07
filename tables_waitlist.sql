-- Run this in your Supabase SQL Editor

create table if not exists waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table waitlist enable row level security;

-- Allow anyone to insert (public waitlist)
create policy "Enable insert for everyone" on waitlist for insert with check (true);

-- Optional: Allow reading only by service role (secure)
create policy "Enable read for service role only" on waitlist for select using (auth.role() = 'service_role');
