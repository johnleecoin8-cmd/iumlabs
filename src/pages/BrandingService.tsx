import { Palette, Globe, Layout, Sparkles, Eye, Layers, Brush, Monitor, Code, Figma, FileText, Zap } from "lucide-react";
import { useState } from "react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageTitle } from "@/hooks/usePageTitle";
import bananagoPreview from "@/assets/portfolio/bananago-preview.png";
import thirdwebPreview from "@/assets/portfolio/thirdweb-preview.png";
import coinmercePreview from "@/assets/portfolio/coinmerce-preview.png";

const ACCENT_COLOR = "#8B5CF6";

// 4-Week Program Journey
const journeyPhases = [
  {
    week: "Week 1",
    title: "Discovery & Research",
    icon: Eye,
    activities: [
      "Brand audit & competitor analysis",
      "Target audience research",
      "Visual direction exploration",
      "Technical requirements gathering"
    ],
    deliverables: ["Brand Discovery Report", "Moodboard"],
    metrics: [
      { icon: Eye, label: "Competitors", value: "5-10" },
      { icon: FileText, label: "References", value: "20+" }
    ]
  },
  {
    week: "Week 2",
    title: "Identity Design",
    icon: Palette,
    activities: [
      "Logo concept development",
      "Color palette & typography",
      "Visual language creation",
      "Brand guidelines drafting"
    ],
    deliverables: ["Logo Concepts", "Style Guide Draft"],
    metrics: [
      { icon: Palette, label: "Concepts", value: "3-5" },
      { icon: Brush, label: "Revisions", value: "2-3" }
    ]
  },
  {
    week: "Week 3",
    title: "Website Design",
    icon: Layout,
    activities: [
      "Wireframe & UX design",
      "UI design & prototyping",
      "Responsive layout design",
      "Animation & interaction design"
    ],
    deliverables: ["Figma Prototype", "Design System"],
    metrics: [
      { icon: Layout, label: "Pages", value: "5-10" },
      { icon: Layers, label: "Components", value: "30+" }
    ]
  },
  {
    week: "Week 4",
    title: "Development & Launch",
    icon: Code,
    activities: [
      "Frontend development",
      "Responsive implementation",
      "Performance optimization",
      "Launch & handover"
    ],
    deliverables: ["Live Website", "Brand Assets Package"],
    metrics: [
      { icon: Zap, label: "Performance", value: "90+" },
      { icon: Code, label: "SEO Score", value: "95+" }
    ]
  }
];

const serviceTags: ServiceTag[] = [
  { label: "Brand Identity" },
  { label: "Logo Design" },
  { label: "Web Development" },
  { label: "UI/UX Design" },
  { label: "Design System" },
  { label: "Motion Graphics" },
];

const stats: ServiceStat[] = [
  { value: 10, label: "Brands Created", suffix: "+" },
  { value: 15, label: "Websites Launched", suffix: "+" },
  { value: 4, label: "Avg Delivery", suffix: " weeks" },
  { value: 95, label: "Client Satisfaction", suffix: "%" },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description: "Understand your vision, audience, and market positioning through in-depth research and analysis.",
    icon: Eye,
  },
  {
    number: "02",
    title: "Design",
    description: "Create distinctive visual identity with logo, color palette, typography, and brand guidelines.",
    icon: Palette,
  },
  {
    number: "03",
    title: "Prototype",
    description: "Build interactive website prototypes with responsive layouts and smooth animations.",
    icon: Figma,
  },
  {
    number: "04",
    title: "Develop",
    description: "Transform designs into high-performance, SEO-optimized websites with clean code.",
    icon: Code,
  },
];

