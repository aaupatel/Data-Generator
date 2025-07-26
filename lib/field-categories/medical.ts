import { FieldCategory } from "../types";

export const medical: FieldCategory = {
  name: "Medical",
  icon: "Heart",
  fields: [
    { id: "bloodType", label: "Blood Type", type: "string", example: "A+" },
    { id: "height", label: "Height", type: "string", example: "5'10\"" },
    { id: "weight", label: "Weight", type: "number", example: "160" },
    { id: "bmi", label: "BMI", type: "number", example: "24.5" },
    { id: "allergies", label: "Allergies", type: "string", example: "Peanuts" },
    { id: "medications", label: "Medications", type: "string", example: "Aspirin" },
    { id: "chronicConditions", label: "Chronic Conditions", type: "string", example: "Asthma" },
    { id: "surgeries", label: "Surgeries", type: "string", example: "Appendectomy" },
    { id: "familyHistory", label: "Family History", type: "string", example: "Diabetes" },
    { id: "immunizations", label: "Immunizations", type: "string", example: "Flu Shot" },
    { id: "lastCheckup", label: "Last Checkup", type: "date", example: "2023-12-15" },
    { id: "bloodPressure", label: "Blood Pressure", type: "string", example: "120/80" },
    { id: "pulseRate", label: "Pulse Rate", type: "number", example: "72" },
    { id: "visionLeft", label: "Vision Left", type: "string", example: "20/20" },
    { id: "visionRight", label: "Vision Right", type: "string", example: "20/20" }
  ]
};