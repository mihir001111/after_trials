"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { Loader2, Check, User, GraduationCap, Building2, HelpCircle, ArrowRight, ChevronLeft } from "lucide-react";

type Step = "name" | "role" | "email" | "loading" | "success" | "error";
type Role = "Doctor" | "Student" | "Company" | "Other";

export default function WaitlistSignup() {
    const [step, setStep] = useState<Step>("name");
    const [formData, setFormData] = useState({
        name: "",
        role: null as Role | null,
        email: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const supabase = createClient();

    // Listen for Auth Changes (e.g. user clicks the email link and comes back)
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user?.email) {
                await confirmVerification(session.user.email);
            }
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user?.email) {
                await confirmVerification(session.user.email);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

    const confirmVerification = async (email: string) => {
        // Optimistically update UI or just ensure backend is synced
        try {
            // Update the verified status in the table (RLS allows this for the logged-in user)
            const { error } = await supabase
                .from('waitlist')
                .update({ verified: true })
                .eq('email', email);

            if (!error) {
                // If successful, maybe show a "Verified" state?
                // For now, let's just make sure the step reflects success if they are here.
                // We could add a specific "verified" step if we want to show a badge.
            }
        } catch (e) {
            console.error("Verification sync error", e);
        }
    };

    const handleNext = () => {
        if (step === "name" && formData.name.trim()) {
            setStep("role");
        } else if (step === "role" && formData.role) {
            setStep("email");
        }
    };

    const handleRoleSelect = (role: Role) => {
        setFormData((prev) => ({ ...prev, role }));
        // Small delay to let the user see the selection feedback
        setTimeout(() => setStep("email"), 300);
    };

    // Honeypot state
    const [honeypot, setHoneypot] = useState("");

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();

        // Bot check
        if (honeypot) return;

        if (!formData.email || !formData.name || !formData.role) return;

        setStep("loading");
        setErrorMessage("");

        // Remove whitespace which can cause "Invalid email" errors
        const trimmedEmail = formData.email.trim();

        try {
            // 1. Insert into waitlist table via Secure RPC
            const { data, error: dbError } = await supabase
                .rpc('submit_waitlist', {
                    email_input: trimmedEmail,
                    full_name_input: formData.name,
                    role_input: formData.role
                });

            if (dbError) {
                // Check for custom error message from RPC
                if (dbError.message.includes("already on the waitlist")) {
                    throw new Error("You are already on the waitlist.");
                }
                throw dbError;
            }

            // 2. Send Confirmation Email via Auth (Magic Link)
            // Use emailRedirectTo to force a link flow (if templates allow)
            try {
                // We use window.location.origin to redirect them back to the home page (or a specific /verified page)
                // You might need to add this URL to your Supabase -> Authentication -> URL Configuration -> Redirect URLs
                const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}` : undefined;

                const { error: authError } = await supabase.auth.signInWithOtp({
                    email: trimmedEmail,
                    options: {
                        shouldCreateUser: true,
                        emailRedirectTo: redirectTo,
                        data: {
                            full_name: formData.name,
                            role: formData.role
                        }
                    },
                });

                if (authError) {
                    console.error("Auth error:", authError);
                }
            } catch (authEx) {
                console.error("Auth exception:", authEx);
            }

            setStep("success");
        } catch (error: any) {
            console.error("Signup error:", error);
            setStep("error");
            setErrorMessage(error.message || "Something went wrong.");
        }
    };

    // Back navigation
    const goBack = () => {
        if (step === "role") setStep("name");
        if (step === "email") setStep("role");
        if (step === "error") setStep("email");
    };

    // Render Helpers
    const stepVariants = {
        initial: { x: 20, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -20, opacity: 0 }
    };

    return (
        <div className="w-full max-w-sm mx-auto font-light">
            <AnimatePresence mode="wait">

                {/* STEP 1: NAME */}
                {step === "name" && (
                    <motion.div
                        key="name"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col gap-4"
                    >
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            onKeyDown={(e) => e.key === "Enter" && handleNext()}
                            placeholder="Full Name"
                            className="w-full bg-transparent border-b border-black/10 py-2 text-lg text-center placeholder:text-black/20 focus:outline-none focus:border-black transition-colors"
                        />
                        <button
                            onClick={handleNext}
                            disabled={!formData.name.trim()}
                            className="text-xs uppercase tracking-widest text-black/40 hover:text-black disabled:opacity-0 transition-all"
                        >
                            Next
                        </button>
                    </motion.div>
                )}

                {/* STEP 2: ROLE */}
                {step === "role" && (
                    <motion.div
                        key="role"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <h3 className="text-lg text-black/60">I am a...</h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {["Doctor", "Student", "Company", "Other"].map((r) => (
                                <button
                                    key={r}
                                    onClick={() => handleRoleSelect(r as Role)}
                                    className={`px-4 py-1.5 rounded-full text-sm border transition-all ${formData.role === r
                                        ? "bg-black text-white border-black"
                                        : "bg-transparent text-black/60 border-black/10 hover:border-black/40"
                                        }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={goBack}
                            className="text-[10px] uppercase tracking-widest text-black/20 hover:text-black transition-colors"
                        >
                            Back
                        </button>
                    </motion.div>
                )}

                {/* STEP 3: EMAIL */}
                {step === "email" && (
                    <motion.div
                        key="email"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col gap-4"
                    >
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            placeholder="Email Address"
                            className="w-full bg-transparent border-b border-black/10 py-2 text-lg text-center placeholder:text-black/20 focus:outline-none focus:border-black transition-colors"
                        />
                        {/* Honeypot Field */}
                        <input
                            type="text"
                            name="website_url_honey"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                            style={{ display: 'none' }}
                            tabIndex={-1}
                            autoComplete="off"
                        />
                        <div className="flex justify-between items-center w-full px-2">
                            <button
                                onClick={goBack}
                                className="text-[10px] uppercase tracking-widest text-black/20 hover:text-black transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => handleSubmit()}
                                disabled={!formData.email.trim()}
                                className="text-xs uppercase tracking-widest text-black hover:text-black/60 disabled:opacity-0 transition-all font-medium"
                            >
                                Join
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* LOADING */}
                {step === "loading" && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-8"
                    >
                        <Loader2 className="w-5 h-5 animate-spin text-black/30" />
                    </motion.div>
                )}

                {/* SUCCESS */}
                {step === "success" && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center text-center gap-2"
                    >
                        <p className="text-sm font-medium">Link sent.</p>
                        <p className="text-xs text-black/50 max-w-[200px]">
                            Email confirmation sent.
                        </p>
                        <button
                            onClick={() => {
                                setFormData({ name: "", role: null, email: "" });
                                setStep("name");
                            }}
                            className="mt-4 text-[10px] uppercase tracking-widest text-black/30 hover:text-black transition-colors"
                        >
                            Reset
                        </button>
                    </motion.div>
                )}

                {/* ERROR */}
                {step === "error" && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <p className="text-xs text-red-500 mb-4">{errorMessage}</p>
                        <button
                            onClick={goBack}
                            className="text-xs underline text-black/50 hover:text-black"
                        >
                            Try Again
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
