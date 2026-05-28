import"./bb-button-CYfDRkje.js";import"./lit-element-kDLlXEcT.js";import"./property-DOEbTfJd.js";/* empty css                */const v={title:"Components/Button",component:"bb-button",tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["primary","secondary","danger","success"]},size:{control:{type:"select"},options:["sm","md","lg"]},disabled:{control:"boolean"},fullWidth:{control:"boolean"}}},r=({label:l,variant:d,size:i,disabled:m})=>`<bb-button label="${l}" variant="${d}"${i?` size="${i}"`:""}${m?" disabled":""}></bb-button>`,a={args:{label:"Enviar",variant:"primary"},render:r},e={args:{label:"Cancelar",variant:"secondary"},render:r},s={args:{label:"Excluir",variant:"danger"},render:r},n={args:{label:"Confirmar",variant:"success"},render:r},o={args:{label:"Indisponível",variant:"primary",disabled:!0},render:r},t={args:{label:"Pequeno",variant:"primary",size:"sm"},render:r},c={args:{label:"Grande",variant:"primary",size:"lg"},render:r};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Enviar',
    variant: 'primary'
  },
  render
}`,...a.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Cancelar',
    variant: 'secondary'
  },
  render
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Excluir',
    variant: 'danger'
  },
  render
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Confirmar',
    variant: 'success'
  },
  render
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Indisponível',
    variant: 'primary',
    disabled: true
  },
  render
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Pequeno',
    variant: 'primary',
    size: 'sm'
  },
  render
}`,...t.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Grande',
    variant: 'primary',
    size: 'lg'
  },
  render
}`,...c.parameters?.docs?.source}}};const y=["Primary","Secondary","Danger","Success","Disabled","Small","Large"];export{s as Danger,o as Disabled,c as Large,a as Primary,e as Secondary,t as Small,n as Success,y as __namedExportsOrder,v as default};
