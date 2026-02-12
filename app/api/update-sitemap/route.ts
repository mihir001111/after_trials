import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Force checking for secret to prevent abuse
const CRON_SECRET = process.env.CRON_SECRET;

export async function POST(req: NextRequest) {
    // 1. Validate Secret
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        // 2. Init Supabase from env vars (same as script)
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Or SERVICE_ROLE if RLS dictates
        const supabase = createClient(supabaseUrl, supabaseKey);

        const BASE_URL = 'https://aftertrials.com';

        const staticRoutes = [
            '',
            '/about',
            '/contact',
            '/privacy',
            '/terms',
            '/blog',
            '/cookie',
            '/cancellation',
            '/account-deletion',
            '/refund',
            '/subscription-terms',
            '/medical-disclaimer',
        ];

        // 3. Fetch Blogs
        const { data: posts, error } = await supabase
            .from('blogs')
            .select('slug, updated_at')
            .eq('published', true);

        if (error) throw error;

        // 4. Generate XML
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Routes -->
  ${staticRoutes
                .map((route) => {
                    return `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${route === '' ? '1.0' : '0.5'}</priority>
  </url>`;
                })
                .join('')}

  <!-- Blog Posts -->
  ${posts
                ?.map((post) => {
                    return `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
                })
                .join('')}
</urlset>`;

        // 5. Write to File System
        // In Vercel/Serverless this might be ephemeral, but on EC2 (VPS) with persistent disk and Next.js standalone,
        // writing to 'public' usually works if correct permissions exist.
        // However, in production build, 'public' is often copied to .next/static or served by Nginx root.
        // We need to write to where Nginx is serving from. Assuming typical setup:

        const publicDir = path.join(process.cwd(), 'public');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }

        fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

        return NextResponse.json({ success: true, message: 'Sitemap updated' });
    } catch (err: any) {
        console.error('Sitemap update failed:', err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
