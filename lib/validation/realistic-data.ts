import { Faker } from "@faker-js/faker";

export const REALISTIC_REPLACEMENTS: Record<string, string[] | ((faker: Faker) => string)> = {
  // Vehicle Information
  make: [
    "Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes-Benz",
    "Audi", "Volkswagen", "Hyundai", "Kia", "Nissan", "Mazda"
  ],
  model: (faker: Faker) => {
    const models: Record<string, string[]> = {
      Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Prius"],
      Honda: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey"],
      Ford: ["F-150", "Mustang", "Explorer", "Escape", "Edge"],
      BMW: ["3 Series", "5 Series", "X3", "X5", "7 Series"]
    };
    const make = faker.helpers.arrayElement(Object.keys(models));
    return faker.helpers.arrayElement(models[make]);
  },
  color: [
    "Black", "White", "Silver", "Gray", "Red", "Blue", "Green",
    "Pearl White", "Metallic Gray", "Deep Blue", "Crystal Black"
  ],

  // Medical Information
  bloodType: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  visionScore: ["20/20", "20/25", "20/30", "20/40", "20/50", "20/60"],
  condition: [
    "Hypertension", "Type 2 Diabetes", "Asthma", "Arthritis",
    "Migraine", "Anxiety", "Depression", "Hypothyroidism"
  ],

  // Legal Information
  caseType: [
    "Civil", "Criminal", "Family", "Corporate", "Real Estate",
    "Intellectual Property", "Employment", "Immigration"
  ],
  courtroom: (faker: Faker) => `Courtroom ${faker.number.int({ min: 1, max: 20 })}`,
  jurisdiction: [
    "Federal Court", "State Court", "District Court", "Supreme Court",
    "Circuit Court", "Appellate Court", "Municipal Court"
  ],

  // Order Information
  orderStatus: [
    "Pending", "Processing", "Shipped", "Delivered", "Cancelled",
    "On Hold", "Returned", "Refunded"
  ],
  shippingMethod: [
    "Standard Ground", "Express", "Next Day Air", "Two-Day Air",
    "International Priority", "Local Delivery"
  ],
  paymentMethod: [
    "Credit Card", "PayPal", "Bank Transfer", "Apple Pay",
    "Google Pay", "Cryptocurrency", "Cash on Delivery"
  ],

  // Product Information
  category: [
    "Electronics", "Clothing", "Home & Garden", "Books",
    "Sports & Outdoors", "Beauty & Health", "Toys & Games"
  ],
  condition: [
    "New", "Like New", "Very Good", "Good", "Acceptable", "Refurbished"
  ],

  // Document Types
  documentType: [
    "Contract", "Invoice", "Receipt", "Proposal", "Agreement",
    "Certificate", "License", "Permit", "Report"
  ],

  // Status Types
  status: [
    "Active", "Inactive", "Pending", "Completed", "Cancelled",
    "On Hold", "In Review", "Approved", "Rejected"
  ]
};