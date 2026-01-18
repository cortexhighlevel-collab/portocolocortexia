import { motion } from "framer-motion";

const FooterSection = () => {
  const socials = [
    { name: "Instagram", href: "https://instagram.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "X / Twitter", href: "https://twitter.com" },
  ];

  const navigation = [
    { name: "Soluções", href: "#services" },
    { name: "Metodologia", href: "#process" },
    { name: "Para Quem", href: "#para-quem" },
    { name: "Diagnóstico", href: "#contact" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <footer className="relative py-16 md:py-24 bg-background">

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white/30 text-xs uppercase tracking-[0.2em]">(Contato)</span>
            <a 
              href="mailto:reemtech0@gmail.com" 
              className="block text-white font-medium mt-2 hover:text-red-400 transition-colors"
            >
              reemtech0@gmail.com
            </a>
          </motion.div>

          {/* Socials Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-white/30 text-xs uppercase tracking-[0.2em]">(Redes Sociais)</span>
            <div className="flex flex-col gap-1 mt-2">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-red-400 transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-white/30 text-xs uppercase tracking-[0.2em]">(Navegação)</span>
            <div className="flex flex-col gap-1 mt-2">
              {navigation.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="text-white/70 hover:text-red-400 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Large Brand Text */}
        <motion.div
          className="relative text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 
            className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            CORTEX.IA
          </h2>
          
          {/* Glow effect behind text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-1/2 h-1/2 bg-red-500/10 blur-3xl rounded-full" />
          </div>
        </motion.div>

        {/* Bottom line */}
        <motion.div
          className="mt-12 pt-8 border-t border-white/5 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-white/30 text-sm">
            © 2026 CORTEX.IA — Inteligência Estratégica com IA
          </p>
          <p className="text-white/20 text-xs mt-2 font-mono">
            {'<structured for="AI reading" schema="Organization" />'}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;