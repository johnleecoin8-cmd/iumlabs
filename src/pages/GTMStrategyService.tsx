import { CalendarDays, Search, Target, Zap, TrendingUp, ArrowRight, MapPin, Users, Megaphone, Camera } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageTitle } from "@/hooks/usePageTitle";

const ACCENT_COLOR = "#10B981";

// Event Planning Journey phases
const journeyPhases = [
  {
    week: "Week 1",
    title: "Planning",
    icon: Search,
    activities: ["Event concept development", "Venue research", "Budget planning", "Timeline creation"],
    deliverables: ["Event brief", "Venue shortlist"],
  },
  {
    week: "Week 2",
    title: "Preparation",
    icon: Target,
    activities: ["Venue confirmation", "Vendor coordination", "Guest list management", "Logistics setup"],
    deliverables: ["Event rundown", "Invitation design"],
  },
  {
    week: "Week 3",
    title: "Promotion",
    icon: Megaphone,
    activities: ["Marketing campaign", "Media outreach", "RSVP tracking", "Speaker coordination"],
    deliverables: ["Promo materials", "Media kit"],
  },
  {
    week: "Week 4",
    title: "Execution",
    icon: Zap,
    activities: ["On-site management", "Live coverage", "Guest relations", "Post-event follow-up"],
    deliverables: ["Event recap", "Photo/Video assets"],
  },
];


const serviceTags: ServiceTag[] = [
  { label: "Event Planning" },
  { label: "Venue Coordination" },
  { label: "Networking Events" },
  { label: "Conference & Summit" },
  { label: "On-Ground Activation" },
  { label: "Event Marketing" },
];

const stats: ServiceStat[] = [
  { value: 50, label: "Events Hosted", suffix: "+" },
  { value: 500, label: "Average Attendance", suffix: "+" },
  { value: 3, label: "Avg Event Lead Time", suffix: " weeks" },
  { value: 100, label: "Korea Market Coverage", suffix: "%" },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Concept & Planning",
    description: "Define event objectives, target audience, and develop a compelling event concept aligned with your brand.",
    icon: Search,
  },
  {
    number: "02",
    title: "Venue & Logistics",
    description: "Secure premium venues in Seoul, manage vendors, and coordinate all logistical requirements.",
    icon: MapPin,
  },
  {
    number: "03",
    title: "Promotion & Outreach",
    description: "Drive registrations through targeted marketing, KOL invitations, and media partnerships.",
    icon: Megaphone,
  },
  {
    number: "04",
    title: "Execution & Coverage",
    description: "Flawless on-site execution with professional photography, live streaming, and real-time social coverage.",
    icon: Camera,
  },
];

const deliverables: Deliverable[] = [
  {
    title: "Event Planning",
    items: [
      "Event concept & theme development",
      "Venue scouting & booking",
      "Budget management",
      "Timeline & rundown creation",
    ],
  },
  {
    title: "Guest Management",
    items: [
      "VIP & KOL invitation handling",
      "RSVP tracking system",
      "On-site registration",
      "Guest relations support",
    ],
  },
  {
    title: "Content & Coverage",
    items: [
      "Professional photography",
      "Video production",
      "Live social media coverage",
      "Post-event recap report",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What types of events do you organize?",
    answer: "We organize a wide range of Web3 events including launch parties, networking meetups, conferences, panels, AMAs, hackathons, and exclusive VIP dinners. We tailor each event to your project's goals and target audience.",
  },
  {
    question: "How long does event planning typically take?",
    answer: "We recommend a minimum of 3-4 weeks for proper planning. However, we can accommodate faster timelines for smaller events or urgent launches with focused scope.",
  },
  {
    question: "What venues do you work with in Seoul?",
    answer: "We have partnerships with premium venues across Seoul including Gangnam, Hongdae, Itaewon, and Yeouido. From rooftop lounges to conference halls, we match the venue to your event's vibe and capacity needs.",
  },
  {
    question: "Do you handle KOL and media invitations?",
    answer: "Yes, we leverage our extensive network of Korean crypto KOLs, media partners, and community leaders to ensure strong attendance and coverage for your event.",
  },
];

const OfflineEventService = () => {
  usePageTitle("Offline Event");
  
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
    <ServicePageLayout
      serviceName="Offline Event"
      serviceTitle="Offline"
      serviceSubtitle="Events"
      serviceDescription="Create impactful offline experiences in Korea with end-to-end event planning, venue coordination, and on-ground activation."
      serviceIcon={CalendarDays}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      processSteps={processSteps}
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="offline-event"
    >
      {/* Event Journey Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader number="01" title="Your Event Journey" badge="4-Week Program" />
          
          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left - Description */}
                <div>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Our proven event planning process takes you from concept to execution. Each phase builds on the previous, ensuring comprehensive preparation and flawless delivery of memorable experiences.
                  </p>
                </div>

                {/* Right - Phase Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {journeyPhases.map((phase, index) => (
                    <motion.div
                      key={phase.title}
                      onMouseEnter={() => setActivePhase(index)}
                      onMouseLeave={() => setActivePhase(null)}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="relative bg-white/5 border border-white/10 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:border-white/20 group overflow-hidden"
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
                      <AnimatePresence mode="wait">
                        {activePhase === index ? (
                          <motion.div
                            key="details"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="space-y-2">
                              {phase.activities.map((activity) => (
                                <div key={activity} className="flex items-center gap-2 text-sm text-white/60">
                                  <ArrowRight className="w-3 h-3" style={{ color: ACCENT_COLOR }} />
                                  <span>{activity}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 pt-3 border-t border-white/10">
                              <p className="text-xs text-white/40 mb-1">Deliverables</p>
                              <p className="text-sm text-white/80">{phase.deliverables.join(", ")}</p>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="summary"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-sm text-white/40"
                          >
                            {phase.activities.length} activities • {phase.deliverables.length} deliverables
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
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
