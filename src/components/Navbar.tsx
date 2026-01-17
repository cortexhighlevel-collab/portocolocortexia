import React, { createContext, useState, useRef, useEffect } from "react";
import { Zap, X } from "lucide-react";
import { Frame, type Paths } from "@/components/ui/future-navbar";

const navLinks = [
  { label: "SERVIÇOS", href: "#services" },
  { label: "PROJETOS", href: "#projects" },
  { label: "PROCESSO", href: "#process" },
  { label: "PREÇOS", href: "#pricing" },
  { label: "CONTATO", href: "#contact" },
];

export const MobileMenuContext = createContext<{
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  showMenu: true,
  setShowMenu: () => {},
});

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [centerWidth, setCenterWidth] = useState(0);
  const [navWidth, setNavWidth] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setCenterWidth(entry.contentRect.width);
      }
    });
    obs.observe(contentRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setNavWidth(entry.contentRect.width);
      }
    });
    obs.observe(navRef.current);
    return () => obs.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setShowMenu(false);
  };

  const tabPadding = 32;
  const tabWidth = centerWidth + tabPadding * 2;
  const halfTab = tabWidth / 2;

  // Responsive offsets
  // sideOffset controls where the bottom diagonal "cuts" end (bigger = closer to center)
  const sideOffset = navWidth < 640 ? 120 : navWidth < 1024 ? 200 : 320;

  // LED should follow the bottom sides
  const ledStartX = sideOffset;
  const ledEndX = `100% - ${sideOffset}`;

  

  // Main frame - glass effect (transparent)
  const mainFramePath: Paths = [
    {
      show: true,
      style: { 
        strokeWidth: "1", 
        stroke: "rgba(255,255,255,0.3)", 
        fill: "rgba(255,255,255,0.12)",
      },
      path: [
        ["M", "0", "5"],
        ["Q", "0", "0", "5", "0"],
        ["L", "100% - 5", "0"],
        ["Q", "100%", "0", "100%", "5"],
        ["L", `100% - ${sideOffset}`, `100% - 12`],
        ["L", `50% + ${halfTab + 30}`, `100% - 12`],
        ["L", `50% + ${halfTab}`, `100% + 14`],
        ["L", `50% - ${halfTab}`, `100% + 14`],
        ["L", `50% - ${halfTab + 30}`, `100% - 12`],
        ["L", `${sideOffset}`, `100% - 12`],
        ["L", "0", "5"],
        ["Z"],
      ],
    },
  ];


  return (
    <MobileMenuContext.Provider value={{ showMenu, setShowMenu }}>
      <nav className="fixed left-0 right-0 top-0 z-50 px-4 lg:px-8 pt-6 lg:pt-8">

        <div ref={navRef} className="h-8 mt-4 mx-2 lg:-mt-px lg:-mx-px w-full relative top-0 inset-x-0 z-40">
          {/* Main glass frame */}
          <div className="absolute inset-0 w-full h-full z-10">
            <Frame enableBackdropBlur className="backdrop-blur-2xl" paths={mainFramePath} />
          </div>


          {/* Left LED line - gradient red to purple */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
            <Frame 
              paths={[
                {
                  show: true,
                  style: { 
                    strokeWidth: "3", 
                    stroke: "url(#ledGradientLeft)", 
                    fill: "transparent",
                  },
                  path: [
                    ["M", ledStartX, "100%"],
                    ["L", `50% - ${halfTab + 35}`, "100%"],
                    ["L", `50% - ${halfTab}`, "100% + 26"],
                  ],
                },
              ]}
            />
          </div>

          {/* Right LED line - gradient purple to red */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
            <Frame 
              paths={[
                {
                  show: true,
                  style: { 
                    strokeWidth: "3", 
                    stroke: "url(#ledGradientRight)", 
                    fill: "transparent",
                  },
                  path: [
                    ["M", ledEndX, "100%"],
                    ["L", `50% + ${halfTab + 35}`, "100%"],
                    ["L", `50% + ${halfTab}`, "100% + 26"],
                  ],
                },
              ]}
            />
          </div>

          {/* Navigation content */}
          <div className="relative w-full h-full flex justify-center z-30">
            <div ref={contentRef} className="flex-none flex items-center mt-6 px-8 pb-4">
              <div className="hidden lg:flex gap-10 font-medium text-sm">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-white/90 hover:text-white transition-colors tracking-[0.2em] font-semibold"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div
                onClick={() => setShowMenu(true)}
                className="cursor-pointer ms-auto flex items-center gap-2 lg:hidden font-medium text-white"
              >
                <Zap className="size-4" />
                Menu
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute left-4 right-4 top-24">
            <div 
              className="relative overflow-hidden rounded-lg p-6 backdrop-blur-xl"
              style={{
                background: "rgba(20,20,30,0.8)",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 0 30px rgba(0,0,0,0.5)"
              }}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-lg font-bold text-white tracking-widest">MENU</span>
                <button
                  onClick={() => setShowMenu(false)}
                  className="text-white/80 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-lg font-semibold text-white/80 transition-colors hover:text-white tracking-[0.2em]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </MobileMenuContext.Provider>
  );
}

export default Navbar;
