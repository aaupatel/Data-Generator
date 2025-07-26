import { FieldCategory } from "../types";

export const legal: FieldCategory = {
  name: "Legal",
  icon: "Scale",
  fields: [
    { id: "caseNumber", label: "Case Number", type: "string", example: "CASE001" },
    { id: "caseType", label: "Case Type", type: "string", example: "Civil" },
    { id: "attorney", label: "Attorney", type: "string", example: "Jane Smith" },
    { id: "courtDate", label: "Court Date", type: "date", example: "2024-03-15" },
    { id: "jurisdiction", label: "Jurisdiction", type: "string", example: "New York" },
    { id: "clientName", label: "Client Name", type: "string", example: "John Doe" },
    { id: "filingDate", label: "Filing Date", type: "date", example: "2024-01-10" },
    { id: "status", label: "Status", type: "string", example: "Pending" },
    { id: "opposingCounsel", label: "Opposing Counsel", type: "string", example: "Smith & Associates" },
    { id: "judge", label: "Judge", type: "string", example: "Hon. Robert Wilson" },
    { id: "courtroom", label: "Courtroom", type: "string", example: "15B" },
    { id: "hearingType", label: "Hearing Type", type: "string", example: "Motion" },
    { id: "documents", label: "Documents", type: "string", example: "Complaint, Motion" },
    { id: "statute", label: "Statute", type: "string", example: "USC Title 18" },
    { id: "settlement", label: "Settlement Amount", type: "number", example: "50000" }
  ]
};