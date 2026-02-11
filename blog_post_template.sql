-- ============================================================
-- BLOG POST TEMPLATE FOR AFTER TRIALS
-- ============================================================
-- Copy this file, rename it, and customize the values below
-- Then run in Supabase SQL Editor to publish your blog post
-- ============================================================

INSERT INTO public.blogs (
    title,
    slug,
    excerpt,
    content,
    cover_image,
    published,
    published_at,
    author_id,
    tags,
    seo_title,
    seo_description,
    read_time_minutes
) VALUES (
    -- ============================================================
    -- TITLE (Required)
    -- The main headline of your blog post
    -- ============================================================
    'Your Blog Post Title Here',
    
    -- ============================================================
    -- SLUG (Required, must be unique)
    -- URL-friendly version of title: lowercase, hyphens, no spaces
    -- Example: "my-amazing-blog-post"
    -- ============================================================
    'your-blog-post-slug-here',
    
    -- ============================================================
    -- EXCERPT (Recommended)
    -- 1-2 sentence summary shown in blog listings and previews
    -- Keep it under 200 characters for best display
    -- ============================================================
    'A compelling summary of your blog post that captures reader attention and encourages them to read more.',
    
    -- ============================================================
    -- CONTENT (Required)
    -- Your blog post in Markdown format
    -- Supports: headers, bold, italic, lists, quotes, links, images, code blocks
    -- Note: Use two single quotes ('') to escape apostrophes
    -- ============================================================
    '# Main Heading (H1)

Your introductory paragraph goes here. Make it compelling and set the stage for what readers will learn. **Bold text** and *italic text* work naturally.

## First Section Heading (H2)

Describe your first main point here. Use clear, concise language that adds value to your readers.

### Subsection (H3)

Break down complex topics into digestible subsections:

1.  **Numbered List Item One**: Explanation of the first point
2.  **Numbered List Item Two**: Explanation of the second point
3.  **Numbered List Item Three**: Explanation of the third point

> "An inspiring quote or important callout that stands out from the rest of the content. Use this for key insights or expert opinions."

## Second Section Heading (H2)

Continue building your argument with supporting information:

-   **Bullet Point**: Description of this item
-   **Another Point**: More information here
-   **Third Point**: Final supporting detail

### Including Links and Resources

You can link to external resources like [this example link](https://example.com) or internal pages.

### Including Images

![Alt text description](https://your-image-url.com/image.jpg)

*Caption: Add a caption below images using italics*

## Third Section Heading (H2)

Additional content sections as needed. Consider:

| Feature | Description | Benefit |
|---------|-------------|---------|
| Feature 1 | What it does | Why it matters |
| Feature 2 | What it does | Why it matters |
| Feature 3 | What it does | Why it matters |

### Code Examples (if relevant)

```javascript
// Example code block
const example = "syntax highlighted";
console.log(example);
```

## Conclusion

Summarize your key points and provide a clear call-to-action for readers. What should they do next?

---

*Did you find this article helpful? Share it with your colleagues and [subscribe to our newsletter](https://aftertrials.com) for more insights.*
',
    
    -- ============================================================
    -- COVER IMAGE (Recommended)
    -- URL to the featured image (should be 1200x630 for best display)
    -- Upload to Supabase Storage or use Unsplash/other image hosting
    -- ============================================================
    'https://images.unsplash.com/photo-XXXXXXXXX?auto=format&fit=crop&w=1200&q=80',
    
    -- ============================================================
    -- PUBLISHED (Required)
    -- Set to true to make post publicly visible
    -- Set to false to save as draft
    -- ============================================================
    true,
    
    -- ============================================================
    -- PUBLISHED_AT (Required if published=true)
    -- Use now() for immediate publish, or specify a date
    -- ============================================================
    now(),
    
    -- ============================================================
    -- AUTHOR_ID (Optional)
    -- NULL = displays "After Trials Team"
    -- Or use a valid Supabase auth user UUID
    -- ============================================================
    NULL,
    
    -- ============================================================
    -- TAGS (Recommended)
    -- Array of category tags for filtering and SEO
    -- Use consistent tag names across posts
    -- ============================================================
    ARRAY['Tag One', 'Tag Two', 'Tag Three'],
    
    -- ============================================================
    -- SEO_TITLE (Recommended)
    -- Optimized title for search engines (max 60 characters)
    -- Include primary keyword near the beginning
    -- ============================================================
    'SEO Optimized Title | After Trials',
    
    -- ============================================================
    -- SEO_DESCRIPTION (Recommended)
    -- Meta description for search results (max 160 characters)
    -- Include primary and secondary keywords naturally
    -- ============================================================
    'A compelling meta description that includes your target keywords and encourages search users to click through to your article.',
    
    -- ============================================================
    -- READ_TIME_MINUTES (Recommended)
    -- Estimated reading time in minutes
    -- Calculate: word_count / 200
    -- ============================================================
    5
);

-- ============================================================
-- MARKDOWN FORMATTING REFERENCE
-- ============================================================
-- # H1         -> Main title (use sparingly, once per post)
-- ## H2        -> Section headers
-- ### H3       -> Subsection headers
-- **bold**     -> Bold text
-- *italic*     -> Italic text
-- - item       -> Bullet list
-- 1. item      -> Numbered list
-- > quote      -> Blockquote
-- [text](url)  -> Link
-- ![alt](url)  -> Image
-- `code`       -> Inline code
-- ```lang      -> Code block
-- ---          -> Horizontal rule
-- | col |      -> Tables
-- ============================================================
