import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import { brand } from "@/config/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/services/seo-ads.webp";
import "./ServiceDetail.css";
gsap.registerPlugin(ScrollTrigger);

const SEOAdsService = () => {
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
      <SEOHead title="Korea SEO & Paid Ads | ium Labs" description="Naver SEO, Google Ads, crypto ad networks for Korean market." path="/services/seo-ads" keywords={["Korea Naver SEO","Crypto Ads Korea"]} />
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <img src={heroImg} alt="" className="hero-bg" /><div className="hero-overlay" />
        <div className="hero-grid" /><div className="hero-orb" />
        <div className="hero-num">07</div>
        <div className="wrap">
          <Link to="/services/gtm" className="hero-back">All Services</Link>
          <div className="hero-label">Service 07 of 08</div>
          <h1>SEO & <strong>Paid Ads</strong></h1>
          <p className="hero-desc">Naver SEO, Google Ads, X Ads, crypto ad networks. We know which platforms ban crypto and how to get certified for the ones that don't. Be found where Korea searches.</p>
        </div>
      </section>

      {/* STATS */}
      <section className="stats"><div className="wrap"><div className="stats-grid">
        <div className="stat"><div className="stat-val">287%</div><div className="stat-sub">Traffic Growth</div></div>
        <div className="stat"><div className="stat-val">19</div><div className="stat-sub">Campaigns</div></div>
        <div className="stat"><div className="stat-val">3.4x</div><div className="stat-sub">ROAS</div></div>
        <div className="stat"><div className="stat-val">42%</div><div className="stat-sub">Lower CPA</div></div>
      </div></div></section>

      {/* PROBLEM */}
      <section className="problem"><div className="wrap">
        <div className="lbl">The Problem</div>
        <div className="problem-grid">
          <div className="problem-left"><h2>Korea doesn't Google. <strong>Korea Navers.</strong></h2></div>
          <div className="problem-right">
            <p>70% of Korean search traffic goes through Naver, and its algorithm rewards completely different content than Google. Naver Blog posts outrank traditional web pages. Naver Smart Blocks dominate the SERP. If you optimize for Google only, you're invisible to Korean users.</p>
            <p>Add crypto ad bans on most platforms, and the challenge compounds. Google requires a special crypto advertiser certification. Most ad networks reject crypto campaigns outright. You need someone who knows which networks accept crypto, how to navigate the certification process, and how to structure campaigns that actually convert Korean audiences.</p>
            <div className="highlight-box"><p>한국에서는 네이버가 곧 검색입니다. ium Labs는 네이버 SEO, 구글 암호화폐 광고 인증, 크립토 전문 광고 네트워크를 모두 운영합니다.</p></div>
          </div>
        </div>
      </div></section>

      {/* CAPABILITIES */}
      <section className="capabilities"><div className="wrap">
        <div className="lbl">What We Do</div>
        {[
          { icon: "◎", title: "Naver SEO", desc: "Blog content strategy, keyword research, and Naver-specific optimization. Naver's algorithm is completely different from Google — different ranking factors, different content formats, different link structures." },
          { icon: "◉", title: "Google Ads (Crypto Certified)", desc: "We handle Google's crypto advertiser certification process end-to-end. Most agencies can't even get approved. We run search, display, and YouTube campaigns for crypto projects." },
          { icon: "◈", title: "X Ads", desc: "Promoted posts, follower campaigns, and engagement campaigns targeting Korean crypto Twitter. We A/B test creatives and optimize for cost-per-engagement across Korean CT audiences." },
          { icon: "◆", title: "Crypto Ad Networks", desc: "Coinzilla, Bitmedia, and crypto-native ad networks that actually accept crypto campaigns. We know which ones convert for Korean audiences and which are wasted spend." },
          { icon: "◇", title: "A/B Testing", desc: "Systematic creative and landing page testing across all channels. We test headlines, visuals, CTAs, and audience segments to continuously improve campaign performance." },
          { icon: "◐", title: "Performance Analytics", desc: "Weekly reporting with full attribution. Every dollar tracked from impression to click to conversion. Campaign-level and channel-level ROAS with actionable optimization recommendations." },
        ].map((cap, i) => (
          <div key={i} className={`cap-block${openCap === i ? " open" : ""}`}>
            <div className="cap-head" onClick={() => toggleCap(i)}>
              <div className="cap-icon">{cap.icon}</div>
              <div className="cap-title">{cap.title}</div>
              <div className="cap-toggle">+</div>
            </div>
            <div className="cap-body"><div className="cap-inner"><div /><div className="cap-desc">{cap.desc}</div></div></div>
          </div>
        ))}
      </div></section>

      {/* PROCESS */}
      <section className="svc-process"><div className="wrap">
        <div className="lbl">How It Works</div>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(1.8rem,3vw,2.5rem)", letterSpacing: "-.02em" }}>From audit to <strong>first-page rankings.</strong></h2>
        <div className="proc-grid">
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase 1</div><div className="proc-title">Audit</div><div className="proc-text">Full audit of current search presence, ad accounts, and competitor positioning across Naver and Google.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase 2</div><div className="proc-title">Strategy</div><div className="proc-text">Keyword mapping, channel selection, budget allocation, creative direction. Crypto certification if needed.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase 3</div><div className="proc-title">Execute</div><div className="proc-text">Launch campaigns across approved channels. Naver Blog content, paid ads, A/B tests all running in parallel.</div></div>
          <div className="proc-step"><div className="proc-dot" /><div className="proc-ph">Phase 4</div><div className="proc-title">Optimize</div><div className="proc-text">Weekly performance review. Pause underperformers, scale winners, test new creatives. Continuous improvement loop.</div></div>
        </div>
      </div></section>

      {/* CHANNELS */}
      <section className="platforms"><div className="wrap">
        <div className="lbl" style={{ color: "var(--g2)" }}>Channels</div>
        <div className="plat-grid">
          <div className="plat"><div className="plat-name">Naver</div><div className="plat-desc">Korea's dominant search engine. Blog SEO, Smart Blocks, and Naver Ads for maximum Korean visibility.</div><div className="plat-stat">70% of Korean search</div></div>
          <div className="plat"><div className="plat-name">Google</div><div className="plat-desc">Search, Display, and YouTube campaigns. Crypto advertiser certification handled by our team.</div><div className="plat-stat">Crypto certified</div></div>
          <div className="plat"><div className="plat-name">X / Twitter</div><div className="plat-desc">Promoted posts and follower campaigns targeting Korean crypto Twitter. Real-time engagement optimization.</div><div className="plat-stat">Korean CT targeting</div></div>
          <div className="plat"><div className="plat-name">Crypto Networks</div><div className="plat-desc">Coinzilla, Bitmedia, and crypto-native networks. Direct placements on Korean crypto media sites.</div><div className="plat-stat">Crypto-native reach</div></div>
        </div>
      </div></section>

      {/* FAQ */}
      <section className="faq"><div className="wrap">
        <div className="lbl">FAQ</div>
        {[
          { q: "How long does Naver SEO take to show results?", a: "Naver Blog SEO can show first-page rankings within 4-6 weeks for targeted keywords. Sustained first-page dominance typically takes 2-3 months of consistent content production." },
          { q: "Can you get Google Ads approved for crypto projects?", a: "Yes. We handle the full Google crypto advertiser certification process. Approval typically takes 2-3 weeks. We've never had a certification rejected." },
          { q: "What's the minimum ad budget you recommend?", a: "For Naver SEO content, $3K-5K/month. For paid ads across Google and crypto networks, we recommend a minimum of $5K/month ad spend to generate statistically meaningful data for optimization." },
          { q: "Do you handle creative production for ads?", a: "Yes. We produce all ad creatives, landing pages, and Naver Blog content in-house. Everything is produced in Korean by native speakers and optimized for each platform's specifications." },
        ].map((faq, i) => (
          <div key={i} className={`faq-item${openFaq === i ? " open" : ""}`}>
            <div className="faq-q" onClick={() => toggleFaq(i)}><h4>{faq.q}</h4><span className="fq-t">+</span></div>
            <div className="faq-a"><p>{faq.a}</p></div>
          </div>
        ))}
      </div></section>

      {/* INVITE */}
      <section className="invite" id="contact"><div className="invite-inner">
        <div><h2>Ready to dominate <strong>Korean search?</strong></h2><div className="invite-kr">네이버에서 1페이지를 차지합니다.</div></div>
        <div className="invite-right"><Link to="/contact" className="invite-cta">Book an SEO Strategy Call →</Link></div>
      </div></section>
      <footer className="ft-ed"><div className="ft-inner"><div>© 2026 ium labs — Seoul</div><div style={{ display: "flex", alignItems: "center" }}><span ref={clockRef} style={{ marginRight: 12 }} /><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><a href={brand.telegramLink} target="_blank" rel="noopener noreferrer">Telegram</a></div></div></footer>
    </div>
  );
};
export default SEOAdsService;
