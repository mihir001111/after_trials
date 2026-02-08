
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Blog } from '@/types/blog';
import { ArrowLeft } from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import ReadingProgress from '@/components/ReadingProgress';
import TableOfContents from '@/components/TableOfContents';
import SocialShare from '@/components/SocialShare';

// Force dynamic since we are fetching data that might change
export const dynamic = 'force-dynamic';

const BASE_URL = 'https://aftertrials.com';

// Fetch blog data helper
async function getBlog(slug: string) {
    const supabase = await createClient();
    const { data } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    return data as unknown as Blog | null;
}

// Fetch related posts
async function getRelatedPosts(currentSlug: string, tags: string[]) {
    const supabase = await createClient();
    const { data } = await supabase
        .from('blogs')
        .select('id, slug, title, excerpt, cover_image, published_at, read_time_minutes')
        .eq('published', true)
        .neq('slug', currentSlug)
        .overlaps('tags', tags)
        .order('published_at', { ascending: false })
        .limit(3);

    return data || [];
}

// Generate SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        return {
            title: 'Blog Not Found | After Trials',
        };
    }

    const ogImage = blog.cover_image || `${BASE_URL}/og-default.jpg`;

    return {
        title: `${blog.seo_title || blog.title} | After Trials`,
        description: blog.seo_description || blog.excerpt || blog.title,
        openGraph: {
            title: blog.seo_title || blog.title,
            description: blog.seo_description || blog.excerpt || '',
            type: 'article',
            publishedTime: blog.published_at || blog.created_at,
            authors: ['After Trials Team'],
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.seo_title || blog.title,
            description: blog.seo_description || blog.excerpt || '',
            images: [ogImage],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    const relatedPosts = await getRelatedPosts(slug, blog.tags || []);
    const postUrl = `${BASE_URL}/blog/${slug}`;
    const publishDate = new Date(blog.published_at || blog.created_at).toISOString();
    const modifyDate = new Date(blog.updated_at || blog.created_at).toISOString();

    // JSON-LD Structured Data for Article
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blog.seo_title || blog.title,
        image: blog.cover_image ? [blog.cover_image] : [],
        datePublished: publishDate,
        dateModified: modifyDate,
        author: [{
            '@type': 'Organization',
            name: 'After Trials Team',
            url: BASE_URL
        }],
        publisher: {
            '@type': 'Organization',
            name: 'After Trials',
            logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/icon.svg`
            }
        },
        description: blog.seo_description || blog.excerpt,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': postUrl
        }
    };

    return (
        <article className="min-h-screen bg-white">
            {/* Reading Progress Bar */}
            <ReadingProgress />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/blog" className="group flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Blog</span>
                    </Link>

                    <SocialShare
                        title={blog.title}
                        url={postUrl}
                        description={blog.excerpt || ''}
                    />
                </div>
            </nav>

            <div className="flex max-w-7xl mx-auto">
                {/* Main Content */}
                <main className="flex-1 pt-24 pb-20 px-6 max-w-4xl mx-auto">
                    {/* Header */}
                    <header className="mb-12 text-center max-w-3xl mx-auto">
                        {/* Tags at top */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="flex items-center justify-center gap-2 mb-6">
                                {blog.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 mb-6 leading-[1.1]">
                            {blog.title}
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            {blog.excerpt}
                        </p>

                        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                            <time dateTime={publishDate}>
                                {new Date(publishDate).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </time>
                            <span>•</span>
                            <span>{blog.read_time_minutes} min read</span>
                        </div>
                    </header>

                    {/* Cover Image */}
                    {blog.cover_image && (
                        <div className="relative w-full aspect-[16/9] mb-12 rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={blog.cover_image}
                                alt={blog.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Content Body - HTML takes priority over Markdown */}
                    {blog.html_content ? (
                        <article
                            className="prose prose-lg md:prose-xl prose-neutral max-w-none"
                            dangerouslySetInnerHTML={{ __html: blog.html_content }}
                        />
                    ) : (
                        <MarkdownRenderer content={blog.content || ''} />
                    )}

                    {/* Bottom Tags and Share */}
                    <div className="mt-16 pt-8 border-t border-gray-100">
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {blog.tags.map(tag => (
                                    <Link
                                        key={tag}
                                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                                        className="px-4 py-2 bg-gray-50 text-gray-600 rounded-full text-sm font-medium hover:bg-purple-100 hover:text-purple-700 transition-colors"
                                    >
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-between py-6 bg-gray-50 rounded-xl px-6">
                            <p className="text-gray-600 font-medium">Enjoyed this article? Share it!</p>
                            <SocialShare
                                title={blog.title}
                                url={postUrl}
                                description={blog.excerpt || ''}
                            />
                        </div>
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <section className="mt-20">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/blog/${post.slug}`}
                                        className="group block"
                                    >
                                        {post.cover_image && (
                                            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4">
                                                <Image
                                                    src={post.cover_image}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* Table of Contents Sidebar - Desktop Only */}
                <aside className="hidden lg:block w-64 pt-24 pr-6 sticky top-0 h-screen">
                    <TableOfContents content={blog.content || ''} />
                </aside>
            </div>

            {/* Mobile TOC */}
            <div className="lg:hidden">
                <TableOfContents content={blog.content || ''} />
            </div>
        </article>
    );
}
