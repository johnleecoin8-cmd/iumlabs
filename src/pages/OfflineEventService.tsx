import { CalendarDays, Search, Target, Zap, Megaphone, MapPin, Camera, Users, Sparkles, Globe, Building2, Mic, UserCheck, Handshake, Eye, ClipboardCheck, BarChart3, Newspaper } from "lucide-react";
import { useState } from "react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageMeta } from "@/hooks/usePageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";

const ACCENT_COLOR = "#10B981";

const breadcrumbItems = [
  { name: "Home", url: "https://iumlabs.io" },
  { name: "Services", url: "https://iumlabs.io/services" },
  { name: "Offline Events", url: "https://iumlabs.io/services/offline-event" }
];

// Event Planning Journey phases
const journeyPhases = [
  {
    week: "Week 1",
    title: "Concept & Venue",
    icon: Search,
    activities: ["Brainstorm the vibe and theme", "Scout the best spots in Seoul", "From Gangnam lounges to Seongsu galleries", "Lock in the perfect venue"],
    deliverables: ["Event concept", "Venue confirmed"],
    metrics: [
      { icon: Building2, label: "Venues Scouted", value: "5-10" },
      { icon: Mic, label: "Speakers", value: "3-5" },
    ],
  },
  {
    week: "Week 2",
    title: "Guest List & Partners",
    icon: Target,
    activities: ["Start locking in the RSVPs", "Connect with local partners", "Build the hype with KOLs", "Coordinate with media partners"],
    deliverables: ["Guest list", "Partner lineup"],
    metrics: [
      { icon: UserCheck, label: "RSVPs", value: "100-300" },
      { icon: Handshake, label: "Partners", value: "5+" },
    ],
  },
  {
    week: "Week 3",
    title: "The Big Push",
    icon: Megaphone,
    activities: ["Promotion goes live", "Hit the socials hard", "Ensure registrations are pouring in", "Media partnership activation"],
    deliverables: ["Promo assets", "Press kit"],
    metrics: [
      { icon: Eye, label: "Impressions", value: "50K+" },
      { icon: ClipboardCheck, label: "Registration", value: "80%+" },
    ],
  },
  {
    week: "Week 4",
    title: "Showtime",
    icon: Zap,
    activities: ["On-site management", "Live coverage and updates", "Making sure everything runs like clockwork", "Post-event content creation"],
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
  { value: 20, label: "Events Hosted", suffix: "+" },
  { value: 2000, label: "Total Guests", suffix: "+" },
  { value: 70, label: "Top KOLs Involved", suffix: "+" },
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
    title: "Korea Web3 Event Planning & Crypto Side Events",
    description: "Host unforgettable crypto events in Seoul. Full-service planning for Hackathons, KBW side events, and VIP networking parties for global Web3 leaders.",
    path: "/services/offline-event",
    image: "/og-image.png"
  });
  
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
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
    >
      {/* Event Journey Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader title="Event Journey" badge="4-Week Program" />
          
          <div className="py-10 md:py-14">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Left - Description */}
                <div className="flex flex-col">
                  <p className="text-white/60 text-sm leading-relaxed mb-5">
                    We want you to just "show up" to a perfect party. From concept to execution, we handle every detail so you can focus on what matters—connecting with Korea's crypto community.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-auto">
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

      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema 
        name="Web3 Events in Korea"
        description="Create unforgettable crypto events in Seoul. Korean Web3 marketing through launch parties, meetups, and conferences with KOL attendance."
        url="/services/offline-event"
        serviceType={["Event Planning", "Web3 Events", "Crypto Meetups", "Launch Parties"]}
      />
    </ServicePageLayout>
  );
};

export default OfflineEventService;