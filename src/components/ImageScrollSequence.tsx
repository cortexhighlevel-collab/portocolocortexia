import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// iOS/Safari: reduzir peso de JS e evitar 96 imports diretos.
// A glob gera um map de URLs e a gente ordena pelos números (001..048).
const frameNumber = (p: string) => {
  const m = p.match(/frame-(\d+)\.jpg$/);
  return m ? Number(m[1]) : 0;
};

const toSortedFrameList = (glob: Record<string, unknown>) =>
  Object.entries(glob)
    .sort(([a], [b]) => frameNumber(a) - frameNumber(b))
    .map(([, url]) => url as string);

const desktopFrames = toSortedFrameList(
  import.meta.glob("/src/assets/hero-frames/frame-*.jpg", { eager: true, import: "default" })
);

const mobileFrames = toSortedFrameList(
  import.meta.glob("/src/assets/hero-frames-mobile/frame-*.jpg", { eager: true, import: "default" })
);

// Número de frames vizinhos a manter carregados (para trás e para frente)
const FRAME_BUFFER = 10;
// Máximo de frames que pode pular por tick (previne saltos)
const MAX_STEP = 2;

// CRITICAL (mobile/iPhone): manter poucos <img> no DOM evita estouro de memória/GPU.
// Pool fixo: reaproveita N elementos e só troca o src conforme o frame muda.
const POOL_SIZE = 7;

// Placeholder leve para evitar src="" (Safari pode tentar carregar a URL da página)
const TRANSPARENT_1PX =
  "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";

type FrameLoadMode = "near" | "background";

type ImageScrollSequenceProps = {
  children?: React.ReactNode;
};

