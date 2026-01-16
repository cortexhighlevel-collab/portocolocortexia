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
          {/* Fundo principal - cinza metálico claro/prateado */}
          <div 
            className="relative px-16 pt-4 pb-6 rounded-xl overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #8a8a8a 0%, #5a5a5a 40%, #4a4a4a 100%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
            }}
          >
            {/* Linha de reflexo branca no topo */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/50"></div>
            
            {/* Linha cyan no topo - lado esquerdo */}
            <div 
              className="absolute top-0 left-0 h-[3px] rounded-tl-xl"
              style={{
                width: '35%',
                background: 'linear-gradient(90deg, #00d4ff 0%, #00d4ff 70%, transparent 100%)',
                boxShadow: '0 0 8px #00d4ff, 0 0 16px #00d4ff'
              }}
            ></div>
            
            {/* Linha roxa no topo - lado direito */}
            <div 
              className="absolute top-0 right-0 h-[3px] rounded-tr-xl"
              style={{
                width: '35%',
                background: 'linear-gradient(270deg, #a855f7 0%, #a855f7 70%, transparent 100%)',
                boxShadow: '0 0 8px #a855f7, 0 0 16px #a855f7'
              }}
            ></div>
            
            {/* Reflexo metálico superior */}
            <div 
              className="absolute top-0 left-0 right-0 pointer-events-none rounded-t-xl"
              style={{
                height: '50%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)'
              }}
            ></div>
            
            {/* Links de navegação */}
            <div className="flex items-center justify-center gap-14 relative z-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-[13px] font-semibold tracking-[0.3em] text-white hover:text-white/80 transition-colors duration-300 uppercase"
                >
                  {link.label}
                </a>
              ))}
            </div>
            
            {/* Barra neon vermelha abaixo dos links */}
            <div 
              className="absolute bottom-2 left-12 right-12 h-[4px] rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #ff1a1a 15%, #ff1a1a 85%, transparent 100%)',
                boxShadow: '0 0 6px #ff0000, 0 0 12px #ff0000, 0 0 24px #ff0000, 0 2px 8px rgba(255,0,0,0.5)'
              }}
            >
              {/* Núcleo branco/claro */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 15%, rgba(255,255,255,0.5) 85%, transparent 100%)'
                }}
              ></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 md:hidden p-3 rounded-xl"
        style={{
          background: 'linear-gradient(180deg, #8a8a8a 0%, #5a5a5a 40%, #4a4a4a 100%)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
        }}
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
          <nav 
            className="absolute top-20 left-4 right-4 p-6 rounded-xl overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #8a8a8a 0%, #5a5a5a 40%, #4a4a4a 100%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
            }}
          >
            {/* Linha cyan topo esquerdo mobile */}
            <div 
              className="absolute top-0 left-0 w-[40%] h-[3px] rounded-tl-xl"
              style={{
                background: 'linear-gradient(90deg, #00d4ff 0%, transparent 100%)',
                boxShadow: '0 0 8px #00d4ff'
              }}
            ></div>
            {/* Linha roxa topo direito mobile */}
            <div 
              className="absolute top-0 right-0 w-[40%] h-[3px] rounded-tr-xl"
              style={{
                background: 'linear-gradient(270deg, #a855f7 0%, transparent 100%)',
                boxShadow: '0 0 8px #a855f7'
              }}
            ></div>
            
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-lg font-semibold tracking-[0.2em] text-white hover:text-white/80 transition-colors py-2 uppercase"
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