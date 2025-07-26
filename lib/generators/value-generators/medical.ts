import { Language } from "../../types";
import { getFaker } from "../../faker/instances";
import { generateFullName } from "./name";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const ALLERGIES = [
  { name: "Penicillin", severity: "Severe" },
  { name: "Peanuts", severity: "Severe" },
  { name: "Latex", severity: "Moderate" },
  { name: "Shellfish", severity: "Severe" },
  { name: "Dust Mites", severity: "Mild" },
  { name: "Pollen", severity: "Moderate" },
  { name: "Eggs", severity: "Moderate" },
  { name: "Dairy", severity: "Moderate" },
  { name: "Soy", severity: "Mild" },
  { name: "Wheat", severity: "Moderate" }
];

const MEDICATIONS = [
  { name: "Lisinopril", dosage: "10mg daily", type: "ACE Inhibitor" },
  { name: "Metformin", dosage: "500mg twice daily", type: "Antidiabetic" },
  { name: "Levothyroxine", dosage: "50mcg daily", type: "Thyroid" },
  { name: "Amlodipine", dosage: "5mg daily", type: "Calcium Channel Blocker" },
  { name: "Omeprazole", dosage: "20mg daily", type: "Proton Pump Inhibitor" },
  { name: "Sertraline", dosage: "50mg daily", type: "SSRI" },
  { name: "Atorvastatin", dosage: "40mg daily", type: "Statin" },
  { name: "Metoprolol", dosage: "25mg twice daily", type: "Beta Blocker" }
];

const CHRONIC_CONDITIONS = [
  { condition: "Type 2 Diabetes", status: "Controlled" },
  { condition: "Hypertension", status: "Managed" },
  { condition: "Asthma", status: "Mild" },
  { condition: "Hypothyroidism", status: "Stable" },
  { condition: "Rheumatoid Arthritis", status: "Active" },
  { condition: "COPD", status: "Moderate" },
  { condition: "Atrial Fibrillation", status: "Controlled" },
  { condition: "Osteoporosis", status: "Early Stage" }
];

const SURGERIES = [
  { procedure: "Appendectomy", year: "2018", type: "Laparoscopic" },
  { procedure: "Cholecystectomy", year: "2019", type: "Open" },
  { procedure: "Total Knee Replacement", year: "2020", type: "Orthopedic" },
  { procedure: "CABG", year: "2017", type: "Cardiac" },
  { procedure: "Tonsillectomy", year: "2015", type: "ENT" },
  { procedure: "Hernia Repair", year: "2021", type: "Minimally Invasive" }
];

const IMMUNIZATIONS = [
  { vaccine: "Influenza", date: "2023", status: "Current" },
  { vaccine: "COVID-19", date: "2023", status: "Complete" },
  { vaccine: "Tdap", date: "2020", status: "Current" },
  { vaccine: "Pneumococcal", date: "2022", status: "Current" },
  { vaccine: "Shingrix", date: "2021", status: "Complete" },
  { vaccine: "Hepatitis B", date: "2019", status: "Complete" }
];

