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
  const [isAnimating, setIsAnimating] = useState(false);

  // Carregar o SVG e preparar para animação
  useEffect(() => {
    const svgUrl = isMobile ? comoIaEntendeMobile : comoIaEntendeBg;
    
    fetch(svgUrl)
      .then(response => response.text())
      .then(svgText => {
        // Remover width/height fixos e adicionar viewBox responsivo
        let modifiedSvg = svgText
          .replace(/width="[^"]*"/, 'width="100%"')
          .replace(/height="[^"]*"/, 'height="100%"');
        
        // CSS para animação de desenho das linhas
        const animationStyles = `
          <style>
            .svg-animated line,
            .svg-animated path[stroke] {
              stroke-dasharray: 5000;
              stroke-dashoffset: 5000;
              animation: drawLine 3s ease-out forwards;
            }
            
            .svg-animated ellipse,
            .svg-animated circle {
              opacity: 0;
              animation: fadeInNode 0.6s ease-out forwards;
            }
            
            .svg-animated rect {
              opacity: 0;
              animation: fadeInNode 0.6s ease-out forwards;
            }
            
            @keyframes drawLine {
              to {
                stroke-dashoffset: 0;
              }
            }
            
            @keyframes fadeInNode {
              to {
                opacity: 1;
              }
            }
            
            /* Delays progressivos para linhas */
            .svg-animated line:nth-of-type(1) { animation-delay: 0s; }
            .svg-animated line:nth-of-type(2) { animation-delay: 0.05s; }
            .svg-animated line:nth-of-type(3) { animation-delay: 0.1s; }
            .svg-animated line:nth-of-type(4) { animation-delay: 0.15s; }
            .svg-animated line:nth-of-type(5) { animation-delay: 0.2s; }
            .svg-animated path[stroke]:nth-of-type(1) { animation-delay: 0.1s; }
            .svg-animated path[stroke]:nth-of-type(2) { animation-delay: 0.15s; }
            .svg-animated path[stroke]:nth-of-type(3) { animation-delay: 0.2s; }
            .svg-animated path[stroke]:nth-of-type(4) { animation-delay: 0.25s; }
            .svg-animated path[stroke]:nth-of-type(5) { animation-delay: 0.3s; }
            .svg-animated path[stroke]:nth-of-type(n+6) { animation-delay: 0.4s; }
            .svg-animated path[stroke]:nth-of-type(n+10) { animation-delay: 0.6s; }
            .svg-animated path[stroke]:nth-of-type(n+15) { animation-delay: 0.8s; }
            .svg-animated path[stroke]:nth-of-type(n+20) { animation-delay: 1s; }
            .svg-animated line:nth-of-type(n+6) { animation-delay: 0.35s; }
            .svg-animated line:nth-of-type(n+10) { animation-delay: 0.5s; }
            .svg-animated line:nth-of-type(n+15) { animation-delay: 0.7s; }
            .svg-animated line:nth-of-type(n+20) { animation-delay: 0.9s; }
            .svg-animated line:nth-of-type(n+30) { animation-delay: 1.1s; }
            .svg-animated line:nth-of-type(n+40) { animation-delay: 1.3s; }
            
            /* Nós aparecem depois das linhas */
            .svg-animated ellipse:nth-of-type(1) { animation-delay: 1.5s; }
            .svg-animated ellipse:nth-of-type(2) { animation-delay: 1.55s; }
            .svg-animated ellipse:nth-of-type(3) { animation-delay: 1.6s; }
            .svg-animated ellipse:nth-of-type(4) { animation-delay: 1.65s; }
            .svg-animated ellipse:nth-of-type(5) { animation-delay: 1.7s; }
            .svg-animated ellipse:nth-of-type(n+6) { animation-delay: 1.8s; }
            .svg-animated ellipse:nth-of-type(n+10) { animation-delay: 1.9s; }
            .svg-animated ellipse:nth-of-type(n+15) { animation-delay: 2s; }
            .svg-animated ellipse:nth-of-type(n+20) { animation-delay: 2.1s; }
            .svg-animated ellipse:nth-of-type(n+30) { animation-delay: 2.2s; }
            
            /* Ícones (rects) por último */
            .svg-animated rect:nth-of-type(1) { animation-delay: 2.3s; }
            .svg-animated rect:nth-of-type(2) { animation-delay: 2.4s; }
            .svg-animated rect:nth-of-type(3) { animation-delay: 2.5s; }
            .svg-animated rect:nth-of-type(n+4) { animation-delay: 2.6s; }
          </style>
        `;
        
        // Adicionar classe ao SVG e inserir estilos
        modifiedSvg = modifiedSvg.replace(/<svg/, '<svg class="svg-animated"');
        modifiedSvg = modifiedSvg.replace(/<svg([^>]*)>/, `<svg$1>${animationStyles}`);
        
        setSvgContent(modifiedSvg);
      })
      .catch(console.error);
  }, [isMobile]);

  // Iniciar animação quando entrar na view
  useEffect(() => {
    if (isInView && svgContent && !isAnimating) {
      setIsAnimating(true);
    }
  }, [isInView, svgContent, isAnimating]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[874px] mx-auto"
    >
      {isAnimating && svgContent ? (
        <div 
          className="w-full h-auto rounded-lg [&>svg]:w-full [&>svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      ) : (
        // Placeholder com mesma proporção do SVG
        <div className="w-full aspect-[874/630] rounded-lg" />
      )}
    </div>
  );
};

export default ComoIAEntendeSVG;
