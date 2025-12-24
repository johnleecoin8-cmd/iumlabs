import { brand } from "@/config/content";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground pb-[env(safe-area-inset-bottom)]">
      {/* Giant Brand Name - Static */}
      <div className="w-full px-4 py-8 sm:py-12 overflow-hidden bg-background">
        <h2 className="text-[2rem] sm:text-[3.5rem] md:text-[5.5rem] lg:text-[8rem] xl:text-[11rem] font-bold leading-none tracking-tight text-center whitespace-nowrap lowercase">
          <span className="text-muted-foreground">
            {brand.name.toLowerCase()}
          </span>
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
