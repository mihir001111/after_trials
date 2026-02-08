import { createClient } from '@/utils/supabase/server';
import BlogCard from '@/components/BlogCard';
import InfoPageLayout from '@/components/InfoPageLayout';
import { Blog } from '@/types/blog';

// Revalidate every hour for fresh content, but capable of being static cached
export const revalidate = 3600;

async function getBlogs() {
    const supabase = await createClient();

    // Fetch blogs with author details
    // Only published blogs
    const { data, error } = await supabase
        .from('blogs')
        .select(`
            *,
            author:author_id(
                full_name,
                avatar_url,
                username
            )
        `)
        .eq('published', true)
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }

    return (data as unknown as Blog[]) || [];
}

export default async function BlogPage() {
    const blogs = await getBlogs();

    return (
        <InfoPageLayout title="Insights & Updates" showContact={false}>
            <div className="mb-12">
                <p className="text-xl text-gray-600 max-w-2xl font-light">
                    The latest thoughts on healthcare technology, clinical trials, and the future of medical communication.
                </p>
            </div>

            {blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <p className="text-gray-500 font-medium">New articles coming soon.</p>
                </div>
            )}
        </InfoPageLayout>
    );
}
