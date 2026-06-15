import { Mic, Megaphone, MessageCircle, BarChart3 } from "lucide-react";
import ServiceTemplate from "@/components/ServiceTemplate";

import heroImg from "@/assets/services/ama-spaces.jpg";
import featHostsImg from "@/assets/platforms/ama-telegram.jpg";
import featPromoImg from "@/assets/platforms/ama-discord.jpg";
import featModerationImg from "@/assets/platforms/ama-moderation.jpg";
import featRecapImg from "@/assets/platforms/ama-content.jpg";
import runOfShowImg from "@/assets/services/ama-runofshow.webp";

const ACCENT = "#EC4899";

const AMAService = () => (
  <ServiceTemplate
    accent={ACCENT}
    breadcrumb="AMA Hosting"
    seo={{
      title: "Korea Crypto AMA Hosting & Moderation | ium Labs",
      description: "Structured Web3 AMA sessions with native Korean hosts. Pre-event promotion, professional live moderation, and post-AMA recap content and analytics.",
      path: "/services/ama",
      keywords: ["Korea AMA Hosting", "Web3 AMA Korea", "crypto AMA hosting", "Telegram AMA", "X Spaces AMA", "Korean community AMA"],
    }}
    schema={{ name: "Korea AMA Hosting", description: "Structured AMA sessions with native Korean hosts, pre-event promotion, live moderation, and post-AMA recap content and analytics.", serviceType: ["AMA Hosting", "Live Events", "Community Engagement"] }}
    hero={{
      eyebrow: "AMA HOSTING",
      titleLead: <>AMAs that move<br />communities,</>,
      titleAccent: "not just timelines.",
      lede: "Structured AMA sessions with native Korean hosts, from pre-event promotion to live moderation to recap content. Built to convert attention into a community that stays.",
      image: heroImg,
      primaryCta: { label: "Plan your next AMA", href: "/contact" },
    }}
    stats={[{ v: "55+", l: "AMAs Hosted" }, { v: "Native", l: "Korean Hosts" }, { v: "5", l: "Venues Covered" }, { v: "Full", l: "Promo to Recap" }]}
    strip={{ label: "Hosting venues", items: ["Telegram", "Discord", "X Spaces", "YouTube Live", "KakaoTalk"] }}
    reality={{
      heading: "Most AMAs are",
      headingAccent: "wasted opportunities.",
      body: ["Most AMAs are wasted: generic questions, a passive room, and zero follow-up. The host stumbles through translations, the audience drops after five minutes, and nothing gets produced afterward.", "Korean AMAs are their own game. The room expects a native host who understands crypto deeply, and awkward translation kills engagement instantly. The post-AMA window, when interest peaks, is the most wasted asset in Korean crypto marketing without recap content."],
    }}
    process={{
      heading: "From planning to",
      headingAccent: "post-AMA content.",
      steps: [
        { t: "WEEK 1-2", title: "Pre-AMA Strategy", body: "Define objectives, choose the platform, curate questions, and build the promotion plan around your key narratives." },
        { t: "WEEK 2-3", title: "Promotion", body: "Teaser content, community announcements, KOL amplification, and question collection across Korean channels." },
        { t: "EVENT DAY", title: "Live Execution", body: "Native Korean host, live moderation, engagement prompts, and real-time Q&A management from start to finish." },
        { t: "POST-EVENT", title: "Amplification", body: "Written recap, video highlights, and an analytics report, distributed across your channels for weeks of value." },
      ],
    }}
    features={[
      { icon: Mic, eyebrow: "01 · Host", title: "Native Korean Hosts", body: "Professional hosts who speak crypto fluently in Korean, with no awkward translations and no lost nuance. They manage pacing, drive engagement, and keep a Korean audience hooked from the first minute to the last.", points: ["Native Korean, crypto-fluent hosts", "Korean, bilingual, or translated formats", "Pacing and energy management", "Deep narrative and product prep"], image: featHostsImg },
      { icon: Megaphone, eyebrow: "02 · Promote", title: "Pre-Event Promotion", body: "Two to three weeks of promotion across Korean channels before the session goes live. Teaser content, question seeding, and community priming mean the audience is ready and engaged the moment the AMA starts.", points: ["Two to three week promotion runway", "Teaser content and announcements", "KOL and community amplification", "Question seeding and collection"], image: featPromoImg },
      { icon: MessageCircle, eyebrow: "03 · Moderate", title: "Question Curation & Moderation", body: "We seed intelligent questions that steer the conversation toward your key narratives, then run real-time moderation so the host stays focused. No awkward silences, no off-topic tangents, no spam reaching the room.", points: ["Strategic question curation", "Real-time spam filtering", "Question prioritization and queue", "Live audience and troll management"], image: featModerationImg },
      { icon: BarChart3, eyebrow: "04 · Amplify", title: "Post-AMA Recap & Analytics", body: "The post-AMA window is when interest peaks, so we capture it. Written recaps, video and audio highlights, quote graphics, and a full engagement report turn one live session into weeks of distributable content.", points: ["Written recaps and key quotes", "Video and audio highlight cuts", "Quote and clip graphics", "Full engagement analytics report"], image: featRecapImg },
    ]}
    deliverable={{ eyebrow: "THE DELIVERABLE", title: <>AMA Run-of-Show&trade;</>, body: "Every engagement starts with a run-of-show: the platform, the host, the curated question flow, the moderation plan, and the post-AMA content map, all timed minute by minute before you go live.", cta: "Request your run-of-show", image: runOfShowImg }}
    faq={{
      heading: "The questions founders actually ask.",
      sub: "Straight answers on timing, language, moderation, and what happens after the session ends.",
      items: [
        { q: "How far in advance should we plan an AMA?", a: "Ideally two to three weeks. This gives time for proper promotion and question curation. For urgent launches, we can execute quality AMAs in as little as five business days." },
        { q: "Do your hosts speak English too?", a: "Yes. We can host in Korean, English with Korean translation, or fully bilingual. Most Korean community AMAs are hosted entirely in Korean for maximum engagement." },
        { q: "What happens after the AMA?", a: "We produce written recaps, video and audio highlights, key quote graphics, and a full engagement analytics report. This content gets distributed across your channels for weeks of additional value." },
        { q: "How do you handle trolls and spam during live AMAs?", a: "A real-time moderation team filters spam, manages the question queue, and handles disruptive participants. The host never has to deal with moderation, because we do." },
      ],
    }}
  />
);

export default AMAService;
