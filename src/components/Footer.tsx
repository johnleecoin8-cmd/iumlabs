import { brand } from "@/config/content";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground pb-[env(safe-area-inset-bottom)]">
      {/* Giant Brand Name - Static */}
      <div className="w-full px-4 sm:px-6 py-6 sm:py-8 md:py-12 overflow-hidden bg-background">
        <h2 className="text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[8rem] xl:text-[12rem] font-bold leading-none tracking-tighter text-center whitespace-nowrap lowercase font-display">
          <span className="text-muted-foreground/80">
            {brand.name.toLowerCase()}
          </span>
        </h2>
      </div>
      
      {/* Copyright & SEO Keywords */}
      <div className="w-full px-4 sm:px-6 pb-6 sm:pb-8 text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          © 2026 ium labs (이음 랩스). All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/40">
          Korean Web 3 Marketing, Blockchain Research, GTM Agency.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
