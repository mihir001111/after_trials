import InfoPageLayout from "@/components/InfoPageLayout";

export default function TermsPage() {
    return (
        <InfoPageLayout title="Terms of Service">
            <p className="text-sm text-gray-500 mb-8">Last Modified: February 11, 2026</p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                <p className="font-bold text-red-700">IMPORTANT LEGAL NOTICE: PLEASE READ CAREFULLY.</p>
                <p className="text-sm text-red-600 mt-2">
                    THESE TERMS OF SERVICE CONTAIN A MANDATORY INDIVIDUAL ARBITRATION AND CLASS ACTION/JURY TRIAL WAIVER PROVISION THAT REQUIRES THE USE OF ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES, RATHER THAN JURY TRIALS OR CLASS ACTIONS.
                </p>
            </div>

            <p className="mb-8">
                These Terms of Service (the "Agreement") constitute a legally binding contract between After Trials, located in Jamshedpur, Jharkhand, India ("Company," "we," "us," or "our"), and you ("User," "you," or "your").
            </p>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-12">
                <h3 className="font-bold mb-4 text-gray-900 uppercase tracking-wider text-sm">Table of Contents</h3>
                <nav className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                    <a href="#acceptance" className="text-blue-600 hover:text-blue-800 hover:underline">1. Acceptance of Terms</a>
                    <a href="#eligibility" className="text-blue-600 hover:text-blue-800 hover:underline">2. Eligibility and Account Security</a>
                    <a href="#medical" className="text-red-700 font-medium hover:text-red-900 hover:underline">3. Medical Disclaimers (Critical)</a>
                    <a href="#user-content" className="text-blue-600 hover:text-blue-800 hover:underline">4. User Content and Licensing</a>
                    <a href="#privacy" className="text-blue-600 hover:text-blue-800 hover:underline">5. Patient Privacy and Compliance</a>
                    <a href="#prohibited" className="text-blue-600 hover:text-blue-800 hover:underline">6. Prohibited Activities</a>
                    <a href="#ip" className="text-blue-600 hover:text-blue-800 hover:underline">7. Intellectual Property Rights</a>
                    <a href="#dmca" className="text-blue-600 hover:text-blue-800 hover:underline">8. Copyright Infringement (DMCA)</a>
                    <a href="#payments" className="text-blue-600 hover:text-blue-800 hover:underline">9. Payments and Subscriptions</a>
                    <a href="#disclaimers" className="text-blue-600 hover:text-blue-800 hover:underline">10. Disclaimers of Warranties</a>
                    <a href="#liability" className="text-blue-600 hover:text-blue-800 hover:underline">11. Limitation of Liability</a>
                    <a href="#indemnification" className="text-blue-600 hover:text-blue-800 hover:underline">12. Indemnification</a>
                    <a href="#dispute" className="text-blue-600 hover:text-blue-800 hover:underline">13. Dispute Resolution</a>
                    <a href="#termination" className="text-blue-600 hover:text-blue-800 hover:underline">14. Term and Termination</a>
                    <a href="#general" className="text-blue-600 hover:text-blue-800 hover:underline">15. General Provisions</a>
                </nav>
            </div>

            <section id="acceptance" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">1. ACCEPTANCE OF TERMS</h2>
                <div className="space-y-4">
                    <p><strong>1.1 Agreement.</strong> By downloading, installing, accessing, or using the proprietary mobile application known as "After Trials" (the "App") and the website at https://aftertrials.com (collectively, the "Service"), you acknowledge that you have read, understood, and agree to be bound by this Agreement.</p>
                    <p><strong>1.2 Electronic Signature.</strong> You agree that clicking "Sign Up," "Register," or "Login" constitutes your electronic signature and consent to enter into this legally binding agreement.</p>
                </div>
            </section>

            <section id="eligibility" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">2. ELIGIBILITY AND ACCOUNT SECURITY</h2>
                <div className="space-y-4">
                    <p><strong>2.1 Professional Use Only.</strong> The Service is strictly limited to verified healthcare professionals, medical students, and authorized academic personnel. By using the Service, you represent and warrant that you hold valid credentials in your jurisdiction.</p>
                    <p><strong>2.2 Account Security.</strong> You are responsible for maintaining the confidentiality of your login credentials. You notify us immediately of any unauthorized use. We are not liable for any loss or damage arising from your failure to comply with this security obligation.</p>
                </div>
            </section>

            <section id="medical" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4 text-red-700">3. MEDICAL DISCLAIMERS (CRITICAL)</h2>
                <div className="space-y-4">
                    <p><strong>3.1 No Medical Advice.</strong> The content provided through the Service is for educational, informational, and scientific purposes only. It is NOT intended to substitute for professional medical advice, diagnosis, or treatment.</p>
                    <p><strong>3.2 No Doctor-Patient Relationship.</strong> Use of the Service does not establish a doctor-patient relationship between you and the Company, or between you and any other User.</p>
                    <p><strong>3.3 Experimental Nature.</strong> You acknowledge that medical knowledge is constantly evolving. The Company does not warrant the accuracy, completeness, or usefulness of any case studies, images, or discussions.</p>
                </div>
            </section>

            <section id="user-content" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">4. USER CONTENT AND LICENSING</h2>
                <div className="space-y-4">
                    <p><strong>4.1 User Ownership.</strong> You retain ownership of the text, images, and data you upload ("User Content").</p>
                    <p><strong>4.2 License Grant to Company.</strong> By posting User Content, you grant the Company a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, and display the User Content in connection with the Service and the Company's business.</p>
                    <p><strong>4.3 Moral Rights.</strong> You waive any claims based on "moral rights" or attribution with respect to the User Content.</p>
                </div>
            </section>

            <section id="privacy" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">5. PATIENT PRIVACY AND COMPLIANCE</h2>
                <div className="space-y-4">
                    <p><strong>5.1 Strict Anonymization.</strong> You agree to strictly adhere to all applicable privacy laws, including the Health Insurance Portability and Accountability Act (HIPAA) (USA), the General Data Protection Regulation (GDPR) (EU), and the Information Technology Act, 2000 (India).</p>
                    <p><strong>5.2 Prohibition on PII.</strong> You warrant that ANY image or case description uploaded has been fully de-identified. It must NOT contain: Names, Facial features, Dates (except year), MRNs, Serial numbers, or Biometric identifiers.</p>
                    <p><strong>5.3 Immediate Takedown.</strong> The Company employs a "Zero Tolerance" policy. We reserve the right to remove any content alleged to violate privacy rights without prior notice and to ban the offending User.</p>
                </div>
            </section>

            <section id="prohibited" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">6. PROHIBITED ACTIVITIES</h2>
                <p className="mb-4">You agree not to engage in any of the following prohibited activities:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Reverse Engineering:</strong> Attempting to decompile, disassemble, or reverse engineer the App or Website code.</li>
                    <li><strong>Scraping:</strong> Using any robot, spider, scraper, or other automated means to access the Service.</li>
                    <li><strong>Sabotage:</strong> Creating false accounts to flag content or harass users.</li>
                    <li><strong>Competitive Intelligence:</strong> Accessing the Service to build a competitive product or service.</li>
                </ul>
            </section>

            <section id="ip" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">7. INTELLECTUAL PROPERTY RIGHTS</h2>
                <p>The Service and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of After Trials and its licensors.</p>
            </section>

            <section id="dmca" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">8. COPYRIGHT INFRINGEMENT (DMCA)</h2>
                <p>If you believe that your work has been copied in a way that constitutes copyright infringement, please provide our Copyright Agent with the written information specified by 17 U.S.C. 512(c)(3) at <a href="mailto:team@aftertrials.com" className="text-blue-600 hover:underline">team@aftertrials.com</a>.</p>
            </section>

            <section id="payments" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">9. PAYMENTS AND SUBSCRIPTIONS</h2>
                <div className="space-y-4">
                    <p><strong>9.1 Recurring Subscriptions.</strong> You authorize us to charge your payment method on a recurring basis until you cancel. Fees are billed in advance.</p>
                    <p><strong>9.2 STRICT NON-REFUNDABLE POLICY.</strong> PAYMENTS ARE NON-REFUNDABLE AND THERE ARE NO REFUNDS OR CREDITS FOR PARTIALLY USED PERIODS.</p>
                    <p><strong>9.3 Payment Security.</strong> All transactions are processed via secured, PCI-DSS compliant third-party payment gateways.</p>
                </div>
            </section>

            <section id="disclaimers" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">10. DISCLAIMERS OF WARRANTIES</h2>
                <p className="uppercase">THE SERVICE IS PROVIDED ON AN "AS IS" BASIS. THE COMPANY EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
            </section>

            <section id="liability" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">11. LIMITATION OF LIABILITY</h2>
                <p className="uppercase">TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL THE COMPANY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES. IN NO EVENT SHALL AGGREGATE LIABILITY EXCEED THE GREATER OF ₹1,000 OR THE AMOUNT PAID IN THE PAST SIX MONTHS.</p>
            </section>

            <section id="indemnification" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">12. INDEMNIFICATION</h2>
                <p>You agree to defend and indemnify the Company from and against any claims resulting from your use of the Service, breach of these Terms, or violation of patient privacy laws.</p>
            </section>

            <section id="dispute" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">13. DISPUTE RESOLUTION: ARBITRATION AND WAIVER</h2>
                <div className="space-y-4">
                    <p><strong>13.1 Governing Law.</strong> These Terms shall be governed by the laws of Jharkhand, India.</p>
                    <p><strong>13.2 Binding Arbitration.</strong> Disputes shall be settled by binding arbitration in Jamshedpur, Jharkhand.</p>
                    <p><strong>13.3 Class Action Waiver.</strong> YOU MAY BRING CLAIMS AGAINST THE COMPANY ONLY IN YOUR INDIVIDUAL CAPACITY.</p>
                </div>
            </section>

            <section id="termination" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">14. TERM AND TERMINATION</h2>
                <p>We may terminate or suspend your account immediately, without prior notice, for any reason, including breach of Terms.</p>
            </section>

            <section id="general" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold mb-4">15. GENERAL PROVISIONS</h2>
                <div className="space-y-4">
                    <p><strong>15.1 Severability.</strong> If any provision is held unenforceable, the remaining provisions will continue in full force.</p>
                    <p><strong>15.2 Entire Agreement.</strong> These Terms constitute the entire agreement regarding the Service.</p>
                </div>
            </section>

            <footer className="text-sm text-gray-500 mt-12 border-t pt-8">
                <p>Contact: After Trials Team | <a href="mailto:team@aftertrials.com" className="text-blue-600 hover:underline">team@aftertrials.com</a></p>
                <p>© 2026 After Trials. All rights reserved.</p>
            </footer>
        </InfoPageLayout>
    );
}
