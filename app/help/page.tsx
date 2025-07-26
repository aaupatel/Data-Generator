import Navbar from "@/components/Navbar"

export default function HelpPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Help Center</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-2">
                  How to Generate Data
                </h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Select your desired fields from the Field Selector</li>
                  <li>Configure the number of records and other options</li>
                  <li>Choose your preferred output format</li>
                  <li>Click "Generate Data" to create your dataset</li>
                </ol>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Subscription Plans</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-2">Free Plan</h3>
                <ul className="list-disc list-inside">
                  <li>Limited to 2,000 rows per file</li>
                  <li>Basic field types available</li>
                  <li>Standard output formats</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-2">
                  Silver Plan (₹3000/year)
                </h3>
                <ul className="list-disc list-inside">
                  <li>Up to 300,000 rows per file</li>
                  <li>All field types available</li>
                  <li>All output formats</li>
                  <li>Generate 1M records/day</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-2">
                  Gold Plan (₹9000/year)
                </h3>
                <ul className="list-disc list-inside">
                  <li>Up to 8M rows per file</li>
                  <li>All features included</li>
                  <li>Priority support</li>
                  <li>Unlimited daily records</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-2">Common Questions</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">
                      Q: How do I upgrade my subscription?
                    </p>
                    <p>
                      A: Go to Settings → Subscription Plans and choose your
                      desired plan.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">
                      Q: What happens after I use all my free trials?
                    </p>
                    <p>
                      A: You'll need to create an account to continue using the
                      service.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">
                      Q: Can I generate data in multiple languages?
                    </p>
                    <p>
                      A: Yes, you can select different languages in the
                      configuration panel.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="mb-4">Need more help? Contact our support team:</p>
              <p className="text-primary">support@datagenerator.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
