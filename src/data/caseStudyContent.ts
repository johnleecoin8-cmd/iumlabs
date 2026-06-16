/**
 * Optional richer narrative per project, layered on top of the data in projectsData.
 * CaseStudyLayout falls back to the project's own fields (description / challenge /
 * whatWeDid / strategy / results) when a field here is absent, so every project gets a
 * complete long-form case study and curated ones (e.g. MANTRA) get hand-written depth.
 */
export interface CaseStudyContent {
  /** Big heading for the Client Overview (enables the two-column overview layout). */
  overviewHeading?: string;
  /** Overview paragraphs; falls back to project.description when absent. */
  overviewBody?: string[];
  /** "What the client needed" grid under The Challenge. */
  goals?: string[];
  /** Titled solution blocks under What We Did; falls back to project.strategy. */
  solutions?: { title: string; body: string }[];
  /** Client quote. */
  testimonial?: { quote: string; name: string; role: string };
}

export const caseStudyContent: Record<string, CaseStudyContent> = {
  mantra: {
    overviewHeading: "The security-first RWA Layer 1, entering Korea's most demanding capital market.",
    overviewBody: [
      "Mantra is the security-first RWA Layer 1, purpose-built to tokenize real-world assets with regulatory compliance at its core. Backed by partnerships across Middle Eastern sovereign wealth and major financial institutions, Mantra had already proven its model abroad.",
      "The next frontier was Korea, one of the most active and most demanding capital markets in Asia. Winning there meant earning institutional trust on Korean terms, not importing a foreign playbook.",
    ],
    goals: [
      "Establish institutional credibility in a market that had never heard the Mantra story.",
      "Open a pipeline of serious Korean allocators, not retail noise.",
      "Educate the market on compliant, security-first RWA.",
      "Secure a credible path to a Korean exchange listing.",
    ],
    solutions: [
      { title: "Institutional-first PR & narrative", body: "We secured features across major Korean financial media and reframed Mantra's Middle Eastern track record as proof of institutional-grade execution, the language Korean allocators actually trust." },
      { title: "RWA education seminars", body: "We hosted closed-door RWA seminars for Korean institutions, translating a complex, compliance-heavy thesis into the terms asset managers use to evaluate an allocation." },
      { title: "Asset-manager partnerships & networking", body: "We partnered with Korean asset-management firms and ran networking events with financial professionals, turning a cold market entry into warm, credentialed introductions." },
      { title: "Listing groundwork", body: "We built the relationships and documentation behind a Korean CEX listing, sequencing disclosure and partner trust so the listing landed as a milestone rather than a gamble." },
    ],
    testimonial: { quote: "Korean institutions don't move on hype. ium gave us the credibility, the rooms, and the media to be taken seriously, and the pipeline followed.", name: "Head of Marketing", role: "MANTRA" },
  },

  // Reused client voices (also shown on the homepage testimonials wall).
  peaq: { testimonial: { quote: "ium had us KBW-ready in three weeks, 6 AMAs, a real Korean community, zero bots. They don't hand you a list, they embed and run it.", name: "Martin", role: "CBO, peaq" } },
  kucoin: { testimonial: { quote: "$150M+ in Korean trading volume off one campaign cycle. They know every KOL, every Kakao group, every Naver play.", name: "Kevin L.", role: "CMO, KuCoin" } },
  tria: { testimonial: { quote: "30K Korean wallets in six months. They ran our UA like it was their own runway. gg.", name: "Sofia T.", role: "Founder, Tria" } },
  "bnb-chain": { testimonial: { quote: "A Seoul VIP night that opened institutional rooms we'd chased for a year. ium operates, it doesn't just advise.", name: "Marco B.", role: "Growth, BNB Chain" } },
  "sahara-ai": { testimonial: { quote: "The AMAs they ran during KBW were packed. 30K+ organic, Korea-native community, no bots, no filler.", name: "Hana K.", role: "Partnerships, Sahara AI" } },
  bybit: { testimonial: { quote: "Seoul Metro takeover plus a creator push, executed flawlessly. People in Korea still bring it up.", name: "Tom A.", role: "Head of Global BD, Bybit" } },
  ondo: { testimonial: { quote: "RWA is a hard sell anywhere. ium made it land with Korean institutions and retail at the same time.", name: "Leo M.", role: "CMO, Ondo Finance" } },
  megaeth: { testimonial: { quote: "Pre-TGE Korea positioning that actually moved mindshare. Sharp team, zero fluff.", name: "Priya N.", role: "Head of Growth, MegaETH" } },
  fogo: { testimonial: { quote: "From no Korea presence to a real launch moment. They embed like cofounders, not vendors.", name: "Diego F.", role: "Founder, FOGO" } },
  "story-protocol": { testimonial: { quote: "Our IP x Web3 story, localized perfectly for Korea, and tier-1 PR hits to back it. chapeau.", name: "Anya V.", role: "Growth Lead, Story Protocol" } },
  polygon: { testimonial: { quote: "Hackathons, KOLs, community, one team, one motion. Korea entry without adding headcount.", name: "Sam W.", role: "CMO, Polygon" } },
};
