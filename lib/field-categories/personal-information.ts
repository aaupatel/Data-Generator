import { FieldCategory } from "../types";

export const personalInformation: FieldCategory = {
  name: "Personal Information",
  icon: "User",
  fields: [
    { id: "prefix", label: "Prefix", type: "string", example: "Mr., Mrs., Dr." },
    { id: "firstName", label: "First Name", type: "string", example: "John" },
    { id: "middleName", label: "Middle Name", type: "string", example: "Robert" },
    { id: "lastName", label: "Last Name", type: "string", example: "Smith" },
    { id: "suffix", label: "Suffix", type: "string", example: "Jr., Sr., III" },
    { id: "dateOfBirth", label: "Date of Birth", type: "date", example: "1990-01-01" },
    { id: "age", label: "Age", type: "number", example: "32" },
    { id: "gender", label: "Gender", type: "string", example: "Male, Female, Non-binary" },
    { id: "nationality", label: "Nationality", type: "string", example: "American" },
    { id: "maritalStatus", label: "Marital Status", type: "string", example: "Single" },
    { id: "ssn", label: "SSN", type: "string", example: "123-45-6789" },
    { id: "passport", label: "Passport Number", type: "string", example: "P123456789" },
    { id: "language", label: "Primary Language", type: "string", example: "English" },
    { id: "birthPlace", label: "Place of Birth", type: "string", example: "New York" },
    { id: "citizenship", label: "Citizenship", type: "string", example: "US" }
  ]
};