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

/**
 * Each project belongs to a type. Goals and solution blocks are templated per type
 * (exchanges are always about trading volume, etc.) so every project reads as a
 * type-appropriate case study without per-project authoring. A per-slug override in
 * caseStudyContent always wins (e.g. MANTRA's hand-written depth).
 */
type ProjectType = "exchange" | "dex" | "rwa" | "infra" | "ai" | "wallet" | "privacy" | "ip";

const projectTypes: Record<string, ProjectType> = {
  kucoin: "exchange",
  bybit: "exchange",
  synfutures: "dex",
  simpfor: "dex",
  ondo: "rwa",
  multipli: "rwa",
  mantra: "rwa",
  "bnb-chain": "infra",
  polygon: "infra",
  aptos: "infra",
  megaeth: "infra",
  fogo: "infra",
  stable: "infra",
  "sahara-ai": "ai",
  openledger: "ai",
  talus: "ai",
  tria: "wallet",
  world: "privacy",
  arcium: "privacy",
  goplus: "privacy",
  "story-protocol": "ip",
};

const typeContent: Record<ProjectType, { goals: string[]; solutions: { title: string; body: string }[] }> = {
  exchange: {
    goals: [
      "Drive real Korean trading volume, not vanity sign-ups.",
      "Pull traders away from the domestic incumbents, Upbit and Bithumb.",
      "Convert Korean attention into deposits and first trades.",
      "Build durable brand trust in a loyalty-driven market.",
    ],
    solutions: [
      { title: "KOL Marketing", body: "Korean CT and YouTube KOLs who actually move traders, briefed to drive sign-ups and first deposits rather than impressions." },
      { title: "Naver SEO", body: "Own the Korean search results for the brand and high-intent trading terms on Naver, the engine roughly 70% of Korea actually uses." },
      { title: "Paid Ads", body: "A full-funnel acquisition engine across crypto-friendly networks, optimized from install to sign-up to first deposit." },
      { title: "Trading campaigns & community", body: "Trading competitions and Korean community management that turn a first deposit into repeat volume." },
    ],
  },
  dex: {
    goals: [
      "Grow on-chain trading volume from Korean traders.",
      "Earn credibility for a foreign DEX in a CEX-dominated market.",
      "Educate Korean DeFi users on the protocol's edge.",
      "Build a self-sustaining Korean trading community.",
    ],
    solutions: [
      { title: "KOL Marketing", body: "DeFi- and perps-native Korean KOLs who actually trade, driving qualified on-chain users instead of passive reach." },
      { title: "Trading campaigns & community", body: "Trading competitions, Korean community management, and on-chain quests that convert curiosity into volume." },
      { title: "Naver SEO & Paid Ads", body: "Korean search presence and crypto-network ads tuned to high-intent DeFi traders." },
      { title: "PR & narrative", body: "Korean-language coverage that frames the DEX as the credible alternative to centralized venues." },
    ],
  },
  rwa: {
    goals: [
      "Establish institutional credibility for an RWA protocol in Korea.",
      "Open a pipeline of serious Korean allocators, not retail noise.",
      "Educate the market on compliant, yield-bearing RWA.",
      "Build trust with asset managers, regulators, and media.",
    ],
    solutions: [
      { title: "Institutional-first PR", body: "Features across Korean financial media that frame the protocol as institutional-grade, in the language allocators trust." },
      { title: "RWA education seminars", body: "Closed-door seminars that translate a compliance-heavy thesis into the terms Korean asset managers use to evaluate an allocation." },
      { title: "Asset-manager partnerships", body: "Warm, credentialed introductions to Korean asset-management firms and financial professionals." },
      { title: "Compliance & listing groundwork", body: "The disclosure and partner trust behind a credible Korean market presence and exchange listing." },
    ],
  },
  infra: {
    goals: [
      "Build ecosystem and developer mindshare in Korea.",
      "Grow an active, Korea-native community.",
      "Attract builders, partners, and capital into the ecosystem.",
      "Establish a durable narrative ahead of key milestones.",
    ],
    solutions: [
      { title: "KOL Marketing", body: "Korean KOLs across YouTube, X, and Naver who carry the ecosystem narrative to the right developer and trader audiences." },
      { title: "Community & events", body: "Always-on Korean community management plus hackathons and Korea Blockchain Week activations that bring out real builders." },
      { title: "PR & narrative", body: "Tier-1 Korean media coverage timed to mainnet, listing, and partnership milestones." },
      { title: "Naver SEO & content", body: "Korean-language docs, search presence, and content so the ecosystem is discoverable and credible." },
    ],
  },
  ai: {
    goals: [
      "Win mindshare in Korea's crowded AI x crypto narrative.",
      "Build a Korea-native developer and user community.",
      "Translate a technical thesis into a story Korea reacts to.",
      "Convert hype into durable community and partnerships.",
    ],
    solutions: [
      { title: "KOL Marketing", body: "AI-and-crypto Korean KOLs who can actually explain the thesis, driving credible mindshare on Korean CT and YouTube." },
      { title: "AMAs & community", body: "AMAs, KBW sessions, and always-on community management that build a real Korea-native following." },
      { title: "PR & narrative", body: "Korean media coverage that positions the project at the front of the AI x crypto conversation." },
      { title: "Naver SEO & content", body: "Korean-language content and search presence so the narrative is discoverable, not just briefly trending." },
    ],
  },
  wallet: {
    goals: [
      "Acquire real Korean wallet users, not one-time installs.",
      "Simplify onboarding for a Korean audience.",
      "Drive activation and retention, not vanity downloads.",
      "Build a community that compounds the user base.",
    ],
    solutions: [
      { title: "Paid Ads", body: "A full-funnel acquisition engine optimized from install to first on-chain action." },
      { title: "KOL Marketing", body: "Korean KOLs who walk audiences through onboarding, turning curiosity into activated wallets." },
      { title: "Community & quests", body: "Korean community management and on-chain quests that drive retention and word of mouth." },
      { title: "Naver SEO & content", body: "Korean search and content presence that makes the wallet the obvious local choice." },
    ],
  },
  privacy: {
    goals: [
      "Earn trust for a privacy- or security-first protocol in Korea.",
      "Educate the market on a complex technical promise.",
      "Build a credible Korea-native community and developer base.",
      "Meet Korean data-protection and compliance expectations.",
    ],
    solutions: [
      { title: "PR & narrative", body: "Tier-1 Korean coverage that frames the protocol around trust, safety, and compliance." },
      { title: "KOL Marketing", body: "Korean KOLs who can credibly explain a technical privacy or security thesis to a wary audience." },
      { title: "AMAs & community", body: "AMAs and community management that turn a hard-to-grasp promise into an engaged following." },
      { title: "Compliance-aware positioning", body: "Messaging aligned to Korean data-protection and regulatory expectations." },
    ],
  },
  ip: {
    goals: [
      "Onboard Korean creators and IP holders.",
      "Translate IP tokenization into terms creators understand.",
      "Build credibility with Korean content and entertainment players.",
      "Establish narrative leadership in IP x Web3.",
    ],
    solutions: [
      { title: "Creator workshops", body: "Hands-on Korean creator workshops that turn IP tokenization from abstract to actionable." },
      { title: "KOL Marketing", body: "Korean creator-economy KOLs who bring authentic reach into content communities." },
      { title: "PR & narrative", body: "Tier-1 Korean media that positions the protocol at the front of IP x Web3." },
      { title: "Community", body: "Korean community management that sustains creator engagement well beyond launch." },
    ],
  },
};

/** Per-slug override wins; otherwise fall back to the type template for goals/solutions. */
export function getCaseStudyContent(slug: string): CaseStudyContent {
  const override = caseStudyContent[slug] || {};
  const tpl = typeContent[projectTypes[slug]];
  return {
    ...override,
    goals: override.goals ?? tpl?.goals,
    solutions: override.solutions ?? tpl?.solutions,
  };
}
