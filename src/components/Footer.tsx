import { brand } from "@/config/content";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground">
      {/* Giant Brand Name - Static */}
      <div className="w-full px-4 py-8 sm:py-12 overflow-hidden">
        <h2 className="text-[4rem] sm:text-[6rem] md:text-[12rem] lg:text-[20rem] xl:text-[24rem] font-light leading-none tracking-[0.08em] sm:tracking-[0.15em] text-center whitespace-nowrap">
          <span className="text-transparent" style={{
            WebkitTextStroke: '1px hsl(var(--border))'
          }}>
            {brand.name}
          </span>
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
