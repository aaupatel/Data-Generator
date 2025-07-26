import { DataType, Language } from "../types";
import { getFaker } from '../faker/instances';
import { sanitizeValue } from '../validation/data-sanitizer';
import { generateEmail } from './value-generators/email';
import { generateFirstName, generateLastName, generateFullName, generateMiddleName, generatePrefix } from './value-generators/name';
import { generateMedicalValue } from './value-generators/medical';
import { generateLegalValue } from './value-generators/legal';
import { generateTravelValue } from './value-generators/travel';
import { generateEmploymentValue } from './value-generators/employment';
import { generateEducationValue } from './value-generators/education';
import { generateFinancialValue } from './value-generators/financial';
import { generateVehicleValue } from './value-generators/vehicle';
import { generateOrderValue } from './value-generators/order';
import { generateScientificValue } from './value-generators/scientific';

export function generateRandomValue(fieldId: string, allowNull: boolean = false, language: Language = 'en'): string | null {
  try {
    if (allowNull && Math.random() < 0.1) {
      return null;
    }

    const faker = getFaker(language);
    let generatedValue: string | null = null;

    // Generate initial value based on field type
    if (fieldId.match(/^(make|model|year|vin|licensePlate|color|mileage|fuelType|transmission)/)) {
      generatedValue = generateVehicleValue(fieldId, language);
    } else if (fieldId.match(/^(bloodType|height|weight|bmi|allergies|medications|chronicConditions|surgeries|familyHistory|immunizations|lastCheckup|bloodPressure|pulseRate|vision)/)) {
      generatedValue = generateMedicalValue(fieldId, language);
    } else if (fieldId.match(/^(caseNumber|caseType|attorney|courtDate|jurisdiction|clientName|filingDate|status|opposingCounsel|judge|courtroom|hearingType|documents|statute|settlement)/)) {
      generatedValue = generateLegalValue(fieldId, language);
    } else if (fieldId.match(/^(flightNumber|departure|arrival|departureDate|arrivalDate|airline|seatNumber|bookingReference|ticketClass|terminal|gate|baggage|mealPreference|frequentFlyerNumber)/)) {
      generatedValue = generateTravelValue(fieldId, language);
    } else if (fieldId.match(/^(orderId|productName|category|price|quantity|orderDate|shippingMethod|trackingNumber|orderStatus|paymentMethod|couponCode|discount|tax|totalAmount)/)) {
      generatedValue = generateOrderValue(fieldId, language);
    } else if (fieldId.match(/^(experimentId|methodology|equipment|variables|measurements|results|analysis|conclusions|keywords)/)) {
      generatedValue = generateScientificValue(fieldId, language);
    } else {
      // Handle other field types
      switch (fieldId) {
        case "firstName": generatedValue = generateFirstName(language); break;
        case "lastName": generatedValue = generateLastName(language); break;
        case "fullName": generatedValue = generateFullName(language); break;
        case "middleName": generatedValue = generateMiddleName(language); break;
        case "prefix": generatedValue = generatePrefix(language); break;
        case "email": generatedValue = generateEmail(language); break;
        default: generatedValue = generateBasicValue(fieldId as DataType, language);
      }
    }

    // Sanitize and validate the generated value
    const sanitizedValue = sanitizeValue(generatedValue, fieldId, getFieldType(fieldId), language);
    
    // If sanitization returns null or the value is invalid, generate a basic value
    if (!sanitizedValue) {
      return generateBasicValue(getFieldType(fieldId) as DataType, language);
    }

    return sanitizedValue;
  } catch (error) {
    console.error(`Error generating value for field ${fieldId}:`, error);
    return getFaker('en').lorem.word();
  }
}

function getFieldType(fieldId: string): string {
  // Map field IDs to their types
  const typeMap: Record<string, string> = {
    email: 'email',
    phone: 'phone',
    date: 'date',
    url: 'url',
    age: 'number',
    price: 'currency',
    salary: 'currency',
    zipCode: 'postalCode',
    // Add more mappings as needed
  };

  return typeMap[fieldId] || 'string';
}

function generateBasicValue(type: DataType, language: Language): string {
  const faker = getFaker(language);
  
  try {
    switch (type) {
      case "string": return faker.lorem.word();
      case "number": return String(faker.number.int({ min: 1, max: 1000 }));
      case "date": return faker.date.recent().toISOString().split('T')[0];
      case "boolean": return String(faker.datatype.boolean());
      case "email": return generateEmail(language);
      case "phone": return faker.phone.number();
      case "url": return faker.internet.url();
      case "currency": return faker.finance.amount({ symbol: '$' });
      case "address": return faker.location.streetAddress();
      case "name": return generateFullName(language);
      case "username": return faker.internet.userName();
      case "company": return faker.company.name();
      case "jobTitle": return faker.person.jobTitle();
      case "uuid": return faker.string.uuid();
      case "ipAddress": return faker.internet.ip();
      case "color": return faker.color.human();
      case "department": return faker.commerce.department();
      case "product": return faker.commerce.productName();
      case "percentage": return faker.number.float({ min: 0, max: 100, precision: 0.01 }) + '%';
      default: return faker.lorem.word();
    }
  } catch (error) {
    console.warn(`Error generating ${type} for language ${language}, using fallback`);
    const fallbackFaker = getFaker('en');
    return fallbackFaker.lorem.word();
  }
}