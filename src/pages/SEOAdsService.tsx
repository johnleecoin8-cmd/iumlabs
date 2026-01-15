import { Search, BarChart3, Target, TrendingUp, MousePointer, Megaphone, LineChart, Eye, DollarSign, Zap } from "lucide-react";
import { useState } from "react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageMeta } from "@/hooks/usePageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";

const ACCENT_COLOR = "#F59E0B";

const breadcrumbItems = [
  { name: "Home", url: "https://iumlabs.io" },
  { name: "Services", url: "https://iumlabs.io/services" },
  { name: "SEO & Paid Ads", url: "https://iumlabs.io/services/seo-ads" }
];

// 4-Week Program Journey
const journeyPhases = [
  {
    week: "Week 1",
    title: "Audit & Research",
    icon: Search,
    activities: [
      "Technical SEO audit",
      "Keyword research & mapping",
      "Competitor ad analysis",
      "Platform selection strategy"
    ],
    deliverables: ["SEO Audit Report", "Keyword Strategy"],
    metrics: [
      { icon: Search, label: "Keywords", value: "50-100" },
      { icon: Eye, label: "Competitors", value: "10+" }
    ]
  },
  {
    week: "Week 2",
    title: "Foundation Setup",
    icon: Target,
    activities: [
      "On-page SEO optimization",
      "Ad account setup & structure",
      "Audience targeting configuration",
      "Tracking & analytics setup"
    ],
    deliverables: ["SEO Implementation", "Ad Account Setup"],
    metrics: [
      { icon: TrendingUp, label: "SEO Score", value: "+30-50%" },
      { icon: Target, label: "Platforms", value: "3+" }
    ]
  },
  {
    week: "Week 3",
    title: "Campaign Launch",
    icon: Megaphone,
    activities: [
      "Ad creative development",
      "Campaign launch across platforms",
      "A/B testing initialization",
      "Bid strategy optimization"
    ],
    deliverables: ["Live Campaigns", "Creative Assets"],
    metrics: [
      { icon: Eye, label: "Impressions", value: "10K-50K" },
      { icon: MousePointer, label: "CTR", value: "2-4%" }
    ]
  },
  {
    week: "Week 4",
    title: "Optimization & Scale",
    icon: TrendingUp,
    activities: [
      "Performance analysis",
      "Campaign optimization",
      "Budget reallocation",
      "Scaling recommendations"
    ],
    deliverables: ["Performance Report", "Growth Plan"],
    metrics: [
      { icon: TrendingUp, label: "Traffic", value: "+150-300%" },
      { icon: DollarSign, label: "ROAS", value: "2-4x" }
    ]
  }
];

const serviceTags: ServiceTag[] = [
  { label: "SEO Optimization" },
  { label: "Google Ads" },
  { label: "Twitter/X Ads" },
  { label: "Display Ads" },
  { label: "Retargeting" },
  { label: "Analytics" },
];

const stats: ServiceStat[] = [
  { value: 150, label: "Avg Traffic Increase", suffix: "%+" },
  { value: 12, label: "Campaigns Managed", suffix: "+" },
  { value: 2.5, label: "Avg ROAS", suffix: "x" },
  { value: 35, label: "Avg CPA Reduction", suffix: "%" },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Audit",
    description: "Comprehensive technical SEO audit and competitive analysis to identify opportunities.",
    icon: Search,
  },
  {
    number: "02",
    title: "Strategy",
    description: "Develop keyword strategy, audience targeting, and campaign structure for maximum impact.",
    icon: Target,
  },
  {
    number: "03",
    title: "Execute",
    description: "Launch optimized campaigns across Google, Twitter/X, and display networks with A/B testing.",
    icon: Megaphone,
  },
  {
    number: "04",
    title: "Optimize",
    description: "Continuous monitoring, bid optimization, and performance-based scaling strategies.",
    icon: BarChart3,
  },
];

