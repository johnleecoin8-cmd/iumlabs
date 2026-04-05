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

const amaServices = [
  {
    num: "01", title: "Telegram AMA",
    desc: "Text-based AMAs in Korean Telegram communities. Curated questions, structured flow, real-time moderation, and post-session recap distribution.",
    tags: ["Text AMA", "Moderation", "Recap"],
  },
  {
    num: "02", title: "Discord AMA",
    desc: "Voice and text AMAs in Discord servers. Stage channel hosting, Korean translation, community engagement tools, and recorded sessions.",
    tags: ["Voice", "Stage Channel", "Recording"],
  },
  {
    num: "03", title: "X Spaces",
    desc: "Live audio sessions on X/Twitter Spaces. Korean-speaking hosts, co-host coordination, audience Q&A management, and clip extraction.",
    tags: ["Live Audio", "Clips", "Amplification"],
  },
  {
    num: "04", title: "KakaoTalk Live",
    desc: "Open chat room AMAs on Korea's dominant messaging platform. Native format for Korean retail audiences, real-time Q&A, and community warm-up.",
    tags: ["KakaoTalk", "Korean Retail", "Open Chat"],
  },
  {
    num: "05", title: "YouTube Live",
    desc: "Video-format AMAs and live streams. Professional production, Korean subtitles, super chat management, and VOD repurposing.",
    tags: ["Video", "Subtitles", "VOD"],
  },
  {
    num: "06", title: "Post-AMA Content",
    desc: "Recap articles, highlight clips, key takeaway threads, Naver blog posts, and analytics reports. Extend every AMA's lifespan by 10x.",
    tags: ["Recap", "Naver Blog", "Analytics"],
  },
];

const processSteps = [
  { num: "01", title: "Pre-AMA Strategy", desc: "Topic selection, question seeding from the community, speaker briefing, promotional assets, and community warm-up campaigns across channels.", time: "Day 1–5" },
  { num: "02", title: "Platform Setup", desc: "Channel configuration, bot deployment, moderation tools, recording setup, and dry-run with speakers to ensure smooth execution.", time: "Day 5–7" },
  { num: "03", title: "Live Execution", desc: "Professional Korean MC hosting, real-time moderation and spam filtering, audience engagement moments, pacing management, and technical support.", time: "Event Day" },
  { num: "04", title: "Post-AMA Amplification", desc: "Written recap and key takeaways, video/audio highlights for social, engagement analytics report, and follow-up community strategy.", time: "Day 1–3 After" },
];

const caseStudies = [
  { slug: "bnb-chain", category: "L1 Infrastructure", metric: "12K+", label: "Live participants across 3 Telegram AMAs during Korean community launch campaign" },
  { slug: "mantra", category: "RWA Layer 1", metric: "85%", label: "Average audience retention rate across Discord and X Spaces sessions" },
  { slug: "kucoin", category: "Exchange", metric: "3.2K", label: "New community members acquired within 48 hours of a single AMA session" },
];

