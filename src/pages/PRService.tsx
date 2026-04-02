import { Newspaper, Users, Share2, BarChart3 } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import { usePageMeta } from "@/hooks/usePageMeta";
import SEOHead from "@/components/SEOHead";

const ACCENT_COLOR = "#8B5CF6";

const serviceTags: ServiceTag[] = [
  { label: "Korean Media Distribution" },
  { label: "Press Release (KR/EN)" },
  { label: "Media Outreach" },
  { label: "Blockmedia/Coinness" },
  { label: "Interview Setup" },
  { label: "Crisis Management" },
];

const stats: ServiceStat[] = [{
  value: 64,
  label: "Articles Published",
  suffix: ""
}, {
  value: 18,
  label: "Media Partners",
  suffix: ""
}, {
  value: 3.2,
  label: "Avg. Article Reach",
  suffix: "M"
}, {
  value: 87,
  label: "Coverage Success Rate",
  suffix: "%"
}];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Story Development",
    description: "We find the 'hook' in your project that journalists will actually want to write about.",
    icon: Newspaper,
  },
  {
    number: "02",
    title: "Media Outreach",
    description: "We leverage our personal network to pitch your story to the right editors.",
    icon: Users,
  },
  {
    number: "03",
    title: "Distribution",
    description: "We coordinate the launch across news sites, socials, and community hubs for maximum noise.",
    icon: Share2,
  },
  {
    number: "04",
    title: "Impact Tracking",
    description: "We monitor the reach and provide detailed analytics on how your brand authority grew.",
    icon: BarChart3,
  },
];

const deliverables: Deliverable[] = [
  {
    title: "Korean Market Dominance",
    items: [
      "Native Storytelling: We write press releases that actually sound natural to Korean journalists",
      "Premium Placement: Guaranteed spots in major crypto outlets and business sections of mainstream Korean news",
      "Podcast Features: Getting your team on air with Korea's most-watched crypto shows",
    ],
  },
  {
    title: "Global Expansion",
    items: [
      "English Distribution: High-impact PR for major global platforms like CoinDesk and Cointelegraph",
      "Interview Coordination: We set the stage for your founders to speak with global crypto reporters",
      "Thought Leadership: Placing Op-eds that establish your team as industry experts",
    ],
  },
  {
    title: "Tracking the Buzz",
    items: [
      "Coverage Dashboard: Watch your articles go live in real-time",
      "Sentiment Analysis: We tell you exactly how the public is reacting to your news",
      "Monthly Reports: A full breakdown of reach, impact, and competitor benchmarking",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Which Korean outlets do you actually work with?",
    answer: "We work with all the big names: Blockmedia, Coinness, TokenPost, and BloomingBit, plus the crypto desks of major daily newspapers like Hankyung.",
  },
  {
    question: "How fast can we get a press release out?",
    answer: "For urgent news, we can often secure placements within 24 to 48 hours, though we prefer a few days of lead time to maximize the quality of coverage.",
  },
  {
    question: "Do you handle interviews?",
    answer: "Yes. We can arrange and prep you for interviews with both Korean and global crypto journalists to ensure you're on-message and confident.",
  },
  {
    question: "Can you help with crisis communication?",
    answer: "Absolutely. If things get rocky, we help manage the narrative and ensure your side of the story is represented fairly across all major channels.",
  },
];

const PRService = () => {
  usePageMeta({
    title: "Korea Crypto PR & Web3 Media Relations Agency",
    description: "Korea's top crypto PR agency. 50+ articles in Blockmedia, Coinness & Korean media. Web3 press coverage with 5M+ combined reach for global blockchain projects.",
    path: "/services/pr",
    image: "/og-image.png",
    keywords: ["Korea Web3", "Korea Crypto", "Korea Crypto Agency", "Korea Crypto PR", "Web3 Media Relations Korea", "Blockmedia", "Coinness"]
  });

  return (
    <>
    <SEOHead
      title="Korean Crypto PR & Media Relations | ium Labs"
      description="Secure coverage in CoinDesk Korea, Block Media, TokenPost, and mainstream Korean media. Press releases and crisis communications."
      path="/services/pr"
      keywords={['Korean Crypto PR', 'Web3 Media Relations Korea', 'Blockchain PR Seoul', 'CoinDesk Korea', 'Crypto Press Release']}
    />
    <ServicePageLayout
      serviceName="PR & Media Relations" 
      serviceTitle="PR &" 
      serviceSubtitle="Media" 
      serviceDescription="Get featured where it matters. We leverage our direct relationships with over 20+ top-tier publishers and journalists to secure premium coverage for your project in the Korean and global markets." 
      serviceIcon={Newspaper} 
      serviceTags={serviceTags} 
      stats={stats} 
      accentColor={ACCENT_COLOR} 
      videoSrc="/videos/pr-hero.mp4" 
      posterSrc="/images/posters/pr-hero.jpg" 
      processSteps={processSteps} 
      deliverables={deliverables} 
      faqItems={faqItems} 
      currentSlug="pr"
    />
    </>
  );
};

export default PRService;