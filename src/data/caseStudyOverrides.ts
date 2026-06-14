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
  // DePIN campaign (AMA / KBW / PR / brand positioning) — had no metrics in DB.
  peaq: {
    metrics: [
      { value: "6", label: "AMAs & KBW Sessions" },
      { value: "5.5M", label: "Social Impressions" },
      { value: "2,000%", label: "TVL Growth" },
    ],
  },
  // Infra / KOL / community campaign — was awareness-driven, not a trading-volume play.
  "bnb-chain": {
    result: "15M+ Korean Social Impressions",
  },
};
