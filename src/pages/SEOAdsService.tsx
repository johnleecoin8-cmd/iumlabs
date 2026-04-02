import { Search, BarChart3, Target, Megaphone } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import { usePageMeta } from "@/hooks/usePageMeta";
import SEOHead from "@/components/SEOHead";

const ACCENT_COLOR = "#F59E0B";

const serviceTags: ServiceTag[] = [
  { label: "SEO Optimization" },
  { label: "Google Ads" },
  { label: "Twitter/X Ads" },
  { label: "Display Ads" },
  { label: "Retargeting" },
  { label: "Analytics" },
];

const stats: ServiceStat[] = [
  { value: 287, label: "Avg. Traffic Growth", suffix: "%" },
  { value: 19, label: "Campaigns Managed", suffix: "" },
  { value: 3.4, label: "Avg. ROAS", suffix: "x" },
  { value: 42, label: "Lower CPA Achieved", suffix: "%" },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Audit",
    description: "Comprehensive technical SEO audit and competitive analysis to identify opportunities.",
    icon: Search,
  },
  {
    number: "02",
    title: "Strategy",
    description: "Develop keyword strategy, audience targeting, and campaign structure for maximum impact.",
    icon: Target,
  },
  {
    number: "03",
    title: "Execute",
    description: "Launch optimized campaigns across Google, Twitter/X, and display networks with A/B testing.",
    icon: Megaphone,
  },
  {
    number: "04",
    title: "Optimize",
    description: "Continuous monitoring, bid optimization, and performance-based scaling strategies.",
    icon: BarChart3,
  },
];

const deliverables: Deliverable[] = [
  {
    title: "SEO That Works",
    items: [
      "Fixing the Engine: Technical SEO audits to make sure Google loves your site",
      "Content Strategy: We tell you exactly what to write to rank for the best keywords",
      "On-Page Polish: Making your existing pages work harder for you",
    ],
  },
  {
    title: "Ads That Convert",
    items: [
      "Multi-Platform: Expert setups on Google, Twitter/X, and YouTube",
      "Creative Edge: We design the ads, so you don't have to",
      "Retargeting: Bringing back the people who visited but didn't convert yet",
    ],
  },
  {
    title: "Clear Reporting",
    items: [
      "The Dashboard: A simple view of your ROI and key metrics",
      "Weekly Catch-ups: We tell you what's happening in plain English, no jargon",
      "Actionable Insights: Not just data, but what to do with it",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Where do you run the ads?",
    answer: "We focus on the big ones: Google, X (Twitter), Naver, Instagram and YouTube. We also tap into crypto-native networks like Coinzilla or Bitmedia if that's where your audience is hiding.",
  },
  {
    question: "How soon will we see results?",
    answer: "Ads start working almost instantly. SEO is more of a 'slow burn' but usually starts showing real momentum within 1 to 3 months.",
  },
  {
    question: "Do you handle the 'crypto-ban' on ad platforms?",
    answer: "Yes. We know the rules inside and out. We help you get the right certifications (like Google's crypto cert) to make sure your ads don't get blocked.",
  },
];

const SEOAdsService = () => {
  usePageMeta({
    title: "Korea Crypto SEO & Web3 Paid Ads Agency",
    description: "Dominate Korean search for crypto & Web3. +150% traffic growth through Naver & Google ads. Korea's specialist Web3 SEO and paid marketing agency.",
    path: "/services/seo-ads",
    image: "/og-image.png",
    keywords: ["Korea Web3", "Korea Crypto", "Korea Crypto Agency", "Crypto SEO Korea", "Naver Ads Web3", "Web3 Paid Marketing Korea"]
  });

  return (
    <>
    <SEOHead
      title="Web3 SEO & Paid Ads Korea | ium Labs"
      description="Performance-driven SEO and paid advertising for Web3 projects in Korea. Naver SEO, Google Ads, and crypto-native ad networks."
      path="/services/seo-ads"
      keywords={['Web3 SEO Korea', 'Crypto Paid Ads', 'Naver SEO Web3', 'Blockchain Advertising Korea']}
    />
    <ServicePageLayout
      serviceName="SEO & Paid Ads"
      serviceTitle="SEO &"
      serviceSubtitle="Paid Ads"
      serviceDescription="We drive real growth by putting your project in front of the right people. From search engine dominance to high-converting ads on X and Google—we make sure you're seen where it matters."
      serviceIcon={Search}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      videoSrc="/videos/seo-hero.mp4"
      posterSrc="/images/posters/seo-hero.jpg"
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="seo-ads"
    />
    </>
  );
};

export default SEOAdsService;
