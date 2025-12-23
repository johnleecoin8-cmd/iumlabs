import { Compass, Map, Flag, TrendingUp, Calendar, Target, Users, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageTitle } from "@/hooks/usePageTitle";

// Import project logos
import storyLogo from "@/assets/logos/story-protocol.png";
import peaqLogo from "@/assets/logos/peaq.png";
import ondoLogo from "@/assets/logos/ondo.svg";
import megaethLogo from "@/assets/logos/megaeth.png";
import saharaLogo from "@/assets/logos/sahara-ai.png";
import triaLogo from "@/assets/logos/tria-official.png";

const ACCENT_COLOR = "#10B981";

// Timeline phases
const timelinePhases = [
  {
    id: 'discovery',
    week: "Week 1-2",
    title: "Discovery & Research",
    icon: Compass,
    status: "Research Phase",
    color: "#10B981",
    activities: [
      "Market landscape analysis",
      "Competitor positioning review",
      "Target audience profiling",
      "Regulatory environment check",
    ],
    deliverables: ["Market Analysis Report", "Competitor Matrix", "Audience Personas"],
  },
  {
    id: 'strategy',
    week: "Week 3-4",
    title: "Strategy & Positioning",
    icon: Map,
    status: "Planning Phase",
    color: "#3B82F6",
    activities: [
      "Brand narrative development",
      "Messaging framework creation",
      "Channel strategy planning",
      "KPI definition",
    ],
    deliverables: ["GTM Playbook", "Messaging Guide", "Channel Plan"],
  },
  {
    id: 'launch',
    week: "Week 5-6",
    title: "Launch Execution",
    icon: Flag,
    status: "Execution Phase",
    color: "#8B5CF6",
    activities: [
      "Content production",
      "Community activation",
      "PR & media outreach",
      "KOL campaign launch",
    ],
    deliverables: ["Launch Content Pack", "PR Coverage", "Campaign Reports"],
  },
  {
    id: 'scale',
    week: "Week 7+",
    title: "Optimization & Scale",
    icon: TrendingUp,
    status: "Growth Phase",
    color: "#F59E0B",
    activities: [
      "Performance analysis",
      "Strategy refinement",
      "Scale winning channels",
      "Long-term growth planning",
    ],
    deliverables: ["Performance Report", "Optimization Roadmap", "Growth Strategy"],
  },
];

// Case studies
const caseStudies = [
  {
    name: "Story Protocol",
    logo: storyLogo,
    category: "IP Infrastructure",
    results: [
      { label: "CTR Increase", value: "+500%" },
      { label: "Community Growth", value: "50K+" },
      { label: "Media Coverage", value: "25+" },
    ],
    description: "Full GTM execution for Korea market entry, including community building and strategic partnerships.",
  },
  {
    name: "Peaq Network",
    logo: peaqLogo,
    category: "DePIN",
    results: [
      { label: "Users Onboarded", value: "50K+" },
      { label: "Brand Awareness", value: "+300%" },
      { label: "KOL Partnerships", value: "15+" },
    ],
    description: "Comprehensive DePIN narrative positioning and community activation in Korean market.",
  },
  {
    name: "Ondo Finance",
    logo: ondoLogo,
    category: "RWA",
    results: [
      { label: "Campaign ROI", value: "3x" },
      { label: "Media Impressions", value: "1M+" },
      { label: "Event Attendees", value: "500+" },
    ],
    description: "RWA education campaign and institutional-grade positioning for Korean investors.",
  },
  {
    name: "MegaETH",
    logo: megaethLogo,
    category: "Layer 2",
    results: [
      { label: "Launch Buzz", value: "#1 Trend" },
      { label: "Waitlist Signups", value: "30K+" },
      { label: "Social Mentions", value: "10K+" },
    ],
    description: "Viral launch campaign with strategic timing and community-driven hype building.",
  },
  {
    name: "Sahara AI",
    logo: saharaLogo,
    category: "AI x Crypto",
    results: [
      { label: "Community Size", value: "25K+" },
      { label: "Engagement Rate", value: "12%" },
      { label: "Media Features", value: "20+" },
    ],
    description: "AI narrative positioning and thought leadership establishment in Korea.",
  },
  {
    name: "Tria",
    logo: triaLogo,
    category: "Wallet Infrastructure",
    results: [
      { label: "App Downloads", value: "15K+" },
      { label: "Active Users", value: "8K+" },
      { label: "Retention Rate", value: "45%" },
    ],
    description: "User acquisition campaign with focus on seamless onboarding experience.",
  },
];

const serviceTags: ServiceTag[] = [
  { label: "Market Entry" },
  { label: "Positioning" },
  { label: "Launch Strategy" },
  { label: "Brand Narrative" },
  { label: "Timeline Planning" },
  { label: "Success Metrics" },
];

const stats: ServiceStat[] = [
  { value: 30, label: "Successful Launches", suffix: "+" },
  { value: 50, label: "Token Sales Supported", prefix: "$", suffix: "M+" },
  { value: 17, label: "Projects Launched", suffix: "+" },
  { value: 95, label: "Client Satisfaction", suffix: "%" },
];

const processSteps: ProcessStep[] = [
  { number: "01", title: "Strategy Kickoff", description: "We align on project goals, audience profiles, and competitive landscape to inform the full GTM plan.", icon: Compass },
  { number: "02", title: "Narrative & Positioning", description: "We craft your messaging framework, value proposition, and launch storyline across all channels.", icon: Map },
  { number: "03", title: "Launch Coordination", description: "We orchestrate all campaign elements — content, influencers, PR, community — into a unified launch.", icon: Flag },
  { number: "04", title: "Optimization & Scale", description: "We measure results, iterate on what works, and refine strategy for sustained growth post-launch.", icon: TrendingUp },
];

