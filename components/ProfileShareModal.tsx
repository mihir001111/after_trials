"use client";

import { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { X, Download, Link as LinkIcon, Palette, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ProfileShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    profile: {
        fullName: string;
        username: string;
        avatarUrl?: string | null;
        specialization?: string | null;
        degree?: string | null;
        institution?: string | null;
        country?: string | null;
        bio?: string | null;
        followersCount: number;
        followingCount: number;
        verificationStatus?: string | null;
    };
    profileUrl: string;
}

const GRADIENT_THEMES = [
    ['#6366F1', '#8B5CF6', '#D946EF'], // Indigo/Purple
    ['#0F172A', '#334155', '#1E293B'], // Midnight Slate
    ['#059669', '#10B981', '#34D399'], // Emerald Flow
    ['#EA580C', '#F97316', '#FDBA74'], // Burnt Orange
    ['#2563EB', '#3B82F6', '#60A5FA'], // Royal Blue
    ['#BE123C', '#E11D48', '#F43F5E'], // Rose Red
    ['#000000', '#434343', '#000000'], // Pure Dark
];

export default function ProfileShareModal({ isOpen, onClose, profile, profileUrl }: ProfileShareModalProps) {
    const [themeIndex, setThemeIndex] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setThemeIndex(Math.floor(Math.random() * GRADIENT_THEMES.length));
    }, [isOpen]);

    const currentGradient = GRADIENT_THEMES[themeIndex];

    const handleShuffle = () => {
        setThemeIndex((prev) => (prev + 1) % GRADIENT_THEMES.length);
    };

    const handleDownload = async () => {
        if (!cardRef.current || isSaving) return;
        setIsSaving(true);
        try {
            const canvas = await html2canvas(cardRef.current, {
                scale: 3,
                useCORS: true,
                backgroundColor: null,
                logging: false,
            });
            const link = document.createElement('a');
            link.download = `after-trials-${profile.username}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error("Failed to save card:", err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(profileUrl);
        // Toast logic to be added
        alert("Link copied!");
    };

    const detailsString = [profile.country, profile.degree].filter(Boolean).join(' • ');

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center bg-black/60 backdrop-blur-sm p-4 sm:p-0">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-sm bg-white rounded-t-[24px] sm:rounded-[24px] overflow-hidden flex flex-col max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={20} className="text-black" />
                            </button>
                            <h2 className="text-sm font-bold text-gray-900">Share Profile</h2>
                            <button onClick={handleShuffle} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <Palette size={20} className="text-black" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 flex flex-col items-center">

                            {/* Responsive Card - No fixed aspect ratio, just nice spacing */}
                            <div className="w-full flex justify-center mb-6">
                                <div
                                    ref={cardRef}
                                    onClick={handleShuffle}
                                    className="relative w-full overflow-hidden rounded-[24px] shadow-2xl cursor-pointer select-none"
                                    style={{
                                        background: `linear-gradient(135deg, ${currentGradient[0]}, ${currentGradient[1]}, ${currentGradient[2]})`
                                    }}
                                >
                                    {/* Texture */}
                                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />

                                    <div className="relative p-6 flex flex-col items-center text-center">

                                        {/* Avatar */}
                                        <div className="relative mb-4">
                                            <div className="p-1 rounded-full bg-white/20 backdrop-blur-sm">
                                                <div className="relative w-20 h-20 rounded-full bg-black/20 overflow-hidden border-2 border-white/60">
                                                    {profile.avatarUrl ? (
                                                        <Image
                                                            src={profile.avatarUrl}
                                                            alt={profile.fullName}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-300 text-white">
                                                            <span className="text-2xl">?</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Identity */}
                                        <h3 className="text-xl font-bold text-white mb-1 drop-shadow-sm">{profile.fullName}</h3>
                                        <p className="text-white/80 text-sm font-medium mb-3">@{profile.username}</p>

                                        {/* Pills */}
                                        <div className="flex flex-wrap justify-center gap-2 mb-5">
                                            {profile.specialization && (
                                                <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold border border-white/20">
                                                    {profile.specialization.toUpperCase()}
                                                </span>
                                            )}
                                            {detailsString && (
                                                <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-white/90 text-[10px] font-medium border border-white/20">
                                                    {detailsString}
                                                </span>
                                            )}
                                        </div>

                                        {/* Stats Row */}
                                        <div className="grid grid-cols-2 gap-4 w-full mb-6">
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-white">{formatCount(profile.followersCount)}</div>
                                                <div className="text-[10px] text-white/60 uppercase tracking-widest font-medium">Followers</div>
                                            </div>
                                            <div className="text-center border-l border-white/10">
                                                <div className="text-lg font-bold text-white">{formatCount(profile.followingCount)}</div>
                                                <div className="text-[10px] text-white/60 uppercase tracking-widest font-medium">Following</div>
                                            </div>
                                        </div>

                                        {/* QR Code Section - White Card at Bottom */}
                                        <div className="bg-white rounded-xl p-4 w-full flex items-center gap-4 shadow-sm">
                                            <div className="bg-white p-1 rounded-md border border-gray-100 flex-shrink-0">
                                                <QRCodeSVG value={profileUrl} size={56} level="M" />
                                            </div>
                                            <div className="text-left flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-bold text-gray-900 tracking-wider">AFTER TRIALS</span>
                                                    <div className="h-1 w-1 rounded-full bg-gray-300"></div>
                                                    <span className="text-[10px] text-gray-500 font-medium">Connect</span>
                                                </div>
                                                <p className="text-[11px] text-gray-400 leading-tight">
                                                    Scan to view full profile and verification status.
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Main Actions */}
                            <div className="grid grid-cols-2 gap-3 w-full">
                                <button
                                    onClick={handleDownload}
                                    disabled={isSaving}
                                    className="flex items-center justify-center gap-2 h-12 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all active:scale-95"
                                >
                                    <Download size={18} />
                                    <span>{isSaving ? 'Saving...' : 'Save Image'}</span>
                                </button>
                                <button
                                    onClick={handleCopyLink}
                                    className="flex items-center justify-center gap-2 h-12 bg-white text-gray-900 border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all active:scale-95"
                                >
                                    <LinkIcon size={18} />
                                    <span>Copy Link</span>
                                </button>
                            </div>
                        </div>

                        {/* Social Share Footer */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Share via</p>
                            <div className="flex justify-between items-center px-2">
                                <SocialButton icon="𝕏" label="Post" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}`)} />
                                <SocialButton icon="in" label="LinkedIn" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`)} />
                                <SocialButton icon="💬" label="WhatsApp" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(profileUrl)}`)} />
                                <SocialButton icon={<Share2 size={18} />} label="More" onClick={handleCopyLink} />
                            </div>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function SocialButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
    return (
        <button onClick={onClick} className="flex flex-col items-center gap-1 group">
            <div className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center text-gray-700 transition-colors">
                {typeof icon === 'string' ? <span className="font-bold text-sm">{icon}</span> : icon}
            </div>
            <span className="text-[10px] font-medium text-gray-500">{label}</span>
        </button>
    );
}

function formatCount(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
}
