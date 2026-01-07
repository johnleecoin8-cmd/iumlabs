import { Newspaper, Users, FileText, Eye, Share2, BarChart3 } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import MediaPartnersSection from "@/components/MediaPartnersSection";
import { usePageMeta } from "@/hooks/usePageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";

const ACCENT_COLOR = "#8B5CF6";

const breadcrumbItems = [
  { name: "Home", url: "https://iumlabs.io" },
  { name: "Services", url: "https://iumlabs.io/services" },
  { name: "PR & Media", url: "https://iumlabs.io/services/pr" }
];

const serviceTags: ServiceTag[] = [
  { label: "Korean Media Distribution" },
  { label: "Press Release (KR/EN)" },
  { label: "Media Outreach" },
  { label: "Blockmedia/Coinness" },
  { label: "Interview Setup" },
  { label: "Crisis Management" },
];

const stats: ServiceStat[] = [{
  value: 50,
  label: "Articles Published",
  suffix: "+"
}, {
  value: 20,
  label: "Media Partners",
  suffix: "+"
}, {
  value: 5,
  label: "Total Reach",
  suffix: "M+"
}, {
  value: 90,
  label: "Coverage Success Rate",
  suffix: "%"
}];

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
    description: "We leverage our network of 20+ Korean media outlets to secure premium coverage and interviews.",
    icon: Users,
  },
  {
    number: "03",
    title: "Content Distribution",
    description: "We coordinate multi-channel distribution across news sites, social media, and community platforms.",
    icon: Share2,
  },
  {
    number: "04",
    title: "Impact Tracking",
    description: "We monitor coverage, measure reach, and provide detailed analytics on media performance.",
    icon: BarChart3,
  },
];

const deliverables: Deliverable[] = [
  {
    title: "Korean Media",
    items: [
      "Korean press release writing",
      "Blockmedia/Coinness/TokenPost placement",
      "Business section in major outlets",
      "Korean crypto podcast features",
    ],
  },
  {
    title: "Global Media",
    items: [
      "English press release",
      "CoinDesk/Cointelegraph distribution",
      "Global interview coordination",
      "Op-ed contributions",
    ],
  },
  {
    title: "Reporting & Analysis",
    items: [
      "Coverage tracking dashboard",
      "KR/EN sentiment analysis",
      "Competitor benchmarking",
      "Monthly PR report",
    ],
  },
];

const faqItems: FAQItem[] = [
  {
    question: "Which Korean media outlets do you work with?",
    answer: "We have direct partnerships with major Korean crypto media including Blockmedia, Coinness, BloomingBit, and TokenPost. We can also distribute to mainstream business outlets like Chosun Biz and Hankyung.",
  },
  {
    question: "How long does it take to publish a press release?",
    answer: "From writing to publication typically takes 3-5 business days. For urgent news or time-sensitive announcements, same-day publication is possible.",
  },
  {
    question: "Do you support crisis communication?",
    answer: "Yes, we provide 24/7 crisis management support. This includes rapid response messaging, media coordination, and reputation management strategies.",
  },
  {
    question: "Can you arrange Korean media interviews?",
    answer: "Absolutely. We regularly arrange interviews with top Korean crypto journalists and podcasters. We handle all logistics including interpretation support.",
  },
];

const PRService = () => {
  usePageMeta(
    "Korean Crypto PR & Media",
    "Secure premium coverage across 20+ Korean crypto media outlets including Blockmedia, Coinness, and TokenPost. Korean Web3 marketing through strategic PR.",
    "/services/pr"
  );
  return <ServicePageLayout serviceName="PR & Media Relations" serviceTitle="PR &" serviceSubtitle="Media" serviceDescription="Secure premium coverage across Korean media outlets with our established network of 20+ publishers and journalists." serviceIcon={Newspaper} serviceTags={serviceTags} stats={stats} accentColor={ACCENT_COLOR} videoSrc="/videos/pr-hero.mp4" posterSrc="/images/posters/pr-hero.jpg" processSteps={processSteps} deliverables={deliverables} faqItems={faqItems} currentSlug="pr-media">
      {/* Media Network Section */}
      <section className="scroll-reveal bg-[#0F0F0F] relative overflow-hidden">
        {/* Background glow effect */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${ACCENT_COLOR} 0%, transparent 70%)` }}
        />
        
        <div className="border-t border-white/10 relative z-10">
          <SectionHeader title="Media Network" badge="Global & Korea" />
          
          <div className="py-10 md:py-14">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-12">
                  We maintain direct relationships with <span className="text-white font-semibold">20+ media outlets</span> across global and Korean markets. Our network ensures your announcements reach the right audiences with maximum impact.
                </p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                  {/* Media Partners */}
                  <div className="group relative p-4 sm:p-5 md:p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${ACCENT_COLOR}10 0%, transparent 50%)` }}
                    />
                    <div className="relative z-10">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                        style={{ background: `${ACCENT_COLOR}20` }}
                      >
                        <Users className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
                      </div>
                      <div className="text-4xl md:text-5xl font-bold text-white mb-2">20+</div>
                      <div className="text-white/50 text-sm uppercase tracking-wider">Media Partners</div>
                    </div>
                  </div>
                  
                  {/* Articles Published */}
                  <div className="group relative p-4 sm:p-5 md:p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${ACCENT_COLOR}10 0%, transparent 50%)` }}
                    />
                    <div className="relative z-10">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                        style={{ background: `${ACCENT_COLOR}20` }}
                      >
                        <FileText className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
                      </div>
                      <div className="text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
                      <div className="text-white/50 text-sm uppercase tracking-wider">Articles Published</div>
                    </div>
                  </div>
                  
                  {/* Total Reach */}
                  <div className="group relative p-4 sm:p-5 md:p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(135deg, ${ACCENT_COLOR}10 0%, transparent 50%)` }}
                    />
                    <div className="relative z-10">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                        style={{ background: `${ACCENT_COLOR}20` }}
                      >
                        <Eye className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
                      </div>
                      <div className="text-4xl md:text-5xl font-bold text-white mb-2">5M+</div>
                      <div className="text-white/50 text-sm uppercase tracking-wider">Total Reach</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Partners Marquee */}
      <MediaPartnersSection />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema 
        name="Korean Crypto PR & Media"
        description="Secure premium coverage across 20+ Korean crypto media outlets including Blockmedia, Coinness, and TokenPost. Korean Web3 marketing through strategic PR."
        url="/services/pr"
        serviceType={["PR & Media", "Press Release", "Media Outreach", "Crisis Management"]}
      />
    </ServicePageLayout>;
};
export default PRService;