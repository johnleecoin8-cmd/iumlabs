import { Compass, Map, Flag, TrendingUp, Target, Rocket, ChevronRight, ArrowRight, CheckCircle, Clock, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
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

const strategyBlocks = [
  { title: "Market Entry", items: ["Audience Analysis", "Competitor Mapping", "Channel Selection"], icon: Target },
  { title: "Brand Positioning", items: ["Value Proposition", "Messaging Framework", "Visual Identity"], icon: Map },
  { title: "Execution Plan", items: ["Launch Timeline", "Resource Allocation", "Success Metrics"], icon: Rocket },
];

const timelinePhases = [
  { 
    phase: "Phase 1", 
    title: "Discovery", 
    duration: "Week 1-2",
    tasks: ["Stakeholder interviews", "Market research", "Competitor analysis"],
    icon: Compass,
  },
  { 
    phase: "Phase 2", 
    title: "Strategy", 
    duration: "Week 2-4",
    tasks: ["GTM playbook creation", "Messaging framework", "Channel strategy"],
    icon: Map,
  },
  { 
    phase: "Phase 3", 
    title: "Pre-Launch", 
    duration: "Week 4-6",
    tasks: ["Community seeding", "KOL activation", "Content production"],
    icon: Users,
  },
  { 
    phase: "Phase 4", 
    title: "Launch", 
    duration: "Week 6-8",
    tasks: ["Coordinated announcement", "PR blitz", "Community events"],
    icon: Rocket,
  },
  { 
    phase: "Phase 5", 
    title: "Growth", 
    duration: "Ongoing",
    tasks: ["Performance optimization", "Scaling activities", "Iteration"],
    icon: TrendingUp,
  },
];

const caseStudies = [
  {
    project: "Layer 1 Protocol",
    result: "200K+ community in 8 weeks",
    description: "Built Korean community from scratch with targeted Discord/Telegram strategy and KOL partnerships.",
    metrics: ["200K Members", "50+ KOLs", "$15M TVL"],
  },
  {
    project: "DeFi Protocol",
    result: "$30M TGE success",
    description: "Coordinated full GTM strategy including messaging, PR, and launch timing for successful token sale.",
    metrics: ["$30M Raised", "15K Holders", "Top 10 Trending"],
  },
  {
    project: "NFT Marketplace",
    result: "Top 3 Korean rankings",
    description: "Achieved top marketplace rankings through strategic influencer partnerships and community events.",
    metrics: ["50K Users", "10K+ NFTs", "#3 Ranking"],
  },
];

const GTMStrategyService = () => {
  usePageTitle("GTM Strategy");

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
      {/* Strategy Framework Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader number="01" title="Strategy Framework" badge="Overview" />
          
          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              {/* Strategy Canvas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {strategyBlocks.map((block, index) => (
                  <motion.div
                    key={block.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div 
                      className="p-6 rounded-xl border h-full hover:bg-white/5 transition-all"
                      style={{ borderColor: `${ACCENT_COLOR}30` }}
                    >
                      <block.icon className="w-8 h-8 mb-4" style={{ color: ACCENT_COLOR }} />
                      <h3 className="text-white font-medium mb-4">{block.title}</h3>
                      <ul className="space-y-2">
                        {block.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-white/60 text-sm">
                            <ChevronRight className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Arrow to next block */}
                    {index < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                        <ArrowRight className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* About Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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

      {/* Launch Timeline Section */}
      <section className="scroll-reveal bg-[#121212]">
        <div className="border-t border-white/10">
          <SectionHeader number="02" title="Launch Timeline" badge="Typical 8-Week Journey" />
          
          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              {/* Timeline */}
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent hidden md:block" />
                
                <div className="space-y-8">
                  {timelinePhases.map((phase, index) => {
                    const Icon = phase.icon;
                    const isLeft = index % 2 === 0;
                    
                    return (
                      <motion.div
                        key={phase.phase}
                        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                      >
                        {/* Content */}
                        <div className={`flex-1 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} pl-12 md:pl-0`}>
                          <div 
                            className={`p-6 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-500/30 transition-all inline-block ${isLeft ? 'md:ml-auto' : ''}`}
                          >
                            <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                              <span 
                                className="text-xs font-mono tracking-wider px-2 py-1 rounded-full"
                                style={{ backgroundColor: `${ACCENT_COLOR}20`, color: ACCENT_COLOR }}
                              >
                                {phase.phase}
                              </span>
                              <span className="text-white/40 text-sm flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {phase.duration}
                              </span>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{phase.title}</h3>
                            <ul className={`space-y-2 ${isLeft ? 'md:text-right' : ''}`}>
                              {phase.tasks.map((task) => (
                                <li key={task} className={`flex items-center gap-2 text-white/60 text-sm ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                                  {task}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Center Icon */}
                        <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: ACCENT_COLOR }}
                          >
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                        </div>

                        {/* Spacer for opposite side */}
                        <div className="flex-1 hidden md:block" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader number="03" title="Success Stories" badge="Case Studies" />
          
          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {caseStudies.map((study, index) => (
                  <motion.div
                    key={study.project}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group p-6 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-500/30 transition-all"
                  >
                    {/* Project Type */}
                    <div 
                      className="text-xs font-mono tracking-wider px-3 py-1 rounded-full inline-block mb-4"
                      style={{ backgroundColor: `${ACCENT_COLOR}20`, color: ACCENT_COLOR }}
                    >
                      {study.project}
                    </div>

                    {/* Result */}
                    <h3 className="text-2xl font-bold text-white mb-3">{study.result}</h3>

                    {/* Description */}
                    <p className="text-white/60 text-sm mb-6">{study.description}</p>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-2">
                      {study.metrics.map((metric) => (
                        <span 
                          key={metric}
                          className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/70 flex items-center gap-1"
                        >
                          <Zap className="w-3 h-3" style={{ color: ACCENT_COLOR }} />
                          {metric}
                        </span>
                      ))}
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