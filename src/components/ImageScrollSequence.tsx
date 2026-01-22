import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Import desktop frames
import frame001 from "@/assets/hero-frames/frame-001.jpg";
import frame002 from "@/assets/hero-frames/frame-002.jpg";
import frame003 from "@/assets/hero-frames/frame-003.jpg";
import frame004 from "@/assets/hero-frames/frame-004.jpg";
import frame005 from "@/assets/hero-frames/frame-005.jpg";
import frame006 from "@/assets/hero-frames/frame-006.jpg";
import frame007 from "@/assets/hero-frames/frame-007.jpg";
import frame008 from "@/assets/hero-frames/frame-008.jpg";
import frame009 from "@/assets/hero-frames/frame-009.jpg";
import frame010 from "@/assets/hero-frames/frame-010.jpg";
import frame011 from "@/assets/hero-frames/frame-011.jpg";
import frame012 from "@/assets/hero-frames/frame-012.jpg";
import frame013 from "@/assets/hero-frames/frame-013.jpg";
import frame014 from "@/assets/hero-frames/frame-014.jpg";
import frame015 from "@/assets/hero-frames/frame-015.jpg";
import frame016 from "@/assets/hero-frames/frame-016.jpg";
import frame017 from "@/assets/hero-frames/frame-017.jpg";
import frame018 from "@/assets/hero-frames/frame-018.jpg";
import frame019 from "@/assets/hero-frames/frame-019.jpg";
import frame020 from "@/assets/hero-frames/frame-020.jpg";
import frame021 from "@/assets/hero-frames/frame-021.jpg";
import frame022 from "@/assets/hero-frames/frame-022.jpg";
import frame023 from "@/assets/hero-frames/frame-023.jpg";
import frame024 from "@/assets/hero-frames/frame-024.jpg";
import frame025 from "@/assets/hero-frames/frame-025.jpg";
import frame026 from "@/assets/hero-frames/frame-026.jpg";
import frame027 from "@/assets/hero-frames/frame-027.jpg";
import frame028 from "@/assets/hero-frames/frame-028.jpg";
import frame029 from "@/assets/hero-frames/frame-029.jpg";
import frame030 from "@/assets/hero-frames/frame-030.jpg";
import frame031 from "@/assets/hero-frames/frame-031.jpg";
import frame032 from "@/assets/hero-frames/frame-032.jpg";
import frame033 from "@/assets/hero-frames/frame-033.jpg";
import frame034 from "@/assets/hero-frames/frame-034.jpg";
import frame035 from "@/assets/hero-frames/frame-035.jpg";
import frame036 from "@/assets/hero-frames/frame-036.jpg";
import frame037 from "@/assets/hero-frames/frame-037.jpg";
import frame038 from "@/assets/hero-frames/frame-038.jpg";
import frame039 from "@/assets/hero-frames/frame-039.jpg";
import frame040 from "@/assets/hero-frames/frame-040.jpg";
import frame041 from "@/assets/hero-frames/frame-041.jpg";
import frame042 from "@/assets/hero-frames/frame-042.jpg";
import frame043 from "@/assets/hero-frames/frame-043.jpg";
import frame044 from "@/assets/hero-frames/frame-044.jpg";
import frame045 from "@/assets/hero-frames/frame-045.jpg";
import frame046 from "@/assets/hero-frames/frame-046.jpg";
import frame047 from "@/assets/hero-frames/frame-047.jpg";
import frame048 from "@/assets/hero-frames/frame-048.jpg";

