import { motion } from "framer-motion";
import { Bot, BarChart3, Brain, Users, Sparkles, Search } from "lucide-react";
import { useState } from "react";
import brainIcon from "@/assets/brain-icon.png";

const camadas = [
  {
    icon: Bot,
    titulo: "Automação com IA",
    funcao: "WORKFLOWS INTELIGENTES QUE APRENDEM",
    beneficio: "Reduza 80% do trabalho operacional repetitivo",
    position: "top-left",
  },
  {
    icon: BarChart3,
    titulo: "Análise Estratégica",
    funcao: "DADOS TRANSFORMADOS EM DECISÕES",
    beneficio: "Tome decisões baseadas em inteligência, não intuição",
    position: "top-right",
  },
  {
    icon: Brain,
    titulo: "Engenharia de Prompt",
    funcao: "COMANDOS PRECISOS E ESTRUTURADOS",
    beneficio: "Extraia o máximo de qualquer modelo de IA",
    position: "mid-right",
  },
  {
    icon: Users,
    titulo: "Personas Treinadas",
    funcao: "IA QUE ENTENDE SEU NEGÓCIO",
    beneficio: "Assistentes que falam a língua da sua empresa",
    position: "mid-left",
  },
  {
    icon: Sparkles,
    titulo: "Agentes Inteligentes",
    funcao: "IA AUTÔNOMA E ESPECIALIZADA",
    beneficio: "Sistemas que executam, não apenas respondem",
    position: "bottom-center",
  },
  {
    icon: Search,
    titulo: "SEO + AEO",
    funcao: "OTIMIZAÇÃO PARA HUMANOS E IAS",
    beneficio: "Apareça em buscas tradicionais e respostas de IA",
    position: "bottom-right",
  },
];

