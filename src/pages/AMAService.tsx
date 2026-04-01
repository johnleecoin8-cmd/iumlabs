import { Mic, MessageCircle, Radio, Users, Zap, Target, BarChart3 } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SEOHead from "@/components/SEOHead";

const ACCENT_COLOR = "#EC4899";

const serviceTags: ServiceTag[] = [
  { label: "Telegram AMA" },
  { label: "Discord AMA" },
  { label: "Twitter Spaces" },
  { label: "KakaoTalk Live" },
  { label: "YouTube Live" },
  { label: "Naver Cafe Q&A" },
];

const stats: ServiceStat[] = [
  {
    value: 200,
    label: "AMAs Hosted",
    suffix: "+",
  },
  {
    value: 50,
    label: "Live Participants",
    suffix: "K+",
  },
  {
    value: 85,
    label: "Avg Retention Rate",
    suffix: "%",
  },
  {
    value: 19,
    label: "Projects Served",
    suffix: "+",
  },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Pre-AMA Strategy",
    description: "Topic selection, question seeding, community warm-up, promotional assets",
    icon: Target,
  },
  {
    number: "02",
    title: "Platform Setup",
    description: "Channel configuration, bot setup, moderation tools, recording setup",
    icon: Radio,
  },
  {
    number: "03",
    title: "Live Execution",
    description: "Professional hosting, real-time moderation, audience engagement, technical support",
    icon: Zap,
  },
  {
    number: "04",
    title: "Post-AMA Amplification",
    description: "Recap content, highlight clips, community follow-up, analytics report",
    icon: BarChart3,
  },
];

const deliverables: Deliverable[] = [
  {
    title: "Pre-Event Package",
    items: [
      "Community announcement templates",
      "Social media promotional assets",
      "Question collection & curation",
      "Speaker briefing document",
    ],
  },
  {
    title: "Live Production",
    items: [
      "Professional MC/host (Korean native)",
      "Real-time Korean translation",
      "Live moderation & spam filtering",
      "Screen recording & backup",
    ],
  },
  {
    title: "Post-Event Package",
    items: [
      "Written recap & key takeaways",
      "Video/audio highlights for social",
      "Engagement analytics report",
      "Follow-up community strategy",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Which platforms do you host AMAs on?",
    answer:
      "We host across all major platforms where Korean crypto communities are active: Telegram (most popular), Discord, Twitter/X Spaces, YouTube Live, KakaoTalk open chat, and Naver Cafe. We recommend the platform based on where your target community is most active.",
  },
  {
    question: "Do you provide Korean-speaking hosts?",
    answer:
      "Yes. All our AMA hosts are native Korean speakers with deep crypto knowledge. They can host entirely in Korean, in English with Korean translation, or bilingual — depending on your audience.",
  },
  {
    question: "How far in advance should we plan an AMA?",
    answer:
      "Ideally 2-3 weeks for maximum community warm-up and promotion. However, we can execute a quality AMA in as little as 5 business days for urgent launches or market events.",
  },
  {
    question: "What makes your AMAs different from standard Q&As?",
    answer:
      "We treat AMAs as structured community events, not casual chats. We seed questions beforehand, manage pacing, create real-time engagement moments, and produce post-event content that extends the value far beyond the live session.",
  },
];

const AMAService = () => {
  return (
    <>
      <SEOHead
        title="Korean Crypto AMA Hosting & Management | ium Labs"
        description="Professional AMA hosting for Web3 projects in Korea. Telegram, Discord, Twitter Spaces AMAs with native Korean hosts and full production support."
        path="/services/ama"
        keywords={[
          "Korean AMA hosting",
          "crypto AMA Korea",
          "Telegram AMA",
          "Web3 AMA management",
          "Korean community AMA",
        ]}
      />
      <ServicePageLayout
        serviceName="AMA"
        serviceTitle="Structured AMA Sessions"
        serviceSubtitle="That Drive Real Engagement"
        serviceDescription="We design, host, and amplify AMAs across Telegram, Discord, Twitter Spaces, and Korean platforms — turning Q&A sessions into high-conversion community events."
        serviceIcon={Mic}
        serviceTags={serviceTags}
        stats={stats}
        accentColor={ACCENT_COLOR}
        processSteps={processSteps}
        deliverables={deliverables}
        faqItems={faqItems}
        currentSlug="ama"
      />
    </>
  );
};

export default AMAService;
