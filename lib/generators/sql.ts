import { DatabaseType, FieldConfig, Language } from "../types";
import { generateRandomValue } from "./shared";

export function generateSQLData(
  type: DatabaseType,
  count: number,
  uniqueData: boolean,
  nullData: boolean,
  enabledFields: FieldConfig[],
  language: Language = "en"
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
      // For custom fields, use the label as the column name
      const columnName = field.isCustom && field.label ? field.label : field.fieldName;
      values[columnName] = generateRandomValue(field.fieldName, nullData, language);
    });

    const fieldNames = Object.keys(values).join(", ");
    const fieldValues = Object.values(values).map(v => v === null ? "NULL" : `'${v}'`).join(", ");
    
    const tableName = "users";
    const query = `INSERT INTO ${tableName} (${fieldNames}) VALUES (${fieldValues});`;
    data.push(query);
  }

  return data.join("\n");
}