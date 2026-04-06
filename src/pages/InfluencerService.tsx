import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import { brand } from "@/config/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import kolHeroImage from "@/assets/services/kol-network.jpg";
import bnbImg from "@/assets/campaigns/bnb-hanok-event.png";
import kucoinImg from "@/assets/campaigns/kucoin-party-event.png";
import peaqImg from "@/assets/campaigns/peaq-booth-event.png";
import mantraImg from "@/assets/campaigns/mantra-party.jpg";
import saharaImg from "@/assets/campaigns/sahara-ai-event.png";
import polygonImg from "@/assets/campaigns/polygon-connect.png";
import "./GTMService.css";

gsap.registerPlugin(ScrollTrigger);

const clients = ["BNB Chain","Sahara AI","PEAQ Network","Bybit","KuCoin","Polygon","Mantra","Ondo Finance","FOGO","Aptos","Kite","SynFutures"];

const kolCapabilities = [
  { num: "01", title: "KOL Discovery & Vetting", desc: "Audience-fit scoring, engagement fraud filtering, niche mapping across YouTube, X, Telegram, and Naver. We find the voices your community already trusts." },
  { num: "02", title: "Campaign Strategy & Briefing", desc: "Narrative development, content calendars, posting cadences, and cross-platform sequencing — all localized for the Korean crypto audience." },
  { num: "03", title: "Outreach & Negotiation", desc: "Rate negotiation, contract management, and deliverable alignment. We manage every DM thread so you don't have to." },
  { num: "04", title: "Content Activation", desc: "Multi-platform launch across X threads, YouTube deep-dives, Telegram alpha calls, and Naver blog posts — orchestrated for maximum overlap." },
  { num: "05", title: "Performance Analytics", desc: "Real-time tracking of reach, engagement quality, sentiment, and conversion. We separate signal from vanity metrics." },
  { num: "06", title: "Scaling & Rotation", desc: "Double down on top performers, rotate underperformers, expand to micro-KOLs for grassroots saturation. Continuous optimization every cycle." },
];

const workCards = [
  { img: bnbImg, cat: "BNB Chain — KOL Activation", metric: "5 KOLs", title: "S-tier Korean KOL blitz", desc: "Full-scale Korean market campaign with top-tier KOL placements across YouTube and X, driving 420% trading volume surge.", tags: ["Korea","KOL","YouTube"], slug: "bnb-chain" },
  { img: saharaImg, cat: "Sahara AI — Narrative Seeding", metric: "4.2M", title: "Korean CT impressions, 6 weeks", desc: "AI x Crypto narrative positioning for Korean retail. KOL threads, AMA series, Kakao and Telegram activation.", tags: ["AI","Narrative","CT"], slug: "sahara-ai" },
  { img: peaqImg, cat: "PEAQ Network — DePIN Education", metric: "7 Weeks", title: "5 S-tier KOL multi-touch campaign", desc: "$35K campaign: DePIN narrative education, weekly KOL thread drops, Korean community AMA series.", tags: ["DePIN","KOL","Campaign"], slug: "peaq" },
  { img: kucoinImg, cat: "KuCoin — User Acquisition", metric: "35K", title: "New Korean users acquired", desc: "Community airdrop, KOL campaigns, and Naver SEO driving sustained user acquisition.", tags: ["Exchange","Community","SEO"], slug: "kucoin" },
  { img: mantraImg, cat: "MANTRA — Institutional Entry", metric: "$50M+", title: "Institutional pipeline sourced", desc: "Korean investor dinners, KOL introductions, and thought leadership content driving institutional interest.", tags: ["RWA","Institutional","BD"], slug: "mantra" },
  { img: polygonImg, cat: "Polygon — Ecosystem Growth", metric: "280%", title: "TVL growth in Korean DeFi", desc: "Polygon Connect Seoul and sustained KOL partnerships driving ecosystem adoption.", tags: ["L2","DeFi","Events"], slug: "polygon" },
];

