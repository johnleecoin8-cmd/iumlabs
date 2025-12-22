import { useState, useMemo } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import { ArrowRight, Mail, MapPin, Send, CheckCircle2, Linkedin, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const budgetOptions = ["$15K - $25K", "$25K - $50K", "$50K +", "Raising funds"];

// Animated background gradient
const AnimatedGradient = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute -top-1/2 -left-1/2 w-full h-full"
      animate={{
        background: [
          "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
          "radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
          "radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
          "radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
          "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
        ],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      style={{ width: "200%", height: "200%" }}
    />
    <motion.div
      className="absolute -bottom-1/2 -right-1/2 w-full h-full"
      animate={{
        background: [
          "radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
          "radial-gradient(circle at 0% 100%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)",
          "radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
          "radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
          "radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
        ],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{ width: "200%", height: "200%" }}
    />
  </div>
);

// Success confetti particles
const SuccessParticles = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none overflow-hidden"
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    transition={{ duration: 2, delay: 1 }}
  >
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          left: `${50 + (Math.random() - 0.5) * 30}%`,
          top: "50%",
          backgroundColor: ["#3B82F6", "#8B5CF6", "#06B6D4", "#10B981"][i % 4],
        }}
        initial={{ y: 0, x: 0, scale: 0, opacity: 1 }}
        animate={{
          y: [0, -100 - Math.random() * 100],
          x: [(Math.random() - 0.5) * 200],
          scale: [0, 1, 0.5],
          opacity: [1, 1, 0],
        }}
        transition={{
          duration: 1.5,
          delay: i * 0.05,
          ease: "easeOut",
        }}
      />
    ))}
  </motion.div>
);

const CTASection = () => {
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
  const [showParticles, setShowParticles] = useState(false);

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
      setShowParticles(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        company: "",
        website: "",
        message: "",
        budget: ""
      });
      setTimeout(() => {
        setIsSubmitted(false);
        setShowParticles(false);
      }, 3000);
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-[#050508] py-20 overflow-hidden">
      <AnimatedGradient />
      <AnimatePresence>
        {showParticles && <SuccessParticles />}
      </AnimatePresence>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Conversational Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            whileHover={{ scale: 1.02 }}
          >
            <MessageCircle className="w-4 h-4 text-blue-400" />
            <span className="text-white/60 text-sm">Let's start a conversation</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Grow in Korea?
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Tell us about your project and goals. We'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info - Left side */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Office Card */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Office</p>
                  <p className="text-white text-sm">{brand.address}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/50 text-xs">Seoul • {seoulTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Links */}
            <a
              href={`mailto:${brand.email}`}
              className="group flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300"
            >
              <Mail className="w-5 h-5 text-white/40" />
              <div className="flex-1">
                <p className="text-white text-sm group-hover:text-white/80 transition-colors">{brand.email}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:translate-x-1 group-hover:text-white/60 transition-all" />
            </a>

            <a
              href={brand.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300"
            >
              <Send className="w-5 h-5 text-white/40" />
              <div className="flex-1">
                <p className="text-white text-sm group-hover:text-white/80 transition-colors">@iumlabs</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:translate-x-1 group-hover:text-white/60 transition-all" />
            </a>

            <a
              href={brand.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300"
            >
              <Linkedin className="w-5 h-5 text-white/40" />
              <div className="flex-1">
                <p className="text-white text-sm group-hover:text-white/80 transition-colors">Ium Labs</p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:translate-x-1 group-hover:text-white/60 transition-all" />
            </a>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10 text-xs">
              <Link to="/terms" className="text-white/40 hover:text-white transition-colors">Terms</Link>
              <Link to="/privacy" className="text-white/40 hover:text-white transition-colors">Privacy</Link>
              <Link to="/transparency" className="text-white/40 hover:text-white transition-colors">Transparency</Link>
            </div>
          </motion.div>

          {/* Contact Form - Right side */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white/40 text-sm">Complete the form</p>
                  <span className="text-white/30 text-xs">{Math.round(formProgress)}%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${formProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-white/30 transition-colors placeholder:text-white/30"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-white/30 transition-colors placeholder:text-white/30"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-white/30 transition-colors placeholder:text-white/30"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={e => setFormData({ ...formData, website: e.target.value })}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-white/30 transition-colors placeholder:text-white/30"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="mb-6">
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-4">Budget *</label>
                <div className="flex flex-wrap gap-3">
                  {budgetOptions.map(option => (
                    <motion.button
                      key={option}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: option })}
                      className={`px-5 py-2.5 text-sm rounded-lg transition-all duration-300 ${
                        formData.budget === option
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
                          : 'bg-black/30 border border-white/10 text-white/60 hover:border-white/30'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Project Details *</label>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-white/30 transition-colors resize-none placeholder:text-white/30"
                  placeholder="Tell us about your project and goals..."
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting || formProgress < 100}
                className={`group relative w-full md:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 text-sm font-medium rounded-lg overflow-hidden transition-all duration-300 ${
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : formProgress === 100
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/30'
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                }`}
                whileHover={formProgress === 100 && !isSubmitted ? { scale: 1.02, y: -2 } : {}}
                whileTap={formProgress === 100 && !isSubmitted ? { scale: 0.98 } : {}}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    SEND MESSAGE
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;