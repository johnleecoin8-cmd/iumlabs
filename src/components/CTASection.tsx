import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import seoulBridgeNight from "@/assets/seoul-bridge-night.jpg";
import { ArrowUpRight, Mail, MapPin, Send, CheckCircle2, User } from "lucide-react";
import { motion } from "framer-motion";

const budgetOptions = ["$15K - $25K", "$25K - $50K", "$50K +", "Raising funds"];

const floatingTags = [
  { label: "24/7 Support", top: "8%", left: "5%", delay: 0 },
  { label: "Seoul Based", top: "12%", right: "8%", delay: 0.2 },
  { label: "Fast Response", bottom: "15%", right: "5%", delay: 0.4 },
];

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
    budget: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formProgress = useMemo(() => {
    const fields = [formData.name, formData.email, formData.budget, formData.message];
    const filledFields = fields.filter(Boolean).length;
    return (filledFields / fields.length) * 100;
  }, [formData.name, formData.email, formData.budget, formData.message]);

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
        comments: `Company: ${formData.company}\nWebsite: ${formData.website}\nBudget: ${formData.budget}\n\n${formData.message}`
      });
      if (error) throw error;
      supabase.functions.invoke('send-contact-notification', {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          budget: formData.budget,
          message: formData.message
        }
      }).catch(console.error);
      setIsSubmitted(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", company: "", website: "", message: "", budget: "" });
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={ref} className="relative flex-1 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={seoulBridgeNight} 
          alt="Seoul Bridge" 
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.15)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-transparent to-[#0A0A0B]" />
      </div>

      {/* Floating Tags */}
      <div className="hidden lg:block">
        {floatingTags.map((tag, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: tag.delay + 0.3 }}
            className="absolute z-20 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/60 text-xs font-medium hover:bg-white/[0.06] hover:border-white/20 hover:text-white transition-all duration-300 cursor-default backdrop-blur-sm"
            style={{
              top: tag.top,
              left: tag.left,
              right: tag.right,
              bottom: tag.bottom
            }}
          >
            {tag.label}
          </motion.div>
        ))}
      </div>

      <div className="relative bg-transparent py-16 md:py-20 px-4">
        <div className={`container mx-auto max-w-6xl relative z-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 md:mb-12"
          >
            <span className="text-white/40 text-xs font-mono tracking-widest uppercase mb-4 block">
              [ 09 ] ── Get in Touch
            </span>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Let's Start a <span className="text-primary">Conversation</span>
            </h3>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* Left - Image & Contact Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4 order-2 lg:order-1"
            >
              {/* Featured Image */}
              <div className="group relative rounded-2xl overflow-hidden h-[200px] md:h-[280px] bg-white/[0.03] border border-white/[0.08]">
                <img src={seoulBridgeNight} alt="Seoul Office" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                
                {/* Live in Seoul Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.08] border border-white/[0.1] backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/90 text-xs font-medium">Live in Seoul</span>
                  <span className="text-white/50 text-xs">{seoulTime}</span>
                </div>

                {/* Office Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs mb-1">OFFICE</p>
                      <p className="text-white text-sm">{brand.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-2 gap-3">
                <a href={`mailto:${brand.email}`} className="group relative flex flex-col items-start gap-2 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-primary/40 hover:-translate-y-1 transition-all duration-500 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 border border-primary/20">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-0.5">E-MAIL</p>
                    <p className="text-white/70 text-sm group-hover:text-primary transition-colors break-all leading-tight">{brand.email}</p>
                  </div>
                  <ArrowUpRight className="absolute top-3 right-3 w-4 h-4 text-white/20 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300" />
                </a>

                <a href={brand.telegramLink} target="_blank" rel="noopener noreferrer" className="group relative flex flex-col items-start gap-2 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-primary/40 hover:-translate-y-1 transition-all duration-500 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 border border-primary/20">
                    <Send className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-0.5">TELEGRAM</p>
                    <p className="text-white/70 text-sm group-hover:text-primary transition-colors">@cryptobridgekorea</p>
                  </div>
                  <ArrowUpRight className="absolute top-3 right-3 w-4 h-4 text-white/20 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300" />
                </a>
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <form onSubmit={handleSubmit} className="relative space-y-4 p-5 md:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-primary/20 transition-all duration-500 backdrop-blur-sm">
                {/* Progress Indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/[0.03] overflow-hidden rounded-t-2xl">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${formProgress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>

                {/* Form Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-white/60 text-sm font-medium">Contact Form</span>
                  </div>
                  <span className="text-white/30 text-xs">{Math.round(formProgress)}% complete</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/40 text-xs mb-2">NAME *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:bg-white/[0.05] outline-none transition-all duration-300 text-sm placeholder:text-white/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs mb-2">E-MAIL *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:bg-white/[0.05] outline-none transition-all duration-300 text-sm placeholder:text-white/30"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/40 text-xs mb-2">COMPANY</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:bg-white/[0.05] outline-none transition-all duration-300 text-sm placeholder:text-white/30"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs mb-2">WEBSITE</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:bg-white/[0.05] outline-none transition-all duration-300 text-sm placeholder:text-white/30"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Budget Options */}
                <div>
                  <label className="block text-white/40 text-xs mb-3">BUDGET *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {budgetOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: option })}
                        className={`px-3 py-2.5 rounded-xl text-xs border transition-all duration-300 ${
                          formData.budget === option
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white/[0.03] border-white/[0.08] text-white/60 hover:border-primary/40 hover:bg-white/[0.06] hover:text-white'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white/40 text-xs mb-2">PROJECT DETAILS *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={3}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:bg-white/[0.05] outline-none transition-all duration-300 resize-none text-sm placeholder:text-white/30"
                    placeholder="Tell us about your project and goals..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || formProgress < 100}
                  className={`group w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitted
                      ? 'bg-green-500 text-white'
                      : formProgress === 100
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-white/[0.05] text-white/40 cursor-not-allowed border border-white/[0.08]'
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
                      <span>Send Message</span>
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
