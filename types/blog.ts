export type Blog = {
    id: string;
    created_at: string;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string | null;
    cover_image: string | null;
    author_id: string | null;
    published: boolean;
    published_at: string | null;
    tags: string[] | null;
    seo_title: string | null;
    seo_description: string | null;
    view_count: number;
    read_time_minutes: number;
    author?: {
        full_name: string | null;
        avatar_url: string | null;
        username: string | null;
    };
};
