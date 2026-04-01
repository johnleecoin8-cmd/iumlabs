import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

      {/* ===== Mini Hero ===== */}
      <section className="pt-28 sm:pt-32 lg:pt-36 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2.5 mb-5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}20`, border: `1px solid ${accentColor}40` }}
            >
              <ServiceIcon className="w-4 h-4" style={{ color: accentColor }} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: accentColor }}>
              {serviceName}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
            {serviceTitle}<br />
            <span style={{ color: accentColor }}>{serviceSubtitle}</span>
          </h1>
        </div>
      </section>

      {/* ===== Full-width image ===== */}
      <section className="px-4 sm:px-6 lg:px-10 pb-10 sm:pb-14">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[21/9]">
          <img
            src={defaultPosterSrc}
            alt={serviceName}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.5)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {/* Stats on image */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 flex items-center gap-6 sm:gap-10">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-xl sm:text-3xl font-bold text-white leading-none">
                  {stat.prefix}{stat.value}{stat.suffix}
                </div>
                <div className="text-[9px] sm:text-[11px] text-white/50 mt-0.5 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Long-form content ===== */}
      <article className="px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20">
        <div className="max-w-3xl mx-auto">

          {/* Description */}
          <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-10">
            {serviceDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {serviceTags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-[11px] font-medium rounded-full border"
                style={{ color: `${accentColor}cc`, borderColor: `${accentColor}25`, backgroundColor: `${accentColor}08` }}
              >
                {tag.label}
              </span>
            ))}
          </div>

          {/* ---- What's Included ---- */}
          {deliverables && deliverables.length > 0 && (
            <div className="mb-14">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-8">What's Included</h2>
              <div className="space-y-8">
                {deliverables.map((d) => (
                  <div key={d.title}>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                      {d.title}
                    </h3>
                    <ul className="space-y-1.5 pl-4">
                      {d.items.map((item, idx) => (
                        <li key={idx} className="text-[14px] text-white/45 leading-relaxed flex items-start gap-3">
                          <span className="text-white/20 flex-shrink-0">—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---- Process ---- */}
          {processSteps && processSteps.length > 0 && (
            <div className="mb-14">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-8">How We Work</h2>
              <div className="space-y-6">
                {processSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.number} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.04] border border-white/[0.06]">
                        <span className="text-xs font-mono" style={{ color: accentColor }}>{step.number}</span>
                      </div>
                      <div className="pt-1">
                        <h3 className="text-sm font-semibold text-white mb-1">{step.title}</h3>
                        <p className="text-[14px] text-white/40 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ---- FAQ (inline) ---- */}
          {faqItems && faqItems.length > 0 && (
            <div className="mb-14">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-8">FAQ</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-white/[0.06] rounded-xl bg-white/[0.02] px-5 overflow-hidden data-[state=open]:border-white/[0.1] transition-all"
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
          )}

          {/* ---- CTA ---- */}
          <div className="border-t border-white/[0.06] pt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <CalendlyButton
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-white text-sm font-medium transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.97]"
              style={{ backgroundColor: accentColor }}
            >
              Book a Meeting
            </CalendlyButton>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
            >
              Or send us a message <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </article>

      {/* ===== Other Services — pill tags ===== */}
      <section className="px-4 sm:px-6 lg:px-10 pb-12 sm:pb-16 border-t border-white/[0.04] pt-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-medium text-white/30 uppercase tracking-wider mb-4">More Services</h2>
          <div className="flex flex-wrap gap-2">
            {otherServices.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all text-sm text-white/50 hover:text-white"
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.color }} />
                {service.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Custom children ===== */}
      {children}

      <FooterLinksSection />
      <div className="border-t border-white/10">
        <Footer />
      </div>
    </div>
  );
};

export default ServicePageLayout;
