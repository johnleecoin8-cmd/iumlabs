import { Gauge, Handshake, Activity, ShieldCheck } from "lucide-react";
import ServiceTemplate from "@/components/ServiceTemplate";

/* PLACEHOLDER IMAGES, swap for provided photos. */
import heroImg from "@/assets/services/liquidity-sizing.webp";
import f1 from "@/assets/services/liquidity-sizing.webp";
import f2 from "@/assets/services/liquidity-algorithm.webp";
import f3 from "@/assets/platforms/res-onchain.jpg";
import f4 from "@/assets/services/liquidity-compliance.png";
import delivImg from "@/assets/platforms/pr-analytics.jpg";

const ACCENT = "#00E0B8";

const LiquidityService = () => (
  <ServiceTemplate
    accent={ACCENT}
    breadcrumb="Market Making & Liquidity"
    seo={{
      title: "Crypto Market Making & Liquidity for Korea | ium Labs",
      description: "Exchange-grade order-book depth from listing day. Liquidity strategy and vetted market-maker coordination for Upbit, Bithumb, and global venues, compliant, never wash trading.",
      path: "/services/liquidity",
      keywords: ["crypto market making Korea", "liquidity provision crypto", "Upbit liquidity", "Bithumb market maker", "exchange liquidity Korea"],
    }}
    schema={{ name: "Crypto Liquidity & Market Making", description: "Liquidity strategy and vetted market-making coordination for crypto listings in Korea, Upbit, Bithumb, and global venues.", serviceType: ["Market Making", "Liquidity Provision", "Exchange Liquidity"] }}
    hero={{
      eyebrow: "MARKET MAKING & LIQUIDITY",
      titleLead: <>Launch into depth,</>,
      titleAccent: "not a vacuum.",
      lede: "A great listing into a thin order book is a failed listing. We architect your Korea liquidity strategy and coordinate vetted market-making desks for Upbit, Bithumb, and global venues, so your token opens into real depth and a tight spread, never fake volume.",
      image: heroImg,
      primaryCta: { label: "Get a liquidity plan", href: "/contact" },
    }}
    stats={[{ v: "Day 1", l: "Listing-Day Depth" }, { v: "CEX+DEX", l: "Venues Covered" }, { v: "Vetted", l: "MM Desk Partners" }, { v: "24/7", l: "Depth Monitoring" }]}
    strip={{ label: "Venue coverage", items: ["Upbit", "Bithumb", "Global CEX", "On-chain DEX"] }}
    reality={{
      heading: "A great listing into a thin book",
      headingAccent: "is a failed listing.",
      body: [
        "Korean exchanges and retail punish shallow liquidity. Wide spreads and a thin order book break price discovery on day one, exactly when attention and volatility peak. Most teams over-invest in the launch campaign and under-invest in the depth behind it.",
        "Liquidity is not an afterthought to GTM, it is part of it. We size the depth your listing actually needs, broker the right desks, and keep it honest: genuine order-book depth and tight spreads, structured to respect exchange rules and Korean market-manipulation enforcement. Never wash trading.",
      ],
    }}
    process={{
      heading: "From thin float to",
      headingAccent: "exchange-grade depth.",
      steps: [
        { t: "Phase I", title: "Liquidity Assessment", body: "Model depth, spread, and capital needs against your float, price, and target venues." },
        { t: "Phase II", title: "Desk Matching", body: "Match and broker terms with vetted market-making partners, aligned incentives, retainer-default." },
        { t: "Phase III", title: "Listing Setup", body: "Configure order-book depth and spread targets across CEX and DEX. Live and ready at T0." },
        { t: "Phase IV", title: "Monitor & Optimize", body: "Track depth, spread, and volume quality. Tune monthly with transparent reporting." },
      ],
    }}
    features={[
      { icon: Gauge, eyebrow: "01 · Size", title: "Liquidity Strategy & Sizing", body: "We model the order-book depth, spread targets, and capital your listing actually needs across Upbit, Bithumb, and global venues, sized to your float and price, not a generic template.", points: ["Depth & spread modeling per venue", "Capital requirement sizing", "Float-aware launch planning", "CEX + on-chain DEX coverage"], image: f1 },
      { icon: Handshake, eyebrow: "02 · Match", title: "Vetted Market-Maker Matching", body: "Access to reputable, compliance-forward market-making desks. We broker the terms and manage the relationship, real partners with aligned incentives, never anonymous bots.", points: ["Vetted desk shortlist (retainer-default)", "Terms negotiation & KPI setting", "Spread, depth, uptime contracts", "Live dashboard & reporting required"], image: f2 },
      { icon: Activity, eyebrow: "03 · Launch", title: "Listing-Day Depth", body: "Coordinated depth and spread management from the first candle, when Korean retail attention and volatility are highest. Ready at T0, not days later.", points: ["T0 order-book readiness", "Spread management at peak volatility", "Cross-venue coordination", "Post-listing depth maintenance"], image: f3 },
      { icon: ShieldCheck, eyebrow: "04 · Comply", title: "Compliance-Aware Structuring", body: "Liquidity programs structured to respect exchange rules and Korean regulation, coordinated with our compliance practice. Genuine depth and tight spreads, never fake volume or wash trading.", points: ["Exchange-rule-aligned structuring", "FSS market-manipulation awareness", "Transparent volume-quality reporting", "Never wash trading, ever"], image: f4 },
    ]}
    promise={{
      heading: "Real depth.",
      headingMuted: "Never fake volume.",
      do: ["Architect a venue-by-venue liquidity and depth strategy", "Broker vetted, compliance-forward market-making desks", "Coordinate listing-day depth across CEX and DEX", "Report volume quality, spread, and depth transparently"],
      dont: ["Make markets in-house with conflicting incentives", "Run wash trading, fake volume, or spoofing", "Use anonymous bots with no accountability", "Promise a price level, that's manipulation, not liquidity"],
    }}
    deliverable={{ eyebrow: "THE DELIVERABLE", title: <>Your Liquidity Plan&trade;</>, body: "A venue-by-venue model of the depth, spread targets, and capital your listing needs, plus the shortlist of vetted desks and the terms to ask for. You walk into listing day knowing your book will hold.", cta: "Request your liquidity plan", image: delivImg }}
    faq={{
      heading: "The questions founders actually ask.",
      sub: "Straight answers on depth, desks, and what compliant market making really means.",
      items: [
        { q: "Do you make markets in-house?", a: "We start as a broker, architecting the strategy and connecting you with vetted, reputable desks, then managing the relationship and reporting. This keeps incentives aligned and avoids conflicts of interest. As our track record builds we internalize a desk, but transparency stays the rule." },
        { q: "How much liquidity does an Upbit or Bithumb listing need?", a: "It depends on your float, price, and target spread. We model it per project, most serious KRW-pair listings require meaningful committed depth across both order books to hold a tight spread through launch volatility." },
        { q: "Is this compliant? Do you do volume or wash trading?", a: "No. We structure liquidity to respect exchange rules and Korean market-manipulation enforcement (the FSS is tightening this hard). We deliver genuine order-book depth and tight spreads, never fake volume, wash trading, or spoofing." },
        { q: "Which market-making model should we use?", a: "We default clients to the retainer / MMaaS model, you keep control and capital, pay a flat fee, and incentives stay aligned. The loan-plus-call-option model is cheaper up front but hands the desk your token's upside and has a history of abuse; we use it only for capital-constrained clients who accept the trade-offs." },
        { q: "Do you cover DEX liquidity too?", a: "Yes. We coordinate centralized order-book liquidity and on-chain DEX pool liquidity under one strategy, so depth holds wherever your token actually trades." },
      ],
    }}
  />
);

export default LiquidityService;
