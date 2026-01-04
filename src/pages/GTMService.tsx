import { Rocket, Target, Compass, TrendingUp, CheckCircle, Building2, Shield, Scale, Landmark, Users, FileText, BarChart3 } from "lucide-react";
import { useState } from "react";
import ServicePageLayout, { ServiceStat, ServiceTag, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageMeta } from "@/hooks/usePageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

const ACCENT_COLOR = "#10B981";

const breadcrumbItems = [
  { name: "Home", url: "https://iumlabs.io" },
  { name: "Services", url: "https://iumlabs.io/services" },
  { name: "GTM Strategy", url: "https://iumlabs.io/services/gtm" }
];

// Regulatory Framework Data (compact)
const regulatoryFramework = [
  {
    title: "VASP Registration",
    description: "Virtual Asset Service Provider licensing requirements",
    icon: Shield,
    details: ["FIU Registration Required", "Real-name Account Linking", "AML/KYC Compliance"]
  },
  {
    title: "Act Compliance",
    description: "Understanding Special Financial Transaction Act guidelines",
    icon: Scale,
    details: ["Anti-Money Laundering", "Customer Due Diligence", "Transaction Reporting"]
  },
  {
    title: "Tax Policy",
    description: "Crypto taxation policies and filing methods",
    icon: Landmark,
    details: ["Capital Gains Tax", "Filing Standards", "Tax Rate Understanding"]
  },
  {
    title: "Listing Requirements",
    description: "Exchange-specific listing review criteria",
    icon: Building2,
    details: ["Technical Review", "Legal Eligibility", "Liquidity Requirements"]
  }
];

// 4-Week Program Journey
const journeyPhases = [
  {
    week: "Week 1",
    title: "Market Analysis",
    icon: Compass,
    activities: [
      "Korean market landscape research",
      "Competitor analysis & positioning",
      "Korean exchange listing feasibility analysis",
      "Regulatory environment & VASP requirements review"
    ],
    deliverables: ["Market Entry Report", "Regulatory Checklist"],
    metrics: [
      { icon: FileText, label: "Competitors", value: "10+" },
      { icon: Shield, label: "Regulations", value: "5+" }
    ]
  },
  {
    week: "Week 2",
    title: "Strategy Development",
    icon: Target,
    activities: [
      "GTM roadmap creation",
      "Korean exchange listing strategy development",
      "Special Act compliance planning",
      "KPI definition & tracking setup"
    ],
    deliverables: ["GTM Strategy Deck", "Exchange Listing Plan"],
    metrics: [
      { icon: Target, label: "Channels", value: "5-8" },
      { icon: BarChart3, label: "KPIs", value: "10+" }
    ]
  },
  {
    week: "Week 3",
    title: "Launch Preparation",
    icon: Rocket,
    activities: [
      "Korean partnership & KOL outreach",
      "Korean content localization",
      "KakaoTalk/Naver community building",
      "Korean media PR preparation"
    ],
    deliverables: ["Launch Timeline", "Korean Asset Library"],
    metrics: [
      { icon: Users, label: "Partners", value: "3-5" },
      { icon: FileText, label: "Contents", value: "20+" }
    ]
  },
  {
    week: "Week 4",
    title: "Execution & Optimization",
    icon: TrendingUp,
    activities: [
      "Campaign activation",
      "Korean community performance monitoring",
      "Real-time optimization",
      "Exchange listing follow-up support"
    ],
    deliverables: ["Performance Report", "Exchange Roadmap"],
    metrics: [
      { icon: Users, label: "Community", value: "+500-2K" },
      { icon: TrendingUp, label: "Awareness", value: "+200%" }
    ]
  }
];

const serviceTags: ServiceTag[] = [
  { label: "Korean Exchange Listing" },
  { label: "VASP Consulting" },
  { label: "Regulatory Compliance" },
  { label: "Tokenomics Review" },
  { label: "Korea Localization" },
  { label: "Regulatory Response" },
];

const stats: ServiceStat[] = [
  { value: 15, label: "Projects Launched", suffix: "+" },
  { value: 3, label: "TGE Volume Supported", prefix: "$", suffix: "M+" },
  { value: 4, label: "Avg Launch Timeline", suffix: " weeks" },
  { value: 95, label: "Client Retention", suffix: "%" },
];

