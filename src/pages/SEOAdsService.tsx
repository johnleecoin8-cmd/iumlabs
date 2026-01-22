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
    title: "The Audit",
    icon: Search,
    activities: [
      "Find the gaps in your SEO",
      "See what your competitors are spending on ads",
      "Identify quick wins and long-term opportunities",
      "Map out your keyword battleground"
    ],
    deliverables: ["SEO Audit Report", "Competitive Analysis"],
    metrics: [
      { icon: Search, label: "Keywords", value: "50-100" },
      { icon: Eye, label: "Competitors", value: "10+" }
    ]
  },
  {
    week: "Week 2",
    title: "Setting the Stage",
    icon: Target,
    activities: [
      "Fix the technical stuff on your site",
      "Set up tracking so every dollar is accounted for",
      "Configure audience targeting",
      "Structure ad accounts for scale"
    ],
    deliverables: ["SEO Implementation", "Tracking Setup"],
    metrics: [
      { icon: TrendingUp, label: "SEO Score", value: "+30-50%" },
      { icon: Target, label: "Platforms", value: "3+" }
    ]
  },
  {
    week: "Week 3",
    title: "Go Live",
    icon: Megaphone,
    activities: [
      "Launch campaigns across Google, X, and YouTube",
      "Deploy eye-catching creatives",
      "Initialize A/B testing",
      "Optimize bid strategies in real-time"
    ],
    deliverables: ["Live Campaigns", "Creative Assets"],
    metrics: [
      { icon: Eye, label: "Impressions", value: "10K-50K" },
      { icon: MousePointer, label: "CTR", value: "2-4%" }
    ]
  },
  {
    week: "Week 4",
    title: "Scale Up",
    icon: TrendingUp,
    activities: [
      "Analyze all the data",
      "Double down on what works",
      "Trim the waste",
      "Plan for continued growth"
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
  { value: 150, label: "Traffic Growth", suffix: "%+" },
  { value: 12, label: "Major Campaigns", suffix: "+" },
  { value: 2.5, label: "Average ROAS", suffix: "x" },
  { value: 35, label: "Lower CPA", suffix: "%" },
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
    title: "SEO That Works",
    items: [
      "Fixing the Engine: Technical SEO audits to make sure Google loves your site",
      "Content Strategy: We tell you exactly what to write to rank for the best keywords",
      "On-Page Polish: Making your existing pages work harder for you",
    ],
  },
  {
    title: "Ads That Convert",
    items: [
      "Multi-Platform: Expert setups on Google, Twitter/X, and YouTube",
      "Creative Edge: We design the ads, so you don't have to",
      "Retargeting: Bringing back the people who visited but didn't convert yet",
    ],
  },
  {
    title: "Clear Reporting",
    items: [
      "The Dashboard: A simple view of your ROI and key metrics",
      "Weekly Catch-ups: We tell you what's happening in plain English, no jargon",
      "Actionable Insights: Not just data, but what to do with it",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Where do you run the ads?",
    answer: "We focus on the big ones: Google, X (Twitter), Naver, Instagram and YouTube. We also tap into crypto-native networks like Coinzilla or Bitmedia if that's where your audience is hiding.",
  },
  {
    question: "How soon will we see results?",
    answer: "Ads start working almost instantly. SEO is more of a 'slow burn' but usually starts showing real momentum within 1 to 3 months.",
  },
  {
    question: "Do you handle the 'crypto-ban' on ad platforms?",
    answer: "Yes. We know the rules inside and out. We help you get the right certifications (like Google's crypto cert) to make sure your ads don't get blocked.",
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
    title: "Korea Crypto SEO & Web3 Paid Marketing | ium Labs",
    description: "Dominate Korean search with specialized Crypto SEO. +150% traffic growth through Naver, Google ads, and user acquisition strategies for Web3.",
    path: "/services/seo-ads",
    image: "/og-image.png",
    keywords: ["Crypto SEO Korea", "Naver Ads Web3", "Google Ads Crypto", "Korea User Acquisition", "Web3 Paid Marketing"]
  });
  const [activePhase, setActivePhase] = useState(0);

  return (
    <ServicePageLayout
      serviceName="SEO & Paid Ads"
      serviceTitle="SEO &"
      serviceSubtitle="Paid Ads"
      serviceDescription="We drive real growth by putting your project in front of the right people. From search engine dominance to high-converting ads on X and Google—we make sure you're seen where it matters."
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Left - Phase Navigation */}
                <div className="flex flex-col">
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    From finding the gaps to scaling what works—our 4-week program gets your growth engine running.
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
                  
                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    {journeyPhases.map((phase, index) => {
                      const Icon = phase.icon;
                      const isActive = activePhase === index;
                      
                      return (
                        <button
                          key={phase.week}
                          onClick={() => setActivePhase(index)}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-300 hover:translate-x-1 active:scale-[0.98] flex-1 ${
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