const InfluencerService = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const workPinRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gtm-ed .hero-tag", { y: 30, opacity: 0, duration: 1, delay: .2, ease: "power3.out" });
      gsap.from(".gtm-ed .hero-ed h1", { y: 60, opacity: 0, duration: 1.2, delay: .4, ease: "power3.out" });
      gsap.from(".gtm-ed .hero-foot p", { y: 30, opacity: 0, duration: 1, delay: .7, ease: "power3.out" });

      gsap.utils.toArray<HTMLElement>(".gtm-ed .lbl,.gtm-ed .wk-item,.gtm-ed .manifesto p,.gtm-ed .pill,.gtm-ed .q-card,.gtm-ed .invite h2,.gtm-ed .invite-kr,.gtm-ed .appr-l,.gtm-ed .pull-q,.gtm-ed .svc-cap-row").forEach(el => {
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
      <SEOHead title="Korean Crypto KOL & Influencer Marketing | ium Labs" description="170+ vetted Korean crypto KOLs with 22.5M+ combined reach. YouTube, X, Telegram, Naver — managed campaigns with fraud filtering and ROI tracking." path="/services/influencer" keywords={["Korean KOL Marketing","Crypto Influencer Korea","Web3 KOL Network"]} />
      <Navbar />

      {/* HERO */}
      <section className="hero-ed">
        <img src={kolHeroImage} alt="" className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-grid" />
        <div className="hero-orb" />
        <div className="hero-kr">인플</div>
        <div className="hero-kr">루언</div>
        <div className="hero-kr">서</div>
        <div className="hero-wm">ium</div>
        <div className="hero-tag">Korean KOL & Influencer Marketing — Seoul</div>
        <h1>Your protocol's voice in <em>Korea's</em> most <strong>influential circles.</strong></h1>
        <div className="hero-foot">
          <p>170+ vetted Korean crypto KOLs. YouTube, X, Telegram, Naver. Managed campaigns with fraud filtering and ROI tracking — not just shilling.</p>
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

      {/* WHY — KOL STATS */}
      <section className="why-kr">
        <div className="wrap">
          <div className="lbl" style={{ color: "var(--g2)" }}>Why KOL Marketing</div>
          <div className="wk-grid">
            <div className="wk-item"><div className="wk-big">170+</div><div className="wk-sub">Vetted KOLs</div><div className="wk-note">S, A, and B-tier Korean crypto influencers across YouTube, X, Telegram, and Naver.</div></div>
            <div className="wk-item"><div className="wk-big">22.5M</div><div className="wk-sub">Combined Reach</div><div className="wk-note">Aggregate audience across all KOL channels. Real followers, fraud-filtered.</div></div>
            <div className="wk-item"><div className="wk-big">36</div><div className="wk-sub">Campaigns Executed</div><div className="wk-note">Multi-platform KOL campaigns managed end-to-end for protocols entering Korea.</div></div>
            <div className="wk-item"><div className="wk-big">4.7%</div><div className="wk-sub">Avg. Engagement</div><div className="wk-note">Industry average is 1.2%. Our KOL network consistently outperforms by 4x.</div></div>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="wrap">
          <p>Most KOL campaigns fail in Korea because they hire global, not local. English-speaking crypto influencers don't move the Korean market. Korean retail lives on Naver, KakaoTalk, and local Telegram alpha channels. They trust Korean YouTubers, not global CT personalities. Without <strong>native KOLs</strong> who speak the language and live the ecosystem, your campaign is noise — <strong>expensive noise that never converts.</strong></p>
        </div>
      </section>

      {/* SERVICE DESCRIPTION & CAPABILITIES */}
      <section className="svc-sec" id="capabilities">
        <div className="wrap">
          <div className="lbl">End-to-End KOL Management</div>
          <div style={{ maxWidth: 720, marginBottom: "4rem" }}>
            <p style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(1.3rem, 2vw, 1.8rem)", lineHeight: 1.6, color: "var(--char)" }}>
              We don't hand you a spreadsheet of names. We run the entire KOL pipeline — discovery, vetting, outreach, content approval, activation, and performance tracking. Every placement is audience-verified and fraud-filtered.
            </p>
          </div>
          {kolCapabilities.map((cap) => (
            <div key={cap.num} className="svc-cap-row" style={{ display: "grid", gridTemplateColumns: "80px 240px 1fr", gap: "2rem", alignItems: "baseline", padding: "2rem 0", borderTop: "1px solid var(--g4)" }}>
              <span style={{ fontFamily: "var(--serif)", fontSize: "2.5rem", fontWeight: 300, color: "var(--g4)", lineHeight: 1 }}>{cap.num}</span>
              <h4 style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: "1.15rem", letterSpacing: "-.01em" }}>{cap.title}</h4>
              <p style={{ fontSize: ".84rem", color: "var(--g1)", lineHeight: 1.7, fontWeight: 300 }}>{cap.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HORIZONTAL WORK */}
      <section className="work-sec" id="work">
        <div className="work-pin" ref={workPinRef}>
          <div className="work-intro">
            <div className="lbl">Selected Work</div>
            <h2>KOL campaigns that <strong>moved Korea.</strong></h2>
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

      {/* TRANSITION: dark to light */}
      <div className="fade-dark-to-light" />

      {/* APPROACH */}
      <section className="approach-ed" id="approach">
        <div className="wrap">
          <div className="lbl">Approach</div>
          <div className="appr-grid">
            <div className="appr-l">
              <h2>Not a KOL list. <strong>A managed pipeline.</strong></h2>
              <p>Every campaign is run by operators who've managed KOL relationships at exchanges and protocols. We embed senior operators into your team and treat every placement like our own reputation is on the line.</p>
              <div className="pull-q">"한국 KOL은 신뢰로 움직입니다. 우리는 그 신뢰를 직접 쌓아왔습니다."</div>
            </div>
            <div className="pillars">
              <div className="pill"><div className="pill-n">I</div><h4>170+ vetted, not 500 random</h4><p>Every KOL in our network has been verified for engagement authenticity, audience quality, and content relevance. We filter out bots and pay-to-play influencers before they touch your brand.</p></div>
              <div className="pill"><div className="pill-n">II</div><h4>Native Korean operators</h4><p>Our team negotiates in Korean, understands local rate norms, and manages KOLs who dominate Naver, KakaoTalk, and Korean Telegram — not just global CT.</p></div>
              <div className="pill"><div className="pill-n">III</div><h4>Fraud filtering built in</h4><p>We run engagement audits on every KOL before activation. Fake followers, bot comments, inflated impressions — we catch them so your budget goes to real reach.</p></div>
              <div className="pill"><div className="pill-n">IV</div><h4>ROI, not vanity metrics</h4><p>We track on-chain conversions, community joins, and sentiment shifts — not just impressions. Every campaign report ties spend to measurable outcomes.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTES */}
      <div style={{ height: "20vh", background: "linear-gradient(180deg, var(--bg) 0%, var(--black) 100%)" }} />

      <section className="quotes-sec">
        <div className="wrap">
          <div className="lbl" style={{ color: "var(--g2)" }}>Testimonials</div>
          <div className="quotes-grid">
            <div className="q-card"><blockquote>"Most agencies give you a KOL list and disappear. ium Labs managed every placement, tracked every metric, and iterated weekly. They operated like an internal team."</blockquote><cite>Growth Lead — AI Protocol (Confidential)</cite></div>
            <div className="q-card"><blockquote>"The KOL network ium Labs activated for us wasn't just big — it was precise. Every influencer matched our narrative, and the engagement was real. We saw on-chain conversions within the first week."</blockquote><cite>Head of Marketing — DePIN Protocol</cite></div>
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
            <CalendlyButton className="invite-cta">Book a KOL Strategy Call →</CalendlyButton>
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

export default InfluencerService;
