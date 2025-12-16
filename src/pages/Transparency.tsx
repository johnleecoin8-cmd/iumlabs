import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Transparency = () => {
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
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Transparency
          </motion.h1>
          <motion.p 
            className="text-white/50 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Last updated: December 2024
          </motion.p>
          
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
                <h2 className="text-xl font-semibold text-white mb-3">{section.title}</h2>
                <p className="text-white/60 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Transparency;