import { Compass, Map, Flag, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageTitle } from "@/hooks/usePageTitle";

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

// Simple 4-step strategy framework
const strategySteps = [
  { 
    number: "01", 
    title: "Research", 
    description: "Market & competitor analysis",
    icon: Compass,
  },
  { 
    number: "02", 
    title: "Position", 
    description: "Messaging & brand narrative",
    icon: Map,
  },
  { 
    number: "03", 
    title: "Launch", 
    description: "Coordinated campaign execution",
    icon: Flag,
  },
  { 
    number: "04", 
    title: "Scale", 
    description: "Optimization & growth",
    icon: TrendingUp,
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
      {/* Simple Strategy Framework Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader number="01" title="Strategy Framework" badge="Our Approach" />
          
          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              {/* 4-Step Process Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {strategySteps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      boxShadow: `0 20px 60px ${ACCENT_COLOR}30, 0 0 40px ${ACCENT_COLOR}15`
                    }}
                    className="relative p-8 rounded-2xl border border-white/10 group overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.02) 50%, transparent 100%)`,
                    }}
                  >
                    {/* Animated Glow Background */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${ACCENT_COLOR}20 0%, transparent 60%)`,
                      }}
                    />

                    {/* Top Accent Line */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${ACCENT_COLOR}, transparent)`,
                      }}
                    />

                    {/* Step Number */}
                    <div 
                      className="relative text-6xl font-bold mb-6 opacity-30 group-hover:opacity-60 transition-all duration-300"
                      style={{ 
                        color: ACCENT_COLOR,
                        textShadow: `0 0 30px ${ACCENT_COLOR}40`
                      }}
                    >
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div 
                      className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                      style={{ 
                        backgroundColor: `${ACCENT_COLOR}20`,
                        boxShadow: `0 0 20px ${ACCENT_COLOR}20`
                      }}
                    >
                      <step.icon className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
                    </div>

                    {/* Title */}
                    <h3 className="relative text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="relative text-white/50 text-sm group-hover:text-white/70 transition-colors">
                      {step.description}
                    </p>

                    {/* Arrow connector (hidden on last item and mobile) */}
                    {index < strategySteps.length - 1 && (
                      <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                        <ArrowRight className="w-6 h-6 text-white/20" />
                      </div>
                    )}
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