// Card com cantos cortados estilo cyberpunk
const CyberCard = ({ camada, index }: { camada: typeof camadas[0]; index: number }) => {
  const Icon = camada.icon;

  const isRight = camada.position.includes("right");
  const isLeft = camada.position.includes("left");
  const isCenter = camada.position.includes("center");
  const usesLeftFrame = !isRight && (isLeft || camada.position.includes("center"));
  const isBottomRight = camada.position === "bottom-right";

  const LeftCardFrameSvg = () => (
    <svg
      className="absolute inset-0 h-full w-full"
      width="100%"
      height="100%"
      viewBox="0 0 661 276"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <g id="svg-bg-group">
        <rect id="svg-bg-base-01" x="0" y="0" width="661" height="276" fill="transparent" />
      </g>

      <g id="svg-decor-group">
        <path
          id="svg-decor-stroke-01"
          d="M472 260H159H46.5L15 228V56.5L49 22.5H456L462.5 18.5H461"
          stroke="hsl(var(--foreground))"
          vectorEffect="non-scaling-stroke"
        />
        <path
          id="svg-decor-stroke-02"
          d="M480.5 263.457H158.999L149.469 275H39.6233L0.5 233.845V184.158L9.52845 177.634V106.868L0.5 97.834V50.1547L41.6296 9H148.466L157.495 18.034H463"
          stroke="hsl(var(--foreground))"
          vectorEffect="non-scaling-stroke"
        />
      </g>

      <g id="svg-main-group">
        <path
          id="svg-main-ring-01"
          d="M528 0.5C600.888 0.5 660 61.3752 660 136.5C660 211.625 600.888 272.5 528 272.5C455.112 272.5 396 211.625 396 136.5C396 61.3752 455.112 0.5 528 0.5Z"
          stroke="hsl(var(--foreground))"
          vectorEffect="non-scaling-stroke"
        />
        <path
          id="svg-main-ring-02"
          d="M528 23.5C589.85 23.5 640 74.3094 640 137C640 199.691 589.85 250.5 528 250.5C466.15 250.5 416 199.691 416 137C416 74.3094 466.15 23.5 528 23.5Z"
          stroke="hsl(var(--foreground))"
          vectorEffect="non-scaling-stroke"
        />
      </g>

      <g id="svg-content-group" />
      <g id="svg-effects-group" />
    </svg>
  );

  const RightCardFrameSvg = () => (
    <svg
      className="absolute inset-0 h-full w-full"
      width="100%"
      height="100%"
      viewBox="0 0 731 267"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <g id="svg-bg-group">
        <rect id="svg-bg-base-01" x="0" y="0" width="731" height="267" fill="transparent" />
      </g>

      <g id="svg-decor-group" />

      <g id="svg-main-group">
        <circle
          id="svg-main-shape-01"
          cx="133.5"
          cy="133.5"
          r="133"
          stroke="hsl(var(--foreground))"
          vectorEffect="non-scaling-stroke"
        />
        <path
          id="svg-main-shape-02"
          d="M133.5 21.5C195.358 21.5 245.5 71.4223 245.5 133C245.5 194.578 195.358 244.5 133.5 244.5C71.642 244.5 21.5 194.578 21.5 133C21.5 71.4223 71.642 21.5 133.5 21.5Z"
          stroke="hsl(var(--foreground))"
          vectorEffect="non-scaling-stroke"
        />
        <path
          id="svg-main-shape-03"
          d="M180.501 258H690C712.091 258 730 240.091 730 218V49C730 26.9086 712.091 9 690 9H180.5"
          stroke="hsl(var(--foreground))"
          vectorEffect="non-scaling-stroke"
        />
        <path
          id="svg-main-shape-04"
          d="M192 253H685.499C707.591 253 725.499 235.091 725.499 213V53C725.499 30.9086 707.591 13 685.499 13H190"
          stroke="hsl(var(--foreground))"
          vectorEffect="non-scaling-stroke"
        />
      </g>

      <g id="svg-content-group" />
      <g id="svg-effects-group" />
    </svg>
  );

  const BottomRightCardFrameSvg = () => (
    <svg
      className="absolute inset-0 h-full w-full"
      width="100%"
      height="100%"
      viewBox="0 0 548 308"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <g id="svg-bg-group">
        <rect id="svg-bg-base-01" x="0" y="0" width="548" height="308" fill="transparent" />
      </g>

      <g id="svg-decor-group" />

      <g id="svg-main-group">
        <rect
          id="svg-main-shape-01"
          x="0.5"
          y="0.5"
          width="547"
          height="307"
          rx="39.5"
          stroke="hsl(var(--foreground))"
          vectorEffect="non-scaling-stroke"
        />
        <rect
          id="svg-main-shape-02"
          x="4.5"
          y="4.5"
          width="539"
          height="298"
          rx="39.5"
          stroke="hsl(var(--foreground))"
          vectorEffect="non-scaling-stroke"
        />
      </g>

      <g id="svg-content-group" />
      <g id="svg-effects-group" />
    </svg>
  );
  
  return (
    <div className={`relative group z-20 ${isCenter ? "translate-y-[30%]" : ""}`}>
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="relative"
      >
        {/* Glow effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-[#ff2244]/20 via-[#a855f7]/20 to-[#06b6d4]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {isRight ? (
        <section className="relative min-w-[280px] max-w-[420px] w-full aspect-[731/267]">
          <div className="absolute inset-0 pointer-events-none">
            {isBottomRight ? <BottomRightCardFrameSvg /> : <RightCardFrameSvg />}
          </div>

          {isBottomRight ? (
            <>
              {/* Ícone (layout retangular) */}
              <div className="absolute left-6 top-6 z-10">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] border border-[#a855f7]/30 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#a855f7]" />
                </div>
                <div className="absolute inset-0 rounded-full bg-[#a855f7]/20 blur-md -z-10" />
              </div>

              {/* Conteúdo (mantém texto original) */}
              <div className="relative z-10 h-full w-full pl-[92px] pr-6 py-6">
                <h3 className="text-white font-bold text-lg leading-tight mb-1">{camada.titulo}</h3>
                <p className="text-[#ff6b8a] text-[10px] uppercase tracking-widest mb-2 font-mono">{camada.funcao}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{camada.beneficio}</p>
              </div>
            </>
          ) : (
            <>
              {/* Ícone no círculo esquerdo do SVG */}
              <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] border border-[#a855f7]/30 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-[#a855f7]" />
                </div>
                <div className="absolute inset-0 rounded-full bg-[#a855f7]/20 blur-md -z-10" />
              </div>

              {/* Conteúdo (mantém texto original) */}
              <div className="relative z-10 h-full w-full pl-[210px] pr-6 py-5">
                <h3 className="text-white font-bold text-lg leading-tight mb-1">{camada.titulo}</h3>
                <p className="text-[#ff6b8a] text-[10px] uppercase tracking-widest mb-2 font-mono">{camada.funcao}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{camada.beneficio}</p>
              </div>
            </>
          )}
        </section>
      ) : usesLeftFrame ? (
        <section className="relative min-w-[280px] max-w-[360px] w-full aspect-[661/276]">
          <div className="absolute inset-0 pointer-events-none">
            <LeftCardFrameSvg />
          </div>

          <div className="relative z-10 h-full w-full px-6 py-5 pr-[118px]">
            <h3 className="text-white font-bold text-lg leading-tight mb-1">{camada.titulo}</h3>
            <p className="text-[#ff6b8a] text-[10px] uppercase tracking-widest mb-2 font-mono">{camada.funcao}</p>
            <p className="text-gray-400 text-sm leading-relaxed">{camada.beneficio}</p>
          </div>

          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] border border-[#a855f7]/30 flex items-center justify-center">
              <Icon className="w-7 h-7 text-[#a855f7]" />
            </div>
            <div className="absolute inset-0 rounded-full bg-[#a855f7]/20 blur-md -z-10" />
          </div>
        </section>
      ) : (
        <div className="relative p-[1px] min-w-[280px] max-w-[320px] bg-gradient-to-br from-[#ff2244] via-[#a855f7] to-[#06b6d4] rounded-xl">
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
        </div>
        )}
        
        {/* Ponto de conexão */}
        <div className="absolute w-3 h-3 rounded-full bg-[#ff2244] border-2 border-[#ff2244]/50 shadow-[0_0_10px_#ff2244] 
          top-1/2 -translate-y-1/2 
          ${camada.position.includes('left') ? '-right-1.5' : '-left-1.5'}
        " />
      </motion.div>
    </div>
  );
};