const deliverables: Deliverable[] = [
  {
    title: "Regulatory & Listing Analysis",
    items: [
      "Korean Exchange Listing Feasibility Report",
      "VASP Registration Requirements Checklist",
      "Special Act Compliance Guide",
      "Regulatory Risk Analysis Report",
    ],
  },
  {
    title: "Market & Strategy Documents",
    items: [
      "Korean Market Entry Strategy Deck",
      "Exchange-specific Listing Roadmap",
      "Korean-targeted Messaging Framework",
      "KPI Dashboard Setup",
    ],
  },
  {
    title: "Execution Assets",
    items: [
      "Korean Content Library",
      "KakaoTalk/Naver Community Setup Guide",
      "Korean Partnership Outreach Kit",
      "Exchange Listing Checklist",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "How does the Korean exchange listing process work?",
    answer: "We analyze listing requirements for major Korean exchanges (Upbit, Bithumb, Coinone, etc.) and develop strategies to meet technical review, legal eligibility, and liquidity requirements. We support communication with exchange representatives throughout the listing process.",
  },
  {
    question: "How do you support VASP registration and regulatory compliance?",
    answer: "We provide consulting for Special Financial Transaction Act compliance, including FIU registration requirements, real-name account linking, and AML/KYC policy development. We connect you with legal advisory partners when needed.",
  },
  {
    question: "What's included in the GTM Strategy service?",
    answer: "We provide comprehensive GTM services specialized for the Korean Web3 market, including market analysis, competitive positioning, launch roadmap, channel strategy, messaging framework, Korean exchange listing strategy, and regulatory consulting.",
  },
  {
    question: "What support is available at each project stage?",
    answer: "Pre-TGE projects receive support for launch strategy, community building, and exchange listing preparation. Post-TGE projects get Korean market growth optimization, additional exchange listings, and regulatory response support.",
  },
  {
    question: "Why is the Korean market different?",
    answer: "Korea has unique platforms like KakaoTalk and Naver, strong community culture, special regulatory requirements including VASP registration and the Special Act, and distinctive user behavior patterns. Our local expertise helps localize strategies appropriately.",
  },
];

const GTMService = () => {
  usePageMeta(
    "Korean Web3 GTM Strategy",
    "Strategic Go-To-Market planning for Web3 projects launching in Korea. Korean exchange listing, VASP compliance, and localized launch campaigns.",
    "/services/gtm"
  );
  const [activePhase, setActivePhase] = useState(0);

  return (
    <ServicePageLayout
      serviceName="GTM Strategy"
      serviceTitle="Go-To-Market"
      serviceSubtitle="Strategy"
      serviceDescription="Strategic GTM planning and execution for Korean market entry. From exchange listing strategy, regulatory response, and tokenomics review to coordinated launch campaigns."
      serviceIcon={Rocket}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="gtm"
    >
      {/* 4-Week Program Journey Section */}
      <section className="scroll-reveal">
        <div className="border-t border-white/10">
          <SectionHeader title="4-Week Program" badge="GTM Journey" />
          
          <div className="py-12 md:py-16">
            <div className="container mx-auto px-6 lg:px-16">
              {/* Regulatory Expertise - Compact Badges */}
              <div className="mb-10">
                <div className="flex flex-wrap gap-2">
                  {regulatoryFramework.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full"
                      >
                        <Icon className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-xs font-medium text-emerald-400">{item.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* 4-Week Journey Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left - Phase Navigation */}
                <div>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">
                    A 4-week program from market analysis to successful launch, with clear deliverables at each stage.
                  </p>
                  
                  <div className="space-y-2">
                    {journeyPhases.map((phase, index) => {
                      const Icon = phase.icon;
                      const isActive = activePhase === index;
                      
                      return (
                        <button
                          key={phase.week}
                          onClick={() => setActivePhase(index)}
                          className={`w-full text-left p-3 sm:p-4 rounded-xl border transition-all duration-300 hover:translate-x-1 active:scale-[0.98] ${
                            isActive 
                              ? 'bg-emerald-500/10 border-emerald-500/30' 
                              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                              isActive ? 'bg-emerald-500/20' : 'bg-white/10'
                            }`}>
                              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-white/60'}`} />
                            </div>
                            <div>
                              <span className={`text-xs font-medium ${isActive ? 'text-emerald-400' : 'text-white/40'}`}>
                                {phase.week}
                              </span>
                              <h4 className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-white/70'}`}>
                                {phase.title}
                              </h4>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right - Phase Details */}
                <div
                  key={activePhase}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 md:p-6"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      {(() => {
                        const Icon = journeyPhases[activePhase].icon;
                        return <Icon className="w-4 h-4 text-emerald-400" />;
                      })()}
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-400 font-medium">{journeyPhases[activePhase].week}</span>
                      <h3 className="text-base font-bold text-white">{journeyPhases[activePhase].title}</h3>
                    </div>
                  </div>

                  <div className="mb-5">
                    <h4 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Activities</h4>
                    <ul className="space-y-1.5">
                      {journeyPhases[activePhase].activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-white/70">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 border-t border-white/10">
                    <h4 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2">Deliverables</h4>
                    <div className="flex flex-wrap gap-2">
                      {journeyPhases[activePhase].deliverables.map((deliverable, idx) => (
                        <span 
                          key={idx}
                          className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium rounded-lg"
                        >
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expected Metrics */}
                  <div className="mt-5 pt-5 border-t border-white/10">
                    <h4 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-3">Expected Metrics</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {journeyPhases[activePhase].metrics.map((metric, idx) => {
                        const MetricIcon = metric.icon;
                        return (
                          <div key={idx} className="p-3 bg-white/5 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <MetricIcon className="w-4 h-4 text-emerald-400" />
                              <span className="text-xs text-white/40">{metric.label}</span>
                            </div>
                            <span className="text-lg font-bold text-white">{metric.value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BreadcrumbSchema items={breadcrumbItems} />
    </ServicePageLayout>
  );
};

export default GTMService;
