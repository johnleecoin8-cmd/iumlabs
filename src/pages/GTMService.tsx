import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import { brand } from "@/config/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gtmHeroImage from "@/assets/services/gtm-hero.avif";
import bnbImg from "@/assets/campaigns/bnb-hanok-event.png";
import kucoinImg from "@/assets/campaigns/kucoin-party-event.png";
import peaqImg from "@/assets/campaigns/peaq-booth-event.png";
import mantraImg from "@/assets/campaigns/mantra-party.jpg";
import bybitImg from "@/assets/campaigns/bybit-event.jpg";
import saharaImg from "@/assets/campaigns/sahara-ai-event.png";
import polygonImg from "@/assets/campaigns/polygon-connect.png";
import ondoImg from "@/assets/campaigns/ondo-seminar.jpg";
// Team photos
import teamDavid from "@/assets/team/david-ceo.png";
import teamBennet from "@/assets/team/rachel-design.png";
import teamJ from "@/assets/team/j-cmo.png";
import teamKevin from "@/assets/team/suki-partner.png";
import teamLewis from "@/assets/team/lewis-pr.png";
import teamRachel from "@/assets/team/bennet-coo.png";
import teamSuki from "@/assets/team/kevin-bd.png";
import teamHyukjae from "@/assets/team/hyukjae-bdm.png";
import teamHelen from "@/assets/team/helen-cm.png";
import "./GTMService.css";

gsap.registerPlugin(ScrollTrigger);

const clients = ["BNB Chain","Sahara AI","PEAQ Network","Bybit","KuCoin","Polygon","Mantra","Ondo Finance","FOGO","Aptos","Kite","SynFutures"];

const services = [
  { num: "01", title: "GTM Strategy", tagline: "Full-stack Go-To-Market planning for Korean market entry. Competitive landscape, Korea-fit narrative, launch timeline.",
    desc: "We start with a full scan of the Korean crypto landscape. Competitor share-of-voice analysis, on-chain wallet profiling, opportunity mapping, and regulatory review. You get a clear picture of where you stand and where to move.",
    caps: ["Competitive Landscape Analysis","Korea-fit Narrative & Positioning","Launch Timeline & Milestone Planning","Market Sizing & Opportunity Mapping","Audience Segmentation","GTM Roadmap & Playbook"], href: "/services/gtm" },
  { num: "02", title: "KOL & Influencer", tagline: "170+ vetted Korean KOLs. YouTube, X, Telegram, Naver. Managed campaigns with fraud filtering and ROI tracking.",
    desc: "Korea's top crypto KOLs — direct relationships, not broker networks. S-tier thread campaigns, YouTube reviews, Twitter Spaces, AMA hosting. Every placement is audience-verified, content-approved, and performance-tracked.",
    caps: ["S / A / B-Tier KOL Campaigns","YouTube Review Placements","Thread & Long-form Content","Twitter Spaces & AMA Hosting","Audience Verification & Fraud Filtering","Performance Analytics & Reporting"], href: "/services/influencer" },
  { num: "03", title: "PR & Media", tagline: "CoinDesk Korea, Block Media, TokenPost, mainstream outlets. Press releases, thought leadership, crisis comms.",
    desc: "Tier-1 Korean media coverage through direct journalist relationships. Korean press release writing, interview facilitation, thought leadership positioning, and crisis communication management.",
    caps: ["CoinDesk Korea / Block Media / TokenPost","Korean Press Release Writing","Mainstream Media (Chosun, MBN)","Interview & Thought Leadership","Crisis Communication","Coverage Analytics & Reporting"], href: "/services/pr" },
  { num: "04", title: "Community Management", tagline: "24/7 native Korean managers. Telegram, Discord, KakaoTalk. Sentiment monitoring and engagement programs.",
    desc: "We design community culture. Korean Telegram groups, Discord servers, and local platforms with localized moderation, governance integration, and weekly event programming that keeps communities active and loyal.",
    caps: ["Telegram & Discord (Korean Mods)","KakaoTalk Open Chat Management","24/7 Moderation & Support","Sentiment Monitoring & Reporting","Engagement Programs & Gamification","AMA & Event Programming"], href: "/services/community" },
  { num: "05", title: "Offline Events", tagline: "KBW side events, Seoul meetups, VIP networking dinners. Full logistics, venue sourcing, and post-event content.",
    desc: "End-to-end event production in Seoul. From 20-person VIP dinners to 500+ person parties during Korea Blockchain Week. Venue sourcing, speaker curation, full logistics management, and post-event content that outlasts the night.",
    caps: ["Korea Blockchain Week Side Events","VIP Networking Dinners","Launch Parties & Meetups","Venue Sourcing & Full Logistics","Speaker & Guest Curation","Post-Event Content & Lead Capture"], href: "/services/offline-event" },
  { num: "06", title: "Deep Research", tagline: "On-chain wallet profiling, competitor analysis, market ecosystem mapping. Reports in Korean and English.",
    desc: "Data-driven market intelligence for Korean market entry. On-chain behavior analysis, competitor share-of-voice, investment thesis support. Reports delivered in both Korean and English, distributed through our media and KOL network.",
    caps: ["Korean Market Ecosystem Mapping","On-chain Behavior & Wallet Profiling","Competitor Share-of-Voice Analysis","Investment Thesis & Due Diligence","Trend Reports & Forecasting","Distribution via Media & KOL Network"], href: "/services/deep-research" },
  { num: "07", title: "SEO & Paid Ads", tagline: "Naver SEO, Google Ads, X Ads, crypto ad networks. We know which platforms ban crypto and how to get certified.",
    desc: "Naver SEO and keyword strategy, Google Ads, X Ads, crypto-native ad networks like Coinzilla and Bitmedia. We handle platform certifications to prevent ad blocking and optimize for Korean search behavior.",
    caps: ["Naver SEO & Keyword Strategy","Google Ads (Crypto Certified)","X / Twitter Ads","Crypto Ad Networks","A/B Testing & Conversion Optimization","Performance Tracking & ROI Reporting"], href: "/services/seo-ads" },
  { num: "08", title: "AMA Hosting", tagline: "Telegram, Discord, X Spaces AMAs with native Korean-speaking hosts. Pre-event promotion, post-AMA recap.",
    desc: "Structured AMA sessions that drive real engagement. Native Korean-speaking professional hosts, pre-event promotion and question curation, live moderation, and post-AMA recap content and analytics.",
    caps: ["Telegram & Discord AMAs","X Spaces & YouTube Live","Native Korean-Speaking Hosts","Pre-Event Promotion & Question Curation","Live Moderation & Pacing","Post-AMA Recap & Analytics"], href: "/services/ama" },
];

