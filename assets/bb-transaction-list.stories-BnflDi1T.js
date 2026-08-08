import{i as b,a as f,b as o}from"./lit-element-kDLlXEcT.js";import{n as d,t as g}from"./property-DOEbTfJd.js";var v=Object.defineProperty,w=Object.getOwnPropertyDescriptor,c=(e,t,r,s)=>{for(var n=s>1?void 0:s?w(t,r):t,l=e.length-1,u;l>=0;l--)(u=e[l])&&(n=(s?u(t,r,n):u(n))||n);return s&&n&&v(t,r,n),n};const x=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"});function y(e){const[t,r,s]=e.split("/").map(Number);return new Date(s,r-1,t)}function E(e){const t=y(e);return new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"long",year:"numeric"}).format(t)}function $(e){const[,t,r]=e.split("/").map(Number);return`${r}-${String(t).padStart(2,"0")}`}function D(e){const t=y(e),r=new Intl.DateTimeFormat("pt-BR",{month:"long"}).format(t);return r.charAt(0).toUpperCase()+r.slice(1)}let a=class extends f{constructor(){super(...arguments),this.items=[],this.groupByMonth=!1,this.emptyTitle="Nenhuma transação por aqui ainda",this.emptyDescription="Cadastre uma transação para começar a acompanhar suas finanças."}selectItem(e){this.dispatchEvent(new CustomEvent("transaction-select",{detail:e,bubbles:!0,composed:!0}))}handleItemKey(e,t){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.selectItem(t))}renderItem(e){const t=e.amount<0?"negative":"positive";return o`
      <div
        class="item"
        role="button"
        tabindex="0"
        aria-label=${`Editar transação: ${e.type}`}
        @click=${()=>this.selectItem(e)}
        @keydown=${r=>this.handleItemKey(r,e)}
      >
        <div class="row">
          <div class="info">
            <span class="type">${e.type}</span>
            <span class="amount ${t}">${x.format(e.amount)}</span>
            ${e.description?o`<span class="description">${e.description}</span>`:""}
          </div>
          <span class="date">${E(e.date)}</span>
        </div>
        <div class="actions">
          <span class="edit-hint">Editar transação</span>
          <span class="icon" aria-hidden="true">›</span>
        </div>
      </div>
    `}renderGrouped(){const e=new Map;for(const t of this.items){const r=$(t.date);e.has(r)||e.set(r,{label:D(t.date),items:[]}),e.get(r).items.push(t)}return o`
      ${[...e.entries()].map(([,t])=>o`
          <div class="month-group">
            <div class="month-header">${t.label}</div>
            ${t.items.map(r=>this.renderItem(r))}
          </div>
        `)}
    `}renderEmpty(){return o`
      <div class="empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M9 13h6" />
          <path d="M9 17h3" />
        </svg>
        <span class="empty-title">${this.emptyTitle}</span>
        <span class="empty-description">${this.emptyDescription}</span>
      </div>
    `}render(){return!this.items||this.items.length===0?this.renderEmpty():o`
      <div class="list">
        ${this.groupByMonth?this.renderGrouped():this.items.map(e=>this.renderItem(e))}
      </div>
    `}};a.styles=b`
    :host {
      display: block;
    }

    /* ── Month header ─────────────────────────────── */
    .month-group:first-child .month-header {
      padding-top: 0;
    }

    .month-header {
      color: var(--bb-primary, #374C34);
      font-weight: 700;
      font-size: 1rem;
      padding: 1.25rem 0 0.25rem;
    }

    /* ── Item ─────────────────────────────────────── */
    .item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.75rem 0.5rem;
      margin: 0 -0.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background 0.15s;
    }

    .item:hover {
      background: #f9fafb;
    }

    .item:focus-visible {
      outline: 2px solid var(--bb-primary, #374C34);
      outline-offset: -2px;
    }

    /* Divider always on — border-top on every item that follows another item.
       Works both in flat list and inside .month-group */
    .item + .item {
      border-top: 1px solid #e5e7eb;
    }

    /* ── Row: left info + right date ──────────────── */
    .row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .type {
      font-size: 0.95rem;
      color: var(--bb-dark, #332E2B);
    }

    .amount {
      font-weight: 700;
      font-size: 0.95rem;
    }

    .amount.positive {
      color: var(--bb-success, #47A138);
    }

    .amount.negative {
      color: var(--bb-error, #D8353A);
    }

    .description {
      color: #6b7280;
      font-size: 0.8rem;
    }

    .date {
      color: #6b7280;
      font-size: 0.8rem;
      white-space: nowrap;
      flex-shrink: 0;
    }

    /* ── Actions ──────────────────────────────────── */
    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .edit-hint {
      color: var(--bb-primary, #374C34);
      font-size: 0.85rem;
      text-decoration: underline;
    }

    .item .icon {
      color: var(--bb-primary, #374C34);
      font-size: 1rem;
    }

    /* ── Empty state ──────────────────────────────── */
    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: 0.5rem;
      padding: 2.5rem 1rem;
    }

    .empty svg {
      width: 40px;
      height: 40px;
      color: var(--bb-primary, #374C34);
      opacity: 0.55;
      margin-bottom: 0.25rem;
    }

    .empty-title {
      font-weight: 700;
      font-size: 1rem;
      color: var(--bb-dark, #332E2B);
    }

    .empty-description {
      font-size: 0.85rem;
      color: #6b7280;
      max-width: 22rem;
      line-height: 1.4;
    }
  `;c([d({type:Array,attribute:!1})],a.prototype,"items",2);c([d({type:Boolean,attribute:"group-by-month",reflect:!0})],a.prototype,"groupByMonth",2);c([d({type:String,attribute:"empty-title"})],a.prototype,"emptyTitle",2);c([d({type:String,attribute:"empty-description"})],a.prototype,"emptyDescription",2);a=c([g("bb-transaction-list")],a);const M={title:"Components/Transaction List",component:"bb-transaction-list",tags:["autodocs"],argTypes:{groupByMonth:{control:"boolean"}}},h=[{id:"1",type:"Depósito",amount:1500,description:"Salário mensal",date:"01/05/2026"},{id:"2",type:"Pix",amount:-250,description:"Transferência para João",date:"03/05/2026"},{id:"3",type:"Saque",amount:-100,date:"05/05/2026"},{id:"4",type:"Depósito",amount:300,description:"Freelance",date:"10/05/2026"},{id:"5",type:"Depósito",amount:2e3,description:"Salário mensal",date:"01/04/2026"},{id:"6",type:"Pix",amount:-500,description:"Aluguel",date:"05/04/2026"},{id:"7",type:"Saque",amount:-80,date:"15/04/2026"}],i={render:()=>{const e=document.createElement("bb-transaction-list");return e.items=h,e}},p={render:()=>{const e=document.createElement("bb-transaction-list");return e.items=h,e.setAttribute("group-by-month",""),e}},m={render:()=>{const e=document.createElement("bb-transaction-list");return e.items=[],e}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    const el = document.createElement('bb-transaction-list') as any;
    el.items = sampleItems;
    return el;
  }
}`,...i.parameters?.docs?.source},description:{story:"Lista plana com divisores entre cada item",...i.parameters?.docs?.description}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const el = document.createElement('bb-transaction-list') as any;
    el.items = sampleItems;
    el.setAttribute('group-by-month', '');
    return el;
  }
}`,...p.parameters?.docs?.source},description:{story:"Agrupado por mês — header em verde primary acima de cada grupo",...p.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const el = document.createElement('bb-transaction-list') as any;
    el.items = [];
    return el;
  }
}`,...m.parameters?.docs?.source},description:{story:"Estado vazio — sem transações. Mensagem configurável via empty-title / empty-description",...m.parameters?.docs?.description}}};const C=["Default","GroupedByMonth","Empty"];export{i as Default,m as Empty,p as GroupedByMonth,C as __namedExportsOrder,M as default};
