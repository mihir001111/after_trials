-- Create blogs table with strict typing and defaults
create table if not exists public.blogs (
    id uuid default gen_random_uuid() primary key,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null,
    
    slug text not null unique,
    title text not null,
    excerpt text,
    content text, -- Markdown or HTML content
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
create index if not exists blogs_slug_idx on public.blogs (slug);
create index if not exists blogs_published_at_idx on public.blogs (published_at desc);
