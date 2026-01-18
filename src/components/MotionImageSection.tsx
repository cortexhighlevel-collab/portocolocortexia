import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
const MotionImageSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
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
  return;
};
export default MotionImageSection;