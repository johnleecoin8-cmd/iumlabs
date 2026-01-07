import { Rocket, Target, Compass, TrendingUp, CheckCircle, Building2, Shield, Scale, Landmark, Users, FileText, BarChart3, ArrowRight, ExternalLink, Search, Zap, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ServicePageLayout, { ServiceStat, ServiceTag, Deliverable, FAQItem, ProcessStep } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageMeta } from "@/hooks/usePageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";

const ACCENT_COLOR = "#10B981";

const breadcrumbItems = [
  { name: "Home", url: "https://iumlabs.io" },
  { name: "Services", url: "https://iumlabs.io/services" },
  { name: "GTM Strategy", url: "https://iumlabs.io/services/gtm" }
];

// Process Steps
const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Market Discovery",
    description: "Korean exchange landscape analysis, regulatory environment review, and competitor positioning assessment.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Strategy Development",
    description: "GTM roadmap creation, exchange listing strategy, and Korean-targeted messaging framework.",
    icon: Target,
  },
  {
    number: "03",
    title: "Launch Preparation",
    description: "Partnership outreach, content localization, community building on KakaoTalk/Naver, and PR preparation.",
    icon: Rocket,
  },
  {
    number: "04",
    title: "Execution & Growth",
    description: "Campaign activation, performance monitoring, real-time optimization, and exchange listing follow-up.",
    icon: TrendingUp,
  },
];

// Korean Exchange Data
const koreanExchanges = [
  {
    name: "Upbit",
    marketShare: "~70%",
    dailyVolume: "$2-5B",
    listingDifficulty: "Very High",
    requirements: ["Technical audit", "Legal review", "KRW trading pair approval", "Security assessment"],
    color: "#0064FF"
  },
  {
    name: "Bithumb",
    marketShare: "~12%",
    dailyVolume: "$500M-1B",
    listingDifficulty: "High",
    requirements: ["Compliance review", "Token audit", "Liquidity requirements", "Marketing commitment"],
    color: "#E94B35"
  },
  {
    name: "Coinone",
    marketShare: "~5%",
    dailyVolume: "$100-300M",
    listingDifficulty: "Medium",
    requirements: ["Project evaluation", "Security review", "Community presence", "Trading volume history"],
    color: "#00C3F9"
  },
  {
    name: "Korbit",
    marketShare: "~3%",
    dailyVolume: "$50-100M",
    listingDifficulty: "Medium",
    requirements: ["Due diligence", "Compliance check", "Technical review", "Partnership proposal"],
    color: "#0066FF"
  },
  {
    name: "Gopax",
    marketShare: "~2%",
    dailyVolume: "$30-50M",
    listingDifficulty: "Lower",
    requirements: ["Basic evaluation", "Token review", "Team verification", "Roadmap assessment"],
    color: "#6B5BF5"
  }
];

// GTM Success Flow Steps
const gtmFlowSteps = [
  { icon: Search, title: "Analysis", description: "Market Research", active: true },
  { icon: Target, title: "Strategy", description: "Roadmap Creation", active: false },
  { icon: Zap, title: "Launch", description: "Community Building", active: false },
  { icon: Globe, title: "Growth", description: "Exchange Listing", active: false },
];

// Success Stories
const successStories = [
  {
    name: "Story Protocol",
    slug: "story-protocol",
    category: "Infrastructure",
    description: "Established Korean market presence through strategic community building and media campaigns.",
    metrics: [
      { label: "Korean Community", value: "10K+" },
      { label: "Media Coverage", value: "50+" }
    ],
    image: "/images/projects/story-bg.jpg"
  },
  {
    name: "MegaETH",
    slug: "megaeth",
    category: "L2",
    description: "Successful Korean market launch with comprehensive GTM strategy and KOL partnerships.",
    metrics: [
      { label: "Impressions", value: "5M+" },
      { label: "Launch Timeline", value: "4 weeks" }
    ],
    image: "/images/projects/megaeth-bg.jpg"
  },
  {
    name: "Mantra",
    slug: "mantra",
    category: "RWA",
    description: "Executed full-scale Korean market entry including exchange listing support.",
    metrics: [
      { label: "Community Growth", value: "+300%" },
      { label: "PR Articles", value: "30+" }
    ],
    image: "/images/projects/mantra-bg.jpg"
  }
];

