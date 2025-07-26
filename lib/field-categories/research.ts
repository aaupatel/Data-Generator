import { FieldCategory } from "../types";

export const research: FieldCategory = {
  name: "Research",
  icon: "FlaskConical",
  fields: [
    { id: "projectId", label: "Project ID", type: "string", example: "RES001" },
    { id: "title", label: "Title", type: "string", example: "Market Analysis" },
    { id: "researcher", label: "Researcher", type: "string", example: "Dr. Smith" },
    { id: "institution", label: "Institution", type: "string", example: "University" },
    { id: "startDate", label: "Start Date", type: "date", example: "2024-01-01" },
    { id: "endDate", label: "End Date", type: "date", example: "2024-12-31" },
    { id: "funding", label: "Funding", type: "number", example: "100000" },
    { id: "methodology", label: "Methodology", type: "string", example: "Quantitative" },
    { id: "sampleSize", label: "Sample Size", type: "number", example: "1000" },
    { id: "hypothesis", label: "Hypothesis", type: "string", example: "H1" },
    { id: "findings", label: "Findings", type: "string", example: "Significant" },
    { id: "publication", label: "Publication", type: "string", example: "Journal" },
    { id: "keywords", label: "Keywords", type: "string", example: "AI, ML" },
    { id: "status", label: "Status", type: "string", example: "In Progress" },
    { id: "collaborators", label: "Collaborators", type: "string", example: "Dr. Johnson" }
  ]
};