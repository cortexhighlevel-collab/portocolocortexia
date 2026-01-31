import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToContact = () => {
    const element = document.querySelector("#contato");
    if (element) {
      const NAV_OFFSET = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "PROBLEMA", href: "#problema" },
    { label: "SOLUÇÕES", href: "#solucoes" },
    { label: "MÉTODO", href: "#metodologia" },
    { label: "CASOS", href: "#cases" },
    { label: "FAQ", href: "#faq" },
    { label: "CONTATO", href: "#contato" },
  ];

  return (
    <>
      <footer className="relative bg-[#030303] overflow-hidden">
        {/* Circuit pattern background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(239,68,68,0.2) 1px, transparent 1px),
              linear-gradient(rgba(239,68,68,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Top border with gradient */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

        {/* Main content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-8 md:py-16">
          {/* Desktop: Full content */}
          <div className="hidden md:block">
            {/* Top section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              {/* Logo e descrição */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-30" />
                  </div>
                  <span className="text-white font-bold text-xl tracking-wider">CORTEX</span>
                  <span className="text-red-500 font-bold text-xl">OPS</span>
                </div>
                <p className="text-white/40 text-sm font-mono leading-relaxed max-w-xs">
                  Inteligência aplicada para negócios que querem dominar a era da IA.
                </p>
                {/* Status indicator */}
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-green-500/5 border border-green-500/20 rounded">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs font-mono uppercase tracking-wider">SYSTEMS ONLINE</span>
                </div>
              </div>

              {/* Navigation */}
              <div className="space-y-6">
                <h4 className="text-white/60 text-xs font-mono tracking-widest uppercase flex items-center gap-2">
                  <span className="w-4 h-px bg-red-500/50" />
                  NAVIGATION
                </h4>
                <nav className="grid grid-cols-2 gap-3">
                  {navLinks.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      className="text-white/40 text-sm font-mono hover:text-red-500 transition-colors flex items-center gap-2 group"
                      whileHover={{ x: 4 }}
                    >
                      <span className="w-1 h-1 bg-red-500/30 group-hover:bg-red-500 transition-colors" />
                      {link.label}
                    </motion.a>
                  ))}
                </nav>
              </div>

              {/* Contact/CTA */}
              <div className="space-y-6">
                <h4 className="text-white/60 text-xs font-mono tracking-widest uppercase flex items-center gap-2">
                  <span className="w-4 h-px bg-red-500/50" />
                  CONNECT
                </h4>
                <div className="space-y-4">
                  <button 
                    onClick={handleScrollToContact}
                    className="group relative inline-block cursor-pointer"
                  >
                    <div 
                      className="relative px-6 py-3 bg-[#0a0a0a] border border-red-500/30 hover:border-red-500/60 transition-all"
                      style={{
                        clipPath: "polygon(0 8px, 8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
                      }}
                    >
                      <span className="text-red-500 text-sm font-mono uppercase tracking-wider">
                        INICIAR_CONEXÃO
                      </span>
                    </div>
                    {/* Corner accents */}
                    <svg className="absolute top-0 left-0 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" width="20" height="20">
                      <line x1="0" y1="8" x2="8" y2="0" stroke="#ef4444" strokeWidth="1" />
                    </svg>
                  </button>
                  
                  <div className="text-white/30 text-xs font-mono">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-red-500/60">//</span>
                      contato@cortexops.com
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider - Desktop only */}
            <div className="relative py-8">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-white/5" />
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-[#030303] px-4">
                <div className="w-2 h-2 border border-red-500/30 rotate-45" />
                <div className="w-1 h-1 bg-red-500/50" />
                <div className="w-2 h-2 border border-red-500/30 rotate-45" />
              </div>
            </div>
          </div>

          {/* Mobile: Simplified content */}
          <div className="md:hidden flex flex-col items-center text-center space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span className="text-white font-bold text-lg tracking-wider">CORTEX</span>
              <span className="text-red-500 font-bold text-lg">OPS</span>
            </div>
            
            {/* CTA Button */}
            <button 
              onClick={handleScrollToContact}
              className="px-6 py-2.5 bg-red-500/10 border border-red-500/40 text-red-500 text-sm font-mono uppercase tracking-wider hover:bg-red-500/20 transition-colors cursor-pointer"
            >
              INICIAR_CONEXÃO
            </button>

            {/* Divider */}
            <div className="w-16 h-px bg-white/10" />

            {/* Copyright */}
            <p className="text-white/30 text-xs font-mono">
              © {currentYear} CORTEX OPS
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-white/20 text-xs font-mono">
              <Link to="/termos-de-uso" className="hover:text-red-500 transition-colors">
                Termos
              </Link>
              <span className="text-white/10">|</span>
              <Link to="/politica-de-privacidade" className="hover:text-red-500 transition-colors">
                Privacidade
              </Link>
            </div>
          </div>

          {/* Bottom section - Desktop only */}
          <div className="hidden md:flex flex-row items-center justify-between gap-6">
            {/* Version info */}
            <div className="flex items-center gap-4 text-white/20 text-xs font-mono">
              <span className="flex items-center gap-2">
                <span className="text-red-500/40">[</span>
                SYS.v2.0.{currentYear}
                <span className="text-red-500/40">]</span>
              </span>
              <span className="text-white/10">|</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500/40 rounded-full" />
                BUILD_STABLE
              </span>
            </div>

            {/* Copyright & Legal Links */}
            <div className="flex flex-col md:flex-row items-center gap-3 text-white/20 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-red-500/40">&lt;</span>
                © {currentYear} CORTEX OPS. All rights reserved.
                <span className="text-red-500/40">/&gt;</span>
              </div>
              <div className="flex items-center gap-4">
                <Link 
                  to="/termos-de-uso" 
                  className="hover:text-red-500 transition-colors"
                >
                  Termos de Uso
                </Link>
                <span className="text-white/10">|</span>
                <Link 
                  to="/politica-de-privacidade" 
                  className="hover:text-red-500 transition-colors"
                >
                  Política de Privacidade
                </Link>
              </div>
            </div>

            {/* Tech stack indicator */}
            <div className="flex items-center gap-3 text-white/15 text-xs font-mono">
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500/30" />
                REACT
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500/30" />
                AI.POWERED
              </span>
            </div>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute bottom-0 left-0 pointer-events-none">
          <svg width="100" height="100" className="text-red-500/10">
            <line x1="0" y1="100" x2="0" y2="60" stroke="currentColor" strokeWidth="2" />
            <line x1="0" y1="100" x2="40" y2="100" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 pointer-events-none">
          <svg width="100" height="100" className="text-red-500/10">
            <line x1="100" y1="100" x2="100" y2="60" stroke="currentColor" strokeWidth="2" />
            <line x1="100" y1="100" x2="60" y2="100" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* Scan line effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/[0.02] to-transparent pointer-events-none"
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </footer>
    </>
  );
};

export default FooterSection;
