import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ContactFormSection from "@/components/ContactFormSection";
import FooterLinksSection from "@/components/FooterLinksSection";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/services/seo-naver.jpg";
import capImg1 from "@/assets/platforms/seo-naver.jpg";
import capImg2 from "@/assets/platforms/seo-google.jpg";
import capImg3 from "@/assets/platforms/seo-twitter.jpg";
import capImg4 from "@/assets/platforms/seo-analytics.jpg";
import capImg5 from "@/assets/platforms/seo-testing.jpg";
import capImg6 from "@/assets/platforms/seo-report.jpg";
import "./ServiceDetail.css";
gsap.registerPlugin(ScrollTrigger);

const SEOAdsService = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openCap, setOpenCap] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleCap = useCallback((i: number) => setOpenCap(p => p === i ? null : i), []);
  const toggleFaq = useCallback((i: number) => setOpenFaq(p => p === i ? null : i), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".svc-detail .hero-label", { opacity: 0, y: 20, duration: .8, delay: .2 });
      gsap.from(".svc-detail .hero h1", { opacity: 0, y: 50, duration: 1.2, delay: .3, ease: "power3.out" });
      gsap.from(".svc-detail .hero-desc", { opacity: 0, y: 30, duration: 1, delay: .7 });
      gsap.from(".svc-detail .hero-stats-bar .stat", { opacity: 0, y: 20, duration: .8, delay: .9, stagger: .1 });
      gsap.utils.toArray<HTMLElement>(".svc-detail .lbl,.svc-detail .stat,.svc-detail .problem-left,.svc-detail .problem-right,.svc-detail .cap-block,.svc-detail .proc-step,.svc-detail .tier-card,.svc-detail .plat,.svc-detail .case-split,.svc-detail .faq-item,.svc-detail .invite h2,.svc-detail .invite-kr,.svc-detail .highlight-box").forEach(el => {
        gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" }});
      });
    }, containerRef);
    return () => { ctx.revert(); };
  }, []);

  return (
    <div className="svc-detail" ref={containerRef}>
      <SEOHead title="Korea Crypto SEO & Targeted Paid Ads | ium Labs" description="Maximize search visibility via Naver SEO, targeted Google Ads, and specialized crypto ad networks tailored for the Korean Web3 market." path="/services/seo-ads" image={heroImg} keywords={["Korea Naver SEO","Crypto Ads Korea"]} />
      <ServiceSchema name="Korea SEO & Paid Ads" description="Naver SEO, Google Ads, crypto ad networks for Korean market." url="/services/seo-ads" serviceType={["SEO", "Paid Advertising", "Search Engine Marketing"]} />
      <BreadcrumbSchema items={[{ name: "ium Labs", url: "https://iumlabs.io/" }, { name: "Services", url: "https://iumlabs.io/services/gtm" }, { name: "SEO & Ads", url: "https://iumlabs.io/services/seo-ads" }]} />
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <img src={heroImg} alt="" className="hero-bg" width={1200} height={800} /><div className="hero-overlay" />
        <div className="hero-center">
          <h1>SEO & <strong>Paid Ads</strong></h1>
          <p className="hero-desc">Naver SEO, Google Ads, X Ads, crypto ad networks. We know which platforms ban crypto and how to get certified for the ones that don't. Be found where Korea searches.</p>
        </div>
        <div className="hero-stats-bar">
          <div className="stat"><div className="stat-val">287%</div><div className="stat-sub">Traffic Growth</div></div>
          <div className="stat"><div className="stat-val">19</div><div className="stat-sub">Campaigns</div></div>
          <div className="stat"><div className="stat-val">3.4x</div><div className="stat-sub">ROAS</div></div>
          <div className="stat"><div className="stat-val">42%</div><div className="stat-sub">Lower CPA</div></div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem"><div className="wrap">
        <div className="lbl">The Problem</div>
        <div className="problem-grid">
          <div className="problem-left"><h2>Korea doesn't Google. <strong>Korea Navers.</strong></h2></div>
          <div className="problem-right">
            <p>70% of Korean search traffic goes through Naver, and its algorithm rewards completely different content than Google. Naver Blog posts outrank traditional web pages. Naver Smart Blocks dominate the SERP. If you optimize for Google only, you're invisible to Korean users.</p>
            <p>Add crypto ad bans on most platforms, and the challenge compounds. Google requires a special crypto advertiser certification. Most ad networks reject crypto campaigns outright. You need someone who knows which networks accept crypto, how to navigate the certification process, and how to structure campaigns that actually convert Korean audiences.</p>
          </div>
        </div>
      </div></section>

      {/* CAPABILITIES */}
      <section className="capabilities"><div className="wrap">
        <div className="lbl">What We Do</div>
        {[
          { icon: "◎", img: capImg1, title: "Naver SEO", desc: "Blog content strategy, keyword research, and Naver-specific optimization. Naver's algorithm is completely different from Google — different ranking factors, different content formats, different link structures." },
          { icon: "◉", img: capImg2, title: "Google Ads (Crypto Certified)", desc: "We handle Google's crypto advertiser certification process end-to-end. Most agencies can't even get approved. We run search, display, and YouTube campaigns for crypto projects." },
          { icon: "◈", img: capImg3, title: "X Ads", desc: "Promoted posts, follower campaigns, and engagement campaigns targeting Korean crypto Twitter. We A/B test creatives and optimize for cost-per-engagement across Korean CT audiences." },
          { icon: "◐", img: capImg6, title: "Performance Analytics", desc: "Weekly reporting with full attribution. Every dollar tracked from impression to click to conversion. Campaign-level and channel-level ROAS with actionable optimization recommendations." },
        ].map((cap, i) => (
          <div key={i} className={`cap-block${openCap === i ? " open" : ""}`}>
            <div className="cap-head" role="button" tabIndex={0} onClick={() => toggleCap(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCap(i); } }} aria-expanded={openCap === i}>
              <div className="cap-icon">{cap.icon}</div>
              <div className="cap-title">{cap.title}</div>
              <div className="cap-toggle">+</div>
            </div>
            <div className="cap-body"><div className="cap-inner"><div /><div className="cap-desc">{cap.desc}</div><div className="cap-img"><img src={cap.img} alt={cap.title} width={600} height={400} /></div></div></div>
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
            <div className="faq-q" role="button" tabIndex={0} onClick={() => toggleFaq(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFaq(i); } }} aria-expanded={openFaq === i}><h4>{faq.q}</h4><span className="fq-t">+</span></div>
            <div className="faq-a"><p>{faq.a}</p></div>
          </div>
        ))}
      </div></section>

      <section className="svc-footer">
        <ContactFormSection />
        <FooterLinksSection />
        <Footer />
      </section>
    </div>
  );
};
export default SEOAdsService;
