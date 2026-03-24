import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  ArrowRight,
  ChevronRight,
  Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import CalendlyButton from "./CalendlyButton";

const budgetOptions = ["$15K - $25K", "$25K - $50K", "$50K +", "Raising funds"];

interface ContactFormSectionProps {
  sectionNumber?: string;
}

const ContactFormSection = ({ sectionNumber = "05" }: ContactFormSectionProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [seoulTime, setSeoulTime] = useState("");

  const step1Complete = formData.name && formData.email && formData.budget;
  const step2Complete = formData.message;
  const totalSteps = 2;
  const overallProgress = step1Complete ? (step2Complete ? 100 : 50) : 0;

  useEffect(() => {
    const update = () => {
      setSeoulTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Seoul",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name,
        email: formData.email,
        comments: `Company: ${formData.company}\nWebsite: ${formData.website}\nBudget: ${formData.budget}\n\n${formData.message}`,
      });
      if (error) throw error;

      supabase.functions
        .invoke("send-contact-notification", {
          body: {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            budget: formData.budget,
            message: formData.message,
          },
        })
        .catch(console.error);

      setIsSuccess(true);
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });

      setTimeout(() => {
        setFormData({ name: "", email: "", company: "", website: "", message: "", budget: "" });
        setCurrentStep(1);
        setIsSuccess(false);
      }, 4000);
    } catch {
      toast({ title: "Failed to send", description: "Please try again or contact us directly.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-white/[0.2] focus:bg-white/[0.05] focus:outline-none transition-all min-h-[46px]";

  return (
    <section className="bg-black">
      {/* Section Header */}
      <div className="flex items-center justify-between px-6 lg:px-10 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-6 lg:gap-8">
          <span className="text-[10px] md:text-xs text-white/25 font-mono tracking-widest">
            {sectionNumber}
          </span>
          <h2 className="text-base md:text-lg font-medium text-white">Contact</h2>
        </div>
        <span className="text-[11px] text-white/30 tracking-wider hidden sm:block">
          Get Started
        </span>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row">
        {/* Left — Contact Info (Desktop) */}
        <div className="hidden lg:block lg:w-1/3 px-10 py-12 border-r border-white/[0.06]">
          <div className="sticky top-24 space-y-8">
            <span className="text-[10px] uppercase tracking-[0.15em] text-white/25 block">
              Contact Info
            </span>

            {/* Office */}
            <div className="pb-8 border-b border-white/[0.06]">
              <div className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-white/30 block mb-2">
                    Office
                  </span>
                  <p className="text-white/70 text-sm leading-relaxed">{brand.address}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-white/30">Seoul · {seoulTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            {brand.email && (
              <a
                href={`mailto:${brand.email}`}
                className="group flex items-center justify-between pb-8 border-b border-white/[0.06] hover:border-white/[0.12] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <Mail className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-white/30 block mb-2">
                      Email
                    </span>
                    <p className="text-white/70 text-sm">{brand.email}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-white/15 group-hover:text-white/40 group-hover:translate-x-1 transition-all" />
              </a>
            )}

            {/* Telegram */}
            <a
              href={brand.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between pb-8 border-b border-white/[0.06]"
            >
              <div className="flex items-start gap-4">
                <Send className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-white/30 block mb-2">
                    Telegram
                  </span>
                  <p className="text-white/70 text-sm">{brand.telegram}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/15 group-hover:text-white/40 group-hover:translate-x-1 transition-all" />
            </a>

            {/* Calendly */}
            <CalendlyButton className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors">
              Schedule a call →
            </CalendlyButton>
          </div>
        </div>

        {/* Right — Form */}
        <div className="w-full lg:w-2/3 px-6 lg:px-12 py-8 lg:py-12" id="contact-form">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 sm:py-24 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center mb-5">
                  <Check className="w-6 h-6 text-white/70" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Message Sent</h4>
                <p className="text-sm text-white/40">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-sm text-white/35 text-center mb-6">
                  Leave your question about Korean/APAC market, and get a proposal.
                </p>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs text-white/30">
                      Step {currentStep} of {totalSteps}
                    </span>
                    <span className="text-xs text-white/30">{overallProgress}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                        step1Complete ? "bg-white" : "bg-white/[0.08]"
                      }`}
                    />
                    <div
                      className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                        step2Complete ? "bg-white" : "bg-white/[0.08]"
                      }`}
                    />
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase tracking-[0.12em] text-white/40 mb-2">
                              Name *
                            </label>
                            <input
                              type="text"
                              placeholder="Your name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-[0.12em] text-white/40 mb-2">
                              Email *
                            </label>
                            <input
                              type="email"
                              placeholder="your@email.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                              className={inputClass}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase tracking-[0.12em] text-white/40 mb-2">
                              Company <span className="text-white/15">(Optional)</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Company name"
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-[0.12em] text-white/40 mb-2">
                              Website <span className="text-white/15">(Optional)</span>
                            </label>
                            <input
                              type="url"
                              placeholder="https://..."
                              value={formData.website}
                              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                              className={inputClass}
                            />
                          </div>
                        </div>

                        {/* Budget */}
                        <div>
                          <label className="block text-[10px] uppercase tracking-[0.12em] text-white/40 mb-2">
                            Budget *
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {budgetOptions.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => setFormData({ ...formData, budget: option })}
                                className={`px-3 py-3 text-xs rounded-xl border transition-all min-h-[44px] font-medium ${
                                  formData.budget === option
                                    ? "bg-white text-black border-white"
                                    : "bg-white/[0.03] border-white/[0.08] text-white/50 hover:border-white/[0.15] hover:bg-white/[0.06]"
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          disabled={!step1Complete}
                          className={`w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold rounded-full transition-all min-h-[48px] ${
                            step1Complete
                              ? "bg-white text-black hover:bg-white/90"
                              : "bg-white/[0.06] text-white/25 cursor-not-allowed"
                          }`}
                        >
                          Continue
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div>
                          <h4 className="text-base font-semibold text-white mb-1">
                            Tell us about your project
                          </h4>
                          <p className="text-xs text-white/30">What are you looking to achieve?</p>
                        </div>

                        {/* Summary */}
                        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-white/30">Contact Info</span>
                            <button
                              type="button"
                              onClick={() => setCurrentStep(1)}
                              className="text-xs text-white/30 hover:text-white/60 transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-white/20 text-xs">Name</span>
                              <p className="text-white/70 truncate">{formData.name}</p>
                            </div>
                            <div>
                              <span className="text-white/20 text-xs">Budget</span>
                              <p className="text-white/70">{formData.budget}</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-[0.12em] text-white/40 mb-2">
                            Project Details *
                          </label>
                          <textarea
                            placeholder="Tell us about your project, goals, and timeline..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={5}
                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-white/[0.2] focus:bg-white/[0.05] focus:outline-none transition-all resize-none min-h-[140px]"
                          />
                        </div>

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="px-6 py-3.5 text-sm font-medium text-white/40 border border-white/[0.08] rounded-full hover:border-white/[0.15] hover:text-white/60 transition-all min-h-[48px]"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting || !step2Complete}
                            className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold rounded-full transition-all min-h-[48px] ${
                              step2Complete
                                ? "bg-white text-black hover:bg-white/90"
                                : "bg-white/[0.06] text-white/25 cursor-not-allowed"
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

      {/* Mobile Contact Info */}
      <div className="lg:hidden border-t border-white/[0.06] px-6 py-5">
        <div className="flex items-center justify-center gap-2 mb-4 text-xs text-white/30">
          <MapPin className="w-3 h-3" />
          <span>Seoul, Korea</span>
          <span className="w-px h-3 bg-white/10 mx-1" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono">{seoulTime}</span>
        </div>

        <div className="flex gap-3">
          {brand.email && (
            <a
              href={`mailto:${brand.email}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/[0.03] border border-white/[0.06] rounded-full text-xs text-white/50 hover:bg-white/[0.06] transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              Email
            </a>
          )}
          <a
            href={brand.telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/[0.03] border border-white/[0.06] rounded-full text-xs text-white/50 hover:bg-white/[0.06] transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            Telegram
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