// Cérebro central com moldura animada
const CentralBrain = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex items-center justify-center w-[320px] h-[320px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute w-[250px] h-[250px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(330 100% 50% / 0.2) 0%, transparent 60%)",
          filter: "blur(30px)",
        }}
        animate={{ 
          scale: isHovered ? [1.1, 1.3, 1.1] : [1, 1.15, 1], 
          opacity: isHovered ? [0.5, 0.8, 0.5] : [0.4, 0.6, 0.4] 
        }}
        transition={{ duration: isHovered ? 2 : 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Light beams */}
      <div className="absolute -top-[50px] left-1/2 -translate-x-1/2 flex gap-[2px] z-30">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              width: i === 2 ? "2px" : "1px",
              height: i === 2 ? "60px" : `${30 + Math.abs(2 - i) * 8}px`,
              background: `linear-gradient(to top, hsl(330 100% 55%), transparent)`,
            }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>

      {/* Ring 1 - Outermost */}
      <div
        className="absolute w-[280px] h-[280px] rounded-full"
        style={{
          background: "linear-gradient(180deg, hsl(220 15% 18%) 0%, hsl(220 12% 10%) 100%)",
          boxShadow: `
            inset 0 2px 4px hsl(220 20% 30% / 0.5),
            inset 0 -4px 8px hsl(0 0% 0% / 0.8),
            0 8px 32px hsl(0 0% 0% / 0.6),
            0 2px 8px hsl(0 0% 0% / 0.4)
          `,
        }}
      />

      {/* Ring 2 */}
      <div
        className="absolute w-[245px] h-[245px] rounded-full"
        style={{
          background: "linear-gradient(180deg, hsl(220 12% 22%) 0%, hsl(220 10% 12%) 100%)",
          boxShadow: `
            inset 0 2px 3px hsl(220 15% 28% / 0.6),
            inset 0 -3px 6px hsl(0 0% 0% / 0.7),
            0 6px 20px hsl(0 0% 0% / 0.5)
          `,
        }}
      />

      {/* Ring 3 */}
      <div
        className="absolute w-[205px] h-[205px] rounded-full"
        style={{
          background: "linear-gradient(180deg, hsl(225 15% 16%) 0%, hsl(230 12% 8%) 100%)",
          boxShadow: `
            inset 0 3px 6px hsl(220 20% 25% / 0.5),
            inset 0 -5px 10px hsl(0 0% 0% / 0.9),
            0 10px 30px hsl(0 0% 0% / 0.7),
            0 4px 12px hsl(330 80% 30% / 0.1)
          `,
        }}
      />

      {/* Ring 4 */}
      <div
        className="absolute w-[165px] h-[165px] rounded-full"
        style={{
          background: "linear-gradient(180deg, hsl(220 10% 12%) 0%, hsl(230 15% 6%) 100%)",
          boxShadow: `
            inset 0 4px 8px hsl(0 0% 0% / 0.9),
            inset 0 -2px 4px hsl(220 15% 20% / 0.3),
            0 -2px 6px hsl(220 15% 25% / 0.2)
          `,
        }}
      />

      {/* Ring 5 - inner solid gray */}
      <div
        className="absolute w-[125px] h-[125px] rounded-full"
        style={{
          background: "linear-gradient(180deg, hsl(220 15% 14%) 0%, hsl(220 12% 8%) 100%)",
          boxShadow: `
            inset 0 3px 8px hsl(0 0% 0% / 0.6),
            inset 0 -4px 10px hsl(0 0% 0% / 0.8)
          `,
        }}
      />

      {/* SVG content */}
      <svg viewBox="0 0 320 320" className="absolute w-full h-full z-10">
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
        <motion.g
          style={{ transformOrigin: "160px 160px" }}
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ 
            duration: isHovered ? 8 : 0, 
            repeat: isHovered ? Infinity : 0, 
            ease: "linear" 
          }}
        >
          {/* Arc 1 - Outer ring (radius 140) */}
          <motion.path
            d={`M ${160 + 140 * Math.cos(-70 * Math.PI / 180)} ${160 + 140 * Math.sin(-70 * Math.PI / 180)} 
                A 140 140 0 0 1 ${160 + 140 * Math.cos(-20 * Math.PI / 180)} ${160 + 140 * Math.sin(-20 * Math.PI / 180)}`}
            fill="none" 
            stroke="hsl(340 100% 50%)" 
            strokeWidth={isHovered ? 5 : 4} 
            strokeLinecap="round" 
            filter={isHovered ? "url(#glowStrong)" : "url(#glow)"}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {/* Arc 2 - Second ring (radius 122) */}
          <motion.path
            d={`M ${160 + 122 * Math.cos(20 * Math.PI / 180)} ${160 + 122 * Math.sin(20 * Math.PI / 180)} 
                A 122 122 0 0 1 ${160 + 122 * Math.cos(70 * Math.PI / 180)} ${160 + 122 * Math.sin(70 * Math.PI / 180)}`}
            fill="none" 
            stroke="hsl(330 100% 55%)" 
            strokeWidth={isHovered ? 4 : 3} 
            strokeLinecap="round" 
            filter={isHovered ? "url(#glowStrong)" : "url(#glow)"}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          />
          {/* Arc 3 - Third ring (radius 102) */}
          <motion.path
            d={`M ${160 + 102 * Math.cos(120 * Math.PI / 180)} ${160 + 102 * Math.sin(120 * Math.PI / 180)} 
                A 102 102 0 0 1 ${160 + 102 * Math.cos(170 * Math.PI / 180)} ${160 + 102 * Math.sin(170 * Math.PI / 180)}`}
            fill="none" 
            stroke="hsl(340 100% 50%)" 
            strokeWidth={isHovered ? 5 : 4} 
            strokeLinecap="round" 
            filter={isHovered ? "url(#glowStrong)" : "url(#glow)"}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
          {/* Arc 4 - Outer ring opposite side (radius 140) */}
          <motion.path
            d={`M ${160 + 140 * Math.cos(200 * Math.PI / 180)} ${160 + 140 * Math.sin(200 * Math.PI / 180)} 
                A 140 140 0 0 1 ${160 + 140 * Math.cos(250 * Math.PI / 180)} ${160 + 140 * Math.sin(250 * Math.PI / 180)}`}
            fill="none" 
            stroke="hsl(330 100% 50%)" 
            strokeWidth={isHovered ? 4 : 3} 
            strokeLinecap="round" 
            filter={isHovered ? "url(#glowStrong)" : "url(#glow)"}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
          />
          {/* Arc 5 - Second ring opposite (radius 122) */}
          <motion.path
            d={`M ${160 + 122 * Math.cos(-160 * Math.PI / 180)} ${160 + 122 * Math.sin(-160 * Math.PI / 180)} 
                A 122 122 0 0 1 ${160 + 122 * Math.cos(-110 * Math.PI / 180)} ${160 + 122 * Math.sin(-110 * Math.PI / 180)}`}
            fill="none" 
            stroke="hsl(335 100% 52%)" 
            strokeWidth={isHovered ? 3 : 2} 
            strokeLinecap="round" 
            filter={isHovered ? "url(#glowStrong)" : "url(#glow)"}
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
        </motion.g>

        {/* Connection nodes */}
        {[
          { x: 160, y: 20 },
          { x: 300, y: 160 },
          { x: 160, y: 300 },
          { x: 20, y: 160 },
        ].map((pos, i) => (
          <g key={i}>
            <circle cx={pos.x} cy={pos.y} r={12} fill="hsl(230 20% 12%)" 
              style={{ filter: "drop-shadow(0 2px 4px hsl(0 0% 0% / 0.5))" }} />
            <circle cx={pos.x} cy={pos.y} r={10} fill="none" stroke="hsl(330 50% 35%)" strokeWidth="2" />
            <motion.circle
              cx={pos.x} cy={pos.y} r={5}
              fill="hsl(330 100% 55%)"
              filter={isHovered ? "url(#glowStrong)" : "url(#glow)"}
              animate={{ 
                opacity: [0.7, 1, 0.7],
                scale: isHovered ? [1, 1.3, 1] : [1, 1.1, 1]
              }}
              transition={{ duration: isHovered ? 1 : 2, repeat: Infinity, delay: i * 0.15 }}
            />
          </g>
        ))}


        {/* Connection lines */}
        <motion.line 
          x1="312" y1="160" x2="320" y2="160" 
          stroke="hsl(330 100% 50%)" 
          strokeWidth="2" 
          filter="url(#glow)"
          animate={{ opacity: isHovered ? [0.8, 1, 0.8] : 1 }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        <motion.line 
          x1="8" y1="160" x2="0" y2="160" 
          stroke="hsl(330 100% 50%)" 
          strokeWidth="2" 
          filter="url(#glow)"
          animate={{ opacity: isHovered ? [0.8, 1, 0.8] : 1 }}
          transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
        />
        <motion.line 
          x1="160" y1="8" x2="160" y2="0" 
          stroke="hsl(330 100% 50%)" 
          strokeWidth="2" 
          filter="url(#glow)"
          animate={{ opacity: isHovered ? [0.8, 1, 0.8] : 1 }}
          transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}
        />
      </svg>

      {/* Imagem do cérebro com glow */}
      {/* Imagem do cérebro sem glow */}
      <div className="absolute z-20 flex items-center justify-center">
        <img 
          src={brainIcon} 
          alt="AI Brain" 
          className="w-[280px] h-[280px] object-contain"
        />
      </div>
    </div>
  );
};

