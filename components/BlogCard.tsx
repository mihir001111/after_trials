import Link from 'next/link';
import Image from 'next/image';
import { Blog } from '@/types/blog';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

interface BlogCardProps {
    blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
    return (
        <article className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
            {/* Image Container */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100">
                {blog.cover_image ? (
                    <Image
                        src={blog.cover_image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <span className="text-4xl font-light">Aa</span>
                    </div>
                )}

                {/* Categories/Tags Overlay */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="absolute top-4 left-4 flex gap-2">
                        {blog.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider rounded-full text-black">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium">
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <time dateTime={blog.published_at || blog.created_at}>
                            {new Date(blog.published_at || blog.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </time>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{blog.read_time_minutes} min read</span>
                    </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold mb-3 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                    <Link href={`/blog/${blog.slug}`}>
                        {blog.title}
                    </Link>
                </h2>

                <p className="text-gray-600 mb-6 flex-1 line-clamp-3 text-sm leading-relaxed">
                    {blog.excerpt || blog.seo_description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-3">
                        {blog.author?.avatar_url ? (
                            <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                <Image
                                    src={blog.author.avatar_url}
                                    alt={blog.author.full_name || 'Author'}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-100" />
                        )}
                        <span className="text-sm font-medium text-gray-900">
                            {blog.author?.full_name || 'After Trials Team'}
                        </span>
                    </div>

                    <Link
                        href={`/blog/${blog.slug}`}
                        className="p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded-full transition-all"
                    >
                        <ArrowUpRight size={20} />
                    </Link>
                </div>
            </div>
        </article>
    );
}
