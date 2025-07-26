import { FieldCategory } from "../types";

export const address: FieldCategory = {
  name: "Address",
  icon: "MapPin",
  fields: [
    { id: "street", label: "Street", type: "string", example: "123 Main St" },
    { id: "apartment", label: "Apartment", type: "string", example: "Apt 4B" },
    { id: "city", label: "City", type: "string", example: "New York" },
    { id: "state", label: "State", type: "string", example: "NY" },
    { id: "zipCode", label: "Zip Code", type: "string", example: "10001" },
    { id: "country", label: "Country", type: "string", example: "USA" },
    { id: "county", label: "County", type: "string", example: "Kings County" },
    { id: "district", label: "District", type: "string", example: "Downtown" },
    { id: "buildingName", label: "Building Name", type: "string", example: "Park Plaza" },
    { id: "floor", label: "Floor", type: "string", example: "5th Floor" },
    { id: "addressType", label: "Address Type", type: "string", example: "Residential" },
    { id: "latitude", label: "Latitude", type: "string", example: "40.7128° N" },
    { id: "longitude", label: "Longitude", type: "string", example: "74.0060° W" },
    { id: "poBox", label: "PO Box", type: "string", example: "P.O. Box 12345" },
    { id: "deliveryInstructions", label: "Delivery Instructions", type: "string", example: "Ring twice" }
  ]
};