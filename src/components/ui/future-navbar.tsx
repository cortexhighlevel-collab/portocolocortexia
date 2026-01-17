import React, { useRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

// --- POLYFILL & UTILITIES START ---
type PathCommand = ["M" | "L" | "Q" | "Z", string | number, string | number, string | number, string | number] | ["M" | "L", string | number, string | number] | ["Z"];
type PathItem = {
  show: boolean;
  style: React.CSSProperties;
  path: PathCommand[];
};
type Paths = PathItem[];

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
      if (type === "Z") {
        return "Z";
      } else if (type === "Q") {
        const x1 = parseCoord(cmd[1], width);
        const y1 = parseCoord(cmd[2], height);
        const x = parseCoord(cmd[3], width);
        const y = parseCoord(cmd[4], height);
        return `${type} ${x1} ${y1} ${x} ${y}`;
      } else {
        const x = parseCoord(cmd[1], width);
        const y = parseCoord(cmd[2], height);
        return `${type} ${x} ${y}`;
      }
    })
    .join(" ");
}
// --- POLYFILL END ---

// --- COMPONENT: Frame ---
function Frame({
  className,
  paths,
  enableBackdropBlur,
  enableViewBox,
  ...props
}: {
  paths: Paths;
  enableBackdropBlur?: boolean;
  enableViewBox?: boolean;
} & React.ComponentProps<"svg">) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!svgRef.current) return;
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    obs.observe(svgRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <svg
      {...props}
      ref={svgRef}
      className={twMerge([
        "absolute inset-0 size-full pointer-events-none overflow-visible",
        enableBackdropBlur && "backdrop-blur-[2px]",
        className,
      ])}
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map((p, i) => {
        if (!p.show) return null;
        const d = generateD(p.path, dimensions.width, dimensions.height);
        return (
          <path
            key={i}
            d={d}
            stroke={p.style.stroke as string}
            strokeWidth={p.style.strokeWidth as string}
            fill={p.style.fill as string}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={p.style}
          />
        );
      })}
    </svg>
  );
}

// --- COMPONENT: FutureButton ---
const buttonVariants = cva(
  "group font-bold mb-2 relative px-8 py-2 cursor-pointer transition-all outline-none [&>span]:relative [&>span]:flex [&>span]:items-center [&>span]:justify-center active:scale-95 select-none",
  {
    variants: {
      shape: {
        default: "",
        flat: "",
        simple: "ps-8 pe-6",
      },
    },
    defaultVariants: {
      shape: "default",
    },
  }
);

function FutureButton({
  className,
  children,
  shape = "default",
  textColor,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    textColor?: string;
  }) {
  return (
    <button
      {...props}
      style={{ color: textColor || "#f1f5f9" }}
      className={twMerge(buttonVariants({ shape, className }))}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export { Frame, FutureButton };
export type { Paths, PathItem, PathCommand };
export default FutureButton;
