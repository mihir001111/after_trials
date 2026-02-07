import InfoPageLayout from "@/components/InfoPageLayout";

export default function TermsPage() {
    return (
        <InfoPageLayout title="Terms of Service">
            <p className="text-sm text-gray-500 mb-8">Last Updated: February 2026</p>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p>
                    By accessing and using After Trials ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Medical Disclaimer</h2>
                <p>
                    After Trials is a platform for professional communication and networking. It is NOT a substitute for professional medical advice, diagnosis, or treatment. You should not rely on information on this platform as a substitute for professional medical advice.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. User Conduct</h2>
                <p className="mb-4">
                    You agree to use the Service only for lawful purposes. You are prohibited from posting on or transmitting through the Service any material that is:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, sexually explicit, profane, hateful, racially, ethnically, or otherwise objectionable.</li>
                    <li>Encourages conduct that would constitute a criminal offense, give rise to civil liability or otherwise violate any law.</li>
                    <li>Violates the intellectual property rights of others.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Verification</h2>
                <p>
                    Use of After Trials is restricted to verified medical professionals. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">5. Termination</h2>
                <p>
                    We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
            </section>
        </InfoPageLayout>
    );
}
