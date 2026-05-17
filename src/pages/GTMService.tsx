import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import ServiceSchema from "@/components/ServiceSchema";
import ContactFormSection from "@/components/ContactFormSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import Footer from "@/components/Footer";
import { brand } from "@/config/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gtmHeroImage from "@/assets/services/gtm-hero.avif";
import bnbImg from "@/assets/campaigns/bnb-hanok-event.jpg";
import kucoinImg from "@/assets/campaigns/kucoin-party-event.jpg";
import mantraImg from "@/assets/campaigns/mantra-party.jpg";
import bybitImg from "@/assets/campaigns/bybit-event.jpg";
import saharaImg from "@/assets/campaigns/sahara-ai-event.jpg";
import polygonImg from "@/assets/campaigns/polygon-connect.jpg";
// Team photos
import teamDavid from "@/assets/team/kevin-bd-new.jpg";
import teamBennet from "@/assets/team/rachel-design.jpg";
import teamJ from "@/assets/team/j-cmo.jpg";
import teamKevin from "@/assets/team/helen-cm.jpg";
import teamSuki from "@/assets/team/bennet-coo.jpg";
import teamLewis from "@/assets/team/lewis-pr.jpg";
import teamRachel from "@/assets/team/kevin-bd.jpg";
import teamHyukjae from "@/assets/team/hyukjae-bdm-new.jpg";
// Service images
import svcGtmImg from "@/assets/services/gtm-strategy.jpg";
import svcKolImg from "@/assets/services/kol-network.jpg";
import svcPrImg from "@/assets/services/pr-media.jpg";
import svcCommImg from "@/assets/services/community-management.jpg";
import svcEventImg from "@/assets/services/events.jpg";
import svcResearchImg from "@/assets/services/deep-research-blog.jpg";
import svcSeoImg from "@/assets/services/seo-naver.jpg";
import svcAmaImg from "@/assets/services/ama-spaces.jpg";
import EastAsiaMap from "@/components/EastAsiaMap";
// Client logos (same as HeroSection)
import bnbLogo from "@/assets/logos/bnb.png";
import kucoinLogo from "@/assets/logos/kucoin-mono.png";
import polygonLogo from "@/assets/logos/polygon.svg";
import ondoLogo from "@/assets/logos/ondo.svg";
import bybitLogo from "@/assets/logos/bybit.png";
import spacecoinLogo from "@/assets/logos/spacecoin.png";
import triaLogo from "@/assets/logos/tria-mono.png";
import mantraLogo from "@/assets/logos/mantra-mono.png";
import saharaAiLogo from "@/assets/logos/sahara-ai-mono.png";
import fogoLogo from "@/assets/logos/fogo.png";
import synfuturesLogo from "@/assets/logos/synfutures.png";
import aptosLogo from "@/assets/logos/aptos-round.png";
import kiteLogo from "@/assets/logos/kite.png";
import "./GTMService.css";

const clientLogos = [
  { name: "BNB Chain", logo: bnbLogo, noInvert: false, slug: "bnb-chain" },
  { name: "KuCoin", logo: kucoinLogo, noInvert: true, slug: "kucoin" },
  { name: "Polygon", logo: polygonLogo, noInvert: false, slug: "polygon" },
  { name: "Ondo Finance", logo: ondoLogo, noInvert: false, slug: "ondo" },
  { name: "Bybit", logo: bybitLogo, noInvert: false, slug: "bybit" },
  { name: "SpaceCoin", logo: spacecoinLogo, noInvert: true, slug: "spacecoin" },
  { name: "Tria", logo: triaLogo, noInvert: true, slug: "tria" },
  { name: "Mantra", logo: mantraLogo, noInvert: true, slug: "mantra" },
  { name: "Sahara AI", logo: saharaAiLogo, noInvert: true, slug: "sahara-ai" },
  { name: "FOGO", logo: fogoLogo, noInvert: true, slug: "fogo" },
  { name: "SynFutures", logo: synfuturesLogo, noInvert: true, slug: "synfutures" },
  { name: "Aptos", logo: aptosLogo, noInvert: true, slug: "aptos" },
  { name: "Kite", logo: kiteLogo, noInvert: true, slug: "kite" },
];

