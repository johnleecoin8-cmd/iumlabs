import { ClipboardCheck, FileText, Network, ShieldCheck } from "lucide-react";
import ServiceTemplate from "@/components/ServiceTemplate";

/* PLACEHOLDER IMAGES, swap for provided photos (update these 6 imports only). */
import heroImg from "@/assets/platforms/comp-exchange.jpg";
import featDiagnosisImg from "@/assets/platforms/comp-landscape.jpg";
import featDossierImg from "@/assets/platforms/comp-vasp.jpg";
import featRelationsImg from "@/assets/platforms/pr-interview.jpg";
import featMaintenanceImg from "@/assets/services/listing-liqmaint.webp";
import scorecardImg from "@/assets/services/listing-scorecard.webp";

const ACCENT = "#22D3EE";

const CandleMotif = () => (
  <svg viewBox="0 0 80 64" fill="none" aria-hidden="true" className="absolute right-6 sm:right-16 bottom-10 w-28 sm:w-44 h-auto opacity-50">
    <g stroke={ACCENT} strokeWidth="1.4">
      <line x1="12" y1="14" x2="12" y2="54" opacity="0.5" /><rect x="7" y="24" width="10" height="22" fill={ACCENT} fillOpacity="0.18" />
      <line x1="30" y1="8" x2="30" y2="50" opacity="0.7" /><rect x="25" y="16" width="10" height="20" fill={ACCENT} fillOpacity="0.32" />
      <line x1="48" y1="20" x2="48" y2="58" opacity="0.5" /><rect x="43" y="30" width="10" height="18" fill={ACCENT} fillOpacity="0.14" />
      <line x1="66" y1="4" x2="66" y2="44" opacity="0.85" /><rect x="61" y="10" width="10" height="22" fill={ACCENT} fillOpacity="0.45" />
    </g>
  </svg>
);

