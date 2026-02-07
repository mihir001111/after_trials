import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function AppDownloadCta({
    variant = "floating",
    onClick,
}: {
    variant?: "floating" | "header"; // Removed "fixed" and "inline" as they are less used now or can be simplified
    onClick?: () => void;
}) {
    if (variant === "floating") {
        return (
            <motion.div
                className="fixed top-6 right-6 z-50 cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClick}
            >
                <div
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-shadow text-xs font-medium uppercase tracking-widest"
                >
                    <Download size={14} />
                    <span>Get App</span>
                </div>
            </motion.div>
        );
    }

    if (variant === "header") {
        return (
            <button
                onClick={onClick}
                className="flex items-center gap-1.5 bg-black text-white px-3 py-1.5 rounded-full hover:bg-black/80 transition-colors text-[10px] uppercase tracking-widest font-medium"
            >
                <Download size={12} />
                <span>Get App</span>
            </button>
        );
    }

    return null;
}
