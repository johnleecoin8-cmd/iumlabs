import { motion } from 'framer-motion';

const cards = [
  {
    title: 'Korea-Native Team',
    points: [
      '25+ team members based in Seoul',
      'Native Korean speakers managing your community',
      'Not outsourced, not remote — we\'re on the ground',
    ],
  },
  {
    title: 'Execution Speed',
    points: [
      '19+ projects launched in under 12 months',
      'Average campaign goes live in 5 business days',
      '24/7 community management across time zones',
    ],
  },
  {
    title: 'Measurable Results',
    points: [
      '$7B+ combined client valuation',
      '170+ KOL network activated per campaign',
      'Every campaign comes with ROI reporting',
    ],
  },
];

const clients = 'BNB Chain · Bybit · KuCoin · Polygon · Mantra · Aptos';

const WhyChooseUsSection = () => (
  <section className="bg-[#0A0A0A] py-20 sm:py-28 lg:py-32">
    <div className="container mx-auto px-6 sm:px-10 md:px-16 lg:px-20 max-w-6xl">
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        Why ium Labs
      </motion.h2>

      <motion.p
        className="mt-5 text-white/50 text-base sm:text-lg max-w-2xl leading-relaxed"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        Most agencies sell you a slide deck and disappear. We operate from Seoul
        with a full in-house team — strategy, KOL, community, PR, events — so
        nothing gets lost in translation or timezone gaps.
      </motion.p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            className="rounded-xl border border-white/10 bg-[#111] p-6 sm:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">{card.title}</h3>
            <ul className="space-y-2.5">
              {card.points.map((pt) => (
                <li key={pt} className="text-sm text-white/50 leading-relaxed">
                  — {pt}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-14 text-center text-sm text-white/30 tracking-widest"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {clients}
      </motion.p>
    </div>
  </section>
);

export default WhyChooseUsSection;
