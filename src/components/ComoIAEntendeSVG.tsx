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
        // Importante: só animar elementos que são LINHAS (stroke sem fill)
        const animationStyles = `
          <style>
            /* Linhas puras - animação de desenho */
            .svg-animated > line {
              stroke-dasharray: 10000;
              stroke-dashoffset: 10000;
              animation: drawLine 2.5s ease-out forwards;
            }
            
            /* Paths que são linhas (têm stroke mas não fill sólido) */
            .svg-animated > path:not([fill="white"]) {
              stroke-dasharray: 10000;
              stroke-dashoffset: 10000;
              animation: drawLine 2.5s ease-out forwards;
            }
            
            /* Elipses (nós/pontos) - fade in */
            .svg-animated > ellipse {
              opacity: 0;
              animation: fadeInNode 0.5s ease-out forwards;
            }
            
            /* Círculos - fade in */
            .svg-animated > circle {
              opacity: 0;
              animation: fadeInNode 0.5s ease-out forwards;
            }
            
            /* Retângulos (bordas dos ícones) - fade in */
            .svg-animated > rect {
              opacity: 0;
              animation: fadeInNode 0.6s ease-out forwards;
            }
            
            /* Paths com fill (ícones, cérebro, etc) - fade in */
            .svg-animated > path[fill="white"] {
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
            
            /* === DELAYS PARA LINHAS === */
            .svg-animated > line:nth-of-type(1) { animation-delay: 0s; }
            .svg-animated > line:nth-of-type(2) { animation-delay: 0.03s; }
            .svg-animated > line:nth-of-type(3) { animation-delay: 0.06s; }
            .svg-animated > line:nth-of-type(4) { animation-delay: 0.09s; }
            .svg-animated > line:nth-of-type(5) { animation-delay: 0.12s; }
            .svg-animated > line:nth-of-type(6) { animation-delay: 0.15s; }
            .svg-animated > line:nth-of-type(7) { animation-delay: 0.18s; }
            .svg-animated > line:nth-of-type(8) { animation-delay: 0.21s; }
            .svg-animated > line:nth-of-type(9) { animation-delay: 0.24s; }
            .svg-animated > line:nth-of-type(10) { animation-delay: 0.27s; }
            .svg-animated > line:nth-of-type(n+11) { animation-delay: 0.3s; }
            .svg-animated > line:nth-of-type(n+20) { animation-delay: 0.5s; }
            .svg-animated > line:nth-of-type(n+30) { animation-delay: 0.7s; }
            .svg-animated > line:nth-of-type(n+40) { animation-delay: 0.9s; }
            .svg-animated > line:nth-of-type(n+50) { animation-delay: 1.1s; }
            
            /* === DELAYS PARA PATHS (linhas curvas) === */
            .svg-animated > path:not([fill="white"]):nth-of-type(1) { animation-delay: 0.05s; }
            .svg-animated > path:not([fill="white"]):nth-of-type(2) { animation-delay: 0.1s; }
            .svg-animated > path:not([fill="white"]):nth-of-type(3) { animation-delay: 0.15s; }
            .svg-animated > path:not([fill="white"]):nth-of-type(4) { animation-delay: 0.2s; }
            .svg-animated > path:not([fill="white"]):nth-of-type(5) { animation-delay: 0.25s; }
            .svg-animated > path:not([fill="white"]):nth-of-type(n+6) { animation-delay: 0.35s; }
            .svg-animated > path:not([fill="white"]):nth-of-type(n+10) { animation-delay: 0.5s; }
            .svg-animated > path:not([fill="white"]):nth-of-type(n+15) { animation-delay: 0.7s; }
            .svg-animated > path:not([fill="white"]):nth-of-type(n+20) { animation-delay: 0.9s; }
            
            /* === DELAYS PARA NÓS (ellipses) === */
            .svg-animated > ellipse:nth-of-type(1) { animation-delay: 0.8s; }
            .svg-animated > ellipse:nth-of-type(2) { animation-delay: 0.85s; }
            .svg-animated > ellipse:nth-of-type(3) { animation-delay: 0.9s; }
            .svg-animated > ellipse:nth-of-type(4) { animation-delay: 0.95s; }
            .svg-animated > ellipse:nth-of-type(5) { animation-delay: 1s; }
            .svg-animated > ellipse:nth-of-type(6) { animation-delay: 1.05s; }
            .svg-animated > ellipse:nth-of-type(7) { animation-delay: 1.1s; }
            .svg-animated > ellipse:nth-of-type(8) { animation-delay: 1.15s; }
            .svg-animated > ellipse:nth-of-type(9) { animation-delay: 1.2s; }
            .svg-animated > ellipse:nth-of-type(10) { animation-delay: 1.25s; }
            .svg-animated > ellipse:nth-of-type(n+11) { animation-delay: 1.3s; }
            .svg-animated > ellipse:nth-of-type(n+20) { animation-delay: 1.5s; }
            .svg-animated > ellipse:nth-of-type(n+30) { animation-delay: 1.7s; }
            .svg-animated > ellipse:nth-of-type(n+40) { animation-delay: 1.9s; }
            
            /* === DELAYS PARA ÍCONES (rects e paths com fill) === */
            .svg-animated > rect:nth-of-type(1) { animation-delay: 1.8s; }
            .svg-animated > rect:nth-of-type(2) { animation-delay: 1.9s; }
            .svg-animated > rect:nth-of-type(3) { animation-delay: 2s; }
            .svg-animated > rect:nth-of-type(4) { animation-delay: 2.1s; }
            .svg-animated > rect:nth-of-type(n+5) { animation-delay: 2.2s; }
            
            .svg-animated > path[fill="white"]:nth-of-type(1) { animation-delay: 1.8s; }
            .svg-animated > path[fill="white"]:nth-of-type(2) { animation-delay: 1.85s; }
            .svg-animated > path[fill="white"]:nth-of-type(3) { animation-delay: 1.9s; }
            .svg-animated > path[fill="white"]:nth-of-type(4) { animation-delay: 1.95s; }
            .svg-animated > path[fill="white"]:nth-of-type(5) { animation-delay: 2s; }
            .svg-animated > path[fill="white"]:nth-of-type(n+6) { animation-delay: 2.1s; }
            .svg-animated > path[fill="white"]:nth-of-type(n+10) { animation-delay: 2.2s; }
            
            /* Círculos junto com ellipses */
            .svg-animated > circle { animation-delay: 1.3s; }
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
      className="relative w-full max-w-[874px] mx-auto pb-4"
    >
      {isAnimating && svgContent ? (
        <div 
          className="w-full h-auto rounded-lg [&>svg]:w-full [&>svg]:h-auto [&>svg]:overflow-visible"
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
