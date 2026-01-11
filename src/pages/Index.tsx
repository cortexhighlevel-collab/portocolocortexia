import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import RisingSection from "@/components/RisingSection";
import { useLenis } from "@/hooks/useLenis";

const Index = () => {
  // Enable smooth scrolling
  useLenis();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      {/* Main content - rises up from below */}
      <RisingSection>
        <div className="bg-background">
          <ServicesSection />
          <ProjectsSection />
          <ProcessSection />
          <PricingSection />
          <ContactSection />
          <FooterSection />
        </div>
      </RisingSection>
    </div>
  );
};

export default Index;
