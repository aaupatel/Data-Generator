import Navbar from "@/components/Navbar"

export default function PrivacyPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <Navbar/>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <div className="prose max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              This Privacy Policy explains how we collect, use, and protect your
              personal information when you use our Data Generator service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email address and name for account creation</li>
              <li>Usage data and preferences</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>Technical information about your device and browser</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To process payments and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your
              personal information. However, no method of transmission over the
              internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
              <br />
              <a
                href="mailto:support@datagenerator.com"
                className="text-primary hover:underline"
              >
                support@datagenerator.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
