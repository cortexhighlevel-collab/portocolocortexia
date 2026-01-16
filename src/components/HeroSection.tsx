import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
                  <ArrowUpRight className="w-5 h-5 text-primary-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
          <div className="relative flex items-center gap-3 px-7 py-3.5 bg-transparent border border-white/15 rounded cursor-pointer overflow-hidden transition-all duration-400 ease-out group hover:border-white/35 hover:shadow-[0_0_20px_rgba(255,255,255,0.08),inset_0_0_20px_rgba(255,255,255,0.02)]">
            {/* Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-white/[0.03] opacity-0 transition-opacity duration-400 group-hover:opacity-100"></div>
            
            {/* Text */}
            <span className="font-['Inter'] text-[11px] font-light tracking-[0.25em] text-white/85 uppercase transition-all duration-400 group-hover:text-white group-hover:tracking-[0.3em]">
              INICIAR SEU PROJETO
            </span>
            
            {/* Icon container */}
            <div className="flex items-center justify-center w-6 h-6 border border-white/20 rounded-sm text-white/70 transition-all duration-400 group-hover:border-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            
            {/* Shine effect */}
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent animate-[shine_4s_ease-in-out_infinite]"></div>
          </div>
        </motion.a>
      </section>
    </>;
};

export default HeroSection;