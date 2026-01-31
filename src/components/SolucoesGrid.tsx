import { motion } from "framer-motion";
import { Bot, BarChart3, Brain, Users, Sparkles, Search } from "lucide-react";
import { useRef, useState, useLayoutEffect, useCallback } from "react";
import brainIcon from "@/assets/brain-icon.png";
import automationRobotImage from "@/assets/automation-robot.webp";
import personasNetworkImage from "@/assets/personas-network.webp";
import aiAgentsSphereImage from "@/assets/ai-agents-sphere.webp";
import strategicAnalyticsImage from "@/assets/strategic-analytics.webp";
import promptEngineeringImage from "@/assets/prompt-engineering.webp";
import seoAeoSearchImage from "@/assets/seo-aeo-search.webp";
import { SolucoesNeuralConnections } from "@/components/SolucoesNeuralConnections";
import { isIOSDevice } from "@/lib/platform";
import { useIsMobile } from "@/hooks/use-mobile";

// Tipo para os dados das camadas
type CamadaType = (typeof camadas)[0];

const camadas = [{
  icon: Bot,
  titulo: "Automação com IA",
  funcao: "WORKFLOWS INTELIGENTES QUE APRENDEM",
  beneficio: "Reduza 80% do trabalho operacional repetitivo",
  position: "top-left"
}, {
  icon: BarChart3,
  titulo: "Análise Estratégica",
  funcao: "DADOS TRANSFORMADOS EM DECISÕES",
  beneficio: "Tome decisões baseadas em inteligência, não intuição",
  position: "top-right"
}, {
  icon: Brain,
  titulo: "Engenharia de Prompt",
  funcao: "COMANDOS PRECISOS E ESTRUTURADOS",
  beneficio: "Extraia o máximo de qualquer modelo de IA",
  position: "mid-right"
}, {
  icon: Users,
  titulo: "Personas Treinadas",
  funcao: "IA QUE ENTENDE SEU NEGÓCIO",
  beneficio: "Assistentes que falam a língua da sua empresa",
  position: "mid-left"
}, {
  icon: Sparkles,
  titulo: "Agentes Inteligentes",
  funcao: "IA AUTÔNOMA E ESPECIALIZADA",
  beneficio: "Sistemas que executam, não apenas respondem",
  position: "bottom-center"
}, {
  icon: Search,
  titulo: "SEO + AEO",
  funcao: "OTIMIZAÇÃO PARA HUMANOS E IAS",
  beneficio: "Apareça em buscas tradicionais e respostas de IA",
  position: "bottom-right"
}];

