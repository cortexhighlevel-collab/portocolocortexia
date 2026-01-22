import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import FramesStack, { type FramesStackHandle } from "@/components/image-sequence/FramesStack";
import { desktopFrames, mobileFrames } from "@/components/image-sequence/frames";

const STICKY_SCALE = 1.15;

type ImageScrollSequenceProps = {
  children?: React.ReactNode;
};

const ImageScrollSequence = ({ children }: ImageScrollSequenceProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const loadedFramesRef = useRef<Set<number>>(new Set());
  const isMobile = useIsMobile();
  const framesStackRef = useRef<FramesStackHandle>(null);
  const activeIndexRef = useRef(0);
  const metricsRef = useRef<{ startY: number }>({ startY: 0 });

  const frames = isMobile ? mobileFrames : desktopFrames;

  // Carrega/decodifica um frame específico (melhora muito a estabilidade no iOS/Safari)
  const loadFrame = async (index: number): Promise<void> => {
    if (index < 0 || index >= frames.length || loadedFramesRef.current.has(index)) return;

    await new Promise<void>((resolve) => {
      const img = new Image();
      img.src = frames[index];
      img.onload = () => {
        loadedFramesRef.current.add(index);
        resolve();
      };
      img.onerror = () => {
        loadedFramesRef.current.add(index);
        resolve();
      };
    });
  };

  // Pré-carregar todos os frames ao iniciar
  useEffect(() => {
    loadedFramesRef.current = new Set();
    setIsReady(false);
    activeIndexRef.current = 0;

    // Carregar todos os frames em paralelo
    const loadAllFrames = async () => {
      // Carregar primeiro frame imediatamente
      await loadFrame(0);
      setIsReady(true);
      
      // Carregar o resto em paralelo
      const promises = frames.map((_, index) => loadFrame(index));
      await Promise.all(promises);
    };

    loadAllFrames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  // Atualização por RAF enquanto o hero estiver visível:
  // - evita “congelar” durante momentum scroll (iOS/Android)
  // - evita depender de scroll events (que podem falhar)
  // - sem getBoundingClientRect em loop (medimos só quando necessário)
  useEffect(() => {
    if (!isReady) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const MAX_STEP = isMobile ? 2 : 2;

    let rafId = 0;
    let isActive = false;

    const measure = () => {
      const rect = container.getBoundingClientRect();
      metricsRef.current.startY = rect.top + window.scrollY;
    };

    const computeTargetIndex = () => {
      const startY = metricsRef.current.startY;
      const containerHeight = container.offsetHeight;
      const scrollRange = Math.max(1, containerHeight - window.innerHeight);
      const progress = clamp01((window.scrollY - startY) / scrollRange);

      // Segmentação estável (evita “vai e volta” por arredondamento)
      const idx = Math.floor(progress * frames.length);
      return Math.max(0, Math.min(frames.length - 1, idx));
    };

    const update = () => {
      if (!isActive) return;

      const target = computeTargetIndex();
      const current = activeIndexRef.current;

      if (target !== current) {
        const diff = target - current;
        const step = Math.sign(diff) * Math.min(Math.abs(diff), MAX_STEP);
        const next = current + step;
        activeIndexRef.current = next;
        framesStackRef.current?.setActiveIndex(next);
      }

      rafId = requestAnimationFrame(update);
    };

    const start = () => {
      if (isActive) return;
      isActive = true;
      measure();
      rafId = requestAnimationFrame(update);
    };

    const stop = () => {
      isActive = false;
      cancelAnimationFrame(rafId);
    };

    const onResize = () => {
      measure();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.01 }
    );

    io.observe(container);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [isReady, frames.length]);

  const firstFrame = frames[0];

  return (
    <div ref={scrollContainerRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Fallback: primeira imagem sempre visível */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${firstFrame})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            transform: `scale(${STICKY_SCALE})`,
            transformOrigin: "center center",
          }}
          aria-hidden="true"
        />

        {/* Todos os frames renderizados (stack) - alternamos somente a opacidade */}
        {isReady && (
          <FramesStack
            ref={framesStackRef}
            key={isMobile ? "mobile" : "desktop"}
            frames={frames}
            scale={STICKY_SCALE}
          />
        )}

        <div className="relative z-10 h-full">{children}</div>
      </div>
    </div>
  );
};

export default ImageScrollSequence;
