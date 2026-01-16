import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ImageScrollSequence from "./ImageScrollSequence";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isPinned, setIsPinned] = useState(true);
  const [cortexVisible, setCortexVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hero content unpins after scrolling 200vh (the full scroll container)
      const scrollEnd = window.innerHeight * 2;
      setIsPinned(window.scrollY < scrollEnd - window.innerHeight);
      
      // CORTEX appears after scrolling past 1.5x viewport height
      setCortexVisible(window.scrollY > window.innerHeight * 1.5);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <>
      {/* Image sequence controlled by scroll */}
      <ImageScrollSequence />
      
      <section className="hero-section" style={{
      position: isPinned ? 'fixed' : 'absolute',
      top: isPinned ? 0 : 'auto',
      bottom: isPinned ? 'auto' : 'calc(100% - 200vh)',
      left: 0,
      zIndex: 1
    }}>
        <div className="hero-content">
          <div className="hero-content-inner">
            {/* Headline and CTA */}
            <div className="hero-top-content">
              <motion.h1 className="hero-headline uppercase font-medium" initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }}>
                EU CRIO E DESENVOLVO SITES DE ALTA CONVERSÃO E ECONOMIZO SEU TEMPO COM AUTOMAÇÕES DE IA
              </motion.h1>

              <motion.a href="https://tidycal.com/reemtech/30-minute-meeting" target="_blank" rel="noopener noreferrer" className="hero-cta-button group font-normal" initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.4
            }}>
                <span className="hero-cta-text">Iniciar Seu Projeto</span>
                <div className="hero-cta-icon">
                  <ArrowRight className="w-5 h-5 text-primary-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.a>
            </div>

          </div>
        </div>

        {/* Cyberpunk CTA Button - Centered below character head */}
        <motion.a 
          href="https://tidycal.com/reemtech/30-minute-meeting" 
          target="_blank" 
          rel="noopener noreferrer"
          className="cyberpunk-cta-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* WRAPPER */}
          <div className="relative group rounded-full p-[6px] overflow-hidden">
            {/* 1. FUNDO METÁLICO DA MOLDURA */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] via-[#555555] to-[#1a1a1a]"></div>
            
            {/* 2. BRILHO GIRATÓRIO (SHINE) */}
            <div className="absolute inset-[-100%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0_250deg,#ff0000_360deg)] opacity-100 blur-md"></div>
            <div className="absolute inset-[-100%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0_340deg,#ffffff_360deg)] opacity-40 mix-blend-overlay"></div>
            
            {/* 3. CONTRASTE */}
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* BOTÃO PRINCIPAL */}
            <button className="relative z-10 flex items-center justify-between gap-10 w-[800px] h-20 bg-gradient-to-b from-[#3a3a3a] via-[#111111] to-black text-white rounded-full px-10 border-[3px] border-[#555555] shadow-[inset_30px_0_40px_-10px_rgba(0,0,0,0.9),inset_-30px_0_40px_-10px_rgba(0,0,0,0.9)] transition-transform active:scale-[0.98] overflow-hidden">
              {/* CAMADA CENTRAL DE REFLEXO */}
              <div 
                className="absolute inset-0 bg-gradient-to-b from-[#444444] via-black to-[#444444] pointer-events-none opacity-90"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 35%, black 45%, black 55%, transparent 65%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 35%, black 45%, black 55%, transparent 65%)'
                }}
              ></div>
              
              {/* NEON ESQUERDO */}
              <div className="h-1.5 flex-1 bg-red-50 shadow-[0_0_2px_#fff,0_0_5px_#fff,0_0_15px_#ff0000,0_0_30px_#ff0000,0_0_60px_#cc0000,0_0_100px_#880000] rounded-full opacity-90 group-hover:opacity-100 transition-all duration-300 relative z-10"></div>
              
              {/* CONTEÚDO */}
              <div className="flex items-center gap-4 z-10 shrink-0">
                <span className="font-light text-2xl tracking-[0.25em] uppercase text-gray-100 group-hover:text-white transition-colors">
                  INICIAR SEU PROJETO
                </span>
                <ArrowRight className="w-8 h-8 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
              </div>
              
              {/* NEON DIREITO */}
              <div className="h-1.5 flex-1 bg-red-50 shadow-[0_0_2px_#fff,0_0_5px_#fff,0_0_15px_#ff0000,0_0_30px_#ff0000,0_0_60px_#cc0000,0_0_100px_#880000] rounded-full opacity-90 group-hover:opacity-100 transition-all duration-300 relative z-10"></div>
              
              {/* REFLEXO VIDRO */}
              <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-20"></div>
            </button>
          </div>
        </motion.a>
      </section>
    </>;
};

export default HeroSection;