const deliverables: Deliverable[] = [
  {
    title: "Brand Identity",
    items: [
      "Logo (primary, secondary, icon)",
      "Color palette & gradients",
      "Typography system",
      "Brand guidelines PDF",
    ],
  },
  {
    title: "Website Assets",
    items: [
      "Responsive web design",
      "Interactive prototypes",
      "Design system components",
      "Animation specifications",
    ],
  },
  {
    title: "Development",
    items: [
      "Custom frontend development",
      "CMS integration (if needed)",
      "Performance optimization",
      "SEO implementation",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What's included in the branding package?",
    answer: "Our branding package includes logo design (multiple variations), color palette, typography selection, brand guidelines document, and essential visual assets. We can also extend to full visual identity systems.",
  },
  {
    question: "Do you build websites from scratch?",
    answer: "Yes, we design and develop custom websites tailored to your brand. We use modern frameworks like React and Next.js to build fast, responsive, and SEO-friendly websites.",
  },
  {
    question: "How long does a complete branding + website project take?",
    answer: "A complete branding and website project typically takes 4-6 weeks. This includes discovery, design iterations, development, and launch. Timeline can be adjusted based on project scope.",
  },
  {
    question: "Do you provide ongoing maintenance?",
    answer: "Yes, we offer maintenance packages for website updates, security patches, and performance optimization. We also provide training for content management if your site includes a CMS.",
  },
];

// Portfolio showcase items
const portfolioItems = [
  { 
    title: "Bananago", 
    type: "Affiliate Platform",
    url: "https://bananago.kr",
    image: bananagoPreview
  },
  { 
    title: "Thirdweb", 
    type: "Developer Platform",
    url: "https://thirdweb.com",
    image: thirdwebPreview
  },
  { 
    title: "Coinmerce", 
    type: "Crypto Exchange",
    url: "https://coinmerce.io",
    image: coinmercePreview
  },
];

const BrandingService = () => {
  usePageTitle("Branding & Website");
  const [activePhase, setActivePhase] = useState(0);

  return (
    <ServicePageLayout
      serviceName="Branding & Website"
      serviceTitle="Brand"
      serviceSubtitle="& Website"
      serviceDescription="Distinctive brand identity and high-performance websites for Web3 projects. From logo design to custom development."
      serviceIcon={Palette}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="branding"
    >
      {/* 4-Week Program Journey Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader number="01" title="4-Week Program" badge="Design Journey" />
          
          <div className="py-10 md:py-14">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left - Phase Navigation */}
                <div>
                  <p className="text-white/60 text-base leading-relaxed mb-8">
                    From brand discovery to website launch, our 4-week program delivers a complete brand identity and web presence.
                  </p>
                  
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
                              ? 'bg-violet-500/10 border-violet-500/30' 
                              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              isActive ? 'bg-violet-500/20' : 'bg-white/10'
                            }`}>
                              <Icon className={`w-5 h-5 ${isActive ? 'text-violet-400' : 'text-white/60'}`} />
                            </div>
                            <div>
                              <span className={`text-xs font-medium ${isActive ? 'text-violet-400' : 'text-white/40'}`}>
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
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                      {(() => {
                        const Icon = journeyPhases[activePhase].icon;
                        return <Icon className="w-6 h-6 text-violet-400" />;
                      })()}
                    </div>
                    <div>
                      <span className="text-xs text-violet-400 font-medium">{journeyPhases[activePhase].week}</span>
                      <h3 className="text-xl font-bold text-white">{journeyPhases[activePhase].title}</h3>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-white/60 mb-3">Activities</h4>
                    <ul className="space-y-2">
                      {journeyPhases[activePhase].activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white/80">
                          <Sparkles className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
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
                          className="px-3 py-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-medium rounded-lg"
                        >
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expected Metrics */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h4 className="text-sm font-medium text-white/60 mb-4">Expected Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {journeyPhases[activePhase].metrics.map((metric, idx) => {
                        const MetricIcon = metric.icon;
                        return (
                          <div key={idx} className="p-3 bg-white/5 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <MetricIcon className="w-4 h-4 text-violet-400" />
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

              {/* Portfolio Preview */}
              <div className="mt-16">
                <h3 className="text-sm font-medium text-white/40 mb-6 uppercase tracking-wider">Recent Work</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {portfolioItems.map((item) => (
                    <a
                      key={item.title}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer block"
                    >
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <span className="text-xs text-white/60 mb-1">{item.type}</span>
                        <h4 className="text-lg font-bold text-white group-hover:underline">{item.title}</h4>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </ServicePageLayout>
  );
};

export default BrandingService;
