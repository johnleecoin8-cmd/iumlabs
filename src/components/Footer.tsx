import { brand } from "@/config/content";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground pb-[env(safe-area-inset-bottom)]">
      {/* Giant Brand Name - Static */}
      <div className="w-full px-4 py-4 sm:py-6 overflow-hidden">
        <h2 className="text-[1.7rem] sm:text-[2.2rem] md:text-[3.3rem] lg:text-[4.4rem] xl:text-[5.5rem] font-light leading-none tracking-[0.2em] sm:tracking-[0.3em] text-center whitespace-nowrap">
          <span className="text-foreground/30">
            {brand.name}
          </span>
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
