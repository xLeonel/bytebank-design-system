import{i as b,a as f,b as s}from"./lit-element-kDLlXEcT.js";import{n as p,t as g}from"./property-DOEbTfJd.js";var v=Object.defineProperty,k=Object.getOwnPropertyDescriptor,i=(e,t,r,o)=>{for(var n=o>1?void 0:o?k(t,r):t,c=e.length-1,u;c>=0;c--)(u=e[c])&&(n=(o?u(t,r,n):u(n))||n);return o&&n&&v(t,r,n),n};const w=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"});function y(e){const[t,r,o]=e.split("/").map(Number);return new Date(o,r-1,t)}function x(e){const t=y(e);return new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"long",year:"numeric"}).format(t)}function $(e){const[,t,r]=e.split("/").map(Number);return`${r}-${String(t).padStart(2,"0")}`}function E(e){const t=y(e),r=new Intl.DateTimeFormat("pt-BR",{month:"long"}).format(t);return r.charAt(0).toUpperCase()+r.slice(1)}let a=class extends f{constructor(){super(...arguments),this.items=[],this.groupByMonth=!1,this.loading=!1,this.skeletonRows=5,this.emptyTitle="Nenhuma transação por aqui ainda",this.emptyDescription="Cadastre uma transação para começar a acompanhar suas finanças."}selectItem(e){this.dispatchEvent(new CustomEvent("transaction-select",{detail:e,bubbles:!0,composed:!0}))}handleItemKey(e,t){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.selectItem(t))}renderItem(e){const t=e.amount<0?"negative":"positive";return s`
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
            <span class="amount ${t}">${w.format(e.amount)}</span>
            ${e.description?s`<span class="description">${e.description}</span>`:""}
          </div>
          <div class="meta">
            <span class="date">${x(e.date)}</span>
            ${e.category?s`<span class="category-tag">${e.category}</span>`:""}
          </div>
        </div>
        <div class="actions">
          <span class="edit-hint">Editar transação</span>
          <span class="icon" aria-hidden="true">›</span>
        </div>
      </div>
    `}renderGrouped(){const e=new Map;for(const t of this.items){const r=$(t.date);e.has(r)||e.set(r,{label:E(t.date),items:[]}),e.get(r).items.push(t)}return s`
      ${[...e.entries()].map(([,t])=>s`
          <div class="month-group">
            <div class="month-header">${t.label}</div>
            ${t.items.map(r=>this.renderItem(r))}
          </div>
        `)}
    `}renderSkeleton(){const e=Array.from({length:Math.max(1,this.skeletonRows)});return s`
      <div class="list" aria-busy="true" aria-label="Carregando transações">
        ${e.map(()=>s`
            <div class="sk-item">
              <div class="sk-row">
                <div class="sk-col" style="flex:1">
                  <span class="sk-line" style="width:35%"></span>
                  <span class="sk-line" style="width:22%"></span>
                  <span class="sk-line" style="width:55%"></span>
                </div>
                <div class="sk-col" style="align-items:flex-end">
                  <span class="sk-line" style="width:90px"></span>
                  <span class="sk-line" style="width:60px"></span>
                </div>
              </div>
            </div>
          `)}
      </div>
    `}renderEmpty(){return s`
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
    `}render(){return this.loading?this.renderSkeleton():!this.items||this.items.length===0?this.renderEmpty():s`
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
      color: var(--bb-success, #2E7D32);
    }

    .amount.negative {
      color: var(--bb-error, #D8353A);
    }

    .description {
      color: #6b7280;
      font-size: 0.8rem;
    }

    .meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.35rem;
      flex-shrink: 0;
    }

    .date {
      color: #6b7280;
      font-size: 0.8rem;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .category-tag {
      display: inline-block;
      background: #eef3ec;
      color: var(--bb-primary, #374C34);
      border: 1px solid rgba(55, 76, 52, 0.15);
      border-radius: 999px;
      padding: 0.1rem 0.55rem;
      font-size: 0.7rem;
      font-weight: 600;
      white-space: nowrap;
    }

    /* ── Skeleton (loading) ───────────────────────── */
    .sk-item {
      padding: 0.85rem 0.5rem;
      margin: 0 -0.5rem;
    }
    .sk-item + .sk-item {
      border-top: 1px solid #e5e7eb;
    }
    .sk-row {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }
    .sk-line {
      height: 0.7rem;
      border-radius: 0.375rem;
      background: linear-gradient(90deg, #eee 25%, #f5f5f5 37%, #eee 63%);
      background-size: 400% 100%;
      animation: bb-shimmer 1.4s ease infinite;
    }
    .sk-col { display: flex; flex-direction: column; gap: 0.5rem; }
    @keyframes bb-shimmer {
      0% { background-position: 100% 50%; }
      100% { background-position: 0 50%; }
    }
    @media (prefers-reduced-motion: reduce) {
      .sk-line { animation: none; }
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
  `;i([p({type:Array,attribute:!1})],a.prototype,"items",2);i([p({type:Boolean,attribute:"group-by-month",reflect:!0})],a.prototype,"groupByMonth",2);i([p({type:Boolean,reflect:!0})],a.prototype,"loading",2);i([p({type:Number,attribute:"skeleton-rows"})],a.prototype,"skeletonRows",2);i([p({type:String,attribute:"empty-title"})],a.prototype,"emptyTitle",2);i([p({type:String,attribute:"empty-description"})],a.prototype,"emptyDescription",2);a=i([g("bb-transaction-list")],a);const M={title:"Components/Transaction List",component:"bb-transaction-list",tags:["autodocs"],argTypes:{groupByMonth:{control:"boolean"}}},h=[{id:"1",type:"Depósito",amount:1500,description:"Salário mensal",date:"01/05/2026"},{id:"2",type:"Pix",amount:-250,description:"Transferência para João",date:"03/05/2026"},{id:"3",type:"Saque",amount:-100,date:"05/05/2026"},{id:"4",type:"Depósito",amount:300,description:"Freelance",date:"10/05/2026"},{id:"5",type:"Depósito",amount:2e3,description:"Salário mensal",date:"01/04/2026"},{id:"6",type:"Pix",amount:-500,description:"Aluguel",date:"05/04/2026"},{id:"7",type:"Saque",amount:-80,date:"15/04/2026"}],l={render:()=>{const e=document.createElement("bb-transaction-list");return e.items=h,e}},d={render:()=>{const e=document.createElement("bb-transaction-list");return e.items=h,e.setAttribute("group-by-month",""),e}},m={render:()=>{const e=document.createElement("bb-transaction-list");return e.items=[],e}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => {
    const el = document.createElement('bb-transaction-list') as any;
    el.items = sampleItems;
    return el;
  }
}`,...l.parameters?.docs?.source},description:{story:"Lista plana com divisores entre cada item",...l.parameters?.docs?.description}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const el = document.createElement('bb-transaction-list') as any;
    el.items = sampleItems;
    el.setAttribute('group-by-month', '');
    return el;
  }
}`,...d.parameters?.docs?.source},description:{story:"Agrupado por mês — header em verde primary acima de cada grupo",...d.parameters?.docs?.description}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const el = document.createElement('bb-transaction-list') as any;
    el.items = [];
    return el;
  }
}`,...m.parameters?.docs?.source},description:{story:"Estado vazio — sem transações. Mensagem configurável via empty-title / empty-description",...m.parameters?.docs?.description}}};const I=["Default","GroupedByMonth","Empty"];export{l as Default,m as Empty,d as GroupedByMonth,I as __namedExportsOrder,M as default};
