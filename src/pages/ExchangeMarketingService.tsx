import { Users, Target, TrendingUp } from "lucide-react";
import ServiceTemplate from "@/components/ServiceTemplate";

import heroImg from "@/assets/backgrounds/seoul-gangnam-night.jpg";
import featKolImg from "@/assets/services/kol-campaign.webp";
import featPaidImg from "@/assets/services/cex-paid-ads.webp";
import featOrganicImg from "@/assets/services/seo-naver.jpg";
import delivImg from "@/assets/platforms/res-market.jpg";

const ACCENT = "#2DD4BF";

const ExchangeMarketingService = () => (
  <ServiceTemplate
    accent={ACCENT}
    breadcrumb="Exchange Marketing"
    seo={{
      title: "Exchange Marketing for CEX & DEX in Korea | ium Labs",
      description: "Marketing built for crypto exchanges. We drive funded, repeat Korean traders for CEX and DEX through trading KOL affiliation, paid acquisition, and organic user growth, all measured in trading volume.",
      path: "/services/exchange-marketing",
      keywords: ["exchange marketing Korea", "CEX marketing", "DEX marketing", "crypto exchange user acquisition Korea", "trading KOL affiliate", "Korea crypto paid ads", "crypto trading volume Korea"],
    }}
    schema={{ name: "Exchange Marketing", description: "User acquisition and growth for crypto exchanges (CEX and DEX) in Korea: trading KOL affiliation, paid acquisition, and organic user growth, measured in trading volume.", serviceType: ["Exchange Marketing", "User Acquisition", "Affiliate Marketing", "Paid Advertising"] }}
    hero={{
      eyebrow: "EXCHANGE MARKETING",
      titleLead: <>Marketing built for<br />exchanges,</>,
      titleAccent: "measured in volume.",
      lede: "CEX or DEX, the only number that compounds is trading volume. We bring funded, repeat Korean traders through trading KOL affiliation, paid acquisition, and the organic growth that makes it last.",
      image: heroImg,
      primaryCta: { label: "Plan your exchange launch", href: "/contact" },
    }}
    stats={[{ v: "$150M+", l: "Trading Volume Driven" }, { v: "CEX + DEX", l: "Both Covered" }, { v: "Deposit", l: "Optimized Funnel" }, { v: "Organic", l: "Built to Compound" }]}
    strip={{ label: "Channels we run", items: ["Trading KOLs", "Affiliate & Referral", "Naver SEO", "Google Ads", "X Ads", "Coinzilla", "Community"] }}
    reality={{
      heading: "Exchanges don't need impressions.",
      headingAccent: "They need funded traders.",
      body: ["For a CEX or DEX, installs and sign-ups are vanity. The only metric that pays is trading volume, and in Korea that means converting attention into a funded account that trades, and trades again. Most campaigns spike reach and quietly die at the deposit step.", "Korea compounds it. Discovery runs on Naver, trust is conferred by trading KOLs, and the domestic incumbents own the default. Winning means a funnel built for deposits, not downloads, with organic growth underneath so volume holds long after the paid push stops."],
    }}
    process={{
      heading: "From first impression to",
      headingAccent: "repeat volume.",
      steps: [
        { t: "PHASE 1", title: "Audit & Funnel Map", body: "Map your acquisition funnel against Korean channels: where traders discover you, where they drop off, and the real cost per funded account." },
        { t: "PHASE 2", title: "KOL & Affiliate Setup", body: "Recruit trading KOLs onto a tracked affiliate and referral structure, briefed to drive sign-ups and deposits, not impressions." },
        { t: "PHASE 3", title: "Paid Launch", body: "Full-funnel paid acquisition across crypto-friendly networks, optimized from install to sign-up to first deposit." },
        { t: "PHASE 4", title: "Organic Compounding", body: "Naver SEO, community, and content that turn paid spikes into a durable, lower-cost organic base." },
      ],
    }}
    features={[
      { icon: Users, eyebrow: "01 · Affiliate", title: "Trading KOL Affiliation", body: "We recruit trading-native Korean KOLs onto a tracked affiliate and referral structure, the ones whose audiences actually trade, and brief them to drive sign-ups and first deposits. They are paid for the funded traders they bring, so incentives align with your volume instead of their impressions.", points: ["Trading-native Korean KOLs", "Tracked referral & affiliate links", "Briefed to sign-ups and deposits", "Paid on funded accounts, not reach"], image: featKolImg },
      { icon: Target, eyebrow: "02 · Paid", title: "Paid Ads", body: "A full-funnel paid acquisition engine for exchanges, run across the crypto-friendly networks most agencies can't get approved on. We target by exchange, region, demographic, and intent, and optimize the whole funnel, install to sign-up to first deposit, to cost per funded account rather than CPM.", points: ["Install, sign-up, first deposit funnel", "Certified crypto channels (Google, X, Coinzilla)", "Exchange, region & demographic targeting", "Optimized to cost per funded account"], image: featPaidImg },
      { icon: TrendingUp, eyebrow: "03 · Organic", title: "Organic User Growth", body: "The compounding layer most exchanges skip. Naver SEO for high-intent trading terms, Korean-language content, and community-led acquisition bring traders at near-zero marginal cost, and hold volume after the paid push ends. Organic is what turns a launch spike into a durable book of business.", points: ["Naver SEO for high-intent terms", "Community-driven acquisition", "Korean-language content engine", "Durable, low-CAC organic base"], image: featOrganicImg },
    ]}
    promise={{
      heading: "We optimize for volume.",
      headingMuted: "Not vanity metrics.",
      do: ["Measure backward from trading volume and funded accounts", "Run KOL, paid, and organic as one connected funnel", "Track every dollar to the deposit", "Build the organic layer so volume compounds"],
      dont: ["Sell you installs that never fund", "Report impressions as success", "Run channels in disconnected silos", "Burn budget on untracked KOL placements"],
    }}
    deliverable={{ eyebrow: "THE DELIVERABLE", title: <>Exchange Growth Plan&trade;</>, body: "Every engagement starts with a graded plan: your funnel today, the cost per funded account by channel, the trading-KOL and affiliate roster, and the exact paid plus organic sequence to grow Korean trading volume.", cta: "Request your growth plan", image: delivImg }}
    faq={{
      heading: "The questions exchanges actually ask.",
      sub: "Straight answers on CEX vs DEX, KOL affiliation, paid, and what really drives Korean volume.",
      items: [
        { q: "Do you work with both CEX and DEX?", a: "Yes. The metric is the same, trading volume, but the funnel differs. For a CEX we optimize install to sign-up to first deposit; for a DEX we drive on-chain users and wallet connections through trading KOLs and community. We tailor the funnel to your venue." },
        { q: "How is trading KOL affiliation different from regular KOL marketing?", a: "Regular KOL marketing buys reach. Trading KOL affiliation puts KOLs on a tracked referral structure so they are paid for the funded traders they actually bring, aligning their incentive with your volume rather than with impressions." },
        { q: "Why bother with organic if paid is faster?", a: "Paid stops working the moment you stop paying. Organic, Naver SEO, community, and content, acquires traders at near-zero marginal cost and holds volume after the paid push ends. It is the layer that turns a launch spike into a durable book of business." },
        { q: "How do you measure success?", a: "Cost per funded account, first-deposit conversion, and repeat-trade rate, all rolling up to trading volume. We do not report installs or impressions as outcomes." },
      ],
    }}
  />
);

export default ExchangeMarketingService;
