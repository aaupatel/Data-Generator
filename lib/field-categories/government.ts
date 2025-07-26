import { FieldCategory } from "../types";

export const government: FieldCategory = {
  name: "Government",
  icon: "Landmark",
  fields: [
    { id: "documentId", label: "Document ID", type: "string", example: "GOV001" },
    { id: "type", label: "Document Type", type: "string", example: "Permit" },
    { id: "department", label: "Department", type: "string", example: "Treasury" },
    { id: "issueDate", label: "Issue Date", type: "date", example: "2024-01-15" },
    { id: "expiryDate", label: "Expiry Date", type: "date", example: "2025-01-14" },
    { id: "status", label: "Status", type: "string", example: "Active" },
    { id: "jurisdiction", label: "Jurisdiction", type: "string", example: "Federal" },
    { id: "applicant", label: "Applicant", type: "string", example: "John Smith" },
    { id: "purpose", label: "Purpose", type: "string", example: "Business License" },
    { id: "fee", label: "Fee", type: "number", example: "250" },
    { id: "approvedBy", label: "Approved By", type: "string", example: "Jane Doe" },
    { id: "regulations", label: "Regulations", type: "string", example: "Section 123" },
    { id: "amendments", label: "Amendments", type: "string", example: "None" },
    { id: "restrictions", label: "Restrictions", type: "string", example: "Zone A only" },
    { id: "verificationCode", label: "Verification Code", type: "string", example: "VER123" }
  ]
};