import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Serviços", href: "#services" },
  { label: "Projetos", href: "#projects" },
  { label: "Processo", href: "#process" },
  { label: "Preços", href: "#pricing" },
  { label: "Contato", href: "#contact" },
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
        <div className="nav-glass px-8 py-4">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="nav-link text-sm font-medium tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 md:hidden nav-glass p-3"
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
          <nav className="absolute top-20 left-4 right-4 nav-glass p-6 rounded-2xl">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="nav-link text-lg font-medium tracking-wide py-2"
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
