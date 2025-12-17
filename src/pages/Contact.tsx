import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Send, Calendar, ArrowUpRight, ArrowRight, MessageSquare, Sparkles, Clock, CheckCircle2 } from "lucide-react";
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

const formSteps = [
  { id: 1, label: "Who are you?", fields: ["name", "email"] },
  { id: 2, label: "Your project", fields: ["company", "website"] },
  { id: 3, label: "Let's talk budget", fields: ["budget"] },
  { id: 4, label: "Tell us more", fields: ["message"] },
];

const contactMethods = [
  { 
    icon: Mail, 
    label: "Email us", 
    value: brand.email, 
    link: `mailto:${brand.email}`,
    description: "For detailed inquiries",
    color: "#06B6D4"
  },
  { 
    icon: Send, 
    label: "Telegram", 
    value: brand.telegram, 
    link: brand.telegramLink,
    description: "Quick responses",
    color: "#0EA5E9"
  },
  { 
    icon: Calendar, 
    label: "Book a call", 
    value: "30 min strategy call", 
    link: brand.calendlyUrl,
    description: "Face-to-face meeting",
    color: "#14B8A6"
  },
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
  const [isTyping, setIsTyping] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Simulate typing indicator
  useEffect(() => {
    if (formData.message.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [formData.message]);

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

      setShowSuccess(true);
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

  const canProceed = () => {
    const currentFields = formSteps[currentStep - 1].fields;
    if (currentStep === 1) return formData.name && formData.email;
    if (currentStep === 2) return true; // Optional
    if (currentStep === 3) return formData.budget;
    if (currentStep === 4) return true;
    return currentFields.every(field => formData[field as keyof typeof formData]);
  };

  const getCompletedSteps = () => {
    let completed = 0;
    if (formData.name && formData.email) completed++;
    if (formData.company || formData.website) completed++;
    if (formData.budget) completed++;
    if (formData.message) completed++;
    return completed;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      
      {/* Compact Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(6, 182, 212, 0.3) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
          <motion.div 
            className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/20 rounded-full blur-[100px]"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 text-cyan-400/70 text-xs tracking-widest mb-6">
              <MessageSquare className="w-3 h-3" />
              START A CONVERSATION
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9] tracking-tight">
              Let's build
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                something great
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Asymmetric 2-Column Layout */}
      <main className="container mx-auto max-w-7xl px-4 pb-24">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Left Column - Contact Methods (2/5) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sticky Container */}
            <div className="lg:sticky lg:top-24 space-y-6">
              
              {/* Contact Method Cards - Stacked */}
              <div className="space-y-4">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Choose your preferred way</p>
                
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.label}
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : undefined}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group block relative overflow-hidden"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    <div 
                      className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 relative overflow-hidden"
                      style={{ ['--method-color' as string]: method.color }}
                    >
                      {/* Hover Glow Line */}
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ backgroundColor: method.color }}
                      />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                            style={{ backgroundColor: `${method.color}20` }}
                          >
                            <method.icon 
                              className="w-5 h-5 transition-colors duration-300"
                              style={{ color: method.color }}
                            />
                          </div>
                          <div>
                            <p className="text-white font-medium group-hover:text-cyan-50 transition-colors">
                              {method.label}
                            </p>
                            <p className="text-white/40 text-sm">{method.description}</p>
                          </div>
                        </div>
                        <ArrowUpRight 
                          className="w-5 h-5 text-white/20 group-hover:text-white/60 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                        />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Live Status Card */}
              <motion.div 
                className="p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                  </span>
                  <span className="text-cyan-400 font-medium">We're online</span>
                </div>
                <p className="text-white/50 text-sm mb-4">
                  Seoul, South Korea • {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Seoul' })} KST
                </p>
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>Usually responds within 24 hours</span>
                </div>
              </motion.div>

              {/* Office Location */}
              <motion.div
                className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white/50" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-1">Our Office</p>
                    <p className="text-white text-sm">{brand.address}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Chat-Style Form (3/5) */}
          <div className="lg:col-span-3">
            <motion.div 
              className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Form Header - Chat Style */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Ium Labs Team</p>
                    <p className="text-cyan-400 text-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                      Ready to chat
                    </p>
                  </div>
                </div>
                
                {/* Step Progress */}
                <div className="flex items-center gap-1">
                  {formSteps.map((step, i) => (
                    <div 
                      key={step.id}
                      className={`w-8 h-1 rounded-full transition-all duration-300 ${
                        i < currentStep ? 'bg-cyan-500' : 
                        i === currentStep - 1 ? 'bg-cyan-500' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Success State */}
              <AnimatePresence mode="wait">
                {showSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-12 text-center"
                  >
                    <motion.div 
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/50 mb-8">We'll get back to you within 24 hours.</p>
                    <button 
                      onClick={() => setShowSuccess(false)}
                      className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                    >
                      Send another message →
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="p-6 md:p-8"
                  >
                    {/* Chat Messages Area */}
                    <div className="space-y-6 mb-8">
                      {/* Bot Message */}
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shrink-0">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white/5 rounded-2xl rounded-tl-sm p-4 max-w-md">
                          <p className="text-white/80 text-sm">
                            {formSteps[currentStep - 1].label === "Who are you?" && "Hey! 👋 Let's start with the basics. What's your name and email?"}
                            {formSteps[currentStep - 1].label === "Your project" && "Great to meet you! Tell us about your company. (Optional)"}
                            {formSteps[currentStep - 1].label === "Let's talk budget" && "What's your estimated budget for this project?"}
                            {formSteps[currentStep - 1].label === "Tell us more" && "Almost done! Share any additional details about your project."}
                          </p>
                        </div>
                      </div>

                      {/* User Input Area */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="pl-11 space-y-4"
                        >
                          {/* Step 1: Name & Email */}
                          {currentStep === 1 && (
                            <>
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  placeholder="Your name"
                                  value={formData.name}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  required
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                                />
                              </div>
                              <div className="space-y-2">
                                <input
                                  type="email"
                                  placeholder="your@email.com"
                                  value={formData.email}
                                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                  required
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                                />
                              </div>
                            </>
                          )}

                          {/* Step 2: Company Info */}
                          {currentStep === 2 && (
                            <>
                              <input
                                type="text"
                                placeholder="Company name (optional)"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                              />
                              <input
                                type="url"
                                placeholder="Website URL (optional)"
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                              />
                            </>
                          )}

                          {/* Step 3: Budget */}
                          {currentStep === 3 && (
                            <div className="grid grid-cols-2 gap-3">
                              {budgetOptions.map((option) => (
                                <motion.button
                                  key={option}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, budget: option })}
                                  className={`px-4 py-3 rounded-xl text-sm border transition-all text-left ${
                                    formData.budget === option
                                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                                      : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                                  }`}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  {option}
                                </motion.button>
                              ))}
                            </div>
                          )}

                          {/* Step 4: Message */}
                          {currentStep === 4 && (
                            <div className="relative">
                              <textarea
                                placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
                              />
                              {isTyping && (
                                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-cyan-400 text-xs">
                                  <span className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                  <span className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                  <span className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                              )}
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                        className={`text-sm text-white/40 hover:text-white transition-colors ${currentStep === 1 ? 'invisible' : ''}`}
                      >
                        ← Back
                      </button>

                      {currentStep < 4 ? (
                        <motion.button
                          type="button"
                          onClick={() => setCurrentStep(currentStep + 1)}
                          disabled={!canProceed()}
                          className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Continue
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      ) : (
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium disabled:opacity-50 overflow-hidden hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="relative">{isSubmitting ? "Sending..." : "Send Message"}</span>
                          <Send className="w-4 h-4 relative group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </motion.button>
                      )}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: "24h", label: "Response Time" },
                { value: "18+", label: "Projects Delivered" },
                { value: "100%", label: "Client Satisfaction" },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                  <p className="text-xl font-bold text-cyan-400">{stat.value}</p>
                  <p className="text-white/40 text-xs">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;