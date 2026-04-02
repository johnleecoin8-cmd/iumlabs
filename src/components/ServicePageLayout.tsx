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

export interface ServiceStat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface ServiceTag {
  label: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Deliverable {
  title: string;
  items: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

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

      {/* ===== 1. Hero — minimal + stats bar ===== */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-0">
        <div className="px-4 sm:px-6 lg:px-10">
          {/* Badge */}
          <div className="flex items-center gap-2.5 mb-5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}15`, border: `1px solid ${accentColor}30` }}
            >
              <ServiceIcon className="w-5 h-5" style={{ color: accentColor }} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: accentColor }}>
              {serviceName}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight max-w-4xl">
            {serviceTitle}
            <br />
            <span style={{ color: accentColor }}>{serviceSubtitle}</span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-white/45 leading-relaxed mt-4 mb-8 max-w-2xl">
            {serviceDescription}
          </p>

          {/* CTA row */}
          <div className="flex items-center gap-3 mb-10">
            <CalendlyButton
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.97]"
              style={{ backgroundColor: accentColor }}
            >
              Book a Meeting
            </CalendlyButton>
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
              See our work <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Stats bar */}
          <div className="border-t border-white/[0.06] pt-8 pb-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10">
              {stats.map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-none">
                    {stat.prefix}{stat.value}{stat.suffix}
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/35 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. Problem — why Korea is hard ===== */}
      <section className="px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
        <div className="max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Why this matters</h2>
          <p className="text-sm sm:text-base text-white/40 leading-relaxed">
            Korea is the #2 crypto market by trading volume, but most global projects fail here.
            The market is trust-first, retail-driven, and culturally specific — translated global campaigns don't work.
            You need a local team, native KOLs, and platform-specific strategies for Telegram, KakaoTalk, Naver, and Korean exchanges.
          </p>
        </div>
      </section>

      {/* ===== 3. Service details — dash list + deliverables ===== */}
      {deliverables && deliverables.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-10 pb-14 sm:pb-20">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-8">What's included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {deliverables.map((d) => (
              <div key={d.title} className="p-5 sm:p-6 rounded-2xl bg-[#111] border border-white/[0.06]">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                  {d.title}
                </h3>
                <ul className="space-y-2">
                  {d.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[13px] text-white/40 leading-relaxed">
                      <span className="text-white/15 flex-shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== 4. Process — accordion ===== */}
      {processSteps && processSteps.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-10 pb-14 sm:pb-20">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-8">How we work</h2>
          <div className="max-w-3xl space-y-2">
            {processSteps.map((step) => {
              const isOpen = openStep === step.number;
              const Icon = step.icon;
              return (
                <div key={step.number} className="border border-white/[0.06] rounded-xl bg-[#111] overflow-hidden">
                  <button
                    onClick={() => setOpenStep(isOpen ? null : step.number)}
                    className="w-full flex items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-xs font-mono tracking-widest flex-shrink-0" style={{ color: accentColor }}>
                      {step.number}
                    </span>
                    <Icon className="w-4 h-4 text-white/25 flex-shrink-0" />
                    <span className="text-sm sm:text-base font-semibold text-white flex-1">{step.title}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4 text-white/20" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-16 sm:pl-20">
                          <p className="text-sm text-white/40 leading-relaxed">{step.description}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ===== 5. Custom children (case studies etc) ===== */}
      {children}

      {/* ===== 6. Tags ===== */}
      <section className="px-4 sm:px-6 lg:px-10 pb-10">
        <div className="flex flex-wrap gap-2">
          {serviceTags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1.5 text-[11px] font-medium rounded-full border"
              style={{ color: `${accentColor}bb`, borderColor: `${accentColor}25`, backgroundColor: `${accentColor}08` }}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </section>

      {/* ===== 7. FAQ ===== */}
      {faqItems && faqItems.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-10 pb-14 sm:pb-20">
          <div className="max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">FAQ</h2>
            <div className="space-y-2">
              {faqItems.map((item, index) => {
                const [isOpen, setIsOpen] = useState(false);
                return (
                  <div key={index} className="border border-white/[0.06] rounded-xl bg-[#111] overflow-hidden">
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full flex items-center gap-3 px-5 py-4 text-left text-sm text-white hover:bg-white/[0.02] transition-colors"
                    >
                      <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ color: `${accentColor}80` }} />
                      <span>{item.question}</span>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 pl-12 text-sm text-white/40 leading-relaxed">{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== 8. CTA — structured ===== */}
      <section className="px-4 sm:px-6 lg:px-10 pb-14 sm:pb-20">
        <div className="rounded-2xl sm:rounded-3xl bg-[#111] border border-white/[0.06] p-6 sm:p-10 lg:p-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Ready to get started?</h2>
            <p className="text-sm text-white/40">Book a free 30-minute strategy call. No commitment.</p>
          </div>
          <CalendlyButton
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-white text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.97] flex-shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            Book a Meeting
          </CalendlyButton>
        </div>
      </section>

      {/* ===== 9. Other services — pill links ===== */}
      <section className="px-4 sm:px-6 lg:px-10 pb-10 border-t border-white/[0.04] pt-10">
        <h2 className="text-sm font-medium text-white/25 uppercase tracking-wider mb-4">More services</h2>
        <div className="flex flex-wrap gap-2">
          {otherServices.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] transition-all text-sm text-white/45 hover:text-white"
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
              {s.title}
            </Link>
          ))}
        </div>
      </section>

      <FooterLinksSection />
      <div className="border-t border-white/10">
        <Footer />
      </div>
    </div>
  );
};

export default ServicePageLayout;
