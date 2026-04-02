import { Palette } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import { usePageMeta } from "@/hooks/usePageMeta";
import SEOHead from "@/components/SEOHead";

const ACCENT_COLOR = "#8B5CF6";

const serviceTags: ServiceTag[] = [
  { label: "Brand Identity" },
  { label: "Logo Design" },
  { label: "Web Development" },
  { label: "UI/UX Design" },
  { label: "Design System" },
  { label: "Motion Graphics" },
];

const stats: ServiceStat[] = [
  { value: 14, label: "Brands Delivered", suffix: "" },
  { value: 21, label: "Websites Launched", suffix: "" },
  { value: 3.5, label: "Avg. Project Duration", suffix: " Weeks" },
  { value: 98, label: "Client Satisfaction", suffix: "%" },
];

const deliverables: Deliverable[] = [
  {
    title: "Brand Identity",
    items: [
      "The Basics: Logo kit (Primary, Secondary, Icons)",
      "The Vibe: Color palettes, gradients, and custom fonts",
      "The Rules: A simple Brand Guideline PDF so your team stays on track",
    ],
  },
  {
    title: "Website & Tech",
    items: [
      "Design: Fully responsive and interactive layouts",
      "Development: Clean code, fast loading, and SEO-ready",
      "Web3 Ready: Easy wallet connections and smooth animations",
    ],
  },
  {
    title: "Ongoing Support",
    items: [
      "Launch Assist: We're with you through go-live and beyond",
      "Quick Fixes: Fast turnaround on minor updates",
      "Growth Ready: Easy to scale as your project evolves",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What's in the branding package?",
    answer: "Everything you need to look professional: logos, colors, fonts, and a guidebook on how to use them. We can also scale up to full visual systems if you're going big.",
  },
  {
    question: "Do you build websites from scratch?",
    answer: "Always. No generic templates here. We build custom sites that are optimized for speed and specifically designed for your project's goals.",
  },
  {
    question: "How long does the whole process take?",
    answer: "Our standard program runs 4 weeks from kickoff to launch. Need it faster? We can discuss rush options depending on your timeline.",
  },
];

const BrandingService = () => {
  usePageMeta({
    title: "Korea Web3 Branding & Crypto Design Agency",
    description: "Korea's premier Web3 branding agency. Crypto-native design, UI/UX, and visual identity services that resonate with Korean investors and global audiences.",
    path: "/services/branding",
    image: "/og-image.png",
    keywords: ["Korea Web3", "Korea Crypto", "Korea Web3 Marketing", "Web3 Branding Korea", "Crypto Design Agency Korea"]
  });

  return (
    <>
    <SEOHead
      title="Web3 Branding & Website Design Korea | ium Labs"
      description="Professional branding and website design for Web3 projects targeting the Korean market. Logo, identity, and landing pages."
      path="/services/branding"
      keywords={['Web3 Branding Korea', 'Crypto Website Design', 'Blockchain Branding Seoul', 'Web3 Landing Page']}
    />
    <ServicePageLayout
      serviceName="Branding & Website"
      serviceTitle="Brand"
      serviceSubtitle="& Website"
      serviceDescription="We build standout identities and ultra-fast websites for Web3 teams. From your first logo to a fully custom site, we handle the heavy lifting so you can focus on scaling."
      serviceIcon={Palette}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      videoSrc="/videos/branding-hero.mp4"
      posterSrc="/images/posters/branding-hero.jpg"
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="branding"
    />
    </>
  );
};

export default BrandingService;
