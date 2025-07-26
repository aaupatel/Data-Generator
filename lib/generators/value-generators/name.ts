import { Language } from "../../types";
import { getFaker } from "../../faker/instances";
import { chineseNames, prefixByLocale, middleNamesByLocale } from "../../faker/locales";

export function generateFirstName(language: Language): string {
  if (language === 'zh_CN') {
    return getRandomChineseName('firstName');
  }
  return getFaker(language).person.firstName();
}

export function generateLastName(language: Language): string {
  if (language === 'zh_CN') {
    return getRandomChineseName('lastName');
  }
  return getFaker(language).person.lastName();
}

export function generateFullName(language: Language): string {
  if (language === 'zh_CN') {
    return getRandomChineseName('fullName');
  }
  return getFaker(language).person.fullName();
}

export function generateMiddleName(language: Language): string {
  const names = middleNamesByLocale[language] || middleNamesByLocale.en;
  if (names.length === 0) return '';
  return names[Math.floor(Math.random() * names.length)];
}

export function generatePrefix(language: Language): string {
  const prefixes = prefixByLocale[language] || prefixByLocale.en;
  return prefixes[Math.floor(Math.random() * prefixes.length)];
}

function getRandomChineseName(type: 'firstName' | 'lastName' | 'fullName'): string {
  const names = chineseNames[type];
  return names[Math.floor(Math.random() * names.length)];
}