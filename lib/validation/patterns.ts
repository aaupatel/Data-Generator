// Common Latin words and patterns that indicate placeholder data
const LATIN_WORDS = new Set([
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing',
  'elit', 'sed', 'eiusmod', 'tempor', 'incididunt', 'labore', 'magna',
  'aliqua', 'enim', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
  'ullamco', 'laboris', 'nisi', 'aliquip', 'commodo', 'consequat',
  'vesica', 'beneficium', 'thesaurus', 'somnus', 'spectaculum', 'cruentus',
  'tabula', 'vestigium', 'concedo', 'ciminatio', 'confido'
]);

// Patterns that indicate placeholder or test data
const UNWANTED_PATTERNS = [
  /test\d*/i,                 // test, test1, test123
  /[a-z]{1,3}\d{3,}/i,       // abc123, x12345
  /dummy/i,                   // dummy, DUMMY, Dummy123
  /example/i,                 // example, EXAMPLE
  /placeholder/i,             // placeholder, PLACEHOLDER
  /^[a-z]{1,2}\d{1,2}$/i,    // a1, b2, aa11
  /^[x]{2,}$/i,              // xx, xxx, xxxx
  /^[0]{2,}$/i,              // 00, 000, 0000
  /^temp\d*/i,               // temp, temp1, temp123
  /^filler/i,                // filler, filler1
  /^mock/i,                  // mock, mock1
  /^fake/i,                  // fake, fake1
  /^sample/i,                // sample, sample1
  /^[a-z]\s[a-z]$/i,         // single letter words
  /^\d{1,2}\/\d{1,2}$/      // simple dates like 1/1, 12/12
];

export function isLatinWord(value: string): boolean {
  const words = value.toLowerCase().split(/\s+/);
  return words.some(word => LATIN_WORDS.has(word));
}

export function containsUnwantedPatterns(value: string): boolean {
  return UNWANTED_PATTERNS.some(pattern => pattern.test(value));
}

export function validateEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export function validatePhoneNumber(phone: string): boolean {
  const phonePattern = /^\+?[\d\s-()]{10,}$/;
  return phonePattern.test(phone);
}

export function validateDate(date: string): boolean {
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validateCurrency(value: string): boolean {
  const currencyPattern = /^[\$€£¥]?\d+(\.\d{2})?$/;
  return currencyPattern.test(value);
}

export function validatePostalCode(code: string, country: string = 'US'): boolean {
  const patterns: Record<string, RegExp> = {
    US: /^\d{5}(-\d{4})?$/,
    UK: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
    CA: /^[A-Z]\d[A-Z] ?\d[A-Z]\d$/i,
    DE: /^\d{5}$/
  };
  return patterns[country]?.test(code) ?? true;
}