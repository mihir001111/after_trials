import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing.');
    process.exit(1);
}

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

async function generateSitemap() {
    console.log('Generating sitemap...');

    // Fetch all published blogs
    const { data: posts, error } = await supabase
        .from('blogs')
        .select('slug, updated_at')
        .eq('published', true);

    if (error) {
        console.error('Error fetching blogs:', error);
        process.exit(1);
    }

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
            .map((post) => {
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

    const publicDir = path.resolve(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('✅ sitemap.xml generated in public/');
}

function generateRobots() {
    console.log('Generating robots.txt...');
    const robots = `User-agent: *
Allow: /
Disallow: /private/

Sitemap: ${BASE_URL}/sitemap.xml
`;

    const publicDir = path.resolve(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
    console.log('✅ robots.txt generated in public/');
}

async function main() {
    await generateSitemap();
    generateRobots();
}

main();
