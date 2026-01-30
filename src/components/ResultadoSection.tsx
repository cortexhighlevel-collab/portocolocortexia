import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const resultados = [
  { metric: 80, suffix: "%", prefix: "+", label: "EFFICIENCY", icon: "chart" },
  { metric: 10, suffix: "x", prefix: "", label: "DECISIONS", icon: "network" },
  { metric: 70, suffix: "%", prefix: "-", label: "EFFORT", icon: "gears" },
  { metric: 24, suffix: "/7", prefix: "", label: "OPERATION", icon: "clock" },
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

// Ícone de gráfico de barras crescente
const ChartIcon = () => (
  <svg viewBox="0 0 120 100" className="w-full h-full">
    {/* Barras */}
    <rect x="10" y="70" width="15" height="20" fill="url(#redGradient)" opacity="0.6" />
    <rect x="30" y="55" width="15" height="35" fill="url(#redGradient)" opacity="0.7" />
    <rect x="50" y="40" width="15" height="50" fill="url(#redGradient)" opacity="0.8" />
    <rect x="70" y="20" width="15" height="70" fill="url(#redGradient)" opacity="0.9" />
    {/* Seta para cima */}
    <path d="M95 15 L105 5 L115 15" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="105" y1="5" x2="105" y2="35" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
    {/* Linha de base */}
    <line x1="5" y1="90" x2="90" y2="90" stroke="#ef4444" strokeWidth="1" opacity="0.5" />
    <defs>
      <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </linearGradient>
    </defs>
  </svg>
);

// Ícone de rede/conexões
const NetworkIcon = () => (
  <svg viewBox="0 0 120 100" className="w-full h-full">
    {/* Círculos conectados */}
    <circle cx="20" cy="20" r="6" fill="none" stroke="#ef4444" strokeWidth="2" />
    <circle cx="60" cy="15" r="6" fill="none" stroke="#ef4444" strokeWidth="2" />
    <circle cx="100" cy="25" r="6" fill="none" stroke="#ef4444" strokeWidth="2" />
    <circle cx="15" cy="55" r="6" fill="none" stroke="#ef4444" strokeWidth="2" />
    <circle cx="60" cy="50" r="12" fill="#ef4444" opacity="0.3" stroke="#ef4444" strokeWidth="2" />
    <circle cx="105" cy="60" r="6" fill="none" stroke="#ef4444" strokeWidth="2" />
    <circle cx="25" cy="85" r="6" fill="none" stroke="#ef4444" strokeWidth="2" />
    <circle cx="60" cy="85" r="6" fill="none" stroke="#ef4444" strokeWidth="2" />
    <circle cx="95" cy="85" r="6" fill="none" stroke="#ef4444" strokeWidth="2" />
    {/* Linhas de conexão */}
    <line x1="26" y1="20" x2="54" y2="17" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
    <line x1="66" y1="15" x2="94" y2="23" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
    <line x1="21" y1="55" x2="48" y2="50" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
    <line x1="72" y1="50" x2="99" y2="58" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
    <line x1="60" y1="38" x2="60" y2="23" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
    <line x1="60" y1="62" x2="60" y2="79" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
    <line x1="31" y1="85" x2="54" y2="85" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
    <line x1="66" y1="85" x2="89" y2="85" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
    {/* Texto 10x no centro */}
    <text x="60" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">10x</text>
  </svg>
);

// Ícone de engrenagens
const GearsIcon = () => (
  <svg viewBox="0 0 120 100" className="w-full h-full">
    {/* Engrenagem grande */}
    <g transform="translate(45, 35)">
      <circle cx="0" cy="0" r="18" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.8" />
      <circle cx="0" cy="0" r="8" fill="none" stroke="#ef4444" strokeWidth="2" />
      {/* Dentes */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <rect
          key={i}
          x="-4"
          y="-24"
          width="8"
          height="8"
          fill="#ef4444"
          opacity="0.6"
          transform={`rotate(${angle})`}
        />
      ))}
    </g>
    {/* Engrenagem pequena */}
    <g transform="translate(80, 60)">
      <circle cx="0" cy="0" r="12" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.8" />
      <circle cx="0" cy="0" r="5" fill="none" stroke="#ef4444" strokeWidth="2" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <rect
          key={i}
          x="-3"
          y="-16"
          width="6"
          height="6"
          fill="#ef4444"
          opacity="0.6"
          transform={`rotate(${angle})`}
        />
      ))}
    </g>
    {/* Seta */}
    <path d="M90 25 L100 20 L100 30 Z" fill="#ef4444" opacity="0.8" />
    <path d="M85 35 Q95 30 100 20" stroke="#ef4444" strokeWidth="2" fill="none" opacity="0.6" />
    {/* Barra de progresso */}
    <rect x="20" y="80" width="80" height="6" rx="3" fill="#1a1a1a" stroke="#ef4444" strokeWidth="1" opacity="0.5" />
    <rect x="20" y="80" width="50" height="6" rx="3" fill="url(#progressGradient)" />
    <defs>
      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
    </defs>
  </svg>
);

