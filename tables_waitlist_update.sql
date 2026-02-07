-- Add these columns to your existing waitlist table
alter table waitlist 
add column if not exists full_name text,
add column if not exists role text;
