import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ContactFormSection from "@/components/ContactFormSection";
import ServiceNav from "@/components/ServiceNav";
import FooterLinksSection from "@/components/FooterLinksSection";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "@/assets/services/kol-avatars.webp";
import ytImg from "@/assets/platforms/kol-youtube.jpg";
import ctImg from "@/assets/platforms/kol-twitter.jpg";
import tgImg from "@/assets/platforms/kol-telegram.jpg";
import naverImg from "@/assets/platforms/kol-naver.jpg";
import perfImg from "@/assets/platforms/kol-performance.jpg";
import fraudImg from "@/assets/platforms/kol-fraud.jpg";
import "./ServiceDetail.css";
gsap.registerPlugin(ScrollTrigger);

const InfluencerService = () => {
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
      gsap.utils.toArray<HTMLElement>(".svc-detail .lbl,.svc-detail .stat,.svc-detail .problem-left,.svc-detail .problem-right,.svc-detail .cap-block,.svc-detail .proc-step,.svc-detail .tier-grid,.svc-detail .plat,.svc-detail .case-split,.svc-detail .faq-item,.svc-detail .invite h2,.svc-detail .invite-kr,.svc-detail .highlight-box").forEach(el => {
        gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" }});
      });
    }, containerRef);
    return () => { ctx.revert(); };
  }, []);

  return (
    <div className="svc-detail" ref={containerRef}>
      <SEOHead title="Korea Crypto KOL Marketing & Influencer Agency | ium Labs" description="Data-driven Korean crypto KOL and influencer marketing campaigns. Rigorous fraud filtering, ROI tracking, and localized content for Web3 networks." path="/services/influencer" image={heroImg} keywords={["Korea KOL Marketing","Korean Crypto Influencer"]} />
      <ServiceSchema name="Korea KOL & Influencer Marketing" description="250+ vetted Korean KOLs. Managed campaigns with fraud filtering and ROI tracking." url="/services/influencer" serviceType={["KOL Marketing", "Influencer Marketing", "Crypto Marketing"]} />
      <BreadcrumbSchema items={[{ name: "ium Labs", url: "https://iumlabs.io/" }, { name: "Services", url: "https://iumlabs.io/services/gtm" }, { name: "KOL Marketing", url: "https://iumlabs.io/services/influencer" }]} />
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <img src={heroImg} alt="" className="hero-bg" width={1200} height={800} /><div className="hero-overlay" />
        <div className="hero-center">
          <h1>KOL & <strong>Influencer</strong></h1>
          <p className="hero-desc">250+ vetted Korean KOLs. YouTube, X, Telegram, Naver. Managed campaigns with fraud filtering and ROI tracking. We don't just connect you with influencers — we run the entire operation.</p>
        </div>
        <div className="hero-stats-bar">
          <div className="stat"><div className="stat-val">230+</div><div className="stat-sub">Vetted Korean KOLs</div></div>
          <div className="stat"><div className="stat-val">4</div><div className="stat-sub">Platforms Covered</div></div>
          <div className="stat"><div className="stat-val">0%</div><div className="stat-sub">Fake Follower Tolerance</div></div>
          <div className="stat"><div className="stat-val">Weekly</div><div className="stat-sub">Performance Reports</div></div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem"><div className="wrap">
        <div className="lbl">The Problem</div>
        <div className="problem-grid">
          <div className="problem-left"><h2>Korean KOL marketing is <strong>broken by default.</strong></h2></div>
          <div className="problem-right">
            <p>Most agencies hand you a KOL list and disappear. The list is full of inflated follower counts, recycled audiences, and influencers who post once and forget your project exists.</p>
            <p>Korea makes this worse. The KOL landscape is fragmented across YouTube, X, Telegram, and Naver Blog — each with its own culture, audience behavior, and pricing norms. A KOL who's S-tier on Korean CT might have zero presence on Naver.</p>
          </div>
        </div>
      </div></section>

      {/* CAPABILITIES */}
      <section className="capabilities"><div className="wrap">
        <div className="lbl">What We Do</div>
        {[
          { icon: "◎", title: "KOL Sourcing & Vetting", desc: "We identify the right KOLs for your narrative, token stage, and target audience. Every KOL is verified with real engagement data — follower analysis, historical performance, and fraud screening.", img: ytImg },
          { icon: "◉", title: "Campaign Design & Briefing", desc: "Custom briefs per KOL tailored to their style and audience. We align messaging with your GTM narrative. No copy-paste — every placement feels native.", img: ctImg },
          { icon: "◇", title: "Performance Tracking", desc: "Weekly reports with impressions, engagements, click-throughs. We compare KOL-by-KOL performance and rotate underperformers mid-campaign.", img: perfImg },
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
          <div className="tier-card"><div className="tier-badge tier-s">S</div><h4>S-Tier</h4><div className="tier-range">30K+ Followers · Top Korean CT</div><p>Market-moving opinion leaders. A single thread can shift retail sentiment overnight.</p><ul className="tier-list"><li>Narrative authority</li><li>High signal-to-noise</li><li>Premium pricing, max impact</li></ul></div>
          <div className="tier-card"><div className="tier-badge tier-a">A</div><h4>A-Tier</h4><div className="tier-range">10K+ · Niche Authority</div><p>Deep expertise in DeFi, DePIN, AI×Crypto. Highly engaged audiences that trust their analysis.</p><ul className="tier-list"><li>Sector credibility</li><li>High engagement rates</li><li>Strong comment quality</li></ul></div>
          <div className="tier-card"><div className="tier-badge tier-b">B</div><h4>B-Tier</h4><div className="tier-range">5K–10K · Volume & Reach</div><p>Emerging voices with authentic growing audiences. Used for volume and broadening awareness.</p><ul className="tier-list"><li>Cost-efficient reach</li><li>Authentic audiences</li><li>Thread relay campaigns</li></ul></div>
          <div className="tier-card"><div className="tier-badge tier-c">C</div><h4>C-Tier</h4><div className="tier-range">1K–5K · Micro & Seeding</div><p>Micro-influencers for grassroots seeding. High authenticity, low cost. Used to flood timelines during launch windows.</p><ul className="tier-list"><li>Lowest cost per post</li><li>Organic-feeling exposure</li><li>Launch wave campaigns</li></ul></div>
        </div>
      </div></section>

      {/* PLATFORMS */}

      {/* CASE STUDY - removed */}

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
            <div className="faq-q" role="button" tabIndex={0} onClick={() => toggleFaq(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFaq(i); } }} aria-expanded={openFaq === i}><h4>{faq.q}</h4><span className="fq-t">+</span></div>
            <div className="faq-a"><p>{faq.a}</p></div>
          </div>
        ))}
      </div></section>

      <section className="svc-footer">
        <ServiceNav />
        <ContactFormSection />
        <FooterLinksSection />
        <Footer />
      </section>
    </div>
  );
};
export default InfluencerService;