const ImageScrollSequence = ({ children }: ImageScrollSequenceProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const rafIdRef = useRef<number | null>(null);
  const displayedFrameRef = useRef(0);
  const previousDisplayedFrameRef = useRef(0);
  const loadedFramesRef = useRef<Set<number>>(new Set());
  const decodedFramesRef = useRef<Set<number>>(new Set());
  const loadingFramesRef = useRef<Set<number>>(new Set());
  const poolElsRef = useRef<Array<HTMLImageElement | null>>([]);
  const poolFrameIndexRef = useRef<number[]>(Array.from({ length: POOL_SIZE }, () => -1));
  const isMobile = useIsMobile();

  const frames = isMobile ? mobileFrames : desktopFrames;

  const ensurePoolSize = () => {
    if (poolElsRef.current.length !== POOL_SIZE) {
      poolElsRef.current = Array.from({ length: POOL_SIZE }, (_, i) => poolElsRef.current[i] ?? null);
    }
    if (poolFrameIndexRef.current.length !== POOL_SIZE) {
      poolFrameIndexRef.current = Array.from({ length: POOL_SIZE }, () => -1);
    }
  };

  const setPoolSlot = (slot: number, frameIndex: number, opacity: number, zIndex: number) => {
    const el = poolElsRef.current[slot];
    if (!el) return;

    const nextSrc = frameIndex >= 0 && frameIndex < frames.length ? frames[frameIndex] : "";
    if (nextSrc) {
      // IMPORTANT (Safari/iPhone): nunca use src="" e não confie só no nosso ref,
      // porque React pode re-renderizar e sobrescrever o atributo src.
      // Sempre valide o atributo atual antes de trocar.
      const currentAttr = el.getAttribute("src") ?? "";
      if (currentAttr !== nextSrc) {
        el.setAttribute("src", nextSrc);
      }
      poolFrameIndexRef.current[slot] = frameIndex;
    }

    const op = String(opacity);
    const z = String(zIndex);
    if (el.style.opacity !== op) el.style.opacity = op;
    if (el.style.zIndex !== z) el.style.zIndex = z;
  };

  const computeWindowFrames = (center: number) => {
    const half = Math.floor(POOL_SIZE / 2);
    const start = Math.max(0, Math.min(center - half, frames.length - POOL_SIZE));
    const end = Math.min(frames.length - 1, start + POOL_SIZE - 1);
    const list: number[] = [];
    for (let i = start; i <= end; i++) list.push(i);
    return list;
  };

  const renderPoolForFrames = (currentFrame: number, prevFrame: number) => {
    ensurePoolSize();
    const windowFrames = computeWindowFrames(currentFrame);

    for (let slot = 0; slot < POOL_SIZE; slot++) {
      const frameIndex = windowFrames[slot] ?? currentFrame;
      const isCurrent = frameIndex === currentFrame;
      const isPrev = frameIndex === prevFrame && prevFrame !== currentFrame;
      const opacity = isCurrent || isPrev ? 1 : 0;
      const z = isCurrent ? 2 : isPrev ? 1 : 0;
      setPoolSlot(slot, frameIndex, opacity, z);
    }
  };

  // Função para carregar um frame específico
  const loadFrame = (index: number, mode: FrameLoadMode = "near"): Promise<void> => {
    return new Promise((resolve) => {
      if (index < 0 || index >= frames.length) {
        resolve();
        return;
      }

      if (loadedFramesRef.current.has(index) || loadingFramesRef.current.has(index)) {
        // Se estiver carregado mas não decodificado e for prioritário, tenta decodificar em background
        // (no pool, nem sempre teremos um <img> específico por frame)
        resolve();
        return;
      }

      loadingFramesRef.current.add(index);
      const img = new Image();
      img.src = frames[index];

      const onComplete = () => {
        loadingFramesRef.current.delete(index);
        resolve();
      };

      img.onload = () => {
        // IMPORTANT: marca como carregado no onload (não bloqueia na decode), para não “travar” frames.
        loadedFramesRef.current.add(index);

        // Tenta decodificar em background para suavidade
        const maybeDecode = () => {
          if (decodedFramesRef.current.has(index)) return;
          if (img.decode) img.decode().then(() => decodedFramesRef.current.add(index)).catch(() => void 0);
        };

        if (mode === "near") {
          maybeDecode();
        } else {
          // background: dá uma folga pro main thread
          window.setTimeout(maybeDecode, 0);
        }

        onComplete();
      };

      img.onerror = () => {
        // Evita loop infinito de tentativas
        loadedFramesRef.current.add(index);
        onComplete();
      };
    });
  };

  // Carregar frames próximos ao frame atual
  const loadNearbyFrames = (centerFrame: number) => {
    const start = Math.max(0, centerFrame - FRAME_BUFFER);
    const end = Math.min(frames.length - 1, centerFrame + FRAME_BUFFER);

    for (let i = start; i <= end; i++) {
      loadFrame(i, "near");
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Reset quando muda entre mobile/desktop
  useEffect(() => {
    loadedFramesRef.current = new Set();
    decodedFramesRef.current = new Set();
    loadingFramesRef.current = new Set();
    displayedFrameRef.current = 0;
    previousDisplayedFrameRef.current = 0;
    setIsReady(false);

    // Garante estado visual inicial (frame 0) sem depender de 48 <img>
    renderPoolForFrames(0, 0);

    // Pré-carregar os primeiros frames
    const preloadInitial = async () => {
      const initialFramesToLoad = Math.min(FRAME_BUFFER, frames.length);
      const promises: Promise<void>[] = [];
      for (let i = 0; i < initialFramesToLoad; i++) {
        promises.push(loadFrame(i, "near"));
      }
      await Promise.all(promises);
      setIsReady(true);

      // Background preload:
      // No iPhone, decodificar TUDO tende a travar (memória/GPU). Mantemos um preload progressivo e leve.
      const requestIdleCallback = (window as unknown as {
        requestIdleCallback?: (cb: (deadline?: { timeRemaining: () => number }) => void, opts?: { timeout?: number }) => number;
      }).requestIdleCallback;

      const maxBackground = isMobile ? Math.min(24, frames.length) : frames.length;
      let cursor = 0;

      const chunk = (deadline?: { timeRemaining: () => number }) => {
        const budget = deadline?.timeRemaining ? deadline.timeRemaining() : 8;
        const startTime = performance.now();

        while (cursor < maxBackground && (performance.now() - startTime < budget)) {
          loadFrame(cursor, "background");
          cursor++;
        }

        if (cursor < maxBackground) {
          if (requestIdleCallback) requestIdleCallback(chunk, { timeout: 1500 });
          else window.setTimeout(() => chunk(), 16);
        }
      };

      if (requestIdleCallback) requestIdleCallback(chunk, { timeout: 1500 });
      else window.setTimeout(() => chunk(), 0);
    };

    preloadInitial();
  }, [isMobile]);

  useEffect(() => {
    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

    const tick = () => {
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
      const scrollRange = containerHeight - viewportHeight;

      if (scrollRange <= 0) {
        rafIdRef.current = window.requestAnimationFrame(tick);
        return;
      }

      // Calcular progresso direto do scroll
      const scrollStart = Math.max(0, -rect.top);
      const progress = clamp(scrollStart / scrollRange, 0, 1);

      // Frame alvo baseado no progresso
      const targetFrame = Math.round(progress * (frames.length - 1));
      const current = displayedFrameRef.current;

      // Pré-carregar frames próximos do target
      loadNearbyFrames(targetFrame);

      // Se já está no frame correto, não faz nada
      if (targetFrame === current) {
        rafIdRef.current = window.requestAnimationFrame(tick);
        return;
      }

      // Calcular próximo frame com limite de step (progressão sequencial)
      let nextFrame: number;
      if (targetFrame > current) {
        // Scrollando para baixo
        nextFrame = Math.min(current + MAX_STEP, targetFrame);
      } else {
        // Scrollando para cima
        nextFrame = Math.max(current - MAX_STEP, targetFrame);
      }

      // Garantir bounds
      nextFrame = clamp(nextFrame, 0, frames.length - 1);

      // Atualiza sem setState (evita re-render do Hero e elimina flicker/travadas)
      // Se o frame ainda não estiver carregado, força carga e mantém o atual até ter ao menos "loaded".
      if (!loadedFramesRef.current.has(nextFrame)) {
        loadFrame(nextFrame, "near");
      } else {
        const oldCurrent = displayedFrameRef.current;
        const oldPrev = previousDisplayedFrameRef.current;
        const newPrev = oldCurrent;
        const newCurrent = nextFrame;

        previousDisplayedFrameRef.current = newPrev;
        displayedFrameRef.current = newCurrent;
        // Renderiza via pool (7 imgs), reduzindo memória e travadas no iPhone
        renderPoolForFrames(newCurrent, newPrev);
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
  }, [frames, isInView]);

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
          {Array.from({ length: POOL_SIZE }).map((_, slot) => (
            <img
              key={`${isMobile ? "mobile" : "desktop"}-pool-${slot}`}
              ref={(el) => {
                poolElsRef.current[slot] = el;
              }}
              // src será gerenciado via renderPoolForFrames() (pool)
              // Mantemos sempre um src válido e LEVE para não disparar request do documento (src="") no Safari.
              // Slot 0 começa com o frame 0; os demais começam com um placeholder.
              src={slot === 0 ? firstFrame : TRANSPARENT_1PX}
              alt=""
              decoding="async"
              loading={slot === 0 ? "eager" : "lazy"}
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
                opacity: slot === 0 ? 1 : 0,
                zIndex: slot === 0 ? 2 : 0,
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
