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
import "./GTMService.css";

gsap.registerPlugin(ScrollTrigger);

const clients = ["BNB Chain","Sahara AI","PEAQ Network","Bybit","KuCoin","Polygon","Mantra","Ondo Finance","FOGO","Aptos","Kite","SynFutures"];

const services = [
  { num: "01", title: "Korean Market Activation", tagline: "Native-level market entry for the world's most concentrated retail crypto market. We don't translate your strategy, we rebuild it for Korea.",
    desc: "Korea's crypto market operates on its own platforms, in its own language, with its own culture. Naver Blog SEO replaces Google. KakaoTalk Open Chat replaces Telegram. DC Inside replaces Reddit. Korean CT has its own opinion leaders, narratives, and velocity. We own these channels because we operate them daily.",
    caps: ["Naver Blog SEO & Content Strategy","KakaoTalk Open Chat Management","DC Inside Community Operations","Korean Crypto Twitter Presence","Korean Media & Press Relations","Localized Landing Pages & Assets"] },
  { num: "02", title: "KOL & Creator Operations", tagline: "Direct relationships with Korea's top crypto KOLs. No middlemen, no broker networks. Every placement is audience-verified and performance-tracked.",
    desc: "170+ KOL network across Korea. S-tier thread writers, YouTube reviewers, Twitter Spaces hosts, AMA moderators. Every KOL is audience-verified with real engagement data. Full lifecycle management: briefing, content approval, scheduling, performance tracking, iteration.",
    caps: ["S / A / B-Tier KOL Campaigns","Thread & Long-form Content","YouTube Review Placements","Twitter Spaces & AMA Hosting","Audience Verification & Fraud Filtering","Performance Analytics & Reporting"] },
  { num: "03", title: "Community & Campaign Execution", tagline: "Full-cycle campaign design from pre-TGE narrative to post-launch retention. Multi-channel, multi-touch, all localized for Korea.",
    desc: "24/7 Korean community managers across Telegram, Discord, KakaoTalk. End-to-end campaigns: pre-TGE hype building, airdrop design, quest campaigns via Galxe and Zealy, KOL thread sequences, community event programming. We stay through post-launch to optimize retention.",
    caps: ["Telegram & Discord (Korean Mods)","KakaoTalk Open Chat","Pre-TGE Narrative & Hype Building","Quest Campaigns (Galxe / Zealy)","Airdrop Design & Distribution","Post-Launch Retention Mechanics"] },
  { num: "04", title: "PR, Research & Compliance", tagline: "Korean media coverage, deep market research, and regulatory navigation. The complete intelligence and credibility layer.",
    desc: "CoinDesk Korea, Block Media, TokenPost, mainstream outlets. On-chain wallet profiling, competitor share-of-voice analysis. VASP registration guidance, PIPA compliance, exchange listing documentation. In partnership with Law Office Asset and Freeman Law.",
    caps: ["Korean Press & Media Relations","Deep Market Research Reports","On-chain Analytics & Intelligence","VASP & PIPA Compliance","Exchange Listing Documentation","Naver SEO & Paid Ads"] },
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

      gsap.utils.toArray<HTMLElement>(".gtm-ed .lbl,.gtm-ed .wk-item,.gtm-ed .manifesto p,.gtm-ed .pill,.gtm-ed .rg,.gtm-ed .q-card,.gtm-ed .invite h2,.gtm-ed .invite-kr,.gtm-ed .appr-l,.gtm-ed .reg-l,.gtm-ed .team-card,.gtm-ed .pull-q,.gtm-ed .svc-block").forEach(el => {
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
            <div className="wk-item"><div className="wk-big">2</div><div className="wk-sub">Dominant Exchanges</div><div className="wk-note">Upbit and Bithumb. Listing on either can 10x Korean awareness overnight.</div></div>
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
                  <div className="svc-toggle"><span className="svc-tog-i">+</span> Explore</div>
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

      {/* TEAM */}
      <section className="team-sec">
        <div className="wrap">
          <div className="lbl">Team</div>
          <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(2rem,3.5vw,2.8rem)", letterSpacing: "-.02em" }}>Operators, not <strong>account managers.</strong></h2>
          <div className="team-grid">
            <div className="team-card"><div className="t-init">J</div><h4>J. Lee</h4><div className="t-role">CMO / Founder</div><p>Ex-KuCoin Korea BD Lead. Ex-Outlier Ventures. Ex-Camelot DEX APAC BD. Deep roots in Korean crypto ecosystem.</p></div>
            <div className="team-card"><div className="t-init">KR</div><h4>Korea KOL Network</h4><div className="t-role">170+ Verified KOLs</div><p>Direct relationships with S/A/B-tier Korean crypto influencers. All performance-tracked.</p></div>
            <div className="team-card"><div className="t-init">SG</div><h4>Singapore Hub</h4><div className="t-role">Operations & BD</div><p>Singapore-based ops for institutional BD, conference circuit, and regulatory bridge.</p></div>
          </div>
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
