import { brand } from "@/config/content";
const Footer = () => {
  return <footer className="bg-background text-foreground" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 4.5rem)' }}>
      {/* Giant Brand Name - Static */}
      <div className="w-full px-3 sm:px-6 py-4 sm:py-8 overflow-hidden bg-background md:py-[20px]">
        <h2 className="text-[2rem] sm:text-[3rem] md:text-[5rem] lg:text-[8rem] xl:text-[12rem] font-bold leading-none tracking-tighter text-center whitespace-nowrap lowercase font-display">
          <span className="text-muted-foreground/80">
            {brand.name.toLowerCase()}
          </span>
        </h2>
      </div>
      
      {/* Copyright & SEO Keywords */}
      <div className="w-full px-3 sm:px-6 pb-4 sm:pb-8 text-center space-y-1.5 sm:space-y-2">
        <p className="text-xs sm:text-sm text-muted-foreground">
          © 2026 ium labs (이음 랩스). All rights reserved.
        </p>
        <p className="text-[10px] sm:text-xs text-muted-foreground/40">
          Korean Web 3 Marketing, Blockchain Research, GTM Agency.
        </p>
      </div>
    </footer>;
};
export default Footer;