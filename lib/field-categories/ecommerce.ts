import { FieldCategory } from "../types";

export const ecommerce: FieldCategory = {
  name: "E-commerce",
  icon: "ShoppingCart",
  fields: [
    { id: "orderId", label: "Order ID", type: "string", example: "ORD001" },
    { id: "productName", label: "Product Name", type: "string", example: "Wireless Headphones" },
    { id: "price", label: "Price", type: "number", example: "99.99" },
    { id: "quantity", label: "Quantity", type: "number", example: "2" },
    { id: "category", label: "Category", type: "string", example: "Electronics" },
    { id: "customerName", label: "Customer Name", type: "string", example: "John Smith" },
    { id: "shippingMethod", label: "Shipping Method", type: "string", example: "Express" },
    { id: "trackingNumber", label: "Tracking Number", type: "string", example: "1Z999AA1234567890" },
    { id: "orderStatus", label: "Order Status", type: "string", example: "Processing" },
    { id: "paymentMethod", label: "Payment Method", type: "string", example: "Credit Card" },
    { id: "couponCode", label: "Coupon Code", type: "string", example: "SAVE20" },
    { id: "discount", label: "Discount", type: "number", example: "20" },
    { id: "tax", label: "Tax", type: "number", example: "8.99" },
    { id: "totalAmount", label: "Total Amount", type: "number", example: "108.98" },
    { id: "orderDate", label: "Order Date", type: "date", example: "2024-01-20" }
  ]
};