import { motion } from "framer-motion";
import { Bot, BarChart3, Brain, Users, Sparkles, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SolucoesGrid from "./SolucoesGrid";
import { isIOSDevice } from "@/lib/platform";
import { useIsMobile } from "@/hooks/use-mobile";

import novaCamadaMobileVideo from "@/assets/nova-camada-mobile.webm";
import novaCamadaMobileVideoMp4 from "@/assets/nova-camada-mobile.mp4";

// (Mobile) vídeo substitui os frames no autoplay para reduzir memória.

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
  const isMobile = useIsMobile();
  const isIOS = isIOSDevice();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Mobile: deixar o vídeo um pouco mais lento.
  useEffect(() => {
    if (!isMobile) return;
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 0.75;
  }, [isMobile]);

  return (
    <section id="nova-camada" className="relative bg-background py-24 md:py-32">
      {/* CARD com imagem (frames) + texto */}
      <div className="px-6 md:px-12">
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
                    style={{ opacity: 1, transition: "opacity 0.4s ease" }}
                  >
                    <video
                      ref={videoRef}
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload={isMobile ? "metadata" : "auto"}
                      onLoadedMetadata={() => {
                        // Garantia extra (iOS às vezes ignora o primeiro set)
                        if (isMobile && videoRef.current) videoRef.current.playbackRate = 0.75;
                      }}
                    >
                      {/* iOS/Safari: preferir MP4 */}
                      <source src={novaCamadaMobileVideoMp4} type="video/mp4" />
                      {/* Android/Chrome: WebM ok */}
                      <source src={novaCamadaMobileVideo} type="video/webm" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
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
                    Animação automática em loop
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Seção Soluções com layout cyberpunk */}
      <SolucoesGrid />
    </section>
  );
};

export default NovaCamadaSection;
