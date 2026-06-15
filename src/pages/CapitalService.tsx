import { Handshake, ArrowLeftRight, Vault } from "lucide-react";
import ServiceTemplate from "@/components/ServiceTemplate";

/* PLACEHOLDER IMAGES, swap for provided photos. */
import heroImg from "@/assets/services/capital-hero.webp";
import f1 from "@/assets/services/capital-vc.png";
import f2 from "@/assets/services/capital-otc.png";
import f3 from "@/assets/services/capital-custody.webp";
import delivImg from "@/assets/platforms/res-market.jpg";

const ACCENT = "#FBBF24";

const CapitalService = () => (
  <ServiceTemplate
    accent={ACCENT}
    breadcrumb="Capital & OTC Introduction"
    seo={{
      title: "Capital & OTC Introduction, Korean Crypto VCs, OTC & Custody | ium Labs",
      description: "Warm introductions to Korea's crypto capital network: VCs and strategic investors, licensed OTC desks, and institutional custody, plus fund-ready structuring. Introductions and structuring, not capital deployment.",
      path: "/services/capital",
      keywords: ["Korean crypto VC", "crypto OTC Korea", "crypto capital Korea", "institutional custody Korea", "Web3 fundraising Korea", "crypto OTC desk"],
    }}
    schema={{ name: "Capital & OTC Introduction", description: "Introductions to Korean crypto VCs, strategic investors, licensed OTC desks, and institutional custodians, plus offshore-entity and fund-ready structuring advisory.", serviceType: ["Capital Introduction", "OTC Introduction", "Investor Relations", "Fundraising Advisory"] }}
    hero={{
      eyebrow: "CAPITAL & OTC INTRODUCTION",
      titleLead: <>Open Korea's</>,
      titleAccent: "capital network.",
      lede: "Korea's real capital is relationship-gated and invisible from the outside. We open the door, warm introductions to crypto VCs, licensed OTC desks, and custody, plus the structuring to make you fund-ready.",
      image: heroImg,
      primaryCta: { label: "Request an introduction", href: "/contact" },
    }}
    stats={[{ v: "VC", l: "+ Strategic Investors" }, { v: "OTC", l: "Licensed Desks Only" }, { v: "Custody", l: "Institutional-Grade" }, { v: "KBW", l: "Deal-Ecosystem Access" }]}
    strip={{ label: "Network", items: ["Korean VC", "Strategic", "Licensed OTC", "Custody"] }}
    reality={{
      heading: "Korea's real capital is",
      headingAccent: "relationship-gated.",
      body: ["The deployable on-shore fiat pool is still constrained, corporate exchange trading only partially open, and unlicensed OTC a prosecuted crime. The capital that actually moves runs through crypto-native VCs, strategic arms, and licensed desks you can't cold-email your way into.", "We give you the warm introductions and structuring to be taken seriously: the right desks and funds, set up the right way. As Phase-2 regulation opens corporate participation, the relationships you build now become the capital you deploy later."],
    }}
    process={{
      heading: "Be fund-ready,",
      headingAccent: "then get introduced.",
      steps: [
        { t: "Phase I", title: "Readiness & Fit", body: "Assess your raise, structure, and stage; identify the right funds, desks, and custodians." },
        { t: "Phase II", title: "Structuring", body: "Advise on offshore entity, custody, and compliance so you present as investable." },
        { t: "Phase III", title: "Introductions", body: "Warm, curated introductions to VCs, strategic arms, OTC desks, and custodians." },
        { t: "Phase IV", title: "Ongoing Network", body: "Keep you in the deal ecosystem and positioned for Phase-2 corporate capital." },
      ],
    }}
    features={[
      { icon: Handshake, eyebrow: "01 · Introduce", title: "Korean VC & Strategic Introductions", body: "Warm intros to Korea's crypto-native funds and strategic corporate arms for token and equity rounds, the players who actually write checks and open ecosystems, not a cold list.", points: ["Crypto-native VC introductions", "Strategic / corporate-arm intros", "Token & equity round fit", "Curated, warm, never a cold blast"], image: f1 },
      { icon: ArrowLeftRight, eyebrow: "02 · Execute", title: "Licensed OTC Desk Connections", body: "Connections to VASP-registered OTC desks for compliant execution. Domestic desks broker crypto-to-crypto today and are positioned for crypto-to-cash as regulation opens. We never touch unlicensed OTC.", points: ["VASP-registered desks only", "Crypto-to-crypto execution today", "Positioned for crypto-to-cash", "Compliance-first routing"], image: f2 },
      { icon: Vault, eyebrow: "03 · Custody", title: "Institutional Custody Onboarding", body: "Onboarding to institutional-grade Korean custodians (bank-backed and independent), the plumbing every institutional allocation and treasury needs before it can move.", points: ["Bank-backed & independent custodians", "Institutional onboarding support", "Treasury-ready setup", "Security & compliance review"], image: f3 },
    ]}
    promise={{
      heading: "We connect and structure.",
      headingMuted: "We never deploy capital.",
      do: ["Make warm, curated introductions to the right capital", "Advise on fund-ready entity, custody & compliance structuring", "Connect you to VASP-registered OTC desks and custodians", "Keep you positioned for Phase-2 corporate capital"],
      dont: ["Deploy capital or guarantee an investment / a fill", "Facilitate corporate KRW crypto purchases the law doesn't yet allow", "Touch unlicensed, FIU-unregistered OTC (a prosecuted crime)", "Charge for an outcome we don't control"],
    }}
    deliverable={{ eyebrow: "THE DELIVERABLE", title: <>Capital Readiness Map&trade;</>, body: "A clear picture of who to talk to and how to be ready: the right funds, desks, and custodians for your stage, plus the structuring gaps to close before the first introduction goes out.", cta: "Request your readiness map", image: delivImg }}
    faq={{
      heading: "The questions founders actually ask.",
      sub: "Straight answers on what's brokerable in Korea today, and what isn't.",
      items: [
        { q: "Do you invest or guarantee fundraising?", a: "No. We are not a fund and we do not deploy capital. We provide warm introductions and fund-ready structuring, on an introduction basis, clearly separated from any investment outcome. We open doors; the capital decision is the investor's." },
        { q: "Can you help a Korean corporate buy crypto?", a: "Not in a way the law doesn't yet permit. Corporate on-exchange trading is only partially open in Korea, and we never facilitate unlicensed OTC, which is a criminal offense. We work strictly through licensed desks and compliant structures." },
        { q: "What kind of OTC can you actually arrange?", a: "Introductions to VASP-registered, licensed desks. Today domestic desks broker crypto-to-crypto; crypto-to-cash for corporates depends on regulation that is still opening. We position you for both, compliantly." },
        { q: "Why build these relationships now if corporate capital isn't fully open?", a: "Because the relationships and compliance scaffolding take time, and the firms that have them will be first to deploy when Phase-2 regulation and the Digital Asset Basic Act open the taps, plausibly within 2026, though timing is uncertain. Early positioning is the entire play." },
      ],
    }}
  />
);

export default CapitalService;
