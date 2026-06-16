import danielA from "@/assets/team/david-avatar.jpg";
import minaA from "@/assets/team/mia-avatar.jpg";
import kevinA from "@/assets/team/kevin-bd.jpg";
import sofiaA from "@/assets/team/helen-cm.jpg";
import marcoA from "@/assets/team/alex-avatar.jpg";
import hanaA from "@/assets/team/suki-partner.jpg";
import tomA from "@/assets/team/julian-avatar.jpg";
import leoA from "@/assets/team/james-avatar.jpeg";
import priyaA from "@/assets/team/rachel-design.jpg";
import diegoA from "@/assets/team/kyle-avatar.jpg";
import anyaA from "@/assets/team/j-cmo.jpg";
import samA from "@/assets/team/lewis-pr.jpg";

type Testimonial = {
  name: string;
  role: string;
  color: string;
  avatar: string;
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

// Placeholder testimonials, realistic and Korea-GTM specific, attributed to ium's
// case-study clients. Swap text/name/avatar for real client quotes before launch.
const testimonials: Testimonial[] = [
  { name: "Daniel R.", role: "Growth Lead, peaq", color: C.blue, avatar: danielA, text: "ium had us KBW-ready in three weeks, 6 AMAs, a real Korean community, zero bots. They don't hand you a list, they embed and run it.", time: "16:42" },
  { name: "Mina S.", role: "Head of Marketing, Mantra", color: C.purple, avatar: minaA, text: "Upbit and Bithumb felt out of reach until ium. Listing groundwork plus a Korean KOL rollout in one motion. We finally cracked Korea.", time: "14:18" },
  { name: "Kevin L.", role: "CMO, KuCoin", color: C.green, avatar: kevinA, text: "$150M+ in Korean trading volume off one campaign cycle. They know every KOL, every Kakao group, every Naver play.", time: "19:05" },
  { name: "Sofia T.", role: "Founder, Tria", color: C.orange, avatar: sofiaA, text: "30K Korean wallets in six months. They ran our UA like it was their own runway. gg.", time: "11:50" },
  { name: "Marco B.", role: "Growth, BNB Chain", color: C.pink, avatar: marcoA, text: "A Seoul VIP night that opened institutional rooms we'd chased for a year. ium operates, it doesn't just advise.", time: "13:27" },
  { name: "Hana K.", role: "Partnerships, Sahara AI", color: C.red, avatar: hanaA, text: "The AMAs they ran during KBW were packed. 30K+ organic, Korea-native community, no bots, no filler.", time: "17:33" },
  { name: "Tom A.", role: "VP Marketing, Bybit", color: C.teal, avatar: tomA, text: "Seoul Metro takeover plus a creator push, executed flawlessly. People in Korea still bring it up.", time: "15:12" },
  { name: "Leo M.", role: "CMO, Ondo Finance", color: C.blue, avatar: leoA, text: "RWA is a hard sell anywhere. ium made it land with Korean institutions and retail at the same time.", time: "20:41" },
  { name: "Priya N.", role: "Head of Growth, MegaETH", color: C.purple, avatar: priyaA, text: "Pre-TGE Korea positioning that actually moved mindshare. Sharp team, zero fluff.", time: "12:09" },
  { name: "Diego F.", role: "Founder, FOGO", color: C.green, avatar: diegoA, text: "From no Korea presence to a real launch moment. They embed like cofounders, not vendors.", time: "18:55" },
  { name: "Anya V.", role: "Growth Lead, Story Protocol", color: C.orange, avatar: anyaA, text: "Our IP x Web3 story, localized perfectly for Korea, and tier-1 PR hits to back it. chapeau.", time: "10:27" },
  { name: "Sam W.", role: "CMO, Polygon", color: C.pink, avatar: samA, text: "Hackathons, KOLs, community, one team, one motion. Korea entry without adding headcount.", time: "21:33" },
];

const Card = ({ t }: { t: Testimonial }) => (
  <figure className="relative mr-8 w-[300px] shrink-0 rounded-[20px] border border-white/[0.06] bg-[#121214] p-5 pb-6 transition-colors duration-300 hover:bg-[#161618] sm:w-[330px]">
    <p className="text-[15px] font-semibold leading-tight" style={{ color: t.color }}>
      {t.name}
    </p>
    <p className="mb-3 text-[13px] text-white/35">{t.role}</p>
    <p className="text-[14px] leading-relaxed text-white/85">{t.text}</p>

    {/* avatar hanging off the bottom-left corner */}
    <img
      src={t.avatar}
      alt={t.name}
      className="absolute -bottom-5 left-5 h-12 w-12 rounded-full object-cover ring-4 ring-[#0A0A0A]"
    />

    <span className="absolute bottom-4 right-5 font-mono text-[11px] text-white/25">{t.time}</span>
  </figure>
);

const Track = ({ items, offset = false }: { items: Testimonial[]; offset?: boolean }) => (
  <div
    className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
    style={{ animationDuration: "70s", marginLeft: offset ? "-179px" : undefined }}
  >
    {[...items, ...items].map((t, i) => (
      <Card key={i} t={t} />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const mid = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, mid);
  const row2 = testimonials.slice(mid);

  return (
    <div className="pb-20 md:pb-28">
      <div
        className="group relative flex flex-col gap-14 overflow-hidden pb-12 pt-2"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <Track items={row1} />
        <Track items={row2} offset />
      </div>
    </div>
  );
};

export default TestimonialsSection;
