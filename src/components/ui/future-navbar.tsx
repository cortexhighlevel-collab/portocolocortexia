import { useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { type Paths, setupSvgRenderer } from "@left4code/svg-renderer";
import { cva, type VariantProps } from "class-variance-authority";

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
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current && svgRef.current.parentElement) {
      const instance = setupSvgRenderer({
        el: svgRef.current,
        paths,
        enableBackdropBlur,
        enableViewBox,
      });

      return () => instance.destroy();
    }
  }, [paths, enableViewBox, enableBackdropBlur]);

  return (
    <svg
      ref={svgRef}
      className={twMerge("absolute inset-0 w-full h-full", className)}
      {...props}
    />
  );
}

// 🎨 Theme colors — no CSS variables, pure hex/rgba
const COLORS = {
  default: {
    stroke1: "#4f46e5",
    fill1: "rgba(79,70,229,0.22)",
    stroke2: "#4f46e5",
    fill2: "rgba(79,70,229,0.1)",
    text: "#ffffff",
  },
  accent: {
    stroke1: "#f97316",
    fill1: "rgba(249,115,22,0.4)",
    stroke2: "#f97316",
    fill2: "rgba(249,115,22,0.2)",
    text: "#ffffff",
  },
  destructive: {
    stroke1: "#dc2626",
    fill1: "rgba(220,38,38,0.22)",
    stroke2: "#dc2626",
    fill2: "rgba(220,38,38,0.1)",
    text: "#ffffff",
  },
  secondary: {
    stroke1: "#64748b",
    fill1: "rgba(100,116,139,0.15)",
    stroke2: "#64748b",
    fill2: "rgba(100,116,139,0.1)",
    text: "#ffffff",
  },
  success: {
    stroke1: "#16a34a",
    fill1: "rgba(22,163,74,0.22)",
    stroke2: "#16a34a",
    fill2: "rgba(22,163,74,0.1)",
    text: "#ffffff",
  },
};

const buttonVariants = cva(
  "group font-bold mb-2 relative px-8 py-2 cursor-pointer transition-all outline-none [&>span]:relative [&>span]:flex [&>span]:items-center [&>span]:justify-center",
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
  },
);

// Helper function to create paths in the correct format
function createPath(stroke: string, fill: string, pathData: (["M", string, string] | ["L", string, string])[]): Paths[0] {
  return {
    style: {
      strokeWidth: "1",
      stroke,
      fill,
    },
    path: pathData,
  };
}

function FutureButton({
  className,
  children,
  shape = "default",
  enableBackdropBlur = false,
  enableViewBox = false,
  customPaths,
  textColor,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    customPaths?: Paths;
    enableBackdropBlur?: boolean;
    enableViewBox?: boolean;
    bgColor?: string;
    textColor?: string;
  }) {
  const colors = COLORS.default;

  // Default button path (rectangular with cut corner)
  const defaultPaths: Paths = [
    createPath(colors.stroke1, colors.fill1, [
      ["M", "0", "10"],
      ["L", "0", "calc(100% - 10px)"],
      ["L", "10", "100%"],
      ["L", "calc(100% - 20px)", "100%"],
      ["L", "calc(100% - 10px)", "calc(100% - 10px)"],
      ["L", "calc(100% - 10px)", "10"],
      ["L", "calc(100% - 20px)", "0"],
      ["L", "10", "0"],
      ["L", "0", "10"],
    ]),
  ];

  const flatPaths: Paths = [
    createPath(colors.stroke1, colors.fill1, [
      ["M", "0", "5"],
      ["L", "0", "calc(100% - 5px)"],
      ["L", "5", "100%"],
      ["L", "calc(100% - 5px)", "100%"],
      ["L", "100%", "calc(100% - 5px)"],
      ["L", "100%", "5"],
      ["L", "calc(100% - 5px)", "0"],
      ["L", "5", "0"],
      ["L", "0", "5"],
    ]),
  ];

  const simplePaths: Paths = [
    createPath(colors.stroke1, colors.fill1, [
      ["M", "0", "50%"],
      ["L", "15", "0"],
      ["L", "100%", "0"],
      ["L", "100%", "100%"],
      ["L", "15", "100%"],
      ["L", "0", "50%"],
    ]),
  ];

  const getPaths = () => {
    if (customPaths) return customPaths;
    if (shape === "simple") return simplePaths;
    if (shape === "flat") return flatPaths;
    return defaultPaths;
  };

  return (
    <button
      className={twMerge(buttonVariants({ shape }), className)}
      style={{ color: textColor || colors.text }}
      {...props}
    >
      <div className="absolute inset-0">
        <Frame
          enableBackdropBlur={enableBackdropBlur}
          enableViewBox={enableViewBox}
          paths={getPaths()}
        />
      </div>

      <span>{children}</span>
    </button>
  );
}

export { Frame, FutureButton, COLORS, createPath };
export type { Paths };
export default FutureButton;
