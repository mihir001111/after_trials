import InfoPageLayout from "@/components/InfoPageLayout";

export default function AccountCancellationPage() {
    return (
        <InfoPageLayout title="Account Deletion">
            <p className="text-sm text-gray-500 mb-8">Last Updated: February 2026</p>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Deleting Your Account</h2>
                <p>
                    You can request to delete your account and all associated data at any time. Deleting your account is permanent and cannot be undone. All your personal data, profile information, and activity history will be permanently removed from our systems.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Procedure</h2>
                <p>
                    To request account deletion, please contact us at <a href="mailto:support@aftertrials.com" className="text-blue-600 underline">support@aftertrials.com</a> with the subject line "Account Deletion Request". Please send the request from the email address associated with your account for verification purposes.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">3. Data Retention</h2>
                <p>
                    We may retain certain information as required by law or for legitimate business purposes (such as fraud prevention) even after your account is deleted.
                </p>
            </section>
        </InfoPageLayout>
    );
}
