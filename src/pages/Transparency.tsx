import Navbar from "@/components/Navbar";
import GlobalContactFooter from "@/components/GlobalContactFooter";
import { usePageMeta } from "@/hooks/usePageMeta";

const Transparency = () => {
  usePageMeta(
    "Transparency",
    "Our commitment to transparency in business practices and client relationships. Ium Labs operates with honesty and clear communication.",
    "/transparency"
  );

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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Transparency
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
      <GlobalContactFooter />
    </div>
  );
};

export default Transparency;
