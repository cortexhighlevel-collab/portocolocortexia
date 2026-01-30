import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import comoIaEntendeBg from "@/assets/como-ia-entende-diagram.svg";
import comoIaEntendeMobile from "@/assets/como-ia-entende-mobile.svg";
import { useIsMobile } from "@/hooks/use-mobile";

const ComoIAEntendeSVG = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [svgContent, setSvgContent] = useState<string>("");

  // Carregar e modificar o SVG para adicionar animações de linha
  useEffect(() => {
    const svgUrl = isMobile ? comoIaEntendeMobile : comoIaEntendeBg;
    
    fetch(svgUrl)
      .then(response => response.text())
      .then(svgText => {
        // Adicionar estilos de animação ao SVG
        const styleTag = `
          <style>
            @keyframes drawLine {
              from {
                stroke-dashoffset: var(--line-length, 1000);
              }
              to {
                stroke-dashoffset: 0;
              }
            }
            
            @keyframes fadeInNode {
              from {
                opacity: 0;
                transform: scale(0);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
            
            @keyframes glowPulse {
              0%, 100% {
                filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
              }
              50% {
                filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
              }
            }
            
            line, path:not([fill="white"]) {
              stroke-dasharray: 5000;
              stroke-dashoffset: 5000;
              animation: drawLine 2.5s ease-out forwards;
            }
            
            ellipse, circle, rect {
              opacity: 0;
              transform-origin: center;
              animation: fadeInNode 0.5s ease-out forwards;
            }
            
            /* Delays progressivos para as linhas - efeito raiz */
            line:nth-of-type(1), path:nth-of-type(1) { animation-delay: 0s; }
            line:nth-of-type(2), path:nth-of-type(2) { animation-delay: 0.05s; }
            line:nth-of-type(3), path:nth-of-type(3) { animation-delay: 0.1s; }
            line:nth-of-type(4), path:nth-of-type(4) { animation-delay: 0.15s; }
            line:nth-of-type(5), path:nth-of-type(5) { animation-delay: 0.2s; }
            line:nth-of-type(6), path:nth-of-type(6) { animation-delay: 0.25s; }
            line:nth-of-type(7), path:nth-of-type(7) { animation-delay: 0.3s; }
            line:nth-of-type(8), path:nth-of-type(8) { animation-delay: 0.35s; }
            line:nth-of-type(9), path:nth-of-type(9) { animation-delay: 0.4s; }
            line:nth-of-type(10), path:nth-of-type(10) { animation-delay: 0.45s; }
            line:nth-of-type(n+11), path:nth-of-type(n+11) { animation-delay: 0.5s; }
            line:nth-of-type(n+21), path:nth-of-type(n+21) { animation-delay: 0.7s; }
            line:nth-of-type(n+31), path:nth-of-type(n+31) { animation-delay: 0.9s; }
            line:nth-of-type(n+41), path:nth-of-type(n+41) { animation-delay: 1.1s; }
            line:nth-of-type(n+51), path:nth-of-type(n+51) { animation-delay: 1.3s; }
            
            /* Delays para os nós (ellipses) - aparecem após as linhas */
            ellipse:nth-of-type(1) { animation-delay: 0.8s; }
            ellipse:nth-of-type(2) { animation-delay: 0.85s; }
            ellipse:nth-of-type(3) { animation-delay: 0.9s; }
            ellipse:nth-of-type(4) { animation-delay: 0.95s; }
            ellipse:nth-of-type(5) { animation-delay: 1s; }
            ellipse:nth-of-type(6) { animation-delay: 1.05s; }
            ellipse:nth-of-type(7) { animation-delay: 1.1s; }
            ellipse:nth-of-type(8) { animation-delay: 1.15s; }
            ellipse:nth-of-type(9) { animation-delay: 1.2s; }
            ellipse:nth-of-type(10) { animation-delay: 1.25s; }
            ellipse:nth-of-type(n+11) { animation-delay: 1.3s; }
            ellipse:nth-of-type(n+21) { animation-delay: 1.5s; }
            ellipse:nth-of-type(n+31) { animation-delay: 1.7s; }
            ellipse:nth-of-type(n+41) { animation-delay: 1.9s; }
            
            /* Retângulos (ícones) aparecem por último */
            rect:nth-of-type(1) { animation-delay: 2s; }
            rect:nth-of-type(2) { animation-delay: 2.1s; }
            rect:nth-of-type(3) { animation-delay: 2.2s; }
            rect:nth-of-type(4) { animation-delay: 2.3s; }
            rect:nth-of-type(5) { animation-delay: 2.4s; }
            rect:nth-of-type(n+6) { animation-delay: 2.5s; }
            
            /* Glow pulse após tudo aparecer */
            svg {
              animation: glowPulse 3s ease-in-out infinite;
              animation-delay: 3s;
            }
          </style>
        `;
        
        // Inserir o style tag logo após a abertura do SVG
        const modifiedSvg = svgText.replace(/<svg([^>]*)>/, `<svg$1>${styleTag}`);
        setSvgContent(modifiedSvg);
      })
      .catch(console.error);
  }, [isMobile]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[874px] mx-auto"
    >
      {isInView && svgContent && (
        <div 
          className="w-full h-auto rounded-lg"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      )}
      
      {/* Placeholder enquanto carrega ou antes de entrar na view */}
      {(!isInView || !svgContent) && (
        <div className="w-full aspect-[874/630] bg-background/50 rounded-lg" />
      )}
    </div>
  );
};

export default ComoIAEntendeSVG;
