'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';

// Import highlight.js theme
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

// Code block with copy functionality
function CodeBlock({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
    const [copied, setCopied] = useState(false);
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';

    const handleCopy = async () => {
        const text = String(children).replace(/\n$/, '');
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Inline code
    if (!className) {
        return (
            <code className="px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded text-sm font-mono" {...props}>
                {children}
            </code>
        );
    }

    // Code block
    return (
        <div className="relative group my-6">
            {language && (
                <div className="absolute top-0 left-0 px-3 py-1 text-xs font-medium text-gray-400 bg-gray-800 rounded-tl-lg rounded-br-lg">
                    {language}
                </div>
            )}
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                title="Copy code"
            >
                {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
            <code className={`${className} block overflow-x-auto p-4 pt-8 bg-gray-900 text-gray-100 rounded-xl text-sm`} {...props}>
                {children}
            </code>
        </div>
    );
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
    return (
        <ReactMarkdown
            className={`prose prose-lg md:prose-xl prose-neutral max-w-none ${className}`}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
                rehypeHighlight,
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: 'wrap' }]
            ]}
            components={{
                // Custom link rendering
                a: ({ href, children, ...props }) => {
                    const isExternal = href?.startsWith('http');

                    if (isExternal) {
                        return (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 hover:text-purple-800 underline decoration-purple-300 hover:decoration-purple-600 transition-colors inline-flex items-center gap-1"
                                {...props}
                            >
                                {children}
                                <ExternalLink size={14} className="inline-block" />
                            </a>
                        );
                    }

                    return (
                        <Link
                            href={href || '#'}
                            className="text-purple-600 hover:text-purple-800 underline decoration-purple-300 hover:decoration-purple-600 transition-colors"
                            {...props}
                        >
                            {children}
                        </Link>
                    );
                },

                // Custom image rendering with Next.js Image
                img: ({ src, alt }) => {
                    if (!src) return null;

                    return (
                        <figure className="my-8">
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                                <Image
                                    src={src}
                                    alt={alt || 'Blog image'}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 800px"
                                />
                            </div>
                            {alt && (
                                <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
                                    {alt}
                                </figcaption>
                            )}
                        </figure>
                    );
                },

                // Code blocks with copy button
                code: CodeBlock,

                // Enhanced blockquotes
                blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-purple-500 pl-6 py-2 my-6 bg-purple-50 rounded-r-xl italic text-gray-700">
                        {children}
                    </blockquote>
                ),

                // Enhanced tables
                table: ({ children }) => (
                    <div className="overflow-x-auto my-8 rounded-xl border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            {children}
                        </table>
                    </div>
                ),
                thead: ({ children }) => (
                    <thead className="bg-gray-50">{children}</thead>
                ),
                th: ({ children }) => (
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        {children}
                    </th>
                ),
                td: ({ children }) => (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-t border-gray-100">
                        {children}
                    </td>
                ),

                // Enhanced headings with anchor links
                h1: ({ children, id }) => (
                    <h1 id={id} className="text-4xl font-black mt-12 mb-6 scroll-mt-24 group">
                        {children}
                        {id && (
                            <a href={`#${id}`} className="ml-2 opacity-0 group-hover:opacity-50 text-gray-400 hover:text-purple-600 transition-opacity">
                                #
                            </a>
                        )}
                    </h1>
                ),
                h2: ({ children, id }) => (
                    <h2 id={id} className="text-3xl font-bold mt-10 mb-4 scroll-mt-24 group">
                        {children}
                        {id && (
                            <a href={`#${id}`} className="ml-2 opacity-0 group-hover:opacity-50 text-gray-400 hover:text-purple-600 transition-opacity">
                                #
                            </a>
                        )}
                    </h2>
                ),
                h3: ({ children, id }) => (
                    <h3 id={id} className="text-2xl font-semibold mt-8 mb-3 scroll-mt-24 group">
                        {children}
                        {id && (
                            <a href={`#${id}`} className="ml-2 opacity-0 group-hover:opacity-50 text-gray-400 hover:text-purple-600 transition-opacity">
                                #
                            </a>
                        )}
                    </h3>
                ),

                // Enhanced lists with checkboxes (GFM)
                ul: ({ children }) => (
                    <ul className="list-disc list-outside pl-6 my-4 space-y-2">
                        {children}
                    </ul>
                ),
                ol: ({ children }) => (
                    <ol className="list-decimal list-outside pl-6 my-4 space-y-2">
                        {children}
                    </ol>
                ),
                li: ({ children, ...props }) => {
                    // Check for task list items
                    const hasCheckbox = children &&
                        Array.isArray(children) &&
                        children[0]?.props?.type === 'checkbox';

                    if (hasCheckbox) {
                        return (
                            <li className="flex items-start gap-2 list-none -ml-6" {...props}>
                                {children}
                            </li>
                        );
                    }

                    return <li className="text-gray-700" {...props}>{children}</li>;
                },

                // Horizontal rule
                hr: () => (
                    <hr className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                ),

                // Paragraph styling
                p: ({ children }) => (
                    <p className="my-4 text-gray-700 leading-relaxed">
                        {children}
                    </p>
                ),

                // Strikethrough (GFM)
                del: ({ children }) => (
                    <del className="text-gray-500 line-through">{children}</del>
                ),

                // Strong/bold
                strong: ({ children }) => (
                    <strong className="font-bold text-gray-900">{children}</strong>
                ),

                // Emphasis/italic
                em: ({ children }) => (
                    <em className="italic text-gray-800">{children}</em>
                ),

                // Pre block wrapper
                pre: ({ children }) => (
                    <pre className="!p-0 !bg-transparent !m-0">
                        {children}
                    </pre>
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
