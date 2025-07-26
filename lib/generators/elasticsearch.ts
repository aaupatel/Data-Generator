import { FieldConfig } from "../types";
import { generateRandomValue } from "./shared";

export function generateElasticsearchData(
  count: number,
  uniqueData: boolean,
  nullData: boolean,
  enabledFields: FieldConfig[]
): string {
  const bulkCommands = [];
  const usedValues = new Set();
  const indexName = "users";

  for (let i = 0; i < count; i++) {
    const id = uniqueData ? i + 1 : Math.floor(Math.random() * count) + 1;

    if (uniqueData && usedValues.has(id)) {
      continue;
    }
    usedValues.add(id);

    // Index action metadata
    const action = {
      index: {
        _index: indexName,
        _id: id.toString()
      }
    };
    bulkCommands.push(JSON.stringify(action));

    // Document data
    const document: Record<string, any> = {};
    enabledFields.forEach(field => {
      const value = generateRandomValue(field.fieldName, nullData);
      if (value !== null) {
        document[field.fieldName] = value;
      }
    });
    bulkCommands.push(JSON.stringify(document));
  }

  // Add curl command as a comment
  const curlComment = `# Elasticsearch Bulk API command:
# curl -X POST "localhost:9200/_bulk" -H "Content-Type: application/x-ndjson" --data-binary "@data.json"
`;

  // Each command must be followed by a newline, including the last one
  return curlComment + bulkCommands.join("\n") + "\n";
}