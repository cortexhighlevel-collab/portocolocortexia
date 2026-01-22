import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ImageScrollSequence from "./ImageScrollSequence";
import { useIsMobile } from "@/hooks/use-mobile";

// ============ CONFIGURAÇÕES SEPARADAS DESKTOP / MOBILE ============
const CTA_DESKTOP_SCALE = 0.50;
const CTA_MOBILE_TARGET_WIDTH_PERCENT = 0.60; // 60% da largura da tela (reduzido 30%)

const HeroSection = () => {
  const isMobile = useIsMobile();
  const [mobileScale, setMobileScale] = useState(0.3);

  useEffect(() => {
    const computeMobileScale = () => {
      const vw = window.innerWidth;
      const targetWidth = vw * CTA_MOBILE_TARGET_WIDTH_PERCENT;
      const fitScale = targetWidth / 1008;
      setMobileScale(fitScale);
    };

    computeMobileScale();
    window.addEventListener("resize", computeMobileScale);
    return () => window.removeEventListener("resize", computeMobileScale);
  }, []);

  return (
    <>
      <ImageScrollSequence>
        <section className="hero-section" style={{ position: "relative" }}>
          <div className="hero-content">
            <div className="hero-content-inner">
              <div className="hero-top-content">
                <motion.div
                  className={isMobile ? "origin-center w-full flex flex-col items-center text-center" : "scale-[1.7] origin-left"}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1
                    className={`hero-headline uppercase font-bold italic text-white ${
                      isMobile
                        ? "text-[1.8rem] leading-[1.1]"
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
                        ? "text-[0.65rem] mt-6 tracking-[0.08em]"
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

      {/* CTA fora da section para evitar overflow:hidden */}
      <div className="cyberpunk-cta-wrapper">
        <motion.a
          href="#contact"
          className="inline-block"
          style={{ scale: isMobile ? mobileScale : CTA_DESKTOP_SCALE }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative group rounded-full overflow-visible shrink-0 cta-border-glow">
            <button
              className="relative z-10 flex items-center justify-between w-[1008px] h-[92px] px-8 gap-6 bg-gradient-to-b from-[#2a2a2a] via-[#0a0a0a] to-[#1a1a1a] text-white rounded-full border-[7px] border-[#3a3a3a] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_4px_20px_-5px_rgba(0,0,0,0.8)] transition-transform active:scale-[0.98] overflow-hidden"
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
        </motion.a>
      </div>
    </>
  );
};
export default HeroSection;
