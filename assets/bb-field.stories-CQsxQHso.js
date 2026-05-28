import"./bb-field-ChxI5Dz2.js";import"./lit-element-kDLlXEcT.js";import"./property-DOEbTfJd.js";const c={title:"Components/Field",component:"bb-field",tags:["autodocs"],argTypes:{label:{control:"text"},placeholder:{control:"text"},hideLabel:{control:"boolean"}}},t=e=>`<div style="max-width:360px;width:100%">${e}</div>`,l={args:{label:"Nome",placeholder:"Digite seu nome"},render:({label:e,placeholder:a})=>t(`
<bb-field label="${e}">
  <input placeholder="${a}" />
</bb-field>`)},o={args:{label:"Descrição",placeholder:"Digite uma descrição..."},render:({label:e,placeholder:a})=>t(`
<bb-field label="${e}">
  <textarea placeholder="${a}" rows="4"></textarea>
</bb-field>`)},r={args:{label:"Tipo de conta"},render:({label:e})=>t(`
<bb-field label="${e}">
  <select>
    <option>Conta Corrente</option>
    <option>Conta Poupança</option>
    <option>Conta Investimento</option>
  </select>
</bb-field>`)},n={args:{label:"Campo oculto",placeholder:"Label escondida"},render:({label:e,placeholder:a})=>t(`
<bb-field label="${e}" hide-label>
  <input placeholder="${a}" />
</bb-field>`)};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Nome',
    placeholder: 'Digite seu nome'
  },
  render: ({
    label,
    placeholder
  }) => wrap(\`
<bb-field label="\${label}">
  <input placeholder="\${placeholder}" />
</bb-field>\`)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Descrição',
    placeholder: 'Digite uma descrição...'
  },
  render: ({
    label,
    placeholder
  }) => wrap(\`
<bb-field label="\${label}">
  <textarea placeholder="\${placeholder}" rows="4"></textarea>
</bb-field>\`)
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Tipo de conta'
  },
  render: ({
    label
  }) => wrap(\`
<bb-field label="\${label}">
  <select>
    <option>Conta Corrente</option>
    <option>Conta Poupança</option>
    <option>Conta Investimento</option>
  </select>
</bb-field>\`)
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Campo oculto',
    placeholder: 'Label escondida'
  },
  render: ({
    label,
    placeholder
  }) => wrap(\`
<bb-field label="\${label}" hide-label>
  <input placeholder="\${placeholder}" />
</bb-field>\`)
}`,...n.parameters?.docs?.source}}};const p=["Default","Textarea","Select","HiddenLabel"];export{l as Default,n as HiddenLabel,r as Select,o as Textarea,p as __namedExportsOrder,c as default};