// Import mobile frames
import mobileFrame001 from "@/assets/hero-frames-mobile/frame-001.jpg";
import mobileFrame002 from "@/assets/hero-frames-mobile/frame-002.jpg";
import mobileFrame003 from "@/assets/hero-frames-mobile/frame-003.jpg";
import mobileFrame004 from "@/assets/hero-frames-mobile/frame-004.jpg";
import mobileFrame005 from "@/assets/hero-frames-mobile/frame-005.jpg";
import mobileFrame006 from "@/assets/hero-frames-mobile/frame-006.jpg";
import mobileFrame007 from "@/assets/hero-frames-mobile/frame-007.jpg";
import mobileFrame008 from "@/assets/hero-frames-mobile/frame-008.jpg";
import mobileFrame009 from "@/assets/hero-frames-mobile/frame-009.jpg";
import mobileFrame010 from "@/assets/hero-frames-mobile/frame-010.jpg";
import mobileFrame011 from "@/assets/hero-frames-mobile/frame-011.jpg";
import mobileFrame012 from "@/assets/hero-frames-mobile/frame-012.jpg";
import mobileFrame013 from "@/assets/hero-frames-mobile/frame-013.jpg";
import mobileFrame014 from "@/assets/hero-frames-mobile/frame-014.jpg";
import mobileFrame015 from "@/assets/hero-frames-mobile/frame-015.jpg";
import mobileFrame016 from "@/assets/hero-frames-mobile/frame-016.jpg";
import mobileFrame017 from "@/assets/hero-frames-mobile/frame-017.jpg";
import mobileFrame018 from "@/assets/hero-frames-mobile/frame-018.jpg";
import mobileFrame019 from "@/assets/hero-frames-mobile/frame-019.jpg";
import mobileFrame020 from "@/assets/hero-frames-mobile/frame-020.jpg";
import mobileFrame021 from "@/assets/hero-frames-mobile/frame-021.jpg";
import mobileFrame022 from "@/assets/hero-frames-mobile/frame-022.jpg";
import mobileFrame023 from "@/assets/hero-frames-mobile/frame-023.jpg";
import mobileFrame024 from "@/assets/hero-frames-mobile/frame-024.jpg";
import mobileFrame025 from "@/assets/hero-frames-mobile/frame-025.jpg";
import mobileFrame026 from "@/assets/hero-frames-mobile/frame-026.jpg";
import mobileFrame027 from "@/assets/hero-frames-mobile/frame-027.jpg";
import mobileFrame028 from "@/assets/hero-frames-mobile/frame-028.jpg";
import mobileFrame029 from "@/assets/hero-frames-mobile/frame-029.jpg";
import mobileFrame030 from "@/assets/hero-frames-mobile/frame-030.jpg";
import mobileFrame031 from "@/assets/hero-frames-mobile/frame-031.jpg";
import mobileFrame032 from "@/assets/hero-frames-mobile/frame-032.jpg";
import mobileFrame033 from "@/assets/hero-frames-mobile/frame-033.jpg";
import mobileFrame034 from "@/assets/hero-frames-mobile/frame-034.jpg";
import mobileFrame035 from "@/assets/hero-frames-mobile/frame-035.jpg";
import mobileFrame036 from "@/assets/hero-frames-mobile/frame-036.jpg";
import mobileFrame037 from "@/assets/hero-frames-mobile/frame-037.jpg";
import mobileFrame038 from "@/assets/hero-frames-mobile/frame-038.jpg";
import mobileFrame039 from "@/assets/hero-frames-mobile/frame-039.jpg";
import mobileFrame040 from "@/assets/hero-frames-mobile/frame-040.jpg";
import mobileFrame041 from "@/assets/hero-frames-mobile/frame-041.jpg";
import mobileFrame042 from "@/assets/hero-frames-mobile/frame-042.jpg";
import mobileFrame043 from "@/assets/hero-frames-mobile/frame-043.jpg";
import mobileFrame044 from "@/assets/hero-frames-mobile/frame-044.jpg";
import mobileFrame045 from "@/assets/hero-frames-mobile/frame-045.jpg";
import mobileFrame046 from "@/assets/hero-frames-mobile/frame-046.jpg";
import mobileFrame047 from "@/assets/hero-frames-mobile/frame-047.jpg";
import mobileFrame048 from "@/assets/hero-frames-mobile/frame-048.jpg";

const desktopFrames = [
  frame001, frame002, frame003, frame004, frame005, frame006, frame007, frame008,
  frame009, frame010, frame011, frame012, frame013, frame014, frame015, frame016,
  frame017, frame018, frame019, frame020, frame021, frame022, frame023, frame024,
  frame025, frame026, frame027, frame028, frame029, frame030, frame031, frame032,
  frame033, frame034, frame035, frame036, frame037, frame038, frame039, frame040,
  frame041, frame042, frame043, frame044, frame045, frame046, frame047, frame048,
];

