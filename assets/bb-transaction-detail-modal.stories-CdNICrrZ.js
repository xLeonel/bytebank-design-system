import{i as y,a as f,b as m}from"./lit-element-kDLlXEcT.js";import{n as u,t as v}from"./property-DOEbTfJd.js";import{r as b}from"./state-B_GU6Iad.js";import"./bb-modal-C1uUkDQj.js";var g=Object.defineProperty,D=Object.getOwnPropertyDescriptor,n=(e,r,d,o)=>{for(var a=o>1?void 0:o?D(r,d):r,c=e.length-1,p;c>=0;c--)(p=e[c])&&(a=(o?p(r,d,a):p(a))||a);return o&&a&&g(r,d,a),a};const T=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"});let t=class extends f{constructor(){super(...arguments),this.open=!1,this.transaction=null,this.ariaLabel="Detalhar transação",this.editedType="",this.editedDescription=""}updated(e){e.has("transaction")&&this.transaction&&(this.editedType=this.transaction.type,this.editedDescription=this.transaction.description??"")}get hasChanges(){return this.transaction?this.editedType!==this.transaction.type||this.editedDescription!==(this.transaction.description??""):!1}get isFormValid(){return this.editedType.trim().length>0}close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}handleTypeInput(e){this.editedType=e.target.value}handleDescriptionInput(e){this.editedDescription=e.target.value}handleSave(e){e.preventDefault(),!(!this.transaction||!this.hasChanges||!this.isFormValid)&&(this.dispatchEvent(new CustomEvent("save",{detail:{id:this.transaction.id,type:this.editedType,description:this.editedDescription},bubbles:!0,composed:!0})),this.close())}handleDelete(){this.transaction&&(this.dispatchEvent(new CustomEvent("delete",{detail:{id:this.transaction.id},bubbles:!0,composed:!0})),this.close())}render(){return!this.open||!this.transaction?m``:m`
      <bb-modal title="Detalhar transação" .open=${this.open} aria-label=${this.ariaLabel} @close=${this.close}>
        <form @submit=${this.handleSave}>
          <label>
            Nome da transação
            <input id="type" type="text" .value=${this.editedType} @input=${this.handleTypeInput} />
          </label>

          <label>
            Descrição (opcional)
            <input id="description" type="text" .value=${this.editedDescription} @input=${this.handleDescriptionInput} />
          </label>

          <label>
            Valor
            <input type="text" disabled .value=${T.format(Math.abs(this.transaction.amount))} />
          </label>

          <label>
            Data Operação
            <input type="text" disabled .value=${this.transaction.date} />
          </label>

          <button type="submit" ?disabled=${!this.hasChanges||!this.isFormValid}>Salvar alterações</button>
          <button class="delete" type="button" @click=${this.handleDelete}>Excluir transação</button>
        </form>
      </bb-modal>
    `}};t.styles=y`
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

    button {
      border: none;
      border-radius: 0.75rem;
      background: var(--bb-success, #47A138);
      color: white;
      padding: 0.9rem 1rem;
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
  `;n([u({type:Boolean,reflect:!0})],t.prototype,"open",2);n([u({type:Object,attribute:!1})],t.prototype,"transaction",2);n([u({type:String})],t.prototype,"ariaLabel",2);n([b()],t.prototype,"editedType",2);n([b()],t.prototype,"editedDescription",2);t=n([v("bb-transaction-detail-modal")],t);const w={title:"Components/Transaction Detail Modal",component:"bb-transaction-detail-modal",tags:["autodocs"],argTypes:{open:{control:"boolean"}}},h={id:"1",type:"Depósito",description:"Salário mensal",amount:1500,date:"01/05/2026"},i={render:()=>{const e=document.createElement("bb-transaction-detail-modal");return e.open=!0,e.transaction=h,e}},s={render:()=>{const e=document.createElement("bb-transaction-detail-modal");return e.open=!0,e.transaction={id:"2",type:"Pix",description:"Transferência para João",amount:-250,date:"03/05/2026"},e}},l={render:()=>{const e=document.createElement("bb-transaction-detail-modal");return e.open=!1,e.transaction=h,e}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    const el = document.createElement('bb-transaction-detail-modal') as any;
    el.open = true;
    el.transaction = sampleTransaction;
    return el;
  }
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const el = document.createElement('bb-transaction-detail-modal') as any;
    el.open = false;
    el.transaction = sampleTransaction;
    return el;
  }
}`,...l.parameters?.docs?.source}}};const O=["Open","PixTransaction","Closed"];export{l as Closed,i as Open,s as PixTransaction,O as __namedExportsOrder,w as default};
