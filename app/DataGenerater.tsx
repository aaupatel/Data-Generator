"use client";

import { useState } from "react";
import { ConfigurationCard } from "@/components/ConfigurationCard";
import { FieldSelector } from "@/components/FieldSelector";
import { ResultTabs } from "@/components/ResultTabs";
import { Progress } from "@/components/ui/progress";
import { Database } from "lucide-react";
import { FIELD_CATEGORIES } from "@/lib/field-categories";
import { DataGeneratorConfig, GeneratedData } from "@/lib/types";

interface DataGeneratorProps {
  user: any;
  config: DataGeneratorConfig;
  setConfig: (config: DataGeneratorConfig) => void;
  handleGenerate: () => Promise<void>;
  generatedData: GeneratedData | null;
  isGenerating: boolean;
  progress: number;
}

export default function DataGenerator({
  user,
  config,
  setConfig,
  handleGenerate,
  generatedData,
  isGenerating,
  progress,
}: DataGeneratorProps) {
  const handleConfigChange = (newConfig: Partial<DataGeneratorConfig>) => {
    setConfig({ ...config, ...newConfig });
  };

  const handleFieldChange = (
    fields: {
      fieldName: string;
      enabled: boolean;
      label?: string;
      isCustom?: boolean;
    }[]
  ) => {
    setConfig({ ...config, selectedFields: fields });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[350px,1fr]">
      <div className="space-y-4">
        <ConfigurationCard
          config={config}
          onConfigChange={handleConfigChange}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          subscription={user?.subscription.plan || "free"}
        />
        <FieldSelector
          categories={FIELD_CATEGORIES}
          selectedFields={config.selectedFields}
          onFieldChange={handleFieldChange}
        />
      </div>
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-[600px] space-y-4">
            <Database className="h-8 w-8 text-blue-600 animate-pulse" />
            <h3 className="text-lg font-medium text-slate-700">
              Generating Data...
            </h3>
            <div className="w-64">
              <Progress value={progress} className="h-2" />
            </div>
            <p className="text-sm text-slate-500">
              {Math.round(progress)}% complete
            </p>
          </div>
        ) : generatedData ? (
          <ResultTabs data={generatedData} selectedFormat={config.format} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[600px] text-center space-y-3 text-slate-600">
            <Database className="h-12 w-12 text-slate-400" />
            <h3 className="text-base font-medium">No Data Generated Yet</h3>
            <p className="max-w-md text-sm text-slate-500">
              Select your desired fields and configuration options, then click
              Generate Data to create your sample dataset.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
