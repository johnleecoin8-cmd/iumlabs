import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronRight, LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormSection from "@/components/ContactFormSection";
import SEOHead from "@/components/SEOHead";
import FooterLinksSection from "@/components/FooterLinksSection";
import CalendlyButton from "@/components/CalendlyButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  videoSrc = "/videos/services-background.mp4",
  posterSrc,
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

      {/* ===== HERO: Split Layout ===== */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        <div className="px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            {/* Left — Image/Video */}
            <div className="relative aspect-[4/3] lg:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden">
              <img
                src={defaultPosterSrc}
                alt={serviceName}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "brightness(0.6)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Stats overlay — bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <div className="flex items-center gap-4 sm:gap-6">
                  {stats.slice(0, 3).map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-lg sm:text-2xl font-bold text-white leading-none">
                        {stat.prefix}{stat.value}{stat.suffix}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-white/50 mt-0.5 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Content */}
            <div className="flex flex-col justify-center py-2 lg:py-8">
              {/* Service badge */}
              <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${accentColor}20`, border: `1px solid ${accentColor}40` }}
                >
                  <ServiceIcon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: accentColor }} />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: accentColor }}>
                  {serviceName}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-2">
                {serviceTitle}
                <br />
                <span style={{ color: accentColor }}>{serviceSubtitle}</span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-white/50 leading-relaxed mt-3 mb-6 max-w-lg">
                {serviceDescription}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                {serviceTags.slice(0, 6).map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-[10px] sm:text-[11px] font-medium rounded-full border"
                    style={{
                      color: `${accentColor}cc`,
                      borderColor: `${accentColor}25`,
                      backgroundColor: `${accentColor}08`,
                    }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-3">
                <CalendlyButton
                  className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-white text-sm font-medium transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.97]"
                  style={{ backgroundColor: accentColor }}
                >
                  Book a Meeting
                </CalendlyButton>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-white/60 hover:text-white text-sm font-medium border border-white/[0.08] hover:border-white/[0.15] transition-all"
                >
                  Case Studies
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Deliverables — What You Get ===== */}
      {deliverables && deliverables.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-10 pb-12 sm:pb-16">
          <div className="rounded-2xl sm:rounded-3xl bg-[#111] border border-white/[0.06] p-6 sm:p-8 lg:p-10">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-6 sm:mb-8">What You Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {deliverables.map((deliverable) => (
                <div key={deliverable.title}>
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }} />
                    {deliverable.title}
                  </h3>
                  <ul className="space-y-2">
                    {deliverable.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[13px] text-white/45 leading-relaxed">
                        <span className="text-white/20 mt-0.5 flex-shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== Custom children ===== */}
      {children}

      {/* ===== Process — How We Work ===== */}
      {processSteps && processSteps.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-10 pb-12 sm:pb-16">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-6 sm:mb-8 px-2">How We Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="p-5 sm:p-6 rounded-2xl bg-[#111] border border-white/[0.06] hover:border-white/[0.1] transition-all"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-[11px] font-mono tracking-widest" style={{ color: accentColor }}>
                      {step.number}
                    </span>
                    <Icon className="w-4 h-4 text-white/30" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-[13px] text-white/40 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ===== FAQ ===== */}
      {faqItems && faqItems.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-10 pb-12 sm:pb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-6 sm:mb-8">FAQ</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-white/[0.06] rounded-xl bg-[#111] px-5 overflow-hidden data-[state=open]:border-white/[0.1] transition-all"
                >
                  <AccordionTrigger className="text-left text-white hover:no-underline py-4 text-sm">
                    <span className="flex items-center gap-3">
                      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: `${accentColor}80` }} />
                      <span>{item.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/45 text-sm pb-5 pl-7 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* ===== Other Services — compact ===== */}
      <section className="px-4 sm:px-6 lg:px-10 pb-12 sm:pb-16">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 px-2">More Services</h2>
        <div className="flex flex-wrap gap-2">
          {otherServices.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111] border border-white/[0.06] hover:border-white/[0.12] transition-all text-sm text-white/60 hover:text-white"
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: service.color }} />
              <span>{service.title}</span>
              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section className="bg-[#111]" id="contact">
        <ContactFormSection sectionNumber="05" />
      </section>

      <FooterLinksSection />
      <div className="border-t border-white/10">
        <Footer />
      </div>
    </div>
  );
};

export default ServicePageLayout;
