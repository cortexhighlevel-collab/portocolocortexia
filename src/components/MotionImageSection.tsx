import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const MotionImageSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Image starts at 80% (closer to visible) and moves up to 0%
  const yPercent = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <div 
      ref={sectionRef}
      className="relative"
      style={{ height: '300vh' }}
    >
      {/* Fixed Stage for Image */}
      <section 
        className="fixed top-0 left-0 w-full h-screen flex items-end justify-center overflow-hidden pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <motion.div 
          className="w-full h-full flex items-end justify-center"
          style={{
            y: useTransform(yPercent, (v) => `${v}%`),
            opacity,
            scale,
            willChange: 'transform, opacity'
          }}
        >
          {/* Image */}
          <picture className="flex w-full h-full items-end justify-center">
            <img 
              src="https://i.postimg.cc/1ztkf4hX/moveimage.png"
              alt="Motion Effect"
              className="w-full h-full object-cover block"
              style={{ objectPosition: 'top center' }}
            />
          </picture>
        </motion.div>
      </section>
    </div>
  );
};

export default MotionImageSection;
