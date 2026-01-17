import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Bot, BarChart3, Brain, Users, Sparkles, Search } from "lucide-react";

const camadas = [
  {
    icon: Bot,
    titulo: "Automação com IA",
    funcao: "Workflows inteligentes que aprendem",
    beneficio: "Reduza 80% do trabalho operacional repetitivo"
  },
  {
    icon: BarChart3,
    titulo: "Análise Estratégica",
    funcao: "Dados transformados em decisões",
    beneficio: "Tome decisões baseadas em inteligência, não intuição"
  },
  {
    icon: Brain,
    titulo: "Engenharia de Prompt",
    funcao: "Comandos precisos e estruturados",
    beneficio: "Extraia o máximo de qualquer modelo de IA"
  },
  {
    icon: Users,
    titulo: "Personas Treinadas",
    funcao: "IA que entende seu negócio",
    beneficio: "Assistentes que falam a língua da sua empresa"
  },
  {
    icon: Sparkles,
    titulo: "Agentes Inteligentes",
    funcao: "IA autônoma e especializada",
    beneficio: "Sistemas que executam, não apenas respondem"
  },
  {
    icon: Search,
    titulo: "SEO + AEO",
    funcao: "Otimização para humanos e IAs",
    beneficio: "Apareça em buscas tradicionais e respostas de IA"
  }
];

const NovaCamadaSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section id="nova-camada" ref={sectionRef} className="relative py-24 md:py-40 bg-[#030303] overflow-hidden">
      {/* Parallax circuit background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10 0 L10 8 M10 12 L10 20 M0 10 L8 10 M12 10 L20 10" stroke="rgba(255,0,0,0.3)" strokeWidth="0.5" fill="none"/>
                <circle cx="10" cy="10" r="1.5" fill="rgba(255,0,0,0.4)"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#circuit)"/>
          </svg>
        </div>
        {/* Central glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.08)_0%,transparent_60%)]" />
      </motion.div>

      {/* Animated light beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-0.5 h-40 bg-gradient-to-b from-transparent via-red-500/20 to-transparent"
          style={{ left: '20%', top: '-10%' }}
          animate={{ y: ['0%', '300%'], opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0 }}
        />
        <motion.div
          className="absolute w-0.5 h-40 bg-gradient-to-b from-transparent via-red-500/20 to-transparent"
          style={{ left: '50%', top: '-10%' }}
          animate={{ y: ['0%', '300%'], opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1.3 }}
        />
        <motion.div
          className="absolute w-0.5 h-40 bg-gradient-to-b from-transparent via-red-500/20 to-transparent"
          style={{ left: '80%', top: '-10%' }}
          animate={{ y: ['0%', '300%'], opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2.6 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header with dramatic reveal */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 text-red-500 text-sm uppercase tracking-[0.3em] font-medium mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-red-500" />
            <span>A Nova Camada</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-red-500" />
          </motion.div>
          
          {/* Statement principal with typing effect look */}
          <div className="relative">
            <motion.h2 
              className="text-3xl md:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Não usamos IA como ferramenta.
            </motion.h2>
            <motion.h2 
              className="text-3xl md:text-6xl font-bold mt-3"
              style={{
                background: 'linear-gradient(90deg, #ff4444, #ff0000, #ff2222)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Criamos sistemas cognitivos.
              <motion.span
                className="inline-block w-1 h-12 bg-red-500 ml-2 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.h2>
          </div>

          <motion.p 
            className="text-white/40 max-w-2xl mx-auto text-lg mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Uma estrutura de inteligência aplicada que transforma operações, 
            decisões e presença digital.
          </motion.p>
        </motion.div>

        {/* Grid de camadas - Futuristic cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {camadas.map((camada, index) => {
            const Icon = camada.icon;
            return (
              <motion.div
                key={index}
                className="relative group perspective-1000"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Card with 3D hover */}
                <motion.div 
                  className="relative h-full p-8 bg-gradient-to-br from-[#0f0f0f] via-[#0a0a0a] to-[#080808] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500"
                  whileHover={{ 
                    borderColor: "rgba(239,68,68,0.4)",
                    rotateY: 5,
                    rotateX: -5,
                    scale: 1.02
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Holographic shine */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Data stream effect */}
                  <div className="absolute right-0 top-0 bottom-0 w-px overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-full h-8 bg-gradient-to-b from-transparent via-red-500/50 to-transparent animate-scan-line" />
                  </div>
                  
                  {/* Status indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] text-green-400 font-mono">ACTIVE</span>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  </div>
                  
                  {/* Icon container with ring */}
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center mb-6 border border-red-500/30 group-hover:border-red-400/60 transition-all duration-500">
                    <Icon className="w-8 h-8 text-red-400 group-hover:text-red-300 transition-colors" />
                    {/* Rotating ring */}
                    <motion.div 
                      className="absolute inset-0 rounded-2xl border border-red-500/20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      style={{ borderStyle: "dashed" }}
                    />
                  </div>
                  
                  {/* Título */}
                  <h3 className="relative z-10 text-white font-bold text-xl mb-2 group-hover:text-red-100 transition-colors">
                    {camada.titulo}
                  </h3>
                  
                  {/* Função */}
                  <p className="relative z-10 text-white/30 text-xs mb-4 uppercase tracking-widest font-mono">
                    {camada.funcao}
                  </p>
                  
                  {/* Benefício */}
                  <p className="relative z-10 text-white/60 text-base leading-relaxed group-hover:text-white/80 transition-colors">
                    {camada.beneficio}
                  </p>

                  {/* Bottom progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-red-500 to-red-400"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom border with animated glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default NovaCamadaSection;