gsap.registerPlugin(ScrollTrigger);

const clients = ["BNB Chain","Sahara AI","Bybit","KuCoin","Polygon","Mantra","Ondo Finance","FOGO","Aptos","Kite","SynFutures"];

const services = [
  { num: "01", title: "GTM Strategy", tagline: "Full-stack Go-To-Market planning for Korean market entry. Competitive landscape, Korea-fit narrative, launch timeline.",
    desc: "We start with a full scan of the Korean crypto landscape. Competitor share-of-voice analysis, on-chain wallet profiling, opportunity mapping, and regulatory review. You get a clear picture of where you stand and where to move.",
    caps: ["Competitive Landscape Analysis","Korea-fit Narrative & Positioning","Launch Timeline & Milestone Planning","Market Sizing & Opportunity Mapping","Audience Segmentation","GTM Roadmap & Playbook"], href: "/services/gtm", img: svcGtmImg },
  { num: "02", title: "KOL & Influencer", tagline: "230+ vetted Korean KOLs. YouTube, X, Telegram, Naver. Managed campaigns with fraud filtering and ROI tracking.",
    desc: "Korea's top crypto KOLs — direct relationships, not broker networks. S-tier thread campaigns, YouTube reviews, Twitter Spaces, AMA hosting. Every placement is audience-verified, content-approved, and performance-tracked.",
    caps: ["S / A / B-Tier KOL Campaigns","YouTube Review Placements","Thread & Long-form Content","Twitter Spaces & AMA Hosting","Audience Verification & Fraud Filtering","Performance Analytics & Reporting"], href: "/services/influencer", img: svcKolImg },
  { num: "03", title: "PR & Media", tagline: "CoinDesk Korea, Block Media, TokenPost, mainstream outlets. Press releases, thought leadership, crisis comms.",
    desc: "Tier-1 Korean media coverage through direct journalist relationships. Korean press release writing, interview facilitation, thought leadership positioning, and crisis communication management.",
    caps: ["CoinDesk Korea / Block Media / TokenPost","Korean Press Release Writing","Mainstream Media (Chosun, MBN)","Interview & Thought Leadership","Crisis Communication","Coverage Analytics & Reporting"], href: "/services/pr", img: svcPrImg },
  { num: "04", title: "Community Management", tagline: "24/7 native Korean managers. Telegram, Discord, KakaoTalk. Sentiment monitoring and engagement programs.",
    desc: "We design community culture. Korean Telegram groups, Discord servers, and local platforms with localized moderation, governance integration, and weekly event programming that keeps communities active and loyal.",
    caps: ["Telegram & Discord (Korean Mods)","KakaoTalk Open Chat Management","24/7 Moderation & Support","Sentiment Monitoring & Reporting","Engagement Programs & Gamification","AMA & Event Programming"], href: "/services/community", img: svcCommImg },
  { num: "05", title: "Offline Events", tagline: "KBW side events, Seoul meetups, VIP networking dinners. Full logistics, venue sourcing, and post-event content.",
    desc: "End-to-end event production in Seoul. From 20-person VIP dinners to 500+ person parties during Korea Blockchain Week. Venue sourcing, speaker curation, full logistics management, and post-event content that outlasts the night.",
    caps: ["Korea Blockchain Week Side Events","VIP Networking Dinners","Launch Parties & Meetups","Venue Sourcing & Full Logistics","Speaker & Guest Curation","Post-Event Content & Lead Capture"], href: "/services/offline-event", img: svcEventImg },
  { num: "06", title: "Deep Research", tagline: "On-chain wallet profiling, competitor analysis, market ecosystem mapping. Reports in Korean and English.",
    desc: "Data-driven market intelligence for Korean market entry. On-chain behavior analysis, competitor share-of-voice, investment thesis support. Reports delivered in both Korean and English, distributed through our media and KOL network.",
    caps: ["Korean Market Ecosystem Mapping","On-chain Behavior & Wallet Profiling","Competitor Share-of-Voice Analysis","Investment Thesis & Due Diligence","Trend Reports & Forecasting","Distribution via Media & KOL Network"], href: "/services/deep-research", img: svcResearchImg },
  { num: "07", title: "SEO & Paid Ads", tagline: "Naver SEO, Google Ads, X Ads, crypto ad networks. We know which platforms ban crypto and how to get certified.",
    desc: "Naver SEO and keyword strategy, Google Ads, X Ads, crypto-native ad networks like Coinzilla and Bitmedia. We handle platform certifications to prevent ad blocking and optimize for Korean search behavior.",
    caps: ["Naver SEO & Keyword Strategy","Google Ads (Crypto Certified)","X / Twitter Ads","Crypto Ad Networks","A/B Testing & Conversion Optimization","Performance Tracking & ROI Reporting"], href: "/services/seo-ads", img: svcSeoImg },
  { num: "08", title: "AMA Hosting", tagline: "Telegram, Discord, X Spaces AMAs with native Korean-speaking hosts. Pre-event promotion, post-AMA recap.",
    desc: "Structured AMA sessions that drive real engagement. Native Korean-speaking professional hosts, pre-event promotion and question curation, live moderation, and post-AMA recap content and analytics.",
    caps: ["Telegram & Discord AMAs","X Spaces & YouTube Live","Native Korean-Speaking Hosts","Pre-Event Promotion & Question Curation","Live Moderation & Pacing","Post-AMA Recap & Analytics"], href: "/services/ama", img: svcAmaImg },
];

