import { FieldCategory } from "../types";

export const security: FieldCategory = {
  name: "Security",
  icon: "Shield",
  fields: [
    { id: "incidentId", label: "Incident ID", type: "string", example: "SEC001" },
    { id: "type", label: "Type", type: "string", example: "Unauthorized Access" },
    { id: "severity", label: "Severity", type: "string", example: "High" },
    { id: "location", label: "Location", type: "string", example: "Server Room" },
    { id: "timestamp", label: "Timestamp", type: "date", example: "2024-01-20" },
    { id: "reportedBy", label: "Reported By", type: "string", example: "John Smith" },
    { id: "status", label: "Status", type: "string", example: "Investigating" },
    { id: "affectedSystems", label: "Affected Systems", type: "string", example: "Database Server" },
    { id: "resolution", label: "Resolution", type: "string", example: "Patched" },
    { id: "actionTaken", label: "Action Taken", type: "string", example: "System Lock" },
    { id: "vulnerabilityType", label: "Vulnerability Type", type: "string", example: "SQL Injection" },
    { id: "impactLevel", label: "Impact Level", type: "string", example: "Critical" },
    { id: "mitigationSteps", label: "Mitigation Steps", type: "string", example: "Firewall Update" },
    { id: "followUpRequired", label: "Follow Up Required", type: "boolean", example: "true" },
    { id: "complianceStatus", label: "Compliance Status", type: "string", example: "Compliant" }
  ]
};