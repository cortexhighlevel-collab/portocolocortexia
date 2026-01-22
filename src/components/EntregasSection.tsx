import { motion } from "framer-motion";
import { useState, useEffect } from "react";
const entregas = [{
  id: "MOD_01",
  titulo: "Automação com IA",
  status: "READY",
  power: 95
}, {
  id: "MOD_02",
  titulo: "Análise Estratégica",
  status: "READY",
  power: 88
}, {
  id: "MOD_03",
  titulo: "Engenharia de Prompt",
  status: "READY",
  power: 92
}, {
  id: "MOD_04",
  titulo: "Personas Treinadas",
  status: "READY",
  power: 85
}, {
  id: "MOD_05",
  titulo: "Agentes de IA",
  status: "READY",
  power: 97
}, {
  id: "MOD_06",
  titulo: "SEO + AEO",
  status: "READY",
  power: 90
}];
const EntregasSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [systemTime, setSystemTime] = useState("00:00:00");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toLocaleTimeString('en-US', {
        hour12: false
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section id="entregas" className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
            SYSTEM TIME: {systemTime}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-wide">
            Módulos de Entrega
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entregas.map((entrega, index) => (
            <motion.div
              key={entrega.id}
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group"
            >
              <div className="bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:border-primary/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-foreground font-mono tracking-wider">
                    {entrega.id}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    entrega.status === "READY" 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {entrega.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {entrega.titulo}
                </h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>POWER</span>
                    <span>{entrega.power}%</span>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-primary/70"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${entrega.power}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 border border-primary/30 rounded-lg pointer-events-none"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default EntregasSection;