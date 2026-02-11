import InfoPageLayout from "@/components/InfoPageLayout";

export default function PrivacyPage() {
    return (
        <InfoPageLayout title="Global Privacy Policy">
            <p className="text-sm text-gray-500 mb-8">Last Updated: February 11, 2026</p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                <p className="font-bold text-blue-800">LEGAL NOTICE:</p>
                <p className="text-sm text-blue-700 mt-2">
                    THIS DOCUMENT CONTAINS IMPORTANT INFORMATION REGARDING OUR HANDLING OF SENSITIVE DATA, YOUR RIGHTS UNDER GLOBAL PRIVACY LAWS (GDPR, CCPA, DPDP), AND OUR LIMITATIONS OF LIABILITY. PLEASE READ CAREFULLY.
                </p>
            </div>

            <p className="mb-8">
                This Privacy Policy ("Policy") explains how After Trials ("Company," "We," "Us," or "Our"), collects, uses, discloses, and safeguards your information when you visit our website https://aftertrials.com (the "Site") and use our mobile application, After Trials (the "App").
            </p>
            <p className="mb-8">
                We respect the privacy of our users ("User," "You," or "Doctor") and are committed to protecting it through our compliance with this Policy. This Policy applies to information we collect: (1) on this Site and App; (2) in email, text, and other electronic messages between you and this Site/App; and (3) through mobile and desktop applications you download from the App Store or Google Play.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-12">
                <h3 className="font-bold mb-4 text-gray-900 uppercase tracking-wider text-sm">Table of Contents</h3>
                <nav className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                    <a href="#info-collect" className="text-blue-600 hover:text-blue-800 hover:underline">1. Information We Collect</a>
                    <a href="#how-collect" className="text-blue-600 hover:text-blue-800 hover:underline">2. How We Collect Information</a>
                    <a href="#use-info" className="text-blue-600 hover:text-blue-800 hover:underline">3. Use of Your Information</a>
                    <a href="#disclosure" className="text-blue-600 hover:text-blue-800 hover:underline">4. Disclosure of Your Information</a>
                    <a href="#payment" className="text-blue-600 hover:text-blue-800 hover:underline">5. Payment & Subscription Information</a>
                    <a href="#clinical" className="text-red-700 font-medium hover:text-red-900 hover:underline">6. Clinical Evidence & Patient Privacy (Critical)</a>
                    <a href="#tracking" className="text-blue-600 hover:text-blue-800 hover:underline">7. Tracking Technologies & Cookies</a>
                    <a href="#analytics" className="text-blue-600 hover:text-blue-800 hover:underline">8. Third-Party Analytics & Tools</a>
                    <a href="#security" className="text-blue-600 hover:text-blue-800 hover:underline">9. Data Security & Encryption</a>
                    <a href="#retention" className="text-blue-600 hover:text-blue-800 hover:underline">10. Data Retention Policy</a>
                    <a href="#international" className="text-blue-600 hover:text-blue-800 hover:underline">11. International Data Transfers</a>
                    <a href="#gdpr" className="text-blue-600 hover:text-blue-800 hover:underline">12. Your GDPR Privacy Rights (Europe)</a>
                    <a href="#ccpa" className="text-blue-600 hover:text-blue-800 hover:underline">13. Your CCPA/CPRA Privacy Rights (California)</a>
                    <a href="#dpdp" className="text-blue-600 hover:text-blue-800 hover:underline">14. Indian Digital Personal Data Protection (DPDP)</a>
                    <a href="#children" className="text-blue-600 hover:text-blue-800 hover:underline">15. Children's Privacy</a>
                    <a href="#dnt" className="text-blue-600 hover:text-blue-800 hover:underline">16. Do-Not-Track Features</a>
                    <a href="#changes" className="text-blue-600 hover:text-blue-800 hover:underline">17. Changes to This Privacy Policy</a>
                    <a href="#contact" className="text-blue-600 hover:text-blue-800 hover:underline">18. Contact Information</a>
                </nav>
            </div>

            <section id="info-collect" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">1. INFORMATION WE COLLECT</h2>
                <p className="mb-4">We collect several types of information from and about users of our App, specifically:</p>

                <div className="space-y-4 ml-4">
                    <div>
                        <h3 className="font-bold text-gray-800 mb-2">A. Personal Data</h3>
                        <p className="mb-2">Personally identifiable information ("PII") that you voluntarily provide to us when you register or contact us. This includes:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>Identity Data:</strong> First name, last name, medical license number, university/hospital affiliation, and professional title.</li>
                            <li><strong>Contact Data:</strong> Email address, telephone number, and professional mailing address.</li>
                            <li><strong>Profile Data:</strong> Username, password (hashed), profile picture, and biography.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800 mb-2">B. Derivative & Usage Data</h3>
                        <p className="mb-2">Information our servers automatically collect when you access the App, such as:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li><strong>Device Data:</strong> Your mobile device ID (IMEI/UDID), model, manufacturer, and operating system version.</li>
                            <li><strong>Log Data:</strong> IP address, browser type, access times, pages viewed, and crash logs.</li>
                            <li><strong>Geo-Location Information:</strong> We may request access to track location-based information to provide location-specific services (e.g., finding nearby colleagues).</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800 mb-2">C. Mobile Device Access</h3>
                        <p>We may request permission to access features like the Camera & Gallery (for clinical evidence uploads), Storage (for caching), and Notifications (for case updates).</p>
                    </div>
                </div>
            </section>

            <section id="how-collect" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">2. HOW WE COLLECT INFORMATION</h2>
                <p className="mb-4">We collect information via:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Direct Interactions:</strong> Forms you fill out or account registration.</li>
                    <li><strong>Automated Technologies:</strong> Technical data collected as you interact with our App.</li>
                    <li><strong>Third Parties:</strong> Analytics providers and advertising networks.</li>
                </ul>
            </section>

            <section id="use-info" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">3. USE OF YOUR INFORMATION</h2>
                <p className="mb-4">We use collected information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Create and manage your professional account.</li>
                    <li>Facilitate the sharing of clinical cases.</li>
                    <li>Compile anonymous statistical data for internal analysis.</li>
                    <li>Prevent fraudulent transactions and protect against criminal activity.</li>
                    <li>Notify you of updates or offer new services.</li>
                </ul>
            </section>

            <section id="disclosure" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">4. DISCLOSURE OF YOUR INFORMATION</h2>
                <p className="mb-4">We may share information:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>By Law:</strong> To respond to legal processes or protect rights.</li>
                    <li><strong>Third-Party Service Providers:</strong> With partners like Supabase for hosting, data analysis, and payment processing.</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger or sale of assets.</li>
                </ul>
            </section>

            <section id="payment" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">5. PAYMENT & SUBSCRIPTION INFORMATION</h2>
                <div className="space-y-4">
                    <p><strong>5.1 Processing Methods.</strong> Website subscriptions are processed via Razorpay. App subscriptions are handled by Apple (App Store) or Google (Play Store).</p>
                    <p><strong>5.2 Data Security.</strong> We do NOT store your full credit card number or CVV. Financial data is handled exclusively by our PCI-DSS compliant processors.</p>
                    <p><strong>5.3 Non-Refundable Policy.</strong> Subscriptions are generally non-refundable. Refund requests for App/Play Store purchases must be directed to Apple or Google.</p>
                </div>
            </section>

            <section id="clinical" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4 text-red-700">6. CLINICAL EVIDENCE & PATIENT PRIVACY (CRITICAL)</h2>
                <p className="mb-4 font-semibold text-red-900 bg-red-50 p-3 rounded border border-red-100">IMPORTANT: We act as an "Intermediary" and "Data Processor." You, the User, are the "Data Controller" of any patient data you upload.</p>
                <div className="space-y-4">
                    <p><strong>6.1 No Protected Health Information (PHI).</strong> You warrant that you will NOT upload PHI (as defined by HIPAA) or Special Category Data (GDPR) unless it is fully de-identified.</p>
                    <p><strong>6.2 User Certification.</strong> By uploading, you certify the image contains no faces, names, or hospital IDs and that you have obtained necessary consent.</p>
                    <p><strong>6.3 Moderation.</strong> We reserve the right to delete content immediately if we suspect a privacy violation.</p>
                </div>
            </section>

            <section id="tracking" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">7. TRACKING TECHNOLOGIES & COOKIES</h2>
                <p>We use cookies and tracking pixels to customize the App and improve experience. You can reject cookies through your browser, though it may affect App functionality.</p>
            </section>

            <section id="analytics" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">8. THIRD-PARTY ANALYTICS & TOOLS</h2>
                <p>We use Google Analytics for Firebase (crash reporting) and Supabase (authentication and storage). We do not share your Personal Data with them for their marketing purposes.</p>
            </section>

            <section id="security" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">9. DATA SECURITY & ENCRYPTION</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Data is encrypted in transit via TLS 1.2/1.3.</li>
                    <li>Data at rest is protected by AES-256 encryption.</li>
                    <li>Access is restricted to authorized personnel via strict IAM policies.</li>
                </ul>
            </section>

            <section id="retention" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">10. DATA RETENTION POLICY</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Account Data:</strong> Retained until you request deletion.</li>
                    <li><strong>Usage Logs:</strong> Retained for 90 days for security auditing.</li>
                    <li><strong>Deleted Accounts:</strong> Residual copies may remain on backups for up to 30 days.</li>
                </ul>
            </section>

            <section id="international" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">11. INTERNATIONAL DATA TRANSFERS</h2>
                <p>Data may be transferred to and processed in India and the United States (where Supabase servers may be located). Your use of the App represents agreement to this transfer.</p>
            </section>

            <section id="gdpr" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">12. YOUR GDPR PRIVACY RIGHTS (EUROPE)</h2>
                <p>EEA residents have the right to access, rectify, or erase personal data, and the right to data portability. Contact us at <a href="mailto:team@aftertrials.com" className="text-blue-600 hover:underline">team@aftertrials.com</a> to exercise these rights.</p>
            </section>

            <section id="ccpa" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">13. YOUR CCPA/CPRA PRIVACY RIGHTS (CALIFORNIA)</h2>
                <p>California residents may request disclosure of collected data, request deletion, and have the right to non-discrimination for exercising these rights. We do not sell your personal data.</p>
            </section>

            <section id="dpdp" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">14. INDIAN DIGITAL PERSONAL DATA PROTECTION (DPDP)</h2>
                <p>As a Data Fiduciary, we acknowledge your rights as a Data Principal to access, correct, and erase data. Grievances can be sent to <a href="mailto:team@aftertrials.com" className="text-blue-600 hover:underline">team@aftertrials.com</a>.</p>
            </section>

            <section id="children" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">15. CHILDREN'S PRIVACY</h2>
                <p>We do not knowingly collect data from anyone under 18. If we discover such data, we will remove it immediately.</p>
            </section>

            <section id="dnt" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">16. DO-NOT-TRACK FEATURES</h2>
                <p>We do not currently respond to DNT browser signals as no uniform technology standard exists.</p>
            </section>

            <section id="changes" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">17. CHANGES TO THIS POLICY</h2>
                <p>Updates will be posted on this page with a new "Last Updated" date. We advise periodic review.</p>
            </section>

            <section id="contact" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">18. CONTACT INFORMATION</h2>
                <p className="mb-4">For questions or comments, please contact us at:</p>
                <div className="bg-gray-50 p-4 rounded ml-4 border border-gray-100">
                    <p className="font-bold">After Trials Team</p>
                    <p>Jamshedpur, Jharkhand, India</p>
                    <p>Email: <a href="mailto:team@aftertrials.com" className="text-blue-600 hover:underline">team@aftertrials.com</a></p>
                    <p>Website: <a href="https://aftertrials.com" className="text-blue-600 hover:underline">https://aftertrials.com</a></p>
                </div>
            </section>

            <footer className="text-sm text-gray-500 mt-12 border-t pt-8">
                <p>© 2026 After Trials. All rights reserved. Built with Enterprise Security Standards.</p>
            </footer>
        </InfoPageLayout>
    );
}
