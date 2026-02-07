-- 1. Add verified column to waitlist
alter table waitlist 
add column if not exists verified boolean default false;

-- 2. Create a function to handle email confirmation updates
create or replace function public.handle_auth_verification()
returns trigger
language plpgsql
security definer
as $$
begin
  -- If email_confirmed_at changes from null to something, mark waitlist as verified
  if old.email_confirmed_at is null and new.email_confirmed_at is not null then
    update public.waitlist
    set verified = true
    where email = new.email;
  end if;
  return new;
end;
$$;

-- 3. Create the trigger on auth.users
-- Drop if exists to avoid errors on multiple runs
drop trigger if exists on_auth_user_verified on auth.users;

create trigger on_auth_user_verified
after update on auth.users
for each row
execute procedure public.handle_auth_verification();

-- Optional: Initial sync for existing confirmed users (if any)
-- update public.waitlist w
-- set verified = true
-- from auth.users u
-- where w.email = u.email and u.email_confirmed_at is not null;
