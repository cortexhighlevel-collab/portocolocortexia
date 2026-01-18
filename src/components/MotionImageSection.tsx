import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

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
    <section 
      ref={sectionRef}
      className="relative h-[200vh] bg-black"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Animated Image */}
        <motion.div 
          className="absolute inset-0"
          style={{ 
            y: yPercent, 
            opacity, 
            scale 
          }}
        >
          <img 
            src={heroBg} 
            alt="Background"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"
          style={{ opacity: gradientOpacity }}
        />

        {/* CORTEX text */}
        <motion.div 
          className="relative z-10 text-center"
          style={{ opacity: cortexOpacity, y: cortexY }}
        >
          <h2 className="text-6xl md:text-9xl font-bold text-white tracking-tighter">
            CORTEX
          </h2>
          <p className="text-white/60 text-lg md:text-xl mt-4 font-light">
            Inteligência que executa
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MotionImageSection;
