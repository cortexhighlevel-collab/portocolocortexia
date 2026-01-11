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
];

const ImageScrollSequence = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const rafIdRef = useRef<number | null>(null);

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

  // Scroll sync loop
  useEffect(() => {
    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

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

      // Calculate which frame to show based on scroll progress
      const frameIndex = Math.floor(progress * (frames.length - 1));
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
        style={{ height: "150vh", position: "relative" }}
      />

      {/* Image sequence background */}
      <div className={`vimeo-video-background ${isReady ? "video-ready" : ""}`}>
        {frames.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Frame ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-100"
            style={{
              opacity: index === currentFrame ? 1 : 0,
              zIndex: index === currentFrame ? 1 : 0,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default ImageScrollSequence;
