import InfoPageLayout from "@/components/InfoPageLayout";

export default function CancellationPage() {
    return (
        <InfoPageLayout title="Cancellation Policy">
            <p className="text-sm text-gray-500 mb-8">Last Updated: February 11, 2026</p>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">1. Cancellation Rights</h2>
                <p>
                    You may cancel your After Trials subscription at any time. Cancellation will stop future billing; however, you will retain access to the premium features of your plan until the end of your current paid billing period.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">2. How to Cancel</h2>
                <ul className="list-disc pl-6 space-y-4">
                    <li>
                        <strong>In-App (iOS):</strong> Open "Settings" on your iPhone &gt; [Your Name] &gt; "Subscriptions" &gt; Find "After Trials" &gt; "Cancel Subscription."
                    </li>
                    <li>
                        <strong>In-App (Android):</strong> Open "Google Play Store" &gt; Menu &gt; "Subscriptions" &gt; Find "After Trials" &gt; "Cancel Subscription."
                    </li>
                    <li>
                        <strong>Website (Razorpay/Stripe/PayPal):</strong> Login to your account at <a href="https://aftertrials.com" className="text-blue-600 hover:underline">https://aftertrials.com</a>, navigate to "Subscription Settings," and click "Cancel Autopay/Subscription."
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">3. Autopay Duration (Web)</h2>
                <p>
                    Subscriptions started on the web are set to a recurring "Autopay" status. While the technical authorization may extend for up to 20 years to ensure service continuity, you may terminate this authorization at any time without penalty by following the cancellation steps above.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">4. Data Access After Cancellation</h2>
                <p>
                    Upon the expiration of your final billing cycle, your account will revert to the "Free" or "Restricted" tier. Any premium content or data specifically associated with your paid tier may become inaccessible.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Contact for Billing Support</h2>
                <p>
                    <a href="mailto:team@aftertrials.com" className="text-blue-600 hover:underline">team@aftertrials.com</a>
                </p>
            </section>

            <footer className="text-sm text-gray-500 mt-12 border-t pt-8">
                <p>© 2026 After Trials. All rights reserved.</p>
            </footer>
        </InfoPageLayout>
    );
}
