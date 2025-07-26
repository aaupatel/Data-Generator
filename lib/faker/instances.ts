import { Faker, en, ar, zh_CN, de, es, fr, it, ja, ko, pt_BR, ru } from '@faker-js/faker';
import { Language } from '../types';

// Create a single base faker instance for fallback
const baseFaker = new Faker({ locale: [en] });

// Configure locales with proper fallbacks
const localeConfig = {
  en: [en],
  ar: [ar, en],
  zh_CN: [zh_CN, en],
  de: [de, en],
  es: [es, en],
  fr: [fr, en],
  it: [it, en],
  ja: [ja, en],
  ko: [ko, en],
  pt: [pt_BR, en],
  ru: [ru, en]
};

// Create faker instances with proper error handling
export const fakerInstances: Record<Language, Faker> = Object.entries(localeConfig).reduce(
  (acc, [lang, locales]) => {
    try {
      acc[lang as Language] = new Faker({ locale: locales });
    } catch (error) {
      console.warn(`Failed to initialize faker for ${lang}, using English fallback`);
      acc[lang as Language] = baseFaker;
    }
    return acc;
  },
  {} as Record<Language, Faker>
);

export function getFaker(language: Language = 'en'): Faker {
  try {
    const faker = fakerInstances[language];
    if (!faker) {
      throw new Error(`No faker instance for language: ${language}`);
    }
    return faker;
  } catch (error) {
    console.warn(`Using English fallback for language ${language}:`, error);
    return baseFaker;
  }
}