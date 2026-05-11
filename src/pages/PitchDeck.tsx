import logo from "@/assets/logo.png";

import seoulCta from "@/assets/backgrounds/seoul-hanriver-twilight.jpg";
import asiaGlobe from "@/assets/maps/asia-globe.png";

import logoBnb from "@/assets/logos/bnb.svg";
import logoKucoin from "@/assets/logos/kucoin.png";
import logoSahara from "@/assets/logos/sahara-ai.png";
import logoPolygon from "@/assets/logos/polygon.svg";
import logoMantra from "@/assets/logos/mantra.png";
import logoStory from "@/assets/logos/story-protocol-mono.png";
import logoOndo from "@/assets/logos/ondo.svg";
import logoAptos from "@/assets/logos/aptos-round.png";
import logoMegaeth from "@/assets/logos/megaeth.png";
import logoFogo from "@/assets/logos/fogo-mono.png";
import logoSynfutures from "@/assets/logos/synfutures-mono.png";
import logoTria from "@/assets/logos/tria-official.png";
import logoCoindesk from "@/assets/logos/coindesk.png";
import logoBlockmedia from "@/assets/logos/blockmedia-new.png";
import logoHankyung from "@/assets/logos/hankyung-new.png";

import eventSahara from "@/assets/campaigns/sahara-ai-event.jpg";
import eventBybit from "@/assets/campaigns/bybit-event.jpg";
import eventBnb from "@/assets/campaigns/bnb-hanok-event.jpg";
import eventKucoin from "@/assets/campaigns/kucoin-party-event.jpg";
import eventStory from "@/assets/campaigns/story-origin-summit.jpg";
import eventPolygon from "@/assets/campaigns/polygon-connect.jpg";
import eventMantra from "@/assets/campaigns/mantra-party.jpg";

import teamDavid from "@/assets/team/kevin-bd-new.jpg";
import teamBennet from "@/assets/team/rachel-design.jpg";
import teamJ from "@/assets/team/j-cmo.jpg";
import teamKevin from "@/assets/team/helen-cm.jpg";
import teamSuki from "@/assets/team/bennet-coo.jpg";
import teamLewis from "@/assets/team/lewis-pr.jpg";
import teamRachel from "@/assets/team/kevin-bd.jpg";
import teamHyukjae from "@/assets/team/hyukjae-bdm-new.jpg";

const TOTAL = 14;

const s = {
  slide: "min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-24 py-16 relative overflow-hidden border-t border-white/[0.04] first:border-t-0",
  label: "text-[10px] tracking-[0.35em] uppercase text-white/25 font-medium",
  labelAccent: "text-[10px] tracking-[0.3em] uppercase text-[#a78bfa]/60 font-semibold",
  hxl: "text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-tight",
  hlg: "text-[clamp(1.8rem,4vw,3.2rem)] font-bold leading-[1.1] tracking-tight",
  hmd: "text-[clamp(1.2rem,2.5vw,1.8rem)] font-semibold leading-[1.2]",
  hsm: "text-base font-semibold leading-snug",
  bodyLg: "text-[clamp(0.95rem,1.5vw,1.15rem)] text-white/55 leading-relaxed",
  body: "text-sm text-white/55 leading-relaxed",
  bodySm: "text-xs text-white/25 leading-relaxed",
  grad: "bg-gradient-to-r from-[#b48cde] via-[#a78bfa] to-[#c084fc] bg-clip-text text-transparent",
  card: "bg-[#111113] border border-white/[0.06] rounded-2xl p-7",
  cardSm: "bg-[#111113] border border-white/[0.06] rounded-xl p-5",
  pill: "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium border border-white/[0.12] text-white/55",
  pillAccent: "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold border border-[#a78bfa]/20 text-[#a78bfa] bg-[#a78bfa]/[0.08]",
  statNum: "text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-tight leading-none",
  statLabel: "text-xs text-white/25 mt-1.5",
  glow: "absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.06] pointer-events-none",
  sn: "absolute bottom-7 right-10 text-[11px] text-white/25 font-medium tabular-nums",
};

