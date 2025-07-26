import { FieldCategory } from "../types";

export const healthcare: FieldCategory = {
  name: "Healthcare",
  icon: "Stethoscope",
  fields: [
    { id: "patientId", label: "Patient ID", type: "string", example: "PAT001" },
    { id: "medicalRecordNumber", label: "Medical Record Number", type: "string", example: "MRN123456" },
    { id: "diagnosis", label: "Diagnosis", type: "string", example: "Hypertension" },
    { id: "treatment", label: "Treatment", type: "string", example: "Medication" },
    { id: "bloodType", label: "Blood Type", type: "string", example: "O+" },
    { id: "allergies", label: "Allergies", type: "string", example: "Penicillin" },
    { id: "medications", label: "Medications", type: "string", example: "Lisinopril" },
    { id: "primaryPhysician", label: "Primary Physician", type: "string", example: "Dr. Smith" },
    { id: "specialist", label: "Specialist", type: "string", example: "Cardiologist" },
    { id: "insuranceProvider", label: "Insurance Provider", type: "string", example: "Blue Cross" },
    { id: "insuranceNumber", label: "Insurance Number", type: "string", example: "INS123456" },
    { id: "lastVisit", label: "Last Visit", type: "date", example: "2024-01-15" },
    { id: "nextAppointment", label: "Next Appointment", type: "date", example: "2024-03-01" },
    { id: "vaccinations", label: "Vaccinations", type: "string", example: "Flu, COVID-19" },
    { id: "chronicConditions", label: "Chronic Conditions", type: "string", example: "Diabetes" }
  ]
};