// This is just one example category. Each category file will follow the same pattern
// with 100-150 fields each, totaling 5000+ fields across all categories.

import { User } from "lucide-react";
import { FieldCategory } from "../types";

export const personalInformation: FieldCategory = {
  name: "Personal Information",
  icon: User,
  fields: [
    { id: "id", label: "ID", type: "number", example: "1, 2, 3..." },
    { id: "prefix", label: "Prefix", type: "string", example: "Mr., Mrs., Dr." },
    { id: "firstName", label: "First Name", type: "string", example: "John, Alice" },
    { id: "middleName", label: "Middle Name", type: "string", example: "Marie, James" },
    { id: "lastName", label: "Last Name", type: "string", example: "Smith, Johnson" },
    { id: "suffix", label: "Suffix", type: "string", example: "Jr., Sr., III" },
    { id: "maidenName", label: "Maiden Name", type: "string", example: "Brown" },
    { id: "fullName", label: "Full Name", type: "string", example: "John James Smith" },
    { id: "nickname", label: "Nickname", type: "string", example: "Johnny" },
    { id: "preferredName", label: "Preferred Name", type: "string", example: "Jack" },
    // ... continues with 100+ more personal information fields
  ]
};