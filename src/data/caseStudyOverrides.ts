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
 *
 * beforeAfter: campaign transformation (pre-entry state -> measured result). The
 * `before` values are conservative drafts and should be confirmed with real data.
 */
export interface BeforeAfterItem {
  label: string;
  before: string;
  after: string;
}

export interface CaseStudyOverride {
  result?: string;
  metrics?: ProjectMetric[];
  beforeAfter?: BeforeAfterItem[];
}

export const caseStudyOverrides: Record<string, CaseStudyOverride> = {
  // DePIN campaign (AMA / KBW / PR / brand positioning), had no metrics in DB.
  peaq: {
    metrics: [
      { value: "6", label: "AMAs & KBW Sessions" },
      { value: "5.5M", label: "Social Impressions" },
      { value: "2,000%", label: "TVL Growth" },
    ],
    beforeAfter: [
      { label: "Korean DePIN Presence", before: "Pre-launch, zero local DePIN community", after: "6 AMAs & KBW sessions establishing Korean DePIN positioning" },
      { label: "Social Reach", before: "Minimal local awareness, no Korean social footprint", after: "5.5M social impressions across the Korean market" },
      { label: "Korean TVL", before: "Zero local TVL base at market entry", after: "2,000% TVL growth" },
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
    beforeAfter: [
      { label: "Korean Institutional Network", before: "No local institutional or VIP relationships", after: "50+ institutional VIPs onboarded at a Seoul network party" },
      { label: "Community Base", before: "No Korean channels or ambassadors", after: "150+ VIP inviters, 2K+ active community" },
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
    beforeAfter: [
      { label: "Korean Trading Volume", before: "New market entry, zero local trading base", after: "$150M+ cumulative trading volume" },
      { label: "Trader Acquisition", before: "Minimal local trader awareness", after: "100+ KOLs activated, funded traders acquired" },
    ],
  },
  // CoinW (CEX): KOL + Paid Ads user-acquisition play, measured in trading volume.
  // DB row has only a thin tagline description and no metrics; fill from code.
  coinw: {
    result: "$120M+ Trading Volume via KOL & Paid Ads",
    metrics: [
      { value: "$120M+", label: "Korean Trading Volume" },
      { value: "60+", label: "Korean KOL Partners" },
      { value: "12M+", label: "Paid + KOL Impressions" },
      { value: "Paid + KOL", label: "Acquisition Engine" },
    ],
    beforeAfter: [
      { label: "Korean Trading Volume", before: "Global brand, almost no Korean footprint and zero local trading volume", after: "$120M+ Korean trading volume" },
      { label: "KOL Acquisition Network", before: "No Korean KOL relationships or trader trust", after: "60+ Korean trading KOLs driving sign-ups and deposits" },
      { label: "Acquisition Reach", before: "Pre-entry, no local awareness or funnel", after: "12M+ Paid + KOL impressions, optimized to cost per funded account" },
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
    beforeAfter: [
      { label: "Korean Social Reach", before: "Pre-launch, zero Korean mindshare", after: "4.2M social impressions" },
      { label: "Community Base", before: "No Korean community or channels", after: "28K+ community members" },
      { label: "KOL & Media Footprint", before: "No local KOL or media presence", after: "45+ KOL partners, 16+ media features" },
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
    beforeAfter: [
      { label: "PIPA Compliance", before: "Unverified under Korea's biometric data law", after: "PIPA compliance cleared" },
      { label: "Tier-1 Media Placements", before: "No Korean press coverage", after: "32+ Tier-1 media placements" },
      { label: "Social Impressions", before: "Pre-launch, zero Korean reach", after: "2.8M social impressions" },
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
    beforeAfter: [
      { label: "Korean Community", before: "No Korean community, built from scratch", after: "15K+ community members on Telegram and KakaoTalk" },
      { label: "KOL Network", before: "No local KOL relationships", after: "40+ Korean KOL partners across YouTube and Telegram" },
      { label: "Social Reach", before: "Pre-entry, zero Korean social presence", after: "6.5M social impressions across the campaign" },
      { label: "Offline Presence", before: "No Korean events or on-the-ground presence", after: "3 KBW side events incl. Aptos Experience Seoul" },
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
    beforeAfter: [
      { label: "Korean Wallet Installs", before: "Pre-launch, zero Korean wallet base", after: "30K+ Korean wallets onboarded" },
      { label: "Market Awareness", before: "Unknown brand, no Korean presence", after: "450K+ total impressions across a 6-month campaign" },
      { label: "Community Growth", before: "No local community or channels", after: "+200% community growth" },
    ],
  },
  // Below: beforeAfter-only entries (result/metrics still come from DB/projectsData).
  // Drafted from existing campaign figures; `before` values to be confirmed.
  mantra: {
    beforeAfter: [
      { label: "Korean Institutional Pipeline", before: "Pre-entry, zero Korean institutional relationships", after: "$50M+ institutional pipeline built" },
      { label: "Korean Exchange Access", before: "Not listed on any Korean exchange", after: "1 Korea CEX listing completed" },
      { label: "Market Visibility", before: "No Korean media presence or reach", after: "130K+ impressions, 4+ major media features" },
    ],
  },
  "sahara-ai": {
    beforeAfter: [
      { label: "Korean Launch Footprint", before: "Pre-launch, no Korean events or local presence", after: "10 launch events hosting 400+ attendees" },
      { label: "Korean Community Reach", before: "Zero local audience or community base", after: "200K+ community reach" },
      { label: "Korean Partnerships", before: "No local AI or enterprise partnerships", after: "25+ partnership deals secured" },
    ],
  },
  megaeth: {
    beforeAfter: [
      { label: "Korean Mindshare", before: "Pre-mainnet, no Korean presence or local awareness", after: "2M+ total impressions and a top Korean mindshare ranking ahead of launch" },
      { label: "Testnet Community", before: "Zero local community, no testnet participants in Korea", after: "2K+ Korean testnet participants activated pre-mainnet" },
      { label: "ICO Contribution", before: "No Korean contributor base before launch", after: "$3M+ ICO contribution from the Korean community" },
    ],
  },
  bybit: {
    beforeAfter: [
      { label: "Korean Market Position", before: "Unranked foreign exchange, no local traction", after: "#2 exchange by traffic in Korea" },
      { label: "Korean Trading Volume", before: "New market entry, zero local trading base", after: "$1.5B+ TVL contribution" },
      { label: "VIP Trader Base", before: "No high-volume Korean traders onboarded", after: "1,200+ VIP users acquired" },
    ],
  },
  polygon: {
    beforeAfter: [
      { label: "Korean TVL", before: "No Korean presence, zero local TVL", after: "$2M Korean TVL in the first 30 days" },
      { label: "Developer Adoption", before: "Pre-launch, no local developer base", after: "200+ developers at the L2 hackathon" },
      { label: "Grants Pipeline", before: "No Korean grants program or applicants", after: "80+ Korean developer grant applications" },
    ],
  },
  ondo: {
    beforeAfter: [
      { label: "Institutional Leads", before: "No Korean institutional relationships, RWA thesis unknown locally", after: "50+ institutional leads generated via RWA seminars" },
      { label: "Korean Community", before: "Pre-launch, zero Korean community base", after: "100K+ Korean community members built around the RWA thesis" },
      { label: "Media Reach", before: "No Korean presence or media footprint", after: "5M+ total media reach, 1M+ educational content views" },
    ],
  },
  synfutures: {
    beforeAfter: [
      { label: "Gangnam OOH Reach", before: "No Korean brand presence, zero offline visibility", after: "5M+ billboard impressions in Gangnam" },
      { label: "Brand Awareness", before: "Unknown to Korean DeFi traders, pre-launch base", after: "+300% brand awareness lift" },
      { label: "Community Engagement", before: "No local community touchpoints", after: "4+ community AMAs in a 1-month campaign" },
    ],
  },
  spacecoin: {
    beforeAfter: [
      { label: "Korean Brand Awareness", before: "Pre-launch DePIN project, no Korean presence", after: "200K+ campaign impressions across Korean channels" },
      { label: "Korean Community", before: "Zero local community or ambassadors", after: "Korean community built from scratch via launch campaign" },
    ],
  },
};
