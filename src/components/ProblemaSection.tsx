import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const problemas = [
  { id: "ERR_001", titulo: "IA usada de forma rasa", severity: "CRITICAL" },
  { id: "ERR_002", titulo: "Prompts fracos e genéricos", severity: "HIGH" },
  { id: "ERR_003", titulo: "Automação sem inteligência", severity: "CRITICAL" },
  { id: "ERR_004", titulo: "SEO tradicional está morto", severity: "CRITICAL" },
  { id: "ERR_005", titulo: "Invisíveis para IA", severity: "HIGH" },
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
      <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-destructive`}>_</span>
    </span>
  );
};

// Cyberpunk card with neon borders
const CyberCard = ({ 
  problema, 
  index,
  className = ""
}: { 
  problema: typeof problemas[0]; 
  index: number;
  className?: string;
}) => {
  const severityColors: Record<string, string> = {
    CRITICAL: "bg-red-600 text-white",
    HIGH: "bg-amber-600 text-white",
    MEDIUM: "bg-cyan-600 text-white"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`relative group ${className}`}
    >
      {/* Main card */}
      <div className="relative h-full min-h-[160px] bg-[#0a0f14] rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500/60 transition-all duration-300">
        
        {/* Circuit pattern background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 95%, rgba(239,68,68,0.15) 95%),
              linear-gradient(0deg, transparent 95%, rgba(239,68,68,0.15) 95%)
            `,
            backgroundSize: '30px 30px'
          }}
        />
        
        {/* Corner accents - Top Left */}
        <div className="absolute top-0 left-0 w-8 h-[2px] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
        <div className="absolute top-0 left-0 w-[2px] h-8 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
        
        {/* Corner accents - Top Right */}
        <div className="absolute top-0 right-0 w-8 h-[2px] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
        <div className="absolute top-0 right-0 w-[2px] h-8 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
        
        {/* Corner accents - Bottom Left */}
        <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
        <div className="absolute bottom-0 left-0 w-[2px] h-8 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
        
        {/* Corner accents - Bottom Right */}
        <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
        <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />

        {/* Content */}
        <div className="relative z-10 p-5 h-full flex flex-col justify-end">
          {/* Severity badge */}
          <div className="absolute top-4 right-4">
            <span 
              className={`text-[10px] font-bold px-2 py-1 rounded-sm ${severityColors[problema.severity]} ${
                problema.severity === "CRITICAL" ? "animate-pulse" : ""
              }`}
            >
              [{problema.severity}]
            </span>
          </div>

          {/* Error ID */}
          <span className="text-red-400 text-xs tracking-wider mb-2">
            {problema.id}
          </span>
          
          {/* Title */}
          <h3 className="text-white font-semibold text-lg leading-tight">
            {problema.titulo}
          </h3>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
          <div className="bg-[#0a0a0a] border border-destructive/25 rounded-lg overflow-hidden max-w-3xl">
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

        {/* Bento Grid Layout - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <CyberCard problema={problemas[0]} index={0} />
            <CyberCard problema={problemas[1]} index={1} />
            <CyberCard problema={problemas[4]} index={4} />
          </div>
          
          {/* Column 2 - Center with taller card */}
          <div className="flex flex-col gap-4">
            <CyberCard problema={problemas[2]} index={2} className="flex-1 min-h-[340px]" />
          </div>
          
          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <CyberCard problema={problemas[3]} index={3} />
            <CyberCard problema={problemas[5]} index={5} />
          </div>
        </div>

        {/* System status bar */}
        <motion.div
          className="mt-12 p-4 bg-[#0a0a0a] border border-destructive/25 rounded text-xs"
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
    </section>
  );
};

export default ProblemaSection;
