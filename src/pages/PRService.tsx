import { FileText, BookOpen, Newspaper, Globe, Quote, Mic } from "lucide-react";
import { motion } from "framer-motion";
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
import economistLogo from "@/assets/logos/economist.png";

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

// Simple media partner logos
const mediaLogos = [
  { name: "CoinTelegraph", logo: cointelegraphLogo },
  { name: "CoinDesk", logo: coindeskLogo },
  { name: "BlockMedia", logo: blockmediaLogo },
  { name: "Bloomingbit", logo: bloomingbitLogo },
  { name: "Coinness", logo: coinessLogo },
  { name: "The Economist", logo: economistLogo },
];

const PRService = () => {
  usePageTitle("PR & Media");
  
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
      {/* Simple Logo Wall Section */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <SectionHeader number="01" title="Media Partners" badge="Our Network" />

          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              {/* Logo Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {mediaLogos.map((partner, index) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center justify-center p-6 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all"
                  >
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="h-8 max-w-[100px] object-contain brightness-0 invert opacity-50 hover:opacity-100 transition-opacity"
                    />
                  </motion.div>
                ))}
              </div>

              <p className="text-center text-white/40 text-sm mt-10">
                And 40+ more media partners across global and Korean markets
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote & Image Section */}
      <section className="scroll-reveal bg-[#121212]">
        <div className="border-t border-white/10">
          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
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
    </ServicePageLayout>
  );
};

export default PRService;
