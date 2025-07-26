import { FieldCategory } from "../types";

export const humanResources: FieldCategory = {
  name: "Human Resources",
  icon: "Users",
  fields: [
    { id: "employeeId", label: "Employee ID", type: "string", example: "EMP001" },
    { id: "hireDate", label: "Hire Date", type: "date", example: "2020-01-15" },
    { id: "position", label: "Position", type: "string", example: "Senior Manager" },
    { id: "department", label: "Department", type: "string", example: "HR" },
    { id: "supervisor", label: "Supervisor", type: "string", example: "John Smith" },
    { id: "employmentStatus", label: "Employment Status", type: "string", example: "Full-time" },
    { id: "payGrade", label: "Pay Grade", type: "string", example: "Level 5" },
    { id: "performanceReview", label: "Performance Review", type: "string", example: "Exceeds" },
    { id: "benefits", label: "Benefits", type: "string", example: "Health, Dental" },
    { id: "vacationDays", label: "Vacation Days", type: "number", example: "20" },
    { id: "sickLeave", label: "Sick Leave", type: "number", example: "10" },
    { id: "certifications", label: "Certifications", type: "string", example: "PMP, SHRM" },
    { id: "trainingCompleted", label: "Training Completed", type: "string", example: "Leadership" },
    { id: "lastPromotion", label: "Last Promotion", type: "date", example: "2023-06-15" },
    { id: "workLocation", label: "Work Location", type: "string", example: "HQ" }
  ]
};