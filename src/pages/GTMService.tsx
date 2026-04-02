import { Rocket, Search, Building, Zap, TrendingUp } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SEOHead from "@/components/SEOHead";

const serviceTags: ServiceTag[] = [
  { label: "Market Analysis" },
  { label: "Brand Positioning" },
  { label: "Exchange Strategy" },
  { label: "Community Setup" },
  { label: "KOL Activation" },
  { label: "Launch Execution" },
];

const stats: ServiceStat[] = [
  { value: 19, label: "Projects Launched", suffix: "+" },
  { value: 7, label: "Token Sales Value", prefix: "$", suffix: "M+" },
  { value: 170, label: "KOL Network", suffix: "+" },
  { value: 70, label: "Events Hosted", suffix: "+" },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Analyze",
    description: "Deep market intelligence: competitor SOV analysis, on-chain wallet profiling, and gap mapping to find your unique positioning in the Korean market.",
    icon: Search,
  },
  {
    number: "02",
    title: "Build",
    description: "Korea-fit narrative design, local ecosystem integration (Naver/Kakao), and 24/7 community infrastructure setup across Telegram, Discord, and KakaoTalk.",
    icon: Building,
  },
  {
    number: "03",
    title: "Launch",
    description: "Coordinated activation: tier-1 media coverage (BlockMedia, CoinNess, CoinDesk Korea), verified KOL deployment, and viral campaign execution.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Scale",
    description: "Exchange liquidity & listing support (Upbit, Bithumb), strategic partnerships, offline activations in Seoul, and user retention programs.",
    icon: TrendingUp,
  },
];

const deliverables: Deliverable[] = [
  {
    title: "Market Intelligence",
    items: [
      "Competitive landscape & SOV report",
      "On-chain wallet behavior analysis",
      "Market opportunity mapping",
      "Regulatory compliance guidance",
    ],
  },
  {
    title: "Launch Package",
    items: [
      "Korea-fit brand narrative",
      "Community infrastructure (TG, Discord, KakaoTalk)",
      "KOL campaign strategy & execution",
      "Media coverage plan (BlockMedia, CoinDesk Korea)",
    ],
  },
  {
    title: "Growth & Scale",
    items: [
      "Exchange listing strategy (Upbit, Bithumb)",
      "Offline event production in Seoul",
      "Ambassador program setup",
      "Monthly performance analytics & reporting",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What makes Korean GTM different from other markets?",
    answer: "Korea is a trust-first, retail-driven market. Projects need native Korean community managers, localized narratives, and relationships with local KOLs — not translated global campaigns. We handle all of this in-house from our Seoul office.",
  },
  {
    question: "How long does a typical Korea launch take?",
    answer: "A focused launch can go live in 2-3 weeks. A full GTM engagement typically runs 2-3 months covering analysis, community build, KOL activation, PR, and exchange strategy.",
  },
  {
    question: "Do you help with Korean exchange listings?",
    answer: "Yes. We have direct relationships with Korean exchanges including Upbit, Bithumb, Coinone, and GOPAX. We handle application support, documentation, compliance guidance, and post-listing marketing.",
  },
  {
    question: "What's the minimum budget for Korea GTM?",
    answer: "Retainers typically start at $15K/month for focused campaigns. Full-stack GTM engagements covering PR, community, KOL, events, and exchange strategy usually fall in the $30K–$50K/month range.",
  },
];

const GTMService = () => {
  return (
    <>
      <SEOHead
        title="Korea Web3 GTM Strategy | Go-To-Market Agency | ium Labs"
        description="Full-stack Go-To-Market strategy for Web3 projects entering Korea. Market analysis, brand positioning, and actionable GTM roadmaps."
        path="/services/gtm"
        keywords={['Korea Web3 GTM', 'Go-To-Market Korea', 'Web3 Market Entry Korea', 'Crypto GTM Strategy', 'Korea Market Analysis']}
      />
      <ServicePageLayout
        serviceName="GTM Strategy"
        serviceTitle="Korea Market Entry"
        serviceSubtitle="Strategy & Execution"
        serviceDescription="We plan and execute your complete Go-To-Market strategy for the Korean crypto market. From competitive analysis to exchange listing, community setup to KOL activation — one partner for full market entry."
        serviceIcon={Rocket}
        serviceTags={serviceTags}
        stats={stats}
        accentColor="#10B981"
        currentSlug="gtm"
        processSteps={processSteps}
        deliverables={deliverables}
        faqItems={faqItems}
      />
    </>
  );
};

export default GTMService;
