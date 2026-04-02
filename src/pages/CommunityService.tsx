import { Users, Settings, Sparkles, ChevronRight } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import { usePageMeta } from "@/hooks/usePageMeta";
import SEOHead from "@/components/SEOHead";
const ACCENT_COLOR = "#5865F2";
const serviceTags: ServiceTag[] = [{
  label: "Discord Management"
}, {
  label: "Telegram Ops"
}, {
  label: "KakaoTalk Open Chat"
}, {
  label: "Naver Cafe"
}, {
  label: "24/7 Moderation"
}, {
  label: "AI Automation"
}];
const stats: ServiceStat[] = [{
  value: 18,
  label: "Communities Managed",
  suffix: ""
}, {
  value: 127,
  label: "Total Members Engaged",
  suffix: "K+"
}, {
  value: 6.8,
  label: "Avg. Daily Active Rate",
  suffix: "%"
}, {
  value: 92,
  label: "Member Retention",
  suffix: "%"
}];
const processSteps: ProcessStep[] = [{
  number: "01",
  title: "Onboarding",
  description: "We dive into your project to understand your tone, goals, and what makes your community unique.",
  icon: Users
}, {
  number: "02",
  title: "Infrastructure",
  description: "We build the 'digital house'—setting up bots, roles, rules, and verification systems.",
  icon: Settings
}, {
  number: "03",
  title: "Activation",
  description: "We go live, start the conversation, and monitor the early feedback to fine-tune everything.",
  icon: Sparkles
}, {
  number: "04",
  title: "Optimization",
  description: "We refine the strategy based on what your community loves most and keep improving.",
  icon: ChevronRight
}];
const deliverables: Deliverable[] = [{
  title: "Technical Setup",
  items: ["The Essentials: Full server setup, role permissions, and verification bots", "Smart Tech: AI-powered chatbots and custom automation to handle the basics", "Security: Anti-raid and anti-scam systems to keep your members safe"]
}, {
  title: "Daily Operations",
  items: ["24/7 Moderation: Real-time support in both English and Korean. No more 'When moon?' spam", "Event Planning: AMAs, trivia nights, and gamified quests to keep engagement high", "Local Strategy: Running KakaoTalk campaigns tailored for the Korean 'De-gen' community"]
}, {
  title: "Insights & Reporting",
  items: ["Sentiment Tracking: We tell you what your community is actually saying about your project", "Weekly Reports: Simple, data-backed updates on growth, top contributors, and engagement trends"]
}];
const faqItems: FAQItem[] = [{
  question: "Do you handle Korean platforms like KakaoTalk?",
  answer: "Absolutely. Korea is a unique market. We manage KakaoTalk Open Chats and Naver Cafes to make sure you have a real footprint in the local ecosystem."
}, {
  question: "What does '24/7 moderation' actually mean?",
  answer: "It means our team is always on watch. Whether it's a holiday or 3 AM in your timezone, we're there to answer questions, ban scammers, and keep the chat moving."
}, {
  question: "Can you take over an existing community?",
  answer: "Yes. We can migrate your current members to a better setup or simply step in to professionalize your existing Discord or Telegram."
}, {
  question: "Is it all just bots?",
  answer: "Nope. We use AI to handle the boring stuff, but real humans (who actually understand Web3) handle the real conversations and community building."
}];

const CommunityService = () => {
  usePageMeta({
    title: "Korea Web3 Community Management & Crypto Growth Agency",
    description: "Build thriving crypto communities in Korea. 24/7 Discord, Telegram & KakaoTalk management by Korea's leading Web3 community growth agency.",
    path: "/services/community",
    canonicalPath: "/services/community",
    image: "/og-image.png",
    keywords: ["Korea Web3", "Korea Crypto", "Korea Web3 Marketing", "Korea Crypto Agency", "Discord Management Korea", "Telegram Community Web3", "KakaoTalk Crypto"]
  });
  return <><SEOHead
      title="Korean Crypto Community Management | ium Labs"
      description="Build and manage thriving Korean crypto communities on Telegram, Discord, KakaoTalk, and Naver Cafe with native 24/7 managers."
      path="/services/community"
      keywords={['Korean Community Management', 'Crypto Community Korea', 'Telegram Korea Web3', 'Discord Community Korea', 'KakaoTalk Crypto']}
    /><ServicePageLayout serviceName="Community Management" serviceTitle="Community" serviceSubtitle="Management" serviceDescription="Build a community that never sleeps. From Discord and Telegram to Korea's local hubs, we use AI-powered automation and 24/7 moderation to keep your members engaged, happy, and hyped." serviceIcon={Users} serviceTags={serviceTags} stats={stats} accentColor={ACCENT_COLOR} videoSrc="/videos/community-hero.mp4" posterSrc="/images/posters/community-hero.jpg" processSteps={processSteps} deliverables={deliverables} faqItems={faqItems} currentSlug="community" /></>;
};
export default CommunityService;