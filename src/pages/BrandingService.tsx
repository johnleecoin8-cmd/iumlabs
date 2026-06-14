import { ShieldCheck, FileCheck, Lock, ClipboardCheck } from "lucide-react";
import ServiceTemplate from "@/components/ServiceTemplate";

/* PLACEHOLDER IMAGES, swap for provided photos (update these 6 imports only). */
import heroImg from "@/assets/services/compliance-hero.avif";
import featVaspImg from "@/assets/platforms/comp-vasp.jpg";
import featProtectionImg from "@/assets/platforms/comp-aml.jpg";
import featPipaImg from "@/assets/platforms/comp-pipa.jpg";
import featDisclosureImg from "@/assets/platforms/comp-exchange.jpg";
import auditImg from "@/assets/platforms/comp-landscape.jpg";

const ACCENT = "#A855F7";

const BrandingService = () => (
  <ServiceTemplate
    accent={ACCENT}
    breadcrumb="Regulations & Compliance"
    seo={{
      title: "Korea Crypto Regulation & VASP Compliance Advisory | ium Labs",
      description: "Navigate Korea's crypto regulation with confidence. Advisory on VASP registration, the Virtual Asset User Protection Act, PIPA data compliance, AML, and listing disclosure, coordinated with licensed local counsel.",
      path: "/services/compliance",
      keywords: ["Korea crypto compliance", "VASP registration Korea", "Virtual Asset User Protection Act", "PIPA crypto", "Korea AML crypto", "travel rule Korea", "crypto regulatory advisory Korea"],
    }}
    schema={{ name: "Korea Regulations & Compliance Advisory", description: "Advisory on VASP registration, the Virtual Asset User Protection Act, PIPA data compliance, AML, and listing disclosure for the Korean crypto market, coordinated with licensed local counsel.", serviceType: ["Regulatory Compliance Advisory", "VASP Registration", "Data Protection Compliance", "AML Advisory"] }}
    hero={{
      eyebrow: "REGULATIONS & COMPLIANCE",
      titleLead: <>Navigate Korea's crypto<br />regulation</>,
      titleAccent: "with confidence.",
      lede: "Korea's framework is strict, layered, and fast-changing: VASP registration, the Virtual Asset User Protection Act, PIPA, AML, and the travel rule. We map what applies to you, prepare the documentation, and coordinate with licensed local counsel so you meet the rules instead of stumbling into them.",
      image: heroImg,
      primaryCta: { label: "Request a compliance review", href: "/contact" },
    }}
    stats={[{ v: "10+", l: "VASP Cases" }, { v: "100%", l: "Compliance-First" }, { v: "VAUPA", l: "+ PIPA Ready" }, { v: "KR", l: "Counsel Network" }]}
    reality={{
      heading: "Korea's crypto rules are complex",
      headingAccent: "and fast-changing.",
      body: [
        "The Virtual Asset User Protection Act, PIPA personal-data requirements, AML and travel-rule obligations, and exchange-specific listing disclosure stack into a regulatory maze that most global projects cannot navigate alone.",
        "DeFi, NFT, and token projects each face different requirements. What worked for an L1 will not work for a DeFi protocol, and the rules move quarterly: what was compliant six months ago may not be today. We keep your project mapped to the current framework, not last year's.",
      ],
    }}
    process={{
      heading: "From assessment to",
      headingAccent: "ongoing compliance.",
      steps: [
        { t: "WEEK 1, 2", title: "Assessment", body: "Map your project against the current Korean regulatory framework. Identify which obligations apply and where the compliance gaps are." },
        { t: "WEEK 2, 4", title: "Strategy", body: "Build a compliance roadmap: documentation plan, sequencing, timeline, and the points where licensed counsel must be engaged." },
        { t: "WEEK 4, 8", title: "Implementation", body: "Prepare documentation, support filings, and coordinate with licensed local counsel and the relevant authorities." },
        { t: "ONGOING", title: "Monitoring", body: "Track regulatory change, run periodic compliance reviews, and advise as the rules evolve so updates are proactive, not reactive." },
      ],
    }}
    features={[
      { icon: ShieldCheck, eyebrow: "01 · Register", title: "VASP Registration & Licensing", body: "We support Korean Virtual Asset Service Provider registration end to end: scoping what applies to your model, preparing the documentation set, and coordinating filings and follow-up with the relevant authorities through licensed local counsel.", points: ["Scope and applicability assessment", "Documentation preparation and review", "Filing support with authorities", "Coordination with licensed counsel"], image: featVaspImg },
      { icon: FileCheck, eyebrow: "02 · Protect", title: "User-Protection Act Compliance", body: "The Virtual Asset User Protection Act sets obligations around user-asset segregation, reserves, disclosure, and unfair-trading controls. We map your duties under the Act and help build the internal procedures and records that demonstrate them.", points: ["User-asset segregation and reserves review", "Disclosure obligation mapping", "Unfair-trading and abuse controls", "Internal procedure and record design"], image: featProtectionImg },
      { icon: Lock, eyebrow: "03 · Secure", title: "PIPA & Data Compliance", body: "Handling Korean users means handling Korean personal data under PIPA. We assess your data flows, consent and cross-border transfer practices, and AML and travel-rule data obligations, then help close the gaps with documented controls.", points: ["Personal-data flow and consent review", "Cross-border transfer practices", "AML and travel-rule data obligations", "Documented controls and policies"], image: featPipaImg },
      { icon: ClipboardCheck, eyebrow: "04 · Disclose", title: "Listing & Disclosure Compliance", body: "Korean exchanges and DAXA self-regulation set a high bar for listing and ongoing disclosure. We help prepare the diligence and disclosure documentation exchanges expect and keep your reporting current to stay clear of caution-list risk.", points: ["Listing diligence documentation", "DAXA best-practice alignment", "Ongoing disclosure and reporting cadence", "Caution-list and delisting risk review"], image: featDisclosureImg },
    ]}
    promise={{
      heading: "We advise and coordinate.",
      headingMuted: "Licensed counsel decides the law.",
      do: ["Map the obligations that actually apply to your project and stage", "Prepare and review the documentation each framework requires", "Coordinate filings and formal opinions with licensed local counsel", "Track regulatory change and keep your compliance current"],
      dont: ["Offer legal advice in place of licensed counsel", "Promise regulatory outcomes we can't control", "Cut corners on AML or disclosure", "Help you evade rules; we help you meet them"],
    }}
    deliverable={{ eyebrow: "THE DELIVERABLE", title: <>Compliance Readiness Audit&trade;</>, body: "Every engagement starts with a graded audit: which Korean obligations apply to your project, where you currently stand against each, what is blocking compliance, and the exact sequence to close the gaps, with the points where licensed counsel must be engaged clearly flagged.", cta: "Request your audit", image: auditImg }}
    faq={{
      heading: "The questions founders actually ask.",
      sub: "Straight answers on VASP registration, timing, legal opinions, and how Korea's framework applies to your project type.",
      items: [
        { q: "How long does VASP registration take?", a: "Assessment takes one to two weeks. Registration support typically runs four to eight weeks depending on your project's complexity and current compliance state. Timelines also depend on the authorities and on the licensed counsel coordinating the filing." },
        { q: "Do you provide legal opinions?", a: "We do not give legal advice ourselves. Through our partnerships with licensed local counsel, formal legal opinions and regulatory submissions can be prepared and issued. Our role is the strategic advisory and documentation around that work, coordinated with the lawyers who own the legal conclusions." },
        { q: "Is compliance different for DeFi vs token projects?", a: "Yes, significantly. DeFi protocols, token issuers, NFT projects, and infrastructure providers each face different obligations. We map the specific regulatory framework that applies to your project type rather than applying a generic checklist." },
        { q: "How often do Korean regulations change?", a: "Quarterly updates are common, and the Virtual Asset User Protection Act has reshaped obligations recently. We provide ongoing monitoring and flag you when a change affects your compliance status, so updates are proactive rather than reactive surprises." },
      ],
    }}
  />
);

export default BrandingService;
