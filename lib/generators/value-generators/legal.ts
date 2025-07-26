import { Language } from "../../types";
import { getFaker } from "../../faker/instances";
import { generateFullName } from "./name";
import { faker } from "@faker-js/faker";

const CASE_TYPES = [
  { type: "Civil", subtypes: ["Contract Dispute", "Property Damage", "Personal Injury", "Employment"] },
  { type: "Criminal", subtypes: ["Misdemeanor", "Felony", "White Collar", "Juvenile"] },
  { type: "Family", subtypes: ["Divorce", "Child Custody", "Adoption", "Guardianship"] },
  { type: "Corporate", subtypes: ["Mergers & Acquisitions", "Securities", "Intellectual Property", "Bankruptcy"] },
  { type: "Real Estate", subtypes: ["Property Transfer", "Landlord-Tenant", "Zoning", "Foreclosure"] }
];

const COURTS = [
  { name: "Supreme Court", prefix: "SC" },
  { name: "District Court", prefix: "DC" },
  { name: "Circuit Court", prefix: "CC" },
  { name: "Federal Court", prefix: "FC" },
  { name: "State Court", prefix: "ST" }
];

const LEGAL_DOCUMENTS = [
  { type: "Complaint", code: "CMP" },
  { type: "Motion", code: "MOT" },
  { type: "Brief", code: "BRF" },
  { type: "Order", code: "ORD" },
  { type: "Judgment", code: "JDG" },
  { type: "Affidavit", code: "AFF" },
  { type: "Subpoena", code: "SUB" },
  { type: "Deposition", code: "DEP" }
];

const STATUTES = [
  { code: "USC", sections: ["Title 18", "Title 26", "Title 42"] },
  { code: "CFR", sections: ["Part 1", "Part 404", "Part 820"] },
  { code: "UCC", sections: ["Article 2", "Article 9"] }
];

export function generateLegalValue(fieldId: string, language: Language): string {
  const faker = getFaker(language);
  const currentYear = new Date().getFullYear();

  switch (fieldId) {
    case "caseNumber":
      return generateCaseNumber();
    case "caseType": {
      const caseType = faker.helpers.arrayElement(CASE_TYPES);
      const subtype = faker.helpers.arrayElement(caseType.subtypes);
      return `${caseType.type} - ${subtype}`;
    }
    case "attorney":
      return generateAttorneyName(language);
    case "courtDate": {
      const date = faker.date.future({ years: 1 });
      return date.toISOString().split('T')[0];
    }
    case "jurisdiction": {
      const court = faker.helpers.arrayElement(COURTS);
      const location = faker.location.state();
      return `${location} ${court.name}`;
    }
    case "clientName":
      return generateFullName(language);
    case "filingDate": {
      const date = faker.date.recent({ days: 90 });
      return date.toISOString().split('T')[0];
    }
    case "status":
      return faker.helpers.arrayElement([
        "Pending", "Active", "Under Review", "Discovery",
        "Pre-Trial", "Trial", "Appeal", "Settled", "Closed", "Dismissed"
      ]);
    case "opposingCounsel":
      return generateLawFirm();
    case "judge":
      return generateJudgeName(language);
    case "courtroom":
      return generateCourtroomNumber();
    case "hearingType":
      return faker.helpers.arrayElement([
        "Initial Hearing", "Status Conference", "Motion Hearing",
        "Pre-Trial Conference", "Settlement Conference", "Trial",
        "Sentencing", "Appeal Hearing"
      ]);
    case "documents":
      return generateLegalDocuments();
    case "statute":
      return generateStatuteCitation();
    case "settlement":
      return generateSettlementAmount();
    default:
      return faker.lorem.word();
  }
}

function generateCaseNumber(): string {
  const court = faker.helpers.arrayElement(COURTS);
  const year = new Date().getFullYear().toString().slice(-2);
  const sequence = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${court.prefix}-${year}-${sequence}`;
}

function generateAttorneyName(language: Language): string {
  const name = generateFullName(language);
  const suffix = faker.helpers.arrayElement(["Esq.", "J.D.", "LLM"]);
  return `${name}, ${suffix}`;
}

function generateLawFirm(): string {
  const surnames = Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, 
    () => faker.person.lastName()
  );
  return `${surnames.join(", ")} & Associates, LLP`;
}

function generateJudgeName(language: Language): string {
  const name = generateFullName(language);
  return `Hon. ${name}`;
}

function generateCourtroomNumber(): string {
  const floor = faker.number.int({ min: 1, max: 15 });
  const room = faker.number.int({ min: 1, max: 99 }).toString().padStart(2, '0');
  return `${floor}${room}`;
}

function generateLegalDocuments(): string {
  const numDocs = faker.number.int({ min: 1, max: 3 });
  const documents = faker.helpers.arrayElements(LEGAL_DOCUMENTS, numDocs);
  return documents.map(doc => `${doc.type} (${doc.code})`).join(", ");
}

function generateStatuteCitation(): string {
  const statute = faker.helpers.arrayElement(STATUTES);
  const section = faker.helpers.arrayElement(statute.sections);
  const subsection = faker.number.int({ min: 1, max: 999 });
  return `${statute.code} ${section} § ${subsection}`;
}

function generateSettlementAmount(): string {
  const amount = faker.number.int({ min: 5000, max: 1000000 });
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}