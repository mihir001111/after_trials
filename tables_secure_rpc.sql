-- 1. Revoke public insert access to lock down the table
-- (RLS policy "Enable insert for everyone" should be dropped or modified)
drop policy if exists "Enable insert for everyone" on waitlist;

-- 2. Create a secure function to handle inserts
-- SECURITY DEFINER means it runs with the privileges of the creator (postgres/admin),
-- bypassing RLS for the operations inside the function.
create or replace function submit_waitlist(
    email_input text,
    full_name_input text,
    role_input text
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
    new_id uuid;
begin
    -- Basic validation (optional, can be expanded)
    if email_input is null or email_input = '' then
        raise exception 'Email is required';
    end if;

    -- Insert safely
    insert into waitlist (email, full_name, role)
    values (email_input, full_name_input, role_input)
    returning id into new_id;

    return json_build_object('id', new_id, 'success', true);
exception
    when unique_violation then
        -- Return a friendly error or handle gracefully
        raise exception 'You are already on the waitlist.';
    when others then
        raise exception 'An error occurred submitting to the waitlist: %', SQLERRM;
end;
$$;

-- 3. Allow public (anon/authenticated) to call this function
grant execute on function submit_waitlist(text, text, text) to anon, authenticated, service_role;
