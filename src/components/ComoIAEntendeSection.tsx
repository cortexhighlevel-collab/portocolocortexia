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
  const scrollPositionRef = useRef(0);

  // Função para prevenir scroll em todos os eventos
  const preventScroll = useCallback((e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, []);

  // Função para prevenir teclas de navegação
  const preventScrollKeys = useCallback((e: KeyboardEvent) => {
    const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40]; // space, pageup, pagedown, end, home, arrows
    if (keys.includes(e.keyCode)) {
      e.preventDefault();
      return false;
    }
  }, []);

  // Função para travar o scroll
  const lockScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    
    // Salvar posição atual
    scrollPositionRef.current = window.scrollY;
    
    // Adicionar event listeners para bloquear scroll
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventScrollKeys, { passive: false });
    
    // Também aplicar estilos CSS como fallback
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.width = "100%";
    document.body.style.touchAction = "none";
    
    setIsLocked(true);
  }, [preventScroll, preventScrollKeys]);

  // Função para destravar o scroll
  const unlockScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    
    // Remover event listeners
    window.removeEventListener("wheel", preventScroll);
    window.removeEventListener("touchmove", preventScroll);
    window.removeEventListener("keydown", preventScrollKeys);
    
    // Remover estilos CSS
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.touchAction = "";
    
    // Restaurar posição
    window.scrollTo(0, scrollPositionRef.current);
    
    setIsLocked(false);
    setAnimationComplete(true);
  }, [preventScroll, preventScrollKeys]);

  // Efeito para controlar o scroll-lock durante a animação
  useEffect(() => {
    if (isInView && !hasTriggeredRef.current && !animationComplete) {
      hasTriggeredRef.current = true;
      
      // Centralizar a seção primeiro
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ 
          behavior: "smooth", 
          block: "center" 
        });
      }
      
      // Travar após o scroll suave completar
      const lockTimer = setTimeout(() => {
        lockScroll();
        
        // Destravar após a animação completar
        setTimeout(() => {
          unlockScroll();
        }, ANIMATION_DURATION_MS);
      }, 600);

      return () => clearTimeout(lockTimer);
    }
  }, [isInView, animationComplete, lockScroll, unlockScroll]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      // Garantir que removemos todos os listeners
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventScrollKeys);
      
      if (document.body.style.position === "fixed") {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.touchAction = "";
      }
    };
  }, [preventScroll, preventScrollKeys]);

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