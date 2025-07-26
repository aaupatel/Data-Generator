import { FieldCategory } from "../types";

export const agriculture: FieldCategory = {
  name: "Agriculture",
  icon: "Leaf",
  fields: [
    { id: "fieldId", label: "Field ID", type: "string", example: "FLD001" },
    { id: "crop", label: "Crop Type", type: "string", example: "Wheat" },
    { id: "area", label: "Area", type: "number", example: "100" },
    { id: "soilType", label: "Soil Type", type: "string", example: "Clay Loam" },
    { id: "plantingDate", label: "Planting Date", type: "date", example: "2024-03-15" },
    { id: "harvestDate", label: "Harvest Date", type: "date", example: "2024-08-15" },
    { id: "yield", label: "Expected Yield", type: "number", example: "5000" },
    { id: "irrigation", label: "Irrigation Type", type: "string", example: "Drip" },
    { id: "fertilizer", label: "Fertilizer", type: "string", example: "NPK 20-20-20" },
    { id: "pesticides", label: "Pesticides", type: "string", example: "Organic" },
    { id: "weather", label: "Weather Conditions", type: "string", example: "Sunny" },
    { id: "moisture", label: "Soil Moisture", type: "string", example: "65%" },
    { id: "certification", label: "Certification", type: "string", example: "Organic" },
    { id: "equipment", label: "Equipment Used", type: "string", example: "Tractor" },
    { id: "laborHours", label: "Labor Hours", type: "number", example: "120" }
  ]
};