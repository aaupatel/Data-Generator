import { Language } from "../../types";
import { getFaker } from "../../faker/instances";
import { generateFullName } from "./name";
import { faker } from "@faker-js/faker";

const NATIONALITIES = [
  { country: "United States", citizenship: "American" },
  { country: "United Kingdom", citizenship: "British" },
  { country: "Canada", citizenship: "Canadian" },
  { country: "Australia", citizenship: "Australian" },
  { country: "Germany", citizenship: "German" },
  { country: "France", citizenship: "French" },
  { country: "Spain", citizenship: "Spanish" },
  { country: "Italy", citizenship: "Italian" },
  { country: "Japan", citizenship: "Japanese" },
  { country: "China", citizenship: "Chinese" }
];

const LANGUAGES = [
  { name: "English", level: "Native" },
  { name: "Spanish", level: "Fluent" },
  { name: "French", level: "Intermediate" },
  { name: "German", level: "Advanced" },
  { name: "Mandarin", level: "Basic" },
  { name: "Japanese", level: "Intermediate" },
  { name: "Arabic", level: "Fluent" },
  { name: "Portuguese", level: "Basic" }
];

export function generatePersonalValue(fieldId: string, language: Language): string {
  const faker = getFaker(language);
  const currentYear = new Date().getFullYear();

  switch (fieldId) {
    case "dateOfBirth": {
      // Generate date between 18 and 80 years ago
      const date = faker.date.birthdate({ min: 18, max: 80 });
      return date.toISOString().split('T')[0];
    }
    case "age": {
      // Generate realistic age between 18 and 80
      return String(faker.number.int({ min: 18, max: 80 }));
    }
    case "gender":
      return faker.helpers.arrayElement([
        "Male", "Female", "Non-binary", "Prefer not to say"
      ]);
    case "nationality": {
      const nat = faker.helpers.arrayElement(NATIONALITIES);
      return nat.citizenship;
    }
    case "maritalStatus":
      return faker.helpers.arrayElement([
        "Single", "Married", "Divorced", "Widowed", "Separated",
        "Domestic Partnership"
      ]);
    case "ssn":
      return generateSSN(language);
    case "passport":
      return generatePassport(language);
    case "language": {
      const lang = faker.helpers.arrayElement(LANGUAGES);
      return `${lang.name} (${lang.level})`;
    }
    case "birthPlace": {
      const city = faker.location.city();
      const country = faker.location.country();
      return `${city}, ${country}`;
    }
    case "citizenship": {
      const nat = faker.helpers.arrayElement(NATIONALITIES);
      return nat.country;
    }
    default:
      return faker.lorem.word();
  }
}

function generateSSN(language: Language): string {
  switch (language) {
    case "en":
      // US SSN format: XXX-XX-XXXX
      return `${faker.helpers.fromRegExp('[0-9]{3}')}-${faker.helpers.fromRegExp('[0-9]{2}')}-${faker.helpers.fromRegExp('[0-9]{4}')}`;
    case "fr":
      // French Social Security Number
      return `${faker.helpers.fromRegExp('[12][0-9]{2}[0-1][0-9]')}${faker.helpers.fromRegExp('[0-9]{5}')}${faker.helpers.fromRegExp('[0-9]{2}')}`;
    case "de":
      // German Social Security Number
      return `${faker.helpers.fromRegExp('[0-9]{2}[0-1][0-9][0-9]{2}')}-${faker.helpers.fromRegExp('[A-Z][0-9]{3}')}`;
    default:
      // Default to US format
      return `${faker.helpers.fromRegExp('[0-9]{3}')}-${faker.helpers.fromRegExp('[0-9]{2}')}-${faker.helpers.fromRegExp('[0-9]{4}')}`;
  }
}

function generatePassport(language: Language): string {
  switch (language) {
    case "en":
      // US Passport format
      return `${faker.helpers.fromRegExp('[0-9]{9}')}`;
    case "gb":
      // UK Passport format
      return `${faker.helpers.fromRegExp('[0-9]{9}')}GBR`;
    case "fr":
      // French Passport format
      return `${faker.helpers.fromRegExp('[0-9]{2}[A-Z]{2}[0-9]{5}')}`;
    case "de":
      // German Passport format
      return `${faker.helpers.fromRegExp('C[A-Z0-9]{8}')}DEU`;
    default:
      // Generic format
      return `${faker.helpers.fromRegExp('[A-Z][0-9]{8}')}`;
  }
}