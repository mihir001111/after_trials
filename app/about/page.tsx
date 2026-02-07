import InfoPageLayout from "@/components/InfoPageLayout";

export default function AboutPage() {
    return (
        <InfoPageLayout title="About Us">
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="mb-4">
                    After Trials is a dedicated social space where evidence meets empathy. We are building a sanctuary for doctors—beyond the clinic and beyond the trials.
                </p>
                <p>
                    We believe that medical professionals deserve a platform that understands the unique weight of their work. A place to connect, share insights, and grow together without the noise of traditional social media.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p>
                    To empower the global medical community by fostering verified, protected, and purposeful connections. We envision a world where every doctor has immediate access to a supportive network of peers, enabling better collaboration and ultimately, better patient care.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">The Team</h2>
                <p className="mb-4">
                    After Trials is powered by Zenethe, a forward-thinking technology company committed to solving complex problems in healthcare communication.
                </p>
                <p>
                    Our team consists of medical professionals, engineers, and designers who are passionate about reimagining how doctors interact in the digital age.
                </p>
            </section>
        </InfoPageLayout>
    );
}
