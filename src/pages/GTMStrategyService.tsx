import { useState } from "react";
import { Compass, Map, Flag, TrendingUp, Target, Rocket, ChevronRight, Users, Megaphone, BarChart3, Zap, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageTitle } from "@/hooks/usePageTitle";
import gtmImage from "@/assets/services/gtm-strategy.jpg";

const ACCENT_COLOR = "#10B981";

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
  {
    number: "01",
    title: "Strategy Kickoff",
    description: "We align on project goals, audience profiles, and competitive landscape to inform the full GTM plan.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Narrative & Positioning",
    description: "We craft your messaging framework, value proposition, and launch storyline across all channels.",
    icon: Map,
  },
  {
    number: "03",
    title: "Launch Coordination",
    description: "We orchestrate all campaign elements — content, influencers, PR, community — into a unified launch.",
    icon: Flag,
  },
  {
    number: "04",
    title: "Optimization & Scale",
    description: "We measure results, iterate on what works, and refine strategy for sustained growth post-launch.",
    icon: TrendingUp,
  },
];

const deliverables: Deliverable[] = [
  {
    title: "Strategy Documents",
    items: [
      "Comprehensive GTM Playbook",
      "Market Entry Analysis Report",
      "Competitive Landscape Overview",
      "Target Audience Personas",
    ],
  },
  {
    title: "Brand Assets",
    items: [
      "Messaging Framework",
      "Value Proposition Canvas",
      "Positioning Statement",
      "Key Talking Points",
    ],
  },
  {
    title: "Launch Materials",
    items: [
      "Content Calendar",
      "Channel Strategy Plan",
      "KPI Dashboard Setup",
      "Post-Launch Optimization Report",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "How long does a typical GTM engagement take?",
    answer: "A typical GTM strategy engagement spans 4-8 weeks, depending on the complexity of your project and market conditions. This includes research, strategy development, and launch coordination phases.",
  },
  {
    question: "Do you handle execution or just strategy?",
    answer: "We offer both. Our GTM service includes strategic planning, but we can also coordinate execution across our network of community managers, KOLs, and PR partners for a full-service launch.",
  },
  {
    question: "What makes Korean market entry different?",
    answer: "The Korean crypto market has unique dynamics — strong retail participation, specific platform preferences (Kakao, Naver), and cultural nuances in messaging. Our local expertise ensures your entry resonates with Korean audiences.",
  },
  {
    question: "Can you help with TGE timing and coordination?",
    answer: "Absolutely. We've supported over $50M in token sales and specialize in coordinating launch timing, exchange listings, and community activation around TGE events.",
  },
];

// Launch Timeline Phases
const launchPhases = [
  {
    id: "pre-launch",
    title: "Pre-Launch",
    subtitle: "Foundation & Preparation",
    duration: "Week 1-4",
    icon: Target,
    activities: [
      { name: "Market Research & Analysis", status: "complete" },
      { name: "Competitive Positioning", status: "complete" },
      { name: "Messaging Framework", status: "complete" },
      { name: "KOL Network Outreach", status: "complete" },
      { name: "Content Calendar Setup", status: "complete" },
    ],
    channels: [
      { name: "Research", icon: BarChart3 },
      { name: "PR", icon: Megaphone },
      { name: "Community", icon: Users },
    ],
    metrics: [
      { label: "Brand Awareness", value: "+50%", description: "Target growth" },
      { label: "Community", value: "5K+", description: "Initial members" },
      { label: "KOL Secured", value: "10+", description: "Partnerships" },
    ],
    color: "#10B981",
  },
  {
    id: "tge-week",
    title: "TGE Week",
    subtitle: "Launch Execution",
    duration: "Week 5-6",
    icon: Rocket,
    activities: [
      { name: "Coordinated PR Blitz", status: "complete" },
      { name: "KOL Content Activation", status: "complete" },
      { name: "Community Event Launch", status: "complete" },
      { name: "Exchange Listing Support", status: "complete" },
      { name: "Real-time Monitoring", status: "in-progress" },
    ],
    channels: [
      { name: "KOL", icon: Users },
      { name: "PR", icon: Megaphone },
      { name: "Social", icon: Zap },
    ],
    metrics: [
      { label: "Impressions", value: "10M+", description: "Total reach" },
      { label: "Articles", value: "30+", description: "Media coverage" },
      { label: "Engagement", value: "5x", description: "Above baseline" },
    ],
    color: "#F59E0B",
  },
  {
    id: "post-launch",
    title: "Post-Launch",
    subtitle: "Momentum Building",
    duration: "Week 7-10",
    icon: TrendingUp,
    activities: [
      { name: "Performance Analysis", status: "complete" },
      { name: "Community Engagement Programs", status: "in-progress" },
      { name: "Follow-up PR Waves", status: "in-progress" },
      { name: "Holder Retention Campaigns", status: "pending" },
      { name: "Ecosystem Partnerships", status: "pending" },
    ],
    channels: [
      { name: "Community", icon: Users },
      { name: "Content", icon: Megaphone },
      { name: "Analytics", icon: BarChart3 },
    ],
    metrics: [
      { label: "Holder Growth", value: "+30%", description: "Week over week" },
      { label: "Community", value: "15K+", description: "Active members" },
      { label: "Sentiment", value: "92%", description: "Positive ratio" },
    ],
    color: "#8B5CF6",
  },
  {
    id: "scale",
    title: "Scale",
    subtitle: "Long-term Growth",
    duration: "Week 11+",
    icon: Flag,
    activities: [
      { name: "Market Expansion Strategy", status: "in-progress" },
      { name: "Tier-2 Exchange Listings", status: "pending" },
      { name: "Ambassador Program Launch", status: "pending" },
      { name: "Localized Campaigns", status: "pending" },
      { name: "Quarterly Review & Optimization", status: "pending" },
    ],
    channels: [
      { name: "Growth", icon: TrendingUp },
      { name: "Partnerships", icon: Users },
      { name: "Strategy", icon: Target },
    ],
    metrics: [
      { label: "Market Share", value: "Top 5", description: "In Korea" },
      { label: "Community", value: "50K+", description: "Total members" },
      { label: "Brand Recall", value: "85%", description: "Recognition" },
    ],
    color: "#EC4899",
  },
];

const GTMStrategyService = () => {
  usePageTitle("GTM Strategy");
  const [activePhase, setActivePhase] = useState(0);
  const currentPhase = launchPhases[activePhase];

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
      {/* Launch Timeline Visualizer Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader number="01" title="Launch Timeline" badge="Interactive GTM Framework" />
          
          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              {/* Phase Navigation Tabs */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {launchPhases.map((phase, index) => (
                  <motion.button
                    key={phase.id}
                    onClick={() => setActivePhase(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all ${
                      activePhase === index
                        ? 'border-transparent text-white shadow-lg'
                        : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white bg-white/5'
                    }`}
                    style={{
                      backgroundColor: activePhase === index ? phase.color : undefined,
                      boxShadow: activePhase === index ? `0 0 30px ${phase.color}40` : undefined,
                    }}
                  >
                    <phase.icon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium text-sm">{phase.title}</div>
                      <div className="text-[10px] opacity-70">{phase.duration}</div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Timeline Progress Bar */}
              <div className="relative mb-12">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((activePhase + 1) / launchPhases.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ backgroundColor: currentPhase.color }}
                  />
                </div>
                {/* Milestone Dots */}
                <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-[2%]">
                  {launchPhases.map((phase, index) => (
                    <motion.button
                      key={phase.id}
                      onClick={() => setActivePhase(index)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        index <= activePhase 
                          ? 'border-white bg-white' 
                          : 'border-white/30 bg-[#0F0F0F]'
                      }`}
                      whileHover={{ scale: 1.2 }}
                    >
                      {index <= activePhase && (
                        <CheckCircle2 className="w-4 h-4" style={{ color: phase.color }} />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Phase Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhase.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                  {/* Activities Card */}
                  <div 
                    className="p-6 rounded-2xl border bg-gradient-to-br from-white/5 to-transparent"
                    style={{ borderColor: `${currentPhase.color}30` }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${currentPhase.color}20` }}
                      >
                        <currentPhase.icon className="w-5 h-5" style={{ color: currentPhase.color }} />
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{currentPhase.title}</h3>
                        <p className="text-white/40 text-sm">{currentPhase.subtitle}</p>
                      </div>
                    </div>

                    <h4 className="text-white/60 text-xs uppercase tracking-wider mb-4">Key Activities</h4>
                    <ul className="space-y-3">
                      {currentPhase.activities.map((activity, idx) => (
                        <motion.li
                          key={activity.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div 
                            className={`w-2 h-2 rounded-full ${
                              activity.status === 'complete' ? 'bg-emerald-400' :
                              activity.status === 'in-progress' ? 'bg-amber-400 animate-pulse' :
                              'bg-white/20'
                            }`}
                          />
                          <span className={`text-sm ${
                            activity.status === 'complete' ? 'text-white' :
                            activity.status === 'in-progress' ? 'text-white/80' :
                            'text-white/40'
                          }`}>
                            {activity.name}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Channels Card */}
                  <div 
                    className="p-6 rounded-2xl border bg-gradient-to-br from-white/5 to-transparent"
                    style={{ borderColor: `${currentPhase.color}30` }}
                  >
                    <h4 className="text-white/60 text-xs uppercase tracking-wider mb-6">Active Channels</h4>
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {currentPhase.channels.map((channel, idx) => (
                        <motion.div
                          key={channel.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="text-center"
                        >
                          <div 
                            className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-2 border border-white/10"
                            style={{ backgroundColor: `${currentPhase.color}15` }}
                          >
                            <channel.icon className="w-6 h-6" style={{ color: currentPhase.color }} />
                          </div>
                          <span className="text-white/60 text-xs">{channel.name}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Duration */}
                    <div 
                      className="p-4 rounded-xl text-center"
                      style={{ backgroundColor: `${currentPhase.color}10` }}
                    >
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Duration</p>
                      <p className="text-2xl font-bold" style={{ color: currentPhase.color }}>
                        {currentPhase.duration}
                      </p>
                    </div>
                  </div>

                  {/* Metrics Card */}
                  <div 
                    className="p-6 rounded-2xl border bg-gradient-to-br from-white/5 to-transparent"
                    style={{ borderColor: `${currentPhase.color}30` }}
                  >
                    <h4 className="text-white/60 text-xs uppercase tracking-wider mb-6">Success Metrics</h4>
                    <div className="space-y-6">
                      {currentPhase.metrics.map((metric, idx) => (
                        <motion.div
                          key={metric.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.15 }}
                          className="relative"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/60 text-sm">{metric.label}</span>
                            <span className="text-2xl font-bold" style={{ color: currentPhase.color }}>
                              {metric.value}
                            </span>
                          </div>
                          <p className="text-white/30 text-xs">{metric.description}</p>
                          <div 
                            className="absolute bottom-0 left-0 right-0 h-[1px]"
                            style={{ backgroundColor: `${currentPhase.color}20` }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* About Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
                <div>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Our Go-To-Market service helps you enter the Korean crypto market with clarity, precision, and momentum. We build a complete launch plan covering positioning, messaging, channel strategy, and execution timeline.
                  </p>
                </div>
                <div className="relative">
                  <img 
                    src={gtmImage} 
                    alt="GTM Strategy" 
                    className="w-full h-64 lg:h-80 object-cover rounded-xl"
                  />
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