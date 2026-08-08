import{i as d,a as h,b as l}from"./lit-element-kDLlXEcT.js";import{t as m}from"./property-DOEbTfJd.js";import{r}from"./state-B_GU6Iad.js";var b=Object.defineProperty,f=Object.getOwnPropertyDescriptor,s=(e,t,n,i)=>{for(var o=i>1?void 0:i?f(t,n):t,p=e.length-1,u;p>=0;p--)(u=e[p])&&(o=(i?u(t,n,o):u(o))||o);return i&&o&&b(t,n,o),o};const y=["Depósito","Saque","Transferência Pix"];let a=class extends h{constructor(){super(...arguments),this.type="",this.amount="",this.date="",this.description="",this.depositType="",this.agency="",this.account="",this.pixKey="",this.isPix=!1,this.files=[]}formatCurrency(e){if(!e)return"";const t=parseInt(e,10);return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t/100)}formatAgency(e){const t=e.slice(0,5);return t.length<=4?t:`${t.slice(0,4)}-${t.slice(4)}`}formatAccount(e){const t=e.slice(0,8);return t.length<=1?t:`${t.slice(0,-1)}-${t.slice(-1)}`}get isFormValid(){const e=this.amount.replace(/\D/g,""),t=e?parseInt(e,10)/100:0;return!this.type||!e||t===0||!this.date?!1:this.isPix?this.pixKey.trim().length>0:this.type==="Depósito"?this.depositType?this.depositType==="other"?this.agency.length>0&&this.account.length>=3:!0:!1:!0}handleTypeChange(e){const t=e.target;this.type=t.value,this.isPix=t.value==="Transferência Pix",this.depositType="",this.agency="",this.account="",this.pixKey=""}handleDepositTypeChange(e){this.depositType=e.target.value,this.agency="",this.account=""}handleAmountInput(e){const t=e.target,n=t.value.replace(/\D/g,""),i=this.formatCurrency(n);this.amount=i,t.value=i}handleAgencyInput(e){const t=e.target,n=t.value.replace(/\D/g,""),i=this.formatAgency(n);this.agency=i,t.value=i}handleAccountInput(e){const t=e.target,n=t.value.replace(/\D/g,""),i=this.formatAccount(n);this.account=i,t.value=i}handlePixKeyInput(e){this.pixKey=e.target.value}handleDescriptionInput(e){this.description=e.target.value}handleDateChange(e){this.date=e.target.value}triggerFileInput(){this.renderRoot.querySelector("#bb-attachments")?.click()}handleFilesInput(e){const t=e.target;this.files=t.files&&t.files[0]?[t.files[0]]:[]}removeFile(e){if(this.files=this.files.filter((t,n)=>n!==e),this.files.length===0){const t=this.renderRoot.querySelector("#bb-attachments");t&&(t.value="")}}resetForm(){this.type="",this.amount="",this.date="",this.description="",this.depositType="",this.agency="",this.account="",this.pixKey="",this.isPix=!1,this.files=[];const e=this.renderRoot.querySelector("#bb-attachments");e&&(e.value="")}submitForm(e){if(e.preventDefault(),!this.isFormValid)return;const t=this.amount.replace(/\D/g,""),n=parseInt(t,10)/100,i=this.type==="Saque"||this.type==="Transferência Pix"||this.type==="Depósito"&&this.depositType==="other",o={type:this.type,amount:i?-Math.abs(n):n,date:this.date,description:this.description||void 0};this.isPix?o.pixKey=this.pixKey:this.type==="Depósito"&&this.depositType==="other"&&(o.agency=this.agency,o.account=this.account),this.files.length&&(o.attachments=this.files),this.dispatchEvent(new CustomEvent("submit",{detail:o,bubbles:!0,composed:!0})),this.resetForm()}handleCancel(){this.resetForm(),this.dispatchEvent(new CustomEvent("cancel",{bubbles:!0,composed:!0}))}render(){return l`
      <form @submit=${this.submitForm}>

        <label>
          Tipo de transação
          <select .value=${this.type} @change=${this.handleTypeChange}>
            <option value="" disabled>Selecione o tipo de transação</option>
            ${y.map(e=>l`<option value=${e}>${e}</option>`)}
          </select>
        </label>

        <label>
          Valor
          <input
            type="text"
            inputmode="numeric"
            .value=${this.amount}
            @input=${this.handleAmountInput}
            placeholder="R$ 0,00"
          />
        </label>

        ${this.isPix?l`
          <label>
            Chave Pix
            <input
              type="text"
              .value=${this.pixKey}
              @input=${this.handlePixKeyInput}
              placeholder="CPF, e-mail, telefone ou chave aleatória"
            />
          </label>
        `:this.type==="Depósito"?l`
          <label>
            Tipo de depósito
            <select .value=${this.depositType} @change=${this.handleDepositTypeChange}>
              <option value="" disabled>Selecione</option>
              <option value="own">Na minha conta</option>
              <option value="other">Em outra conta</option>
            </select>
          </label>
          ${this.depositType==="other"?l`
            <label>
              Agência
              <input
                type="text"
                inputmode="numeric"
                .value=${this.agency}
                @input=${this.handleAgencyInput}
                placeholder="0000-0"
                maxlength="6"
              />
            </label>
            <label>
              Conta
              <input
                type="text"
                inputmode="numeric"
                .value=${this.account}
                @input=${this.handleAccountInput}
                placeholder="0000000-0"
                maxlength="9"
              />
            </label>
          `:""}
        `:""}

        <label>
          Descrição (opcional)
          <input
            type="text"
            .value=${this.description}
            @input=${this.handleDescriptionInput}
            placeholder="Ex: aluguel, freelance..."
          />
        </label>

        <label>
          Data
          <input
            type="date"
            .value=${this.date}
            @input=${this.handleDateChange}
          />
        </label>

        <div class="field">
          <span class="field-label">Comprovante (opcional)</span>
          <div class="file-field">
            <button type="button" class="file-trigger" @click=${this.triggerFileInput}>
              ${this.files.length?"Substituir comprovante":"Escolher arquivo"}
            </button>
            <span class="file-hint">
              ${this.files.length?this.files[0].name:"Nenhum comprovante selecionado"}
            </span>
          </div>
          <input
            id="bb-attachments"
            type="file"
            accept="image/*,.pdf"
            hidden
            @change=${this.handleFilesInput}
          />
        </div>

        <button type="submit" ?disabled=${!this.isFormValid}>
          Concluir transação
        </button>
        <button type="button" class="secondary" @click=${this.handleCancel}>
          Cancelar
        </button>
      </form>
    `}};a.styles=d`
    :host {
      display: block;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: #111827;
    }

    select,
    input {
      border: 1px solid #d1d5db;
      border-radius: 0.75rem;
      padding: 0.85rem 1rem;
      font-size: 1rem;
      font-family: inherit;
      background: white;
    }

    select:focus,
    input:focus {
      outline: 2px solid var(--bb-primary, #374C34);
      outline-offset: 2px;
    }

    button {
      border: none;
      border-radius: 0.75rem;
      background: var(--bb-success, #47A138);
      color: white;
      padding: 0.9rem 1rem;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;
      transition: opacity 0.2s;
    }

    button:hover:not(:disabled) {
      opacity: 0.9;
    }

    button.secondary {
      background: var(--bb-error, #D8353A);
    }

    button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* Respiro entre o formulário e os botões de ação */
    button[type='submit'] {
      margin-top: 0.75rem;
    }

    /* ── File attachments ─────────────────────────── */
    .field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .field-label {
      font-size: 0.9rem;
      color: #111827;
    }

    .file-field {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    button.file-trigger {
      width: auto;
      background: white;
      color: var(--bb-primary, #374C34);
      border: 1px solid var(--bb-primary, #374C34);
      padding: 0.6rem 1rem;
      font-size: 0.9rem;
      font-weight: 600;
    }

    button.file-trigger:hover:not(:disabled) {
      background: #f3f4f6;
      opacity: 1;
    }

    .file-hint {
      font-size: 0.85rem;
      color: #6b7280;
    }

    .file-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .file-chip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      padding: 0.5rem 0.75rem;
      font-size: 0.85rem;
      color: #111827;
    }

    .file-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    button.file-remove {
      width: auto;
      background: none;
      border: none;
      color: var(--bb-error, #D8353A);
      font-size: 0.9rem;
      font-weight: 700;
      padding: 0 0.25rem;
      line-height: 1;
    }

    button.file-remove:hover:not(:disabled) {
      opacity: 0.7;
    }
  `;s([r()],a.prototype,"type",2);s([r()],a.prototype,"amount",2);s([r()],a.prototype,"date",2);s([r()],a.prototype,"description",2);s([r()],a.prototype,"depositType",2);s([r()],a.prototype,"agency",2);s([r()],a.prototype,"account",2);s([r()],a.prototype,"pixKey",2);s([r()],a.prototype,"isPix",2);s([r()],a.prototype,"files",2);a=s([m("bb-new-transaction-list")],a);const $={title:"Components/New Transaction List",component:"bb-new-transaction-list",tags:["autodocs"],parameters:{docs:{description:{component:'\nFormulário autônomo de nova transação — sem modal. Ideal para ser embutido\ndiretamente em uma página (como `bb-transaction-list` é em `/extrato`).\n\n**Eventos despachados:**\n- `submit` — `detail: { type: string, amount: number, date: string }`\n  `amount` já vem com sinal: negativo para Saque, positivo para Depósito e Pix.\n- `cancel` — sem detail; disparado ao clicar em "Cancelar".\n\n**Campos dinâmicos:**\n- Tipo **Pix** → exibe campo de Chave Pix.\n- Tipos **Depósito** / **Saque** → exibe campos de Agência (`XXXX-X`) e Conta (`XXXXXXX-X`).\n\n**Validação:**\nO botão "Concluir transação" só é habilitado quando todos os campos obrigatórios\nestão preenchidos e o valor é maior que zero.\n        '}}}},c={render:()=>{const e=document.createElement("bb-new-transaction-list");return e.addEventListener("submit",t=>{const{type:n,amount:i,date:o}=t.detail;console.log("[bb-new-transaction-list] submit →",{type:n,amount:i,date:o})}),e.addEventListener("cancel",()=>{console.log("[bb-new-transaction-list] cancel")}),e}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source},description:{story:"Formulário em seu estado inicial — pronto para receber interação.",...c.parameters?.docs?.description}}};const w=["Default"];export{c as Default,w as __namedExportsOrder,$ as default};
