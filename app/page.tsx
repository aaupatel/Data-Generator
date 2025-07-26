"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import DataGenerator from "./DataGenerater";
import { DataGeneratorConfig, GeneratedData } from "@/lib/types";
import { FIELD_CATEGORIES } from "@/lib/field-categories";
import { generateAllFormats } from "@/lib/generators";
import { toast } from "sonner";
import { useTrial } from "@/hooks/use-trial";

export default function Home() {
  const router = useRouter();
  const { hasTrialsLeft, trialsRemaining, incrementTrial } = useTrial();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };
    checkAuth();
  }, []);

  const initialFields = FIELD_CATEGORIES.flatMap((category) =>
    category.fields.map((field) => ({
      fieldName: field.id,
      enabled: false,
    }))
  );

  const [config, setConfig] = useState<DataGeneratorConfig>({
    count: 10,
    uniqueData: false,
    nullData: false,
    selectedFields: initialFields,
    format: "mysql",
    textSeparator: " ",
    language: "en",
  });
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(
    null
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = async () => {
    if (!user && !hasTrialsLeft) {
      toast.error("Free trials exhausted. Please sign in to continue.");
      router.push("/auth/register");
      return;
    }

    if (!user) {
      incrementTrial();
    }

    if (!config.selectedFields.some((field) => field.enabled)) {
      toast.error("Please select at least one field to generate data");
      return;
    }

    const maxRecords =
      user?.subscription.plan === "gold"
        ? 10000000
        : user?.subscription.plan === "silver"
        ? 300000
        : 2000;

    if (config.count > maxRecords) {
      toast.error(
        `Maximum number of records for your plan is ${maxRecords.toLocaleString()}`
      );
      return;
    }

    try {
      setIsGenerating(true);
      setProgress(0);
      setGeneratedData(null);

      const data = await generateAllFormats(
        config.count,
        config.uniqueData,
        config.nullData,
        config.selectedFields,
        config.textSeparator,
        config.language,
        (progress) => setProgress(progress)
      );

      setGeneratedData(data);
      toast.success("Data generated successfully!");
    } catch (error) {
      toast.error(
        "Failed to generate data. Please try with fewer records or fields."
      );
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        <Navbar />
        {!user && hasTrialsLeft && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-blue-700 text-sm">
              {trialsRemaining} free trial{trialsRemaining !== 1 ? "s" : ""}{" "}
              remaining
            </p>
          </div>
        )}
        <DataGenerator
          user={user}
          config={config}
          setConfig={setConfig}
          handleGenerate={handleGenerate}
          generatedData={generatedData}
          isGenerating={isGenerating}
          progress={progress}
        />
      </div>
  );
}
