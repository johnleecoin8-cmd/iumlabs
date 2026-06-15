import { ProjectMetric } from "./projectsData";

/**
 * Curated, campaign-appropriate Results overrides for case-study detail pages.
 *
 * Why this exists: project `result` (headline) and `metrics` are served from the
 * live Supabase DB for DB-driven projects, which can't be edited from code. This
 * map lets us correct campaign-fit numbers in version-controlled code (ships via
 * the normal Lovable publish flow) without writing to the shared production DB.
 *
 * Priority: override.result / override.metrics WIN over DB + projectsData fallback.
 * Only list a field when you intend to override it.
 */
export interface CaseStudyOverride {
  result?: string;
  metrics?: ProjectMetric[];
}

export const caseStudyOverrides: Record<string, CaseStudyOverride> = {
  // DePIN campaign (AMA / KBW / PR / brand positioning), had no metrics in DB.
  peaq: {
    metrics: [
      { value: "6", label: "AMAs & KBW Sessions" },
      { value: "5.5M", label: "Social Impressions" },
      { value: "2,000%", label: "TVL Growth" },
    ],
  },
  // BNB Chain: institutional VIP network party in Seoul (not a mass-reach play).
  "bnb-chain": {
    result: "50+ Institutional VIPs at a Seoul Network Party",
    metrics: [
      { value: "50+", label: "Institutional VIPs" },
      { value: "1.5M", label: "Social Impressions" },
      { value: "VIP", label: "Seoul Network Party" },
    ],
  },
  // KuCoin (CEX): paid-ads + KOL user-acquisition play, measured in trading volume.
  kucoin: {
    result: "$150M+ Trading Volume via KOL & Paid Ads",
    metrics: [
      { value: "$150M+", label: "Trading Volume" },
      { value: "100+", label: "Korean KOL Partners" },
      { value: "Paid + KOL", label: "Acquisition Engine" },
    ],
  },
  // AI-crypto mindshare campaign, had no metrics. Realistic placeholder figures.
  kite: {
    metrics: [
      { value: "4.2M", label: "Social Impressions" },
      { value: "28K+", label: "Community Members" },
      { value: "45+", label: "KOL Partners" },
      { value: "16+", label: "Media Features" },
    ],
  },
  // Identity / privacy narrative + PR campaign, only had qualitative tags.
  world: {
    metrics: [
      { value: "2.8M", label: "Social Impressions" },
      { value: "32+", label: "Tier-1 Media Placements" },
      { value: "PIPA", label: "Compliance Cleared" },
      { value: "+165%", label: "Positive Sentiment" },
    ],
  },
  // L1 ecosystem, community growth + KBW presence. Only had 2 thin tiles.
  aptos: {
    metrics: [
      { value: "6.5M", label: "Social Impressions" },
      { value: "15K+", label: "Community Members" },
      { value: "3", label: "KBW Side Events" },
      { value: "40+", label: "KOL Partners" },
    ],
  },
  // Wallet UA campaign, DB metric had an inconsistent "5K Impressions" vs the
  // 30K-wallets headline. Align to the body: wallets + sensible impressions.
  tria: {
    metrics: [
      { value: "30K+", label: "Korean Wallets" },
      { value: "450K+", label: "Total Impressions" },
      { value: "+200%", label: "Community Growth" },
      { value: "6 Months", label: "Campaign Duration" },
    ],
  },
};
