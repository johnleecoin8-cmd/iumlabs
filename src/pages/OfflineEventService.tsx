import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinksSection from "@/components/FooterLinksSection";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import eventsHeroImage from "@/assets/services/events.jpg";

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

const eventServices = [
  {
    num: "01", title: "KBW Side Events",
    desc: "Korea Blockchain Week is the highest-leverage moment of the year. We produce branded side events — from 80-person panels to 400-person parties — with venue, speakers, and crowd guaranteed.",
    tags: ["KBW", "Conference", "Side Event"],
  },
  {
    num: "02", title: "VIP Dinners",
    desc: "Intimate 15–30 person dinners with Korean exchange leaders, fund managers, and tier-1 KOLs. Private venues, curated guest lists, no wasted seats.",
    tags: ["Networking", "Investors", "KOLs"],
  },
  {
    num: "03", title: "Launch Parties",
    desc: "Mainnet launches, token listings, rebrand reveals — we turn protocol milestones into Seoul nightlife events that generate buzz for weeks.",
    tags: ["Mainnet", "TGE", "Brand"],
  },
  {
    num: "04", title: "Community Meetups",
    desc: "Regular touchpoints for your Korean community. 50–150 person meetups in Gangnam and Seongsu with panels, demos, and networking. Build retention, not just reach.",
    tags: ["Community", "Seoul", "Engagement"],
  },
  {
    num: "05", title: "Venue Sourcing",
    desc: "Access to 40+ vetted venues across Seoul — rooftop bars, private dining, conference halls, co-working spaces. We negotiate Korean-language contracts and handle all logistics.",
    tags: ["Logistics", "Venues", "Seoul"],
  },
  {
    num: "06", title: "Post-Event Content",
    desc: "Professional photo/video recap, highlight reels, KOL testimonial clips, and social media assets. One night becomes four weeks of content.",
    tags: ["Content", "Video", "Amplification"],
  },
];

const processSteps = [
  { num: "01", title: "Scope & Brief", desc: "Event objectives, budget, guest profile, preferred dates and venues. We align on format, scale, and success metrics before anything else.", time: "Week 1" },
  { num: "02", title: "Production", desc: "Venue locked, vendors contracted, guest list curated, run-of-show finalized. Branding, AV, catering, check-in flow — all confirmed.", time: "Week 2–3" },
  { num: "03", title: "Promotion", desc: "KOL outreach, community announcements, media partnerships, RSVP management. We fill the room with the right people, not just any people.", time: "Week 3–4" },
  { num: "04", title: "Execute & Amplify", desc: "Day-of production management, live social coverage, professional photography. Post-event recap content delivered within 72 hours.", time: "Event Day+" },
];

const caseStudies = [
  { slug: "bnb-chain", category: "L1 Infrastructure", metric: "350+", label: "Attendees at KBW side event with 12 Korean KOLs and live-streamed panels" },
  { slug: "mantra", category: "RWA Layer 1", metric: "$50M+", label: "Institutional pipeline generated from curated VIP dinner series in Seoul" },
  { slug: "kucoin", category: "Exchange", metric: "94%", label: "Post-event satisfaction score across 5 Seoul community meetups" },
];

