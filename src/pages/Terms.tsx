import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";
import useScrollReveal from "@/hooks/useScrollReveal";

const Terms = () => {
  usePageTitle("Terms of Service");
  useScrollReveal();

  const sections = [
    { title: "1. Agreement to Terms", content: "By accessing and using Ium Labs' services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services." },
    { title: "2. Services", content: "Ium Labs provides Web3 marketing and consulting services including but not limited to Go-To-Market strategy, community management, influencer marketing, and PR services for blockchain and cryptocurrency projects." },
    { title: "3. User Responsibilities", content: "Users agree to provide accurate information when using our services and to comply with all applicable laws and regulations in their jurisdiction." },
    { title: "4. Intellectual Property", content: "All content, trademarks, and intellectual property on this website are owned by Ium Labs unless otherwise stated." },
    { title: "5. Limitation of Liability", content: "Ium Labs shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services." },
    { title: "6. Contact", content: "For questions about these Terms, please contact us at info@iumlabs.com." },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero Section */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-[#0A0A0A]">
        <section className="relative min-h-[50vh] flex flex-col justify-center items-center overflow-hidden rounded-xl sm:rounded-2xl bg-[#0F0F0F]">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-cyan-500/5" />
          
          <div className="container mx-auto max-w-7xl px-4 relative z-10 text-center">
            <motion.span 
              className="text-xs text-blue-400/70 mb-6 block tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              [ Legal ]
            </motion.span>
            <motion.h1 
              className="text-[10vw] md:text-[80px] lg:text-[100px] font-light text-white leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Te<span className="serif-italic text-blue-400">r</span>ms
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
              <h2 className="text-lg md:text-xl font-medium text-white">Terms of Service</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">
              Service Agreement
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

export default Terms;