import { Check, X } from "lucide-react";

/**
 * The competitive weapon: every rival (Coinbound, MarketAcross, NinjaPromo,
 * Serotonin) is a global full-service agency. None is Korea-native. This
 * section makes that the whole point — a global agency vs ium, head to head.
 * Pure positioning, no numbers, so it is always honest and always on-message.
 */
const GLOBAL = [
  "Translate your deck into Korean",
  "Hand you a KOL list and step back",
  "Can't read Naver, Kakao, or DC Inside",
  "Report impressions and reach",
  "Learn the Korean market on your budget",
];

const IUM = [
  "Rewrite the narrative for how Korea actually buys",
  "Embed operators who trade and post here daily",
  "Live on Naver, Kakao Open Chat, and Telegram",
  "Report funded users, deposits, and trading volume",
  "Already know the market, the exchanges, the regulators",
];

const ComparisonSection = () => (
  <section className="bg-[#0A0A0A] px-5 sm:px-6 lg:px-10 py-20 sm:py-28">
    <div className="max-w-6xl mx-auto">
      <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/35">
        Global agency, or ium
      </span>
      <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.02] max-w-3xl">
        Everyone else runs Korea from a deck.{" "}
        <span className="text-primary">We run it from the ground.</span>
      </h2>

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        {/* Global agency */}
        <div className="rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-white/[0.015] p-7 sm:p-9">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40 mb-6">
            A global agency
          </p>
          <ul className="space-y-4">
            {GLOBAL.map((item) => (
              <li key={item} className="flex items-start gap-3.5 text-[15px] sm:text-base text-white/45">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.1]">
                  <X className="h-3 w-3 text-white/40" strokeWidth={2.5} />
                </span>
                <span className="tracking-[-0.01em] leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ium */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-primary/25 surface-edge p-7 sm:p-9 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(90% 70% at 90% 0%, hsl(var(--primary) / 0.08), transparent 60%)" }}
          />
          <p className="relative font-mono text-[10px] uppercase tracking-[0.24em] text-primary/90 mb-6">
            ium Labs
          </p>
          <ul className="relative space-y-4">
            {IUM.map((item) => (
              <li key={item} className="flex items-start gap-3.5 text-[15px] sm:text-base text-white/85">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 border border-primary/30">
                  <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                </span>
                <span className="tracking-[-0.01em] leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default ComparisonSection;
