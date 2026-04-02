import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinksSection from "@/components/FooterLinksSection";
import CalendlyButton from "@/components/CalendlyButton";
import { projectsData as allProjectsDataMap } from "@/data/projectsData";

// Service → project mapping (slug, name, result)
const serviceProjects: Record<string, Array<{ slug: string; name: string; result: string }>> = {
  gtm: [
    { slug: "bnb-chain", name: "BNB Chain", result: "+420% volume surge in 2 weeks" },
    { slug: "bybit", name: "Bybit", result: "#2 exchange by Korean traffic" },
    { slug: "fogo", name: "FOGO", result: "250+ attendees & 55 KOL partners" },
  ],
  branding: [
    { slug: "story-protocol", name: "Story Protocol", result: "500+ creators at IP workshop" },
    { slug: "megaeth", name: "MegaETH", result: "2M+ impressions pre-mainnet" },
    { slug: "tria", name: "Tria", result: "450K+ impressions in 6 months" },
  ],
  "seo-ads": [
    { slug: "kucoin", name: "KuCoin", result: "$550M+ TVL & +600% SEO growth" },
    { slug: "bybit", name: "Bybit", result: "150+ first-page SEO rankings" },
    { slug: "synfutures", name: "SynFutures", result: "5M+ OOH impressions in Gangnam" },
  ],
  "offline-event": [
    { slug: "bnb-chain", name: "BNB Chain", result: "VIP networking with 150+ leaders" },
    { slug: "sahara-ai", name: "Sahara AI", result: "400+ attendees at AI launch events" },
    { slug: "fogo", name: "FOGO", result: "250+ attendees at launch event" },
  ],
  community: [
    { slug: "mantra", name: "Mantra", result: "$50M+ pipeline & Korea CEX listing" },
    { slug: "ondo-finance", name: "Ondo Finance", result: "100K+ community members" },
    { slug: "peaq", name: "Peaq", result: "#1 Machine Economy brand in Korea" },
  ],
  "deep-research": [
    { slug: "polygon", name: "Polygon", result: "200+ developers at L2 hackathon" },
    { slug: "ondo-finance", name: "Ondo Finance", result: "50+ institutional leads via seminars" },
    { slug: "megaeth", name: "MegaETH", result: "Technical deep-dives pre-mainnet" },
  ],
  influencer: [
    { slug: "kucoin", name: "KuCoin", result: "100+ Korean influencers onboarded" },
    { slug: "bnb-chain", name: "BNB Chain", result: "150+ VIP community leaders" },
    { slug: "peaq", name: "Peaq", result: "Top Korean crypto KOL campaigns" },
  ],
  pr: [
    { slug: "synfutures", name: "SynFutures", result: "Gangnam billboard + digital PR" },
    { slug: "sahara-ai", name: "Sahara AI", result: "Major Korean financial media features" },
    { slug: "mantra", name: "Mantra", result: "Institutional Korean media coverage" },
  ],
  ama: [
    { slug: "bnb-chain", name: "BNB Chain", result: "High-impact KOL AMA campaigns" },
    { slug: "peaq", name: "Peaq", result: "Strategic AMAs with top communities" },
    { slug: "fogo", name: "FOGO", result: "Community AMA & KOL partnerships" },
  ],
};

const allServices = [
  { slug: "gtm", title: "GTM Strategy", color: "#10B981" },
  { slug: "branding", title: "Branding & Website", color: "#8B5CF6" },
  { slug: "seo-ads", title: "SEO & Paid Ads", color: "#F59E0B" },
  { slug: "offline-event", title: "Offline Event", color: "#10B981" },
  { slug: "community", title: "Community Management", color: "#5865F2" },
  { slug: "deep-research", title: "Deep Research", color: "#06B6D4" },
  { slug: "influencer", title: "Influencer/KOL", color: "#F59E0B" },
  { slug: "pr", title: "PR & Media", color: "#8B5CF6" },
  { slug: "ama", title: "AMA Hosting", color: "#EC4899" },
];

export interface ServiceStat { value: number; label: string; prefix?: string; suffix?: string; }
export interface ServiceTag { label: string; }
export interface ProcessStep { number: string; title: string; description: string; icon: LucideIcon; }
export interface Deliverable { title: string; items: string[]; }
export interface FAQItem { question: string; answer: string; }

interface ServicePageLayoutProps {
  serviceName: string;
  serviceTitle: string;
  serviceSubtitle: string;
  serviceDescription: string;
  serviceIcon: LucideIcon;
  serviceTags: ServiceTag[];
  stats: ServiceStat[];
  accentColor: string;
  videoSrc?: string;
  posterSrc?: string;
  processSteps?: ProcessStep[];
  deliverables?: Deliverable[];
  faqItems?: FAQItem[];
  children?: ReactNode;
  currentSlug: string;
}

