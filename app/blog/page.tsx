import { createClient } from '@supabase/supabase-js';
import BlogCard from '@/components/BlogCard';
import InfoPageLayout from '@/components/InfoPageLayout';
import Pagination from '@/components/Pagination';
import { Blog } from '@/types/blog';

// Revalidate every hour for fresh content, but capable of being static cached
export const revalidate = 3600;
const POSTS_PER_PAGE = 12;

async function getBlogs(page: number) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE - 1;

    // Fetch blogs with author details and total count
    const { data, count, error } = await supabase
        .from('blogs')
        .select(`
            *,
            author:author_id(
                full_name,
                avatar_url,
                username
            )
        `, { count: 'exact' })
        .eq('published', true)
        .order('published_at', { ascending: false })
        .range(start, end);

    if (error) {
        console.error('Error fetching blogs:', error);
        return { blogs: [], total: 0 };
    }

    return {
        blogs: (data as unknown as Blog[]) || [],
        total: count || 0
    };
}

interface BlogPageProps {
    searchParams: { page?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const currentPage = Number(searchParams?.page) || 1;
    const { blogs, total } = await getBlogs(currentPage);
    const totalPages = Math.ceil(total / POSTS_PER_PAGE);

    return (
        <InfoPageLayout title="Insights & Updates" showContact={false}>
            <div className="mb-12">
                <p className="text-xl text-gray-600 max-w-2xl font-light">
                    The latest thoughts on healthcare technology, clinical trials, and the future of medical communication.
                </p>
            </div>

            {blogs.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            baseUrl="/blog"
                        />
                    )}
                </>
            ) : (
                <div className="py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <p className="text-gray-500 font-medium">New articles coming soon.</p>
                </div>
            )}
        </InfoPageLayout>
    );
}
