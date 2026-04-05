import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinksSection from "@/components/FooterLinksSection";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";

// Client logos — same as home hero
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import peaqLogo from "@/assets/logos/peaq.svg";
import spacecoinLogo from "@/assets/logos/spacecoin.png";
import triaLogo from "@/assets/logos/tria-official.png";
import mantraLogo from "@/assets/logos/mantra.png";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import fogoLogo from "@/assets/logos/fogo.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";
import aptosLogo from "@/assets/logos/aptos.png";
import kiteLogo from "@/assets/logos/kite.png";

const clientLogos = [
  { name: "BNB", logo: bnbLogo, noInvert: false, slug: "bnb-chain" },
  { name: "KuCoin", logo: kucoinLogo, noInvert: true, slug: "kucoin" },
  { name: "Polygon", logo: polygonLogo, noInvert: false, slug: "polygon" },
  { name: "Ondo Finance", logo: ondoLogo, noInvert: false, slug: "ondo" },
  { name: "Bybit", logo: bybitLogo, noInvert: false, slug: "bybit" },
  { name: "Peaq", logo: peaqLogo, noInvert: true, slug: "peaq" },
  { name: "Spacecoin", logo: spacecoinLogo, noInvert: true, slug: "spacecoin" },
  { name: "Tria", logo: triaLogo, noInvert: true, slug: "tria" },
  { name: "Mantra", logo: mantraLogo, noInvert: true, slug: "mantra" },
  { name: "Sahara AI", logo: saharaAiLogo, noInvert: true, slug: "sahara-ai" },
  { name: "FOGO", logo: fogoLogo, noInvert: true, slug: "fogo" },
  { name: "SynFutures", logo: synfuturesLogo, noInvert: true, slug: "synfutures" },
  { name: "Aptos", logo: aptosLogo, noInvert: true, slug: "aptos" },
  { name: "Kite", logo: kiteLogo, noInvert: true, slug: "kite" },
];

const complianceServices = [
  {
    num: "01", title: "VASP Registration",
    desc: "Full registration guidance under Korea's Virtual Asset User Protection Act. Documentation prep, application support, and liaison with regulatory bodies.",
    tags: ["가상자산법", "Registration", "Documentation"],
  },
  {
    num: "02", title: "PIPA Compliance",
    desc: "Personal Information Protection Act strategy for biometric data, user KYC flows, and cross-border data transfers. Gap analysis and remediation roadmap.",
    tags: ["Data Privacy", "Biometric", "Cross-border"],
  },
  {
    num: "03", title: "Exchange Compliance",
    desc: "Upbit, Bithumb, Coinone listing requirements. Token legal opinions, compliance documentation, and pre-listing regulatory checklists.",
    tags: ["Upbit", "Bithumb", "Coinone"],
  },
  {
    num: "04", title: "AML/KYC Advisory",
    desc: "Anti-money laundering framework design, KYC process optimization, and travel rule compliance aligned with Korean FATF implementation.",
    tags: ["AML", "KYC", "FATF"],
  },
  {
    num: "05", title: "Regulatory Strategy",
    desc: "Proactive regulatory positioning. Government relations, industry association introductions, and strategic counsel on upcoming legislation.",
    tags: ["Gov Relations", "Policy", "Strategy"],
  },
  {
    num: "06", title: "Legal Landscape Analysis",
    desc: "Comprehensive mapping of regulations by project category — DeFi, NFT, RWA, staking. Quarterly updates on policy shifts and enforcement trends.",
    tags: ["DeFi", "NFT", "RWA"],
  },
];

const processSteps = [
  { num: "01", title: "Assessment", desc: "Deep regulatory audit of your project. Identify applicable Korean laws, compliance gaps, and risk exposure across all operational dimensions.", time: "Week 1–2" },
  { num: "02", title: "Strategy", desc: "Custom compliance roadmap. Prioritized action items, documentation requirements, timeline, and resource allocation — built with our legal partners.", time: "Week 2–3" },
  { num: "03", title: "Implementation", desc: "Execute the compliance plan. VASP filings, policy drafting, KYC/AML framework setup, exchange documentation — hands-on support at every step.", time: "Week 3–8" },
  { num: "04", title: "Monitoring", desc: "Ongoing regulatory surveillance. Real-time alerts on policy changes, quarterly health checks, and proactive strategy adjustments.", time: "Ongoing" },
];

const caseStudies = [
  { category: "L1 Protocol", metric: "100%", label: "Compliance clearance across 5 Korean regulatory frameworks for mainnet launch and exchange listings" },
  { category: "DeFi Protocol", metric: "4 Weeks", label: "From initial assessment to full VASP registration readiness — 60% faster than industry average" },
  { category: "Exchange Integration", metric: "3 CEX", label: "Simultaneous compliance approval for Upbit, Bithumb, and Coinone listing requirements" },
];

