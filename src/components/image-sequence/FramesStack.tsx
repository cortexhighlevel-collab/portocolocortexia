import { forwardRef, memo, useEffect, useImperativeHandle, useRef } from "react";

export type FramesStackHandle = {
  setActiveIndex: (index: number) => void;
};

type FramesStackProps = {
  frames: string[];
  scale?: number;
  className?: string;
};

const FramesStack = forwardRef<FramesStackHandle, FramesStackProps>(
  ({ frames, scale = 1.15, className }, ref) => {
    const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
    const activeIndexRef = useRef(0);

    const applyOpacity = (index: number, opacity: string) => {
      const el = imgRefs.current[index];
      if (!el) return;
      el.style.opacity = opacity;
    };

    useImperativeHandle(
      ref,
      () => ({
        setActiveIndex: (index: number) => {
          const max = Math.max(0, frames.length - 1);
          const next = Math.max(0, Math.min(max, index));
          const prev = activeIndexRef.current;
          if (prev === next) return;

          applyOpacity(prev, "0");
          applyOpacity(next, "1");
          activeIndexRef.current = next;
        },
      }),
      [frames.length]
    );

    // Sempre que trocar mobile/desktop, reseta para o frame 0.
    useEffect(() => {
      activeIndexRef.current = 0;
      for (let i = 0; i < frames.length; i++) {
        applyOpacity(i, i === 0 ? "1" : "0");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frames]);

    return (
      <div className={"pointer-events-none absolute inset-0 z-[1] " + (className ?? "")}>
        {frames.map((src, index) => (
          <img
            key={src}
            ref={(el) => {
              imgRefs.current[index] = el;
            }}
            src={src}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: index === 0 ? 1 : 0,
              transform: `scale(${scale})`,
              transformOrigin: "center center",
              transition: "opacity 60ms linear",
              willChange: "opacity",
            }}
          />
        ))}
      </div>
    );
  }
);

FramesStack.displayName = "FramesStack";

export default memo(FramesStack);