const workCards = [
  { img: bnbImg, cat: "BNB Chain — Korea Ecosystem Growth", metric: "40 KOLs", title: "Korean KOL activation", desc: "Full-scale Korean market campaign with top-tier KOL placements, Naver SEO push, community building.", tags: ["Korea","KOL","Ecosystem"], slug: "bnb-chain" },
  { img: saharaImg, cat: "Sahara AI — Korea Market Entry", metric: "4.2M", title: "Korean CT impressions, 6 weeks", desc: "AI×Crypto narrative positioning for Korean retail. KOL threads, AMA series, Kakao and Telegram activation.", tags: ["AI","Narrative","CT"], slug: "sahara-ai" },
  { img: kucoinImg, cat: "KuCoin — User Acquisition", metric: "35K", title: "New Korean users acquired", desc: "Community airdrop, KOL campaigns, and Naver SEO driving sustained user acquisition.", tags: ["Exchange","Community","SEO"], slug: "kucoin" },
  { img: mantraImg, cat: "MANTRA — Institutional Entry", metric: "$50M+", title: "Institutional pipeline", desc: "Korean investor dinners, BD introductions, and thought leadership.", tags: ["RWA","Institutional","BD"], slug: "mantra" },
  { img: bybitImg, cat: "Bybit — Brand Activation", metric: "#2", title: "Exchange traffic in Korea", desc: "150+ first-page SEO rankings and 850K monthly organic visitors.", tags: ["SEO","Content","Growth"], slug: "bybit" },
  { img: polygonImg, cat: "Polygon — Ecosystem Growth", metric: "280%", title: "TVL growth in Korean DeFi", desc: "Polygon Connect Seoul and sustained KOL partnerships.", tags: ["L2","DeFi","Events"], slug: "polygon" },
];

