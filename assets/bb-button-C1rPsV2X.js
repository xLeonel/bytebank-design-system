import{i as l,a as u,b as p}from"./lit-element-kDLlXEcT.js";import{n as a,t as v}from"./property-DOEbTfJd.js";/* empty css                */var c=Object.defineProperty,h=Object.getOwnPropertyDescriptor,r=(d,e,s,b)=>{for(var o=b>1?void 0:b?h(e,s):e,n=d.length-1,i;n>=0;n--)(i=d[n])&&(o=(b?i(e,s,o):i(o))||o);return b&&o&&c(e,s,o),o};let t=class extends u{constructor(){super(),this.label="Button",this.variant="primary",this.size="md",this.disabled=!1,this.fullWidth=!1}render(){return p`
      <button ?disabled="${this.disabled}" class="bb-button">
        <slot>${this.label}</slot>
      </button>
    `}};t.styles=l`
    :host {
      --button-bg: var(--bb-primary, #374C34);
      --button-color: white;
      --button-padding: 0.75rem var(--bb-space-md); /* 12px 16px → md */
      --button-radius: var(--bb-radius, 0.5rem);
      --button-shadow: var(--bb-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
      /* Hover overrides — leave unset to use each variant's default */
      --button-hover-bg: initial;
      --button-hover-color: initial;
    }

    button {
      background-color: var(--button-bg);
      color: var(--button-color);
      padding: var(--button-padding);
      border: none;
      border-radius: var(--button-radius);
      cursor: pointer;
      font-weight: 500;
      font-size: inherit;
      box-shadow: var(--button-shadow);
      transition: all 0.2s ease;
      font-family: inherit;
    }

    button:hover {
      opacity: 0.9;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    }

    button:active {
      transform: translateY(0);
      opacity: 0.8;
    }

    :host([variant="secondary"]) button {
      background: transparent;
      color: var(--bb-secondary, #3F38A1);
      border: 1px solid var(--bb-secondary, #3F38A1);
      box-shadow: none;
    }

    :host([variant="secondary"]) button:hover {
      background: var(--button-hover-bg, rgba(63, 56, 161, 0.06));
      color: var(--button-hover-color, var(--bb-secondary, #3F38A1));
      box-shadow: none;
    }

    :host([variant="danger"]) {
      --button-bg: var(--bb-error, #D8353A);
    }

    :host([variant="success"]) {
      --button-bg: var(--bb-success, #47A138);
    }

    :host([size="sm"]) {
      --button-padding: var(--bb-space-sm) var(--bb-space-md); /* 8px 16px */
      font-size: var(--bb-font-size-sm);
    }

    :host([size="lg"]) {
      --button-padding: var(--bb-space-md) var(--bb-space-lg); /* 16px 24px */
      font-size: var(--bb-font-size-lg);
    }

    :host([full-width]) button {
      width: 100%;
    }

    /* Disabled — deve ficar por último para ganhar todos os variants */
    :host([disabled]) button,
    :host([disabled]) button:hover {
      background: #e5e7eb;
      color: #9ca3af;
      border: none;
      box-shadow: none;
      cursor: not-allowed;
      transform: none;
      opacity: 1;
    }
  `;r([a()],t.prototype,"label",2);r([a({reflect:!0})],t.prototype,"variant",2);r([a({reflect:!0})],t.prototype,"size",2);r([a({type:Boolean,reflect:!0})],t.prototype,"disabled",2);r([a({attribute:"full-width",reflect:!0})],t.prototype,"fullWidth",2);t=r([v("bb-button")],t);
