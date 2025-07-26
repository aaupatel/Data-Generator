import { FieldCategory } from "../types";

export const technology: FieldCategory = {
  name: "Technology",
  icon: "Cpu",
  fields: [
    { id: "deviceId", label: "Device ID", type: "string", example: "DEV001" },
    { id: "type", label: "Device Type", type: "string", example: "Laptop" },
    { id: "manufacturer", label: "Manufacturer", type: "string", example: "TechCorp" },
    { id: "model", label: "Model", type: "string", example: "Pro X1" },
    { id: "serialNumber", label: "Serial Number", type: "string", example: "SN123456" },
    { id: "os", label: "Operating System", type: "string", example: "Windows 11" },
    { id: "processor", label: "Processor", type: "string", example: "Intel i7" },
    { id: "ram", label: "RAM", type: "string", example: "16GB" },
    { id: "storage", label: "Storage", type: "string", example: "512GB SSD" },
    { id: "purchaseDate", label: "Purchase Date", type: "date", example: "2024-01-15" },
    { id: "warranty", label: "Warranty", type: "string", example: "3 years" },
    { id: "status", label: "Status", type: "string", example: "Active" },
    { id: "location", label: "Location", type: "string", example: "IT Department" },
    { id: "lastUpdate", label: "Last Update", type: "date", example: "2024-01-20" },
    { id: "networkStatus", label: "Network Status", type: "string", example: "Connected" }
  ]
};