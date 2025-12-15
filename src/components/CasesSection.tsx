import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

// Project logos
import bnbLogo from "@/assets/logos/bnb.svg";
import storyLogo from "@/assets/logos/story-protocol.png";
import saharaAiLogo from "@/assets/logos/sahara-ai.png";
import mantraLogo from "@/assets/logos/mantra.png";
import peaqLogo from "@/assets/logos/peaq.svg";
import triaLogo from "@/assets/logos/tria-official.png";
import kucoinLogo from "@/assets/logos/kucoin.svg";
import megaethLogo from "@/assets/logos/megaeth.png";
import bybitLogo from "@/assets/logos/bybit.png";
import zkpassLogo from "@/assets/logos/zkpass.png";
import fogoLogo from "@/assets/logos/fogo.png";

const featuredCases = [
  {
    name: "BNB Chain",
    logo: bnbLogo,
    category: "Infrastructure",
    result: "+340%",
    resultLabel: "Community Growth",
    slug: "bnb-chain"
  },
  {
    name: "Story Protocol",
    logo: storyLogo,
    category: "Layer 1",
    result: "2.5M+",
    resultLabel: "Impressions",
    slug: "story-protocol"
  },
  {
    name: "Sahara AI",
    logo: saharaAiLogo,
    category: "AI",
    result: "50K+",
    resultLabel: "New Members",
    slug: "sahara-ai"
  },
  {
    name: "Mantra",
    logo: mantraLogo,
    category: "RWA",
    result: "5x",
    resultLabel: "ROI",
    slug: "mantra"
  },
  {
    name: "Peaq",
    logo: peaqLogo,
    category: "DePIN",
    result: "120%",
    resultLabel: "Engagement",
    slug: "peaq"
  },
  {
    name: "Tria",
    logo: triaLogo,
    category: "Wallet",
    result: "200%",
    resultLabel: "Growth",
    slug: "tria"
  }
];

const additionalLogos = [
  { name: "KuCoin", logo: kucoinLogo },
  { name: "MegaETH", logo: megaethLogo },
  { name: "Bybit", logo: bybitLogo },
  { name: "zkPass", logo: zkpassLogo },
  { name: "FOGO", logo: fogoLogo },
];

const CasesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3;
  const maxIndex = Math.max(0, featuredCases.length - visibleCards);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header - 2 Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          {/* Left - Title */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-mono text-gray-400 mb-4 block">/ PORTFOLIO</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                CryptoBridge
                <br />
                <span className="text-gray-400">×</span> Projects
              </h2>
              <p className="text-gray-500 mt-6 max-w-sm">
                These case studies walk through the challenge, our approach, and the outcomes.
              </p>
              <Link 
                to="/projects"
                className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
              >
                View all projects
                <ExternalLink className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right - Cards Carousel */}
          <div className="lg:col-span-8">
            {/* Navigation */}
            <div className="flex justify-end gap-2 mb-6">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-gray-900" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ArrowRight className="w-5 h-5 text-gray-900" />
              </button>
            </div>

            {/* Cards Container */}
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-4"
                animate={{ x: -currentIndex * (100 / visibleCards + 1.5) + "%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {featuredCases.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    className="flex-shrink-0 w-[calc(33.333%-11px)]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={`/projects/${project.slug}`}>
                      <div className="group bg-gray-50 rounded-2xl p-6 h-[280px] flex flex-col justify-between border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                        {/* Result Badge */}
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                            {project.category}
                          </span>
                          <div className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                            {project.result}
                          </div>
                        </div>

                        {/* Logo */}
                        <div className="flex-1 flex items-center justify-center py-6">
                          <img 
                            src={project.logo} 
                            alt={project.name}
                            className="h-12 md:h-14 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                          />
                        </div>

                        {/* Bottom */}
                        <div className="pt-4 border-t border-gray-200">
                          <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                          <p className="text-sm text-gray-500">{project.resultLabel}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom - Additional Logos Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-12 border-t border-gray-100"
        >
          <div className="flex items-center justify-between gap-8 overflow-hidden">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider whitespace-nowrap">
              More Clients
            </span>
            <div className="flex items-center gap-12 overflow-x-auto scrollbar-hide">
              {additionalLogos.map((client) => (
                <img
                  key={client.name}
                  src={client.logo}
                  alt={client.name}
                  className="h-6 md:h-8 object-contain grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300 flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CasesSection;
