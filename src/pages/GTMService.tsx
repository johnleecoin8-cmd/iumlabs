import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CalendlyButton from "@/components/CalendlyButton";
import SEOHead from "@/components/SEOHead";
import { brand } from "@/config/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./GTMService.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { num: "01", title: "GTM Strategy", desc: "Competitive landscape analysis, Korea-fit narrative and positioning, launch timeline planning, and full market entry roadmap. We define where you stand and where to move.", chips: ["Market Analysis", "Positioning", "Roadmap", "Launch Plan"] },
  { num: "02", title: "KOL & Influencer", desc: "170+ vetted Korean KOLs. YouTube, X, Telegram, Naver. Managed campaigns with fraud filtering, audience verification, and ROI tracking. Not shills. Narratives.", chips: ["YouTube", "X", "Telegram", "Naver"] },
  { num: "03", title: "PR & Media", desc: "CoinDesk Korea, Block Media, TokenPost, mainstream outlets. Press releases, thought leadership, crisis comms. Stories Korean journalists actually want to publish.", chips: ["CoinDesk KR", "BlockMedia", "TokenPost", "Crisis"] },
  { num: "04", title: "Community Management", desc: "24/7 native Korean managers. Telegram, Discord, KakaoTalk open chat. Sentiment monitoring, engagement programs, and moderation that keeps communities loyal.", chips: ["Telegram", "Discord", "KakaoTalk", "24/7"] },
  { num: "05", title: "Offline Events", desc: "KBW side events, Seoul meetups, VIP networking dinners. Full logistics, venue sourcing, speaker curation, and post-event content that outlasts the night.", chips: ["KBW", "Seoul", "VIP", "Production"] },
  { num: "06", title: "Deep Research", desc: "On-chain wallet profiling, competitor share-of-voice, market ecosystem mapping. Reports delivered in Korean and English, distributed through our media network.", chips: ["On-chain", "Dune", "Nansen", "Reports"] },
  { num: "07", title: "SEO & Paid Ads", desc: "Naver SEO and keyword strategy, Google Ads, X Ads, crypto ad networks. We know which platforms ban crypto and how to get certified for the ones that don't.", chips: ["Naver SEO", "Google Ads", "X Ads", "Crypto Networks"] },
  { num: "08", title: "AMA Hosting", desc: "Telegram, Discord, X Spaces AMAs with native Korean-speaking hosts. Pre-event promotion, question curation, live moderation, post-AMA recap content.", chips: ["Telegram", "Discord", "X Spaces", "Korean Host"] },
  { num: "09", title: "Compliance", desc: "In partnership with Law Office Asset and Freeman Law. VASP registration, PIPA compliance, regulatory landscape analysis, and exchange compliance documentation.", chips: ["VASP", "PIPA", "AML/KYC", "Legal Partners"] },
];

