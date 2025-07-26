import { FieldCategory } from "../types";

export const entertainment: FieldCategory = {
  name: "Entertainment",
  icon: "Film",
  fields: [
    { id: "showId", label: "Show ID", type: "string", example: "ENT001" },
    { id: "title", label: "Title", type: "string", example: "Summer Concert" },
    { id: "type", label: "Type", type: "string", example: "Concert" },
    { id: "genre", label: "Genre", type: "string", example: "Rock" },
    { id: "venue", label: "Venue", type: "string", example: "City Arena" },
    { id: "date", label: "Date", type: "date", example: "2024-07-15" },
    { id: "duration", label: "Duration", type: "string", example: "2 hours" },
    { id: "ticketPrice", label: "Ticket Price", type: "number", example: "75" },
    { id: "capacity", label: "Capacity", type: "number", example: "5000" },
    { id: "performer", label: "Performer", type: "string", example: "Rock Band" },
    { id: "producer", label: "Producer", type: "string", example: "Entertainment Inc" },
    { id: "rating", label: "Rating", type: "string", example: "PG-13" },
    { id: "reviews", label: "Reviews", type: "string", example: "4.5/5" },
    { id: "sponsors", label: "Sponsors", type: "string", example: "Brand X" },
    { id: "merchandise", label: "Merchandise", type: "string", example: "T-shirts" }
  ]
};