export type Profile = {
    id: string;
    updated_at: string | null;
    full_name: string | null;
    bio: string | null;
    specialization: string | null;
    avatar_url: string | null;
    registration_number: string | null;
    degree: string | null;
    institution: string | null;
    graduation_year: number | null;
    verification_status: string | null; // e.g., 'pending_submission'
    country: string | null;
    username: string | null;
    presence_status: string | null; // e.g., 'offline'
    last_seen: string | null;
    user_type: string | null; // e.g., 'doctor'
    city: string | null;
    gender: string | null;
    website: string | null;
    linkedin: string | null;
    workplace: string | null;
    experience_years: number | null;
    languages: string | null;
    total_posts: number | null;
    current_streak: number | null;
    last_streak_date: string | null;
    referred_by: string | null; // uuid
    created_at: string | null;
    current_academic_year: string | null;

    // Computed/Joined fields (if any)
    followers_count?: number; // Usually fetched via count
    following_count?: number; // Usually fetched via count
};

export type Canvas = {
    id: string;
    author_id: string;
    title: string | null;
    content: any | null; // jsonb, can specify stricter type if structure is known
    is_published: boolean | null;
    is_pinned_to_profile: boolean | null;
    view_count: number | null;
    share_count: number | null;
    created_at: string;
    updated_at: string;

    // Computed/Joined
    author?: Profile;
};

export type EvidencePost = {
    id: string;
    author_id: string;
    title: string;
    summary: string | null;
    tags: string[] | null;
    upvote_count: number;
    created_at: string;
    fts: any | null; // tsvector
    specialization: string | null;
    comment_count: number | null;
    updated_at: string | null;
    share_count: number;
    bookmark_count: number | null;
    view_count: number | null;
    global_score: number | null;

    // Computed/Joined
    author?: Profile;
    // Interaction states (user specific, often require separate logic or boolean flags)
    is_liked?: boolean;
    is_bookmarked?: boolean;
};

export type Follower = {
    id: number;
    follower_id: string; // references profiles.id
    following_id: string; // references profiles.id
    created_at: string;
};

// Helper for 'followers' and 'following' counts if they are not directly on profile table
// But per schema 'total_posts' IS on profile. checking schema for followers...
// Schema provided for profiles does NOT include follower_count.
// We will need to assume a 'follows' table exists or just mock the count for now if table not provided.
// For now, I will add optional properties for counts.
