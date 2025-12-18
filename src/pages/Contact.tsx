import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Send, Calendar, ArrowRight, ArrowLeft, Check, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { brand } from "@/config/content";
import CalendlyButton from "@/components/CalendlyButton";

const budgetOptions = [
  "$15,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 +",
  "Looking to raise funds",
];

const contactInfo = [
  { icon: Mail, label: "Email", value: brand.email, link: `mailto:${brand.email}` },
  { icon: Phone, label: "Phone", value: brand.phone, link: `tel:${brand.phone.replace(/\s/g, '')}` },
  { icon: Send, label: "Telegram", value: brand.telegram, link: brand.telegramLink },
  { icon: MapPin, label: "Office", value: brand.address, link: "#" },
];

const steps = [
  { id: 1, title: "Your Info", icon: "👤" },
  { id: 2, title: "Budget", icon: "💰" },
  { id: 3, title: "Message", icon: "💬" },
];

const Contact = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canProceed = () => {
    if (currentStep === 1) return formData.name && formData.email;
    if (currentStep === 2) return formData.budget;
    return true;
  };

  const handleNext = () => {
    if (canProceed() && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
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

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", company: "", website: "", message: "", budget: "" });
      setCurrentStep(1);
    } catch (error) {
      toast({
        title: "Failed to send",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get current time in Seoul
  const seoulTime = new Date().toLocaleTimeString('en-US', { 
    timeZone: 'Asia/Seoul', 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Hero - Split Layout */}
      <main className="p-0.5 sm:p-1 md:p-2 bg-[#0A0A0A]">
        <section className="relative min-h-[50vh] flex items-center overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-950/30 via-[#0A0A0A] to-teal-950/20">
          <div className="container mx-auto max-w-7xl px-4 md:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Title */}
              <div>
                <motion.span 
                  className="text-xs text-cyan-400/70 mb-4 block tracking-widest"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  [ Contact ]
                </motion.span>
                <motion.h1 
                  className="text-5xl md:text-7xl font-light text-white leading-[0.9] tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Let's<br />
                  T<span className="serif-italic text-cyan-400">a</span>lk
                </motion.h1>
                <motion.p 
                  className="text-white/50 mt-6 max-w-md text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Tell us about your project and we'll explain how we can help you succeed in Korea.
                </motion.p>
              </div>

              {/* Right: Seoul Time Card */}
              <motion.div 
                className="hidden lg:flex flex-col items-end"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-right">
                  <p className="text-white/40 text-sm mb-2 flex items-center gap-2 justify-end">
                    <Clock className="w-4 h-4" />
                    Seoul Time
                  </p>
                  <p className="text-4xl font-light text-cyan-400 tracking-wider">{seoulTime}</p>
                  <p className="text-white/30 text-sm mt-2">Mon-Fri • 10AM - 7PM KST</p>
                  
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-white/50 text-sm">Response time</p>
                    <p className="text-white text-lg">Within 24 hours</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Main Content: 2-Column Layout */}
      <section className="bg-[#0A0A0A] border-t border-cyan-500/20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 min-h-[70vh]">
            
            {/* Left: Multi-Step Form */}
            <div className="p-6 md:p-12 lg:p-16 lg:border-r border-white/10">
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-12">
                {steps.map((step, i) => (
                  <div key={step.id} className="flex items-center">
                    <motion.button
                      onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                      className={`flex items-center gap-3 ${currentStep > step.id ? 'cursor-pointer' : 'cursor-default'}`}
                      whileHover={currentStep > step.id ? { scale: 1.05 } : {}}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                        currentStep === step.id 
                          ? 'bg-cyan-500 text-white' 
                          : currentStep > step.id 
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' 
                            : 'bg-white/5 text-white/30 border border-white/10'
                      }`}>
                        {currentStep > step.id ? <Check className="w-5 h-5" /> : step.icon}
                      </div>
                      <span className={`hidden sm:block text-sm ${
                        currentStep >= step.id ? 'text-white' : 'text-white/30'
                      }`}>
                        {step.title}
                      </span>
                    </motion.button>
                    
                    {i < steps.length - 1 && (
                      <div className={`w-8 md:w-16 h-px mx-2 md:mx-4 ${
                        currentStep > step.id ? 'bg-cyan-500' : 'bg-white/10'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Form Steps */}
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-2xl font-medium text-white mb-2">Your Information</h2>
                        <p className="text-white/50 text-sm">Let us know who you are.</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Name *</label>
                          <input
                            type="text"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-500 focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Email *</label>
                          <input
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-500 focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Company</label>
                          <input
                            type="text"
                            placeholder="Company name"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-500 focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Website</label>
                          <input
                            type="url"
                            placeholder="https://..."
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-500 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-2xl font-medium text-white mb-2">Budget Range</h2>
                        <p className="text-white/50 text-sm">Select your estimated budget.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {budgetOptions.map((option) => (
                          <motion.button
                            key={option}
                            type="button"
                            onClick={() => setFormData({ ...formData, budget: option })}
                            className={`p-4 rounded-xl text-left border transition-all ${
                              formData.budget === option
                                ? 'bg-cyan-500/20 border-cyan-500 text-white'
                                : 'bg-white/5 border-white/10 text-white/60 hover:border-cyan-500/40 hover:bg-white/[0.02]'
                            }`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{option}</span>
                              {formData.budget === option && (
                                <Check className="w-5 h-5 text-cyan-400" />
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-2xl font-medium text-white mb-2">Your Message</h2>
                        <p className="text-white/50 text-sm">Tell us about your project and goals.</p>
                      </div>
                      
                      <div>
                        <textarea
                          placeholder="Describe your project, goals, and any specific requirements..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={6}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                        />
                      </div>

                      {/* Summary */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Summary</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/50">Name</span>
                            <span className="text-white">{formData.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/50">Email</span>
                            <span className="text-white">{formData.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/50">Budget</span>
                            <span className="text-cyan-400">{formData.budget}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/10">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 3 ? (
                    <motion.button
                      type="button"
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                        canProceed()
                          ? 'bg-cyan-500 text-white hover:bg-cyan-400'
                          : 'bg-white/10 text-white/30 cursor-not-allowed'
                      }`}
                      whileHover={canProceed() ? { scale: 1.02 } : {}}
                      whileTap={canProceed() ? { scale: 0.98 } : {}}
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-400 hover:to-teal-400 transition-all disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </form>
            </div>

            {/* Right: Contact Info + Illustration */}
            <div className="p-6 md:p-12 lg:p-16 bg-gradient-to-br from-cyan-950/10 to-transparent flex flex-col justify-between">
              {/* Contact Cards */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white mb-6">Direct Contact</h3>
                {contactInfo.map((info, index) => (
                  <motion.a 
                    key={info.label}
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-4 p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                      <info.icon className="w-5 h-5 text-white/50 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/40 text-xs mb-0.5">{info.label}</p>
                      <p className="text-white text-sm font-medium group-hover:text-cyan-50 transition-colors">{info.value}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-cyan-400 transition-colors" />
                  </motion.a>
                ))}
              </div>

              {/* Book a Meeting CTA */}
              <motion.div 
                className="mt-12 p-6 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-lg font-medium text-white mb-2">Prefer a call?</h3>
                <p className="text-white/50 text-sm mb-4">
                  Book a 30-minute strategy call to discuss your Korean market entry.
                </p>
                <CalendlyButton className="w-full flex items-center justify-center gap-2 bg-white text-[#0A0A0A] px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors">
                  <Calendar className="w-4 h-4" />
                  Book a Meeting
                </CalendlyButton>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
