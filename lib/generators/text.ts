import { FieldConfig, Language } from "../types";
import { generateRandomValue } from "./shared";

export function generateTextData(
  count: number,
  uniqueData: boolean,
  nullData: boolean,
  enabledFields: FieldConfig[],
  separator: string = " ",
  language: Language = "en"
): string {
  const rows = [];
  const usedValues = new Set();

  // Add header row
  const headers = enabledFields.map(field => field.fieldName);
  rows.push(headers.join(separator));

  // Generate data rows
  for (let i = 0; i < count; i++) {
    const id = uniqueData ? i + 1 : Math.floor(Math.random() * count) + 1;

    if (uniqueData && usedValues.has(id)) {
      continue;
    }
    usedValues.add(id);

    const values = enabledFields.map(field => {
      const value = generateRandomValue(field.fieldName, nullData, language);
      return value === null ? "" : value;
    });

    rows.push(values.join(separator));
  }

  return rows.join("\n");
}