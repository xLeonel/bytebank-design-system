import{i as c,a as p,b as d}from"./lit-element-kDLlXEcT.js";import{n as l,t as g}from"./property-DOEbTfJd.js";/* empty css                */var v=Object.defineProperty,f=Object.getOwnPropertyDescriptor,i=(b,a,o,t)=>{for(var r=t>1?void 0:t?f(a,o):a,s=b.length-1,n;s>=0;s--)(n=b[s])&&(r=(t?n(a,o,r):n(r))||r);return t&&r&&v(a,o,r),r};let e=class extends p{constructor(){super(...arguments),this.variant="info",this.label="Badge"}render(){return d`
      <span class="badge">
        <slot>${this.label}</slot>
      </span>
    `}};e.styles=c`
    :host {
      display: inline-block;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      white-space: nowrap;
    }

    :host([variant="success"]) .badge {
      background: var(--bb-success, #47A138);
      color: white;
    }

    :host([variant="warning"]) .badge {
      background: var(--bb-warning, #f59e0b);
      color: white;
    }

    :host([variant="error"]) .badge {
      background: var(--bb-error, #D8353A);
      color: white;
    }

    :host([variant="info"]) .badge {
      background: var(--bb-secondary, #3F38A1);
      color: white;
    }
  `;i([l({reflect:!0})],e.prototype,"variant",2);i([l()],e.prototype,"label",2);e=i([g("bb-badge")],e);
