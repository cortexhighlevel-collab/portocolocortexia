import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import comoIaEntendeBg from "@/assets/como-ia-entende-diagram.svg";
import comoIaEntendeMobile from "@/assets/como-ia-entende-mobile.svg";
import { useIsMobile } from "@/hooks/use-mobile";

const ComoIAEntendeSVG = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Definir as camadas de animação com delays progressivos
  const layers = [
    { id: "brain", delay: 0, clipPath: "inset(30% 30% 30% 30%)" }, // Centro (cérebro)
    { id: "inner-nodes", delay: 0.3, clipPath: "inset(20% 20% 20% 20%)" }, // Nós internos
    { id: "mid-nodes", delay: 0.5, clipPath: "inset(10% 10% 40% 10%)" }, // Nós médios superiores
    { id: "icons", delay: 0.7, clipPath: "inset(0% 0% 60% 0%)" }, // Ícones superiores
    { id: "connections-left", delay: 0.9, clipPath: "inset(20% 50% 20% 0%)" }, // Conexões esquerda
    { id: "connections-right", delay: 1.1, clipPath: "inset(20% 0% 20% 50%)" }, // Conexões direita
    { id: "bottom-left", delay: 1.3, clipPath: "inset(60% 50% 0% 0%)" }, // Canto inferior esquerdo
    { id: "bottom-right", delay: 1.5, clipPath: "inset(60% 0% 0% 50%)" }, // Canto inferior direito
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[874px] mx-auto"
    >
      {/* Camada base - totalmente visível após animação */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <img 
          src={isMobile ? comoIaEntendeMobile : comoIaEntendeBg} 
          alt="Como a IA entende você" 
          className="w-full h-auto rounded-lg svg-lines-pulse"
        />
      </motion.div>

      {/* Camadas animadas que revelam partes do SVG */}
      {layers.map((layer) => (
        <motion.div
          key={layer.id}
          className="absolute inset-0"
          style={{ clipPath: layer.clipPath }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { 
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1, 1, 1]
          } : { opacity: 0, scale: 0.8 }}
          transition={{ 
            duration: 1.2,
            delay: layer.delay,
            times: [0, 0.3, 0.7, 1],
            ease: "easeOut"
          }}
        >
          <img 
            src={isMobile ? comoIaEntendeMobile : comoIaEntendeBg} 
            alt=""
            aria-hidden="true"
            className="w-full h-auto rounded-lg"
            style={{ 
              filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))"
            }}
          />
        </motion.div>
      ))}

      {/* Efeito de scan line que percorre */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"
          style={{ boxShadow: "0 0 30px 10px rgba(255, 255, 255, 0.5)" }}
          initial={{ top: "0%" }}
          animate={isInView ? { top: "100%" } : { top: "0%" }}
          transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};

export default ComoIAEntendeSVG;