// Linhas de circuito SVG
const CircuitLines = () => (
  <svg 
    className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" 
    viewBox="0 0 1200 800"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff2244" stopOpacity="0" />
        <stop offset="50%" stopColor="#ff2244" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#ff2244" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#ff2244" stopOpacity="0" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Linhas esquerdas */}
    <path 
      d="M 0 150 L 100 150 L 150 150 L 200 200 L 350 200" 
      stroke="url(#lineGradient1)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    <path 
      d="M 0 450 L 80 450 L 130 400 L 200 400 L 350 350" 
      stroke="url(#lineGradient1)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    
    {/* Linhas direitas */}
    <path 
      d="M 850 200 L 1000 200 L 1050 150 L 1100 150 L 1200 150" 
      stroke="url(#lineGradient2)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    <path 
      d="M 850 350 L 950 350 L 1000 380 L 1100 380 L 1200 380" 
      stroke="url(#lineGradient2)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    <path 
      d="M 850 550 L 950 550 L 1000 580 L 1100 580 L 1200 580" 
      stroke="url(#lineGradient2)" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
    />
    
    {/* Linha inferior central */}
    <path 
      d="M 600 520 L 600 600 L 500 650" 
      stroke="#ff2244" 
      strokeWidth="2" 
      fill="none"
      filter="url(#glow)"
      strokeOpacity="0.6"
    />
    
    {/* Pontos de conexão */}
    <circle cx="150" cy="150" r="4" fill="#ff2244" filter="url(#glow)" />
    <circle cx="130" cy="400" r="4" fill="#ff2244" filter="url(#glow)" />
    <circle cx="1050" cy="150" r="4" fill="#a855f7" filter="url(#glow)" />
    <circle cx="1000" cy="380" r="4" fill="#a855f7" filter="url(#glow)" />
    <circle cx="1000" cy="580" r="4" fill="#a855f7" filter="url(#glow)" />
  </svg>
);

