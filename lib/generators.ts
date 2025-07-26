import { DatabaseType, FieldConfig, GeneratedData, Language } from "./types";

const MAX_RECORDS = 10000000;

function validateConfig(count: number, enabledFields: FieldConfig[]) {
  if (count <= 0) {
    throw new Error("Number of records must be greater than 0");
  }
  if (count > MAX_RECORDS) {
    throw new Error(`Maximum number of records is ${MAX_RECORDS}`);
  }
  if (enabledFields.length === 0) {
    throw new Error("At least one field must be selected");
  }
}

export async function generateAllFormats(
  count: number,
  uniqueData: boolean,
  nullData: boolean,
  selectedFields: FieldConfig[],
  textSeparator: string = " ",
  language: Language = "en",
  onProgress?: (progress: number) => void
): Promise<GeneratedData> {
  const enabledFields = selectedFields.filter(field => field.enabled);
  validateConfig(count, enabledFields);

  try {
    // Create a worker for data generation
    const worker = new Worker(new URL('./workers/data-generator.worker.ts', import.meta.url));
    
    return new Promise((resolve, reject) => {
      const results: Record<string, string[]> = {
        mysql: [],
        postgresql: [],
        oracle: [],
        mongodb: [],
        sqlserver: [],
        elasticsearch: [],
        csv: [],
        excel: [],
        text: [],
        json: []
      };

      worker.onmessage = (e) => {
        const { type, data, progress, isLastChunk, error } = e.data;

        if (type === 'error') {
          worker.terminate();
          reject(new Error(error));
          return;
        }

        if (type === 'progress') {
          // Append chunk data to results
          Object.keys(results).forEach(format => {
            results[format].push(...data);
          });

          // Report progress
          if (onProgress) {
            onProgress(progress);
          }

          // If this is the last chunk, format and return results
          if (isLastChunk) {
            worker.terminate();
            resolve({
              mysql: results.mysql.join('\n'),
              postgresql: results.postgresql.join('\n'),
              oracle: results.oracle.join('\n'),
              mongodb: results.mongodb.join('\n'),
              sqlserver: results.sqlserver.join('\n'),
              elasticsearch: results.elasticsearch.join('\n'),
              csv: formatCSV(results.csv),
              excel: formatExcel(results.excel),
              text: formatText(results.text, textSeparator),
              json: formatJSON(results.json)
            });
          }
        }
      };

      // Start the worker with initial data
      worker.postMessage({
        count,
        uniqueData,
        nullData,
        fields: enabledFields,
        language,
        textSeparator
      });
    });
  } catch (error) {
    console.error("Data generation error:", error);
    throw new Error("Failed to generate data. Please try with fewer records or fields.");
  }
}

function formatCSV(data: string[]): string {
  return data.join('\n');
}

function formatExcel(data: string[]): string {
  return data.join('\n');
}

function formatText(data: string[], separator: string): string {
  return data.join(separator);
}

function formatJSON(data: string[]): string {
  return `[\n${data.join(',\n')}\n]`;
}