"use client";

import { motion, AnimatePresence } from "framer-motion";
import FloatingElements from "@/components/FloatingElements";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import AppDownloadCta from "@/components/AppDownloadCta";
import DownloadModal from "@/components/DownloadModal";
import WaitlistSignup from "@/components/WaitlistSignup";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Loader2, Twitter, Instagram, Linkedin } from "lucide-react";

// --- Internal Components ---

// Updated: Sleek Membership Pass Component
const MembershipPass = ({
  tier,
  price,
  originalPrice,
  link,
  isPremium,
  features,
  delay,
}: {
  tier: React.ReactNode;
  price: string;
  originalPrice: string;
  link: string;
  isPremium: boolean;
  features: string[];
  delay: number;
}) => {
  return (
    <motion.div
      className="relative group h-full w-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Gradient Glow for Premium */}
      {isPremium && (
        <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 rounded-[22px] opacity-70 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
      )}

      <div
        className={`relative flex flex-col h-full rounded-[20px] bg-white transition-all duration-300 ${isPremium
          ? "bg-gradient-to-b from-white to-gray-50"
          : "border border-black/5 shadow-sm hover:shadow-xl hover:border-black/10"
          } 
      p-4 sm:p-6
      `}
      >
        {/* Header */}
        <div className="mb-3 sm:mb-4">
          <h3
            className={`text-sm tracking-[0.2em] uppercase font-semibold mb-2 ${isPremium ? "gradient-text" : "text-gray-500"
              }`}
          >
            {tier}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-light tracking-tight text-black">
              {price}
            </span>
            <span className="text-sm text-gray-300 line-through font-light decoration-gray-300">
              {originalPrice}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-black/5 mb-3 sm:mb-4" />

        {/* Features */}
        <ul className="flex-grow space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
          {features.map((feat, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-xs sm:text-sm text-gray-600 font-light"
            >
              <svg
                className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isPremium ? "text-purple-600" : "text-gray-400"
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feat}
            </li>
          ))}
        </ul>

        {/* Button */}
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative w-full inline-flex items-center justify-center rounded-xl overflow-hidden transition-all duration-300 ${isPremium
            ? "bg-black text-white shadow-lg group-hover:shadow-purple-500/25"
            : "bg-gray-100 text-black hover:bg-gray-200"
            }
          px-6 py-4
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isPremium && (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          )}

          <span className="relative z-10 font-medium tracking-wide text-xs uppercase flex items-center gap-2">
            Secure Access
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
        </motion.a>
      </div>
    </motion.div>
  );
};

