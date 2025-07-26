import { Language } from "../../types";
import { getFaker } from "../../faker/instances";
import { generateFullName } from "./name";
import { faker } from "@faker-js/faker";

const RESEARCH_FIELDS = [
  { field: "Computer Science", topics: ["Machine Learning", "Computer Vision", "Natural Language Processing", "Cybersecurity", "Distributed Systems"] },
  { field: "Physics", topics: ["Quantum Mechanics", "Particle Physics", "Astrophysics", "Condensed Matter", "Optics"] },
  { field: "Biology", topics: ["Genetics", "Neuroscience", "Molecular Biology", "Ecology", "Immunology"] },
  { field: "Chemistry", topics: ["Organic Chemistry", "Biochemistry", "Materials Science", "Physical Chemistry", "Analytical Chemistry"] },
  { field: "Medicine", topics: ["Clinical Trials", "Drug Development", "Epidemiology", "Oncology", "Cardiology"] }
];

const INSTITUTIONS = [
  { name: "Massachusetts Institute of Technology", abbrev: "MIT" },
  { name: "Stanford University", abbrev: "Stanford" },
  { name: "Harvard University", abbrev: "Harvard" },
  { name: "California Institute of Technology", abbrev: "Caltech" },
  { name: "University of Cambridge", abbrev: "Cambridge" },
  { name: "University of Oxford", abbrev: "Oxford" },
  { name: "ETH Zürich", abbrev: "ETH" },
  { name: "Max Planck Institute", abbrev: "MPI" },
  { name: "Johns Hopkins University", abbrev: "JHU" },
  { name: "University of California, Berkeley", abbrev: "UC Berkeley" }
];

const FUNDING_AGENCIES = [
  { name: "National Science Foundation", abbrev: "NSF" },
  { name: "National Institutes of Health", abbrev: "NIH" },
  { name: "Department of Energy", abbrev: "DOE" },
  { name: "European Research Council", abbrev: "ERC" },
  { name: "Howard Hughes Medical Institute", abbrev: "HHMI" }
];

const JOURNALS = [
  { name: "Nature", impact: "High" },
  { name: "Science", impact: "High" },
  { name: "Cell", impact: "High" },
  { name: "Physical Review Letters", impact: "High" },
  { name: "PNAS", impact: "High" },
  { name: "Nature Communications", impact: "Medium" },
  { name: "Scientific Reports", impact: "Medium" },
  { name: "PLOS ONE", impact: "Medium" }
];

export function generateResearchValue(fieldId: string, language: Language): string {
  const faker = getFaker(language);
  const currentYear = new Date().getFullYear();

  switch (fieldId) {
    case "experimentId":
      return generateExperimentId();
    case "type": {
      const field = faker.helpers.arrayElement(RESEARCH_FIELDS);
      const topic = faker.helpers.arrayElement(field.topics);
      return `${field.field} - ${topic}`;
    }
    case "researcher":
      return `Dr. ${generateFullName(language)}`;
    case "institution": {
      const inst = faker.helpers.arrayElement(INSTITUTIONS);
      return inst.name;
    }
    case "startDate": {
      const date = faker.date.past({ years: 3 });
      return date.toISOString().split('T')[0];
    }
    case "hypothesis":
      return generateHypothesis();
    case "methodology":
      return faker.helpers.arrayElement([
        "Double-blind Randomized Control Trial",
        "Longitudinal Study",
        "Cross-sectional Analysis",
        "Meta-analysis",
        "Observational Study",
        "Case-control Study",
        "Cohort Study",
        "Mixed Methods Research"
      ]);
    case "equipment":
      return generateEquipmentList();
    case "variables":
      return generateVariables();
    case "results":
      return generateResults();
    case "funding": {
      const amount = faker.number.int({ min: 50000, max: 2000000 });
      const agency = faker.helpers.arrayElement(FUNDING_AGENCIES);
      return `${agency.name} (${agency.abbrev}) - $${amount.toLocaleString()}`;
    }
    case "publication": {
      const journal = faker.helpers.arrayElement(JOURNALS);
      return `${journal.name} (Impact: ${journal.impact})`;
    }
    case "peerReview":
      return faker.helpers.arrayElement([
        "Under Review",
        "Major Revision Required",
        "Minor Revision Required",
        "Accepted with Revisions",
        "Accepted",
        "Published"
      ]);
    case "citations":
      return String(faker.number.int({ min: 0, max: 500 }));
    case "category": {
      const field = faker.helpers.arrayElement(RESEARCH_FIELDS);
      return field.field;
    }
    default:
      return faker.lorem.word();
  }
}

function generateExperimentId(): string {
  const prefix = "EXP";
  const year = new Date().getFullYear().toString().slice(-2);
  const sequence = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}-${year}-${sequence}`;
}

function generateHypothesis(): string {
  const hypotheses = [
    "The application of [treatment] will result in a significant increase in [outcome] compared to the control group",
    "There exists a positive correlation between [variable1] and [variable2] in [population]",
    "The implementation of [intervention] will lead to improved [metric] in [context]",
    "The presence of [factor] significantly affects the rate of [process] under [conditions]",
    "A novel approach to [problem] using [method] will yield better results than traditional methods"
  ];

  return faker.helpers.arrayElement(hypotheses)
    .replace("[treatment]", faker.science.chemicalElement().name)
    .replace("[outcome]", "observed results")
    .replace("[variable1]", "independent variable")
    .replace("[variable2]", "dependent variable")
    .replace("[population]", "study population")
    .replace("[intervention]", "proposed solution")
    .replace("[metric]", "performance metrics")
    .replace("[context]", "test environment")
    .replace("[factor]", "contributing factor")
    .replace("[process]", "reaction process")
    .replace("[conditions]", "controlled conditions")
    .replace("[problem]", "research problem")
    .replace("[method]", "proposed methodology");
}

function generateEquipmentList(): string {
  const equipment = [
    "Scanning Electron Microscope",
    "Mass Spectrometer",
    "High-Performance Liquid Chromatograph",
    "Nuclear Magnetic Resonance Spectrometer",
    "X-ray Diffractometer",
    "Flow Cytometer",
    "Confocal Microscope",
    "Thermal Cycler",
    "Atomic Force Microscope",
    "Gas Chromatograph"
  ];

  return faker.helpers.arrayElements(equipment, { min: 1, max: 3 }).join(", ");
}

function generateVariables(): string {
  const variables = [
    "Temperature (°C)",
    "Pressure (atm)",
    "Concentration (mol/L)",
    "Time (minutes)",
    "pH Level",
    "Voltage (V)",
    "Current (A)",
    "Frequency (Hz)",
    "Intensity (cd)",
    "Distance (mm)"
  ];

  return faker.helpers.arrayElements(variables, { min: 2, max: 4 }).join(", ");
}

function generateResults(): string {
  const results = [
    "Statistically significant (p < 0.05)",
    "Strong positive correlation (r = 0.82)",
    "Moderate effect size (Cohen's d = 0.6)",
    "95% confidence interval [0.78, 0.94]",
    "Significant improvement over baseline",
    "Inconclusive results pending further analysis",
    "Supports initial hypothesis",
    "Partially confirms theoretical predictions"
  ];

  return faker.helpers.arrayElement(results);
}