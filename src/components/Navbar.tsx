import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Serviços", href: "#services", hasDropdown: true },
  { label: "Projetos", href: "#projects" },
  { label: "Processo", href: "#process", hasDropdown: true },
  { label: "Contato", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block w-[calc(100%-48px)] max-w-[1200px]">
        <div className="nav-glass-new px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <span className="text-background font-bold text-lg">R</span>
            </div>
          </div>

          {/* Center Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="nav-link-new text-sm font-normal px-4 py-2 rounded-full transition-colors hover:bg-white/10"
              >
                {link.label}
                {link.hasDropdown && (
                  <span className="ml-1 opacity-60">▾</span>
                )}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="https://tidycal.com/reemtech/30-minute-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta-button group"
          >
            <ArrowUpRight className="w-4 h-4 text-background transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="text-sm font-medium">Start now</span>
          </a>
        </div>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 md:hidden nav-glass-new p-3"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <Menu className="w-6 h-6 text-foreground" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
          <nav className="absolute top-20 left-4 right-4 nav-glass-new p-6 rounded-2xl">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="nav-link-new text-lg font-normal py-3 px-4 rounded-xl hover:bg-white/10"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://tidycal.com/reemtech/30-minute-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta-button mt-4 justify-center"
              >
                <ArrowUpRight className="w-4 h-4 text-background" />
                <span className="text-sm font-medium">Start now</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
