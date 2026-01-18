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
    const cursorInterval = setInterval(() => setShowCursor(prev => !prev), 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-red-500`}>_</span>
    </span>
  );
};

const ProblemaSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % problemas.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(prev => (prev >= 100 ? 0 : prev + 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="problema" className="relative py-32 md:py-48 bg-background overflow-hidden">
      {/* Scan lines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Terminal Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Terminal window */}
          <div className="bg-[#0a0a0a] border border-red-500/20 rounded-lg overflow-hidden max-w-3xl">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border-b border-red-500/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/30" />
              </div>
              <span className="text-red-400/60 text-xs font-mono ml-4">cortex_diagnostic.exe</span>
            </div>
            
            {/* Terminal content */}
            <div className="p-6 font-mono text-sm">
              <div className="text-white/40 mb-2">
                <span className="text-red-500">$</span> ./scan --target="business_ai_status"
              </div>
              <div className="text-white/60 mb-4">
                [SCANNING] Analyzing current market position...
              </div>
              <div className="text-red-400 text-2xl md:text-4xl font-bold">
                <TypingText text="⚠ SISTEMA COMPROMETIDO" delay={500} />
              </div>
              <div className="text-white/40 mt-4">
                Detected: 6 critical vulnerabilities
              </div>
            </div>
          </div>
        </motion.div>

        {/* HUD-style error display */}
        <div className="grid md:grid-cols-2 gap-4">
          {problemas.map((problema, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div 
                className={`relative p-5 bg-[#0a0a0a] border-l-4 transition-all duration-500 ${
                  activeIndex === index 
                    ? 'border-l-red-500 bg-red-500/5' 
                    : 'border-l-red-500/30 hover:border-l-red-500/60'
                }`}
              >
                {/* HUD corner brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500/40" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500/40" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500/40" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500/40" />
                
                {/* Error ID and severity */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-red-500/60 font-mono text-xs">{problema.id}</span>
                  <span className={`font-mono text-xs px-2 py-0.5 rounded ${
                    problema.severity === 'CRITICAL' 
                      ? 'bg-red-500/20 text-red-400 animate-pulse' 
                      : problema.severity === 'HIGH'
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    [{problema.severity}]
                  </span>
                </div>
                
                {/* Error message */}
                <h3 className="text-white font-medium text-lg group-hover:text-red-100 transition-colors">
                  {problema.titulo}
                </h3>

                {/* Active indicator - scan line */}
                {activeIndex === index && (
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "linear" }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* System status bar */}
        <motion.div 
          className="mt-12 p-4 bg-[#0a0a0a] border border-red-500/20 rounded font-mono text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-red-500">●</span>
              <span className="text-white/40">THREAT LEVEL:</span>
              <span className="text-red-400">CRITICAL</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white/40">SCAN:</span>
              <div className="w-32 h-1 bg-white/10 rounded overflow-hidden">
                <motion.div 
                  className="h-full bg-red-500"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <span className="text-white/40">{scanProgress}%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemaSection;