// Card com cantos cortados estilo cyberpunk
const CyberCard = ({
  camada,
  index,
  setEl
}: {
  camada: (typeof camadas)[0];
  index: number;
  setEl?: (el: HTMLDivElement | null) => void;
}) => {
  const Icon = camada.icon;
  const isRight = camada.position.includes("right");
  const isLeft = camada.position.includes("left");
  const isCenter = camada.position.includes("center");
  const isMidLeft = camada.position === "mid-left";
  const usesLeftFrame = !isRight && (isLeft || camada.position.includes("center"));
  const isBottomRight = camada.position === "bottom-right";
  const translateClass = isCenter ? "translate-y-[50%]" : isMidLeft ? "translate-y-[50%]" : "";
  const svgId = `cybercard-${camada.position}-${index}`;
  const LeftCardFrameSvg = () => <svg className="absolute inset-0 h-full w-full" width="100%" height="100%" viewBox="0 0 661 276" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`frameGradientLeft-${svgId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--frame-red))" />
          <stop offset="100%" stopColor="hsl(var(--frame-purple))" />
        </linearGradient>
        {/* Clip para impedir o fundo de "vazar" fora da moldura - silhueta exata */}
        <clipPath id={`cardClipLeft-${svgId}`} clipPathUnits="userSpaceOnUse">
          {/* Silhueta exata da moldura: chanfro esquerdo + degraus + encaixe circular */}
          <path d="M41.6 9 H148.5 L157.5 18 H463 V263 H149.5 L149.5 275 H39.6 L0.5 233.8 V184.2 L9.5 177.6 V106.9 L0.5 97.8 V50.2 L41.6 9 Z" />
          {/* Parte circular (anel à direita) */}
          <circle cx="528" cy="136.5" r="136" />
        </clipPath>
      </defs>
      <g id="svg-bg-group">
        <g clipPath={`url(#cardClipLeft-${svgId})`}>
          <rect id="svg-bg-base-01" x="0" y="0" width="661" height="276" fill="hsl(var(--frame-panel))" fillOpacity="0.92" />
        </g>
      </g>

      <g id="svg-decor-group">
        <path id="svg-decor-stroke-01" d="M472 260H159H46.5L15 228V56.5L49 22.5H456L462.5 18.5H461" stroke={`url(#frameGradientLeft-${svgId})`} vectorEffect="non-scaling-stroke" />
        <path id="svg-decor-stroke-02" d="M480.5 263.457H158.999L149.469 275H39.6233L0.5 233.845V184.158L9.52845 177.634V106.868L0.5 97.834V50.1547L41.6296 9H148.466L157.495 18.034H463" stroke={`url(#frameGradientLeft-${svgId})`} vectorEffect="non-scaling-stroke" />
      </g>

      <g id="svg-main-group">
        <path id="svg-main-ring-01" d="M528 0.5C600.888 0.5 660 61.3752 660 136.5C660 211.625 600.888 272.5 528 272.5C455.112 272.5 396 211.625 396 136.5C396 61.3752 455.112 0.5 528 0.5Z" stroke={`url(#frameGradientLeft-${svgId})`} vectorEffect="non-scaling-stroke" />
        <path id="svg-main-ring-02" d="M528 23.5C589.85 23.5 640 74.3094 640 137C640 199.691 589.85 250.5 528 250.5C466.15 250.5 416 199.691 416 137C416 74.3094 466.15 23.5 528 23.5Z" stroke={`url(#frameGradientLeft-${svgId})`} vectorEffect="non-scaling-stroke" />
      </g>

      <g id="svg-content-group" />
      <g id="svg-effects-group" />
    </svg>;
  const RightCardFrameSvg = () => <svg className="absolute inset-0 h-full w-full" width="100%" height="100%" viewBox="0 0 731 267" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`frameGradientRight-${svgId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--frame-red))" />
          <stop offset="100%" stopColor="hsl(var(--frame-purple))" />
        </linearGradient>
        <clipPath id={`cardClipRight-${svgId}`} clipPathUnits="userSpaceOnUse">
          {/* Círculo + retângulo arredondado (silhueta total do card) */}
          <circle cx="133.5" cy="133.5" r="133" />
          <rect x="180.5" y="9" width="549.5" height="249" rx="40" ry="40" />
        </clipPath>
      </defs>
      <g id="svg-bg-group">
        <g clipPath={`url(#cardClipRight-${svgId})`}>
          <rect id="svg-bg-base-01" x="0" y="0" width="731" height="267" fill="hsl(var(--frame-panel))" fillOpacity="0.92" />
        </g>
      </g>

      <g id="svg-decor-group" />

      <g id="svg-main-group">
        <circle id="svg-main-shape-01" cx="133.5" cy="133.5" r="133" stroke={`url(#frameGradientRight-${svgId})`} vectorEffect="non-scaling-stroke" />
        <path id="svg-main-shape-02" d="M133.5 21.5C195.358 21.5 245.5 71.4223 245.5 133C245.5 194.578 195.358 244.5 133.5 244.5C71.642 244.5 21.5 194.578 21.5 133C21.5 71.4223 71.642 21.5 133.5 21.5Z" stroke={`url(#frameGradientRight-${svgId})`} vectorEffect="non-scaling-stroke" />
        <path id="svg-main-shape-03" d="M180.501 258H690C712.091 258 730 240.091 730 218V49C730 26.9086 712.091 9 690 9H180.5" stroke={`url(#frameGradientRight-${svgId})`} vectorEffect="non-scaling-stroke" />
        <path id="svg-main-shape-04" d="M192 253H685.499C707.591 253 725.499 235.091 725.499 213V53C725.499 30.9086 707.591 13 685.499 13H190" stroke={`url(#frameGradientRight-${svgId})`} vectorEffect="non-scaling-stroke" />
      </g>

      <g id="svg-content-group" />
      <g id="svg-effects-group" />
    </svg>;
  const BottomRightCardFrameSvg = () => <svg className="absolute inset-0 h-full w-full" width="100%" height="100%" viewBox="0 0 548 308" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`frameGradientBottomRight-${svgId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--frame-red))" />
          <stop offset="100%" stopColor="hsl(var(--frame-purple))" />
        </linearGradient>
        <clipPath id={`cardClipBottomRight-${svgId}`} clipPathUnits="userSpaceOnUse">
          <rect x="4.5" y="4.5" width="539" height="298" rx="39.5" ry="39.5" />
        </clipPath>
      </defs>
      <g id="svg-bg-group">
        <g clipPath={`url(#cardClipBottomRight-${svgId})`}>
          <rect id="svg-bg-base-01" x="0" y="0" width="548" height="308" fill="hsl(var(--frame-panel))" fillOpacity="0.92" />
        </g>
      </g>

      <g id="svg-decor-group" />

      <g id="svg-main-group">
        <rect id="svg-main-shape-01" x="0.5" y="0.5" width="547" height="307" rx="39.5" stroke={`url(#frameGradientBottomRight-${svgId})`} vectorEffect="non-scaling-stroke" />
        <rect id="svg-main-shape-02" x="4.5" y="4.5" width="539" height="298" rx="39.5" stroke={`url(#frameGradientBottomRight-${svgId})`} vectorEffect="non-scaling-stroke" />
      </g>

      <g id="svg-content-group" />
      <g id="svg-effects-group" />
    </svg>;
  return <div ref={setEl} className={`relative group z-20 ${translateClass}`}>
      <motion.div initial={{
      opacity: 1,
      scale: 1
    }} whileInView={{
      opacity: 1,
      scale: 1
    }} viewport={{
      once: true,
      amount: 0.1
    }} transition={{
      delay: index * 0.1,
      duration: 0.5
    }} className="relative">
        {isRight ? <section className={`relative min-w-[280px] w-full ${isBottomRight ? "max-w-[390px] aspect-[548/308]" : "max-w-[420px] aspect-[731/267]"}`}>
          <div className="absolute inset-0 pointer-events-none">
            {isBottomRight ? <BottomRightCardFrameSvg /> : <RightCardFrameSvg />}
          </div>

          {isBottomRight ? <>
              {/* Imagem de fundo para SEO + AEO */}
              {camada.titulo === "SEO + AEO" && (
                <div 
                  className="absolute inset-0 z-[1] overflow-hidden rounded-[20px]"
                  style={{ margin: '5px' }}
                >
                  <img 
                    src={seoAeoSearchImage} 
                    alt={camada.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {/* Conteúdo (mantém texto original) */}
               <div className="relative z-10 h-full w-full pl-8 pr-8 pt-12 pb-5 flex flex-col justify-end gap-1">
                 <h3 className="text-white font-bold text-base leading-tight break-words">{camada.titulo}</h3>
                 <p className="text-[#ff6b8a] text-[8px] uppercase tracking-widest font-mono leading-snug break-words">
                   {camada.funcao}
                 </p>
                   <p className="text-gray-400 text-xs leading-snug break-words max-w-[260px]">
                     {camada.position === "bottom-right" && camada.titulo === "SEO + AEO" ? <>
                         Apareça em buscas tradicionais
                         <br />
                         e respostas de IA
                       </> : camada.beneficio}
                   </p>
              </div>
            </> : <>
               {/* Imagem dentro do círculo para cards com RightFrame */}
               {(camada.titulo === "Análise Estratégica" || camada.titulo === "Engenharia de Prompt") && (
                 <div 
                   className="absolute z-[5] overflow-hidden rounded-full"
                    style={{
                      left: '3.3%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '30%',
                      aspectRatio: '1/1',
                    }}
                 >
                   <img 
                     src={camada.titulo === "Análise Estratégica" ? strategicAnalyticsImage : promptEngineeringImage} 
                     alt={camada.titulo}
                     className="w-full h-full object-cover"
                   />
                 </div>
               )}
               {/* Conteúdo (mantém texto original) */}
                <div className="relative z-10 h-full w-full pl-[175px] pr-4 py-4 flex flex-col justify-center gap-1">
                  <h3 className={`text-white font-bold leading-tight ${camada.position === "top-right" || camada.titulo === "Engenharia de Prompt" ? "whitespace-nowrap text-[17px]" : "text-lg"}`}>
                    {camada.titulo}
                  </h3>
                 <p className="text-[#ff6b8a] text-[9px] uppercase tracking-widest font-mono leading-snug">
                   {camada.titulo === "Análise Estratégica" ? <>DADOS TRANSFORMADOS<br />EM DECISÕES</> : 
                    camada.titulo === "Engenharia de Prompt" ? <>COMANDOS PRECISOS<br />E ESTRUTURADOS</> : 
                    camada.funcao}
                 </p>
                 <p className="text-gray-400 text-sm leading-snug max-w-[220px]">{camada.beneficio}</p>
              </div>
            </>}
        </section> : usesLeftFrame ? <section className="relative min-w-[280px] max-w-[360px] w-full aspect-[661/276]">
          <div className="absolute inset-0 pointer-events-none">
            <LeftCardFrameSvg />
          </div>

          {/* Imagem dentro do círculo para cards com LeftFrame */}
          {(camada.titulo === "Automação com IA" || camada.titulo === "Personas Treinadas" || camada.titulo === "Agentes Inteligentes") && (
            <div 
              className="absolute z-[5] overflow-hidden rounded-full"
              style={{
                right: '3.5%',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '33.5%',
                aspectRatio: '1/1',
              }}
            >
              <img 
                src={
                  camada.titulo === "Automação com IA" ? automationRobotImage : 
                  camada.titulo === "Personas Treinadas" ? personasNetworkImage : 
                  aiAgentsSphereImage
                } 
                alt={camada.titulo}
                className="w-full h-full object-cover"
              />
            </div>
          )}

           <div className="relative z-10 h-full w-full px-6 py-4 pr-[168px] flex flex-col justify-center gap-1">
             <h3 className="text-white font-bold text-base leading-tight break-words">{camada.titulo}</h3>
             <p className="text-[#ff6b8a] text-[8px] uppercase tracking-widest font-mono leading-snug break-words">
               {camada.funcao}
             </p>
             <p className="text-gray-400 text-xs leading-snug break-words">{camada.beneficio}</p>
          </div>

          
        </section> : <div className="relative p-[1px] min-w-[280px] max-w-[320px] bg-gradient-to-br from-[#ff2244] via-[#a855f7] to-[#06b6d4] rounded-xl">
          <div className="relative bg-[#0a0a0f] backdrop-blur-sm p-5 rounded-[11px]">
            <div className="relative z-10 flex items-start gap-4">
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-1">{camada.titulo}</h3>
                <p className="text-[#ff6b8a] text-[10px] uppercase tracking-widest mb-2 font-mono">
                  {camada.funcao}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">{camada.beneficio}</p>
              </div>

              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] border border-[#a855f7]/30 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-[#a855f7]" />
                </div>
                <div className="absolute inset-0 rounded-full bg-[#a855f7]/20 blur-md -z-10" />
              </div>
            </div>
          </div>
        </div>}
        
        {/* (removido) Ponto de conexão */}
      </motion.div>
    </div>;
};

// Cérebro central com moldura animada
const CentralBrain = () => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const isIOSMobile =
    typeof window !== "undefined" &&
    window.innerWidth < 768 &&
    isIOSDevice();

  // Mobile: remove o efeito de "hover" (em touch ele pode ativar ao toque e ficar animando).
  const hoverEnabled = !isMobile;
  const hover = hoverEnabled && isHovered;

  // iOS mobile: evita filtros/blur grandes no WebKit.
  const glowFilter = isIOSMobile ? undefined : hover ? "url(#glowStrong)" : "url(#glow)";

  return (
    <div
      className={`relative flex items-center justify-center w-[260px] h-[260px] ${hoverEnabled ? "cursor-pointer" : "cursor-default"}`}
      onMouseEnter={() => {
        if (hoverEnabled) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (hoverEnabled) setIsHovered(false);
      }}
    >
      {/* Ambient glow */}
      <motion.div className="absolute w-[200px] h-[200px] rounded-full" style={{
      background: "radial-gradient(circle, hsl(330 100% 50% / 0.2) 0%, transparent 60%)",
      filter: isIOSMobile ? "none" : "blur(30px)"
    }} animate={{
      scale: hover ? [1.1, 1.3, 1.1] : [1, 1.15, 1],
      opacity: hover ? [0.5, 0.8, 0.5] : [0.4, 0.6, 0.4]
    }} transition={{
      duration: hover ? 2 : 4,
      repeat: Infinity,
      ease: "easeInOut"
    }} />

      {/* (removido) Light beams */}

      {/* Ring 1 - Outermost */}
      <div className="absolute w-[230px] h-[230px] rounded-full" style={{
      background: "linear-gradient(180deg, hsl(220 15% 18%) 0%, hsl(220 12% 10%) 100%)",
      boxShadow: `
            inset 0 2px 4px hsl(220 20% 30% / 0.5),
            inset 0 -4px 8px hsl(0 0% 0% / 0.8),
            0 8px 32px hsl(0 0% 0% / 0.6),
            0 2px 8px hsl(0 0% 0% / 0.4)
          `
    }} />

      {/* Ring 2 */}
      <div className="absolute w-[200px] h-[200px] rounded-full" style={{
      background: "linear-gradient(180deg, hsl(220 12% 22%) 0%, hsl(220 10% 12%) 100%)",
      boxShadow: `
            inset 0 2px 3px hsl(220 15% 28% / 0.6),
            inset 0 -3px 6px hsl(0 0% 0% / 0.7),
            0 6px 20px hsl(0 0% 0% / 0.5)
          `
    }} />

      {/* Ring 3 */}
      <div className="absolute w-[168px] h-[168px] rounded-full" style={{
      background: "linear-gradient(180deg, hsl(225 15% 16%) 0%, hsl(230 12% 8%) 100%)",
      boxShadow: `
            inset 0 3px 6px hsl(220 20% 25% / 0.5),
            inset 0 -5px 10px hsl(0 0% 0% / 0.9),
            0 10px 30px hsl(0 0% 0% / 0.7),
            0 4px 12px hsl(330 80% 30% / 0.1)
          `
    }} />

      {/* Ring 4 */}
      <div className="absolute w-[135px] h-[135px] rounded-full" style={{
      background: "linear-gradient(180deg, hsl(220 10% 12%) 0%, hsl(230 15% 6%) 100%)",
      boxShadow: `
            inset 0 4px 8px hsl(0 0% 0% / 0.9),
            inset 0 -2px 4px hsl(220 15% 20% / 0.3),
            0 -2px 6px hsl(220 15% 25% / 0.2)
          `
    }} />

      {/* Ring 5 - inner solid gray */}
      <div className="absolute w-[102px] h-[102px] rounded-full" style={{
      background: "linear-gradient(180deg, hsl(220 15% 14%) 0%, hsl(220 12% 8%) 100%)",
      boxShadow: `
            inset 0 3px 8px hsl(0 0% 0% / 0.6),
            inset 0 -4px 10px hsl(0 0% 0% / 0.8)
          `
    }} />

      {/* SVG content */}
      <svg viewBox="0 0 260 260" className="absolute w-full h-full z-10">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowStrong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(330 100% 80%)" />
            <stop offset="100%" stopColor="hsl(280 80% 65%)" />
          </linearGradient>
        </defs>

        {/* Rotating arc group */}
        <motion.g style={{
        transformOrigin: "130px 130px"
      }} animate={{
        rotate: hover ? 360 : 0
      }} transition={{
        duration: hover ? 8 : 0,
        repeat: hover ? Infinity : 0,
        ease: "linear"
      }}>
          {/* Arc 1 - Outer ring (radius 140) */}
          <motion.path d={`M ${130 + 115 * Math.cos(-70 * Math.PI / 180)} ${130 + 115 * Math.sin(-70 * Math.PI / 180)} 
                A 115 115 0 0 1 ${130 + 115 * Math.cos(-20 * Math.PI / 180)} ${130 + 115 * Math.sin(-20 * Math.PI / 180)}`} fill="none" stroke="hsl(340 100% 50%)" strokeWidth={hover ? 5 : 4} strokeLinecap="round" filter={glowFilter} animate={{
          opacity: [0.8, 1, 0.8]
        }} transition={{
          duration: 1.5,
          repeat: Infinity
        }} />
          {/* Arc 2 - Second ring (radius 122) */}
          <motion.path d={`M ${130 + 100 * Math.cos(20 * Math.PI / 180)} ${130 + 100 * Math.sin(20 * Math.PI / 180)} 
                A 100 100 0 0 1 ${130 + 100 * Math.cos(70 * Math.PI / 180)} ${130 + 100 * Math.sin(70 * Math.PI / 180)}`} fill="none" stroke="hsl(330 100% 55%)" strokeWidth={hover ? 4 : 3} strokeLinecap="round" filter={glowFilter} animate={{
          opacity: [0.6, 1, 0.6]
        }} transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 0.3
        }} />
          {/* Arc 3 - Third ring (radius 102) */}
          <motion.path d={`M ${130 + 83 * Math.cos(120 * Math.PI / 180)} ${130 + 83 * Math.sin(120 * Math.PI / 180)} 
                A 83 83 0 0 1 ${130 + 83 * Math.cos(170 * Math.PI / 180)} ${130 + 83 * Math.sin(170 * Math.PI / 180)}`} fill="none" stroke="hsl(340 100% 50%)" strokeWidth={hover ? 5 : 4} strokeLinecap="round" filter={glowFilter} animate={{
          opacity: [0.8, 1, 0.8]
        }} transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 0.5
        }} />
          {/* Arc 4 - Outer ring opposite side (radius 140) */}
          <motion.path d={`M ${130 + 115 * Math.cos(200 * Math.PI / 180)} ${130 + 115 * Math.sin(200 * Math.PI / 180)} 
                A 115 115 0 0 1 ${130 + 115 * Math.cos(250 * Math.PI / 180)} ${130 + 115 * Math.sin(250 * Math.PI / 180)}`} fill="none" stroke="hsl(330 100% 50%)" strokeWidth={hover ? 4 : 3} strokeLinecap="round" filter={glowFilter} animate={{
          opacity: [0.6, 1, 0.6]
        }} transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 0.7
        }} />
          {/* Arc 5 - Second ring opposite (radius 122) */}
          <motion.path d={`M ${130 + 100 * Math.cos(-160 * Math.PI / 180)} ${130 + 100 * Math.sin(-160 * Math.PI / 180)} 
                A 100 100 0 0 1 ${130 + 100 * Math.cos(-110 * Math.PI / 180)} ${130 + 100 * Math.sin(-110 * Math.PI / 180)}`} fill="none" stroke="hsl(335 100% 52%)" strokeWidth={hover ? 3 : 2} strokeLinecap="round" filter={glowFilter} animate={{
          opacity: [0.5, 0.9, 0.5]
        }} transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 0.2
        }} />
        </motion.g>

        {/* Connection nodes */}
        {[{
        x: 130,
        y: 16
      }, {
        x: 244,
        y: 130
      }, {
        x: 130,
        y: 244
      }, {
        x: 16,
        y: 130
      }].map((pos, i) => <g key={i}>
            <circle cx={pos.x} cy={pos.y} r={12} fill="hsl(230 20% 12%)" style={{
          filter: isIOSMobile ? "none" : "drop-shadow(0 2px 4px hsl(0 0% 0% / 0.5))"
        }} />
            <circle cx={pos.x} cy={pos.y} r={10} fill="none" stroke="hsl(330 50% 35%)" strokeWidth="2" />
            <motion.circle cx={pos.x} cy={pos.y} r={5} fill="hsl(330 100% 55%)" filter={glowFilter} animate={{
          opacity: [0.7, 1, 0.7],
          scale: hover ? [1, 1.3, 1] : [1, 1.1, 1]
        }} transition={{
          duration: hover ? 1 : 2,
          repeat: Infinity,
          delay: i * 0.15
        }} />
          </g>)}


        {/* (removido) Connection lines */}
      </svg>

      {/* Imagem do cérebro com glow */}
      {/* Imagem do cérebro sem glow */}
      <div className="absolute z-20 flex items-center justify-center">
        <img src={brainIcon} alt="AI Brain" className="w-[230px] h-[230px] object-contain" />
      </div>
    </div>
  );
};

// Linhas neurálgicas conectando cards ao cérebro central
const NeuralConnections = () => <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 mix-blend-screen" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="neuralGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="hsl(var(--frame-red))" />
        <stop offset="100%" stopColor="hsl(var(--frame-purple))" />
      </linearGradient>
      <linearGradient id="neuralGradientRight" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="hsl(var(--frame-purple))" />
        <stop offset="100%" stopColor="hsl(var(--frame-red))" />
      </linearGradient>
      <linearGradient id="neuralGradientDown" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="hsl(var(--frame-red))" />
        <stop offset="100%" stopColor="hsl(var(--frame-purple))" />
      </linearGradient>
      <filter id="neuralGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="dotGlow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    
    {/* ===== CARD TOP-LEFT (Automação com IA) → Centro ===== */}
    <motion.path d="M 280 126 L 380 126 L 380 245 L 500 245" stroke="url(#neuralGradientLeft)" strokeWidth="2" fill="none" filter="url(#neuralGlow)" vectorEffect="non-scaling-stroke" initial={{
    pathLength: 0,
    opacity: 0
  }} animate={{
    pathLength: 1,
    opacity: 1
  }} transition={{
    duration: 1.2,
    delay: 0.2
  }} />
    <motion.circle cx={280} cy={126} r={6} fill="hsl(var(--frame-red))" filter="url(#dotGlow)" initial={{
    scale: 0
  }} animate={{
    scale: 1
  }} transition={{
    duration: 0.3,
    delay: 0.1
  }} />
    <motion.circle cx={500} cy={245} r={6} fill="hsl(var(--frame-purple))" filter="url(#dotGlow)" initial={{
    scale: 0
  }} animate={{
    scale: 1
  }} transition={{
    duration: 0.3,
    delay: 1.3
  }} />

    {/* ===== CARD MID-LEFT (Personas Treinadas) → Centro ===== */}
    <motion.path d="M 280 406 L 380 406 L 380 350 L 480 350" stroke="url(#neuralGradientLeft)" strokeWidth="2" fill="none" filter="url(#neuralGlow)" vectorEffect="non-scaling-stroke" initial={{
    pathLength: 0,
    opacity: 0
  }} animate={{
    pathLength: 1,
    opacity: 1
  }} transition={{
    duration: 1.2,
    delay: 0.4
  }} />
    <motion.circle cx={280} cy={406} r={6} fill="hsl(var(--frame-red))" filter="url(#dotGlow)" initial={{
    scale: 0
  }} animate={{
    scale: 1
  }} transition={{
    duration: 0.3,
    delay: 0.3
  }} />
    <motion.circle cx={480} cy={350} r={6} fill="hsl(var(--frame-purple))" filter="url(#dotGlow)" initial={{
    scale: 0
  }} animate={{
    scale: 1
  }} transition={{
    duration: 0.3,
    delay: 1.5
  }} />

    {/* ===== CARD TOP-RIGHT (Análise Estratégica) → Centro ===== */}
    <motion.path d="M 720 126 L 620 126 L 620 245 L 520 245" stroke="url(#neuralGradientRight)" strokeWidth="2" fill="none" filter="url(#neuralGlow)" vectorEffect="non-scaling-stroke" initial={{
    pathLength: 0,
    opacity: 0
  }} animate={{
    pathLength: 1,
    opacity: 1
  }} transition={{
    duration: 1.2,
    delay: 0.3
  }} />
    <motion.circle cx={720} cy={126} r={6} fill="hsl(var(--frame-purple))" filter="url(#dotGlow)" initial={{
    scale: 0
  }} animate={{
    scale: 1
  }} transition={{
    duration: 0.3,
    delay: 0.2
  }} />

    {/* ===== CARD MID-RIGHT (Engenharia de Prompt) → Centro ===== */}
    <motion.path d="M 720 294 L 620 294 L 620 350 L 540 350" stroke="url(#neuralGradientRight)" strokeWidth="2" fill="none" filter="url(#neuralGlow)" vectorEffect="non-scaling-stroke" initial={{
    pathLength: 0,
    opacity: 0
  }} animate={{
    pathLength: 1,
    opacity: 1
  }} transition={{
    duration: 1.2,
    delay: 0.5
  }} />
    <motion.circle cx={720} cy={294} r={6} fill="hsl(var(--frame-purple))" filter="url(#dotGlow)" initial={{
    scale: 0
  }} animate={{
    scale: 1
  }} transition={{
    duration: 0.3,
    delay: 0.4
  }} />
    <motion.circle cx={540} cy={350} r={6} fill="hsl(var(--frame-red))" filter="url(#dotGlow)" initial={{
    scale: 0
  }} animate={{
    scale: 1
  }} transition={{
    duration: 0.3,
    delay: 1.6
  }} />

    {/* ===== CARD BOTTOM-CENTER (Agentes Inteligentes) → Centro ===== */}
    <motion.path d="M 500 546 L 500 455" stroke="url(#neuralGradientDown)" strokeWidth="2" fill="none" filter="url(#neuralGlow)" vectorEffect="non-scaling-stroke" initial={{
    pathLength: 0,
    opacity: 0
  }} animate={{
    pathLength: 1,
    opacity: 1
  }} transition={{
    duration: 0.8,
    delay: 0.6
  }} />
    <motion.circle cx={500} cy={546} r={6} fill="hsl(var(--frame-red))" filter="url(#dotGlow)" initial={{
    scale: 0
  }} animate={{
    scale: 1
  }} transition={{
    duration: 0.3,
    delay: 0.5
  }} />
    <motion.circle cx={500} cy={455} r={6} fill="hsl(var(--frame-purple))" filter="url(#dotGlow)" initial={{
    scale: 0
  }} animate={{
    scale: 1
  }} transition={{
    duration: 0.3,
    delay: 1.3
  }} />

    {/* ===== CARD BOTTOM-RIGHT (SEO + AEO) → Centro ===== */}
    <motion.path d="M 720 476 L 620 476 L 620 406 L 540 406" stroke="url(#neuralGradientRight)" strokeWidth="2" fill="none" filter="url(#neuralGlow)" vectorEffect="non-scaling-stroke" initial={{
    pathLength: 0,
    opacity: 0
  }} animate={{
    pathLength: 1,
    opacity: 1
  }} transition={{
    duration: 1.2,
    delay: 0.7
  }} />
    <motion.circle cx={720} cy={476} r={6} fill="hsl(var(--frame-purple))" filter="url(#dotGlow)" initial={{
    scale: 0
  }} animate={{
    scale: 1
  }} transition={{
    duration: 0.3,
    delay: 0.6
  }} />
    <motion.circle cx={540} cy={406} r={6} fill="hsl(var(--frame-red))" filter="url(#dotGlow)" initial={{
    scale: 0
  }} animate={{
    scale: 1
  }} transition={{
    duration: 0.3,
    delay: 1.8
  }} />

    {/* ===== LINHAS DECORATIVAS NAS BORDAS ===== */}
    <motion.path d="M 0 105 L 80 105 L 120 140 L 180 140" stroke="url(#neuralGradientLeft)" strokeWidth="1.5" fill="none" filter="url(#neuralGlow)" strokeOpacity="0.6" vectorEffect="non-scaling-stroke" initial={{
    pathLength: 0
  }} animate={{
    pathLength: 1
  }} transition={{
    duration: 1,
    delay: 0.8
  }} />
    <motion.circle cx={180} cy={140} r={4} fill="hsl(var(--frame-purple))" filter="url(#dotGlow)" initial={{
    scale: 0
  }} animate={{
    scale: 1
  }} transition={{
    delay: 1.7
  }} />

    <motion.path d="M 0 455 L 60 455 L 100 420 L 160 420" stroke="url(#neuralGradientLeft)" strokeWidth="1.5" fill="none" filter="url(#neuralGlow)" strokeOpacity="0.6" vectorEffect="non-scaling-stroke" initial={{
    pathLength: 0
  }} animate={{
    pathLength: 1
  }} transition={{
    duration: 1,
    delay: 1
  }} />
    <motion.circle cx={160} cy={420} r={4} fill="hsl(var(--frame-purple))" filter="url(#dotGlow)" initial={{
    scale: 0
  }} animate={{
    scale: 1
  }} transition={{
    delay: 1.9
  }} />

    <motion.path d="M 1000 105 L 920 105 L 880 140 L 820 140" stroke="url(#neuralGradientRight)" strokeWidth="1.5" fill="none" filter="url(#neuralGlow)" strokeOpacity="0.6" vectorEffect="non-scaling-stroke" initial={{
    pathLength: 0
  }} animate={{
    pathLength: 1
  }} transition={{
    duration: 1,
    delay: 0.9
  }} />
    <motion.circle cx={820} cy={140} r={4} fill="hsl(var(--frame-red))" filter="url(#dotGlow)" initial={{
    scale: 0
  }} animate={{
    scale: 1
  }} transition={{
    delay: 1.8
  }} />

    <motion.path d="M 1000 336 L 920 336 L 880 364 L 820 364" stroke="url(#neuralGradientRight)" strokeWidth="1.5" fill="none" filter="url(#neuralGlow)" strokeOpacity="0.6" vectorEffect="non-scaling-stroke" initial={{
    pathLength: 0
  }} animate={{
    pathLength: 1
  }} transition={{
    duration: 1,
    delay: 1.1
  }} />
    <motion.circle cx={820} cy={364} r={4} fill="hsl(var(--frame-red))" filter="url(#dotGlow)" initial={{
    scale: 0
  }} animate={{
    scale: 1
  }} transition={{
    delay: 2
  }} />

    <motion.path d="M 1000 504 L 920 504 L 880 476 L 820 476" stroke="url(#neuralGradientRight)" strokeWidth="1.5" fill="none" filter="url(#neuralGlow)" strokeOpacity="0.6" vectorEffect="non-scaling-stroke" initial={{
    pathLength: 0
  }} animate={{
    pathLength: 1
  }} transition={{
    duration: 1,
    delay: 1.2
  }} />
    <motion.circle cx={820} cy={476} r={4} fill="hsl(var(--frame-red))" filter="url(#dotGlow)" initial={{
    scale: 0
  }} animate={{
    scale: 1
  }} transition={{
    delay: 2.1
  }} />
  </svg>;

// Linhas de circuito nas bordas
const BorderCircuits = () => <>
    {/* Circuitos superiores */}
    <div className="absolute top-0 left-0 w-48 h-px bg-gradient-to-r from-transparent via-[#a855f7]/50 to-transparent" />
    <div className="absolute top-0 right-0 w-48 h-px bg-gradient-to-r from-transparent via-[#a855f7]/50 to-transparent" />
    
    {/* Circuitos laterais */}
    <div className="absolute top-0 left-0 w-px h-32 bg-gradient-to-b from-transparent via-[#a855f7]/50 to-transparent" />
    <div className="absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-transparent via-[#a855f7]/50 to-transparent" />
    
    {/* Circuitos inferiores */}
    <div className="absolute bottom-0 left-0 w-48 h-px bg-gradient-to-r from-transparent via-[#ff2244]/50 to-transparent" />
    <div className="absolute bottom-0 right-0 w-48 h-px bg-gradient-to-r from-transparent via-[#ff2244]/50 to-transparent" />
  </>;
// Ordem dos cards no mobile (cérebro primeiro, depois todos os cards em sequência)
const mobileOrder = [0, 3, 4, 1, 2, 5]; // Automação, Personas, Agentes, Análise, Engenharia, SEO

const SolucoesGrid = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const brainRef = useRef<HTMLDivElement | null>(null);
  const cardElsRef = useRef<Array<HTMLDivElement | null>>([]);
  return <section id="solucoes" className="relative bg-black py-24 md:py-32 overflow-hidden">
      {/* (removido) Circuitos de borda */}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12">
        {/* Título */}
        <motion.div initial={{
        opacity: 1,
        y: -20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true,
        amount: 0.1
      }} className="flex justify-center mb-12 lg:mb-16">
          <div className="relative px-8 py-3 bg-[#0a0a0f] border border-[#ff2244]/50" style={{
          clipPath: "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)"
        }}>
            <span className="text-white font-bold text-xl tracking-[0.3em] uppercase">
              Soluções
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff2244]/10 to-transparent pointer-events-none" />
          </div>
        </motion.div>
        
        {/* ===== LAYOUT MOBILE ===== */}
        <MobileLayout camadas={camadas} mobileOrder={mobileOrder} />
        
        {/* ===== LAYOUT DESKTOP ===== */}
        <div ref={containerRef} className="relative min-h-[700px] hidden lg:flex items-center justify-center">
          {/* Linhas neurálgicas (posicionamento real via DOM) */}
          <SolucoesNeuralConnections containerRef={containerRef} brainRef={brainRef} cardElsRef={cardElsRef} positions={camadas.map(c => c.position)} />
          
          {/* Cérebro central */}
          <div ref={brainRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] z-10">
            <CentralBrain />
          </div>
          
          {/* Cards posicionados */}
          <div className="relative w-full grid grid-cols-3 gap-0 z-20">
            {/* Coluna esquerda */}
            <div className="flex flex-col gap-8 items-start pt-0">
              <CyberCard camada={camadas[0]} index={0} setEl={el => cardElsRef.current[0] = el} />
              <CyberCard camada={camadas[3]} index={3} setEl={el => cardElsRef.current[3] = el} />
            </div>
            
            {/* Coluna central (espaço para o cérebro + card inferior) */}
            <div className="flex flex-col items-center justify-end pt-[400px]">
              <CyberCard camada={camadas[4]} index={4} setEl={el => cardElsRef.current[4] = el} />
            </div>
            
            {/* Coluna direita */}
            <div className="flex flex-col gap-8 items-end pt-0 translate-x-[20%]">
              <CyberCard camada={camadas[1]} index={1} setEl={el => cardElsRef.current[1] = el} />
              <CyberCard camada={camadas[2]} index={2} setEl={el => cardElsRef.current[2] = el} />
              <CyberCard camada={camadas[5]} index={5} setEl={el => cardElsRef.current[5] = el} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a855f7]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#ff2244]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#06b6d4]/5 rounded-full blur-[80px] pointer-events-none" />
    </section>;
};

// Card mobile com design SVG IDÊNTICO ao desktop (RightCardFrameSvg)
const MobileSvgCard = ({
  camada,
  index
}: {
  camada: CamadaType;
  index: number;
}) => {
  const Icon = camada.icon;
  const svgId = `mobile-card-${index}`;
  
  // Usando exatamente o mesmo SVG do desktop (viewBox 731x267), apenas escalado
  // O círculo fica à esquerda sobrepondo o retângulo
  
  return (
    <motion.div 
      initial={{ opacity: 1 }} 
      whileInView={{ opacity: 1 }} 
      viewport={{ once: true, amount: 0.1 }} 
      className="relative w-full my-1"
    >
      {/* Container do card - aspect ratio igual ao desktop */}
      <div className="relative w-full aspect-[731/267]">
        {/* SVG Frame - IDÊNTICO ao RightCardFrameSvg do desktop */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 731 267" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id={`frameGradientRight-${svgId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--frame-red))" />
              <stop offset="100%" stopColor="hsl(var(--frame-purple))" />
            </linearGradient>
            <clipPath id={`cardClipRight-${svgId}`} clipPathUnits="userSpaceOnUse">
              {/* Círculo + retângulo arredondado (silhueta total do card) */}
              <circle cx="133.5" cy="133.5" r="133" />
              <rect x="180.5" y="9" width="549.5" height="249" rx="40" ry="40" />
            </clipPath>
          </defs>
          
          {/* Background com clip path */}
          <g id="svg-bg-group">
            <g clipPath={`url(#cardClipRight-${svgId})`}>
              <rect id="svg-bg-base-01" x="0" y="0" width="731" height="267" fill="hsl(var(--frame-panel))" fillOpacity="0.92" />
            </g>
          </g>

          <g id="svg-decor-group" />

          {/* Formas principais - círculo sobreposto ao retângulo */}
          <g id="svg-main-group">
            {/* Retângulo arredondado (desenhado primeiro, fica atrás) */}
            <path id="svg-main-shape-03" d="M180.501 258H690C712.091 258 730 240.091 730 218V49C730 26.9086 712.091 9 690 9H180.5" stroke={`url(#frameGradientRight-${svgId})`} vectorEffect="non-scaling-stroke" />
            <path id="svg-main-shape-04" d="M192 253H685.499C707.591 253 725.499 235.091 725.499 213V53C725.499 30.9086 707.591 13 685.499 13H190" stroke={`url(#frameGradientRight-${svgId})`} vectorEffect="non-scaling-stroke" />
            
            {/* Círculos (desenhados por cima - sobreposição) */}
            <circle id="svg-main-shape-01" cx="133.5" cy="133.5" r="133" stroke={`url(#frameGradientRight-${svgId})`} vectorEffect="non-scaling-stroke" />
            <path id="svg-main-shape-02" d="M133.5 21.5C195.358 21.5 245.5 71.4223 245.5 133C245.5 194.578 195.358 244.5 133.5 244.5C71.642 244.5 21.5 194.578 21.5 133C21.5 71.4223 71.642 21.5 133.5 21.5Z" stroke={`url(#frameGradientRight-${svgId})`} vectorEffect="non-scaling-stroke" />
          </g>

          <g id="svg-content-group" />
          <g id="svg-effects-group" />
        </svg>
        
        {/* Imagem dentro do círculo */}
        {(camada.titulo === "Automação com IA" || 
          camada.titulo === "Personas Treinadas" || 
          camada.titulo === "Agentes Inteligentes" ||
          camada.titulo === "Análise Estratégica" ||
          camada.titulo === "Engenharia de Prompt" ||
          camada.titulo === "SEO + AEO") && (
          <div 
            className="absolute z-[5] overflow-hidden rounded-full"
            style={{
              left: '3%',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '30%',
              aspectRatio: '1/1',
            }}
          >
            <img 
              src={
                camada.titulo === "Automação com IA" ? automationRobotImage : 
                camada.titulo === "Personas Treinadas" ? personasNetworkImage : 
                camada.titulo === "Agentes Inteligentes" ? aiAgentsSphereImage :
                camada.titulo === "Análise Estratégica" ? strategicAnalyticsImage :
                camada.titulo === "Engenharia de Prompt" ? promptEngineeringImage :
                seoAeoSearchImage
              } 
              alt={camada.titulo}
              className={`w-full h-full object-cover ${camada.titulo === "SEO + AEO" ? "object-[15%_25%] scale-[2.5]" : ""}`}
            />
          </div>
        )}
        
        {/* Ícone removido do círculo */}
        
        {/* Conteúdo de texto - posicionado igual ao desktop */}
        <div className="absolute left-[38%] right-[5%] top-1/2 -translate-y-1/2">
          <h3 className="text-white font-bold text-[11px] leading-tight mb-0.5">
            {camada.titulo}
          </h3>
          <p className="text-[#ff6b8a] text-[6px] uppercase tracking-widest font-mono leading-snug mb-0.5">
            {camada.funcao}
          </p>
          <p className="text-gray-400 text-[9px] leading-snug">
            {camada.beneficio}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Layout Mobile com conexões que medem posições reais dos cards
const MobileLayout = ({ 
  camadas, 
  mobileOrder 
}: { 
  camadas: CamadaType[];
  mobileOrder: number[];
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const brainRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [layout, setLayout] = useState<{
    w: number;
    h: number;
    trunkX: number;
    trunkYTop: number;
    trunkYBottom: number;
    brainAnchor: { x: number; y: number };
    hooks: Array<{ d: string; isFirst?: boolean }>;
    firstCardY: number;
    curveR: number;
  } | null>(null);

  const calculate = useCallback(() => {
    if (!wrapperRef.current || !brainRef.current || !cardsRef.current) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const brainRect = brainRef.current.getBoundingClientRect();

    const w = wrapperRect.width;
    const h = wrapperRect.height;

    const cardGeoms = cardRefs.current
      .map((el) => (el ? el.getBoundingClientRect() : null))
      .filter(Boolean) as DOMRect[];

    if (cardGeoms.length === 0) return;

    const circleRadiusPercent = 133 / 731; // do SVG desktop

    const anchors = cardGeoms.map((cardRect) => {
      const y = cardRect.top - wrapperRect.top + cardRect.height / 2;
      const r = cardRect.width * circleRadiusPercent;
      const circleLeftEdge = cardRect.left - wrapperRect.left; // círculo começa no x=0 do SVG
      // OBS: O SVG do card tem círculo à esquerda; o bounding box do card já inclui o círculo.
      return { y, r, circleLeftEdge };
    });

    // Tronco (linha vertical) fica no "gutter" à esquerda do card
    const minCircleLeft = Math.min(...anchors.map((a) => a.circleLeftEdge));
    // Empurra um pouco mais pra esquerda para não ficar escondido atrás do círculo
    const trunkX = Math.max(12, minCircleLeft - 36);

    // Âncora no cérebro: CENTRO INFERIOR (rodinha azul, para o primeiro card)
    const brainAnchorBottom = {
      x: brainRect.left - wrapperRect.left + brainRect.width * 0.5,
      y: brainRect.top - wrapperRect.top + brainRect.height * 0.98
    };
    
    // Âncora no cérebro: lado DIREITO (para o tronco principal dos outros cards)
    const brainAnchor = {
      x: brainRect.left - wrapperRect.left + brainRect.width * 0.85,
      y: brainRect.top - wrapperRect.top + brainRect.height * 0.72
    };

    // Primeiro card vai separado pelo centro inferior
    // Cards 2 ao último conectam ao tronco (lado direito)
    const firstCardY = anchors[0]?.y || 0;
    const secondCardY = anchors.length > 1 ? anchors[1].y : firstCardY;
    const lastCardY = Math.max(...anchors.map((a) => a.y));

    const curveR = 14;

    // Tronco principal: do segundo card até o último (todos curvam pra cima)
    const trunkYTop = secondCardY - curveR;
    const trunkYBottom = lastCardY - curveR;

    // Posição X do "tronco" do primeiro card: passa POR DENTRO (à direita do trunkX principal)
    // Fica BEM perto do trunkX pra linha não ficar grande
    const firstTrunkX = trunkX + 14;

    // Hooks: primeiro card vai separado pelo centro inferior, outros vão pro tronco direito
    const hooks = anchors.map((a, i) => {
      const startX = a.circleLeftEdge;
      const y = a.y;
      const isFirst = i === 0;
      const isLast = i === anchors.length - 1;
      
      if (isFirst) {
        // Primeiro card: passa POR DENTRO, conecta no centro inferior do cérebro
        // Curvas de 90° corretas: horizontal curta → curva pra cima → sobe → curva pra DIREITA → vai ao centro
        const d = `M ${startX} ${y}
                   L ${firstTrunkX + curveR} ${y}
                   Q ${firstTrunkX} ${y} ${firstTrunkX} ${y - curveR}
                   L ${firstTrunkX} ${brainAnchorBottom.y + curveR}
                   Q ${firstTrunkX} ${brainAnchorBottom.y} ${firstTrunkX + curveR} ${brainAnchorBottom.y}
                   L ${brainAnchorBottom.x} ${brainAnchorBottom.y}`;
        return { d, isFirst: true };
      } else if (isLast) {
        // Último card: curva de 90° pra CIMA (conecta no tronco junto com os outros)
        const d = `M ${startX} ${y}
                   L ${trunkX + curveR} ${y}
                   Q ${trunkX} ${y} ${trunkX} ${y - curveR}`;
        return { d, isFirst: false };
      } else {
        // Cards do meio: curva que sobe para o tronco
        const d = `M ${startX} ${y}
                   L ${trunkX + curveR} ${y}
                   Q ${trunkX} ${y} ${trunkX} ${y - curveR}`;
        return { d, isFirst: false };
      }
    });

    setLayout({
      w,
      h,
      trunkX,
      trunkYTop,
      trunkYBottom,
      brainAnchor,
      hooks,
      firstCardY,
      curveR
    });
  }, []);

  useLayoutEffect(() => {
    calculate();

    const onResize = () => calculate();
    window.addEventListener("resize", onResize);
    const t = window.setTimeout(calculate, 120);

    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
    };
  }, [calculate]);

  return (
    <div ref={wrapperRef} className="lg:hidden relative flex flex-col items-center">
      {/* SVG das conexões (tronco + hooks + conexão no cérebro) */}
      {layout && (
        <svg
          className="absolute inset-0 pointer-events-none z-0"
          width="100%"
          height="100%"
          viewBox={`0 0 ${layout.w} ${layout.h}`}
          preserveAspectRatio="none"
        >
          <defs>
            {/*
              IMPORTANTE: para a linha vertical (x1===x2), gradiente em objectBoundingBox pode “sumir”
              em alguns browsers. Por isso usamos userSpaceOnUse com y2 baseado na altura real.
            */}
            <linearGradient
              id="mobileConnectionGradLayout"
              gradientUnits="userSpaceOnUse"
              x1={0}
              y1={0}
              x2={0}
              y2={layout.h}
            >
              <stop offset="0%" stopColor="hsl(var(--frame-purple))" />
              <stop offset="50%" stopColor="hsl(var(--frame-red))" />
              <stop offset="100%" stopColor="hsl(var(--frame-purple))" />
            </linearGradient>
          </defs>

          {/* Tronco vertical (liga todos os hooks) */}
          <line
            x1={layout.trunkX}
            y1={layout.trunkYTop}
            x2={layout.trunkX}
            y2={layout.trunkYBottom}
            stroke="url(#mobileConnectionGradLayout)"
            strokeWidth={3}
            strokeLinecap="round"
          />

          {/* Conexão do tronco principal ao cérebro (lado direito) */}
          <path
            d={`M ${layout.trunkX} ${layout.trunkYTop}
                L ${layout.trunkX} ${layout.brainAnchor.y + layout.curveR}
                Q ${layout.trunkX} ${layout.brainAnchor.y} ${layout.trunkX + layout.curveR} ${layout.brainAnchor.y}
                L ${layout.brainAnchor.x} ${layout.brainAnchor.y}`}
            stroke="url(#mobileConnectionGradLayout)"
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
          />

          {/* Hooks de cada card */}
          {layout.hooks.map((h, i) => (
            <path
              key={`hook-${i}`}
              d={h.d}
              stroke="url(#mobileConnectionGradLayout)"
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </svg>
      )}

      {/* Cérebro centralizado no topo */}
      <div ref={brainRef} className="relative z-10 mb-2 scale-[0.45] origin-center">
        <CentralBrain />
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="relative z-10 flex flex-col items-start w-full pl-16 pr-2">
        {mobileOrder.map((idx, i) => (
          <div
            key={camadas[idx].position}
            ref={(el) => (cardRefs.current[i] = el)}
            className="relative w-full max-w-[260px]"
          >
            <MobileSvgCard camada={camadas[idx]} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolucoesGrid;