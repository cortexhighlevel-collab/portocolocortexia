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
      <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-red-500`}>_</span>
    </span>
  );
};

const ProblemaSection = () => {
  const [scanProgress, setScanProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(prev => (prev >= 100 ? 0 : prev + 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % problemas.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-600 text-white animate-pulse";
      case "HIGH":
        return "bg-amber-600 text-white";
      case "MEDIUM":
        return "bg-cyan-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  return (
    <section
      id="problema"
      className="relative bg-black py-20 md:py-32 scroll-mt-32"
    >
      {/* Scan lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Terminal Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-zinc-950 border border-red-500/20 rounded-lg overflow-hidden max-w-3xl">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border-b border-red-500/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-600" />
              </div>
              <span className="text-red-400/80 text-xs ml-4">cortex_diagnostic.exe</span>
            </div>

            {/* Terminal content */}
            <div className="p-6 text-sm">
              <div className="text-zinc-400 mb-2">
                <span className="text-red-500">$</span> ./scan --target="business_ai_status"
              </div>
              <div className="text-zinc-400 mb-4">[SCANNING] Analyzing current market position...</div>
              <div className="text-red-500 text-2xl md:text-4xl font-bold">
                <TypingText text="⚠ SISTEMA COMPROMETIDO" delay={500} />
              </div>
              <div className="text-zinc-400 mt-4">Detected: 6 critical vulnerabilities</div>
            </div>
          </div>
        </motion.div>

        {/* Cards Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Coluna 1 */}
          <div className="space-y-4">
            {[problemas[0], problemas[1], problemas[4]].map((problema, i) => (
              <motion.div
                key={problema.id}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                <div className="relative p-5 bg-zinc-950 border border-red-500/30 rounded-lg hover:border-red-500/60 transition-all duration-300 min-h-[140px]">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-6 h-[2px] bg-red-500" />
                  <div className="absolute top-0 left-0 w-[2px] h-6 bg-red-500" />
                  <div className="absolute top-0 right-0 w-6 h-[2px] bg-red-500" />
                  <div className="absolute top-0 right-0 w-[2px] h-6 bg-red-500" />
                  <div className="absolute bottom-0 left-0 w-6 h-[2px] bg-red-500" />
                  <div className="absolute bottom-0 left-0 w-[2px] h-6 bg-red-500" />
                  <div className="absolute bottom-0 right-0 w-6 h-[2px] bg-red-500" />
                  <div className="absolute bottom-0 right-0 w-[2px] h-6 bg-red-500" />

                  {/* Severity badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${getSeverityStyle(problema.severity)}`}>
                      [{problema.severity}]
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-6">
                    <span className="text-red-400 text-xs tracking-wider">{problema.id}</span>
                    <h3 className="text-white font-semibold text-lg mt-2">{problema.titulo}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coluna 2 - Card central maior */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group"
          >
            <div className="relative p-5 bg-zinc-950 border border-red-500/30 rounded-lg hover:border-red-500/60 transition-all duration-300 h-full min-h-[300px] md:min-h-full">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-red-500" />
              <div className="absolute top-0 left-0 w-[2px] h-8 bg-red-500" />
              <div className="absolute top-0 right-0 w-8 h-[2px] bg-red-500" />
              <div className="absolute top-0 right-0 w-[2px] h-8 bg-red-500" />
              <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-red-500" />
              <div className="absolute bottom-0 left-0 w-[2px] h-8 bg-red-500" />
              <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-red-500" />
              <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-red-500" />

              {/* Severity badge */}
              <div className="absolute top-3 right-3">
                <span className={`text-[10px] font-bold px-2 py-1 rounded ${getSeverityStyle(problemas[2].severity)}`}>
                  [{problemas[2].severity}]
                </span>
              </div>

              {/* Content - centered */}
              <div className="h-full flex flex-col justify-end">
                <span className="text-red-400 text-xs tracking-wider">{problemas[2].id}</span>
                <h3 className="text-white font-semibold text-xl mt-2">{problemas[2].titulo}</h3>
              </div>
            </div>
          </motion.div>

          {/* Coluna 3 */}
          <div className="space-y-4">
            {[problemas[3], problemas[5]].map((problema, i) => (
              <motion.div
                key={problema.id}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i + 3) * 0.1 }}
                className="group"
              >
                <div className="relative p-5 bg-zinc-950 border border-red-500/30 rounded-lg hover:border-red-500/60 transition-all duration-300 min-h-[140px]">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-6 h-[2px] bg-red-500" />
                  <div className="absolute top-0 left-0 w-[2px] h-6 bg-red-500" />
                  <div className="absolute top-0 right-0 w-6 h-[2px] bg-red-500" />
                  <div className="absolute top-0 right-0 w-[2px] h-6 bg-red-500" />
                  <div className="absolute bottom-0 left-0 w-6 h-[2px] bg-red-500" />
                  <div className="absolute bottom-0 left-0 w-[2px] h-6 bg-red-500" />
                  <div className="absolute bottom-0 right-0 w-6 h-[2px] bg-red-500" />
                  <div className="absolute bottom-0 right-0 w-[2px] h-6 bg-red-500" />

                  {/* Severity badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${getSeverityStyle(problema.severity)}`}>
                      [{problema.severity}]
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-6">
                    <span className="text-red-400 text-xs tracking-wider">{problema.id}</span>
                    <h3 className="text-white font-semibold text-lg mt-2">{problema.titulo}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* System status bar */}
        <motion.div
          className="mt-12 p-4 bg-zinc-950 border border-red-500/20 rounded text-xs"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-red-500">●</span>
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
