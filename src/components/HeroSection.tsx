import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ImageScrollSequence from "./ImageScrollSequence";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const fullText = "Sistemas cognitivos para empresas que querem dominar a era da IA. Não ferramentas. Inteligência aplicada.";
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 35);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <ImageScrollSequence>
      <section className="hero-section" style={{ position: "relative" }}>
        <div className="hero-content">
          <div className="hero-content-inner">
            <div className="hero-top-content">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1
                  className="hero-headline uppercase font-bold italic text-white"
                  style={{
                    textShadow:
                      "0 0 10px rgba(255, 0, 0, 0.8), 0 0 20px rgba(255, 0, 0, 0.6), 0 0 40px rgba(255, 0, 0, 0.4), 0 0 60px rgba(255, 0, 0, 0.3)",
                  }}
                >
                  INTELIGÊNCIA<br />
                  ESTRATÉGICA<br />
                  COM IA
                </h1>

                <p
                  className="hero-headline uppercase font-medium italic text-white/90 mt-4"
                  style={{ fontSize: "0.55em", letterSpacing: "0.05em" }}
                >
                  AUTOMAÇÃO • ANÁLISE • AEO • SEO<br />
                  AGENTES DE IA • ENGENHARIA DE PROMPT
                </p>
              </motion.div>
            </div>

            {/* Terminal code editor - positioned to the right */}
            <motion.div
              className="absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 w-[320px] md:w-[400px] lg:w-[480px]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="bg-zinc-950/95 backdrop-blur-sm border border-red-500/30 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(255,0,0,0.15)]">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 border-b border-red-500/20">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="text-xs text-white/50 font-mono ml-2">cortex_vision.tsx</span>
                </div>
                
                {/* Code content */}
                <div className="p-4 font-mono text-sm">
                  <div className="text-zinc-500 text-xs mb-2">// CORTEX AI SYSTEMS</div>
                  <div className="text-red-400 text-xs mb-3">
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-blue-400">mission</span>{" "}
                    <span className="text-white">=</span>{" "}
                    <span className="text-green-400">{`"`}</span>
                  </div>
                  <div className="text-green-400/90 text-xs leading-relaxed pl-4 border-l-2 border-red-500/40">
                    {displayedText}
                    <span className="inline-block w-2 h-4 bg-red-500 ml-0.5 animate-pulse"></span>
                  </div>
                  <div className="text-green-400 text-xs mt-3">
                    <span>{`";`}</span>
                  </div>
                  <div className="text-zinc-600 text-xs mt-4">
                    <span className="text-purple-400">export</span>{" "}
                    <span className="text-orange-400">default</span>{" "}
                    <span className="text-blue-400">mission</span>;
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.a
          href="#contact"
          className="cyberpunk-cta-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative group rounded-full p-[6px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] via-[#555555] to-[#1a1a1a]"></div>
            <div className="absolute inset-[-100%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0_250deg,#ff0000_360deg)] opacity-100 blur-md"></div>
            <div className="absolute inset-[-100%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0_340deg,#ffffff_360deg)] opacity-40 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-black/20"></div>

            <button className="relative z-10 flex items-center justify-between gap-6 w-[1008px] h-[92px] bg-gradient-to-b from-[#2a2a2a] via-[#0a0a0a] to-[#1a1a1a] text-white rounded-full px-8 border-2 border-[#3a3a3a] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_4px_20px_-5px_rgba(0,0,0,0.8)] transition-transform active:scale-[0.98] overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-b from-[#333333] via-[#0a0a0a] to-[#222222] pointer-events-none opacity-80"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent 30%, black 40%, black 60%, transparent 70%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 30%, black 40%, black 60%, transparent 70%)",
                }}
              ></div>

              <div className="h-2 flex-1 max-w-[180px] bg-gradient-to-b from-[#ffcccc] via-[#ff4444] to-[#ff2a2a] shadow-[0_0_4px_#ff0000,0_0_8px_#ff0000,0_0_16px_#ff0000,0_0_32px_#ff0000,0_0_48px_#cc0000,0_0_80px_#990000] rounded-full relative z-10">
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/80 via-white/30 to-transparent rounded-full"></div>
              </div>

              <div className="flex items-center gap-3 z-10 shrink-0">
                <span className="font-normal text-[1.8rem] tracking-[0.15em] uppercase text-white/90 group-hover:text-white transition-colors">
                  DIAGNÓSTICO ESTRATÉGICO
                </span>
                <ArrowRight className="w-6 h-6 text-white/80" />
              </div>

              <div className="h-2 flex-1 max-w-[180px] bg-gradient-to-b from-[#ffcccc] via-[#ff4444] to-[#ff2a2a] shadow-[0_0_4px_#ff0000,0_0_8px_#ff0000,0_0_16px_#ff0000,0_0_32px_#ff0000,0_0_48px_#cc0000,0_0_80px_#990000] rounded-full relative z-10">
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
