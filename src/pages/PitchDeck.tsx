import logo from "@/assets/logo.png";

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

const PitchDeck = () => (
  <div className="min-h-screen bg-[#09090B] text-white font-sans" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

    {/* 01 — COVER */}
    <section className={s.slide} style={{ alignItems: "center", textAlign: "center" }}>
      <div className={s.glow} style={{ background: "#a78bfa", top: "20%", left: "50%", transform: "translateX(-50%)" }} />
      <div className="relative z-10">
        <img src={logo} alt="ium Labs" className="w-12 h-12 rounded-[14px] mx-auto mb-6" />
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
      <span className={s.sn}>01 / 13</span>
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
      <span className={s.sn}>02 / 13</span>
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
      <span className={s.sn}>03 / 13</span>
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
      <span className={s.sn}>04 / 13</span>
    </section>

    {/* 05 — TRACTION */}
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[["70+","Events Hosted"],["127K+","Community Members"],["64+","Press Articles"],["47","Research Reports"]].map(([n,l])=>(
            <div key={l} className="text-center py-4">
              <div className="text-xl font-bold">{n}</div>
              <div className={s.bodySm}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <span className={s.sn}>05 / 13</span>
    </section>

    {/* 06 — CLIENTS */}
    <section className={s.slide}>
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <p className={`${s.labelAccent} mb-3`}>Selected Work</p>
        <h2 className={`${s.hlg} mb-10`}>Trusted by <span className={s.grad}>category leaders.</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {([["Infrastructure","BNB Chain","2M+ Impressions · 150+ VIP Ambassadors","Full Korea ecosystem activation including KOL network, community build, and VIP ambassador program."],
            ["Exchange","KuCoin","$550M+ TVL · +600% SEO Growth","Comprehensive Korea expansion with exchange partnerships, SEO dominance, and premium events."],
            ["Exchange","Bybit","#2 Traffic Position · $1.5B+ TVL","Achieved #2 exchange traffic in Korea through integrated KOL, community, and PR campaigns."],
            ["RWA","Ondo Finance","100K+ Community · 5M+ Media Reach","Built Korea's largest RWA community from zero with institutional PR and targeted KOL campaigns."],
            ["Layer 2","MegaETH","$3M+ ICO Contributions · 2M+ Impressions","Pre-launch hype driving Korean retail participation in ICO with 2K+ testnet onboarding."],
            ["AI Infrastructure","Sahara AI","400+ Event Attendees · 25+ Partnerships","Korea market entry with multi-event strategy, KOL integration, and institutional BD pipeline."],
            ["Layer 1","Polygon","$2M Korean TVL (30d) · 200+ Hackathon Devs","Developer ecosystem growth with hackathons, university partnerships, and builder community."],
            ["RWA · L1","MANTRA","$50M+ Institutional Pipeline · CEX Listed","End-to-end Korea launch: institutional BD, exchange listing support, and community activation."],
            ["IP Protocol","Story Protocol","500+ Workshop Attendees · 13+ Media","Creator economy narrative positioning with workshop events and strategic media placements."]] as const).map(([tag,name,stat,desc])=>(
            <div key={name} className="bg-[#111113] border border-white/[0.06] rounded-xl p-6 flex flex-col gap-2.5">
              <span className="text-[10px] text-white/25 tracking-[0.1em] uppercase">{tag}</span>
              <span className="text-lg font-bold">{name}</span>
              <span className="text-xs text-[#a78bfa] font-semibold">{stat}</span>
              <p className={s.bodySm}>{desc}</p>
            </div>
          ))}
        </div>
        <p className={`${s.bodySm} mt-8 text-center`}>Also: Aptos · SynFutures · FOGO · Tria · OpenLedger · Kite AI · Spacecoin · World (WLD) and more</p>
      </div>
      <span className={s.sn}>06 / 13</span>
    </section>

    {/* 07 — CASE STUDY */}
    <section className={s.slide}>
      <div className={s.glow} style={{ background: "#6366f1", top: "50%", right: "-15%" }} />
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <p className={`${s.labelAccent} mb-3`}>Case Study</p>
        <h2 className={`${s.hlg} mb-10`}>How we took Bybit to <span className={s.grad}>#2 in Korea.</span></h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p className={`${s.bodyLg} mb-6`}>Bybit entered Korea as an unknown global exchange. We deployed a 6-month embedded campaign combining KOL seeding, community building, premium events, and Naver SEO.</p>
            {([["1","Narrative Rebuild","Repositioned from 'foreign exchange' to 'global platform with Korea-first features.' Korean-language strategy across Naver, KakaoTalk, YouTube."],
              ["2","KOL Blitz","Activated 50+ S/A-tier KOLs with authentic product reviews. Each KOL received dedicated onboarding for genuine content."],
              ["3","VIP Community","Built 1,200+ VIP user community with exclusive perks, early feature access, and KakaoTalk-native engagement loops."],
              ["4","Sustained Presence","Monthly events, weekly AMAs, ongoing PR — creating sustained visibility that compounded into organic traffic growth."]] as const).map(([n,t,d])=>(
              <div key={n} className="flex gap-5 py-5 border-b border-white/[0.06] last:border-b-0">
                <div className="w-9 h-9 rounded-[10px] bg-[#a78bfa]/[0.08] border border-[#a78bfa]/20 flex items-center justify-center text-sm font-bold text-[#a78bfa] shrink-0">{n}</div>
                <div>
                  <div className={s.hsm}>{t}</div>
                  <p className={`${s.bodySm} mt-1`}>{d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {[["#2","Exchange Traffic Position in Korea"],["$1.5B+","Total Value Locked"],["1,200+","VIP Korean Users"]].map(([n,l])=>(
              <div key={l} className={`${s.card} text-center flex-1 flex flex-col justify-center`}>
                <div className={`${s.statNum} ${s.grad}`}>{n}</div>
                <div className={s.statLabel}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <span className={s.sn}>07 / 13</span>
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
      <span className={s.sn}>08 / 13</span>
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
      <span className={s.sn}>09 / 13</span>
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
      <span className={s.sn}>10 / 13</span>
    </section>

    {/* 11 — GEOGRAPHY */}
    <section className={s.slide}>
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <p className={`${s.labelAccent} mb-3`}>Coverage</p>
        <h2 className={`${s.hlg} mb-10`}>Korea-native. <span className={s.grad}>Asia-wide reach.</span></h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
        <div className={`${s.card} mt-8 text-center`}>
          <p className={`${s.label} mb-3`}>Offices</p>
          <div className="flex justify-center gap-10 flex-wrap">
            <div><div className={s.hsm}>Seoul, South Korea</div><p className={s.bodySm}>Headquarters</p></div>
            <div><div className={s.hsm}>Singapore</div><p className={s.bodySm}>Southeast Asia Hub</p></div>
          </div>
        </div>
      </div>
      <span className={s.sn}>11 / 13</span>
    </section>

    {/* 12 — TEAM */}
    <section className={s.slide}>
      <div className={s.glow} style={{ background: "#a78bfa", top: "-20%", left: "20%" }} />
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <p className={`${s.labelAccent} mb-3`}>Team</p>
        <h2 className={`${s.hlg} mb-3`}>Built by operators, <span className={s.grad}>not consultants.</span></h2>
        <p className={`${s.bodyLg} max-w-3xl mb-10`}>Every member has lived inside the Korean crypto ecosystem — operating exchanges, managing communities, running campaigns, and navigating regulations firsthand.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {([["D","David","Chief Executive Officer"],["B","Bennet","Chief Operating Officer"],["J","J","Chief Marketing Officer"]] as const).map(([i,n,r])=>(
            <div key={n} className={`${s.card} text-center`}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#c084fc] mx-auto mb-4 flex items-center justify-center text-xl font-extrabold">{i}</div>
              <div className={s.hsm}>{n}</div>
              <p className={s.bodySm}>{r}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {([["Kevin","Head of BD"],["Suki","Managing Partner"],["Lewis","PR Manager"],["Hyukjae","BD Manager"]] as const).map(([n,r])=>(
            <div key={n} className={`${s.cardSm} text-center`}>
              <div className={s.hsm}>{n}</div>
              <p className={s.bodySm}>{r}</p>
            </div>
          ))}
        </div>
        <div className={`${s.card} mt-8 text-center`} style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.03), transparent)" }}>
          <p className={s.body}><strong className="text-white">10+ operators</strong> across strategy, BD, community, PR, research, design, and compliance. Currently hiring <strong className="text-[#a78bfa]">Researchers</strong> and <strong className="text-[#a78bfa]">Growth Managers</strong>.</p>
        </div>
      </div>
      <span className={s.sn}>12 / 13</span>
    </section>

    {/* 13 — CTA */}
    <section className={s.slide} style={{ alignItems: "center", textAlign: "center" }}>
      <div className={s.glow} style={{ background: "#a78bfa", top: "40%", left: "50%", transform: "translateX(-50%)" }} />
      <div className="relative z-10">
        <img src={logo} alt="ium Labs" className="w-12 h-12 rounded-[14px] mx-auto mb-6" />
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
      <span className={s.sn}>13 / 13</span>
    </section>
  </div>
);

export default PitchDeck;
