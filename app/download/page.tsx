"use client";

import { motion } from "framer-motion";
import { Apple, Play, Download, Smartphone } from "lucide-react";
import Link from "next/link";

export default function DownloadPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
                <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-100 blur-[80px]" />
                <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-purple-100 blur-[80px]" />
            </div>

            <motion.div
                className="max-w-md w-full text-center z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="mx-auto w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                    <Smartphone className="w-8 h-8 text-black" />
                </div>

                <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight text-gray-900">
                    Get <span className="font-semibold">After Trials</span>
                </h1>
                <p className="text-gray-500 mb-10 text-lg leading-relaxed max-w-sm mx-auto">
                    Experience the future of professional networking. Available now on iOS and Android.
                </p>

                <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
                    {/* App Store Button */}
                    <button className="flex items-center justify-center gap-3 w-full bg-black text-white px-6 py-3.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] group">
                        <Apple className="w-8 h-8 fill-current" />
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-[10px] uppercase font-semibold opacity-80 tracking-wide">Download on the</span>
                            <span className="text-xl font-bold tracking-tight">App Store</span>
                        </div>
                    </button>

                    {/* Google Play Button */}
                    <button className="flex items-center justify-center gap-3 w-full bg-white text-black border border-gray-200 px-6 py-3.5 rounded-xl font-medium shadow-sm hover:bg-gray-50 hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] group">
                        <Play className="w-7 h-7 fill-black" />
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-[10px] uppercase font-bold opacity-60 tracking-wide">Get it on</span>
                            <span className="text-xl font-bold tracking-tight">Google Play</span>
                        </div>
                    </button>

                    {/* Direct Download Link */}
                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-400">or</span>
                        </div>
                    </div>

                    <Link
                        href="#"
                        className="flex items-center justify-center gap-2 w-full text-gray-600 hover:text-black hover:bg-gray-50 py-3 rounded-lg transition-colors text-sm font-medium group"
                        onClick={(e) => e.preventDefault()}
                    >
                        <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                        Direct Download Link
                    </Link>
                </div>

                <p className="mt-8 text-xs text-gray-400">
                    By downloading, you agree to our Terms of Service and Privacy Policy.
                </p>
            </motion.div>
        </div>
    );
}
