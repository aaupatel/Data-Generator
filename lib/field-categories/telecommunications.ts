import { FieldCategory } from "../types";

export const telecommunications: FieldCategory = {
  name: "Telecommunications",
  icon: "Radio",
  fields: [
    { id: "serviceId", label: "Service ID", type: "string", example: "TEL001" },
    { id: "type", label: "Service Type", type: "string", example: "Internet" },
    { id: "bandwidth", label: "Bandwidth", type: "string", example: "1Gbps" },
    { id: "provider", label: "Provider", type: "string", example: "Telecom Co" },
    { id: "planName", label: "Plan Name", type: "string", example: "Business Pro" },
    { id: "installDate", label: "Install Date", type: "date", example: "2024-01-01" },
    { id: "contractLength", label: "Contract Length", type: "string", example: "24 months" },
    { id: "monthlyCost", label: "Monthly Cost", type: "number", example: "99.99" },
    { id: "ipAddress", label: "IP Address", type: "string", example: "192.168.1.1" },
    { id: "networkType", label: "Network Type", type: "string", example: "Fiber" },
    { id: "dataUsage", label: "Data Usage", type: "string", example: "500GB" },
    { id: "serviceLevel", label: "Service Level", type: "string", example: "Premium" },
    { id: "uptime", label: "Uptime", type: "string", example: "99.9%" },
    { id: "supportLevel", label: "Support Level", type: "string", example: "24/7" },
    { id: "equipment", label: "Equipment", type: "string", example: "Router, Modem" }
  ]
};