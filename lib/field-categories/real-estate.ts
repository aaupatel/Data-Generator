import { FieldCategory } from "../types";

export const realEstate: FieldCategory = {
  name: "Real Estate",
  icon: "Home",
  fields: [
    { id: "propertyId", label: "Property ID", type: "string", example: "PROP001" },
    { id: "propertyType", label: "Property Type", type: "string", example: "Single Family Home" },
    { id: "listingPrice", label: "Listing Price", type: "number", example: "350000" },
    { id: "squareFeet", label: "Square Feet", type: "number", example: "2000" },
    { id: "bedrooms", label: "Bedrooms", type: "number", example: "3" },
    { id: "bathrooms", label: "Bathrooms", type: "number", example: "2" },
    { id: "yearBuilt", label: "Year Built", type: "number", example: "1995" },
    { id: "lotSize", label: "Lot Size", type: "string", example: "0.25 acres" },
    { id: "parkingSpaces", label: "Parking Spaces", type: "number", example: "2" },
    { id: "amenities", label: "Amenities", type: "string", example: "Pool, Garden" },
    { id: "listingAgent", label: "Listing Agent", type: "string", example: "Jane Smith" },
    { id: "listingDate", label: "Listing Date", type: "date", example: "2024-01-15" },
    { id: "propertyStatus", label: "Property Status", type: "string", example: "For Sale" },
    { id: "zoning", label: "Zoning", type: "string", example: "Residential" },
    { id: "schoolDistrict", label: "School District", type: "string", example: "Lincoln High" }
  ]
};