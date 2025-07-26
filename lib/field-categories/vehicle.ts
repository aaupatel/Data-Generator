import { FieldCategory } from "../types";

export const vehicle: FieldCategory = {
  name: "Vehicle",
  icon: "Car",
  fields: [
    { id: "make", label: "Make", type: "string", example: "Toyota" },
    { id: "model", label: "Model", type: "string", example: "Camry" },
    { id: "year", label: "Year", type: "number", example: "2020" },
    { id: "vin", label: "VIN", type: "string", example: "1HGCM82633A123456" },
    { id: "licensePlate", label: "License Plate", type: "string", example: "ABC123" },
    { id: "color", label: "Color", type: "string", example: "Silver" },
    { id: "mileage", label: "Mileage", type: "number", example: "45000" },
    { id: "fuelType", label: "Fuel Type", type: "string", example: "Gasoline" },
    { id: "transmission", label: "Transmission", type: "string", example: "Automatic" },
    { id: "insurance", label: "Insurance", type: "string", example: "Full Coverage" },
    { id: "registrationDate", label: "Registration Date", type: "date", example: "2024-06-30" },
    { id: "lastService", label: "Last Service", type: "date", example: "2023-12-15" },
    { id: "engineSize", label: "Engine Size", type: "string", example: "2.5L" },
    { id: "bodyType", label: "Body Type", type: "string", example: "Sedan" },
    { id: "ownershipStatus", label: "Ownership Status", type: "string", example: "Owned" }
  ]
};