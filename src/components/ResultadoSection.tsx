import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const resultados = [
  { metric: 80, suffix: "%", prefix: "+", label: "EFFICIENCY", color: "red" },
  { metric: 10, suffix: "x", prefix: "", label: "DECISIONS", color: "red" },
  { metric: 70, suffix: "%", prefix: "-", label: "EFFORT", color: "green" },
  { metric: 24, suffix: "/7", prefix: "", label: "OPERATION", color: "purple" },
];

const AnimatedCounter = ({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const startTime = Date.now();
          
          const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.floor(eased * value));
            
            if (progress >= 1) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="font-mono">
      <span className="text-red-500">{prefix}</span>
      {displayValue}
      <span className="text-red-500">{suffix}</span>
    </div>
  );
};

const ResultadoSection = () => {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="resultado" className="relative py-32 md:py-48 bg-background overflow-hidden">
      {/* HUD overlay elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner brackets */}
        <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-red-500/20" />
        <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-red-500/20" />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-red-500/20" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-red-500/20" />
        
        {/* Crosshair center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-px h-8 bg-red-500/20 absolute left-1/2 -top-12" />
          <div className="w-px h-8 bg-red-500/20 absolute left-1/2 top-4" />
          <div className="h-px w-8 bg-red-500/20 absolute top-1/2 -left-12" />
          <div className="h-px w-8 bg-red-500/20 absolute top-1/2 left-4" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 border border-green-500/30 bg-green-500/5 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-mono uppercase tracking-wider">TARGET ACQUIRED</span>
          </div>
          
          <h2 className={`text-4xl md:text-6xl font-bold text-white transition-all ${
            glitchActive ? 'translate-x-1 text-red-500' : ''
          }`}>
            PERFORMANCE <span className="text-red-500">METRICS</span>
          </h2>
        </motion.div>

        {/* Metrics grid - Game HUD style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {resultados.map((resultado, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 1, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-6 bg-[#0a0a0a] border border-white/10 hover:border-red-500/50 transition-all">
                {/* Top bar like health/mana bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
                  <motion.div 
                    className="h-full bg-red-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                  />
                </div>

                {/* Label */}
                <span className="text-white/30 text-xs font-mono block mb-4">
                  {resultado.label}
                </span>

                {/* Value */}
                <div className="text-4xl md:text-5xl font-bold text-white">
                  <AnimatedCounter 
                    value={resultado.metric} 
                    suffix={resultado.suffix} 
                    prefix={resultado.prefix}
                  />
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-2 right-2 w-4 h-4">
                  <div className="absolute bottom-0 right-0 w-full h-px bg-red-500/30" />
                  <div className="absolute bottom-0 right-0 w-px h-full bg-red-500/30" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final statement - Holographic card */}
        <motion.div
          className="relative"
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="relative p-12 md:p-16 bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/10 overflow-hidden group hover:border-red-500/30 transition-all">
            {/* Animated scan line */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
            
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-red-500/40" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-red-500/40" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-red-500/40" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-red-500/40" />

            <div className="relative z-10 text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">
                Inteligência <span className="text-red-500">aplicada</span>.
              </p>
              <p className="text-2xl md:text-3xl font-bold text-white/20 mt-2">
                Não discurso.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultadoSection;
