import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinksSection from "@/components/FooterLinksSection";
import CalendlyButton from "@/components/CalendlyButton";

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
  const [openStep, setOpenStep] = useState<string | null>(processSteps?.[0]?.number || null);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* ===== Hero — image + title ===== */}
      <section className="pt-20 sm:pt-24">
        {/* Full-width image */}
        <div className="px-3 sm:px-4">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[21/9] sm:aspect-[21/8]">
            <img
              src={defaultPosterSrc}
              alt={serviceName}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.45)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/30" />

            {/* Title overlay — bottom left */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-12">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accentColor}20`, border: `1px solid ${accentColor}40` }}>
                  <ServiceIcon className="w-4 h-4" style={{ color: accentColor }} />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: accentColor }}>{serviceName}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                {serviceTitle}<br />
                <span style={{ color: accentColor }}>{serviceSubtitle}</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Description + CTA + Stats */}
        <div className="px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 pb-10 sm:pb-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <p className="text-sm sm:text-base text-white/45 leading-relaxed max-w-2xl">
              {serviceDescription}
            </p>
            <div className="flex items-center gap-3 flex-shrink-0">
              <CalendlyButton className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold transition-all hover:-translate-y-0.5" style={{ backgroundColor: accentColor }}>
                Book a Meeting
              </CalendlyButton>
              <Link to="/projects" className="text-sm text-white/30 hover:text-white transition-colors">
                Case Studies <ArrowRight className="w-3 h-3 inline" />
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 border-t border-white/[0.06] pt-8">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">{stat.prefix}{stat.value}{stat.suffix}</div>
                <div className="text-[10px] sm:text-xs text-white/30 mt-0.5 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Deliverables ===== */}
      {deliverables && deliverables.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-10 pb-14 sm:pb-20">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-6">What's included</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {deliverables.map((d) => (
              <div key={d.title} className="p-5 sm:p-6 rounded-2xl bg-[#111] border border-white/[0.06]">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                  {d.title}
                </h3>
                <ul className="space-y-1.5">
                  {d.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[13px] text-white/40 leading-relaxed">
                      <span className="text-white/15">—</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== Process accordion ===== */}
      {processSteps && processSteps.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-10 pb-14 sm:pb-20">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-6">How we work</h2>
          <div className="max-w-3xl space-y-2">
            {processSteps.map((step) => {
              const isOpen = openStep === step.number;
              const Icon = step.icon;
              return (
                <div key={step.number} className="border border-white/[0.06] rounded-xl bg-[#111] overflow-hidden">
                  <button onClick={() => setOpenStep(isOpen ? null : step.number)} className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors">
                    <span className="text-xs font-mono tracking-widest flex-shrink-0" style={{ color: accentColor }}>{step.number}</span>
                    <Icon className="w-4 h-4 text-white/20 flex-shrink-0" />
                    <span className="text-sm font-semibold text-white flex-1">{step.title}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown className="w-4 h-4 text-white/20" /></motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <p className="px-5 pb-5 pl-16 text-sm text-white/40 leading-relaxed">{step.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ===== Children ===== */}
      {children}

      {/* ===== FAQ ===== */}
      {faqItems && faqItems.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-10 pb-14 sm:pb-20">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-6">FAQ</h2>
          <div className="max-w-3xl space-y-2">
            {faqItems.map((item, index) => (
              <FAQAccordion key={index} item={item} accentColor={accentColor} />
            ))}
          </div>
        </section>
      )}

      {/* ===== Bottom CTA ===== */}
      <section className="px-4 sm:px-6 lg:px-10 pb-14 sm:pb-20">
        <div className="rounded-2xl bg-[#111] border border-white/[0.06] p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white mb-1">Ready to get started?</h2>
            <p className="text-sm text-white/35">Free 30-min strategy call. No commitment.</p>
          </div>
          <CalendlyButton className="inline-flex items-center px-7 py-3.5 rounded-full text-white text-sm font-semibold flex-shrink-0" style={{ backgroundColor: accentColor }}>
            Book a Meeting
          </CalendlyButton>
        </div>
      </section>

      {/* ===== More services ===== */}
      <section className="px-4 sm:px-6 lg:px-10 pb-10 border-t border-white/[0.04] pt-8">
        <div className="flex flex-wrap gap-2">
          {otherServices.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] text-sm text-white/40 hover:text-white transition-all">
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

const FAQAccordion = ({ item, accentColor }: { item: FAQItem; accentColor: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/[0.06] rounded-xl bg-[#111] overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center gap-3 px-5 py-4 text-left text-sm text-white hover:bg-white/[0.02] transition-colors">
        <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ color: `${accentColor}80` }} />
        <span>{item.question}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="px-5 pb-5 pl-12 text-sm text-white/40 leading-relaxed">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicePageLayout;
