import{b as c,i as b,a as m}from"./lit-element-kDLlXEcT.js";import{n as s,t as u}from"./property-DOEbTfJd.js";import{r as y}from"./state-B_GU6Iad.js";var h=Object.defineProperty,v=Object.getOwnPropertyDescriptor,r=(a,t,o,n)=>{for(var i=n>1?void 0:n?v(t,o):t,g=a.length-1,p;g>=0;g--)(p=a[g])&&(i=(n?p(t,o,i):p(i))||i);return n&&i&&h(t,o,i),i};const f=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),$=c`
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
       aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
`,N=c`
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
       aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
`;let e=class extends m{constructor(){super(...arguments),this.greetingName="",this.today="",this.accountType="",this.agency="",this.account="",this.balance=0,this.visible=!0}toggleVisibility(){this.visible=!this.visible}render(){const a=this.balance<0&&this.visible;return c`
      <div class="inner">
        <div class="header">
          <div>
            <h1 class="title">Olá, ${this.greetingName}! :)</h1>
            <div class="meta">${this.today}</div>
          </div>
          <div>
            <div class="meta">${this.accountType}</div>
            ${this.agency||this.account?c`
              <dl class="account">
                ${this.agency?c`<dt>Agência</dt><dd>${this.agency}</dd>`:""}
                ${this.account?c`<dt>Conta</dt><dd>${this.account}</dd>`:""}
              </dl>
            `:""}
            <button type="button" class="toggle" @click=${this.toggleVisibility}
                    aria-label="${this.visible?"Ocultar saldo":"Mostrar saldo"}">
              ${this.visible?$:N}
              ${this.visible?"Ocultar saldo":"Mostrar saldo"}
            </button>
          </div>
        </div>
        <div class="balance ${a?"balance--negative":""}">
          ${this.visible?f.format(this.balance):"R$ •••••"}
        </div>
      </div>
    `}};e.styles=b`
    :host {
      display: block;
      background: var(--bb-primary, #374C34);
      color: white;
      border-radius: 1rem;
      min-height: 20rem;
    }

    /*
     * Padding lives here, not on :host, so Tailwind v4's preflight
     * (* { padding: 0 }) cannot override it — external stylesheets
     * cannot pierce the shadow DOM boundary.
     */
    .inner {
      padding: 2rem;
      box-sizing: border-box;
      min-height: inherit;
      display: flex;
      flex-direction: column;
    }

    .header {
      display: flex;
      justify-content: space-between;
      gap: 1.5rem;
      align-items: flex-start;
      flex-wrap: wrap;
    }

    .title {
      font-size: 1.75rem;
      font-weight: 800;
      margin: 0;
    }

    .meta {
      margin-top: 0.5rem;
      opacity: 0.9;
      font-size: 0.95rem;
    }

    /*
     * Agência e conta sob o tipo de conta. Grid de 2 colunas para os rótulos
     * ficarem alinhados entre si; opacidade menor que .meta porque é dado de
     * referência, não informação que se lê a cada visita.
     */
    .account {
      display: grid;
      grid-template-columns: auto auto;
      justify-content: start;
      gap: 0.1rem 0.5rem;
      /* Respiro embaixo para o bloco não encostar no botão de ocultar saldo. */
      margin: 0.35rem 0 0.75rem;
      font-size: 0.85rem;
      opacity: 0.75;
    }

    .account dt {
      font-weight: 400;
    }

    .account dd {
      margin: 0;
      font-variant-numeric: tabular-nums;
    }

    .balance {
      margin-top: 1.5rem;
      font-size: 2rem;
      font-weight: 300;
      letter-spacing: 0.03em;
    }

    /* Negativo visível: usa --bb-error mesmo sem atingir WCAG sobre o fundo primary */
    .balance--negative {
      color: var(--bb-error, #D8353A);
    }

    .toggle {
      background: transparent;
      border: none;
      color: var(--bb-warning, #FFAB00);
      cursor: pointer;
      font-size: 0.9rem;
      padding: 0;
      margin-left: 0.5rem;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }
  `;r([s({type:String})],e.prototype,"greetingName",2);r([s({type:String})],e.prototype,"today",2);r([s({type:String})],e.prototype,"accountType",2);r([s({type:String})],e.prototype,"agency",2);r([s({type:String})],e.prototype,"account",2);r([s({type:Number})],e.prototype,"balance",2);r([y()],e.prototype,"visible",2);e=r([u("bb-balance-card")],e);const T={title:"Components/Balance Card",component:"bb-balance-card",tags:["autodocs"],argTypes:{greetingName:{control:"text"},today:{control:"text"},accountType:{control:"text"},balance:{control:"number"}}},l={args:{greetingName:"Ana",today:"22 de maio de 2026",accountType:"Conta Corrente",balance:4520},render:({greetingName:a,today:t,accountType:o,balance:n})=>`
<bb-balance-card
  greetingName="${a}"
  today="${t}"
  accountType="${o}"
  balance="${n}"
></bb-balance-card>`},d={args:{greetingName:"Carlos",today:"22 de maio de 2026",accountType:"Conta Corrente",balance:-350.75},render:({greetingName:a,today:t,accountType:o,balance:n})=>`
<bb-balance-card
  greetingName="${a}"
  today="${t}"
  accountType="${o}"
  balance="${n}"
></bb-balance-card>`};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    greetingName: 'Ana',
    today: '22 de maio de 2026',
    accountType: 'Conta Corrente',
    balance: 4520
  },
  render: ({
    greetingName,
    today,
    accountType,
    balance
  }) => \`
<bb-balance-card
  greetingName="\${greetingName}"
  today="\${today}"
  accountType="\${accountType}"
  balance="\${balance}"
></bb-balance-card>\`
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    greetingName: 'Carlos',
    today: '22 de maio de 2026',
    accountType: 'Conta Corrente',
    balance: -350.75
  },
  render: ({
    greetingName,
    today,
    accountType,
    balance
  }) => \`
<bb-balance-card
  greetingName="\${greetingName}"
  today="\${today}"
  accountType="\${accountType}"
  balance="\${balance}"
></bb-balance-card>\`
}`,...d.parameters?.docs?.source}}};const B=["Default","NegativeBalance"];export{l as Default,d as NegativeBalance,B as __namedExportsOrder,T as default};
