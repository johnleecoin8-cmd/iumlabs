type Testimonial = {
  name: string;
  role: string;
  color: string;
  grad: string;
  seed: string;
  text: string;
  time: string;
};

// Name colours mirror the reference (varied per card).
const C = {
  blue: "#5b8def",
  purple: "#a974f0",
  green: "#42c057",
  orange: "#e8915b",
  pink: "#e06a9a",
  red: "#e5564b",
  teal: "#37c2c9",
};

// Placeholder testimonials — realistic, Korea-GTM specific, attributed to ium's
// case-study clients. Swap text/name/avatar for real client quotes before launch.
const testimonials: Testimonial[] = [
  { name: "Daniel R.", role: "Growth Lead, peaq", color: C.blue, grad: "linear-gradient(135deg,#5b8def,#37c2c9)", seed: "danielr", text: "ium had us KBW-ready in three weeks — 6 AMAs, a real Korean community, zero bots. They don't hand you a list, they embed and run it.", time: "16:42" },
  { name: "Mina S.", role: "Head of Marketing, Mantra", color: C.purple, grad: "linear-gradient(135deg,#a974f0,#e06a9a)", seed: "minas", text: "Upbit and Bithumb felt out of reach until ium. Listing groundwork plus a Korean KOL rollout in one motion. We finally cracked Korea.", time: "14:18" },
  { name: "Kevin L.", role: "CMO, KuCoin", color: C.green, grad: "linear-gradient(135deg,#42c057,#37c2c9)", seed: "kevinl", text: "50K+ Korean users in a single campaign cycle. They know every KOL, every Kakao group, every Naver play.", time: "19:05" },
  { name: "Sofia T.", role: "Founder, Tria", color: C.orange, grad: "linear-gradient(135deg,#e8915b,#e5564b)", seed: "sofiat", text: "30K Korean wallets in six months. They ran our UA like it was their own runway. gg.", time: "11:50" },
  { name: "Marco B.", role: "Growth, BNB Chain", color: C.pink, grad: "linear-gradient(135deg,#e06a9a,#a974f0)", seed: "marcob", text: "15M+ Korean impressions and a community we still talk to daily. ium operates, it doesn't just advise.", time: "13:27" },
  { name: "Hana K.", role: "Partnerships, Sahara AI", color: C.red, grad: "linear-gradient(135deg,#e5564b,#e8915b)", seed: "hanak", text: "The AMAs they ran during KBW were packed. 30K+ organic, Korea-native community — no bots, no filler.", time: "17:33" },
  { name: "Tom A.", role: "VP Marketing, Bybit", color: C.teal, grad: "linear-gradient(135deg,#37c2c9,#5b8def)", seed: "toma", text: "Seoul Metro takeover plus a creator push, executed flawlessly. People in Korea still bring it up.", time: "15:12" },
  { name: "Leo M.", role: "CMO, Ondo Finance", color: C.blue, grad: "linear-gradient(135deg,#5b8def,#a974f0)", seed: "leom", text: "RWA is a hard sell anywhere. ium made it land with Korean institutions and retail at the same time.", time: "20:41" },
  { name: "Priya N.", role: "Head of Growth, MegaETH", color: C.purple, grad: "linear-gradient(135deg,#a974f0,#5b8def)", seed: "priyan", text: "Pre-TGE Korea positioning that actually moved mindshare. Sharp team, zero fluff.", time: "12:09" },
  { name: "Diego F.", role: "Founder, FOGO", color: C.green, grad: "linear-gradient(135deg,#42c057,#a8d44a)", seed: "diegof", text: "From no Korea presence to a real launch moment. They embed like cofounders, not vendors.", time: "18:55" },
  { name: "Anya V.", role: "Growth Lead, Story Protocol", color: C.orange, grad: "linear-gradient(135deg,#e8915b,#f0c14b)", seed: "anyav", text: "Our IP × Web3 story, localized perfectly for Korea — and tier-1 PR hits to back it. chapeau.", time: "10:27" },
  { name: "Sam W.", role: "CMO, Polygon", color: C.pink, grad: "linear-gradient(135deg,#e06a9a,#e5564b)", seed: "samw", text: "Hackathons, KOLs, community — one team, one motion. Korea entry without adding headcount.", time: "21:33" },
];

const Card = ({ t, connect = false }: { t: Testimonial; connect?: boolean }) => (
  <figure className="relative mr-8 w-[330px] shrink-0 rounded-[20px] border border-white/[0.06] bg-[#121214] p-5 pb-6">
    <p className="text-[15px] font-semibold leading-tight" style={{ color: t.color }}>
      {t.name}
    </p>
    <p className="mb-3 text-[13px] text-white/35">{t.role}</p>
    <p className="text-[14px] leading-relaxed text-white/85">{t.text}</p>

    {/* avatar hanging off the bottom-left corner — real photo when available, gradient fallback */}
    <span
      className="absolute -bottom-5 -left-4 block h-12 w-12 overflow-hidden rounded-full ring-4 ring-[#0A0A0A]"
      style={{ background: t.grad }}
    >
      <img
        src={`https://i.pravatar.cc/100?u=ium-${t.seed}`}
        alt={t.name}
        loading="lazy"
        className="h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </span>

    <span className="absolute bottom-4 right-5 font-mono text-[11px] text-white/25">{t.time}</span>

    {/* green thread connecting down to the offset row below */}
    {connect && (
      <svg
        className="pointer-events-none absolute left-[-150px] top-full h-[60px] w-[190px]"
        viewBox="0 0 190 60"
        fill="none"
        aria-hidden="true"
      >
        <path d="M178 6 C 150 6, 120 54, 78 54 L 20 54" stroke="#3fb950" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="54" r="2.5" fill="#3fb950" fillOpacity="0.7" />
      </svg>
    )}
  </figure>
);

const Track = ({ items, offset = false, connect = false }: { items: Testimonial[]; offset?: boolean; connect?: boolean }) => (
  <div
    className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
    style={{ animationDuration: "70s", marginLeft: offset ? "-179px" : undefined }}
  >
    {[...items, ...items].map((t, i) => (
      <Card key={i} t={t} connect={connect} />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const mid = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, mid);
  const row2 = testimonials.slice(mid);

  return (
    <div className="py-20 md:py-28">
      <h2 className="mb-14 text-center font-display text-4xl font-bold tracking-tight text-white sm:mb-20 sm:text-5xl md:text-6xl">
        Partners are yappin&rsquo;
      </h2>

      <div
        className="group relative flex flex-col gap-14 overflow-hidden pb-12 pt-2"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <Track items={row1} connect />
        <Track items={row2} offset />
      </div>
    </div>
  );
};

export default TestimonialsSection;
