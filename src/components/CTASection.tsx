import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import { ArrowRight, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import seoulTwilight from "@/assets/backgrounds/seoul-hanriver-twilight.jpg";

const budgetOptions = ["$15K - $25K", "$25K - $50K", "$50K +", "Raising funds"];

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    budget: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const seoulTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Seoul',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(now);
      setCurrentTime(seoulTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const filledFields = [formData.name, formData.email, formData.company, formData.website, formData.budget, formData.message].filter(Boolean).length;
  const completionPercent = Math.round((filledFields / 6) * 100);

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
          website: formData.website,
          budget: formData.budget,
          message: formData.message
        }
      }).catch(console.error);
      
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", company: "", website: "", budget: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-[#0A0A0B] via-[#0F1520] to-[#0A0A0B] py-20 md:py-28 overflow-hidden">
      {/* Gradient Blobs */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/12 to-purple-500/8 blur-[120px] pointer-events-none animate-blob" />
      <div className="absolute bottom-1/4 -right-40 w-[450px] h-[450px] rounded-full bg-gradient-to-r from-cyan-500/10 to-primary/5 blur-[100px] pointer-events-none animate-blob-delay-2" />
      
      {/* Dot Pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      
      {/* Glow Line Top */}
      <div className="absolute top-0 left-0 right-0 h-px glow-line" />

      {/* Background Number */}
      <div className="absolute top-8 left-8 md:left-16 text-[120px] md:text-[200px] font-bold text-white/[0.03] leading-none select-none pointer-events-none">
        09
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white">
            Get in <span className="text-primary italic font-normal">Touch</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Office Card with Image */}
            <div className="relative rounded-2xl overflow-hidden h-[320px] md:h-[360px]">
              <img 
                src={seoulTwilight} 
                alt="Seoul" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Live Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-white text-sm font-medium">Live in Seoul</span>
                <span className="text-white/60 text-sm">{currentTime}</span>
              </div>
              
              {/* Office Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Office</p>
                    <p className="text-white text-sm">{brand.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email & Telegram Cards */}
            <div className="grid grid-cols-2 gap-4">
              <a 
                href={`mailto:${brand.email}`}
                className="group p-5 rounded-2xl bg-[#111113] border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">E-mail</p>
                <p className="text-white text-sm">{brand.email}</p>
              </a>

              <a 
                href={brand.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-[#111113] border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Send className="w-6 h-6 text-primary" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Telegram</p>
                <p className="text-white text-sm">@cryptobridgekorea</p>
              </a>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 p-6 md:p-8 bg-[#111113]">
              {/* Form Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-white/30 font-mono text-sm">[01]</span>
                  <span className="text-white font-medium">Contact Form</span>
                </div>
                <span className="text-white/40 text-sm">{completionPercent}% complete</span>
              </div>

              <div className="space-y-5">
                {/* Name & Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">E-mail *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Company & Website */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Website</label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Budget *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {budgetOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: option })}
                        className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          formData.budget === option
                            ? "bg-white text-black"
                            : "bg-white/[0.03] text-white/60 border border-white/10 hover:border-white/30"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Project Details *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder="Tell us about your project and goals..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
