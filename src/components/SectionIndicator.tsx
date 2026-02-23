import { useEffect, useState } from "react";
const sections = [{
  id: "hero",
  number: "01",
  label: "Hero"
}, {
  id: "why-choose-us",
  number: "01",
  label: "About"
}, {
  id: "services",
  number: "02",
  label: "Services"
}, {
  id: "cases",
  number: "03",
  label: "Cases"
}, {
  id: "insights",
  number: "04",
  label: "Insights"
}, {
  id: "contact",
  number: "05",
  label: "Contact"
}];
const SectionIndicator = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isLightSection, setIsLightSection] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const {
            offsetTop,
            offsetHeight
          } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(index);
            // Check if current section is light (screen-5, screen-6, screen-7)
            setIsLightSection(index >= 4 && index <= 6);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return null;
};
export default SectionIndicator;