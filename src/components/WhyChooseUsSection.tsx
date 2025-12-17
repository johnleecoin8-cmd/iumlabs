import { motion } from 'framer-motion';
import { ArrowRight, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import teamPhoto from '@/assets/team-photo.png';

const WhyChooseUsSection = () => {
  return (
    <section className="bg-[#0A0A0A] relative overflow-hidden">
      {/* Warm orange gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-coral-500/5 pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 relative">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:border-r border-white/10 relative"
        >
          <div className="aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden relative">
            <img
              src={teamPhoto}
              alt="Ium Labs Team"
              className="w-full h-full object-cover object-[center_65%]"
            />
            {/* Warm gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-transparent" />
            
            {/* Floating badge */}
            <motion.div
              className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-orange-500/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Users className="w-4 h-4 text-orange-400" />
              <span className="text-white text-sm font-medium">Seoul-based Team</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Content */}
        <div className="flex flex-col">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 md:p-12 lg:p-16 flex-1 flex flex-col justify-center border-b border-white/10"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-orange-400" />
              <span className="text-orange-400 text-sm font-medium uppercase tracking-wider">About Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              We Bridge Your Project to <span className="text-orange-400">Korea</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-6">
              We bridge global Web3 projects to growth in the Korean market. Established in 2025, we've become a trusted partner for 18+ brands looking to expand into Korea's dynamic crypto ecosystem.
            </p>
            <p className="text-white font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              Founded by former executives from <span className="text-orange-400">Binance</span> and <span className="text-orange-400">KuCoin</span>
            </p>
          </motion.div>

          {/* Stats + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 md:p-12 lg:p-16"
          >
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="group">
                <p className="text-3xl md:text-4xl font-bold text-orange-400 group-hover:scale-105 transition-transform">18+</p>
                <p className="text-white/50 text-sm">Projects Launched</p>
              </div>
              <div className="group">
                <p className="text-3xl md:text-4xl font-bold text-orange-400 group-hover:scale-105 transition-transform">120+</p>
                <p className="text-white/50 text-sm">KOL Network</p>
              </div>
            </div>

            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-coral-500 text-white px-6 py-3 text-sm font-medium overflow-hidden transition-all duration-300 w-fit shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30"
            >
              {/* Shine effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              GET IN TOUCH
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
