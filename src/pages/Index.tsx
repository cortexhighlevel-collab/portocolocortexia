import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MotionImageSection from "@/components/MotionImageSection";
import ProblemaSection from "@/components/ProblemaSection";
import NovaCamadaSection from "@/components/NovaCamadaSection";
import EntregasSection from "@/components/EntregasSection";
import AEOSection from "@/components/AEOSection";
import ComoIAEntendeSection from "@/components/ComoIAEntendeSection";
import ParaQuemSection from "@/components/ParaQuemSection";
import MetodologiaSection from "@/components/MetodologiaSection";
import ResultadoSection from "@/components/ResultadoSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <MotionImageSection />
      <div className="relative z-10 bg-black">
        <ProblemaSection />
        <NovaCamadaSection />
        <EntregasSection />
        <AEOSection />
        <ComoIAEntendeSection />
        <ParaQuemSection />
        <MetodologiaSection />
        <ResultadoSection />
        <ContactSection />
        <FooterSection />
      </div>
    </div>
  );
};

export default Index;