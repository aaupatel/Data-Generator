import { FieldCategory } from "../types";

export const customerService: FieldCategory = {
  name: "Customer Service",
  icon: "Headphones",
  fields: [
    { id: "ticketId", label: "Ticket ID", type: "string", example: "TKT001" },
    { id: "subject", label: "Subject", type: "string", example: "Product Issue" },
    { id: "priority", label: "Priority", type: "string", example: "High" },
    { id: "status", label: "Status", type: "string", example: "Open" },
    { id: "category", label: "Category", type: "string", example: "Technical Support" },
    { id: "assignedTo", label: "Assigned To", type: "string", example: "Jane Smith" },
    { id: "customerName", label: "Customer Name", type: "string", example: "John Doe" },
    { id: "responseTime", label: "Response Time", type: "string", example: "2 hours" },
    { id: "resolution", label: "Resolution", type: "string", example: "Fixed" },
    { id: "feedback", label: "Feedback", type: "string", example: "5 stars" },
    { id: "channel", label: "Channel", type: "string", example: "Email" },
    { id: "createdDate", label: "Created Date", type: "date", example: "2024-01-20" },
    { id: "resolvedDate", label: "Resolved Date", type: "date", example: "2024-01-21" },
    { id: "followUp", label: "Follow Up", type: "boolean", example: "true" },
    { id: "notes", label: "Notes", type: "string", example: "Customer contacted" }
  ]
};