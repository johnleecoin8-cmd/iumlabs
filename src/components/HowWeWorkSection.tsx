/**
 * Operating-model manifesto. Built from the exact criteria a Web3 CMO (Binance's
 * Rachel Conlan) named on record: the "do-everything" agency model is dead;
 * agency research is shallower than her interns; one junior juggles ten clients;
 * she wants a small operator shop that treats the brand like its own startup, an
 * extension of the internal team, with real turnaround speed, original thinking,
 * and on-the-ground commitment (she cited a Sunday-night Dubai meetup). Every
 * principle below answers one of those, grounded in what ium already does.
 */
const PRINCIPLES = [
  {
    n: "01",
    title: "Embedded, not spread thin",
    body: "Your brand run like our own startup, by one team that lives in it. Not a junior quietly juggling ten other accounts.",
  },
  {
    n: "02",
    title: "Operators, not account managers",
    body: "Ex-exchange and ex-foundation people who trade, post, and run BD in Korea every day. We came out of the market we sell into.",
  },
  {
    n: "03",
    title: "Research deeper than your interns",
    body: "Primary-sourced Korea intelligence and our own GTM Index, not a catchy-bite deck a four-year-old could have made.",
  },
  {
    n: "04",
    title: "On the ground, at Web3 speed",
    body: "At the Seoul meetup on a Sunday night. Replies in hours, campaigns shipping while a legacy agency is still scheduling the kickoff.",
  },
];

const HowWeWorkSection = () => (
  <section className="bg-[#0A0A0A] px-5 sm:px-6 lg:px-10 py-20 sm:py-28">
    <div className="max-w-6xl mx-auto">
      <div className="max-w-3xl">
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/35">How we work</span>
        <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.02]">
          The &quot;do-everything&quot; agency is dead.{" "}
          <span className="text-primary">We work like the team you&apos;d hire.</span>
        </h2>
        <p className="mt-5 text-[15px] sm:text-lg text-white/55 tracking-[-0.01em] leading-relaxed">
          A small operator shop that treats your launch like its own startup, an extension of your
          internal team, moving at the speed the market actually moves.
        </p>
      </div>

      <div className="mt-12 border-t border-white/[0.1]">
        {PRINCIPLES.map((p) => (
          <div
            key={p.n}
            className="group grid grid-cols-1 lg:grid-cols-[52px_minmax(0,0.82fr)_minmax(0,1.32fr)] gap-3 lg:gap-10 py-8 sm:py-9 border-b border-white/[0.1] transition-colors duration-300 hover:bg-white/[0.015]"
          >
            <span className="font-mono text-sm text-white/25 pt-1.5 group-hover:text-primary transition-colors">{p.n}</span>
            <h3 className="font-display text-xl sm:text-2xl lg:text-[1.9rem] font-bold tracking-[-0.02em] leading-[1.05]">{p.title}</h3>
            <p className="text-[15px] sm:text-base text-white/60 tracking-[-0.01em] leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowWeWorkSection;
