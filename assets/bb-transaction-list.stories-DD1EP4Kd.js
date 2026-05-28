import{i as h,a as y,b as a}from"./lit-element-kDLlXEcT.js";import{n as l,t as f}from"./property-DOEbTfJd.js";var g=Object.defineProperty,v=Object.getOwnPropertyDescriptor,d=(e,t,r,o)=>{for(var n=o>1?void 0:o?v(t,r):t,p=e.length-1,m;p>=0;p--)(m=e[p])&&(n=(o?m(t,r,n):m(n))||n);return o&&n&&g(t,r,n),n};const w=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"});function u(e){const[t,r,o]=e.split("/").map(Number);return new Date(o,r-1,t)}function x(e){const t=u(e);return new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"long",year:"numeric"}).format(t)}function D(e){const[,t,r]=e.split("/").map(Number);return`${r}-${String(t).padStart(2,"0")}`}function $(e){const t=u(e),r=new Intl.DateTimeFormat("pt-BR",{month:"long"}).format(t);return r.charAt(0).toUpperCase()+r.slice(1)}let c=class extends y{constructor(){super(...arguments),this.items=[],this.groupByMonth=!1}selectItem(e){this.dispatchEvent(new CustomEvent("transaction-select",{detail:e,bubbles:!0,composed:!0}))}renderItem(e){const t=e.amount<0?"negative":"positive";return a`
      <div class="item">
        <div class="row">
          <div class="info">
            <span class="type">${e.type}</span>
            <span class="amount ${t}">${w.format(e.amount)}</span>
            ${e.description?a`<span class="description">${e.description}</span>`:""}
          </div>
          <span class="date">${x(e.date)}</span>
        </div>
        <div class="actions">
          <button @click=${()=>this.selectItem(e)} type="button">Detalhar transação</button>
          <button class="icon" @click=${()=>this.selectItem(e)} type="button">›</button>
        </div>
      </div>
    `}renderGrouped(){const e=new Map;for(const t of this.items){const r=D(t.date);e.has(r)||e.set(r,{label:$(t.date),items:[]}),e.get(r).items.push(t)}return a`
      ${[...e.entries()].map(([,t])=>a`
          <div class="month-group">
            <div class="month-header">${t.label}</div>
            ${t.items.map(r=>this.renderItem(r))}
          </div>
        `)}
    `}render(){return a`
      <div class="list">
        ${this.groupByMonth?this.renderGrouped():this.items.map(e=>this.renderItem(e))}
      </div>
    `}};c.styles=h`
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
      padding: 0.75rem 0;
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

    button {
      background: none;
      border: none;
      color: var(--bb-primary, #374C34);
      font-size: 0.85rem;
      text-decoration: underline;
      cursor: pointer;
      padding: 0;
      font-family: inherit;
    }

    button.icon {
      text-decoration: none;
      font-size: 1rem;
    }
  `;d([l({type:Array,attribute:!1})],c.prototype,"items",2);d([l({type:Boolean,attribute:"group-by-month",reflect:!0})],c.prototype,"groupByMonth",2);c=d([f("bb-transaction-list")],c);const M={title:"Components/Transaction List",component:"bb-transaction-list",tags:["autodocs"],argTypes:{groupByMonth:{control:"boolean"}}},b=[{id:"1",type:"Depósito",amount:1500,description:"Salário mensal",date:"01/05/2026"},{id:"2",type:"Pix",amount:-250,description:"Transferência para João",date:"03/05/2026"},{id:"3",type:"Saque",amount:-100,date:"05/05/2026"},{id:"4",type:"Depósito",amount:300,description:"Freelance",date:"10/05/2026"},{id:"5",type:"Depósito",amount:2e3,description:"Salário mensal",date:"01/04/2026"},{id:"6",type:"Pix",amount:-500,description:"Aluguel",date:"05/04/2026"},{id:"7",type:"Saque",amount:-80,date:"15/04/2026"}],s={render:()=>{const e=document.createElement("bb-transaction-list");return e.items=b,e}},i={render:()=>{const e=document.createElement("bb-transaction-list");return e.items=b,e.setAttribute("group-by-month",""),e}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const el = document.createElement('bb-transaction-list') as any;
    el.items = sampleItems;
    return el;
  }
}`,...s.parameters?.docs?.source},description:{story:"Lista plana com divisores entre cada item",...s.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    const el = document.createElement('bb-transaction-list') as any;
    el.items = sampleItems;
    el.setAttribute('group-by-month', '');
    return el;
  }
}`,...i.parameters?.docs?.source},description:{story:"Agrupado por mês — header em verde primary acima de cada grupo",...i.parameters?.docs?.description}}};const A=["Default","GroupedByMonth"];export{s as Default,i as GroupedByMonth,A as __namedExportsOrder,M as default};