const BrandingService = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead
        title="Korea Crypto Regulations & Compliance Consulting | ium Labs"
        description="Navigate Korea's crypto regulatory landscape. VASP registration, PIPA compliance, exchange listing requirements, and ongoing advisory — in partnership with Law Office Asset and Freeman Law."
        path="/services/compliance"
        keywords={['Korea Crypto Regulations', 'VASP Registration Korea', 'PIPA Compliance', 'Blockchain Compliance Korea', 'Crypto Regulatory Advisory']}
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-[#0A0A0A] to-[#0A0A0A]" />
        <div className="relative z-10 px-4 sm:px-8 text-center max-w-5xl mx-auto pt-24">
          <p className="text-[10px] text-white/20 tracking-[0.3em] uppercase mb-6">Regulations & Compliance</p>
          <h1 className="font-sans text-[2.2rem] sm:text-[4rem] md:text-[6rem] font-black text-white leading-[0.92] tracking-[-0.04em] mb-6">
            Compliance first.<br />
            <span className="text-white/30">Launch with confidence.</span>
          </h1>
          <p className="text-sm sm:text-lg text-white/40 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            In partnership with Law Office Asset and Freeman Law, we navigate Korea's complex crypto regulations — so you can focus on building. VASP registration, PIPA compliance, exchange requirements, and beyond.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <CalendlyButton className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.12)] transition-all">
              Book Compliance Consultation
            </CalendlyButton>
            <Link to="/projects" className="inline-flex items-center gap-2 px-8 py-4 border border-white/[0.1] text-white/40 text-sm rounded-full hover:border-white/[0.2] hover:text-white/70 transition-all">
              See Our Work <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LOGO MARQUEE ===== */}
      <div className="py-4 sm:py-6 overflow-hidden border-y border-white/[0.04]">
        <div className="flex items-center logo-marquee-slow">
          {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => (
            <Link key={index} to={`/projects/${client.slug}`} className="flex items-center gap-2 sm:gap-3 mx-1 sm:mx-2 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-zinc-900/80 rounded-full border border-white/15 hover:border-white/25 hover:bg-zinc-800/80 transition-all duration-300 flex-shrink-0">
              <img src={client.logo} alt={client.name} loading="lazy" decoding="async" className={`h-4 sm:h-7 w-auto max-w-[70px] sm:max-w-[140px] object-contain flex-shrink-0 ${client.noInvert ? 'opacity-90' : 'brightness-0 invert opacity-85'}`} />
              <span className="text-white/75 text-[11px] sm:text-sm font-medium whitespace-nowrap">{client.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ===== STATS ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {[
            { value: "19+", label: "Projects Advised" },
            { value: "100%", label: "Compliance Rate" },
            { value: "5", label: "Regulatory Frameworks" },
            { value: "24h", label: "Response Time" },
          ].map((stat, i) => (
            <div key={i} className="py-8 sm:py-12 text-center border-r border-white/[0.04] last:border-r-0">
              <div className="text-3xl sm:text-5xl font-black text-white tracking-tighter">{stat.value}</div>
              <div className="text-[10px] text-white/20 tracking-[0.15em] uppercase mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20 text-center">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-[1.05] tracking-tight">
          Korea's regulatory landscape<br />
          <span className="text-white/20">doesn't forgive guesswork.</span>
        </h2>
        <p className="text-sm sm:text-base text-white/30 leading-relaxed max-w-2xl mx-auto">
          The Virtual Asset User Protection Act, PIPA enforcement, exchange-specific listing requirements, evolving AML/KYC standards — Korea regulates crypto more aggressively than most markets. One misstep can mean blocked listings, frozen assets, or permanent market exclusion. You need partners who know the regulators, the precedents, and the unwritten rules.
        </p>
      </section>

      {/* ===== SERVICE BREAKDOWN — numbered rows ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="text-center mb-14">
          <p className="text-[10px] text-white/15 tracking-[0.3em] uppercase mb-4">Full Compliance Coverage</p>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            6 pillars. <span className="text-white/20">Zero gaps.</span>
          </h2>
        </div>
        <div className="flex flex-col">
          {complianceServices.map((svc) => (
            <div
              key={svc.num}
              className="group grid grid-cols-[40px_1fr] lg:grid-cols-[60px_240px_1fr_auto] gap-3 lg:gap-6 items-center py-5 sm:py-7 border-t border-white/[0.04] last:border-b last:border-white/[0.04] relative transition-all hover:bg-white/[0.015]"
            >
              <span className="text-[11px] text-white/10 font-mono group-hover:text-white/30 transition-colors">
                {svc.num}
              </span>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white/80 group-hover:text-white transition-colors tracking-tight">
                {svc.title}
              </h3>
              <p className="hidden lg:block text-[13px] text-white/25 leading-relaxed group-hover:text-white/40 transition-colors">
                {svc.desc}
              </p>
              <div className="hidden lg:flex items-center gap-2">
                {svc.tags.map(tag => (
                  <span key={tag} className="text-[9px] px-2 py-0.5 border border-white/[0.05] rounded-full text-white/15 group-hover:border-white/[0.1] group-hover:text-white/30 transition-all whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20 bg-[#0c0c0e]">
        <div className="text-center mb-14">
          <p className="text-[10px] text-white/15 tracking-[0.3em] uppercase mb-4">How We Work</p>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            From audit to <span className="text-white/20">full compliance</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 relative">
          <div className="hidden lg:block absolute top-4 left-[60px] right-[60px] h-px bg-white/[0.04]" />
          {processSteps.map((step, i) => (
            <div key={i} className="group lg:px-6 relative">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-white/40 transition-all relative z-10" />
                <span className="text-[10px] text-white/15 tracking-[0.15em] uppercase group-hover:text-white/30 transition-colors">{step.num}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{step.title}</h3>
              <p className="text-[13px] text-white/25 leading-relaxed mb-4">{step.desc}</p>
              <span className="text-[10px] text-white/20 px-2.5 py-1 border border-white/[0.06] rounded-full">{step.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CASE STUDIES ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="text-center mb-12">
          <p className="text-[10px] text-white/15 tracking-[0.3em] uppercase mb-4">Results</p>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            Compliance outcomes <span className="text-white/20">that unlock markets</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
          {caseStudies.map((cs, i) => (
            <div
              key={i}
              className="group block border border-white/[0.04] rounded-2xl p-7 sm:p-9 hover:border-white/[0.08] hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-[9px] text-white/15 tracking-[0.12em] uppercase block pb-5 mb-5 border-b border-white/[0.04]">{cs.category}</span>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-3">{cs.metric}</div>
              <p className="text-[13px] text-white/30 leading-relaxed">{cs.label}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/projects" className="text-sm text-white/20 hover:text-white/50 transition-colors">
            View all 22+ projects →
          </Link>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20 bg-[#0c0c0e]">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            Why ium Labs
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.03] max-w-4xl mx-auto">
          {[
            { title: "Established legal partnerships", desc: "Law Office Asset and Freeman Law — leading firms in Korean blockchain regulation. Direct access to attorneys who've shaped the regulatory framework." },
            { title: "100% compliance track record", desc: "Every project we've advised has achieved full regulatory clearance. Zero enforcement actions, zero blocked listings, zero surprises." },
            { title: "Beyond paperwork", desc: "We don't just file documents. We build regulatory strategy — government relations, industry positioning, and proactive counsel on upcoming legislation." },
            { title: "Speed without shortcuts", desc: "24-hour response time on regulatory questions. Accelerated timelines through established relationships with Korean regulatory bodies." },
          ].map((card, i) => (
            <div key={i} className="bg-[#0c0c0e] p-7 sm:p-10 group hover:bg-[#111] transition-all cursor-default">
              <h3 className="text-sm sm:text-base font-bold text-white mb-3 tracking-tight">{card.title}</h3>
              <p className="text-[13px] text-white/25 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight text-center mb-10">FAQ</h2>
        <div className="max-w-3xl mx-auto">
          {[
            { q: "Do you provide legal advice?", a: "We work with Law Office Asset and Freeman Law — leading firms specializing in Korean blockchain and virtual asset regulations. Through these partnerships, we provide 1:1 consulting that covers both strategic advisory and formal legal guidance, all coordinated by our team." },
            { q: "What Korean regulations apply to Web3 projects?", a: "Key regulations include the Virtual Asset User Protection Act, PIPA (Personal Information Protection Act), and exchange-specific listing requirements. The regulatory landscape varies by project type — DeFi, NFT, and token projects each face different requirements." },
            { q: "How long does VASP registration guidance take?", a: "Our regulatory assessment takes 1-2 weeks. Full VASP registration support, including documentation preparation and application guidance, typically runs 4-8 weeks depending on project complexity." },
          ].map((item, i) => (
            <div key={i} className="py-6 sm:py-8 border-b border-white/[0.04] first:border-t cursor-default">
              <p className="text-sm sm:text-base font-semibold text-white mb-2">{item.q}</p>
              <p className="text-[13px] text-white/25 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-24 sm:py-36 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.015] blur-3xl pointer-events-none" />
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white leading-[0.92] tracking-[-0.04em] mb-5 relative z-10">
          Ready to navigate<br /><span className="text-white/25">Korean compliance?</span>
        </h2>
        <p className="text-sm sm:text-base text-white/25 max-w-lg mx-auto mb-10 relative z-10 leading-relaxed">
          30-minute consultation. We'll assess your regulatory exposure, outline next steps, and connect you with the right legal partners. No ambiguity.
        </p>
        <CalendlyButton className="inline-flex items-center gap-2 px-9 py-4 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.1)] transition-all relative z-10">
          Book Compliance Call <ArrowRight className="w-4 h-4" />
        </CalendlyButton>
      </section>

      <FooterLinksSection />
      <div className="border-t border-white/[0.04]"><Footer /></div>
    </div>
  );
};

export default BrandingService;
