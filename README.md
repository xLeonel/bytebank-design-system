# Bytebank Design System

Sistema de design oficial do **Bytebank** — uma coleção de Web Components reutilizáveis, acessíveis e framework-agnostic, construída com **Lit**, **Vite** e **TypeScript**.

> 📖 **Documentação interativa dos componentes:** acesse o Storybook em  
> **[https://xleonel.github.io/bytebank-design-system](https://xleonel.github.io/bytebank-design-system)**

---

## O que é o Bytebank Design System?

O Bytebank DS centraliza a identidade visual e os padrões de interface do Bytebank em componentes reutilizáveis. Cada componente é construído como **Web Component nativo**, o que significa que funciona em qualquer stack — React, Angular, Next.js, Vue ou HTML puro — sem adaptadores.

A biblioteca expõe tokens de design (cores, tipografia, espaçamento e bordas) via **CSS custom properties**, permitindo que o consumidor adapte a aparência sem sobrescrever estilos internos.

---

## Características

- 🧩 **Web Components nativos** com [Lit 3](https://lit.dev/) — Shadow DOM, reatividade e slots
- 🎨 **Tokens de design** em CSS custom properties para cores, tipografia, espaçamento e bordas
- 🔤 **Fonte Inter** como padrão — legível e moderna
- ♿ **Acessibilidade** — contraste WCAG AA verificado em todos os componentes
- 📦 **Bundles ESM e UMD** prontos para produção
- 🔷 **TypeScript** com tipos completos e exportados
- ⚡ **Vite** para build otimizado com tree-shaking
- 📖 **Storybook** com documentação interativa de cada componente
- 🚀 **CI/CD** via GitHub Actions — publish automático no npm com Semantic Release e deploy do Storybook no GitHub Pages

---

## Instalação

```bash
npm install @xleonel/bytebank-design-system
```

### Pré-requisito: fonte Inter

A fonte **Inter** não é carregada automaticamente pela lib. Adicione-a no seu projeto:

**Opção 1 — Google Fonts (HTML):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

**Opção 2 — Fontsource (npm):**
```bash
npm install @fontsource/inter
```
```ts
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
```

---

## Uso

### Importar componentes

```ts
import '@xleonel/bytebank-design-system';
```

### Importar assets de marca

```ts
import { bbLogoUrl, bbFaviconUrl } from '@xleonel/bytebank-design-system';

// Logotipo
<img src={bbLogoUrl} alt="Bytebank" />

// Favicon no <head>
<link rel="icon" href={bbFaviconUrl} />
```

### Next.js

```tsx
// app/layout.tsx
import '@xleonel/bytebank-design-system';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// app/page.tsx
export default function Home() {
  return (
    <bb-button label="Entrar" variant="primary"></bb-button>
  );
}
```

### Angular

```ts
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import '@xleonel/bytebank-design-system';

@NgModule({ schemas: [CUSTOM_ELEMENTS_SCHEMA] })
export class AppModule {}
```

### HTML puro

```html
<script type="module">
  import '@xleonel/bytebank-design-system';
</script>

<bb-button label="Clique aqui" variant="primary"></bb-button>
```

---

## Componentes

Todos os componentes, props, variantes e exemplos interativos estão documentados no **Storybook**:

🔗 **[https://xleonel.github.io/bytebank-design-system](https://xleonel.github.io/bytebank-design-system)**

| Componente | Tag |
|---|---|
| Botão | `<bb-button>` |
| Card | `<bb-card>` |
| Badge | `<bb-badge>` |
| Campo de formulário | `<bb-field>` |
| Modal | `<bb-modal>` |
| Sidebar de navegação | `<bb-sidebar>` |
| Lista de transações | `<bb-transaction-list>` |
| Card de saldo | `<bb-balance-card>` |
| Modal nova transação | `<bb-new-transaction-modal>` |
| Modal detalhe de transação | `<bb-transaction-detail-modal>` |

---

## Tokens de design

Personalize a aparência sobrescrevendo as CSS custom properties no seu projeto:

```css
:root {
  /* Cores */
  --bb-primary:   #374C34;
  --bb-secondary: #3F38A1;
  --bb-accent:    #A15F38;
  --bb-success:   #47A138;
  --bb-warning:   #f59e0b;
  --bb-error:     #D8353A;
  --bb-dark:      #332E2B;

  /* Tipografia */
  --bb-font-family: 'Inter', sans-serif;

  /* Espaçamento */
  --bb-space-xs: 0.25rem;
  --bb-space-sm: 0.5rem;
  --bb-space-md: 1rem;
  --bb-space-lg: 1.5rem;
  --bb-space-xl: 2rem;

  /* Bordas */
  --bb-radius-sm: 0.25rem;
  --bb-radius-md: 0.5rem;
  --bb-radius-lg: 0.75rem;
  --bb-radius-xl: 1rem;
}
```

---

## Desenvolvimento local

```bash
npm install
npm run dev          # Inicia o Vite
npm run storybook    # Storybook em http://localhost:6006
npm run build        # Build da lib + tipos TypeScript
npm run check        # Verificação de tipos
```

### Estrutura do projeto

```
src/
├── assets/          # logo.png, favicon.png
├── components/      # Um diretório por componente (ts + stories)
├── styles/
│   └── globals.css  # Tokens CSS e configuração do Tailwind
└── index.ts         # Entry point e exports

dist/
├── bytebank-wc.es.js   # ESM bundle
├── bytebank-wc.umd.js  # UMD bundle
└── types/              # Declarações TypeScript
```

---

## CI/CD

O workflow `.github/workflows/publish.yml` roda a cada push na `main`:

1. **Publish** — executa o Semantic Release, que analisa os commits e publica uma nova versão no npm quando necessário
2. **Deploy Storybook** — builda o Storybook e faz deploy na branch `demo`, servida pelo GitHub Pages

**Secrets necessários no repositório:**
| Secret | Descrição |
|---|---|
| `NPM_TOKEN` | Token de autenticação do npm |
| `GH_TOKEN` | Personal Access Token do GitHub (para o Semantic Release criar releases e tags) |

---

## Licença

MIT © Bytebank
