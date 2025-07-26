import { FieldCategory } from "../types";

export const science: FieldCategory = {
  name: "Science",
  icon: "Microscope",
  fields: [
    { id: "experimentId", label: "Experiment ID", type: "string", example: "SCI001" },
    { id: "type", label: "Type", type: "string", example: "Clinical Trial" },
    { id: "researcher", label: "Researcher", type: "string", example: "Dr. Johnson" },
    { id: "institution", label: "Institution", type: "string", example: "Research Lab" },
    { id: "startDate", label: "Start Date", type: "date", example: "2024-01-20" },
    { id: "hypothesis", label: "Hypothesis", type: "string", example: "H1" },
    { id: "methodology", label: "Methodology", type: "string", example: "Double Blind" },
    { id: "equipment", label: "Equipment", type: "string", example: "Microscope" },
    { id: "variables", label: "Variables", type: "string", example: "Temperature" },
    { id: "results", label: "Results", type: "string", example: "Positive" },
    { id: "funding", label: "Funding", type: "number", example: "50000" },
    { id: "publication", label: "Publication", type: "string", example: "Nature" },
    { id: "peerReview", label: "Peer Review", type: "string", example: "Approved" },
    { id: "citations", label: "Citations", type: "number", example: "25" },
    { id: "category", label: "Category", type: "string", example: "Physics" }
  ]
};