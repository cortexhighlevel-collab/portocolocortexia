import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RisingSectionProps {
  children: ReactNode;
}

const RisingSection = ({ children }: RisingSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    
    if (!section || !content) return;

    // Set initial state - content starts below the viewport
    gsap.set(content, {
      yPercent: 100,
      opacity: 0,
      scale: 0.95
    });

    // Create the rising animation
    const animation = gsap.to(content, {
      yPercent: 0,
      opacity: 1,
      scale: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top top",
        scrub: 1,
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      <div 
        ref={contentRef}
        className="relative"
        style={{ willChange: 'transform' }}
      >
        {/* Gradient overlay at the top */}
        <div 
          className="absolute top-0 left-0 w-full pointer-events-none z-10"
          style={{
            height: '30vh',
            background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)',
          }}
        />
        {children}
      </div>
    </div>
  );
};

export default RisingSection;
