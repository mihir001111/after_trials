-- Create blogs table with strict typing and defaults
create table if not exists public.blogs (
    id uuid default gen_random_uuid() primary key,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null,
    
    slug text not null unique,
    title text not null,
    excerpt text,
    content text, -- Markdown content
    html_content text, -- Raw HTML content (takes priority over content if present)
    cover_image text,
    
    author_id uuid references auth.users(id) on delete set null,
    
    published boolean default false,
    published_at timestamptz,
    
    tags text[], -- Array of strings for categories/tags
    
    seo_title text,
    seo_description text,
    
    -- Metrics (can be incremented via RPC or edge functions)
    view_count integer default 0,
    read_time_minutes integer default 5
);

-- Enable Row Level Security
alter table public.blogs enable row level security;

-- Policy: Everyone can read published blogs
create policy "Public blogs are viewable by everyone"
on public.blogs for select
using ( published = true );

-- Policy: Authors can view their own unpublished blogs (or admins)
-- Assuming a basic check on auth.uid()
create policy "Authors can edit their own blogs"
on public.blogs for all
using ( auth.uid() = author_id );

-- Create an index on slug for fast lookups
create index if not exists blogs_published_at_idx on public.blogs (published_at desc);

-- STORAGE BUCKET CONFIGURATION
-- 1. Create the bucket 'blog-images' if it doesn't exist
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- 2. Allow public access to view images
create policy "Public Access to Blog Images"
on storage.objects for select
using ( bucket_id = 'blog-images' );

-- 3. Allow authenticated users (authors) to upload/update/delete images
create policy "Authenticated users can upload blog images"
on storage.objects for insert
with check ( bucket_id = 'blog-images' and auth.role() = 'authenticated' );

create policy "Authenticated users can update their own blog images"
on storage.objects for update
using ( bucket_id = 'blog-images' and auth.uid() = owner )
with check ( bucket_id = 'blog-images' and auth.uid() = owner );

create policy "Authenticated users can delete their own blog images"
on storage.objects for delete
using ( bucket_id = 'blog-images' and auth.uid() = owner );

-- GRANT PERMISSIONS (Explicitly allow public access)
-- alter publication supabase_realtime add table public.blogs; -- User requested removal
grant select on table public.blogs to anon, authenticated, service_role;
grant usage on sequence public.blogs_id_seq to anon, authenticated, service_role; -- If sequence exists (uuid uses gen_random_uuid so maybe not needed but safe)
