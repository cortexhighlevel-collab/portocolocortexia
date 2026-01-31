
# Plano: Corrigir Falso Positivo de Segurança no Mobile

## Problema Identificado

O sistema de segurança está bloqueando o acesso no mobile/preview do Lovable mostrando a mensagem "Acesso Bloqueado - Seu IP foi registrado no banco de dados por tentativa de invasão". Isso ocorre porque:

1. **Detecção de DevTools por tamanho de janela** - A lógica compara `outerWidth/Height` com `innerWidth/Height`. Em dispositivos móveis, essa diferença é naturalmente maior devido a:
   - Barra de endereço do navegador
   - Barra de navegação do sistema (iOS/Android)
   - Notch/Dynamic Island do iPhone
   - Interface do próprio iframe do Lovable

2. **Preview do Lovable roda em modo PROD** - O `import.meta.env.PROD` retorna `true` no preview, ativando todas as proteções

## Solução Proposta

### 1. Adicionar Detecção do Ambiente Lovable Preview

Verificar se estamos no preview do Lovable (dentro do iframe do lovable.app/lovableproject.com) e desativar proteções agressivas nesse ambiente:

```text
Verificações a adicionar:
- window.location.hostname contém "lovable" ou "lovableproject"
- Estamos em um iframe (window !== window.top)
- URL tem parâmetro "forceHideBadge" (usado pelo Capacitor)
```

### 2. Ajustar Detecção de DevTools para Mobile

Aumentar o threshold de detecção no mobile ou desativar essa verificação específica em dispositivos móveis:

```text
Problema atual:
- threshold = 160px (muito baixo para mobile)
- Barras do sistema no iOS podem ter 100-200px

Solução:
- Mobile: threshold = 300px ou desativar
- Desktop: manter threshold = 160px
```

### 3. Melhorar Função `isHumanClick`

A função está sendo muito restritiva. Cliques normais no mobile podem ter `movementX/Y = 0` devido ao touch:

```text
Problema:
- Touch events não têm movementX/Y
- Pode estar bloqueando toques legítimos

Solução:
- Tratar touch como humano por padrão
- Verificar apenas eventos de mouse
```

---

## Arquivos a Modificar

| Arquivo | Mudança |
|---------|---------|
| `src/hooks/useAntiDevTools.ts` | Adicionar bypass para Lovable preview, ajustar thresholds mobile, corrigir detecção de touch |

---

## Implementacao Detalhada

### Passo 1: Adicionar no início do useEffect

```typescript
// Detectar se estamos no preview do Lovable
const isLovablePreview = () => {
  try {
    const hostname = window.location.hostname;
    const isLovableDomain = hostname.includes('lovable') || 
                            hostname.includes('lovableproject');
    const isInIframe = window !== window.top;
    const hasPreviewParam = window.location.search.includes('forceHideBadge');
    
    return isLovableDomain || (isInIframe && hasPreviewParam);
  } catch {
    return false;
  }
};

// Desativar proteções no preview do Lovable
if (isLovablePreview()) {
  return;
}
```

### Passo 2: Ajustar threshold para mobile

```typescript
const detectDevTools = () => {
  // No mobile, aumentar threshold devido às barras do sistema
  const isMobile = window.innerWidth < 768;
  const threshold = isMobile ? 300 : 160;
  
  // ... resto da lógica
};
```

### Passo 3: Corrigir detecção de clique humano

```typescript
const isHumanClick = (e: MouseEvent): boolean => {
  // Touch events são sempre considerados humanos
  if ((e as any).pointerType === 'touch' || e.type.includes('touch')) {
    return true;
  }
  
  const isTrusted = e.isTrusted;
  const hasValidCoords = e.clientX > 0 && e.clientY > 0;
  
  return isTrusted && hasValidCoords;
};
```

---

## Resultado Esperado

Apos a implementacao:
- O site funcionara normalmente no preview do Lovable (desktop e mobile)
- O site funcionara normalmente em dispositivos moveis reais
- As protecoes continuarao ativas no site publicado para usuarios finais
- Ferramentas de clonagem continuarao sendo bloqueadas
