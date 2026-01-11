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
              <motion.h1 className="hero-headline" initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }}>
                Eu crio e desenvolvo sites de alta conversão e economizo seu tempo com automações de IA
              </motion.h1>

              <motion.a href="https://tidycal.com/reemtech/30-minute-meeting" target="_blank" rel="noopener noreferrer" className="hero-cta-button group" initial={{
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
      </section>
    </>;
};

export default HeroSection;