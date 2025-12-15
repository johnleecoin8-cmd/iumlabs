import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import seoulBridgeNight from "@/assets/seoul-bridge-night.jpg";
import { ArrowUpRight, ArrowRight, Mail, MapPin, Send, CheckCircle2, User } from "lucide-react";
import { motion } from "framer-motion";

const budgetOptions = ["$15K - $25K", "$25K - $50K", "$50K +", "Raising funds"];

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
    return filledFields / fields.length * 100;
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
      setFormData({
        name: "",
        email: "",
        company: "",
        website: "",
        message: "",
        budget: ""
      });
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={ref} className="flex-1">
      <div className="relative bg-[#0A0A0B] py-16 md:py-24 px-4 overflow-hidden">
        <div className={`container mx-auto max-w-6xl relative z-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Option B Header */}
          <motion.div 
            className="relative mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="absolute -top-8 left-0 text-[100px] md:text-[140px] font-bold text-white/[0.03] leading-none pointer-events-none select-none">
              09
            </span>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                <span className="text-white/50">Get in</span>{" "}
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Touch
                </span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-red-400 to-orange-400 mt-4 rounded-full" />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* Left - Image & Contact Cards */}
            <div className="space-y-4 order-2 lg:order-1">
              {/* Featured Image - Unified Card Style */}
              <div className="group relative rounded-2xl overflow-hidden h-[200px] md:h-[280px] border border-white/10 hover:border-white/30 transition-all duration-300">
                <img src={seoulBridgeNight} alt="Seoul Office" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                
                {/* Live in Seoul Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.08] border border-white/[0.1]">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/90 text-xs font-medium">Live in Seoul</span>
                  <span className="text-white/50 text-xs">{seoulTime}</span>
                </div>

                {/* Office Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs mb-1">OFFICE</p>
                      <p className="text-white text-sm">{brand.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Cards - Unified Style */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`mailto:${brand.email}`}
                  className="group relative flex flex-col items-start gap-2 p-6 rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-0.5">E-MAIL</p>
                    <p className="text-white/70 text-sm group-hover:text-white transition-colors break-all leading-tight">{brand.email}</p>
                  </div>
                  <ArrowRight className="absolute top-4 right-4 w-4 h-4 text-white/20 group-hover:text-white/40 group-hover:translate-x-1 transition-all duration-300" />
                </a>

                <a
                  href={brand.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-start gap-2 p-6 rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                    <Send className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-0.5">TELEGRAM</p>
                    <p className="text-white/70 text-sm group-hover:text-white transition-colors">@cryptobridgekorea</p>
                  </div>
                  <ArrowRight className="absolute top-4 right-4 w-4 h-4 text-white/20 group-hover:text-white/40 group-hover:translate-x-1 transition-all duration-300" />
                </a>
              </div>
            </div>

            {/* Right - Contact Form - Unified Card Style */}
            <div className="order-1 lg:order-2">
              <form onSubmit={handleSubmit} className="group space-y-4 p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300">
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
                    <span className="text-white/40 font-mono text-sm">[01]</span>
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
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-transparent border border-white/10 hover:border-white/30 focus:border-primary/50 rounded-xl px-4 py-3 text-white outline-none transition-all duration-300 text-sm placeholder:text-white/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs mb-2">E-MAIL *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-transparent border border-white/10 hover:border-white/30 focus:border-primary/50 rounded-xl px-4 py-3 text-white outline-none transition-all duration-300 text-sm placeholder:text-white/30"
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
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-transparent border border-white/10 hover:border-white/30 focus:border-primary/50 rounded-xl px-4 py-3 text-white outline-none transition-all duration-300 text-sm placeholder:text-white/30"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs mb-2">WEBSITE</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={e => setFormData({ ...formData, website: e.target.value })}
                      className="w-full bg-transparent border border-white/10 hover:border-white/30 focus:border-primary/50 rounded-xl px-4 py-3 text-white outline-none transition-all duration-300 text-sm placeholder:text-white/30"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Budget Options - Unified Button Style */}
                <div>
                  <label className="block text-white/40 text-xs mb-3">BUDGET *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {budgetOptions.map(option => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: option })}
                        className={`px-3 py-2.5 rounded-xl text-xs border transition-all duration-300 ${
                          formData.budget === option
                            ? 'bg-primary text-white border-primary'
                            : 'bg-transparent border-white/10 text-white/60 hover:border-white/30 hover:text-white'
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
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={3}
                    className="w-full bg-transparent border border-white/10 hover:border-white/30 focus:border-primary/50 rounded-xl px-4 py-3 text-white outline-none transition-all duration-300 resize-none text-sm placeholder:text-white/30"
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
                      : 'bg-white/[0.05] text-white/40 cursor-not-allowed'
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
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
