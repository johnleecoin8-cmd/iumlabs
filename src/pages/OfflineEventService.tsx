import { CalendarDays, Search, Target, Zap, Megaphone, MapPin, Camera, Users, Sparkles, Globe, Building2, Mic, UserCheck, Handshake, Eye, ClipboardCheck, BarChart3, Newspaper } from "lucide-react";
import { useState } from "react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";

import { usePageMeta } from "@/hooks/usePageMeta";

const ACCENT_COLOR = "#10B981";

// Event Planning Journey phases
const journeyPhases = [
  {
    week: "Week 1",
    title: "Planning",
    icon: Search,
    activities: ["Event concept & theme", "Venue scouting in Seoul", "Budget & sponsor strategy", "Speaker & panelist outreach"],
    deliverables: ["Event brief", "Venue shortlist"],
    metrics: [
      { icon: Building2, label: "Venues", value: "5-10" },
      { icon: Mic, label: "Speakers", value: "3-5" },
    ],
  },
  {
    week: "Week 2",
    title: "Preparation",
    icon: Target,
    activities: ["Venue booking", "KOL & media invitations", "Catering & AV setup", "Registration system"],
    deliverables: ["Event rundown", "Guest list"],
    metrics: [
      { icon: UserCheck, label: "RSVPs", value: "100-300" },
      { icon: Handshake, label: "Partners", value: "5+" },
    ],
  },
  {
    week: "Week 3",
    title: "Promotion",
    icon: Megaphone,
    activities: ["Crypto Twitter campaign", "Community announcements", "Media partnership", "RSVP management"],
    deliverables: ["Promo assets", "Press kit"],
    metrics: [
      { icon: Eye, label: "Impressions", value: "50K+" },
      { icon: ClipboardCheck, label: "Registration", value: "80%+" },
    ],
  },
  {
    week: "Week 4",
    title: "Execution",
    icon: Zap,
    activities: ["On-site coordination", "Live social coverage", "Networking facilitation", "Post-event content"],
    deliverables: ["Event recap", "Photo/Video"],
    metrics: [
      { icon: BarChart3, label: "Attendees", value: "100-500" },
      { icon: Newspaper, label: "Coverage", value: "10+ Articles" },
    ],
  },
];


const serviceTags: ServiceTag[] = [
  { label: "Web3 Events" },
  { label: "Crypto Meetups" },
  { label: "Launch Parties" },
  { label: "Conferences" },
  { label: "Networking Nights" },
  { label: "Korea Activations" },
];

const stats: ServiceStat[] = [
  { value: 20, label: "Web3 Events Hosted", suffix: "+" },
  { value: 2000, label: "Total Attendees", suffix: "+" },
  { value: 70, label: "KOLs Attended", suffix: "+" },
  { value: 20, label: "Media Partners", suffix: "+" },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Concept & Strategy",
    description: "Define event goals aligned with your Web3 project narrative. Whether it's a token launch party, hackathon, or community meetup, we craft the perfect concept.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Venue & Production",
    description: "Secure premium venues across Seoul — from Gangnam rooftops to Itaewon lounges. Full production including stage, AV, branding, and crypto-themed decor.",
    icon: MapPin,
  },
  {
    number: "03",
    title: "Guest Curation",
    description: "Invite the right mix of Korean crypto KOLs, traders, developers, VCs, and community members. We handle VIP relations and media coordination.",
    icon: Users,
  },
  {
    number: "04",
    title: "Live Coverage & Amplification",
    description: "Real-time content creation with professional photography, video, and live Twitter/Telegram coverage to maximize reach and FOMO.",
    icon: Camera,
  },
];

