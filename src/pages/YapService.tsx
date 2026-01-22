import { Volume2, Users, Zap, FileText, Target } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import { usePageMeta } from "@/hooks/usePageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";

const ACCENT_COLOR = "#22D3EE";

const breadcrumbItems = [
  { name: "Home", url: "https://iumlabs.io" },
  { name: "Services", url: "https://iumlabs.io/services" },
  { name: "Yapper Network", url: "https://iumlabs.io/services/yap" }
];

const serviceTags: ServiceTag[] = [
  { label: "Yapper Network" },
  { label: "Organic Buzz" },
  { label: "Thread Campaigns" },
  { label: "Mindshare Growth" },
  { label: "Quote RT Strategy" },
  { label: "Meme Content" },
];

const stats: ServiceStat[] = [
  { value: 150, label: "Active Yappers", suffix: "+" },
  { value: 3, label: "Total Combined Reach", suffix: "M+" },
  { value: 12, label: "Viral Campaigns Delivered", suffix: "+" },
  { value: 3, label: "Average Engagement Boost", suffix: "x" },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "The Vibe Check",
    description: "We align on your goals and find the best 'angles' for the current market sentiment.",
    icon: Target,
  },
  {
    number: "02",
    title: "The Briefing",
    description: "We push the campaign to our 150+ Yap Circle members to find the perfect fits.",
    icon: Users,
  },
  {
    number: "03",
    title: "The Blitz",
    description: "The 'Yap' begins—organic threads, memes, and interactions flood the timeline.",
    icon: Zap,
  },
  {
    number: "04",
    title: "The Recap",
    description: "A full report on reach, engagement, and who the 'MVPs' of the campaign were.",
    icon: FileText,
  },
];

const deliverables: Deliverable[] = [
  {
    title: "The Game Plan",
    items: [
      "The Brief: We craft the angles and 'hooks' that actually work on X",
      "Asset Kit: Memes, templates, and talking points that don't feel like a corporate press release",
    ],
  },
  {
    title: "Mass Activation",
    items: [
      "Organic Hype: 150+ creators jumping in with threads, quote RTs, and reactions",
      "Real-time Boost: We monitor the best posts and amplify them to keep the momentum going",
    ],
  },
  {
    title: "The Data",
    items: [
      "Impression Tracking: See exactly how many eyes saw your project",
      "Smart Metrics: We identify the top-performing yappers and the high-value followers you've reached",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What's the difference between 'Yap' and regular KOL marketing?",
    answer: "KOL marketing is usually a one-off 'shill.' Yap Strategy is about mindshare. It's dozens of creators talking, joking, and debating about your project at once, making it feel like an organic market trend.",
  },
  {
    question: "Is the content quality controlled?",
    answer: "Yes. While we encourage organic 'yapping,' we provide clear guidelines to ensure the core message is accurate and on-brand.",
  },
  {
    question: "How long does the hype last?",
    answer: "A typical blitz lasts a few days, but the 'echo' on X can last for weeks as more people join the conversation.",
  },
  {
    question: "Can we target specific niches?",
    answer: "Definitely. Whether you're a new L1, a DeFi protocol, or a meme coin, we select the 'yappers' who are already experts in your specific field.",
  },
];

const YapService = () => {
  usePageMeta({
    title: "Korea Crypto Twitter Marketing & Viral Yap Strategy | ium Labs",
    description: "Dominate CT with organic viral loops. 150+ Korean yappers driving mindshare and social dominance for global Web3 projects.",
    path: "/services/yap",
    image: "/og-image.png",
    keywords: ["Crypto Twitter Korea", "CT Marketing", "Viral Web3 Marketing", "Mindshare Growth", "Yap Marketing Korea"]
  });

  return (
    <ServicePageLayout
      serviceName="Yap Strategy"
      serviceTitle="Yap"
      serviceSubtitle="Strategy"
      serviceDescription="Own the timeline. We mobilize our 'Yap Circle'—a network of 150+ aligned creators—to drive mindshare and spark organic buzz across Crypto X. Don't just announce; start a conversation."
      serviceIcon={Volume2}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      videoSrc="/videos/yap-hero.mp4"
      posterSrc="/images/posters/yap-hero.jpg"
      processSteps={processSteps}
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="yap"
    >
      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema 
        name="Crypto Twitter Yap Marketing"
        description="Amplify your message with 150+ crypto yappers. Korean Web3 marketing through organic buzz and mindshare growth on Crypto X."
        url="/services/yap"
        serviceType={["Yap Marketing", "Twitter Marketing", "Organic Buzz", "Mindshare Growth"]}
      />
    </ServicePageLayout>
  );
};

export default YapService;