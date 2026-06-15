import { Users, MessageCircle, Activity, Shield } from "lucide-react";
import ServiceTemplate from "@/components/ServiceTemplate";

/* PLACEHOLDER IMAGES, swap for provided photos (update these imports only). */
import heroImg from "@/assets/services/community-hero.webp";
import featStaffImg from "@/assets/services/community-moderation.webp";
import featKoreanImg from "@/assets/platforms/comm-kakao.jpg";
import featEngageImg from "@/assets/services/community-events.jpg";
import featSentimentImg from "@/assets/platforms/comm-sentiment.jpg";
import playbookImg from "@/assets/platforms/comm-discord.jpg";

const ACCENT = "#38BDF8";

const CommunityService = () => (
  <ServiceTemplate
    accent={ACCENT}
    breadcrumb="Community Management"
    seo={{
      title: "Korea Web3 Community Management & Growth | ium Labs",
      description: "24/7 native Korean community management and moderation across Telegram, Discord, and KakaoTalk for sustainable Web3 ecosystem growth.",
      path: "/services/community",
      keywords: ["Korea Community Management", "Web3 Community Korea", "Telegram community management", "KakaoTalk Open Chat", "Discord moderation", "crypto community growth"],
    }}
    schema={{ name: "Korea Community Management", description: "24/7 native Korean community management across Telegram, Discord, KakaoTalk.", serviceType: ["Community Management", "Social Media Management"] }}
    hero={{
      eyebrow: "COMMUNITY MANAGEMENT",
      titleLead: <>Community that<br />retains,</>,
      titleAccent: "not just grows.",
      lede: "24/7 native Korean community managers across Telegram, Discord, and KakaoTalk. We don't just moderate, we design the community culture that retains members and grows.",
      image: heroImg,
      primaryCta: { label: "Book a community review", href: "/contact" },
    }}
    stats={[{ v: "50K+", l: "Members Managed" }, { v: "24/7", l: "Always-On Coverage" }, { v: "6", l: "Platforms Covered" }, { v: "80+", l: "Seoul Events Run" }]}
    strip={{ label: "Platform coverage", items: ["Telegram", "KakaoTalk", "Discord", "Naver Cafe", "X", "Reddit"] }}
    reality={{
      heading: "Korean communities don't run on",
      headingAccent: "global rules.",
      body: ["KakaoTalk Open Chat replaces Telegram for many Korean users, Naver Cafe is where long-form discussion happens, and DC Inside is where sentiment shifts. Each platform has its own culture and norms.", "A manager who isn't natively Korean, doesn't get 24-hour crypto culture, and doesn't know KakaoTalk from Telegram will lose your members in weeks."],
    }}
    process={{
      heading: "From setup to",
      headingAccent: "self-sustaining community.",
      steps: [
        { t: "WEEK 1", title: "Onboarding", body: "Platform audit, channel setup, bot configuration, welcome flows, Korean localization." },
        { t: "WEEK 2 TO 3", title: "Infrastructure", body: "Moderation workflows, content calendar, engagement event schedule, ambassador program design." },
        { t: "WEEK 3 TO 6", title: "Activation", body: "Daily engagement, weekly events, KOL AMAs, quest campaigns. Active growth phase." },
        { t: "ONGOING", title: "Optimization", body: "Sentiment monitoring, engagement analytics, retention optimization, monthly community health reports." },
      ],
    }}
    features={[
      { icon: Users, eyebrow: "01 · Staff", title: "Always-On Moderation", body: "Native Korean speakers keeping every channel safe, on-topic, and welcoming around the clock. Bot configuration, anti-spam, welcome flows, and daily engagement prompts, with no gap when global teams sleep.", points: ["24/7 coverage across holidays, nights, and weekends", "Telegram and Discord setup, moderation, and programming", "Bot configuration, anti-spam, and welcome flows", "Pre-approved response playbooks for fast escalation"], image: featStaffImg },
      { icon: MessageCircle, eyebrow: "02 · Localize", title: "Native Korean Managers", body: "The channels most global projects miss entirely. KakaoTalk Open Chat and Naver Cafe are where Korean users actually gather, and they reward managers who understand the culture, not just the language.", points: ["KakaoTalk Open Chat room management and real-time Q&A", "Naver Cafe post moderation and content curation", "SEO-optimized community content that drives Naver search", "Tone and norms tuned per platform, not copy-pasted"], image: featKoreanImg },
      { icon: Activity, eyebrow: "03 · Activate", title: "Engagement & Events", body: "Daily engagement, weekly events, KOL AMAs, and quest campaigns that turn a quiet channel into an active one. We build the content calendar and ambassador program that keep members coming back.", points: ["Content calendar and engagement event schedule", "KOL AMAs and quest campaign programming", "Ambassador program design and management", "2 to 3x daily active rate within the first month"], image: featEngageImg },
      { icon: Shield, eyebrow: "04 · Monitor", title: "Sentiment Monitoring", body: "Real-time monitoring with alert systems so FUD and negative sentiment never spread unchecked. We respond within minutes, not hours, and report on community health every month.", points: ["Real-time sentiment monitoring and alerts", "Escalation protocols for serious issues", "Engagement analytics and retention optimization", "Monthly community health reports"], image: featSentimentImg },
    ]}
    promise={{
      heading: "We grow communities the right way.",
      headingMuted: "No shortcuts, no bots.",
      do: ["Staff every channel with native Korean managers around the clock", "Build the culture, calendar, and events that retain members", "Cover the Korean platforms global teams miss, KakaoTalk and Naver Cafe", "Report on real community health, sentiment, and retention every month"],
      dont: ["Inflate member counts with bots", "Leave channels unmoderated overnight", "Run generic, non-localized replies", "Vanish after launch"],
    }}
    deliverable={{ eyebrow: "THE DELIVERABLE", title: <>Community Playbook&trade;</>, body: "Every engagement starts with a documented playbook: which platforms to run, how each channel is moderated, the engagement and event calendar, and the escalation protocols that keep your community healthy from day one.", cta: "Request your playbook", image: playbookImg }}
    faq={{
      heading: "The questions founders actually ask.",
      sub: "Straight answers on coverage, platforms, sentiment, and what really moves community engagement.",
      items: [
        { q: "Do you provide 24/7 coverage?", a: "Yes. Native Korean speakers managing your community around the clock, holidays, 3AM, weekends. Crypto never sleeps, and neither do we." },
        { q: "Can you manage multiple platforms simultaneously?", a: "Yes. Most clients use Telegram + Discord + at least one Korean platform (KakaoTalk or Naver Cafe). We handle all of them with a unified content and moderation strategy." },
        { q: "How do you handle FUD and negative sentiment?", a: "Real-time monitoring with alert systems. Pre-approved response templates for common FUD scenarios. Escalation protocols for serious issues. We respond within minutes, not hours." },
        { q: "What's the typical engagement improvement?", a: "Most communities see 2-3x increase in daily active rate within the first month. Our average across all managed communities is 6.8% DAR, compared to the industry average of under 3%." },
      ],
    }}
  />
);

export default CommunityService;
