import InfoPageLayout from "@/components/InfoPageLayout";

export default function SubscriptionTermsPage() {
    return (
        <InfoPageLayout title="Subscription Terms">
            <p className="text-sm text-gray-500 mb-8">Last Updated: February 11, 2026</p>

            <p className="mb-8">
                These Subscription Terms govern your purchase of paid tiers on the After Trials platform.
            </p>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">1. Subscription Tiers</h2>
                <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h3 className="font-bold text-gray-900">Student Plan</h3>
                        <p className="text-sm text-gray-600 mb-2">₹99 / $1.10 / €1.05 per month</p>
                        <p className="text-sm">Restricted to verified medical students with valid academic credentials.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h3 className="font-bold text-gray-900">Doctor Plan</h3>
                        <p className="text-sm text-gray-600 mb-2">₹999 / $11.00 / €9.30 per month</p>
                        <p className="text-sm">Restricted to verified healthcare professionals.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h3 className="font-bold text-gray-900">Company Plan</h3>
                        <p className="text-sm text-gray-600 mb-2">₹19,999 / $220.00 / €186.00 per month</p>
                        <p className="text-sm">For medical institutions, pharmaceutical entities, or corporate research use.</p>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">2. Billing and Payment Processors</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Mobile App:</strong> Payments are processed internally via Apple App Store or Google Play Store.</li>
                    <li><strong>Website:</strong> Payments are processed via Razorpay, Stripe, or PayPal.</li>
                    <li><strong>Autopay (Web):</strong> For subscriptions initiated on our website, you authorize a recurring payment (Autopay) for the duration of the subscription service, which may be set for a period of up to 20 years or until manually cancelled by you.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">3. Price Changes</h2>
                <p>
                    We reserve the right to change our subscription fees; however, any price changes will be communicated to you at least 30 days in advance and will apply only to the next billing cycle.
                </p>
            </section>

            <footer className="text-sm text-gray-500 mt-12 border-t pt-8">
                <p>© 2026 After Trials. All rights reserved.</p>
            </footer>
        </InfoPageLayout>
    );
}
