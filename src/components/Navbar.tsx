import React, { createContext, useState, useRef, useEffect } from "react";
import { Zap, X } from "lucide-react";
import { Frame, type Paths } from "@/components/ui/future-navbar";
import NavbarGlassBackdrop from "@/components/NavbarGlassBackdrop";

const navLinks = [
  { label: "PROBLEMA", href: "#problema" },
  { label: "SOLUÇÕES", href: "#services" },
  { label: "MÉTODO", href: "#process" },
  { label: "CASOS", href: "#projects" },
  { label: "FAQ", href: "#faq" },
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
      // Ensure hash navigation jumps past the 300vh sticky hero (avoid "black screen" during smooth scroll)
      const NAV_OFFSET = 140; // accounts for the fixed navbar
      const top = element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

      const root = document.documentElement;
      const prevScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo({ top });
      root.style.scrollBehavior = prevScrollBehavior;

      // Update URL hash without triggering another scroll
      window.history.pushState(null, "", href);
    }

    setShowMenu(false);
  };

  const tabPadding = 32;
  const tabWidth = centerWidth + tabPadding * 2;
  const halfTab = tabWidth / 2;

  const sideOffset = navWidth < 640 ? 120 : navWidth < 1024 ? 200 : 320;
  const topOffset = navWidth < 640 ? 110 : navWidth < 1024 ? 180 : 280;
  const topCorner = navWidth < 640 ? 2 : navWidth < 1024 ? 3 : 4;
  const topInset = 2;
  const ledStartX = sideOffset;
  const ledEndX = `100% - ${sideOffset}`;

  const mainFramePath: Paths = [
    {
      show: true,
      style: {
        strokeWidth: "1",
        stroke: "rgba(255,255,255,0.3)",
        fill: "rgba(255,255,255,0.12)",
        strokeLinejoin: "round",
        strokeLinecap: "round",
      },
      path: [
        ["M", sideOffset, `100% - 12`],
        ["L", `${topOffset + topCorner}`, `${topCorner + topInset}`],
        ["Q", topOffset, `${topInset}`, `${topOffset + topCorner * 2}`, `${topInset}`],
        ["L", `100% - ${topOffset + topCorner * 2}`, `${topInset}`],
        ["Q", `100% - ${topOffset}`, `${topInset}`, `100% - ${topOffset + topCorner}`, `${topCorner + topInset}`],
        ["L", `100% - ${sideOffset}`, `100% - 12`],
        ["L", `50% + ${halfTab + 30}`, `100% - 12`],
        ["L", `50% + ${halfTab}`, `100% + 14`],
        ["L", `50% - ${halfTab}`, `100% + 14`],
        ["L", `50% - ${halfTab + 30}`, `100% - 12`],
        ["Z"],
      ],
    },
  ];

  return (
    <MobileMenuContext.Provider value={{ showMenu, setShowMenu }}>
      <nav className="fixed left-0 right-0 top-0 z-[100] px-4 lg:px-8 pt-2 lg:pt-3 scale-[0.88] origin-top">
        <div ref={navRef} className="h-11 mt-1 mx-2 lg:-mt-1 lg:-mx-px w-full relative top-0 inset-x-0 z-40">
          <div className="absolute inset-0 w-full h-full z-10">
            <NavbarGlassBackdrop className="z-0" path={mainFramePath[0].path} />
            <Frame className="z-10" paths={mainFramePath} />
          </div>

          <div 
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              top: '60px',
              width: '27%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, #ff2244 10%, #ff3355 30%, #ff4466 50%, #ff3355 70%, #ff2244 90%, transparent 100%)',
              boxShadow: '0 0 3px 1px rgba(255, 34, 68, 0.3), 0 0 6px 2px rgba(255, 34, 68, 0.2), 0 0 10px 3px rgba(255, 34, 68, 0.1)',
              zIndex: 25,
            }}
          />

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

          <div className="absolute inset-0 w-full h-full flex items-center justify-center z-30">
            <div ref={contentRef} className="flex-none flex items-center px-8 mt-4">
              <div className="hidden lg:flex gap-10 font-medium text-base">
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