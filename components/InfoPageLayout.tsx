"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Twitter, Instagram, Linkedin } from "lucide-react";

interface InfoPageLayoutProps {
    title: string;
    children: React.ReactNode;
    showContact?: boolean;
}

export default function InfoPageLayout({
    title,
    children,
    showContact = true,
}: InfoPageLayoutProps) {
    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="group flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-black text-white group-hover:bg-gray-900 transition-colors">
                            <ArrowLeft size={16} />
                        </div>
                        <span className="text-sm font-medium tracking-wide">Back to Home</span>
                    </Link>
                    <div className="text-sm font-bold tracking-widest uppercase">
                        After Trials
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-32 pb-24 px-6 md:px-12">
                <motion.div
                    className="max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-12 capitalize">
                        {title}
                        <span className="text-blue-600">.</span>
                    </h1>

                    <div className="prose prose-lg prose-neutral max-w-none text-black/80 font-light">
                        {children}
                    </div>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="border-t border-black/5 py-12 bg-gray-50/50">
                <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-sm text-gray-500 font-medium">
                        © {new Date().getFullYear()} After Trials. All rights reserved.
                    </div>

                    <div className="flex gap-6 text-sm font-medium text-gray-600">
                        <Link href="/privacy" className="hover:text-black transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-black transition-colors">Terms</Link>
                        <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
                    </div>

                    <div className="flex gap-4">
                        <a href="https://twitter.com/aftertrials" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors">
                            <Twitter size={20} />
                        </a>
                        <a href="https://instagram.com/aftertrials" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href="https://linkedin.com/company/aftertrials" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