// Navigation Arrow Component
const NavArrow = ({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) => {
  const isNext = direction === "next";

  // Vertical positions
  const positionClass = isNext
    ? "bottom-6 left-1/2 -translate-x-1/2 z-50 text-black/70 hover:text-black cursor-pointer"
    : "hidden"; // We usually don't need a persistent "Up" arrow in scrolling apps, but let's keep it if we want full nav

  // Let's adapt the positioning for a clean overlay
  // Prev: Top Center (hidden usually as we scroll naturally)
  // Next: Bottom Center

  if (!isNext) return null; // Simplified: only show down arrow for "next"

  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      className={`fixed ${positionClass} p-3 transition-colors duration-300`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="animate-pulse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-sm"
        >
          <path d="m7 11 5 5 5-5" />
          <path d="m7 7 5 5 5-5" />
        </svg>
      </div>
    </motion.button>
  );
};

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // --- Search State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const supabase = createClient();

  // --- Pricing State ---
  const [pricing, setPricing] = useState({
    standard: { price: "₹1,999", original: "₹10,999" },
    plus: { price: "₹4,999", original: "₹15,999" },
  });

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const currency = data.currency; // "USD", "INR", "EUR", etc.

        switch (currency) {
          case "INR":
            setPricing({
              standard: { price: "₹1,999", original: "₹10,999" },
              plus: { price: "₹4,999", original: "₹15,999" },
            });
            break;
          case "EUR":
            setPricing({
              standard: { price: "€29", original: "€149" },
              plus: { price: "€69", original: "€249" },
            });
            break;
          case "GBP":
            setPricing({
              standard: { price: "£25", original: "£129" },
              plus: { price: "£59", original: "£219" },
            });
            break;
          default:
            // Default to USD for all other regions
            setPricing({
              standard: { price: "$29", original: "$149" },
              plus: { price: "$69", original: "$249" },
            });
            break;
        }
      } catch (err) {
        console.error("Error fetching location for pricing:", err);
      }
    };
    fetchPricing();
  }, []);

  // Search Function
  const handleSearch = useCallback(
    async (query: string) => {
      // If empty, clear results and ensure loading is false
      if (!query.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      // We already set isSearching(true) in onChange for immediate feedback,
      // but ensuring it here is safe too.
      // However, if we set it here, we might cause a re-render. 
      // Let's rely on the calling code or set it if not set.
      // Actually, standard practice:
      setIsSearching(true);

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, full_name, username, specialization, avatar_url")
          .or(`full_name.ilike.%${query}%,username.ilike.%${query}%,specialization.ilike.%${query}%`)
          .limit(6);

        if (error) {
          console.error("Search error:", error);
        } else {
          setSearchResults(data || []);
        }
      } catch (err) {
        console.error("Search exception:", err);
      } finally {
        setIsSearching(false);
      }
    },
    [supabase]
  );

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300); // Reduced to 300ms for snappier feel

    return () => clearTimeout(timer);
  }, [searchQuery, handleSearch]);

  // Total sections
  const SECTION_COUNT = 14;

  // --- Core Navigation Logic ---

  const scrollToSection = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;

    if (isScrollingRef.current) return;

    const container = scrollContainerRef.current;
    const targetIndex = Math.max(0, Math.min(index, SECTION_COUNT - 1));

    isScrollingRef.current = true;
    setActiveIndex(targetIndex);

    const targetTop = targetIndex * window.innerHeight;
    container.scrollTo({ top: targetTop, behavior: "smooth" });

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  }, [SECTION_COUNT]);

  // --- Scroll Listener ---
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    if (isScrollingRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;

    const totalScroll = scrollHeight - clientHeight;
    const progress = (scrollTop / totalScroll) * 100;
    const index = Math.round(scrollTop / clientHeight);

    setScrollProgress(Math.min(100, Math.max(0, progress)));

    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  }, [activeIndex]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // --- Keyboard & Hash Navigation ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollingRef.current) return;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        scrollToSection(activeIndex + 1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToSection(activeIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, scrollToSection]);

  const scrollToPayment = () => scrollToSection(11);

  // Layout Classes - Always Vertical Snap
  const containerClass =
    "fixed inset-0 overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-white z-40 scrollbar-hide cursor-ns-resize touch-pan-y";
  const trackStyle = {
    width: "100%",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column" as const,
  };
  const sectionWrapperClass =
    "w-full h-[100dvh] relative snap-center flex-shrink-0 overflow-hidden";
  const contentRotatorClass = "w-full h-full flex items-center justify-center";
  const contentPadding = "p-6 sm:p-12";

  return (
    <>
      <div className="fixed inset-0 overflow-hidden bg-white selection:bg-blue-100 selection:text-blue-900">
        <div className="opacity-100">
          <FloatingElements />
        </div>
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
          {/* 'Join' CTA */}
          <motion.button
            onClick={scrollToPayment}
            className="group"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 block px-3 py-1.5 bg-white rounded-full border border-black/10 text-[10px] font-medium tracking-widest uppercase hover:bg-gray-50 transition-colors">
              join
            </span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AppDownloadCta variant="header" onClick={() => setIsDownloadModalOpen(true)} />
          </motion.div>
        </div>

        {/* Navigation Arrow */}
        <AnimatePresence>
          {activeIndex < SECTION_COUNT - 1 && (
            <NavArrow
              direction="next"
              onClick={() => scrollToSection(activeIndex + 1)}
            />
          )}
        </AnimatePresence>

        {/* Main Scroll Container */}
        <div ref={scrollContainerRef} className={containerClass}>
          <div style={trackStyle}>
            {/* Section 1: Brand Title */}
            <section id="intro" className={sectionWrapperClass}>
              <div className={contentRotatorClass}>
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    {/* Rebranding Notice */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="mb-8 flex justify-center"
                    >
                      <div className="relative p-[2px] rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 animate-pulse shadow-lg">
                        <div className="bg-white rounded-full px-4 py-1.5 sm:px-6 sm:py-2 relative">
                          <span className="text-[0.6rem] sm:text-xs font-black tracking-[0.15em] uppercase text-black">
                            Formerly Clavikl • Powered by Zenethe
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.h1
                      className="text-[14vw] sm:text-[12vw] font-black uppercase tracking-tighter leading-none"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      After
                    </motion.h1>
                    <motion.h1
                      className="text-[14vw] sm:text-[12vw] font-black uppercase tracking-tighter leading-none gradient-text px-1"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1 }}
                    >
                      Trials
                    </motion.h1>
                  </motion.div>

                  <motion.p
                    className="mt-4 sm:mt-8 text-[0.6rem] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                  >
                    Where evidence meets empathy
                  </motion.p>
                </div>
              </div>
            </section>

            {/* Section 2: Concept Statement */}
            <section id="concept" className={sectionWrapperClass}>
              <div
                className={`${contentRotatorClass} ${contentPadding} justify-start`}
              >
                <div className="w-full">
                  <motion.div
                    className="max-w-4xl"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl sm:text-5xl md:text-7xl font-light leading-[1.1] tracking-tight">
                      Where doctors <span className="gradient-text font-bold">connect</span>,{" "}
                      <br className="block" />
                      <span className="gradient-text font-bold">share</span>,{" "}
                      <span className="gradient-text font-bold">evolve</span>.
                    </h2>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Section 3: Purpose Paragraph */}
            <section id="purpose" className={sectionWrapperClass}>
              <div
                className={`${contentRotatorClass} ${contentPadding} justify-end`}
              >
                <motion.div
                  className="max-w-2xl text-right"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <motion.p
                    className="text-lg sm:text-2xl md:text-3xl font-light leading-relaxed tracking-wide"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    A new kind of{" "}
                    <span className="font-semibold relative inline-block">
                      social space
                      <motion.span
                        className="absolute bottom-0 left-0 h-[2px] gradient-underline"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: true }}
                      />
                    </span>{" "}
                    — built exclusively for doctors.
                  </motion.p>

                  <motion.p
                    className="mt-4 sm:mt-8 text-xs sm:text-base font-light text-black/70 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    Beyond the clinic. Beyond the trials. A sanctuary where medical
                    professionals share insights, find community, and grow
                    together in an environment that understands the weight of their
                    work.
                  </motion.p>
                </motion.div>
              </div>
            </section>

            {/* Section 4: Features Statement */}
            <section id="features" className={sectionWrapperClass}>
              <div className={contentRotatorClass}>
                <motion.div
                  className={`max-w-5xl text-center w-full ${contentPadding}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <motion.p
                    className="text-[0.6rem] sm:text-xs uppercase tracking-[0.3em] font-light mb-4 sm:mb-6 text-black/50"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    What makes us different
                  </motion.p>

                  <motion.h2
                    className="text-xl sm:text-3xl md:text-4xl font-extralight leading-tight tracking-tight mb-8 sm:mb-12 px-2"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <span className="gradient-text font-bold">Verified</span> professionals.{" "}
                    <span className="gradient-text font-bold">Protected</span> conversations.{" "}
                    <span className="gradient-text font-bold">Purposeful</span> connections.
                  </motion.h2>

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div>
                      <h3 className="text-lg font-semibold mb-2">No Noise</h3>
                      <p className="text-sm font-light text-black/70 leading-relaxed">
                        Only verified medical professionals. No distractions. Pure
                        signal.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Full Privacy</h3>
                      <p className="text-sm font-light text-black/70 leading-relaxed">
                        HIPAA-compliant infrastructure. Your conversations, your
                        control.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Real Impact</h3>
                      <p className="text-sm font-light text-black/70 leading-relaxed">
                        Share cases, discuss research, build meaningful
                        professional bonds.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Section 5: Search / Discovery */}
            <section id="search" className={sectionWrapperClass}>
              <div className={contentRotatorClass}>
                <motion.div
                  className={`max-w-4xl w-full ${contentPadding} flex flex-col items-center`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.p
                    className="text-[0.6rem] sm:text-xs uppercase tracking-[0.3em] font-light mb-6 text-black/50"
                  >
                    Connect Globally
                  </motion.p>

                  <motion.h2
                    className="text-3xl md:text-5xl font-light text-center mb-12"
                  >
                    Find your <span className="gradient-text font-bold">Peers</span>.
                  </motion.h2>






                  {/* Search Mockup */}
                  <motion.div
                    className="w-full max-w-lg mb-12 relative z-10"
                  >
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500" />
                      <div className="relative bg-white rounded-full shadow-lg flex items-center p-2 pr-4 ring-1 ring-black/5">
                        <div className="p-3 text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (e.target.value.trim().length > 0) {
                              setIsSearching(true); // Immediate feedback
                            }
                          }}
                          placeholder="Search doctors, peers, or..."
                          className="flex-1 bg-transparent outline-none text-base md:text-lg placeholder:text-gray-300 font-light text-black"
                        />
                        <button
                          onClick={() => handleSearch(searchQuery)}
                          disabled={isSearching}
                          className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium tracking-wide hover:bg-gray-900 transition-colors disabled:opacity-80 flex items-center justify-center min-w-[100px]"
                        >
                          {isSearching ? <Loader2 className="animate-spin w-4 h-4" /> : "SEARCH"}
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Results / Avatars */}
                  <motion.div
                    className="flex flex-wrap justify-center gap-6 md:gap-10 min-h-[120px]"
                  >
                    {isSearching ? (
                      // Skeleton Loading State
                      [1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col items-center gap-3 animate-pulse">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200" />
                          <div className="space-y-2 w-full flex flex-col items-center">
                            <div className="h-3 w-16 bg-gray-200 rounded" />
                            <div className="h-2 w-10 bg-gray-200 rounded" />
                          </div>
                        </div>
                      ))
                    ) : searchResults.length > 0 ? (
                      searchResults.map((doctor) => (
                        <Link href={`/${doctor.username}`} key={doctor.id}>
                          <div className="flex flex-col items-center gap-3 group cursor-pointer">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 overflow-hidden relative shadow-md group-hover:shadow-xl transition-all duration-300 ring-2 ring-transparent group-hover:ring-purple-500 ring-offset-2">
                              {doctor.avatar_url ? (
                                <Image
                                  src={doctor.avatar_url}
                                  alt={doctor.full_name || "Doctor"}
                                  fill
                                  style={{ objectFit: "cover" }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                  ?
                                </div>
                              )}
                            </div>
                            <div className="text-center opacity-60 group-hover:opacity-100 transition-opacity">
                              <p className="text-xs font-semibold text-black">
                                {doctor.full_name}
                              </p>
                              <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                                {doctor.specialization || "Doctor"}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : searchQuery.trim() !== "" ? (
                      <div className="text-gray-400 font-light italic">No professionals found.</div>
                    ) : null}
                  </motion.div>
                </motion.div>
              </div>
            </section>



            {/* Section 7: Community Stats */}
            <section id="stats" className={sectionWrapperClass}>
              <div
                className={`${contentRotatorClass} ${contentPadding} justify-start`}
              >
                <motion.div
                  className="max-w-xl"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <motion.p
                    className="text-[0.6rem] sm:text-xs uppercase tracking-[0.3em] font-light mb-8 text-black/50"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    Growing community
                  </motion.p>

                  <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div>
                      <h3 className="text-5xl md:text-8xl font-black gradient-text mb-1 leading-none">
                        5,000+
                      </h3>
                      <p className="text-base md:text-lg font-light text-black/70">
                        Doctors on the waitlist
                      </p>
                    </div>
                    <div>
                      <h3 className="text-5xl md:text-7xl font-black gradient-text mb-1 leading-none">
                        24
                      </h3>
                      <p className="text-base md:text-lg font-light text-black/70">
                        Medical specialties represented
                      </p>
                    </div>
                    <div>
                      <h3 className="text-5xl md:text-7xl font-black gradient-text mb-1 leading-none">
                        40+
                      </h3>
                      <p className="text-base md:text-lg font-light text-black/70">
                        Countries eager to join
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Section 8: Testimonial */}
            <section id="testimonial" className={sectionWrapperClass}>
              <div
                className={`${contentRotatorClass} ${contentPadding} justify-end`}
              >
                <motion.div
                  className="max-w-2xl text-right"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-2xl md:text-4xl font-light leading-relaxed mb-6 italic">
                      &quot;Finally, a space where I can be both{" "}
                      <span className="gradient-text font-semibold not-italic">
                        human
                      </span>{" "}
                      and{" "}
                      <span className="gradient-text font-semibold not-italic">
                        professional
                      </span>
                      .&quot;
                    </p>
                    <div className="space-y-0.5">
                      <p className="text-base font-semibold">Dr. Sarah Chen</p>
                      <p className="text-sm font-light text-black/60">
                        Cardiothoracic Surgeon, Boston
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-sm font-light text-black/50 leading-relaxed">
                      Beta tester since launch
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Section 9: Security Focus */}
            <section id="security" className={sectionWrapperClass}>
              <div className={contentRotatorClass}>
                <motion.div
                  className={`max-w-4xl text-center ${contentPadding}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <motion.h2
                    className="text-4xl md:text-7xl font-light leading-none tracking-tight mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    Turn your cases into{" "}
                    <span className="gradient-text font-bold">recognition</span>
                  </motion.h2>

                  <motion.p
                    className="text-lg font-light text-black/70 leading-relaxed max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    Every post is reviewed by fellow doctors and backed by peer
                    approval. Build visibility, credibility, and a name that stands
                    out in your specialty.
                  </motion.p>
                </motion.div>
              </div>
            </section>

            {/* Section 10: Vision Statement */}
            <section id="vision" className={sectionWrapperClass}>
              <div
                className={`${contentRotatorClass} ${contentPadding} justify-start`}
              >
                <motion.div
                  className="max-w-3xl"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <motion.p
                    className="text-[0.6rem] sm:text-xs uppercase tracking-[0.3em] font-light mb-6 text-black/50"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    Our vision
                  </motion.p>

                  <motion.h2
                    className="text-3xl md:text-6xl font-light leading-tight tracking-tight"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Medicine is <span className="gradient-text font-bold">lonely</span>.{" "}
                    <br />
                    It doesn&apos;t have to be.
                  </motion.h2>

                  <motion.p
                    className="mt-8 text-base md:text-xl font-light text-black/70 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    Every doctor carries stories that can&apos;t be shared at dinner
                    parties. Decisions that keep them up at night. Victories that
                    deserve to be celebrated by people who truly understand.
                    <br />
                    <br />
                    After Trials is that place.
                  </motion.p>
                </motion.div>
              </div>
            </section>

            {/* Section: AI Persona */}
            {/* Section: AI Persona */}
            <section id="ai-persona" className={sectionWrapperClass}>
              <div className={contentRotatorClass}>
                <div className={`w-full max-w-4xl text-center flex flex-col items-center ${contentPadding}`}>
                  {/* Text Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="w-full"
                  >
                    <motion.p
                      className="text-[0.6rem] sm:text-xs uppercase tracking-[0.3em] font-light mb-6 text-black/50"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      Contextual Intelligence
                    </motion.p>

                    <motion.h2
                      className="text-4xl md:text-6xl font-light leading-tight mb-8"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      A digital extension <br />
                      <span className="gradient-text font-bold">of You</span>.
                    </motion.h2>

                    <motion.p
                      className="text-lg md:text-xl font-light text-black/70 leading-relaxed mb-10 max-w-2xl mx-auto"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      It doesn't just answer; it anticipates. By understanding your specialization and network, it surfaces opportunities and insights you didn't know you needed.
                    </motion.p>

                    <motion.div
                      className="flex flex-wrap justify-center gap-3 mb-12"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      {["Proactive Research", "Smart Networking", "Decision Support"].map((tag, i) => (
                        <span key={i} className="px-4 py-2 rounded-full bg-black/5 text-xs font-medium text-black/60 uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </motion.div>

                    {/* Disclaimer */}
                    <motion.div
                      className="inline-block border-l-2 border-orange-500 pl-4 text-left max-w-lg"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <p className="text-[10px] text-gray-400 leading-normal uppercase tracking-wide">
                        <strong>Note:</strong> Artificial Intelligence can err. Designed for professional amplification, not clinical diagnosis.
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Section 11: Waitlist */}
            <section id="waitlist" className={sectionWrapperClass}>
              <div className={contentRotatorClass}>
                <div className={`w-full max-w-4xl text-center flex flex-col items-center ${contentPadding}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="w-full"
                  >
                    <motion.p
                      className="text-[0.6rem] sm:text-xs uppercase tracking-[0.3em] font-light mb-6 text-black/50"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      Early Access
                    </motion.p>

                    <motion.h2
                      className="text-4xl md:text-6xl font-light leading-tight mb-8"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      Secure your <span className="gradient-text font-bold">Spot</span>.
                    </motion.h2>

                    <motion.p
                      className="text-lg md:text-xl font-light text-black/70 leading-relaxed mb-10 max-w-2xl mx-auto"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      Be among the first to experience the future of medical connection.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                      className="w-full"
                    >
                      <WaitlistSignup />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Section 11: Payment Page */}
            <section
              id="payment"
              className={`${sectionWrapperClass} flex items-center justify-center`}
            >
              <div className="w-full h-full overflow-hidden py-4 px-4 flex flex-col items-center justify-center">
                <motion.div
                  className="w-full max-w-5xl flex flex-col items-center justify-center h-full"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="text-center mb-4 sm:mb-6 shrink-0">
                    <motion.div
                      className="flex justify-center mb-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="inline-block px-4 py-1.5 rounded-full bg-black/5 text-xs uppercase tracking-widest font-semibold text-black/70">
                        Founding Member Access
                      </span>
                    </motion.div>
                    <motion.h2
                      className="text-3xl md:text-5xl font-light tracking-tight leading-none"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Select Your <span className="gradient-text font-medium">Legacy</span>
                    </motion.h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-stretch max-h-[60vh]">
                    {/* Option 1: Access */}
                    <div className="h-full">
                      <MembershipPass
                        tier="Founding Member"
                        price={pricing.standard.price}
                        originalPrice={pricing.standard.original}
                        link="https://rzp.io/rzp/FRdgwJ3c"
                        isPremium={false}
                        features={[
                          "Verified Doctor Badge",
                          "Unlimited Case Discussions",
                          "Global Network Access",
                          "Standard Support",
                        ]}
                        delay={0.4}
                      />
                    </div>

                    {/* Option 2: Access ++ */}
                    <div className="h-full">
                      <MembershipPass
                        tier={
                          <>
                            Founding Member{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                              Plus
                            </span>
                          </>
                        }
                        price={pricing.plus.price}
                        originalPrice={pricing.plus.original}
                        link="https://rzp.io/rzp/cmFNyyUq"
                        isPremium={true}
                        features={[
                          "Everything in Standard",
                          "Priority Algorithmic Visibility",
                          "Exclusive Research Groups",
                          "Direct Access to Founders",
                        ]}
                        delay={0.5}
                      />
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <motion.div
                    className="mt-6 flex justify-center items-center gap-4 text-[0.65rem] sm:text-xs text-gray-400 font-light shrink-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <span className="flex items-center gap-1.5">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      Secure Payment
                    </span>
                    <span>•</span>
                    <span>One-time Fee</span>
                    <span>•</span>
                    <span>Lifetime Access</span>
                  </motion.div>
                </motion.div>
              </div>
            </section >

            {/* Section 12: Download App */}
            < section id="download" className={sectionWrapperClass} >
              <div className={contentRotatorClass}>
                <motion.div
                  className={`max-w-4xl text-center flex flex-col items-center justify-center ${contentPadding}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.p
                    className="text-[0.6rem] sm:text-xs uppercase tracking-[0.3em] font-light mb-6 text-black/50"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    Everywhere you are
                  </motion.p>

                  <motion.h2
                    className="text-4xl md:text-6xl font-light tracking-tight mb-12"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Take <span className="gradient-text font-bold">After Trials</span> with you.
                  </motion.h2>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-xl justify-center items-center"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
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
                  </motion.div>

                  <motion.div
                    className="mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <a href="#" className="text-sm font-light text-black/40 hover:text-black transition-colors border-b border-black/10 hover:border-black/50 pb-0.5">
                      Or download direct link
                    </a>
                  </motion.div>
                </motion.div>
              </div>
            </section >

            {/* Section 12: Contact / Final */}
            < section id="contact" className={`${sectionWrapperClass} flex flex-col items-center justify-center relative`}>
              <div className="flex-1 w-full flex items-center justify-center">
                <motion.div
                  className={`max-w-4xl text-center flex flex-col items-center justify-center ${contentPadding}`}

                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >


                  <motion.h2
                    className="text-4xl md:text-7xl font-light tracking-tight mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    The <span className="gradient-text font-bold">beginning</span>.
                  </motion.h2>

                  <motion.p
                    className="text-lg text-black/60 font-light mb-12 max-w-xl leading-relaxed"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    We act as specific as possible, but if you have any questions or need verification assistance, we are here.
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-6 items-center"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link href="/contact" className="px-8 py-4 bg-black text-white rounded-full font-medium tracking-wide hover:bg-gray-900 transition-all hover:scale-105">
                      Contact Support
                    </Link>
                    <div className="flex gap-4">
                      <a href="https://twitter.com/aftertrials" target="_blank" rel="noreferrer" className="p-4 border border-gray-200 text-black rounded-full hover:bg-gray-50 transition-all hover:scale-105">
                        <Twitter size={20} />
                      </a>
                      <a href="https://instagram.com/aftertrials" target="_blank" rel="noreferrer" className="p-4 border border-gray-200 text-black rounded-full hover:bg-gray-50 transition-all hover:scale-105">
                        <Instagram size={20} />
                      </a>
                      <a href="https://linkedin.com/company/aftertrials" target="_blank" rel="noreferrer" className="p-4 border border-gray-200 text-black rounded-full hover:bg-gray-50 transition-all hover:scale-105">
                        <Linkedin size={20} />
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                className="w-full border-t border-gray-100 py-8 px-6 sm:px-12 flex justify-between items-center text-xs text-gray-400 font-light uppercase tracking-widest absolute bottom-0 left-0 bg-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span>© 2024 After Trials</span>
                <div className="flex gap-6">
                  <Link href="/privacy" className="cursor-pointer hover:text-black transition-colors">Privacy</Link>
                  <Link href="/terms" className="cursor-pointer hover:text-black transition-colors">Terms</Link>
                  <Link href="/contact" className="cursor-pointer hover:text-black transition-colors">Contact</Link>
                </div>
              </motion.div>
            </section >
          </div >
        </div >

        {/* Progress Bar fixed at bottom */}
        < div className="fixed bottom-0 left-0 w-full z-40 pointer-events-none" >
          <div className="w-full h-1 bg-gray-100/50 backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div >
      </div >

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onJoinWaitlist={() => {
          setIsDownloadModalOpen(false);
          scrollToSection(10); // 10 is the index for #waitlist
        }}
      />
    </>
  );
}
