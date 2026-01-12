import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";

const Terms = () => {
  usePageMeta(
    "Terms of Service",
    "Terms of Service for Ium Labs Web3 marketing and consulting services. By using our services, you agree to these terms.",
    "/terms"
  );

  const sections = [
    { title: "1. Agreement to Terms", content: "By accessing and using ium Labs' services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services." },
    { title: "2. Services", content: "ium Labs provides Web3 marketing and consulting services including but not limited to Go-To-Market strategy, community management, influencer marketing, and PR services for blockchain and cryptocurrency projects." },
    { title: "3. User Responsibilities", content: "Users agree to provide accurate information when using our services and to comply with all applicable laws and regulations in their jurisdiction." },
    { title: "4. Intellectual Property", content: "All content, trademarks, and intellectual property on this website are owned by ium Labs unless otherwise stated." },
    { title: "5. Limitation of Liability", content: "ium Labs shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services." },
    { title: "6. Contact", content: "For questions about these Terms, please contact us at info@iumlabs.io." },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-white/50 mb-12">
            Last updated: January 2025
          </p>
          
          <div className="space-y-6">
            {sections.map((section) => (
              <div
                key={section.title}
                className="p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/[0.02]"
              >
                <h2 className="text-xl font-semibold text-white mb-3">{section.title}</h2>
                <p className="text-white/60 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
