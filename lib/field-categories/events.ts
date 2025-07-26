import { FieldCategory } from "../types";

export const events: FieldCategory = {
  name: "Events",
  icon: "Calendar",
  fields: [
    { id: "eventId", label: "Event ID", type: "string", example: "EVT001" },
    { id: "eventName", label: "Event Name", type: "string", example: "Annual Conference" },
    { id: "eventType", label: "Event Type", type: "string", example: "Conference" },
    { id: "startDate", label: "Start Date", type: "date", example: "2024-09-15" },
    { id: "endDate", label: "End Date", type: "date", example: "2024-09-17" },
    { id: "venue", label: "Venue", type: "string", example: "Convention Center" },
    { id: "capacity", label: "Capacity", type: "number", example: "500" },
    { id: "organizer", label: "Organizer", type: "string", example: "Events Inc" },
    { id: "budget", label: "Budget", type: "number", example: "50000" },
    { id: "sponsors", label: "Sponsors", type: "string", example: "Tech Corp" },
    { id: "speakers", label: "Speakers", type: "string", example: "John Smith" },
    { id: "ticketPrice", label: "Ticket Price", type: "number", example: "199" },
    { id: "registrations", label: "Registrations", type: "number", example: "350" },
    { id: "status", label: "Status", type: "string", example: "Upcoming" },
    { id: "agenda", label: "Agenda", type: "string", example: "Keynote, Workshops" }
  ]
};