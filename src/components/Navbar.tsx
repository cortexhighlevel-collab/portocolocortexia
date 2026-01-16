import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "SERVIÇOS", href: "#services" },
  { label: "PROJETOS", href: "#projects" },
  { label: "PROCESSO", href: "#process" },
  { label: "PREÇOS", href: "#pricing" },
  { label: "CONTATO", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <div className="relative">
          {/* Borda superior com gradiente colorido */}
          <div className="absolute -top-[2px] left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-transparent to-purple-500 rounded-t-full"></div>
          
          {/* Container principal do navbar */}
          <div className="relative bg-gradient-to-b from-[#3a3a3a] via-[#1a1a1a] to-[#0a0a0a] px-10 py-4 rounded-full border border-[#4a4a4a]/50 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.1)]">
            
            {/* Reflexo superior metálico */}
            <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none rounded-t-full"></div>
            
            {/* Linha de reflexo fina no topo */}
            <div className="absolute inset-x-4 top-[1px] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            
            {/* Barra neon vermelha superior */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-gradient-to-r from-transparent via-[#ff3333] to-transparent shadow-[0_0_4px_#ff0000,0_0_8px_#ff0000,0_0_16px_#ff0000]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            </div>
            
            {/* Links de navegação */}
            <div className="flex items-center gap-10 relative z-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-sm font-medium tracking-[0.2em] text-white/80 hover:text-white transition-colors duration-300 uppercase"
                >
                  {link.label}
                </a>
              ))}
            </div>
            
            {/* Barra neon vermelha inferior */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[70%] h-[3px] bg-gradient-to-r from-transparent via-[#ff2a2a] to-transparent shadow-[0_0_6px_#ff0000,0_0_12px_#ff0000,0_0_24px_#ff0000]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            </div>
          </div>
          
          {/* Sombra/glow inferior */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-gradient-to-r from-cyan-500/20 via-red-500/30 to-purple-500/20 blur-xl"></div>
        </div>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 md:hidden bg-gradient-to-b from-[#3a3a3a] via-[#1a1a1a] to-[#0a0a0a] p-3 rounded-full border border-[#4a4a4a]/50 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.8)]"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
          <nav className="absolute top-20 left-4 right-4 bg-gradient-to-b from-[#3a3a3a] via-[#1a1a1a] to-[#0a0a0a] p-6 rounded-2xl border border-[#4a4a4a]/50 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.8)]">
            {/* Borda superior colorida mobile */}
            <div className="absolute -top-[2px] left-4 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-transparent to-purple-500 rounded-t-full"></div>
            
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-lg font-medium tracking-[0.2em] text-white/80 hover:text-white transition-colors py-2 uppercase"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
