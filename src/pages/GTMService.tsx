import { Rocket, Target, Compass, LineChart, Users, TrendingUp, Calendar, FileText, Zap, CheckCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageTitle } from "@/hooks/usePageTitle";

const ACCENT_COLOR = "#10B981";

// 4-Week Program Journey
const journeyPhases = [
  {
    week: "Week 1",
    title: "Market Analysis",
    icon: Compass,
    activities: [
      "Korean market landscape research",
      "Competitor analysis & positioning",
      "Target audience identification",
      "Regulatory environment review"
    ],
    deliverables: ["Market Entry Report", "Competitor Matrix"]
  },
  {
    week: "Week 2",
    title: "Strategy Development",
    icon: Target,
    activities: [
      "GTM roadmap creation",
      "Channel mix optimization",
      "Messaging framework development",
      "KPI definition & tracking setup"
    ],
    deliverables: ["GTM Strategy Deck", "Channel Plan"]
  },
  {
    week: "Week 3",
    title: "Launch Preparation",
    icon: Rocket,
    activities: [
      "Partnership & KOL outreach",
      "Content localization",
      "Community infrastructure setup",
      "Media & PR preparation"
    ],
    deliverables: ["Launch Timeline", "Asset Library"]
  },
  {
    week: "Week 4",
    title: "Execution & Optimization",
    icon: TrendingUp,
    activities: [
      "Campaign activation",
      "Performance monitoring",
      "Real-time optimization",
      "Growth recommendations"
    ],
    deliverables: ["Performance Report", "Next Phase Plan"]
  }
];

const serviceTags: ServiceTag[] = [
  { label: "Market Entry" },
  { label: "Tokenomics Review" },
  { label: "Launch Strategy" },
  { label: "Partnership" },
  { label: "Roadmap Design" },
  { label: "Korea Localization" },
];

const stats: ServiceStat[] = [
  { value: 18, label: "Projects Launched", suffix: "+" },
  { value: 500, label: "TGE Support", prefix: "$", suffix: "M+" },
  { value: 4, label: "Avg Launch Timeline", suffix: " weeks" },
  { value: 95, label: "Client Retention", suffix: "%" },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep-dive into your project, tokenomics, target audience, and Korean market fit assessment.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Strategy",
    description: "Build comprehensive GTM roadmap with channel mix, messaging framework, and launch timeline.",
    icon: Target,
  },
  {
    number: "03",
    title: "Preparation",
    description: "Set up partnerships, localize content, build community infrastructure, and prepare media outreach.",
    icon: FileText,
  },
  {
    number: "04",
    title: "Launch",
    description: "Execute coordinated campaign across all channels with real-time monitoring and optimization.",
    icon: Rocket,
  },
];

const deliverables: Deliverable[] = [
  {
    title: "Market Analysis",
    items: [
      "Korean market landscape report",
      "Competitor positioning analysis",
      "Target audience personas",
      "Regulatory compliance checklist",
    ],
  },
  {
    title: "Strategy Documents",
    items: [
      "GTM strategy deck",
      "Channel optimization plan",
      "Messaging & positioning framework",
      "KPI dashboard setup",
    ],
  },
  {
    title: "Execution Assets",
    items: [
      "Localized content library",
      "Partnership outreach kit",
      "Launch timeline & checklist",
      "Performance reporting templates",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What's included in the GTM Strategy service?",
    answer: "Our GTM Strategy service includes comprehensive market analysis, competitive positioning, launch roadmap development, channel strategy, messaging framework, and execution support tailored specifically for the Korean Web3 market.",
  },
  {
    question: "How long does it take to develop a GTM strategy?",
    answer: "Our standard program runs 4 weeks, covering market analysis, strategy development, launch preparation, and initial execution. For projects with tighter timelines, we offer accelerated 2-week programs.",
  },
  {
    question: "Do you support projects pre-TGE and post-TGE?",
    answer: "Yes, we work with projects at all stages. Pre-TGE projects benefit from launch strategy and community building, while post-TGE projects focus on growth optimization and market expansion.",
  },
  {
    question: "What makes Korean market entry different?",
    answer: "Korea has unique platforms (KakaoTalk, Naver), strong community culture, specific regulatory requirements, and distinct user behaviors. Our local expertise ensures your strategy is properly localized.",
  },
];

const GTMService = () => {
  usePageTitle("GTM Strategy");
  const [activePhase, setActivePhase] = useState(0);

  return (
    <ServicePageLayout
      serviceName="GTM Strategy"
      serviceTitle="Go-To-Market"
      serviceSubtitle="Strategy"
      serviceDescription="Strategic market entry planning and execution for Web3 projects launching in the Korean market. From tokenomics review to coordinated launch campaigns."
      serviceIcon={Rocket}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      processSteps={processSteps}
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="gtm"
    >
      {/* 4-Week Program Journey Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader number="01" title="4-Week Program" badge="GTM Journey" />
          
          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left - Phase Navigation */}
                <div>
                  <p className="text-white/60 text-lg leading-relaxed mb-8">
                    Our structured 4-week program takes you from market analysis to successful launch, with clear deliverables at each stage.
                  </p>
                  
                  <div className="space-y-3">
                    {journeyPhases.map((phase, index) => {
                      const Icon = phase.icon;
                      const isActive = activePhase === index;
                      
                      return (
                        <motion.button
                          key={phase.week}
                          onClick={() => setActivePhase(index)}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                            isActive 
                              ? 'bg-emerald-500/10 border-emerald-500/30' 
                              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                          }`}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              isActive ? 'bg-emerald-500/20' : 'bg-white/10'
                            }`}>
                              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-white/60'}`} />
                            </div>
                            <div>
                              <span className={`text-xs font-medium ${isActive ? 'text-emerald-400' : 'text-white/40'}`}>
                                {phase.week}
                              </span>
                              <h4 className={`font-semibold ${isActive ? 'text-white' : 'text-white/70'}`}>
                                {phase.title}
                              </h4>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Right - Phase Details */}
                <motion.div
                  key={activePhase}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      {(() => {
                        const Icon = journeyPhases[activePhase].icon;
                        return <Icon className="w-6 h-6 text-emerald-400" />;
                      })()}
                    </div>
                    <div>
                      <span className="text-xs text-emerald-400 font-medium">{journeyPhases[activePhase].week}</span>
                      <h3 className="text-xl font-bold text-white">{journeyPhases[activePhase].title}</h3>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-white/60 mb-3">Activities</h4>
                    <ul className="space-y-2">
                      {journeyPhases[activePhase].activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white/80">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <h4 className="text-sm font-medium text-white/60 mb-3">Deliverables</h4>
                    <div className="flex flex-wrap gap-2">
                      {journeyPhases[activePhase].deliverables.map((deliverable, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium rounded-lg"
                        >
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default GTMService;
