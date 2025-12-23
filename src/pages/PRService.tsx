import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, BookOpen, Newspaper, Globe, Quote, Mic, Award, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import { usePageTitle } from "@/hooks/usePageTitle";
import prImage from "@/assets/services/pr-media.jpg";

// Import media logos
import cointelegraphLogo from "@/assets/logos/cointelegraph.png";
import coindeskLogo from "@/assets/logos/coindesk.png";
import blockmediaLogo from "@/assets/logos/blockmedia-new.png";
import bloomingbitLogo from "@/assets/logos/bloomingbit.png";
import coinessLogo from "@/assets/logos/coinness.png";

const ACCENT_COLOR = "#8B5CF6";

const serviceTags: ServiceTag[] = [
  { label: "Press Releases" },
  { label: "Media Outreach" },
  { label: "Story Development" },
  { label: "Journalist Network" },
  { label: "Content Creation" },
  { label: "Brand Positioning" },
];

const stats: ServiceStat[] = [
  { value: 200, label: "Articles Published", suffix: "+" },
  { value: 50, label: "Media Partners", suffix: "+" },
  { value: 30, label: "Top-Tier Placements", suffix: "+" },
  { value: 95, label: "Client Satisfaction", suffix: "%" },
];

const processSteps: ProcessStep[] = [
  { 
    number: "01",
    title: "Story Discovery",
    description: "We research your project, identify newsworthy angles, and develop compelling narratives.",
    icon: FileText
  },
  { 
    number: "02",
    title: "Content Creation",
    description: "Our editorial team crafts press releases, articles, and media kits tailored to each outlet.",
    icon: BookOpen
  },
  { 
    number: "03",
    title: "Media Outreach",
    description: "We pitch to our network of journalists and secure placements across top publications.",
    icon: Newspaper
  },
  { 
    number: "04",
    title: "Publication & Amplification",
    description: "Articles go live, and we amplify reach through social and community channels.",
    icon: Globe
  },
];

