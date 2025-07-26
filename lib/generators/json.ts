import { FieldConfig, Language } from "../types";
import { generateRandomValue } from "./shared";

export function generateJSONData(
  count: number,
  uniqueData: boolean,
  nullData: boolean,
  enabledFields: FieldConfig[],
  language: Language = "en"
): string {
  const documents = [];
  const usedValues = new Set();

  for (let i = 0; i < count; i++) {
    const id = uniqueData ? i + 1 : Math.floor(Math.random() * count) + 1;

    if (uniqueData && usedValues.has(id)) {
      continue;
    }
    usedValues.add(id);

    const document: Record<string, any> = { id };
    enabledFields.forEach(field => {
      const value = generateRandomValue(field.fieldName, nullData, language);
      if (value !== null) {
        document[field.fieldName] = value;
      }
    });

    documents.push(document);
  }

  return JSON.stringify(documents, null, 2);
}