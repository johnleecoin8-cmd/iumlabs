import { Palette, Globe, Layout, Sparkles, Eye, Layers, Brush, Monitor, Code, Figma, FileText, Zap } from "lucide-react";
import { useState } from "react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageMeta } from "@/hooks/usePageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";
import bananagoPreview from "@/assets/portfolio/bananago-preview.png";
import thirdwebPreview from "@/assets/portfolio/thirdweb-preview.png";
import coinmercePreview from "@/assets/portfolio/coinmerce-preview.png";

const ACCENT_COLOR = "#8B5CF6";

const breadcrumbItems = [
  { name: "Home", url: "https://iumlabs.io" },
  { name: "Services", url: "https://iumlabs.io/services" },
  { name: "Branding & Website", url: "https://iumlabs.io/services/branding" }
];

// 4-Week Program Journey
const journeyPhases = [
  {
    week: "Week 1",
    title: "Deep Dive",
    icon: Eye,
    activities: [
      "Research your niche & market",
      "Understand your tech stack",
      "Capture your unique vibes",
      "Define project goals"
    ],
    deliverables: ["Brand Discovery Report", "Moodboard"],
    metrics: [
      { icon: Eye, label: "Competitors", value: "5-10" },
      { icon: FileText, label: "References", value: "20+" }
    ]
  },
  {
    week: "Week 2",
    title: "Look & Feel",
    icon: Palette,
    activities: [
      "Craft your logo & icons",
      "Define color palette & gradients",
      "Select custom typography",
      "Build your unique brand DNA"
    ],
    deliverables: ["Logo Concepts", "Style Guide Draft"],
    metrics: [
      { icon: Palette, label: "Concepts", value: "3-5" },
      { icon: Brush, label: "Revisions", value: "2-3" }
    ]
  },
  {
    week: "Week 3",
    title: "The Build",
    icon: Layout,
    activities: [
      "Design responsive layouts",
      "Create interactive prototypes",
      "Build conversion-focused pages",
      "Add smooth animations"
    ],
    deliverables: ["Figma Prototype", "Design System"],
    metrics: [
      { icon: Layout, label: "Pages", value: "5-10" },
      { icon: Layers, label: "Components", value: "30+" }
    ]
  },
  {
    week: "Week 4",
    title: "Blast Off",
    icon: Code,
    activities: [
      "Final polish & refinements",
      "Tech checks & optimization",
      "Launch preparation",
      "Official go-live!"
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
  { value: 10, label: "Brands Built", suffix: "+" },
  { value: 15, label: "Sites Live", suffix: "+" },
  { value: 4, label: "Avg. Launch", suffix: " Weeks" },
  { value: 95, label: "Happy Clients", suffix: "%" },
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
      "The Basics: Logo kit (Primary, Secondary, Icons)",
      "The Vibe: Color palettes, gradients, and custom fonts",
      "The Rules: A simple Brand Guideline PDF so your team stays on track",
    ],
  },
  {
    title: "Website & Tech",
    items: [
      "Design: Fully responsive and interactive layouts",
      "Development: Clean code, fast loading, and SEO-ready",
      "Web3 Ready: Easy wallet connections and smooth animations",
    ],
  },
  {
    title: "Ongoing Support",
    items: [
      "Launch Assist: We're with you through go-live and beyond",
      "Quick Fixes: Fast turnaround on minor updates",
      "Growth Ready: Easy to scale as your project evolves",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "What's in the branding package?",
    answer: "Everything you need to look professional: logos, colors, fonts, and a guidebook on how to use them. We can also scale up to full visual systems if you're going big.",
  },
  {
    question: "Do you build websites from scratch?",
    answer: "Always. No generic templates here. We build custom sites that are optimized for speed and specifically designed for your project's goals.",
  },
  {
    question: "How long does the whole process take?",
    answer: "Our standard program runs 4 weeks from kickoff to launch. Need it faster? We can discuss rush options depending on your timeline.",
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
  usePageMeta({
    title: "Web3 Branding & Crypto Design Agency Korea",
    description: "Localized Web3 branding that resonates with Korean investors. We offer crypto-native design, UI/UX, and visual identity services for blockchain projects.",
    path: "/services/branding",
    image: "/og-image.png"
  });
  const [activePhase, setActivePhase] = useState(0);

  return (
    <ServicePageLayout
      serviceName="Branding & Website"
      serviceTitle="Brand"
      serviceSubtitle="& Website"
      serviceDescription="We build standout identities and ultra-fast websites for Web3 teams. From your first logo to a fully custom site, we handle the heavy lifting so you can focus on scaling."
      serviceIcon={Palette}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      videoSrc="/videos/branding-hero.mp4"
      posterSrc="/images/posters/branding-hero.jpg"
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="branding"
    >
      {/* 4-Week Program Journey Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader title="4-Week Program" badge="Design Journey" />
          
          <div className="py-10 md:py-14">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Left - Phase Navigation */}
                <div className="flex flex-col">
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    From brand discovery to website launch, our 4-week program delivers a complete brand identity and web presence.
                  </p>
                  
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
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                      {(() => {
                        const Icon = journeyPhases[activePhase].icon;
                        return <Icon className="w-5 h-5 text-violet-400" />;
                      })()}
                    </div>
                    <div>
                      <span className="text-[10px] text-violet-400 font-medium">{journeyPhases[activePhase].week}</span>
                      <h3 className="text-lg font-bold text-white">{journeyPhases[activePhase].title}</h3>
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

      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema 
        name="Web3 Branding & Website Design"
        description="Distinctive Web3 brand identity and high-performance websites for projects launching in Korea. Korean-localized design and development."
        url="/services/branding"
        serviceType={["Brand Identity", "Web Design", "Web Development", "UI/UX Design"]}
      />
    </ServicePageLayout>
  );
};

export default BrandingService;
