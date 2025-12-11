import { useEffect, useState } from "react";

const sections = [
  { id: "hero", number: "01", label: "Hero" },
  { id: "about", number: "02", label: "About" },
  { id: "cases", number: "03", label: "Cases" },
  { id: "services", number: "04", label: "Services" },
  { id: "team", number: "05", label: "Team" },
  { id: "guides", number: "06", label: "Guides" },
  { id: "blog", number: "07", label: "Blog" },
  { id: "contact", number: "08", label: "Contact" },
];

const SectionIndicator = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isLightSection, setIsLightSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(index);
            // Check if current section is light (screen-5, screen-6, screen-7)
            setIsLightSection(index >= 4 && index <= 6);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`group flex items-center gap-3 transition-all duration-300 ${
            activeSection === index 
              ? "opacity-100" 
              : "opacity-40 hover:opacity-70"
          }`}
        >
          {/* Number */}
          <span 
            className={`text-xs font-mono transition-colors duration-300 ${
              isLightSection 
                ? activeSection === index ? "text-primary" : "text-zinc-600"
                : activeSection === index ? "text-primary" : "text-white/60"
            }`}
          >
            [ {section.number} ]
          </span>

          {/* Progress Line */}
          <div 
            className={`w-8 h-[2px] transition-all duration-300 ${
              isLightSection
                ? activeSection === index ? "bg-primary" : "bg-zinc-300"
                : activeSection === index ? "bg-primary" : "bg-white/20"
            } ${activeSection === index ? "w-12" : "w-8"}`}
          />

          {/* Label - shows on hover */}
          <span 
            className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap ${
              isLightSection ? "text-zinc-600" : "text-white/60"
            }`}
          >
            {section.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SectionIndicator;
