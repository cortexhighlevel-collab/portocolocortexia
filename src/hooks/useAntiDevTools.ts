import { useEffect } from "react";

export const useAntiDevTools = () => {
  useEffect(() => {
    // Bloquear atalhos de teclado
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.key === "C") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      
      // Ctrl+S (Save Page)
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Cmd+Option+I (Mac DevTools)
      if (e.metaKey && e.altKey && e.key === "i") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Cmd+Option+J (Mac Console)
      if (e.metaKey && e.altKey && e.key === "j") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Cmd+Option+U (Mac View Source)
      if (e.metaKey && e.key === "u") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Bloquear clique direito
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Bloquear seleção de texto
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Bloquear arrastar elementos
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Bloquear copiar
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    // Detectar DevTools aberto (método de detecção por timing)
    let devToolsOpen = false;
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        if (!devToolsOpen) {
          devToolsOpen = true;
          // Redirecionar ou mostrar aviso
          document.body.innerHTML = `
            <div style="
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background: #000;
              color: #fff;
              font-family: system-ui;
              text-align: center;
              padding: 20px;
            ">
              <div>
                <h1 style="color: #dc2626; font-size: 2rem; margin-bottom: 1rem;">⚠️ Acesso Bloqueado</h1>
                <p style="font-size: 1.2rem;">Seu IP foi registrado no banco de dados por tentativa de invasão.</p>
              </div>
            </div>
          `;
        }
      }
    };

    // Método de detecção via console.log timing
    const detectDevToolsConsole = () => {
      const element = new Image();
      Object.defineProperty(element, 'id', {
        get: function() {
          devToolsOpen = true;
          document.body.innerHTML = `
            <div style="
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background: #000;
              color: #fff;
              font-family: system-ui;
              text-align: center;
              padding: 20px;
            ">
              <div>
                <h1 style="color: #dc2626; font-size: 2rem; margin-bottom: 1rem;">⚠️ Acesso Bloqueado</h1>
                <p style="font-size: 1.2rem;">Seu IP foi registrado no banco de dados por tentativa de invasão.</p>
              </div>
            </div>
          `;
        }
      });
      console.log(element);
      console.clear();
    };

    // Adicionar listeners
    document.addEventListener("keydown", handleKeyDown, { capture: true });
    document.addEventListener("contextmenu", handleContextMenu, { capture: true });
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("copy", handleCopy);

    // Verificar DevTools periodicamente
    const interval = setInterval(() => {
      detectDevTools();
      detectDevToolsConsole();
    }, 1000);

    // Desabilitar console methods
    const noop = () => {};
    const originalConsole = { ...console };
    
    // Sobrescrever métodos do console em produção
    if (import.meta.env.PROD) {
      console.log = noop;
      console.warn = noop;
      console.error = noop;
      console.info = noop;
      console.debug = noop;
      console.table = noop;
      console.dir = noop;
    }

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
      document.removeEventListener("contextmenu", handleContextMenu, { capture: true });
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("copy", handleCopy);
      clearInterval(interval);
      
      // Restaurar console em dev
      if (import.meta.env.PROD) {
        Object.assign(console, originalConsole);
      }
    };
  }, []);
};
