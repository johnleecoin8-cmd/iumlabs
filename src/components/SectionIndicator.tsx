import { useEffect, useState } from "react";
const sections = [{
  id: "hero",
  number: "01",
  label: "Hero"
}, {
  id: "about",
  number: "02",
  label: "About"
}, {
  id: "cases",
  number: "03",
  label: "Cases"
}, {
  id: "services",
  number: "04",
  label: "Services"
}, {
  id: "team",
  number: "05",
  label: "Team"
}, {
  id: "guides",
  number: "06",
  label: "Guides"
}, {
  id: "blog",
  number: "07",
  label: "Blog"
}, {
  id: "contact",
  number: "08",
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
  return <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      {sections.map((section, index) => {})}
    </div>;
};
export default SectionIndicator;