// Ícone de relógio
const ClockIcon = () => (
  <svg viewBox="0 0 120 100" className="w-full h-full">
    {/* Círculo externo com glow */}
    <circle cx="60" cy="50" r="35" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.3" />
    <circle cx="60" cy="50" r="30" fill="none" stroke="#ef4444" strokeWidth="2" />
    {/* Marcadores de hora */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
      <line
        key={i}
        x1="60"
        y1="23"
        x2="60"
        y2="27"
        stroke="#ef4444"
        strokeWidth="2"
        transform={`rotate(${angle}, 60, 50)`}
      />
    ))}
    {/* Ponteiros */}
    <line x1="60" y1="50" x2="60" y2="30" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
    <line x1="60" y1="50" x2="75" y2="50" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
    {/* Centro */}
    <circle cx="60" cy="50" r="4" fill="#ef4444" />
    {/* Linhas de circuito */}
    <line x1="95" y1="50" x2="110" y2="50" stroke="#ef4444" strokeWidth="1" opacity="0.4" />
    <line x1="105" y1="40" x2="105" y2="60" stroke="#ef4444" strokeWidth="1" opacity="0.4" />
    <circle cx="105" cy="35" r="2" fill="#ef4444" opacity="0.4" />
    <circle cx="105" cy="65" r="2" fill="#ef4444" opacity="0.4" />
  </svg>
);

const IconComponent = ({ icon }: { icon: string }) => {
  switch (icon) {
    case "chart": return <ChartIcon />;
    case "network": return <NetworkIcon />;
    case "gears": return <GearsIcon />;
    case "clock": return <ClockIcon />;
    default: return null;
  }
};

