import { ClipboardCheck, FileText, Network, ShieldCheck } from "lucide-react";
import ServiceTemplate from "@/components/ServiceTemplate";

/* PLACEHOLDER IMAGES, swap for provided photos (update these 6 imports only). */
import heroImg from "@/assets/platforms/comp-exchange.jpg";
import featDiagnosisImg from "@/assets/platforms/comp-landscape.jpg";
import featDossierImg from "@/assets/platforms/comp-vasp.jpg";
import featRelationsImg from "@/assets/platforms/pr-interview.jpg";
import featMaintenanceImg from "@/assets/platforms/seo-analytics.jpg";
import scorecardImg from "@/assets/platforms/res-thesis.jpg";

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
      title: "Korean CEX Listing Advisory, Upbit, Bithumb, Coinone, Korbit | ium Labs",
      description: "Listing-readiness diagnosis, application packaging, securities legal-opinion coordination, and exchange relations for Korea's KRW-market exchanges. DAXA-aligned, compliance-first, we make you the strongest applicant. The exchange makes the decision.",
      path: "/services/listing",
      keywords: ["Korean exchange listing", "Upbit listing", "Bithumb listing", "CEX listing advisory Korea", "DAXA listing", "KRW market listing", "Coinone Korbit listing"],
    }}
    schema={{ name: "Korean CEX Listing Advisory", description: "Listing-readiness diagnosis, application packaging, securities legal-opinion coordination, and exchange relationship facilitation for Upbit, Bithumb, Coinone, and Korbit.", serviceType: ["Exchange Listing Advisory", "CEX Listing Korea", "Listing Readiness", "Regulatory Compliance"] }}
    hero={{
      eyebrow: "CEX LISTING ADVISORY",
      titleLead: <>Get listed on Korea's<br />exchanges.</>,
      titleAccent: "And stay listed.",
      lede: "The KRW market is the deepest retail liquidity in crypto, and the hardest gate. We make your project the strongest, fully-compliant applicant for Upbit, Bithumb, Coinone, and Korbit, and put you in front of the right people. The exchange decides; we make sure you deserve a yes.",
      image: heroImg,
      primaryCta: { label: "Get a listing-readiness review", href: "/contact" },
    }}
    stats={[{ v: "4", l: "KRW Exchanges" }, { v: "DAXA", l: "Best-Practices Aligned" }, { v: "25+", l: "Korea Market Entries" }, { v: "100%", l: "Compliance-First" }]}
    strip={{ label: "Listing coverage", items: ["Upbit", "Bithumb", "Coinone", "Korbit"] }}
    reality={{
      heading: "Listing demand vastly exceeds supply, and the rules just got",
      headingAccent: "much harder.",
      body: [
        "Each exchange decides its own listings through an independent review committee, not DAXA, and not any advisor. Since the 2024 Best-Practices framework and its 2025 overhaul, the bar has risen sharply: tougher criteria against post-listing pumps, meme-coin floods, and \"zombie coins,\" plus a quarterly maintenance review that means a listing is no longer permanent.",
        "The grey market of unlicensed \"listing brokers\" is illegal and prosecuted. The legitimate path is to be undeniably ready, a clean securities legal opinion, airtight tokenomics and disclosure, and a credible Korean representative managing the process. That is exactly what we build.",
      ],
    }}
    process={{
      heading: "From candidate to",
      headingAccent: "credible applicant.",
      steps: [
        { t: "8 WEEKS OUT", title: "Readiness Diagnosis", body: "Audit your project against the DAXA Best-Practices axes and each exchange's known criteria. Deliver a prioritized gap report." },
        { t: "6 WEEKS OUT", title: "Dossier & Legal Opinion", body: "Package and Korean-localize the application; coordinate the independent securities legal opinion through partner counsel." },
        { t: "2 WEEKS OUT", title: "Submission & Relations", body: "Manage submission, timing, and the market narrative with exchange listing and research teams." },
        { t: "LISTING DAY", title: "Maintenance & Disclosure", body: "Stand up the ongoing IR and disclosure cadence needed to survive quarterly maintenance review." },
      ],
    }}
    features={[
      { icon: ClipboardCheck, eyebrow: "01 · Diagnose", title: "Listing-Readiness Diagnosis", body: "Before you ever apply, we audit your project against the DAXA 거래지원 모범사례 axes and each exchange's real bar, then hand you a prioritized gap report so nothing surprises the review committee.", points: ["Securities-status & legal-opinion exposure", "Tokenomics, unlock & distribution red flags", "Disclosure, audit & AML documentation gaps", "Meme / zombie-coin risk screening"], image: featDiagnosisImg },
      { icon: FileText, eyebrow: "02 · Package", title: "Application Packaging & Legal Opinion", body: "We assemble and Korean-localize the full dossier exchanges expect, and coordinate the domestic securities legal opinion Upbit and Coinone require, through independent partner firms, never authored to order.", points: ["Whitepaper, cap table & legal structure", "Technical & security audit packaging", "가상자산 설명서 (mandatory disclosure)", "KR securities opinion (Kim & Chang, Yoon & Yang, Hwawoo)"], image: featDossierImg },
      { icon: Network, eyebrow: "03 · Place", title: "Exchange Relations & Market Sequencing", body: "Warm, transparent introductions to exchange listing and research teams, plus the strategy of which market to enter and when, sequenced around the windows that actually move Korean volume.", points: ["Listing & research-team introductions", "KRW vs BTC market sequencing", "Listing-window & catalyst timing (KBW)", "Back-and-forth and narrative management"], image: featRelationsImg },
      { icon: ShieldCheck, eyebrow: "04 · Sustain", title: "Maintenance-Review Compliance", body: "Since 2024, listing is no longer once-and-done. We build the disclosure and IR cadence that keeps you clear of caution-item (유의종목) designation and delisting at every quarterly review.", points: ["Quarterly maintenance-review readiness", "Ongoing disclosure & IR cadence", "Milestone & roadmap tracking", "Early-warning risk monitoring"], image: featMaintenanceImg },
    ]}
    promise={{
      heading: "We make you the best applicant.",
      headingMuted: "The exchange makes the decision.",
      do: ["Make you the strongest, best-prepared, fully-compliant applicant", "Coordinate an independent Korean securities legal opinion", "Open warm, transparent introductions to the right teams", "Keep you listed through quarterly maintenance review"],
      dont: ["Guarantee or \"buy\" a listing, the exchange decides, independently", "Pay exchanges or use unlicensed listing brokers (illegal in Korea)", "Touch wash trading, fake volume, or post-listing pump schemes", "Pressure or author the securities legal opinion's conclusion"],
    }}
    deliverable={{ eyebrow: "THE DELIVERABLE", title: <>Listing Readiness Scorecard&trade;</>, body: "Every engagement starts with a graded scorecard: where you stand against each exchange's criteria, what's blocking a yes, and the exact sequence to fix it, before a single application goes out.", cta: "Request your scorecard", image: scorecardImg }}
    faq={{
      heading: "The questions founders actually ask.",
      sub: "Straight answers on timing, cost, and what really moves a review committee, no sales spin.",
      items: [
        { q: "How long does a Korean listing actually take?", a: "There's no published SLA. Realistically it's weeks to months from a serious application to a decision, and most inquiries are filtered out in pre-screening before in-depth review even begins. Anyone promising a fixed listing date is a red flag, the timeline belongs to the exchange. We optimize how ready you are when the window opens." },
        { q: "What actually gets a project rejected?", a: "Most often: no clean Korean securities legal opinion, concentrated or opaque token distribution, thin disclosure, weak AML documentation, or no identifiable, accountable issuer. The 2024-2025 rules also screen hard for meme / zombie-coin profiles and post-listing pump risk. Our diagnosis surfaces every one of these before a committee ever sees you." },
        { q: "How do you charge, and do you take a success fee on the listing?", a: "Retainer plus milestones for the advisory work. We never take a success fee tied to a listing outcome, that structure is exactly what Korea's bribery and fraud cases have targeted, and it would put both of us at risk. You pay for expert preparation and representation, not for a decision we don't control." },
        { q: "We already have legal counsel and a market maker. Do you replace them?", a: "No, we coordinate them. We add the Korea-specific layer: the domestic securities opinion via partner firms, the localized dossier, exchange relationships, and a liquidity plan sized for KRW pairs. If you have global counsel or an MM desk we work alongside them; if you don't, we bring vetted partners." },
        { q: "What if the readiness review says we're not ready?", a: "Then we tell you plainly, and give you the exact sequence to fix it. Burning a first impression with a review committee is far more expensive than waiting a quarter to apply correctly. The scorecard exists so you apply when you can win, not when you're merely hopeful." },
        { q: "Which exchange should we target first?", a: "It depends on your profile. The KRW market (Upbit, Bithumb) holds the deep retail liquidity everyone wants but is the hardest gate; a BTC-pair listing can build a Korean trading history first. Each market is reviewed separately, so we sequence entries deliberately as part of your strategy." },
      ],
    }}
  />
);

export default ListingService;
