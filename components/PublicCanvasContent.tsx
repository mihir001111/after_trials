"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Share2,
    Bookmark,
    ArrowLeft,
    BarChart2,
    Stethoscope,
    Briefcase,
    GraduationCap,
    MapPin,
    Lock
} from 'lucide-react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import AppDownloadCta from '@/components/AppDownloadCta';
import { Canvas, Profile } from '@/types/supabase';

// Helper types for UI
type UIAuthor = Profile & {
    followers_count: number;
    following_count: number;
};

type UICanvas = Canvas & {
    author: UIAuthor;
    post_count: number; // Mock or calculate
    content_blocks: any[]; // Parsed from jsonb
};

interface PublicCanvasContentProps {
    canvas: UICanvas;
}

export default function PublicCanvasContent({ canvas }: PublicCanvasContentProps) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [showStickyHeader, setShowStickyHeader] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: canvas.title || 'Canvas',
                    text: `Check out this canvas by ${canvas.author.full_name} on After Trials`,
                    url: url
                });
            } catch (err) {
                // Ignore user abort
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                alert("Link copied to clipboard!");
            } catch (err) {
                console.error("Failed to copy link", err);
            }
        }
    };

    const handleBookmark = () => {
        setShowAuthModal(true);
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowStickyHeader(window.scrollY > 150);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!canvas) return null;

    return (
        <div className="min-h-screen bg-white">
            {/* Top Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-[#00D287] origin-left z-50"
                style={{ scaleX }}
            />

            {/* Sticky App Bar */}
            <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${showStickyHeader ? 'bg-white/98 shadow-sm backdrop-blur-sm border-b border-gray-100' : 'bg-transparent'}`}>
                <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
                    <Link href="/" className="p-2 -ml-2 text-black">
                        <ArrowLeft size={20} />
                    </Link>

                    <AnimatePresence>
                        {showStickyHeader ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="flex items-center gap-3"
                            >
                                <span className="font-[family-name:var(--font-outfit)] font-bold text-[10px] tracking-[0.15em] uppercase text-gray-400">
                                    After Trials
                                </span>
                                <div className="w-px h-3 bg-gray-200" />
                                <span className="font-semibold text-sm text-black">
                                    {canvas.author.full_name}
                                </span>
                            </motion.div>
                        ) : (
                            <Link href="/" className="flex items-center justify-center px-4 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                <span className="font-[family-name:var(--font-outfit)] font-bold text-xs tracking-[0.15em] uppercase text-black">
                                    After Trials
                                </span>
                            </Link>
                        )}
                    </AnimatePresence>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={handleShare}
                            className="p-2 text-black/80 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <Share2 size={20} />
                        </button>
                        <button
                            onClick={handleBookmark}
                            className="p-2 text-black/80 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <Bookmark size={20} />
                        </button>
                    </div>
                </div>
            </header >

            {/* Auth Suggestion Modal */}
            <AnimatePresence>
                {
                    showAuthModal && (
                        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowAuthModal(false)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative bg-white rounded-2xl w-full max-w-sm p-6 overflow-hidden shadow-2xl"
                            >
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Bookmark size={24} className="fill-current" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Save this Canvas</h3>
                                    <p className="text-gray-500 text-[15px] mb-6 leading-relaxed">
                                        Create an account or download the app to bookmark canvases and build your personal library.
                                    </p>
                                    <AppDownloadCta variant="inline" />
                                    <button
                                        onClick={() => setShowAuthModal(false)}
                                        className="mt-4 text-sm font-semibold text-gray-400 hover:text-gray-600"
                                    >
                                        Maybe later
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence >

            {/* Main Content */}
            < div className="max-w-[700px] mx-auto px-6 pb-20 pt-20" >

                {/* 1. Author Header */}
                < Link href={`/${canvas.author.username}`
                } className="flex items-center gap-3.5 mb-6 group" >
                    <div className="relative w-[50px] h-[50px] rounded-full border border-gray-200 overflow-hidden">
                        {canvas.author.avatar_url && (
                            <Image
                                src={canvas.author.avatar_url}
                                alt={canvas.author.full_name || 'Author'}
                                fill
                                className="object-cover"
                            />
                        )}
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-black leading-tight group-hover:underline decoration-2 underline-offset-2 decoration-black/20">
                            {canvas.author.full_name}
                        </h2>
                        <div className="flex items-center gap-2 text-[13px] text-gray-500 mt-0.5 font-medium">
                            <span>
                                {new Date(canvas.created_at).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                            <span className="w-[3px] h-[3px] rounded-full bg-gray-300" />
                            <span>3 min read</span>
                        </div>
                    </div>
                </Link >

                {/* 2. Stats Row (Gray Box) */}
                < div className="bg-[#F9FAFB] rounded-xl py-4 flex items-end justify-evenly mb-4" >
                    <StatBox label="Posts" value={canvas.post_count} />
                    <StatBox label="Following" value={canvas.author.following_count} isProminent />
                    <StatBox label="Followers" value={canvas.author.followers_count} />
                </div >

                {/* 3. Pill Details */}
                < div className="flex flex-wrap gap-2 mb-8" >
                    <DetailPill icon={<Stethoscope size={12} />} text={canvas.author.specialization || ''} />
                    <DetailPill icon={<Briefcase size={12} />} text={canvas.author.workplace || ''} />
                    <DetailPill icon={<GraduationCap size={12} />} text={canvas.author.degree || ''} />
                    <DetailPill icon={<MapPin size={12} />} text={canvas.author.country || ''} />
                </div >

                {/* 4. Canvas Title */}
                < h1 className="text-[26px] font-bold text-black leading-[1.1] tracking-tight mb-8" >
                    {canvas.title}
                </h1 >

                <div className="h-px bg-gray-100 w-full mb-8" />

                {/* 5. Canvas Content */}
                <div className="space-y-4 text-[16px] text-gray-900 leading-7">
                    {canvas.content_blocks.map((block, idx) => {
                        // Handle Text Blocks
                        if (block.type === 'text' && block.data?.text) {
                            return (
                                <p key={block.id || idx} className="whitespace-pre-wrap">
                                    {block.data.text}
                                </p>
                            );
                        }

                        // Handle Image Blocks
                        if (block.type === 'image' && block.data?.url) {
                            return (
                                <div key={block.id || idx} className="my-6">
                                    <img
                                        src={block.data.url}
                                        alt="Canvas Content"
                                        className="w-full rounded-xl border border-gray-100"
                                    />
                                </div>
                            );
                        }

                        // Fallback for flat structure or other types if they exist old format
                        if (block.content && typeof block.content === 'string') {
                            return <p key={idx} className="mb-4">{block.content}</p>;
                        }

                        return null;
                    })}

                    {/* Access CTA at the bottom */}
                    <div className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock size={20} />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-black">Access Full Discussion</h3>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                            Join After Trials to read the full case analysis and view imaging data.
                        </p>
                        <AppDownloadCta variant="inline" />
                    </div>
                </div>

                <div className="h-12" />
                <div className="h-px bg-gray-100 w-full mb-8" />

                {/* 6. Simplified "More Profile" action */}
                <div className="bg-[#F9FAFB] border border-gray-200 rounded-[20px] p-6 text-center">
                    <p className="text-sm font-medium text-gray-500 mb-4">
                        Want to see more from {canvas.author.full_name}?
                    </p>
                    <Link
                        href={`/${canvas.author.username}`}
                        className="block w-full bg-black text-white font-semibold text-sm py-4 rounded-[16px] hover:bg-gray-800 transition-colors"
                    >
                        View Full Profile
                    </Link>
                </div>



            </div >
        </div >
    );
}

function StatBox({ label, value, isProminent = false }: { label: string, value: number, isProminent?: boolean }) {
    return (
        <div className="flex flex-col items-center">
            <span className={`text-black font-extrabold ${isProminent ? 'text-2xl' : 'text-base'} tracking-tight`}>
                {value}
            </span>
            <span className={`text-gray-400 font-bold uppercase ${isProminent ? 'text-[11px]' : 'text-[10px]'} tracking-wide`}>
                {label}
            </span>
        </div>
    );
}

function DetailPill({ icon, text }: { icon: React.ReactNode, text: string | null }) {
    if (!text) return null;
    return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full">
            <div className="text-gray-500">{icon}</div>
            <span className="text-[12px] font-medium text-gray-700">{text}</span>
        </div>
    );
}
