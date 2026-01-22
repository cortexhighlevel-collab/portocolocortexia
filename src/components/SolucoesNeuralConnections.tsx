import { useId, useLayoutEffect, useState } from "react";

type Point = { x: number; y: number };

type Connection = {
  key: string;
  d: string;
  start: Point;
  end: Point;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function roundedOrthoPath(start: Point, end: Point, direction: "horizontal" | "vertical", radius = 20) {
  // Orthogonal path with rounded corners
  // direction = first segment direction from the card
  
  if (direction === "horizontal") {
    // Start horizontal, then vertical to end
    const midX = (start.x + end.x) / 2;
    const goingUp = end.y < start.y;
    const goingRight = end.x > start.x;
    
    // Arc sweep flags
    const sweep1 = (goingRight && goingUp) || (!goingRight && !goingUp) ? 0 : 1;
    const sweep2 = (goingRight && goingUp) || (!goingRight && !goingUp) ? 1 : 0;
    
    const r = Math.min(radius, Math.abs(end.y - start.y) / 2, Math.abs(midX - start.x));
    
    const arc1StartX = midX + (goingRight ? -r : r);
    const arc1EndY = start.y + (goingUp ? -r : r);
    
    const arc2StartY = end.y + (goingUp ? r : -r);
    const arc2EndX = midX + (goingRight ? r : -r);
    
    return `M ${start.x} ${start.y} 
            L ${arc1StartX} ${start.y} 
            Q ${midX} ${start.y}, ${midX} ${arc1EndY}
            L ${midX} ${arc2StartY}
            Q ${midX} ${end.y}, ${arc2EndX} ${end.y}
            L ${end.x} ${end.y}`;
  } else {
    // Start vertical, then horizontal to end
    const midY = (start.y + end.y) / 2;
    const goingUp = end.y < start.y;
    const goingRight = end.x > start.x;
    
    const r = Math.min(radius, Math.abs(end.x - start.x) / 2, Math.abs(midY - start.y));
    
    const arc1StartY = midY + (goingUp ? r : -r);
    const arc1EndX = start.x + (goingRight ? r : -r);
    
    const arc2StartX = end.x + (goingRight ? -r : r);
    const arc2EndY = midY + (goingUp ? -r : r);
    
    return `M ${start.x} ${start.y}
            L ${start.x} ${arc1StartY}
            Q ${start.x} ${midY}, ${arc1EndX} ${midY}
            L ${arc2StartX} ${midY}
            Q ${end.x} ${midY}, ${end.x} ${arc2EndY}
            L ${end.x} ${end.y}`;
  }
}

export function SolucoesNeuralConnections(props: {
  containerRef: React.RefObject<HTMLDivElement>;
  brainRef: React.RefObject<HTMLDivElement>;
  cardElsRef: React.MutableRefObject<Array<HTMLDivElement | null>>;
  positions: string[];
}) {
  const { containerRef, brainRef, cardElsRef, positions } = props;

  const uid = useId().replace(/[:]/g, "");
  const gradientId = `neural-gradient-${uid}`;
  const glowId = `neural-glow-${uid}`;
  const dotGlowId = `neural-dotglow-${uid}`;

  const [layout, setLayout] = useState<{ w: number; h: number; conns: Connection[] }>({
    w: 0,
    h: 0,
    conns: [],
  });

  useLayoutEffect(() => {
    let raf = 0;

    const measure = () => {
      const container = containerRef.current;
      const brain = brainRef.current;
      if (!container || !brain) return;

      const cRect = container.getBoundingClientRect();
      const bRect = brain.getBoundingClientRect();

      const w = Math.max(1, Math.round(cRect.width));
      const h = Math.max(1, Math.round(cRect.height));

      const brainCenter: Point = {
        x: bRect.left + bRect.width / 2 - cRect.left,
        y: bRect.top + bRect.height / 2 - cRect.top,
      };

      const bw = bRect.width;
      const bh = bRect.height;

      // Alvos no cérebro (aprox. nos “pinos” visualmente)
      const brainTargetsByPos: Record<string, Point> = {
        "top-left": { x: brainCenter.x - bw * 0.38, y: brainCenter.y - bh * 0.18 },
        "mid-left": { x: brainCenter.x - bw * 0.4, y: brainCenter.y + bh * 0.1 },
        "bottom-center": { x: brainCenter.x, y: brainCenter.y + bh * 0.4 },
        "top-right": { x: brainCenter.x + bw * 0.38, y: brainCenter.y - bh * 0.18 },
        "mid-right": { x: brainCenter.x + bw * 0.4, y: brainCenter.y + bh * 0.06 },
        "bottom-right": { x: brainCenter.x + bw * 0.34, y: brainCenter.y + bh * 0.26 },
      };

      const conns: Connection[] = [];

      positions.forEach((pos, idx) => {
        const el = cardElsRef.current[idx];
        if (!el) return;
        const r = el.getBoundingClientRect();

        // âncora no card (aproxima o centro do anel/ícone)
        let ax = r.left + r.width / 2;
        let ay = r.top + r.height / 2;

        if (pos.includes("left")) {
          ax = r.left + r.width * 0.82;
        } else if (pos.includes("right")) {
          ax = r.left + r.width * 0.18;
        }

        if (pos === "bottom-right") {
          ax = r.left + r.width * 0.12;
          ay = r.top + r.height * 0.28;
        }

        if (pos === "bottom-center") {
          ay = r.top + r.height * 0.22;
        }

        const start: Point = {
          x: ax - cRect.left,
          y: ay - cRect.top,
        };

        const target = brainTargetsByPos[pos] ?? brainCenter;
        const end: Point = {
          x: target.x,
          y: target.y,
        };

        // Direção inicial: cards laterais começam horizontal, card de baixo começa vertical
        const direction = pos === "bottom-center" ? "vertical" : "horizontal";
        const d = roundedOrthoPath(start, end, direction, 24);

        conns.push({
          key: `${pos}-${idx}`,
          d,
          start: {
            x: clamp(start.x, 0, w),
            y: clamp(start.y, 0, h),
          },
          end: {
            x: clamp(end.x, 0, w),
            y: clamp(end.y, 0, h),
          },
        });
      });

      setLayout({ w, h, conns });
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    schedule();

    const ro = new ResizeObserver(schedule);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
    };
    // refs são estáveis; posições é constante (vinda do módulo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!layout.w || !layout.h || layout.conns.length === 0) return null;

  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none z-30"
      viewBox={`0 0 ${layout.w} ${layout.h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--frame-red))" />
          <stop offset="100%" stopColor="hsl(var(--frame-purple))" />
        </linearGradient>
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="2.75" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={dotGlowId}>
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {layout.conns.map((c) => (
        <g key={c.key}>
          <path
            d={c.d}
            stroke={`url(#${gradientId})`}
            strokeWidth={2.25}
            strokeOpacity={0.85}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter={`url(#${glowId})`}
            vectorEffect="non-scaling-stroke"
          />
          {/* Apenas círculo no cérebro (end), removido do card (start) */}
          <circle
            cx={c.end.x}
            cy={c.end.y}
            r={5.5}
            fill="hsl(var(--frame-purple))"
            filter={`url(#${dotGlowId})`}
          />
        </g>
      ))}
    </svg>
  );
}
