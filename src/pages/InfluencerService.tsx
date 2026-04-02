import { Star, Users, TrendingUp, Target, Sparkles } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import { usePageMeta } from "@/hooks/usePageMeta";
import SEOHead from "@/components/SEOHead";

const ACCENT_COLOR = "#F59E0B";

const serviceTags: ServiceTag[] = [
  { label: "Global KOL" },
  { label: "Korean KOL" },
  { label: "Campaign Strategy" },
  { label: "Content Coordination" },
  { label: "Performance Tracking" },
  { label: "Korean YouTubers/Bloggers" },
];

const stats: ServiceStat[] = [
  { value: 83, label: "Verified KOL Network", suffix: "" },
  { value: 22.5, label: "Total Combined Reach", suffix: "M" },
  { value: 36, label: "Campaigns Executed", suffix: "" },
  { value: 4.7, label: "Avg. Engagement Rate", suffix: "%" },
];

const processSteps: ProcessStep[] = [
  { 
    number: "01", 
    title: "Discovery", 
    description: "We find the KOLs who speak your language and share your audience.", 
    icon: Target 
  },
  { 
    number: "02", 
    title: "Outreach", 
    description: "We handle the negotiations and align everyone on the mission.", 
    icon: Users 
  },
  { 
    number: "03", 
    title: "Activation", 
    description: "Content goes live across X, YouTube, and Telegram with real-time monitoring.", 
    icon: TrendingUp 
  },
  { 
    number: "04", 
    title: "Amplification", 
    description: "We analyze the wins and optimize for maximum lasting impact.", 
    icon: Sparkles 
  },
];

const deliverables: Deliverable[] = [
  {
    title: "Smart Selection",
    items: [
      "The Shortlist: We don't just send a list; we curate a selection of KOLs who actually fit your project's vibe",
      "Vibe Check: We verify engagement rates and audience quality to make sure you're not paying for bots",
    ],
  },
  {
    title: "Full Management",
    items: [
      "Narrative Shaping: We help craft the messaging so the content feels organic, not like a scripted ad",
      "Coordination: We handle the outreach, the brief, and the posting schedule so you don't have to manage 20 different DM threads",
    ],
  },
  {
    title: "Data & Analytics",
    items: [
      "Performance Reports: See exactly how your campaign performed with clear ROI and engagement data",
      "Scaling Tips: We tell you which creators worked best and how to double down for the next round",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Do you have a specialized Korean KOL network?",
    answer: "Yes. Beyond the global names, we have deep ties with Korea's top crypto YouTubers, Telegram alpha callers, and Naver bloggers who dominate the local scene.",
  },
  {
    question: "What's the budget for a KOL campaign?",
    answer: "It varies. We can run anything from a targeted 'micro-KOL' blitz to a massive campaign with top-tier influencers. We'll help you build a plan that fits your goals.",
  },
  {
    question: "How do you measure success?",
    answer: "We look at more than just likes. We track reach, engagement quality, and sentiment to make sure people are actually talking about your project in a positive way.",
  },
  {
    question: "Is the content organic?",
    answer: "We prioritize authenticity. We work with KOLs who actually like your tech, so their threads and videos feel like a natural part of the conversation.",
  },
];

const InfluencerService = () => {
  usePageMeta({
    title: "Korea Crypto KOL & Web3 Influencer Marketing Agency",
    description: "Access 70+ elite Korean crypto KOLs with 15M+ total reach. Korea's top Web3 influencer marketing agency for DeFi, GameFi, and L2 projects.",
    path: "/services/influencer",
    canonicalPath: "/services/influencer",
    image: "/og-image.png",
    keywords: ["Korea Web3", "Korea Crypto", "Korea Crypto Agency", "Korean KOL Network", "Crypto Influencer Korea", "Web3 KOL Marketing Korea"]
  });

  return (
    <>
    <SEOHead
      title="Korean Crypto KOL & Influencer Marketing | ium Labs"
      description="Access 500+ vetted Korean crypto KOLs across YouTube, Twitter, Telegram, and Naver. Campaign management with ROI tracking."
      path="/services/influencer"
      keywords={['Korean KOL Marketing', 'Crypto Influencer Korea', 'Web3 KOL Network', 'Korean Crypto YouTube', 'Blockchain Influencer Marketing']}
    />
    <ServicePageLayout
      serviceName="Influencer/KOL"
      serviceTitle="Influencer &"
      serviceSubtitle="KOL Network"
      serviceDescription="Get the right eyes on your project. We connect you with our hand-picked network of 70+ elite crypto KOLs, reaching over 15M+ followers across X, YouTube, and Telegram. We don't just 'shill'—we build narratives."
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
    />
    </>
  );
};

export default InfluencerService;