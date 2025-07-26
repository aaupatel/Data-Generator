"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table2, Copy, Download, Database, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { GeneratedData, OutputFormat } from "@/lib/types";

interface ResultTabsProps {
  data: GeneratedData;
  selectedFormat: OutputFormat;
}

// Increase items per page for larger datasets
const ITEMS_PER_PAGE = 50;

export function ResultTabs({ data, selectedFormat }: ResultTabsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy. Data might be too large.");
    }
  };

  const downloadFile = (content: string, fileType: string) => {
    try {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-data.${fileType}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success(`Downloaded as ${fileType.toUpperCase()}`);
    } catch (err) {
      toast.error("Failed to download. Data might be too large.");
    }
  };

  const paginateData = (content: string): { data: string; totalPages: number } => {
    const lines = content.split('\n').filter(line => line.trim());
    const totalPages = Math.ceil(lines.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedLines = lines.slice(startIndex, endIndex);
    return {
      data: paginatedLines.join('\n'),
      totalPages
    };
  };

  const content = data[selectedFormat];
  const { data: paginatedContent, totalPages } = paginateData(content);

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 shrink-0">
        <CardTitle className="text-xs font-medium">
          <Database className="h-3.5 w-3.5 inline-block mr-1.5" />
          Generated {selectedFormat.toUpperCase()} Format
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(content)} className="text-xs h-7 px-2">
            <Copy className="h-3.5 w-3.5 mr-1.5" />
            Copy All
          </Button>
          <Button variant="outline" size="sm" onClick={() => downloadFile(content, selectedFormat)} className="text-xs h-7 px-2">
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4 overflow-hidden">
        <div className="relative flex-1 min-h-0">
          <pre className="absolute inset-0 bg-muted p-3 rounded-lg overflow-auto">
            <code className="block whitespace-pre-wrap text-xs">{paginatedContent}</code>
          </pre>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-3 border-t shrink-0">
            <div className="text-xs text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="text-xs h-7 px-2"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="text-xs h-7 px-2"
              >
                Next
                <ChevronRight className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}