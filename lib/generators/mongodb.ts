import { FieldConfig, Language } from "../types";
import { generateRandomValue } from "./shared";

export function generateMongoData(
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

    const doc: Record<string, any> = { _id: id };
    enabledFields.forEach(field => {
      const value = generateRandomValue(field.fieldName, nullData, language);
      if (value !== null) {
        doc[field.fieldName] = value;
      }
    });

    documents.push(doc);
  }

  const insertCommands = documents.map(doc => 
    `db.users.insertOne(${JSON.stringify(doc, null, 2)})`
  );

  return insertCommands.join(";\n\n");
}