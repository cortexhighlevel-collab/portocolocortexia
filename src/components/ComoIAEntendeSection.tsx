import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import ComoIAEntendeSVG from "./ComoIAEntendeSVG";

const ANIMATION_DURATION_MS = 3500; // Duração total da animação do SVG

const ComoIAEntendeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(triggerRef, { once: true, amount: 0.5 });
  const [isLocked, setIsLocked] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const hasTriggeredRef = useRef(false);

  // Função para travar o scroll
  const lockScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    
    // Salvar posição atual do scroll
    const scrollY = window.scrollY;
    
    // Travar scroll
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    
    setIsLocked(true);
  }, []);

  // Função para destravar o scroll
  const unlockScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    
    // Recuperar posição do scroll
    const scrollY = document.body.style.top;
    
    // Destravar scroll
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    
    // Restaurar posição
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
    
    setIsLocked(false);
    setAnimationComplete(true);
  }, []);

  // Efeito para controlar o scroll-lock durante a animação
  useEffect(() => {
    if (isInView && !hasTriggeredRef.current && !animationComplete) {
      hasTriggeredRef.current = true;
      
      // Pequeno delay para garantir que a seção está centralizada
      const scrollTimer = setTimeout(() => {
        // Scroll suave para centralizar a seção
        sectionRef.current?.scrollIntoView({ 
          behavior: "smooth", 
          block: "center" 
        });
        
        // Travar após o scroll suave completar
        setTimeout(() => {
          lockScroll();
          
          // Destravar após a animação completar
          setTimeout(() => {
            unlockScroll();
          }, ANIMATION_DURATION_MS);
        }, 500);
      }, 100);

      return () => clearTimeout(scrollTimer);
    }
  }, [isInView, animationComplete, lockScroll, unlockScroll]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (isLocked) {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
      }
    };
  }, [isLocked]);

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
        className="absolute top-1/3 left-0 w-full h-px pointer-events-none"
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