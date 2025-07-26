import { Language } from "../../types";
import { getFaker } from "../../faker/instances";
import { faker } from "@faker-js/faker";

const BANKS = [
  { name: "Chase", routingPrefix: "021" },
  { name: "Bank of America", routingPrefix: "026" },
  { name: "Wells Fargo", routingPrefix: "121" },
  { name: "Citibank", routingPrefix: "031" },
  { name: "US Bank", routingPrefix: "123" },
  { name: "Capital One", routingPrefix: "056" },
  { name: "PNC Bank", routingPrefix: "043" },
  { name: "TD Bank", routingPrefix: "011" },
  { name: "HSBC", routingPrefix: "022" },
  { name: "Deutsche Bank", routingPrefix: "082" }
];

const INVESTMENT_TYPES = [
  { type: "Stocks", examples: ["Blue Chip", "Growth", "Value", "Dividend", "Small Cap"] },
  { type: "Bonds", examples: ["Government", "Corporate", "Municipal", "Treasury", "High-Yield"] },
  { type: "ETFs", examples: ["Index", "Sector", "Commodity", "International", "Bond"] },
  { type: "Mutual Funds", examples: ["Balanced", "Income", "Growth", "International", "Sector"] },
  { type: "Real Estate", examples: ["Residential", "Commercial", "REIT", "Development", "Land"] },
  { type: "Cryptocurrency", examples: ["Bitcoin", "Ethereum", "Stable Coins", "DeFi", "NFTs"] }
];

const CREDIT_CARD_PREFIXES = {
  Visa: ["4"],
  Mastercard: ["51", "52", "53", "54", "55"],
  Amex: ["34", "37"],
  Discover: ["6011", "644", "645", "646", "647", "648", "649", "65"]
};

export function generateFinancialValue(fieldId: string, language: Language): string {
  const faker = getFaker(language);

  switch (fieldId) {
    case "accountNumber":
      return generateAccountNumber();
    case "accountType":
      return faker.helpers.arrayElement([
        "Checking", "Savings", "Money Market", "Certificate of Deposit",
        "Investment", "Retirement", "Business Checking", "Student Checking"
      ]);
    case "bankName": {
      const bank = faker.helpers.arrayElement(BANKS);
      return bank.name;
    }
    case "routingNumber": {
      const bank = faker.helpers.arrayElement(BANKS);
      return bank.routingPrefix + faker.helpers.fromRegExp('[0-9]{6}');
    }
    case "balance":
      return formatCurrency(faker.number.float({ min: 100, max: 100000, precision: 0.01 }));
    case "creditScore":
      return String(faker.number.int({ min: 300, max: 850 }));
    case "creditLimit":
      return formatCurrency(faker.number.int({ min: 1000, max: 50000 }));
    case "currency":
      return faker.helpers.arrayElement([
        "USD", "EUR", "GBP", "JPY", "CHF", "CAD", "AUD", "NZD"
      ]);
    case "taxId":
      return generateTaxId(language);
    case "investmentType": {
      const investment = faker.helpers.arrayElement(INVESTMENT_TYPES);
      const example = faker.helpers.arrayElement(investment.examples);
      return `${investment.type} - ${example}`;
    }
    case "portfolioValue":
      return formatCurrency(faker.number.float({ min: 10000, max: 1000000, precision: 0.01 }));
    case "mortgageAmount":
      return formatCurrency(faker.number.float({ min: 100000, max: 1000000, precision: 0.01 }));
    case "loanType":
      return faker.helpers.arrayElement([
        "Fixed Rate Mortgage", "Adjustable Rate Mortgage", "Personal Loan",
        "Auto Loan", "Student Loan", "Home Equity Line of Credit",
        "Business Loan", "Construction Loan"
      ]);
    case "interestRate":
      return (faker.number.float({ min: 0.5, max: 20, precision: 0.01 })).toFixed(2) + "%";
    case "paymentMethod":
      return faker.helpers.arrayElement([
        "Credit Card", "Debit Card", "ACH Transfer", "Wire Transfer",
        "PayPal", "Apple Pay", "Google Pay", "Cryptocurrency"
      ]);
    case "creditCardNumber":
      return generateCreditCardNumber();
    case "expirationDate":
      return generateExpirationDate();
    case "cvv":
      return faker.helpers.fromRegExp('[0-9]{3}');
    default:
      return faker.lorem.word();
  }
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

function generateAccountNumber(): string {
  return Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * 10)
  ).join('');
}

function generateTaxId(language: Language): string {
  switch (language) {
    case "en":
      return `${faker.helpers.fromRegExp('[0-9]{2}')}-${faker.helpers.fromRegExp('[0-9]{7}')}`;
    case "de":
      return `DE${faker.helpers.fromRegExp('[0-9]{9}')}`;
    case "fr":
      return `FR${faker.helpers.fromRegExp('[0-9]{2}[A-Z]{1}[0-9]{9}')}`;
    default:
      return `${faker.helpers.fromRegExp('[0-9]{2}')}-${faker.helpers.fromRegExp('[0-9]{7}')}`;
  }
}

function generateCreditCardNumber(): string {
  const cardType = faker.helpers.arrayElement(Object.keys(CREDIT_CARD_PREFIXES));
  const prefix = faker.helpers.arrayElement(CREDIT_CARD_PREFIXES[cardType as keyof typeof CREDIT_CARD_PREFIXES]);
  
  const length = cardType === "Amex" ? 15 : 16;
  const remainingLength = length - prefix.length;
  
  const number = prefix + Array.from(
    { length: remainingLength },
    () => Math.floor(Math.random() * 10)
  ).join('');
  
  return number.replace(/(.{4})/g, '$1 ').trim();
}

function generateExpirationDate(): string {
  const currentYear = new Date().getFullYear();
  const month = Math.floor(Math.random() * 12) + 1;
  const year = currentYear + Math.floor(Math.random() * 5);
  
  return `${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;
}