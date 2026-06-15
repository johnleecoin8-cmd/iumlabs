// Single source of truth for company-wide stats.
// Every page must read from here, never hardcode these numbers in components.
export const STATS = {
  clientValuation: { value: 8, prefix: "$", suffix: "B+", display: "$8B+", label: "Client Valuation" },
  kolNetwork: { value: 230, prefix: "", suffix: "+", display: "230+", label: "KOL Network" },
  koreaEntries: { value: 25, prefix: "", suffix: "+", display: "25+", label: "Korea Entries" },
  eventsHosted: { value: 116, prefix: "", suffix: "+", display: "116+", label: "Events Hosted" },
  avgImpression: { value: 130, prefix: "", suffix: "K", display: "130K", label: "Avg. Impression" },
  avgCommunityUsers: { value: 2, prefix: "", suffix: "K+", display: "2K+", label: "Avg. Community Users" },
} as const;
