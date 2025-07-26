import { LucideIcon } from "lucide-react";

export type DatabaseType = "mysql" | "postgresql" | "oracle" | "mongodb" | "sqlserver" | "elasticsearch";
export type OutputFormat = DatabaseType | "csv" | "excel" | "text" | "json";
export type DataType = 
  | "string" 
  | "number" 
  | "date" 
  | "boolean" 
  | "email" 
  | "phone" 
  | "url" 
  | "currency"
  | "address"
  | "name"
  | "username"
  | "company"
  | "jobTitle"
  | "ssn"
  | "creditCard"
  | "uuid"
  | "ipAddress"
  | "color"
  | "department"
  | "product"
  | "percentage"
  | "longitude"
  | "latitude"
  | "countryCode"
  | "language"
  | "timezone"
  | "mimeType"
  | "fileSize"
  | "isbn"
  | "macAddress";

export type Language = 
  | "en" 
  | "es" 
  | "fr" 
  | "de" 
  | "it" 
  | "pt" 
  | "ru" 
  | "ja" 
  | "ko" 
  | "zh_CN" 
  | "ar"
  | "gb";

export interface Field {
  id: string;
  label: string;
  type: DataType;
  example: string;
  isCustom?: boolean;
}

export interface CustomField extends Field {
  isCustom: true;
  categoryId: string;
}

export interface FieldCategory {
  name: string;
  icon: string;
  fields: Field[];
  customFields?: CustomField[];
}

export interface FieldConfig {
  fieldName: string;
  enabled: boolean;
  isCustom?: boolean;
  label?: string;
}

export interface DataGeneratorConfig {
  count: number;
  uniqueData: boolean;
  nullData: boolean;
  selectedFields: FieldConfig[];
  format: OutputFormat;
  textSeparator?: string;
  language: Language;
}

export interface GeneratedData {
  mysql: string;
  postgresql: string;
  oracle: string;
  mongodb: string;
  sqlserver: string;
  elasticsearch: string;
  csv: string;
  excel: string;
  text: string;
  json: string;
}