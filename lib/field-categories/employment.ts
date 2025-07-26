import { FieldCategory } from "../types";

export const employment: FieldCategory = {
  name: "Employment",
  icon: "Briefcase",
  fields: [
    { id: "company", label: "Company", type: "string", example: "Acme Corp" },
    { id: "jobTitle", label: "Job Title", type: "string", example: "Software Engineer" },
    { id: "department", label: "Department", type: "string", example: "Engineering" },
    { id: "startDate", label: "Start Date", type: "date", example: "2020-01-15" },
    { id: "endDate", label: "End Date", type: "date", example: "2023-12-31" },
    { id: "salary", label: "Salary", type: "number", example: "75000" },
    { id: "employmentType", label: "Employment Type", type: "string", example: "Full-time" },
    { id: "supervisor", label: "Supervisor", type: "string", example: "Jane Doe" },
    { id: "officeLocation", label: "Office Location", type: "string", example: "NYC HQ" },
    { id: "responsibilities", label: "Responsibilities", type: "string", example: "Development" },
    { id: "skills", label: "Skills", type: "string", example: "JavaScript, React" },
    { id: "projects", label: "Projects", type: "string", example: "Website Redesign" },
    { id: "achievements", label: "Achievements", type: "string", example: "Employee of the Month" },
    { id: "contractType", label: "Contract Type", type: "string", example: "Permanent" },
    { id: "workSchedule", label: "Work Schedule", type: "string", example: "9 AM - 5 PM" }
  ]
};