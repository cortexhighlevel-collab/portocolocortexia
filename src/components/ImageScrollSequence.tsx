import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { isIOSDevice } from "@/lib/platform";

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

  // OBS: manter mapeamento direto (0..N-1) também no mobile quando estiver em modo canvas.

// Desktop: suavização via interpolação (lerp) em RAF.
// Valores maiores = mais responsivo.
const DESKTOP_SMOOTH_FACTOR = 0.30;

// Mobile (Android): mantendo comportamento consistente com o prompt.
const MOBILE_SMOOTH_FACTOR = 0.30;

// Pool legado (mantido como fallback / referência). No modo canvas não usamos o pool.
const POOL_SIZE = 7;

// Placeholder leve para evitar src="" (Safari pode tentar carregar a URL da página)
const TRANSPARENT_1PX =
  "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";

type FrameLoadMode = "near" | "background";

type RenderMode = "canvas" | "pool";

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
  const targetFrameFloatRef = useRef(0);
  const currentFrameFloatRef = useRef(0);
  const lastPreloadCenterRef = useRef(-999);
  const lastTargetFrameIntRef = useRef(0);
  const loadedFramesRef = useRef<Set<number>>(new Set());
  const decodedFramesRef = useRef<Set<number>>(new Set());
  const loadingFramesRef = useRef<Set<number>>(new Set());

  // Canvas renderer
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const canvasDprRef = useRef<number>(1);
  const imgCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());

  const poolElsRef = useRef<Array<HTMLImageElement | null>>([]);
  const poolFrameIndexRef = useRef<number[]>(Array.from({ length: POOL_SIZE }, () => -1));
  const isMobile = useIsMobile();
  const isIOS = isMobile && isIOSDevice();

  const frames = isMobile ? mobileFrames : desktopFrames;

  // Preferimos canvas para suavidade/performance (principalmente no scroll rápido).
  const renderMode: RenderMode = "canvas";

  // IMPORTANTE: não faça return cedo aqui — isso quebra a ordem de hooks.
  // Mobile: usuário pediu animado (inclusive no iOS), mas em modo leve (sem preload agressivo).
  const renderStaticMobile = false;

  // Desktop: prioriza fidelidade e responsividade em scroll rápido.
  // A principal diferença entre Preview vs Published costuma ser latência/cache: no publicado, os JPGs podem demorar
  // mais a chegar, então precisamos de um preload inicial maior + fallback mais esperto quando o frame alvo não carregou.
  // Mobile: manter otimizações (mas no momento está em modo estático acima).
  const DESKTOP_FRAME_BUFFER = 16;
  // iOS mobile: buffer mínimo para evitar pressão de memória.
  const effectiveFrameBuffer = isIOS ? 1 : isMobile ? 6 : DESKTOP_FRAME_BUFFER;
  const effectiveMaxStep = frames.length;
  const allowBackgroundPreload = !isIOS;
  // Mobile: decode() pode aumentar pressão de memória/CPU; manter desligado no mobile.
  const allowDecode = !isMobile && !isIOS;
  const gateOnLoadedDesktop = true;
  const gateOnLoaded = (!isMobile && gateOnLoadedDesktop) || (isMobile && !isIOS);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const ensurePoolSize = () => {
    if (poolElsRef.current.length !== POOL_SIZE) {
      poolElsRef.current = Array.from({ length: POOL_SIZE }, (_, i) => poolElsRef.current[i] ?? null);
    }
    if (poolFrameIndexRef.current.length !== POOL_SIZE) {
      poolFrameIndexRef.current = Array.from({ length: POOL_SIZE }, () => -1);
    }
  };

  const computeCoverDraw = (
    imgW: number,
    imgH: number,
    canvasW: number,
    canvasH: number
  ) => {
    const imgRatio = imgW / imgH;
    const canvasRatio = canvasW / canvasH;
    let drawW = canvasW;
    let drawH = canvasH;
    let dx = 0;
    let dy = 0;

    if (imgRatio > canvasRatio) {
      // imagem mais “larga”: aumenta largura, corta laterais
      drawH = canvasH;
      drawW = canvasH * imgRatio;
      dx = (canvasW - drawW) / 2;
      dy = 0;
    } else {
      // imagem mais “alta”: aumenta altura, corta topo/baixo
      drawW = canvasW;
      drawH = canvasW / imgRatio;
      dx = 0;
      dy = (canvasH - drawH) / 2;
    }
    return { dx, dy, dw: drawW, dh: drawH };
  };

  const drawFrameToCanvas = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imgCacheRef.current.get(frameIndex);
    if (!img || !img.complete) return;

    // Render em coordenadas lógicas (CSS pixels) com DPR limitado para melhorar nitidez sem “derreter” o mobile.
    const dpr = canvasDprRef.current || 1;
    const cw = Math.max(1, Math.floor(canvas.width / dpr));
    const ch = Math.max(1, Math.floor(canvas.height / dpr));
    if (!cw || !ch) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // clear
    ctx.clearRect(0, 0, cw, ch);

    // cover draw
    const { dx, dy, dw, dh } = computeCoverDraw(
      img.naturalWidth || img.width,
      img.naturalHeight || img.height,
      cw,
      ch
    );
    ctx.drawImage(img, dx, dy, dw, dh);
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

  // Função para carregar um frame específico (cacheada)
  const loadFrame = (index: number, mode: FrameLoadMode = "near"): Promise<void> => {
    return new Promise((resolve) => {
      if (index < 0 || index >= frames.length) {
        resolve();
        return;
      }

      if (loadedFramesRef.current.has(index)) {
        resolve();
        return;
      }

      if (loadingFramesRef.current.has(index)) {
        resolve();
        return;
      }

      loadingFramesRef.current.add(index);
      const img = imgCacheRef.current.get(index) ?? new Image();
      imgCacheRef.current.set(index, img);
      img.src = frames[index];

      const onComplete = () => {
        loadingFramesRef.current.delete(index);
        resolve();
      };

      img.onload = () => {
        // IMPORTANT: marca como carregado no onload (não bloqueia na decode), para não “travar” frames.
        loadedFramesRef.current.add(index);

        // Se esse frame estiver na tela, tenta desenhar imediatamente.
        if (renderMode === "canvas" && displayedFrameRef.current === index) {
          drawFrameToCanvas(index);
        }

        // Tenta decodificar em background para suavidade
        const maybeDecode = () => {
          if (decodedFramesRef.current.has(index)) return;
          if (!allowDecode) return;
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
    const start = Math.max(0, centerFrame - effectiveFrameBuffer);
    const end = Math.min(frames.length - 1, centerFrame + effectiveFrameBuffer);

    for (let i = start; i <= end; i++) {
      loadFrame(i, "near");
    }
  };

  useEffect(() => {
    // IntersectionObserver é ok para todos (inclusive mobile animado), mas não precisamos no modo estático iOS.
    if (renderStaticMobile) return;
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
    targetFrameFloatRef.current = 0;
    currentFrameFloatRef.current = 0;
    lastPreloadCenterRef.current = -999;
    lastTargetFrameIntRef.current = 0;
    imgCacheRef.current = new Map<number, HTMLImageElement>();
    setIsReady(false);

    // Garante estado visual inicial (frame 0) sem depender de 48 <img>
    renderPoolForFrames(0, 0);

    // Pré-carregar os primeiros frames
    const preloadInitial = async () => {
      // Desktop: carrega mais frames iniciais para evitar “trava e pula” no primeiro scroll (principalmente no Published).
      const initialFramesToLoad = Math.min(
        (isMobile ? effectiveFrameBuffer + 1 : Math.max(effectiveFrameBuffer + 1, 20)),
        frames.length
      );
      const promises: Promise<void>[] = [];
      for (let i = 0; i < initialFramesToLoad; i++) {
        promises.push(loadFrame(i, "near"));
      }
      await Promise.all(promises);
      setIsReady(true);

      // no canvas, desenha o frame inicial assim que estiver pronto
      if (renderMode === "canvas") {
        drawFrameToCanvas(0);
      }

      // Background preload:
      // No iPhone, decodificar/carregar muita coisa tende a travar (memória/GPU).
      // Mantemos um preload progressivo e BEM limitado.
      const requestIdleCallback = (window as unknown as {
        requestIdleCallback?: (cb: (deadline?: { timeRemaining: () => number }) => void, opts?: { timeout?: number }) => number;
      }).requestIdleCallback;

      // Desktop: preload completo em background para manter scroll suave mesmo em scroll rápido.
      // Mobile: limitado (e no iOS desativado) para evitar pressão de memória.
      const maxBackground = allowBackgroundPreload
        ? isIOS
          ? Math.min(8, frames.length)
          : isMobile
            ? Math.min(24, frames.length)
            : frames.length
        : 0;
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
  }, [isMobile, renderStaticMobile]);

  // Resize do canvas (cover) + redraw
  useEffect(() => {
    if (renderStaticMobile) return;
    if (renderMode !== "canvas") return;

    const onResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvasSizeRef.current.w === w && canvasSizeRef.current.h === h) return;
      canvasSizeRef.current = { w, h };

      // Qualidade vs performance:
      // - Desktop: pode usar DPR maior.
      // - Mobile/iOS: limita DPR para evitar aquecimento e travas.
      const rawDpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const dprCap = isMobile ? (isIOS ? 1.0 : 1.25) : 2.0;
      const dpr = Math.max(1, Math.min(rawDpr, dprCap));
      canvasDprRef.current = dpr;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      drawFrameToCanvas(displayedFrameRef.current);
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [renderStaticMobile, isMobile, isIOS]);

  // Mobile: reduzir trabalho contínuo.
  // Em vez de rodar RAF para sempre, só anima enquanto o usuário está scrollando (ou enquanto ainda está “alcançando” o alvo).
  const scrollWakeRef = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      scrollWakeRef.current = performance.now();
      if (rafIdRef.current == null) {
        rafIdRef.current = window.requestAnimationFrame(() => {
          rafIdRef.current = null;
          // o useEffect do tick (abaixo) agenda novamente
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (renderStaticMobile) return;
    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

    const shouldStayHot = () => {
      // Mantém ativo por um curto período após scroll para suavização do lerp.
      const since = performance.now() - (scrollWakeRef.current || 0);
      return since < 200;
    };

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

      // Frame alvo baseado no progresso (float para suavização)
      const targetFloat = progress * (frames.length - 1);
      targetFrameFloatRef.current = targetFloat;
      const targetFrameInt = clamp(Math.round(targetFloat), 0, frames.length - 1);

      // Suavização (lerp) do frame atual em direção ao alvo
      const smoothFactor = isMobile ? MOBILE_SMOOTH_FACTOR : DESKTOP_SMOOTH_FACTOR;
      const prevFloat = currentFrameFloatRef.current;
      const nextFloat = lerp(prevFloat, targetFloat, smoothFactor);
      currentFrameFloatRef.current = nextFloat;

      const desiredFrame = clamp(Math.round(nextFloat), 0, frames.length - 1);
      const current = displayedFrameRef.current;

      // Pré-carregar frames próximos só quando o centro muda (reduz carga em scroll rápido)
      if (Math.abs(targetFrameInt - lastPreloadCenterRef.current) >= 2) {
        lastPreloadCenterRef.current = targetFrameInt;
        loadNearbyFrames(targetFrameInt);
      }

      // Em scroll muito rápido, cria um “corredor” no sentido do movimento para evitar buracos
      const targetDelta = targetFrameInt - lastTargetFrameIntRef.current;
      if (!isMobile && Math.abs(targetDelta) >= 4) {
        const dir = targetDelta > 0 ? 1 : -1;
        const corridorLimit = 12;
        for (let step = 1; step <= corridorLimit; step++) {
          const idx = targetFrameInt + dir * step;
          if (idx < 0 || idx >= frames.length) break;
          if (!loadedFramesRef.current.has(idx)) loadFrame(idx, "near");
        }
      }
      lastTargetFrameIntRef.current = targetFrameInt;

      // Se já está no frame correto, não faz nada
      if (desiredFrame === current) {
        // Mobile: se não está scrollando e já alcançou o alvo, para o RAF para não aquecer.
        if (isMobile && !shouldStayHot()) {
          rafIdRef.current = null;
          return;
        }
        rafIdRef.current = window.requestAnimationFrame(tick);
        return;
      }

      // Frame candidato (já suavizado)
      let nextFrame = desiredFrame;

      // Evitar “pulo” no desktop: se o frame alvo não estiver carregado, não troca.
      // Em vez disso, escolhe o melhor frame já carregado mais próximo do frame alvo e continua carregando o caminho.
      if (gateOnLoaded && !loadedFramesRef.current.has(nextFrame)) {
        loadFrame(nextFrame, "near");

        // Escolhe o frame carregado mais próximo do ALVO (não do current), para reduzir “saltos” quando destrava.
        const radius = isMobile ? 6 : 10;
        let bestCandidate = current;
        let bestDistance = Number.POSITIVE_INFINITY;
        for (let offset = 1; offset <= radius; offset++) {
          const left = nextFrame - offset;
          const right = nextFrame + offset;
          if (left >= 0) {
            if (loadedFramesRef.current.has(left) && offset < bestDistance) {
              bestCandidate = left;
              bestDistance = offset;
            } else {
              loadFrame(left, "near");
            }
          }
          if (right < frames.length) {
            if (loadedFramesRef.current.has(right) && offset < bestDistance) {
              bestCandidate = right;
              bestDistance = offset;
            } else {
              loadFrame(right, "near");
            }
          }
        }

        if (bestCandidate !== current) {
          const newPrev = current;
          const newCurrent = bestCandidate;
          previousDisplayedFrameRef.current = newPrev;
          displayedFrameRef.current = newCurrent;

          if (renderMode === "canvas") {
            drawFrameToCanvas(newCurrent);
          } else {
            renderPoolForFrames(newCurrent, newPrev);
          }
        }
      } else {
        const oldCurrent = displayedFrameRef.current;
        const oldPrev = previousDisplayedFrameRef.current;
        const newPrev = oldCurrent;
        const newCurrent = nextFrame;

        previousDisplayedFrameRef.current = newPrev;
        displayedFrameRef.current = newCurrent;
        if (renderMode === "canvas") {
          drawFrameToCanvas(newCurrent);
        } else {
          // Renderiza via pool (7 imgs)
          renderPoolForFrames(newCurrent, newPrev);
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
  }, [frames, isInView, renderStaticMobile]);

  const firstFrame = frames[0];

  if (renderStaticMobile) {
    const staticFrame = mobileFrames[0] ?? firstFrame;
    return (
      <div ref={scrollContainerRef} className="relative" style={{ height: "100vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${staticFrame})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              transform: "scale(1.15)",
              transformOrigin: "center center",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 h-full">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollContainerRef} className="relative" style={{ height: "200vh" }}>
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

        {renderMode === "canvas" ? (
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 z-0"
            style={{ opacity: isReady ? 1 : 0, transition: "opacity 0.3s ease", transform: "scale(1.15)", transformOrigin: "center" }}
            aria-hidden="true"
          />
        ) : (
          /* Fallback pool */
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
        )}

        <div className="relative z-10 h-full">{children}</div>
      </div>
    </div>
  );
};

export default ImageScrollSequence;
