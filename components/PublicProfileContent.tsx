"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Verified,
    MapPin,
    Briefcase,
    GraduationCap,
    Globe,
    ChevronDown,
    ChevronUp,
    FileText,
    QrCode,
    Share2,
    Heart,
    MessageCircle,
    Bookmark,
    Flag,
    MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AppDownloadCta from '@/components/AppDownloadCta';
import DownloadModal from '@/components/DownloadModal';
import { Profile, EvidencePost } from '@/types/supabase';

// Helper type for the UI which might need joined fields
type UIProfile = Profile & {
    followers_count: number;
    following_count: number;
};

type UIPost = EvidencePost & {
    authorName: string;
    authorUsername: string;
    authorAvatarUrl: string;
    likes: number;
    comments: number;
    shares: number;
    isLiked: boolean;
    isBookmarked: boolean;
    hasImage: boolean;
};

interface PublicProfileContentProps {
    profile: UIProfile;
    posts: UIPost[];
    pinnedCanvas?: { id: string; title: string | null } | null;
}

import ProfileShareModal from './ProfileShareModal';

export default function PublicProfileContent({ profile, posts, pinnedCanvas }: PublicProfileContentProps) {
    const [showDetails, setShowDetails] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
    const [headerColors, setHeaderColors] = useState(['#4F46E5', '#EC4899']);

    useEffect(() => {
        const colors = [
            ['#3B82F6', '#8B5CF6'], // Blue -> Purple
            ['#EC4899', '#F43F5E'], // Pink -> Rose
            ['#10B981', '#3B82F6'], // Emerald -> Blue
            ['#F59E0B', '#EF4444'], // Amber -> Red
        ];
        setHeaderColors(colors[Math.floor(Math.random() * colors.length)]);
    }, []);

    const getCanvasSlug = (title: string | null) => {
        if (!title) return 'canvas';
        return title.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    return (
        <div className="min-h-screen bg-white pb-20 font-sans">
            <AppDownloadCta />

            {/* Branding */}
            <div className="absolute top-6 left-6 z-50">
                <Link
                    href="/"
                    className="flex items-center justify-center px-5 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-black/30 transition-all group"
                >
                    <span className="font-[family-name:var(--font-outfit)] font-bold text-sm tracking-[0.15em] uppercase text-white group-hover:opacity-100 opacity-95">
                        After Trials
                    </span>
                </Link>
            </div>

            {/* Header Section */}
            <div className="relative mb-16">
                <div
                    className="h-48 w-full"
                    style={{ background: `linear-gradient(135deg, ${headerColors[0]}, ${headerColors[1]})` }}
                />
                <div className="absolute -bottom-12 left-4">
                    <div className="rounded-full p-1 bg-white">
                        <div className="relative w-24 h-24 rounded-full bg-gray-200 border-4 border-white overflow-hidden shadow-sm">
                            {profile.avatar_url ? (
                                <Image
                                    src={profile.avatar_url}
                                    alt={profile.full_name || 'Avatar'}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                                    <span className="text-2xl">?</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Actions & Info */}
            <div className="px-4 mt-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <h1 className="text-lg font-bold text-black">{profile.full_name}</h1>
                        {profile.verification_status === 'verified' && (
                            <Verified className="w-4 h-4 text-blue-500" fill="currentColor" size={14} stroke="white" />
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Link href="/download" className="h-8 px-4 flex items-center justify-center border border-gray-300 rounded-full text-xs font-bold text-black hover:bg-gray-50 transition-colors">
                            Message
                        </Link>
                        <Link href="/download" className="h-8 px-4 flex items-center justify-center bg-blue-600 text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm">
                            Follow
                        </Link>
                    </div>
                </div>

                <p className="text-sm text-gray-500 font-medium">@{profile.username}</p>
                {profile.bio && (
                    <p className="mt-3 text-[14px] leading-relaxed text-gray-900 font-normal">
                        {profile.bio}
                    </p>
                )}

                <div className="flex items-center gap-6 mt-4 mb-5">
                    <StatItem value={posts.length} label="Posts" />
                    <StatItem value={profile.followers_count} label="Followers" />
                    <StatItem value={profile.following_count} label="Following" />
                </div>

                <div className="flex items-center gap-2 mb-6">
                    {/* View Canvas Button */}
                    {pinnedCanvas ? (
                        <Link href={`/${getCanvasSlug(pinnedCanvas.title)}`} className="flex-1 h-10 bg-blue-50 text-blue-800 rounded-full flex items-center justify-center gap-2 text-[13px] font-semibold hover:bg-blue-100 transition-colors">
                            <FileText size={16} />
                            <span>View Canvas</span>
                        </Link>
                    ) : (
                        <button disabled className="flex-1 h-10 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center gap-2 text-[13px] font-semibold cursor-not-allowed">
                            <FileText size={16} />
                            <span>No Canvas Yet</span>
                        </button>
                    )}
                    <button
                        onClick={() => setIsShareModalOpen(true)}
                        className="h-10 w-10 bg-blue-50 text-blue-800 rounded-[14px] flex items-center justify-center hover:bg-blue-100 transition-colors"
                    >
                        <QrCode size={18} />
                    </button>
                </div>
            </div>

            <ProfileShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                profile={{
                    fullName: profile.full_name || 'User',
                    username: profile.username || 'user',
                    avatarUrl: profile.avatar_url,
                    specialization: profile.specialization,
                    degree: profile.degree,
                    institution: profile.institution,
                    country: profile.country,
                    bio: profile.bio,
                    followersCount: profile.followers_count,
                    followingCount: profile.following_count,
                    verificationStatus: profile.verification_status,
                }}
                profileUrl={typeof window !== 'undefined' ? window.location.href : `https://aftertrials.com/${profile.username}`}
            />

            <DownloadModal
                isOpen={isDownloadModalOpen}
                onClose={() => setIsDownloadModalOpen(false)}
                onJoinWaitlist={() => {
                    setIsDownloadModalOpen(false);
                    // Navigate to home page waitlist
                    window.location.href = '/#waitlist';
                }}
            />

            <div className="mb-8 px-4">
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex items-center gap-1 text-[13px] font-semibold text-gray-600 mb-3 hover:text-black transition-colors"
                >
                    {showDetails ? "Less info" : "More info"}
                    {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                <AnimatePresence>
                    {showDetails && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden space-y-3"
                        >
                            <DetailRow icon={<Briefcase size={14} />} text={profile.specialization} />
                            <DetailRow icon={<GraduationCap size={14} />} text={profile.degree} />
                            <DetailRow icon={<Globe size={14} />} text={profile.institution} />
                            <DetailRow icon={<MapPin size={14} />} text={profile.country} />
                            <div className="h-2" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>


            {/* Posts Section */}
            <div className="border-t border-gray-100">
                {posts.map((post) => (
                    <EvidenceCard
                        key={post.id}
                        post={post}
                        onInteract={() => setIsDownloadModalOpen(true)}
                    />
                ))}

                <div className="p-8 text-center">
                    <p className="text-gray-400 text-sm mb-4">Join After Trials to see full activity</p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg justify-center items-center">
                        {/* App Store Badge */}
                        <button
                            onClick={() => setIsDownloadModalOpen(true)}
                            className="flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-900 transition-all hover:scale-105 active:scale-95 shadow-md min-w-[160px]"
                        >
                            <svg viewBox="0 0 384 512" fill="currentColor" className="w-8 h-8">
                                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 78.3c14.2 38.4 49.7 96.5 83.3 90.6 27.7-4.7 49-21.4 74.4-21.4 24.8 0 52.7 19.1 77.3 18.2 37.8-1.5 54.1-39.6 82.3-90.6 6.9-13.9 16.6-35.7 16.6-37.5 0-.1-2.9-1.4-29.4-15.3l-4.2-2.1zm-58.1-177a76.1 76.1 0 0 1-2.9-29.8c-30.7 2.1-64.2 21.8-80.1 48.6-14.7 24.7-10.9 59.9-10.9 59.9 29.8 2.1 63.3-17.7 80.1-43.6 13.9-21.6 15.7-49.8 13.8-55.1z" />
                            </svg>
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-[10px] uppercase font-medium text-white/80">Download on the</span>
                                <span className="text-lg font-semibold tracking-wide">App Store</span>
                            </div>
                        </button>

                        {/* Google Play Badge */}
                        <button
                            onClick={() => setIsDownloadModalOpen(true)}
                            className="flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-900 transition-all hover:scale-105 active:scale-95 shadow-md min-w-[160px]"
                        >
                            <svg viewBox="0 0 512 512" fill="currentColor" className="w-7 h-7 ml-1">
                                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3-60.1-60.1L69.8 479l34.8 20z" />
                            </svg>
                            <div className="flex flex-col items-start leading-none pl-1">
                                <span className="text-[10px] uppercase font-medium text-white/80">GET IT ON</span>
                                <span className="text-lg font-semibold tracking-wide">Google Play</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

// --- Sub-components ---

function StatItem({ value, label }: { value: number, label: string }) {
    return (
        <div className="flex items-baseline gap-1 cursor-pointer">
            <span className="font-bold text-black text-sm">{value}</span>
            <span className="text-gray-500 text-sm">{label}</span>
        </div>
    );
}

function DetailRow({ icon, text }: { icon: React.ReactNode, text?: string | null }) {
    if (!text || text === "") return null;
    return (
        <div className="flex items-center gap-3 text-gray-600 text-[13px]">
            <div className="w-5 flex justify-center text-gray-400">{icon}</div>
            <span>{text}</span>
        </div>
    );
}

// --- Evidence Card (Matched to Flutter) ---
function EvidenceCard({ post, onInteract }: { post: UIPost, onInteract: () => void }) {
    return (
        <div
            onClick={onInteract}
            className="border-b border-gray-100 bg-white cursor-pointer hover:bg-gray-50/50 transition-colors"
        >
            {/* Increased left padding significantly for 'modern touch' open space */}
            <div className="pl-10 pr-4 py-4 flex gap-4">

                {/* Avatar */}
                <div className="flex-shrink-0">
                    <Link href={`/${post.authorUsername}`} onClick={(e) => e.stopPropagation()}>
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                            {post.authorAvatarUrl && (
                                <Image
                                    src={post.authorAvatarUrl}
                                    alt={post.authorName}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </div>
                    </Link>
                </div>

                {/* Content Column */}
                <div className="flex-1 min-w-0">

                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[15px] overflow-hidden">
                            <span className="font-bold text-black truncate">{post.authorName}</span>
                            <span className="text-gray-500 text-[15px]">·</span>
                            <span className="text-gray-500 text-[15px] truncate">@{post.authorUsername}</span>
                            {post.specialization && (
                                <>
                                    <span className="text-gray-500 text-[15px]">·</span>
                                    <span className="text-gray-500 text-[15px] truncate">{post.specialization}</span>
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                            <span className="text-[13px] text-gray-500">{formatTimeAgo(post.created_at)}</span>
                            <MoreHorizontal size={16} className="text-gray-400" />
                        </div>
                    </div>

                    {/* Text Body */}
                    <div className="mt-0.5">
                        <p className="text-[15px] text-black leading-snug whitespace-pre-wrap">
                            {post.summary}
                        </p>
                    </div>

                    {/* Image Attachment */}
                    {post.hasImage && (
                        <div className="mt-3 relative w-full h-64 rounded-2xl overflow-hidden border border-gray-100">
                            <Image
                                src="https://placehold.co/600x400/png?text=Case+Study"
                                alt="Attachment"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    {/* Footer Actions */}
                    <div className="mt-3 flex items-center justify-between max-w-[420px]">
                        {/* Upvote */}
                        <ActionItem
                            icon={<Heart size={18} className={post.isLiked ? "fill-[#F91880] text-[#F91880]" : ""} />}
                            count={post.likes}
                            colorHover="hover:text-[#F91880] hover:bg-[#F91880]/10"
                            activeColor="text-[#F91880]"
                            isActive={post.isLiked}
                        />

                        {/* Comment */}
                        <ActionItem
                            icon={<MessageCircle size={18} />}
                            count={post.comments}
                            colorHover="hover:text-[#1D9BF0] hover:bg-[#1D9BF0]/10"
                        />

                        {/* Share */}
                        <ActionItem
                            icon={<Share2 size={18} />}
                            count={post.shares}
                            colorHover="hover:text-[#1D9BF0] hover:bg-[#1D9BF0]/10"
                        />

                        {/* Bookmark & Report (Icon Only) */}
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-full transition-colors hover:bg-blue-50 ${post.isBookmarked ? 'text-blue-500' : 'text-gray-500'}`}>
                                <Bookmark size={18} className={post.isBookmarked ? "fill-current" : ""} />
                            </div>
                            <div className="p-2 rounded-full transition-colors hover:bg-gray-100 text-gray-400">
                                <Flag size={18} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function formatTimeAgo(dateString?: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    const weeks = Math.floor(days / 7);
    return `${weeks}w`;
}

function ActionItem({ icon, count, colorHover, isActive = false, activeColor = "" }: any) {
    return (
        <div className={`flex items-center gap-1.5 group cursor-pointer text-gray-500 ${colorHover} ${isActive ? activeColor : ''} transition-colors p-1.5 -ml-2 rounded-full`}>
            {/* Icon Wrapper for extra hover circle effect */}
            <div className={`p-1.5 rounded-full group-hover:bg-current/10`}>
                {icon}
            </div>
            {count !== undefined && (
                <span className="text-[13px] font-medium">{count}</span>
            )}
        </div>
    );
}
