import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import ComoIAEntendeSVG from "./ComoIAEntendeSVG";

const ANIMATION_DURATION_MS = 3500; // Duração total da animação do SVG

const ComoIAEntendeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(triggerRef, { once: true, amount: 0.3 });
  const [isLocked, setIsLocked] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const hasTriggeredRef = useRef(false);

  // Função para prevenir scroll via wheel
  const preventWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
  }, []);

  // Função para prevenir scroll via touch
  const preventTouch = useCallback((e: TouchEvent) => {
    e.preventDefault();
  }, []);

  // Função para prevenir teclas de navegação
  const preventScrollKeys = useCallback((e: KeyboardEvent) => {
    const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40]; // space, pageup, pagedown, end, home, arrows
    if (keys.includes(e.keyCode)) {
      e.preventDefault();
    }
  }, []);

  // Função para travar o scroll - apenas event listeners, sem mudar layout
  const lockScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    
    // Bloquear eventos de scroll
    document.addEventListener("wheel", preventWheel, { passive: false });
    document.addEventListener("touchmove", preventTouch, { passive: false });
    document.addEventListener("keydown", preventScrollKeys);
    
    // Apenas overflow hidden no HTML para bloquear scrollbar
    document.documentElement.style.overflow = "hidden";
    
    setIsLocked(true);
  }, [preventWheel, preventTouch, preventScrollKeys]);

  // Função para destravar o scroll
  const unlockScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    
    // Remover event listeners
    document.removeEventListener("wheel", preventWheel);
    document.removeEventListener("touchmove", preventTouch);
    document.removeEventListener("keydown", preventScrollKeys);
    
    // Restaurar overflow
    document.documentElement.style.overflow = "";
    
    setIsLocked(false);
    setAnimationComplete(true);
  }, [preventWheel, preventTouch, preventScrollKeys]);

  // Efeito para controlar o scroll-lock durante a animação
  useEffect(() => {
    if (isInView && !hasTriggeredRef.current && !animationComplete) {
      hasTriggeredRef.current = true;
      
      // Travar o scroll imediatamente quando a seção entra em view
      lockScroll();
      
      // Destravar após a animação completar
      const unlockTimer = setTimeout(() => {
        unlockScroll();
      }, ANIMATION_DURATION_MS);

      return () => clearTimeout(unlockTimer);
    }
  }, [isInView, animationComplete, lockScroll, unlockScroll]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      document.removeEventListener("wheel", preventWheel);
      document.removeEventListener("touchmove", preventTouch);
      document.removeEventListener("keydown", preventScrollKeys);
      document.documentElement.style.overflow = "";
    };
  }, [preventWheel, preventTouch, preventScrollKeys]);

  // Container animation with stagger for children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  // Individual element animations
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };
  
  return (
    <section 
      ref={sectionRef}
      id="como-ia-entende" 
      className="relative py-32 md:py-48 bg-background overflow-hidden"
    >
      {/* Trigger invisível para detectar entrada na viewport */}
      <div 
        ref={triggerRef} 
        className="absolute top-1/4 left-0 w-full h-px pointer-events-none"
        aria-hidden="true"
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Título centralizado no topo */}
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Como a IA <span className="text-gradient-accent">entende você</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Treinamos modelos para interpretar seu negócio e operar de forma autônoma.
            </p>
          </motion.div>

          {/* SVG animado com efeito sequencial */}
          <div className="flex justify-center">
            <ComoIAEntendeSVG />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComoIAEntendeSection;