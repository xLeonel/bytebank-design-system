import{i as b,a as m,b as s}from"./lit-element-kDLlXEcT.js";import{n as d,t as f}from"./property-DOEbTfJd.js";var h=Object.defineProperty,u=Object.getOwnPropertyDescriptor,n=(p,t,i,a)=>{for(var e=a>1?void 0:a?u(t,i):t,o=p.length-1,l;o>=0;o--)(l=p[o])&&(e=(a?l(t,i,e):l(e))||e);return a&&e&&h(t,i,e),e};let r=class extends m{constructor(){super(...arguments),this.label="",this.hideLabel=!1}render(){return s`
      <label>
        ${this.hideLabel?s``:s`<span class="label">${this.label}</span>`}
        <div class="input-wrapper">
          <slot></slot>
        </div>
      </label>
    `}};r.styles=b`
    :host {
      display: block;
      margin-bottom: 1rem;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--bb-dark, #332E2B);
    }

    .label {
      font-weight: 700;
    }

    /* A borda fica no wrapper (Shadow DOM) — imune ao reset do Tailwind */
    .input-wrapper {
      display: flex;
      align-items: center;
      border: 1px solid var(--bb-primary, #374C34);
      border-radius: 0.5rem;
      background: white;
      transition: box-shadow 0.2s ease;
      overflow: hidden;
    }

    .input-wrapper:focus-within {
      box-shadow: 0 0 0 3px rgba(55, 76, 52, 0.2);
    }

    /* Input sem borda própria — o wrapper já cuida disso.
       !important necessário: Tailwind Preflight reseta padding:0 em inputs
       no light DOM e ganha sobre ::slotted sem !important. */
    ::slotted(input),
    ::slotted(select),
    ::slotted(textarea) {
      width: 100%;
      border: none !important;
      outline: none !important;
      padding: 0.75rem 1rem !important;
      font-size: 0.9375rem;
      font-family: inherit;
      background: transparent;
      color: var(--bb-dark, #332E2B);
    }
  `;n([d({type:String})],r.prototype,"label",2);n([d({type:Boolean,attribute:"hide-label",reflect:!0})],r.prototype,"hideLabel",2);r=n([f("bb-field")],r);