const AMAService = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead
        title="Korean Crypto AMA Hosting & Management | ium Labs"
        description="Professional AMA hosting for Web3 projects in Korea. Telegram, Discord, X Spaces AMAs with native Korean hosts, structured formats, and full production support."
        path="/services/ama"
        keywords={['Korean AMA hosting', 'crypto AMA Korea', 'Telegram AMA', 'Web3 AMA management', 'Korean community AMA']}
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0A0A]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#0A0A0A]" />
        <div className="relative z-10 px-4 sm:px-8 text-center max-w-5xl mx-auto pt-24">
          <p className="text-[10px] text-white/20 tracking-[0.3em] uppercase mb-6">AMA Hosting</p>
          <h1 className="font-sans text-[2.2rem] sm:text-[4rem] md:text-[6rem] font-black text-white leading-[0.92] tracking-[-0.04em] mb-6">
            Host AMAs.<br />
            <span className="text-white/30">Build trust live.</span>
          </h1>
          <p className="text-sm sm:text-lg text-white/40 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Structured AMA sessions across Telegram, Discord, X Spaces, and Korean platforms. Native hosts, curated questions, post-event amplification.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <CalendlyButton className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.12)] transition-all">
              Book AMA Strategy Call
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
            { value: "200+", label: "AMAs Hosted" },
            { value: "50K+", label: "Live Participants" },
            { value: "85%", label: "Avg Retention Rate" },
            { value: "19+", label: "Projects Served" },
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
          Most AMAs are forgettable<br />
          <span className="text-white/20">because they lack structure and local context.</span>
        </h2>
        <p className="text-sm sm:text-base text-white/30 leading-relaxed max-w-2xl mx-auto">
          Korean communities expect more than a casual Q&A in English. They want native-speaking hosts who understand the project deeply, curated questions that surface real concerns, structured pacing that respects their time, and post-event content they can reference later. Without this, AMAs become noise that erodes trust instead of building it.
        </p>
      </section>

      {/* ===== SERVICE BREAKDOWN — numbered rows ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="text-center mb-14">
          <p className="text-[10px] text-white/15 tracking-[0.3em] uppercase mb-4">AMA Formats</p>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            6 formats. <span className="text-white/20">Every platform covered.</span>
          </h2>
        </div>
        <div className="flex flex-col">
          {amaServices.map((svc) => (
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
            From brief to <span className="text-white/20">live session</span>
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
            AMAs that <span className="text-white/20">drove real numbers</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              to={`/projects/${cs.slug}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group block border border-white/[0.04] rounded-2xl p-7 sm:p-9 hover:border-white/[0.08] hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-[9px] text-white/15 tracking-[0.12em] uppercase block pb-5 mb-5 border-b border-white/[0.04]">{cs.category}</span>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tighter mb-3">{cs.metric}</div>
              <p className="text-[13px] text-white/30 leading-relaxed mb-5">{cs.label}</p>
              <span className="text-[11px] text-white/15 group-hover:text-white/40 transition-colors">
                Read case study →
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link to="/projects" className="text-sm text-white/20 hover:text-white/50 transition-colors">
            View all projects →
          </Link>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20 bg-[#0c0c0e]">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            Why ium Labs for AMAs
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.03] max-w-4xl mx-auto">
          {[
            { title: "Native Korean hosts", desc: "Every AMA is led by native Korean speakers with deep crypto fluency. They don't just translate — they contextualize your project for the Korean audience." },
            { title: "Structured format, not casual chat", desc: "We treat AMAs as produced community events. Curated questions, managed pacing, engagement moments, and clear takeaways — not a rambling Q&A." },
            { title: "Full production pipeline", desc: "From pre-event promotion and question seeding to live moderation and post-AMA recap content. One team handles the entire lifecycle." },
            { title: "Platform-native execution", desc: "Telegram, Discord, X Spaces, KakaoTalk, YouTube — we run each format natively, not a one-size-fits-all template forced onto every platform." },
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
            { q: "Which platforms do you host AMAs on?", a: "We host across all major platforms where Korean crypto communities are active: Telegram, Discord, X Spaces, YouTube Live, KakaoTalk open chat, and Naver Cafe. We recommend the platform based on where your target community is most engaged." },
            { q: "Do you provide Korean-speaking hosts?", a: "Yes. All our AMA hosts are native Korean speakers with deep crypto knowledge. They can host entirely in Korean, in English with Korean translation, or bilingual — depending on your audience." },
            { q: "How far in advance should we plan an AMA?", a: "Ideally 2-3 weeks for maximum community warm-up and promotion. However, we can execute a quality AMA in as little as 5 business days for urgent launches or market events." },
            { q: "What makes your AMAs different from standard Q&As?", a: "We treat AMAs as structured community events, not casual chats. We seed questions beforehand, manage pacing, create real-time engagement moments, and produce post-event content that extends the value far beyond the live session." },
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
          Ready to go<br /><span className="text-white/25">live?</span>
        </h2>
        <p className="text-sm sm:text-base text-white/25 max-w-lg mx-auto mb-10 relative z-10 leading-relaxed">
          30-minute call. We'll plan your AMA — platform, format, host, promotion strategy, and post-event amplification. No fluff.
        </p>
        <CalendlyButton className="inline-flex items-center gap-2 px-9 py-4 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.1)] transition-all relative z-10">
          Book AMA Strategy Call <ArrowRight className="w-4 h-4" />
        </CalendlyButton>
      </section>

      <FooterLinksSection />
      <div className="border-t border-white/[0.04]"><Footer /></div>
    </div>
  );
};

export default AMAService;
