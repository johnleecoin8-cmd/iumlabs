import { useState, useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ClipboardCheck, FileText, Network, ShieldCheck, ArrowRight, Check, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ContactFormSection from "@/components/ContactFormSection";
import ServiceNav from "@/components/ServiceNav";
import FooterLinksSection from "@/components/FooterLinksSection";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* =========================================================================
   PLACEHOLDER IMAGES — temporary. Swap each for the provided photos.
   (Drop new files in src/assets/ and update these 6 imports only.)
   ========================================================================= */
import heroImg from "@/assets/platforms/comp-exchange.jpg";
import featDiagnosisImg from "@/assets/platforms/comp-landscape.jpg";
import featDossierImg from "@/assets/platforms/comp-legal.jpg";
import featRelationsImg from "@/assets/platforms/pr-interview.jpg";
import featMaintenanceImg from "@/assets/platforms/seo-analytics.jpg";
import scorecardImg from "@/assets/platforms/res-thesis.jpg";

const ACCENT = "#22D3EE";
const GRAIN = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const steps = [
  { t: "T–8W", title: "Readiness Diagnosis", body: "Audit your project against the DAXA Best-Practices axes and each exchange's known criteria. Deliver a prioritized gap report." },
  { t: "T–6W", title: "Dossier & Legal Opinion", body: "Package and Korean-localize the application; coordinate the independent securities legal opinion through partner counsel." },
  { t: "T–2W", title: "Submission & Relations", body: "Manage submission, timing, and the market narrative with exchange listing and research teams." },
  { t: "T0 →", title: "Maintenance & Disclosure", body: "Stand up the ongoing IR and disclosure cadence needed to survive quarterly maintenance review." },
];

const features = [
  {
    icon: ClipboardCheck,
    eyebrow: "01 · Diagnose",
    title: "Listing-Readiness Diagnosis",
    body: "Before you ever apply, we audit your project against the DAXA 거래지원 모범사례 axes and each exchange's real bar — then hand you a prioritized gap report so nothing surprises the review committee.",
    points: ["Securities-status & legal-opinion exposure", "Tokenomics, unlock & distribution red flags", "Disclosure, audit & AML documentation gaps", "Meme / zombie-coin risk screening"],
    image: featDiagnosisImg,
  },
  {
    icon: FileText,
    eyebrow: "02 · Package",
    title: "Application Packaging & Legal Opinion",
    body: "We assemble and Korean-localize the full dossier exchanges expect, and coordinate the domestic securities legal opinion Upbit and Coinone require — through independent partner firms, never authored to order.",
    points: ["Whitepaper, cap table & legal structure", "Technical & security audit packaging", "가상자산 설명서 (mandatory disclosure)", "KR securities opinion (Kim & Chang, Yoon & Yang, Hwawoo)"],
    image: featDossierImg,
  },
  {
    icon: Network,
    eyebrow: "03 · Place",
    title: "Exchange Relations & Market Sequencing",
    body: "Warm, transparent introductions to exchange listing and research teams — plus the strategy of which market to enter and when, sequenced around the windows that actually move Korean volume.",
    points: ["Listing & research-team introductions", "KRW vs BTC market sequencing", "Listing-window & catalyst timing (KBW)", "Back-and-forth and narrative management"],
    image: featRelationsImg,
  },
  {
    icon: ShieldCheck,
    eyebrow: "04 · Sustain",
    title: "Maintenance-Review Compliance",
    body: "Since 2024, listing is no longer once-and-done. We build the disclosure and IR cadence that keeps you clear of caution-item (유의종목) designation and delisting at every quarterly review.",
    points: ["Quarterly maintenance-review readiness", "Ongoing disclosure & IR cadence", "Milestone & roadmap tracking", "Early-warning risk monitoring"],
    image: featMaintenanceImg,
  },
];

const promises = {
  do: [
    "Make you the strongest, best-prepared, fully-compliant applicant",
    "Coordinate an independent Korean securities legal opinion",
    "Open warm, transparent introductions to the right teams",
    "Keep you listed through quarterly maintenance review",
  ],
  dont: [
    "Guarantee or \"buy\" a listing — the exchange decides, independently",
    "Pay exchanges or use unlicensed listing brokers (illegal in Korea)",
    "Touch wash trading, fake volume, or post-listing pump schemes",
    "Pressure or author the securities legal opinion's conclusion",
  ],
};

const faqs = [
  { q: "How long does a Korean listing actually take?", a: "There's no published SLA. Realistically it's weeks to months from a serious application to a decision, and most inquiries are filtered out in pre-screening before in-depth review even begins. Anyone promising a fixed listing date is a red flag — the timeline belongs to the exchange. We optimize how ready you are when the window opens." },
  { q: "What actually gets a project rejected?", a: "Most often: no clean Korean securities legal opinion, concentrated or opaque token distribution, thin disclosure, weak AML documentation, or no identifiable, accountable issuer. The 2024–2025 rules also screen hard for meme / zombie-coin profiles and post-listing pump risk. Our diagnosis surfaces every one of these before a committee ever sees you." },
  { q: "How do you charge — and do you take a success fee on the listing?", a: "Retainer plus milestones for the advisory work. We never take a success fee tied to a listing outcome — that structure is exactly what Korea's bribery and fraud cases have targeted, and it would put both of us at risk. You pay for expert preparation and representation, not for a decision we don't control." },
  { q: "We already have legal counsel and a market maker. Do you replace them?", a: "No — we coordinate them. We add the Korea-specific layer: the domestic securities opinion via partner firms, the localized dossier, exchange relationships, and a liquidity plan sized for KRW pairs. If you have global counsel or an MM desk we work alongside them; if you don't, we bring vetted partners." },
  { q: "What if the readiness review says we're not ready?", a: "Then we tell you plainly, and give you the exact sequence to fix it. Burning a first impression with a review committee is far more expensive than waiting a quarter to apply correctly. The scorecard exists so you apply when you can win — not when you're merely hopeful." },
  { q: "Which exchange should we target first?", a: "It depends on your profile. The KRW market (Upbit, Bithumb) holds the deep retail liquidity everyone wants but is the hardest gate; a BTC-pair listing can build a Korean trading history first. Each market is reviewed separately, so we sequence entries deliberately as part of your strategy." },
];

/* signature order-book / candlestick motif (original) */
const CandleMotif = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 80 64" fill="none" className={className} aria-hidden="true">
    <g stroke={ACCENT} strokeWidth="1.4">
      <line x1="12" y1="14" x2="12" y2="54" opacity="0.5" />
      <rect x="7" y="24" width="10" height="22" fill={ACCENT} fillOpacity="0.18" />
      <line x1="30" y1="8" x2="30" y2="50" opacity="0.7" />
      <rect x="25" y="16" width="10" height="20" fill={ACCENT} fillOpacity="0.32" />
      <line x1="48" y1="20" x2="48" y2="58" opacity="0.5" />
      <rect x="43" y="30" width="10" height="18" fill={ACCENT} fillOpacity="0.14" />
      <line x1="66" y1="4" x2="66" y2="44" opacity="0.85" />
      <rect x="61" y="10" width="10" height="22" fill={ACCENT} fillOpacity="0.45" />
    </g>
  </svg>
);

