import { brand } from "@/config/content";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground pb-[env(safe-area-inset-bottom)]">
      {/* Giant Brand Name - Static */}
      <div className="w-full px-3 sm:px-4 py-4 sm:py-6 md:py-10 overflow-hidden bg-background">
        <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[4rem] lg:text-[7rem] xl:text-[10rem] font-bold leading-none tracking-tight text-center whitespace-nowrap lowercase">
          <span className="text-muted-foreground">
            {brand.name.toLowerCase()}
          </span>
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
