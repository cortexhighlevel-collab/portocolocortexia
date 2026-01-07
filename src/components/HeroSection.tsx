import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import VimeoScrollVideo from "./VimeoScrollVideo";

const HeroSection = () => {
  // ID do vídeo do Vimeo
  const vimeoVideoId = "1152111785";

  return (
    <>
      {/* Vimeo Video controlled by scroll */}
      <VimeoScrollVideo videoId={vimeoVideoId} />
      
      <section className="hero-section hero-section-fixed">
        <div className="hero-content">
          <div className="hero-content-inner">
            {/* Headline and CTA */}
            <div className="hero-top-content">
              <motion.h1
                className="hero-headline"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Eu crio e desenvolvo sites de alta conversão e economizo seu tempo com automações de IA
              </motion.h1>

              <motion.a
                href="https://tidycal.com/reemtech/30-minute-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-button group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="hero-cta-text">Iniciar Seu Projeto</span>
                <div className="hero-cta-icon">
                  <ArrowUpRight className="w-5 h-5 text-primary-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.a>
            </div>

            {/* Large Name */}
            <motion.div
              className="hero-name-wrapper"
              initial={{ opacity: 0, y: 190, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <h1 className="hero-name">Reem</h1>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
