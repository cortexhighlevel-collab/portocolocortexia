import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface HeroTransitionProps {
  children: React.ReactNode;
}

const HeroTransition = ({ children }: HeroTransitionProps) => {
  const imageMotionRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Scroll Suave (Lenis)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 2. Configuração Inicial - A imagem começa totalmente para baixo (fora da tela)
    gsap.set(imageMotionRef.current, {
      yPercent: 100,
      opacity: 0,
      scale: 0.95,
    });

    // 3. Animação de Subida - Ela sobe até preencher a tela
    gsap.to(imageMotionRef.current, {
      yPercent: 0,
      opacity: 1,
      scale: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="hero-transition-section">
      <div ref={imageMotionRef} className="image-motion">
        {/* Gradient overlay */}
        <div className="image-motion-gradient" />
        {children}
      </div>
    </section>
  );
};

export default HeroTransition;
