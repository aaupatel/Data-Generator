import { FieldConfig } from "../types";
import { generateRandomValue } from "./shared";

export function generateSQLServerData(
  count: number,
  uniqueData: boolean,
  nullData: boolean,
  enabledFields: FieldConfig[]
): string {
  const data = [];
  const usedValues = new Set();

  for (let i = 0; i < count; i++) {
    const values: Record<string, string | null> = {};
    const id = uniqueData ? i + 1 : Math.floor(Math.random() * count) + 1;

    if (uniqueData && usedValues.has(id)) {
      continue;
    }
    usedValues.add(id);

    enabledFields.forEach(field => {
      values[field.fieldName] = generateRandomValue(field.fieldName, nullData);
    });

    const fieldNames = Object.keys(values).join(", ");
    const fieldValues = Object.values(values).map(v => v === null ? "NULL" : `'${v}'`).join(", ");
    
    const tableName = "users";
    const query = `INSERT INTO ${tableName} (${fieldNames}) VALUES (${fieldValues});`;
    data.push(query);
  }

  return data.join("\nGO\n");
}