const deliverables: Deliverable[] = [
  {
    title: "SEO Package",
    items: [
      "Technical SEO audit & fixes",
      "Keyword research & mapping",
      "On-page optimization",
      "Content strategy recommendations",
    ],
  },
  {
    title: "Paid Advertising",
    items: [
      "Google Ads campaigns",
      "Twitter/X promoted content",
      "Display & retargeting ads",
      "Creative asset development",
    ],
  },
  {
    title: "Analytics & Reporting",
    items: [
      "Conversion tracking setup",
      "Weekly performance reports",
      "ROI analysis dashboard",
      "Optimization recommendations",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Which advertising platforms do you work with?",
    answer: "We manage campaigns across Google Ads (Search, Display, YouTube), Twitter/X Ads, and crypto-native platforms. We recommend the optimal mix based on your target audience and objectives.",
  },
  {
    question: "How long until we see SEO results?",
    answer: "SEO is a long-term investment. Initial improvements typically appear within 4-8 weeks, with significant ranking improvements over 3-6 months. We provide monthly progress reports with clear metrics.",
  },
  {
    question: "What's the minimum ad budget you work with?",
    answer: "We recommend a minimum monthly ad spend of $5,000 to generate meaningful data and results. Our management fees are separate and scale based on campaign complexity.",
  },
  {
    question: "Do you handle crypto-specific advertising restrictions?",
    answer: "Yes, we're experienced with the unique challenges of crypto advertising. We navigate platform policies, use compliant messaging, and leverage crypto-friendly ad networks when traditional platforms have restrictions.",
  },
];

// Ad Platform icons
const adPlatforms = [
  { name: "Google Ads", icon: "G", color: "#4285F4" },
  { name: "Twitter/X", icon: "X", color: "#000000" },
  { name: "YouTube", icon: "▶", color: "#FF0000" },
];

const SEOAdsService = () => {
  usePageMeta({
    title: "Korea Crypto SEO & Web3 Paid Marketing",
    description: "Dominate Korean search results with specialized Crypto SEO. We manage Naver & Google ads, organic search strategies, and user acquisition for Web3.",
    path: "/services/seo-ads",
    image: "/og-image.png"
  });
  const [activePhase, setActivePhase] = useState(0);

  return (
    <ServicePageLayout
      serviceName="SEO & Paid Ads"
      serviceTitle="SEO &"
      serviceSubtitle="Paid Ads"
      serviceDescription="Drive qualified traffic through search optimization and targeted advertising campaigns across Google, Twitter/X, and crypto-native platforms."
      serviceIcon={Search}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      videoSrc="/videos/seo-hero.mp4"
      posterSrc="/images/posters/seo-hero.jpg"
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="seo-ads"
    >
      {/* 4-Week Program Journey Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader title="4-Week Program" badge="Growth Journey" />
          
          <div className="py-10 md:py-14">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left - Phase Navigation */}
                <div>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    From technical audit to scaled campaigns, our 4-week program delivers measurable growth through SEO and paid advertising.
                  </p>
                  
                  {/* Ad Platforms Bar */}
                  <div className="flex gap-3 mb-8">
                    {adPlatforms.map((platform) => (
                      <div 
                        key={platform.name}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl"
                      >
                        <span 
                          className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-white"
                          style={{ backgroundColor: platform.color }}
                        >
                          {platform.icon}
                        </span>
                        <span className="text-xs text-white/60">{platform.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    {journeyPhases.map((phase, index) => {
                      const Icon = phase.icon;
                      const isActive = activePhase === index;
                      
                      return (
                        <button
                          key={phase.week}
                          onClick={() => setActivePhase(index)}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-300 hover:translate-x-1 active:scale-[0.98] ${
                            isActive 
                              ? 'bg-amber-500/10 border-amber-500/30' 
                              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              isActive ? 'bg-amber-500/20' : 'bg-white/10'
                            }`}>
                              <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-white/60'}`} />
                            </div>
                            <div>
                              <span className={`text-xs font-medium ${isActive ? 'text-amber-400' : 'text-white/40'}`}>
                                {phase.week}
                              </span>
                              <h4 className={`font-semibold ${isActive ? 'text-white' : 'text-white/70'}`}>
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
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8"
                >
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      {(() => {
                        const Icon = journeyPhases[activePhase].icon;
                        return <Icon className="w-5 h-5 text-amber-400" />;
                      })()}
                    </div>
                    <div>
                      <span className="text-[10px] text-amber-400 font-medium">{journeyPhases[activePhase].week}</span>
                      <h3 className="text-lg font-bold text-white">{journeyPhases[activePhase].title}</h3>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-white/60 mb-3">Activities</h4>
                    <ul className="space-y-2">
                      {journeyPhases[activePhase].activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white/80">
                          <Zap className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
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
                          className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium rounded-lg"
                        >
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Performance Metrics Preview */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h4 className="text-sm font-medium text-white/60 mb-4">Expected Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {journeyPhases[activePhase].metrics.map((metric, idx) => {
                        const MetricIcon = metric.icon;
                        return (
                          <div key={idx} className="p-3 bg-white/5 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <MetricIcon className="w-4 h-4 text-amber-400" />
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
      <ServiceSchema 
        name="Korean Crypto SEO & Paid Ads"
        description="Drive qualified traffic to your Web3 project in Korea through SEO optimization and targeted ads on Google, Naver, and crypto platforms."
        url="/services/seo-ads"
        serviceType={["SEO Optimization", "Paid Advertising", "Google Ads", "Crypto Marketing"]}
      />
    </ServicePageLayout>
  );
};

export default SEOAdsService;
