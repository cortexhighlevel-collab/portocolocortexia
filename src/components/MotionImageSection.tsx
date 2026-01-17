import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const MotionImageSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
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
    <section ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="relative w-full h-full"
          style={{ opacity, scale, y: yPercent }}
        >
          {/* Placeholder content - can be customized */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
          
          {/* Gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
            style={{ opacity: gradientOpacity }}
          />
          
          {/* CORTEX text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: cortexOpacity, y: cortexY }}
          >
            <h2 className="text-6xl md:text-8xl font-bold text-white/10 tracking-widest">
              CORTEX
            </h2>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MotionImageSection;