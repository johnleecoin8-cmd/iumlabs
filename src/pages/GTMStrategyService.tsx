import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Flag, Map, Compass, TrendingUp, CheckCircle2, Circle, Target, Rocket, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import CalendlyButton from "@/components/CalendlyButton";
import gtmImage from "@/assets/services/gtm-strategy.jpg";
import koreaPalace from "@/assets/backgrounds/korea-palace-modern.jpg";

// Emerald accent
const ACCENT_COLOR = "#10B981";

// Roadmap milestones
const milestones = [
  { week: "Week 1-2", title: "Discovery", status: "complete", tasks: ["Market Research", "Competitor Analysis", "Audience Mapping"] },
  { week: "Week 3-4", title: "Strategy", status: "complete", tasks: ["Positioning", "Messaging Framework", "Channel Strategy"] },
  { week: "Week 5-6", title: "Preparation", status: "current", tasks: ["Content Creation", "Partner Alignment", "Team Training"] },
  { week: "Week 7-8", title: "Launch", status: "upcoming", tasks: ["Campaign Activation", "PR Push", "Community Events"] },
];

const processSteps = [
  {
    number: "01",
    title: "Strategy Kickoff",
    description: "We align on project goals, audience profiles, and competitive landscape to inform the full GTM plan.",
    icon: Compass,
    duration: "Week 1",
  },
  {
    number: "02",
    title: "Narrative & Positioning",
    description: "We craft your messaging framework, value proposition, and launch storyline across all channels.",
    icon: Map,
    duration: "Week 2-3",
  },
  {
    number: "03",
    title: "Launch Coordination",
    description: "We orchestrate all campaign elements — content, influencers, PR, community — into a unified launch.",
    icon: Flag,
    duration: "Week 4-5",
  },
  {
    number: "04",
    title: "Optimization & Scale",
    description: "We measure results, iterate on what works, and refine strategy for sustained growth post-launch.",
    icon: TrendingUp,
    duration: "Ongoing",
  },
];

const stats = [
  { value: "30+", label: "Successful Launches" },
  { value: "$50M+", label: "Token Sales Supported" },
];

