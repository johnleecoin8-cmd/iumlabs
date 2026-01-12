import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, MessageCircle, Twitter, Crown, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  slug: string;
  rank: number;
  mindshare_score: number;
  previous_score: number;
  category: string;
  logo_url: string | null;
  telegram_mentions_24h: number | null;
  twitter_mentions: number | null;
  website_url: string | null;
  twitter_url: string | null;
}

interface ProjectSpotlightProps {
  project: Project;
  rank: number;
}

const ProjectSpotlight = ({ project, rank }: ProjectSpotlightProps) => {
  const trend = project.mindshare_score - project.previous_score;
  const trendPercent = project.previous_score > 0 
    ? ((trend / project.previous_score) * 100).toFixed(1) 
    : '0.0';
  const isPositive = trend >= 0;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        className="relative h-full flex flex-col justify-between p-8 lg:p-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80" />
        
        {/* Accent Glow */}
        <div 
          className={`
            absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20
            ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}
          `}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          
          {/* Top Section: Rank Badge & Category */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                {rank === 1 && <Crown className="w-4 h-4 text-amber-400" />}
                <span className="text-xs font-mono uppercase tracking-wider text-white/60">
                  Rank #{rank}
                </span>
              </div>
              <div className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
                <span className="text-xs font-medium uppercase tracking-wider text-primary">
                  {project.category}
                </span>
              </div>
            </div>

            {/* External Links */}
            <div className="flex items-center gap-2">
              {project.twitter_url && (
                <a 
                  href={project.twitter_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Twitter className="w-4 h-4 text-white/60" />
                </a>
              )}
              {project.website_url && (
                <a 
                  href={project.website_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-white/60" />
                </a>
              )}
            </div>
          </div>

          {/* Middle Section: Project Name & Logo */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div 
              className="flex items-center gap-6 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {project.logo_url && (
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-white/5 border border-white/10 p-3 flex items-center justify-center">
                  <img 
                    src={project.logo_url} 
                    alt={project.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight">
                  {project.name}
                </h2>
                <p className="text-white/40 text-sm mt-1 uppercase tracking-wider">
                  ${project.slug.toUpperCase()}
                </p>
              </div>
            </motion.div>

            {/* Mindshare Score - Hero Number */}
            <motion.div 
              className="mb-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xs font-medium uppercase tracking-widest text-white/40 mb-2">
                Mindshare Score
              </p>
              <div className="flex items-baseline gap-4">
                <span className="text-7xl lg:text-8xl xl:text-9xl font-bold text-white tabular-nums">
                  {project.mindshare_score.toFixed(0)}
                </span>
                <div className={`
                  flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium
                  ${isPositive 
                    ? 'bg-emerald-500/10 text-emerald-400' 
                    : 'bg-rose-500/10 text-rose-400'
                  }
                `}>
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{isPositive ? '+' : ''}{trendPercent}%</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section: Social Metrics */}
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-blue-400" />
                <span className="text-xs uppercase tracking-wider text-white/40">
                  Telegram 24h
                </span>
              </div>
              <p className="text-2xl font-bold text-white tabular-nums">
                {project.telegram_mentions_24h?.toLocaleString() || '—'}
              </p>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Twitter className="w-4 h-4 text-sky-400" />
                <span className="text-xs uppercase tracking-wider text-white/40">
                  Twitter Mentions
                </span>
              </div>
              <p className="text-2xl font-bold text-white tabular-nums">
                {project.twitter_mentions?.toLocaleString() || '—'}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectSpotlight;
