import InfoPageLayout from "@/components/InfoPageLayout";

export default function CookiePage() {
    return (
        <InfoPageLayout title="Cookie Policy">
            <p className="text-sm text-gray-500 mb-8">Last Updated: February 11, 2026</p>

            <p className="mb-8">
                This Cookie Policy explains how After Trials ("Company," "We," "Us," or "Our") uses cookies and similar tracking technologies when you visit our website https://aftertrials.com (the "Site") and use our mobile application, After Trials (the "App"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">1. WHAT ARE COOKIES?</h2>
                <p className="mb-4">
                    Cookies are small data files that are placed on your computer or mobile device when you visit a website or use an app. Cookies are widely used by online service providers to make their services work, or to work more efficiently, as well as to provide reporting information.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>First-party cookies:</strong> These are cookies set by After Trials.</li>
                    <li><strong>Third-party cookies:</strong> These are set by parties other than us (e.g., analytics or payment providers).</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">2. WHY DO WE USE COOKIES?</h2>
                <p>
                    We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Site and App to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our online properties.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">3. TYPES OF COOKIES WE USE</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-gray-800 mb-2">A. Essential Cookies</h3>
                        <p className="mb-2">These cookies are strictly necessary to provide you with services available through our Site and App and to use some of its features, such as access to secure areas.</p>
                        <p className="text-sm text-gray-600"><strong>Purpose:</strong> Authentication, security, and session management.</p>
                        <p className="text-sm text-gray-600"><strong>Provider:</strong> After Trials (via Supabase).</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800 mb-2">B. Performance and Functionality Cookies</h3>
                        <p className="mb-2">These cookies are used to enhance the performance and functionality of our Site and App but are non-essential to their use. However, without these cookies, certain functionality (like saved preferences) may become unavailable.</p>
                        <p className="text-sm text-gray-600"><strong>Purpose:</strong> To remember your login details and interface preferences.</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800 mb-2">C. Analytics and Customization Cookies</h3>
                        <p className="mb-2">These cookies collect information that is used either in aggregate form to help us understand how our Site and App are being used or how effective our marketing campaigns are.</p>
                        <p className="text-sm text-gray-600"><strong>Purpose:</strong> Tracking crash reports and user journey flow.</p>
                        <p className="text-sm text-gray-600"><strong>Provider:</strong> Google Analytics for Firebase.</p>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">4. OTHER TRACKING TECHNOLOGIES</h2>
                <p>
                    In addition to cookies, we may use other, similar technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enable us to recognize when someone has visited our Site or opened an email that we have sent them. This allows us to monitor the traffic patterns of users and to understand if you have come to our Site from an online advertisement displayed on a third-party website.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">5. HOW CAN I CONTROL COOKIES?</h2>
                <div className="space-y-4">
                    <p>You have the right to decide whether to accept or reject cookies.</p>
                    <p><strong>Browser Controls:</strong> You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our Site, though your access to some functionality and areas may be restricted.</p>
                    <p><strong>Mobile App Settings:</strong> On your mobile device, you can manage tracking permissions through your device settings (e.g., "Limit Ad Tracking" on iOS or "Opt out of Interest-Based Ads" on Android).</p>
                    <p><strong>Do Not Track:</strong> As noted in our Privacy Policy, we do not currently respond to "Do Not Track" signals.</p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">6. UPDATES TO THIS COOKIE POLICY</h2>
                <p>
                    We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">7. CONTACT US</h2>
                <p className="mb-4">If you have any questions about our use of cookies or other technologies, please email us at:</p>
                <div className="bg-gray-50 p-4 rounded border border-gray-100">
                    <p className="font-bold">After Trials Team</p>
                    <p>Email: <a href="mailto:team@aftertrials.com" className="text-blue-600 hover:underline">team@aftertrials.com</a></p>
                    <p>Website: <a href="https://aftertrials.com" className="text-blue-600 hover:underline">https://aftertrials.com</a></p>
                </div>
            </section>

            <footer className="text-sm text-gray-500 mt-12 border-t pt-8">
                <p>© 2026 After Trials. All rights reserved. Empowering clinical evidence with transparency.</p>
            </footer>
        </InfoPageLayout>
    );
}
