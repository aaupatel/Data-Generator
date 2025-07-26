import { FieldCategory } from "../types";

export const projectManagement: FieldCategory = {
  name: "Project Management",
  icon: "ClipboardList",
  fields: [
    { id: "projectId", label: "Project ID", type: "string", example: "PRJ001" },
    { id: "projectName", label: "Project Name", type: "string", example: "Website Redesign" },
    { id: "startDate", label: "Start Date", type: "date", example: "2024-01-01" },
    { id: "endDate", label: "End Date", type: "date", example: "2024-06-30" },
    { id: "projectManager", label: "Project Manager", type: "string", example: "Jane Doe" },
    { id: "budget", label: "Budget", type: "number", example: "100000" },
    { id: "status", label: "Status", type: "string", example: "In Progress" },
    { id: "priority", label: "Priority", type: "string", example: "High" },
    { id: "methodology", label: "Methodology", type: "string", example: "Agile" },
    { id: "stakeholders", label: "Stakeholders", type: "string", example: "Marketing, IT" },
    { id: "milestones", label: "Milestones", type: "string", example: "Phase 1, Phase 2" },
    { id: "risks", label: "Risks", type: "string", example: "Technical Debt" },
    { id: "deliverables", label: "Deliverables", type: "string", example: "UI Design" },
    { id: "teamSize", label: "Team Size", type: "number", example: "8" },
    { id: "completion", label: "Completion", type: "string", example: "75%" }
  ]
};