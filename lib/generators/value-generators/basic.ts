import { DataType, Language } from "../../types";
import { getFaker } from "../../faker/instances";

export function generateBasicValue(type: DataType, language: Language = 'en'): string {
  const localFaker = getFaker(language);

  try {
    switch (type) {
      case "string":
        return localFaker.lorem.word() || localFaker.random.word();
      case "number":
        return String(localFaker.number.int({ min: 1, max: 1000 }));
      case "date":
        return localFaker.date.recent().toISOString().split('T')[0];
      case "boolean":
        return String(Math.random() < 0.5);
      case "url":
        return localFaker.internet.url() || 'https://example.com';
      case "currency":
        return localFaker.finance.amount({ min: 1, max: 1000, dec: 2, symbol: '$' });
      case "uuid":
        return localFaker.string.uuid();
      case "ipAddress":
        return localFaker.internet.ip();
      case "macAddress":
        return localFaker.internet.mac();
      default:
        return localFaker.lorem.word() || 'default';
    }
  } catch (error) {
    console.warn(`Error generating ${type} for language ${language}, using fallback`);
    const fallbackFaker = getFaker('en');
    
    // Provide safe fallbacks for each type
    switch (type) {
      case "string":
        return fallbackFaker.lorem.word();
      case "number":
        return String(Math.floor(Math.random() * 1000) + 1);
      case "date":
        return new Date().toISOString().split('T')[0];
      case "boolean":
        return String(Math.random() < 0.5);
      case "url":
        return 'https://example.com';
      case "currency":
        return '$' + (Math.random() * 1000).toFixed(2);
      case "uuid":
        return fallbackFaker.string.uuid();
      case "ipAddress":
        return '192.168.1.1';
      case "macAddress":
        return '00:00:00:00:00:00';
      default:
        return 'fallback';
    }
  }
}