import { Newspaper, Globe, Users, FileText, Eye } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import MediaPartnersSection from "@/components/MediaPartnersSection";
import { usePageTitle } from "@/hooks/usePageTitle";
const ACCENT_COLOR = "#8B5CF6";
const serviceTags: ServiceTag[] = [{
  label: "Press Release"
}, {
  label: "Media Outreach"
}, {
  label: "Crisis Management"
}, {
  label: "Interview Setup"
}, {
  label: "Content Creation"
}, {
  label: "Brand Positioning"
}];
const stats: ServiceStat[] = [{
  value: 200,
  label: "Articles Published",
  suffix: "+"
}, {
  value: 50,
  label: "Media Partners",
  suffix: "+"
}, {
  value: 10,
  label: "Total Reach",
  suffix: "M+"
}, {
  value: 95,
  label: "Coverage Success Rate",
  suffix: "%"
}];
const processSteps: ProcessStep[] = [{
  number: "01",
  title: "Story Development",
  description: "We craft compelling narratives that resonate with Korean media and audiences, positioning your project for maximum impact.",
  icon: Newspaper
}, {
  number: "02",
  title: "Media Outreach",
  description: "We leverage our network of 50+ Korean media outlets to secure premium coverage and interviews.",
  icon: Globe
}, {
  number: "03",
  title: "Content Distribution",
  description: "We coordinate multi-channel distribution across news sites, social media, and community platforms.",
  icon: Newspaper
}, {
  number: "04",
  title: "Impact Tracking",
  description: "We monitor coverage, measure reach, and provide detailed analytics on media performance.",
  icon: Globe
}];
const deliverables: Deliverable[] = [{
  title: "Press Materials",
  items: ["Press releases (KR/EN)", "Media kits & fact sheets", "Executive bios", "Key messaging documents"]
}, {
  title: "Media Coverage",
  items: ["Tier 1 outlet placement", "Industry publication features", "Interview coordination", "Op-ed placement"]
}, {
  title: "Reporting & Analysis",
  items: ["Coverage tracking dashboard", "Sentiment analysis", "Competitor benchmarking", "Monthly PR reports"]
}];
const faqItems: FAQItem[] = [{
  question: "Which Korean media outlets do you work with?",
  answer: "We have established relationships with all major Korean crypto outlets including BlockMedia, Bloomingbit, Coinness, TokenPost, and more. We also work with mainstream business media for broader coverage."
}, {
  question: "How long does it take to get media coverage?",
  answer: "Typical turnaround is 3-5 business days from press release to publication. Breaking news or time-sensitive announcements can be expedited to same-day coverage."
}, {
  question: "Do you handle crisis communications?",
  answer: "Yes, we provide 24/7 crisis management support including rapid response messaging, media coordination, and reputation management strategies."
}, {
  question: "Can you arrange interviews with Korean media?",
  answer: "Absolutely. We regularly coordinate interviews with top Korean crypto journalists and podcasters. We handle all logistics including translation support."
}];
const PRService = () => {
  usePageTitle("PR & Media");
  return <ServicePageLayout serviceName="PR & Media Relations" serviceTitle="PR &" serviceSubtitle="Media" serviceDescription="Secure premium coverage across Korean media outlets with our established network of 50+ publishers and journalists." serviceIcon={Newspaper} serviceTags={serviceTags} stats={stats} accentColor={ACCENT_COLOR} processSteps={processSteps} deliverables={deliverables} faqItems={faqItems} currentSlug="pr-media">
      {/* Media Network Section */}
      <section className="scroll-reveal bg-[#0F0F0F] relative overflow-hidden">
        {/* Background glow effect */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${ACCENT_COLOR} 0%, transparent 70%)` }}
        />
        
        <div className="border-t border-white/10 relative z-10">
          <SectionHeader number="01" title="Media Network" badge="Global & Korea" />
          
          <div className="py-16 md:py-24">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-12">
                  We maintain direct relationships with <span className="text-white font-semibold">50+ media outlets</span> across global and Korean markets. Our network ensures your announcements reach the right audiences with maximum impact.
                </p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {/* Media Partners */}
                  <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300">
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
                      <div className="text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
                      <div className="text-white/50 text-sm uppercase tracking-wider">Media Partners</div>
                    </div>
                  </div>
                  
                  {/* Articles Published */}
                  <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300">
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
                      <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
                      <div className="text-white/50 text-sm uppercase tracking-wider">Articles Published</div>
                    </div>
                  </div>
                  
                  {/* Total Reach */}
                  <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300">
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
                      <div className="text-4xl md:text-5xl font-bold text-white mb-2">10M+</div>
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
    </ServicePageLayout>;
};
export default PRService;