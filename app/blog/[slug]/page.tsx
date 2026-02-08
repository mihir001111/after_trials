
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Blog } from '@/types/blog';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Force dynamic since we are fetching data that might change
export const dynamic = 'force-dynamic';

// Fetch blog data helper
async function getBlog(slug: string) {
    const supabase = await createClient();
    const { data } = await supabase
        .from('blogs')
        .select(`
            *,
            author:author_id(
                full_name,
                avatar_url,
                username
            )
        `)
        .eq('slug', slug)
        .eq('published', true)
        .single();

    return data as unknown as Blog | null;
}

// Generate SEO Metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const blog = await getBlog(params.slug);

    if (!blog) {
        return {
            title: 'Blog Not Found | After Trials',
        };
    }

    const ogImage = blog.cover_image || '/og-default.jpg'; // Fallback needed

    return {
        title: `${blog.seo_title || blog.title} | After Trials`,
        description: blog.seo_description || blog.excerpt || blog.title,
        openGraph: {
            title: blog.seo_title || blog.title,
            description: blog.seo_description || blog.excerpt || '',
            type: 'article',
            publishedTime: blog.published_at || blog.created_at,
            authors: [blog.author?.full_name || 'After Trials Team'],
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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const blog = await getBlog(params.slug);

    if (!blog) {
        notFound();
    }

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
            '@type': 'Person',
            name: blog.author?.full_name || 'After Trials Team',
            url: `https://aftertrials.com/${blog.author?.username || ''}`
        }],
        publisher: {
            '@type': 'Organization',
            name: 'After Trials',
            logo: {
                '@type': 'ImageObject',
                url: 'https://aftertrials.com/icon.svg' // Ensure absolute URL
            }
        },
        description: blog.seo_description || blog.excerpt
    };

    return (
        <article className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/blog" className="group flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Blog</span>
                    </Link>

                    <button className="p-2 text-gray-500 hover:text-black hover:bg-gray-50 rounded-full transition-colors">
                        <Share2 size={20} />
                    </button>
                </div>
            </nav>

            <div className="pt-24 pb-20 max-w-4xl mx-auto px-6">
                {/* Header */}
                <header className="mb-12 text-center max-w-3xl mx-auto">
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6 font-medium uppercase tracking-wider">
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

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 mb-8 leading-[1.1]">
                        {blog.title}
                    </h1>

                    <div className="flex items-center justify-center gap-3">
                        {blog.author?.avatar_url && (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                                <Image
                                    src={blog.author.avatar_url}
                                    alt={blog.author.full_name || 'Author'}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="text-left">
                            <p className="text-sm font-bold text-gray-900 leading-none">
                                {blog.author?.full_name}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                                @{blog.author?.username}
                            </p>
                        </div>
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

                {/* Content Body */}
                <article className="prose prose-lg md:prose-xl prose-neutral max-w-none mx-auto">
                    <ReactMarkdown>{blog.content || ''}</ReactMarkdown>
                </article>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
                        {blog.tags.map(tag => (
                            <span key={tag} className="px-4 py-2 bg-gray-50 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-100 cursor-pointer transition-colors">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}

