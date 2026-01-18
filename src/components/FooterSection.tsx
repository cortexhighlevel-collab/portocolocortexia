import { motion } from "framer-motion";

const FooterSection = () => {
  const links = [
    { label: "Problema", href: "#problema" },
    { label: "Soluções", href: "#services" },
    { label: "Método", href: "#process" },
    { label: "Casos", href: "#projects" },
    { label: "FAQ", href: "#faq" },
    { label: "Contato", href: "#contact" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="relative py-20 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Main content */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-16 mb-20">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 
              className="text-5xl md:text-7xl font-bold"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              CORTEX.IA
            </h2>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            className="flex flex-wrap gap-x-10 gap-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-white/30 hover:text-red-400 transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        </div>

        {/* Bottom line */}
        <motion.div
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-white/20 text-sm">
            © 2026 CORTEX.IA — Inteligência Estratégica com IA
          </p>
          <a 
            href="mailto:reemtech0@gmail.com"
            className="text-white/20 hover:text-red-400 transition-colors text-sm"
          >
            reemtech0@gmail.com
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;