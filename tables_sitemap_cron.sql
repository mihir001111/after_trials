-- Enable the required extensions
-- Note: You might need to enable these in the Supabase Dashboard -> Database -> Extensions if this SQL fails.
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Verify extensions are scheduled (optional check)
-- select * from pg_extension where extname in ('pg_cron', 'pg_net');

-- Schedule the daily sitemap update
-- Runs at 00:00 UTC every day
-- IMPORTANT: Replace 'my_secret_key_12345' with your actual CRON_SECRET if it's different.

select
  cron.schedule(
    'daily-sitemap-update', -- name of the cron job
    '0 0 * * *',           -- schedule (daily at midnight)
    $$
    select
      net.http_post(
          url:='https://aftertrials.com/api/update-sitemap',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer my_secret_key_12345"}'::jsonb,
          body:='{}'::jsonb
      ) as request_id;
    $$
  );

-- To check if it's scheduled:
-- select * from cron.job;

-- To unschedule/delete later:
-- select cron.unschedule('daily-sitemap-update');
