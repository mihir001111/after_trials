import InfoPageLayout from "@/components/InfoPageLayout";
import { Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
    return (
        <InfoPageLayout title="Contact Us">
            <p className="lead mb-12 text-xl text-gray-600">
                We act as specific as possible, but if you have any questions, partnership inquiries, or need verification assistance, we are unique and we are here.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
                        <Mail size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">General Inquiries</h3>
                    <p className="text-gray-600 mb-6">
                        For general questions about the platform, press, or partnerships.
                    </p>
                    <a href="mailto:team@aftertrials.com" className="font-semibold text-blue-600 hover:underline">
                        team@aftertrials.com
                    </a>
                </div>

                <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-6">
                        <MessageSquare size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Support</h3>
                    <p className="text-gray-600 mb-6">
                        Need help with your account or verification? Our support team is ready.
                    </p>
                    <a href="mailto:support@aftertrials.com" className="font-semibold text-purple-600 hover:underline">
                        support@aftertrials.com
                    </a>
                </div>
            </div>

            <section>
                <h2 className="text-2xl font-bold mb-6">Office</h2>
                <p className="text-gray-600">
                    Zenethe Inc.<br />
                    San Francisco, CA<br />
                    United States
                </p>
            </section>
        </InfoPageLayout>
    );
}
