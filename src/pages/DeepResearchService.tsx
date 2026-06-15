import { Map, Activity, BarChart3 } from "lucide-react";
import ServiceTemplate from "@/components/ServiceTemplate";

/* PLACEHOLDER IMAGES, swap for provided photos (update these 6 imports only). */
import heroImg from "@/assets/services/deep-research-blog.jpg";
import featMappingImg from "@/assets/services/dr-market-mapping.png";
import featOnchainImg from "@/assets/services/dr-onchain.png";
import featCompetitorImg from "@/assets/platforms/res-competitor.jpg";
import reportImg from "@/assets/platforms/res-trend.jpg";

const ACCENT = "#F43F5E";

const DeepResearchService = () => (
  <ServiceTemplate
    accent={ACCENT}
    breadcrumb="Deep Research"
    seo={{
      title: "Korea Crypto Market Research & Intelligence | ium Labs",
      description: "Data-backed Korean market intelligence. On-chain analytics, competitor landscapes, and investor-grade reports for strategic entry into the world's third largest crypto market.",
      path: "/services/deep-research",
      keywords: ["Korea Crypto Research", "Web3 Market Intelligence", "on-chain analytics Korea", "crypto competitor analysis", "Korea market entry research", "Upbit premium analysis"],
    }}
    schema={{ name: "Korea Deep Research", description: "Data-driven Korean market intelligence. On-chain analytics, competitor analysis, and investor-grade market reports for crypto projects entering Korea.", serviceType: ["Market Research", "On-chain Analytics", "Competitor Analysis"] }}
    hero={{
      eyebrow: "KOREA MARKET INTELLIGENCE",
      titleLead: <>Deep</>,
      titleAccent: "Research.",
      lede: "On-chain analytics, competitor analysis, and market ecosystem mapping for the world's third largest crypto market. Reports in Korean and English, distributed through our media network. Intelligence you cannot get from a dashboard.",
      image: heroImg,
      primaryCta: { label: "Commission a research report", href: "/contact" },
    }}
    stats={[{ v: "15+", l: "Reports Published" }, { v: "On-Chain", l: "+ Market Data" }, { v: "Korea", l: "Ecosystem Focus" }, { v: "DD", l: "& Thesis Grade" }]}
    reality={{
      heading: "Global research firms don't understand",
      headingAccent: "Korean crypto.",
      body: [
        "The Upbit premium, DC Inside sentiment, Naver search trends, KakaoTalk group dynamics, these signals are invisible to anyone not operating inside the ecosystem daily. Global research firms give you generic Asia-Pacific reports that lump Korea in with Japan and Southeast Asia.",
        "Korea is the third largest crypto market in the world. It deserves dedicated intelligence, not a footnote in a regional deck. Our research combines on-chain data with on-the-ground intelligence you cannot get from a dashboard.",
      ],
    }}
    types={{
      eyebrow: "WHAT WE COVER",
      heading: "Three lenses on the",
      headingAccent: "Korean market.",
      sub: "Every engagement blends the right mix of market, on-chain, and competitive intelligence for your stage and your questions, instead of a one-size-fits-all regional report.",
      cards: [
        { title: "Market Intelligence", body: "Complete Korean ecosystem mapping. Exchanges, KOLs, media outlets, communities, regulations, and retail attention flows. Understand the full landscape, TAM, and entry feasibility before you commit." },
        { title: "On-Chain Analytics", body: "Dune, Nansen, and Arkham data combined with Korea-specific signals. Wallet profiling, flow tracking, and protocol usage patterns unique to the Korean market, read by analysts who know what they mean." },
        { title: "Competitive Intelligence", body: "How competing protocols are positioned in Korea. K-Mindshare share-of-voice across Korean CT, Telegram, and Naver, mapped against KOL relationships, community size, and exchange presence." },
      ],
    }}
    process={{
      heading: "From question to",
      headingAccent: "actionable intelligence.",
      steps: [
        { t: "PHASE 1", title: "Discovery", body: "Define research objectives, scope, and key questions. Align on deliverable format and timeline before any data is pulled." },
        { t: "PHASE 2", title: "Analysis", body: "On-chain data collection, Korean media monitoring, community sentiment analysis, and expert interviews on the ground." },
        { t: "PHASE 3", title: "Creation", body: "Synthesize findings into investor-grade reports. Bilingual drafts reviewed by Korean market specialists for accuracy and nuance." },
        { t: "PHASE 4", title: "Distribution", body: "Publish through Korean media partners, KOL network, and client channels. Track reach and engagement across both languages." },
      ],
    }}
    features={[
      { icon: Map, eyebrow: "01 · Map", title: "Korean Market Mapping", body: "Before you enter, we map the entire Korean ecosystem against your category, exchanges, KOLs, media outlets, communities, and the regulations that shape them, so you see the full landscape rather than a regional summary.", points: ["Exchange, KOL & media landscape", "Community and retail attention flows", "Regulatory and DAXA context", "TAM sizing & entry feasibility"], image: featMappingImg },
      { icon: Activity, eyebrow: "02 · Trace", title: "On-Chain & Wallet Profiling", body: "We combine Dune, Nansen, and Arkham data with Korea-specific signals, then have analysts who operate in the market daily read the wallets, flows, and protocol usage patterns that a generic dashboard will never surface.", points: ["Wallet profiling & cohort analysis", "Flow tracking across CEX and DeFi", "Protocol usage patterns in Korea", "Upbit premium & KRW flow signals"], image: featOnchainImg },
      { icon: BarChart3, eyebrow: "03 · Benchmark", title: "Competitor Share-of-Voice", body: "Deep-dive into how competing protocols are positioned in Korea. K-Mindshare tracking across Korean CT, Telegram, and Naver measures real-time share-of-voice, mapped against KOL relationships, community size, and narrative strengths.", points: ["K-Mindshare share-of-voice tracking", "Competitor KOL & community mapping", "Exchange presence benchmarking", "Narrative and positioning gaps"], image: featCompetitorImg },
    ]}
    deliverable={{ eyebrow: "THE DELIVERABLE", title: <>Korea Market Intelligence Report&trade;</>, body: "Every engagement produces a bilingual, investor-grade report: the on-chain data, the competitive landscape, and the on-the-ground intelligence that answer your question, structured for both your Korean stakeholders and your international investors.", cta: "Commission your report", image: reportImg }}
    faq={{
      heading: "The questions founders actually ask.",
      sub: "Straight answers on timelines, languages, distribution, and custom scope.",
      items: [
        { q: "How long does a typical research report take?", a: "Market entry thesis reports take 3-4 weeks. Competitor decks and tokenomics reviews take 2-3 weeks. Monthly trend reports are delivered on a recurring schedule." },
        { q: "Are reports delivered in both Korean and English?", a: "Yes. All reports are produced bilingually. The Korean version is optimized for local distribution, while the English version is structured for international stakeholders and investors." },
        { q: "How do you distribute the research?", a: "Through our network of 12+ Korean media partners and KOL relationships. Reports are published as articles, thread summaries, and newsletter features for maximum reach." },
        { q: "Can you produce custom research on specific topics?", a: "Absolutely. Most of our work is custom-scoped. Whether it's a specific competitor deep-dive, regulatory analysis, or community sentiment study, we tailor every engagement." },
      ],
    }}
  />
);

export default DeepResearchService;
