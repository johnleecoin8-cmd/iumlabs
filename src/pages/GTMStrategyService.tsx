import { Compass, Map, Flag, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageTitle } from "@/hooks/usePageTitle";

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
      accentColor="#10B981"
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
              {/* Desktop Process Line */}
              <div className="hidden lg:block relative mb-12">
                <div className="absolute top-1/2 left-[12.5%] right-[12.5%] h-px border-t border-dashed border-white/10" />
                <div className="flex justify-between px-[8%]">
                  {strategySteps.map((_, index) => (
                    <div 
                      key={index} 
                      className="w-2 h-2 rounded-full bg-white/20"
                    />
                  ))}
                </div>
              </div>

              {/* 4-Step Process Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {strategySteps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ y: -4 }}
                    className="relative group"
                  >
                    {/* Gradient Border Wrapper */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-white/[0.02] p-px opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-full h-full rounded-2xl bg-[#0F0F0F]" />
                    </div>

                    {/* Card Content */}
                    <div className="relative p-8 rounded-2xl bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors duration-300">
                      {/* Step Pill */}
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                        <span className="text-xs font-medium text-white/40 mr-2">Step</span>
                        <span className="text-xs font-bold text-emerald-400">{step.number}</span>
                      </div>

                      {/* Icon */}
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                        <step.icon className="w-5 h-5 text-emerald-400" />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-white/90 mb-2 group-hover:text-white transition-colors">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                        {step.description}
                      </p>
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
