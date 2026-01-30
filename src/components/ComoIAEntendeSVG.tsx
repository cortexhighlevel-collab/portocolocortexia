import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import comoIaEntendeBg from "@/assets/como-ia-entende-diagram.svg";
import comoIaEntendeMobile from "@/assets/como-ia-entende-mobile.svg";
import { useIsMobile } from "@/hooks/use-mobile";

// Configuração das "raízes" - linhas que crescem organicamente
const rootLines = [
  // Raízes principais (mais grossas, mais longas)
  { angle: 0, length: 55, delay: 0, thickness: 2, branches: [{ angle: 25, length: 30, delay: 0.3 }, { angle: -20, length: 25, delay: 0.4 }] },
  { angle: 45, length: 50, delay: 0.1, thickness: 2, branches: [{ angle: 15, length: 28, delay: 0.35 }] },
  { angle: 90, length: 52, delay: 0.05, thickness: 2, branches: [{ angle: -25, length: 32, delay: 0.3 }, { angle: 20, length: 22, delay: 0.45 }] },
  { angle: 135, length: 48, delay: 0.15, thickness: 2, branches: [{ angle: -15, length: 26, delay: 0.4 }] },
  { angle: 180, length: 53, delay: 0.08, thickness: 2, branches: [{ angle: 22, length: 30, delay: 0.32 }, { angle: -18, length: 24, delay: 0.42 }] },
  { angle: 225, length: 47, delay: 0.12, thickness: 2, branches: [{ angle: 18, length: 27, delay: 0.38 }] },
  { angle: 270, length: 50, delay: 0.06, thickness: 2, branches: [{ angle: -22, length: 29, delay: 0.35 }, { angle: 25, length: 23, delay: 0.48 }] },
  { angle: 315, length: 49, delay: 0.1, thickness: 2, branches: [{ angle: -17, length: 25, delay: 0.4 }] },
  
  // Raízes secundárias (mais finas)
  { angle: 22, length: 42, delay: 0.2, thickness: 1.5, branches: [] },
  { angle: 67, length: 38, delay: 0.25, thickness: 1.5, branches: [] },
  { angle: 112, length: 40, delay: 0.22, thickness: 1.5, branches: [] },
  { angle: 157, length: 36, delay: 0.28, thickness: 1.5, branches: [] },
  { angle: 202, length: 41, delay: 0.24, thickness: 1.5, branches: [] },
  { angle: 247, length: 37, delay: 0.26, thickness: 1.5, branches: [] },
  { angle: 292, length: 39, delay: 0.23, thickness: 1.5, branches: [] },
  { angle: 337, length: 35, delay: 0.27, thickness: 1.5, branches: [] },
];

const ComoIAEntendeSVG = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[874px] mx-auto overflow-hidden"
    >
      {/* Raízes crescendo do centro */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          {rootLines.map((root, i) => (
            <g key={i}>
              {/* Linha principal da raiz */}
              <motion.line
                x1="50"
                y1="50"
                x2={50 + Math.cos(root.angle * Math.PI / 180) * root.length}
                y2={50 + Math.sin(root.angle * Math.PI / 180) * root.length}
                stroke="white"
                strokeWidth={root.thickness * 0.15}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { 
                  pathLength: 1, 
                  opacity: [0, 1, 1, 0]
                } : { pathLength: 0, opacity: 0 }}
                transition={{ 
                  pathLength: { duration: 1.5, delay: root.delay, ease: "easeOut" },
                  opacity: { duration: 2.5, delay: root.delay, times: [0, 0.1, 0.7, 1] }
                }}
              />
              
              {/* Ramificações */}
              {root.branches.map((branch, j) => {
                const startX = 50 + Math.cos(root.angle * Math.PI / 180) * (root.length * 0.6);
                const startY = 50 + Math.sin(root.angle * Math.PI / 180) * (root.length * 0.6);
                const branchAngle = root.angle + branch.angle;
                
                return (
                  <motion.line
                    key={j}
                    x1={startX}
                    y1={startY}
                    x2={startX + Math.cos(branchAngle * Math.PI / 180) * branch.length}
                    y2={startY + Math.sin(branchAngle * Math.PI / 180) * branch.length}
                    stroke="white"
                    strokeWidth={0.12}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { 
                      pathLength: 1, 
                      opacity: [0, 0.8, 0.8, 0]
                    } : { pathLength: 0, opacity: 0 }}
                    transition={{ 
                      pathLength: { duration: 1.2, delay: root.delay + branch.delay, ease: "easeOut" },
                      opacity: { duration: 2, delay: root.delay + branch.delay, times: [0, 0.1, 0.7, 1] }
                    }}
                  />
                );
              })}
            </g>
          ))}
          
          {/* Ponto central pulsante */}
          <motion.circle
            cx="50"
            cy="50"
            r="1.5"
            fill="white"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { 
              scale: [0, 1.5, 1],
              opacity: [0, 1, 0]
            } : { scale: 0, opacity: 0 }}
            transition={{ 
              duration: 2,
              times: [0, 0.3, 1],
              ease: "easeOut"
            }}
          />
        </svg>
      </div>

      {/* Imagem revelada com clip-path circular crescendo */}
      <motion.img 
        src={isMobile ? comoIaEntendeMobile : comoIaEntendeBg} 
        alt="Como a IA entende você" 
        className="w-full h-auto rounded-lg"
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={isInView ? { 
          clipPath: "circle(75% at 50% 50%)"
        } : { clipPath: "circle(0% at 50% 50%)" }}
        transition={{ 
          duration: 2.5,
          ease: [0.25, 0.1, 0.25, 1]
        }}
      />

      {/* Ondas de expansão sutis */}
      {[0, 0.4, 0.8].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 pointer-events-none"
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={isInView ? { 
            width: ["0%", "120%"],
            height: ["0%", "120%"],
            opacity: [0, 0.4, 0]
          } : { width: 0, height: 0, opacity: 0 }}
          transition={{ 
            duration: 2,
            delay,
            ease: "easeOut",
            times: [0, 0.5, 1]
          }}
        />
      ))}
    </div>
  );
};

export default ComoIAEntendeSVG;
