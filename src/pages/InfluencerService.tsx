import { Search, Mic2, BarChart3, Users } from "lucide-react";
import ServiceTemplate from "@/components/ServiceTemplate";

import heroImg from "@/assets/services/kol-avatars.webp";
import ytImg from "@/assets/platforms/kol-youtube.jpg";
import ctImg from "@/assets/services/kol-campaign.webp";
import perfImg from "@/assets/services/kol-performance.png";
import naverImg from "@/assets/services/kol-multiplatform.png";
import fraudImg from "@/assets/services/kol-roster.webp";

const ACCENT = "#FACC15";

const InfluencerService = () => (
  <ServiceTemplate
    accent={ACCENT}
    breadcrumb="KOL Marketing"
    seo={{
      title: "Korea Crypto KOL Marketing & Influencer Agency | ium Labs",
      description: "Data-driven Korean crypto KOL and influencer marketing campaigns. Rigorous fraud filtering, ROI tracking, and localized content for Web3 networks across YouTube, X, Telegram, and Naver.",
      path: "/services/influencer",
      keywords: ["Korea KOL Marketing", "Korean Crypto Influencer", "crypto influencer agency", "Web3 KOL campaign", "YouTube crypto Korea", "Korean crypto Twitter", "Naver blog crypto"],
    }}
    schema={{ name: "Korea KOL & Influencer Marketing", description: "230+ vetted Korean KOLs across YouTube, X, Telegram, and Naver. Managed campaigns with fraud filtering and ROI tracking.", serviceType: ["KOL Marketing", "Influencer Marketing", "Crypto Marketing"] }}
    hero={{
      eyebrow: "KOL & INFLUENCER MARKETING",
      titleLead: <>We don't hand you a list.<br />We run the</>,
      titleAccent: "entire campaign.",
      lede: "230+ vetted Korean KOLs across YouTube, X, Telegram, and Naver. We don't just hand you a list, we run the entire campaign, with fraud filtering and ROI tracking on every placement.",
      image: heroImg,
      primaryCta: { label: "Plan a KOL campaign", href: "/contact" },
    }}
    stats={[{ v: "230+", l: "Vetted Korean KOLs" }, { v: "4", l: "Platforms Covered" }, { v: "0%", l: "Fake Follower Tolerance" }, { v: "Weekly", l: "Performance Reports" }]}
    reality={{
      eyebrow: "THE PROBLEM",
      heading: "Korean KOL marketing is",
      headingAccent: "broken by default.",
      body: ["Most agencies hand you a list and vanish, full of inflated follower counts, recycled audiences, and KOLs who post once and forget you exist. For a token launch or an exchange's user push, that's budget burned with nothing to show.", "Korea compounds it. The KOL map is split across YouTube, X, Telegram, and Naver Blog, each with its own culture, rates, and fraud patterns, and an account that's S-tier on Korean CT can be invisible on Naver. Picking right takes someone who lives in it daily."],
    }}
    types={{
      eyebrow: "KOL TIERS",
      heading: "The right tier for",
      headingAccent: "the right objective.",
      sub: "We map each tier to a job: anchor the narrative, validate the thesis, amplify reach, or seed the grassroots. Most launches blend all four.",
      cards: [
        { title: "S-Tier · Sentiment Anchors", body: "30K+ followers, but reach isn't the point: these are the few accounts Korean CT actually reacts to. When one covers a token, the quote-tweets and Telegram forwards follow within the hour. Used sparingly, at the moments that set a narrative: listing day, a major partnership, the first impression that sticks." },
        { title: "A-Tier · Sector Authorities", body: "10K+ followers, deep in one thesis: DeFi, DePIN, RWA, or AI x crypto. Smaller rooms, far higher conviction. Their coverage reads as diligence, not promotion, and the comment sections do real work for your credibility." },
        { title: "B-Tier · Reach Amplifiers", body: "5K to 10K followers, fast-rising and genuinely engaged. The cost-efficient layer that carries a narrative across timelines after the anchors set it, turning one thread into sustained, multi-day coverage." },
        { title: "C-Tier · Grassroots Layer", body: "1K to 5K followers, authentic micro-accounts seeded during launch windows. Real people posting in their own voice, the ground-up momentum that makes a narrative feel lived-in rather than announced." },
      ],
    }}
    process={{
      heading: "From brief to",
      headingAccent: "live campaign in 10 days.",
      steps: [
        { t: "DAY 1-3", title: "KOL Selection", body: "Analyze your protocol, shortlist 10 to 20 KOLs with verified data. You approve the final roster." },
        { t: "DAY 3-5", title: "Brief & Negotiate", body: "Custom briefs per KOL. Rate negotiation. Content format alignment. Contract locked." },
        { t: "DAY 5-8", title: "Content & QC", body: "KOLs draft. We review, revise, verify. You approve. Scheduling confirmed." },
        { t: "DAY 8-10+", title: "Launch & Track", body: "Multi-platform launch. Real-time monitoring. Weekly reports. Mid-campaign optimization." },
      ],
    }}
    features={[
      { icon: Search, eyebrow: "01 · Source", title: "KOL Sourcing & Vetting", body: "We identify the right KOLs for your narrative, token stage, and target audience. Every KOL is verified with real engagement data: follower analysis, historical performance, and fraud screening.", points: ["Narrative and token-stage fit", "Real engagement and follower analysis", "Historical performance review", "Zero-tolerance fraud screening"], image: ytImg },
      { icon: Mic2, eyebrow: "02 · Design", title: "Campaign Design & Briefing", body: "Custom briefs per KOL tailored to their style and audience. We align messaging with your GTM narrative. No copy-paste, every placement feels native.", points: ["Per-KOL custom briefs", "Messaging aligned to your GTM", "Native-feeling placements", "Format tuned per platform"], image: ctImg },
      { icon: BarChart3, eyebrow: "03 · Track", title: "Performance Tracking", body: "Weekly reports with impressions, engagements, and click-throughs. We compare KOL-by-KOL performance and rotate underperformers mid-campaign.", points: ["Weekly performance reports", "Impressions, engagement, click-throughs", "KOL-by-KOL comparison", "Mid-campaign rotation of laggards"], image: perfImg },
      { icon: Users, eyebrow: "04 · Reach", title: "Multi-Platform Reach", body: "Korea's KOL landscape is fragmented across four platforms, each with its own culture. We orchestrate coverage so your narrative lands where your audience actually lives.", points: ["YouTube long-form and Shorts", "X (Korean CT) thread campaigns", "Telegram community seeding", "Naver Blog search authority"], image: naverImg },
    ]}
    promise={{
      heading: "Real KOLs. Real engagement.",
      headingMuted: "Real numbers.",
      do: ["Vet every KOL with real engagement and fraud data", "Match the tier and platform to your actual objective", "Write native briefs and review every placement before it goes live", "Report impressions, engagement, and click-throughs every week"],
      dont: ["Sell you an inflated follower list", "Use bots or fake engagement", "Run copy-paste placements", "Hide performance behind vanity metrics"],
    }}
    deliverable={{ eyebrow: "THE DELIVERABLE", title: <>KOL Roster & Campaign Plan&trade;</>, body: "Every engagement starts with a vetted roster: the right KOLs for your stage and narrative, each with verified engagement data, tier, and platform, plus the custom briefs and timeline that turn names on a list into a campaign that ships.", cta: "Request your roster", image: fraudImg }}
    faq={{
      heading: "The questions founders actually ask.",
      sub: "Straight answers on vetting, budget, content, speed, and language.",
      items: [
        { q: "How do you vet KOLs for fake followers?", a: "We analyze follower growth patterns, engagement ratios, comment authenticity, audience geography, and historical performance. Our false-positive rate is under 2%." },
        { q: "What's the minimum budget for a KOL campaign?", a: "A focused B-tier campaign on Korean CT starts at ~$5K. Multi-platform S-tier campaigns run $25K to $50K+. We design packages to fit your budget." },
        { q: "Do you handle content creation or just distribution?", a: "Both. We write briefs and talking points, KOLs create in their voice, we review and approve everything before it goes live." },
        { q: "How fast can you launch a campaign?", a: "10 business days standard. For urgent listing-day support, we can accelerate to 5 days with our rapid-deploy roster." },
        { q: "Can you run English-language KOL campaigns?", a: "Our core is Korean-language KOLs. For global campaigns, we partner with trusted agencies and coordinate bilingual execution." },
      ],
    }}
  />
);

export default InfluencerService;
