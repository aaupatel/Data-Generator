import { DatabaseType, FieldConfig, Language } from "../types";
import { generateRandomValue } from "../generators/shared";

// Process data in chunks
const CHUNK_SIZE = 1000;

self.onmessage = (e: MessageEvent) => {
  const { type, count, uniqueData, nullData, fields, language, textSeparator } =
    e.data;

  try {
    const totalChunks = Math.ceil(count / CHUNK_SIZE);
    const usedValues: Set<number> = new Set<number>();
    // const usedValues = new Set();
    let processedCount = 0;

    for (let chunk = 0; chunk < totalChunks; chunk++) {
      const chunkSize = Math.min(CHUNK_SIZE, count - chunk * CHUNK_SIZE);
      const chunkData = generateChunk(
        type,
        chunkSize,
        uniqueData,
        nullData,
        fields,
        language,
        textSeparator,
        usedValues,
        processedCount
      );

      processedCount += chunkSize;

      // Report progress and chunk data
      self.postMessage({
        type: "progress",
        data: chunkData,
        progress: (processedCount / count) * 100,
        isLastChunk: processedCount >= count,
      });
    }
  } catch (error: any) {
    self.postMessage({ type: "error", error: error.message });
  }
};

function generateChunk(
  type: DatabaseType,
  chunkSize: number,
  uniqueData: boolean,
  nullData: boolean,
  fields: FieldConfig[],
  language: Language,
  textSeparator: string,
  usedValues: Set<number>,
  offset: number
): string[] {
  const results: string[] = [];

  for (let i = 0; i < chunkSize; i++) {
    const id = uniqueData
      ? offset + i + 1
      : Math.floor(Math.random() * (offset + chunkSize)) + 1;

    if (uniqueData && usedValues.has(id)) {
      continue;
    }
    usedValues.add(id);

    const record = generateRecord(
      type,
      id,
      fields,
      nullData,
      language,
      textSeparator
    );
    results.push(record);
  }

  return results;
}

function generateRecord(
  type: DatabaseType,
  id: number,
  fields: FieldConfig[],
  nullData: boolean,
  language: Language,
  textSeparator: string
): string {
  const values: Record<string, any> = { id };

  fields.forEach((field) => {
    const columnName =
      field.isCustom && field.label ? field.label : field.fieldName;
    values[columnName] = generateRandomValue(
      field.fieldName,
      nullData,
      language
    );
  });

  switch (type) {
    case "mysql":
    case "postgresql":
    case "oracle":
    case "sqlserver":
      return generateSQLRecord(type, values);
    case "mongodb":
      return generateMongoRecord(values);
    case "elasticsearch":
      return generateElasticsearchRecord(values);
    default:
      return JSON.stringify(values);
  }
}

function generateSQLRecord(
  type: DatabaseType,
  values: Record<string, any>
): string {
  const fields = Object.keys(values).join(", ");
  const valuesList = Object.values(values)
    .map((v) => (v === null ? "NULL" : `'${v}'`))
    .join(", ");
  return `INSERT INTO users (${fields}) VALUES (${valuesList});`;
}

function generateMongoRecord(values: Record<string, any>): string {
  return `db.users.insertOne(${JSON.stringify(values)});`;
}

function generateElasticsearchRecord(values: Record<string, any>): string {
  const action = { index: { _index: "users", _id: values.id } };
  return `${JSON.stringify(action)}\n${JSON.stringify(values)}`;
}