const Bar = ({ pct }: { pct: number }) => (
  <div className="h-1 bg-white/[0.04] rounded-full mt-2.5">
    <div className="h-full rounded-full bg-gradient-to-r from-[#a78bfa] to-[#c084fc]" style={{ width: `${pct}%` }} />
  </div>
);

const SN = ({ n }: { n: number }) => (
  <span className={s.sn}>{String(n).padStart(2, "0")} / {TOTAL}</span>
);

const PitchDeck = () => (
  <div className="min-h-screen bg-[#09090B] text-white font-sans" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

    {/* 01 — COVER — same video background as homepage hero */}
    <section className={s.slide} style={{ alignItems: "center", textAlign: "center" }}>
      <div className="absolute inset-0">
        <img
          src="/images/posters/hero-background-poster.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-10"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 z-[11]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0A0A0A] z-[12]" />
      </div>
      <div className="relative z-20">
        <img src={logo} alt="ium Labs" className="w-14 h-14 rounded-[14px] mx-auto mb-6 ring-1 ring-white/10" />
        <p className={`${s.labelAccent} mb-4`}>Korea's Web3 Growth Engine</p>
        <h1 className={`${s.hxl} mb-6`}>
          Seoul Moves Fast.<br /><span className={s.grad}>We Make You Land.</span>
        </h1>
        <p className={`${s.bodyLg} max-w-2xl mx-auto`}>
          Korea-native operators engineering market entry for the world's top Web3 projects. From narrative to conversion — end-to-end.
        </p>
        <div className="flex gap-2.5 justify-center mt-10 flex-wrap">
          <span className={s.pill}>Seoul HQ</span>
          <span className={s.pill}>Singapore</span>
          <span className={s.pill}>22+ Launches</span>
          <span className={s.pill}>$7B+ Client Valuation</span>
        </div>
        <p className={`${s.bodySm} mt-8`}>Confidential — Q2 2026</p>
      </div>
      <SN n={1} />
    </section>

    {/* 02 — OPPORTUNITY */}
    <section className={s.slide} id="opportunity">
      <div className={s.glow} style={{ background: "#6366f1", top: "-20%", right: "-10%" }} />
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <p className={`${s.labelAccent} mb-3`}>The Opportunity</p>
        <h2 className={`${s.hlg} mb-3`}>Korea is the world's 3rd largest crypto market — and the <span className={s.grad}>hardest to crack.</span></h2>
        <p className={`${s.bodyLg} max-w-3xl mb-10`}>14 million active investors. $12.8B daily volume. Premium retail liquidity that moves markets. But 90% of foreign projects fail within 6 months of entry.</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[["14M","Active Crypto Investors"],["$12.8B","Daily Exchange Volume"],["78%","Upbit Market Dominance"],["340%","Avg. Upbit Listing Premium"]].map(([n,l])=>(
            <div key={l} className={`${s.cardSm} text-center`}>
              <div className={`${s.statNum} ${s.grad}`}>{n}</div>
              <div className={s.statLabel}>{l}</div>
            </div>
          ))}
        </div>
        <div className={`${s.card} mt-8`} style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.04), transparent)", borderColor: "rgba(167,139,250,0.1)" }}>
          <p className={s.body}><strong className="text-white">The Korea Premium:</strong> Korean retail consistently pays 3–8% above global spot prices. Projects that land correctly in Korea unlock a pricing multiplier that doesn't exist in any other market.</p>
        </div>
      </div>
      <SN n={2} />
    </section>

    {/* 03 — PROBLEM */}
    <section className={s.slide}>
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <p className={`${s.labelAccent} mb-3`}>The Problem</p>
        <h2 className={`${s.hlg} mb-3`}>Why global projects <span className={s.grad}>fail in Korea.</span></h2>
        <p className={`${s.bodyLg} max-w-3xl mb-10`}>Korea is not a "translate and launch" market. It has its own platforms, gatekeepers, cultural codes, and regulatory walls.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {([["Platform Lock-Out","#f87171","Korean users live on Naver, KakaoTalk, DC Inside — not Google, Telegram, or Discord. Western playbooks have zero reach."],
            ["Exchange Gatekeeping","#fbbf24","Upbit controls 78% of volume. Without relationships and compliance infrastructure, listing is impossible."],
            ["Cultural Mistranslation","#fb923c","Korean investors evaluate through institutional trust, not decentralization narratives. Western messaging doesn't convert."],
            ["KOL Fraud","#a78bfa","60%+ of Korean crypto 'influencers' on broker platforms use fabricated engagement. Without direct relationships, you pay for bots."],
            ["Regulatory Complexity","#34d399","VASP registration, Travel Rule, PIPA, crypto tax — the legal surface area is vast and enforcement is real."],
            ["Community Fragmentation","#60a5fa","Korean communities are on KakaoTalk (closed) not Telegram (open). Building across fragmented platforms requires native operators."]] as const).map(([t,c,d])=>(
            <div key={t} className={s.card}>
              <div className={s.hsm} style={{ color: c, marginBottom: 12 }}>{t}</div>
              <p className={s.body}>{d}</p>
            </div>
          ))}
        </div>
      </div>
      <SN n={3} />
    </section>

    {/* 04 — SOLUTION */}
    <section className={s.slide}>
      <div className={s.glow} style={{ background: "#a78bfa", bottom: "-20%", left: "-10%" }} />
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <p className={`${s.labelAccent} mb-3`}>The Solution</p>
        <h2 className={`${s.hlg} mb-3`}>We don't localize decks. We <span className={s.grad}>rebuild narratives</span> and deploy operators.</h2>
        <p className={`${s.bodyLg} max-w-3xl mb-10`}>ium Labs is Korea's dedicated growth engine for global Web3 projects. Built by exchange alumni. Native to platforms foreigners can't touch.</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {([["Operator Model","Built by Exchange Alumni","Founded by Binance, KuCoin, and Upbit operators. We don't consult — we execute with the same playbooks that scaled exchanges to millions of users."],
            ["Direct Access","230+ KOLs, No Middlemen","Direct relationships with Korea's most influential crypto voices. Every KOL audience-verified, fraud-filtered. No broker markup."],
            ["End-to-End","9 Services, One Team","GTM strategy, KOL campaigns, PR, community, events, research, SEO, AMAs, and compliance. No vendor coordination needed."]] as const).map(([sub,t,d])=>(
            <div key={t} className={s.card} style={{ borderColor: "rgba(167,139,250,0.12)", background: "linear-gradient(180deg, rgba(167,139,250,0.03), transparent)" }}>
              <p className={`${s.labelAccent} mb-4`}>{sub}</p>
              <div className={`${s.hsm} mb-2`}>{t}</div>
              <p className={s.body}>{d}</p>
            </div>
          ))}
        </div>
      </div>
      <SN n={4} />
    </section>

    {/* 05 — TRACTION + PROOF OF WORK */}
    <section className={s.slide}>
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <p className={`${s.labelAccent} mb-3`}>Traction</p>
        <h2 className={`${s.hlg} mb-10`}>Numbers that <span className={s.grad}>compound.</span></h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[["$7B+","Combined Client Valuation"],["22+","Successful Korea Entries"],["230+","Direct KOL Relationships"],["$30M+","Revenue Attributed"]].map(([n,l])=>(
            <div key={l} className={`${s.card} text-center`}>
              <div className={s.statNum}>{n.replace("+","")}<span className="text-[0.5em] text-[#a78bfa]">+</span></div>
              <div className={s.statLabel}>{l}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[["PR Coverage Rate",87],["Community 30-Day Retention",92],["AMA Session Retention",85]].map(([l,p])=>(
            <div key={String(l)} className={s.cardSm}>
              <div className="flex justify-between items-baseline">
                <span className={s.bodySm}>{l}</span>
                <span className="text-xl font-extrabold text-[#a78bfa]">{p}%</span>
              </div>
              <Bar pct={p as number} />
            </div>
          ))}
        </div>

        {/* Event photo strip — all unique, no duplicates with other slides */}
        <div className="mt-4">
          <p className={`${s.label} mb-4`}>Selected Events & Activations</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {([
              [eventSahara, "Sahara AI · 400+ Attendees"],
              [eventBnb, "BNB Chain · VIP Hanok Dinner"],
              [eventPolygon, "Polygon · Connect Panel"],
              [eventKucoin, "KuCoin · Networking Night"],
              [eventStory, "Story · Origin Summit 2025"],
              [eventMantra, "MANTRA · VIP Event"],
            ] as const).map(([img, caption]) => (
              <div key={caption} className="relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.06]">
                  <img src={img} alt={caption} className="w-full h-full object-cover" />
                </div>
                <p className="text-[10px] text-white/30 mt-1.5 leading-tight">{caption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SN n={5} />
    </section>

    {/* 06 — CLIENTS with logos */}
    <section className={s.slide}>
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <p className={`${s.labelAccent} mb-3`}>Selected Work</p>
        <h2 className={`${s.hlg} mb-10`}>Trusted by <span className={s.grad}>category leaders.</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {([
            [logoBnb, "BNB Chain", "Infrastructure", "2M+ Impressions · 150+ VIP Ambassadors", false],
            [logoKucoin, "KuCoin", "Exchange", "$550M+ TVL · +600% SEO Growth", false],
            [null, "Bybit", "Exchange", "#2 Traffic Position · $1.5B+ TVL", false],
            [logoOndo, "Ondo Finance", "RWA", "100K+ Community · 5M+ Media Reach", true],
            [logoMegaeth, "MegaETH", "Layer 2", "$3M+ ICO Contributions · 2M+ Impressions", true],
            [logoSahara, "Sahara AI", "AI Infra", "400+ Event Attendees · 25+ Partnerships", false],
            [logoPolygon, "Polygon", "Layer 1", "$2M Korean TVL (30d) · 200+ Hackathon Devs", false],
            [logoMantra, "MANTRA", "RWA · L1", "$50M+ Institutional Pipeline · CEX Listed", false],
            [logoStory, "Story Protocol", "IP Protocol", "500+ Workshop Attendees · 13+ Media", false],
          ] as const).map(([logoImg, name, tag, stat, needsInvert]) => (
            <div key={name} className="bg-[#111113] border border-white/[0.06] rounded-xl p-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {logoImg ? (
                  <img
                    src={logoImg}
                    alt={name}
                    className="w-9 h-9 rounded-lg object-contain"
                    style={needsInvert ? { filter: "brightness(0) invert(1)" } : undefined}
                  />
                ) : (
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#f7931a] to-[#f7931a]/70 flex items-center justify-center text-sm font-bold">B</div>
                )}
                <div>
                  <span className="text-lg font-bold leading-tight block">{name}</span>
                  <span className="text-[10px] text-white/25 tracking-[0.1em] uppercase">{tag}</span>
                </div>
              </div>
              <span className="text-xs text-[#a78bfa] font-semibold">{stat}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center gap-3 flex-wrap justify-center">
          <span className={`${s.bodySm} mr-2`}>Also:</span>
          {([
            [logoAptos, "Aptos", true],
            [logoSynfutures, "SynFutures", true],
            [logoFogo, "FOGO", true],
            [logoTria, "Tria", true],
          ] as const).map(([img, name, inv]) => (
            <div key={name} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]">
              <img src={img} alt={name} className="w-4 h-4 object-contain" style={inv ? { filter: "brightness(0) invert(1)" } : undefined} />
              <span className="text-[11px] text-white/40">{name}</span>
            </div>
          ))}
          <span className="text-[11px] text-white/25">OpenLedger · Kite AI · Spacecoin · World (WLD) and more</span>
        </div>
      </div>
      <SN n={6} />
    </section>

    {/* 07 — CASE STUDY with Bybit photo (unique, not in traction strip) */}
    <section className={s.slide}>
      <div className={s.glow} style={{ background: "#6366f1", top: "50%", right: "-15%" }} />
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <p className={`${s.labelAccent} mb-3`}>Case Study</p>
        <h2 className={`${s.hlg} mb-8`}>How we took Bybit to <span className={s.grad}>#2 in Korea.</span></h2>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-white/[0.06]">
            <img src={eventBybit} alt="Bybit Korea Activation" className="w-full h-full object-cover min-h-[240px]" />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
            {[["#2","Exchange Traffic Position in Korea"],["$1.5B+","Total Value Locked"],["1,200+","VIP Korean Users"]].map(([n,l])=>(
              <div key={l} className={`${s.card} text-center flex-1 flex flex-col justify-center`}>
                <div className={`${s.statNum} ${s.grad}`}>{n}</div>
                <div className={s.statLabel}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {([["1","Narrative Rebuild","Repositioned from 'foreign exchange' to 'global platform with Korea-first features.' Korean-language strategy across Naver, KakaoTalk, YouTube."],
            ["2","KOL Blitz","Activated 50+ S/A-tier KOLs with authentic product reviews. Each KOL received dedicated onboarding for genuine content."],
            ["3","VIP Community","Built 1,200+ VIP user community with exclusive perks, early feature access, and KakaoTalk-native engagement loops."],
            ["4","Sustained Presence","Monthly events, weekly AMAs, ongoing PR — creating sustained visibility that compounded into organic traffic growth."]] as const).map(([n,t,d])=>(
            <div key={n} className={s.cardSm}>
              <div className="w-8 h-8 rounded-[10px] bg-[#a78bfa]/[0.08] border border-[#a78bfa]/20 flex items-center justify-center text-sm font-bold text-[#a78bfa] mb-3">{n}</div>
              <div className={`${s.hsm} mb-1.5`}>{t}</div>
              <p className={s.bodySm}>{d}</p>
            </div>
          ))}
        </div>
      </div>
      <SN n={7} />
    </section>

    {/* 08 — SERVICES */}
    <section className={s.slide}>
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <p className={`${s.labelAccent} mb-3`}>Full-Stack Services</p>
        <h2 className={`${s.hlg} mb-8`}>Everything you need to <span className={s.grad}>land in Korea.</span></h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10">
          {([["01","GTM Strategy","Competitive analysis, Korea-fit narrative, audience segmentation, launch roadmap. Custom playbook — zero recycled templates."],
            ["02","KOL & Influencer Marketing","230+ vetted KOLs across YouTube, X, Telegram, Naver. S/A/B/C tier. Direct — no brokers. 10-day campaign launch."],
            ["03","PR & Media Relations","CoinDesk Korea, Block Media, TokenPost, mainstream press. 87% placement rate. Native press releases and thought leadership."],
            ["04","Community Management","24/7 native managers. Telegram, Discord, KakaoTalk, Naver Cafe. 92% retention. 6.8% DAR (2x industry avg)."],
            ["05","Offline Events","KBW side events, VIP dinners, launch parties. 40+ Seoul venue relationships. 23 events, 2,847 attendees."],
            ["06","Deep Research & Intelligence","On-chain analytics, competitor mapping, sentiment tracking. 47 reports. Institutional-grade analysis in KR & EN."],
            ["07","SEO & Paid Ads","Naver SEO (70% Korean search), Google/X Ads, crypto ad networks. 287% traffic growth. 3.4x ROAS."],
            ["08","AMA Hosting","Telegram, Discord, X Spaces, KakaoTalk Live, YouTube. Native Korean hosts. 200+ AMAs, 50K+ live participants."],
            ["09","Regulatory & Compliance","VASP registration, PIPA compliance, AML/KYC, exchange listing compliance. Partnership with Law Office Asset & Freeman Law."]] as const).map(([n,t,d])=>(
            <div key={n} className="flex gap-5 py-5 border-b border-white/[0.06] items-start">
              <span className="text-[11px] text-white/25 font-semibold tabular-nums w-6 shrink-0 pt-0.5">{n}</span>
              <div>
                <div className="text-base font-semibold mb-1">{t}</div>
                <p className="text-xs text-white/25 leading-relaxed">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SN n={8} />
    </section>

    {/* 09 — KOL NETWORK */}
    <section className={s.slide}>
      <div className={s.glow} style={{ background: "#c084fc", bottom: "-20%", left: "30%" }} />
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <p className={`${s.labelAccent} mb-3`}>KOL Network</p>
        <h2 className={`${s.hlg} mb-3`}>230+ direct relationships. <span className={s.grad}>Zero broker middlemen.</span></h2>
        <p className={`${s.bodyLg} max-w-3xl mb-10`}>Every KOL is audience-verified, fraud-filtered, and relationship-managed. We know their real engagement, content quality, and demographics.</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {([["S-Tier","30K+ followers","Market-moving",true],["A-Tier","10K+ followers","Niche authority",false],["B-Tier","5–10K followers","Emerging voices",false],["C-Tier","1–5K followers","Grassroots seeding",false]] as const).map(([tier,foll,desc,accent])=>(
            <div key={tier} className={`${s.card} text-center`} style={accent ? { borderColor: "rgba(167,139,250,0.2)" } : {}}>
              <div className={`text-3xl font-extrabold ${accent ? "text-[#a78bfa]" : ""}`}>{tier}</div>
              <div className={`${s.bodySm} mt-2`}>{foll}</div>
              <div className={s.bodySm}>{desc}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {([["Platform Coverage","YouTube, X, Telegram, Naver Blog, KakaoTalk, DC Inside, Korean CT"],
            ["Campaign Speed","10-day standard launch. 5-day express. Pre-negotiated top-tier KOL rates."],
            ["Quality Control","Fake follower filtering. Real-time dashboards. Post-campaign ROI reports."]] as const).map(([t,d])=>(
            <div key={t} className={s.cardSm}>
              <div className={`${s.hsm} mb-2`}>{t}</div>
              <p className={s.bodySm}>{d}</p>
            </div>
          ))}
        </div>
      </div>
      <SN n={9} />
    </section>

    {/* 10 — PROCESS */}
    <section className={s.slide}>
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <p className={`${s.labelAccent} mb-3`}>How We Work</p>
        <h2 className={`${s.hlg} mb-10`}>From discovery to <span className={s.grad}>market presence</span> in 30 days.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {([["1","Week 1","Discovery & Audit","Deep dive into your project, token, community, competitive landscape. Korea market fit assessment."],
            ["2","Week 2","Strategy & Playbook","Custom GTM roadmap. KOL selection matrix. Content calendar. Media targets. Budget allocation."],
            ["3","Week 3–4","Execution & Launch","KOL campaigns live. PR distribution. Community activated. Events scheduled. Naver SEO deployed."],
            ["∞","Ongoing","Scale & Optimize","Performance dashboards. Weekly reporting. Campaign iteration. Exchange relationship management."]] as const).map(([n,week,t,d])=>(
            <div key={t} className={`${s.card} relative`}>
              <div className="absolute top-3 right-4 text-[4rem] font-black text-[#a78bfa]/[0.05] leading-none">{n}</div>
              <span className={s.pillAccent}>{week}</span>
              <div className={`${s.hsm} mt-4 mb-2`}>{t}</div>
              <p className={s.bodySm}>{d}</p>
            </div>
          ))}
        </div>
      </div>
      <SN n={10} />
    </section>

    {/* 11 — GEOGRAPHY with map */}
    <section className={s.slide}>
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <p className={`${s.labelAccent} mb-3`}>Coverage</p>
        <h2 className={`${s.hlg} mb-10`}>Korea-native. <span className={s.grad}>Asia-wide reach.</span></h2>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 flex items-center justify-center">
            <img src={asiaGlobe} alt="Asia coverage" className="w-full max-w-[280px] opacity-60" style={{ filter: "hue-rotate(240deg) saturate(0.5) brightness(1.5)" }} />
          </div>
          <div className="lg:col-span-3 grid grid-cols-2 gap-4">
            <div className={s.card} style={{ borderColor: "rgba(167,139,250,0.2)", background: "linear-gradient(180deg, rgba(167,139,250,0.04), transparent)" }}>
              <span className={`${s.pillAccent} mb-3`}>HQ</span>
              <div className={`${s.hmd} mb-2`}>South Korea</div>
              <p className={s.bodySm}>Upbit, Bithumb, Korean CT, Naver, Kakao, DC Inside. Full native team.</p>
            </div>
            {([["Japan","LINE ecosystem, bitFlyer, Coincheck. Regulated entry."],["Taiwan","Local KOL network, exchange partnerships, community ops."],["China","Mainland BD, institutional network, WeChat CT."]] as const).map(([c,d])=>(
              <div key={c} className={s.card}>
                <span className={`${s.pill} mb-3`}>Active</span>
                <div className={`${s.hmd} mb-2`}>{c}</div>
                <p className={s.bodySm}>{d}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`${s.card} mt-8 text-center`}>
          <p className={`${s.label} mb-3`}>Offices</p>
          <div className="flex justify-center gap-10 flex-wrap">
            <div><div className={s.hsm}>Seoul, South Korea</div><p className={s.bodySm}>Headquarters</p></div>
            <div><div className={s.hsm}>Singapore</div><p className={s.bodySm}>Southeast Asia Hub</p></div>
          </div>
        </div>
      </div>
      <SN n={11} />
    </section>

    {/* 12 — TEAM with GTM-matching headshots */}
    <section className={s.slide}>
      <div className={s.glow} style={{ background: "#a78bfa", top: "-20%", left: "20%" }} />
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <p className={`${s.labelAccent} mb-3`}>Team</p>
        <h2 className={`${s.hlg} mb-3`}>Built by operators, <span className={s.grad}>not consultants.</span></h2>
        <p className={`${s.bodyLg} max-w-3xl mb-10`}>Every member has lived inside the Korean crypto ecosystem — operating exchanges, managing communities, running campaigns, and navigating regulations firsthand.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {([
            [teamDavid, "David", "CEO"],
            [teamBennet, "Bennet", "COO"],
            [teamJ, "J", "CMO"],
            [teamKevin, "Kevin", "Head of BD"],
          ] as const).map(([img, n, r]) => (
            <div key={n} className={`${s.card} text-center`}>
              <img src={img} alt={n} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-2 ring-white/[0.08] grayscale" />
              <div className={s.hsm}>{n}</div>
              <p className={s.bodySm}>{r}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {([
            [teamSuki, "Suki", "Managing Partner"],
            [teamLewis, "Lewis", "PR Manager"],
            [teamRachel, "Rachel", "Designer"],
            [teamHyukjae, "Hyukjae", "BD Manager"],
          ] as const).map(([img, n, r]) => (
            <div key={n} className={`${s.cardSm} text-center`}>
              <img src={img} alt={n} className="w-14 h-14 rounded-full mx-auto mb-3 object-cover ring-1 ring-white/[0.08] grayscale" />
              <div className={s.hsm}>{n}</div>
              <p className={s.bodySm}>{r}</p>
            </div>
          ))}
        </div>
        <div className={`${s.card} mt-8 text-center`} style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.03), transparent)" }}>
          <p className={s.body}><strong className="text-white">10+ operators</strong> across strategy, BD, community, PR, research, design, and compliance. Currently hiring <strong className="text-[#a78bfa]">Researchers</strong> and <strong className="text-[#a78bfa]">Growth Managers</strong>.</p>
        </div>
      </div>
      <SN n={12} />
    </section>

    {/* 13 — PRESS & MEDIA */}
    <section className={s.slide}>
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <p className={`${s.labelAccent} mb-3`}>Press & Media</p>
        <h2 className={`${s.hlg} mb-10`}>Featured in Korea's <span className={s.grad}>top publications.</span></h2>
        <div className="flex flex-wrap items-center justify-center gap-10 mb-10">
          {([
            [logoCoindesk, "CoinDesk Korea"],
            [logoBlockmedia, "Block Media"],
            [logoHankyung, "Hankyung"],
          ] as const).map(([img, name]) => (
            <img key={name} src={img} alt={name} className="h-8 sm:h-10 object-contain opacity-50" style={{ filter: "brightness(0) invert(1)" }} />
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[["64+","Press Articles Published"],["87%","Placement Success Rate"],["47","Research Reports"],["5M+","Total Media Reach"]].map(([n,l])=>(
            <div key={l} className="text-center py-4">
              <div className="text-2xl font-extrabold">{n}</div>
              <div className={s.bodySm}>{l}</div>
            </div>
          ))}
        </div>
        <div className={`${s.card}`} style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.04), transparent)", borderColor: "rgba(167,139,250,0.1)" }}>
          <p className={s.body}><strong className="text-white">Earned media, not paid placement.</strong> Our PR team maintains direct relationships with editors at CoinDesk Korea, Block Media, TokenPost, Hankyung, and 30+ publications. Native Korean press releases, thought leadership pieces, and exclusive interviews — not wire service blasts.</p>
        </div>
      </div>
      <SN n={13} />
    </section>

    {/* 14 — CTA with Han River twilight (different from cover video) */}
    <section className={s.slide} style={{ alignItems: "center", textAlign: "center" }}>
      <div className="absolute inset-0">
        <img src={seoulCta} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#09090B]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-[#09090B]/70" />
      </div>
      <div className="relative z-10">
        <img src={logo} alt="ium Labs" className="w-14 h-14 rounded-[14px] mx-auto mb-6 ring-1 ring-white/10" />
        <p className={`${s.labelAccent} mb-4`}>Let's Talk</p>
        <h2 className={`${s.hxl} mb-4`}>Ready to land<br /><span className={s.grad}>in Korea?</span></h2>
        <p className={`${s.bodyLg} max-w-2xl mx-auto mb-8`}>From strategy to execution. One call to align on your Korea market entry. Free 30-minute discovery. 24-hour response guarantee.</p>
        <div className="flex gap-4 justify-center flex-wrap mb-12">
          <a href="https://iumlabs.io/book-a-meeting" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black rounded-full text-sm font-semibold hover:bg-white/90 transition-colors">Book a Meeting</a>
          <a href="https://iumlabs.io/contact" className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/[0.12] text-white/55 rounded-full text-sm font-medium hover:border-white/25 transition-colors">Send a Message</a>
        </div>
        <div className="flex gap-8 justify-center flex-wrap">
          <div><p className={s.bodySm}>Email</p><p className={s.body} style={{ color: "white" }}>hello@iumlabs.io</p></div>
          <div><p className={s.bodySm}>Web</p><p className={s.body} style={{ color: "white" }}>iumlabs.io</p></div>
          <div><p className={s.bodySm}>Location</p><p className={s.body} style={{ color: "white" }}>Seoul · Singapore</p></div>
        </div>
        <div className="w-12 h-0.5 bg-[#a78bfa]/40 rounded-full mx-auto mt-10 mb-4" />
        <p className={s.bodySm}>Confidential — ium Labs Q2 2026</p>
      </div>
      <SN n={14} />
    </section>
  </div>
);

export default PitchDeck;
