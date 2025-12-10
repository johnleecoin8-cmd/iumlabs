import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import CTASection from "@/components/CTASection";
import PageTransition from "@/components/PageTransition";
import { servicesPage } from "@/config/content";

const Services = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <PageTransition>
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">{servicesPage.pageTitle}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {servicesPage.pageDescription}
            </p>
          </div>
        </section>

        <ServicesSection />
        <CTASection />
        <Footer />
      </PageTransition>
    </div>
  );
};

export default Services;
