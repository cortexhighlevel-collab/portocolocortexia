import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // IMPORTANTE: no iOS, iniciar como `undefined` faz o app renderizar como desktop
  // e, depois do effect, re-renderizar como mobile (carrega tudo 2x e pode derrubar o WebKit).
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // iOS/Safari antigos: MediaQueryList pode não suportar addEventListener.
    // Mantém compatibilidade sem alterar comportamento.
    const supportsAddEventListener = typeof (mql as MediaQueryList).addEventListener === "function";
    if (supportsAddEventListener) {
      mql.addEventListener("change", onChange);
    } else {
      // eslint-disable-next-line deprecation/deprecation
      (mql as unknown as { addListener: (cb: () => void) => void }).addListener(onChange);
    }
    // Garante consistência mesmo após orientation change / resize
    onChange();
    return () => {
      if (supportsAddEventListener) {
        mql.removeEventListener("change", onChange);
      } else {
        // eslint-disable-next-line deprecation/deprecation
        (mql as unknown as { removeListener: (cb: () => void) => void }).removeListener(onChange);
      }
    };
  }, []);

  return isMobile;
}
