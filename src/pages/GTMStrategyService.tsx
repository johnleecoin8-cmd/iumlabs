import { Rocket, Search, Target, Zap, TrendingUp, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageTitle } from "@/hooks/usePageTitle";

const ACCENT_COLOR = "#10B981";

// GTM Journey phases
const journeyPhases = [
  {
    week: "Week 1",
    title: "Discovery",
    icon: Search,
    activities: ["Market research", "Competitor analysis", "Community audit", "Strategy workshop"],
    deliverables: ["Market report", "Positioning deck"],
  },
  {
    week: "Week 2",
    title: "Strategy",
    icon: Target,
    activities: ["GTM roadmap", "Channel strategy", "KOL mapping", "Content planning"],
    deliverables: ["GTM playbook", "Launch calendar"],
  },
  {
    week: "Week 3",
    title: "Launch",
    icon: Zap,
    activities: ["Campaign execution", "PR distribution", "Community activation", "Event coordination"],
    deliverables: ["Launch report", "Media coverage"],
  },
  {
    week: "Week 4",
    title: "Scale",
    icon: TrendingUp,
    activities: ["Performance optimization", "Community growth", "Partnership expansion", "Ongoing support"],
    deliverables: ["Growth metrics", "Monthly reports"],
  },
];


const serviceTags: ServiceTag[] = [
  { label: "Market Entry" },
  { label: "Launch Strategy" },
  { label: "Brand Positioning" },
  { label: "Channel Strategy" },
  { label: "Campaign Planning" },
  { label: "Growth Optimization" },
];

const stats: ServiceStat[] = [
  { value: 30, label: "Projects Launched", suffix: "+" },
  { value: 85, label: "Average Mindshare Gain", suffix: "%" },
  { value: 4, label: "Avg Launch Timeline", suffix: " weeks" },
  { value: 100, label: "Korea Market Coverage", suffix: "%" },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery & Research",
    description: "Deep dive into Korean market dynamics, competitor landscape, and community sentiment to inform strategy.",
    icon: Search,
  },
  {
    number: "02",
    title: "Strategy Development",
    description: "Craft comprehensive GTM playbook with positioning, messaging, channel mix, and launch timeline.",
    icon: Target,
  },
  {
    number: "03",
    title: "Launch Execution",
    description: "Coordinate multi-channel campaign across PR, community, KOLs, and events for maximum impact.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Optimization & Scale",
    description: "Continuous performance tracking, A/B testing, and strategy refinement for sustained growth.",
    icon: TrendingUp,
  },
];

const deliverables: Deliverable[] = [
  {
    title: "Research & Analysis",
    items: [
      "Korea market landscape report",
      "Competitor benchmarking",
      "Community sentiment analysis",
      "KOL influence mapping",
    ],
  },
  {
    title: "Strategy Assets",
    items: [
      "GTM playbook",
      "Brand positioning guide",
      "Content strategy framework",
      "Launch calendar",
    ],
  },
  {
    title: "Execution & Reporting",
    items: [
      "Campaign performance dashboard",
      "Weekly progress reports",
      "Mindshare tracking",
      "ROI analysis",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What makes Korean market entry different?",
    answer: "Korea has unique dynamics including strong community culture, specific platform preferences (KakaoTalk, Naver), influential local KOLs, and distinct regulatory requirements. Local expertise is essential for success.",
  },
  {
    question: "How long does a typical GTM take?",
    answer: "A comprehensive GTM launch typically takes 4 weeks from strategy to execution. We can accommodate faster timelines for urgent launches with focused scope.",
  },
  {
    question: "Do you handle exchange listings?",
    answer: "Yes, we support Korean exchange listing strategy including Upbit, Bithumb, and Coinone. This includes listing preparation, documentation, and ongoing relationship management.",
  },
  {
    question: "What metrics do you track for success?",
    answer: "We track mindshare (Kaito), community growth, media coverage, social engagement, trading volume impact, and overall brand sentiment in the Korean market.",
  },
];

const GTMStrategyService = () => {
  usePageTitle("GTM Strategy");
  
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
    <ServicePageLayout
      serviceName="GTM Strategy"
      serviceTitle="GTM"
      serviceSubtitle="Strategy"
      serviceDescription="Launch successfully in Korea with data-driven market entry strategy, comprehensive planning, and end-to-end execution."
      serviceIcon={Rocket}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      processSteps={processSteps}
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="gtm-strategy"
    >
      {/* GTM Journey Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader number="01" title="Your GTM Journey" badge="4-Week Program" />
          
          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left - Description */}
                <div>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Our proven 4-week GTM program takes you from market research to successful launch. Each phase builds on the previous, ensuring comprehensive preparation and flawless execution.
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

export default GTMStrategyService;
