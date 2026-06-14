import { useState, useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronDown, type LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ContactFormSection from "@/components/ContactFormSection";
import ServiceNav from "@/components/ServiceNav";
import FooterLinksSection from "@/components/FooterLinksSection";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export type SvcStat = { v: string; l: string };
export type SvcStep = { t: string; title: string; body: string };
export type SvcFeature = { icon: LucideIcon; eyebrow: string; title: string; body: string; points: string[]; image: string };
export type SvcFaq = { q: string; a: string };

export type ServiceTemplateProps = {
  accent: string;
  seo: { title: string; description: string; path: string; keywords: string[] };
  schema: { name: string; description: string; serviceType: string[] };
  breadcrumb: string;
  hero: { eyebrow: string; titleLead: ReactNode; titleAccent: string; lede: string; image: string; primaryCta?: { label: string; href: string } };
  stats: SvcStat[];
  strip?: { label: string; items: string[] };
  reality: { eyebrow?: string; heading: ReactNode; headingAccent?: string; body: string[] };
  types?: { eyebrow?: string; heading: ReactNode; headingAccent?: string; sub?: string; cards: { title: string; body: string }[] };
  process: { eyebrow?: string; heading: ReactNode; headingAccent?: string; steps: SvcStep[] };
  features: SvcFeature[];
  pullQuote?: { lead: string; accent: string };
  promise?: { heading: ReactNode; headingMuted?: string; doLabel?: string; dontLabel?: string; do: string[]; dont: string[] };
  deliverable?: { eyebrow: string; title: ReactNode; body: string; cta: string; image: string };
  faq: { eyebrow?: string; heading: string; sub: string; items: SvcFaq[] };
  motif?: ReactNode;
};

const Reveal = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: "80px", triggerOnce: true });
  return (
    <div ref={ref} className={`${className} transition-all ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDuration: "700ms", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};


const ServiceTemplate = (p: ServiceTemplateProps) => {
  const A = p.accent;
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);
  const heroStep = (i: number) => ({ transition: "opacity 900ms ease, transform 900ms ease", transitionDelay: `${i * 140}ms`, opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)" });
  const primaryCta = p.hero.primaryCta ?? { label: "Book a consultation", href: "/contact" };

  return (
    <div className="relative bg-[#0A0A0A] min-h-screen text-white overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 z-[2] opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: `url("${GRAIN}")` }} />

      <SEOHead title={p.seo.title} description={p.seo.description} path={p.seo.path} image={p.hero.image} keywords={p.seo.keywords} />
      <ServiceSchema name={p.schema.name} description={p.schema.description} url={p.seo.path} serviceType={p.schema.serviceType} />
      <BreadcrumbSchema items={[{ name: "ium Labs", url: "https://iumlabs.io/" }, { name: "Services", url: "https://iumlabs.io/services/gtm" }, { name: p.breadcrumb, url: `https://iumlabs.io${p.seo.path}` }]} />
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img src={p.hero.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/55" />
        <div className="absolute inset-0" style={{ background: `radial-gradient(120% 80% at 82% 8%, ${A}1f, transparent 52%)` }} />
        {p.motif}
        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-20 pt-28 pb-16">
          <div className="max-w-4xl">
            <span className="inline-block font-mono text-[11px] sm:text-xs font-bold tracking-[0.35em] mb-5" style={{ color: A, ...heroStep(0) }}>{p.hero.eyebrow}</span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.035em] leading-[0.98] mb-7" style={heroStep(1)}>
              {p.hero.titleLead} <span style={{ color: A }}>{p.hero.titleAccent}</span>
            </h1>
            <p className="font-serif text-lg sm:text-2xl text-white/70 leading-snug max-w-2xl mb-9" style={heroStep(2)}>{p.hero.lede}</p>
            <div className="flex flex-wrap items-center gap-3 mb-12" style={heroStep(3)}>
              <Link to={primaryCta.href} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[#0A0A0A] transition-transform hover:-translate-y-0.5" style={{ backgroundColor: A, boxShadow: `0 10px 40px -10px ${A}80` }}>
                {primaryCta.label} <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#process" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white/80 bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.1] transition-colors">See how it works</a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.08] rounded-2xl overflow-hidden max-w-3xl border border-white/[0.08] backdrop-blur-md" style={heroStep(4)}>
              {p.stats.map((s) => (
                <div key={s.l} className="bg-[#0A0A0A]/70 px-4 py-5">
                  <div className="font-display text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: A }}>{s.v}</div>
                  <div className="text-[11px] sm:text-xs text-white/45 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STRIP — scrolling marquee */}
      {p.strip && (
        <div className="relative border-y border-white/[0.06] bg-[#0D0D0D]">
          <div className="px-5 sm:px-8 lg:px-20 py-5 flex items-center gap-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/30 font-medium whitespace-nowrap flex-shrink-0 hidden sm:block">{p.strip.label}</span>
            <div className="marquee-container relative flex-1 overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, #000 48px, #000 calc(100% - 48px), transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 48px, #000 calc(100% - 48px), transparent)" }}>
              <div className="logo-marquee-slow">
                {[0, 1].map((dup) => (
                  <div key={dup} className="flex items-center gap-9 pr-9" aria-hidden={dup === 1}>
                    {p.strip!.items.map((e) => (<span key={e} className="font-display text-base sm:text-lg font-semibold text-white/45 hover:text-white transition-colors whitespace-nowrap">{e}</span>))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REALITY */}
      <section className="relative px-5 sm:px-8 lg:px-20 py-20 sm:py-28">
        <Reveal>
          <span className="font-mono text-xs font-bold tracking-[0.3em] text-white/30">{p.reality.eyebrow ?? "THE REALITY"}</span>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mt-6 items-start">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] leading-[1.1]">
              {p.reality.heading} {p.reality.headingAccent && <span style={{ color: A }}>{p.reality.headingAccent}</span>}
            </h2>
            <div className="space-y-4 font-serif text-lg text-white/60 leading-relaxed">
              {p.reality.body.map((para, i) => (<p key={i}>{para}</p>))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* TYPES */}
      {p.types && (
        <section className="px-5 sm:px-8 lg:px-20 py-20 sm:py-24 border-b border-white/[0.06]">
          <Reveal>
            <span className="font-mono text-xs font-bold tracking-[0.3em] text-white/30">{p.types.eyebrow ?? "WHAT WE COVER"}</span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] mt-4 mb-3">{p.types.heading} {p.types.headingAccent && <span style={{ color: A }}>{p.types.headingAccent}</span>}</h2>
            {p.types.sub && <p className="text-white/50 leading-relaxed max-w-2xl">{p.types.sub}</p>}
          </Reveal>
          <div className="grid md:grid-cols-3 gap-4 mt-10">
            {p.types.cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="h-full rounded-2xl bg-white/[0.03] border border-white/[0.06] p-7 hover:border-white/[0.14] transition-colors">
                  <div className="font-display text-lg font-semibold mb-3" style={{ color: A }}>{c.title}</div>
                  <p className="text-[14px] text-white/55 leading-relaxed">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* PROCESS */}
      <section id="process" className="px-5 sm:px-8 lg:px-20 py-20 sm:py-24 bg-[#0D0D0D] border-y border-white/[0.06]">
        <Reveal>
          <span className="font-mono text-xs font-bold tracking-[0.3em] text-white/30">{p.process.eyebrow ?? "HOW IT WORKS"}</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] mt-4 mb-12">{p.process.heading} {p.process.headingAccent && <span style={{ color: A }}>{p.process.headingAccent}</span>}</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {p.process.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <div className="h-full rounded-2xl bg-white/[0.03] border border-white/[0.06] border-t-2 p-6 hover:bg-white/[0.05] transition-colors" style={{ borderTopColor: `${A}66` }}>
                <div className="font-display font-bold text-2xl leading-none mb-4" style={{ color: A }}>0{i + 1}</div>
                <div className="font-display text-lg font-semibold mb-2">{s.title}</div>
                <p className="text-[13px] text-white/50 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-5 sm:px-8 lg:px-20 py-20 sm:py-28 space-y-24 sm:space-y-32">
        {p.features.map((f, i) => {
          const Icon = f.icon;
          const flip = i % 2 === 1;
          return (
            <Reveal key={f.title}>
              <div className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="group relative rounded-3xl overflow-hidden border border-white/[0.08] aspect-[4/3]">
                  <img src={f.image} alt={f.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/75 to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${A}1a, transparent 55%)` }} />
                  <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: `${A}aa` }} />
                  <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: `${A}aa` }} />
                </div>
                <div className="relative">
                  <div className="flex items-baseline gap-4 mb-5">
                    <span className="font-display text-5xl sm:text-6xl font-bold leading-none" style={{ color: A }}>{f.eyebrow.slice(0, 2)}</span>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center border" style={{ backgroundColor: `${A}14`, borderColor: `${A}33` }}>
                        <Icon className="w-4 h-4" style={{ color: A }} />
                      </div>
                      <span className="font-mono text-xs font-bold tracking-[0.25em] text-white/35">{f.eyebrow.split("· ")[1] ?? f.eyebrow}</span>
                    </div>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em] mb-4">{f.title}</h3>
                  <p className="text-white/55 leading-relaxed mb-6">{f.body}</p>
                  <ul className="space-y-2.5">
                    {f.points.map((pt) => (<li key={pt} className="flex items-start gap-3 text-[14px] text-white/65"><Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: A }} /><span>{pt}</span></li>))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </section>

      {/* PULL QUOTE */}
      {p.pullQuote && (
        <section className="relative px-5 sm:px-8 lg:px-20 py-24 sm:py-32 overflow-hidden border-y border-white/[0.06]">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px] opacity-[0.12]" style={{ background: A }} />
          <Reveal className="relative max-w-4xl mx-auto text-center">
            <blockquote className="font-serif text-2xl sm:text-4xl lg:text-[2.7rem] leading-[1.28] text-white/90">
              {p.pullQuote.lead} <span className="italic" style={{ color: A }}>{p.pullQuote.accent}</span>
            </blockquote>
          </Reveal>
        </section>
      )}

      {/* PROMISE */}
      {p.promise && (
        <section className="px-5 sm:px-8 lg:px-20 py-20 sm:py-24">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="font-mono text-xs font-bold tracking-[0.3em] text-white/30">OUR PROMISE</span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] mt-4">{p.promise.heading} {p.promise.headingMuted && <span className="text-white/40">{p.promise.headingMuted}</span>}</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4">
            <Reveal>
              <div className="relative h-full rounded-3xl p-[1.5px]" style={{ background: `linear-gradient(140deg, ${A}99, ${A}10 55%, transparent)` }}>
                <div className="h-full rounded-3xl p-7 sm:p-8" style={{ background: "#0C0C0E" }}>
                  <div className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: A }}>{p.promise.doLabel ?? "What we do"}</div>
                  <ul className="space-y-3">{p.promise.do.map((x) => (<li key={x} className="flex items-start gap-3 text-[15px] text-white/75"><Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: A }} /><span>{x}</span></li>))}</ul>
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-8">
                <div className="text-sm font-bold uppercase tracking-wider mb-5 text-white/40">{p.promise.dontLabel ?? "What we never do"}</div>
                <ul className="space-y-3">{p.promise.dont.map((x) => (<li key={x} className="flex items-start gap-3 text-[15px] text-white/55"><span className="mt-2.5 w-3 h-px bg-white/30 flex-shrink-0" /><span>{x}</span></li>))}</ul>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* DELIVERABLE */}
      {p.deliverable && (
        <section className="relative px-5 sm:px-8 lg:px-20 py-20 sm:py-28 bg-[#0D0D0D] border-y border-white/[0.06]">
          <Reveal>
            <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <span className="font-mono text-xs font-bold tracking-[0.3em] text-white/30">{p.deliverable.eyebrow}</span>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] mt-4 mb-5">{p.deliverable.title}</h2>
                <p className="text-white/55 leading-relaxed mb-6">{p.deliverable.body}</p>
                <Link to="/contact" className="inline-flex items-center gap-2 font-semibold transition-transform hover:-translate-y-0.5" style={{ color: A }}>{p.deliverable.cta} <ArrowRight className="w-4 h-4" /></Link>
              </div>
              <div className="group relative rounded-3xl overflow-hidden border border-white/[0.08] aspect-[16/10]">
                <img src={p.deliverable.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 to-transparent" />
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* FAQ */}
      <section className="px-5 sm:px-8 lg:px-20 py-20 sm:py-24">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="font-mono text-xs font-bold tracking-[0.3em] text-white/30">{p.faq.eyebrow ?? "FAQ"}</span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] mt-4 mb-4">{p.faq.heading}</h2>
              <p className="text-white/50 leading-relaxed mb-6">{p.faq.sub}</p>
              <Link to="/contact" className="inline-flex items-center gap-2 font-semibold transition-transform hover:-translate-y-0.5" style={{ color: A }}>Still unsure? Talk to us <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </Reveal>
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {p.faq.items.map((f, i) => (
              <div key={f.q}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 py-5 text-left group" aria-expanded={openFaq === i}>
                  <span className={`text-base sm:text-lg font-medium transition-colors ${openFaq === i ? "text-white" : "text-white/80 group-hover:text-white"}`}>{f.q}</span>
                  <ChevronDown className="w-5 h-5 flex-shrink-0 transition-transform duration-300" style={{ color: openFaq === i ? A : "rgba(255,255,255,0.4)", transform: openFaq === i ? "rotate(180deg)" : "none" }} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-[600px] pb-6" : "max-h-0"}`}>
                  <p className="text-white/55 leading-relaxed pr-6">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceNav />
      <ContactFormSection />
      <FooterLinksSection />
      <Footer />
    </div>
  );
};

export default ServiceTemplate;
