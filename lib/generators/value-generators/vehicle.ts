import { Language } from "../../types";
import { getFaker } from "../../faker/instances";

const VEHICLE_MAKES = [
  { make: "Toyota", models: ["Camry", "Corolla", "RAV4", "Highlander", "Prius", "4Runner", "Tacoma", "Tundra"] },
  { make: "Honda", models: ["Civic", "Accord", "CR-V", "Pilot", "HR-V", "Odyssey", "Ridgeline"] },
  { make: "Ford", models: ["F-150", "Mustang", "Explorer", "Escape", "Edge", "Bronco", "Ranger"] },
  { make: "Chevrolet", models: ["Silverado", "Equinox", "Tahoe", "Malibu", "Traverse", "Suburban", "Colorado"] },
  { make: "BMW", models: ["3 Series", "5 Series", "X3", "X5", "7 Series", "M3", "M5", "i4"] },
  { make: "Mercedes-Benz", models: ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "A-Class", "GLA"] },
  { make: "Audi", models: ["A4", "A6", "Q5", "Q7", "e-tron", "RS6", "S5", "Q8"] },
  { make: "Tesla", models: ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck"] },
  { make: "Volkswagen", models: ["Golf", "Jetta", "Tiguan", "Atlas", "ID.4", "Passat", "Arteon"] },
  { make: "Hyundai", models: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Palisade", "IONIQ 5", "Kona"] }
];

const COLORS = [
  "Alpine White", "Jet Black", "Mineral Grey", "Carbon Black", "Sapphire Blue",
  "Glacier Silver", "Sunset Orange", "Racing Green", "Pearl White", "Midnight Blue",
  "Cosmic Silver", "Ruby Red", "Graphite Grey", "Crystal White", "Deep Blue"
];

const FUEL_TYPES = [
  "Gasoline", "Diesel", "Hybrid", "Electric", "Plug-in Hybrid"
];

const TRANSMISSION_TYPES = [
  "8-Speed Automatic", "6-Speed Manual", "7-Speed DCT", "CVT",
  "9-Speed Automatic", "Single-Speed (Electric)", "10-Speed Automatic"
];

const BODY_TYPES = [
  "Sedan", "SUV", "Coupe", "Hatchback", "Pickup Truck",
  "Convertible", "Wagon", "Van", "Crossover"
];

export function generateVehicleValue(fieldId: string, language: Language): string {
  const faker = getFaker(language);
  const currentYear = new Date().getFullYear();

  switch (fieldId) {
    case "make": {
      const makeData = faker.helpers.arrayElement(VEHICLE_MAKES);
      return makeData.make;
    }
    case "model": {
      const makeData = faker.helpers.arrayElement(VEHICLE_MAKES);
      return faker.helpers.arrayElement(makeData.models);
    }
    case "year":
      return String(faker.number.int({ min: currentYear - 15, max: currentYear + 1 }));
    case "vin":
      return generateVIN();
    case "licensePlate":
      return generateLicensePlate(language);
    case "color":
      return faker.helpers.arrayElement(COLORS);
    case "mileage":
      return String(faker.number.int({ min: 0, max: 150000 }));
    case "fuelType":
      return faker.helpers.arrayElement(FUEL_TYPES);
    case "transmission":
      return faker.helpers.arrayElement(TRANSMISSION_TYPES);
    case "insurance":
      return faker.helpers.arrayElement([
        "Full Coverage", "Liability Only", "Comprehensive",
        "Collision", "Premium Coverage", "Basic Coverage"
      ]);
    case "registrationDate": {
      const date = faker.date.recent({ days: 365 });
      return date.toISOString().split('T')[0];
    }
    case "lastService": {
      const date = faker.date.recent({ days: 180 });
      return date.toISOString().split('T')[0];
    }
    case "engineSize":
      return faker.helpers.arrayElement([
        "1.4L", "1.6L", "2.0L", "2.5L", "3.0L", "3.5L",
        "4.0L", "5.0L", "Electric"
      ]);
    case "bodyType":
      return faker.helpers.arrayElement(BODY_TYPES);
    case "ownershipStatus":
      return faker.helpers.arrayElement([
        "Owned", "Financed", "Leased", "Company Car",
        "Fleet Vehicle", "Rental"
      ]);
    default:
      return faker.lorem.word();
  }
}

function generateVIN(): string {
  const characters = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789"; // Excluding I, O, Q
  const vin = Array.from({ length: 17 }, () => 
    characters[Math.floor(Math.random() * characters.length)]
  ).join('');
  return vin;
}

function generateLicensePlate(language: Language): string {
  switch (language) {
    case "en":
      return `${generateRandomLetters(3)}${generateRandomNumbers(3)}`;
    case "de":
      return `${generateRandomLetters(2)}-${generateRandomLetters(2)}${generateRandomNumbers(4)}`;
    case "fr":
      return `${generateRandomLetters(2)}-${generateRandomNumbers(3)}-${generateRandomLetters(2)}`;
    case "es":
      return `${generateRandomNumbers(4)}${generateRandomLetters(3)}`;
    default:
      return `${generateRandomLetters(3)}${generateRandomNumbers(3)}`;
  }
}

function generateRandomLetters(length: number): string {
  const letters = "ABCDEFGHJKLMNPRSTUVWXYZ"; // Excluding I, O, Q
  return Array.from({ length }, () => 
    letters[Math.floor(Math.random() * letters.length)]
  ).join('');
}

function generateRandomNumbers(length: number): string {
  return Array.from({ length }, () => 
    Math.floor(Math.random() * 10)
  ).join('');
}