const workCards = [
  { img: bnbImg, cat: "BNB Chain — Korea Ecosystem Growth", metric: "5 KOLs", title: "S-tier Korean KOL activation", desc: "Full-scale Korean market campaign with top-tier KOL placements, Naver SEO push, community building.", tags: ["Korea","KOL","Ecosystem"], slug: "bnb-chain" },
  { img: saharaImg, cat: "Sahara AI — Korea Market Entry", metric: "4.2M", title: "Korean CT impressions, 6 weeks", desc: "AI×Crypto narrative positioning for Korean retail. KOL threads, AMA series, Kakao and Telegram activation.", tags: ["AI","Narrative","CT"], slug: "sahara-ai" },
  { img: peaqImg, cat: "PEAQ Network — PEAQ Loves Robots", metric: "7 Weeks", title: "5 S-tier KOL multi-touch campaign", desc: "$35K campaign: DePIN narrative education, weekly KOL thread drops, Korean community AMA series.", tags: ["DePIN","KOL","Campaign"], slug: "peaq" },
  { img: kucoinImg, cat: "KuCoin — User Acquisition", metric: "35K", title: "New Korean users acquired", desc: "Community airdrop, KOL campaigns, and Naver SEO driving sustained user acquisition.", tags: ["Exchange","Community","SEO"], slug: "kucoin" },
  { img: mantraImg, cat: "MANTRA — Institutional Entry", metric: "$50M+", title: "Institutional pipeline", desc: "Korean investor dinners, BD introductions, and thought leadership.", tags: ["RWA","Institutional","BD"], slug: "mantra" },
  { img: bybitImg, cat: "Bybit — Brand Activation", metric: "#2", title: "Exchange traffic in Korea", desc: "150+ first-page SEO rankings and 850K monthly organic visitors.", tags: ["SEO","Content","Growth"], slug: "bybit" },
  { img: polygonImg, cat: "Polygon — Ecosystem Growth", metric: "280%", title: "TVL growth in Korean DeFi", desc: "Polygon Connect Seoul and sustained KOL partnerships.", tags: ["L2","DeFi","Events"], slug: "polygon" },
  { img: ondoImg, cat: "Ondo Finance — Market Education", metric: "12K+", title: "Seminar attendees reached", desc: "Korea seminar series establishing RWA narrative with institutional investors.", tags: ["RWA","Education","Institutional"], slug: "ondo" },
];

