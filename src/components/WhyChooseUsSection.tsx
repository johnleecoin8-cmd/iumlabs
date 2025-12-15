import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import teamPhoto from '@/assets/team-photo.png';
import coindeskLogo from '@/assets/logos/coindesk.png';
import blockmediaLogo from '@/assets/logos/blockmedia-new.png';
import economistLogo from '@/assets/logos/economist.png';
import cointelegraphLogo from '@/assets/logos/cointelegraph.png';
import bloomingbitLogo from '@/assets/logos/bloomingbit.png';
import coinnessLogo from '@/assets/logos/coinness.png';

const mediaLogos = [
  { name: "Cointelegraph", logo: cointelegraphLogo },
  { name: "CoinDesk", logo: coindeskLogo },
  { name: "BlockMedia", logo: blockmediaLogo },
  { name: "TokenPost", logo: "https://miro.medium.com/v2/resize:fill:176:176/1*pCtFs9n-MWMhU133o7trNA.jpeg" },
  { name: "Coinness", logo: coinnessLogo },
  { name: "Bloomingbit", logo: bloomingbitLogo },
  { name: "The Economist", logo: economistLogo }
];

const WhyChooseUsSection = () => {
  return (
    <section className="bg-[#0A0A0A]">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Content */}
        <div className="w-full lg:w-2/3 lg:border-r border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border-r border-b border-white/10 p-0"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={teamPhoto}
                  alt="CryptoBridge Korea Team"
                  className="w-full h-full object-cover object-[center_65%]"
                />
              </div>
            </motion.div>

            {/* About Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 md:p-10 border-b border-white/10 flex flex-col justify-center"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                About Us
              </h2>
              <p className="text-white/50 leading-relaxed mb-4">
                We bridge global Web3 projects to growth in the Korean market. Established in 2025, we've become a trusted partner for 18+ brands.
              </p>
              <p className="text-white font-medium text-sm">
                Founded by former executives from Binance and KuCoin
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-8 md:p-10 flex flex-col justify-center md:col-span-2"
            >
              <p className="text-white/50 text-sm mb-6">
                Ready to enter the Korean market?
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition-colors w-fit"
              >
                GET IN TOUCH
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right: Media Logos */}
        <motion.div
          className="w-full lg:w-1/3 p-8 md:p-12 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-bold text-white mb-2">
            As Featured In
          </h3>
          <p className="text-white/50 text-sm mb-8">
            Trusted by leading Web3 media outlets
          </p>

          <div className="space-y-4">
            {mediaLogos.map((media, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border-b border-white/10 hover:bg-white/5 transition-colors"
              >
                <img
                  src={media.logo}
                  alt={media.name}
                  className="w-8 h-8 object-contain rounded-full"
                />
                <span className="text-white/70 text-sm font-medium">
                  {media.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