const GTMService = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const workPinRef = useRef<HTMLDivElement>(null);
  const [openSvc, setOpenSvc] = useState<number | null>(null);

  const toggleSvc = useCallback((i: number) => {
    setOpenSvc(p => p === i ? null : i);
  }, []);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".gtm-ed .hero-ed h1", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, delay: .2, ease: "power3.out" });
      gsap.fromTo(".gtm-ed .hero-desc", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: .6, ease: "power3.out" });
      gsap.fromTo(".gtm-ed .hero-stat", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .8, delay: .9, stagger: .1, ease: "power3.out" });

      gsap.utils.toArray<HTMLElement>(".gtm-ed .lbl,.gtm-ed .manifesto p,.gtm-ed .pill,.gtm-ed .q-card,.gtm-ed .invite h2,.gtm-ed .invite-kr,.gtm-ed .appr-l,.gtm-ed .pull-q,.gtm-ed .svc-block,.gtm-ed .reg-country,.gtm-ed .reg-map").forEach(el => {
        gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" }});
      });

      const mp = document.querySelector(".gtm-ed .manifesto p");
      if (mp) {
        const html = mp.innerHTML;
        const parts = html.split(/(<[^>]+>)/);
        let result = "";
        parts.forEach(part => {
          if (part.startsWith("<")) { result += part; return; }
          part.split(" ").forEach(w => { if (w.trim()) result += `<span class="mw" style="display:inline-block;opacity:.15;margin-right:.3em">${w}</span>`; });
        });
        mp.innerHTML = result;
        gsap.utils.toArray<HTMLElement>(".gtm-ed .mw").forEach(w => {
          gsap.to(w, { opacity: 1, duration: .5, scrollTrigger: { trigger: w, start: "top 90%", end: "top 60%", scrub: 1 }});
        });
      }

      if (workPinRef.current) {
        const totalW = workPinRef.current.scrollWidth - window.innerWidth;
        gsap.to(workPinRef.current, { x: -totalW, ease: "none",
          scrollTrigger: { trigger: ".gtm-ed .work-sec", start: "top top", end: () => `+=${totalW}`, scrub: 1, pin: true, anticipatePin: 1 }
        });
      }
    }, containerRef);

    return () => { ctx.revert(); };
  }, []);

  return (
    <div className="gtm-ed" ref={containerRef}>
      <SEOHead title="Korea Web3 GTM Strategy | ium Labs" description="Korea-focused Web3 GTM agency. Korean market activation, KOL management, and campaign execution." path="/services/gtm" image={gtmHeroImage} keywords={["Korea Web3 GTM","Go-To-Market Korea"]} />
      <ServiceSchema name="Korea Web3 GTM Strategy" description="Korea-focused Web3 GTM agency. Full-stack Go-To-Market planning, Korean market activation, KOL management, and campaign execution." url="/services/gtm" serviceType={["Go-To-Market Strategy", "Market Entry Consulting", "Web3 Marketing"]} />
      <Navbar />

      {/* HERO */}
      <section className="hero-ed">
        <img src={gtmHeroImage} alt="" className="hero-bg" width={1200} height={800} />
        <div className="hero-overlay" />
        <div className="hero-center">
          <h1>Seoul Moves Fast.<br /><span className="hero-accent">We Make You Land.</span></h1>
          <p className="hero-desc">Korea is retail-driven, trust-first, and brutally fast. We don't localize your deck — we rebuild your <strong>narrative</strong>, activate <strong>real KOLs</strong>, and run <strong>campaigns that convert</strong>.</p>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><div className="hero-stat-big">$7B+</div><div className="hero-stat-sub">Client Valuation</div></div>
          <div className="hero-stat"><div className="hero-stat-big">230+</div><div className="hero-stat-sub">KOL Network</div></div>
          <div className="hero-stat"><div className="hero-stat-big">22+</div><div className="hero-stat-sub">Korea Entries</div></div>
          <div className="hero-stat hidden md:block"><div className="hero-stat-big">70+</div><div className="hero-stat-sub">Events Hosted</div></div>
        </div>
      </section>

      {/* CLIENT LOGO MARQUEE */}
      <div className="relative z-[14] py-3 sm:py-6 overflow-hidden" style={{ background: '#0A0A0A' }}>
        <div className="flex items-center logo-marquee-slow">
          {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => (
            <Link key={index} to={`/projects/${client.slug}`} className="flex items-center gap-1.5 sm:gap-3 mx-1 sm:mx-2 px-3 sm:px-6 py-2 sm:py-3.5 bg-zinc-900/80 rounded-full border border-white/15 hover:border-white/25 hover:bg-zinc-800/80 transition-all duration-300 flex-shrink-0">
              <img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                decoding="async"
                className={`h-3.5 sm:h-7 w-auto max-w-[60px] sm:max-w-[140px] object-contain flex-shrink-0 ${client.noInvert ? 'opacity-90' : 'brightness-0 invert opacity-85'}`}
              />
              <span className="text-white/75 text-[10px] sm:text-sm font-medium whitespace-nowrap">
                {client.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="wrap manifesto-grid">
          <p>Korea is the world's third-largest crypto market by trading volume, but it's also the <strong>hardest to crack</strong>. Unique platforms, aggressive retail sentiment, and cultural nuance that no translated deck can capture. ium Labs exists because we've <strong>lived it</strong> — as exchange operators, as BD leads, as builders inside the Korean crypto ecosystem.</p>
          <div className="manifesto-video">
            <video autoPlay muted loop playsInline preload="auto">
              <source src="/videos/manifesto.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* SERVICES — R/GA MEGA BLOCKS */}
      <section className="svc-sec" id="services">
        <div className="wrap">
          <div className="lbl">Services</div>
          {services.map((svc, i) => (
            <div key={svc.num} className={`svc-block${openSvc === i ? " open" : ""}`}>
              <div className="svc-main" onClick={() => toggleSvc(i)}>
                <div className="svc-num">{svc.num}</div>
                <div className="svc-content">
                  <div className="svc-left">
                    <div className="svc-title">{svc.title}</div>
                    <div className="svc-tagline">{svc.tagline}</div>
                  </div>
                  <div className="svc-toggle"><span className="svc-tog-i">+</span> Details</div>
                </div>
              </div>
              <div className="svc-expand">
                <div className="svc-exp-inner">
                  <div className="svc-body">
                    <div className="svc-desc">{svc.desc}</div>
                    <Link to={svc.href} className="svc-cta" onClick={() => window.scrollTo(0,0)}>Learn More →</Link>
                  </div>
                  <div className="svc-subs">
                    <h5>Capabilities</h5>
                    <ul>{svc.caps.map(c => <li key={c}>{c}</li>)}</ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HORIZONTAL WORK */}
      <section className="work-sec" id="work">
        <div className="work-pin" ref={workPinRef}>
          <div className="work-intro">
            <div className="lbl">Selected Work</div>
            <h2>Campaigns that <strong>moved Korea.</strong></h2>
          </div>
          {workCards.map(card => (
            <Link key={card.slug} to={`/projects/${card.slug}`} className="work-card" onClick={() => window.scrollTo(0,0)}>
              <div className="wc-img"><img src={card.img} alt={card.title} loading="lazy" width={600} height={400} /></div>
              <div className="wc-cat">{card.cat}</div>
              <div className="wc-metric">{card.metric}</div>
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
              <div className="wc-tags">{card.tags.map(t => <span key={t} className="wc-tag">{t}</span>)}</div>
            </Link>
          ))}
        </div>
      </section>


      {/* APPROACH */}
      <section className="approach-ed" id="approach">
        <div className="wrap">
          <div className="lbl">Approach</div>
          <div className="appr-grid">
            <div className="appr-l">
              <h2>We don't advise. <strong>We execute.</strong></h2>
              <p>No slide decks. No advisory calls. We deploy operators who've actually shipped campaigns inside Korean exchanges and protocols — embedded directly into your team from day one.</p>
            </div>
            <div className="pillars">
              <div className="pill"><div className="pill-n">I</div><h4>Built by Binance, KuCoin, Upbit alumni</h4><p>Our team comes from inside Korea's top exchanges and protocols. We didn't study the market — we operated it. That's why our playbooks work from day one.</p></div>
              <div className="pill"><div className="pill-n">II</div><h4>Native to platforms foreigners can't touch</h4><p>Naver Blog ranking, KakaoTalk Open Chat moderation, DC Inside sentiment, Korean CT narratives — these aren't channels you can outsource to a translator.</p></div>
              <div className="pill"><div className="pill-n">III</div><h4>230+ KOLs, direct — no middlemen</h4><p>Every KOL in our network is audience-verified and fraud-filtered. We negotiate rates, approve content, and track performance in-house. No broker markup.</p></div>
              <div className="pill"><div className="pill-n">IV</div><h4>Korea market infrastructure, end to end</h4><p>From exchange relations and market maker coordination to post-launch volume strategy and investor BD. We cover the full lifecycle of a token entering Korea.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM — scatter layout */}
      <section className="team-section">
        <div className="team-label">[ Team of 10+ Operators ]</div>
        <div className="team-title-wrap"><div className="team-title">Our Team</div></div>
        <div className="team-cards" style={{ minHeight: 2400 }}>
          <div className="tm-card" style={{ top: 40, left: "0%", width: 340 }}>
            <div className="tm-info"><h4>David</h4><span>CEO</span></div>
            <div className="tm-photo"><img src={teamDavid} alt="David" /></div>
          </div>
          <div className="tm-card" style={{ top: 80, left: "72%", width: 220 }}>
            <div className="tm-info"><h4>Bennet</h4><span>COO</span></div>
            <div className="tm-photo"><img src={teamBennet} alt="Bennet" /></div>
          </div>
          <div className="tm-card" style={{ top: 420, left: "48%", width: 400 }}>
            <div className="tm-info"><h4>J</h4><span>CMO</span></div>
            <div className="tm-photo"><img src={teamJ} alt="J" /></div>
          </div>
          <div className="tm-card" style={{ top: 750, left: "0%", width: 180 }}>
            <div className="tm-info"><h4>Kevin</h4><span>Head of BD</span></div>
            <div className="tm-photo"><img src={teamKevin} alt="Kevin" /></div>
          </div>
          <div className="tm-card" style={{ top: 1050, left: "16%", width: 300 }}>
            <div className="tm-info"><h4>Suki</h4><span>Managing Partner</span></div>
            <div className="tm-photo"><img src={teamSuki} alt="Suki" /></div>
          </div>
          <div className="tm-card" style={{ top: 1080, left: "66%", width: 260 }}>
            <div className="tm-info"><h4>Lewis</h4><span>PR Manager</span></div>
            <div className="tm-photo"><img src={teamLewis} alt="Lewis" /></div>
          </div>
          <div className="tm-card" style={{ top: 1500, left: "32%", width: 380 }}>
            <div className="tm-info"><h4>Rachel</h4><span>Designer</span></div>
            <div className="tm-photo"><img src={teamRachel} alt="Rachel" /></div>
          </div>
          <div className="tm-card" style={{ top: 1900, left: "0%", width: 200 }}>
            <div className="tm-info"><h4>Hyukjae</h4><span>BD Manager</span></div>
            <div className="tm-photo"><img src={teamHyukjae} alt="Hyukjae" /></div>
          </div>
        </div>
      </section>


      {/* REGIONS */}
      <section className="regions-sec">
        <div className="wrap">
          <div className="lbl">Coverage</div>
          <h2 className="reg-headline">Korea-first. <strong>Asia-wide.</strong></h2>
          <div className="reg-map-wrap">
            <div className="reg-map">
              <EastAsiaMap />
            </div>

            <div className="reg-countries">
              {[
                { name: "South Korea", tag: "HOME", desc: "Upbit, Bithumb, Naver, Kakao, DC Inside, Korean CT" },
                { name: "Japan", tag: "ACTIVE", desc: "Regulated entry, LINE ecosystem, bitFlyer, Coincheck" },
                { name: "Taiwan", tag: "ACTIVE", desc: "Local KOL network, exchange partnerships, community ops" },
                { name: "China", tag: "ACTIVE", desc: "Mainland BD, institutional investor network, WeChat CT" },
              ].map(c => (
                <div key={c.name} className="reg-country">
                  <div className="reg-country-top">
                    <span className="reg-country-name">{c.name}</span>
                    <span className={`reg-country-tag${c.tag === "HOME" ? " reg-country-tag--home" : ""}`}>{c.tag}</span>
                  </div>
                  <div className="reg-country-desc">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUOTES */}
      <section className="quotes-sec">
        <div className="wrap">
          <div className="lbl" style={{ color: "var(--g2)" }}>Testimonials</div>
          <div className="quotes-grid">
            <div className="q-card"><blockquote>"ium Labs didn't just translate our deck into Korean — they rebuilt our entire market entry strategy from scratch. The KOL network, the Naver presence, the community culture — it all felt native because it was."</blockquote><cite>Head of BD — BNB Chain Ecosystem Partner</cite></div>
            <div className="q-card"><blockquote>"Most agencies give you a KOL list and disappear. ium Labs managed every placement, tracked every metric, and iterated weekly. They operated like an internal team."</blockquote><cite>Growth Lead — AI Protocol (Confidential)</cite></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div style={{ background: '#0A0A0A' }}>
        <ContactFormSection />
        <FooterLinksSection />
        <Footer />
      </div>
    </div>
  );
};

export default GTMService;
