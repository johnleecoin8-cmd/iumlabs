import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";
import useScrollReveal from "@/hooks/useScrollReveal";

const Transparency = () => {
  usePageTitle("Transparency");
  useScrollReveal();

  const sections = [
    { title: "Our Commitment to Transparency", content: "At Ium Labs, we believe in maintaining the highest standards of transparency in all our business operations and client relationships." },
    { title: "Business Practices", content: "We maintain clear and honest communication with all our clients. Our pricing, deliverables, and timelines are always communicated upfront with no hidden fees or surprises." },
    { title: "Disclosure Policy", content: "We clearly disclose all partnerships, sponsorships, and affiliate relationships. All promotional content is appropriately labeled in accordance with applicable regulations." },
    { title: "Conflict of Interest", content: "We disclose any potential conflicts of interest that may arise in our business relationships. Our team operates under strict ethical guidelines to ensure client interests are always prioritized." },
    { title: "Reporting", content: "We provide regular, detailed reports to our clients on campaign performance and outcomes. All metrics and results are reported accurately without manipulation." },
    { title: "Questions", content: "If you have any questions about our transparency practices, please contact us at info@iumlabs.com." },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero Section */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-[#0A0A0A]">
        <section className="relative min-h-[50vh] flex flex-col justify-center items-center overflow-hidden rounded-xl sm:rounded-2xl bg-[#0F0F0F]">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-transparent to-emerald-500/5" />
          
          <div className="container mx-auto max-w-7xl px-4 relative z-10 text-center">
            <motion.span 
              className="text-xs text-teal-400/70 mb-6 block tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              [ Ethics ]
            </motion.span>
            <motion.h1 
              className="text-[8vw] md:text-[70px] lg:text-[90px] font-light text-white leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Transp<span className="serif-italic text-teal-400">a</span>rency
            </motion.h1>
            <motion.p 
              className="text-base text-white/50 max-w-md mx-auto mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Last updated: December 2024
            </motion.p>
          </div>
        </section>
      </main>

      {/* Content Section - 01 홀수 */}
      <section className="scroll-reveal bg-[#0F0F0F]">
        <div className="border-t border-white/10">
          <div className="flex items-baseline justify-between p-6 md:px-10 md:py-6 border-b border-white/10">
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">01</span>
              <h2 className="text-lg md:text-xl font-medium text-white">Our Principles</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">
              How We Operate
            </span>
          </div>
          
          <div className="container mx-auto max-w-4xl px-4 md:px-8 py-12">
            <div className="space-y-6">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/[0.02]"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">{section.title}</h3>
                  <p className="text-white/60 leading-relaxed">{section.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-white/10">
        <Footer />
      </div>
    </div>
  );
};

export default Transparency;