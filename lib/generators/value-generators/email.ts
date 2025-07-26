import { Language } from "../../types";
import { getFaker } from "../../faker/instances";

const EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'example.com',
  'mail.com'
];

export function generateEmail(language: Language): string {
  const localFaker = getFaker(language);
  const enFaker = getFaker('en');
  
  try {
    // Use English usernames for non-Latin scripts to ensure valid emails
    const needsLatinUsername = ['ar', 'zh_CN', 'ja', 'ko', 'ru'].includes(language);
    const faker = needsLatinUsername ? enFaker : localFaker;
    
    let username = '';
    
    // Try multiple methods to generate a valid username
    try {
      username = faker.internet.userName().toLowerCase();
    } catch (error) {
      try {
        username = faker.person.firstName().toLowerCase();
      } catch (error) {
        username = enFaker.internet.userName().toLowerCase();
      }
    }
    
    // Clean up the username
    username = username
      .replace(/[^a-z0-9]/g, '') // Remove any non-alphanumeric characters
      .slice(0, 20); // Limit length
    
    // If we still don't have a valid username, generate a safe fallback
    if (!username) {
      const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      username = `user${randomNum}`;
    }
    
    const domain = EMAIL_DOMAINS[Math.floor(Math.random() * EMAIL_DOMAINS.length)];
    return `${username}@${domain}`;
  } catch (error) {
    // Ultimate fallback with guaranteed valid format
    const timestamp = Date.now().toString().slice(-4);
    return `user${timestamp}@example.com`;
  }
}