import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const MotionImageSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Image animation completes at 40% of scroll
  const yPercent = useTransform(scrollYProgress, [0, 0.4], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.95, 1]);

  // Gradient appears from 40% to 60% of scroll
  const gradientOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  
  // CORTEX text appears from 50% to 70% of scroll
  const cortexOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const cortexY = useTransform(scrollYProgress, [0.5, 0.7], [50, 0]);

  return (
    <div ref={sectionRef} className="relative" style={{ height: "300vh" }}>
      {/* Sticky Stage for Image - stays fixed until we scroll past the entire section */}
      <section className="sticky top-0 left-0 w-full h-screen flex items-end justify-center overflow-hidden bg-background pointer-events-none z-50">
        <motion.div
          className="w-full h-full flex items-end justify-center"
          style={{
            y: useTransform(yPercent, (v) => `${v}%`),
            opacity,
            scale,
            willChange: "transform, opacity",
          }}
        >
          {/* Dark Gradient Overlay - appears after image is in place */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-2/3 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 40%, black 100%)",
              opacity: gradientOpacity,
            }}
          />

          {/* Image */}
          <picture className="flex w-full h-full items-end justify-center">
            <img
              src="https://i.postimg.cc/1ztkf4hX/moveimage.png"
              alt="Motion Effect"
              className="w-full h-full object-cover block"
              style={{ objectPosition: "top center" }}
              loading="lazy"
            />
          </picture>
        </motion.div>
        
        {/* CORTEX Text - appears after gradient */}
        <motion.div 
          className="absolute bottom-20 left-0 w-full text-center z-20 pointer-events-none"
          style={{
            opacity: cortexOpacity,
            y: cortexY,
          }}
        >
          <h1 className="text-[15vw] font-black text-white tracking-tighter leading-none">
            CORTEX
          </h1>
        </motion.div>
      </section>
    </div>
  );
};

export default MotionImageSection;
