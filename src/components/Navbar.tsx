import { createContext, useState } from "react";
import { Menu, X, Zap, Search } from "lucide-react";
import { Frame, FutureButton, createPath, type Paths } from "@/components/ui/future-navbar";

export const MobileMenuContext = createContext<{
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  showMenu: true,
  setShowMenu: () => {},
});

const navLinks = [
  { label: "SERVIÇOS", href: "#services" },
  { label: "PROJETOS", href: "#projects" },
  { label: "PROCESSO", href: "#process" },
  { label: "PREÇOS", href: "#pricing" },
  { label: "CONTATO", href: "#contact" },
];

// 🎨 Direct color constants
const primaryStroke = "#4f46e5"; // Indigo
const primaryFill = "rgba(79, 70, 229, 0.2)";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setShowMenu(false);
  };

  // Frame paths for different sections
  const leftDecoPath: Paths = [
    createPath(primaryStroke, primaryFill, [
      ["M", "100%", "0"],
      ["L", "30%", "0"],
      ["L", "0", "30%"],
      ["L", "0", "70%"],
      ["L", "30%", "100%"],
      ["L", "100%", "100%"],
    ]),
  ];

  const rightDecoPath: Paths = [
    createPath(primaryStroke, primaryFill, [
      ["M", "0", "0"],
      ["L", "70%", "0"],
      ["L", "100%", "30%"],
      ["L", "100%", "70%"],
      ["L", "70%", "100%"],
      ["L", "0", "100%"],
    ]),
  ];

  const logoFramePath: Paths = [
    createPath(primaryStroke, primaryFill, [
      ["M", "0", "0"],
      ["L", "calc(100% - 20px)", "0"],
      ["L", "100%", "50%"],
      ["L", "calc(100% - 20px)", "100%"],
      ["L", "0", "100%"],
      ["L", "0", "0"],
    ]),
  ];

  const centerFramePath: Paths = [
    createPath(primaryStroke, primaryFill, [
      ["M", "20", "0"],
      ["L", "calc(100% - 20px)", "0"],
      ["L", "100%", "50%"],
      ["L", "calc(100% - 20px)", "100%"],
      ["L", "20", "100%"],
      ["L", "0", "50%"],
      ["L", "20", "0"],
    ]),
  ];

  const rightFramePath: Paths = [
    createPath(primaryStroke, primaryFill, [
      ["M", "20", "0"],
      ["L", "100%", "0"],
      ["L", "100%", "100%"],
      ["L", "20", "100%"],
      ["L", "0", "50%"],
      ["L", "20", "0"],
    ]),
  ];

  return (
    <MobileMenuContext.Provider value={{ showMenu, setShowMenu }}>
      <nav className="fixed left-0 right-0 top-0 z-50 flex justify-center py-6">
        <div className="relative mx-4">
          {/* Left decorative frame */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-16 hidden lg:block">
            <Frame enableBackdropBlur paths={leftDecoPath} />
          </div>

          {/* Main navbar container */}
          <div className="relative flex items-center">
            {/* Left section with logo */}
            <div className="relative px-6 py-4">
              <Frame enableBackdropBlur paths={logoFramePath} />
              <div className="relative flex items-center gap-2 pe-4">
                <Zap className="h-5 w-5 text-indigo-500" />
                <span className="text-lg font-bold text-white">Studio</span>
              </div>
            </div>

            {/* Center section with navigation */}
            <div className="relative hidden lg:block">
              <div className="relative px-8 py-4">
                <Frame enableBackdropBlur paths={centerFramePath} />
                <div className="relative flex items-center gap-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      className="text-sm font-medium tracking-wider text-white/80 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setShowMenu(true)}
              className="cursor-pointer ms-auto flex items-center gap-2 lg:hidden font-medium text-white px-4"
            >
              <Menu className="h-5 w-5" />
              Menu
            </button>

            {/* Right section with search and CTA */}
            <div className="relative hidden lg:flex items-center">
              <div className="relative px-6 py-4">
                <Frame enableBackdropBlur paths={rightFramePath} />
                <div className="relative flex items-center gap-4 ps-4">
                  <FutureButton
                    shape="flat"
                    enableBackdropBlur
                    className="text-sm px-4 py-1.5"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    <span className="text-white/60">Buscar...</span>
                    <span className="ml-4 text-xs text-white/40 border border-white/20 rounded px-1.5 py-0.5">
                      ⌘+k
                    </span>
                  </FutureButton>
                  <FutureButton
                    shape="default"
                    enableBackdropBlur
                    className="text-sm"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Começar
                  </FutureButton>
                </div>
              </div>
            </div>
          </div>

          {/* Right decorative frame */}
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-16 hidden lg:block">
            <Frame enableBackdropBlur paths={rightDecoPath} />
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
                  <FutureButton
                    shape="flat"
                    enableBackdropBlur
                    className="w-full justify-center"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Começar
                  </FutureButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </MobileMenuContext.Provider>
  );
}

export default Navbar;
