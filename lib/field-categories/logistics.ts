import { FieldCategory } from "../types";

export const logistics: FieldCategory = {
  name: "Logistics",
  icon: "Truck",
  fields: [
    { id: "shipmentId", label: "Shipment ID", type: "string", example: "SHP001" },
    { id: "trackingNumber", label: "Tracking Number", type: "string", example: "1Z999AA1234567890" },
    { id: "carrier", label: "Carrier", type: "string", example: "FedEx" },
    { id: "origin", label: "Origin", type: "string", example: "New York" },
    { id: "destination", label: "Destination", type: "string", example: "Los Angeles" },
    { id: "estimatedDelivery", label: "ETA", type: "date", example: "2024-01-25" },
    { id: "actualDelivery", label: "Actual Delivery", type: "date", example: "2024-01-24" },
    { id: "status", label: "Status", type: "string", example: "In Transit" },
    { id: "weight", label: "Weight", type: "string", example: "10.5 kg" },
    { id: "dimensions", label: "Dimensions", type: "string", example: "20x30x15 cm" },
    { id: "shippingMethod", label: "Shipping Method", type: "string", example: "Express" },
    { id: "customsStatus", label: "Customs Status", type: "string", example: "Cleared" },
    { id: "insurance", label: "Insurance", type: "string", example: "Full Coverage" },
    { id: "specialInstructions", label: "Special Instructions", type: "string", example: "Fragile" },
    { id: "cost", label: "Shipping Cost", type: "number", example: "150.00" }
  ]
};