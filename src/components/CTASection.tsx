import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useMemo, useRef, useCallback, MouseEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import CalendlyButton from "./CalendlyButton";
import { brand } from "@/config/content";
import seoulBridgeNight from "@/assets/seoul-bridge-night.jpg";
import { ArrowUpRight, Mail, MapPin, Send, Sparkles, CheckCircle2, User } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const budgetOptions = [
  "$15K - $25K",
  "$25K - $50K",
  "$50K +",
  "Raising funds",
];

// Strategist data
const strategists = [
  { name: "James", role: "Co-Founder", initials: "J", status: "Available" },
  { name: "David", role: "Co-Founder", initials: "D", status: "Available" },
];

const testimonialQuotes = [
  { text: "Best Web3 marketing agency in Korea!", author: "BNB Chain" },
  { text: "Helped us achieve 5x ROI in 3 months.", author: "KuCoin" },
  { text: "Exceptional local market expertise.", author: "Polygon" },
];

// Simple Form Component (no 3D tilt)
const SimpleForm = ({ 
  children, 
  className,
  onSubmit 
}: { 
  children: React.ReactNode; 
  className?: string;
  onSubmit?: (e: React.FormEvent) => void;
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={className}
    >
      {children}
    </form>
  );
};

// Simple Button Component (no magnetic effect)
const SimpleButton = ({ 
  children, 
  onClick, 
  isActive, 
  className
}: { 
  children: React.ReactNode; 
  onClick: () => void;
  isActive: boolean;
  className?: string;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
};

// Simple Link Component (no magnetic effect)
const SimpleLink = ({ 
  children, 
  href, 
  className,
  target,
  rel
}: { 
  children: React.ReactNode; 
  href: string;
  className?: string;
  target?: string;
  rel?: string;
}) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
    >
      {children}
    </a>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ value, label }: { value: string; label: string }) => {
  return (
    <motion.div 
      className="text-center px-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-2xl md:text-3xl font-bold text-white"
        whileHover={{ scale: 1.1, color: "#22d3ee" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {value}
      </motion.div>
      <div className="text-xs md:text-sm text-white/60">{label}</div>
    </motion.div>
  );
};

// Floating Particle Component
const FloatingParticle = ({ delay, size, left, top }: { delay: number; size: number; left: string; top: string }) => (
  <motion.div
    className="absolute rounded-full bg-white/20"
    style={{ width: size, height: size, left, top }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.2, 0.6, 0.2],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Rotate testimonials
  useState(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % testimonialQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  });

  // Calculate form progress
  const formProgress = useMemo(() => {
    const fields = [formData.name, formData.email, formData.budget, formData.message];
    const filledFields = fields.filter(Boolean).length;
    return (filledFields / fields.length) * 100;
  }, [formData.name, formData.email, formData.budget, formData.message]);

  // Get current Seoul time
  const seoulTime = useMemo(() => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      timeZone: 'Asia/Seoul', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name,
        email: formData.email,
        comments: `Company: ${formData.company}\nWebsite: ${formData.website}\nBudget: ${formData.budget}\n\n${formData.message}`,
      });

      if (error) throw error;

      supabase.functions.invoke('send-contact-notification', {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          budget: formData.budget,
          message: formData.message,
        },
      }).catch(console.error);

      setIsSubmitted(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", company: "", website: "", message: "", budget: "" });
      
      // Reset success state after animation
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={ref} className="flex-1">
      {/* Hero CTA Section */}
      <div className="relative bg-gradient-to-br from-primary via-primary to-blue-600 py-20 md:py-32 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient Orbs with enhanced animation */}
          <motion.div 
            className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-400/30 rounded-full blur-[120px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-300/20 rounded-full blur-[100px]"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Floating Particles */}
          <FloatingParticle delay={0} size={6} left="10%" top="20%" />
          <FloatingParticle delay={0.5} size={8} left="85%" top="15%" />
          <FloatingParticle delay={1} size={5} left="20%" top="70%" />
          <FloatingParticle delay={1.5} size={10} left="75%" top="60%" />
          <FloatingParticle delay={2} size={7} left="50%" top="30%" />
          <FloatingParticle delay={2.5} size={4} left="30%" top="85%" />
        </div>
        
        {/* Floating Sparkles with enhanced animation */}
        <motion.div
          className="absolute top-[15%] left-[10%] hidden md:block"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity } }}
        >
          <Sparkles className="w-6 h-6 text-white/40" />
        </motion.div>
        <motion.div
          className="absolute top-[25%] right-[15%] hidden md:block"
          animate={{ rotate: -360, scale: [1, 1.3, 1] }}
          transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, delay: 0.5 } }}
        >
          <Sparkles className="w-8 h-8 text-cyan-300/50" />
        </motion.div>
        <motion.div
          className="absolute bottom-[30%] left-[20%] hidden md:block"
          animate={{ rotate: 360, scale: [1, 1.4, 1] }}
          transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, scale: { duration: 5, repeat: Infinity, delay: 1 } }}
        >
          <Sparkles className="w-5 h-5 text-white/30" />
        </motion.div>

        <div className={`container mx-auto max-w-5xl text-center relative z-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Badge with hover effect */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 md:mb-8 cursor-default"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-white/90 text-sm font-medium">Free 30-min Strategy Call</span>
          </motion.div>

          {/* Animated Title */}
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Conquer
            <br />
            <motion.span 
              className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent inline-block"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              the Korean Market?
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-xl text-white/80 max-w-2xl mx-auto mb-8 md:mb-10 px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join 200+ Web3 projects that have successfully launched in Korea with our strategic guidance and unmatched network.
          </motion.p>

          {/* Magnetic CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Primary CTA - Book a Meeting (using CalendlyButton wrapper) */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <CalendlyButton className="group w-full sm:w-auto bg-white text-primary hover:bg-white/90 px-6 md:px-10 py-4 md:py-5 rounded-2xl font-semibold transition-all hover:shadow-2xl hover:shadow-white/30 flex items-center justify-center gap-2 relative overflow-hidden">
                <span className="relative z-10">Book a Meeting</span>
                <ArrowUpRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </CalendlyButton>
            </motion.div>

            {/* Secondary CTA - Free Audit */}
            <SimpleLink 
              href="https://calendly.com/cryptobridgekorea/free-audit"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 md:px-8 py-4 md:py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-emerald-500/40 relative overflow-hidden hover:scale-105 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              <span>Free Marketing Audit</span>
            </SimpleLink>

            {/* Tertiary CTA - Email */}
            <SimpleLink 
              href={`mailto:${brand.email}`}
              className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 md:px-8 py-4 md:py-5 rounded-2xl border-2 border-white/30 text-white font-medium hover:bg-white/10 hover:border-white/50 transition-all relative overflow-hidden"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Send Email</span>
              <span className="sm:hidden">Email Us</span>
            </SimpleLink>
          </motion.div>

          {/* Trust Indicators with animation */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-10 md:mt-12 pt-8 md:pt-10 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <AnimatedCounter value="200+" label="Projects Launched" />
            <div className="w-px h-10 bg-white/20 hidden sm:block" />
            <AnimatedCounter value="$500M+" label="Funds Raised" />
            <div className="w-px h-10 bg-white/20 hidden sm:block" />
            <AnimatedCounter value="50+" label="Exchange Partners" />
          </motion.div>
        </div>
      </div>

      {/* Contact Form Section - Asymmetric Overlap Layout */}
      <div className="relative bg-[hsl(0,0%,4%)] py-16 md:py-24 px-4 overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px]" />
        </div>
        
        <div className={`container mx-auto max-w-6xl relative z-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16">
            <span className="text-xs font-medium text-primary mb-4 block tracking-widest uppercase">
              Get in Touch
            </span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Let's Start a <span className="text-primary">Conversation</span>
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* Left - Strategist Card & Image */}
            <div className="space-y-4 order-2 lg:order-1">
              {/* Featured Image with Overlap Effect */}
              <div className="group relative rounded-2xl overflow-hidden h-[200px] md:h-[280px]">
                <img
                  src={seoulBridgeNight}
                  alt="Seoul Office"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                
                {/* Live in Seoul Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/90 text-xs font-medium">Live in Seoul</span>
                  <span className="text-white/50 text-xs">{seoulTime}</span>
                </div>

                {/* Office Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/30 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs mb-1">OFFICE</p>
                      <p className="text-white text-sm">{brand.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href={`mailto:${brand.email}`}
                  className="group relative flex flex-col items-start gap-2 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-primary/40 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-500">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="relative">
                    <p className="text-white/50 text-xs mb-0.5">E-MAIL</p>
                    <p className="text-white text-sm group-hover:text-primary transition-colors break-all leading-tight">{brand.email}</p>
                  </div>
                  <ArrowUpRight className="absolute top-3 right-3 w-4 h-4 text-white/20 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300" />
                </a>

                <a 
                  href={brand.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-start gap-2 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-primary/40 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-500">
                    <Send className="w-5 h-5 text-primary" />
                  </div>
                  <div className="relative">
                    <p className="text-white/50 text-xs mb-0.5">TELEGRAM</p>
                    <p className="text-white text-sm group-hover:text-primary transition-colors">@cryptobridgekorea</p>
                  </div>
                  <ArrowUpRight className="absolute top-3 right-3 w-4 h-4 text-white/20 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300" />
                </a>
              </div>
            </div>

            {/* Right - 3D Tilt Contact Form */}
            <div className="order-1 lg:order-2 lg:-mt-8 lg:relative lg:z-20">
              <SimpleForm 
                onSubmit={handleSubmit} 
                className="group/form space-y-4 p-5 md:p-7 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.08] hover:border-primary/20 transition-all duration-500 relative overflow-hidden shadow-2xl shadow-black/20"
              >
                {/* Progress Indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 overflow-hidden rounded-t-2xl">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary via-cyan-400 to-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${formProgress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>

                {/* Form Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-white/70 text-sm font-medium">Contact Form</span>
                  </div>
                  <span className="text-white/40 text-xs">{Math.round(formProgress)}% complete</span>
                </div>
                
                {/* Form background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5 opacity-0 group-hover/form:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
                  <div className="group/input">
                    <label className="block text-white/50 text-xs mb-2 group-focus-within/input:text-primary transition-colors">NAME *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] outline-none transition-all duration-300 text-sm placeholder:text-white/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="group/input">
                    <label className="block text-white/50 text-xs mb-2 group-focus-within/input:text-primary transition-colors">E-MAIL *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] outline-none transition-all duration-300 text-sm placeholder:text-white/30"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
                  <div className="group/input">
                    <label className="block text-white/50 text-xs mb-2 group-focus-within/input:text-primary transition-colors">COMPANY</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] outline-none transition-all duration-300 text-sm placeholder:text-white/30"
                      placeholder="Company name"
                    />
                  </div>
                  <div className="group/input">
                    <label className="block text-white/50 text-xs mb-2 group-focus-within/input:text-primary transition-colors">WEBSITE</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] outline-none transition-all duration-300 text-sm placeholder:text-white/30"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Budget Options */}
                <div className="relative">
                  <label className="block text-white/50 text-xs mb-3">BUDGET *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {budgetOptions.map((option) => (
                      <SimpleButton
                        key={option}
                        onClick={() => setFormData({ ...formData, budget: option })}
                        isActive={formData.budget === option}
                        className={`relative px-3 py-2.5 rounded-xl text-xs border transition-all duration-300 overflow-hidden ${
                          formData.budget === option
                            ? 'bg-primary text-white border-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                            : 'bg-transparent border-white/10 text-white/70 hover:border-primary/50 hover:bg-white/[0.05] hover:text-white'
                        }`}
                      >
                        <span className="relative">{option}</span>
                      </SimpleButton>
                    ))}
                  </div>
                </div>

                <div className="group/input relative">
                  <label className="block text-white/50 text-xs mb-2 group-focus-within/input:text-primary transition-colors">PROJECT DETAILS *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={3}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] outline-none transition-all duration-300 resize-none text-sm placeholder:text-white/30"
                    placeholder="Tell us about your project and goals..."
                  />
                </div>

                {/* Enhanced Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || formProgress < 100}
                  whileHover={{ scale: formProgress === 100 ? 1.02 : 1 }}
                  whileTap={{ scale: formProgress === 100 ? 0.98 : 1 }}
                  className={`group/submit w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden ${
                    isSubmitted 
                      ? 'bg-green-500 text-white' 
                      : formProgress === 100
                        ? 'bg-primary text-white hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]'
                        : 'bg-white/10 text-white/50 cursor-not-allowed'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Message Sent!</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <motion.div 
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Send Message</span>
                      <ArrowUpRight className="w-5 h-5 relative z-10 group-hover/submit:translate-x-1 group-hover/submit:-translate-y-1 transition-transform duration-300" />
                    </>
                  )}
                  
                  {/* Animated gradient background */}
                  {formProgress === 100 && !isSubmitted && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-primary bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] opacity-0 group-hover/submit:opacity-100 transition-opacity" />
                  )}
                  
                  {/* Success particles */}
                  {isSubmitted && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full"
                          initial={{ 
                            x: "50%", 
                            y: "50%", 
                            opacity: 1,
                            scale: 0
                          }}
                          animate={{ 
                            x: `${20 + Math.random() * 60}%`,
                            y: `${Math.random() * 100}%`,
                            opacity: 0,
                            scale: 1.5
                          }}
                          transition={{ 
                            duration: 0.6,
                            delay: i * 0.1,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.button>
              </SimpleForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
