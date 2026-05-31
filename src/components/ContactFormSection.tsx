import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  ArrowRight,
  Calendar,
  MessageCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import confetti from "canvas-confetti";
import CalendlyButton from "./CalendlyButton";

const serviceOptions = [
  "GTM Strategy",
  "KOL Marketing",
  "PR & Media",
  "Community",
  "Events",
  "Research",
  "SEO",
  "AMA",
  "Compliance",
];

const budgetOptions = ["$5K-10K", "$10K-25K", "$25K-50K", "$50K+"];

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
    message: "",
    budget: "",
    services: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fieldErrors: Record<string, string> = {};
  if (touched.name && !formData.name.trim()) fieldErrors.name = "Name is required";
  if (touched.email && !formData.email.trim()) fieldErrors.email = "Email is required";
  else if (touched.email && !emailRegex.test(formData.email)) fieldErrors.email = "Enter a valid email";

  const handleBlur = useCallback((field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const totalSteps = 3;

  const step1Complete = formData.services.length > 0;
  const step2Complete = !!formData.budget;
  const step3Complete = !!formData.name && !!formData.email && emailRegex.test(formData.email);

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    setSubmitError(null);
    if (!formData.name || !emailRegex.test(formData.email)) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: formData.name,
        email: formData.email,
        comments: `Company: ${formData.company}\nServices: ${formData.services.join(", ")}\nBudget: ${formData.budget}\n\n${formData.message}`
      });
      if (error) throw error;

      const { error: notificationError } = await supabase.functions.invoke('send-contact-notification', {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          budget: formData.budget,
          services: formData.services,
          message: formData.message
        }
      });

      if (notificationError) {
        throw notificationError;
      }

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
        setFormData({ name: "", email: "", company: "", message: "", budget: "", services: [] });
        setCurrentStep(1);
        setIsSuccess(false);
        setTouched({});
      }, 4000);
    } catch (error) {
      setSubmitError("Something went wrong. Please try again or reach us via Telegram.");
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
        <div className="px-5 sm:px-6 lg:px-10 pt-8 sm:pt-10 pb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-white tracking-[-0.01em]">Contact</h2>
        </div>


        {/* Form Section */}
        <div id="contact-form" className="border-t border-white/10">
          <div className="flex flex-col lg:flex-row">
            {/* Left Column - Contact Info (Desktop) */}
            <div className="hidden lg:block lg:w-1/3 p-8 lg:p-10 border-r border-white/15">
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


                {/* Telegram */}
                <a
                  href={brand.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between mb-8 pb-8 border-b border-white/15"
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

                {/* Email */}
                <a
                  href={`mailto:${brand.email}`}
                  className="group flex items-center justify-between mb-8 pb-8 border-b border-white/15"
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

              </div>
            </div>

            {/* Right Column - Multi-Step Form */}
            <div className="w-full lg:w-2/3 p-5 sm:p-6 md:p-8 lg:p-12">
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
                    {/* Description */}
                    <div className="mb-5 text-center">
                      <p className="text-[13px] sm:text-sm text-white/40 font-light leading-relaxed">Leave your question about the Korean/APAC market,<br className="hidden sm:block" /> and get a proposal.</p>
                    </div>

                    {/* Step Indicator */}
                    <div className="mb-4 sm:mb-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs sm:text-sm text-white/50">
                          Step {currentStep} of {totalSteps}
                        </span>
                      </div>

                      {/* Progress Steps */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${step1Complete ? 'bg-emerald-500' : currentStep >= 1 ? 'bg-white/20' : 'bg-white/10'}`} />
                        <div className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${step2Complete ? 'bg-emerald-500' : currentStep >= 2 ? 'bg-white/20' : 'bg-white/10'}`} />
                        <div className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${step3Complete ? 'bg-emerald-500' : currentStep >= 3 ? 'bg-white/20' : 'bg-white/10'}`} />
                      </div>

                      <div className="flex justify-between text-[10px] sm:text-xs text-white/40">
                        <span className={step1Complete ? 'text-emerald-400' : ''}>Services</span>
                        <span className={step2Complete ? 'text-emerald-400' : ''}>Budget</span>
                        <span className={step3Complete ? 'text-emerald-400' : ''}>Contact Info</span>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <AnimatePresence mode="wait">
                        {/* Step 1: Service Selection */}
                        {currentStep === 1 && (
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-4 sm:space-y-5"
                          >
                            <div className="mb-3">
                              <h4 className="text-base sm:text-lg font-semibold text-white mb-0.5">What service are you interested in?</h4>
                              <p className="text-xs sm:text-sm text-white/50">Select all that apply.</p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {serviceOptions.map(service => (
                                <button
                                  key={service}
                                  type="button"
                                  onClick={() => toggleService(service)}
                                  className={`px-4 py-2.5 text-[11px] sm:text-xs rounded-full border transition-all min-h-[40px] font-medium active:scale-[0.97] ${
                                    formData.services.includes(service)
                                      ? 'bg-white/20 border-white text-white'
                                      : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 hover:bg-white/10'
                                  }`}
                                >
                                  {formData.services.includes(service) && (
                                    <Check className="w-3 h-3 inline-block mr-1.5 -mt-0.5" />
                                  )}
                                  {service}
                                </button>
                              ))}
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
                              Next
                              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          </motion.div>
                        )}

                        {/* Step 2: Budget Selection */}
                        {currentStep === 2 && (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-4 sm:space-y-5"
                          >
                            <div className="mb-3">
                              <h4 className="text-base sm:text-lg font-semibold text-white mb-0.5">What's your estimated budget?</h4>
                              <p className="text-xs sm:text-sm text-white/50">Select your range.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              {budgetOptions.map(option => (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, budget: option })}
                                  className={`px-3 py-3 text-[11px] sm:text-xs rounded-lg border transition-all min-h-[48px] font-medium active:scale-[0.97] ${
                                    formData.budget === option
                                      ? 'bg-white/20 border-white text-white'
                                      : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 hover:bg-white/10'
                                  }`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              <button
                                type="button"
                                onClick={() => setCurrentStep(1)}
                                className="px-6 py-3 text-sm font-medium text-white/70 hover:text-white border border-white/20 rounded-lg transition-colors min-h-[44px] flex items-center gap-1.5"
                              >
                                <ChevronLeft className="w-4 h-4" />
                                Back
                              </button>
                              <button
                                type="button"
                                onClick={() => setCurrentStep(3)}
                                disabled={!step2Complete}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-lg transition-all duration-300 min-h-[44px] active:scale-[0.98] ${
                                  step2Complete
                                    ? 'bg-white text-black hover:bg-white/90'
                                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                                }`}
                              >
                                Next
                                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {/* Step 3: Contact Form */}
                        {currentStep === 3 && (
                          <motion.div
                            key="step3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-3 sm:space-y-4"
                          >
                            <div className="mb-3">
                              <h4 className="text-base sm:text-lg font-semibold text-white mb-0.5">Tell us about your project</h4>
                              <p className="text-xs sm:text-sm text-white/50">How can we reach you?</p>
                            </div>

                            {/* Summary Card */}
                            <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-3">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-xs text-white/50">Your Selections</span>
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
                                  <span className="text-white/40 text-xs">Services</span>
                                  <p className="text-white text-xs leading-relaxed">{formData.services.join(", ")}</p>
                                </div>
                                <div>
                                  <span className="text-white/40 text-xs">Budget</span>
                                  <p className="text-white">{formData.budget}</p>
                                </div>
                              </div>
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
                                  onBlur={() => handleBlur('name')}
                                  required
                                  className={`w-full bg-white/5 border rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:bg-white/10 focus:outline-none transition-all min-h-[44px] ${fieldErrors.name ? 'border-red-500/60 focus:border-red-500/80' : 'border-white/10 focus:border-white/30'}`}
                                />
                                <AnimatePresence>{fieldErrors.name && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-[10px] mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldErrors.name}</motion.p>}</AnimatePresence>
                              </div>
                              <div>
                                <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/70 mb-2 sm:mb-3">Email *</label>
                                <input
                                  type="email"
                                  placeholder="your@email.com"
                                  value={formData.email}
                                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                                  onBlur={() => handleBlur('email')}
                                  required
                                  className={`w-full bg-white/5 border rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:bg-white/10 focus:outline-none transition-all min-h-[44px] ${fieldErrors.email ? 'border-red-500/60 focus:border-red-500/80' : 'border-white/10 focus:border-white/30'}`}
                                />
                                <AnimatePresence>{fieldErrors.email && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-400 text-[10px] mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldErrors.email}</motion.p>}</AnimatePresence>
                              </div>
                            </div>

                            {/* Company (Optional) */}
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

                            {/* Message */}
                            <div>
                              <label className="block text-[10px] sm:text-xs uppercase tracking-wider text-white/70 mb-2 sm:mb-3">
                                Message <span className="text-white/30">(Optional)</span>
                              </label>
                              <textarea
                                placeholder="Tell us about your project, goals, and timeline..."
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm sm:text-base text-white placeholder:text-white/40 focus:border-white/30 focus:bg-white/10 focus:outline-none transition-all resize-none min-h-[120px]"
                              />
                            </div>

                            {/* Submit Error Banner */}
                            <AnimatePresence>
                              {submitError && (
                                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10 flex items-start gap-3">
                                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-red-300 text-sm">{submitError}</p>
                                    <button type="button" onClick={() => setSubmitError(null)} className="text-red-400/70 text-xs mt-1 hover:text-red-300 transition-colors">Dismiss</button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                              <button
                                type="button"
                                onClick={() => setCurrentStep(2)}
                                className="sm:w-auto px-6 py-3.5 text-sm font-medium text-white/70 hover:text-white border border-white/20 rounded-lg transition-colors min-h-[48px] flex items-center gap-1.5"
                              >
                                <ChevronLeft className="w-4 h-4" />
                                Back
                              </button>
                              <button
                                type="submit"
                                disabled={isSubmitting || !step3Complete}
                                className={`flex-1 flex items-center justify-center gap-2 py-3.5 sm:py-4 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 min-h-[52px] active:scale-[0.98] ${
                                  step3Complete
                                    ? 'bg-white text-black hover:bg-white/90'
                                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                                }`}
                              >
                                <AnimatePresence mode="wait">
                                  {isSubmitting ? (
                                    <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2">
                                      <motion.div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                                      Sending...
                                    </motion.span>
                                  ) : (
                                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2">
                                      Send Message
                                      <Send className="w-4 h-4" />
                                    </motion.span>
                                  )}
                                </AnimatePresence>
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

        {/* Mobile Contact Info - Bottom - Optimized */}
        <div className="lg:hidden border-t border-white/10 p-4 sm:p-5">
          {/* Location & Time - Top row */}
          <div className="flex items-center justify-center gap-1.5 mb-3 text-[11px] text-white/50">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">Seoul, Korea</span>
            <span className="w-px h-3 bg-white/20 mx-1" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span className="font-mono">{getSeoulTime()}</span>
          </div>

          {/* Contact buttons - Compact grid */}
          <div className="grid grid-cols-3 gap-2">
            <a
              href="/book-a-meeting"
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-[11px] text-white/70 hover:bg-white/[0.08] active:scale-[0.97] transition-all min-h-[42px]"
            >
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">Calendly</span>
            </a>
            <a
              href={brand.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-[11px] text-white/70 hover:bg-white/[0.08] active:scale-[0.97] transition-all min-h-[42px]"
            >
              <Send className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">Telegram</span>
            </a>
            <a
              href={`mailto:${brand.email}`}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-[11px] text-white/70 hover:bg-white/[0.08] active:scale-[0.97] transition-all min-h-[42px]"
            >
              <Mail className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
