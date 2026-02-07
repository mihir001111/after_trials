import InfoPageLayout from "@/components/InfoPageLayout";

export default function PrivacyPage() {
    return (
        <InfoPageLayout title="Privacy Policy">
            <p className="text-sm text-gray-500 mb-8">Last Updated: February 2026</p>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p>
                    Welcome to After Trials. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Data We Collect</h2>
                <p className="mb-4">
                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier, title, date of birth and gender.</li>
                    <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                    <li><strong>Professional Data:</strong> includes medical license number, specialization, and institution.</li>
                    <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Data</h2>
                <p>
                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>To verify your identity as a medical professional.</li>
                    <li>To provide the social features of our platform.</li>
                    <li>To manage our relationship with you.</li>
                    <li>To improve our website, products/services, marketing and customer relationships.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                <p>
                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
                <p>
                    If you have any questions about this privacy policy or our privacy practices, please contact us at <a href="mailto:privacy@zenethe.com" className="text-blue-600 underline">privacy@zenethe.com</a>.
                </p>
            </section>
        </InfoPageLayout>
    );
}
