"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FieldCategory, FieldConfig, CustomField } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import * as Icons from "lucide-react";
import { CustomFieldDialog } from "./CustomFieldDialog";
import { X, Pencil } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FieldSelectorProps {
  categories: FieldCategory[];
  selectedFields: FieldConfig[];
  onFieldChange: (fields: FieldConfig[]) => void;
}

// Function to shorten category names
const shortenCategoryName = (name: string): string => {
  const shortNames: Record<string, string> = {
    "Personal Information": "Personal",
    "Contact Information": "Contact",
    "Human Resources": "HR",
    "Project Management": "Projects",
    "Customer Service": "Support",
    "Telecommunications": "Telecom",
    "Manufacturing": "Mfg.",
    "Entertainment": "Media"
  };

  return shortNames[name] || (name.length > 12 ? `${name.slice(0, 12)}...` : name);
};

export function FieldSelector({ categories, selectedFields, onFieldChange }: FieldSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [editingField, setEditingField] = useState<CustomField | null>(null);

  // Rest of the handlers remain the same...
  const handleFieldToggle = (fieldId: string, enabled: boolean, label?: string, isCustom?: boolean) => {
    const updatedFields = selectedFields.map(field => 
      field.fieldName === fieldId ? { ...field, enabled, label, isCustom } : field
    );
    onFieldChange(updatedFields);
  };

  const handleCategoryToggle = (categoryName: string, enabled: boolean) => {
    const updatedFields = selectedFields.map(field => {
      const fieldCategory = categories.find(cat => 
        cat.fields.some(f => f.id === field.fieldName) || 
        customFields.some(cf => cf.categoryId === categoryName && cf.id === field.fieldName)
      );
      if (fieldCategory?.name === categoryName) {
        return { ...field, enabled };
      }
      return field;
    });
    onFieldChange(updatedFields);
  };

  const isCategorySelected = (categoryName: string) => {
    const categoryFields = selectedFields.filter(field => {
      const fieldCategory = categories.find(cat => 
        cat.fields.some(f => f.id === field.fieldName) || 
        customFields.some(cf => cf.categoryId === categoryName && cf.id === field.fieldName)
      );
      return fieldCategory?.name === categoryName;
    });
    
    return categoryFields.length > 0 && categoryFields.every(field => field.enabled);
  };

  const handleAddCustomField = (field: CustomField) => {
    setCustomFields(prev => [...prev, field]);
    const newFieldConfig: FieldConfig = {
      fieldName: field.id,
      enabled: true,
      isCustom: true,
      label: field.label
    };
    onFieldChange([...selectedFields, newFieldConfig]);
  };

  const handleEditCustomField = (field: CustomField) => {
    setEditingField(field);
  };

  const handleRemoveCustomField = (fieldId: string) => {
    setCustomFields(prev => prev.filter(field => field.id !== fieldId));
    onFieldChange(selectedFields.filter(field => field.fieldName !== fieldId));
  };

  const handleUpdateCustomField = (updatedField: CustomField) => {
    setCustomFields(prev => prev.map(field => 
      field.id === updatedField.id ? updatedField : field
    ));
    onFieldChange(selectedFields.map(field => 
      field.fieldName === updatedField.id 
        ? { ...field, label: updatedField.label }
        : field
    ));
    setEditingField(null);
  };

  const isFieldSelected = (fieldId: string) => {
    return selectedFields.find(f => f.fieldName === fieldId)?.enabled || false;
  };

  const getCustomFieldsForCategory = (categoryId: string) => {
    return customFields.filter(field => field.categoryId === categoryId);
  };

  const filteredCategories = categories.filter(category => {
    const categoryMatches = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const fieldsMatch = category.fields.some(field => 
      field.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.example.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return categoryMatches || fieldsMatch;
  });

  return (
    <TooltipProvider>
      <Card className="backdrop-blur-sm bg-white/50 shadow-lg border-0">
        <CardHeader className="space-y-3 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-base">
              <span>Field Selection</span>
              <Badge variant="secondary" className="ml-2 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs">
                {selectedFields.filter(f => f.enabled).length} selected
              </Badge>
            </CardTitle>
          </div>
          <div className="relative">
            <Icons.Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
            <Input
              placeholder="Search fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 border-slate-200 focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-26rem)] pr-4">
            <Accordion
              type="multiple"
              value={expandedCategories}
              onValueChange={setExpandedCategories}
              className="space-y-2"
            >
              {filteredCategories.map((category) => {
                const Icon = Icons[
                  category.icon as keyof typeof Icons
                ] as React.ElementType;
                const categoryCustomFields = getCustomFieldsForCategory(category.name);
                const allFields = [...category.fields, ...categoryCustomFields];
                
                const fieldsInCategory = allFields.filter(field =>
                  field.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  field.example.toLowerCase().includes(searchTerm.toLowerCase())
                );

                if (fieldsInCategory.length === 0 && !searchTerm) return null;

                const shortenedName = shortenCategoryName(category.name);

                return (
                  <AccordionItem 
                    key={category.name} 
                    value={category.name}
                    className="border border-slate-200 rounded-lg px-2 overflow-hidden bg-white/80"
                  >
                    <div className="flex items-center gap-2 px-4 py-2">
                      <Checkbox
                        checked={isCategorySelected(category.name)}
                        onCheckedChange={(checked) => handleCategoryToggle(category.name, checked as boolean)}
                        className="border-slate-300 text-blue-600"
                      />
                      <AccordionTrigger className="hover:no-underline py-0 flex-1">
                        <div className="flex items-center gap-2 text-xs">
                          {Icon && <Icon className="h-3.5 w-3.5 text-blue-600" />}
                          <span className="font-medium text-slate-700">
                            {shortenedName !== category.name ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span>{shortenedName}</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{category.name}</p>
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              <span>{shortenedName}</span>
                            )}
                          </span>
                          <Badge variant="secondary" className="ml-2 bg-slate-100 text-slate-700 text-xs">
                            {allFields.filter(f => isFieldSelected(f.id)).length} / {allFields.length}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                    </div>
                    <AccordionContent>
                      <div className="space-y-2 px-4 pb-4">
                        <div className="grid grid-cols-2 gap-2">
                          {fieldsInCategory.map((field) => (
                            <div key={field.id} className="flex items-start space-x-2 bg-slate-50 p-2 rounded-lg">
                              <Checkbox
                                id={field.id}
                                checked={isFieldSelected(field.id)}
                                onCheckedChange={(checked) => 
                                  handleFieldToggle(field.id, checked as boolean, field.label, field.isCustom)
                                }
                                className="border-slate-300 text-blue-600 mt-0.5"
                              />
                              <div className="grid gap-0.5 leading-none flex-1">
                                <label
                                  htmlFor={field.id}
                                  className="text-xs font-medium text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {field.label}
                                  {field.isCustom && (
                                    <Badge variant="secondary" className="ml-2 bg-blue-50 text-blue-700 text-[10px]">
                                      Custom
                                    </Badge>
                                  )}
                                </label>
                                <p className="text-[10px] text-slate-500">
                                  {field.example}
                                </p>
                              </div>
                              {field.isCustom && (
                                <div className="flex gap-1">
                                  <span
                                    onClick={() => handleEditCustomField(field as CustomField)}
                                    className="cursor-pointer p-1 hover:bg-slate-200 rounded"
                                  >
                                    <Pencil className="h-3 w-3 text-slate-500" />
                                  </span>
                                  <span
                                    onClick={() => handleRemoveCustomField(field.id)}
                                    className="cursor-pointer p-1 hover:bg-slate-200 rounded"
                                  >
                                    <X className="h-3 w-3 text-slate-500" />
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <CustomFieldDialog
                          categoryId={category.name}
                          onAddCustomField={handleAddCustomField}
                          editingField={editingField}
                          onUpdateCustomField={handleUpdateCustomField}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </ScrollArea>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}