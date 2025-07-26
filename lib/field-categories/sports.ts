import { FieldCategory } from "../types";

export const sports: FieldCategory = {
  name: "Sports",
  icon: "Trophy",
  fields: [
    { id: "playerId", label: "Player ID", type: "string", example: "PLY001" },
    { id: "sport", label: "Sport", type: "string", example: "Basketball" },
    { id: "team", label: "Team", type: "string", example: "Eagles" },
    { id: "position", label: "Position", type: "string", example: "Forward" },
    { id: "jerseyNumber", label: "Jersey Number", type: "number", example: "23" },
    { id: "experience", label: "Experience", type: "string", example: "5 years" },
    { id: "stats", label: "Statistics", type: "string", example: "20 PPG" },
    { id: "league", label: "League", type: "string", example: "NBA" },
    { id: "season", label: "Season", type: "string", example: "2023-24" },
    { id: "contract", label: "Contract Value", type: "number", example: "1000000" },
    { id: "achievements", label: "Achievements", type: "string", example: "MVP 2023" },
    { id: "injuries", label: "Injury History", type: "string", example: "None" },
    { id: "nationality", label: "Nationality", type: "string", example: "USA" },
    { id: "agent", label: "Agent", type: "string", example: "John Smith" },
    { id: "ranking", label: "Ranking", type: "number", example: "5" }
  ]
};