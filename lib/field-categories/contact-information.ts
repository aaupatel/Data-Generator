import { FieldCategory } from "../types";

export const contactInformation: FieldCategory = {
  name: "Contact Information",
  icon: "Phone",
  fields: [
    { id: "email", label: "Email", type: "string", example: "john@example.com" },
    { id: "personalEmail", label: "Personal Email", type: "string", example: "john.smith@gmail.com" },
    { id: "workEmail", label: "Work Email", type: "string", example: "j.smith@company.com" },
    { id: "phone", label: "Phone", type: "string", example: "+1-555-0123" },
    { id: "mobile", label: "Mobile", type: "string", example: "+1-555-0124" },
    { id: "workPhone", label: "Work Phone", type: "string", example: "+1-555-0125" },
    { id: "emergencyContact", label: "Emergency Contact", type: "string", example: "Jane Smith" },
    { id: "emergencyPhone", label: "Emergency Phone", type: "string", example: "+1-555-0126" },
    { id: "fax", label: "Fax", type: "string", example: "+1-555-0127" },
    { id: "website", label: "Website", type: "string", example: "www.example.com" },
    { id: "skype", label: "Skype", type: "string", example: "john.smith" },
    { id: "telegram", label: "Telegram", type: "string", example: "@johnsmith" },
    { id: "whatsapp", label: "WhatsApp", type: "string", example: "+1-555-0128" },
    { id: "slack", label: "Slack", type: "string", example: "@john.smith" },
    { id: "discord", label: "Discord", type: "string", example: "john#1234" }
  ]
};