const GTMStrategyService = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-0.5 sm:p-1 md:p-2">
      <div className="min-h-screen bg-[#0A0A0A] rounded-xl sm:rounded-2xl overflow-hidden relative">
        {/* Ambient Glow */}
        <div 
          className="fixed top-0 left-0 w-[50vw] h-[50vh] pointer-events-none z-0 opacity-15"
          style={{ background: `radial-gradient(ellipse at 0% 0%, ${ACCENT_COLOR} 0%, transparent 60%)` }}
        />
        <div 
          className="fixed bottom-0 right-0 w-[40vw] h-[40vh] pointer-events-none z-0 opacity-10"
          style={{ background: `radial-gradient(ellipse at 100% 100%, ${ACCENT_COLOR} 0%, transparent 60%)` }}
        />
        
        <Navbar />

        {/* Hero Section - Roadmap Style */}
        <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-[-5%] bg-cover bg-center bg-no-repeat animate-kenburns"
              style={{ 
                backgroundImage: `url(${koreaPalace})`,
                filter: "brightness(0.25) saturate(1.2)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]" />
          </div>

          {/* Floating Checkpoint Markers */}
          {[
            { x: "10%", y: "20%" },
            { x: "30%", y: "35%" },
            { x: "60%", y: "25%" },
            { x: "80%", y: "40%" },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute z-10 hidden md:block"
              style={{ left: pos.x, top: pos.y }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${ACCENT_COLOR}20`, border: `2px solid ${ACCENT_COLOR}` }}
              >
                <Flag className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
              </div>
            </motion.div>
          ))}

          {/* Content */}
          <div className="container mx-auto px-6 lg:px-16 pt-32 pb-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                  style={{ borderColor: `${ACCENT_COLOR}50`, backgroundColor: `${ACCENT_COLOR}10` }}
                >
                  <Compass className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                  <span className="text-sm" style={{ color: ACCENT_COLOR }}>GTM Strategy</span>
                </motion.div>
                
                <h1 className="text-white mb-6">
                  <span className="block text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[0.95]">
                    GTM
                  </span>
                  <span 
                    className="block text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[0.95]"
                    style={{ color: ACCENT_COLOR }}
                  >
                    Strategy
                  </span>
                </h1>

                <p className="text-white/70 text-lg max-w-xl mb-8 font-light leading-relaxed">
                  A strategic roadmap for Korean market entry — from positioning to launch execution.
                </p>

                <CalendlyButton 
                  className="inline-flex items-center gap-3 px-6 py-3 font-medium text-sm transition-all duration-300 hover:scale-105 rounded-lg"
                  style={{ backgroundColor: ACCENT_COLOR, color: '#fff' }}
                >
                  <Calendar className="w-4 h-4" />
                  Book a Meeting
                </CalendlyButton>
              </div>

              {/* Right - Milestone Timeline */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="hidden lg:block"
              >
                <div className="relative">
                  {/* Timeline Line */}
                  <div 
                    className="absolute left-4 top-0 bottom-0 w-0.5"
                    style={{ backgroundColor: `${ACCENT_COLOR}30` }}
                  />

                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.week}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.15 }}
                      className="relative flex gap-6 mb-6 last:mb-0"
                    >
                      {/* Node */}
                      <div className="relative z-10">
                        {milestone.status === 'complete' ? (
                          <CheckCircle2 className="w-8 h-8" style={{ color: ACCENT_COLOR }} />
                        ) : milestone.status === 'current' ? (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Circle className="w-8 h-8 fill-current" style={{ color: ACCENT_COLOR }} />
                          </motion.div>
                        ) : (
                          <Circle className="w-8 h-8 text-gray-600" />
                        )}
                      </div>

                      {/* Content */}
                      <div 
                        className={`flex-1 p-4 rounded-xl border ${
                          milestone.status === 'current' ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/10 bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono text-gray-400">{milestone.week}</span>
                          {milestone.status === 'current' && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500 text-white">Current</span>
                          )}
                        </div>
                        <h3 className="text-white font-medium mb-2">{milestone.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          {milestone.tasks.map((task) => (
                            <span 
                              key={task}
                              className="text-xs px-2 py-1 rounded bg-white/5 text-white/60"
                            >
                              {task}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Flowchart Section */}
        <section 
          className="relative py-20"
          style={{ background: `linear-gradient(to bottom, #0A0A0A, ${ACCENT_COLOR}08, #0A0A0A)` }}
        >
          <div 
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(to right, transparent, ${ACCENT_COLOR}60, transparent)` }}
          />

          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex items-center gap-3 mb-12">
              <span className="text-xs font-mono" style={{ color: ACCENT_COLOR }}>01</span>
              <h2 className="text-2xl md:text-3xl font-medium text-white">Strategy Framework</h2>
            </div>

            {/* Strategy Canvas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { title: "Market Entry", items: ["Audience Analysis", "Competitor Mapping", "Channel Selection"], icon: Target },
                { title: "Brand Positioning", items: ["Value Proposition", "Messaging Framework", "Visual Identity"], icon: Map },
                { title: "Execution Plan", items: ["Launch Timeline", "Resource Allocation", "Success Metrics"], icon: Rocket },
              ].map((block, index) => (
                <motion.div
                  key={block.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div 
                    className="p-6 rounded-xl border h-full"
                    style={{ borderColor: `${ACCENT_COLOR}30` }}
                  >
                    <block.icon className="w-8 h-8 mb-4" style={{ color: ACCENT_COLOR }} />
                    <h3 className="text-white font-medium mb-4">{block.title}</h3>
                    <ul className="space-y-2">
                      {block.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-white/60 text-sm">
                          <ChevronRight className="w-4 h-4" style={{ color: ACCENT_COLOR }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Arrow to next block */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6" style={{ color: ACCENT_COLOR }} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* About Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  Our Go-To-Market service helps you enter the Korean crypto market with clarity, precision, and momentum. We build a complete launch plan covering positioning, messaging, channel strategy, and execution timeline.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div 
                      key={index} 
                      className="p-4 rounded-xl border"
                      style={{ borderColor: `${ACCENT_COLOR}30`, backgroundColor: `${ACCENT_COLOR}05` }}
                    >
                      <p className="text-3xl font-bold" style={{ color: ACCENT_COLOR }}>{stat.value}</p>
                      <p className="text-white/50 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img 
                  src={gtmImage} 
                  alt="GTM Strategy" 
                  className="w-full h-64 lg:h-80 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Process Section - Gantt Chart Style */}
        <section className="bg-[#0A0A0A] relative py-20">
          <div 
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(to right, transparent, ${ACCENT_COLOR}40, transparent)` }}
          />

          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex items-center gap-3 mb-12">
              <span className="text-xs font-mono" style={{ color: ACCENT_COLOR }}>02</span>
              <h2 className="text-2xl md:text-3xl font-medium text-white">Process Timeline</h2>
            </div>

            {/* Gantt-style Timeline */}
            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-stretch gap-4"
                >
                  {/* Duration Label */}
                  <div className="w-24 shrink-0 flex items-center justify-end">
                    <span className="text-sm font-mono" style={{ color: ACCENT_COLOR }}>{step.duration}</span>
                  </div>

                  {/* Bar */}
                  <div className="flex-1 relative">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      style={{ 
                        transformOrigin: 'left',
                        width: `${100 - index * 15}%`,
                      }}
                      className="h-full rounded-lg p-4 flex items-center gap-4"
                      // Different shade for each step
                    >
                      <div 
                        className="absolute inset-0 rounded-lg"
                        style={{ 
                          backgroundColor: `${ACCENT_COLOR}`,
                          opacity: 0.15 - index * 0.03,
                        }}
                      />
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 relative z-10"
                        style={{ backgroundColor: `${ACCENT_COLOR}30` }}
                      >
                        <step.icon className="w-5 h-5" style={{ color: ACCENT_COLOR }} />
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-white/40">{step.number}</span>
                          <h3 className="text-white font-medium">{step.title}</h3>
                        </div>
                        <p className="text-white/50 text-sm hidden md:block">{step.description}</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <CalendlyButton 
                className="inline-flex items-center gap-2 px-8 py-4 font-medium transition-all duration-300 hover:scale-105 rounded-lg"
                style={{ backgroundColor: ACCENT_COLOR, color: '#fff' }}
              >
                <Rocket className="w-5 h-5" />
                Plan Your Korean Launch
              </CalendlyButton>
            </div>
          </div>
        </section>

        {/* More Services */}
        <section className="bg-[#0A0A0A] border-t border-white/10 py-20">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs font-mono text-white/40">03</span>
              <h2 className="text-xl font-medium text-white">More Services</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { slug: "community", title: "Community Management", color: "#5865F2" },
                { slug: "social-media", title: "Social Media Marketing", color: "#EC4899" },
                { slug: "influencer", title: "Influencer Strategy", color: "#F59E0B" },
                { slug: "yap", title: "Yap Strategy", color: "#22D3EE" },
                { slug: "pr", title: "PR & Media", color: "#8B5CF6" },
              ].map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group p-6 border border-white/10 rounded-xl hover:border-white/30 transition-all duration-300"
                  style={{ ['--service-color' as string]: service.color }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white group-hover:text-[var(--service-color)] transition-colors">
                      {service.title}
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[var(--service-color)] group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default GTMStrategyService;
