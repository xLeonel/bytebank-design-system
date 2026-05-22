# Bytebank Design System

Uma biblioteca de Web Components moderna construída com **Lit**, **Vite** e **TypeScript**. Pronta para usar em **Next.js**, **Angular** e qualquer framework JavaScript.

## 🚀 Características

- ✨ **Web Components** reutilizáveis com Lit 3
- 🎨 **Tailwind CSS** para estilização
- 📦 **Bundles ESM e UMD** otimizados
- 📝 **TypeScript** com tipos completos
- ⚡ **Vite** para build rápido
- 🔄 **CI/CD** automático no GitHub Actions
- 🎯 **Framework-agnostic** - funciona em qualquer projeto

## 📋 Componentes

### `<bb-button>`
Botão versátil com múltiplas variantes e tamanhos.

```html
<bb-button label="Click me" variant="primary" size="md"></bb-button>
```

**Props:**
- `label` (string) - Texto do botão
- `variant` ('primary' | 'secondary' | 'danger' | 'success') - Estilo
- `size` ('sm' | 'md' | 'lg') - Tamanho
- `disabled` (boolean) - Desabilitado
- `full-width` (boolean) - Largura total

### `<bb-card>`
Container para agrupar conteúdo.

```html
<bb-card title="My Card" size="md">
  <p>Card content here</p>
</bb-card>
```

**Props:**
- `title` (string) - Título do card
- `size` ('sm' | 'md' | 'lg') - Tamanho

### `<bb-modal>`
Diálogo modal acessível com cabeçalho e conteúdo.

```html
<bb-modal open aria-label="Modal de exemplo">
  <bb-modal-header title="Título do modal"></bb-modal-header>
  <p>Texto de demonstração dentro do modal.</p>
</bb-modal>
```

**Props:**
- `open` (boolean) - Exibe o modal quando verdadeiro
- `aria-label` (string) - Label acessível para leitura de tela

### `<bb-badge>`
Componente para labels e status.

```html
<bb-badge variant="success" label="Active"></bb-badge>
```

**Props:**
- `label` (string) - Texto do badge
- `variant` ('primary' | 'success' | 'warning' | 'error' | 'secondary') - Estilo

## 🛠️ Instalação

### Via npm
```bash
npm install bytebank-design-system
```

### Desenvolvimento local
```bash
npm install
npm run dev
```

## 📦 Build

```bash
npm run build      # Build e tipos TypeScript
npm run build:types # Gerar apenas tipos
npm run check      # Verificar tipos
```

## 🧪 Storybook

```bash
npm run storybook
npm run build:storybook
```

Abrir o Storybook localmente permite testar controles, ver documentação e validar componentes interativos como `<bb-modal>`.

Saída em `dist/`:
- `bytebank-wc.es.js` - ESM bundle
- `bytebank-wc.umd.js` - UMD bundle
- `types/` - Declarações TypeScript

## 🚀 Uso

### Next.js

```tsx
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script 
          src="/bytebank-wc.es.js" 
          strategy="beforeInteractive" 
          type="module" 
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// app/page.tsx
export default function Home() {
  return (
    <div>
      <bb-button label="Hello" variant="primary"></bb-button>
      <bb-card title="Welcome">
        <p>Content here</p>
      </bb-card>
      <bb-badge variant="success">Active</bb-badge>
    </div>
  );
}
```

### Angular

```html
<!-- index.html -->
<script type="module" src="/assets/bytebank-wc.umd.js"></script>
```

```html
<!-- app.component.html -->
<bb-button label="Click"></bb-button>
<bb-card title="Card Title">Card content</bb-card>
```

### HTML/Vanilla JS

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="path/to/bytebank-wc.es.js"></script>
</head>
<body>
  <bb-button label="Test"></bb-button>
  <bb-card title="My Card">Hello World</bb-card>
  <bb-badge variant="success">Live</bb-badge>
</body>
</html>
```

## 🔧 Desenvolvimento

Estrutura do projeto:

```
src/
├── components/
│   ├── bb-button.ts
│   ├── bb-card.ts
│   └── bb-badge.ts
├── styles/
│   └── globals.css
└── index.ts

dist/
├── bytebank-wc.es.js
├── bytebank-wc.umd.js
└── types/
```

## 🚀 CI/CD

O workflow `.github/workflows/publish.yml` publica automaticamente no npm quando você faz push de uma tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

**Necessário:** Configure o secret `NPM_TOKEN` no GitHub (Settings > Secrets > Actions)

Para gerar um token:
```bash
npm login
npm token create --read-only
```

## 📚 TypeScript

Tipos completos inclusos. Importe normalmente:

```typescript
import { BbButton, BbCard, BbBadge } from 'bytebank-design-system';

// Use com declarações de tipo
const button = document.querySelector('bb-button') as BbButton;
button.disabled = true;
```

## 🎨 Personalização

Customize cores via CSS variables:

```css
:root {
  --bb-primary: #1f2937;
  --bb-accent: #3b82f6;
  --bb-success: #10b981;
  --bb-warning: #f59e0b;
  --bb-error: #ef4444;
  --bb-radius: 0.5rem;
  --bb-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

## 📄 Licença

MIT © 2024 Bytebank
