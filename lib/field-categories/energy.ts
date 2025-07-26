import { FieldCategory } from "../types";

export const energy: FieldCategory = {
  name: "Energy",
  icon: "Zap",
  fields: [
    { id: "meterId", label: "Meter ID", type: "string", example: "MTR001" },
    { id: "type", label: "Energy Type", type: "string", example: "Electricity" },
    { id: "consumption", label: "Consumption", type: "number", example: "1500" },
    { id: "reading", label: "Reading", type: "number", example: "45678" },
    { id: "readDate", label: "Read Date", type: "date", example: "2024-01-20" },
    { id: "provider", label: "Provider", type: "string", example: "Power Co" },
    { id: "rate", label: "Rate", type: "number", example: "0.12" },
    { id: "peakUsage", label: "Peak Usage", type: "number", example: "2000" },
    { id: "offPeakUsage", label: "Off-Peak Usage", type: "number", example: "1000" },
    { id: "greenEnergy", label: "Green Energy", type: "string", example: "30%" },
    { id: "gridStatus", label: "Grid Status", type: "string", example: "Connected" },
    { id: "lastBill", label: "Last Bill", type: "number", example: "180.00" },
    { id: "serviceArea", label: "Service Area", type: "string", example: "Zone A" },
    { id: "meterType", label: "Meter Type", type: "string", example: "Smart Meter" },
    { id: "efficiency", label: "Efficiency Rating", type: "string", example: "A+" }
  ]
};