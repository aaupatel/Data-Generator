import { Language } from "../../types";
import { getFaker } from "../../faker/instances";

const SCIENTIFIC_FIELDS = [
  {
    field: "Physics",
    topics: ["Quantum Mechanics", "Particle Physics", "Optics", "Thermodynamics"],
    metrics: ["Energy (eV)", "Temperature (K)", "Pressure (Pa)", "Wavelength (nm)"]
  },
  {
    field: "Chemistry",
    topics: ["Organic Synthesis", "Catalysis", "Electrochemistry", "Spectroscopy"],
    metrics: ["Concentration (M)", "pH", "Temperature (°C)", "Reaction Time (h)"]
  },
  {
    field: "Biology",
    topics: ["Gene Expression", "Cell Signaling", "Protein Folding", "Metabolism"],
    metrics: ["Concentration (µg/mL)", "Time (min)", "Temperature (°C)", "pH"]
  },
  {
    field: "Materials Science",
    topics: ["Polymer Synthesis", "Nanostructures", "Thin Films", "Composites"],
    metrics: ["Thickness (nm)", "Stress (MPa)", "Temperature (K)", "Time (s)"]
  }
];

const EQUIPMENT = [
  { name: "NMR Spectrometer", brand: "Bruker", model: "AVANCE NEO" },
  { name: "Mass Spectrometer", brand: "Thermo Fisher", model: "Orbitrap" },
  { name: "X-ray Diffractometer", brand: "Rigaku", model: "SmartLab" },
  { name: "Electron Microscope", brand: "JEOL", model: "JEM-2100F" },
  { name: "HPLC System", brand: "Agilent", model: "1260 Infinity II" },
  { name: "UV-Vis Spectrophotometer", brand: "Shimadzu", model: "UV-2600" }
];

const STATISTICAL_METHODS = [
  { method: "ANOVA", parameters: ["F-value", "p-value", "degrees of freedom"] },
  { method: "t-test", parameters: ["t-value", "p-value", "confidence interval"] },
  { method: "Regression", parameters: ["R²", "slope", "intercept"] },
  { method: "Chi-square", parameters: ["χ²", "p-value", "effect size"] }
];

export function generateScientificValue(fieldId: string, language: Language): string {
  const faker = getFaker(language);

  switch (fieldId) {
    case "experimentId":
      return generateExperimentId();
    case "methodology":
      return generateMethodology();
    case "equipment":
      return generateEquipmentList();
    case "variables":
      return generateVariables();
    case "measurements":
      return generateMeasurements();
    case "results":
      return generateResults();
    case "analysis":
      return generateAnalysis();
    case "conclusions":
      return generateConclusions();
    case "keywords":
      return generateKeywords();
    default:
      return faker.lorem.word();
  }
}

function generateExperimentId(): string {
  const prefix = "EXP";
  const year = new Date().getFullYear().toString().slice(-2);
  const sequence = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${year}-${sequence}`;
}

function generateMethodology(): string {
  const field = faker.helpers.arrayElement(SCIENTIFIC_FIELDS);
  const topic = faker.helpers.arrayElement(field.topics);
  const approach = faker.helpers.arrayElement([
    "Experimental", "Theoretical", "Computational", "Combined"
  ]);
  return `${approach} study of ${topic} in ${field.field}`;
}

function generateEquipmentList(): string {
  const numItems = faker.number.int({ min: 1, max: 3 });
  const selectedEquipment = faker.helpers.arrayElements(EQUIPMENT, numItems);
  return selectedEquipment.map(e => `${e.name} (${e.brand} ${e.model})`).join(", ");
}

function generateVariables(): string {
  const field = faker.helpers.arrayElement(SCIENTIFIC_FIELDS);
  const numMetrics = faker.number.int({ min: 2, max: 3 });
  return faker.helpers.arrayElements(field.metrics, numMetrics).join(", ");
}

function generateMeasurements(): string {
  const field = faker.helpers.arrayElement(SCIENTIFIC_FIELDS);
  const metric = faker.helpers.arrayElement(field.metrics);
  const value = faker.number.float({ min: 0, max: 100, precision: 0.01 });
  const uncertainty = faker.number.float({ min: 0.01, max: 1, precision: 0.01 });
  return `${value} ± ${uncertainty} ${metric}`;
}

function generateResults(): string {
  const statMethod = faker.helpers.arrayElement(STATISTICAL_METHODS);
  const values = statMethod.parameters.map(param => {
    const value = faker.number.float({ min: 0, max: 10, precision: 0.001 });
    return `${param} = ${value}`;
  });
  return `${statMethod.method}: ${values.join(", ")}`;
}

function generateAnalysis(): string {
  const significance = faker.number.float({ min: 0.001, max: 0.1, precision: 0.001 });
  const correlation = faker.number.float({ min: -1, max: 1, precision: 0.01 });
  return `p < ${significance}, r = ${correlation}`;
}

function generateConclusions(): string {
  const outcomes = [
    "Hypothesis supported with statistical significance",
    "Partial support for theoretical predictions",
    "Significant correlation observed",
    "Results consistent with previous studies",
    "Novel mechanism identified"
  ];
  return faker.helpers.arrayElement(outcomes);
}

function generateKeywords(): string {
  const field = faker.helpers.arrayElement(SCIENTIFIC_FIELDS);
  const numKeywords = faker.number.int({ min: 3, max: 5 });
  const keywords = [
    field.field,
    faker.helpers.arrayElement(field.topics),
    ...faker.helpers.arrayElements(field.metrics, numKeywords - 2)
  ];
  return keywords.join(", ");
}