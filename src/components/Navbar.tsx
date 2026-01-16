import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "SERVIÇOS", href: "#services" },
  { label: "PROJETOS", href: "#projects" },
  { label: "PROCESSO", href: "#process" },
  { label: "PREÇOS", href: "#pricing" },
  { label: "CONTATO", href: "#contact" },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setShowMenu(false);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex justify-center py-6">
      <div className="relative mx-4">
        {/* SVG Frame Background */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 700 80"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Main shape with indigo glow */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(79, 70, 229, 0.3)" />
              <stop offset="100%" stopColor="rgba(79, 70, 229, 0.1)" />
            </linearGradient>
          </defs>
          
          {/* Outer frame */}
          <path
            d="M50 5 L650 5 Q695 5 695 40 L695 40 Q695 75 650 75 L50 75 Q5 75 5 40 L5 40 Q5 5 50 5"
            fill="url(#bgGradient)"
            stroke="#4f46e5"
            strokeWidth="1.5"
            filter="url(#glow)"
            className="backdrop-blur-xl"
          />
          
          {/* Inner accent line */}
          <path
            d="M60 12 L640 12 Q680 12 680 38 L680 42 Q680 68 640 68 L60 68 Q20 68 20 42 L20 38 Q20 12 60 12"
            fill="none"
            stroke="rgba(79, 70, 229, 0.4)"
            strokeWidth="0.5"
          />
        </svg>

        {/* Backdrop blur layer */}
        <div className="absolute inset-0 rounded-[2rem] backdrop-blur-xl" />

        {/* Content */}
        <div className="relative flex items-center justify-between gap-8 px-10 py-5">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Zap className="h-6 w-6 text-indigo-500" />
              <div className="absolute inset-0 animate-pulse blur-md">
                <Zap className="h-6 w-6 text-indigo-500" />
              </div>
            </div>
            <span className="text-lg font-bold text-white">Studio</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="relative text-sm font-medium tracking-wider text-white/70 transition-all duration-300 hover:text-white group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMenu(true)}
            className="flex cursor-pointer items-center gap-2 font-medium text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <button className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:shadow-indigo-500/50">
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Começar
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute left-4 right-4 top-20">
            <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-black/80 p-6 backdrop-blur-xl">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-6 w-6 text-indigo-500" />
                  <span className="text-lg font-bold text-white">Studio</span>
                </div>
                <button
                  onClick={() => setShowMenu(false)}
                  className="text-white/80 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="py-2 text-lg font-medium tracking-wide text-white/80 transition-colors hover:text-indigo-400"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6">
                <button className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30">
                  <span className="flex items-center justify-center gap-2">
                    <Zap className="h-4 w-4" />
                    Começar
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
