import { useEffect } from "react";

export const useAntiDevTools = () => {
  useEffect(() => {
    // Detectar se estamos no preview do EDITOR do Lovable (não o site publicado)
    const isLovableEditorPreview = (): boolean => {
      try {
        const hostname = window.location.hostname;
        // Preview do editor: id-preview--*.lovable.app ou localhost
        // Site publicado: *.lovable.app (sem "preview" no hostname)
        const isEditorPreview = hostname.includes('-preview--') || 
                                hostname.includes('localhost');
        // Verificar se estamos em um iframe (preview do editor)
        const isInIframe = window !== window.top;
        // Parâmetro usado pelo Capacitor/preview
        const hasPreviewParam = window.location.search.includes('forceHideBadge');
        
        // Só bypass se for o preview do editor, não o site publicado
        return isEditorPreview || (isInIframe && hasPreviewParam);
      } catch {
        // Se não conseguir acessar window.top (cross-origin), provavelmente é iframe
        return true;
      }
    };

    // Desativar proteções apenas no preview do EDITOR do Lovable
    if (isLovableEditorPreview()) {
      return;
    }

    // Só ativar proteções em produção real
    const isProduction = import.meta.env.PROD;
    
    if (!isProduction) {
      return; // Não aplicar proteções em desenvolvimento
    }
    
    // Detectar se é mobile para ajustar thresholds
    const isMobileDevice = (): boolean => {
      return window.innerWidth < 768 || 
             /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // ========== PROTEÇÃO ANTI-BOT E ANTI-IA ==========
    
    // ========== DETECÇÃO DE FERRAMENTAS DE CLONAGEM E EXTENSÕES ==========
    
    // Lista de ferramentas de clonagem e extensões para detectar
    const cloningTools = {
      // Antigravity
      antigravity: {
        name: 'Antigravity',
        globals: ['__ANTIGRAVITY__', 'antigravity', 'AntiGravity', '__antigravity_injected__', '__ag_extension__'],
        selectors: ['[data-antigravity]', '[class*="antigravity"]', '[id*="antigravity"]', 'script[src*="antigravity"]', '[data-ag-clone]', '[data-ag-inspect]', '.ag-overlay', '.ag-panel'],
        storage: ['antigravity'],
      },
      // Blackbox AI
      blackbox: {
        name: 'Blackbox AI',
        globals: ['__BLACKBOX__', 'blackboxai', 'BlackboxAI', '__blackbox_extension__', 'BLACKBOX_API', '__bb_injected__'],
        selectors: ['[data-blackbox]', '[class*="blackbox"]', '[id*="blackbox"]', 'script[src*="blackbox"]', '.blackbox-overlay', '.bb-panel', '[data-bb-clone]'],
        storage: ['blackbox', 'blackboxai'],
      },
      // PageCloner / Clone Tools
      pagecloner: {
        name: 'PageCloner',
        globals: ['__PAGECLONER__', 'PageCloner', 'pageCloner', '__clone_extension__', 'ClonePage'],
        selectors: ['[data-pagecloner]', '[class*="pagecloner"]', '[id*="pagecloner"]', 'script[src*="pagecloner"]', '.clone-overlay'],
        storage: ['pagecloner', 'page-cloner'],
      },
      // HTTrack / Website Copier
      httrack: {
        name: 'HTTrack',
        globals: ['__HTTRACK__', 'httrack', 'HTTrack'],
        selectors: ['[data-httrack]', 'script[src*="httrack"]'],
        storage: ['httrack'],
      },
      // Web Scraper
      webscraper: {
        name: 'Web Scraper',
        globals: ['__WEBSCRAPER__', 'webScraper', 'WebScraper', '__scraper__'],
        selectors: ['[data-webscraper]', '[class*="webscraper"]', '[id*="scraper"]', '.scraper-overlay'],
        storage: ['webscraper', 'web-scraper'],
      },
      // Wappalyzer (Technology Detector)
      wappalyzer: {
        name: 'Wappalyzer',
        globals: ['__WAPPALYZER__', 'wappalyzer', 'Wappalyzer'],
        selectors: ['[data-wappalyzer]', '[class*="wappalyzer"]'],
        storage: ['wappalyzer'],
      },
      // BuiltWith
      builtwith: {
        name: 'BuiltWith',
        globals: ['__BUILTWITH__', 'builtwith', 'BuiltWith'],
        selectors: ['[data-builtwith]', '[class*="builtwith"]'],
        storage: ['builtwith'],
      },
      // React DevTools
      reactdevtools: {
        name: 'React DevTools',
        globals: ['__REACT_DEVTOOLS_GLOBAL_HOOK__'],
        selectors: [],
        storage: [],
      },
      // Redux DevTools
      reduxdevtools: {
        name: 'Redux DevTools',
        globals: ['__REDUX_DEVTOOLS_EXTENSION__', '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'],
        selectors: [],
        storage: [],
      },
      // Vue DevTools
      vuedevtools: {
        name: 'Vue DevTools',
        globals: ['__VUE_DEVTOOLS_GLOBAL_HOOK__'],
        selectors: [],
        storage: [],
      },
      // Firebug
      firebug: {
        name: 'Firebug',
        globals: ['__firebug__', 'Firebug', 'firebug'],
        selectors: ['[data-firebug]', '#firebug'],
        storage: ['firebug'],
      },
      // ColorZilla
      colorzilla: {
        name: 'ColorZilla',
        globals: ['__COLORZILLA__', 'ColorZilla', 'colorzilla'],
        selectors: ['[data-colorzilla]', '[class*="colorzilla"]', '#colorzilla'],
        storage: ['colorzilla'],
      },
      // WhatFont
      whatfont: {
        name: 'WhatFont',
        globals: ['__WHATFONT__', 'WhatFont', 'whatfont', '__wf_injected__'],
        selectors: ['[data-whatfont]', '[class*="whatfont"]', '.whatfont-overlay', '#whatfont'],
        storage: ['whatfont'],
      },
      // CSS Peeper
      csspeeper: {
        name: 'CSS Peeper',
        globals: ['__CSSPEEPER__', 'CSSPeeper', 'csspeeper'],
        selectors: ['[data-csspeeper]', '[class*="csspeeper"]', '.csspeeper-overlay'],
        storage: ['csspeeper', 'css-peeper'],
      },
      // VisBug
      visbug: {
        name: 'VisBug',
        globals: ['__VISBUG__', 'VisBug', 'visbug', '__visbug_injected__'],
        selectors: ['[data-visbug]', '[class*="visbug"]', 'vis-bug', '.visbug-overlay'],
        storage: ['visbug'],
      },
      // Pesticide
      pesticide: {
        name: 'Pesticide',
        globals: ['__PESTICIDE__', 'Pesticide', 'pesticide'],
        selectors: ['[data-pesticide]', '.pesticide'],
        storage: ['pesticide'],
      },
      // Web Developer Extension
      webdeveloper: {
        name: 'Web Developer',
        globals: ['__WEBDEVELOPER__', 'WebDeveloper'],
        selectors: ['[data-webdeveloper]', '#webdeveloper-toolbar'],
        storage: ['webdeveloper'],
      },
      // Stylus/Stylish
      stylus: {
        name: 'Stylus/Stylish',
        globals: ['__STYLUS__', 'stylus', 'stylish'],
        selectors: ['[data-stylus]', '[class*="stylus"]'],
        storage: ['stylus', 'stylish'],
      },
      // Tampermonkey/Greasemonkey
      tampermonkey: {
        name: 'Tampermonkey',
        globals: ['GM', 'GM_info', 'GM_getValue', 'GM_setValue', 'unsafeWindow', '__tampermonkey__'],
        selectors: [],
        storage: ['tampermonkey'],
      },
      // Violentmonkey
      violentmonkey: {
        name: 'Violentmonkey',
        globals: ['VM', '__violentmonkey__'],
        selectors: [],
        storage: ['violentmonkey'],
      },
      // uBlock/AdBlock
      adblock: {
        name: 'AdBlock',
        globals: ['__ADBLOCK__', 'adblock', 'uBlock'],
        selectors: ['[data-adblock]'],
        storage: ['adblock', 'ublock'],
      },
      // Save Page WE
      savepage: {
        name: 'Save Page WE',
        globals: ['__SAVEPAGE__', 'SavePage'],
        selectors: ['[data-savepage]'],
        storage: ['savepage'],
      },
      // SingleFile
      singlefile: {
        name: 'SingleFile',
        globals: ['__SINGLEFILE__', 'singlefile', 'SingleFile'],
        selectors: ['[data-singlefile]', '[class*="singlefile"]'],
        storage: ['singlefile'],
      },
      // GoFullPage
      gofullpage: {
        name: 'GoFullPage',
        globals: ['__GOFULLPAGE__', 'GoFullPage'],
        selectors: ['[data-gofullpage]'],
        storage: ['gofullpage'],
      },
      // Awesome Screenshot
      awesomescreenshot: {
        name: 'Awesome Screenshot',
        globals: ['__AWESOMESCREENSHOT__', 'AwesomeScreenshot'],
        selectors: ['[data-awesomescreenshot]', '[class*="awesome-screenshot"]'],
        storage: ['awesomescreenshot'],
      },
      // Nimbus Screenshot
      nimbus: {
        name: 'Nimbus Screenshot',
        globals: ['__NIMBUS__', 'NimbusScreenshot'],
        selectors: ['[data-nimbus]', '[class*="nimbus"]'],
        storage: ['nimbus'],
      },
      // Loom
      loom: {
        name: 'Loom',
        globals: ['__LOOM__', 'loom', 'Loom'],
        selectors: ['[data-loom]', '[class*="loom"]', '#loom-companion'],
        storage: ['loom'],
      },
      // Figma to Code
      figmacode: {
        name: 'Figma to Code',
        globals: ['__FIGMATOCODE__', 'FigmaToCode'],
        selectors: ['[data-figmatocode]'],
        storage: ['figmatocode'],
      },
      // Site Sucker
      sitesucker: {
        name: 'SiteSucker',
        globals: ['__SITESUCKER__', 'SiteSucker'],
        selectors: ['[data-sitesucker]'],
        storage: ['sitesucker'],
      },
      // Cyotek WebCopy
      webcopy: {
        name: 'WebCopy',
        globals: ['__WEBCOPY__', 'WebCopy', 'Cyotek'],
        selectors: ['[data-webcopy]'],
        storage: ['webcopy'],
      },
      // Octoparse
      octoparse: {
        name: 'Octoparse',
        globals: ['__OCTOPARSE__', 'Octoparse', 'octoparse'],
        selectors: ['[data-octoparse]'],
        storage: ['octoparse'],
      },
      // ParseHub
      parsehub: {
        name: 'ParseHub',
        globals: ['__PARSEHUB__', 'ParseHub', 'parsehub'],
        selectors: ['[data-parsehub]'],
        storage: ['parsehub'],
      },
      // Apify
      apify: {
        name: 'Apify',
        globals: ['__APIFY__', 'Apify', 'apify'],
        selectors: ['[data-apify]'],
        storage: ['apify'],
      },
      // Import.io
      importio: {
        name: 'Import.io',
        globals: ['__IMPORTIO__', 'ImportIO'],
        selectors: ['[data-importio]'],
        storage: ['importio'],
      },
      // Diffchecker
      diffchecker: {
        name: 'Diffchecker',
        globals: ['__DIFFCHECKER__', 'Diffchecker'],
        selectors: ['[data-diffchecker]'],
        storage: ['diffchecker'],
      },
    };

    // Detectar ferramenta de clonagem
    const detectCloningTool = (): { detected: boolean; toolName: string } => {
      for (const [key, tool] of Object.entries(cloningTools)) {
        // Verificar globais
        for (const global of tool.globals) {
          if ((window as any)[global]) {
            return { detected: true, toolName: tool.name };
          }
        }
        
        // Verificar seletores DOM
        for (const selector of tool.selectors) {
          try {
            if (document.querySelector(selector)) {
              return { detected: true, toolName: tool.name };
            }
          } catch (e) {}
        }
        
        // Verificar storage
        for (const storageKey of tool.storage) {
          try {
            if (localStorage.getItem(storageKey) || sessionStorage.getItem(storageKey)) {
              return { detected: true, toolName: tool.name };
            }
          } catch (e) {}
        }
      }
      
      // Detectar extensões genéricas via chrome.runtime
      try {
        if ((window as any).chrome?.runtime?.id) {
          const extensionId = (window as any).chrome.runtime.id.toLowerCase();
          for (const [key] of Object.entries(cloningTools)) {
            if (extensionId.includes(key)) {
              return { detected: true, toolName: `Extensão (${key})` };
            }
          }
        }
      } catch (e) {}
      
      // Detectar injeção de scripts externos suspeitos
      const suspiciousScripts = document.querySelectorAll('script[src]');
      const suspiciousPatterns = [
        'clone', 'scraper', 'crawler', 'extractor', 'copier', 'downloader',
        'inspector', 'debugger', 'devtools', 'extension', 'inject'
      ];
      
      for (const script of suspiciousScripts) {
        const src = (script as HTMLScriptElement).src.toLowerCase();
        for (const pattern of suspiciousPatterns) {
          if (src.includes(pattern)) {
            return { detected: true, toolName: `Script Suspeito (${pattern})` };
          }
        }
      }
      
      return { detected: false, toolName: '' };
    };

    // Bloquear ferramenta de clonagem detectada
    const blockCloningTool = (toolName: string) => {
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
          ">⚠️ ${toolName.toUpperCase()} DETECTADO ⚠️</p>
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
          ">Este site está protegido contra ferramentas de clonagem,<br>
          inspeção e extensões de navegador não autorizadas.</p>
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
            ">🔒 Tentativa bloqueada: ${toolName}</p>
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

    // Verificar ferramentas de clonagem imediatamente
    const initialCheck = detectCloningTool();
    if (initialCheck.detected) {
      blockCloningTool(initialCheck.toolName);
      return;
    }

    // Monitorar continuamente por injeção tardia de ferramentas
    const cloningToolObserver = new MutationObserver(() => {
      const check = detectCloningTool();
      if (check.detected) {
        blockCloningTool(check.toolName);
      }
    });
    
    cloningToolObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'id', 'data-antigravity', 'data-blackbox', 'data-extension', 'src', 'href']
    });

    // Verificar periodicamente
    const cloningToolInterval = setInterval(() => {
      const check = detectCloningTool();
      if (check.detected) {
        blockCloningTool(check.toolName);
        clearInterval(cloningToolInterval);
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
      // Touch events são sempre considerados humanos (mobile)
      // PointerEvent inclui pointerType, MouseEvent não
      const pointerType = (e as PointerEvent).pointerType;
      if (pointerType === 'touch' || e.type.includes('touch')) {
        return true;
      }
      
      // Cliques humanos têm propriedades específicas
      const isTrusted = e.isTrusted;
      // No mobile, movementX/Y podem ser 0 em cliques legítimos, então só verificamos coords
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
    // IMPORTANTE: Desativado no mobile devido a falsos positivos com barras do sistema
    let devToolsOpen = false;
    const detectDevTools = () => {
      // No mobile, desativar completamente a detecção por tamanho de janela
      // As barras do sistema (endereço, navegação, notch, Dynamic Island) causam falsos positivos
      if (isMobileDevice()) {
        return; // Não detectar DevTools no mobile por este método
      }
      
      // Apenas desktop: threshold de 160px
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
    // IMPORTANTE: Desativado no mobile - causa falsos positivos
    const detectDevToolsConsole = () => {
      // No mobile, desativar este método também
      if (isMobileDevice()) {
        return;
      }
      
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
      clearInterval(cloningToolInterval);
      cloningToolObserver.disconnect();
      
      // Restaurar MutationObserver original
      (window as any).MutationObserver = originalMutationObserver;
      
      // Restaurar console em dev
      if (import.meta.env.PROD) {
        Object.assign(console, originalConsole);
      }
    };
  }, []);
};