export function generateMedicalValue(fieldId: string, language: Language): string {
  const faker = getFaker(language);

  switch (fieldId) {
    case "bloodType":
      return faker.helpers.arrayElement(BLOOD_TYPES);
    case "height": {
      const cm = faker.number.int({ min: 150, max: 200 });
      const inches = Math.round(cm / 2.54);
      const feet = Math.floor(inches / 12);
      const remainingInches = inches % 12;
      return `${feet}'${remainingInches}" (${cm}cm)`;
    }
    case "weight": {
      const kg = faker.number.int({ min: 45, max: 120 });
      const lbs = Math.round(kg * 2.20462);
      return `${kg}kg (${lbs}lbs)`;
    }
    case "bmi": {
      const bmi = 18.5 + (Math.random() * 16.5);
      const category = getBMICategory(bmi);
      return `${bmi.toFixed(1)} - ${category}`;
    }
    case "allergies": {
      const numAllergies = faker.number.int({ min: 0, max: 3 });
      if (numAllergies === 0) return "No Known Allergies";
      const selectedAllergies = faker.helpers.arrayElements(ALLERGIES, numAllergies);
      return selectedAllergies.map(a => `${a.name} (${a.severity})`).join(", ");
    }
    case "medications": {
      const numMeds = faker.number.int({ min: 0, max: 3 });
      if (numMeds === 0) return "No Current Medications";
      const selectedMeds = faker.helpers.arrayElements(MEDICATIONS, numMeds);
      return selectedMeds.map(m => `${m.name} ${m.dosage}`).join(", ");
    }
    case "chronicConditions": {
      const numConditions = faker.number.int({ min: 0, max: 2 });
      if (numConditions === 0) return "No Chronic Conditions";
      const selectedConditions = faker.helpers.arrayElements(CHRONIC_CONDITIONS, numConditions);
      return selectedConditions.map(c => `${c.condition} (${c.status})`).join(", ");
    }
    case "surgeries": {
      const numSurgeries = faker.number.int({ min: 0, max: 2 });
      if (numSurgeries === 0) return "No Previous Surgeries";
      const selectedSurgeries = faker.helpers.arrayElements(SURGERIES, numSurgeries);
      return selectedSurgeries.map(s => `${s.procedure} (${s.year})`).join(", ");
    }
    case "familyHistory":
      return generateFamilyHistory();
    case "immunizations": {
      const selectedImmunizations = faker.helpers.arrayElements(IMMUNIZATIONS, 3);
      return selectedImmunizations.map(i => `${i.vaccine} (${i.date})`).join(", ");
    }
    case "lastCheckup": {
      const date = faker.date.recent({ days: 365 });
      return date.toISOString().split('T')[0];
    }
    case "bloodPressure": {
      const systolic = faker.number.int({ min: 90, max: 160 });
      const diastolic = faker.number.int({ min: 60, max: 100 });
      const category = getBPCategory(systolic, diastolic);
      return `${systolic}/${diastolic} mmHg (${category})`;
    }
    case "pulseRate": {
      const rate = faker.number.int({ min: 60, max: 100 });
      const category = getPulseCategory(rate);
      return `${rate} bpm (${category})`;
    }
    case "visionLeft":
      return generateVisionScore();
    case "visionRight":
      return generateVisionScore();
    default:
      return faker.lorem.word();
  }
}

function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function getBPCategory(systolic: number, diastolic: number): string {
  if (systolic < 120 && diastolic < 80) return "Normal";
  if (systolic < 130 && diastolic < 80) return "Elevated";
  if (systolic < 140 || diastolic < 90) return "Stage 1 Hypertension";
  return "Stage 2 Hypertension";
}

function getPulseCategory(rate: number): string {
  if (rate < 60) return "Bradycardia";
  if (rate <= 100) return "Normal";
  return "Tachycardia";
}

function generateVisionScore(): string {
  const scores = ["20/20", "20/25", "20/30", "20/40", "20/50", "20/60"];
  const score = faker.helpers.arrayElement(scores);
  const category = getVisionCategory(score);
  return `${score} (${category})`;
}

function getVisionCategory(score: string): string {
  const map: Record<string, string> = {
    "20/20": "Normal",
    "20/25": "Near Normal",
    "20/30": "Mild Impairment",
    "20/40": "Moderate Impairment",
    "20/50": "Significant Impairment",
    "20/60": "Severe Impairment"
  };
  return map[score] || "Unknown";
}

function generateFamilyHistory(): string {
  const conditions = [
    { condition: "Diabetes", relation: "Father" },
    { condition: "Hypertension", relation: "Mother" },
    { condition: "Heart Disease", relation: "Grandfather" },
    { condition: "Cancer", relation: "Grandmother" },
    { condition: "Stroke", relation: "Uncle" },
    { condition: "Arthritis", relation: "Aunt" }
  ];

  const selectedConditions = faker.helpers.arrayElements(conditions, { min: 1, max: 3 });
  return selectedConditions.map(c => `${c.condition} (${c.relation})`).join(", ");
}