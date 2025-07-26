import { FieldCategory } from "../types";

export const inventory: FieldCategory = {
  name: "Inventory",
  icon: "Package",
  fields: [
    { id: "productId", label: "Product ID", type: "string", example: "PRD001" },
    { id: "sku", label: "SKU", type: "string", example: "SKU123456" },
    { id: "productName", label: "Product Name", type: "string", example: "Wireless Mouse" },
    { id: "category", label: "Category", type: "string", example: "Electronics" },
    { id: "quantity", label: "Quantity", type: "number", example: "100" },
    { id: "unitPrice", label: "Unit Price", type: "number", example: "29.99" },
    { id: "supplier", label: "Supplier", type: "string", example: "Tech Supplies Inc" },
    { id: "location", label: "Location", type: "string", example: "Warehouse A" },
    { id: "reorderPoint", label: "Reorder Point", type: "number", example: "20" },
    { id: "minimumStock", label: "Minimum Stock", type: "number", example: "10" },
    { id: "maximumStock", label: "Maximum Stock", type: "number", example: "200" },
    { id: "lastRestocked", label: "Last Restocked", type: "date", example: "2024-01-15" },
    { id: "expiryDate", label: "Expiry Date", type: "date", example: "2025-12-31" },
    { id: "batchNumber", label: "Batch Number", type: "string", example: "BAT123" },
    { id: "condition", label: "Condition", type: "string", example: "New" }
  ]
};