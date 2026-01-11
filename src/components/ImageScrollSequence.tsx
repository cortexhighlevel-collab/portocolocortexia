import { useEffect, useRef, useState } from "react";

// Import all frames
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

const frames = [
  frame001,
  frame002,
  frame003,
  frame004,
  frame005,
  frame006,
  frame007,
  frame008,
  frame009,
  frame010,
  frame011,
  frame012,
  frame013,
  frame014,
  frame015,
  frame016,
  frame017,
  frame018,
  frame019,
  frame020,
  frame021,
  frame022,
  frame023,
  frame024,
  frame025,
  frame026,
  frame027,
  frame028,
  frame029,
  frame030,
  frame031,
  frame032,
  frame033,
  frame034,
  frame035,
  frame036,
  frame037,
  frame038,
  frame039,
  frame040,
  frame041,
  frame042,
  frame043,
  frame044,
  frame045,
  frame046,
  frame047,
  frame048,
];

const SMOOTH_FACTOR = 0.15; // Lerp smoothing factor

const ImageScrollSequence = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const rafIdRef = useRef<number | null>(null);
  const currentFrameRef = useRef(0); // For smooth interpolation

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = frames.length;

    frames.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setIsReady(true);
        }
      };
    });
  }, []);

  // Scroll sync loop with lerp interpolation
  useEffect(() => {
    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const tick = () => {
      const container = scrollContainerRef.current;
      if (!container) {
        rafIdRef.current = window.requestAnimationFrame(tick);
        return;
      }

      const startY = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const maxScroll = Math.max(containerHeight - window.innerHeight, 1);
      const localScroll = window.scrollY - startY;
      const progress = clamp(localScroll / maxScroll, 0, 1);

      // Target frame based on scroll progress
      const targetFrame = progress * (frames.length - 1);
      
      // Smooth interpolation using lerp
      currentFrameRef.current = lerp(currentFrameRef.current, targetFrame, SMOOTH_FACTOR);
      
      const frameIndex = Math.round(currentFrameRef.current);
      setCurrentFrame(clamp(frameIndex, 0, frames.length - 1));

      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    rafIdRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Scroll container - creates the scroll space */}
      <div
        ref={scrollContainerRef}
        className="vimeo-scroll-container"
        style={{ height: "200vh", position: "relative" }}
      />

      {/* Image sequence background */}
      <div className={`vimeo-video-background ${isReady ? "video-ready" : ""}`}>
        {frames.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Frame ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: index === currentFrame ? 1 : 0,
              visibility: index === currentFrame ? 'visible' : 'hidden',
            }}
          />
        ))}
      </div>
    </>
  );
};

export default ImageScrollSequence;
