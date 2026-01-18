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
    <section
      id="problema"
      className="relative z-[60] py-32 md:py-48 bg-background overflow-hidden scroll-mt-32"
    >
      {/* Scan lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Terminal Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {/* Terminal window */}
          <div className="bg-card border border-destructive/30 rounded-lg overflow-hidden max-w-3xl">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-2 bg-destructive/10 border-b border-destructive/30">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-muted" />
                <div className="w-3 h-3 rounded-full bg-accent" />
              </div>
              <span className="text-destructive/70 text-xs font-mono ml-4">cortex_diagnostic.exe</span>
            </div>

            {/* Terminal content */}
            <div className="p-6 font-mono text-sm">
              <div className="text-foreground/70 mb-2">
                <span className="text-destructive">$</span> ./scan --target="business_ai_status"
              </div>
              <div className="text-foreground/70 mb-4">[SCANNING] Analyzing current market position...</div>
              <div className="text-destructive text-2xl md:text-4xl font-bold">
                <TypingText text="⚠ SISTEMA COMPROMETIDO" delay={500} />
              </div>
              <div className="text-foreground/70 mt-4">Detected: 6 critical vulnerabilities</div>
            </div>
          </div>
        </motion.div>

        {/* HUD-style error display */}
        <div className="grid md:grid-cols-2 gap-4">
          {problemas.map((problema, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              className="group"
            >
              <div
                className={`relative p-5 bg-card border-l-4 transition-all duration-500 ${
                  activeIndex === index
                    ? "border-l-destructive bg-destructive/10"
                    : "border-l-destructive/40 hover:border-l-destructive"
                }`}
              >
                {/* HUD corner brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-destructive/50" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-destructive/50" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-destructive/50" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-destructive/50" />

                {/* Error ID and severity */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-destructive/70 font-mono text-xs">{problema.id}</span>
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded ${
                      problema.severity === "CRITICAL"
                        ? "bg-destructive/25 text-destructive animate-pulse"
                        : problema.severity === "HIGH"
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    [{problema.severity}]
                  </span>
                </div>

                {/* Error message */}
                <h3 className="text-foreground font-medium text-lg group-hover:text-foreground transition-colors">
                  {problema.titulo}
                </h3>

                {/* Active indicator - scan line */}
                {activeIndex === index && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-destructive"
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
          className="mt-12 p-4 bg-card border border-border rounded font-mono text-xs"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-destructive">●</span>
              <span className="text-muted-foreground">THREAT LEVEL:</span>
              <span className="text-destructive">CRITICAL</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">SCAN:</span>
              <div className="w-32 h-1 bg-muted rounded overflow-hidden">
                <motion.div className="h-full bg-destructive" style={{ width: `${scanProgress}%` }} />
              </div>
              <span className="text-muted-foreground">{scanProgress}%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemaSection;
