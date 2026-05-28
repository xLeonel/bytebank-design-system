import{j as e,a}from"./index-DtZLZmwn.js";import{useMDXComponents as t}from"./index-Ckvl1iUX.js";import"./bb-button-CYfDRkje.js";import"./bb-card-DZ7aVqs1.js";import"./bb-badge-C8WSdQO9.js";import"./bb-field-ChxI5Dz2.js";import"./iframe-BM5vkbus.js";import"./index-nxo7fal5.js";import"./index-DrFu-skq.js";import"./lit-element-kDLlXEcT.js";import"./property-DOEbTfJd.js";/* empty css                */import"./state-B_GU6Iad.js";const d=""+new URL("logo-DEBBX7BQ.svg",import.meta.url).href,c="data:image/svg+xml,%3csvg%20width='128'%20height='128'%20viewBox='0%200%20128%20128'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='128'%20height='128'%20rx='8'%20fill='%23374C34'/%3e%3cpath%20d='M63.8041%2086.0078H22.8569V106.582H63.8041V86.0078Z'%20fill='%23F59E0B'/%3e%3cpath%20d='M84.1375%2045.0059H43.1903V86.1435H84.1375V45.0059Z'%20fill='%23F59E0B'/%3e%3cpath%20d='M43.0551%2025.1426H23.1379V44.8703H43.0551V25.1426Z'%20fill='%23F59E0B'/%3e%3cpath%20d='M103.628%2025.1426H83.9917V44.8703H103.628V25.1426Z'%20fill='%23F59E0B'/%3e%3c/svg%3e";function l(o){const s={blockquote:"blockquote",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...t(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Guides/Style Guide"}),`
`,e.jsx(s.h1,{id:"guia-de-estilo--bytebank-design-system",children:"Guia de Estilo — Bytebank Design System"}),`
`,e.jsx(s.p,{children:"Referência de tokens, direção visual e padrões de uso dos Web Components do Bytebank."}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"brand-assets",children:"Brand Assets"}),`
`,e.jsx(s.p,{children:"O design system exporta o logotipo e o favicon como URLs prontas para uso. Importe diretamente da lib — o Vite garante o hash correto do asset no build."}),`
`,e.jsxs("div",{style:{display:"flex",gap:"2rem",alignItems:"flex-start",flexWrap:"wrap",margin:"1.5rem 0"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.75rem"},children:[e.jsx("div",{style:{padding:"1.5rem",background:"#f9fafb",borderRadius:"0.75rem",border:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"center",minWidth:"120px",minHeight:"80px"},children:e.jsx("img",{src:d,alt:"Bytebank logo",style:{maxHeight:"60px",maxWidth:"160px",objectFit:"contain"}})}),e.jsx("code",{style:{fontSize:"0.75rem",color:"#6b7280"},children:"bbLogoUrl"}),e.jsx("span",{style:{fontSize:"0.7rem",color:"#9ca3af"},children:"logo.svg"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.75rem"},children:[e.jsx("div",{style:{padding:"1.5rem",background:"#f9fafb",borderRadius:"0.75rem",border:"1px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"center",minWidth:"120px",minHeight:"80px"},children:e.jsx("img",{src:c,alt:"Bytebank favicon",style:{width:"48px",height:"48px",objectFit:"contain"}})}),e.jsx("code",{style:{fontSize:"0.75rem",color:"#6b7280"},children:"bbFaviconUrl"}),e.jsx("span",{style:{fontSize:"0.7rem",color:"#9ca3af"},children:"favicon.svg"})]})]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-ts",children:`import { bbLogoUrl, bbFaviconUrl } from '@xleonel/bytebank-design-system';

// HTML
<img src={bbLogoUrl} alt="Bytebank" />

// Favicon no <head>
<link rel="icon" href={bbFaviconUrl} />
`})}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"cores",children:"Cores"}),`
`,e.jsx(s.p,{children:"Expostas como CSS custom properties e consumidas por todos os componentes."}),`
`,e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"1rem",margin:"1.5rem 0"},children:[{token:"--bb-primary",hex:"#374C34",label:"Primary"},{token:"--bb-secondary",hex:"#3F38A1",label:"Secondary"},{token:"--bb-accent",hex:"#A15F38",label:"Accent"},{token:"--bb-success",hex:"#47A138",label:"Success"},{token:"--bb-warning",hex:"#f59e0b",label:"Warning"},{token:"--bb-error",hex:"#D8353A",label:"Error"},{token:"--bb-dark",hex:"#332E2B",label:"Dark"}].map(({token:n,hex:r,label:i})=>e.jsxs(s.div,{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.4rem"},children:[e.jsx(s.div,{style:{width:"80px",height:"80px",borderRadius:"0.5rem",background:r,border:"1px solid #e5e7eb"}}),e.jsx(s.span,{style:{fontSize:"0.8rem",fontWeight:600},children:i}),e.jsx(s.code,{style:{fontSize:"0.7rem",color:"#6b7280"},children:n}),e.jsx(s.span,{style:{fontSize:"0.7rem",color:"#9ca3af"},children:r})]},n))}),`
`,e.jsx(s.h3,{id:"uso-recomendado",children:"Uso recomendado"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"--bb-primary"})," — ações principais, headers de card/modal, estado ativo da sidebar."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"--bb-secondary"})," — ações secundárias em outline (borda + texto, sem preenchimento)."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"--bb-accent"})," — destaques, links secundários e elementos de ênfase."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"--bb-success"})," — confirmações, valores positivos e aprovações."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"--bb-warning"})," — avisos suaves; usado também em texto sobre fundos escuros (4.4:1)."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"--bb-error"})," — erros, valores negativos e ações destrutivas."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"--bb-dark"})," — textos principais e títulos em fundos claros."]}),`
`]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"tipografia",children:"Tipografia"}),`
`,e.jsxs(s.p,{children:["Fonte padrão do design system: ",e.jsx(s.strong,{children:"Inter"})," (Google Fonts)."]}),`
`,e.jsxs(s.blockquote,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Atenção para quem consome a lib:"})," a Inter não é carregada automaticamente. Adicione-a no seu projeto por uma das opções abaixo."]}),`
`]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Opção 1 — Google Fonts (HTML)"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
`})}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Opção 2 — Fontsource (npm, sem dependência externa)"})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-bash",children:`npm install @fontsource/inter
`})}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-ts",children:`// No entry point do projeto (ex: main.ts / _app.tsx)
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
`})}),`
`,e.jsx(s.h3,{id:"tamanhos",children:"Tamanhos"}),`
`,e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",margin:"1rem 0",fontFamily:"Inter, sans-serif"},children:[{token:"--bb-font-size-xs",size:"0.75rem",px:"12px"},{token:"--bb-font-size-sm",size:"0.875rem",px:"14px"},{token:"--bb-font-size-md",size:"1rem",px:"16px"},{token:"--bb-font-size-lg",size:"1.125rem",px:"18px"},{token:"--bb-font-size-xl",size:"1.25rem",px:"20px"},{token:"--bb-font-size-2xl",size:"1.5rem",px:"24px"},{token:"--bb-font-size-3xl",size:"2rem",px:"32px"}].map(({token:n,size:r,px:i})=>e.jsxs(s.div,{style:{display:"flex",alignItems:"baseline",gap:"1rem"},children:[e.jsx(s.span,{style:{fontSize:r,lineHeight:1.3,minWidth:"220px"},children:"Bytebank Design System"}),e.jsxs(s.code,{style:{fontSize:"0.75rem",color:"#6b7280",whiteSpace:"nowrap"},children:[n," — ",r," / ",i]})]},n))}),`
`,e.jsx(s.h3,{id:"pesos",children:"Pesos"}),`
`,e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"1.5rem",margin:"1rem 0",fontFamily:"Inter, sans-serif",fontSize:"1rem"},children:[{token:"--bb-font-weight-light",weight:300,label:"Light"},{token:"--bb-font-weight-regular",weight:400,label:"Regular"},{token:"--bb-font-weight-medium",weight:500,label:"Medium"},{token:"--bb-font-weight-semibold",weight:600,label:"Semibold"},{token:"--bb-font-weight-bold",weight:700,label:"Bold"},{token:"--bb-font-weight-extrabold",weight:800,label:"Extrabold"}].map(({token:n,weight:r,label:i})=>e.jsxs(s.div,{style:{display:"flex",flexDirection:"column",gap:"0.25rem"},children:[e.jsx(s.span,{style:{fontWeight:r},children:i}),e.jsx(s.code,{style:{fontSize:"0.7rem",color:"#6b7280"},children:n}),e.jsx(s.span,{style:{fontSize:"0.7rem",color:"#9ca3af"},children:r})]},n))}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"espaçamento",children:"Espaçamento"}),`
`,e.jsxs(s.p,{children:["Escala consistente baseada em múltiplos de ",e.jsx(s.code,{children:"0.25rem"})," (4px)."]}),`
`,e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"0.75rem",margin:"1rem 0"},children:[{token:"--bb-space-xs",value:"0.25rem",px:"4px"},{token:"--bb-space-sm",value:"0.5rem",px:"8px"},{token:"--bb-space-md",value:"1rem",px:"16px"},{token:"--bb-space-lg",value:"1.5rem",px:"24px"},{token:"--bb-space-xl",value:"2rem",px:"32px"},{token:"--bb-space-2xl",value:"3rem",px:"48px"}].map(({token:n,value:r,px:i})=>e.jsxs(s.div,{style:{display:"flex",alignItems:"center",gap:"1rem"},children:[e.jsx(s.div,{style:{width:r,height:"1.5rem",background:"#374C34",borderRadius:"2px",flexShrink:0,minWidth:"4px"}}),e.jsx(s.code,{style:{fontSize:"0.75rem",color:"#6b7280",minWidth:"160px"},children:n}),e.jsxs(s.span,{style:{fontSize:"0.75rem",color:"#9ca3af"},children:[r," / ",i]})]},n))}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"bordas-e-elevação",children:"Bordas e Elevação"}),`
`,e.jsx(s.h3,{id:"raios",children:"Raios"}),`
`,e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"1.5rem",margin:"1rem 0"},children:[{token:"--bb-radius-sm",value:"0.25rem",px:"4px"},{token:"--bb-radius-md",value:"0.5rem",px:"8px"},{token:"--bb-radius-lg",value:"0.75rem",px:"12px"},{token:"--bb-radius-xl",value:"1rem",px:"16px"}].map(({token:n,value:r,px:i})=>e.jsxs(s.div,{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.5rem"},children:[e.jsx(s.div,{style:{width:"72px",height:"72px",background:"#374C34",borderRadius:r}}),e.jsx(s.code,{style:{fontSize:"0.7rem",color:"#6b7280",textAlign:"center"},children:n}),e.jsxs(s.span,{style:{fontSize:"0.7rem",color:"#9ca3af"},children:[r," / ",i]})]},n))}),`
`,e.jsx(s.h3,{id:"sombras",children:"Sombras"}),`
`,e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"2rem",margin:"1rem 0 2rem"},children:[{token:"--bb-shadow-sm",shadow:"0 1px 3px rgba(0,0,0,0.1)",label:"Small"},{token:"--bb-shadow-md",shadow:"0 4px 16px rgba(55,76,52,0.12)",label:"Medium"},{token:"--bb-shadow-lg",shadow:"0 25px 50px rgba(0,0,0,0.2)",label:"Large"}].map(({token:n,shadow:r,label:i})=>e.jsxs(s.div,{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.5rem"},children:[e.jsx(s.div,{style:{width:"100px",height:"60px",background:"white",borderRadius:"0.5rem",boxShadow:r,border:"1px solid #f3f4f6"}}),e.jsx(s.span,{style:{fontSize:"0.8rem",fontWeight:600},children:i}),e.jsx(s.code,{style:{fontSize:"0.7rem",color:"#6b7280"},children:n})]},n))}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"componentes-em-ação",children:"Componentes em ação"}),`
`,e.jsx(s.h3,{id:"botões",children:"Botões"}),`
`,e.jsxs("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap",padding:"1rem",border:"1px solid #e5e7eb",borderRadius:"0.5rem"},children:[e.jsx("bb-button",{label:"Primário",variant:"primary"}),e.jsx("bb-button",{label:"Secundário",variant:"secondary"}),e.jsx("bb-button",{label:"Sucesso",variant:"success"}),e.jsx("bb-button",{label:"Perigo",variant:"danger"})]}),`
`,e.jsx(s.h3,{id:"cards",children:"Cards"}),`
`,e.jsx("div",{style:{padding:"1rem",border:"1px solid #e5e7eb",borderRadius:"0.5rem"},children:e.jsx("bb-card",{title:"Exemplo de card",size:"md",children:e.jsx(s.p,{children:"Esse card ilustra o uso de bordas suaves, sombra leve e espaçamento interno consistente."})})}),`
`,e.jsx(s.h3,{id:"badges",children:"Badges"}),`
`,e.jsxs("div",{style:{display:"flex",gap:"0.5rem",flexWrap:"wrap",padding:"1rem",border:"1px solid #e5e7eb",borderRadius:"0.5rem"},children:[e.jsx("bb-badge",{variant:"success",label:"Ativo"}),e.jsx("bb-badge",{variant:"warning",label:"Atenção"}),e.jsx("bb-badge",{variant:"error",label:"Erro"}),e.jsx("bb-badge",{variant:"info",label:"Info"})]}),`
`,e.jsx(s.h3,{id:"formulários",children:"Formulários"}),`
`,e.jsx("div",{style:{padding:"1rem",border:"1px solid #e5e7eb",borderRadius:"0.5rem"},children:e.jsx("bb-field",{label:"Nome",placeholder:"Digite seu nome"})}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"acessibilidade",children:"Acessibilidade"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Contraste mínimo ",e.jsx(s.strong,{children:"4.5:1"})," para texto normal (WCAG AA) e ",e.jsx(s.strong,{children:"3:1"})," para texto grande (≥ 24px)."]}),`
`,e.jsxs(s.li,{children:["Use ",e.jsx(s.code,{children:"aria-label"})," e textos descritivos em todos os elementos interativos."]}),`
`,e.jsx(s.li,{children:"Garanta foco visível em botões, campos e links."}),`
`,e.jsx(s.li,{children:"Prefira texto legível e espaçamento confortável entre elementos."}),`
`]})]})}function S(o={}){const{wrapper:s}={...t(),...o.components};return s?e.jsx(s,{...o,children:e.jsx(l,{...o})}):l(o)}export{S as default};
