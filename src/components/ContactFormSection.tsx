import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Contact form section - cleaned up version
import { 
  Mail, 
  MapPin, 
  Send, 
  ArrowRight, 
  Calendar, 
  MessageCircle, 
  Sparkles,
  ChevronRight,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import confetti from "canvas-confetti";
import CalendlyButton from "./CalendlyButton";

const budgetOptions = ["$15K - $25K", "$25K - $50K", "$50K +", "Raising funds"];

interface ContactFormSectionProps {
  sectionNumber?: string;
  accentColor?: string;
}

const ContactFormSection = ({
  sectionNumber = "08",
  accentColor = "white"
}: ContactFormSectionProps) => {
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
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  // Step 1 completion (Name, Email, Budget)
  const step1Complete = formData.name && formData.email && formData.budget;
  // Step 2 completion (Project Details)
  const step2Complete = formData.message;
  
  const totalSteps = 2;
  const overallProgress = step1Complete ? (step2Complete ? 100 : 50) : 0;

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

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      setIsSuccess(true);
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours."
      });
      
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          company: "",
          website: "",
          message: "",
          budget: ""
        });
        setCurrentStep(1);
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

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    formElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="bg-[#0A0A0A]">
      <div className="border-t border-white/15">
        {/* Section Header */}
        <div className="bg-[#1A1A1A] flex items-center justify-between p-4 md:px-10 md:py-4 border-b border-white/10">
          <div className="flex items-center gap-4 md:gap-6">
            <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-widest w-6">{sectionNumber}</span>
            <h2 className="text-lg md:text-xl font-medium text-white">Contact</h2>
          </div>
          <span className="text-xs text-white/50 tracking-wider hidden sm:block px-3 py-1 border border-white/20 rounded-full">Get Started</span>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-primary/[0.03]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
          
          <div className="relative px-3 sm:px-4 md:px-6 pt-4 sm:pt-5 md:pt-6 pb-2 sm:pb-3 md:pb-4">
            {/* Hero Title */}
            <div className="text-center mb-3 sm:mb-4">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight"
              >
                Korea is a Black Box.
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
              >
                Most global narratives fail here. Request our analysis deck to navigate the asymmetry.
              </motion.p>
              <motion.a
                href="mailto:info@iumlabs.io?subject=Request%20for%20Korea%20Market%20Analysis%20Deck"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all"
              >
                Request Analysis Deck
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div id="contact-form" className="border-t border-white/10">
          <div className="flex flex-col lg:flex-row">
            {/* Left Column - Contact Info (Desktop) */}
            <div className="hidden lg:block lg:w-2/5 p-8 lg:p-12 border-r border-white/15">
              <div className="sticky top-24">
                <span className="text-[10px] uppercase tracking-wider text-white/40 mb-4 block">Contact Info</span>
                
                {/* Office */}
                <div className="mb-8 pb-8 border-b border-white/15">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-white/40 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-label uppercase tracking-wider text-white/50 block mb-2">Office</span>
                      <p className="text-white text-sm leading-relaxed">{brand.address}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-caption text-white/50">Live in Seoul • {getSeoulTime()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <a 
                  href={`mailto:${brand.email}`} 
                  className="group flex items-center justify-between mb-8 pb-8 border-b border-white/15 hover:border-white/25 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-white/40 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-label uppercase tracking-wider text-white/50 block mb-2">Email</span>
                      <p className="text-white text-sm">{brand.email}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/25 group-hover:text-white/65 group-hover:translate-x-1.5 transition-all flex-shrink-0" />
                </a>

                {/* Telegram */}
                <a 
                  href={brand.telegramLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center justify-between"
                >
                  <div className="flex items-start gap-4">
                    <Send className="w-5 h-5 text-white/40 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-label uppercase tracking-wider text-white/50 block mb-2">Telegram</span>
                      <p className="text-white text-sm">{brand.telegram}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/25 group-hover:text-white/65 group-hover:translate-x-1.5 transition-all flex-shrink-0" />
                </a>
              </div>
            </div>

            {/* Right Column - Multi-Step Form */}
            <div className="w-full lg:w-3/5 p-4 sm:p-6 md:p-8 lg:p-12">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-12 sm:py-20 text-center"
                  >
                    <div className="relative mb-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Check className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
                      </div>
                      <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-emerald-400 animate-pulse" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">Message Sent!</h4>
                    <p className="text-white/60 text-sm sm:text-base">We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Step Indicator */}
                    <div className="mb-4 sm:mb-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs sm:text-sm text-white/50">
                          Step {currentStep} of {totalSteps}
                        </span>
                        <span className="text-xs sm:text-sm text-white/50">{overallProgress}%</span>
                      </div>
                      
                      {/* Progress Steps */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${step1Complete ? 'bg-emerald-500' : 'bg-white/20'}`} />
                        <div className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${step2Complete ? 'bg-emerald-500' : 'bg-white/20'}`} />
                      </div>
                      
                      <div className="flex justify-between text-[10px] sm:text-xs text-white/40">
                        <span className={step1Complete ? 'text-emerald-400' : ''}>Contact Info</span>
                        <span className={step2Complete ? 'text-emerald-400' : ''}>Project Details</span>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-3 sm:space-y-4"
                          >
                            <div className="mb-3">
                              <h4 className="text-base sm:text-lg font-semibold text-white mb-0.5">Tell us about yourself</h4>
                              <p className="text-xs sm:text-sm text-white/50">Basic contact information</p>
                            </div>

                            {/* Name & Email */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                              <div>
                                <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/70 mb-2 sm:mb-3">Name *</label>
                                <input
                                  type="text"
                                  placeholder="Your name"
                                  value={formData.name}
                                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                                  required
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-white/30 focus:bg-white/10 focus:outline-none transition-all min-h-[44px]"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/70 mb-2 sm:mb-3">Email *</label>
                                <input
                                  type="email"
                                  placeholder="your@email.com"
                                  value={formData.email}
                                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                                  required
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-white/30 focus:bg-white/10 focus:outline-none transition-all min-h-[44px]"
                                />
                              </div>
                            </div>

                            {/* Company & Website (Optional) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                              <div>
                                <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/70 mb-2 sm:mb-3">
                                  Company <span className="text-white/30">(Optional)</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="Company name"
                                  value={formData.company}
                                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-white/30 focus:bg-white/10 focus:outline-none transition-all min-h-[44px]"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/70 mb-2 sm:mb-3">
                                  Website <span className="text-white/30">(Optional)</span>
                                </label>
                                <input
                                  type="url"
                                  placeholder="https://..."
                                  value={formData.website}
                                  onChange={e => setFormData({ ...formData, website: e.target.value })}
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-white/30 focus:bg-white/10 focus:outline-none transition-all min-h-[44px]"
                                />
                              </div>
                            </div>

                            {/* Budget */}
                            <div>
                              <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/70 mb-2">Budget *</label>
                              <div className="grid grid-cols-2 gap-2">
                                {budgetOptions.map(option => (
                                  <button
                                    key={option}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, budget: option })}
                                    className={`px-3 py-2.5 text-[11px] sm:text-xs rounded-lg border transition-all min-h-[40px] font-medium active:scale-[0.97] ${
                                      formData.budget === option
                                        ? 'bg-white/20 border-white text-white'
                                        : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 hover:bg-white/10'
                                    }`}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Next Button */}
                            <button
                              type="button"
                              onClick={() => setCurrentStep(2)}
                              disabled={!step1Complete}
                              className={`w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-lg transition-all duration-300 min-h-[44px] active:scale-[0.98] ${
                                step1Complete
                                  ? 'bg-white text-black hover:bg-white/90'
                                  : 'bg-white/10 text-white/40 cursor-not-allowed'
                              }`}
                            >
                              Continue
                              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          </motion.div>
                        )}

                        {currentStep === 2 && (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-3 sm:space-y-4"
                          >
                            <div className="mb-3">
                              <h4 className="text-base sm:text-lg font-semibold text-white mb-0.5">Tell us about your project</h4>
                              <p className="text-xs sm:text-sm text-white/50">What are you looking to achieve?</p>
                            </div>

                            {/* Summary Card */}
                            <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-3">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-xs text-white/50">Contact Info</span>
                                <button
                                  type="button"
                                  onClick={() => setCurrentStep(1)}
                                  className="text-xs text-white/50 hover:text-white transition-colors"
                                >
                                  Edit
                                </button>
                              </div>
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <span className="text-white/40 text-xs">Name</span>
                                  <p className="text-white truncate">{formData.name}</p>
                                </div>
                                <div>
                                  <span className="text-white/40 text-xs">Email</span>
                                  <p className="text-white truncate">{formData.email}</p>
                                </div>
                                <div>
                                  <span className="text-white/40 text-xs">Budget</span>
                                  <p className="text-white">{formData.budget}</p>
                                </div>
                                {formData.company && (
                                  <div>
                                    <span className="text-white/40 text-xs">Company</span>
                                    <p className="text-white truncate">{formData.company}</p>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Project Details */}
                            <div>
                              <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/70 mb-2 sm:mb-3">
                                Project Details *
                              </label>
                              <textarea
                                placeholder="Tell us about your project, goals, and timeline..."
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                rows={5}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm sm:text-base text-white placeholder:text-white/40 focus:border-white/30 focus:bg-white/10 focus:outline-none transition-all resize-none min-h-[140px]"
                              />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                              <button
                                type="button"
                                onClick={() => setCurrentStep(1)}
                                className="sm:w-auto px-6 py-3.5 text-sm font-medium text-white/70 hover:text-white border border-white/20 rounded-lg transition-colors min-h-[48px]"
                              >
                                Back
                              </button>
                              <button
                                type="submit"
                                disabled={isSubmitting || !step2Complete}
                                className={`flex-1 flex items-center justify-center gap-2 py-3.5 sm:py-4 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 min-h-[52px] active:scale-[0.98] ${
                                  step2Complete
                                    ? 'bg-white text-black hover:bg-white/90'
                                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                                }`}
                              >
                                {isSubmitting ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                    Sending...
                                  </>
                                ) : (
                                  <>
                                    Send Message
                                    <Send className="w-4 h-4" />
                                  </>
                                )}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Contact Info - Bottom */}
        <div className="lg:hidden border-t border-white/10 p-4 sm:p-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href={`mailto:${brand.email}`}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 hover:bg-white/10 transition-colors min-h-[44px]"
            >
              <Mail className="w-4 h-4" />
              {brand.email}
            </a>
            <a 
              href={brand.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 hover:bg-white/10 transition-colors min-h-[44px]"
            >
              <Send className="w-4 h-4" />
              {brand.telegram}
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-white/40">
            <MapPin className="w-3.5 h-3.5" />
            <span>Seoul, South Korea</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{getSeoulTime()}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
