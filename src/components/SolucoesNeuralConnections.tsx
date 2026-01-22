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

function roundedOrthoPath(
  start: Point,
  end: Point,
  direction: "horizontal" | "vertical",
  radius = 20,
  pivotOverride?: number
) {
  // Orthogonal path with rounded corners
  // pivotOverride: force the pivot x (horizontal) or y (vertical) position

  if (direction === "horizontal") {
    // Start horizontal, then vertical to end
    const midX = pivotOverride ?? (start.x + end.x) / 2;
    const goingUp = end.y < start.y;
    const goingRight = midX > start.x;
    const goingRightEnd = end.x > midX;

    const r = Math.min(
      radius,
      Math.abs(end.y - start.y) / 2,
      Math.abs(midX - start.x),
      Math.abs(end.x - midX)
    );

    const arc1StartX = midX + (goingRight ? -r : r);
    const arc1EndY = start.y + (goingUp ? -r : r);

    const arc2StartY = end.y + (goingUp ? r : -r);
    const arc2EndX = midX + (goingRightEnd ? r : -r);

    return `M ${start.x} ${start.y} 
            L ${arc1StartX} ${start.y} 
            Q ${midX} ${start.y}, ${midX} ${arc1EndY}
            L ${midX} ${arc2StartY}
            Q ${midX} ${end.y}, ${arc2EndX} ${end.y}
            L ${end.x} ${end.y}`;
  } else {
    // Start vertical, then horizontal to end
    const midY = pivotOverride ?? (start.y + end.y) / 2;
    const goingUp = midY < start.y;
    const goingRight = end.x > start.x;
    const goingUpEnd = end.y < midY;

    const r = Math.min(
      radius,
      Math.abs(end.x - start.x) / 2,
      Math.abs(midY - start.y),
      Math.abs(end.y - midY)
    );

    const arc1StartY = midY + (goingUp ? r : -r);
    const arc1EndX = start.x + (goingRight ? r : -r);

    const arc2StartX = end.x + (goingRight ? -r : r);
    const arc2EndY = midY + (goingUpEnd ? -r : r);

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
  const glowId = `neural-glow-${uid}`;

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

      // Alvos no cérebro (aprox. nos "pinos" visualmente)
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

        // Âncora na BORDA do card (não dentro) - linha para exatamente na borda
        let ax: number;
        let ay: number;

        if (pos === "top-left") {
          ax = r.right;
          ay = r.top + r.height * 0.38;
        } else if (pos === "mid-left") {
          ax = r.right;
          ay = r.top + r.height * 0.5;
        } else if (pos === "top-right") {
          ax = r.left;
          ay = r.top + r.height * 0.5;
        } else if (pos === "mid-right") {
          ax = r.left;
          ay = r.top + r.height * 0.5;
        } else if (pos === "bottom-right") {
          ax = r.left;
          ay = r.top + r.height * 0.22;
        } else {
          // bottom-center: borda direita externa do card
          ax = r.right;
          ay = r.top + r.height * 0.38;
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

        // Para bottom-center: forçar a linha a sair para a DIREITA primeiro (lead-out)
        // antes de subir, assim não entra no card — valor menor para não encostar no SEO+AEO
        let pivotX: number | undefined;
        if (pos === "bottom-center") {
          pivotX = start.x + 40;
        }

        const d = roundedOrthoPath(start, end, "horizontal", 24, pivotX);

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
        {/* Gradiente por conexão (alinhado ao path) */}
        {layout.conns.map((c) => {
          const gid = `neural-grad-${uid}-${c.key}`.replace(/[^a-zA-Z0-9_-]/g, "");
          return (
            <linearGradient
              key={gid}
              id={gid}
              gradientUnits="userSpaceOnUse"
              x1={c.start.x}
              y1={c.start.y}
              x2={c.end.x}
              y2={c.end.y}
            >
              <stop offset="0%" stopColor="hsl(var(--frame-red))" />
              <stop offset="100%" stopColor="hsl(var(--frame-purple))" />
            </linearGradient>
          );
        })}
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="2.75" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {layout.conns.map((c) => {
        const gid = `neural-grad-${uid}-${c.key}`.replace(/[^a-zA-Z0-9_-]/g, "");
        return (
          <g key={c.key}>
            <path
              d={c.d}
              stroke={`url(#${gid})`}
              strokeWidth={2.25}
              strokeOpacity={0.85}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter={`url(#${glowId})`}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}
    </svg>
  );
}
