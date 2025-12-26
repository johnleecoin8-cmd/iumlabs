import { Newspaper, Globe, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import MediaPartnersSection from "@/components/MediaPartnersSection";
import { usePageTitle } from "@/hooks/usePageTitle";

// Media logos
import blockmediaLogo from "@/assets/logos/blockmedia-new.png";
import bloomingbitLogo from "@/assets/logos/bloomingbit.png";
import coinessLogo from "@/assets/logos/coinness.png";
import coindeskLogo from "@/assets/logos/coindesk.png";
import cointelegraphLogo from "@/assets/logos/cointelegraph.png";
import economistLogo from "@/assets/logos/economist.png";

const ACCENT_COLOR = "#8B5CF6";

// Media partners data
const mediaPartners = {
  global: [
    { name: "CoinDesk", logo: coindeskLogo, articles: 45, reach: "12M+" },
    { name: "CoinTelegraph", logo: cointelegraphLogo, articles: 38, reach: "8M+" },
    { name: "The Economist", logo: economistLogo, articles: 12, reach: "25M+" },
  ],
  korea: [
    { name: "BlockMedia", logo: blockmediaLogo, articles: 120, reach: "500K+" },
    { name: "Bloomingbit", logo: bloomingbitLogo, articles: 85, reach: "300K+" },
    { name: "Coinness", logo: coinessLogo, articles: 95, reach: "400K+" },
  ],
};

const serviceTags: ServiceTag[] = [
  { label: "Press Release" },
  { label: "Media Outreach" },
  { label: "Crisis Management" },
  { label: "Interview Setup" },
  { label: "Content Creation" },
  { label: "Brand Positioning" },
];

const stats: ServiceStat[] = [
  { value: 200, label: "Articles Published", suffix: "+" },
  { value: 50, label: "Media Partners", suffix: "+" },
  { value: 10, label: "Total Reach", suffix: "M+" },
  { value: 95, label: "Coverage Success Rate", suffix: "%" },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Story Development",
    description: "We craft compelling narratives that resonate with Korean media and audiences, positioning your project for maximum impact.",
    icon: Newspaper,
  },
  {
    number: "02",
    title: "Media Outreach",
    description: "We leverage our network of 50+ Korean media outlets to secure premium coverage and interviews.",
    icon: Globe,
  },
  {
    number: "03",
    title: "Content Distribution",
    description: "We coordinate multi-channel distribution across news sites, social media, and community platforms.",
    icon: Newspaper,
  },
  {
    number: "04",
    title: "Impact Tracking",
    description: "We monitor coverage, measure reach, and provide detailed analytics on media performance.",
    icon: Globe,
  },
];

const deliverables: Deliverable[] = [
  {
    title: "Press Materials",
    items: [
      "Press releases (KR/EN)",
      "Media kits & fact sheets",
      "Executive bios",
      "Key messaging documents",
    ],
  },
  {
    title: "Media Coverage",
    items: [
      "Tier 1 outlet placement",
      "Industry publication features",
      "Interview coordination",
      "Op-ed placement",
    ],
  },
  {
    title: "Reporting & Analysis",
    items: [
      "Coverage tracking dashboard",
      "Sentiment analysis",
      "Competitor benchmarking",
      "Monthly PR reports",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Which Korean media outlets do you work with?",
    answer: "We have established relationships with all major Korean crypto outlets including BlockMedia, Bloomingbit, Coinness, TokenPost, and more. We also work with mainstream business media for broader coverage.",
  },
  {
    question: "How long does it take to get media coverage?",
    answer: "Typical turnaround is 3-5 business days from press release to publication. Breaking news or time-sensitive announcements can be expedited to same-day coverage.",
  },
  {
    question: "Do you handle crisis communications?",
    answer: "Yes, we provide 24/7 crisis management support including rapid response messaging, media coordination, and reputation management strategies.",
  },
  {
    question: "Can you arrange interviews with Korean media?",
    answer: "Absolutely. We regularly coordinate interviews with top Korean crypto journalists and podcasters. We handle all logistics including translation support.",
  },
];

const PRService = () => {
  usePageTitle("PR & Media");
  
  const [activeRegion, setActiveRegion] = useState<'global' | 'korea'>('korea');
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  const currentPartners = mediaPartners[activeRegion];

  return (
    <ServicePageLayout
      serviceName="PR & Media Relations"
      serviceTitle="PR &"
      serviceSubtitle="Media"
      serviceDescription="Secure premium coverage across Korean media outlets with our established network of 50+ publishers and journalists."
      serviceIcon={Newspaper}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      processSteps={processSteps}
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="pr-media"
    >
      {/* Media Network Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader number="01" title="Media Network" badge="Global & Korea" />
          
          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left - Description */}
                <div>
                  <p className="text-white/60 text-lg leading-relaxed mb-8">
                    We maintain direct relationships with 50+ media outlets across global and Korean markets. Our network ensures your announcements reach the right audiences with maximum impact.
                  </p>
                  
                  {/* Region Toggle */}
                  <div className="flex gap-2 mb-6">
                    <motion.button
                      onClick={() => setActiveRegion('global')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                        activeRegion === 'global' 
                          ? 'text-white shadow-lg' 
                          : 'bg-white/10 text-white/60 hover:bg-white/20'
                      }`}
                      style={activeRegion === 'global' ? { 
                        backgroundColor: ACCENT_COLOR,
                        boxShadow: `0 10px 40px ${ACCENT_COLOR}40`
                      } : {}}
                    >
                      <Globe className="w-5 h-5" />
                      Global
                    </motion.button>
                    <motion.button
                      onClick={() => setActiveRegion('korea')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                        activeRegion === 'korea' 
                          ? 'text-white shadow-lg' 
                          : 'bg-white/10 text-white/60 hover:bg-white/20'
                      }`}
                      style={activeRegion === 'korea' ? { 
                        backgroundColor: ACCENT_COLOR,
                        boxShadow: `0 10px 40px ${ACCENT_COLOR}40`
                      } : {}}
                    >
                      <span className="text-lg">🇰🇷</span>
                      Korea
                    </motion.button>
                  </div>
                </div>

                {/* Right - Media Partners Grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRegion}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    {currentPartners.map((partner) => (
                      <motion.div
                        key={partner.name}
                        onMouseEnter={() => setHoveredPartner(partner.name)}
                        onMouseLeave={() => setHoveredPartner(null)}
                        whileHover={{ scale: 1.02, y: -4 }}
                        className="relative bg-white/5 border border-white/10 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-white/20 hover:bg-white/10 group"
                      >
                        {/* Logo */}
                        <div className="h-12 flex items-center justify-center mb-4">
                          <img 
                            src={partner.logo} 
                            alt={partner.name}
                            className="max-h-10 max-w-full object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                        
                        {/* Stats */}
                        <div className="text-center">
                          <p className="text-white font-medium mb-1">{partner.name}</p>
                          <div className="flex items-center justify-center gap-4 text-sm text-white/50">
                            <span>{partner.articles} articles</span>
                            <span>•</span>
                            <span>{partner.reach} reach</span>
                          </div>
                        </div>

                        {/* Hover indicator */}
                        <AnimatePresence>
                          {hoveredPartner === partner.name && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="absolute top-3 right-3"
                            >
                              <ArrowUpRight className="w-4 h-4 text-white/60" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Partners Marquee */}
      <MediaPartnersSection />
    </ServicePageLayout>
  );
};

export default PRService;