const deliverables: Deliverable[] = [
  {
    title: "Content Production",
    items: [
      "Press release writing",
      "Article drafting",
      "Media kit creation",
      "Executive bios & quotes",
    ],
  },
  {
    title: "Media Relations",
    items: [
      "Journalist outreach",
      "Interview coordination",
      "Exclusive story pitching",
      "Relationship management",
    ],
  },
  {
    title: "Coverage & Reporting",
    items: [
      "Publication tracking",
      "Coverage reports",
      "Social amplification",
      "Monthly PR summary",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Which media outlets do you work with?",
    answer: "We have relationships with major crypto outlets (CoinDesk, CoinTelegraph, The Block) and Korean media (BlockMedia, Bloomingbit, Coinness). We also work with mainstream tech and finance publications for broader reach.",
  },
  {
    question: "How long does it take to get published?",
    answer: "Timing varies by outlet and story type. Breaking news can be published within 24-48 hours. Feature stories typically take 1-2 weeks from pitch to publication.",
  },
  {
    question: "Do you guarantee placements?",
    answer: "While we can't guarantee specific placements (editorial independence matters), our track record shows 90%+ success rate for well-prepared stories. We focus on building genuine media relationships.",
  },
  {
    question: "Can you help with crisis communications?",
    answer: "Yes, we provide crisis PR support including rapid response drafting, media monitoring, and stakeholder communication. We recommend having a crisis plan in place before issues arise.",
  },
];

const mediaPartners = [
  { name: "CoinTelegraph", logo: cointelegraphLogo, type: "Global" },
  { name: "CoinDesk", logo: coindeskLogo, type: "Global" },
  { name: "BlockMedia", logo: blockmediaLogo, type: "Korea" },
  { name: "Bloomingbit", logo: bloomingbitLogo, type: "Korea" },
  { name: "Coinness", logo: coinessLogo, type: "Korea" },
];

const includedItems = [
  "Press Release Writing",
  "Media Kit Creation",
  "Journalist Outreach",
  "Interview Coordination",
  "Story Angle Development",
  "Publication Tracking",
  "Social Amplification",
  "Monthly Reporting",
];

// Featured coverage articles
const featuredCoverage = [
  {
    title: "Breaking: Layer 1 Protocol Announces Korean Market Expansion",
    outlet: "CoinDesk",
    date: "Dec 2024",
    type: "Exclusive",
    excerpt: "The protocol has partnered with Ium Labs to spearhead its Korean market entry strategy...",
  },
  {
    title: "DeFi Protocol Raises $30M in Successful TGE",
    outlet: "CoinTelegraph",
    date: "Nov 2024",
    type: "Feature",
    excerpt: "With strategic PR support, the token launch achieved top trending status across major platforms...",
  },
  {
    title: "NFT Marketplace Achieves Top 3 Ranking in Korea",
    outlet: "BlockMedia",
    date: "Oct 2024",
    type: "Interview",
    excerpt: "An exclusive interview with the founding team on their rapid growth in the Korean market...",
  },
];

const PRService = () => {
  usePageTitle("PR & Media");
  const [activeCoverage, setActiveCoverage] = useState(0);
  
  return (
    <ServicePageLayout
      serviceName="PR & Media"
      serviceTitle="PR &"
      serviceSubtitle="Media"
      serviceDescription="We help you craft the right narrative and secure placements in top crypto and tech media. From article creation to journalist outreach and timing coordination."
      serviceIcon={Newspaper}
      serviceTags={serviceTags}
      stats={stats}
      accentColor={ACCENT_COLOR}
      processSteps={processSteps}
      deliverables={deliverables}
      faqItems={faqItems}
      currentSlug="pr"
    >
      {/* Media Partners Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader number="01" title="Media Partners" badge="Where Your Story Gets Published" />

          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16">
                {mediaPartners.map((partner, index) => (
                  <motion.div
                    key={index}
                    className="relative p-6 border border-white/10 bg-white/5 flex flex-col items-center justify-center group hover:border-violet-500/50 transition-all rounded-xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="h-8 object-contain brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity mb-3"
                    />
                    <span className="text-[10px] uppercase tracking-wider text-white/40">{partner.type}</span>
                  </motion.div>
                ))}
              </div>

              {/* Quote & Image Section */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Quote className="w-16 h-16 mb-6 opacity-30" style={{ color: ACCENT_COLOR }} />
                  
                  <blockquote className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                    "In crypto, perception shapes reality. The right story in the right publication can define your project's trajectory."
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${ACCENT_COLOR}, ${ACCENT_COLOR}80)` }}
                    >
                      <Mic className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Ium Labs PR Team</div>
                      <div className="text-sm text-white/60">Strategic Communications</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <img 
                    src={prImage} 
                    alt="PR & Media" 
                    className="w-full h-[450px] object-cover rounded-xl"
                    style={{ boxShadow: `0 0 60px ${ACCENT_COLOR}20` }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Coverage Section */}
      <section className="scroll-reveal bg-[#121212]">
        <div className="border-t border-white/10">
          <SectionHeader number="02" title="Featured Coverage" badge="Recent Placements" />

          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              {/* Navigation */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  {featuredCoverage.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveCoverage(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeCoverage === idx 
                          ? 'w-8 bg-violet-500' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveCoverage(prev => prev === 0 ? featuredCoverage.length - 1 : prev - 1)}
                    className="p-2 rounded-full border border-white/20 hover:border-violet-500/50 hover:bg-violet-500/10 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4 text-white/60" />
                  </button>
                  <button
                    onClick={() => setActiveCoverage(prev => (prev + 1) % featuredCoverage.length)}
                    className="p-2 rounded-full border border-white/20 hover:border-violet-500/50 hover:bg-violet-500/10 transition-all"
                  >
                    <ChevronRight className="w-4 h-4 text-white/60" />
                  </button>
                </div>
              </div>

              {/* Coverage Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCoverage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-violet-500/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${ACCENT_COLOR}20`, color: ACCENT_COLOR }}
                      >
                        {featuredCoverage[activeCoverage].type}
                      </span>
                      <span className="text-white/40 text-sm">{featuredCoverage[activeCoverage].outlet}</span>
                      <span className="text-white/30 text-sm">·</span>
                      <span className="text-white/40 text-sm">{featuredCoverage[activeCoverage].date}</span>
                    </div>
                    <ExternalLink className="w-5 h-5 text-white/40" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                    {featuredCoverage[activeCoverage].title}
                  </h3>
                  
                  <p className="text-white/60 text-lg leading-relaxed">
                    {featuredCoverage[activeCoverage].excerpt}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default PRService;