const GTMService = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openSvc, setOpenSvc] = useState<number | null>(null);

  const toggleSvc = useCallback((i: number) => {
    setOpenSvc(prev => prev === i ? null : i);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animations
      gsap.utils.toArray<HTMLElement>(".gtm-ed .lbl, .gtm-ed .n-item, .gtm-ed .manifesto p, .gtm-ed .pill, .gtm-ed .proc-s, .gtm-ed .case-card, .gtm-ed .quote-ed blockquote, .gtm-ed .quote-ed cite, .gtm-ed .cta-ed h2, .gtm-ed .cta-ed p, .gtm-ed .mag-btn, .gtm-ed .appr-l").forEach(el => {
        gsap.from(el, {
          y: 50, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" }
        });
      });

      // Number counters
      document.querySelectorAll(".gtm-ed .n-val").forEach(el => {
        const target = el.getAttribute("data-count");
        if (!target) return;
        const num = parseFloat(target);
        const prefix = el.textContent?.includes("$") ? "$" : "";
        const isDecimal = target.includes(".");
        ScrollTrigger.create({
          trigger: el, start: "top 85%", once: true,
          onEnter: () => {
            gsap.to({ v: 0 }, {
              v: num, duration: 2, ease: "power2.out",
              onUpdate: function () {
                const v = (this.targets()[0] as any).v;
                (el as HTMLElement).textContent = prefix + (isDecimal ? v.toFixed(1) : Math.round(v)) + (isDecimal ? "B+" : "+");
              }
            });
          }
        });
      });

      // Manifesto word reveal
      const mp = document.querySelector(".gtm-ed .manifesto p");
      if (mp) {
        const html = mp.innerHTML;
        const parts = html.split(/(<[^>]+>)/);
        let result = "";
        parts.forEach(part => {
          if (part.startsWith("<")) { result += part; return; }
          part.split(" ").forEach(w => {
            if (w.trim()) result += `<span class="mw" style="display:inline-block;opacity:.15">${w}</span> `;
          });
        });
        mp.innerHTML = result;
        gsap.utils.toArray<HTMLElement>(".gtm-ed .mw").forEach(w => {
          gsap.to(w, { opacity: 1, duration: .5, ease: "power1.out", scrollTrigger: { trigger: w, start: "top 90%", end: "top 60%", scrub: 1 } });
        });
      }

      // Hero animation
      gsap.from(".gtm-ed .hero-tag", { y: 30, opacity: 0, duration: 1, delay: .3, ease: "power3.out" });
      gsap.from(".gtm-ed .hero-ed h1", { y: 60, opacity: 0, duration: 1.2, delay: .5, ease: "power3.out" });
      gsap.from(".gtm-ed .hero-foot p", { y: 30, opacity: 0, duration: 1, delay: .9, ease: "power3.out" });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="gtm-ed" ref={containerRef}>
      <SEOHead
        title="Korea Web3 GTM Strategy | Go-To-Market Agency | ium Labs"
        description="Full-stack Go-To-Market strategy for Web3 projects entering Korea. 9 integrated services, one partner, full execution."
        path="/services/gtm"
        keywords={["Korea Web3 GTM", "Go-To-Market Korea", "Web3 Market Entry Korea", "Crypto GTM Strategy"]}
      />
      <Navbar />

      {/* HERO */}
      <section className="hero-ed">
        <div className="hero-wm">ium</div>
        <div className="hero-tag">Korea Market Entry — Seoul</div>
        <h1>We help projects <em>enter</em> and <strong>own Korea's crypto market.</strong></h1>
        <div className="hero-foot">
          <p>Full-stack GTM execution for the #2 crypto market globally. 9 services, one team, from first contact to market dominance.</p>
          <div className="hero-scroll-v">Scroll</div>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="numbers">
        <div className="wrap">
          <div className="n-grid">
            <div className="n-item"><div className="n-val" data-count="7">$0</div><div className="n-sub">Client Valuation</div></div>
            <div className="n-item"><div className="n-val" data-count="230">0</div><div className="n-sub">KOL Network</div></div>
            <div className="n-item"><div className="n-val" data-count="22">0</div><div className="n-sub">Projects Launched</div></div>
            <div className="n-item"><div className="n-val" data-count="70">0</div><div className="n-sub">Events Hosted</div></div>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="wrap">
          <p>Korea doesn't work like any other market. Retail-driven, trust-first, and brutally fast. Most agencies translate your global deck and call it localization. We don't. We rebuild your <strong>narrative</strong>, activate <strong>real KOLs</strong>, build <strong>communities that stay</strong>, and run <strong>events that convert</strong>. 22+ projects since 2022.</p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-ed" id="services">
        <div className="wrap">
          <div className="lbl">Services</div>
          {services.map((svc, i) => (
            <div key={svc.num} className={`svc${openSvc === i ? " open" : ""}`}>
              <div className="svc-head" onClick={() => toggleSvc(i)}>
                <div className="svc-i">{svc.num}</div>
                <div className="svc-t">{svc.title}</div>
                <div className="svc-x">+</div>
              </div>
              <div className="svc-body">
                <div className="svc-inner">
                  <div />
                  <div className="svc-desc">{svc.desc}</div>
                  <div className="svc-chips">
                    {svc.chips.map(c => <span key={c} className="chip">{c}</span>)}
                  </div>
                </div>
              </div>
            </div>
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
              <p>Every campaign is run by operators who've held BD and marketing roles at exchanges and protocols. We embed senior operators into your team, not juniors reading a playbook.</p>
            </div>
            <div className="pillars">
              <div className="pill"><div className="pill-n">I</div><h4>Operator-led execution</h4><p>Former Binance and KuCoin executives. Our team has sat in the seats your project needs.</p></div>
              <div className="pill"><div className="pill-n">II</div><h4>Native in every channel</h4><p>Korean campaigns run by Koreans on Korean platforms. Naver, KakaoTalk, DC Inside, Korean CT.</p></div>
              <div className="pill"><div className="pill-n">III</div><h4>Data-driven decisions</h4><p>On-chain analytics, community sentiment tracking, CT velocity metrics. Real-time campaign optimization.</p></div>
              <div className="pill"><div className="pill-n">IV</div><h4>Retention over reach</h4><p>We optimize for 30-day community retention and on-chain stickiness. Vanity metrics don't build markets.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-ed">
        <div className="wrap">
          <div className="lbl">Process</div>
          <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(2rem,3.5vw,2.8rem)", letterSpacing: "-.02em" }}>From zero to <strong>market presence</strong></h2>
          <div className="proc-row">
            <div className="proc-s"><div className="proc-dot" /><div className="proc-ph">Phase I</div><div className="proc-t">Market Intelligence</div><div className="proc-p">Deep-dive into your protocol, competitors, and the Korean landscape. Map narrative gaps and growth levers.</div><div className="proc-tm">Week 1-2</div></div>
            <div className="proc-s"><div className="proc-dot" /><div className="proc-ph">Phase II</div><div className="proc-t">GTM Architecture</div><div className="proc-p">Custom playbook: channel strategy, KOL shortlists, content calendars, community scaffolding. All localized.</div><div className="proc-tm">Week 2-3</div></div>
            <div className="proc-s"><div className="proc-dot" /><div className="proc-ph">Phase III</div><div className="proc-t">Campaign Execution</div><div className="proc-p">Multi-channel activation. KOL drops, community events, PR blitz. Orchestrated for maximum narrative velocity.</div><div className="proc-tm">Week 3-8</div></div>
            <div className="proc-s"><div className="proc-dot" /><div className="proc-ph">Phase IV</div><div className="proc-t">Optimize & Scale</div><div className="proc-p">Weekly reporting, A/B messaging, KOL rotation. Continuous iteration until dominance.</div><div className="proc-tm">Ongoing</div></div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="cases-ed">
        <div className="wrap">
          <div className="lbl">Selected Work</div>
          <div className="case-grid">
            <Link to="/projects/bnb-chain" className="case-card" onClick={() => window.scrollTo(0,0)}>
              <div className="case-cat">L1 Infrastructure</div>
              <div className="case-metric">+420%</div>
              <div className="case-title">Korean trading volume surge</div>
              <div className="case-text">2-week volume spike through coordinated KOL blitz and Seoul networking events with BNB Chain Korea.</div>
            </Link>
            <Link to="/projects/kucoin" className="case-card" onClick={() => window.scrollTo(0,0)}>
              <div className="case-cat">Exchange</div>
              <div className="case-metric">35K</div>
              <div className="case-title">New Korean users acquired</div>
              <div className="case-text">Community airdrop, KOL campaigns, and Naver SEO driving sustained user acquisition for KuCoin Korea.</div>
            </Link>
            <Link to="/projects/mantra" className="case-card" onClick={() => window.scrollTo(0,0)}>
              <div className="case-cat">RWA Layer 1</div>
              <div className="case-metric">$50M+</div>
              <div className="case-title">Institutional pipeline</div>
              <div className="case-text">Korean investor dinners, BD introductions, and thought leadership establishing MANTRA's institutional presence.</div>
            </Link>
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link to="/projects" style={{ fontFamily: "var(--mono)", fontSize: ".6rem", color: "var(--g2)", letterSpacing: ".1em", textTransform: "uppercase" as const }}>
              View all 22+ projects →
            </Link>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="quote-ed">
        <div className="wrap">
          <blockquote>"ium Labs didn't just grow our Korean community. They designed its entire culture. The engagement quality was unlike anything we'd seen from any agency in the region."</blockquote>
          <cite>Head of Growth — Layer 1 Protocol</cite>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-ed" id="contact">
        <div className="wrap">
          <div className="lbl" style={{ justifyContent: "center" }}>Let's Talk</div>
          <h2>Your market <strong>is waiting.</strong></h2>
          <p>30-minute strategy call. We'll map out exactly how we'd approach your Korea market entry.</p>
          <CalendlyButton className="mag-btn"><span>Book a Strategy Call →</span></CalendlyButton>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ft-ed">
        <div className="wrap">
          <div className="ft-grid">
            <div className="ft-brand">
              <div style={{ fontFamily: "var(--sans)", fontWeight: 800, fontSize: "1rem", letterSpacing: ".06em" }}>ium Labs</div>
              <p>Full-stack Web3 go-to-market execution for the Korean crypto market. Seoul-based, globally connected.</p>
            </div>
            <div className="ft-col">
              <h6>Services</h6>
              <Link to="/services/gtm">GTM Strategy</Link>
              <Link to="/services/influencer">KOL Marketing</Link>
              <Link to="/services/community">Community</Link>
              <Link to="/services/pr">PR & Media</Link>
              <Link to="/services/offline-event">Events</Link>
              <Link to="/services/deep-research">Research</Link>
            </div>
            <div className="ft-col">
              <h6>Company</h6>
              <Link to="/projects">Case Studies</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/jobs">Careers</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="ft-col">
              <h6>Connect</h6>
              <a href={brand.twitter} target="_blank" rel="noopener noreferrer">X / Twitter</a>
              <a href={brand.telegramLink} target="_blank" rel="noopener noreferrer">Telegram</a>
              <a href={brand.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </div>
          </div>
          <div className="ft-bottom">
            <div className="ft-cp">© 2026 ium Labs — Seoul, Korea</div>
            <div className="ft-cp">
              <Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GTMService;