const deliverables: Deliverable[] = [
  {
    title: "Event Production",
    items: [
      "Venue booking & setup",
      "Stage & AV production",
      "Branded decor & signage",
      "Catering & hospitality",
    ],
  },
  {
    title: "Guest & Speaker Management",
    items: [
      "Korean KOL invitations",
      "Speaker & panelist coordination",
      "VIP guest handling",
      "Registration & check-in",
    ],
  },
  {
    title: "Content & Coverage",
    items: [
      "Professional photo & video",
      "Live social media updates",
      "Post-event highlight reel",
      "Press release & media coverage",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What types of Web3 events do you organize?",
    answer: "We specialize in crypto-native events including token launch parties, project reveals, hackathons, developer meetups, trading competitions, NFT exhibitions, DAO gatherings, and exclusive whale dinners. Each event is tailored to your project's stage and goals.",
  },
  {
    question: "How do you ensure quality attendance?",
    answer: "We leverage our network of 69+ Korean crypto KOLs, 20+ media partners, and direct connections to trading communities, VCs, and developer groups. Our curated invite lists ensure high-quality, engaged attendees — not just headcount.",
  },
  {
    question: "What venues do you work with in Seoul?",
    answer: "We have exclusive partnerships with premium venues across Seoul's crypto hotspots — Gangnam, Seongsu, Itaewon, and Yeouido. From intimate rooftop lounges for 50 to conference halls for 500+, we match the venue to your event's vibe and scale.",
  },
  {
    question: "Can you handle international project teams visiting Korea?",
    answer: "Absolutely. We provide full concierge support for global teams including airport pickup, hotel coordination, translator services, and local market briefings. We've hosted teams from Polygon, Story Protocol, Ondo, and many more.",
  },
  {
    question: "What's the typical budget range?",
    answer: "Event budgets vary based on scale and production level. Intimate networking events start around $5K, while large-scale launch parties with full production can range $30K-100K+. We work with your budget to maximize impact.",
  },
  {
    question: "How far in advance should we plan?",
    answer: "We recommend 4-6 weeks for optimal planning, especially for larger events. However, we've successfully executed events in as little as 2 weeks for urgent launches. Earlier planning allows better venue selection and KOL availability.",
  },
];

const OfflineEventService = () => {
  usePageMeta(
    "Offline Events in Korea",
    "Create unforgettable Web3 events in Seoul. Launch parties, meetups, conferences with full-service production and KOL attendance.",
    "/services/offline-event"
  );
  
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
    <ServicePageLayout
      serviceName="Offline Event"
      serviceTitle="Web3 Events"
      serviceSubtitle="in Korea"
      serviceDescription="Create unforgettable crypto events in Seoul — from intimate KOL dinners to large-scale launch parties. Full-service production with Korea's top Web3 network."
      serviceIcon={CalendarDays}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="offline-event"
    >
      {/* Event Journey Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader title="Event Planning Journey" badge="4-Week Program" />
          
          <div className="py-10 md:py-14">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left - Description */}
                <div>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">
                    From concept to execution, our proven 4-week process ensures every detail is covered. We handle the complexity so you can focus on connecting with Korea's crypto community.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                      <Globe className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                      <span className="text-sm text-white/70">Global Teams Welcome</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                      <Users className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                      <span className="text-sm text-white/70">50-500+ Capacity</span>
                    </div>
                  </div>
                </div>

                {/* Right - Phase Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {journeyPhases.map((phase, index) => (
                    <div
                      key={phase.title}
                      onMouseEnter={() => setActivePhase(index)}
                      onMouseLeave={() => setActivePhase(null)}
                      className="relative bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 cursor-pointer transition-all duration-300 hover:border-white/20 hover:scale-[1.02] hover:-translate-y-1 group overflow-hidden"
                      style={{
                        backgroundColor: activePhase === index ? `${ACCENT_COLOR}10` : undefined,
                        borderColor: activePhase === index ? `${ACCENT_COLOR}40` : undefined,
                      }}
                    >
                      {/* Week Badge */}
                      <div 
                        className="text-xs font-medium px-2 py-1 rounded-full w-fit mb-3"
                        style={{ 
                          backgroundColor: `${ACCENT_COLOR}20`,
                          color: ACCENT_COLOR
                        }}
                      >
                        {phase.week}
                      </div>
                      
                      {/* Icon & Title */}
                      <div className="flex items-center gap-3 mb-3">
                        <phase.icon 
                          className="w-5 h-5" 
                          style={{ color: ACCENT_COLOR }}
                        />
                        <h4 className="text-white font-semibold">{phase.title}</h4>
                      </div>

                      {/* Content - Toggle on Hover */}
                      {activePhase === index ? (
                        <div>
                          <div className="space-y-2">
                            {phase.activities.map((activity) => (
                              <div key={activity} className="flex items-center gap-2 text-sm text-white/60">
                                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: ACCENT_COLOR }} />
                                <span>{activity}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <p className="text-xs text-white/40 mb-1">Deliverables</p>
                            <p className="text-sm text-white/80">{phase.deliverables.join(", ")}</p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-sm text-white/40 mb-3">
                            {phase.activities.length} activities • {phase.deliverables.length} deliverables
                          </div>
                          {/* Expected Metrics */}
                          <div className="pt-3 border-t border-white/10">
                            <p className="text-xs text-white/40 mb-2">Expected Metrics</p>
                            <div className="space-y-1.5">
                              {phase.metrics.map((metric) => (
                                <div key={metric.label} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <metric.icon className="w-3.5 h-3.5" style={{ color: ACCENT_COLOR }} />
                                    <span className="text-xs text-white/60">{metric.label}</span>
                                  </div>
                                  <span className="text-xs font-medium" style={{ color: ACCENT_COLOR }}>{metric.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </ServicePageLayout>
  );
};

export default OfflineEventService;