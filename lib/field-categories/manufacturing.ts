import { FieldCategory } from "../types";

export const manufacturing: FieldCategory = {
  name: "Manufacturing",
  icon: "Factory",
  fields: [
    { id: "batchId", label: "Batch ID", type: "string", example: "BAT001" },
    { id: "productLine", label: "Product Line", type: "string", example: "Electronics" },
    { id: "quantity", label: "Quantity", type: "number", example: "1000" },
    { id: "startTime", label: "Start Time", type: "date", example: "2024-01-20" },
    { id: "endTime", label: "End Time", type: "date", example: "2024-01-21" },
    { id: "machineId", label: "Machine ID", type: "string", example: "MCH001" },
    { id: "operator", label: "Operator", type: "string", example: "John Smith" },
    { id: "qualityScore", label: "Quality Score", type: "number", example: "98" },
    { id: "defectRate", label: "Defect Rate", type: "string", example: "0.5%" },
    { id: "materials", label: "Materials", type: "string", example: "Plastic, Metal" },
    { id: "shift", label: "Shift", type: "string", example: "Morning" },
    { id: "workstation", label: "Workstation", type: "string", example: "Assembly" },
    { id: "inspectionDate", label: "Inspection Date", type: "date", example: "2024-01-22" },
    { id: "certification", label: "Certification", type: "string", example: "ISO 9001" },
    { id: "wastage", label: "Wastage", type: "string", example: "2%" }
  ]
};