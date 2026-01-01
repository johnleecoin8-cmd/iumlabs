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
    </footer>
  );
};

export default Footer;