// Linhas de circuito nas bordas
const BorderCircuits = () => (
  <>
    {/* Circuitos superiores */}
    <div className="absolute top-0 left-0 w-48 h-px bg-gradient-to-r from-transparent via-[#a855f7]/50 to-transparent" />
    <div className="absolute top-0 right-0 w-48 h-px bg-gradient-to-r from-transparent via-[#a855f7]/50 to-transparent" />
    
    {/* Circuitos laterais */}
    <div className="absolute top-0 left-0 w-px h-32 bg-gradient-to-b from-transparent via-[#a855f7]/50 to-transparent" />
    <div className="absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-transparent via-[#a855f7]/50 to-transparent" />
    
    {/* Circuitos inferiores */}
    <div className="absolute bottom-0 left-0 w-48 h-px bg-gradient-to-r from-transparent via-[#ff2244]/50 to-transparent" />
    <div className="absolute bottom-0 right-0 w-48 h-px bg-gradient-to-r from-transparent via-[#ff2244]/50 to-transparent" />
  </>
);

const SolucoesGrid = () => {
  return (
    <section id="solucoes" className="relative bg-black py-24 md:py-32 overflow-hidden">
      
      {/* Circuitos de borda */}
      <BorderCircuits />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Título */}
        <motion.div 
          initial={{ opacity: 1, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="flex justify-center mb-16"
        >
          <div 
            className="relative px-8 py-3 bg-[#0a0a0f] border border-[#ff2244]/50"
            style={{
              clipPath: "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)",
            }}
          >
            <span className="text-white font-bold text-xl tracking-[0.3em] uppercase">
              Soluções
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff2244]/10 to-transparent pointer-events-none" />
          </div>
        </motion.div>
        
        {/* Layout principal */}
        <div className="relative min-h-[700px] flex items-center justify-center">
          {/* Linhas de circuito */}
          <CircuitLines />
          
          {/* Cérebro central */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[55%] z-10">
            <CentralBrain />
          </div>
          
          {/* Cards posicionados */}
          <div className="relative w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0 z-20">
            {/* Coluna esquerda */}
            <div className="flex flex-col gap-8 lg:items-start lg:pt-0">
              <CyberCard camada={camadas[0]} index={0} />
              <CyberCard camada={camadas[3]} index={3} />
            </div>
            
            {/* Coluna central (espaço para o cérebro + card inferior) */}
            <div className="flex flex-col items-center justify-end lg:pt-[400px]">
              <CyberCard camada={camadas[4]} index={4} />
            </div>
            
            {/* Coluna direita */}
            <div className="flex flex-col gap-8 lg:items-end lg:pt-0">
              <CyberCard camada={camadas[1]} index={1} />
              <CyberCard camada={camadas[2]} index={2} />
              <CyberCard camada={camadas[5]} index={5} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a855f7]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#ff2244]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#06b6d4]/5 rounded-full blur-[80px] pointer-events-none" />
    </section>
  );
};

export default SolucoesGrid;
