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
  const [centerWidth, setCenterWidth] = useState(0);

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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setShowMenu(false);
  };

  const primaryStroke = "#ffffff";
  const primaryFill = "transparent";

  const tabPadding = 32;
  const tabWidth = centerWidth + tabPadding * 2;
  const halfTab = tabWidth / 2;

  const combinedPaths: Paths = [
    {
      show: true,
      style: { strokeWidth: "1", stroke: primaryStroke, fill: primaryFill },
      path: [
        ["M", "0", "5"],
        ["Q", "0", "0", "5", "0"],
        ["L", "100% - 5", "0"],
        ["Q", "100%", "0", "100%", "5"],
        ["L", `100% - 60`, `100% - 12`],
        ["L", `50% + ${halfTab + 30}`, `100% - 12`],
        ["L", `50% + ${halfTab}`, `100% + 14`],
        ["L", `50% - ${halfTab}`, `100% + 14`],
        ["L", `50% - ${halfTab + 30}`, `100% - 12`],
        ["L", "60", `100% - 12`],
        ["L", "0", "5"],
        ["Z"],
      ],
    },
    {
      show: true,
      style: { strokeWidth: "1", stroke: primaryStroke, fill: "transparent", opacity: 1 },
      path: [
        ["M", "6%", "100%"],
        ["L", `50% - ${halfTab + 35}`, "100%"],
        ["L", `50% - ${halfTab}`, `100% + 26`],
      ],
    },
    {
      show: true,
      style: { strokeWidth: "1", stroke: primaryStroke, fill: "transparent", opacity: 1 },
      path: [
        ["M", "94%", "100%"],
        ["L", `50% + ${halfTab + 35}`, "100%"],
        ["L", `50% + ${halfTab}`, `100% + 26`],
      ],
    },
  ];

  return (
    <MobileMenuContext.Provider value={{ showMenu, setShowMenu }}>
      <nav className="fixed left-0 right-0 top-0 z-50 px-8 pt-8">
        <div className="h-12 mt-2 mx-2 lg:-mt-px lg:-mx-px w-full relative top-0 inset-x-0 z-40">
          <div className="absolute inset-0 w-full h-full z-10">
            <Frame enableBackdropBlur className="" paths={combinedPaths} />
          </div>

          <div className="relative w-full h-full flex justify-center z-20">
            <div ref={contentRef} className="flex-none flex items-center mt-6 px-8 pb-4">
              <a href="#" className="me-16 font-bold text-white tracking-widest uppercase text-sm flex items-center gap-2">
                <Zap className="h-5 w-5 text-indigo-500" />
                Studio
              </a>
              <div className="hidden lg:flex gap-8 font-medium text-slate-300 text-sm">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="hover:text-white transition-colors tracking-wider"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div
                onClick={() => setShowMenu(true)}
                className="cursor-pointer ms-auto flex items-center gap-2 lg:hidden font-medium text-slate-300"
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
          <div className="absolute left-4 right-4 top-20">
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/80 p-6 backdrop-blur-xl">
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

              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-lg font-medium text-white/80 transition-colors hover:text-white tracking-wider"
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
