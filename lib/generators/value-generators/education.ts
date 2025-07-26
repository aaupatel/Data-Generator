import { Language } from "../../types";
import { getFaker } from "../../faker/instances";

export function generateEducationValue(fieldId: string, language: Language): string {
  const faker = getFaker(language);

  switch (fieldId) {
    case "degree":
      return faker.helpers.arrayElement([
        'Bachelor of Science',
        'Bachelor of Arts',
        'Master of Science',
        'Master of Arts',
        'Master of Business Administration',
        'Doctor of Philosophy',
        'Associate of Arts',
        'Bachelor of Engineering'
      ]);
    case "major":
      return faker.helpers.arrayElement([
        'Computer Science',
        'Business Administration',
        'Electrical Engineering',
        'Psychology',
        'Economics',
        'Biology',
        'Mathematics',
        'Marketing',
        'Chemistry',
        'Political Science'
      ]);
    case "minor":
      return faker.helpers.arrayElement([
        'Mathematics',
        'Psychology',
        'Business',
        'Communications',
        'Spanish',
        'Art History',
        'Music',
        'Environmental Studies'
      ]);
    case "university":
      return faker.helpers.arrayElement([
        'Stanford University',
        'Massachusetts Institute of Technology',
        'Harvard University',
        'University of California, Berkeley',
        'University of Michigan',
        'Cornell University',
        'University of Texas',
        'New York University'
      ]);
    case "gpa":
      return (2.5 + Math.random() * 1.5).toFixed(2);
    case "graduationYear": {
      const currentYear = new Date().getFullYear();
      return String(faker.number.int({ min: currentYear - 30, max: currentYear }));
    }
    case "startDate": {
      const currentYear = new Date().getFullYear();
      const date = new Date(faker.number.int({ min: currentYear - 30, max: currentYear - 4 }), 7, 15);
      return date.toISOString().split('T')[0];
    }
    case "endDate": {
      const currentYear = new Date().getFullYear();
      const date = new Date(faker.number.int({ min: currentYear - 30, max: currentYear }), 4, 15);
      return date.toISOString().split('T')[0];
    }
    case "honors":
      return faker.helpers.arrayElements([
        'Summa Cum Laude',
        'Magna Cum Laude',
        'Cum Laude',
        'Dean\'s List',
        'Phi Beta Kappa',
        'Honor Roll'
      ], { min: 0, max: 2 }).join(', ');
    case "certifications":
      return faker.helpers.arrayElements([
        'AWS Certified Solutions Architect',
        'Project Management Professional (PMP)',
        'Certified Public Accountant (CPA)',
        'Professional Engineer (PE)',
        'Certified Information Systems Security Professional (CISSP)'
      ], { min: 0, max: 2 }).join(', ');
    case "thesis":
      return faker.helpers.arrayElement([
        'Machine Learning Applications in Healthcare',
        'Sustainable Energy Solutions',
        'Economic Impact of Climate Change',
        'Neural Networks in Computer Vision',
        'Modern Marketing Strategies'
      ]);
    case "advisor":
      return 'Dr. ' + faker.person.lastName();
    case "scholarships":
      return faker.helpers.arrayElements([
        'Merit Scholarship',
        'Academic Excellence Award',
        'Research Grant',
        'Athletic Scholarship',
        'Leadership Award'
      ], { min: 0, max: 2 }).join(', ');
    case "activities":
      return faker.helpers.arrayElements([
        'Student Government',
        'Debate Team',
        'Chess Club',
        'Robotics Team',
        'Environmental Club',
        'Drama Society',
        'Campus Newspaper'
      ], { min: 1, max: 3 }).join(', ');
    case "studyAbroad":
      return faker.helpers.arrayElement([
        'Paris, France',
        'Tokyo, Japan',
        'London, UK',
        'Berlin, Germany',
        'Barcelona, Spain',
        'Rome, Italy',
        'Singapore'
      ]);
    default:
      return faker.lorem.word();
  }
}