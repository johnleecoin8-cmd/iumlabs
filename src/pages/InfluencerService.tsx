import { Star, Users, TrendingUp, Target, Sparkles } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import { usePageMeta } from "@/hooks/usePageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";

const ACCENT_COLOR = "#F59E0B";

const breadcrumbItems = [
  { name: "Home", url: "https://iumlabs.io" },
  { name: "Services", url: "https://iumlabs.io/services" },
  { name: "Influencer Marketing", url: "https://iumlabs.io/services/influencer" }
];

const serviceTags: ServiceTag[] = [
  { label: "Global KOL" },
  { label: "Korean KOL" },
  { label: "Campaign Strategy" },
  { label: "Content Coordination" },
  { label: "Performance Tracking" },
  { label: "Korean YouTubers/Bloggers" },
];

const stats: ServiceStat[] = [
  { value: 70, label: "KOL Network", suffix: "+" },
  { value: 15, label: "Total Reach", suffix: "M+" },
  { value: 15, label: "Campaigns Delivered", suffix: "+" },
  { value: 4, label: "Avg Engagement", suffix: "x" },
];

const processSteps: ProcessStep[] = [
  { 
    number: "01", 
    title: "Discovery", 
    description: "Identify ideal KOL profiles matching your project's narrative and target audience.", 
    icon: Target 
  },
  { 
    number: "02", 
    title: "Outreach", 
    description: "Negotiate terms, align on messaging, and coordinate campaign timelines.", 
    icon: Users 
  },
  { 
    number: "03", 
    title: "Activation", 
    description: "Launch coordinated content across platforms with real-time monitoring.", 
    icon: TrendingUp 
  },
  { 
    number: "04", 
    title: "Amplification", 
    description: "Analyze performance and optimize for maximum reach and engagement.", 
    icon: Sparkles 
  },
];

const deliverables: Deliverable[] = [
  {
    title: "KOL Selection",
    items: [
      "Curated KOL shortlist",
      "Audience analysis report",
      "Engagement rate verification",
      "Brand fit assessment",
    ],
  },
  {
    title: "Campaign Management",
    items: [
      "Messaging & brief creation",
      "Content approval workflow",
      "Posting schedule coordination",
      "Real-time monitoring",
    ],
  },
  {
    title: "Reporting & Analytics",
    items: [
      "Campaign performance report",
      "ROI analysis",
      "Audience insights",
      "Recommendations for scale",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Do you have a Korean KOL network?",
    answer: "Yes, we have a network of 50+ Korean crypto KOLs specializing in DeFi, NFT, trading, and research. We also connect you with bilingual Korean/English KOLs.",
  },
  {
    question: "Do you work with Korean YouTubers and bloggers?",
    answer: "Absolutely. We have an influencer network on Korean local platforms including Naver Blog, YouTube crypto channels, and Tistory. This enables effective content distribution for Korean SEO.",
  },
  {
    question: "What's the typical KOL campaign budget?",
    answer: "Budgets vary by KOL tier and campaign scope. Micro-influencer campaigns start from $5K, while multi-KOL launches can range $100K+. We recommend optimal combinations based on your goals.",
  },
  {
    question: "How do you measure campaign performance?",
    answer: "We track impressions, engagement rate, follower growth, website traffic, and community signups. For token projects, we also correlate with on-chain metrics like holder growth.",
  },
];


const InfluencerService = () => {
  usePageMeta({
    title: "Korea Crypto KOL Marketing & Web3 Influencer Agency",
    description: "Access top Korea Crypto KOLs and Web3 influencers. Our data-driven campaign management ensures high-impact marketing for DeFi, GameFi, and L2 projects.",
    path: "/services/influencer",
    image: "/og-image.png"
  });
  
  return (
    <ServicePageLayout
      serviceName="Influencer/KOL"
      serviceTitle="Access Our"
      serviceSubtitle="KOL Network"
      serviceDescription="Access our exclusive network of 70+ crypto KOLs and reach 15M+ engaged followers across X, YouTube, and Telegram."
      serviceIcon={Star}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      videoSrc="/videos/influencer-hero.mp4"
      posterSrc="/images/posters/influencer-hero.jpg"
      processSteps={processSteps}
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="influencer"
    >

      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema 
        name="Korean Crypto KOL Marketing"
        description="Access 70+ Korean and global crypto KOLs with 15M+ total reach. Korean Web3 marketing through strategic influencer campaigns."
        url="/services/influencer"
        serviceType={["KOL Marketing", "Influencer Marketing", "Crypto Marketing", "Web3 Marketing"]}
      />
    </ServicePageLayout>
  );
};

export default InfluencerService;