import { Language } from "../../types";
import { getFaker } from "../../faker/instances";
import { generateFullName } from "./name";

export function generateEmploymentValue(fieldId: string, language: Language): string {
  const faker = getFaker(language);

  switch (fieldId) {
    case "company":
      return faker.company.name();
    case "jobTitle":
      return faker.person.jobTitle();
    case "department":
      return faker.helpers.arrayElement([
        'Engineering',
        'Marketing',
        'Sales',
        'Human Resources',
        'Finance',
        'Operations',
        'Research & Development',
        'Customer Service',
        'Legal',
        'Information Technology'
      ]);
    case "startDate": {
      const date = faker.date.past({ years: 10 });
      return date.toISOString().split('T')[0];
    }
    case "endDate": {
      const date = faker.date.recent({ days: 365 });
      return date.toISOString().split('T')[0];
    }
    case "salary":
      return faker.finance.amount({ min: 30000, max: 200000, dec: 0 });
    case "employmentType":
      return faker.helpers.arrayElement([
        'Full-time',
        'Part-time',
        'Contract',
        'Temporary',
        'Internship',
        'Freelance'
      ]);
    case "supervisor":
      return generateFullName(language);
    case "officeLocation":
      return faker.helpers.arrayElement([
        'Headquarters',
        'Regional Office',
        'Branch Office',
        'Remote',
        'Satellite Office'
      ]) + ' - ' + faker.location.city();
    case "responsibilities":
      return faker.helpers.arrayElements([
        'Project Management',
        'Team Leadership',
        'Strategic Planning',
        'Budget Management',
        'Client Relations',
        'Product Development',
        'Quality Assurance',
        'Training & Development'
      ], { min: 2, max: 4 }).join(', ');
    case "skills":
      return faker.helpers.arrayElements([
        'JavaScript',
        'Python',
        'SQL',
        'Project Management',
        'Data Analysis',
        'Communication',
        'Leadership',
        'Problem Solving'
      ], { min: 3, max: 6 }).join(', ');
    case "projects":
      return faker.helpers.arrayElements([
        'Website Redesign',
        'Mobile App Development',
        'Database Migration',
        'Cloud Infrastructure',
        'Marketing Campaign',
        'Product Launch'
      ], { min: 1, max: 3 }).join(', ');
    case "achievements":
      return faker.helpers.arrayElements([
        'Employee of the Month',
        'Top Sales Performance',
        'Innovation Award',
        'Leadership Excellence',
        'Customer Service Award'
      ], { min: 1, max: 2 }).join(', ');
    case "contractType":
      return faker.helpers.arrayElement([
        'Permanent',
        'Fixed-term',
        'Zero-hour',
        'Consultancy',
        'Project-based'
      ]);
    case "workSchedule":
      return faker.helpers.arrayElement([
        '9 AM - 5 PM',
        '8 AM - 4 PM',
        '10 AM - 6 PM',
        'Flexible Hours',
        'Rotating Shifts'
      ]);
    default:
      return faker.lorem.word();
  }
}