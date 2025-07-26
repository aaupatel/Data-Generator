import { FieldCategory } from "../types";

export const education: FieldCategory = {
  name: "Education",
  icon: "GraduationCap",
  fields: [
    { id: "degree", label: "Degree", type: "string", example: "Bachelor of Science" },
    { id: "major", label: "Major", type: "string", example: "Computer Science" },
    { id: "minor", label: "Minor", type: "string", example: "Mathematics" },
    { id: "university", label: "University", type: "string", example: "MIT" },
    { id: "gpa", label: "GPA", type: "number", example: "3.8" },
    { id: "graduationYear", label: "Graduation Year", type: "number", example: "2019" },
    { id: "startDate", label: "Start Date", type: "date", example: "2015-09-01" },
    { id: "endDate", label: "End Date", type: "date", example: "2019-05-15" },
    { id: "honors", label: "Honors", type: "string", example: "Cum Laude" },
    { id: "certifications", label: "Certifications", type: "string", example: "AWS Certified" },
    { id: "thesis", label: "Thesis", type: "string", example: "AI Applications" },
    { id: "advisor", label: "Advisor", type: "string", example: "Dr. Smith" },
    { id: "scholarships", label: "Scholarships", type: "string", example: "Merit Scholarship" },
    { id: "activities", label: "Activities", type: "string", example: "Chess Club" },
    { id: "studyAbroad", label: "Study Abroad", type: "string", example: "Paris, France" }
  ]
};