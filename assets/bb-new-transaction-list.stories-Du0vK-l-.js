import"./bb-new-transaction-list-N_bcA4ZG.js";import"./lit-element-kDLlXEcT.js";import"./property-DOEbTfJd.js";import"./state-B_GU6Iad.js";const d={title:"Components/New Transaction List",component:"bb-new-transaction-list",tags:["autodocs"],parameters:{docs:{description:{component:'\nFormulário autônomo de nova transação — sem modal. Ideal para ser embutido\ndiretamente em uma página (como `bb-transaction-list` é em `/extrato`).\n\n**Eventos despachados:**\n- `submit` — `detail: { type: string, amount: number, date: string }`\n  `amount` já vem com sinal: negativo para Saque, positivo para Depósito e Pix.\n- `cancel` — sem detail; disparado ao clicar em "Cancelar".\n\n**Campos dinâmicos:**\n- Tipo **Pix** → exibe campo de Chave Pix.\n- Tipos **Depósito** / **Saque** → exibe campos de Agência (`XXXX-X`) e Conta (`XXXXXXX-X`).\n\n**Validação:**\nO botão "Concluir transação" só é habilitado quando todos os campos obrigatórios\nestão preenchidos e o valor é maior que zero.\n        '}}}},e={render:()=>{const t=document.createElement("bb-new-transaction-list");return t.addEventListener("submit",n=>{const{type:o,amount:a,date:s}=n.detail;console.log("[bb-new-transaction-list] submit →",{type:o,amount:a,date:s})}),t.addEventListener("cancel",()=>{console.log("[bb-new-transaction-list] cancel")}),t}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => {
    const el = document.createElement('bb-new-transaction-list');
    el.addEventListener('submit', (e: Event) => {
      const {
        type,
        amount,
        date
      } = (e as CustomEvent).detail;
      console.log('[bb-new-transaction-list] submit →', {
        type,
        amount,
        date
      });
    });
    el.addEventListener('cancel', () => {
      console.log('[bb-new-transaction-list] cancel');
    });
    return el;
  }
}`,...e.parameters?.docs?.source},description:{story:"Formulário em seu estado inicial — pronto para receber interação.",...e.parameters?.docs?.description}}};const l=["Default"];export{e as Default,l as __namedExportsOrder,d as default};