const OfflineEventService = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SEOHead
        title="Korea Web3 Events | Offline Event Agency Seoul | ium Labs"
        description="Full-production Web3 events in Seoul. KBW side events, VIP dinners, launch parties, community meetups. 23 events, 2847 attendees, 94% satisfaction."
        path="/services/offline-event"
        keywords={['Korea Web3 Events', 'KBW Side Events', 'Seoul Crypto Meetup', 'Web3 Event Agency Korea']}
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img src={eventsHeroImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.15)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#0A0A0A]" />
        <div className="relative z-10 px-4 sm:px-8 text-center max-w-5xl mx-auto pt-24">
          <p className="text-[10px] text-white/20 tracking-[0.3em] uppercase mb-6">Offline Events</p>
          <h1 className="font-sans text-[2.2rem] sm:text-[4rem] md:text-[6rem] font-black text-white leading-[0.92] tracking-[-0.04em] mb-6">
            Events in Seoul.<br />
            <span className="text-white/30">Run by locals.</span>
          </h1>
          <p className="text-sm sm:text-lg text-white/40 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            KBW side events, VIP dinners, launch parties, community meetups. Full production from a team that knows every venue, vendor, and KOL in the city.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <CalendlyButton className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.12)] transition-all">
              Plan Your Event
            </CalendlyButton>
            <Link to="/projects" className="inline-flex items-center gap-2 px-8 py-4 border border-white/[0.1] text-white/40 text-sm rounded-full hover:border-white/[0.2] hover:text-white/70 transition-all">
              See Past Events <ArrowRight className="w-4 h-4" />
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
            { value: "23", label: "Events Produced" },
            { value: "2,847", label: "Total Attendees" },
            { value: "156", label: "KOLs & VIPs Hosted" },
            { value: "94%", label: "Satisfaction Rate" },
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
          Seoul events look easy<br />
          <span className="text-white/20">until you try to run one.</span>
        </h2>
        <p className="text-sm sm:text-base text-white/30 leading-relaxed max-w-2xl mx-auto">
          Korean venues require Korean-language contracts. The best spaces book out months in advance during KBW. Guest lists need direct KOL relationships, not cold DMs. Catering, AV, staffing — every vendor operates in Korean with Korean business norms. Without a local production team, you're flying blind in the most competitive event market in crypto.
        </p>
      </section>

      {/* ===== SERVICE BREAKDOWN — numbered rows ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="text-center mb-14">
          <p className="text-[10px] text-white/15 tracking-[0.3em] uppercase mb-4">What We Produce</p>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            6 event formats. <span className="text-white/20">One production team.</span>
          </h2>
        </div>
        <div className="flex flex-col">
          {eventServices.map((svc) => (
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
            From brief to <span className="text-white/20">sold-out event</span>
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
            Events that <span className="text-white/20">delivered outcomes</span>
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
            View all 22+ projects →
          </Link>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="px-4 sm:px-8 lg:px-14 py-14 sm:py-20 bg-[#0c0c0e]">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-[1.05] tracking-tight">
            Why ium Labs for events
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.03] max-w-4xl mx-auto">
          {[
            { title: "Boots on the ground in Seoul", desc: "We don't coordinate remotely. Our team is physically in Seoul, walking venues, meeting vendors face-to-face, and managing day-of production on-site." },
            { title: "40+ vetted venue network", desc: "Rooftop bars, private dining rooms, conference halls, gallery spaces — pre-negotiated rates and Korean-language contracts ready to go." },
            { title: "Direct KOL relationships", desc: "We don't send cold invites. 156 KOLs and VIPs have attended our events. Personal relationships mean confirmed attendance, not maybe-RSVPs." },
            { title: "Content that outlasts the night", desc: "Professional photo, video, and social recaps delivered within 72 hours. One event becomes four weeks of marketing assets across every channel." },
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
            { q: "What kind of events do you produce?", a: "Anything from 15-person VIP dinners and investor roundtables to 400+ person parties and networking nights during major weeks like KBW. We also handle community meetups, launch parties, and workshop-format events." },
            { q: "Can you help global teams visiting Korea?", a: "That's our core use case. We act as your full production team in Seoul — handling Korean-language vendor contracts, venue negotiations, local KOL invitations, and cultural nuances so your team can focus on networking." },
            { q: "How do you ensure quality attendance?", a: "We don't blast a registration link and hope. We leverage direct relationships with 156+ Korean KOLs, community leaders, and media partners. Guest lists are curated, not crowdsourced." },
            { q: "How far in advance should we plan?", a: "4 weeks is our standard production timeline. For large-scale events during peak periods like KBW, 6–8 weeks is ideal to lock in premium venues before they book out." },
            { q: "What's the budget range?", a: "Intimate VIP dinners start at $8K. Community meetups run $12K–$20K. Full-scale KBW side events range from $25K–$60K depending on venue, scale, and production complexity." },
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
          Plan your next<br /><span className="text-white/25">Seoul event.</span>
        </h2>
        <p className="text-sm sm:text-base text-white/25 max-w-lg mx-auto mb-10 relative z-10 leading-relaxed">
          30-minute call. Tell us the event, the date, the goals. We'll come back with venues, guest list strategy, and a production plan.
        </p>
        <CalendlyButton className="inline-flex items-center gap-2 px-9 py-4 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.1)] transition-all relative z-10">
          Plan Your Event <ArrowRight className="w-4 h-4" />
        </CalendlyButton>
      </section>

      <FooterLinksSection />
      <div className="border-t border-white/[0.04]"><Footer /></div>
    </div>
  );
};

export default OfflineEventService;
