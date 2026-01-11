import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const MotionImageSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Image starts at 50% and moves up to 0%
  const yPercent = useTransform(scrollYProgress, [0, 0.65], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.65], [0.95, 1]);

  // Gradient appears after the image is in place (towards the end of the scroll)
  const gradientOpacity = useTransform(scrollYProgress, [0.75, 1], [0, 1]);

  return (
    <div ref={sectionRef} className="relative" style={{ height: "240vh" }}>
      {/* Sticky Stage for Image (covers the viewport until the sequence ends) */}
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
      </section>
    </div>
  );
};

export default MotionImageSection;