const ListingService = () => (
  <ServiceTemplate
    accent={ACCENT}
    motif={<CandleMotif />}
    breadcrumb="CEX Listing Advisory"
    seo={{
      title: "Crypto Exchange Listing Advisory, CEX, DEX & Hybrid | ium Labs",
      description: "We get crypto projects listed on the world's top exchanges, centralized, decentralized, and hybrid. Listing-readiness diagnosis, application packaging, legal-opinion coordination, and exchange relations, with native depth in Korea.",
      path: "/services/listing",
      keywords: ["crypto exchange listing", "CEX listing agency", "DEX listing", "token listing services", "Binance listing", "Upbit listing", "exchange listing advisory"],
    }}
    schema={{ name: "Crypto Exchange Listing Advisory", description: "Listing-readiness diagnosis, application packaging, legal-opinion coordination, and exchange relations for the world's top centralized, decentralized, and hybrid exchanges, with deep Korea expertise.", serviceType: ["Exchange Listing Advisory", "CEX Listing", "DEX Listing", "Token Listing Services"] }}
    hero={{
      eyebrow: "EXCHANGE LISTING ADVISORY",
      titleLead: <>Get listed on the<br />world's</>,
      titleAccent: "top exchanges.",
      lede: "A listing is the single biggest catalyst in a token's life. We prepare your project for the world's top centralized and decentralized exchanges, from Binance and Coinbase to Upbit and Uniswap, with the readiness, packaging, and relationships that turn an application into a yes. Deepest in Korea, fluent everywhere.",
      image: heroImg,
      primaryCta: { label: "Get a listing-readiness review", href: "/contact" },
    }}
    stats={[{ v: "CEX·DEX", l: "& Hybrid Venues" }, { v: "Global", l: "+ Native Korea Depth" }, { v: "#1", l: "Growth Catalyst" }, { v: "100%", l: "Compliance-First" }]}
    strip={{ label: "Listing coverage", items: ["Binance", "Coinbase", "OKX", "Bybit", "KuCoin", "Upbit", "Bithumb", "Coinone", "Korbit", "Gate", "Huobi", "BitMart", "Bitrue", "DigiFinex", "LAToken", "ProBit Global", "AscendEX", "CoinTiger", "LBank", "HitBTC", "WazirX", "Uniswap"] }}
    reality={{
      heading: "The best exchanges reject most applicants",
      headingAccent: "by design.",
      body: [
        "A listing is the single biggest catalyst in a token's life. It is also the hardest door to open: top centralized exchanges list a small fraction of who applies, and each one judges you on fundamentals, distribution, security, and legal standing before a single pair goes live.",
        "Getting in, and staying in, is a job. We make your project the strongest, fully-compliant applicant for the venues that matter, sequence which exchange to target and when, and manage the relationships and disclosures that keep you listed. Native depth in Korea's KRW market, reach across global CEX, DEX, and hybrid venues.",
      ],
    }}
    types={{
      eyebrow: "WHAT WE COVER",
      heading: "Every venue that moves",
      headingAccent: "your token.",
      sub: "Centralized, decentralized, or hybrid, we map the right mix and sequence for your stage, liquidity, and audience, instead of chasing logos.",
      cards: [
        { title: "Centralized Exchanges (CEX)", body: "Binance, Coinbase, OKX, Bybit, Upbit, Bithumb. The deepest liquidity, the widest retail reach, and the strongest credibility, behind the most rigorous review and the highest bar. Where most of your volume and trust will come from." },
        { title: "Decentralized Exchanges (DEX)", body: "Uniswap, PancakeSwap, and on-chain pools. Permissionless, fast to launch, fully self-custodied, ideal for early price discovery and community access. We design the pool, depth, and incentives so a DEX listing builds momentum instead of bleeding it." },
        { title: "Hybrid & Emerging Venues", body: "Order-book DEXs and hybrid platforms that pair CEX-grade liquidity with on-chain transparency. We help you decide when a hybrid venue is the right complement, and how to sequence it alongside your CEX and DEX strategy." },
      ],
    }}
    process={{
      heading: "From candidate to",
      headingAccent: "listed, and staying there.",
      steps: [
        { t: "8 WEEKS OUT", title: "Readiness Diagnosis", body: "Audit your project against each target exchange's real bar, fundamentals, distribution, security, and legal standing. Deliver a prioritized gap report." },
        { t: "6 WEEKS OUT", title: "Dossier & Legal Opinion", body: "Assemble and localize the application each venue expects; coordinate the securities or legal opinions specific jurisdictions require." },
        { t: "2 WEEKS OUT", title: "Submission & Relations", body: "Manage submission, timing, and the narrative with listing and research teams, and sequence CEX, DEX, and hybrid venues." },
        { t: "LISTING DAY", title: "Liquidity & Maintenance", body: "Coordinate listing-day depth, then stand up the disclosure and review cadence that keeps you listed." },
      ],
    }}
    features={[
      { icon: ClipboardCheck, eyebrow: "01 · Diagnose", title: "Listing-Readiness Diagnosis", body: "Before you apply anywhere, we audit your project against the real bar at each target venue, from a Tier-1 CEX's fundamentals review to Korea's DAXA best-practices, and hand you a prioritized gap report so nothing surprises a listing committee.", points: ["Per-exchange criteria & gap report", "Securities / legal-status exposure", "Tokenomics, unlock & distribution flags", "Security audit & documentation review"], image: featDiagnosisImg },
      { icon: FileText, eyebrow: "02 · Package", title: "Application Packaging & Legal Opinion", body: "We assemble and localize the full dossier top exchanges expect, and coordinate the securities or legal opinions specific markets require, including the domestic opinion Korea's KRW exchanges demand, through independent counsel.", points: ["Whitepaper, cap table & legal structure", "Technical & security audit packaging", "Jurisdiction-specific legal opinions", "Korean securities opinion (KR counsel)"], image: featDossierImg },
      { icon: Network, eyebrow: "03 · Place", title: "Exchange Relations & Venue Sequencing", body: "Warm, transparent introductions to listing and research teams across global and Korean venues, plus the strategy of which exchange to target first and how CEX, DEX, and hybrid listings should be sequenced.", points: ["Listing & research-team introductions", "CEX, DEX & hybrid sequencing", "Market & timing strategy", "Narrative and process management"], image: featRelationsImg },
      { icon: ShieldCheck, eyebrow: "04 · Sustain", title: "Liquidity & Maintenance", body: "A listing is the start, not the finish. We coordinate listing-day liquidity and the ongoing disclosure and review cadence that keeps you in good standing, and clear of caution-list or delisting risk.", points: ["Listing-day liquidity coordination", "Ongoing disclosure & IR cadence", "Maintenance-review readiness", "Multi-venue standing management"], image: featMaintenanceImg },
    ]}
    promise={{
      heading: "We make you the best applicant.",
      headingMuted: "The exchange makes the decision.",
      do: ["Make you the strongest, fully-compliant applicant at every target venue", "Coordinate the legal and securities opinions each market requires", "Open warm, transparent introductions to listing teams", "Coordinate liquidity and keep you listed after day one"],
      dont: ["Guarantee or buy a listing. Every exchange decides independently", "Pay exchanges or use unlicensed listing brokers", "Touch wash trading, fake volume, or post-listing pump schemes", "Pressure or author a legal opinion's conclusion"],
    }}
    deliverable={{ eyebrow: "THE DELIVERABLE", title: <>Listing Readiness Scorecard&trade;</>, body: "Every engagement starts with a graded scorecard: where you stand against each target exchange's criteria, what is blocking a yes, and the exact sequence to fix it, before a single application goes out.", cta: "Request your scorecard", image: scorecardImg }}
    faq={{
      heading: "The questions founders actually ask.",
      sub: "Straight answers on venues, timing, cost, and what really moves a listing committee.",
      items: [
        { q: "Which exchanges can you help us list on?", a: "Top centralized venues (Binance, Coinbase, OKX, Bybit and others), Korea's KRW exchanges (Upbit, Bithumb, Coinone, Korbit), and decentralized and hybrid venues. We help you choose the right mix and sequence for your stage, not just chase logos." },
        { q: "Can you guarantee a listing?", a: "No, and anyone who does is a red flag. Every exchange decides independently through its own review. What we guarantee is that you arrive as the strongest, fully-compliant, best-prepared applicant, with the right documentation and the right introductions." },
        { q: "How do you charge, and do you take a success fee on the listing?", a: "Retainer plus milestones for the advisory work. We never take a success fee tied to a listing outcome, a structure that invites bribery and fraud exposure and that exchanges blacklist. You pay for preparation and representation, not a decision we don't control." },
        { q: "CEX or DEX first?", a: "It depends on your stage, liquidity, and audience. A DEX listing can build early price discovery and community access fast; a Tier-1 CEX brings depth and credibility behind a much higher bar. We sequence them deliberately rather than rushing every venue at once." },
        { q: "What makes your Korea coverage different?", a: "Korea is the deepest retail market in crypto and the hardest gate, governed by DAXA self-regulation and a domestic securities-opinion requirement most agencies can't navigate. Native Korea depth is our edge, and we pair it with global reach so one partner covers your whole listing map." },
      ],
    }}
  />
);

export default ListingService;
