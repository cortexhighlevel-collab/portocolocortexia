import React, { useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import type { PathCommand } from "@/components/ui/future-navbar";

type Props = {
  path: PathCommand[];
  className?: string;
  /** Extra height to cover portions of the shape that extend below the navbar box (e.g. center tab). */
  extraBottomPx?: number;
  /** Blur intensity in pixels (matches Tailwind backdrop-blur-2xl ~= 40px). */
  blurPx?: number;
};

type Size = { width: number; height: number };

function parseCoord(val: string | number, reference: number): number {
  if (typeof val === "number") return val;
  if (!val) return 0;
  const s = val.toString().trim();
  if (!s.includes("%")) return parseFloat(s);

  const parts = s.split("%");
  const percent = parseFloat(parts[0]) / 100;
  let offset = 0;
  if (parts[1]) {
    const cleanOffset = parts[1].replace(/\s+/g, "");
    if (cleanOffset) offset = parseFloat(cleanOffset);
  }
  return reference * percent + offset;
}

function generateD(pathCommands: PathCommand[], width: number, height: number): string {
  return pathCommands
    .map((cmd) => {
      const type = cmd[0];
      if (type === "Z") return "Z";
      if (type === "Q") {
        const x1 = parseCoord(cmd[1], width);
        const y1 = parseCoord(cmd[2], height);
        const x = parseCoord(cmd[3], width);
        const y = parseCoord(cmd[4], height);
        return `${type} ${x1} ${y1} ${x} ${y}`;
      }
      const x = parseCoord(cmd[1], width);
      const y = parseCoord(cmd[2], height);
      return `${type} ${x} ${y}`;
    })
    .join(" ");
}

export default function NavbarGlassBackdrop({
  path,
  className,
  extraBottomPx = 36,
  blurPx = 40,
}: Props) {
  const baseRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    if (!baseRef.current) return;
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    obs.observe(baseRef.current);
    return () => obs.disconnect();
  }, []);

  const d = useMemo(() => {
    if (!size.width || !size.height) return "";
    return generateD(path, size.width, size.height);
  }, [path, size.height, size.width]);

  const clip = d ? `path("${d}")` : undefined;

  // iOS mobile: backdrop-filter costuma ser bem caro no WebKit.
  const reduceEffects =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("ios-mobile");
  const effectiveBlurPx = reduceEffects ? 0 : blurPx;

  return (
    <div ref={baseRef} className="absolute inset-0 pointer-events-none">
      <div
        className={twMerge("absolute left-0 top-0 w-full", className)}
        style={{
          height: size.height ? size.height + extraBottomPx : undefined,
          clipPath: clip,
          WebkitClipPath: clip,
          background: "hsl(var(--nav-bg) / var(--nav-bg-alpha))",
          backdropFilter: effectiveBlurPx ? `blur(${effectiveBlurPx}px)` : "none",
          WebkitBackdropFilter: effectiveBlurPx ? `blur(${effectiveBlurPx}px)` : "none",
        }}
      />
    </div>
  );
}
