import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="hero-section">
      {/* Background Image */}
      <div className="hero-bg-wrapper">
        <img
          src={heroBg}
          alt="Freelance Web Developer Dubai, Framer Expert KSA, RTL UI/UX Design, AI Automation for Business Dubai"
          className="hero-bg-image"
        />
      </div>

      {/* Content */}
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
              I design and build high converting websites and save your time with AI automations
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
              <span className="hero-cta-text">Start Your Project</span>
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
  );
};

export default HeroSection;