const GTMService = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const workPinRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const [openSvc, setOpenSvc] = useState<number | null>(null);

  const toggleSvc = useCallback((i: number) => {
    setOpenSvc(p => p === i ? null : i);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gtm-ed .hero-tag", { y: 30, opacity: 0, duration: 1, delay: .2, ease: "power3.out" });
      gsap.from(".gtm-ed .hero-ed h1", { y: 60, opacity: 0, duration: 1.2, delay: .4, ease: "power3.out" });
      gsap.from(".gtm-ed .hero-foot p", { y: 30, opacity: 0, duration: 1, delay: .7, ease: "power3.out" });

      // Team cards — scrub reveal as you scroll through
      gsap.utils.toArray<HTMLElement>(".gtm-ed .tm-card").forEach((card, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.set(card, { opacity: 0, y: 80, x: dir * 40 });
        ScrollTrigger.create({
          trigger: card, start: "top 95%", end: "top 50%", scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(card, { opacity: p, y: 80 * (1 - p), x: dir * 40 * (1 - p) });
          }
        });
      });

      gsap.utils.toArray<HTMLElement>(".gtm-ed .lbl,.gtm-ed .wk-item,.gtm-ed .manifesto p,.gtm-ed .pill,.gtm-ed .rg,.gtm-ed .q-card,.gtm-ed .invite h2,.gtm-ed .invite-kr,.gtm-ed .appr-l,.gtm-ed .reg-l,.gtm-ed .pull-q,.gtm-ed .svc-block").forEach(el => {
        gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" }});
      });

      // Manifesto word reveal
      const mp = document.querySelector(".gtm-ed .manifesto p");
      if (mp) {
        const html = mp.innerHTML;
        const parts = html.split(/(<[^>]+>)/);
        let result = "";
        parts.forEach(part => {
          if (part.startsWith("<")) { result += part; return; }
          part.split(" ").forEach(w => { if (w.trim()) result += `<span class="mw" style="display:inline-block;opacity:.15">${w}</span> `; });
        });
        mp.innerHTML = result;
        gsap.utils.toArray<HTMLElement>(".gtm-ed .mw").forEach(w => {
          gsap.to(w, { opacity: 1, duration: .5, scrollTrigger: { trigger: w, start: "top 90%", end: "top 60%", scrub: 1 }});
        });
      }

      // Horizontal scroll
      if (workPinRef.current && window.innerWidth > 768) {
        const totalW = workPinRef.current.scrollWidth - window.innerWidth;
        gsap.to(workPinRef.current, { x: -totalW, ease: "none",
          scrollTrigger: { trigger: ".gtm-ed .work-sec", start: "top top", end: () => `+=${totalW}`, scrub: 1, pin: true, anticipatePin: 1 }
        });
      }
    }, containerRef);

    const tick = () => {
      if (!clockRef.current) return;
      const sg = new Date().toLocaleString("en-US",{timeZone:"Asia/Singapore",hour:"2-digit",minute:"2-digit",hour12:false});
      const kr = new Date().toLocaleString("en-US",{timeZone:"Asia/Seoul",hour:"2-digit",minute:"2-digit",hour12:false});
      clockRef.current.textContent = `SG ${sg} / KR ${kr}`;
    };
    tick(); const ci = setInterval(tick, 60000);
    return () => { ctx.revert(); clearInterval(ci); };
  }, []);

  return (
    <div className="gtm-ed" ref={containerRef}>
      <SEOHead title="Korea Web3 GTM Strategy | ium Labs" description="Korea-focused Web3 GTM agency. Korean market activation, KOL management, and campaign execution." path="/services/gtm" keywords={["Korea Web3 GTM","Go-To-Market Korea"]} />
      <Navbar />

      {/* HERO */}
      <section className="hero-ed">
        <img src={gtmHeroImage} alt="" className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-grid" />
        <div className="hero-orb" />
        <div className="hero-kr">한국</div>
        <div className="hero-kr">시장</div>
        <div className="hero-kr">진입</div>
        <div className="hero-wm">ium</div>
        <div className="hero-tag">Korea-Focused Web3 GTM Agency — Seoul</div>
        <h1>Your protocol's <em>gateway</em> into <strong>Korea's crypto market.</strong></h1>
        <div className="hero-foot">
          <p>ium Labs is a Korea-focused Web3 GTM agency. We handle Korean market activation, KOL management, and campaign execution for protocols entering Asia's most concentrated retail market.</p>
          <div className="hero-scroll">Scroll</div>
        </div>
      </section>

      {/* CLIENT MARQUEE */}
      <section className="clients">
        <div className="cl-track">
          {[...clients,...clients,...clients].map((c,i) => (
            <span key={i}>{i > 0 && i % clients.length !== 0 ? <><div className="cl-sep" />{c}</> : c}</span>
          ))}
        </div>
      </section>

      {/* WHY KOREA */}
      <section className="why-kr">
        <div className="wrap">
          <div className="lbl" style={{ color: "var(--g2)" }}>Why Korea</div>
          <div className="wk-grid">
            <div className="wk-item"><div className="wk-big">#3</div><div className="wk-sub">Global Crypto Market</div><div className="wk-note">By trading volume. Korea routinely outpaces entire continents in 24h CEX volume.</div></div>
            <div className="wk-item"><div className="wk-big">87%</div><div className="wk-sub">Retail-Driven</div><div className="wk-note">The most concentrated retail crypto audience globally.</div></div>
            <div className="wk-item"><div className="wk-big">16M</div><div className="wk-sub">Active Crypto Users</div><div className="wk-note">Korea has 16M+ active crypto traders. That's 30% of the adult population.</div></div>
            <div className="wk-item"><div className="wk-big">2</div><div className="wk-sub">Dominant Exchanges</div><div className="wk-note">Upbit and Bithumb control the market. Listing on either can 10x awareness overnight.</div></div>
            <div className="wk-item"><div className="wk-big">$4B+</div><div className="wk-sub">Daily Upbit Volume</div><div className="wk-note">Upbit alone processes more daily volume than most global exchanges combined.</div></div>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="wrap">
          <p>Korea is the world's third-largest crypto market by trading volume, but it's also the <strong>hardest to crack</strong>. Unique platforms, aggressive retail sentiment, and cultural nuance that no translated deck can capture. ium Labs exists because we've <strong>lived it</strong> — as exchange operators, as BD leads, as builders inside the Korean crypto ecosystem.</p>
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
                  <div />
                  <div className="svc-desc">{svc.desc}</div>
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
              <div className="wc-img"><img src={card.img} alt={card.title} loading="lazy" /></div>
              <div className="wc-cat">{card.cat}</div>
              <div className="wc-metric">{card.metric}</div>
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
              <div className="wc-tags">{card.tags.map(t => <span key={t} className="wc-tag">{t}</span>)}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRANSITION: dark → light */}
      <div className="fade-dark-to-light" />

      {/* APPROACH */}
      <section className="approach-ed" id="approach">
        <div className="wrap">
          <div className="lbl">Approach</div>
          <div className="appr-grid">
            <div className="appr-l">
              <h2>Not another agency. <strong>A growth system.</strong></h2>
              <p>Every campaign is run by operators who've held BD and marketing roles at exchanges and protocols. We embed senior operators into your team.</p>
              <div className="pull-q">"번역된 전략은 한국에서 통하지 않습니다. 우리는 처음부터 한국 시장을 위해 설계합니다."</div>
            </div>
            <div className="pillars">
              <div className="pill"><div className="pill-n">I</div><h4>Operator-led, Korea-native</h4><p>Ex-KuCoin Korea BD, ex-Outlier Ventures, ex-Camelot DEX APAC. We've been inside the Korean exchange ecosystem.</p></div>
              <div className="pill"><div className="pill-n">II</div><h4>Korean platform mastery</h4><p>Naver Blog SEO, KakaoTalk Open Chat, DC Inside, Korean CT, Telegram KR — we operate them daily.</p></div>
              <div className="pill"><div className="pill-n">III</div><h4>S-tier KOL relationships</h4><p>Direct relationships with Korea's top crypto KOLs. Verified audience data, fraud-filtered, content-approved.</p></div>
              <div className="pill"><div className="pill-n">IV</div><h4>Exchange listing intelligence</h4><p>Deep understanding of Upbit/Bithumb listing processes, DD requirements, and market maker dynamics.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM — natural scroll, same background */}
      <section className="team-scatter">
        <div className="team-inner">
          <div className="team-big-wrap"><div className="team-big">Our Team</div></div>
          {[
            { name: "David", role: "CEO", img: teamHelen, top: "2%", left: "3%", w: 380 },
            { name: "Bennet", role: "COO", img: teamBennet, top: "10%", left: "62%", w: 280 },
            { name: "J", role: "CMO", img: teamJ, top: "22%", left: "28%", w: 440 },
            { name: "Kevin", role: "Head of BD", img: teamKevin, top: "35%", left: "2%", w: 240 },
            { name: "Lewis", role: "PR Manager", img: teamLewis, top: "38%", left: "58%", w: 340 },
            { name: "Rachel", role: "Designer", img: teamRachel, top: "52%", left: "15%", w: 300 },
            { name: "Suki", role: "Managing Partner", img: teamSuki, top: "55%", left: "52%", w: 380 },
            { name: "Hyukjae", role: "BD Manager", img: teamHyukjae, top: "70%", left: "22%", w: 340 },
            { name: "Helen", role: "Community Moderator", img: teamDavid, top: "75%", left: "60%", w: 280 },
          ].map(m => (
            <div key={m.name} className="tm-card" style={{ top: m.top, left: m.left, width: m.w }}>
              <div className="tm-info"><h4>{m.name}</h4><span>{m.role}</span></div>
              <div className="tm-photo"><img src={m.img} alt={m.name} loading="lazy" /></div>
            </div>
          ))}
        </div>
      </section>

      {/* REGIONS */}
      <section className="regions-sec">
        <div className="wrap">
          <div className="lbl">Coverage</div>
          <div className="reg-split">
            <div className="reg-l"><h2>Korea-first. <strong>Asia-wide.</strong></h2><p>Korea is our home market. From Seoul, we extend coverage across key Asian crypto markets through local partner networks.</p></div>
            <div className="reg-list">
              {[
                { flag: "🇰🇷", name: "South Korea", sub: "Home Market — Upbit, Bithumb, Naver, Kakao, DC Inside, Korean CT" },
                { flag: "🇸🇬", name: "Singapore", sub: "HQ — Institutional BD, conference circuit, regulatory bridge" },
                { flag: "🇻🇳", name: "Vietnam", sub: "Partner network — builder community, high retail adoption" },
                { flag: "🇯🇵", name: "Japan", sub: "Partner network — regulated entry, LINE ecosystem" },
                { flag: "🇹🇭", name: "Thailand", sub: "Partner network — Bitkub ecosystem, Thai CT" },
              ].map(r => (
                <div key={r.name} className="rg">
                  <div className="rg-f">{r.flag}</div>
                  <div><div className="rg-n">{r.name}</div><div className="rg-s">{r.sub}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUOTES */}
      {/* TRANSITION: light → dark */}
      <div style={{ height: "20vh", background: `linear-gradient(180deg, var(--bg) 0%, var(--black) 100%)` }} />

      <section className="quotes-sec">
        <div className="wrap">
          <div className="lbl" style={{ color: "var(--g2)" }}>Testimonials</div>
          <div className="quotes-grid">
            <div className="q-card"><blockquote>"ium Labs didn't just translate our deck into Korean — they rebuilt our entire market entry strategy from scratch. The KOL network, the Naver presence, the community culture — it all felt native because it was."</blockquote><cite>Head of BD — BNB Chain Ecosystem Partner</cite></div>
            <div className="q-card"><blockquote>"Most agencies give you a KOL list and disappear. ium Labs managed every placement, tracked every metric, and iterated weekly. They operated like an internal team."</blockquote><cite>Growth Lead — AI Protocol (Confidential)</cite></div>
          </div>
        </div>
      </section>

      {/* INVITATION */}
      <section className="invite" id="contact">
        <div className="invite-inner">
          <div>
            <h2>If you're building for Korea,<br />we're here to <strong>make it happen.</strong></h2>
            <div className="invite-kr">한국 시장을 여는 가장 확실한 방법</div>
          </div>
          <div className="invite-right">
            <CalendlyButton className="invite-cta">Book a Korea Strategy Call →</CalendlyButton>
            <div className="invite-offices"><span>KR</span><span>SG</span></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ft-ed">
        <div className="ft-inner">
          <div className="ft-cp">© 2026 ium labs — Seoul</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="ft-clock" ref={clockRef} />
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <a href={brand.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href={brand.telegramLink} target="_blank" rel="noopener noreferrer">Telegram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GTMService;
