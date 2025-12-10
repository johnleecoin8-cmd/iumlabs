import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import CTASection from "@/components/CTASection";

const Services = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Page Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Our Services</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Web3 프로젝트의 성공을 위한 종합적인 마케팅 솔루션을 제공합니다.
            전략 수립부터 실행까지 원스톱으로 지원합니다.
          </p>
        </div>
      </section>

      <ServicesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Services;
