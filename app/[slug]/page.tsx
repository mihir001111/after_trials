import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import PublicProfileContent from '@/components/PublicProfileContent';
import PublicCanvasContent from '@/components/PublicCanvasContent';

// Force dynamic since we are fetching data that might change
export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const supabase = await createClient();

    // 1. Try to find Profile (by username)
    // Using ilike for case-insensitive username match
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .ilike('username', slug)
        .single();

    if (profile) {
        // --- PROFILE LOGIC ---
        // Fetch Posts
        const { data: postsData } = await supabase
            .from('evidence_posts')
            .select('*')
            .eq('author_id', profile.id)
            .order('created_at', { ascending: false });

        // Fetch Latest/Pinned Canvas (need Title for link now!)
        const { data: latestCanvas } = await supabase
            .from('canvases')
            .select('id, title')
            .eq('author_id', profile.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        // Fetch Counts
        const { count: followersCount } = await supabase
            .from('followers')
            .select('*', { count: 'exact', head: true })
            .eq('following_id', profile.id);

        const { count: followingCount } = await supabase
            .from('followers')
            .select('*', { count: 'exact', head: true })
            .eq('follower_id', profile.id);

        const uiProfile = {
            ...profile,
            followers_count: followersCount || 0,
            following_count: followingCount || 0,
        };

        const uiPosts = postsData?.map(post => ({
            ...post,
            authorName: profile.full_name || 'User',
            authorUsername: profile.username || 'user',
            authorAvatarUrl: profile.avatar_url || '',
            likes: post.upvote_count || 0,
            comments: post.comment_count || 0,
            shares: post.share_count || 0,
            isLiked: false,
            isBookmarked: false,
            hasImage: false
        })) || [];

        return <PublicProfileContent
            profile={uiProfile}
            posts={uiPosts}
            pinnedCanvas={latestCanvas}
        />;
    }

    // 2. If no profile, try to find Canvas
    // Logic: title ilike unslugified(slug) OR id = slug

    let canvas = null;

    // Check if slug is a valid UUID?
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(slug);

    if (isUuid) {
        const { data } = await supabase
            .from('canvases')
            .select('*')
            .eq('id', slug)
            .single();
        canvas = data;
    } else {
        // Try fuzzy title match
        // "bla-bla-bla" -> "bla bla bla"
        const titleQuery = slug.replace(/-/g, ' ');
        const { data } = await supabase
            .from('canvases')
            .select('*')
            .ilike('title', titleQuery)
            .maybeSingle(); // Use maybeSingle to avoid error on multiple/none, or just accept first

        // Note: ilike is case insensitive. 'my-title' -> 'my title' matches 'My Title'.

        canvas = data;
    }

    if (!canvas) {
        return notFound();
    }

    // --- CANVAS LOGIC ---
    // Fetch Author
    const { data: author } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', canvas.author_id)
        .single();

    if (!author) return notFound();

    const { count: followersCount } = await supabase
        .from('followers')
        .select('*', { count: 'exact', head: true })
        .eq('following_id', author.id);

    const { count: followingCount } = await supabase
        .from('followers')
        .select('*', { count: 'exact', head: true })
        .eq('follower_id', author.id);

    const uiCanvas = {
        ...canvas,
        author: {
            ...author,
            followers_count: followersCount || 0,
            following_count: followingCount || 0,
        },
        post_count: 5,
        content_blocks: typeof canvas.content === 'string'
            ? JSON.parse(canvas.content)
            : (Array.isArray(canvas.content) ? canvas.content : []),
    };

    return <PublicCanvasContent canvas={uiCanvas} />;
}
