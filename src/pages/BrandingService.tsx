import { ShieldCheck, Scale, FileCheck2 } from "lucide-react";
import ServiceTemplate from "@/components/ServiceTemplate";

import featVaspImg from "@/assets/services/comp-vasp-travelrule.webp";
import featDisclosureImg from "@/assets/backgrounds/seoul-ddp-night.jpg";
import featIsmsImg from "@/assets/backgrounds/seoul-hanriver-twilight.jpg";
import auditImg from "@/assets/services/comp-audit.png";
import heroImg from "@/assets/backgrounds/seoul-gangnam-night.jpg";

const ACCENT = "#A855F7";

const BrandingService = () => (
  <ServiceTemplate
    accent={ACCENT}
    breadcrumb="Regulations & Compliance"
    seo={{
      title: "Korea Crypto Compliance, VASP & ISMS-P Advisory | ium Labs",
      description: "Korea crypto regulatory and security compliance advisory: VASP registration, ISMS-P certification readiness, PIPA data protection, AML and travel rule, and FSC / FSSC / KISA regulator-examination preparation, coordinated with licensed counsel and accredited auditors.",
      path: "/services/compliance",
      keywords: ["Korea crypto compliance", "VASP registration Korea", "ISMS-P certification Korea", "ISMS certification crypto", "KISA compliance", "FSC crypto Korea", "crypto security compliance Korea", "regulatory examination readiness Korea", "Virtual Asset User Protection Act", "PIPA crypto", "Korea AML crypto", "travel rule Korea"],
    }}
    schema={{ name: "Korea Regulations & Compliance Advisory", description: "Advisory on VASP registration, ISMS-P certification readiness, the Virtual Asset User Protection Act, PIPA data protection, AML, and FSC / KISA examination readiness for the Korean crypto market, coordinated with licensed counsel and accredited auditors.", serviceType: ["Regulatory Compliance Advisory", "VASP Registration", "ISMS-P Certification Readiness", "Data Protection Compliance", "AML Advisory"] }}
    hero={{
      eyebrow: "REGULATIONS & COMPLIANCE",
      titleLead: <>Navigate Korea's crypto<br />regulation and security regime</>,
      titleAccent: "with confidence.",
      lede: "Korea's framework is strict, examined, and fast-changing: VASP registration, the User Protection Act, PIPA, AML and the travel rule, and the ISMS-P security certification regulators actually test. We map what applies, ready you for FSC and KISA scrutiny, and coordinate licensed counsel and accredited auditors so you meet the rules, not stumble into them.",
      image: heroImg,
      primaryCta: { label: "Request a compliance review", href: "/contact" },
    }}
    stats={[{ v: "10+", l: "VASP Cases" }, { v: "ISMS-P", l: "Certification Ready" }, { v: "FSC·KISA", l: "Regulator Ready" }, { v: "VAUPA", l: "+ PIPA Ready" }]}
    reality={{
      heading: "Korea's crypto rules are complex",
      headingAccent: "and examined.",
      body: ["The Virtual Asset User Protection Act, PIPA, AML and travel-rule obligations, exchange listing disclosure, and the ISMS-P security certification stack into a regulatory maze most foreign projects and exchanges can't navigate alone. And unlike a one-time filing, ISMS-P is examined: annual IT security risk assessments, audit cycles, and a named, accountable owner who answers to KISA and the FSC.", "DeFi, NFT, token, and exchange operators each face different requirements, and the rules move quarterly, what was compliant six months ago may not be today. When the FSC, FSSC, or KISA come with questions, or during an examination or enforcement period, your security and data-protection narrative has to already be in order. We keep you mapped to the current framework and ready for review, coordinated with licensed Korean counsel and accredited auditors."],
    }}
    process={{
      heading: "From assessment to",
      headingAccent: "ongoing compliance.",
      steps: [
        { t: "WEEK 1, 2", title: "Assessment", body: "Map your project against the current Korean regulatory and security framework, VASP, VAUPA, PIPA, and ISMS-P. Identify which obligations apply and where the compliance and certification gaps are." },
        { t: "WEEK 2, 4", title: "Strategy", body: "Build a roadmap: documentation plan, ISMS-P gap-to-readiness sequencing, timeline, and the points where licensed counsel and accredited auditors must be engaged." },
        { t: "WEEK 4, 8", title: "Implementation", body: "Prepare documentation, run the ISMS-P readiness work, support filings, and coordinate with licensed local counsel, accredited auditors, and the relevant authorities." },
        { t: "ONGOING", title: "Monitoring", body: "Track regulatory change, run periodic compliance reviews, and advise as the rules evolve so updates are proactive, not reactive." },
      ],
    }}
    features={[
      { icon: ShieldCheck, eyebrow: "01 · Register", title: "VASP Registration & Licensing", body: "Korea's gateway is VASP registration with the KoFIU under the Specific Financial Information Act: ISMS certification, a real-name verified bank account, and a working AML program before you can operate. We map the full path and coordinate the mandatory travel-rule layer through Korea's two networks, VerifyVASP (Lambda256) and CODE (the Bithumb, Coinone, Korbit joint venture), so your filing is built the way regulators and partner exchanges expect.", points: ["KoFIU registration roadmap (Specific Financial Information Act)", "ISMS certification & real-name account guidance", "Travel-rule onboarding via VerifyVASP or CODE", "Coordinated with licensed Korean counsel"], image: featVaspImg },
      { icon: Scale, eyebrow: "02 · Advise", title: "Korean Legal Advisory & Opinions", body: "Korea's crypto rules ultimately turn on local law, and only a licensed Korean attorney can issue an opinion that exchanges and regulators will accept. We engage and coordinate vetted Korean law firms to secure the legal interpretations and formal opinions your project needs, from token and securities classification to the domestic legal opinion KRW exchanges require before they will list.", points: ["Engagement of licensed Korean law firms", "Token & securities legal-classification opinions", "Domestic legal opinion for KRW-exchange listing", "Ongoing regulatory interpretation as rules evolve"], image: featDisclosureImg },
      { icon: FileCheck2, eyebrow: "03 · Certify", title: "ISMS-P Certification & Regulator Readiness", body: "Korea's security regime is where crypto operators actually get tested. ISMS and ISMS-P certification is mandatory infrastructure, and it is examined, not filed and forgotten: annual IT security risk assessments and audit cycles owned by a named, accountable lead. We run the gap assessment, build the roadmap from gap to audit readiness, and coordinate the accredited consultants and the KISA certification process so it holds up under review. When the FSC, FSSC, or KISA come with questions, or during an examination or enforcement period, we help you assemble the security and data-protection narrative and the documentation regulators expect.", points: ["ISMS / ISMS-P gap assessment to audit readiness", "Annual IT security risk assessment support", "PIPA & KISA data-protection controls mapping", "FSC / FSSC / KISA examination readiness"], image: featIsmsImg },
    ]}
    promise={{
      heading: "We advise and coordinate.",
      headingMuted: "Licensed counsel decides the law.",
      do: ["Map the obligations that actually apply to your project and stage", "Ready your ISMS-P and security posture for audit and regulator examination", "Prepare and review the documentation each framework requires", "Coordinate filings, certifications, and opinions with licensed counsel and accredited auditors", "Track regulatory change and keep your compliance current"],
      dont: ["Offer legal advice in place of licensed counsel", "Issue certifications or legal opinions ourselves; accredited bodies and counsel do", "Promise regulatory outcomes we can't control", "Help you evade rules; we help you meet them"],
    }}
    deliverable={{ eyebrow: "THE DELIVERABLE", title: <>Compliance Readiness Audit&trade;</>, body: "Every engagement starts with a graded audit: which Korean obligations apply to your project, from VASP and VAUPA to PIPA and ISMS-P, where you currently stand against each, what is blocking compliance and certification, and the exact sequence to close the gaps, with the points where licensed counsel and accredited auditors must be engaged clearly flagged.", cta: "Request your audit", image: auditImg }}
    faq={{
      heading: "The questions founders actually ask.",
      sub: "Straight answers on VASP registration, ISMS-P certification, regulator examinations, and how Korea's framework applies to your project type.",
      items: [
        { q: "How long does VASP registration take?", a: "Assessment takes one to two weeks. Registration support typically runs four to eight weeks depending on your project's complexity and current compliance state. Timelines also depend on the authorities and on the licensed counsel coordinating the filing." },
        { q: "Can you help with ISMS or ISMS-P certification?", a: "We run the readiness side: a gap assessment against the ISMS-P controls, a roadmap from gap to audit readiness, and coordination with accredited consultants and the KISA process. The certification itself is issued by KISA through accredited bodies. Our role is getting you ready to pass and to hold up through the annual risk-assessment and audit cycle." },
        { q: "What if we're facing a regulator examination or enforcement period?", a: "We help you prepare: assembling the security and data-protection documentation, mapping your controls to what the FSC, FSSC, or KISA will ask, and readying the compliance narrative. During an examination, being organized and mapped to the current framework is most of the battle, and it is far cheaper to build that before the regulator calls than during." },
        { q: "Do you provide legal opinions?", a: "We do not give legal advice ourselves. Through our partnerships with licensed local counsel, formal legal opinions and regulatory submissions can be prepared and issued. Our role is the strategic advisory and documentation around that work, coordinated with the lawyers who own the legal conclusions." },
        { q: "Is compliance different for DeFi vs token projects?", a: "Yes, significantly. DeFi protocols, token issuers, NFT projects, and infrastructure providers each face different obligations. We map the specific regulatory framework that applies to your project type rather than applying a generic checklist." },
        { q: "How often do Korean regulations change?", a: "Quarterly updates are common, and the Virtual Asset User Protection Act has reshaped obligations recently. We provide ongoing monitoring and flag you when a change affects your compliance status, so updates are proactive rather than reactive surprises." },
      ],
    }}
  />
);

export default BrandingService;