// Regulatory Framework Data
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
  { value: 600, label: "Client Retention", suffix: "%+" },
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
  const [activeExchange, setActiveExchange] = useState<number | null>(null);
  const [activeFlowStep, setActiveFlowStep] = useState(0);

  // Animate flow steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlowStep((prev) => (prev + 1) % gtmFlowSteps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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
      videoSrc="/videos/gtm-hero.mp4"
      posterSrc="/images/posters/gtm-hero.jpg"
      processSteps={processSteps}
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="gtm"
    >
      {/* Korean Exchange Landscape Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader title="Korean Exchange Landscape" badge="Market Intel" />
          
          <div className="py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-3 sm:px-6 lg:px-16">
              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-3xl">
                Understanding the Korean exchange ecosystem is crucial for successful market entry. 
                Hover over each exchange to see detailed listing requirements.
              </p>
              
              {/* Exchange Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {koreanExchanges.map((exchange, index) => (
                  <div
                    key={exchange.name}
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setActiveExchange(index)}
                    onMouseLeave={() => setActiveExchange(null)}
                  >
                    <div 
                      className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 ${
                        activeExchange === index 
                          ? 'bg-white/10 border-emerald-500/50 scale-[1.02]' 
                          : 'bg-white/5 border-white/10 hover:bg-white/8'
                      }`}
                    >
                      {/* Exchange Header */}
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <div 
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${exchange.color}20` }}
                        >
                          <Building2 className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: exchange.color }} />
                        </div>
                        <span className="text-sm sm:text-base font-bold text-white">{exchange.name}</span>
                      </div>
                      
                      {/* Market Share Bar */}
                      <div className="mb-2 sm:mb-3">
                        <div className="flex justify-between text-[10px] sm:text-xs text-white/50 mb-1">
                          <span>Market Share</span>
                          <span className="font-medium text-white">{exchange.marketShare}</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: exchange.marketShare.replace(/[^0-9]/g, '') + '%',
                              backgroundColor: exchange.color 
                            }}
                          />
                        </div>
                      </div>
                      
                      {/* Stats */}
                      <div className="space-y-1 text-[10px] sm:text-xs">
                        <div className="flex justify-between">
                          <span className="text-white/50">Daily Volume</span>
                          <span className="text-white font-medium">{exchange.dailyVolume}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50">Listing Difficulty</span>
                          <span className={`font-medium ${
                            exchange.listingDifficulty === 'Very High' ? 'text-red-400' :
                            exchange.listingDifficulty === 'High' ? 'text-orange-400' :
                            exchange.listingDifficulty === 'Medium' ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>{exchange.listingDifficulty}</span>
                        </div>
                      </div>
                      
                      {/* Requirements Tooltip */}
                      {activeExchange === index && (
                        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-[#1a1a1a] border border-white/20 rounded-xl z-10 shadow-2xl">
                          <span className="text-[10px] sm:text-xs font-medium text-emerald-400 uppercase tracking-wider mb-2 block">
                            Listing Requirements
                          </span>
                          <ul className="space-y-1">
                            {exchange.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-[10px] sm:text-xs text-white/70">
                                <CheckCircle className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GTM Success Flow Section */}
      <section className="scroll-reveal">
        <div className="border-t border-white/10">
          <SectionHeader title="GTM Success Flow" badge="Strategic Approach" />
          
          <div className="py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-3 sm:px-6 lg:px-16">
              {/* Flow Diagram */}
              <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03]">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8">
                  {gtmFlowSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = activeFlowStep === index;
                    
                    return (
                      <div key={step.title} className="flex items-center gap-4">
                        {/* Step */}
                        <div className="flex flex-col items-center">
                          <div 
                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 transition-all duration-300 ${
                              isActive ? 'scale-110' : ''
                            }`}
                            style={{ 
                              backgroundColor: isActive ? `${ACCENT_COLOR}30` : 'rgba(255,255,255,0.05)',
                              border: isActive ? `2px solid ${ACCENT_COLOR}` : '2px solid transparent'
                            }}
                          >
                            <Icon 
                              className="w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300" 
                              style={{ color: isActive ? ACCENT_COLOR : 'rgba(255,255,255,0.5)' }} 
                            />
                          </div>
                          <span className={`text-sm font-semibold transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-white/60'
                          }`}>{step.title}</span>
                          <span className={`text-xs transition-colors duration-300 ${
                            isActive ? 'text-emerald-400' : 'text-white/40'
                          }`}>{step.description}</span>
                        </div>
                        
                        {/* Arrow */}
                        {index < gtmFlowSteps.length - 1 && (
                          <div className="hidden md:block">
                            <ArrowRight 
                              className="w-6 h-6 transition-colors duration-300" 
                              style={{ 
                                color: activeFlowStep > index ? ACCENT_COLOR : 'rgba(255,255,255,0.2)' 
                              }} 
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Framework Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader title="Regulatory Framework" badge="Compliance" />
          
          <div className="py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-3 sm:px-6 lg:px-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {regulatoryFramework.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] hover:border-emerald-500/50 hover:bg-white/[0.05] transition-all duration-300"
                    >
                      <div 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4"
                        style={{ backgroundColor: `${ACCENT_COLOR}20` }}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: ACCENT_COLOR }} />
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold text-white mb-1.5 sm:mb-2">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-white/50 mb-3 sm:mb-4">{item.description}</p>
                      <ul className="space-y-1.5">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-white/70">
                            <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Week Program Journey Section */}
      <section className="scroll-reveal">
        <div className="border-t border-white/10">
          <SectionHeader title="4-Week Program" badge="GTM Journey" />
          
          <div className="py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-3 sm:px-6 lg:px-16">
              {/* 4-Week Journey Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 items-start">
                {/* Left - Phase Navigation */}
                <div>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                    A 4-week program from market analysis to successful launch, with clear deliverables at each stage.
                  </p>
                  
                  <div className="space-y-1.5 sm:space-y-2">
                    {journeyPhases.map((phase, index) => {
                      const Icon = phase.icon;
                      const isActive = activePhase === index;
                      
                      return (
                        <button
                          key={phase.week}
                          onClick={() => setActivePhase(index)}
                          className={`w-full text-left p-2.5 sm:p-4 rounded-lg sm:rounded-xl border transition-all duration-300 hover:translate-x-1 active:scale-[0.98] ${
                            isActive 
                              ? 'bg-emerald-500/10 border-emerald-500/30' 
                              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center ${
                              isActive ? 'bg-emerald-500/20' : 'bg-white/10'
                            }`}>
                              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-emerald-400' : 'text-white/60'}`} />
                            </div>
                            <div>
                              <span className={`text-[10px] sm:text-xs font-medium ${isActive ? 'text-emerald-400' : 'text-white/40'}`}>
                                {phase.week}
                              </span>
                              <h4 className={`text-xs sm:text-sm font-semibold ${isActive ? 'text-white' : 'text-white/70'}`}>
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
                  className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 md:p-6"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      {(() => {
                        const Icon = journeyPhases[activePhase].icon;
                        return <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />;
                      })()}
                    </div>
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-emerald-400 font-medium">{journeyPhases[activePhase].week}</span>
                      <h3 className="text-sm sm:text-base font-bold text-white">{journeyPhases[activePhase].title}</h3>
                    </div>
                  </div>

                  <div className="mb-4 sm:mb-5">
                    <h4 className="text-[10px] sm:text-xs font-medium text-white/50 uppercase tracking-wider mb-1.5 sm:mb-2">Activities</h4>
                    <ul className="space-y-1 sm:space-y-1.5">
                      {journeyPhases[activePhase].activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 sm:gap-2 text-white/70">
                          <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 sm:pt-5 border-t border-white/10">
                    <h4 className="text-[10px] sm:text-xs font-medium text-white/50 uppercase tracking-wider mb-1.5 sm:mb-2">Deliverables</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {journeyPhases[activePhase].deliverables.map((deliverable, idx) => (
                        <span 
                          key={idx}
                          className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-medium rounded-md sm:rounded-lg"
                        >
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expected Metrics */}
                  <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-white/10">
                    <h4 className="text-[10px] sm:text-xs font-medium text-white/50 uppercase tracking-wider mb-2 sm:mb-3">Expected Metrics</h4>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {journeyPhases[activePhase].metrics.map((metric, idx) => {
                        const MetricIcon = metric.icon;
                        return (
                          <div key={idx} className="p-2 sm:p-3 bg-white/5 rounded-lg">
                            <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                              <MetricIcon className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                              <span className="text-[10px] sm:text-xs text-white/40">{metric.label}</span>
                            </div>
                            <span className="text-sm sm:text-lg font-bold text-white">{metric.value}</span>
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

      {/* Success Stories Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader title="Success Stories" badge="Case Studies" />
          
          <div className="py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-3 sm:px-6 lg:px-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {successStories.map((story) => (
                  <Link
                    key={story.name}
                    to={`/projects/${story.slug}`}
                    className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img 
                        src={story.image} 
                        alt={story.name}
                        className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative p-4 sm:p-5 md:p-6 min-h-[200px] sm:min-h-[240px] flex flex-col justify-end">
                      <span 
                        className="text-[10px] sm:text-xs font-medium uppercase tracking-wider mb-2"
                        style={{ color: ACCENT_COLOR }}
                      >
                        {story.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{story.name}</h3>
                      <p className="text-xs sm:text-sm text-white/60 mb-3 sm:mb-4 line-clamp-2">{story.description}</p>
                      
                      {/* Metrics */}
                      <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-4">
                        {story.metrics.map((metric, idx) => (
                          <div key={idx}>
                            <span className="text-base sm:text-lg font-bold text-emerald-400">{metric.value}</span>
                            <span className="text-[10px] sm:text-xs text-white/40 block">{metric.label}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* CTA */}
                      <div className="flex items-center gap-1.5 text-emerald-400 text-xs sm:text-sm font-medium group-hover:gap-2.5 transition-all">
                        <span>View Case Study</span>
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema 
        name="Korean Web3 GTM Strategy"
        description="Strategic Go-To-Market planning for Web3 projects launching in Korea. Korean exchange listing, VASP compliance, and localized launch campaigns."
        url="/services/gtm"
        serviceType={["GTM Strategy", "Korean Exchange Listing", "VASP Consulting", "Web3 Marketing"]}
      />
    </ServicePageLayout>
  );
};

export default GTMService;