import { useEffect } from "react";

export const useAntiDevTools = () => {
  useEffect(() => {
    // Só ativar proteções em produção (não no preview do Lovable)
    const isProduction = import.meta.env.PROD;
    
    if (!isProduction) {
      return; // Não aplicar proteções em desenvolvimento
    }

    // ========== PROTEÇÃO ANTI-BOT E ANTI-IA ==========
    
    // ========== DETECÇÃO E BLOQUEIO DO ANTIGRAVITY ==========
    const detectAntigravity = (): boolean => {
      const checks = [
        // Detectar extensão Antigravity via propriedades globais
        !!(window as any).__ANTIGRAVITY__,
        !!(window as any).antigravity,
        !!(window as any).AntiGravity,
        !!(window as any).__antigravity_injected__,
        !!(window as any).__ag_extension__,
        // Detectar via elementos injetados
        !!document.querySelector('[data-antigravity]'),
        !!document.querySelector('[class*="antigravity"]'),
        !!document.querySelector('[id*="antigravity"]'),
        !!document.querySelector('script[src*="antigravity"]'),
        !!document.querySelector('link[href*="antigravity"]'),
        // Detectar via chrome extension
        !!(window as any).chrome?.runtime?.id?.includes?.('antigravity'),
        // Detectar modificações no DOM típicas do Antigravity
        !!document.querySelector('[data-ag-clone]'),
        !!document.querySelector('[data-ag-inspect]'),
        !!document.querySelector('.ag-overlay'),
        !!document.querySelector('.ag-panel'),
        // Detectar via localStorage/sessionStorage
        !!localStorage.getItem('antigravity'),
        !!sessionStorage.getItem('antigravity'),
      ];
      
      return checks.some(check => check === true);
    };

    // Bloquear Antigravity imediatamente
    const blockAntigravity = () => {
      document.documentElement.innerHTML = '';
      document.body.innerHTML = '';
      
      const blockPage = document.createElement('div');
      blockPage.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, #0a0a0f 0%, #1a0a1a 50%, #0f0a15 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2147483647;
        font-family: 'Orbitron', 'Rajdhani', system-ui, sans-serif;
      `;
      
      blockPage.innerHTML = `
        <div style="
          text-align: center;
          padding: 60px;
          background: linear-gradient(145deg, rgba(20, 10, 30, 0.95), rgba(10, 5, 15, 0.98));
          border: 3px solid #dc2626;
          border-radius: 24px;
          box-shadow: 
            0 0 100px rgba(220, 38, 38, 0.4),
            0 0 200px rgba(220, 38, 38, 0.2),
            inset 0 0 60px rgba(220, 38, 38, 0.1);
          max-width: 500px;
          animation: pulse 2s ease-in-out infinite;
        ">
          <style>
            @keyframes pulse {
              0%, 100% { box-shadow: 0 0 100px rgba(220, 38, 38, 0.4), 0 0 200px rgba(220, 38, 38, 0.2); }
              50% { box-shadow: 0 0 150px rgba(220, 38, 38, 0.6), 0 0 250px rgba(220, 38, 38, 0.3); }
            }
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              25% { transform: translateX(-5px); }
              75% { transform: translateX(5px); }
            }
          </style>
          <div style="font-size: 5rem; margin-bottom: 24px; animation: shake 0.5s ease-in-out;">🚫</div>
          <h1 style="
            color: #dc2626;
            font-family: 'Orbitron', monospace;
            font-size: 2rem;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 4px;
            text-shadow: 0 0 20px rgba(220, 38, 38, 0.8);
          ">ACESSO NEGADO</h1>
          <div style="
            width: 80%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #dc2626, transparent);
            margin: 20px auto;
          "></div>
          <p style="
            color: #ff6b6b;
            font-family: 'Rajdhani', sans-serif;
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 16px;
            text-shadow: 0 0 15px rgba(255, 107, 107, 0.5);
          ">⚠️ ANTIGRAVITY DETECTADO ⚠️</p>
          <p style="
            color: #00ff88;
            font-family: 'Rajdhani', sans-serif;
            font-size: 1.6rem;
            font-weight: 700;
            text-shadow: 0 0 20px rgba(0, 255, 136, 0.6);
            margin-bottom: 24px;
          ">Você não tem permissão para acessar este site.</p>
          <p style="
            color: #666;
            font-size: 0.95rem;
            margin-top: 24px;
            line-height: 1.6;
          ">Este site está protegido contra ferramentas de clonagem.<br>
          Extensões como Antigravity são bloqueadas automaticamente.</p>
          <div style="
            margin-top: 30px;
            padding: 15px;
            background: rgba(220, 38, 38, 0.15);
            border: 1px solid rgba(220, 38, 38, 0.3);
            border-radius: 8px;
          ">
            <p style="
              color: #ff4444;
              font-size: 0.85rem;
              font-family: monospace;
            ">🔒 IP e tentativa registrados para análise.</p>
          </div>
        </div>
      `;
      
      document.body.appendChild(blockPage);
      
      // Impedir qualquer interação
      document.addEventListener('keydown', (e) => e.preventDefault(), { capture: true });
      document.addEventListener('click', (e) => e.preventDefault(), { capture: true });
      document.addEventListener('contextmenu', (e) => e.preventDefault(), { capture: true });
      
      // Tentar fechar a aba/janela
      try {
        window.close();
      } catch (e) {}
    };

    // Verificar Antigravity imediatamente
    if (detectAntigravity()) {
      blockAntigravity();
      return;
    }

    // Monitorar continuamente por injeção tardia do Antigravity
    const antigravityObserver = new MutationObserver(() => {
      if (detectAntigravity()) {
        blockAntigravity();
      }
    });
    
    antigravityObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'id', 'data-antigravity', 'src', 'href']
    });

    // Verificar periodicamente
    const antigravityInterval = setInterval(() => {
      if (detectAntigravity()) {
        blockAntigravity();
        clearInterval(antigravityInterval);
      }
    }, 500);

    // ========== PROTEÇÃO ANTI-BOT E ANTI-IA ==========
    
    // Detectar se é um bot/crawler
    const isBot = () => {
      const botPatterns = [
        /GPTBot/i, /ChatGPT/i, /CCBot/i, /anthropic/i,
        /ClaudeBot/i, /Claude-Web/i, /cohere/i, /PerplexityBot/i,
        /Bytespider/i, /Diffbot/i, /Omgilibot/i, /Google-Extended/i,
        /Applebot-Extended/i, /img2dataset/i, /FacebookBot/i,
        /HeadlessChrome/i, /PhantomJS/i, /Selenium/i,
        /Antigravity/i // Adicionar Antigravity aos padrões de bot
      ];
      
      const userAgent = navigator.userAgent;
      return botPatterns.some(pattern => pattern.test(userAgent));
    };

    // Detectar ambiente automatizado (headless browser)
    const isAutomated = () => {
      const checks = [
        // WebDriver detection
        !!(navigator as any).webdriver,
        // Selenium detection
        !!(window as any).__selenium_unwrapped,
        !!(window as any).__webdriver_evaluate,
        !!(window as any).__driver_evaluate,
        // PhantomJS detection
        !!(window as any).callPhantom,
        !!(window as any)._phantom,
        // Nightmare detection
        !!(window as any).__nightmare,
        // Chrome headless detection
        /HeadlessChrome/.test(navigator.userAgent),
      ];
      
      return checks.some(check => check === true);
    };

    // Bloquear se for bot ou automatizado
    const blockAccess = () => {
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
            <h1 style="color: #dc2626; font-size: 2rem; margin-bottom: 1rem;">🚫 Acesso Negado</h1>
            <p style="font-size: 1.2rem;">Acesso automatizado detectado e bloqueado.</p>
            <p style="margin-top: 1rem; opacity: 0.7;">Este site não permite acesso de bots ou crawlers de IA.</p>
          </div>
        </div>
      `;
    };

    // Verificar se é bot/automatizado
    if (isBot() || isAutomated()) {
      blockAccess();
      return;
    }

    // Ofuscar dados sensíveis no DOM
    const obfuscateSensitiveData = () => {
      document.querySelectorAll('script, style, link[rel="stylesheet"]').forEach(el => {
        el.setAttribute('data-ai-ignore', 'true');
        el.setAttribute('aria-hidden', 'true');
      });
    };

    obfuscateSensitiveData();

    // ========== PROTEÇÃO ANTI-EXTENSÃO / ANTI-GRAVIDADE ==========
    
    // Detectar cliques de extensões (não-humanos)
    const isHumanClick = (e: MouseEvent): boolean => {
      // Cliques humanos têm propriedades específicas
      const isTrusted = e.isTrusted;
      const hasMovement = e.movementX !== 0 || e.movementY !== 0 || e.detail > 0;
      const hasValidButton = e.button === 0 || e.button === 2;
      const hasValidCoords = e.clientX > 0 && e.clientY > 0;
      
      // Verificar se o clique parece vir de uma extensão
      const target = e.target as HTMLElement;
      const hasExtensionAttr = target?.hasAttribute?.('data-extension') || 
                               target?.closest?.('[data-extension]') !== null;
      
      return isTrusted && hasValidCoords && hasValidButton && !hasExtensionAttr;
    };

    // Detectar interações automatizadas/extensões
    const detectAutomatedInteraction = (e: Event): boolean => {
      // Verificar se há sinais de automação
      const automationSignals = [
        // Evento não confiável
        !e.isTrusted,
        // Timestamp suspeito
        e.timeStamp === 0,
        // Event dispatch manual
        (e as any).__dispatched_by_extension,
      ];
      
      return automationSignals.some(signal => signal === true);
    };

    // Mostrar mensagem de bloqueio
    const showBlockMessage = () => {
      // Criar overlay de bloqueio
      const overlay = document.createElement('div');
      overlay.id = 'extension-block-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999999;
        animation: fadeIn 0.3s ease;
      `;
      
      overlay.innerHTML = `
        <div style="
          text-align: center;
          padding: 40px;
          background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%);
          border: 2px solid #dc2626;
          border-radius: 16px;
          box-shadow: 0 0 50px rgba(220, 38, 38, 0.5);
          max-width: 400px;
        ">
          <div style="font-size: 4rem; margin-bottom: 20px;">🚫</div>
          <h1 style="
            color: #dc2626;
            font-family: 'Orbitron', monospace;
            font-size: 1.5rem;
            margin-bottom: 16px;
            text-transform: uppercase;
            letter-spacing: 2px;
          ">Acesso Bloqueado</h1>
          <p style="
            color: #00ff88;
            font-family: 'Rajdhani', sans-serif;
            font-size: 1.3rem;
            font-weight: 600;
            text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
          ">Não Sobra nada pro beta 😎</p>
          <p style="
            color: #666;
            font-size: 0.9rem;
            margin-top: 20px;
          ">Extensão de navegador detectada e bloqueada.</p>
        </div>
      `;
      
      // Remover overlay anterior se existir
      const existing = document.getElementById('extension-block-overlay');
      if (existing) existing.remove();
      
      document.body.appendChild(overlay);
      
      // Remover após 5 segundos
      setTimeout(() => {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s ease';
        setTimeout(() => overlay.remove(), 500);
      }, 5000);
    };

    // Handler para detectar cliques de extensões
    const handleExtensionClick = (e: MouseEvent) => {
      if (!isHumanClick(e) || detectAutomatedInteraction(e)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        showBlockMessage();
        return false;
      }
    };

    // Handler para detectar interações automatizadas em inputs
    const handleAutomatedInput = (e: Event) => {
      if (detectAutomatedInteraction(e)) {
        e.preventDefault();
        e.stopPropagation();
        showBlockMessage();
        return false;
      }
    };

    // Interceptar MutationObserver para detectar extensões modificando o DOM
    const originalMutationObserver = window.MutationObserver;
    (window as any).MutationObserver = class extends originalMutationObserver {
      constructor(callback: MutationCallback) {
        const wrappedCallback: MutationCallback = (mutations, observer) => {
          // Verificar se mutações são de extensões
          const extensionMutation = mutations.some(m => {
            const target = m.target as HTMLElement;
            return target?.hasAttribute?.('data-extension') ||
                   target?.id?.includes('extension') ||
                   target?.className?.includes('extension');
          });
          
          if (!extensionMutation) {
            callback(mutations, observer);
          }
        };
        super(wrappedCallback);
      }
    };

    // Adicionar listeners para detectar extensões
    document.addEventListener('click', handleExtensionClick, { capture: true, passive: false });
    document.addEventListener('mousedown', handleExtensionClick, { capture: true, passive: false });
    document.addEventListener('mouseup', handleExtensionClick, { capture: true, passive: false });
    document.addEventListener('input', handleAutomatedInput, { capture: true });
    document.addEventListener('change', handleAutomatedInput, { capture: true });

    // ========== BLOQUEIO DE ATALHOS DE TECLADO ==========
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
      document.removeEventListener("click", handleExtensionClick, { capture: true });
      document.removeEventListener("mousedown", handleExtensionClick, { capture: true });
      document.removeEventListener("mouseup", handleExtensionClick, { capture: true });
      document.removeEventListener("input", handleAutomatedInput, { capture: true });
      document.removeEventListener("change", handleAutomatedInput, { capture: true });
      clearInterval(interval);
      clearInterval(antigravityInterval);
      antigravityObserver.disconnect();
      
      // Restaurar MutationObserver original
      (window as any).MutationObserver = originalMutationObserver;
      
      // Restaurar console em dev
      if (import.meta.env.PROD) {
        Object.assign(console, originalConsole);
      }
    };
  }, []);
};
