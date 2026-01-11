import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      {/* Main content - appears after hero scroll space */}
      <div className="relative z-10 bg-background">
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <PricingSection />
        <ContactSection />
        <FooterSection />
      </div>
    </div>
  );
};

export default Index;
