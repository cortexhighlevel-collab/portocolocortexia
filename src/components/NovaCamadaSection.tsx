import { motion } from "framer-motion";
import { Bot, BarChart3, Brain, Users, Sparkles, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Frames (lado esquerdo do card)
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
import frame011 from "@/assets/nova-camada-frames/frame-011.jpg";
import frame012 from "@/assets/nova-camada-frames/frame-012.jpg";
import frame013 from "@/assets/nova-camada-frames/frame-013.jpg";
import frame014 from "@/assets/nova-camada-frames/frame-014.jpg";
import frame015 from "@/assets/nova-camada-frames/frame-015.jpg";
import frame016 from "@/assets/nova-camada-frames/frame-016.jpg";
import frame017 from "@/assets/nova-camada-frames/frame-017.jpg";
import frame018 from "@/assets/nova-camada-frames/frame-018.jpg";
import frame019 from "@/assets/nova-camada-frames/frame-019.jpg";
import frame020 from "@/assets/nova-camada-frames/frame-020.jpg";
import frame021 from "@/assets/nova-camada-frames/frame-021.jpg";
import frame022 from "@/assets/nova-camada-frames/frame-022.jpg";
import frame023 from "@/assets/nova-camada-frames/frame-023.jpg";
import frame024 from "@/assets/nova-camada-frames/frame-024.jpg";
import frame025 from "@/assets/nova-camada-frames/frame-025.jpg";
import frame026 from "@/assets/nova-camada-frames/frame-026.jpg";
import frame027 from "@/assets/nova-camada-frames/frame-027.jpg";
import frame028 from "@/assets/nova-camada-frames/frame-028.jpg";
import frame029 from "@/assets/nova-camada-frames/frame-029.jpg";
import frame030 from "@/assets/nova-camada-frames/frame-030.jpg";
import frame031 from "@/assets/nova-camada-frames/frame-031.jpg";
import frame032 from "@/assets/nova-camada-frames/frame-032.jpg";
import frame033 from "@/assets/nova-camada-frames/frame-033.jpg";
import frame034 from "@/assets/nova-camada-frames/frame-034.jpg";
import frame035 from "@/assets/nova-camada-frames/frame-035.jpg";
import frame036 from "@/assets/nova-camada-frames/frame-036.jpg";
import frame037 from "@/assets/nova-camada-frames/frame-037.jpg";
import frame038 from "@/assets/nova-camada-frames/frame-038.jpg";
import frame039 from "@/assets/nova-camada-frames/frame-039.jpg";
import frame040 from "@/assets/nova-camada-frames/frame-040.jpg";

const frames = [
  frame001,
  frame002,
  frame003,
  frame004,
  frame005,
  frame006,
  frame007,
  frame008,
  frame009,
  frame010,
  frame011,
  frame012,
  frame013,
  frame014,
  frame015,
  frame016,
  frame017,
  frame018,
  frame019,
  frame020,
  frame021,
  frame022,
  frame023,
  frame024,
  frame025,
  frame026,
  frame027,
  frame028,
  frame029,
  frame030,
  frame031,
  frame032,
  frame033,
  frame034,
  frame035,
  frame036,
  frame037,
  frame038,
  frame039,
  frame040,
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
      setCurrentFrame(clamp(Math.round(currentFrameRef.current), 0, frames.length - 1));

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
      {/* CARD com imagem (frames) + texto (mantém scroll frame, sem virar background da tela inteira) */}
      <div ref={scrollContainerRef} className="relative" style={{ height: "180vh" }}>
        <div className="sticky top-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
              {/* brilho/scan sutil */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.06) 2px, rgba(255,255,255,0.06) 3px)",
                }}
              />

              <div className="grid lg:grid-cols-2">
                {/* Lado imagem */}
                <div className="relative min-h-[320px] lg:min-h-[520px] bg-background">
                  <div
                    className="absolute inset-0"
                    style={{ opacity: isReady ? 1 : 0, transition: "opacity 0.4s ease" }}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  </div>

                  {/* HUD mini */}
                  <div className="absolute bottom-4 left-4 z-10 rounded-lg border border-border bg-background/60 px-3 py-2 backdrop-blur">
                    <div className="text-[10px] text-foreground/60 font-mono uppercase tracking-wider">
                      [NOVA_CAMADA://FRAME]
                    </div>
                    <div className="text-[10px] text-foreground/40 font-mono">
                      {String(currentFrame + 1).padStart(2, "0")}/{frames.length}
                    </div>
                  </div>
                </div>

                {/* Lado texto */}
                <div className="relative p-8 md:p-10 lg:p-12">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 rounded-full bg-foreground/60 animate-pulse" />
                    <span className="text-foreground/70 text-xs uppercase tracking-[0.35em] font-mono">
                      A Nova Camada
                    </span>
                    <div className="w-10 h-px bg-foreground/20" />
                  </div>

                  <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                    Não usamos IA como ferramenta.
                  </h2>
                  <h3 className="text-3xl md:text-5xl font-bold text-foreground mt-3 leading-tight">
                    Criamos sistemas cognitivos.
                  </h3>

                  <p className="text-foreground/60 mt-6 text-base md:text-lg max-w-xl">
                    Uma estrutura de inteligência aplicada que transforma operações, decisões e presença digital.
                  </p>

                  <div className="mt-8 grid gap-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-foreground/40 font-mono">01</span>
                      <p className="text-foreground/70">Diagnóstico do seu cenário + mapeamento de oportunidades</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-foreground/40 font-mono">02</span>
                      <p className="text-foreground/70">Arquitetura de automações, agentes e conteúdo orientado a IA</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-foreground/40 font-mono">03</span>
                      <p className="text-foreground/70">Implementação com rastreio, métricas e melhoria contínua</p>
                    </div>
                  </div>

                  <div className="mt-10 text-xs text-foreground/40 font-mono">
                    Scroll para animar a imagem  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo que você pediu para voltar (cards/grid) */}
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
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <motion.div
                  className="relative h-full p-8 bg-card border border-border rounded-2xl overflow-hidden transition-all duration-500"
                  whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/0 via-foreground/5 to-foreground/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] text-foreground/60 font-mono">ACTIVE</span>
                    <div className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-pulse" />
                  </div>

                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-background flex items-center justify-center mb-6 border border-border">
                    <Icon className="w-8 h-8 text-foreground/80" />
                  </div>

                  <h3 className="relative z-10 text-foreground font-bold text-xl mb-2">
                    {camada.titulo}
                  </h3>

                  <p className="relative z-10 text-foreground/40 text-xs mb-4 uppercase tracking-widest font-mono">
                    {camada.funcao}
                  </p>

                  <p className="relative z-10 text-foreground/70 text-base leading-relaxed">
                    {camada.beneficio}
                  </p>
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
