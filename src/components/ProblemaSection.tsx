import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const problemas = [
  { 
    id: "ERR_001", 
    titulo: "IA usada de forma rasa", 
    severity: "CRITICAL",
    gridArea: "a",
    bgPattern: "glitch"
  },
  { 
    id: "ERR_002", 
    titulo: "Prompts fracos e genéricos", 
    severity: "HIGH",
    gridArea: "b",
    bgPattern: "stealth"
  },
  { 
    id: "ERR_003", 
    titulo: "Automação sem inteligência", 
    severity: "CRITICAL",
    gridArea: "c",
    bgPattern: "hands"
  },
  { 
    id: "ERR_004", 
    titulo: "SEO tradicional está morto", 
    severity: "CRITICAL",
    gridArea: "d",
    bgPattern: "chart"
  },
  { 
    id: "ERR_005", 
    titulo: "Invisíveis para IA", 
    severity: "HIGH",
    gridArea: "e",
    bgPattern: "jet"
  },
  { 
    id: "ERR_006", 
    titulo: "Sem agentes treinados", 
    severity: "MEDIUM",
    gridArea: "f",
    bgPattern: "agents"
  }
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
      <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-destructive`}>_</span>
    </span>
  );
};

// Cyberpunk card frame with corner accents
const CyberCard = ({ 
  problema, 
  index,
  className = ""
}: { 
  problema: typeof problemas[0]; 
  index: number;
  className?: string;
}) => {
  const severityColors = {
    CRITICAL: "bg-red-600/90 text-white",
    HIGH: "bg-amber-600/90 text-white",
    MEDIUM: "bg-cyan-600/90 text-white"
  };

  const getBgGradient = (pattern: string) => {
    switch (pattern) {
      case "glitch":
        return "linear-gradient(135deg, rgba(0,20,40,0.9) 0%, rgba(20,0,30,0.9) 50%, rgba(40,10,20,0.9) 100%)";
      case "stealth":
        return "linear-gradient(180deg, rgba(10,20,30,0.95) 0%, rgba(20,30,40,0.9) 100%)";
      case "hands":
        return "linear-gradient(180deg, rgba(0,10,20,0.85) 0%, rgba(10,20,30,0.9) 100%)";
      case "chart":
        return "linear-gradient(135deg, rgba(30,10,10,0.9) 0%, rgba(20,5,15,0.95) 100%)";
      case "jet":
        return "linear-gradient(135deg, rgba(10,15,30,0.95) 0%, rgba(20,25,40,0.9) 100%)";
      case "agents":
        return "linear-gradient(180deg, rgba(0,20,30,0.9) 0%, rgba(10,25,35,0.95) 100%)";
      default:
        return "linear-gradient(180deg, rgba(10,10,20,0.9) 0%, rgba(20,20,30,0.9) 100%)";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative group ${className}`}
    >
      {/* Main card container */}
      <div 
        className="relative h-full overflow-hidden rounded-lg"
        style={{ background: getBgGradient(problema.bgPattern) }}
      >
        {/* Animated circuit pattern overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 98%, rgba(239,68,68,0.3) 98%),
              linear-gradient(0deg, transparent 98%, rgba(239,68,68,0.3) 98%)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Glow effects */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent" />
        </div>

        {/* Neon border frame */}
        <div className="absolute inset-0 rounded-lg border border-red-500/40 group-hover:border-red-500/70 transition-colors duration-300" />
        
        {/* Corner accents - Top Left */}
        <div className="absolute top-0 left-0">
          <div className="w-6 h-[2px] bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          <div className="w-[2px] h-6 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
        </div>
        
        {/* Corner accents - Top Right */}
        <div className="absolute top-0 right-0">
          <div className="w-6 h-[2px] bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] ml-auto" />
          <div className="w-[2px] h-6 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] ml-auto" />
        </div>
        
        {/* Corner accents - Bottom Left */}
        <div className="absolute bottom-0 left-0">
          <div className="w-[2px] h-6 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          <div className="w-6 h-[2px] bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
        </div>
        
        {/* Corner accents - Bottom Right */}
        <div className="absolute bottom-0 right-0">
          <div className="w-[2px] h-6 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] ml-auto" />
          <div className="w-6 h-[2px] bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] ml-auto" />
        </div>

        {/* Diagonal corner cuts effect */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-2 right-2 w-20 h-20 border-t-2 border-r-2 border-red-500/50 rotate-45 translate-x-8 -translate-y-8" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-5 h-full flex flex-col justify-end min-h-[140px]">
          {/* Severity badge - positioned top right */}
          <div className="absolute top-3 right-3">
            <span 
              className={`text-[10px] font-bold px-2 py-1 rounded ${severityColors[problema.severity as keyof typeof severityColors]} ${
                problema.severity === "CRITICAL" ? "animate-pulse" : ""
              }`}
            >
              [{problema.severity}]
            </span>
          </div>

          {/* Error ID */}
          <span className="text-red-400/80 text-xs tracking-wider mb-1">
            {problema.id}
          </span>
          
          {/* Title */}
          <h3 className="text-white font-semibold text-lg leading-tight">
            {problema.titulo}
          </h3>
        </div>

        {/* Scan line effect on hover */}
        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent animate-scan-line" />
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
      className="relative z-[60] bg-background overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 scroll-mt-32"
    >
      {/* Scan lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Terminal Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Terminal window */}
          <div className="bg-secondary border border-destructive/25 rounded-lg overflow-hidden max-w-3xl">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-2 bg-destructive/10 border-b border-destructive/25">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-muted" />
                <div className="w-3 h-3 rounded-full bg-accent" />
              </div>
              <span className="text-destructive/80 text-xs ml-4">cortex_diagnostic.exe</span>
            </div>

            {/* Terminal content */}
            <div className="p-6 text-sm">
              <div className="text-foreground/80 mb-2">
                <span className="text-destructive">$</span> ./scan --target="business_ai_status"
              </div>
              <div className="text-foreground/80 mb-4">[SCANNING] Analyzing current market position...</div>
              <div className="text-destructive text-2xl md:text-4xl font-bold">
                <TypingText text="⚠ SISTEMA COMPROMETIDO" delay={500} />
              </div>
              <div className="text-foreground/80 mt-4">Detected: 6 critical vulnerabilities</div>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(160px,auto)]">
          {/* Row 1 */}
          <CyberCard problema={problemas[0]} index={0} className="md:col-span-1" />
          <CyberCard problema={problemas[2]} index={2} className="md:col-span-1 md:row-span-2" />
          <CyberCard problema={problemas[3]} index={3} className="md:col-span-1" />
          
          {/* Row 2 */}
          <CyberCard problema={problemas[1]} index={1} className="md:col-span-1" />
          <CyberCard problema={problemas[5]} index={5} className="md:col-span-1" />
          
          {/* Row 3 */}
          <CyberCard problema={problemas[4]} index={4} className="md:col-span-1" />
        </div>

        {/* System status bar */}
        <motion.div
          className="mt-12 p-4 bg-secondary border border-destructive/25 rounded text-xs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-destructive">●</span>
              <span className="text-foreground/80">THREAT LEVEL:</span>
              <span className="text-destructive">CRITICAL</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-foreground/80">SCAN:</span>
              <div className="w-32 h-1 bg-muted rounded overflow-hidden">
                <motion.div className="h-full bg-destructive" style={{ width: `${scanProgress}%` }} />
              </div>
              <span className="text-foreground/80">{scanProgress}%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add scan line animation */}
      <style>{`
        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(calc(100vh)); }
        }
        .animate-scan-line {
          animation: scan-line 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ProblemaSection;
