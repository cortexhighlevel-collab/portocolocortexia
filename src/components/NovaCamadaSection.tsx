import { useEffect, useRef } from "react";
import SolucoesGrid from "./SolucoesGrid";
import { useIsMobile } from "@/hooks/use-mobile";

import novaCamadaMobileVideo from "@/assets/nova-camada-mobile.webm";
import novaCamadaMobileVideoMp4 from "@/assets/nova-camada-mobile.mp4";

const NovaCamadaSection = () => {
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const PLAYBACK_RATE = 0.65;

  // Deixar o vídeo mais lento (mobile + desktop) e evitar pausas aleatórias.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const applySettings = () => {
      v.playbackRate = PLAYBACK_RATE;
      // Em alguns navegadores o autoplay pode "parar"; tentamos retomar.
      if (!document.hidden && v.paused) {
        v.play().catch(() => void 0);
      }
    };

    const onVisibility = () => {
      if (!document.hidden) applySettings();
    };

    const onPause = () => {
      // Se pausou sozinho, tenta retomar (mantém loop “infinito” na prática)
      if (!document.hidden) {
        v.play().catch(() => void 0);
      }
    };

    const onEnded = () => {
      // redundância: loop já está ativo, mas garante retomada
      v.currentTime = 0;
      v.play().catch(() => void 0);
    };

    // aplica já
    applySettings();

    document.addEventListener("visibilitychange", onVisibility);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);
    v.addEventListener("loadedmetadata", applySettings);
    v.addEventListener("canplay", applySettings);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("loadedmetadata", applySettings);
      v.removeEventListener("canplay", applySettings);
    };
  }, [isMobile]);

  return (
    <section id="nova-camada" className="relative bg-background py-24 md:py-32">
      {/* CARD com vídeo + texto */}
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
                      preload="auto"
                      disablePictureInPicture
                      controls={false}
                      onLoadedMetadata={() => {
                        // Garantia extra (iOS às vezes ignora o primeiro set)
                        if (videoRef.current) videoRef.current.playbackRate = PLAYBACK_RATE;
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
