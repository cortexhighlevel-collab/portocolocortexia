import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const etapas = [
  { numero: "01", titulo: "Diagnóstico Estratégico", cmd: "analyze --deep" },
  { numero: "02", titulo: "Leitura do Negócio", cmd: "scan --business" },
  { numero: "03", titulo: "Criação de Personas", cmd: "create --persona" },
  { numero: "04", titulo: "Engenharia de Prompts", cmd: "build --prompts" },
  { numero: "05", titulo: "Construção de Agentes", cmd: "deploy --agents" },
  { numero: "06", titulo: "Integração Automações", cmd: "connect --flow" },
  { numero: "07", titulo: "Otimização SEO + AEO", cmd: "optimize --all" },
  { numero: "08", titulo: "Monitoramento", cmd: "watch --realtime" }
];

const MetodologiaSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => {
        const next = (prev + 1) % etapas.length;
        // Add command to terminal
        setTerminalLines(lines => {
          const newLines = [...lines, `$ ${etapas[next].cmd}`];
          return newLines.slice(-4); // Keep last 4 lines
        });
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="process" className="relative py-32 md:py-48 bg-background overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header with live terminal */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-red-500 to-transparent" />
              <span className="text-red-500 text-sm uppercase tracking-[0.3em] font-mono">Process</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              EXECUTION <span className="text-red-500">PROTOCOL</span>
            </h2>
            <p className="text-white/40">
              8 fases sequenciais para transformação completa
            </p>
          </motion.div>

          {/* Live terminal */}
          <motion.div
            className="bg-[#0a0a0a] border border-white/10 rounded-lg overflow-hidden"
            initial={{ opacity: 1, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-white/40 text-xs font-mono ml-2">cortex_protocol.sh</span>
            </div>
            <div className="p-4 font-mono text-sm h-32 flex flex-col justify-end">
              {terminalLines.map((line, i) => (
                <div key={i} className={`${i === terminalLines.length - 1 ? 'text-red-400' : 'text-white/30'}`}>
                  {line}
                </div>
              ))}
              <div className="text-white/50 flex items-center">
                <span className="text-red-500">$</span>
                <span className="ml-2 w-2 h-4 bg-red-500 animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Process timeline - vertical on mobile, horizontal on desktop */}
        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-4 md:left-0 top-0 md:top-1/2 w-0.5 md:w-full h-full md:h-0.5 bg-white/10 md:-translate-y-1/2" />
          <motion.div 
            className="absolute left-4 md:left-0 top-0 md:top-1/2 w-0.5 md:h-0.5 bg-red-500 md:-translate-y-1/2"
            style={{ 
              height: `${((activeStep + 1) / etapas.length) * 100}%`,
              width: undefined
            }}
            initial={{ height: 0 }}
            animate={{ height: `${((activeStep + 1) / etapas.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {etapas.map((etapa, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`relative pl-12 md:pl-0 ${index >= 4 ? 'md:mt-16' : ''}`}
              >
                {/* Node */}
                <div className={`absolute left-2 md:left-1/2 top-0 md:-top-2 w-5 h-5 rounded-full border-2 transition-all duration-500 md:-translate-x-1/2 ${
                  index <= activeStep 
                    ? 'bg-red-500 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]' 
                    : 'bg-[#0a0a0a] border-white/20'
                }`}>
                  {index === activeStep && (
                    <div className="absolute inset-0 rounded-full bg-red-500 animate-ping" />
                  )}
                </div>

                {/* Content */}
                <div className={`transition-all duration-500 ${
                  index === activeStep ? 'opacity-100' : 'opacity-50'
                }`}>
                  <span className="text-red-500/60 font-mono text-xs block mb-1">
                    STEP_{etapa.numero}
                  </span>
                  <h3 className="text-white font-medium text-sm md:text-base">
                    {etapa.titulo}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current step display */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-full">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 font-mono text-sm">
              EXECUTING: {etapas[activeStep].titulo}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MetodologiaSection;
