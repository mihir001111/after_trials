# Blog Post Format Guide for After Trials

## SQL Structure

```sql
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
    'Your Title Here',
    'your-slug-here',
    'Your excerpt here (1-2 sentences)',
    'YOUR MARKDOWN CONTENT HERE',
    'https://your-cover-image-url.com/image.jpg',
    true,
    now(),
    NULL,
    ARRAY['Tag1', 'Tag2', 'Tag3'],
    'SEO Title | After Trials',
    'Meta description for search engines (max 160 chars)',
    5
);
```

---

## Markdown Content Format

Copy everything between the quotes for the `content` field:

```markdown
# Main Title (H1)

Opening paragraph with **bold** and *italic* text. Hook the reader here.

## Section Heading (H2)

Regular paragraph text explaining the section topic.

### Subsection (H3)

More detailed breakdown of the topic.

#### Sub-subsection (H4)

Even deeper detail when needed.

---

## Lists

### Bullet List
-   **Bold label**: Description text
-   **Another item**: More description
-   **Third item**: Final point

### Numbered List
1.  **First step**: Explanation
2.  **Second step**: Explanation
3.  **Third step**: Explanation

---

## Blockquotes

> "This is a quote or important callout that stands out from the text."

---

## Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1 A  | Row 1 B  | Row 1 C  |
| Row 2 A  | Row 2 B  | Row 2 C  |
| Row 3 A  | Row 3 B  | Row 3 C  |

---

## Links

[Link Text](https://example.com)

[Internal Link](/blog/another-post)

---

## Images

![Image description](https://your-image-url.com/image.jpg)

*Caption in italics below the image*

---

## Code Blocks

Inline code: `const example = true;`

Code block:
```javascript
function example() {
    return "Hello World";
}
```

---

## Horizontal Rule

---

## Conclusion

Final paragraph summarizing key points.

*Call to action in italics with [link](https://aftertrials.com)*
```

---

## Quick Reference

| Element | Markdown Syntax |
|---------|-----------------|
| H1 | `# Title` |
| H2 | `## Section` |
| H3 | `### Subsection` |
| Bold | `**text**` |
| Italic | `*text*` |
| Link | `[text](url)` |
| Image | `![alt](url)` |
| Quote | `> quote text` |
| Bullet | `-   item` |
| Numbered | `1.  item` |
| Code | `` `code` `` |
| Rule | `---` |

---

## Important Notes

1. **Escape apostrophes**: Use `''` (two single quotes) instead of `'` in SQL
2. **Read time calc**: word count ÷ 200 = minutes
3. **Cover image**: Use 1200x630px for best display
4. **SEO title**: Max 60 characters
5. **Meta description**: Max 160 characters
6. **Slug**: lowercase, hyphens only, no spaces
