import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { isIOSDevice } from "@/lib/platform";

import glitchErrorImage from "@/assets/glitch-error.webp";
import codeMatrixImage from "@/assets/code-matrix.webp";
import stealthJetImage from "@/assets/stealth-jet.webp";
import robotHandsImage from "@/assets/robot-hands.webp";
import brokenChartImage from "@/assets/broken-chart.webp";

const problemas = [
  { id: "ERR_001", titulo: "IA usada de forma rasa", severity: "CRITICAL", image: glitchErrorImage },
  { id: "ERR_002", titulo: "Prompts fracos e genéricos", severity: "HIGH", image: codeMatrixImage },
  { id: "ERR_003", titulo: "Automação sem inteligência", severity: "CRITICAL", image: robotHandsImage },
  { id: "ERR_004", titulo: "SEO tradicional está morto", severity: "CRITICAL", image: brokenChartImage },
  { id: "ERR_005", titulo: "Invisíveis para IA", severity: "HIGH", image: stealthJetImage },
  { id: "ERR_006", titulo: "Sem agentes treinados", severity: "MEDIUM" }
];

const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((prev) => !prev), 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayText}
      <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-red-500`}>_</span>
    </span>
  );
};

// Card cyberpunk com cantos cortados diagonalmente
const CyberCard = ({ 
  problema, 
  isLarge = false,
  isMedium = false,
  delay = 0 
}: { 
  problema: { id: string; titulo: string; severity: string; image?: string }; 
  isLarge?: boolean;
  isMedium?: boolean;
  delay?: number;
}) => {
  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-600 text-white";
      case "HIGH":
        return "bg-amber-600 text-white";
      case "MEDIUM":
        return "bg-cyan-500 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  // Clip path para cantos diagonais cortados
  const clipPath = isLarge 
    ? "polygon(0 30px, 30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)"
    : "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)";

  const cornerSize = isLarge ? 30 : 20;

  const isIOSMobile =
    typeof window !== "undefined" &&
    window.innerWidth < 768 &&
    isIOSDevice();

  return (
    <motion.div
      // Failsafe: nunca começa invisível (o `whileInView` pode falhar em alguns cenários de scroll/sticky)
      initial={{ opacity: 1, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`relative group ${isLarge ? 'h-full' : ''}`}
    >
      {/* Outer glow border */}
      <div 
        className="absolute inset-0"
        style={{
          clipPath,
          background: 'linear-gradient(135deg, rgba(239,68,68,0.6) 0%, rgba(239,68,68,0.2) 50%, rgba(239,68,68,0.6) 100%)',
          // iOS/WebKit: blur em elementos grandes pode custar caro e derrubar a aba.
          filter: isIOSMobile ? "none" : 'blur(1px)',
        }}
      />
      
      {/* Main card container */}
      <div 
        className={`relative bg-zinc-950/95 ${isLarge ? 'h-full min-h-[295px] lg:min-h-[460px]' : isMedium ? 'min-h-[220px] lg:min-h-[340px]' : 'min-h-[100px] lg:min-h-[160px]'}`}
        style={{
          clipPath,
          margin: '1px',
        }}
      >
        {/* Inner border effect */}
        <div 
          className="absolute inset-[1px]"
          style={{
            clipPath,
            border: '1px solid rgba(239,68,68,0.4)',
            pointerEvents: 'none',
          }}
        />

        {/* Diagonal corner lines - Top Left */}
        <svg className="absolute top-0 left-0 pointer-events-none" width={cornerSize + 20} height={cornerSize + 20}>
          <line 
            x1="0" 
            y1={cornerSize} 
            x2={cornerSize} 
            y2="0" 
            stroke="rgba(239,68,68,0.8)" 
            strokeWidth="2"
          />
          {/* Horizontal line from corner */}
          <line 
            x1={cornerSize} 
            y1="1" 
            x2={cornerSize + 40} 
            y2="1" 
            stroke="rgba(239,68,68,0.8)" 
            strokeWidth="2"
          />
          {/* Vertical line from corner */}
          <line 
            x1="1" 
            y1={cornerSize} 
            x2="1" 
            y2={cornerSize + 40} 
            stroke="rgba(239,68,68,0.8)" 
            strokeWidth="2"
          />
        </svg>

        {/* Diagonal corner lines - Bottom Right */}
        <svg className="absolute bottom-0 right-0 pointer-events-none" width={cornerSize + 20} height={cornerSize + 20} style={{ transform: 'rotate(180deg)' }}>
          <line 
            x1="0" 
            y1={cornerSize} 
            x2={cornerSize} 
            y2="0" 
            stroke="rgba(239,68,68,0.8)" 
            strokeWidth="2"
          />
          {/* Horizontal line from corner */}
          <line 
            x1={cornerSize} 
            y1="1" 
            x2={cornerSize + 40} 
            y2="1" 
            stroke="rgba(239,68,68,0.8)" 
            strokeWidth="2"
          />
          {/* Vertical line from corner */}
          <line 
            x1="1" 
            y1={cornerSize} 
            x2="1" 
            y2={cornerSize + 40} 
            stroke="rgba(239,68,68,0.8)" 
            strokeWidth="2"
          />
        </svg>

        {/* Top right corner accent */}
        <div className="absolute top-0 right-0">
          <div className="absolute top-0 right-0 w-12 h-[2px] bg-red-500/80" />
          <div className="absolute top-0 right-0 w-[2px] h-12 bg-red-500/80" />
        </div>

        {/* Bottom left corner accent */}
        <div className="absolute bottom-0 left-0">
          <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-red-500/80" />
          <div className="absolute bottom-0 left-0 w-[2px] h-12 bg-red-500/80" />
        </div>

        {/* Severity badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className={`text-[10px] font-bold px-2 py-1 ${getSeverityStyle(problema.severity)}`}>
            [{problema.severity}]
          </span>
        </div>

        {/* Background Image */}
        {problema.image && (
          <div 
            className="absolute inset-0 z-0 opacity-40"
            style={{ clipPath }}
          >
            <img 
              src={problema.image} 
              alt="" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className={`relative z-10 p-4 lg:p-6 ${isLarge ? 'h-full flex flex-col justify-end' : 'pt-8 lg:pt-10'}`}>
          <span className="text-red-400 text-xs tracking-wider font-mono">{problema.id}</span>
          <h3 className={`text-white font-semibold mt-2 ${isLarge ? 'text-xl lg:text-2xl' : 'text-base lg:text-lg'}`}>
            {problema.titulo}
          </h3>
        </div>

        {/* Scan line animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ clipPath }}>
          <motion.div
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent"
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const ProblemaSection = () => {
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(prev => (prev >= 100 ? 0 : prev + 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="problema"
      className="relative bg-black py-20 md:py-32 scroll-mt-32"
    >
      {/* Circuit pattern background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(239,68,68,0.1) 1px, transparent 1px),
            linear-gradient(rgba(239,68,68,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Terminal Header */}
        <motion.div
          className="mb-16"
          // Failsafe: evita o header ficar preso em opacity:0 se o observer do `whileInView` não disparar
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-zinc-950 border border-red-500/20 rounded-lg overflow-hidden max-w-3xl mx-auto">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border-b border-red-500/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-600" />
              </div>
              <span className="text-red-400/80 text-xs ml-4 font-mono">cortex_diagnostic.exe</span>
            </div>

            {/* Terminal content */}
            <div className="p-6 text-sm font-mono">
              <div className="text-zinc-400 mb-2">
                <span className="text-red-500">$</span> ./scan --target="business_ai_status"
              </div>
              <div className="text-zinc-400 mb-4">[SCANNING] Analyzing current market position...</div>
              <div className="text-red-500 text-2xl md:text-4xl font-bold font-sans">
                <TypingText text="⚠ SISTEMA COMPROMETIDO" delay={500} />
              </div>
              <div className="text-zinc-400 mt-4">Detected: 6 critical vulnerabilities</div>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid - Card central mais fino */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr_1.2fr] gap-5">
          {/* Column 1 - 3 stacked cards */}
          <div className="flex flex-col gap-5">
            <CyberCard problema={problemas[0]} delay={0} />
            <CyberCard problema={problemas[1]} delay={0.1} />
            <CyberCard problema={problemas[4]} delay={0.2} />
          </div>

          {/* Column 2 - Large central card (mais fino) */}
          <CyberCard problema={problemas[2]} isLarge={true} delay={0.15} />

          {/* Column 3 - 2 stacked cards */}
          <div className="flex flex-col gap-5">
            <CyberCard problema={problemas[3]} isMedium={true} delay={0.2} />
            <CyberCard problema={problemas[5]} delay={0.3} />
          </div>
        </div>

        {/* System status bar */}
        <motion.div
          className="mt-12 p-4 bg-zinc-950 border border-red-500/20 rounded text-xs font-mono"
          // Failsafe: nunca fica invisível
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-red-500 animate-pulse">●</span>
              <span className="text-zinc-400">THREAT LEVEL:</span>
              <span className="text-red-500 font-bold">CRITICAL</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-zinc-400">SCAN:</span>
              <div className="w-32 h-1 bg-zinc-800 rounded overflow-hidden">
                <motion.div 
                  className="h-full bg-red-500" 
                  style={{ width: `${scanProgress}%` }} 
                />
              </div>
              <span className="text-zinc-400">{scanProgress}%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemaSection;
