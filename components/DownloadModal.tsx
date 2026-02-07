"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, ArrowRight } from 'lucide-react';
import AppDownloadCta from './AppDownloadCta';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onJoinWaitlist: () => void;
}

export default function DownloadModal({ isOpen, onClose, onJoinWaitlist }: DownloadModalProps) {
    const [view, setView] = useState<'prompt' | 'waitlist'>('prompt');

    // Reset view when modal opens
    useEffect(() => {
        if (isOpen) setView('prompt');
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-0">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-sm bg-white rounded-[32px] overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Abstract Background Decoration */}
                        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-10" />
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />

                        <div className="relative p-8 flex flex-col items-center text-center">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors z-10"
                            >
                                <X size={20} />
                            </button>

                            <AnimatePresence mode="wait">
                                {view === 'prompt' ? (
                                    <motion.div
                                        key="prompt"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="w-full flex flex-col items-center"
                                    >
                                        <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3">
                                            <Smartphone className="text-white" size={32} />
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                            Get the full experience
                                        </h3>

                                        <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
                                            Download After Trials to interact with posts, join discussions, and share your own journey.
                                        </p>

                                        <div className="flex flex-col gap-3 w-full">
                                            {/* App Store Button */}
                                            <button
                                                onClick={() => setView('waitlist')}
                                                className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-900 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md w-full justify-center"
                                            >
                                                <svg viewBox="0 0 384 512" fill="currentColor" className="w-6 h-6 shrink-0">
                                                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 78.3c14.2 38.4 49.7 96.5 83.3 90.6 27.7-4.7 49-21.4 74.4-21.4 24.8 0 52.7 19.1 77.3 18.2 37.8-1.5 54.1-39.6 82.3-90.6 6.9-13.9 16.6-35.7 16.6-37.5 0-.1-2.9-1.4-29.4-15.3l-4.2-2.1zm-58.1-177a76.1 76.1 0 0 1-2.9-29.8c-30.7 2.1-64.2 21.8-80.1 48.6-14.7 24.7-10.9 59.9-10.9 59.9 29.8 2.1 63.3-17.7 80.1-43.6 13.9-21.6 15.7-49.8 13.8-55.1z" />
                                                </svg>
                                                <div className="flex flex-col items-start leading-none text-left">
                                                    <span className="text-[9px] uppercase font-medium text-white/80">Download on the</span>
                                                    <span className="text-base font-semibold tracking-wide">App Store</span>
                                                </div>
                                            </button>

                                            {/* Google Play Button */}
                                            <button
                                                onClick={() => setView('waitlist')}
                                                className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-900 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md w-full justify-center"
                                            >
                                                <svg viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5 ml-0.5 shrink-0">
                                                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3-60.1-60.1L69.8 479l34.8 20z" />
                                                </svg>
                                                <div className="flex flex-col items-start leading-none text-left pl-1">
                                                    <span className="text-[9px] uppercase font-medium text-white/80">GET IT ON</span>
                                                    <span className="text-base font-semibold tracking-wide">Google Play</span>
                                                </div>
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="waitlist"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="w-full flex flex-col items-center"
                                    >
                                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-[-3deg]">
                                            <Smartphone className="text-white" size={32} />
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                            Coming Soon
                                        </h3>

                                        <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
                                            We are currently in private beta. Join the priority waitlist to be notified immediately when we launch.
                                        </p>

                                        <div className="w-full">
                                            <button
                                                onClick={onJoinWaitlist}
                                                className="w-full bg-black text-white py-3.5 rounded-xl font-semibold shadow-lg hover:bg-gray-900 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                            >
                                                <span>Join Priority Waitlist</span>
                                                <ArrowRight size={16} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => setView('prompt')}
                                            className="mt-6 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            Back
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
