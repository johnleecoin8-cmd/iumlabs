import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { Check, Quote } from "lucide-react";

interface ProjectChallengeProps {
  challenge: string;
  services: string[];
  strategy: string[];
  glowColor: string;
}

const ProjectChallenge = ({ challenge, services, strategy }: ProjectChallengeProps) => {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          {/* Section Header */}
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono text-muted-foreground">02</span>
              <div className="w-8 h-px bg-border" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Our Approach</h2>
            </div>
            <span className="hidden md:inline-flex px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground border border-white/10 rounded-full">
              Strategy
            </span>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Challenge Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 md:p-8 rounded-xl bg-white/[0.02] border border-white/[0.06]"
            >
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-medium">
                The Challenge
              </h3>
              <p className="text-lg md:text-xl text-foreground leading-relaxed">{challenge}</p>
            </motion.div>

            {/* What We Did Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 md:p-8 rounded-xl bg-white/[0.02] border border-white/[0.06]"
            >
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-medium">
                What We Did
              </h3>

              {/* Services List */}
              <ul className="space-y-3 mb-8">
                {services.map((service, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{service}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Strategy Quote */}
              {strategy && strategy.length > 0 && (
                <div className="pt-6 border-t border-white/[0.06]">
                  <div className="flex gap-3">
                    <Quote className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-1" />
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      {strategy[0]}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ProjectChallenge;
