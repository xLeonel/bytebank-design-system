import{i as h,a as d,b as l}from"./lit-element-kDLlXEcT.js";import{t as m}from"./property-DOEbTfJd.js";import{r}from"./state-B_GU6Iad.js";var f=Object.defineProperty,g=Object.getOwnPropertyDescriptor,n=(e,t,i,o)=>{for(var s=o>1?void 0:o?g(t,i):t,c=e.length-1,p;c>=0;c--)(p=e[c])&&(s=(o?p(t,i,s):p(s))||s);return o&&s&&f(t,i,s),s};const y=["Depósito","Saque","Transferência Pix"],u=["Alimentação","Transporte","Moradia","Lazer","Saúde","Educação","Compras","Serviços","Salário","Investimentos","Outros"],b={Alimentação:["mercado","supermercado","ifood","restaurante","lanche","padaria","food","cafe","café"],Transporte:["uber","99","gasolina","combustivel","combustível","onibus","ônibus","metro","metrô","passagem","estacionamento","pedagio","pedágio"],Moradia:["aluguel","condominio","condomínio","luz","energia","agua","água","gas","gás","internet","iptu"],Lazer:["cinema","netflix","spotify","show","viagem","jogo","game","streaming","bar","balada"],Saúde:["farmacia","farmácia","remedio","remédio","medico","médico","consulta","hospital","dentista","academia"],Educação:["curso","faculdade","escola","livro","mensalidade","fiap","udemy","alura"],Compras:["amazon","mercado livre","shopping","loja","roupa","magalu","aliexpress","shopee"],Serviços:["assinatura","taxa","tarifa","servico","serviço","manutencao","manutenção"],Salário:["salario","salário","pagamento","holerite","proventos"],Investimentos:["investimento","cdb","acao","ação","acoes","ações","tesouro","fii","renda fixa","bitcoin","cripto"]};function v(e){const t=(e??"").toLowerCase().trim();if(!t)return"";for(const i of u)if((b[i]??[]).some(o=>t.includes(o)))return i;return"Outros"}let a=class extends d{constructor(){super(...arguments),this.type="",this.amount="",this.date="",this.description="",this.depositType="",this.agency="",this.account="",this.pixKey="",this.isPix=!1,this.files=[],this.category="",this.categoryTouched=!1}formatCurrency(e){if(!e)return"";const t=parseInt(e,10);return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t/100)}formatAgency(e){const t=e.slice(0,5);return t.length<=4?t:`${t.slice(0,4)}-${t.slice(4)}`}formatAccount(e){const t=e.slice(0,8);return t.length<=1?t:`${t.slice(0,-1)}-${t.slice(-1)}`}get isFormValid(){const e=this.amount.replace(/\D/g,""),t=e?parseInt(e,10)/100:0;return!this.type||!e||t===0||!this.date?!1:this.isPix?this.pixKey.trim().length>0:this.type==="Depósito"?this.depositType?this.depositType==="other"?this.agency.length>0&&this.account.length>=3:!0:!1:!0}handleTypeChange(e){const t=e.target;this.type=t.value,this.isPix=t.value==="Transferência Pix",this.depositType="",this.agency="",this.account="",this.pixKey=""}handleDepositTypeChange(e){this.depositType=e.target.value,this.agency="",this.account=""}handleAmountInput(e){const t=e.target,i=t.value.replace(/\D/g,""),o=this.formatCurrency(i);this.amount=o,t.value=o}handleAgencyInput(e){const t=e.target,i=t.value.replace(/\D/g,""),o=this.formatAgency(i);this.agency=o,t.value=o}handleAccountInput(e){const t=e.target,i=t.value.replace(/\D/g,""),o=this.formatAccount(i);this.account=o,t.value=o}handlePixKeyInput(e){this.pixKey=e.target.value}handleDescriptionInput(e){this.description=e.target.value,this.categoryTouched||(this.category=v(this.description))}handleCategoryChange(e){this.category=e.target.value,this.categoryTouched=!0}handleDateChange(e){this.date=e.target.value}triggerFileInput(){this.renderRoot.querySelector("#bb-attachments")?.click()}handleFilesInput(e){const t=e.target;this.files=t.files&&t.files[0]?[t.files[0]]:[]}removeFile(e){if(this.files=this.files.filter((t,i)=>i!==e),this.files.length===0){const t=this.renderRoot.querySelector("#bb-attachments");t&&(t.value="")}}resetForm(){this.type="",this.amount="",this.date="",this.description="",this.depositType="",this.agency="",this.account="",this.pixKey="",this.isPix=!1,this.files=[],this.category="",this.categoryTouched=!1;const e=this.renderRoot.querySelector("#bb-attachments");e&&(e.value="")}submitForm(e){if(e.preventDefault(),!this.isFormValid)return;const t=this.amount.replace(/\D/g,""),i=parseInt(t,10)/100,o=this.type==="Saque"||this.type==="Transferência Pix"||this.type==="Depósito"&&this.depositType==="other",s={type:this.type,amount:o?-Math.abs(i):i,date:this.date,description:this.description||void 0};this.isPix?s.pixKey=this.pixKey:this.type==="Depósito"&&this.depositType==="other"&&(s.agency=this.agency,s.account=this.account),this.files.length&&(s.attachments=this.files),this.category&&(s.category=this.category),this.dispatchEvent(new CustomEvent("submit",{detail:s,bubbles:!0,composed:!0})),this.resetForm()}handleCancel(){this.resetForm(),this.dispatchEvent(new CustomEvent("cancel",{bubbles:!0,composed:!0}))}render(){return l`
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
          Categoria (opcional)
          <select .value=${this.category} @change=${this.handleCategoryChange}>
            <option value="">Selecione a categoria</option>
            ${u.map(e=>l`<option value=${e}>${e}</option>`)}
          </select>
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
    `}};a.styles=h`
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
      background: var(--bb-success, #2E7D32);
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
  `;n([r()],a.prototype,"type",2);n([r()],a.prototype,"amount",2);n([r()],a.prototype,"date",2);n([r()],a.prototype,"description",2);n([r()],a.prototype,"depositType",2);n([r()],a.prototype,"agency",2);n([r()],a.prototype,"account",2);n([r()],a.prototype,"pixKey",2);n([r()],a.prototype,"isPix",2);n([r()],a.prototype,"files",2);n([r()],a.prototype,"category",2);n([r()],a.prototype,"categoryTouched",2);a=n([m("bb-new-transaction-list")],a);export{u as T};
