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
          {/* Container principal - fundo metálico cinza */}
          <div className="relative bg-gradient-to-b from-[#6a6a6a] via-[#4a4a4a] to-[#3a3a3a] px-12 py-5 rounded-lg border border-[#7a7a7a]/30 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
            
            {/* Reflexo metálico superior (brilho branco) */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-t-lg"></div>
            
            {/* Linha cyan no topo esquerdo */}
            <div className="absolute top-0 left-0 w-[35%] h-[2px] bg-gradient-to-r from-cyan-400 via-cyan-400 to-transparent rounded-tl-lg"></div>
            
            {/* Linha roxa no topo direito */}
            <div className="absolute top-0 right-0 w-[35%] h-[2px] bg-gradient-to-l from-purple-500 via-purple-500 to-transparent rounded-tr-lg"></div>
            
            {/* Reflexo superior do metal */}
            <div className="absolute inset-x-0 top-[2px] h-[40%] bg-gradient-to-b from-white/15 via-white/5 to-transparent pointer-events-none rounded-t-lg"></div>
            
            {/* Links de navegação */}
            <div className="flex items-center justify-center gap-12 relative z-10 mb-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-sm font-medium tracking-[0.25em] text-white/90 hover:text-white transition-colors duration-300 uppercase"
                >
                  {link.label}
                </a>
              ))}
            </div>
            
            {/* Barra neon vermelha abaixo dos links */}
            <div className="absolute bottom-3 left-8 right-8 h-[3px] rounded-full overflow-hidden">
              {/* Base vermelha com glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff2020] to-transparent shadow-[0_0_8px_#ff0000,0_0_16px_#ff0000,0_0_32px_#ff0000]"></div>
              {/* Núcleo branco */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            </div>
            
            {/* Sombra inferior interna sutil */}
            <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-b-lg"></div>
          </div>
          
          {/* Glow externo sutil */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 blur-xl -z-10 rounded-lg"></div>
        </div>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 md:hidden bg-gradient-to-b from-[#6a6a6a] via-[#4a4a4a] to-[#3a3a3a] p-3 rounded-lg border border-[#7a7a7a]/30 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.6)]"
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
          <nav className="absolute top-20 left-4 right-4 bg-gradient-to-b from-[#6a6a6a] via-[#4a4a4a] to-[#3a3a3a] p-6 rounded-lg border border-[#7a7a7a]/30 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)]">
            {/* Linha cyan topo esquerdo mobile */}
            <div className="absolute top-0 left-0 w-[40%] h-[2px] bg-gradient-to-r from-cyan-400 to-transparent rounded-tl-lg"></div>
            {/* Linha roxa topo direito mobile */}
            <div className="absolute top-0 right-0 w-[40%] h-[2px] bg-gradient-to-l from-purple-500 to-transparent rounded-tr-lg"></div>
            
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-lg font-medium tracking-[0.2em] text-white/90 hover:text-white transition-colors py-2 uppercase"
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