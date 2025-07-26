import { FieldConfig, Language } from "../types";
import { generateRandomValue } from "./shared";

export function generateCSVData(
  count: number,
  uniqueData: boolean,
  nullData: boolean,
  enabledFields: FieldConfig[],
  language: Language = "en"
): string {
  const rows = [];
  const usedValues = new Set();

  // Add header row
  const headers = enabledFields.map(field => field.fieldName);
  rows.push(headers.join(","));

  // Generate data rows
  for (let i = 0; i < count; i++) {
    const id = uniqueData ? i + 1 : Math.floor(Math.random() * count) + 1;

    if (uniqueData && usedValues.has(id)) {
      continue;
    }
    usedValues.add(id);

    const values = enabledFields.map(field => {
      const value = generateRandomValue(field.fieldName, nullData, language);
      return value === null ? "" : `"${value}"`; // Empty string for null values
    });

    rows.push(values.join(","));
  }

  return rows.join("\n");
}