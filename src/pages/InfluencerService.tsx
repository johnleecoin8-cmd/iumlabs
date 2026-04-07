import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import { brand } from "@/config/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import peaqImg from "@/assets/campaigns/peaq-booth-event.png";
import heroImg from "@/assets/services/kol-network.jpg";
import ytImg from "@/assets/platforms/kol-youtube.jpg";
import ctImg from "@/assets/platforms/kol-twitter.jpg";
import tgImg from "@/assets/platforms/kol-telegram.jpg";
import naverImg from "@/assets/platforms/kol-naver.jpg";
import "./ServiceDetail.css";
gsap.registerPlugin(ScrollTrigger);

const InfluencerService = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const [openCap, setOpenCap] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleCap = useCallback((i: number) => setOpenCap(p => p === i ? null : i), []);
  const toggleFaq = useCallback((i: number) => setOpenFaq(p => p === i ? null : i), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".svc-detail .hero-back", { opacity: 0, x: -20, duration: .8, delay: .3 });
      gsap.from(".svc-detail .hero-label", { opacity: 0, y: 20, duration: .8, delay: .4 });
      gsap.from(".svc-detail .hero h1", { opacity: 0, y: 40, duration: 1, delay: .5, ease: "power3.out" });
      gsap.from(".svc-detail .hero-desc", { opacity: 0, y: 30, duration: 1, delay: .9 });
      gsap.utils.toArray<HTMLElement>(".svc-detail .lbl,.svc-detail .stat,.svc-detail .problem-left,.svc-detail .problem-right,.svc-detail .cap-block,.svc-detail .proc-step,.svc-detail .tier-card,.svc-detail .plat,.svc-detail .case-split,.svc-detail .faq-item,.svc-detail .invite h2,.svc-detail .invite-kr,.svc-detail .highlight-box").forEach(el => {
        gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" }});
      });
    }, containerRef);
    const tick = () => { if (clockRef.current) clockRef.current.textContent = `Seoul ${new Date().toLocaleString("en-US",{timeZone:"Asia/Seoul",hour:"2-digit",minute:"2-digit",hour12:false})}`; };
    tick(); const ci = setInterval(tick, 60000);
    return () => { ctx.revert(); clearInterval(ci); };
  }, []);

  return (
    <div className="svc-detail" ref={containerRef}>
      <SEOHead title="Korea KOL & Influencer Marketing | ium Labs" description="170+ vetted Korean KOLs. Managed campaigns with fraud filtering and ROI tracking." path="/services/influencer" keywords={["Korea KOL Marketing","Korean Crypto Influencer"]} />
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <img src={heroImg} alt="" className="hero-bg" /><div className="hero-overlay" />
        <div className="hero-grid" /><div className="hero-orb" />
        <div className="hero-num">02</div>
        <div className="wrap">
          <Link to="/services/gtm" className="hero-back">All Services</Link>
          <div className="hero-label">Service 02 of 08</div>
          <h1>KOL & <strong>Influencer</strong></h1>
          <p className="hero-desc">170+ vetted Korean KOLs. YouTube, X, Telegram, Naver. Managed campaigns with fraud filtering and ROI tracking. We don't just connect you with influencers — we run the entire operation.</p>
        </div>
      </section>

      {/* STATS */}
      <section className="stats"><div className="wrap"><div className="stats-grid">
        <div className="stat"><div className="stat-val">170+</div><div className="stat-sub">Vetted Korean KOLs</div></div>
        <div className="stat"><div className="stat-val">4</div><div className="stat-sub">Platforms Covered</div></div>
        <div className="stat"><div className="stat-val">0%</div><div className="stat-sub">Fake Follower Tolerance</div></div>
        <div className="stat"><div className="stat-val">Weekly</div><div className="stat-sub">Performance Reports</div></div>
      </div></div></section>

      {/* PROBLEM */}
      <section className="problem"><div className="wrap">
        <div className="lbl">The Problem</div>
        <div className="problem-grid">
          <div className="problem-left"><h2>Korean KOL marketing is <strong>broken by default.</strong></h2></div>
          <div className="problem-right">
            <p>Most agencies hand you a KOL list and disappear. The list is full of inflated follower counts, recycled audiences, and influencers who post once and forget your project exists.</p>
            <p>Korea makes this worse. The KOL landscape is fragmented across YouTube, X, Telegram, and Naver Blog — each with its own culture, audience behavior, and pricing norms. A KOL who's S-tier on Korean CT might have zero presence on Naver.</p>
            <div className="highlight-box"><p>ium Labs는 한국 KOL 시장에서 직접 운영하는 팀입니다. 중개인 없이, 브로커 네트워크 없이 — KOL과 직접 관계를 맺고, 모든 캠페인을 직접 관리합니다.</p></div>
          </div>
        </div>
      </div></section>

      {/* CAPABILITIES */}
      <section className="capabilities"><div className="wrap">
        <div className="lbl">What We Do</div>
        {[
          { icon: "◎", title: "KOL Sourcing & Vetting", desc: "We identify the right KOLs for your narrative, token stage, and target audience. Every KOL is verified with real engagement data — follower analysis, historical performance, and fraud screening.", img: ytImg },
          { icon: "◉", title: "Campaign Design & Briefing", desc: "Custom briefs per KOL tailored to their style and audience. We align messaging with your GTM narrative. No copy-paste — every placement feels native.", img: ctImg },
          { icon: "◈", title: "Content Approval & QC", desc: "Every piece of content goes through our approval workflow. Draft → review → revision → approval → publish. No content goes live without our sign-off and yours.", img: tgImg },
          { icon: "◆", title: "Scheduling & Orchestration", desc: "We sequence KOL drops for maximum narrative velocity. First-mover threads set the frame, mid-campaign placements deepen coverage, closing posts drive urgency.", img: naverImg },
          { icon: "◇", title: "Performance Tracking", desc: "Weekly reports with impressions, engagements, click-throughs. We compare KOL-by-KOL performance and rotate underperformers mid-campaign.", img: ytImg },
          { icon: "◐", title: "Fraud Filtering", desc: "Engagement authenticity checks before onboarding any KOL. Suspicious growth, bot patterns, geography mismatches — all flagged. Our fraud rate is under 2%.", img: ctImg },
        ].map((cap, i) => (
          <div key={i} className={`cap-block${openCap === i ? " open" : ""}`}>
            <div className="cap-head" onClick={() => toggleCap(i)}>
              <div className="cap-icon">{cap.icon}</div>
              <div className="cap-title">{cap.title}</div>
              <div className="cap-toggle">+</div>
            </div>
            <div className="cap-body"><div className="cap-inner"><div /><div className="cap-desc">{cap.desc}</div><div className="cap-img"><img src={cap.img} alt={cap.title} /></div></div></div>
          </div>
        ))}
      </div></section>

      {/* PROCESS */}
      <section className="svc-process"><div className="wrap">
        <div className="lbl">How It Works</div>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.5rem)", letterSpacing: "-.02em" }}>From brief to <strong>live campaign in 10 days.</strong></h2>
        <div className="proc-grid">
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Day 1–3</div><div className="proc-title">KOL Selection</div><div className="proc-text">Analyze your protocol, shortlist 10-20 KOLs with verified data. You approve the final roster.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Day 3–5</div><div className="proc-title">Brief & Negotiate</div><div className="proc-text">Custom briefs per KOL. Rate negotiation. Content format alignment. Contract locked.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Day 5–8</div><div className="proc-title">Content & QC</div><div className="proc-text">KOLs draft. We review, revise, verify. You approve. Scheduling confirmed.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Day 8–10+</div><div className="proc-title">Launch & Track</div><div className="proc-text">Multi-platform launch. Real-time monitoring. Weekly reports. Mid-campaign optimization.</div></div>
        </div>
      </div></section>

      {/* TIERS */}
      <section className="tiers"><div className="wrap">
        <div className="lbl">KOL Tiers</div>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.5rem)", letterSpacing: "-.02em" }}>The right tier for <strong>the right objective.</strong></h2>
        <div className="tier-grid">
          <div className="tier-card"><div className="tier-badge">S</div><h4>S-Tier</h4><div className="tier-range">50K+ Followers · Top 20 Korean CT</div><p>Market-moving opinion leaders. A single thread can shift retail sentiment overnight.</p><ul className="tier-list"><li>Narrative authority</li><li>High signal-to-noise</li><li>Premium pricing, max impact</li></ul></div>
          <div className="tier-card"><div className="tier-badge">A</div><h4>A-Tier</h4><div className="tier-range">15K–50K · Niche Authority</div><p>Deep expertise in DeFi, DePIN, AI×Crypto. Highly engaged audiences that trust their analysis.</p><ul className="tier-list"><li>Sector credibility</li><li>High engagement rates</li><li>Strong comment quality</li></ul></div>
          <div className="tier-card"><div className="tier-badge">B</div><h4>B-Tier</h4><div className="tier-range">5K–15K · Volume & Reach</div><p>Emerging voices with authentic growing audiences. Used for volume and broadening awareness.</p><ul className="tier-list"><li>Cost-efficient reach</li><li>Authentic audiences</li><li>Thread relay campaigns</li></ul></div>
        </div>
      </div></section>

      {/* PLATFORMS */}
      <section className="platforms"><div className="wrap">
        <div className="lbl" style={{ color: "var(--g2)" }}>Platforms</div>
        <div className="plat-grid">
          <div className="plat"><div className="plat-img"><img src={ytImg} alt="YouTube" /></div><div className="plat-body"><div className="plat-name">YouTube</div><div className="plat-desc">Long-form reviews and project deep-dives.</div><div className="plat-stat">10–30min reviews</div></div></div>
          <div className="plat"><div className="plat-img"><img src={ctImg} alt="X" /></div><div className="plat-body"><div className="plat-name">X (Korean CT)</div><div className="plat-desc">Thread campaigns, Spaces hosting.</div><div className="plat-stat">Thread + QRT campaigns</div></div></div>
          <div className="plat"><div className="plat-img"><img src={tgImg} alt="Telegram" /></div><div className="plat-body"><div className="plat-name">Telegram</div><div className="plat-desc">Channel placements, group AMAs.</div><div className="plat-stat">Channel + Group</div></div></div>
          <div className="plat"><div className="plat-img"><img src={naverImg} alt="Naver" /></div><div className="plat-body"><div className="plat-name">Naver Blog</div><div className="plat-desc">SEO-optimized posts for Korean search.</div><div className="plat-stat">SEO blog content</div></div></div>
        </div>
      </div></section>

      {/* CASE STUDY */}
      <section className="case"><div className="wrap">
        <div className="lbl">Case Study</div>
        <div className="case-split">
          <div className="case-img"><img src={peaqImg} alt="PEAQ" /></div>
          <div>
            <div className="case-meta">PEAQ Network — "PEAQ Loves Robots" Campaign</div>
            <div className="case-title">7-week multi-touch KOL relay across Korean CT and Naver</div>
            <div className="case-text">$35K campaign: DePIN narrative education, weekly KOL thread drops, Korean community AMA series, Naver Blog SEO push. Each placement sequenced to build compounding awareness.</div>
            <div className="case-results">
              <div className="case-result"><div className="cr-val">40</div><div className="cr-label">KOL Placements</div></div>
              <div className="case-result"><div className="cr-val">7 Wks</div><div className="cr-label">Campaign Duration</div></div>
              <div className="case-result"><div className="cr-val">$35K</div><div className="cr-label">Total Budget</div></div>
              <div className="case-result"><div className="cr-val">4.2M</div><div className="cr-label">Korean CT Impressions</div></div>
            </div>
          </div>
        </div>
      </div></section>

      {/* FAQ */}
      <section className="faq"><div className="wrap">
        <div className="lbl">FAQ</div>
        {[
          { q: "How do you vet KOLs for fake followers?", a: "We analyze follower growth patterns, engagement ratios, comment authenticity, audience geography, and historical performance. Our false-positive rate is under 2%." },
          { q: "What's the minimum budget for a KOL campaign?", a: "A focused B-tier campaign on Korean CT starts at ~$5K. Multi-platform S-tier campaigns run $25K–50K+. We design packages to fit your budget." },
          { q: "Do you handle content creation or just distribution?", a: "Both. We write briefs and talking points, KOLs create in their voice, we review and approve everything before it goes live." },
          { q: "How fast can you launch a campaign?", a: "10 business days standard. For urgent listing-day support, we can accelerate to 5 days with our rapid-deploy roster." },
          { q: "Can you run English-language KOL campaigns?", a: "Our core is Korean-language KOLs. For global campaigns, we partner with trusted agencies and coordinate bilingual execution." },
        ].map((faq, i) => (
          <div key={i} className={`faq-item${openFaq === i ? " open" : ""}`}>
            <div className="faq-q" onClick={() => toggleFaq(i)}><h4>{faq.q}</h4><span className="fq-t">+</span></div>
            <div className="faq-a"><p>{faq.a}</p></div>
          </div>
        ))}
      </div></section>

      {/* INVITE */}
      <section className="invite" id="contact"><div className="invite-inner">
        <div><h2>Ready to activate <strong>Korea's KOL network?</strong></h2><div className="invite-kr">한국 KOL 캠페인, ium Labs가 설계하고 운영합니다.</div></div>
        <div className="invite-right"><Link to="/contact" className="invite-cta">Book a KOL Strategy Call →</Link></div>
      </div></section>
      <footer className="ft-ed"><div className="ft-inner"><div>© 2026 ium labs — Seoul</div><div style={{ display: "flex", alignItems: "center" }}><span ref={clockRef} style={{ marginRight: 12 }} /><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><a href={brand.telegramLink} target="_blank" rel="noopener noreferrer">Telegram</a></div></div></footer>
    </div>
  );
};
export default InfluencerService;
