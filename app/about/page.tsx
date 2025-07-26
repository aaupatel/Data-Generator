import Navbar from "@/components/Navbar"

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <Navbar/>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">About Data Generator</h1>

        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Data Generator is a powerful tool designed to help developers,
            testers, and data analysts create realistic sample data for their
            applications and databases.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="mb-6">
            Our mission is to simplify the process of generating test data by
            providing an intuitive, flexible, and powerful platform that
            supports multiple formats and languages.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Key Features</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              Generate data in multiple formats (MySQL, PostgreSQL, MongoDB,
              JSON)
            </li>
            <li>Support for multiple international languages</li>
            <li>Customizable field selection</li>
            <li>Flexible output options</li>
            <li>Secure and reliable data generation</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Easy to Use</h3>
              <p>
                Intuitive interface that makes data generation simple and
                straightforward
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Flexible</h3>
              <p>
                Multiple output formats and customization options to suit your
                needs
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Reliable</h3>
              <p>Consistent and accurate data generation you can depend on</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
