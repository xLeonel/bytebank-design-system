import"./bb-card-DZ7aVqs1.js";import"./lit-element-kDLlXEcT.js";import"./property-DOEbTfJd.js";import"./state-B_GU6Iad.js";/* empty css                */const l={title:"Components/Card",component:"bb-card",tags:["autodocs"],argTypes:{size:{control:{type:"select"},options:["sm","md","lg"]}}},a=({title:t,content:n,size:s})=>`
<bb-card title="${t}" size="${s}">
  <p>${n}</p>
</bb-card>`,e={args:{title:"Cabeçalho do card",content:"Conteúdo do card para demonstrar o layout do componente.",size:"md"},render:a},o={args:{title:"Card pequeno",content:"Conteúdo compacto.",size:"sm"},render:a},r={args:{title:"Card grande",content:"Conteúdo com mais espaço interno para destacar informações.",size:"lg"},render:a};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Cabeçalho do card',
    content: 'Conteúdo do card para demonstrar o layout do componente.',
    size: 'md'
  },
  render
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Card pequeno',
    content: 'Conteúdo compacto.',
    size: 'sm'
  },
  render
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Card grande',
    content: 'Conteúdo com mais espaço interno para destacar informações.',
    size: 'lg'
  },
  render
}`,...r.parameters?.docs?.source}}};const g=["Default","Small","Large"];export{e as Default,r as Large,o as Small,g as __namedExportsOrder,l as default};
