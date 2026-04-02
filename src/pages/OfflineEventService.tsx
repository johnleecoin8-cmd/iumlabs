import { CalendarDays } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import { usePageMeta } from "@/hooks/usePageMeta";
import SEOHead from "@/components/SEOHead";

const ACCENT_COLOR = "#10B981";

const serviceTags: ServiceTag[] = [
  { label: "Web3 Events" },
  { label: "Crypto Meetups" },
  { label: "Launch Parties" },
  { label: "Conferences" },
  { label: "Networking Nights" },
  { label: "Korea Activations" },
];

const stats: ServiceStat[] = [
  { value: 23, label: "Events Produced", suffix: "" },
  { value: 2847, label: "Total Attendees", suffix: "" },
  { value: 156, label: "KOLs & VIPs Hosted", suffix: "" },
  { value: 94, label: "Post-Event Satisfaction", suffix: "%" },
];

const deliverables: Deliverable[] = [
  {
    title: "Full-Scale Production",
    items: [
      "The Space: Finding and booking the perfect venue plus full AV and stage setup",
      "The Branding: Custom decor and signage that makes your brand pop in every photo",
      "Hospitality: Top-tier catering and seamless check-ins for your guests",
    ],
  },
  {
    title: "Guest & Speaker Access",
    items: [
      "Local KOLs: We invite the influential voices in Korea who actually matter for your project",
      "VIP Care: Specialized handling for your speakers and high-profile attendees",
      "Community Turnout: Tap into our network for quality attendance",
    ],
  },
  {
    title: "Content & Hype",
    items: [
      "The Recap: High-quality photos and highlight reels to show the world what they missed",
      "Media Buzz: Social media live-updates and press coverage in local Korean crypto news",
      "Post-Event Amplification: Turn one night into weeks of content",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What kind of events do you actually do?",
    answer: "Anything from 20-person VIP dinners and workshops to 500+ person parties and networking nights during major weeks like KBW.",
  },
  {
    question: "Can you help global teams visiting Korea?",
    answer: "That's our specialty. We act as your 'boots on the ground' in Seoul, handling the language barrier, local vendors, and cultural nuances.",
  },
  {
    question: "How do we make sure people actually show up?",
    answer: "We don't just post a link; we use our direct lines to Korea's top KOLs, communities, and media partners to ensure a high-quality crowd.",
  },
  {
    question: "How early should we start?",
    answer: "Our 4-week program is perfect for most events, but for huge parties during peak weeks, the sooner the better to lock in the best venues!",
  },
];

const OfflineEventService = () => {
  usePageMeta({
    title: "Korea Web3 Event Planning & Crypto Meetups Agency",
    description: "Host unforgettable crypto events in Seoul. Korea's Web3 event agency for KBW side events, hackathons, and VIP networking with 2000+ guests served.",
    path: "/services/offline-event",
    image: "/og-image.png",
    keywords: ["Korea Web3", "Korea Crypto", "Korea Web3 Marketing", "Korea Web3 Events", "KBW Side Events", "Seoul Crypto Meetup"]
  });
  
  

  return (
    <>
    <SEOHead
      title="Web3 Offline Events Korea | Meetups & Conferences | ium Labs"
      description="Plan and execute Web3 meetups, conferences, and side events in Seoul and across Korea. End-to-end event management."
      path="/services/offline-event"
      keywords={['Web3 Events Korea', 'Crypto Meetup Seoul', 'Blockchain Conference Korea', 'Web3 Side Events']}
    />
    <ServicePageLayout
      serviceName="Offline Events"
      serviceTitle="Offline"
      serviceSubtitle="Events"
      serviceDescription="Hosting a Web3 event in Seoul? We've got you. From chill KOL dinners to massive launch parties, we handle the full production so you can focus on the networking. Leverage Korea's top crypto network without the stress."
      serviceIcon={CalendarDays}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      videoSrc="/videos/offline-event-hero.mp4"
      posterSrc="/images/posters/offline-event-hero.jpg"
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="offline-event"
    />
    </>
  );
};

export default OfflineEventService;