const Reveal = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: "80px", triggerOnce: true });
  return (
    <div ref={ref} className={`${className} transition-all ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDuration: "700ms", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const TimelineLine = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2, rootMargin: "0px", triggerOnce: true });
  return (
    <div ref={ref} className="hidden lg:block absolute top-[42px] left-6 right-6 h-px origin-left transition-transform duration-[1200ms] ease-out" style={{ background: `linear-gradient(to right, ${ACCENT}00, ${ACCENT}55 20%, ${ACCENT}55 80%, ${ACCENT}00)`, transform: isVisible ? "scaleX(1)" : "scaleX(0)" }} />
  );
};

const ListingService = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);
  const heroStep = (i: number) => ({ transition: "opacity 900ms ease, transform 900ms ease", transitionDelay: `${i * 140}ms`, opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)" });

  return (
    <div className="relative bg-[#0A0A0A] min-h-screen text-white overflow-x-hidden">
      {/* film grain */}
      <div className="pointer-events-none fixed inset-0 z-[2] opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: `url("${GRAIN}")` }} />

      <SEOHead title="Korean CEX Listing Advisory — Upbit, Bithumb, Coinone, Korbit | ium Labs" description="Listing-readiness diagnosis, application packaging, securities legal-opinion coordination, and exchange relations for Korea's KRW-market exchanges. DAXA-aligned, compliance-first — we make you the strongest applicant. The exchange makes the decision." path="/services/listing" image={heroImg} keywords={["Korean exchange listing", "Upbit listing", "Bithumb listing", "CEX listing advisory Korea", "DAXA listing", "KRW market listing", "Coinone Korbit listing"]} />
      <ServiceSchema name="Korean CEX Listing Advisory" description="Listing-readiness diagnosis, application packaging, securities legal-opinion coordination, and exchange relationship facilitation for Upbit, Bithumb, Coinone, and Korbit." url="/services/listing" serviceType={["Exchange Listing Advisory", "CEX Listing Korea", "Listing Readiness", "Regulatory Compliance"]} />
      <BreadcrumbSchema items={[{ name: "ium Labs", url: "https://iumlabs.io/" }, { name: "Services", url: "https://iumlabs.io/services/gtm" }, { name: "CEX Listing Advisory", url: "https://iumlabs.io/services/listing" }]} />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/55" />
        <div className="absolute inset-0" style={{ background: `radial-gradient(120% 80% at 82% 8%, ${ACCENT}1f, transparent 52%)` }} />
        <CandleMotif className="absolute right-6 sm:right-16 bottom-10 w-28 sm:w-44 h-auto opacity-50" />
        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-20 pt-28 pb-16">
          <div className="max-w-4xl">
            <span className="inline-block font-mono text-[11px] sm:text-xs font-bold tracking-[0.35em] mb-5" style={{ color: ACCENT, ...heroStep(0) }}>CEX LISTING ADVISORY</span>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-[8.5rem] font-bold tracking-[-0.04em] leading-[0.92] mb-7" style={heroStep(1)}>
              Get listed on Korea's<br />exchanges. <span style={{ color: ACCENT }}>And stay listed.</span>
            </h1>
            <p className="font-serif text-lg sm:text-2xl text-white/70 leading-snug max-w-2xl mb-9" style={heroStep(2)}>
              The KRW market is the deepest retail liquidity in crypto — and the hardest gate. We make your project the strongest, fully-compliant applicant for Upbit, Bithumb, Coinone, and Korbit, and put you in front of the right people. The exchange decides; we make sure you deserve a yes.
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-12" style={heroStep(3)}>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[#0A0A0A] transition-transform hover:-translate-y-0.5" style={{ backgroundColor: ACCENT, boxShadow: `0 10px 40px -10px ${ACCENT}80` }}>
                Get a listing-readiness review <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#process" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white/80 bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.1] transition-colors">
                See how it works
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.08] rounded-2xl overflow-hidden max-w-3xl border border-white/[0.08] backdrop-blur-md" style={heroStep(4)}>
              {[["4", "KRW Exchanges"], ["DAXA", "Best-Practices Aligned"], ["25+", "Korea Market Entries"], ["100%", "Compliance-First"]].map(([v, l]) => (
                <div key={l} className="bg-[#0A0A0A]/70 px-4 py-5">
                  <div className="font-display text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: ACCENT }}>{v}</div>
                  <div className="text-[11px] sm:text-xs text-white/45 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXCHANGE STRIP ===== */}
      <div className="relative border-y border-white/[0.06] bg-[#0D0D0D]">
        <div className="px-5 sm:px-8 lg:px-20 py-6 flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-white/30 font-medium">Listing coverage</span>
          {["Upbit", "Bithumb", "Coinone", "Korbit"].map((e) => (
            <span key={e} className="font-display text-lg sm:text-xl font-semibold text-white/70 hover:text-white transition-colors">{e}</span>
          ))}
        </div>
      </div>

      {/* ===== REALITY ===== */}
      <section className="relative px-5 sm:px-8 lg:px-20 py-20 sm:py-28">
        <Reveal>
          <span className="font-mono text-xs font-bold tracking-[0.3em] text-white/30">THE REALITY</span>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mt-6 items-start">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] leading-[1.1]">
              Listing demand vastly exceeds supply — and the rules just got <span style={{ color: ACCENT }}>much harder.</span>
            </h2>
            <div className="space-y-4 text-white/55 leading-relaxed">
              <p>Each exchange decides its own listings through an independent review committee — not DAXA, and not any advisor. Since the 2024 Best-Practices framework and its 2025 overhaul, the bar has risen sharply: tougher criteria against post-listing pumps, meme-coin floods, and "zombie coins," plus a quarterly maintenance review that means a listing is no longer permanent.</p>
              <p>The grey market of unlicensed "listing brokers" is illegal and prosecuted. The legitimate path is to be undeniably ready — a clean securities legal opinion, airtight tokenomics and disclosure, and a credible Korean representative managing the process. That is exactly what we build.</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== PROCESS TIMELINE ===== */}
      <section id="process" className="px-5 sm:px-8 lg:px-20 py-20 sm:py-24 bg-[#0D0D0D] border-y border-white/[0.06]">
        <Reveal>
          <span className="font-mono text-xs font-bold tracking-[0.3em] text-white/30">HOW IT WORKS</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] mt-4 mb-12">From candidate to <span style={{ color: ACCENT }}>credible applicant.</span></h2>
        </Reveal>
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <TimelineLine />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <div className="relative h-full rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 backdrop-blur-sm hover:border-white/[0.14] transition-colors">
                <div className="hidden lg:block absolute -top-[6px] left-6 w-3 h-3 rounded-full ring-4 ring-[#0D0D0D]" style={{ backgroundColor: ACCENT }} />
                <div className="font-mono text-sm font-bold mb-3 lg:mt-2" style={{ color: ACCENT }}>{s.t}</div>
                <div className="font-display text-lg font-semibold mb-2">{s.title}</div>
                <p className="text-[13px] text-white/50 leading-relaxed">{s.body}</p>
                <div className="absolute top-6 right-6 text-white/[0.08] font-display font-bold text-3xl">0{i + 1}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== FEATURES — alternating media ===== */}
      <section className="px-5 sm:px-8 lg:px-20 py-20 sm:py-28 space-y-24 sm:space-y-32">
        {features.map((f, i) => {
          const Icon = f.icon;
          const flip = i % 2 === 1;
          return (
            <Reveal key={f.title}>
              <div className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="group relative rounded-3xl overflow-hidden border border-white/[0.08] aspect-[4/3]">
                  <img src={f.image} alt={f.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/75 to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${ACCENT}1a, transparent 55%)` }} />
                  <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: `${ACCENT}aa` }} />
                  <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: `${ACCENT}aa` }} />
                  <span className="absolute top-4 right-4 text-[10px] uppercase tracking-wider text-white/40 bg-black/40 backdrop-blur px-2 py-1 rounded">placeholder</span>
                </div>
                <div className="relative">
                  <div className="flex items-baseline gap-4 mb-5">
                    <span className="font-display text-5xl sm:text-6xl font-bold leading-none" style={{ color: ACCENT }}>{f.eyebrow.slice(0, 2)}</span>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center border" style={{ backgroundColor: `${ACCENT}14`, borderColor: `${ACCENT}33` }}>
                        <Icon className="w-4 h-4" style={{ color: ACCENT }} />
                      </div>
                      <span className="font-mono text-xs font-bold tracking-[0.25em] text-white/35">{f.eyebrow.split("· ")[1] ?? f.eyebrow}</span>
                    </div>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em] mb-4">{f.title}</h3>
                  <p className="text-white/55 leading-relaxed mb-6">{f.body}</p>
                  <ul className="space-y-2.5">
                    {f.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[14px] text-white/65">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </section>

      {/* ===== PULL QUOTE ===== */}
      <section className="relative px-5 sm:px-8 lg:px-20 py-24 sm:py-32 overflow-hidden border-y border-white/[0.06]">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px] opacity-[0.12]" style={{ background: ACCENT }} />
        <Reveal className="relative max-w-4xl mx-auto text-center">
          <CandleMotif className="w-14 h-12 mx-auto mb-8 opacity-70" />
          <blockquote className="font-serif text-2xl sm:text-4xl lg:text-[2.7rem] leading-[1.28] text-white/90">
            In Korea, you don't get a second first impression with a review committee. <span className="italic" style={{ color: ACCENT }}>We make the first one count.</span>
          </blockquote>
        </Reveal>
      </section>

      {/* ===== PROMISE / HONESTY ===== */}
      <section className="px-5 sm:px-8 lg:px-20 py-20 sm:py-24">
        <Reveal>
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs font-bold tracking-[0.3em] text-white/30">OUR PROMISE</span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] mt-4">
              We make you the best applicant. <span className="text-white/40">The exchange makes the decision.</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-4">
          <Reveal>
            <div className="relative h-full rounded-3xl p-[1.5px]" style={{ background: `linear-gradient(140deg, ${ACCENT}99, ${ACCENT}10 55%, transparent)` }}>
              <div className="h-full rounded-3xl p-7 sm:p-8" style={{ background: "#0C0C0E" }}>
                <div className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: ACCENT }}>What we do</div>
                <ul className="space-y-3">
                  {promises.do.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[15px] text-white/75"><Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} /><span>{p}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="h-full rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-8">
              <div className="text-sm font-bold uppercase tracking-wider mb-5 text-white/40">What we never do</div>
              <ul className="space-y-3">
                {promises.dont.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[15px] text-white/55"><span className="mt-2.5 w-3 h-px bg-white/30 flex-shrink-0" /><span>{p}</span></li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== DELIVERABLE ===== */}
      <section className="relative px-5 sm:px-8 lg:px-20 py-20 sm:py-28 bg-[#0D0D0D] border-y border-white/[0.06]">
        <Reveal>
          <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <span className="font-mono text-xs font-bold tracking-[0.3em] text-white/30">THE DELIVERABLE</span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] mt-4 mb-5">Listing Readiness Scorecard&trade;</h2>
              <p className="text-white/55 leading-relaxed mb-6">Every engagement starts with a graded scorecard: where you stand against each exchange's criteria, what's blocking a yes, and the exact sequence to fix it — before a single application goes out.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 font-semibold transition-transform hover:-translate-y-0.5" style={{ color: ACCENT }}>
                Request your scorecard <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="group relative rounded-3xl overflow-hidden border border-white/[0.08] aspect-[16/10]">
              <img src={scorecardImg} alt="Listing readiness scorecard" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 to-transparent" />
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-wider text-white/40 bg-black/40 backdrop-blur px-2 py-1 rounded">placeholder</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== FAQ ===== */}
      <section className="px-5 sm:px-8 lg:px-20 py-20 sm:py-24">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="font-mono text-xs font-bold tracking-[0.3em] text-white/30">FAQ</span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] mt-4 mb-4">The questions founders actually ask.</h2>
              <p className="text-white/50 leading-relaxed mb-6">Straight answers on timing, cost, and what really moves a review committee — no sales spin.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 font-semibold transition-transform hover:-translate-y-0.5" style={{ color: ACCENT }}>
                Still unsure? Talk to us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 py-5 text-left group" aria-expanded={openFaq === i}>
                  <span className={`text-base sm:text-lg font-medium transition-colors ${openFaq === i ? "text-white" : "text-white/80 group-hover:text-white"}`}>{f.q}</span>
                  <ChevronDown className="w-5 h-5 flex-shrink-0 transition-transform duration-300" style={{ color: openFaq === i ? ACCENT : "rgba(255,255,255,0.4)", transform: openFaq === i ? "rotate(180deg)" : "none" }} />
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

export default ListingService;
