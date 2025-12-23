import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";
import useScrollReveal from "@/hooks/useScrollReveal";

const Privacy = () => {
  usePageTitle("Privacy Policy");
  useScrollReveal();

  const sections = [
    { title: "1. Information We Collect", content: "We collect information you provide directly to us, including name, email address, company information, and project details when you contact us or use our services." },
    { title: "2. How We Use Your Information", content: "We use the information we collect to provide, maintain, and improve our services, communicate with you, and send you updates about our services." },
    { title: "3. Information Sharing", content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law." },
    { title: "4. Data Security", content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction." },
    { title: "5. Cookies", content: "We may use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser." },
    { title: "6. Your Rights", content: "You have the right to access, correct, or delete your personal information. Contact us at info@iumlabs.com for any privacy-related requests." },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero Section */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-[#0A0A0A]">
        <section className="relative min-h-[50vh] flex flex-col justify-center items-center overflow-hidden rounded-xl sm:rounded-2xl bg-[#0F0F0F]">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-transparent to-purple-500/5" />
          
          <div className="container mx-auto max-w-7xl px-4 relative z-10 text-center">
            <motion.span 
              className="text-xs text-violet-400/70 mb-6 block tracking-widest"
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
              Priv<span className="serif-italic text-violet-400">a</span>cy
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
              <h2 className="text-lg md:text-xl font-medium text-white">Privacy Policy</h2>
            </div>
            <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">
              Your Data Rights
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

export default Privacy;