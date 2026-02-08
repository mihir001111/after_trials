'use client';

import { useEffect, useState } from 'react';
import { List, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
    const [items, setItems] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    // Extract headings from markdown content
    useEffect(() => {
        const headingRegex = /^(#{1,3})\s+(.+)$/gm;
        const extractedItems: TOCItem[] = [];
        let match;

        while ((match = headingRegex.exec(content)) !== null) {
            const level = match[1].length;
            const text = match[2].replace(/[*_`]/g, ''); // Remove markdown formatting
            const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            extractedItems.push({ id, text, level });
        }

        setItems(extractedItems);
    }, [content]);

    // Track active heading on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-80px 0px -80% 0px' }
        );

        items.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [items]);

    if (items.length === 0) return null;

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors"
            >
                {isOpen ? <X size={24} /> : <List size={24} />}
            </button>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden fixed inset-0 bg-black/50 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* TOC Panel */}
            <motion.nav
                className={`
                    fixed lg:sticky 
                    ${isOpen ? 'right-0' : '-right-full lg:right-auto'}
                    top-0 lg:top-24
                    h-screen lg:h-auto lg:max-h-[calc(100vh-8rem)]
                    w-80 lg:w-64
                    bg-white lg:bg-transparent
                    shadow-xl lg:shadow-none
                    p-6 lg:p-0
                    z-50 lg:z-auto
                    overflow-y-auto
                    transition-all duration-300 lg:transition-none
                `}
            >
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                    Table of Contents
                </h4>
                <ul className="space-y-2">
                    {items.map((item) => (
                        <li
                            key={item.id}
                            style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                        >
                            <button
                                onClick={() => handleClick(item.id)}
                                className={`
                                    text-left text-sm leading-relaxed w-full
                                    transition-colors duration-200
                                    ${activeId === item.id
                                        ? 'text-purple-600 font-medium'
                                        : 'text-gray-500 hover:text-gray-800'
                                    }
                                `}
                            >
                                {item.text}
                            </button>
                        </li>
                    ))}
                </ul>
            </motion.nav>
        </>
    );
}
