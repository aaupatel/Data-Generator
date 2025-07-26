import { FieldCategory } from "../types";

export const socialMedia: FieldCategory = {
  name: "Social Media",
  icon: "Share2",
  fields: [
    { id: "username", label: "Username", type: "string", example: "@johndoe" },
    { id: "platform", label: "Platform", type: "string", example: "Twitter" },
    { id: "followers", label: "Followers", type: "number", example: "1000" },
    { id: "following", label: "Following", type: "number", example: "500" },
    { id: "bio", label: "Bio", type: "string", example: "Digital enthusiast" },
    { id: "verified", label: "Verified Status", type: "boolean", example: "true" },
    { id: "joinDate", label: "Join Date", type: "date", example: "2020-03-15" },
    { id: "posts", label: "Total Posts", type: "number", example: "342" },
    { id: "engagement", label: "Engagement Rate", type: "string", example: "3.5%" },
    { id: "profileUrl", label: "Profile URL", type: "string", example: "twitter.com/johndoe" },
    { id: "lastActive", label: "Last Active", type: "date", example: "2024-01-20" },
    { id: "accountType", label: "Account Type", type: "string", example: "Personal" },
    { id: "linkedAccounts", label: "Linked Accounts", type: "string", example: "Instagram, Facebook" },
    { id: "reachMetrics", label: "Reach Metrics", type: "string", example: "10K weekly" },
    { id: "contentFocus", label: "Content Focus", type: "string", example: "Tech, Travel" }
  ]
};