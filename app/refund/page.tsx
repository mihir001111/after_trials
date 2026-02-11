import InfoPageLayout from "@/components/InfoPageLayout";

export default function RefundPage() {
    return (
        <InfoPageLayout title="Refund Policy">
            <p className="text-sm text-gray-500 mb-8">Last Updated: February 11, 2026</p>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">1. General No-Refund Policy</h2>
                <p>
                    All purchases made on After Trials are final. Because our Service provides immediate access to premium clinical evidence and professional networking tools, we do not offer refunds or credits for partially used subscription periods.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">2. Third-Party Transactions (Apple/Google)</h2>
                <p className="mb-4">If you subscribed via the Apple App Store or Google Play Store:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>After Trials does not have the technical ability to issue refunds for these transactions.</li>
                    <li>You must request a refund directly through Apple or Google, subject to their respective refund policies.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">3. Web Transactions (Razorpay/Stripe/PayPal)</h2>
                <p className="mb-4">For subscriptions purchased on our website:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Refunds are only considered in cases of technical double-billing or documented system errors.</li>
                    <li>"Accidental" renewals are not eligible for refunds if the Autopay was not cancelled prior to the billing date.</li>
                </ul>
            </section>

            <footer className="text-sm text-gray-500 mt-12 border-t pt-8">
                <p>© 2026 After Trials. All rights reserved.</p>
            </footer>
        </InfoPageLayout>
    );
}
