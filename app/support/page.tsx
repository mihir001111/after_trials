import InfoPageLayout from "@/components/InfoPageLayout";
import Link from "next/link"; // Correct import for Next.js

export default function SupportPage() {
    return (
        <InfoPageLayout title="Support Center">
            <section className="mb-12">
                <p className="text-xl text-gray-600 mb-8">
                    Find answers to common questions and get help with your account.
                </p>

                <div className="space-y-6">
                    <details className="group p-6 rounded-2xl bg-gray-50 border border-gray-100 open:bg-white open:shadow-md transition-all">
                        <summary className="flex justify-between items-center cursor-pointer font-bold text-lg list-none">
                            How do I verify my medical credentials?
                            <span className="transform group-open:rotate-180 transition-transform">
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </summary>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            Verification is a core part of After Trials. During sign-up, you will be asked to provide your medical license number or institutional email. our team reviews these details manually to ensure distinct exclusively.
                        </p>
                    </details>

                    <details className="group p-6 rounded-2xl bg-gray-50 border border-gray-100 open:bg-white open:shadow-md transition-all">
                        <summary className="flex justify-between items-center cursor-pointer font-bold text-lg list-none">
                            Is After Trials free to use?
                            <span className="transform group-open:rotate-180 transition-transform">
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </summary>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            Yes, the core social features of connecting and sharing are free. We also offer premium memberships for advanced tools and resources.
                        </p>
                    </details>

                    <details className="group p-6 rounded-2xl bg-gray-50 border border-gray-100 open:bg-white open:shadow-md transition-all">
                        <summary className="flex justify-between items-center cursor-pointer font-bold text-lg list-none">
                            How is my data protected?
                            <span className="transform group-open:rotate-180 transition-transform">
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </summary>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            We take privacy seriously. All data is encrypted, and we are HIPAA-compliant. We do not sell your personal data to third parties. See our <Link href="/privacy" className="text-blue-600 underline">Privacy Policy</Link> for more details.
                        </p>
                    </details>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
                <p className="mb-4">
                    If you couldn't find the answer you were looking for, please contact our support team directly.
                </p>
                <Link href="/contact" className="inline-block px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    Contact Support
                </Link>
            </section>
        </InfoPageLayout>
    );
}
