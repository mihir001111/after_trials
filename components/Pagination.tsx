import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
    return (
        <div className="flex justify-center items-center gap-4 mt-16">
            {currentPage > 1 ? (
                <Link
                    href={`${baseUrl}?page=${currentPage - 1}`}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                    <ArrowLeft size={16} />
                    Previous
                </Link>
            ) : (
                <button
                    disabled
                    className="flex items-center gap-2 px-6 py-3 bg-gray-50 border border-gray-100 rounded-full text-gray-300 text-sm font-medium cursor-not-allowed"
                >
                    <ArrowLeft size={16} />
                    Previous
                </button>
            )}

            <span className="text-sm text-gray-500 font-medium">
                Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
                <Link
                    href={`${baseUrl}?page=${currentPage + 1}`}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white border border-black rounded-full hover:bg-gray-900 transition-colors text-sm font-medium"
                >
                    Next
                    <ArrowRight size={16} />
                </Link>
            ) : (
                <button
                    disabled
                    className="flex items-center gap-2 px-6 py-3 bg-gray-50 border border-gray-100 rounded-full text-gray-300 text-sm font-medium cursor-not-allowed"
                >
                    Next
                    <ArrowRight size={16} />
                </button>
            )}
        </div>
    );
}
