'use client';

import { useState } from 'react';
import { Twitter, Facebook, Linkedin, Link2, Check } from 'lucide-react';

interface SocialShareProps {
    title: string;
    url: string;
    description?: string;
}

export default function SocialShare({ title, url, description }: SocialShareProps) {
    const [copied, setCopied] = useState(false);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    const handleCopyLink = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 mr-2">Share:</span>

            <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-[#1DA1F2] hover:bg-blue-50 rounded-full transition-colors"
                title="Share on Twitter"
            >
                <Twitter size={20} />
            </a>

            <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-[#4267B2] hover:bg-blue-50 rounded-full transition-colors"
                title="Share on Facebook"
            >
                <Facebook size={20} />
            </a>

            <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-[#0077B5] hover:bg-blue-50 rounded-full transition-colors"
                title="Share on LinkedIn"
            >
                <Linkedin size={20} />
            </a>

            <button
                onClick={handleCopyLink}
                className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                title="Copy link"
            >
                {copied ? <Check size={20} className="text-green-500" /> : <Link2 size={20} />}
            </button>
        </div>
    );
}
