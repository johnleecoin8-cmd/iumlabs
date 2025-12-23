import { Compass, Map, Flag, TrendingUp, Target, Rocket, ChevronRight, ArrowRight } from "lucide-react";
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

    </ServicePageLayout>
  );
};

export default GTMStrategyService;