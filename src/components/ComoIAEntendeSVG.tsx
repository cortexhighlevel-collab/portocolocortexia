import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import comoIaEntendeBg from "@/assets/como-ia-entende-diagram.svg";
import comoIaEntendeMobile from "@/assets/como-ia-entende-mobile.svg";
import { useIsMobile } from "@/hooks/use-mobile";

const ComoIAEntendeSVG = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [svgContent, setSvgContent] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState(false);

  // Carregar o SVG
  useEffect(() => {
    const svgUrl = isMobile ? comoIaEntendeMobile : comoIaEntendeBg;
    
    fetch(svgUrl)
      .then(response => response.text())
      .then(svgText => {
        // Remover width/height fixos
        let modifiedSvg = svgText
          .replace(/width="[^"]*"/, 'width="100%"')
          .replace(/height="[^"]*"/, 'height="100%"');
        
        // Adicionar classe ao SVG
        modifiedSvg = modifiedSvg.replace(/<svg/, '<svg class="svg-animated"');
        
        setSvgContent(modifiedSvg);
      })
      .catch(console.error);
  }, [isMobile]);

  // Aplicar animações quando o SVG estiver carregado e visível
  useEffect(() => {
    if (isInView && svgContent && !isAnimating && svgContainerRef.current) {
      setIsAnimating(true);
      
      const svg = svgContainerRef.current.querySelector('svg');
      if (!svg) return;

      // Animar linhas e paths (elementos com stroke)
      const lines = svg.querySelectorAll('line');
      const paths = svg.querySelectorAll('path');
      const ellipses = svg.querySelectorAll('ellipse');
      const circles = svg.querySelectorAll('circle');
      const rects = svg.querySelectorAll('rect');

      // Configurar e animar linhas
      lines.forEach((line, index) => {
        const length = Math.sqrt(
          Math.pow((line.x2?.baseVal?.value || 0) - (line.x1?.baseVal?.value || 0), 2) +
          Math.pow((line.y2?.baseVal?.value || 0) - (line.y1?.baseVal?.value || 0), 2)
        );
        
        line.style.strokeDasharray = `${length}`;
        line.style.strokeDashoffset = `${length}`;
        line.style.animation = `drawLine 2s ease-out forwards`;
        line.style.animationDelay = `${Math.min(index * 0.03, 1.2)}s`;
      });

      // Configurar e animar paths
      paths.forEach((path, index) => {
        const fill = path.getAttribute('fill');
        
        if (fill === 'white') {
          // Paths com fill (ícones) - fade in
          path.style.opacity = '0';
          path.style.animation = `fadeInNode 0.6s ease-out forwards`;
          path.style.animationDelay = `${1.8 + Math.min(index * 0.05, 0.5)}s`;
        } else {
          // Paths que são linhas - desenhar
          try {
            const length = path.getTotalLength();
            path.style.strokeDasharray = `${length}`;
            path.style.strokeDashoffset = `${length}`;
            path.style.animation = `drawLine 2s ease-out forwards`;
            path.style.animationDelay = `${Math.min(index * 0.05, 1)}s`;
          } catch (e) {
            // Fallback para paths que não suportam getTotalLength
            path.style.opacity = '0';
            path.style.animation = `fadeInNode 0.5s ease-out forwards`;
            path.style.animationDelay = `${0.5 + index * 0.05}s`;
          }
        }
      });

      // Animar ellipses (nós)
      ellipses.forEach((ellipse, index) => {
        ellipse.style.opacity = '0';
        ellipse.style.animation = `fadeInNode 0.4s ease-out forwards`;
        ellipse.style.animationDelay = `${0.8 + Math.min(index * 0.03, 1.2)}s`;
      });

      // Animar circles
      circles.forEach((circle, index) => {
        circle.style.opacity = '0';
        circle.style.animation = `fadeInNode 0.4s ease-out forwards`;
        circle.style.animationDelay = `${1 + Math.min(index * 0.05, 0.5)}s`;
      });

      // Animar rects (bordas dos ícones)
      rects.forEach((rect, index) => {
        rect.style.opacity = '0';
        rect.style.animation = `fadeInNode 0.5s ease-out forwards`;
        rect.style.animationDelay = `${1.5 + Math.min(index * 0.1, 0.5)}s`;
      });
    }
  }, [isInView, svgContent, isAnimating]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[874px] mx-auto pb-4"
    >
      {/* Estilos de animação */}
      <style>{`
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes fadeInNode {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      
      {svgContent ? (
        <div 
          ref={svgContainerRef}
          className="w-full h-auto rounded-lg [&>svg]:w-full [&>svg]:h-auto [&>svg]:overflow-visible"
          style={{ opacity: isAnimating ? 1 : 0 }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      ) : (
        <div className="w-full aspect-[874/630] rounded-lg" />
      )}
    </div>
  );
};

export default ComoIAEntendeSVG;
