import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit } from "lucide-react";
import { DataType, CustomField } from "@/lib/types";

interface CustomFieldDialogProps {
  categoryId: string;
  onAddCustomField: (field: CustomField) => void;
  editingField: CustomField | null;
  onUpdateCustomField: (field: CustomField) => void;
}

const DATA_TYPES: { value: DataType; label: string; example: string }[] = [
  { value: "string", label: "Text", example: "Any text value" },
  { value: "number", label: "Number", example: "123" },
  { value: "date", label: "Date", example: "2024-01-20" },
  { value: "boolean", label: "Boolean", example: "true/false" },
  { value: "email", label: "Email", example: "user@example.com" },
  { value: "phone", label: "Phone", example: "+1-555-0123" },
  { value: "url", label: "URL", example: "https://example.com" },
  { value: "currency", label: "Currency", example: "$99.99" },
  { value: "address", label: "Address", example: "123 Main St" },
  { value: "name", label: "Full Name", example: "John Smith" },
  { value: "username", label: "Username", example: "johnsmith" },
  { value: "company", label: "Company Name", example: "Acme Corp" },
  { value: "jobTitle", label: "Job Title", example: "Software Engineer" },
  { value: "ssn", label: "SSN", example: "123-45-6789" },
  { value: "creditCard", label: "Credit Card", example: "4111-1111-1111-1111" },
  { value: "uuid", label: "UUID", example: "123e4567-e89b-12d3-a456-426614174000" },
  { value: "ipAddress", label: "IP Address", example: "192.168.1.1" },
  { value: "color", label: "Color", example: "Blue" },
  { value: "department", label: "Department", example: "Engineering" },
  { value: "product", label: "Product", example: "Wireless Headphones" },
  { value: "percentage", label: "Percentage", example: "85.5%" },
  { value: "longitude", label: "Longitude", example: "-73.935242" },
  { value: "latitude", label: "Latitude", example: "40.730610" },
  { value: "countryCode", label: "Country Code", example: "US" },
  { value: "language", label: "Language", example: "English" },
  { value: "timezone", label: "Timezone", example: "America/New_York" },
  { value: "mimeType", label: "MIME Type", example: "application/json" },
  { value: "fileSize", label: "File Size", example: "128MB" },
  { value: "isbn", label: "ISBN", example: "978-3-16-148410-0" },
  { value: "macAddress", label: "MAC Address", example: "00:00:5e:00:53:af" }
];

export function CustomFieldDialog({ categoryId, onAddCustomField, editingField, onUpdateCustomField }: CustomFieldDialogProps) {
  const [open, setOpen] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState<DataType>("string");
  const [example, setExample] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editingField) {
      setFieldName(editingField.label);
      setFieldType(editingField.type);
      setExample(editingField.example);
      setIsEditing(true);
      setOpen(true);
    } else {
      resetForm();
    }
  }, [editingField]);

  const resetForm = () => {
    setFieldName("");
    setFieldType("string");
    setExample("");
    setIsEditing(false);
  };

  const handleTypeChange = (value: DataType) => {
    setFieldType(value);
    const selectedType = DATA_TYPES.find(type => type.value === value);
    if (selectedType) {
      setExample(selectedType.example);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && editingField) {
      onUpdateCustomField({
        ...editingField,
        label: fieldName,
        type: fieldType,
        example: example
      });
    } else {
      const customField: CustomField = {
        id: `custom_${categoryId}_${fieldType}_${Date.now()}`,
        label: fieldName,
        type: fieldType,
        example: example,
        isCustom: true,
        categoryId
      };
      onAddCustomField(customField);
    }
    
    setOpen(false);
    resetForm();
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      resetForm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Custom Field
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Custom Field" : "Add Custom Field"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fieldName">Field Name</Label>
            <Input
              id="fieldName"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              placeholder="Enter field name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fieldType">Data Type</Label>
            <Select value={fieldType} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select data type" />
              </SelectTrigger>
              <SelectContent>
                {DATA_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex flex-col">
                      <span>{type.label}</span>
                      <span className="text-xs text-muted-foreground">{type.example}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="example">Example Value</Label>
            <Input
              id="example"
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder="Enter example value"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {isEditing ? "Update Field" : "Add Field"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}