-- 1. Add verified column to waitlist (safe operation)
alter table waitlist 
add column if not exists verified boolean default false;

-- 2. Enable RLS (if not already enabled)
alter table waitlist enable row level security;

-- 3. Policy: Allow authenticated users to update ONLY their own row
-- This uses the authenticated user's email to match the waitlist email.
create policy "Allow authenticated users to verify themselves"
on waitlist for update
to authenticated
using ( email = (select email from auth.users where id = auth.uid()) )
with check ( email = (select email from auth.users where id = auth.uid()) );

-- 4. Policy: Allow authenticated users to read their own status
create policy "Allow authenticated users to read own data"
on waitlist for select
to authenticated
using ( email = (select email from auth.users where id = auth.uid()) );
