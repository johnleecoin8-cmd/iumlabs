import CalendlyButton from "./CalendlyButton";

const CTABannerSection = () => {
  return (
    <section className="bg-[#050508] py-24 md:py-36 px-6 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-50" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
          Bridge the Gap.
        </h2>
        <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-10">
          From global vision to local impact — powered by data, delivered by experts.
        </p>
        <CalendlyButton 
          calendlyUrl="https://calendly.com/iumlabs-info/30min"
          className="bg-white text-black hover:bg-white/90 font-medium px-8 py-3 rounded-full"
        />
      </div>
    </section>
  );
};

export default CTABannerSection;