const mobileFrames = [
  mobileFrame001, mobileFrame002, mobileFrame003, mobileFrame004, mobileFrame005,
  mobileFrame006, mobileFrame007, mobileFrame008, mobileFrame009, mobileFrame010,
  mobileFrame011, mobileFrame012, mobileFrame013, mobileFrame014, mobileFrame015,
  mobileFrame016, mobileFrame017, mobileFrame018, mobileFrame019, mobileFrame020,
  mobileFrame021, mobileFrame022, mobileFrame023, mobileFrame024, mobileFrame025,
  mobileFrame026, mobileFrame027, mobileFrame028, mobileFrame029, mobileFrame030,
  mobileFrame031, mobileFrame032, mobileFrame033, mobileFrame034, mobileFrame035,
  mobileFrame036, mobileFrame037, mobileFrame038, mobileFrame039, mobileFrame040,
  mobileFrame041, mobileFrame042, mobileFrame043, mobileFrame044, mobileFrame045,
  mobileFrame046, mobileFrame047, mobileFrame048,
];

// Fator de suavização - mais responsivo no mobile
const SMOOTH_FACTOR_DESKTOP = 0.12;
const SMOOTH_FACTOR_MOBILE = 0.25; // Mais responsivo no mobile
// Número de frames vizinhos a manter carregados (para trás e para frente)
const FRAME_BUFFER = 8;

type ImageScrollSequenceProps = {
  children?: React.ReactNode;
};