const deliverables: Deliverable[] = [
  { title: "Strategy Documents", items: ["Comprehensive GTM Playbook", "Market Entry Analysis Report", "Competitive Landscape Overview", "Target Audience Personas"] },
  { title: "Brand Assets", items: ["Messaging Framework", "Value Proposition Canvas", "Positioning Statement", "Key Talking Points"] },
  { title: "Launch Materials", items: ["Content Calendar", "Channel Strategy Plan", "KPI Dashboard Setup", "Post-Launch Optimization Report"] },
];

const faqItems: FAQItem[] = [
  { question: "How long does a typical GTM engagement take?", answer: "A typical GTM strategy engagement spans 4-8 weeks, depending on the complexity of your project and market conditions." },
  { question: "Do you handle execution or just strategy?", answer: "We offer both. Our GTM service includes strategic planning, but we can also coordinate execution across our network." },
  { question: "What makes Korean market entry different?", answer: "The Korean crypto market has unique dynamics — strong retail participation, specific platform preferences, and cultural nuances in messaging." },
  { question: "Can you help with TGE timing and coordination?", answer: "Absolutely. We've supported over $50M in token sales and specialize in coordinating launch timing around TGE events." },
];

const GTMStrategyService = () => {
  usePageTitle("GTM Strategy");
  
  const [activePhase, setActivePhase] = useState(0);
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: false, margin: "-100px" });

  // Auto-advance timeline
  useEffect(() => {
    if (!isTimelineInView) return;
    const interval = setInterval(() => {
      setActivePhase(prev => (prev + 1) % timelinePhases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isTimelineInView]);

  return (
    <ServicePageLayout
      serviceName="GTM Strategy"
      serviceTitle="Go-To-Market"
      serviceSubtitle="Strategy"
      serviceDescription="A strategic roadmap for Korean market entry — from positioning to launch execution. We help you enter the Korean crypto market with clarity, precision, and momentum."
      serviceIcon={Compass}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      processSteps={processSteps}
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="gtm"
    >
      {/* Journey Timeline Section */}
      <section className="scroll-reveal bg-[#0F0F0F]" ref={timelineRef}>
        <div className="border-t border-white/10">
          <SectionHeader number="01" title="Your GTM Journey" badge="Timeline" />

          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              {/* Timeline Navigation */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {timelinePhases.map((phase, index) => (
                  <motion.button
                    key={phase.id}
                    onClick={() => setActivePhase(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                      activePhase === index
                        ? 'text-white shadow-lg'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                    style={activePhase === index ? {
                      backgroundColor: phase.color,
                      boxShadow: `0 0 30px ${phase.color}40`
                    } : {}}
                  >
                    <span className="flex items-center gap-2">
                      <phase.icon className="w-4 h-4" />
                      {phase.week}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="relative h-1 bg-white/10 rounded-full mb-12 overflow-hidden">
                <motion.div
                  className="absolute h-full rounded-full"
                  style={{ backgroundColor: timelinePhases[activePhase].color }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${((activePhase + 1) / timelinePhases.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Phase Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  {/* Left - Phase Info */}
                  <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <div 
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-6"
                      style={{ backgroundColor: `${timelinePhases[activePhase].color}20`, color: timelinePhases[activePhase].color }}
                    >
                      {timelinePhases[activePhase].status}
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-4">
                      {timelinePhases[activePhase].title}
                    </h3>

                    <div className="space-y-3">
                      {timelinePhases[activePhase].activities.map((activity, index) => (
                        <motion.div
                          key={activity}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle className="w-5 h-5" style={{ color: timelinePhases[activePhase].color }} />
                          <span className="text-white/70">{activity}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right - Deliverables */}
                  <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
                    <h4 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-6">
                      Deliverables
                    </h4>

                    <div className="space-y-4">
                      {timelinePhases[activePhase].deliverables.map((deliverable, index) => (
                        <motion.div
                          key={deliverable}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                        >
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${timelinePhases[activePhase].color}20` }}
                          >
                            <Target className="w-5 h-5" style={{ color: timelinePhases[activePhase].color }} />
                          </div>
                          <span className="text-white font-medium">{deliverable}</span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all"
                      style={{ backgroundColor: timelinePhases[activePhase].color }}
                    >
                      Start Your Journey
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="scroll-reveal bg-[#121212]">
        <div className="border-t border-white/10">
          <SectionHeader number="02" title="Launch Success Stories" badge="Case Studies" />

          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseStudies.map((study, index) => (
                  <motion.div
                    key={study.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredCase(study.name)}
                    onMouseLeave={() => setHoveredCase(null)}
                    className="group relative"
                  >
                    <div className={`relative p-6 rounded-2xl border transition-all duration-300 h-full ${
                      hoveredCase === study.name
                        ? 'bg-white/10 border-emerald-500/50 scale-[1.02]'
                        : 'bg-white/5 border-white/10'
                    }`}>
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-white/10 p-2 flex items-center justify-center">
                          <img src={study.logo} alt={study.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{study.name}</h4>
                          <span className="text-xs text-emerald-400">{study.category}</span>
                        </div>
                      </div>

                      {/* Results */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {study.results.map((result) => (
                          <div key={result.label} className="text-center p-2 rounded-lg bg-white/5">
                            <div className="text-lg font-bold text-white">{result.value}</div>
                            <div className="text-[10px] text-white/40">{result.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Description - Show on hover */}
                      <AnimatePresence>
                        {hoveredCase === study.name && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-sm text-white/60 mt-4"
                          >
                            {study.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default GTMStrategyService;
