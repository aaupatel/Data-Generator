import { Language } from "../../types";
import { getFaker } from "../../faker/instances";

const PRODUCT_CATEGORIES = [
  {
    category: "Electronics",
    products: [
      { name: "4K Smart TV", brand: "Samsung", price: 799.99 },
      { name: "Wireless Headphones", brand: "Sony", price: 249.99 },
      { name: "Gaming Laptop", brand: "ASUS", price: 1299.99 },
      { name: "Smartphone", brand: "Apple", price: 999.99 },
      { name: "Tablet", brand: "iPad", price: 599.99 }
    ]
  },
  {
    category: "Home & Kitchen",
    products: [
      { name: "Coffee Maker", brand: "Breville", price: 199.99 },
      { name: "Air Fryer", brand: "Ninja", price: 149.99 },
      { name: "Robot Vacuum", brand: "iRobot", price: 399.99 },
      { name: "Stand Mixer", brand: "KitchenAid", price: 349.99 },
      { name: "Blender", brand: "Vitamix", price: 299.99 }
    ]
  },
  {
    category: "Fashion",
    products: [
      { name: "Running Shoes", brand: "Nike", price: 129.99 },
      { name: "Leather Wallet", brand: "Coach", price: 89.99 },
      { name: "Smartwatch", brand: "Apple", price: 399.99 },
      { name: "Backpack", brand: "North Face", price: 79.99 },
      { name: "Sunglasses", brand: "Ray-Ban", price: 159.99 }
    ]
  }
];

const SHIPPING_CARRIERS = [
  { name: "FedEx", trackingFormat: "FXXX-XXXX-XXXX" },
  { name: "UPS", trackingFormat: "1ZXX-XXX-XX-XXXX-XXXX" },
  { name: "USPS", trackingFormat: "94XX-XXXX-XXXX-XXXX-XXXX-XX" },
  { name: "DHL", trackingFormat: "XXXX-XXXX-XXXX" }
];

const ORDER_STATUSES = [
  { status: "Pending", description: "Order received, awaiting confirmation" },
  { status: "Confirmed", description: "Order confirmed, processing payment" },
  { status: "Processing", description: "Order is being prepared for shipping" },
  { status: "Shipped", description: "Order has been shipped" },
  { status: "Delivered", description: "Order has been delivered" },
  { status: "Cancelled", description: "Order has been cancelled" },
  { status: "Returned", description: "Order has been returned" }
];

export function generateOrderValue(fieldId: string, language: Language): string {
  const faker = getFaker(language);

  switch (fieldId) {
    case "orderId":
      return generateOrderId();
    case "productName": {
      const category = faker.helpers.arrayElement(PRODUCT_CATEGORIES);
      const product = faker.helpers.arrayElement(category.products);
      return `${product.brand} ${product.name}`;
    }
    case "category": {
      const category = faker.helpers.arrayElement(PRODUCT_CATEGORIES);
      return category.category;
    }
    case "price": {
      const category = faker.helpers.arrayElement(PRODUCT_CATEGORIES);
      const product = faker.helpers.arrayElement(category.products);
      return product.price.toFixed(2);
    }
    case "quantity":
      return String(faker.number.int({ min: 1, max: 5 }));
    case "orderDate": {
      const date = faker.date.recent({ days: 30 });
      return date.toISOString().split('T')[0];
    }
    case "shippingMethod": {
      const carrier = faker.helpers.arrayElement(SHIPPING_CARRIERS);
      const methods = ["Standard", "Express", "Next Day", "Two-Day"];
      return `${carrier.name} ${faker.helpers.arrayElement(methods)}`;
    }
    case "trackingNumber": {
      const carrier = faker.helpers.arrayElement(SHIPPING_CARRIERS);
      return generateTrackingNumber(carrier.trackingFormat);
    }
    case "orderStatus": {
      const status = faker.helpers.arrayElement(ORDER_STATUSES);
      return `${status.status} - ${status.description}`;
    }
    case "paymentMethod":
      return faker.helpers.arrayElement([
        "Credit Card", "PayPal", "Apple Pay", "Google Pay",
        "Bank Transfer", "Cryptocurrency"
      ]);
    case "couponCode":
      return generateCouponCode();
    case "discount":
      return String(faker.helpers.arrayElement([10, 15, 20, 25, 30, 40, 50]));
    case "tax":
      return (faker.number.float({ min: 5, max: 50, precision: 0.01 })).toFixed(2);
    case "totalAmount":
      return (faker.number.float({ min: 50, max: 1000, precision: 0.01 })).toFixed(2);
    default:
      return faker.lorem.word();
  }
}

function generateOrderId(): string {
  const prefix = "ORD";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
}

function generateTrackingNumber(format: string): string {
  return format.replace(/X/g, () => 
    Math.floor(Math.random() * 10).toString()
  );
}

function generateCouponCode(): string {
  const prefixes = ["SAVE", "DISC", "SPECIAL", "DEAL"];
  const prefix = faker.helpers.arrayElement(prefixes);
  const number = Math.floor(Math.random() * 100);
  return `${prefix}${number}`;
}