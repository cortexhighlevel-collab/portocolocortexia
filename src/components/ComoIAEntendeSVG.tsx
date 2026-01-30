import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import comoIaEntendeBg from "@/assets/como-ia-entende-diagram.svg";
import comoIaEntendeMobile from "@/assets/como-ia-entende-mobile.svg";
import { useIsMobile } from "@/hooks/use-mobile";

const ComoIAEntendeSVG = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[874px] mx-auto overflow-hidden"
    >
      {/* Imagem base com animação de fade-in e efeito de desenho via CSS */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img 
          src={isMobile ? comoIaEntendeMobile : comoIaEntendeBg} 
          alt="Como a IA entende você" 
          className="w-full h-auto rounded-lg"
          initial={{ 
            clipPath: "circle(0% at 50% 50%)",
            filter: "blur(8px)"
          }}
          animate={isInView ? { 
            clipPath: "circle(100% at 50% 50%)",
            filter: "blur(0px)"
          } : { 
            clipPath: "circle(0% at 50% 50%)",
            filter: "blur(8px)"
          }}
          transition={{ 
            duration: 2.5,
            ease: "easeOut",
            clipPath: { duration: 2.5, ease: "easeOut" },
            filter: { duration: 1, delay: 1.5 }
          }}
        />
      </motion.div>

      {/* Efeito de "raízes" se expandindo do centro */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={isInView ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.5 }}
      >
        {/* Linhas radiais que "crescem" do centro */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 h-[1px] bg-gradient-to-r from-white/80 via-white/40 to-transparent origin-left"
            style={{
              transform: `rotate(${i * 30}deg)`,
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { 
              width: "60%", 
              opacity: [0, 1, 1, 0] 
            } : { width: 0, opacity: 0 }}
            transition={{ 
              duration: 2,
              delay: 0.1 * i,
              ease: "easeOut",
              opacity: { times: [0, 0.2, 0.8, 1] }
            }}
          />
        ))}
      </motion.div>

      {/* Pulso central que se expande */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 pointer-events-none"
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={isInView ? { 
          width: ["0%", "150%"],
          height: ["0%", "150%"],
          opacity: [0, 0.5, 0]
        } : { width: 0, height: 0, opacity: 0 }}
        transition={{ 
          duration: 2,
          ease: "easeOut",
          times: [0, 0.7, 1]
        }}
      />
      
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 pointer-events-none"
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={isInView ? { 
          width: ["0%", "200%"],
          height: ["0%", "200%"],
          opacity: [0, 0.3, 0]
        } : { width: 0, height: 0, opacity: 0 }}
        transition={{ 
          duration: 2.5,
          delay: 0.3,
          ease: "easeOut",
          times: [0, 0.7, 1]
        }}
      />
    </div>
  );
};

export default ComoIAEntendeSVG;
