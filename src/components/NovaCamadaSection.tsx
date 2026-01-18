import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, BarChart3, Brain, Users, Sparkles, Search } from "lucide-react";

// Frames (background)
import frame001 from "@/assets/nova-camada-frames/frame-001.jpg";
import frame002 from "@/assets/nova-camada-frames/frame-002.jpg";
import frame003 from "@/assets/nova-camada-frames/frame-003.jpg";
import frame004 from "@/assets/nova-camada-frames/frame-004.jpg";
import frame005 from "@/assets/nova-camada-frames/frame-005.jpg";
import frame006 from "@/assets/nova-camada-frames/frame-006.jpg";
import frame007 from "@/assets/nova-camada-frames/frame-007.jpg";
import frame008 from "@/assets/nova-camada-frames/frame-008.jpg";
import frame009 from "@/assets/nova-camada-frames/frame-009.jpg";
import frame010 from "@/assets/nova-camada-frames/frame-010.jpg";

const frames = [
  frame001, frame002, frame003, frame004, frame005,
  frame006, frame007, frame008, frame009, frame010,
];

const SMOOTH_FACTOR = 0.12;

const camadas = [
  {
    icon: Bot,
    titulo: "Automação com IA",
    funcao: "Workflows inteligentes que aprendem",
    beneficio: "Reduza 80% do trabalho operacional repetitivo",
  },
  {
    icon: BarChart3,
    titulo: "Análise Estratégica",
    funcao: "Dados transformados em decisões",
    beneficio: "Tome decisões baseadas em inteligência, não intuição",
  },
  {
    icon: Brain,
    titulo: "Engenharia de Prompt",
    funcao: "Comandos precisos e estruturados",
    beneficio: "Extraia o máximo de qualquer modelo de IA",
  },
  {
    icon: Users,
    titulo: "Personas Treinadas",
    funcao: "IA que entende seu negócio",
    beneficio: "Assistentes que falam a língua da sua empresa",
  },
  {
    icon: Sparkles,
    titulo: "Agentes Inteligentes",
    funcao: "IA autônoma e especializada",
    beneficio: "Sistemas que executam, não apenas respondem",
  },
  {
    icon: Search,
    titulo: "SEO + AEO",
    funcao: "Otimização para humanos e IAs",
    beneficio: "Apareça em buscas tradicionais e respostas de IA",
  },
];

const NovaCamadaSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const rafIdRef = useRef<number | null>(null);
  const currentFrameRef = useRef(0);

  // Preload
  useEffect(() => {
    let loaded = 0;
    setIsReady(false);
    frames.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === frames.length) setIsReady(true);
      };
    });
  }, []);

  // Scroll → frame
  useEffect(() => {
    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const tick = () => {
      const container = scrollContainerRef.current;
      if (!container) {
        rafIdRef.current = window.requestAnimationFrame(tick);
        return;
      }

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrollStart = -rect.top;
      const scrollEnd = containerHeight - viewportHeight;
      const progress = clamp(scrollStart / Math.max(scrollEnd, 1), 0, 1);

      const targetFrame = progress * (frames.length - 1);
      currentFrameRef.current = lerp(currentFrameRef.current, targetFrame, SMOOTH_FACTOR);
      const idx = Math.round(currentFrameRef.current);
      setCurrentFrame(clamp(idx, 0, frames.length - 1));

      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    rafIdRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  return (
    <section id="nova-camada" className="relative bg-background">
      {/* 1) Scroll frames */}
      <div ref={scrollContainerRef} className="relative" style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Frames bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: isReady ? 1 : 0, transition: "opacity 0.5s ease" }}
          >
            {frames.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Frame ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: index === currentFrame ? 1 : 0,
                  visibility: index === currentFrame ? "visible" : "hidden",
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
          </div>

          {/* Overlay headline (não remove o conteúdo abaixo) */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center px-6 max-w-4xl relative">
              <motion.div
                className="inline-flex items-center gap-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 text-sm uppercase tracking-[0.4em] font-mono">SYSTEM.INIT</span>
                <div className="w-12 h-px bg-gradient-to-r from-red-500 to-transparent" />
              </motion.div>

              <motion.h2
                className="text-4xl md:text-7xl font-bold text-white leading-tight mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  textShadow: "0 0 40px rgba(0,0,0,0.8), 0 0 80px rgba(239,68,68,0.3)",
                }}
              >
                A Nova Camada
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-xl md:text-3xl text-white/90 font-light mb-3">Não usamos IA como ferramenta.</p>
                <p
                  className="text-xl md:text-3xl font-semibold"
                  style={{
                    background: "linear-gradient(90deg, #ff4444, #ff6666)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Criamos sistemas cognitivos.
                  <span className="inline-block w-0.5 h-6 md:h-8 bg-red-500 ml-2 align-middle animate-pulse" />
                </p>
              </motion.div>

              <motion.p
                className="text-white/50 max-w-2xl mx-auto text-base md:text-lg mt-8 font-light"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Uma estrutura de inteligência aplicada que transforma operações, decisões e presença digital.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* 2) Conteúdo que existia (cards) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-40">
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
                <motion.div
                  className="relative h-full p-8 bg-gradient-to-br from-[#0f0f0f] via-[#0a0a0a] to-[#080808] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500"
                  whileHover={{
                    borderColor: "rgba(239,68,68,0.4)",
                    rotateY: 5,
                    rotateX: -5,
                    scale: 1.02,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] text-green-400 font-mono">ACTIVE</span>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  </div>

                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center mb-6 border border-red-500/30 group-hover:border-red-400/60 transition-all duration-500">
                    <Icon className="w-8 h-8 text-red-400 group-hover:text-red-300 transition-colors" />
                    <motion.div
                      className="absolute inset-0 rounded-2xl border border-red-500/20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      style={{ borderStyle: "dashed" }}
                    />
                  </div>

                  <h3 className="relative z-10 text-white font-bold text-xl mb-2 group-hover:text-red-100 transition-colors">
                    {camada.titulo}
                  </h3>

                  <p className="relative z-10 text-white/30 text-xs mb-4 uppercase tracking-widest font-mono">
                    {camada.funcao}
                  </p>

                  <p className="relative z-10 text-white/60 text-base leading-relaxed group-hover:text-white/80 transition-colors">
                    {camada.beneficio}
                  </p>

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
    </section>
  );
};

export default NovaCamadaSection;
