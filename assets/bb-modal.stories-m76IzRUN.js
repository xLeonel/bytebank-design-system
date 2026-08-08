import"./bb-modal-C1uUkDQj.js";import"./lit-element-kDLlXEcT.js";import"./property-DOEbTfJd.js";const t={title:"Components/Modal",component:"bb-modal",tags:["autodocs"],argTypes:{open:{control:"boolean"},"aria-label":{control:"text"}}},a={args:{open:!0,"aria-label":"Modal de demonstração"},render:({open:o,"aria-label":l})=>`
<bb-modal title="Modal de exemplo" ${o?"open":""} aria-label="${l}">
  <p>Conteúdo do modal com título e botão de fechar no header.</p>
</bb-modal>`},e={args:{open:!1,"aria-label":"Modal fechado"},render:({open:o,"aria-label":l})=>`
<div>
  <p>O modal está fechado. Ative o controle "open" para visualizá-lo.</p>
  <bb-modal title="Modal fechado" ${o?"open":""} aria-label="${l}">
    <p>Conteúdo do modal.</p>
  </bb-modal>
</div>`};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    'aria-label': 'Modal de demonstração'
  },
  render: ({
    open,
    'aria-label': ariaLabel
  }) => \`
<bb-modal title="Modal de exemplo" \${open ? 'open' : ''} aria-label="\${ariaLabel}">
  <p>Conteúdo do modal com título e botão de fechar no header.</p>
</bb-modal>\`
}`,...a.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    open: false,
    'aria-label': 'Modal fechado'
  },
  render: ({
    open,
    'aria-label': ariaLabel
  }) => \`
<div>
  <p>O modal está fechado. Ative o controle "open" para visualizá-lo.</p>
  <bb-modal title="Modal fechado" \${open ? 'open' : ''} aria-label="\${ariaLabel}">
    <p>Conteúdo do modal.</p>
  </bb-modal>
</div>\`
}`,...e.parameters?.docs?.source}}};const p=["Open","Closed"];export{e as Closed,a as Open,p as __namedExportsOrder,t as default};
