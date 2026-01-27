import { brand } from "@/config/content";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background text-foreground" style={{
      paddingBottom: 'env(safe-area-inset-bottom)'
    }}>
      {/* Giant Brand Name - Static */}
      <div className="w-full px-3 sm:px-6 py-4 sm:py-8 overflow-hidden bg-background md:py-[20px]">
        <h2 className="text-[2rem] sm:text-[3rem] md:text-[5rem] lg:text-[8rem] xl:text-[12rem] font-bold leading-none tracking-tighter text-center whitespace-nowrap lowercase font-display">
          <span className="text-muted-foreground/80">
            {brand.name.toLowerCase()}
          </span>
        </h2>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-white/10 py-4 px-4">
        <p className="text-center text-xs text-white/40">
          © {currentYear} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;