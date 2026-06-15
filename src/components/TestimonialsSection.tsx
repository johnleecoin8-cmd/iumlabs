type Testimonial = {
  name: string;
  role: string;
  initials: string;
  text: string;
  time: string;
};

// Placeholder testimonials — realistic, Korea-GTM specific, attributed to ium's
// case-study clients. Swap the `text`/`name` for real client quotes before launch.
const testimonials: Testimonial[] = [
  {
    name: "Daniel R.",
    role: "Growth Lead, peaq",
    initials: "DR",
    text: "ium had us KBW-ready in three weeks — 6 AMAs, a real Korean community, zero bots. They don't hand you a list, they embed and run it.",
    time: "16:42",
  },
  {
    name: "Mina S.",
    role: "Head of Marketing, Mantra",
    initials: "MS",
    text: "Upbit and Bithumb felt out of reach until ium. Listing groundwork plus a Korean KOL rollout in one motion. We finally cracked Korea.",
    time: "14:18",
  },
  {
    name: "Kevin L.",
    role: "CMO, KuCoin",
    initials: "KL",
    text: "50K+ Korean users in a single campaign cycle. They know every KOL, every Kakao group, every Naver play.",
    time: "19:05",
  },
  {
    name: "Sofia T.",
    role: "Founder, Tria",
    initials: "ST",
    text: "30K Korean wallets in six months. They ran our UA like it was their own runway. gg.",
    time: "11:50",
  },
  {
    name: "Marco B.",
    role: "Growth, BNB Chain",
    initials: "MB",
    text: "15M+ Korean impressions and a community we still talk to daily. ium operates, it doesn't just advise.",
    time: "13:27",
  },
  {
    name: "Hana K.",
    role: "Partnerships, Sahara AI",
    initials: "HK",
    text: "The AMAs they ran during KBW were packed. 30K+ organic, Korea-native community — no bots, no filler.",
    time: "17:33",
  },
  {
    name: "Tom A.",
    role: "VP Marketing, Bybit",
    initials: "TA",
    text: "Seoul Metro takeover plus a creator push, executed flawlessly. People in Korea still bring it up.",
    time: "15:12",
  },
  {
    name: "Leo M.",
    role: "CMO, Ondo Finance",
    initials: "LM",
    text: "RWA is a hard sell anywhere. ium made it land with Korean institutions and retail at the same time.",
    time: "20:41",
  },
  {
    name: "Priya N.",
    role: "Head of Growth, MegaETH",
    initials: "PN",
    text: "Pre-TGE Korea positioning that actually moved mindshare. Sharp team, zero fluff.",
    time: "12:09",
  },
  {
    name: "Diego F.",
    role: "Founder, FOGO",
    initials: "DF",
    text: "From no Korea presence to a real launch moment. They embed like cofounders, not vendors.",
    time: "18:55",
  },
  {
    name: "Anya V.",
    role: "Growth Lead, Story Protocol",
    initials: "AV",
    text: "Our IP × Web3 story, localized perfectly for Korea — and tier-1 PR hits to back it. chapeau.",
    time: "10:27",
  },
  {
    name: "Sam W.",
    role: "CMO, Polygon",
    initials: "SW",
    text: "Hackathons, KOLs, community — one team, one motion. Korea entry without adding headcount.",
    time: "21:33",
  },
];

const Card = ({ t }: { t: Testimonial }) => (
  <figure className="mr-5 w-[300px] shrink-0 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.05]">
    <figcaption className="mb-3">
      <p className="text-sm font-semibold text-[hsl(var(--brand))]">{t.name}</p>
      <p className="text-xs text-white/40">{t.role}</p>
    </figcaption>
    <blockquote className="text-sm leading-relaxed text-white/80">{t.text}</blockquote>
    <div className="mt-4 flex items-center justify-between">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] text-[10px] font-semibold text-white/55">
        {t.initials}
      </span>
      <span className="font-mono text-[10px] text-white/25">{t.time}</span>
    </div>
  </figure>
);

const Row = ({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) => (
  <div
    className="group flex overflow-hidden"
    style={{
      maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
      WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
    }}
  >
    <div
      className={`flex shrink-0 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
      style={{ animationDuration: "75s" }}
    >
      {[...items, ...items].map((t, i) => (
        <Card key={i} t={t} />
      ))}
    </div>
  </div>
);

const TestimonialsSection = () => {
  const mid = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, mid);
  const row2 = testimonials.slice(mid);

  return (
    <div className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-white/30">03</span>
          <span className="text-xs uppercase tracking-[0.25em] text-white/40">Testimonials</span>
        </div>
        <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
          What our <span className="text-white/40">partners say.</span>
        </h2>
      </div>

      <div className="mt-12 space-y-5 md:mt-16">
        <Row items={row1} />
        <Row items={row2} reverse />
      </div>
    </div>
  );
};

export default TestimonialsSection;
