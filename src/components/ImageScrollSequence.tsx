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

// Número de frames vizinhos a manter carregados (para trás e para frente)
const FRAME_BUFFER = 10;
// Quantos frames ao redor do frame "iminente" devemos tentar decodificar (evita explodir memória no mobile)
const DECODE_BUFFER = 2;
// Máximo de frames que pode pular por tick (previne saltos)
const MAX_STEP = 2;

// Evita trabalho pesado de preload a cada RAF (especialmente em mobile)
const PRELOAD_THROTTLE_MS = 80;

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
  const lastPreloadCenterRef = useRef<number>(-1);
  const lastPreloadAtRef = useRef<number>(0);

  // IMPORTANTE (mobile): não renderizar 48 imgs simultâneas, isso estoura memória e pode “derrubar” o browser.
  const SLOT_COUNT = 7;
  const slotElsRef = useRef<Array<HTMLImageElement | null>>(Array(SLOT_COUNT).fill(null));
  const slotFrameIndexRef = useRef<Array<number>>(Array(SLOT_COUNT).fill(-1));
  const isMobile = useIsMobile();

  const frames = isMobile ? mobileFrames : desktopFrames;

  const setSlotStyles = (slot: number, nextOpacity: number, nextZ: number) => {
    const el = slotElsRef.current[slot];
    if (!el) return;
    const op = String(nextOpacity);
    const z = String(nextZ);
    if (el.style.opacity !== op) el.style.opacity = op;
    if (el.style.zIndex !== z) el.style.zIndex = z;
  };

  const computeWantedFrames = (current: number, prev: number) => {
    const wanted = new Set<number>();
    wanted.add(current);
    wanted.add(prev);
    for (let i = current - 2; i <= current + 2; i++) {
      if (i >= 0 && i < frames.length) wanted.add(i);
    }
    // garante tamanho máximo
    return Array.from(wanted).slice(0, SLOT_COUNT);
  };

  const applySlots = (newCurrent: number, newPrev: number) => {
    const wanted = computeWantedFrames(newCurrent, newPrev);

    // 1) Atualiza/realoca slots para as fontes necessárias
    for (let i = 0; i < wanted.length; i++) {
      const frameIdx = wanted[i];
      const el = slotElsRef.current[i];
      if (!el) continue;

      if (slotFrameIndexRef.current[i] !== frameIdx) {
        slotFrameIndexRef.current[i] = frameIdx;
        if (el.src !== frames[frameIdx]) el.src = frames[frameIdx];
      }
    }

    // 2) Slots extras ficam invisíveis
    for (let i = wanted.length; i < SLOT_COUNT; i++) {
      slotFrameIndexRef.current[i] = -1;
      setSlotStyles(i, 0, 0);
    }

    // 3) Define opacidade/zIndex: current por cima, prev logo abaixo, demais off
    for (let i = 0; i < wanted.length; i++) {
      const idx = slotFrameIndexRef.current[i];
      if (idx === -1) continue;
      if (idx === newCurrent) setSlotStyles(i, 1, 2);
      else if (idx === newPrev) setSlotStyles(i, 1, 1);
      else setSlotStyles(i, 0, 0);
    }
  };

  // Função para carregar um frame específico
  const loadFrame = (index: number, mode: FrameLoadMode = "near"): Promise<void> => {
    if (index < 0 || index >= frames.length) return Promise.resolve();
    if (loadedFramesRef.current.has(index) || loadingFramesRef.current.has(index)) return Promise.resolve();

    return new Promise((resolve) => {
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

        // Decode é best-effort. Em mobile, decodificar muitos frames em sequência costuma “derrubar” o browser.
        // Portanto, só decodificamos quando mode === "near" (janela pequena e iminente).
        if (mode === "near") {
          if (!decodedFramesRef.current.has(index) && img.decode) {
            img
              .decode()
              .then(() => decodedFramesRef.current.add(index))
              .catch(() => void 0);
          }
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
  // - Faz preload de um "corredor" na direção do scroll (evita ficar esperando frames intermediários)
  // - Decodifica somente uma janela pequena (DECODE_BUFFER) ao redor do frame iminente
  const loadNearbyFrames = (centerFrame: number, decodeCenter: number) => {
    const now = performance.now();
    if (
      lastPreloadCenterRef.current === centerFrame &&
      now - lastPreloadAtRef.current < PRELOAD_THROTTLE_MS
    ) {
      return;
    }
    lastPreloadCenterRef.current = centerFrame;
    lastPreloadAtRef.current = now;

    const start = Math.max(0, centerFrame - FRAME_BUFFER);
    const end = Math.min(frames.length - 1, centerFrame + FRAME_BUFFER);

    const decodeStart = Math.max(0, decodeCenter - DECODE_BUFFER);
    const decodeEnd = Math.min(frames.length - 1, decodeCenter + DECODE_BUFFER);

    for (let i = start; i <= end; i++) {
      const shouldDecode = i >= decodeStart && i <= decodeEnd;
      loadFrame(i, shouldDecode ? "near" : "background");
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

    // Estado visual inicial (frame 0)
    slotFrameIndexRef.current = Array(SLOT_COUNT).fill(-1);
    applySlots(0, 0);

    lastPreloadCenterRef.current = -1;
    lastPreloadAtRef.current = 0;

    // Pré-carregar os primeiros frames
    const preloadInitial = async () => {
      const initialFramesToLoad = Math.min(FRAME_BUFFER, frames.length);
      const promises: Promise<void>[] = [];
      for (let i = 0; i < initialFramesToLoad; i++) {
        promises.push(loadFrame(i, "near"));
      }
      await Promise.all(promises);
      setIsReady(true);
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

      // Pausa quando a aba está em background (reduz chance de crash por uso contínuo de CPU/mem em mobile)
      if (document.visibilityState === "hidden") {
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

      // Escolhe um centro de preload que favorece o "caminho" entre current -> target.
      // Isso evita que, num scroll rápido, a gente pré-carregue só perto do target e fique sem os frames intermediários.
      const delta = targetFrame - current;
      const dir = delta === 0 ? 0 : delta > 0 ? 1 : -1;
      const corridorCenter =
        Math.abs(delta) > FRAME_BUFFER
          ? clamp(current + dir * FRAME_BUFFER, 0, frames.length - 1)
          : targetFrame;

      // Se já está no frame correto, não faz nada
      if (targetFrame === current) {
        // Mesmo parado, mantém preload do corredor atualizado (especialmente quando o usuário volta a mexer)
        loadNearbyFrames(corridorCenter, current);
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

      // Pré-carregar (corredor + decode em volta do frame iminente)
      loadNearbyFrames(corridorCenter, nextFrame);

      // Atualiza sem setState (evita re-render do Hero e elimina flicker/travadas)
      // Se o frame ainda não estiver carregado, força carga e mantém o atual até ter ao menos "loaded".
      if (!loadedFramesRef.current.has(nextFrame)) {
        loadFrame(nextFrame, "near");
      } else {
        const oldCurrent = displayedFrameRef.current;
        const newPrev = oldCurrent;
        const newCurrent = nextFrame;

        previousDisplayedFrameRef.current = newPrev;
        displayedFrameRef.current = newCurrent;
        applySlots(newCurrent, newPrev);
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
          {Array.from({ length: SLOT_COUNT }).map((_, slot) => (
            <img
              key={`${isMobile ? "mobile" : "desktop"}-slot-${slot}`}
              ref={(el) => {
                slotElsRef.current[slot] = el;
              }}
              src={firstFrame}
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
