import { ShieldCheck, Scale } from "lucide-react";
import ServiceTemplate from "@/components/ServiceTemplate";

import featVaspImg from "@/assets/services/comp-vasp-travelrule.webp";
import featDisclosureImg from "@/assets/services/comp-legal.png";
import auditImg from "@/assets/services/comp-audit.png";

/* Hero uses the homepage "main" compliance photo (public asset). */
const heroImg = "/images/posters/compliance-hero.avif";

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
      lede: "Korea's framework is strict and fast-changing: VASP registration, the User Protection Act, AML, and the travel rule. We map what applies and coordinate licensed Korean counsel so you meet the rules, not stumble into them.",
      image: heroImg,
      primaryCta: { label: "Request a compliance review", href: "/contact" },
    }}
    stats={[{ v: "10+", l: "VASP Cases" }, { v: "100%", l: "Compliance-First" }, { v: "VAUPA", l: "+ PIPA Ready" }, { v: "KR", l: "Counsel Network" }]}
    reality={{
      heading: "Korea's crypto rules are complex",
      headingAccent: "and fast-changing.",
      body: ["The Virtual Asset User Protection Act, PIPA, AML and travel-rule obligations, and exchange-specific listing disclosure stack into a regulatory maze most foreign projects and exchanges can't navigate alone.", "DeFi, NFT, token, and exchange operators each face different requirements, and the rules move quarterly, what was compliant six months ago may not be today. We keep you mapped to the current framework, not last year's, coordinated with licensed Korean counsel."],
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
      { icon: ShieldCheck, eyebrow: "01 · Register", title: "VASP Registration & Licensing", body: "Korea's gateway is VASP registration with the KoFIU under the Specific Financial Information Act: ISMS certification, a real-name verified bank account, and a working AML program before you can operate. We map the full path and coordinate the mandatory travel-rule layer through Korea's two networks, VerifyVASP (Lambda256) and CODE (the Bithumb, Coinone, Korbit joint venture), so your filing is built the way regulators and partner exchanges expect.", points: ["KoFIU registration roadmap (Specific Financial Information Act)", "ISMS certification & real-name account guidance", "Travel-rule onboarding via VerifyVASP or CODE", "Coordinated with licensed Korean counsel"], image: featVaspImg },
      { icon: Scale, eyebrow: "02 · Advise", title: "Korean Legal Advisory & Opinions", body: "Korea's crypto rules ultimately turn on local law, and only a licensed Korean attorney can issue an opinion that exchanges and regulators will accept. We engage and coordinate vetted Korean law firms to secure the legal interpretations and formal opinions your project needs, from token and securities classification to the domestic legal opinion KRW exchanges require before they will list.", points: ["Engagement of licensed Korean law firms", "Token & securities legal-classification opinions", "Domestic legal opinion for KRW-exchange listing", "Ongoing regulatory interpretation as rules evolve"], image: featDisclosureImg },
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
