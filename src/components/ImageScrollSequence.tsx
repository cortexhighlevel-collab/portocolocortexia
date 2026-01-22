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
  const metricsRef = useRef<{ startY: number; scrollRange: number }>({ startY: 0, scrollRange: 1 });
  const rafIdRef = useRef<number>(0);
  const tickingRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const stableFramesRef = useRef(0);

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

  // Atualização orientada a scroll (sem RAF contínuo):
  // RAF permanente + getBoundingClientRect a cada frame pesa e deixa os frames “fantasmando”.
  useEffect(() => {
    if (!isReady) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

    const measure = () => {
      const rect = container.getBoundingClientRect();
      const startY = rect.top + window.scrollY;
      const scrollRange = Math.max(1, container.offsetHeight - window.innerHeight);
      metricsRef.current = { startY, scrollRange };
    };

    const updateFrame = () => {
      const { startY, scrollRange } = metricsRef.current;
      const progress = clamp01((window.scrollY - startY) / scrollRange);

      // floor evita “vai e volta” perto do limiar (round causa oscillation e ghosting)
      const nextIndex = Math.max(
        0,
        Math.min(frames.length - 1, Math.floor(progress * (frames.length - 1) + 1e-6))
      );

      if (nextIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextIndex;
        framesStackRef.current?.setActiveIndex(nextIndex);
      }
    };

    const tick = () => {
      updateFrame();

      const y = window.scrollY;
      if (Math.abs(y - lastScrollYRef.current) < 0.5) {
        stableFramesRef.current += 1;
      } else {
        stableFramesRef.current = 0;
      }
      lastScrollYRef.current = y;

      if (stableFramesRef.current < 6) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        tickingRef.current = false;
      }
    };

    const startTick = () => {
      stableFramesRef.current = 0;
      if (tickingRef.current) return;
      tickingRef.current = true;
      lastScrollYRef.current = window.scrollY;
      rafIdRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => startTick();
    const onResize = () => {
      measure();
      startTick();
    };

    measure();

    const addListeners = () => {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      window.addEventListener("orientationchange", onResize);
      // iOS: garante updates enquanto o dedo está na tela
      window.addEventListener("touchmove", onScroll, { passive: true });
      window.addEventListener("touchstart", onScroll, { passive: true });
    };

    const removeListeners = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("touchstart", onScroll);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          addListeners();
          startTick();
        } else {
          removeListeners();
          cancelAnimationFrame(rafIdRef.current);
          tickingRef.current = false;
        }
      },
      { threshold: 0.01 }
    );

    io.observe(container);

    return () => {
      removeListeners();
      cancelAnimationFrame(rafIdRef.current);
      tickingRef.current = false;
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
