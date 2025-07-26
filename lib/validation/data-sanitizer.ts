import { Language } from "../types";
import { getFaker } from "../faker/instances";
import { isLatinWord, containsUnwantedPatterns } from "./patterns";
import { REALISTIC_REPLACEMENTS } from "./realistic-data";

export function sanitizeValue(
  value: string | null,
  fieldId: string,
  fieldType: string,
  language: Language
): string | null {
  if (!value) return null;

  // Check if the value contains unwanted patterns or Latin words
  if (isLatinWord(value) || containsUnwantedPatterns(value)) {
    return getReplacement(fieldId, fieldType, language);
  }

  return value;
}

function getReplacement(fieldId: string, fieldType: string, language: Language): string {
  const faker = getFaker(language);
  
  // Check for specific field replacements first
  const specificReplacement = REALISTIC_REPLACEMENTS[fieldId];
  if (specificReplacement) {
    if (typeof specificReplacement === 'function') {
      return specificReplacement(faker);
    }
    return faker.helpers.arrayElement(specificReplacement);
  }

  // Fall back to type-based replacements
  switch (fieldType) {
    case 'string':
      return faker.lorem.word();
    case 'number':
      return faker.number.int({ min: 1, max: 1000 }).toString();
    case 'date':
      return faker.date.recent().toISOString().split('T')[0];
    case 'boolean':
      return faker.datatype.boolean().toString();
    case 'email':
      return faker.internet.email();
    case 'phone':
      return faker.phone.number();
    case 'address':
      return faker.location.streetAddress();
    case 'name':
      return faker.person.fullName();
    case 'company':
      return faker.company.name();
    default:
      return faker.lorem.word();
  }
}