import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemaSection from "@/components/ProblemaSection";
import NovaCamadaSection from "@/components/NovaCamadaSection";
import ServicesSection from "@/components/ServicesSection";
import EntregasSection from "@/components/EntregasSection";
import ParaQuemSection from "@/components/ParaQuemSection";
import MetodologiaSection from "@/components/MetodologiaSection";
import ProjectsSection from "@/components/ProjectsSection";
import AEOSection from "@/components/AEOSection";
import ComoIAEntendeSection from "@/components/ComoIAEntendeSection";
import ResultadoSection from "@/components/ResultadoSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <div className="relative z-[60] bg-black">
        {/* 1. Problema - Criar tensão */}
        <ProblemaSection />
        {/* 2. Nova Camada - Apresentar conceito */}
        <NovaCamadaSection />
        {/* 3. Soluções - Cards de serviços */}
        <ServicesSection />
        {/* 4. Entregas - Detalhamento técnico */}
        <EntregasSection />
        {/* 5. Para Quem - Segmentação */}
        <ParaQuemSection />
        {/* 6. Metodologia - Processo */}
        <MetodologiaSection />
        {/* 7. Casos de Sucesso - Prova social */}
        <ProjectsSection />
        {/* 8. AEO - Diferencial técnico */}
        <AEOSection />
        {/* 9. Como IA Entende - Autoridade */}
        <ComoIAEntendeSection />
        {/* 10. Resultado - Transformação */}
        <ResultadoSection />
        {/* 11. FAQ - Perguntas frequentes */}
        <FAQSection />
        {/* 12. Contato - CTA final */}
        <ContactSection />
        <FooterSection />
      </div>
    </div>
  );
};

export default Index;