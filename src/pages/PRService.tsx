import { Newspaper, Globe } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import MediaPartnersSection from "@/components/MediaPartnersSection";
import { usePageTitle } from "@/hooks/usePageTitle";

const ACCENT_COLOR = "#8B5CF6";
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
          
          <div className="py-16 md:py-24">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8">
                  We maintain direct relationships with <span className="text-white font-semibold">50+ media outlets</span> across global and Korean markets. Our network ensures your announcements reach the right audiences with maximum impact.
                </p>
                
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-center">
                  <div>
                    <p className="text-3xl md:text-4xl font-bold text-white mb-1">50+</p>
                    <p className="text-sm text-white/40 uppercase tracking-wider">Media Partners</p>
                  </div>
                  <div className="w-px h-12 bg-white/10 hidden md:block" />
                  <div>
                    <p className="text-3xl md:text-4xl font-bold text-white mb-1">500+</p>
                    <p className="text-sm text-white/40 uppercase tracking-wider">Articles Published</p>
                  </div>
                  <div className="w-px h-12 bg-white/10 hidden md:block" />
                  <div>
                    <p className="text-3xl md:text-4xl font-bold text-white mb-1">100M+</p>
                    <p className="text-sm text-white/40 uppercase tracking-wider">Total Reach</p>
                  </div>
                </div>
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