// Card com cantos cortados estilo cyberpunk
const CyberMetricCard = ({ resultado, index }: { resultado: typeof resultados[0]; index: number }) => {
  const clipPath = "polygon(0 15px, 15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)";

  return (
    <motion.div
      initial={{ opacity: 1, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Borda externa com glow */}
      <div 
        className="absolute inset-0"
        style={{
          clipPath,
          background: 'linear-gradient(135deg, rgba(239,68,68,0.4) 0%, rgba(239,68,68,0.1) 50%, rgba(139,92,246,0.3) 100%)',
        }}
      />
      
      {/* Card principal */}
      <div 
        className="relative bg-[#0a0a0a]/95 p-5 md:p-6"
        style={{
          clipPath,
          margin: '1px',
        }}
      >
        {/* Pattern de circuito no fundo */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(239,68,68,0.3) 1px, transparent 1px),
              linear-gradient(rgba(239,68,68,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Cantos decorativos */}
        <svg className="absolute top-0 left-0 pointer-events-none" width="40" height="40">
          <line x1="0" y1="15" x2="15" y2="0" stroke="rgba(239,68,68,0.6)" strokeWidth="1" />
          <line x1="15" y1="0" x2="40" y2="0" stroke="rgba(239,68,68,0.6)" strokeWidth="1" />
          <line x1="0" y1="15" x2="0" y2="40" stroke="rgba(239,68,68,0.6)" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-0 right-0 pointer-events-none" width="40" height="40" style={{ transform: 'rotate(180deg)' }}>
          <line x1="0" y1="15" x2="15" y2="0" stroke="rgba(239,68,68,0.6)" strokeWidth="1" />
          <line x1="15" y1="0" x2="40" y2="0" stroke="rgba(239,68,68,0.6)" strokeWidth="1" />
          <line x1="0" y1="15" x2="0" y2="40" stroke="rgba(239,68,68,0.6)" strokeWidth="1" />
        </svg>

        {/* Ícone */}
        <div className="relative h-24 md:h-28 mb-4">
          <IconComponent icon={resultado.icon} />
        </div>

        {/* Valor numérico */}
        <div className="text-3xl md:text-4xl font-bold text-white text-center">
          <AnimatedCounter 
            value={resultado.metric} 
            suffix={resultado.suffix} 
            prefix={resultado.prefix}
          />
        </div>

        {/* Label */}
        <div className="text-center mt-2">
          <span className="text-white/40 text-xs font-mono tracking-wider">
            {resultado.label}
          </span>
        </div>

        {/* Linha decorativa inferior */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1">
          <div className="w-8 h-px bg-red-500/30" />
          <div className="w-1 h-1 bg-red-500/50" />
        </div>
      </div>
    </motion.div>
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
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
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

        {/* Metrics grid - Cards cyberpunk */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {resultados.map((resultado, index) => (
            <CyberMetricCard key={index} resultado={resultado} index={index} />
          ))}
        </div>

        {/* Final statement - Holographic card */}
        <motion.div
          className="relative"
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Borda externa */}
          <div 
            className="absolute inset-0"
            style={{
              clipPath: "polygon(0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))",
              background: 'linear-gradient(135deg, rgba(239,68,68,0.4) 0%, rgba(239,68,68,0.1) 50%, rgba(139,92,246,0.3) 100%)',
            }}
          />
          
          <div 
            className="relative p-12 md:p-16 bg-[#0a0a0a]/95 overflow-hidden"
            style={{
              clipPath: "polygon(0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))",
              margin: '1px',
            }}
          >
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
            <svg className="absolute top-0 left-0 pointer-events-none" width="60" height="60">
              <line x1="0" y1="20" x2="20" y2="0" stroke="rgba(239,68,68,0.6)" strokeWidth="2" />
              <line x1="20" y1="0" x2="60" y2="0" stroke="rgba(239,68,68,0.6)" strokeWidth="2" />
              <line x1="0" y1="20" x2="0" y2="60" stroke="rgba(239,68,68,0.6)" strokeWidth="2" />
            </svg>
            <svg className="absolute top-0 right-0 pointer-events-none" width="60" height="60">
              <line x1="60" y1="20" x2="40" y2="0" stroke="rgba(239,68,68,0.6)" strokeWidth="2" />
              <line x1="40" y1="0" x2="0" y2="0" stroke="rgba(239,68,68,0.6)" strokeWidth="2" />
              <line x1="60" y1="20" x2="60" y2="60" stroke="rgba(239,68,68,0.6)" strokeWidth="2" />
            </svg>
            <svg className="absolute bottom-0 left-0 pointer-events-none" width="60" height="60">
              <line x1="0" y1="40" x2="20" y2="60" stroke="rgba(239,68,68,0.6)" strokeWidth="2" />
              <line x1="20" y1="60" x2="60" y2="60" stroke="rgba(239,68,68,0.6)" strokeWidth="2" />
              <line x1="0" y1="40" x2="0" y2="0" stroke="rgba(239,68,68,0.6)" strokeWidth="2" />
            </svg>
            <svg className="absolute bottom-0 right-0 pointer-events-none" width="60" height="60">
              <line x1="60" y1="40" x2="40" y2="60" stroke="rgba(239,68,68,0.6)" strokeWidth="2" />
              <line x1="40" y1="60" x2="0" y2="60" stroke="rgba(239,68,68,0.6)" strokeWidth="2" />
              <line x1="60" y1="40" x2="60" y2="0" stroke="rgba(239,68,68,0.6)" strokeWidth="2" />
            </svg>

            <div className="relative z-10 text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">
                Inteligência <span className="text-red-500 italic">aplicada</span>.
              </p>
              <p className="text-2xl md:text-3xl font-bold text-white/20 mt-2 italic">
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
