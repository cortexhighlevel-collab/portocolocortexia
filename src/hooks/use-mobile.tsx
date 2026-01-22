import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

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
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => {
      if (supportsAddEventListener) {
        mql.removeEventListener("change", onChange);
      } else {
        // eslint-disable-next-line deprecation/deprecation
        (mql as unknown as { removeListener: (cb: () => void) => void }).removeListener(onChange);
      }
    };
  }, []);

  return !!isMobile;
}
