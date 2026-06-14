import { Coins, PieChart, Lock, Zap } from "lucide-react";
import ServiceTemplate from "@/components/ServiceTemplate";

/* PLACEHOLDER IMAGES, swap for provided photos. */
import heroImg from "@/assets/services/tokenomics-allocation.svg";
import f1 from "@/assets/platforms/res-onchain.jpg";
import f2 from "@/assets/platforms/res-market.jpg";
import f3 from "@/assets/platforms/seo-report.jpg";
import f4 from "@/assets/platforms/res-thesis.jpg";
import delivImg from "@/assets/platforms/res-competitor.jpg";

const ACCENT = "#818CF8";

const TokenomicsService = () => (
  <ServiceTemplate
    accent={ACCENT}
    breadcrumb="Tokenomics"
    seo={{
      title: "Crypto Tokenomics Design for Korea | ium Labs",
      description: "Token supply, distribution, vesting, unlocks, utility, and FDV, engineered for how the Korean market actually behaves and built disclosure-ready for exchange review.",
      path: "/services/tokenomics",
      keywords: ["crypto tokenomics Korea", "token distribution design", "token unlock schedule", "token float planning", "FDV valuation crypto", "token utility design"],
    }}
    schema={{ name: "Tokenomics Design", description: "Token supply, distribution, vesting, unlock, utility, and FDV design tuned for the Korean retail market and built disclosure-ready for exchange listing review.", serviceType: ["Tokenomics Advisory", "Token Distribution Design", "Token Valuation"] }}
    hero={{
      eyebrow: "TOKENOMICS",
      titleLead: <>Token economics,</>,
      titleAccent: "built for Korea.",
      lede: "Korean retail trades the float and the unlock, not the whitepaper. We engineer your token's supply, distribution, vesting, utility, and valuation for how this market actually behaves, and build it disclosure-ready so it stands up to exchange review.",
      image: heroImg,
      primaryCta: { label: "Get a tokenomics review", href: "/contact" },
    }}
    stats={[{ v: "Float", l: "Sized for Price Discovery" }, { v: "Unlock", l: "Modeled vs Supply Shock" }, { v: "Utility", l: "Value-Accrual by Design" }, { v: "FDV", l: "Korea-Comparable Benchmarks" }]}
    reality={{
      heading: "The same token can moon or bleed, it's the",
      headingAccent: "float and the unlock.",
      body: [
        "Korean retail is unusually sensitive to circulating float and unlock schedules. A thin float spikes and then craters on the first cliff; a concentrated or opaque distribution is both a day-one price risk and, under the 2024-2025 rules, a delisting trigger. Get the supply structure wrong and even a flawless campaign bleeds out.",
        "And a token still has to be worth holding. Without real utility, value accrual, and a defensible FDV, the bid disappears once the launch noise fades. We design the whole economic structure, supply, unlocks, utility, and valuation, so the token holds up long after listing day.",
      ],
    }}
    process={{
      heading: "Supply, unlocks, and value, ",
      headingAccent: "designed for Korea.",
      steps: [
        { t: "Phase I", title: "Audit & Benchmark", body: "Review current tokenomics against Korean-market comparables and the new listing criteria." },
        { t: "Phase II", title: "Supply & Allocation", body: "Design distribution, float, and unlock schedules for healthy price discovery and disclosure-readiness." },
        { t: "Phase III", title: "Utility & Valuation", body: "Engineer value-accrual mechanics and benchmark FDV against Korean comparables." },
        { t: "Phase IV", title: "Disclosure Handoff", body: "Deliver disclosure-ready supply tables straight into the CEX listing dossier and GTM plan." },
      ],
    }}
    features={[
      { icon: Coins, eyebrow: "01 · Distribute", title: "Distribution & Allocation Design", body: "Allocation across team, investors, community, treasury, and liquidity, structured to read as credible to Korean retail and to pass the issuer-transparency and distribution scrutiny exchanges now apply.", points: ["Team / investor / community / treasury split", "Credible, defensible allocation logic", "Issuer-transparency alignment", "Distribution red-flag screening"], image: f1 },
      { icon: PieChart, eyebrow: "02 · Float", title: "Float & Circulating-Supply Planning", body: "How much circulating supply hits the book at launch, and how it grows. We size the initial float for healthy price discovery instead of a thin-float spike that craters on the first unlock.", points: ["Initial float sizing for price discovery", "Circulating-supply growth curve", "Liquidity-aware float planning", "Listing-day supply coordination"], image: f2 },
      { icon: Lock, eyebrow: "03 · Unlock", title: "Vesting & Unlock Scheduling", body: "Cliff and unlock schedules modeled against the Korean market's sensitivity to supply shocks, so unlocks land as non-events, not sell-side avalanches.", points: ["Cliff & linear unlock modeling", "Supply-shock impact analysis", "Investor / team alignment", "Unlock-event communication plan"], image: f3 },
      { icon: Zap, eyebrow: "04 · Accrue", title: "Utility, Value Accrual & FDV", body: "Why the token is worth holding, fees, staking, governance, burns, plus a launch valuation sanity-checked against Korean-market comparables, priced to leave upside for the market.", points: ["Demand sinks & value-accrual mechanics", "Emission & inflation modeling", "FDV benchmarking vs comparables", "Sustainable long-term incentive design"], image: f4 },
    ]}
    deliverable={{ eyebrow: "THE DELIVERABLE", title: <>Tokenomics Blueprint&trade;</>, body: "A disclosure-ready package: supply tables, vesting and unlock schedules, value-accrual mechanics, and an FDV benchmark, the exact structure your CEX listing dossier and your investors will ask for.", cta: "Request your blueprint", image: delivImg }}
    faq={{
      heading: "The questions founders actually ask.",
      sub: "Straight answers on supply, unlocks, utility, and how this fits the listing.",
      items: [
        { q: "How is this different from your CEX Listing Advisory?", a: "Tokenomics designs the token's economic structure, supply, distribution, unlocks, utility, and valuation. CEX Listing Advisory handles the exchange-facing process, readiness, application packaging, the securities legal opinion, KRW-vs-BTC sequencing, and relations. Tokenomics produces the disclosure-ready supply tables the listing application needs; the two hand off cleanly but don't overlap." },
        { q: "Do you redesign existing tokenomics or only new launches?", a: "Both. For pre-launch projects we design from scratch; for live tokens we optimize float, unlock cadence, and value-accrual mechanics ahead of a Korea entry. The goal is a structure that survives Korean retail behavior and the new exchange criteria." },
        { q: "Why does the Korean market need its own tokenomics view?", a: "Korean retail is unusually sensitive to float and unlocks, and the 2024-2025 listing rules explicitly penalize concentrated distribution and post-listing pumps. A globally 'fine' structure can still misfire here, both on price and on listing eligibility." },
        { q: "Do you cover utility and valuation, not just supply tables?", a: "Yes. Supply design is necessary but not sufficient. We engineer real demand sinks and value-accrual mechanics, and we sanity-check launch FDV against Korean-market comparables so the token has a reason to be held after the launch noise fades." },
      ],
    }}
  />
);

export default TokenomicsService;