const ServicePageLayout = ({
  serviceName,
  serviceTitle,
  serviceSubtitle,
  serviceDescription,
  serviceIcon: ServiceIcon,
  serviceTags,
  stats,
  accentColor,
  posterSrc,
  videoSrc = "/videos/services-background.mp4",
  processSteps,
  deliverables,
  faqItems,
  children,
  currentSlug,
}: ServicePageLayoutProps) => {
  const defaultPosterSrc = posterSrc || (videoSrc ? videoSrc.replace('/videos/', '/images/posters/').replace('.mp4', '.jpg') : '/images/hero-poster.jpg');
  const otherServices = allServices.filter(s => s.slug !== currentSlug);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* ===== Hero image ===== */}
      <section className="pt-20 sm:pt-24">
        <div className="px-3 sm:px-4">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[21/9] sm:aspect-[21/8]">
            {/* Poster fallback */}
            <img src={defaultPosterSrc} alt={serviceName} className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.55)" }} />
            {/* Video overlay */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-[1]"
              style={{ filter: "brightness(0.55)" }}
            >
              <source src={`${videoSrc}#t=0.001`} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/30 z-[2]" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 lg:p-10 z-[3]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accentColor}20`, border: `1px solid ${accentColor}40` }}>
                  <ServiceIcon className="w-3.5 h-3.5" style={{ color: accentColor }} />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: accentColor }}>{serviceName}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                {serviceTitle}<br /><span style={{ color: accentColor }}>{serviceSubtitle}</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Description + CTA + Stats — tight */}
        <div className="px-4 sm:px-6 lg:px-10 pt-5 pb-6 sm:pb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
            <p className="text-sm text-white/45 leading-relaxed max-w-2xl">{serviceDescription}</p>
            <div className="flex items-center gap-3 flex-shrink-0">
              <CalendlyButton className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-all hover:-translate-y-0.5" style={{ backgroundColor: accentColor }}>
                Book a Meeting
              </CalendlyButton>
              <Link to="/projects" className="text-xs text-white/30 hover:text-white transition-colors">
                Case Studies <ArrowRight className="w-3 h-3 inline" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 border-t border-white/[0.06] pt-5">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-xl sm:text-2xl font-black text-white tracking-tight">{stat.prefix}{stat.value}{stat.suffix}</div>
                <div className="text-[10px] text-white/30 mt-0.5 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Deliverables ===== */}
      {deliverables && deliverables.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-10 pb-8 sm:pb-12">
          <h2 className="text-base sm:text-lg font-bold text-white mb-4">What's included</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {deliverables.map((d) => (
              <div key={d.title} className="p-4 sm:p-5 rounded-xl bg-[#111] border border-white/[0.06]">
                <h3 className="text-sm font-semibold text-white mb-2.5 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                  {d.title}
                </h3>
                <ul className="space-y-1">
                  {d.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[13px] text-white/40 leading-relaxed">
                      <span className="text-white/15">—</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== Projects using this service ===== */}
      {serviceProjects[currentSlug] && serviceProjects[currentSlug].length > 0 && (
        <section className="px-4 sm:px-6 lg:px-10 pb-8 sm:pb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-bold text-white">Projects</h2>
            <Link to="/projects" className="text-xs text-white/30 hover:text-white transition-colors">
              View all <ArrowRight className="w-3 h-3 inline" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {serviceProjects[currentSlug].map((p) => {
              const projectData = allProjectsDataMap[p.slug];
              const bgImage = projectData?.bgImage || projectData?.featureImage || '';
              return (
                <Link key={p.slug} to={`/projects/${p.slug}`} className="group block relative rounded-xl overflow-hidden aspect-[16/10]">
                  <img src={bgImage} alt={p.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <h3 className="text-sm font-semibold text-white mb-0.5">{p.name}</h3>
                    <p className="text-[11px] text-white/50">{p.result}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ===== Process + FAQ — 2-column split ===== */}
      {(processSteps && processSteps.length > 0 || faqItems && faqItems.length > 0) && (
        <section className="px-4 sm:px-6 lg:px-10 pb-8 sm:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left — Process */}
            {processSteps && processSteps.length > 0 && (
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white mb-5">How we work</h2>
                <div className="space-y-5">
                  {processSteps.map((step) => (
                    <div key={step.number} className="flex gap-4">
                      <span className="text-xl sm:text-2xl font-black tracking-tighter leading-none pt-0.5" style={{ color: `${accentColor}40` }}>{step.number}</span>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-white mb-1">{step.title}</h3>
                        <p className="text-sm text-white/40 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Right — FAQ */}
            {faqItems && faqItems.length > 0 && (
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white mb-5">FAQ</h2>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index}>
                      <p className="text-sm font-semibold text-white mb-1">{item.question}</p>
                      <p className="text-sm text-white/40 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {children}

      {/* ===== CTA ===== */}
      <section className="px-4 sm:px-6 lg:px-10 pb-8 sm:pb-12">
        <div className="rounded-xl bg-[#111] border border-white/[0.06] p-5 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white mb-0.5">Ready to get started?</h2>
            <p className="text-sm text-white/35">Free 30-min strategy call. No commitment.</p>
          </div>
          <CalendlyButton className="inline-flex items-center px-6 py-3 rounded-full text-white text-sm font-semibold flex-shrink-0" style={{ backgroundColor: accentColor }}>
            Book a Meeting
          </CalendlyButton>
        </div>
      </section>

      {/* ===== More services ===== */}
      <section className="px-4 sm:px-6 lg:px-10 pb-6 border-t border-white/[0.04] pt-6">
        <div className="flex flex-wrap gap-2">
          {otherServices.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] text-sm text-white/40 hover:text-white transition-all">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />{s.title}
            </Link>
          ))}
        </div>
      </section>

      <FooterLinksSection />
      <div className="border-t border-white/10"><Footer /></div>
    </div>
  );
};

export default ServicePageLayout;
