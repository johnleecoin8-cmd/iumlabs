import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Brain, TrendingUp, Building2, Globe } from "lucide-react";

const segments = [
  {
    id: "l1l2",
    num: "01",
    icon: Layers,
    label: "L1/L2",
    title: "Global L1/L2 Protocols",
    desc: "Technically proven chains that need Korean community firepower and retail awareness. The biggest share of our client base.",
    needs: ["Developer ecosystem expansion", "Exchange listing preparation", "Mass retail holder acquisition"],
    clients: ["BNB Chain", "Aptos", "Polygon"],
    accent: "#3B82F6",
  },
  {
    id: "ai",
    num: "02",
    icon: Brain,
    label: "AI & DePIN",
    title: "AI & DePIN Innovators",
    desc: "Complex tech stacks that need to be communicated in a way that's accessible and compelling to Korean retail. Early narrative capture is everything.",
    needs: ["Deep Research narrative building", "Tech-focused KOL partnerships", "Korean market narrative seeding"],
    clients: ["Sahara AI", "Kite AI"],
    accent: "#A78BFA",
  },
  {
    id: "defi",
    num: "03",
    icon: TrendingUp,
    label: "DeFi & RWA",
    title: "High-Liquidity DeFi & RWA",
    desc: "Finance-oriented protocols targeting Korea's high-net-worth and sophisticated investor base. On-chain data meets compliance.",
    needs: ["On-chain data-driven marketing", "Regulatory compliance guidance", "High-trust media exposure"],
    clients: ["Ondo Finance", "SynFutures"],
    accent: "#22C55E",
  },
  {
    id: "cex",
    num: "04",
    icon: Building2,
    label: "Global CEXs",
    title: "Global Exchanges",
    desc: "Our team's exchange background (Binance, KuCoin, Upbit) makes this our strongest domain. We've sat on the other side of the listing table.",
    needs: ["Korean user acquisition", "Local community operations", "Offline event planning"],
    clients: ["Bybit", "KuCoin"],
    accent: "#F59E0B",
  },
  {
    id: "web2",
    num: "05",
    icon: Globe,
    label: "Web2→Web3",
    title: "Web2-to-Web3 Enterprise",
    desc: "Korean corporates and mid-size IT firms launching blockchain businesses. GTM strategy from zero to community.",
    needs: ["GTM strategy development", "Global project partnership matching", "Initial community building"],
    clients: ["Enterprise clients"],
    accent: "#EC4899",
  },
];

const ClientSegments = () => {
  const [active, setActive] = useState(0);
  const seg = segments[active];

  return (
    <section className="sm:px-4 sm:pt-3 snap-start">
      <div className="sm:rounded-3xl overflow-hidden bg-[#111] border border-white/[0.06]">
        <div className="px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10 pb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Our Clients</h2>
        </div>

        <div className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
          {/* Tab pills */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
            {segments.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium whitespace-nowrap
                    transition-all duration-300 flex-shrink-0 border
                    ${isActive
                      ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                      : "bg-white/[0.03] text-white/40 border-white/[0.06] hover:bg-white/[0.06] hover:text-white/60"
                    }
                  `}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={seg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mt-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <div className="grid md:grid-cols-[1fr_300px] gap-0">
                {/* Left: main content */}
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-[10px] font-mono font-bold tracking-wider"
                      style={{ color: seg.accent }}
                    >
                      {seg.num}
                    </span>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                      {seg.title}
                    </h3>
                  </div>

                  <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                    {seg.desc}
                  </p>

                  {/* Needs */}
                  <div className="space-y-2.5">
                    {seg.needs.map((need, i) => (
                      <motion.div
                        key={need}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.25 }}
                        className="flex items-center gap-3"
                      >
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: seg.accent }}
                        />
                        <span className="text-white/60 text-xs sm:text-sm">{need}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right: client names */}
                <div className="border-t md:border-t-0 md:border-l border-white/[0.06] p-6 sm:p-8 flex flex-col justify-center"
                  style={{ background: `linear-gradient(135deg, ${seg.accent}08, transparent)` }}
                >
                  <p className="text-[9px] text-white/25 uppercase tracking-[0.2em] mb-4 font-mono">
                    Representative
                  </p>
                  <div className="space-y-3">
                    {seg.clients.map((client, i) => (
                      <motion.div
                        key={client}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.06, duration: 0.25 }}
                        className="text-white font-semibold text-base sm:text-lg tracking-tight"
                      >
                        {client}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ClientSegments;
