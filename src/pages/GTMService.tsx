import { Rocket, Target, Compass, TrendingUp, CheckCircle, Lightbulb, FileSearch, PresentationIcon, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ServicePageLayout, { ServiceStat, ServiceTag, Deliverable, FAQItem } from "@/components/ServicePageLayout";
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

// Consulting Approach Steps
const approachSteps = [
  {
    step: "Step 1",
    title: "Discovery",
    icon: FileSearch,
    activities: [
      "Understand project vision and goals",
      "Analyze current marketing status",
      "Define target audience",
      "Assess Korean market entry feasibility"
    ],
    outcome: "Project Assessment Report"
  },
  {
    step: "Step 2",
    title: "Analysis",
    icon: Compass,
    activities: [
      "Evaluate Korean market fit",
      "Analyze competitive landscape",
      "Identify opportunities and risks",
      "Review regulatory environment"
    ],
    outcome: "Market Analysis & Opportunity Report"
  },
  {
    step: "Step 3",
    title: "Strategy",
    icon: Target,
    activities: [
      "Design custom service combination",
      "Prioritize channels and campaigns",
      "Build step-by-step execution roadmap",
      "Set expected performance metrics"
    ],
    outcome: "Custom Strategy Framework"
  },
  {
    step: "Step 4",
    title: "Proposal",
    icon: PresentationIcon,
    activities: [
      "Prepare detailed proposal",
      "Present expected timeline",
      "Analyze investment and ROI",
      "Discuss execution partnership"
    ],
    outcome: "Custom GTM Proposal"
  }
];

// Available Services for linking
const availableServices = [
  { name: "Community Management", slug: "community", description: "KakaoTalk/Telegram community operations" },
  { name: "PR & Media", slug: "pr", description: "Korean media coverage & press releases" },
  { name: "Influencer/KOL", slug: "influencer", description: "Korean KOL network activation" },
  { name: "Offline Events", slug: "offline-event", description: "Meetups, conferences & parties" },
  { name: "SEO & Ads", slug: "seo-ads", description: "Naver/Google optimization & ads" },
  { name: "Branding", slug: "branding", description: "Korean localized branding & website" },
  { name: "Deep Research", slug: "deep-research", description: "In-depth market analysis reports" },
  { name: "Yap Strategy", slug: "yap", description: "Yapper network marketing" },
];

const serviceTags: ServiceTag[] = [
  { label: "Market Analysis" },
  { label: "Custom Strategy" },
  { label: "Tailored Solutions" },
  { label: "Full-Service Package" },
];

const stats: ServiceStat[] = [
  { value: 30, label: "Projects Consulted", suffix: "+" },
  { value: 95, label: "Client Satisfaction", suffix: "%" },
  { value: 2, label: "Avg Strategy Delivery", suffix: " weeks" },
  { value: 100, label: "Custom Solutions", suffix: "%" },
];

const deliverables: Deliverable[] = [
  {
    title: "Discovery Report",
    items: [
      "Project status analysis",
      "Korean market entry feasibility assessment",
      "Initial opportunities & risks summary",
      "Recommended approach proposal",
    ],
  },
  {
    title: "Custom Strategy Deck",
    items: [
      "Tailored service combination proposal",
      "Channel-specific execution strategy",
      "Expected performance metrics (KPIs)",
      "Competitive positioning strategy",
    ],
  },
  {
    title: "Execution Roadmap",
    items: [
      "Step-by-step execution plan",
      "Expected timeline",
      "Milestones & checkpoints",
      "Investment costs & ROI analysis",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "How does the GTM service work?",
    answer: "We follow a 4-step consulting process: Discovery → Analysis → Strategy → Proposal. You can receive a customized proposal optimized for your project within approximately 2 weeks.",
  },
  {
    question: "What services can be combined?",
    answer: "We combine various services including Community Management, PR/Media, Influencer/KOL, Offline Events, SEO & Ads, Branding, Deep Research, and Yap Strategy based on your project's characteristics. You can check detailed information on each service page.",
  },
  {
    question: "Can you accommodate different project sizes?",
    answer: "Yes, we propose customized solutions that fit your scale and budget, from startups to large projects. We can flexibly configure anything from minimum essential services to full packages.",
  },
  {
    question: "Can you work with projects already running marketing?",
    answer: "Absolutely. We analyze your current marketing status to identify improvements and propose additional services or strategy adjustments. We design to maximize synergy with existing activities.",
  },
  {
    question: "What happens after receiving the proposal?",
    answer: "After reviewing the proposal, you can choose the services and scope you want. Partial execution is possible, and expanding step by step is also a good approach.",
  },
];

const GTMService = () => {
  usePageMeta(
    "Korean Web3 GTM Strategy",
    "Custom GTM strategy consulting for Korean Web3 market entry. From project analysis to tailored service proposals.",
    "/services/gtm"
  );
  const [activeStep, setActiveStep] = useState(0);

  return (
    <ServicePageLayout
      serviceName="GTM Strategy"
      serviceTitle="Go-To-Market"
      serviceSubtitle="Strategy"
      serviceDescription="Custom strategy development for Korean Web3 market entry. We analyze your project's characteristics and goals to propose optimal service combinations and execution roadmaps."
      serviceIcon={Rocket}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      videoSrc="/videos/gtm-hero.mp4"
      posterSrc="/images/posters/gtm-hero.jpg"
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="gtm"
    >
      {/* Our Approach Section */}
      <section className="scroll-reveal">
        <div className="border-t border-white/10">
          <SectionHeader title="Our Approach" badge="Consulting Process" />
          
          <div className="py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-3 sm:px-6 lg:px-16">
              {/* Intro Text */}
              <div className="mb-6 sm:mb-10 max-w-2xl">
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  A 4-step consulting process to understand your needs and propose optimal solutions. 
                  Receive a customized GTM proposal within approximately 2 weeks.
                </p>
              </div>
              
              {/* Approach Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 items-start">
                {/* Left - Step Navigation */}
                <div>
                  <div className="space-y-1.5 sm:space-y-2">
                    {approachSteps.map((phase, index) => {
                      const Icon = phase.icon;
                      const isActive = activeStep === index;
                      
                      return (
                        <button
                          key={phase.step}
                          onClick={() => setActiveStep(index)}
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
                                {phase.step}
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

                {/* Right - Step Details */}
                <div
                  key={activeStep}
                  className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 md:p-6"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      {(() => {
                        const Icon = approachSteps[activeStep].icon;
                        return <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />;
                      })()}
                    </div>
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-emerald-400 font-medium">{approachSteps[activeStep].step}</span>
                      <h3 className="text-sm sm:text-base font-bold text-white">{approachSteps[activeStep].title}</h3>
                    </div>
                  </div>

                  <div className="mb-4 sm:mb-5">
                    <h4 className="text-[10px] sm:text-xs font-medium text-white/50 uppercase tracking-wider mb-1.5 sm:mb-2">What We Do</h4>
                    <ul className="space-y-1 sm:space-y-1.5">
                      {approachSteps[activeStep].activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 sm:gap-2 text-white/70">
                          <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 sm:pt-5 border-t border-white/10">
                    <h4 className="text-[10px] sm:text-xs font-medium text-white/50 uppercase tracking-wider mb-1.5 sm:mb-2">Outcome</h4>
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-medium text-white">{approachSteps[activeStep].outcome}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Services Section */}
      <section className="scroll-reveal">
        <div className="border-t border-white/10">
          <SectionHeader title="Available Services" badge="Service Options" />
          
          <div className="py-8 sm:py-12 md:py-16">
            <div className="container mx-auto px-3 sm:px-6 lg:px-16">
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                Through GTM consulting, we combine the services below tailored to your project's characteristics. 
                You can check detailed information for each service on their individual pages.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                {availableServices.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="group p-3 sm:p-4 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {service.name}
                      </h4>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-[10px] sm:text-xs text-white/50 group-hover:text-white/70 transition-colors">
                      {service.description}
                    </p>
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
        description="Custom GTM strategy consulting for Korean Web3 market entry. From project analysis to tailored service proposals."
        url="/services/gtm"
        serviceType={["GTM Strategy", "Web3 Consulting", "Market Entry Strategy", "Korea Marketing"]}
      />
    </ServicePageLayout>
  );
};

export default GTMService;
