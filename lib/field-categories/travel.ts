import { FieldCategory } from "../types";

export const travel: FieldCategory = {
  name: "Travel",
  icon: "Plane",
  fields: [
    { id: "flightNumber", label: "Flight Number", type: "string", example: "AA123" },
    { id: "departure", label: "Departure", type: "string", example: "New York" },
    { id: "arrival", label: "Arrival", type: "string", example: "London" },
    { id: "departureDate", label: "Departure Date", type: "date", example: "2024-02-15" },
    { id: "arrivalDate", label: "Arrival Date", type: "date", example: "2024-02-16" },
    { id: "airline", label: "Airline", type: "string", example: "American Airlines" },
    { id: "seatNumber", label: "Seat Number", type: "string", example: "12A" },
    { id: "bookingReference", label: "Booking Reference", type: "string", example: "XYZ123" },
    { id: "passengerName", label: "Passenger Name", type: "string", example: "John Smith" },
    { id: "ticketClass", label: "Ticket Class", type: "string", example: "Business" },
    { id: "terminal", label: "Terminal", type: "string", example: "Terminal 5" },
    { id: "gate", label: "Gate", type: "string", example: "B12" },
    { id: "baggage", label: "Baggage", type: "string", example: "2 pieces" },
    { id: "mealPreference", label: "Meal Preference", type: "string", example: "Vegetarian" },
    { id: "frequentFlyerNumber", label: "Frequent Flyer Number", type: "string", example: "FF123456" }
  ]
};