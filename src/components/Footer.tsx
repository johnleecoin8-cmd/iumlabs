import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, Send, Mail, ArrowUp } from "lucide-react";
import { brand, navigation } from "@/config/content";
const brandConfig = {
  name: brand.name,
  email: brand.email,
  telegram: brand.telegramLink,
  linkedin: brand.linkedin,
  office: brand.address,
  phone: brand.phone
};
const navLinks = navigation.links.map(link => ({
  to: link.href,
  label: link.name
}));
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <footer className="bg-[hsl(0,0%,4%)] text-white">
      {/* Top Section - Have a Project? */}
      <div className="border-b border-white/10">
        
      </div>

      {/* Middle Section - 3 Column Layout */}
      

      {/* Giant Brand Name */}
      <div className="container mx-auto px-6 pb-12 overflow-hidden">
        <h2 className="text-[4rem] md:text-[8rem] lg:text-[12rem] font-light leading-none tracking-tight text-center whitespace-nowrap">
          <span className="text-transparent" style={{
          WebkitTextStroke: '1px rgba(255,255,255,0.15)'
        }}>
            {brandConfig.name}
          </span>
        </h2>
      </div>
    </footer>;
};
export default Footer;