import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ImageScrollSequence from "./ImageScrollSequence";
import { useIsMobile } from "@/hooks/use-mobile";
import BriefingModal from "./BriefingModal";

// ============ CONFIGURAÇÕES SEPARADAS DESKTOP / MOBILE ============
const CTA_DESKTOP_SCALE = 0.50;
// Mobile: 70% da largura da tela
const CTA_MOBILE_TARGET_WIDTH_PERCENT = 0.70;

const HeroSection = () => {
  const [briefingOpen, setBriefingOpen] = useState(false);
  const isMobile = useIsMobile();
  const [mobileScale, setMobileScale] = useState(CTA_DESKTOP_SCALE);

  useEffect(() => {
    // Mantém a escala do MOBILE isolada do DESKTOP.
    const computeMobileScale = () => {
      const vw = window.innerWidth;
      const targetWidth = vw * CTA_MOBILE_TARGET_WIDTH_PERCENT;
      setMobileScale(targetWidth / 1008);
    };

    computeMobileScale();
    window.addEventListener("resize", computeMobileScale);
    return () => window.removeEventListener("resize", computeMobileScale);
  }, []);

  // Conteúdo do CTA (idêntico nos 2 botões)
  const CTAButton = () => (
    <div className="relative group rounded-full overflow-visible shrink-0 cta-border-glow">
      <button
        onClick={() => setBriefingOpen(true)}
        className="relative z-10 flex items-center justify-between w-[1008px] h-[92px] px-8 gap-6 bg-gradient-to-b from-[#2a2a2a] via-[#0a0a0a] to-[#1a1a1a] text-white rounded-full border-[7px] border-[#3a3a3a] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_4px_20px_-5px_rgba(0,0,0,0.8)] transition-transform active:scale-[0.98] overflow-hidden cursor-pointer"
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#333333] via-[#0a0a0a] to-[#222222] pointer-events-none opacity-80"
          style={{
            maskImage: "linear-gradient(to right, transparent 30%, black 40%, black 60%, transparent 70%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 30%, black 40%, black 60%, transparent 70%)",
          }}
        ></div>

        <div className="bg-gradient-to-b from-[#ffcccc] via-[#ff4444] to-[#ff2a2a] shadow-[0_0_4px_#ff0000,0_0_8px_#ff0000,0_0_16px_#ff0000,0_0_32px_#ff0000,0_0_48px_#cc0000,0_0_80px_#990000] rounded-full relative z-10 h-2 flex-1 max-w-[180px]">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/80 via-white/30 to-transparent rounded-full"></div>
        </div>

        <div className="flex items-center gap-3 z-10 shrink-0">
          <span className="font-normal tracking-[0.15em] uppercase text-white/90 group-hover:text-white transition-colors text-[1.8rem]">
            DIAGNÓSTICO ESTRATÉGICO
          </span>
          <ArrowRight className="w-6 h-6 text-white/80" />
        </div>

        <div className="bg-gradient-to-b from-[#ffcccc] via-[#ff4444] to-[#ff2a2a] shadow-[0_0_4px_#ff0000,0_0_8px_#ff0000,0_0_16px_#ff0000,0_0_32px_#ff0000,0_0_48px_#cc0000,0_0_80px_#990000] rounded-full relative z-10 h-2 flex-1 max-w-[180px]">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/80 via-white/30 to-transparent rounded-full"></div>
        </div>

        <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-white/8 to-transparent pointer-events-none z-20 rounded-t-full"></div>
      </button>
    </div>
  );

  // Link + animação (y/opacity) separados da escala.
  // A escala fica num wrapper interno pra não conflitar com o transform do Framer Motion.
  const CTALink = ({ scale }: { scale: number }) => (
    <motion.div
      className="inline-block cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
        <CTAButton />
      </div>
    </motion.div>
  );

  return (
    <>
      <ImageScrollSequence>
        <section className="hero-section" style={{ position: "relative" }}>
          <div className="hero-content">
            <div className="hero-content-inner">
              <div className="hero-top-content">
                <motion.div
                  className={isMobile 
                    ? "fixed inset-x-0 flex flex-col items-center justify-center text-center z-40 px-4" 
                    : "scale-[1.7] origin-left"
                  }
                  style={isMobile ? { top: "62%", transform: "translateY(-50%)" } : {}}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1
                    className={`hero-headline uppercase font-bold italic text-white ${
                      isMobile
                        ? "text-[1.5rem] leading-[1.1]"
                        : "scale-[2.4] origin-left -translate-x-[40%] translate-y-[15%]"
                    }`}
                  >
                    INTELIGÊNCIA
                    <br />
                    ESTRATÉGICA
                    <br />
                    COM IA
                  </h1>

                  <p
                    className={`hero-headline uppercase font-medium italic text-zinc-400 ${
                      isMobile
                        ? "text-[0.55rem] mt-4 tracking-[0.08em]"
                        : "mt-24 scale-[1.36] origin-left -translate-x-[40%]"
                    }`}
                    style={isMobile ? {} : { fontSize: "0.55em", letterSpacing: "0.05em" }}
                  >
                    AUTOMAÇÃO • ANÁLISE • AEO • SEO
                    <br />
                    AGENTES DE IA • ENGENHARIA DE PROMPT
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </ImageScrollSequence>

      {/* CTA DESKTOP (isolado) */}
      {!isMobile && (
        <div className="cyberpunk-cta-wrapper">
          <CTALink scale={CTA_DESKTOP_SCALE} />
        </div>
      )}

      {/* CTA MOBILE (isolado) */}
      {isMobile && (
        <div className="cyberpunk-cta-wrapper">
          <CTALink scale={mobileScale} />
        </div>
      )}

      {/* Briefing Modal */}
      <BriefingModal open={briefingOpen} onOpenChange={setBriefingOpen} />
    </>
  );
};
export default HeroSection;
