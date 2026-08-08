import{i as $,a as D,b as i}from"./lit-element-kDLlXEcT.js";import{n as y,t as F}from"./property-DOEbTfJd.js";import{r as m}from"./state-B_GU6Iad.js";import"./bb-modal-C1uUkDQj.js";var C=Object.defineProperty,j=Object.getOwnPropertyDescriptor,s=(e,t,n,a)=>{for(var r=a>1?void 0:a?j(t,n):t,l=e.length-1,d;l>=0;l--)(d=e[l])&&(r=(a?d(t,n,r):d(r))||r);return a&&r&&C(t,n,r),r};const f=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"});function v(e){const[t,n,a]=e.split("/");return a&&n&&t?`${a}-${n}-${t}`:""}function T(e){const[t,n,a]=e.split("-");return t&&n&&a?`${a}/${n}/${t}`:e}let o=class extends D{constructor(){super(...arguments),this.open=!1,this.transaction=null,this.ariaLabel="Editar transação",this.editedDescription="",this.editedAmount="",this.editedDate="",this.newFiles=[],this.enlarged=null}updated(e){e.has("transaction")&&this.transaction&&(this.editedDescription=this.transaction.description??"",this.editedAmount=f.format(Math.abs(this.transaction.amount)),this.editedDate=v(this.transaction.date),this.newFiles=[],this.enlarged=null)}get hasChanges(){if(!this.transaction)return!1;const e=f.format(Math.abs(this.transaction.amount)),t=v(this.transaction.date);return this.editedDescription!==(this.transaction.description??"")||this.editedAmount!==e||this.editedDate!==t||this.newFiles.length>0}get isFormValid(){const e=this.editedAmount.replace(/\D/g,"");return(e?parseInt(e,10)/100:0)>0&&this.editedDate.length>0}close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}handleDescriptionInput(e){this.editedDescription=e.target.value}handleAmountInput(e){const t=e.target,n=t.value.replace(/\D/g,""),a=n?f.format(parseInt(n,10)/100):"";this.editedAmount=a,t.value=a}handleDateInput(e){this.editedDate=e.target.value}triggerFileInput(){this.renderRoot.querySelector("#bb-edit-attachments")?.click()}handleFilesInput(e){const t=e.target;t.files&&t.files[0]&&(this.newFiles=[t.files[0]]),t.value=""}removeNewFile(e){this.newFiles=this.newFiles.filter((t,n)=>n!==e)}enlarge(e,t){if(t.includes("pdf")&&e.startsWith("data:"))try{const[n,a]=e.split(","),r=(n.match(/data:(.*?);base64/)||[])[1]||"application/pdf",l=atob(a),d=new Uint8Array(l.length);for(let u=0;u<l.length;u++)d[u]=l.charCodeAt(u);const w=URL.createObjectURL(new Blob([d],{type:r}));this.enlarged={url:w,type:t};return}catch{}this.enlarged={url:e,type:t}}closeEnlarge(){this.enlarged?.url.startsWith("blob:")&&URL.revokeObjectURL(this.enlarged.url),this.enlarged=null}handleSave(e){if(e.preventDefault(),!this.transaction||!this.hasChanges||!this.isFormValid)return;const t=this.editedAmount.replace(/\D/g,""),n=parseInt(t,10)/100,a=Math.sign(this.transaction.amount||-1)===-1?-Math.abs(n):Math.abs(n);this.dispatchEvent(new CustomEvent("save",{detail:{id:this.transaction.id,description:this.editedDescription,amount:a,date:T(this.editedDate),newAttachments:this.newFiles},bubbles:!0,composed:!0})),this.close()}handleDelete(){this.transaction&&(this.dispatchEvent(new CustomEvent("delete",{detail:{id:this.transaction.id},bubbles:!0,composed:!0})),this.close())}renderAttachments(){const e=(this.transaction?.attachments??[])[0],t=this.newFiles[0],n=!!(t||e),a=t?t.name:e?e.name:"";return i`
      <div class="field">
        <span class="field-label">Comprovante (opcional)</span>
        ${e&&!t?i`
              <div class="attachments">
                ${e.type.startsWith("image/")?i`
                      <button type="button" class="thumb" title=${e.name} @click=${()=>this.enlarge(e.url,e.type)}>
                        <img src=${e.url} alt=${e.name} />
                      </button>
                    `:e.type.includes("pdf")?i`
                        <button type="button" class="thumb thumb-pdf" title=${e.name} @click=${()=>this.enlarge(e.url,e.type)}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <path d="M14 2v6h6" />
                          </svg>
                          PDF
                        </button>
                      `:i`<a class="file-link" href=${e.url} target="_blank" rel="noopener">${e.name}</a>`}
              </div>
            `:""}
        <div class="file-field">
          <button type="button" class="file-trigger" @click=${this.triggerFileInput}>
            ${n?"Substituir comprovante":"Escolher arquivo"}
          </button>
          <span class="file-hint">${n?a:"Nenhum comprovante selecionado"}</span>
        </div>
        <input id="bb-edit-attachments" type="file" accept="image/*,.pdf" hidden @change=${this.handleFilesInput} />
      </div>
    `}render(){return!this.open||!this.transaction?i``:i`
      <bb-modal title="Editar transação" .open=${this.open} aria-label=${this.ariaLabel} @close=${this.close}>
        <form @submit=${this.handleSave}>
          <label>
            Tipo de transação
            <input type="text" disabled .value=${this.transaction.type} />
          </label>

          <label>
            Descrição (opcional)
            <input id="description" type="text" .value=${this.editedDescription} @input=${this.handleDescriptionInput} placeholder="Digite a descrição da transação" />
          </label>

          ${this.transaction.type==="Transferência Pix"?i`
            <label>
              Chave Pix
              <input type="text" disabled .value=${this.transaction.pixKey??""} />
            </label>
          `:this.transaction.agency||this.transaction.account?i`
            ${this.transaction.agency?i`
              <label>
                Agência
                <input type="text" disabled .value=${this.transaction.agency} />
              </label>
            `:""}
            ${this.transaction.account?i`
              <label>
                Conta
                <input type="text" disabled .value=${this.transaction.account} />
              </label>
            `:""}
          `:""}

          <label>
            Valor
            <input type="text" inputmode="numeric" .value=${this.editedAmount} @input=${this.handleAmountInput} />
          </label>

          <label>
            Data Operação
            <input type="date" .value=${this.editedDate} @input=${this.handleDateInput} />
          </label>

          ${this.renderAttachments()}

          <button type="submit" ?disabled=${!this.hasChanges||!this.isFormValid}>Salvar alterações</button>
          <button class="delete" type="button" @click=${this.handleDelete}>Excluir transação</button>
        </form>
      </bb-modal>
      ${this.enlarged?i`
            <div class="lightbox" @click=${this.closeEnlarge}>
              <button type="button" class="lightbox-close" @click=${this.closeEnlarge} aria-label="Fechar">
                ✕
              </button>
              ${this.enlarged.type.includes("pdf")?i`<iframe
                    class="lightbox-pdf"
                    src=${this.enlarged.url}
                    title="Comprovante em PDF"
                    @click=${e=>e.stopPropagation()}
                  ></iframe>`:i`<img
                    src=${this.enlarged.url}
                    alt="Comprovante ampliado"
                    @click=${e=>e.stopPropagation()}
                  />`}
            </div>
          `:""}
    `}};o.styles=$`
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

    input {
      border: 1px solid #d1d5db;
      border-radius: 0.75rem;
      padding: 0.85rem 1rem;
      font-size: 1rem;
      font-family: inherit;
    }

    input:disabled {
      background: #f3f4f6;
      color: #6b7280;
      cursor: not-allowed;
      border-color: #e5e7eb;
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
    }

    button.delete {
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

    /* ── Anexos ───────────────────────────────────── */
    .field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .field-label {
      font-size: 0.9rem;
      color: #111827;
    }

    .attachments {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    button.thumb {
      width: 64px;
      height: 64px;
      padding: 0;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      overflow: hidden;
      background: #f9fafb;
      cursor: pointer;
    }

    button.thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    button.thumb.thumb-pdf {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.15rem;
      color: var(--bb-error, #D8353A);
      font-size: 0.65rem;
      font-weight: 700;
    }

    button.thumb.thumb-pdf svg {
      width: 26px;
      height: 26px;
    }

    .file-link {
      display: inline-flex;
      align-items: center;
      padding: 0.5rem 0.75rem;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      font-size: 0.85rem;
      color: var(--bb-primary, #374C34);
      text-decoration: none;
    }

    .muted {
      font-size: 0.85rem;
      color: #6b7280;
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

    button.file-trigger:hover {
      background: #f3f4f6;
    }

    .file-hint {
      font-size: 0.85rem;
      color: #6b7280;
      overflow: hidden;
      text-overflow: ellipsis;
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
    }

    .lightbox {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      z-index: 1000;
      cursor: zoom-out;
    }

    .lightbox img {
      max-width: 90vw;
      max-height: 90vh;
      border-radius: 0.5rem;
    }

    .lightbox-pdf {
      width: 90vw;
      height: 90vh;
      border: none;
      border-radius: 0.5rem;
      background: white;
    }

    button.lightbox-close {
      position: fixed;
      top: 1rem;
      right: 1rem;
      width: 2.5rem;
      height: 2.5rem;
      padding: 0;
      background: rgba(255, 255, 255, 0.15);
      color: white;
      border: none;
      border-radius: 999px;
      font-size: 1.1rem;
      line-height: 1;
      cursor: pointer;
    }

    button.lightbox-close:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  `;s([y({type:Boolean,reflect:!0})],o.prototype,"open",2);s([y({type:Object,attribute:!1})],o.prototype,"transaction",2);s([y({type:String})],o.prototype,"ariaLabel",2);s([m()],o.prototype,"editedDescription",2);s([m()],o.prototype,"editedAmount",2);s([m()],o.prototype,"editedDate",2);s([m()],o.prototype,"newFiles",2);s([m()],o.prototype,"enlarged",2);o=s([F("bb-transaction-detail-modal")],o);const R={title:"Components/Transaction Detail Modal",component:"bb-transaction-detail-modal",tags:["autodocs"],argTypes:{open:{control:"boolean"}}},x={id:"1",type:"Depósito",description:"Salário mensal",amount:1500,date:"01/05/2026"},h={render:()=>{const e=document.createElement("bb-transaction-detail-modal");return e.open=!0,e.transaction=x,e}},b={render:()=>{const e=document.createElement("bb-transaction-detail-modal");return e.open=!0,e.transaction={id:"2",type:"Pix",description:"Transferência para João",amount:-250,date:"03/05/2026"},e}},g={render:()=>{const e=document.createElement("bb-transaction-detail-modal");return e.open=!1,e.transaction=x,e}},c={render:()=>{const e=(n,a)=>"data:image/svg+xml;base64,"+btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160"><rect width="100%" height="100%" fill="${a}"/><text x="50%" y="50%" fill="white" font-family="sans-serif" font-size="24" text-anchor="middle" dy=".3em">${n}</text></svg>`),t=document.createElement("bb-transaction-detail-modal");return t.open=!0,t.transaction={id:"3",type:"Depósito",description:"Salário mensal",amount:1500,date:"01/05/2026",attachments:[{id:"a1",name:"comprovante.svg",type:"image/svg+xml",url:e("Comprovante","#374C34")}]},t}},p={render:()=>{const e=`%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 300 200]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj
4 0 obj<</Length 46>>stream
BT /F1 20 Tf 40 100 Td (Comprovante PDF) Tj ET
endstream endobj
5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj
trailer<</Root 1 0 R>>`,t=document.createElement("bb-transaction-detail-modal");return t.open=!0,t.transaction={id:"4",type:"Depósito",description:"Salário mensal",amount:1500,date:"01/05/2026",attachments:[{id:"p1",name:"comprovante.pdf",type:"application/pdf",url:"data:application/pdf;base64,"+btoa(e)}]},t}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const el = document.createElement('bb-transaction-detail-modal') as any;
    el.open = true;
    el.transaction = sampleTransaction;
    return el;
  }
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const el = document.createElement('bb-transaction-detail-modal') as any;
    el.open = true;
    el.transaction = {
      id: '2',
      type: 'Pix',
      description: 'Transferência para João',
      amount: -250,
      date: '03/05/2026'
    };
    return el;
  }
}`,...b.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => {
    const el = document.createElement('bb-transaction-detail-modal') as any;
    el.open = false;
    el.transaction = sampleTransaction;
    return el;
  }
}`,...g.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const img = (label: string, color: string) => 'data:image/svg+xml;base64,' + btoa(\`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160"><rect width="100%" height="100%" fill="\${color}"/><text x="50%" y="50%" fill="white" font-family="sans-serif" font-size="24" text-anchor="middle" dy=".3em">\${label}</text></svg>\`);
    const el = document.createElement('bb-transaction-detail-modal') as any;
    el.open = true;
    el.transaction = {
      id: '3',
      type: 'Depósito',
      description: 'Salário mensal',
      amount: 1500,
      date: '01/05/2026',
      attachments: [{
        id: 'a1',
        name: 'comprovante.svg',
        type: 'image/svg+xml',
        url: img('Comprovante', '#374C34')
      }]
    };
    return el;
  }
}`,...c.parameters?.docs?.source},description:{story:"Com anexos — miniaturas clicáveis (abre ampliado) + botão para adicionar",...c.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const pdf = '%PDF-1.4\\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 300 200]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj\\n4 0 obj<</Length 46>>stream\\nBT /F1 20 Tf 40 100 Td (Comprovante PDF) Tj ET\\nendstream endobj\\n5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj\\ntrailer<</Root 1 0 R>>';
    const el = document.createElement('bb-transaction-detail-modal') as any;
    el.open = true;
    el.transaction = {
      id: '4',
      type: 'Depósito',
      description: 'Salário mensal',
      amount: 1500,
      date: '01/05/2026',
      attachments: [{
        id: 'p1',
        name: 'comprovante.pdf',
        type: 'application/pdf',
        url: 'data:application/pdf;base64,' + btoa(pdf)
      }]
    };
    return el;
  }
}`,...p.parameters?.docs?.source},description:{story:"Comprovante em PDF — miniatura com ícone; clique abre preview inline (iframe)",...p.parameters?.docs?.description}}};const S=["Open","PixTransaction","Closed","WithAttachments","WithPdfAttachment"];export{g as Closed,h as Open,b as PixTransaction,c as WithAttachments,p as WithPdfAttachment,S as __namedExportsOrder,R as default};
