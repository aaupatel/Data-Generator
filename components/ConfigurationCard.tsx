"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database, Settings2, Globe2 } from "lucide-react";
import { DataGeneratorConfig, OutputFormat } from "@/lib/types";
import { SUPPORTED_LANGUAGES } from "@/lib/languages";

interface ConfigurationCardProps {
  config: DataGeneratorConfig;
  onConfigChange: (config: Partial<DataGeneratorConfig>) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  subscription?: "free" | "silver" | "gold";
}

const OUTPUT_FORMATS: { value: OutputFormat; label: string }[] = [
  { value: "mysql", label: "MySQL" },
  { value: "postgresql", label: "PostgreSQL" },
  { value: "oracle", label: "Oracle" },
  { value: "sqlserver", label: "SQL Server" },
  { value: "mongodb", label: "MongoDB" },
  { value: "elasticsearch", label: "Elasticsearch" },
  { value: "json", label: "JSON" },
  { value: "csv", label: "CSV" },
  { value: "excel", label: "Excel" },
  { value: "text", label: "Text" },
];

export function ConfigurationCard({
  config,
  onConfigChange,
  onGenerate,
  isGenerating,
  subscription = "free",
}: ConfigurationCardProps) {
  const [customSeparator, setCustomSeparator] = useState(false);
  const maxRecords =
    subscription === "gold"
      ? 8000000
      : subscription === "silver"
      ? 300000
      : 2000;

  const handleSeparatorChange = (value: string) => {
    if (value === "custom") {
      setCustomSeparator(true);
      return;
    }
    setCustomSeparator(false);
    onConfigChange({ textSeparator: value });
  };

  return (
    <Card className="backdrop-blur-sm bg-white/50 shadow-lg border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Settings2 className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle>Configuration</CardTitle>
            <p className="text-sm text-slate-500 mt-1">
              Set your data generation preferences
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">
              Number of Records (Max: {maxRecords.toLocaleString()})
            </label>
            <Input
              type="number"
              min="1"
              max={maxRecords}
              value={config.count}
              onChange={(e) =>
                onConfigChange({ count: parseInt(e.target.value) || 0 })
              }
              className="w-full border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              disabled={isGenerating}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">
              Output Format
            </label>
            <Select
              value={config.format}
              onValueChange={(value) =>
                onConfigChange({ format: value as OutputFormat })
              }
              disabled={isGenerating}
            >
              <SelectTrigger className="w-full border-slate-200">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                {OUTPUT_FORMATS.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 md:block flex items-center gap-2">
              <Globe2 className="h-4 w-4" />
              Language
            </label>
            <Select
              value={config.language}
              onValueChange={(value) =>
                onConfigChange({ language: value as any })
              }
              disabled={isGenerating}
            >
              <SelectTrigger className="w-full border-slate-200">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {config.format === "text" && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                Text Separator
              </label>
              <Select
                value={customSeparator ? "custom" : config.textSeparator}
                onValueChange={handleSeparatorChange}
                disabled={isGenerating}
              >
                <SelectTrigger className="w-full border-slate-200">
                  <SelectValue placeholder="Choose separator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">Space</SelectItem>
                  <SelectItem value="|">Pipe (|)</SelectItem>
                  <SelectItem value=",">Comma (,)</SelectItem>
                  <SelectItem value=";">Semicolon (;)</SelectItem>
                  <SelectItem value="\t">Tab</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>

              {customSeparator && (
                <div className="mt-2">
                  <Input
                    type="text"
                    value={config.textSeparator || ""}
                    onChange={(e) =>
                      onConfigChange({ textSeparator: e.target.value })
                    }
                    placeholder="Enter custom separator"
                    className="w-full border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    maxLength={5}
                    disabled={isGenerating}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Enter your custom separator character(s)
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3 bg-slate-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="unique"
              checked={config.uniqueData}
              onCheckedChange={(checked) =>
                onConfigChange({ uniqueData: checked as boolean })
              }
              className="border-slate-300 text-blue-600"
              disabled={isGenerating}
            />
            <label
              htmlFor="unique"
              className="text-sm font-medium text-slate-700"
            >
              Generate Unique Data
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="allowNull"
              checked={config.nullData}
              onCheckedChange={(checked) =>
                onConfigChange({ nullData: checked as boolean })
              }
              className="border-slate-300 text-blue-600"
              disabled={isGenerating}
            />
            <label
              htmlFor="allowNull"
              className="text-sm font-medium text-slate-700"
            >
              Allow Null Values
            </label>
          </div>
        </div>

        <Button
          onClick={onGenerate}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          disabled={isGenerating}
        >
          <Database
            className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`}
          />
          {isGenerating ? "Generating..." : "Generate Data"}
        </Button>
        {subscription === "free" && (
          <p className="text-xs text-muted-foreground text-center">
            Free plan limited to {maxRecords.toLocaleString()} records.
            <a href="/pricing" className="text-primary hover:underline ml-1">
              Upgrade for more
            </a>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
