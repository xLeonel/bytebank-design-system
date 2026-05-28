import{i as b,a as y,b as l}from"./lit-element-kDLlXEcT.js";import{n as m,t as g}from"./property-DOEbTfJd.js";import{r as i}from"./state-B_GU6Iad.js";import"./bb-modal-C1uUkDQj.js";var f=Object.defineProperty,v=Object.getOwnPropertyDescriptor,r=(t,e,a,n)=>{for(var s=n>1?void 0:n?v(e,a):e,u=t.length-1,d;u>=0;u--)(d=t[u])&&(s=(n?d(e,a,s):d(s))||s);return n&&s&&f(e,a,s),s};const h=["Depósito","Saque","Pix"];let o=class extends y{constructor(){super(...arguments),this.open=!1,this.ariaLabel="Nova transação",this.type=h[0],this.amount="",this.date="",this.agency="",this.account="",this.pixKey="",this.isPix=!1}firstUpdated(){this.isPix=this.type==="Pix"}handleTypeChange(t){const e=t.target;this.type=e.value,this.isPix=e.value==="Pix"}formatCurrency(t){if(!t)return"";const e=parseInt(t,10);return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(e/100)}handleAmountChange(t){const e=t.target,a=e.value.replace(/\D/g,""),n=this.formatCurrency(a);this.amount=n,e.value=n}handleDateChange(t){const e=t.target;this.date=e.value}formatAgency(t){const e=t.slice(0,5);return e.length<=4?e:`${e.slice(0,4)}-${e.slice(4)}`}formatAccount(t){const e=t.slice(0,8);return e.length<=1?e:`${e.slice(0,-1)}-${e.slice(-1)}`}handlePixKeyInput(t){this.pixKey=t.target.value}handleAgencyInput(t){const e=t.target,a=e.value.replace(/\D/g,""),n=this.formatAgency(a);this.agency=n,e.value=n}handleAccountInput(t){const e=t.target,a=e.value.replace(/\D/g,""),n=this.formatAccount(a);this.account=n,e.value=n}get isFormValid(){const t=this.amount.replace(/\D/g,""),e=t?parseInt(t,10)/100:0;return!t||e===0||!this.date?!1:this.isPix?this.pixKey.trim().length>0:this.agency.length>0&&this.account.length>=3}resetForm(){this.type=h[0],this.amount="",this.date="",this.agency="",this.account="",this.pixKey="",this.isPix=!1}close(){this.resetForm(),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}submitForm(t){t.preventDefault();const e=this.amount.replace(/\D/g,""),a=e?parseInt(e,10)/100:0;!this.type||!e||a===0||Number.isNaN(a)||!this.date||(this.dispatchEvent(new CustomEvent("submit",{detail:{type:this.type,amount:this.type==="Saque"?-Math.abs(a):a,date:this.date},bubbles:!0,composed:!0})),this.close())}render(){return l`
      <bb-modal title="Nova transação" size="lg" .open=${this.open} aria-label=${this.ariaLabel} @close=${this.close}>
        <form @submit=${this.submitForm}>
          <label>
            Tipo de transação
            <select .value=${this.type} @change=${this.handleTypeChange}>
              ${h.map(t=>l`<option value=${t}>${t}</option>`)}
            </select>
          </label>

          <label>
            Valor
            <input type="text" inputmode="numeric" .value=${this.amount} @input=${this.handleAmountChange} placeholder="R$ 0,00" />
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
              `:l`
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
              `}

          <label>
            Data
            <input type="date" .value=${this.date} @input=${this.handleDateChange} />
          </label>

          <button type="submit" ?disabled=${!this.isFormValid}>Concluir transação</button>
          <button type="button" class="secondary" @click=${this.close}>Cancelar</button>
        </form>
      </bb-modal>
    `}};o.styles=b`
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
    }

    button {
      border: none;
      border-radius: 0.75rem;
      background: var(--bb-success, #47A138);
      color: white;
      padding: 0.9rem 1rem;
      font-weight: 700;
      cursor: pointer;
    }

    button.secondary {
      background: var(--bb-error, #D8353A);
    }

    button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    button:disabled:hover {
      opacity: 0.4;
      transform: none;
    }
  `;r([m({type:Boolean,reflect:!0})],o.prototype,"open",2);r([m({type:String})],o.prototype,"ariaLabel",2);r([i()],o.prototype,"type",2);r([i()],o.prototype,"amount",2);r([i()],o.prototype,"date",2);r([i()],o.prototype,"agency",2);r([i()],o.prototype,"account",2);r([i()],o.prototype,"pixKey",2);r([i()],o.prototype,"isPix",2);o=r([g("bb-new-transaction-modal")],o);const P={title:"Components/New Transaction Modal",component:"bb-new-transaction-modal",tags:["autodocs"],argTypes:{open:{control:"boolean"}}},p={args:{open:!0},render:({open:t})=>`<bb-new-transaction-modal ${t?"open":""}></bb-new-transaction-modal>`},c={args:{open:!1},render:({open:t})=>`
<div>
  <p>O modal está fechado. Ative o controle "open" para visualizá-lo.</p>
  <bb-new-transaction-modal ${t?"open":""}></bb-new-transaction-modal>
</div>`};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    open: true
  },
  render: ({
    open
  }) => \`<bb-new-transaction-modal \${open ? 'open' : ''}></bb-new-transaction-modal>\`
}`,...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    open: false
  },
  render: ({
    open
  }) => \`
<div>
  <p>O modal está fechado. Ative o controle "open" para visualizá-lo.</p>
  <bb-new-transaction-modal \${open ? 'open' : ''}></bb-new-transaction-modal>
</div>\`
}`,...c.parameters?.docs?.source}}};const A=["Open","Closed"];export{c as Closed,p as Open,A as __namedExportsOrder,P as default};
