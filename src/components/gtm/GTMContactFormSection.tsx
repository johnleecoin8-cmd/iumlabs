import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";

const budgetOptions = ["$15K - $25K", "$25K - $50K", "$50K +", "Raising funds"];

interface GTMContactFormSectionProps {
  sectionNumber?: string;
}

const GTMContactFormSection = ({
  sectionNumber = "05"
}: GTMContactFormSectionProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
    budget: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const filledFields = [formData.name, formData.email, formData.budget, formData.message].filter(Boolean).length;
  const completionPercentage = Math.round(filledFields / 4 * 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_submissions').insert({
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
      
      // Show success animation
      setIsSuccess(true);
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours."
      });
      
      // Reset after animation
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          company: "",
          website: "",
          message: "",
          budget: ""
        });
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      toast({
        title: "Failed to send",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSeoulTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Seoul',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <section className="bg-background">
      <div className="border-t border-primary/20">
        {/* Section Header - Primary themed */}
        <div className="bg-primary/5 flex items-center justify-between p-4 md:px-10 md:py-4 border-b border-primary/15">
          <div className="flex items-center gap-4 md:gap-6">
            <span className="text-[10px] md:text-xs text-primary/60 font-mono tracking-widest w-6">{sectionNumber}</span>
            <h2 className="text-lg md:text-xl font-medium text-foreground">Contact</h2>
          </div>
          <span className="text-xs text-primary/70 tracking-wider hidden sm:block px-3 py-1 border border-primary/30 rounded-full bg-primary/5">Get Started</span>
        </div>
        
        {/* Two Column Layout */}
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Contact Info */}
          <div className="w-full md:w-2/5 p-4 sm:p-6 md:p-8 lg:p-12 border-b md:border-b-0 md:border-r border-primary/15 bg-gradient-to-br from-primary/5 via-transparent to-transparent">
            <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-foreground mb-3 sm:mb-5 tracking-tight">
              Get in Touch
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-10">
              Ready to enter the Korean market? Let's discuss how we can help your project grow.
            </p>

            {/* Office */}
            <div className="mb-4 sm:mb-7 pb-4 sm:pb-7 border-b border-primary/15">
              <div className="flex items-start gap-3 sm:gap-4">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary/60 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] sm:text-label uppercase tracking-wider text-muted-foreground block mb-1.5 sm:mb-2">Office</span>
                  <p className="text-foreground text-xs sm:text-sm leading-relaxed">{brand.address}</p>
                  <div className="flex items-center gap-2 mt-2 sm:mt-3">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] sm:text-caption text-muted-foreground">Live in Seoul • {getSeoulTime()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <a href={`mailto:${brand.email}`} className="group flex items-center justify-between mb-4 sm:mb-7 pb-4 sm:pb-7 border-b border-primary/15 hover:border-primary/30 transition-colors active:scale-[0.98] min-h-[44px]">
              <div className="flex items-start gap-3 sm:gap-4">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary/60 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] sm:text-label uppercase tracking-wider text-muted-foreground block mb-1.5 sm:mb-2">Email</span>
                  <p className="text-foreground text-xs sm:text-sm">{brand.email}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary/40 group-hover:text-primary group-hover:translate-x-1.5 transition-all flex-shrink-0" />
            </a>

            {/* Telegram */}
            <a href={brand.telegramLink} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between mb-4 sm:mb-7 pb-4 sm:pb-7 border-b border-primary/15 hover:border-primary/30 transition-colors active:scale-[0.98] min-h-[44px]">
              <div className="flex items-start gap-3 sm:gap-4">
                <Send className="w-4 h-4 sm:w-5 sm:h-5 text-primary/60 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] sm:text-label uppercase tracking-wider text-muted-foreground block mb-1.5 sm:mb-2">Telegram</span>
                  <p className="text-foreground text-xs sm:text-sm">{brand.telegram}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary/40 group-hover:text-primary group-hover:translate-x-1.5 transition-all flex-shrink-0" />
            </a>
          </div>

          {/* Right Column - Contact Form */}
          <div className="w-full md:w-3/5 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 lg:px-12 lg:py-8 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-background z-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </motion.div>
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl font-bold text-foreground mb-2"
                  >
                    Message Sent!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-muted-foreground text-center"
                  >
                    We'll get back to you within 24 hours.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center gap-2 mt-4 text-primary"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm">Thank you for reaching out!</span>
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4 sm:mb-8">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className="text-xs sm:text-sm text-muted-foreground">Contact Form</span>
                      <div className="flex items-center gap-2">
                        {completionPercentage === 100 ? (
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center gap-1.5"
                          >
                            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary flex items-center justify-center">
                              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <motion.polyline
                                  points="20 6 9 17 4 12"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 0.4, delay: 0.1 }}
                                />
                              </svg>
                            </div>
                            <span className="text-[10px] sm:text-sm text-primary font-medium">Ready to send</span>
                          </motion.div>
                        ) : (
                          <span className="text-xs sm:text-sm text-muted-foreground">{completionPercentage}%</span>
                        )}
                      </div>
                    </div>
                    {/* Progress Bar - Primary themed */}
                    <div className="h-1 sm:h-1.5 bg-primary/10 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${completionPercentage}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 md:space-y-8">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label className="block text-[10px] sm:text-label uppercase tracking-wider text-foreground/70 mb-2 sm:mb-3">Name *</label>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="w-full bg-transparent border-b border-primary/40 pb-2.5 sm:pb-3 text-sm sm:text-base text-foreground placeholder:text-foreground/60 focus:border-primary focus:outline-none transition-colors min-h-[44px]"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        <label className="block text-[10px] sm:text-label uppercase tracking-wider text-foreground/70 mb-2 sm:mb-3">Email *</label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="w-full bg-transparent border-b border-primary/40 pb-2.5 sm:pb-3 text-sm sm:text-base text-foreground placeholder:text-foreground/60 focus:border-primary focus:outline-none transition-colors min-h-[44px]"
                        />
                      </motion.div>
                    </div>

                    {/* Company & Website Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="block text-[10px] sm:text-label uppercase tracking-wider text-foreground/70 mb-2 sm:mb-3">Company</label>
                        <input
                          type="text"
                          placeholder="Company name"
                          value={formData.company}
                          onChange={e => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-transparent border-b border-primary/40 pb-2.5 sm:pb-3 text-sm sm:text-base text-foreground placeholder:text-foreground/60 focus:border-primary focus:outline-none transition-colors min-h-[44px]"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        <label className="block text-[10px] sm:text-label uppercase tracking-wider text-foreground/70 mb-2 sm:mb-3">Website</label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={formData.website}
                          onChange={e => setFormData({ ...formData, website: e.target.value })}
                          className="w-full bg-transparent border-b border-primary/40 pb-2.5 sm:pb-3 text-sm sm:text-base text-foreground placeholder:text-foreground/60 focus:border-primary focus:outline-none transition-colors min-h-[44px]"
                        />
                      </motion.div>
                    </div>

                    {/* Budget */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-[10px] sm:text-label uppercase tracking-wider text-foreground/70 mb-3 sm:mb-4">Budget *</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-3">
                        {budgetOptions.map((option, idx) => (
                          <motion.button
                            key={option}
                            type="button"
                            onClick={() => setFormData({ ...formData, budget: option })}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 + idx * 0.05 }}
                            className={`px-3 sm:px-5 py-2 sm:py-3 text-[11px] sm:text-sm border transition-all min-h-[40px] sm:min-h-[48px] font-medium rounded-sm ${
                              formData.budget === option
                                ? 'bg-primary/25 border-primary text-foreground'
                                : 'bg-transparent border-primary/40 text-foreground/80 hover:border-primary/60 hover:text-foreground'
                            }`}
                          >
                            {option}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>

                    {/* Project Details */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="block text-[10px] sm:text-label uppercase tracking-wider text-foreground/70 mb-2 sm:mb-3">Project Details *</label>
                      <textarea
                        placeholder="Tell us about your project..."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="w-full bg-transparent border-b border-primary/40 pb-2.5 sm:pb-3 text-sm sm:text-base text-foreground placeholder:text-foreground/60 focus:border-primary focus:outline-none transition-colors resize-none min-h-[80px]"
                      />
                    </motion.div>

                    {/* Submit Button - Primary themed */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || completionPercentage < 100}
                      whileHover={completionPercentage === 100 ? { scale: 1.01 } : {}}
                      whileTap={completionPercentage === 100 ? { scale: 0.98 } : {}}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                      className={`w-full mt-3 sm:mt-4 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 min-h-[48px] rounded-sm relative overflow-hidden ${
                        completionPercentage === 100
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : 'bg-primary/20 text-muted-foreground cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="flex items-center justify-center gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.div
                            className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Sending...
                        </motion.div>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GTMContactFormSection;
