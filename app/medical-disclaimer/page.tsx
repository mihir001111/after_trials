import InfoPageLayout from "@/components/InfoPageLayout";

export default function MedicalDisclaimerPage() {
    return (
        <InfoPageLayout title="Medical Disclaimer">
            <p className="text-sm text-gray-500 mb-8">Last Updated: February 11, 2026</p>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">1. NO MEDICAL ADVICE</h2>
                <p className="mb-4">
                    The information, including but not limited to, text, graphics, images, and other material contained on the After Trials mobile application and website (collectively, the "Service") are for educational, scientific, and informational purposes only.
                </p>
                <p className="font-medium text-gray-800">
                    No material on this Service is intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding a medical condition or treatment and before undertaking a new healthcare regimen.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">2. PROFESSIONAL RESPONSIBILITY</h2>
                <p className="mb-4">After Trials is a platform for healthcare professionals and medical students. If you are a healthcare professional using this Service:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>You acknowledge that the Service is a tool to assist in the exchange of clinical knowledge and evidence.</li>
                    <li>You remain solely responsible for the care of your patients and for any medical decisions or diagnoses made.</li>
                    <li>You should never disregard professional medical advice or delay in seeking it because of something you have read or seen on this Service.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">3. ACCURACY OF INFORMATION</h2>
                <p>
                    Medical knowledge is constantly changing and evolving. After Trials does not warrant or guarantee the accuracy, completeness, or timeliness of the clinical cases, dosages, or treatment protocols shared by users. The Service contains "User-Generated Content," and the Company does not pre-verify the clinical accuracy of every post. Relying on any information provided by the Service or other users is solely at your own risk.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">4. NO DOCTOR-PATIENT RELATIONSHIP</h2>
                <p>
                    Use of the Service does not create a doctor-patient relationship between you and After Trials, nor does it create a relationship between any user of the Service and the Company. The Service is not a "telehealth" platform and should not be used for active patient management.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">5. IMAGES AND CLINICAL EVIDENCE</h2>
                <p className="mb-4">The clinical images shared on After Trials are provided by users for peer-review and educational discussion. These images:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Represent specific, individual clinical scenarios that may not apply to other patients.</li>
                    <li>Should not be used as the sole basis for diagnosing other conditions.</li>
                    <li>Are required to be de-identified; however, After Trials is not liable for any user’s failure to properly anonymize patient data.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">6. LIMITATION OF LIABILITY</h2>
                <p className="uppercase">
                    To the maximum extent permitted by law, After Trials and its creators shall not be held liable for any direct, indirect, consequential, or other damages arising from the use of the Service, including but not limited to medical errors, misdiagnosis, or treatment failures resulting from information obtained via the platform.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">CONTACT INFORMATION</h2>
                <p className="mb-2">If you have questions regarding this disclaimer, please contact us at:</p>
                <p className="font-medium">Email: <a href="mailto:team@aftertrials.com" className="text-blue-600 hover:underline">team@aftertrials.com</a></p>
            </section>

            <footer className="text-sm text-gray-500 mt-12 border-t pt-8">
                <p>© 2026 After Trials. All rights reserved. Knowledge sharing for the medical community, at your own discretion.</p>
            </footer>
        </InfoPageLayout>
    );
}
