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

  const frames = isMobile ? mobileFrames : desktopFrames;

  // Carrega/decodifica um frame específico (melhora muito a estabilidade no iOS/Safari)
  const loadFrame = async (index: number): Promise<void> => {
    if (index < 0 || index >= frames.length || loadedFramesRef.current.has(index)) return;

    await new Promise<void>((resolve) => {
      const img = new Image();
      img.src = frames[index];
      img.onload = async () => {
        try {
          // decode() evita “travadinhas” no primeiro swap de frame
          // (nem todos os browsers suportam 100%, então é best-effort)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (img as any).decode?.();
        } catch {
          // ignore
        } finally {
          loadedFramesRef.current.add(index);
          resolve();
        }
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

  // Atualização por RAF contínuo (em vez de depender 100% de scroll events)
  // Isso evita o “parar de passar frames” em alguns devices/browsers durante momentum scroll.
  useEffect(() => {
    if (!isReady) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    let rafId = 0;
    let isActive = true;

    const update = () => {
      if (!isActive) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollRange = containerHeight - viewportHeight;

      if (scrollRange > 0) {
        const scrollStart = Math.max(0, -rect.top);
        const progress = Math.max(0, Math.min(1, scrollStart / scrollRange));
        const nextIndex = Math.round(progress * (frames.length - 1));

        if (nextIndex !== activeIndexRef.current) {
          activeIndexRef.current = nextIndex;
          framesStackRef.current?.setActiveIndex(nextIndex);
        }
      }

      rafId = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const shouldRun = entry.isIntersecting;
        if (shouldRun && !isActive) {
          isActive = true;
          rafId = requestAnimationFrame(update);
        } else if (!shouldRun && isActive) {
          isActive = false;
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.01 }
    );

    io.observe(container);
    rafId = requestAnimationFrame(update);

    return () => {
      isActive = false;
      cancelAnimationFrame(rafId);
      io.disconnect();
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
