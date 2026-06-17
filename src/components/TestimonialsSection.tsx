import avPeaq from "@/assets/team/x/peaq.jpg";
import avMantra from "@/assets/team/x/mantra.jpg";
import avKucoin from "@/assets/team/x/kucoin.jpg";
import avTria from "@/assets/team/x/tria.jpg";
import avBnb from "@/assets/team/x/bnb.jpg";
import avSahara from "@/assets/team/x/sahara.jpg";
import avBybit from "@/assets/team/x/bybit.jpg";
import avOndo from "@/assets/team/x/ondo.jpg";
import avMega from "@/assets/team/x/mega.jpg";
import avFogo from "@/assets/team/x/fogo.jpg";
import avStory from "@/assets/team/x/story.jpg";
import avPolygon from "@/assets/team/x/polygon.jpg";
import { useIsMobile } from "@/hooks/use-mobile";

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

// Testimonials from ium case-study clients. Real companies, anonymised individuals.
// Avatars are Web3 PFPs (real X/Twitter NFT/character PFPs where available, pixel-art
// crypto PFPs otherwise) — no real-person photos.
const testimonials: Testimonial[] = [
  { name: "Martin", role: "CBO, peaq", color: C.blue, avatar: avPeaq, text: "ium Labs는 진정한 한국 로컬 에코 시스템 파트너다.", time: "16:42" },
  { name: "Mina S.", role: "Head of Marketing, MANTRA", color: C.purple, avatar: avMantra, text: "Upbit and Bithumb felt out of reach until ium. Listing groundwork plus a Korean KOL rollout in one motion. We finally cracked Korea.", time: "14:18" },
  { name: "Kevin L.", role: "CMO, KuCoin", color: C.green, avatar: avKucoin, text: "$150M+ in Korean trading volume off one campaign cycle. They know every KOL, every Kakao group, every Naver play.", time: "19:05" },
  { name: "Sofia T.", role: "Founder, Tria", color: C.orange, avatar: avTria, text: "30K Korean wallets in six months. They ran our UA like it was their own runway. gg.", time: "11:50" },
  { name: "Marco B.", role: "Growth, BNB Chain", color: C.pink, avatar: avBnb, text: "A Seoul VIP night that opened institutional rooms we'd chased for a year. ium operates, it doesn't just advise.", time: "13:27" },
  { name: "Hana K.", role: "Partnerships, Sahara AI", color: C.red, avatar: avSahara, text: "The AMAs they ran during KBW were packed. 30K+ organic, Korea-native community, no bots, no filler.", time: "17:33" },
  { name: "Tom A.", role: "Head of Global BD, Bybit", color: C.teal, avatar: avBybit, text: "Seoul Metro takeover plus a creator push, executed flawlessly. People in Korea still bring it up.", time: "15:12" },
  { name: "Leo M.", role: "CMO, Ondo Finance", color: C.blue, avatar: avOndo, text: "RWA is a hard sell anywhere. ium made it land with Korean institutions and retail at the same time.", time: "20:41" },
  { name: "Priya N.", role: "Head of Growth, MegaETH", color: C.purple, avatar: avMega, text: "Pre-TGE Korea positioning that actually moved mindshare. Sharp team, zero fluff.", time: "12:09" },
  { name: "Diego F.", role: "Founder, FOGO", color: C.green, avatar: avFogo, text: "From no Korea presence to a real launch moment. They embed like cofounders, not vendors.", time: "18:55" },
  { name: "Anya V.", role: "Growth Lead, Story Protocol", color: C.orange, avatar: avStory, text: "Our IP x Web3 story, localized perfectly for Korea, and tier-1 PR hits to back it. chapeau.", time: "10:27" },
  { name: "Sam W.", role: "CMO, Polygon", color: C.pink, avatar: avPolygon, text: "Hackathons, KOLs, community, one team, one motion. Korea entry without adding headcount.", time: "21:33" },
];

const Card = ({ t }: { t: Testimonial }) => (
  <figure className="relative mr-8 w-[300px] shrink-0 rounded-[20px] border border-white/[0.06] bg-[#121214] p-5 pb-6 transition-colors duration-300 hover:bg-[#161618] sm:w-[330px]">
    <p className="text-[15px] font-semibold leading-tight" style={{ color: t.color }}>
      {t.name}
    </p>
    <p className="mb-3 text-[13px] text-white/35">{t.role}</p>
    <p className="text-[14px] leading-relaxed text-white/85">{t.text}</p>

    {/* avatar hanging off the bottom-left corner — Web3 PFP, no real-person photos */}
    <img
      src={t.avatar}
      alt={t.name}
      loading="lazy"
      className="absolute -bottom-5 left-5 h-12 w-12 rounded-full object-cover ring-4 ring-[#0A0A0A]"
    />

    <span className="absolute bottom-4 right-5 font-mono text-[11px] text-white/25">{t.time}</span>
  </figure>
);

const Track = ({ items, offset = false, reverse = false }: { items: Testimonial[]; offset?: boolean; reverse?: boolean }) => (
  <div
    className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
    style={{ animationDuration: "58s", marginLeft: offset ? "-179px" : undefined }}
  >
    {[...items, ...items].map((t, i) => (
      <Card key={i} t={t} />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  const rowCount = isMobile ? 3 : 2; // denser 3-row wall on mobile, 2 rows on desktop
  const perRow = Math.ceil(testimonials.length / rowCount);
  const rows = Array.from({ length: rowCount }, (_, r) =>
    testimonials.slice(r * perRow, (r + 1) * perRow)
  );

  return (
    <div className="pb-20 md:pb-28">
      <div
        className="relative flex flex-col gap-8 sm:gap-14 overflow-hidden pb-12 pt-2"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        {rows.map((items, i) => (
          <Track key={i} items={items} offset={i % 2 === 1} reverse={i % 2 === 1} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
