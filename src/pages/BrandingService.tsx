import { Shield } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import { usePageMeta } from "@/hooks/usePageMeta";
import SEOHead from "@/components/SEOHead";

const ACCENT_COLOR = "#8B5CF6";

const serviceTags: ServiceTag[] = [
  { label: "VASP Registration" },
  { label: "PIPA Compliance" },
  { label: "Regulatory Strategy" },
  { label: "Exchange Compliance" },
  { label: "AML/KYC Advisory" },
  { label: "Legal Landscape" },
];

const stats: ServiceStat[] = [
  { value: 19, label: "Projects Advised", suffix: "+" },
  { value: 100, label: "Compliance Rate", suffix: "%" },
  { value: 5, label: "Regulatory Frameworks", suffix: "" },
  { value: 24, label: "Response Time", suffix: "h" },
];

const deliverables: Deliverable[] = [
  {
    title: "Regulatory Analysis",
    items: [
      "Korean Virtual Asset Act (가상자산법) compliance assessment",
      "PIPA personal data protection strategy for biometric & user data",
      "Regulatory landscape report tailored to your project category",
    ],
  },
  {
    title: "Compliance Strategy",
    items: [
      "VASP registration guidance and documentation preparation",
      "Exchange listing compliance — Upbit, Bithumb, Coinone requirements",
      "AML/KYC framework recommendations for Korean market entry",
    ],
  },
  {
    title: "Ongoing Advisory",
    items: [
      "Regulatory update monitoring — real-time alerts on policy changes",
      "Government relations and industry association introductions",
      "Quarterly compliance health check and risk assessment",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Do you provide legal advice?",
    answer: "We work with Law Office Asset and Freeman Law — leading firms specializing in Korean blockchain and virtual asset regulations. Through these partnerships, we provide 1:1 consulting that covers both strategic advisory and formal legal guidance, all coordinated by our team.",
  },
  {
    question: "What Korean regulations apply to Web3 projects?",
    answer: "Key regulations include the Virtual Asset User Protection Act, PIPA (Personal Information Protection Act), and exchange-specific listing requirements. The regulatory landscape varies by project type — DeFi, NFT, and token projects each face different requirements.",
  },
  {
    question: "How long does VASP registration guidance take?",
    answer: "Our regulatory assessment takes 1-2 weeks. Full VASP registration support, including documentation preparation and application guidance, typically runs 4-8 weeks depending on project complexity.",
  },
];

const BrandingService = () => {
  usePageMeta({
    title: "Korea Crypto Regulations & Compliance Consulting | ium Labs",
    description: "Navigate Korea's crypto regulatory landscape with confidence. VASP registration, PIPA compliance, exchange listing requirements, and ongoing regulatory advisory.",
    path: "/services/compliance",
    image: "/og-image.png",
    keywords: ["Korea Crypto Regulations", "VASP Registration Korea", "PIPA Compliance", "Korea Blockchain Compliance", "Crypto Regulatory Advisory Korea"]
  });

  return (
    <>
    <SEOHead
      title="Korea Crypto Regulations & Compliance Consulting | ium Labs"
      description="Navigate Korea's crypto regulatory landscape. VASP registration guidance, PIPA compliance strategy, and exchange listing requirements for Web3 projects."
      path="/services/compliance"
      keywords={['Korea Crypto Regulations', 'VASP Registration', 'PIPA Compliance', 'Blockchain Compliance Korea']}
    />
    <ServicePageLayout
      serviceName="Regulations & Compliance"
      serviceTitle="Regulations"
      serviceSubtitle="& Compliance"
      serviceDescription="Korea's crypto regulations are complex and fast-changing. In partnership with Law Office Asset and Freeman Law, we provide 1:1 regulatory consulting — from VASP registration to exchange compliance, tailored to your project."
      serviceIcon={Shield}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      videoSrc=""
      posterSrc="/images/posters/compliance-hero.png"
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="compliance"
    />
    </>
  );
};

export default BrandingService;
