import { motion } from "framer-motion";
import { FileText, BookOpen, Newspaper, Globe, Quote, Mic, Award } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep } from "@/components/ServicePageLayout";
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
      currentSlug="pr"
    >
      {/* Media Partners Section */}
      <section className="scroll-reveal bg-[#0A0A0A]">
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

      {/* What's Included Section */}
      <section className="scroll-reveal bg-[#0A0A0A]">
        <div className="border-t border-white/10">
          <SectionHeader number="02" title="What's Included" badge="Full-Service PR Package" />

          <div className="py-16 md:py-20">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {includedItems.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-violet-500/30 transition-all"
                  >
                    <Award className="w-5 h-5 mb-2" style={{ color: ACCENT_COLOR }} />
                    <span className="text-white/80 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default PRService;
