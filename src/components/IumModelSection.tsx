import { Building2, CircleDollarSign, Vault, Trophy, Store, Brain, Repeat, Target, Handshake } from "lucide-react";
import { Link } from "react-router-dom";

type Item = {
  icon: typeof Building2;
  title: string;
  desc: string;
  tag?: string;
  href?: string;
};

type Group = {
  eyebrow: string;
  title: string;
  sub: string;
  items: Item[];
};

const tagColor: Record<string, string> = {
  New: "#C084FC",
  Live: "#34D399",
  Building: "#94A3B8",
  Flagship: "#FBBF24",
};

const groups: Group[] = [
  {
    eyebrow: "HOW WE PARTNER",
    title: "We partner on the upside — not just bill hours.",
    sub: "Across 18+ Korea launches a year, we'd rather own a slice of the outcome than send an invoice. Choose the model that fits.",
    items: [
      { icon: Repeat, title: "Retainer", desc: "Classic monthly engagement for defined scope and ongoing execution." },
      { icon: Target, title: "Performance-Linked", desc: "Fees tied to real Korea KPIs — trading volume, holders, mindshare." },
      { icon: Handshake, title: "Equity & Token Partnership", desc: "We take a stake and grow with you. Aligned incentives, not vendor billing.", tag: "Flagship" },
    ],
  },
  {
    eyebrow: "PLATFORMS & DATA",
    title: "Our edge isn't services — it's proprietary data.",
    sub: "We don't rent the network; we own it. AI-powered platforms competitors can't copy, powering every campaign we run.",
    items: [
      { icon: Trophy, title: "K-Leaderboard", desc: "Live ranking of Korea's crypto projects by mindshare — our flagship public data product.", tag: "Live", href: "/k-leaderboard" },
      { icon: Store, title: "KOL Marketplace", desc: "Self-serve access to our 230+ vetted Korean KOL network — book campaigns programmatically.", tag: "Building" },
      { icon: Brain, title: "AI Ops & Mindshare", desc: "AI agents for 24/7 Korean community, content localization, and mindshare + on-chain monitoring.", tag: "Building" },
    ],
  },
  {
    eyebrow: "2026 CATALYSTS · ISSUANCE & TREASURY",
    title: "First to package Korea's next wave.",
    sub: "The 2026 catalysts no one has productized yet — issuance and treasury, built on our compliance and capital muscle.",
    items: [
      { icon: Building2, title: "RWA / STO Advisory", desc: "Tokenize and issue real-world assets and security tokens under Korea's emerging STO framework.", tag: "New" },
      { icon: CircleDollarSign, title: "Won-Stablecoin Advisory", desc: "Position for the KRW-stablecoin opening — the single biggest structural catalyst of 2026.", tag: "New" },
      { icon: Vault, title: "Corporate Treasury (DAT)", desc: "Digital-asset treasury strategy for Korean corporates as Phase-2 market access opens.", tag: "New" },
    ],
  },
];

const ModelCard = ({ item }: { item: Item }) => {
  const Icon = item.icon;
  const tc = item.tag ? tagColor[item.tag] ?? "#C084FC" : undefined;
  const inner = (
    <div className="group h-full rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 p-5 sm:p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center border"
          style={{ backgroundColor: "#C084FC14", borderColor: "#C084FC2A" }}
        >
          <Icon className="w-5 h-5" style={{ color: "#C084FC" }} />
        </div>
        {item.tag && (
          <span
            className="text-[10px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full"
            style={{ color: tc, backgroundColor: `${tc}14`, border: `1px solid ${tc}2A` }}
          >
            {item.tag}
          </span>
        )}
      </div>
      <h4 className="text-base sm:text-lg font-semibold text-white mb-1.5 tracking-[-0.01em]">
        {item.title}
      </h4>
      <p className="text-[13px] text-white/50 leading-relaxed">{item.desc}</p>
    </div>
  );
  return item.href ? (
    <Link to={item.href} onClick={() => window.scrollTo(0, 0)} className="block h-full">
      {inner}
    </Link>
  ) : (
    inner
  );
};

const IumModelSection = () => {
  return (
    <div className="px-5 sm:px-6 lg:px-10 pb-10 sm:pb-14 pt-4 space-y-10 sm:space-y-12">
      {groups.map((g) => (
        <div key={g.eyebrow}>
          <div className="flex items-center gap-3 mb-1.5">
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[#C084FC]/70">
              {g.eyebrow}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
          </div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white tracking-[-0.02em]">
            {g.title}
          </h3>
          <p className="mt-1 mb-5 text-[13px] sm:text-sm text-white/45 leading-relaxed max-w-2xl">
            {g.sub}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {g.items.map((item) => (
              <ModelCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IumModelSection;