const ImageScrollSequence = ({ children }: ImageScrollSequenceProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [previousFrame, setPreviousFrame] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const rafIdRef = useRef<number | null>(null);
  const currentFrameRef = useRef(0);
  const committedFrameRef = useRef(0);
  const loadedFramesRef = useRef<Set<number>>(new Set());
  const loadingFramesRef = useRef<Set<number>>(new Set());
  const isMobile = useIsMobile();
  const lastScrollYRef = useRef(0);
  const scrollVelocityRef = useRef(0);

  const frames = isMobile ? mobileFrames : desktopFrames;
  const smoothFactor = isMobile ? SMOOTH_FACTOR_MOBILE : SMOOTH_FACTOR_DESKTOP;

  // Função para carregar um frame específico
  const loadFrame = (index: number): Promise<void> => {
    return new Promise((resolve) => {
      if (index < 0 || index >= frames.length) {
        resolve();
        return;
      }
      if (loadedFramesRef.current.has(index) || loadingFramesRef.current.has(index)) {
        resolve();
        return;
      }

      loadingFramesRef.current.add(index);
      const img = new Image();
      img.src = frames[index];

      const onComplete = () => {
        loadedFramesRef.current.add(index);
        loadingFramesRef.current.delete(index);
        resolve();
      };

      img.onload = () => {
        if (img.decode) {
          img.decode().then(onComplete).catch(onComplete);
        } else {
          onComplete();
        }
      };
      img.onerror = onComplete;
    });
  };

  // Carregar frames próximos ao frame atual
  const loadNearbyFrames = (centerFrame: number) => {
    const start = Math.max(0, centerFrame - FRAME_BUFFER);
    const end = Math.min(frames.length - 1, centerFrame + FRAME_BUFFER);

    for (let i = start; i <= end; i++) {
      loadFrame(i);
    }
  };

  // Pré-carregar todos os frames no mobile para evitar travamentos
  useEffect(() => {
    if (isMobile) {
      // Carregar todos os frames em paralelo no mobile
      frames.forEach((_, index) => loadFrame(index));
    }
  }, [isMobile, frames]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.01 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Reset quando muda entre mobile/desktop
  useEffect(() => {
    loadedFramesRef.current = new Set();
    loadingFramesRef.current = new Set();
    currentFrameRef.current = 0;
    committedFrameRef.current = 0;
    lastScrollYRef.current = window.scrollY;
    scrollVelocityRef.current = 0;
    setCurrentFrame(0);
    setPreviousFrame(0);
    setIsReady(false);

    // Carregar primeiros frames
    loadFrame(0).then(() => setIsReady(true));
    loadNearbyFrames(0);
  }, [isMobile, frames]);

  useEffect(() => {
    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    let lastTime = performance.now();

    const tick = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 16.67, 2); // Normalizar para ~60fps, cap em 2
      lastTime = currentTime;

      if (!isInView) {
        rafIdRef.current = window.requestAnimationFrame(tick);
        return;
      }

      const container = scrollContainerRef.current;
      if (!container) {
        rafIdRef.current = window.requestAnimationFrame(tick);
        return;
      }

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calcular progresso do scroll
      const scrollStart = Math.max(0, -rect.top);
      const scrollRange = containerHeight - viewportHeight;
      
      if (scrollRange <= 0) {
        rafIdRef.current = window.requestAnimationFrame(tick);
        return;
      }

      // Calcular velocidade do scroll para adaptar suavização
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollYRef.current);
      scrollVelocityRef.current = scrollDelta;
      lastScrollYRef.current = currentScrollY;

      // Clamp do progresso para garantir que fique entre 0 e 1
      const rawProgress = scrollStart / scrollRange;
      const progress = clamp(rawProgress, 0, 1);

      // Calcular frame alvo
      const targetFrame = progress * (frames.length - 1);
      
      // Suavização adaptativa baseada na velocidade e diferença
      const diff = Math.abs(targetFrame - currentFrameRef.current);
      
      // No mobile, ser mais direto quando há movimento rápido
      let adaptiveFactor: number;
      if (isMobile) {
        // Mobile: resposta mais direta
        if (scrollVelocityRef.current > 50 || diff > 3) {
          adaptiveFactor = 0.5; // Muito responsivo
        } else if (diff > 1) {
          adaptiveFactor = 0.35;
        } else {
          adaptiveFactor = smoothFactor;
        }
      } else {
        // Desktop: suavização normal
        adaptiveFactor = diff > 5 ? 0.25 : smoothFactor;
      }
      
      // Aplicar suavização com compensação de deltaTime
      currentFrameRef.current = lerp(
        currentFrameRef.current, 
        targetFrame, 
        clamp(adaptiveFactor * deltaTime, 0, 1)
      );
      
      // Garantir que o frame final seja válido
      const nextFrame = clamp(Math.round(currentFrameRef.current), 0, frames.length - 1);

      // Carregar frames próximos (menos agressivo no mobile já que pré-carregamos)
      if (!isMobile) {
        loadNearbyFrames(nextFrame);
      }

      // Atualizar frame se mudou e está carregado
      if (
        loadedFramesRef.current.has(nextFrame) &&
        nextFrame !== committedFrameRef.current
      ) {
        const prev = committedFrameRef.current;
        committedFrameRef.current = nextFrame;
        setPreviousFrame(prev);
        setCurrentFrame(nextFrame);
      } else if (!loadedFramesRef.current.has(nextFrame) && isMobile) {
        // No mobile, se o frame não carregou, usar o mais próximo disponível
        for (let offset = 1; offset <= 5; offset++) {
          const fallbackLower = nextFrame - offset;
          const fallbackHigher = nextFrame + offset;
          
          if (fallbackLower >= 0 && loadedFramesRef.current.has(fallbackLower)) {
            if (fallbackLower !== committedFrameRef.current) {
              const prev = committedFrameRef.current;
              committedFrameRef.current = fallbackLower;
              setPreviousFrame(prev);
              setCurrentFrame(fallbackLower);
            }
            break;
          }
          
          if (fallbackHigher < frames.length && loadedFramesRef.current.has(fallbackHigher)) {
            if (fallbackHigher !== committedFrameRef.current) {
              const prev = committedFrameRef.current;
              committedFrameRef.current = fallbackHigher;
              setPreviousFrame(prev);
              setCurrentFrame(fallbackHigher);
            }
            break;
          }
        }
      }

      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    rafIdRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [frames.length, isInView, isMobile, smoothFactor]);

  const firstFrame = frames[0];

  // Determinar quais frames renderizar (apenas os próximos ao atual)
  const visibleFrameIndices = new Set<number>();
  visibleFrameIndices.add(currentFrame);
  visibleFrameIndices.add(previousFrame);
  for (let i = Math.max(0, currentFrame - 2); i <= Math.min(frames.length - 1, currentFrame + 2); i++) {
    visibleFrameIndices.add(i);
  }

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
            transform: "scale(1.15)",
            transformOrigin: "center center",
          }}
          aria-hidden="true"
        />

        {/* Apenas frames visíveis/próximos são renderizados */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ opacity: isReady ? 1 : 0, transition: "opacity 0.3s ease" }}
          aria-hidden="true"
        >
          {Array.from(visibleFrameIndices).map((index) => (
            <img
              key={`${isMobile ? "mobile" : "desktop"}-${index}`}
              src={frames[index]}
              alt=""
              decoding="async"
              loading="eager"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
                transform: "scale(1.15)",
                transformOrigin: "center center",
                opacity: index === currentFrame || index === previousFrame ? 1 : 0,
                zIndex: index === currentFrame ? 2 : index === previousFrame ? 1 : 0,
                transition: "none",
                willChange: "opacity",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 h-full">{children}</div>
      </div>
    </div>
  );
};

export default ImageScrollSequence;
