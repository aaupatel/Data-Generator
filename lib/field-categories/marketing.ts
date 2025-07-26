import { FieldCategory } from "../types";

export const marketing: FieldCategory = {
  name: "Marketing",
  icon: "Target",
  fields: [
    { id: "campaignId", label: "Campaign ID", type: "string", example: "CAM001" },
    { id: "campaignName", label: "Campaign Name", type: "string", example: "Summer Sale" },
    { id: "startDate", label: "Start Date", type: "date", example: "2024-06-01" },
    { id: "endDate", label: "End Date", type: "date", example: "2024-07-31" },
    { id: "budget", label: "Budget", type: "number", example: "10000" },
    { id: "channel", label: "Channel", type: "string", example: "Social Media" },
    { id: "targetAudience", label: "Target Audience", type: "string", example: "18-34 years" },
    { id: "reach", label: "Reach", type: "number", example: "50000" },
    { id: "engagement", label: "Engagement", type: "string", example: "2.5%" },
    { id: "conversion", label: "Conversion Rate", type: "string", example: "3.2%" },
    { id: "roi", label: "ROI", type: "string", example: "150%" },
    { id: "creativeAssets", label: "Creative Assets", type: "string", example: "Videos, Images" },
    { id: "marketingGoals", label: "Goals", type: "string", example: "Brand Awareness" },
    { id: "kpis", label: "KPIs", type: "string", example: "CTR, CPC" },
    { id: "adSpend", label: "Ad Spend", type: "number", example: "5000" }
  ]
};