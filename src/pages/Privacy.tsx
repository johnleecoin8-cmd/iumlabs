import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
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
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Privacy Policy
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

export default Privacy;