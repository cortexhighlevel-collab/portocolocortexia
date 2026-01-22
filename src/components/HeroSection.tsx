import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ImageScrollSequence from "./ImageScrollSequence";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const isMobile = useIsMobile();

  return (
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

        <motion.a
          href="#contact"
          className={`cyberpunk-cta-wrapper ${isMobile ? "!scale-[0.20]" : ""}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative group rounded-full p-[6px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] via-[#555555] to-[#1a1a1a]"></div>
            <div className="absolute inset-[-100%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0_250deg,#ff0000_360deg)] opacity-100 blur-md"></div>
            <div className="absolute inset-[-100%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0_340deg,#ffffff_360deg)] opacity-40 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-black/20"></div>

            <button
              className="relative z-10 flex items-center justify-between gap-6 bg-gradient-to-b from-[#2a2a2a] via-[#0a0a0a] to-[#1a1a1a] text-white rounded-full border-2 border-[#3a3a3a] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_4px_20px_-5px_rgba(0,0,0,0.8)] transition-transform active:scale-[0.98] overflow-hidden w-[1008px] h-[92px] px-8"
            >
              <div
                className="absolute inset-0 bg-gradient-to-b from-[#333333] via-[#0a0a0a] to-[#222222] pointer-events-none opacity-80"
                style={{
                  maskImage: "linear-gradient(to right, transparent 30%, black 40%, black 60%, transparent 70%)",
                  WebkitMaskImage: "linear-gradient(to right, transparent 30%, black 40%, black 60%, transparent 70%)",
                }}
              ></div>

              <div
                className="h-2 flex-1 max-w-[180px] bg-gradient-to-b from-[#ffcccc] via-[#ff4444] to-[#ff2a2a] shadow-[0_0_4px_#ff0000,0_0_8px_#ff0000,0_0_16px_#ff0000,0_0_32px_#ff0000,0_0_48px_#cc0000,0_0_80px_#990000] rounded-full relative z-10"
              >
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/80 via-white/30 to-transparent rounded-full"></div>
              </div>

              <div className="flex items-center gap-3 z-10 shrink-0">
                <span className="font-normal text-[1.8rem] tracking-[0.15em] uppercase text-white/90 group-hover:text-white transition-colors">
                  DIAGNÓSTICO ESTRATÉGICO
                </span>
                <ArrowRight className="w-6 h-6 text-white/80" />
              </div>

              <div
                className="h-2 flex-1 max-w-[180px] bg-gradient-to-b from-[#ffcccc] via-[#ff4444] to-[#ff2a2a] shadow-[0_0_4px_#ff0000,0_0_8px_#ff0000,0_0_16px_#ff0000,0_0_32px_#ff0000,0_0_48px_#cc0000,0_0_80px_#990000] rounded-full relative z-10"
              >
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/80 via-white/30 to-transparent rounded-full"></div>
              </div>

              <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-white/8 to-transparent pointer-events-none z-20 rounded-t-full"></div>
            </button>
          </div>
        </motion.a>
      </section>
    </ImageScrollSequence>
  );
};
export default HeroSection;