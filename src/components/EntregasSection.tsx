import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const entregas = [
  { id: "MOD_01", titulo: "Automação com IA", status: "READY", power: 95 },
  { id: "MOD_02", titulo: "Análise Estratégica", status: "READY", power: 88 },
  { id: "MOD_03", titulo: "Engenharia de Prompt", status: "READY", power: 92 },
  { id: "MOD_04", titulo: "Personas Treinadas", status: "READY", power: 85 },
  { id: "MOD_05", titulo: "Agentes de IA", status: "READY", power: 97 },
  { id: "MOD_06", titulo: "SEO + AEO", status: "READY", power: 90 }
];

const EntregasSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [systemTime, setSystemTime] = useState("00:00:00");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="entregas" className="relative py-32 md:py-48 bg-background overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* HUD Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Top status bar */}
          <div className="flex items-center justify-between mb-8 font-mono text-xs text-white/40">
            <div className="flex items-center gap-4">
              <span className="text-green-400">●</span>
              <span>SYSTEM ONLINE</span>
            </div>
            <span>{systemTime}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            MÓDULOS <span className="text-red-500">DISPONÍVEIS</span>
          </h2>
          <p className="text-white/40 font-mono text-sm">
            Select module to initialize deployment sequence
          </p>
        </motion.div>

        {/* Hexagonal grid style modules */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entregas.map((entrega, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 1, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group cursor-pointer"
            >
              <div className={`relative p-6 bg-[#0a0a0a] border transition-all duration-500 ${
                hoveredIndex === index 
                  ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.15)]' 
                  : 'border-white/10 hover:border-white/20'
              }`}>
                {/* Corner decorations */}
                <svg className="absolute top-0 left-0 w-6 h-6 text-red-500/50" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M0 0 L24 0 L24 4 L4 4 L4 24 L0 24 Z" />
                </svg>
                <svg className="absolute top-0 right-0 w-6 h-6 text-red-500/50 rotate-90" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M0 0 L24 0 L24 4 L4 4 L4 24 L0 24 Z" />
                </svg>
                <svg className="absolute bottom-0 left-0 w-6 h-6 text-red-500/50 -rotate-90" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M0 0 L24 0 L24 4 L4 4 L4 24 L0 24 Z" />
                </svg>
                <svg className="absolute bottom-0 right-0 w-6 h-6 text-red-500/50 rotate-180" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M0 0 L24 0 L24 4 L4 4 L4 24 L0 24 Z" />
                </svg>

                {/* Module ID */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-red-500/60 font-mono text-xs">{entrega.id}</span>
                  <span className="text-green-400 font-mono text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    {entrega.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white font-semibold text-xl mb-6 group-hover:text-red-100 transition-colors">
                  {entrega.titulo}
                </h3>

                {/* Power meter */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white/40">POWER</span>
                    <span className={`${hoveredIndex === index ? 'text-red-400' : 'text-white/60'}`}>
                      {entrega.power}%
                    </span>
                  </div>
                  <div className="h-1 bg-white/10 overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-red-600 to-red-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${entrega.power}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>

                {/* Hover glow effect */}
                {hoveredIndex === index && (
                  <motion.div 
                    className="absolute inset-0 bg-red-500/5 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom HUD info */}
        <motion.div 
          className="mt-12 flex items-center justify-center gap-8 font-mono text-xs text-white/30"
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <span>6 MODULES LOADED</span>
          <span className="text-red-500">|</span>
          <span>DEPLOYMENT: STANDBY</span>
          <span className="text-red-500">|</span>
          <span>STATUS: OPERATIONAL</span>
        </motion.div>
      </div>
    </section>
  );
};

export default EntregasSection;
