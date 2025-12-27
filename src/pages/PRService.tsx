import { Newspaper, Globe, Users, FileText, Eye } from "lucide-react";
import ServicePageLayout, { ServiceStat, ServiceTag, ProcessStep, Deliverable, FAQItem } from "@/components/ServicePageLayout";
import SectionHeader from "@/components/SectionHeader";
import MediaPartnersSection from "@/components/MediaPartnersSection";
import { usePageTitle } from "@/hooks/usePageTitle";

const ACCENT_COLOR = "#8B5CF6";

const serviceTags: ServiceTag[] = [{
  label: "한국 미디어 배포"
}, {
  label: "Press Release (KR/EN)"
}, {
  label: "Media Outreach"
}, {
  label: "블록미디어/코인니스"
}, {
  label: "Interview Setup"
}, {
  label: "Crisis Management"
}];

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

const processSteps: ProcessStep[] = [{
  number: "01",
  title: "Story Development",
  description: "We craft compelling narratives that resonate with Korean media and audiences, positioning your project for maximum impact.",
  icon: Newspaper
}, {
  number: "02",
  title: "Media Outreach",
  description: "We leverage our network of 20+ Korean media outlets to secure premium coverage and interviews.",
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
  title: "한국 미디어",
  items: ["한국어 보도자료 작성", "블록미디어/코인니스/토큰포스트", "경제지 비즈니스 섹션", "한국 크립토 팟캐스트"]
}, {
  title: "글로벌 미디어",
  items: ["영문 Press Release", "CoinDesk/Cointelegraph 배포", "글로벌 인터뷰 조율", "Op-ed 기고"]
}, {
  title: "Reporting & Analysis",
  items: ["커버리지 트래킹 대시보드", "한/영 Sentiment 분석", "경쟁사 벤치마킹", "월간 PR 리포트"]
}];

const faqItems: FAQItem[] = [{
  question: "어떤 한국 미디어와 협력하나요?",
  answer: "블록미디어, 코인니스, 블루밍비트, 토큰포스트 등 주요 한국 크립토 미디어와 직접 협력 관계를 맺고 있습니다. 조선비즈, 한경 등 주류 경제지에도 배포 가능합니다."
}, {
  question: "보도자료 게재까지 얼마나 걸리나요?",
  answer: "보도자료 작성부터 게재까지 보통 3-5 영업일이 소요됩니다. 긴급 뉴스나 시간이 촉박한 발표는 당일 게재도 가능합니다."
}, {
  question: "위기 대응 커뮤니케이션도 지원하나요?",
  answer: "네, 24/7 위기 관리 지원을 제공합니다. 신속 대응 메시지 작성, 미디어 조율, 평판 관리 전략을 포함합니다."
}, {
  question: "한국 미디어 인터뷰 주선이 가능한가요?",
  answer: "물론입니다. 한국 주요 크립토 기자 및 팟캐스터와의 인터뷰를 정기적으로 주선합니다. 통역 지원을 포함한 모든 로지스틱을 처리해 드립니다."
}];

const PRService = () => {
  usePageTitle("PR & Media");
  return <ServicePageLayout serviceName="PR & Media Relations" serviceTitle="PR &" serviceSubtitle="Media" serviceDescription="Secure premium coverage across Korean media outlets with our established network of 20+ publishers and journalists." serviceIcon={Newspaper} serviceTags={serviceTags} stats={stats} accentColor={ACCENT_COLOR} processSteps={processSteps} deliverables={deliverables} faqItems={faqItems} currentSlug="pr-media">
      {/* Media Network Section */}
      <section className="scroll-reveal bg-[#0F0F0F] relative overflow-hidden">
        {/* Background glow effect */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${ACCENT_COLOR} 0%, transparent 70%)` }}
        />
        
        <div className="border-t border-white/10 relative z-10">
          <SectionHeader number="01" title="Media Network" badge="Global & Korea" />
          
          <div className="py-12 md:py-16">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-12">
                  We maintain direct relationships with <span className="text-white font-semibold">20+ media outlets</span> across global and Korean markets. Our network ensures your announcements reach the right audiences with maximum impact.
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
                      <div className="text-4xl md:text-5xl font-bold text-white mb-2">20+</div>
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
                      <div className="text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
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
    </ServicePageLayout>;
};
export default PRService;